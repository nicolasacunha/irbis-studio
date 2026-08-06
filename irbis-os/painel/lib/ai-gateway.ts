// Saldo real da Vercel AI Gateway — cada pergunta ao Company Brain gasta dinheiro de
// verdade nessa conta. Sem isso o chat é um custo invisível: gasta e ninguém vê até a
// fatura. NUNCA importar em código de cliente: a `AI_GATEWAY_API_KEY` não pode chegar no
// browser (por isso a leitura passa por /api/company-brain/creditos, não por fetch direto).
//
// Deliberadamente NÃO existe rate-limit automático aqui. O sistema tem um usuário só, e
// travar a pergunta dele por cota seria frustração inventada — a decisão é mostrar o
// número e deixar ele decidir.
const CREDITS_URL = "https://ai-gateway.vercel.sh/v1/credits";

export type CreditosGateway =
  | { ok: true; saldo: number; usado: number }
  | { ok: false; motivo: string };

export async function getCreditosGateway(): Promise<CreditosGateway> {
  const key = process.env.AI_GATEWAY_API_KEY;
  if (!key) return { ok: false, motivo: "AI_GATEWAY_API_KEY ausente" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(CREDITS_URL, {
      headers: { Authorization: `Bearer ${key}` },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, motivo: `gateway respondeu ${res.status}` };
    const json = (await res.json()) as { balance?: string; total_used?: string };
    const saldo = Number(json.balance);
    const usado = Number(json.total_used);
    if (!Number.isFinite(saldo) || !Number.isFinite(usado)) {
      return { ok: false, motivo: "resposta sem balance/total_used" };
    }
    return { ok: true, saldo, usado };
  } catch (e) {
    return { ok: false, motivo: e instanceof Error ? e.message : "erro desconhecido" };
  } finally {
    clearTimeout(timeout);
  }
}
