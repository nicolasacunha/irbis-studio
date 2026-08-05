import importlib.util
import json
import sqlite3
import tempfile
import threading
import unittest
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


MODULE_PATH = Path(__file__).with_name("pipeline.py")
SPEC = importlib.util.spec_from_file_location("pseo_pipeline", MODULE_PATH)
pipeline = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(pipeline)


def sample_config(max_attempts=2):
    return {
        "siteUrl": "https://irbis.com.br",
        "maxAttempts": max_attempts,
        "parents": [{"id": "sistema", "name": "sistema com IA", "weight": 100, "tags": ["sistema"]}],
        "verticals": [{"id": "industria", "name": "indústria", "weight": 90, "tags": ["industria"]}],
        "problems": [
            {
                "id": "follow-up",
                "name": "o follow-up comercial",
                "manual": "planilha de follow-up",
                "weight": 95,
                "tags": ["follow-up"],
            }
        ],
        "locations": [],
        "patterns": [
            {"id": "cost", "template": "quanto custa {parent} para {vertical}", "intent": "transacional", "weight": 100},
            {"id": "auto", "template": "como automatizar {problem} em {vertical}", "intent": "comercial", "weight": 90},
        ],
        "platforms": [{"id": "owned_blog", "enabled": True, "mode": "review_required"}],
        "qualityGates": {
            "minimumWords": 10,
            "minimumSources": 2,
            "minimumSourceTypes": 2,
            "minimumFaqItems": 3,
            "minimumInternalLinks": 1,
            "requireQuotableSummary": True,
            "requireFirstPartyEvidence": True,
            "requireImageKeyword": True,
            "requireHumanReview": True,
        },
    }


EVIDENCE = {
    "items": [
        {
            "id": "case-industria",
            "claim": "Case real",
            "sourceUrl": "https://irbis.com.br/odery-crm",
            "status": "public_verified",
            "tags": ["sistema", "industria", "follow-up"],
        }
    ]
}


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.db_path = self.root / "queue.sqlite"
        self.connection = pipeline.connect(self.db_path)
        pipeline.init_db(self.connection)
        self.config = sample_config()

    def tearDown(self):
        self.connection.close()
        self.temp.cleanup()

    def generate_and_claim(self):
        pipeline.generate_universe(self.connection, self.config, EVIDENCE)
        return pipeline.claim_next(self.connection, self.config, "owned_blog")

    def valid_manifest(self, job):
        body = self.root / "body.md"
        body.write_text(" ".join(["palavra"] * 30), encoding="utf-8")
        keyword = job["keyword"]
        return {
            "keyword": keyword,
            "title": keyword.capitalize(),
            "summary": "Resposta direta. Contexto verificável. Próximo passo claro.",
            "faq": [
                {"question": "Pergunta 1?", "answer": "Resposta 1."},
                {"question": "Pergunta 2?", "answer": "Resposta 2."},
                {"question": "Pergunta 3?", "answer": "Resposta 3."},
            ],
            "sources": [
                {"url": "https://example.com/a", "type": "pesquisa", "claim": "Dado A"},
                {"url": "https://example.org/b", "type": "documentacao", "claim": "Dado B"},
            ],
            "firstPartyEvidence": ["case-industria"],
            "image": {"filename": pipeline.slugify(keyword) + ".webp", "alt": keyword},
            "internalLinks": ["https://irbis.com.br/odery-crm"],
            "bodyPath": str(body),
        }

    def test_generation_is_idempotent_with_unique_keyword(self):
        first = pipeline.generate_universe(self.connection, self.config, EVIDENCE)
        second = pipeline.generate_universe(self.connection, self.config, EVIDENCE)
        self.assertEqual(first["generated"], 2)
        self.assertEqual(first["inserted"], 2)
        self.assertEqual(second["inserted"], 0)
        total = self.connection.execute("SELECT COUNT(*) FROM keywords").fetchone()[0]
        self.assertEqual(total, 2)

    def test_failure_requeues_keyword_without_burning_it(self):
        job = self.generate_and_claim()
        result = pipeline.fail_keyword(self.connection, self.config, job["keywordId"], "login expirou")
        self.assertTrue(result["requeued"])
        next_job = pipeline.claim_next(self.connection, self.config, "owned_blog")
        self.assertEqual(next_job["keywordId"], job["keywordId"])

    def test_repeated_failure_blocks_after_configured_limit(self):
        job = self.generate_and_claim()
        pipeline.fail_keyword(self.connection, self.config, job["keywordId"], "falha 1")
        pipeline.claim_next(self.connection, self.config, "owned_blog")
        result = pipeline.fail_keyword(self.connection, self.config, job["keywordId"], "falha 2")
        self.assertEqual(result["status"], "blocked")
        self.assertFalse(result["requeued"])

    def test_manifest_requires_first_party_evidence(self):
        job = self.generate_and_claim()
        manifest = self.valid_manifest(job)
        manifest["firstPartyEvidence"] = []
        row = self.connection.execute("SELECT * FROM keywords WHERE id=?", (job["keywordId"],)).fetchone()
        errors = pipeline.validate_draft_manifest(row, manifest, self.config, EVIDENCE)
        self.assertIn("firstPartyEvidence é obrigatório", errors)

    def test_publish_requires_review_and_public_url(self):
        job = self.generate_and_claim()
        manifest_path = self.root / "manifest.json"
        manifest_path.write_text(json.dumps(self.valid_manifest(job), ensure_ascii=False), encoding="utf-8")
        pipeline.mark_draft(
            self.connection,
            self.config,
            EVIDENCE,
            job["keywordId"],
            "owned_blog",
            manifest_path,
            False,
        )
        with self.assertRaisesRegex(ValueError, "revisão humana"):
            pipeline.publish_keyword(
                self.connection,
                self.config,
                job["keywordId"],
                "owned_blog",
                "https://example.com/post",
            )

        pipeline.review_keyword(self.connection, job["keywordId"], "owned_blog", "Nicolas")
        page = self.root / "post.html"
        page.write_text(f"<html><body><h1>{job['keyword']}</h1></body></html>", encoding="utf-8")
        handler = partial(QuietHandler, directory=str(self.root))
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            result = pipeline.publish_keyword(
                self.connection,
                self.config,
                job["keywordId"],
                "owned_blog",
                f"http://127.0.0.1:{server.server_port}/post.html",
            )
        finally:
            server.shutdown()
            thread.join(timeout=2)
            server.server_close()
        self.assertEqual(result["status"], "published")
        stored = self.connection.execute("SELECT status FROM keywords WHERE id=?", (job["keywordId"],)).fetchone()
        self.assertEqual(stored["status"], "published")

    def test_editor_url_is_never_publication(self):
        with self.assertRaisesRegex(ValueError, "rascunho ou editor"):
            pipeline.fetch_public_url("https://medium.com/new-story/edit")

    def test_import_gsc_keeps_only_questions(self):
        csv_path = self.root / "gsc.csv"
        csv_path.write_text(
            "Principais consultas;Cliques;Impressões;CTR;Posição\n"
            "como automatizar follow-up;2;120;1,67%;8,4\n"
            "sistema com ia;4;300;1,33%;12,0\n",
            encoding="utf-8",
        )
        result = pipeline.import_gsc(self.connection, csv_path)
        self.assertEqual(result["importedQuestions"], 1)
        self.assertEqual(result["ignoredNonQuestions"], 1)
        row = self.connection.execute("SELECT * FROM gsc_questions").fetchone()
        self.assertEqual(row["query"], "como automatizar follow-up")
        self.assertAlmostEqual(row["ctr"], 0.0167)


if __name__ == "__main__":
    unittest.main()
