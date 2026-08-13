import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";

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

  type Item = { data: string; tipo: string; texto: string };
  const itens: Item[] = [
    ...(marcos.data ?? []).map((m) => {
      const proj = m.projetos as unknown as { nome: string } | { nome: string }[] | null;
      const nomeProj = Array.isArray(proj) ? proj[0]?.nome : proj?.nome;
      return {
        data: m.data_planejada!,
        tipo: "marco",
        texto: `${m.nome} · ${nomeProj ?? "projeto"}`,
      };
    }),
    ...(financeiro.data ?? []).map((f) => {
      const proj = f.projetos as unknown as
        | { nome: string; pessoas: { nome: string } | { nome: string }[] | null }
        | { nome: string; pessoas: { nome: string } | { nome: string }[] | null }[]
        | null;
      const p = Array.isArray(proj) ? proj[0] : proj;
      const pessoas = p?.pessoas;
      const nomeCliente = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
      return {
        data: f.vencimento,
        tipo: "parcela",
        texto: `R$ ${Number(f.valor).toLocaleString("pt-BR")} · ${nomeCliente ?? "cliente"}`,
      };
    }),
    ...(propostas.data ?? []).map((p) => {
      const pessoas = p.pessoas as unknown as { nome: string } | { nome: string }[] | null;
      const nome = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
      return { data: p.validade!, tipo: "validade", texto: `proposta · ${nome ?? "lead"}` };
    }),
  ].sort((a, b) => a.data.localeCompare(b.data));

  return (
    <div>
      <PageTitle
        titulo="Semana"
        nota={erro ? undefined : `${itens.length} ${itens.length === 1 ? "item" : "itens"} em 7 dias`}
      />

      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/marcos+financeiro+propostas",
            status: erro ? "falhou" : "lido",
            detalhe: erro ? erro.message : `${itens.length}`,
          },
        ]}
      />

      {erro && <p className="text-[15px] text-alerta">estou cego: {erro.message}</p>}
      {!erro && itens.length === 0 && (
        <div className="rounded-2xl border border-dashed border-superficie-2 px-6 py-16 text-center">
          <div className="mx-auto mb-4 h-2.5 w-2.5 rounded-full bg-salvia" />
          <p className="text-[15px] text-suave">nada vencendo nos próximos 7 dias.</p>
        </div>
      )}

      <div className="space-y-2.5">
        {itens.map((item, i) => {
          const d = new Date(item.data + "T00:00:00");
          return (
            <div
              key={i}
              className="rise flex items-center gap-4 rounded-xl border border-superficie-2 bg-superficie px-4 py-3.5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-14 shrink-0 text-center">
                <div className="font-mono text-[11px] uppercase text-suave">
                  {d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}
                </div>
                <div className="font-mono text-[20px] font-medium tabular-nums leading-tight">
                  {d.getDate()}
                </div>
              </div>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-medium tracking-tight">{item.texto}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-suave">
                  {item.tipo}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
