// Cliente server-only pro expert-brain (Cloudflare Worker, vault pessoal do Nicolas em
// Obsidian + D1 + Vectorize). Fala HTTP/JSON-RPC puro com o mesmo PAT que
// ~/.claude/expert-brain-sync/sync.py usa — não depende do MCP do Claude Code estar
// conectado, então funciona rodando em produção na Vercel. NUNCA importar em código de
// cliente: o PAT nunca pode chegar no browser.
const EXPERT_BRAIN_URL = "https://expert-brain.nicolas-cunhan.workers.dev/mcp";

// Domínios do vault que são "cérebro da empresa". O resto (nutrição, treino, hormônios,
// fisiologia, vida pessoal) fica de fora de propósito — decisão do Nicolas, 05/ago.
const BUSINESS_DOMAINS = new Set([
  "growth",
  "financas",
  "gestao",
  "estrategia",
  "cultura",
  "marketing",
  "vendas",
  "business",
  "personal-brand",
  "moats",
  "product",
  "entrepreneurship",
]);

type EbStats = {
  total_notes: number;
  notes_by_domain: { domain: string; count: number }[];
  recent_7d: number;
};

async function ebRpc(method: string, params: unknown, sessionId?: string) {
  const pat = process.env.EXPERT_BRAIN_PAT;
  if (!pat) throw new Error("EXPERT_BRAIN_PAT não configurado");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${pat}`,
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (sessionId) headers["mcp-session-id"] = sessionId;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(EXPERT_BRAIN_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: controller.signal,
      cache: "no-store",
    });
    const sid = res.headers.get("mcp-session-id") ?? sessionId;
    const raw = await res.text();
    const line = raw.split("\n").find((l) => l.startsWith("data:"));
    const json = JSON.parse(line ? line.slice(5).trim() : raw);
    return { json, sid };
  } finally {
    clearTimeout(timeout);
  }
}

export type CompanyBrainMemoria =
  | { ok: true; totalNotes: number; businessNotes: number; recent7d: number }
  | { ok: false; reason: string };

export async function getCompanyBrainMemoria(): Promise<CompanyBrainMemoria> {
  try {
    const init = await ebRpc("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "irbis-os-painel", version: "1.0" },
    });
    if (!init.json?.result) return { ok: false, reason: "initialize falhou" };

    const call = await ebRpc("tools/call", { name: "stats", arguments: {} }, init.sid);
    if (call.json?.error) return { ok: false, reason: String(call.json.error.message ?? "erro na tool stats") };

    const content = (call.json?.result?.content ?? []) as { text?: string }[];
    const text = content.map((c) => c.text ?? "").join("");
    const stats = JSON.parse(text) as EbStats;

    const businessNotes = stats.notes_by_domain
      .filter((d) => BUSINESS_DOMAINS.has(d.domain))
      .reduce((sum, d) => sum + d.count, 0);

    return { ok: true, totalNotes: stats.total_notes, businessNotes, recent7d: stats.recent_7d };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "erro desconhecido" };
  }
}

export type RecallResult = { id: string; title: string; domain: string; kind: string; tldr: string };

// Busca híbrida (vetor + FTS) no vault — mesma tool `recall` do MCP, chamada por HTTP puro.
// Filtra pra domínio de negócio por padrão (mesma regra do getCompanyBrainMemoria) — passar
// domainsFilter explícito só quando o chamador sabe exatamente o domínio que quer.
export async function recallMemoria(
  query: string,
  domainsFilter?: string[]
): Promise<{ ok: true; results: RecallResult[] } | { ok: false; reason: string }> {
  try {
    const init = await ebRpc("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "irbis-os-painel", version: "1.0" },
    });
    if (!init.json?.result) return { ok: false, reason: "initialize falhou" };

    const args: Record<string, unknown> = { query, limit: 8 };
    if (domainsFilter?.length) args.domains_filter = domainsFilter;

    const call = await ebRpc("tools/call", { name: "recall", arguments: args }, init.sid);
    if (call.json?.error) return { ok: false, reason: String(call.json.error.message ?? "erro na tool recall") };

    const content = (call.json?.result?.content ?? []) as { text?: string }[];
    const text = content.map((c) => c.text ?? "").join("");
    const parsed = JSON.parse(text) as { results?: RecallResult[] };
    const all = parsed.results ?? [];
    // Sem domainsFilter explícito, corta pra domínio de negócio (regra padrão do vault
    // aqui). Com domainsFilter, confia no que o chamador pediu.
    const results = domainsFilter ? all : all.filter((r) => BUSINESS_DOMAINS.has(r.domain));
    return { ok: true, results };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "erro desconhecido" };
  }
}
