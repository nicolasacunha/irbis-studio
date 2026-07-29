import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";

export const dynamic = "force-dynamic";

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

  return (
    <div>
      <FronteiraDados
        leituras={[
          {
            fonte: "Supabase — financeiro",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${data?.length ?? 0} registros`,
          },
          { fonte: "Open Finance", status: "falhou", detalhe: "conciliação roda via rotina de sexta 16h, não neste painel ainda" },
        ]}
      />
      <h1 className="mb-1 text-base font-medium text-neutral-100">Financeiro</h1>
      <p className="mb-4 text-xs text-neutral-600">
        incompleto por design — a Fase 5 cobre cobrança/conciliação via skill, este painel ainda só espelha o Supabase.
      </p>
      {error && <p className="text-sm text-red-400">estou cego: {error.message}</p>}
      {!error && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border border-neutral-800 bg-neutral-900/40 p-3">
            <div className="text-neutral-500">a receber (30d)</div>
            <div className="text-lg text-neutral-100">R$ {somar(em30).toLocaleString("pt-BR")}</div>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/40 p-3">
            <div className="text-neutral-500">a receber (60d)</div>
            <div className="text-lg text-neutral-100">R$ {somar(em60).toLocaleString("pt-BR")}</div>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/40 p-3">
            <div className="text-neutral-500">a receber (90d)</div>
            <div className="text-lg text-neutral-100">R$ {somar(em90).toLocaleString("pt-BR")}</div>
          </div>
          <div className="rounded-md border border-red-900 bg-red-950/30 p-3">
            <div className="text-neutral-500">vencido</div>
            <div className="text-lg text-neutral-100">R$ {somar(vencido).toLocaleString("pt-BR")} · {vencido.length}</div>
          </div>
          <div className="col-span-2 rounded-md border border-neutral-800 bg-neutral-900/40 p-3">
            <div className="text-neutral-500">MRR (recorrência a receber)</div>
            <div className="text-lg text-neutral-100">
              R$ {somar(mrr).toLocaleString("pt-BR")} · {mrr.length} clientes
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
