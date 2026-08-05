import { createAdminClient } from "@/lib/supabase/admin";
import { DEPARTAMENTOS, type DepartamentoId } from "@/lib/agentes-departamentos";
import { getCompanyBrainMemoria } from "@/lib/expert-brain";
import { AuroraMap, type Job, type BrainFact } from "./aurora-map";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agentes · Sistema OS · IRBIS" };

type Row = {
  departamento: DepartamentoId;
  titulo: string;
  skill: string | null;
  nivel_automacao: "ai" | "assisted" | "human";
  ordem: number;
};

export default async function AgentesPage() {
  const supabase = createAdminClient();

  const [jobsRes, pessoasRes, carteiraRes, memoria] = await Promise.all([
    supabase
      .from("agentes_jobs")
      .select("departamento, titulo, skill, nivel_automacao, ordem")
      .order("ordem", { ascending: true }),
    supabase.from("pessoas").select("id", { count: "exact", head: true }),
    supabase.from("projetos").select("id", { count: "exact", head: true }).eq("status", "carteira"),
    getCompanyBrainMemoria(),
  ]);

  const rows = (jobsRes.data ?? []) as Row[];

  const jobsPorDepartamento = DEPARTAMENTOS.reduce(
    (acc, dept) => {
      acc[dept.id] = rows
        .filter((r) => r.departamento === dept.id)
        .map((r): Job => ({ titulo: r.titulo, skill: r.skill, nivel_automacao: r.nivel_automacao }));
      return acc;
    },
    {} as Record<DepartamentoId, Job[]>
  );

  const totalJobs = rows.length;
  const comSkill = rows.filter((r) => r.skill).length;
  const rodandoSozinho = rows.filter((r) => r.nivel_automacao === "ai").length;

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
      rodandoSozinho={rodandoSozinho}
    />
  );
}
