import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";
import { ProjetosBoard, type ProjetoBoard, type PessoaOpcao } from "./board";

export const dynamic = "force-dynamic";

function diasDesde(data: string | null) {
  if (!data) return null;
  return Math.floor((Date.now() - new Date(data).getTime()) / 86_400_000);
}

export default async function ProjetosPage() {
  const supabase = createAdminClient();
  const [proj, pess, portais, ativ] = await Promise.all([
    supabase
      .from("projetos")
      .select(
        "id, nome, tipo, status, descricao, travado_por, travado_desde, prazo_prometido, data_inicio_real, data_entrega_real, escopo_url, pacote_ativo, proxima_camada, pessoa_id, visivel_portal, pessoas(nome), marcos(id, nome, data_planejada, data_real, ordem), financeiro(id, valor, vencimento, status)"
      )
      .order("nome"),
    supabase.from("pessoas").select("id, nome").order("nome"),
    supabase.from("portais").select("id, pessoa_id, slug, ativo, mensagem, titulo, url_externa"),
    supabase
      .from("interacoes")
      .select("id, data, resumo, projeto_id")
      .not("projeto_id", "is", null)
      .order("data", { ascending: false })
      .limit(100),
  ]);

  const error = proj.error || pess.error || ativ.error;

  type Marco = {
    id: string;
    nome: string;
    data_planejada: string | null;
    data_real: string | null;
    ordem: number;
  };

  const projetos: ProjetoBoard[] = (proj.data ?? []).map((p) => {
    const pessoas = p.pessoas as unknown as { nome: string } | { nome: string }[] | null;
    const cliente = (Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome) ?? null;
    const marcos = ((p.marcos ?? []) as Marco[]).sort((a, b) => a.ordem - b.ordem);
    type Parcela = { id: string; valor: number; vencimento: string; status: string };
    return {
      id: p.id,
      nome: p.nome,
      cliente,
      pessoaId: p.pessoa_id,
      tipo: p.tipo,
      status: p.status,
      descricao: p.descricao,
      travadoPor: p.travado_por,
      diasTravado: diasDesde(p.travado_desde),
      prazoPrometido: p.prazo_prometido,
      inicioReal: p.data_inicio_real,
      entregaReal: p.data_entrega_real,
      escopoUrl: p.escopo_url,
      pacoteAtivo: p.pacote_ativo,
      proximaCamada: p.proxima_camada,
      marcos: marcos.map((m) => ({
        id: m.id,
        nome: m.nome,
        feito: m.data_real !== null,
        data: m.data_real ?? m.data_planejada,
      })),
      atividade: (ativ.data ?? [])
        .filter((a) => a.projeto_id === p.id)
        .map((a) => ({ id: a.id, data: a.data, resumo: a.resumo })),
      parcelas: ((p.financeiro ?? []) as Parcela[]).map((f) => ({
        id: f.id,
        valor: Number(f.valor),
        vencimento: f.vencimento,
        status: f.status,
      })),
      portal:
        (portais.data ?? [])
          .filter((pt) => pt.pessoa_id === p.pessoa_id)
          .map((pt) => ({
            id: pt.id,
            slug: pt.slug,
            ativo: pt.ativo,
            mensagem: pt.mensagem,
            titulo: pt.titulo,
            urlExterna: pt.url_externa,
          }))[0] ?? null,
      visivelPortal: p.visivel_portal,
    };
  });

  const pessoasOpcoes: PessoaOpcao[] = pess.data ?? [];

  return (
    <div>
      <PageTitle
        titulo="Projetos"
        nota={
          error
            ? undefined
            : `${projetos.length} projeto${projetos.length === 1 ? "" : "s"} · arrasta pra mover · clica pra abrir`
        }
      />
      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/projetos+marcos+interacoes",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${projetos.length}`,
          },
        ]}
      />
      {error && <p className="text-[15px] text-alerta">estou cego: {error.message}</p>}
      {!error && <ProjetosBoard projetos={projetos} pessoas={pessoasOpcoes} />}
    </div>
  );
}
