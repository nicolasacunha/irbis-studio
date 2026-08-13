import { tool } from "ai";
import { z } from "zod";
import { recallMemoria } from "@/lib/expert-brain";

export const consultarMemoriaTool = tool({
  description:
    "Busca híbrida (vetor + texto) na memória viva da IRBIS (expert-brain) — decisões, " +
    "insights, conceitos e fatos já registrados sobre o negócio. Use termos literais do " +
    "assunto, não metáforas ('preço', não 'a dança do valor'). Cortada pra domínio de negócio " +
    "por padrão (fora nutrição/treino/vida pessoal do Nicolas).",
  inputSchema: z.object({
    query: z.string().min(1).describe("Termos de busca, vocabulário literal do domínio."),
  }),
  execute: async ({ query }) => {
    const result = await recallMemoria(query);
    if (!result.ok) return { ok: false, erro: result.reason };
    return {
      ok: true,
      notas: result.results.map((r) => ({ titulo: r.title, resumo: r.tldr, dominio: r.domain, tipo: r.kind })),
    };
  },
});
