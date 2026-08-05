#!/usr/bin/env python3
"""Fila transacional de pautas SEO/GEO da IRBIS, sem dependências externas."""

from __future__ import annotations

import argparse
import csv
import itertools
import json
import re
import sqlite3
import string
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_CONFIG = ROOT / "05 - Growth" / "pseo" / "config.json"
DEFAULT_EVIDENCE = ROOT / "05 - Growth" / "pseo" / "evidence.json"
DEFAULT_DB = ROOT / ".pseo" / "queue.sqlite"

QUESTION_RE = re.compile(
    r"^(quem|o que|onde|quando|por que|porque|como|qual|quais|quanto|quantos|"
    r"can|do|does|how|is|are|should|what|when|where|which|who|why|will)\b",
    re.IGNORECASE,
)
EDITOR_PATH_RE = re.compile(
    r"/(draft|drafts|edit|editor|new-story|new-post|compose)(/|$)|[?&](draft|edit)=",
    re.IGNORECASE,
)


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def normalize_text(value: str) -> str:
    text = unicodedata.normalize("NFKD", value or "")
    text = "".join(char for char in text if not unicodedata.combining(char))
    text = re.sub(r"[^a-zA-Z0-9]+", " ", text).strip().lower()
    return re.sub(r"\s+", " ", text)


def slugify(value: str) -> str:
    return normalize_text(value).replace(" ", "-")


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def connect(db_path: Path) -> sqlite3.Connection:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA journal_mode = WAL")
    return connection


SCHEMA = """
CREATE TABLE IF NOT EXISTS keywords (
  id INTEGER PRIMARY KEY,
  keyword TEXT NOT NULL,
  normalized_keyword TEXT NOT NULL UNIQUE,
  pattern_id TEXT NOT NULL,
  intent TEXT NOT NULL,
  score REAL NOT NULL,
  context_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued','claimed','draft_ready','review_ready','published','blocked')),
  attempts INTEGER NOT NULL DEFAULT 0,
  claimed_at TEXT,
  published_at TEXT,
  last_error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS publications (
  id INTEGER PRIMARY KEY,
  keyword_id INTEGER NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  status TEXT NOT NULL
    CHECK (status IN ('claimed','draft_ready','review_ready','published','failed')),
  manifest_path TEXT,
  public_url TEXT UNIQUE,
  reviewer TEXT,
  verified_at TEXT,
  last_error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(keyword_id, platform)
);

CREATE UNIQUE INDEX IF NOT EXISTS one_publication_per_keyword
  ON publications(keyword_id) WHERE status = 'published';

CREATE TABLE IF NOT EXISTS gsc_questions (
  id INTEGER PRIMARY KEY,
  query TEXT NOT NULL,
  normalized_query TEXT NOT NULL UNIQUE,
  clicks REAL,
  impressions REAL,
  ctr REAL,
  position REAL,
  imported_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY,
  command TEXT NOT NULL,
  result_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
"""


def init_db(connection: sqlite3.Connection) -> None:
    connection.executescript(SCHEMA)
    connection.commit()


def record_run(connection: sqlite3.Connection, command: str, result: dict[str, Any]) -> None:
    connection.execute(
        "INSERT INTO runs(command, result_json, created_at) VALUES (?, ?, ?)",
        (command, json.dumps(result, ensure_ascii=False), now_iso()),
    )
    connection.commit()


def fields_in_template(template: str) -> list[str]:
    return [field for _, field, _, _ in string.Formatter().parse(template) if field]


def item_tags(item: dict[str, Any]) -> set[str]:
    return set(item.get("tags", []))


def evidence_candidates(tags: set[str], evidence: dict[str, Any]) -> list[str]:
    ranked: list[tuple[int, str]] = []
    for item in evidence.get("items", []):
        overlap = len(tags & set(item.get("tags", [])))
        if overlap:
            ranked.append((overlap, item["id"]))
    ranked.sort(key=lambda pair: (-pair[0], pair[1]))
    return [item_id for _, item_id in ranked]


def generate_universe(
    connection: sqlite3.Connection,
    config: dict[str, Any],
    evidence: dict[str, Any],
) -> dict[str, Any]:
    dimensions = {
        "parent": config.get("parents", []),
        "vertical": config.get("verticals", []),
        "problem": config.get("problems", []),
        "manual": config.get("problems", []),
        "location": config.get("locations", []),
    }
    inserted = 0
    generated = 0
    timestamp = now_iso()

    for pattern in config.get("patterns", []):
        fields = fields_in_template(pattern["template"])
        unique_dimensions: list[str] = []
        for field in fields:
            dimension = "problem" if field == "manual" else field
            if dimension not in unique_dimensions:
                unique_dimensions.append(dimension)
        pools = [dimensions[name] for name in unique_dimensions]
        if any(not pool for pool in pools):
            continue

        for combination in itertools.product(*pools):
            selected = dict(zip(unique_dimensions, combination))
            values: dict[str, str] = {}
            tags: set[str] = set()
            weights: list[float] = []
            ids: dict[str, str] = {}
            for dimension, item in selected.items():
                ids[dimension] = item["id"]
                weights.append(float(item.get("weight", 0)))
                tags |= item_tags(item)
                values[dimension] = item["name"]
                if dimension == "problem":
                    values["manual"] = item["manual"]

            keyword = pattern["template"].format(**values)
            normalized = normalize_text(keyword)
            candidates = evidence_candidates(tags, evidence)
            dimension_score = sum(weights) / max(1, len(weights))
            score = round(float(pattern.get("weight", 0)) * 0.5 + dimension_score * 0.45 + min(2, len(candidates)) * 2.5, 2)
            context = {
                "dimensions": ids,
                "tags": sorted(tags),
                "evidenceCandidates": candidates,
            }
            generated += 1
            cursor = connection.execute(
                """
                INSERT OR IGNORE INTO keywords(
                  keyword, normalized_keyword, pattern_id, intent, score,
                  context_json, status, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, 'queued', ?, ?)
                """,
                (
                    keyword,
                    normalized,
                    pattern["id"],
                    pattern["intent"],
                    score,
                    json.dumps(context, ensure_ascii=False),
                    timestamp,
                    timestamp,
                ),
            )
            inserted += cursor.rowcount

    connection.commit()
    result = {"generated": generated, "inserted": inserted, "duplicates": generated - inserted}
    record_run(connection, "generate", result)
    return result


def enabled_platform(config: dict[str, Any], platform_id: str) -> dict[str, Any]:
    for platform in config.get("platforms", []):
        if platform.get("id") == platform_id:
            if not platform.get("enabled"):
                raise ValueError(f"Plataforma desativada: {platform_id}. {platform.get('reason', '')}".strip())
            return platform
    raise ValueError(f"Plataforma desconhecida: {platform_id}")


def claim_next(
    connection: sqlite3.Connection,
    config: dict[str, Any],
    platform_id: str,
) -> dict[str, Any] | None:
    platform = enabled_platform(config, platform_id)
    timestamp = now_iso()
    connection.execute("BEGIN IMMEDIATE")
    row = connection.execute(
        """
        SELECT * FROM keywords
        WHERE status = 'queued' AND attempts < ?
        ORDER BY score DESC, id ASC
        LIMIT 1
        """,
        (int(config.get("maxAttempts", 3)),),
    ).fetchone()
    if row is None:
        connection.commit()
        return None

    connection.execute(
        "UPDATE keywords SET status='claimed', claimed_at=?, updated_at=?, last_error=NULL WHERE id=?",
        (timestamp, timestamp, row["id"]),
    )
    connection.execute(
        """
        INSERT INTO publications(keyword_id, platform, status, created_at, updated_at)
        VALUES (?, ?, 'claimed', ?, ?)
        ON CONFLICT(keyword_id, platform) DO UPDATE SET
          status='claimed', updated_at=excluded.updated_at, last_error=NULL
        """,
        (row["id"], platform_id, timestamp, timestamp),
    )
    connection.commit()
    context = json.loads(row["context_json"])
    result = {
        "keywordId": row["id"],
        "keyword": row["keyword"],
        "intent": row["intent"],
        "score": row["score"],
        "platform": platform,
        "context": context,
        "qualityGates": config.get("qualityGates", {}),
    }
    record_run(connection, "next", result)
    return result


def fail_keyword(
    connection: sqlite3.Connection,
    config: dict[str, Any],
    keyword_id: int,
    reason: str,
) -> dict[str, Any]:
    row = connection.execute("SELECT * FROM keywords WHERE id=?", (keyword_id,)).fetchone()
    if row is None:
        raise ValueError(f"Palavra-chave inexistente: {keyword_id}")
    attempts = int(row["attempts"]) + 1
    status = "blocked" if attempts >= int(config.get("maxAttempts", 3)) else "queued"
    timestamp = now_iso()
    connection.execute("BEGIN IMMEDIATE")
    connection.execute(
        """
        UPDATE keywords SET status=?, attempts=?, claimed_at=NULL,
          last_error=?, updated_at=? WHERE id=?
        """,
        (status, attempts, reason, timestamp, keyword_id),
    )
    connection.execute(
        "UPDATE publications SET status='failed', last_error=?, updated_at=? WHERE keyword_id=? AND status != 'published'",
        (reason, timestamp, keyword_id),
    )
    connection.commit()
    result = {"keywordId": keyword_id, "status": status, "attempts": attempts, "requeued": status == "queued"}
    record_run(connection, "fail", result)
    return result


def valid_http_url(value: str) -> bool:
    parsed = urllib.parse.urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def word_count(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[`#*_>\[\](){}-]", " ", text)
    return len(re.findall(r"\b[\wÀ-ÿ]+\b", text, re.UNICODE))


def summary_sentence_count(summary: str) -> int:
    return len([piece for piece in re.split(r"(?<=[.!?])\s+", summary.strip()) if piece.strip()])


def fetch_public_url(url: str, expected_keyword: str | None = None, timeout: int = 15) -> dict[str, Any]:
    if not valid_http_url(url):
        raise ValueError("URL pública inválida")
    if EDITOR_PATH_RE.search(url):
        raise ValueError("A URL parece ser de rascunho ou editor")
    request = urllib.request.Request(url, headers={"User-Agent": "IRBIS-PSEO-URL-Validator/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            final_url = response.geturl()
            status = getattr(response, "status", 200)
            body = response.read(2_000_000).decode(response.headers.get_content_charset() or "utf-8", errors="replace")
    except (urllib.error.URLError, TimeoutError) as error:
        raise ValueError(f"URL não ficou pública: {error}") from error
    if status != 200:
        raise ValueError(f"URL respondeu HTTP {status}")
    if EDITOR_PATH_RE.search(final_url):
        raise ValueError("O redirecionamento terminou em rascunho ou editor")
    if expected_keyword and normalize_text(expected_keyword) not in normalize_text(body):
        raise ValueError("A página pública não contém a palavra-chave esperada")
    return {"status": status, "finalUrl": final_url, "bytesChecked": len(body.encode("utf-8"))}


def validate_draft_manifest(
    keyword_row: sqlite3.Row,
    manifest: dict[str, Any],
    config: dict[str, Any],
    evidence: dict[str, Any],
    verify_sources: bool = False,
) -> list[str]:
    gates = config.get("qualityGates", {})
    errors: list[str] = []
    expected_keyword = keyword_row["keyword"]
    if normalize_text(manifest.get("keyword", "")) != normalize_text(expected_keyword):
        errors.append("manifest.keyword não corresponde à palavra-chave da fila")

    summary = str(manifest.get("summary", "")).strip()
    if gates.get("requireQuotableSummary"):
        sentence_count = summary_sentence_count(summary)
        if sentence_count < 3 or sentence_count > 5:
            errors.append("summary deve ter de 3 a 5 frases citáveis")

    faq = manifest.get("faq") or []
    if len(faq) < int(gates.get("minimumFaqItems", 0)):
        errors.append(f"faq precisa de ao menos {gates.get('minimumFaqItems')} itens")
    for item in faq:
        if not str(item.get("question", "")).strip() or not str(item.get("answer", "")).strip():
            errors.append("todo item de FAQ precisa de pergunta e resposta")
            break

    sources = manifest.get("sources") or []
    if len(sources) < int(gates.get("minimumSources", 0)):
        errors.append(f"sources precisa de ao menos {gates.get('minimumSources')} fontes")
    source_types = {str(source.get("type", "")).strip().lower() for source in sources if source.get("type")}
    if len(source_types) < int(gates.get("minimumSourceTypes", 0)):
        errors.append(f"sources precisa de ao menos {gates.get('minimumSourceTypes')} tipos de fonte")
    for source in sources:
        url = str(source.get("url", ""))
        if not valid_http_url(url):
            errors.append(f"fonte com URL inválida: {url or '(vazia)'}")
            continue
        if not str(source.get("claim", "")).strip():
            errors.append(f"fonte sem claim documentado: {url}")
        if verify_sources:
            try:
                fetch_public_url(url)
            except ValueError as error:
                errors.append(f"fonte inacessível: {url}: {error}")

    evidence_by_id = {item["id"]: item for item in evidence.get("items", [])}
    first_party = manifest.get("firstPartyEvidence") or []
    if gates.get("requireFirstPartyEvidence") and not first_party:
        errors.append("firstPartyEvidence é obrigatório")
    for evidence_id in first_party:
        if evidence_id not in evidence_by_id:
            errors.append(f"evidência própria inexistente: {evidence_id}")

    image = manifest.get("image") or {}
    if gates.get("requireImageKeyword"):
        keyword_slug = slugify(expected_keyword)
        filename = slugify(Path(str(image.get("filename", ""))).stem)
        alt = normalize_text(str(image.get("alt", "")))
        if keyword_slug not in filename:
            errors.append("o nome do arquivo de imagem precisa conter a palavra-chave")
        if normalize_text(expected_keyword) not in alt:
            errors.append("o alt da imagem precisa conter a palavra-chave")

    links = manifest.get("internalLinks") or []
    if len(links) < int(gates.get("minimumInternalLinks", 0)):
        errors.append(f"internalLinks precisa de ao menos {gates.get('minimumInternalLinks')} link")
    site_host = urllib.parse.urlparse(config.get("siteUrl", "")).netloc
    for link in links:
        if not valid_http_url(link) or urllib.parse.urlparse(link).netloc != site_host:
            errors.append(f"link interno inválido: {link}")

    body_value = str(manifest.get("bodyPath", "")).strip()
    body_path = Path(body_value)
    if not body_path.is_absolute():
        body_path = ROOT / body_path
    if not body_value or not body_path.is_file():
        errors.append("bodyPath não aponta para um arquivo existente")
    elif word_count(body_path) < int(gates.get("minimumWords", 0)):
        errors.append(f"corpo precisa de ao menos {gates.get('minimumWords')} palavras")

    return errors


def mark_draft(
    connection: sqlite3.Connection,
    config: dict[str, Any],
    evidence: dict[str, Any],
    keyword_id: int,
    platform_id: str,
    manifest_path: Path,
    verify_sources: bool,
) -> dict[str, Any]:
    row = connection.execute("SELECT * FROM keywords WHERE id=?", (keyword_id,)).fetchone()
    if row is None:
        raise ValueError(f"Palavra-chave inexistente: {keyword_id}")
    if row["status"] != "claimed":
        raise ValueError(f"A palavra-chave precisa estar claimed, está {row['status']}")
    manifest = load_json(manifest_path)
    errors = validate_draft_manifest(row, manifest, config, evidence, verify_sources)
    if errors:
        raise ValueError("Rascunho reprovado:\n- " + "\n- ".join(errors))
    timestamp = now_iso()
    connection.execute("BEGIN IMMEDIATE")
    connection.execute("UPDATE keywords SET status='draft_ready', updated_at=? WHERE id=?", (timestamp, keyword_id))
    connection.execute(
        """
        UPDATE publications SET status='draft_ready', manifest_path=?, updated_at=?
        WHERE keyword_id=? AND platform=?
        """,
        (str(manifest_path), timestamp, keyword_id, platform_id),
    )
    connection.commit()
    result = {"keywordId": keyword_id, "status": "draft_ready", "manifest": str(manifest_path)}
    record_run(connection, "draft", result)
    return result


def review_keyword(
    connection: sqlite3.Connection,
    keyword_id: int,
    platform_id: str,
    reviewer: str,
) -> dict[str, Any]:
    row = connection.execute("SELECT status FROM keywords WHERE id=?", (keyword_id,)).fetchone()
    if row is None:
        raise ValueError(f"Palavra-chave inexistente: {keyword_id}")
    if row["status"] != "draft_ready":
        raise ValueError(f"A palavra-chave precisa estar draft_ready, está {row['status']}")
    timestamp = now_iso()
    connection.execute("BEGIN IMMEDIATE")
    connection.execute("UPDATE keywords SET status='review_ready', updated_at=? WHERE id=?", (timestamp, keyword_id))
    connection.execute(
        """
        UPDATE publications SET status='review_ready', reviewer=?, updated_at=?
        WHERE keyword_id=? AND platform=?
        """,
        (reviewer, timestamp, keyword_id, platform_id),
    )
    connection.commit()
    result = {"keywordId": keyword_id, "status": "review_ready", "reviewer": reviewer}
    record_run(connection, "review", result)
    return result


def publish_keyword(
    connection: sqlite3.Connection,
    config: dict[str, Any],
    keyword_id: int,
    platform_id: str,
    public_url: str,
) -> dict[str, Any]:
    row = connection.execute("SELECT * FROM keywords WHERE id=?", (keyword_id,)).fetchone()
    if row is None:
        raise ValueError(f"Palavra-chave inexistente: {keyword_id}")
    if config.get("qualityGates", {}).get("requireHumanReview") and row["status"] != "review_ready":
        raise ValueError(f"A palavra-chave precisa de revisão humana, está {row['status']}")
    verification = fetch_public_url(public_url, expected_keyword=row["keyword"])
    timestamp = now_iso()
    connection.execute("BEGIN IMMEDIATE")
    connection.execute(
        "UPDATE keywords SET status='published', published_at=?, updated_at=?, last_error=NULL WHERE id=?",
        (timestamp, timestamp, keyword_id),
    )
    connection.execute(
        """
        UPDATE publications SET status='published', public_url=?, verified_at=?, updated_at=?, last_error=NULL
        WHERE keyword_id=? AND platform=?
        """,
        (verification["finalUrl"], timestamp, timestamp, keyword_id, platform_id),
    )
    connection.commit()
    result = {
        "keywordId": keyword_id,
        "status": "published",
        "publicUrl": verification["finalUrl"],
        "verifiedAt": timestamp,
    }
    record_run(connection, "publish", result)
    return result


def parse_number(value: str | None, percent: bool = False) -> float | None:
    if value is None or not str(value).strip():
        return None
    text = str(value).strip().replace("%", "").replace(" ", "")
    if "," in text and "." in text:
        text = text.replace(".", "").replace(",", ".")
    elif "," in text:
        text = text.replace(",", ".")
    number = float(text)
    return number / 100 if percent and number > 1 else number


def normalized_headers(fieldnames: Iterable[str]) -> dict[str, str]:
    return {normalize_text(name): name for name in fieldnames}


def pick_header(headers: dict[str, str], *candidates: str) -> str | None:
    for candidate in candidates:
        normalized = normalize_text(candidate)
        if normalized in headers:
            return headers[normalized]
    return None


def import_gsc(connection: sqlite3.Connection, csv_path: Path) -> dict[str, Any]:
    with csv_path.open(encoding="utf-8-sig", newline="") as handle:
        sample = handle.read(4096)
        handle.seek(0)
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t")
        reader = csv.DictReader(handle, dialect=dialect)
        if not reader.fieldnames:
            raise ValueError("CSV sem cabeçalhos")
        headers = normalized_headers(reader.fieldnames)
        query_h = pick_header(headers, "query", "consulta", "principais consultas", "top queries")
        clicks_h = pick_header(headers, "clicks", "cliques")
        impressions_h = pick_header(headers, "impressions", "impressoes")
        ctr_h = pick_header(headers, "ctr")
        position_h = pick_header(headers, "position", "posicao")
        if not query_h:
            raise ValueError("CSV não tem coluna de consulta/query")
        imported = 0
        ignored = 0
        timestamp = now_iso()
        for record in reader:
            query = str(record.get(query_h, "")).strip()
            if not QUESTION_RE.match(normalize_text(query)):
                ignored += 1
                continue
            connection.execute(
                """
                INSERT INTO gsc_questions(query, normalized_query, clicks, impressions, ctr, position, imported_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(normalized_query) DO UPDATE SET
                  query=excluded.query, clicks=excluded.clicks, impressions=excluded.impressions,
                  ctr=excluded.ctr, position=excluded.position, imported_at=excluded.imported_at
                """,
                (
                    query,
                    normalize_text(query),
                    parse_number(record.get(clicks_h)) if clicks_h else None,
                    parse_number(record.get(impressions_h)) if impressions_h else None,
                    parse_number(record.get(ctr_h), percent=True) if ctr_h else None,
                    parse_number(record.get(position_h)) if position_h else None,
                    timestamp,
                ),
            )
            imported += 1
    connection.commit()
    result = {"importedQuestions": imported, "ignoredNonQuestions": ignored}
    record_run(connection, "import-gsc", result)
    return result


def status_report(connection: sqlite3.Connection, config: dict[str, Any], limit: int = 10) -> dict[str, Any]:
    counts = {
        row["status"]: row["total"]
        for row in connection.execute("SELECT status, COUNT(*) AS total FROM keywords GROUP BY status")
    }
    next_rows = connection.execute(
        "SELECT id, keyword, intent, score, attempts FROM keywords WHERE status='queued' ORDER BY score DESC, id ASC LIMIT ?",
        (limit,),
    ).fetchall()
    questions = connection.execute("SELECT COUNT(*) AS total FROM gsc_questions").fetchone()["total"]
    return {
        "counts": counts,
        "gscQuestions": questions,
        "next": [dict(row) for row in next_rows],
        "platforms": config.get("platforms", []),
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Fila SEO/GEO transacional da IRBIS")
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--evidence", type=Path, default=DEFAULT_EVIDENCE)
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("init")
    sub.add_parser("generate")
    status = sub.add_parser("status")
    status.add_argument("--limit", type=int, default=10)
    next_parser = sub.add_parser("next")
    next_parser.add_argument("--platform", default="owned_blog")
    fail = sub.add_parser("fail")
    fail.add_argument("--keyword-id", type=int, required=True)
    fail.add_argument("--reason", required=True)
    draft = sub.add_parser("draft")
    draft.add_argument("--keyword-id", type=int, required=True)
    draft.add_argument("--platform", default="owned_blog")
    draft.add_argument("--manifest", type=Path, required=True)
    draft.add_argument("--verify-sources", action="store_true")
    review = sub.add_parser("review")
    review.add_argument("--keyword-id", type=int, required=True)
    review.add_argument("--platform", default="owned_blog")
    review.add_argument("--reviewer", required=True)
    publish = sub.add_parser("publish")
    publish.add_argument("--keyword-id", type=int, required=True)
    publish.add_argument("--platform", default="owned_blog")
    publish.add_argument("--url", required=True)
    gsc = sub.add_parser("import-gsc")
    gsc.add_argument("csv_path", type=Path)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    config = load_json(args.config)
    evidence = load_json(args.evidence)
    connection = connect(args.db)
    init_db(connection)
    try:
        if args.command == "init":
            result = {"database": str(args.db), "status": "ready"}
            record_run(connection, "init", result)
        elif args.command == "generate":
            result = generate_universe(connection, config, evidence)
        elif args.command == "status":
            result = status_report(connection, config, args.limit)
        elif args.command == "next":
            result = claim_next(connection, config, args.platform) or {"status": "empty"}
        elif args.command == "fail":
            result = fail_keyword(connection, config, args.keyword_id, args.reason)
        elif args.command == "draft":
            result = mark_draft(
                connection,
                config,
                evidence,
                args.keyword_id,
                args.platform,
                args.manifest,
                args.verify_sources,
            )
        elif args.command == "review":
            result = review_keyword(connection, args.keyword_id, args.platform, args.reviewer)
        elif args.command == "publish":
            result = publish_keyword(connection, config, args.keyword_id, args.platform, args.url)
        elif args.command == "import-gsc":
            result = import_gsc(connection, args.csv_path)
        else:
            raise AssertionError(args.command)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    except (ValueError, sqlite3.IntegrityError) as error:
        print(f"Erro: {error}", file=sys.stderr)
        return 1
    finally:
        connection.close()


if __name__ == "__main__":
    raise SystemExit(main())
