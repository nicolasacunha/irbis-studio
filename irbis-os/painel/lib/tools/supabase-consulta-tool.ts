import { tool } from "ai";
import { z } from "zod";

// Só leitura, tabela por allowlist, direto via REST/PostgREST (mesmo padrão documentado em
// irbis-os/CONEXAO-SUPABASE.md e usado por toda skill irbis-*). Esta tool nunca escreve: a
// única escrita do Company Brain é `registrar-achado-tool.ts`, numa tabela isolada que
// nenhuma skill consome como fila de ação (Lei 1 do método de entrega: nada sai/muda sem o
// Nicolas). O `filtro` já chega no formato PostgREST (coluna=operador.valor) e vai direto
// pra query string — não precisa de parser, é a sintaxe nativa do banco.
const TABELAS = [
  "pessoas",
  "pipeline",
  "projetos",
  "financeiro",
  "marcos",
  "interacoes",
  "aprovacoes",
  "agentes_jobs",
  "achados",
] as const;

export const consultarSupabaseTool = tool({
  description:
    "Consulta uma tabela do Supabase operacional da IRBIS (só leitura, nunca escreve). " +
    "pessoas = CRM mestre. pipeline = funil comercial ativo. projetos = entregas e carteira. " +
    "financeiro = a receber/recebido. marcos = calendário do pós-venda. interacoes = histórico " +
    "de toques. aprovacoes = fila de rascunhos parados esperando o Nicolas aprovar — é aqui " +
    "que 'o que eu preciso decidir hoje' mora. agentes_jobs = o próprio mapa de departamentos " +
    "e skills. achados = inconsistências que a auditoria automática já encontrou e guardou " +
    "(filtre por 'status=eq.aberto' pra ver o que continua de pé). " +
    "Use filtro no formato PostgREST (ex: 'status=eq.parado', 'estagio=eq.negociacao') " +
    "quando a pergunta pedir um recorte; sem filtro, traz os registros mais recentes.",
  inputSchema: z.object({
    tabela: z.enum(TABELAS),
    filtro: z
      .string()
      .optional()
      .describe("Filtro PostgREST opcional, ex: 'status=eq.parado'. Vazio = sem filtro."),
    limite: z.number().min(1).max(50).default(20),
  }),
  execute: async ({ tabela, filtro, limite }) => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return { ok: false, erro: "Supabase não configurado" };

    const params = new URLSearchParams({ select: "*", limit: String(limite) });
    if (filtro) {
      const [coluna, ...resto] = filtro.split("=");
      if (coluna && resto.length) params.set(coluna.trim(), resto.join("=").trim());
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(`${url}/rest/v1/${tabela}?${params.toString()}`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        signal: controller.signal,
        cache: "no-store",
      });
      if (!res.ok) return { ok: false, erro: `Supabase respondeu ${res.status}` };
      const registros = await res.json();
      return { ok: true, registros, total: Array.isArray(registros) ? registros.length : 0 };
    } catch (e) {
      return { ok: false, erro: e instanceof Error ? e.message : "erro desconhecido" };
    } finally {
      clearTimeout(timeout);
    }
  },
});
