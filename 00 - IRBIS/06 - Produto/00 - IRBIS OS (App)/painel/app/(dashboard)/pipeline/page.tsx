import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";
import { PipelineView, type CardPipeline } from "./pipeline-view";

export const dynamic = "force-dynamic";

const TETO_POR_ESTAGIO: Record<string, number> = {
  negociacao: 2,
  proposta: 3,
  levantamento: 5,
  "primeiro contato": 7,
  nutricao: 30,
};

function diasDesde(data: string | null) {
  if (!data) return null;
  return Math.floor((Date.now() - new Date(data).getTime()) / 86_400_000);
}

export default async function PipelinePage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pipeline")
    .select(
      "id, pessoa_id, estagio, valor_min, valor_max, temperatura, tipo_projeto, proximo_passo, data_proximo_toque, ultimo_contato_real, pessoas(nome, empresa, email, telefone)"
    );

  type Pessoa = { nome: string; empresa: string | null; email: string | null; telefone: string | null };

  const cards: CardPipeline[] = (data ?? []).map((c) => {
    const pessoas = c.pessoas as unknown as Pessoa | Pessoa[] | null;
    const p = Array.isArray(pessoas) ? pessoas[0] : pessoas;
    const dias = diasDesde(c.ultimo_contato_real);
    const teto = TETO_POR_ESTAGIO[c.estagio];
    return {
      id: c.id,
      pessoaId: c.pessoa_id,
      estagio: c.estagio,
      valor_min: c.valor_min,
      valor_max: c.valor_max,
      temperatura: c.temperatura,
      tipo_projeto: c.tipo_projeto,
      proximo_passo: c.proximo_passo,
      data_proximo_toque: c.data_proximo_toque,
      dias,
      parado: dias !== null && teto !== undefined && dias > teto,
      nome: p?.nome ?? "sem nome",
      empresa: p?.empresa ?? null,
      email: p?.email ?? null,
      telefone: p?.telefone ?? null,
    };
  });

  const parados = cards.filter((c) => c.parado).length;

  return (
    <div>
      <PageTitle
        titulo="Pipeline"
        nota={
          error
            ? undefined
            : `${cards.length} card${cards.length === 1 ? "" : "s"}${parados > 0 ? ` · ${parados} além do teto` : ""}`
        }
      />

      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/pipeline",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${cards.length}`,
          },
        ]}
      />

      {error && <p className="text-[15px] text-alerta">estou cego: {error.message}</p>}
      {!error && cards.length === 0 && <p className="text-[15px] text-suave">pipeline vazio.</p>}
      {!error && cards.length > 0 && <PipelineView cards={cards} />}

      <p className="mt-6 text-[11px] text-suave">
        contagem de dias cobre e-mail e LinkedIn · WhatsApp e telefone são canais cegos, entram
        só via /registrar
      </p>
    </div>
  );
}
