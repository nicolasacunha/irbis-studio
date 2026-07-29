import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";

export const dynamic = "force-dynamic";

export default async function SemanaPage() {
  const supabase = createAdminClient();
  const hoje = new Date();
  const em7dias = new Date(hoje.getTime() + 7 * 86_400_000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const [marcos, financeiro, propostas] = await Promise.all([
    supabase
      .from("marcos")
      .select("id, nome, data_planejada, projetos(nome)")
      .gte("data_planejada", fmt(hoje))
      .lte("data_planejada", fmt(em7dias)),
    supabase
      .from("financeiro")
      .select("id, valor, vencimento, projetos(nome, pessoas(nome))")
      .eq("status", "a receber")
      .gte("vencimento", fmt(hoje))
      .lte("vencimento", fmt(em7dias)),
    supabase
      .from("propostas")
      .select("id, validade, pessoas(nome)")
      .eq("status", "enviada")
      .gte("validade", fmt(hoje))
      .lte("validade", fmt(em7dias)),
  ]);

  const erro = marcos.error || financeiro.error || propostas.error;

  type Item = { data: string; texto: string };
  const itens: Item[] = [
    ...(marcos.data ?? []).map((m) => {
      const proj = m.projetos as unknown as { nome: string } | { nome: string }[] | null;
      const nomeProj = Array.isArray(proj) ? proj[0]?.nome : proj?.nome;
      return { data: m.data_planejada!, texto: `marco "${m.nome}" · ${nomeProj ?? "projeto"}` };
    }),
    ...(financeiro.data ?? []).map((f) => {
      const proj = f.projetos as unknown as { nome: string; pessoas: { nome: string } | { nome: string }[] | null } | { nome: string; pessoas: { nome: string } | { nome: string }[] | null }[] | null;
      const p = Array.isArray(proj) ? proj[0] : proj;
      const pessoas = p?.pessoas;
      const nomeCliente = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
      return { data: f.vencimento, texto: `parcela R$${f.valor} · ${nomeCliente ?? "cliente"}` };
    }),
    ...(propostas.data ?? []).map((p) => {
      const pessoas = p.pessoas as unknown as { nome: string } | { nome: string }[] | null;
      const nome = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
      return { data: p.validade!, texto: `validade da proposta · ${nome ?? "lead"}` };
    }),
  ].sort((a, b) => a.data.localeCompare(b.data));

  return (
    <div>
      <FronteiraDados
        leituras={[
          {
            fonte: "Supabase — marcos, financeiro, propostas",
            status: erro ? "falhou" : "lido",
            detalhe: erro ? erro.message : `${itens.length} itens nos próximos 7 dias`,
          },
        ]}
      />
      <h1 className="mb-4 text-base font-medium text-neutral-100">O que vence essa semana</h1>
      {erro && <p className="text-sm text-red-400">estou cego: {erro.message}</p>}
      {!erro && itens.length === 0 && (
        <p className="text-sm text-neutral-500">nada vencendo nos próximos 7 dias, ou banco ainda vazio.</p>
      )}
      <div className="space-y-2">
        {itens.map((item, i) => (
          <div key={i} className="flex gap-3 rounded-md border border-neutral-800 bg-neutral-900/40 p-3 text-sm">
            <span className="w-16 shrink-0 text-neutral-500">
              {new Date(item.data + "T00:00:00").toLocaleDateString("pt-BR", { weekday: "short" })}
            </span>
            <span className="text-neutral-200">{item.texto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
