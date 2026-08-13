import { tool } from "ai";
import { z } from "zod";

// A ÚNICA escrita que o Company Brain tem, e ela é deliberadamente estreita: insere numa
// tabela isolada (`achados`) que nenhuma skill consome como fila de ação. Não toca pessoas,
// pipeline, projetos, financeiro nem aprovacoes; não manda mensagem; não executa skill.
// Lei 1 intacta — anotar um problema não é agir sobre ele.
//
// Existe porque o chat já achava problema real e o achado morria quando a aba fechava.
// Ver docs/superpowers/specs/2026-08-05-sistema-agentes-departamentos-design.md.
export const registrarAchadoTool = tool({
  description:
    "Guarda um problema REAL encontrado nos dados pro Nicolas ver depois, sem precisar " +
    "perguntar de novo. Use só quando a inconsistência estiver sustentada por registro que " +
    "você leu nesta conversa (contradição entre tabelas, duplicata, prazo vencido sem baixa, " +
    "campo obrigatório vazio). NÃO use pra: resumir a conversa, registrar recomendação ou " +
    "opinião, nem repetir algo que o Nicolas já disse que sabe. Gravar o mesmo problema duas " +
    "vezes é inofensivo — a chave deduplica.",
  inputSchema: z.object({
    chave: z
      .string()
      .min(3)
      .describe(
        "Slug estável do PROBLEMA, não da execução. Inclua o id do registro afetado: " +
          "'aprovacoes-duplicadas:44ad5d69', 'projeto-entregue-pipeline-atrasado:casa-paes'. " +
          "Mesma chave = mesmo problema = não duplica."
      ),
    titulo: z.string().min(5).describe("Uma linha, direta, sem enrolação."),
    detalhe: z
      .string()
      .min(10)
      .describe("O que está inconsistente, com os valores concretos dos dois lados."),
    origem: z
      .array(z.object({ tabela: z.string(), id: z.string() }))
      .min(1)
      .describe("Registros que sustentam o achado. Sem isso é opinião, não achado."),
    severidade: z
      .enum(["urgente", "atencao", "nota"])
      .default("atencao")
      .describe("urgente = custa dinheiro ou credibilidade hoje. nota = higiene."),
  }),
  execute: async ({ chave, titulo, detalhe, origem, severidade }) => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return { ok: false, erro: "Supabase não configurado" };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(`${url}/rest/v1/achados?on_conflict=chave`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          // Achado repetido não vira linha nova — a lista precisa continuar legível depois
          // de a rotina diária rodar trinta vezes.
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
        body: JSON.stringify({
          criado_por: "company-brain",
          chave,
          titulo,
          detalhe,
          origem,
          severidade,
        }),
        signal: controller.signal,
      });
      if (!res.ok) return { ok: false, erro: `Supabase respondeu ${res.status}` };
      const linhas = await res.json();
      const novo = Array.isArray(linhas) && linhas.length > 0;
      return {
        ok: true,
        novo,
        mensagem: novo
          ? "Achado guardado — aparece no núcleo do mapa até ser resolvido."
          : "Esse achado já estava guardado (mesma chave). Nada duplicado.",
      };
    } catch (e) {
      return { ok: false, erro: e instanceof Error ? e.message : "erro desconhecido" };
    } finally {
      clearTimeout(timeout);
    }
  },
});
