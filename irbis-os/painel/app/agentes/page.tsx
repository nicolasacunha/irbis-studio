import { createAdminClient } from "@/lib/supabase/admin";
import { DEPARTAMENTOS, type DepartamentoId } from "@/lib/agentes-departamentos";
import { getCompanyBrainMemoria } from "@/lib/expert-brain";
import { getCreditosGateway } from "@/lib/ai-gateway";
import { AuroraMap, type Job, type BrainFact } from "./aurora-map";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agentes · Sistema OS · IRBIS" };

type Row = {
  departamento: DepartamentoId;
  titulo: string;
  skill: string | null;
  nivel_automacao: "ai" | "assisted" | "human";
  ordem: number;
  agendado: boolean;
  cron_task_id: string | null;
  ultima_execucao_real: string | null;
  proxima_execucao_real: string | null;
};

// Formata no servidor, com fuso fixo, pra não depender do relógio do browser nem gerar
// mismatch de hidratação — o mapa mostra sempre horário de Brasília, que é quando as
// rotinas de fato disparam na máquina do Nicolas.
const FMT = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function quando(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : FMT.format(d).replace(",", "");
}

export default async function AgentesPage() {
  const supabase = createAdminClient();

  const [jobsRes, pessoasRes, carteiraRes, memoria, creditos] = await Promise.all([
    supabase
      .from("agentes_jobs")
      .select(
        "departamento, titulo, skill, nivel_automacao, ordem, agendado, cron_task_id, ultima_execucao_real, proxima_execucao_real"
      )
      .order("ordem", { ascending: true }),
    supabase.from("pessoas").select("id", { count: "exact", head: true }),
    supabase.from("projetos").select("id", { count: "exact", head: true }).eq("status", "carteira"),
    getCompanyBrainMemoria(),
    getCreditosGateway(),
  ]);

  const rows = (jobsRes.data ?? []) as Row[];

  const jobsPorDepartamento = DEPARTAMENTOS.reduce(
    (acc, dept) => {
      acc[dept.id] = rows
        .filter((r) => r.departamento === dept.id)
        .map(
          (r): Job => ({
            titulo: r.titulo,
            skill: r.skill,
            nivel_automacao: r.nivel_automacao,
            agendado: r.agendado,
            cron: r.agendado
              ? {
                  taskId: r.cron_task_id,
                  ultima: quando(r.ultima_execucao_real),
                  proxima: quando(r.proxima_execucao_real),
                }
              : null,
          })
        );
      return acc;
    },
    {} as Record<DepartamentoId, Job[]>
  );

  const totalJobs = rows.length;
  const comSkill = rows.filter((r) => r.skill).length;
  const sabeSozinho = rows.filter((r) => r.nivel_automacao === "ai").length;
  const agendados = rows.filter((r) => r.agendado).length;

  const pessoasCount = pessoasRes.count ?? 0;
  const carteiraCount = carteiraRes.count ?? 0;

  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const historico = commitSha
    ? `Repositório — último deploy do commit ${commitSha.slice(0, 7)}`
    : "Repositório — specs, skills, decisões versionadas em git";

  const memoriaViva = memoria.ok
    ? `expert-brain — ${memoria.businessNotes} notas de negócio (${memoria.totalNotes} no vault todo), ${memoria.recent7d} novas nos últimos 7 dias`
    : `expert-brain (MCP) — indisponível agora (${memoria.reason})`;

  const brainFacts: BrainFact[] = [
    { k: "Memória viva", v: memoriaViva, pending: !memoria.ok },
    {
      k: "Dado operacional",
      v: `Supabase irbis-os — ${pessoasCount} pessoa${pessoasCount === 1 ? "" : "s"} no CRM, ${carteiraCount} em carteira, ${totalJobs} jobs mapeados`,
    },
    { k: "Histórico e contexto", v: historico },
    {
      k: "Consolidação",
      v: memoria.ok
        ? "Esta página já cruza os três ao vivo — falta contatos e tarefas do expert-brain virarem consulta, hoje só a contagem de notas"
        : "Ainda não existe uma camada única que cruze os três — é o maior gap do mapa",
      pending: !memoria.ok,
    },
  ];

  return (
    <AuroraMap
      jobsPorDepartamento={jobsPorDepartamento}
      brainFacts={brainFacts}
      totalJobs={totalJobs}
      comSkill={comSkill}
      sabeSozinho={sabeSozinho}
      agendados={agendados}
      creditosIniciais={creditos}
    />
  );
}
