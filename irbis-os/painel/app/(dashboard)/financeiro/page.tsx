import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";

export const dynamic = "force-dynamic";

function moeda(v: number) {
  return v.toLocaleString("pt-BR");
}

export default async function FinanceiroPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("financeiro")
    .select("id, valor, vencimento, status, tipo, projetos(nome, pessoas(nome))")
    .order("vencimento", { ascending: true });

  const hoje = new Date();
  const dias = (v: string) => Math.floor((new Date(v).getTime() - hoje.getTime()) / 86_400_000);

  const aReceber = (data ?? []).filter((f) => f.status === "a receber");
  const vencido = aReceber.filter((f) => dias(f.vencimento) < 0);
  const em30 = aReceber.filter((f) => dias(f.vencimento) >= 0 && dias(f.vencimento) <= 30);
  const em60 = aReceber.filter((f) => dias(f.vencimento) > 30 && dias(f.vencimento) <= 60);
  const em90 = aReceber.filter((f) => dias(f.vencimento) > 60 && dias(f.vencimento) <= 90);
  const somar = (l: typeof aReceber) => l.reduce((acc, f) => acc + Number(f.valor), 0);
  const mrr = aReceber.filter((f) => f.tipo === "recorrencia");

  const tiles = [
    { label: "a receber · 30d", valor: somar(em30), extra: `${em30.length} parcelas` },
    { label: "a receber · 60d", valor: somar(em60), extra: `${em60.length} parcelas` },
    { label: "a receber · 90d", valor: somar(em90), extra: `${em90.length} parcelas` },
  ];

  return (
    <div>
      <PageTitle titulo="Financeiro" nota={error ? undefined : `${aReceber.length} em aberto`} />

      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/financeiro",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${data?.length ?? 0}`,
          },
          {
            fonte: "open finance",
            status: "falhou",
            detalhe: "conciliação roda na rotina de sexta 16h, não aqui",
          },
        ]}
      />

      {error && <p className="text-[15px] text-alerta">estou cego: {error.message}</p>}

      {!error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiles.map((t, i) => (
            <div
              key={t.label}
              className="rise rounded-2xl border border-superficie-2 bg-superficie p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-suave">
                {t.label}
              </div>
              <div className="mt-2 font-mono text-[30px] font-medium tabular-nums tracking-tight">
                R$ {moeda(t.valor)}
              </div>
              <div className="mt-1 text-[12px] text-suave">{t.extra}</div>
            </div>
          ))}

          <div
            className={`rise rounded-2xl border p-5 ${
              vencido.length > 0
                ? "border-alerta/40 bg-alerta/10"
                : "border-superficie-2 bg-superficie"
            }`}
            style={{ animationDelay: "180ms" }}
          >
            <div
              className={`font-mono text-[11px] uppercase tracking-[0.12em] ${vencido.length > 0 ? "text-alerta" : "text-suave"}`}
            >
              vencido
            </div>
            <div
              className={`mt-2 font-mono text-[30px] font-medium tabular-nums tracking-tight ${vencido.length > 0 ? "text-alerta" : ""}`}
            >
              R$ {moeda(somar(vencido))}
            </div>
            <div className="mt-1 text-[12px] text-suave">{vencido.length} parcelas</div>
          </div>

          <div
            className="rise rounded-2xl border border-superficie-2 bg-superficie p-5 sm:col-span-2"
            style={{ animationDelay: "240ms" }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-suave">
              mrr · recorrência a receber
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-mono text-[30px] font-medium tabular-nums tracking-tight">
                R$ {moeda(somar(mrr))}
              </span>
              <span className="text-[13px] text-suave">
                {mrr.length} cliente{mrr.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      )}

      <p className="mt-6 text-[11px] text-suave">
        incompleto por design: cobrança e conciliação rodam via skill (Fase 5) — este painel
        espelha o Supabase
      </p>
    </div>
  );
}
