import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";

export const dynamic = "force-dynamic";

const TETO: Record<string, number> = {
  negociacao: 2,
  proposta: 3,
  levantamento: 5,
  "primeiro contato": 7,
  nutricao: 30,
};

const ORDEM_ESTAGIOS = [
  "negociacao",
  "proposta",
  "levantamento",
  "primeiro contato",
  "nutricao",
  "fechado",
];

function moeda(v: number) {
  return v.toLocaleString("pt-BR");
}

function diasDesde(data: string | null) {
  if (!data) return null;
  return Math.floor((Date.now() - new Date(data).getTime()) / 86_400_000);
}

export default async function VisaoPage() {
  const supabase = createAdminClient();
  const [pipeline, aprovacoes, financeiro, interacoes] = await Promise.all([
    supabase
      .from("pipeline")
      .select("id, estagio, valor_min, ultimo_contato_real, pessoas(nome)"),
    supabase
      .from("aprovacoes")
      .select("id", { count: "exact", head: true })
      .eq("status", "parado"),
    supabase.from("financeiro").select("id, valor, vencimento, status, tipo"),
    supabase
      .from("interacoes")
      .select("id, data, canal, resumo, origem_do_registro, pessoas(nome)")
      .order("data", { ascending: false })
      .limit(6),
  ]);

  const erro = pipeline.error || financeiro.error || interacoes.error;

  const cards = pipeline.data ?? [];
  const ativos = cards.filter((c) => !["fechado", "perdido"].includes(c.estagio));
  const valorAberto = ativos.reduce((acc, c) => acc + Number(c.valor_min ?? 0), 0);
  const parados = ativos.filter((c) => {
    const dias = diasDesde(c.ultimo_contato_real);
    const teto = TETO[c.estagio];
    return dias !== null && teto !== undefined && dias > teto;
  });

  const hoje = new Date();
  const diasAte = (v: string) =>
    Math.floor((new Date(v).getTime() - hoje.getTime()) / 86_400_000);
  const aReceber = (financeiro.data ?? []).filter((f) => f.status === "a receber");
  const em30 = aReceber.filter((f) => diasAte(f.vencimento) >= 0 && diasAte(f.vencimento) <= 30);
  const vencido = aReceber.filter((f) => diasAte(f.vencimento) < 0);
  const somar = (l: typeof aReceber) => l.reduce((acc, f) => acc + Number(f.valor), 0);

  const funil = ORDEM_ESTAGIOS.map(
    (e) => [e, cards.filter((c) => c.estagio === e).length] as const
  ).filter(([, n]) => n > 0);
  const maxFunil = Math.max(1, ...funil.map(([, n]) => n));

  const pendentes = aprovacoes.count ?? 0;

  return (
    <div>
      <PageTitle titulo="Visão geral" nota={new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "numeric", month: "long" })} />

      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/pipeline+aprovacoes+financeiro+interacoes",
            status: erro ? "falhou" : "lido",
            detalhe: erro ? erro.message : "completo",
          },
        ]}
      />

      {erro && <p className="text-[15px] text-alerta">estou cego: {erro.message}</p>}

      {!erro && (
        <>
          {/* ── linha de destaque ────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/pipeline"
              className="rise group rounded-2xl bg-salvia p-5 text-superficie shadow-[0_4px_20px_rgba(74,93,67,0.25)] transition-transform hover:-translate-y-0.5 sm:col-span-2"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-80">
                  pipeline aberto
                </span>
                {parados.length > 0 && (
                  <span className="rounded-full bg-papel/20 px-2 py-0.5 font-mono text-[11px] tabular-nums">
                    {parados.length} além do teto
                  </span>
                )}
              </div>
              <div className="mt-3 font-mono text-[38px] font-medium tabular-nums leading-none tracking-tight">
                R$ {moeda(valorAberto)}
              </div>
              <div className="mt-2 text-[13px] opacity-80">
                {ativos.length} lead{ativos.length === 1 ? "" : "s"} em negociação
              </div>
            </Link>

            <Link
              href="/aprovacoes"
              className={`rise rounded-2xl border p-5 transition-transform hover:-translate-y-0.5 ${
                pendentes > 0
                  ? "border-tinta/20 bg-tinta text-papel"
                  : "border-superficie-2 bg-superficie"
              }`}
              style={{ animationDelay: "60ms" }}
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.14em] ${pendentes > 0 ? "opacity-80" : "text-suave"}`}
              >
                aprovações
              </span>
              <div className="mt-3 font-mono text-[38px] font-medium tabular-nums leading-none tracking-tight">
                {pendentes}
              </div>
              <div className={`mt-2 text-[13px] ${pendentes > 0 ? "opacity-80" : "text-suave"}`}>
                {pendentes === 0 ? "fila limpa" : "esperando o seu ok"}
              </div>
            </Link>
          </div>

          {/* ── dinheiro ─────────────────────────────────── */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Link
              href="/financeiro"
              className="rise rounded-2xl border border-superficie-2 bg-superficie p-5 transition-transform hover:-translate-y-0.5"
              style={{ animationDelay: "120ms" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-suave">
                a receber · 30d
              </span>
              <div className="mt-3 font-mono text-[26px] font-medium tabular-nums leading-none tracking-tight">
                R$ {moeda(somar(em30))}
              </div>
            </Link>
            <Link
              href="/financeiro"
              className={`rise rounded-2xl border p-5 transition-transform hover:-translate-y-0.5 ${
                vencido.length > 0
                  ? "border-alerta/40 bg-alerta/10"
                  : "border-superficie-2 bg-superficie"
              }`}
              style={{ animationDelay: "180ms" }}
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.14em] ${vencido.length > 0 ? "text-alerta" : "text-suave"}`}
              >
                vencido
              </span>
              <div
                className={`mt-3 font-mono text-[26px] font-medium tabular-nums leading-none tracking-tight ${vencido.length > 0 ? "text-alerta" : ""}`}
              >
                R$ {moeda(somar(vencido))}
              </div>
            </Link>
          </div>

          {/* ── funil + atividade ────────────────────────── */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div
              className="rise rounded-2xl border border-superficie-2 bg-superficie p-5"
              style={{ animationDelay: "240ms" }}
            >
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-suave">
                funil por estágio
              </div>
              {funil.length === 0 ? (
                <p className="text-[13px] text-suave">pipeline vazio.</p>
              ) : (
                <div className="space-y-3">
                  {funil.map(([estagio, n]) => (
                    <div key={estagio} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 truncate text-[13px] text-suave">
                        {estagio}
                      </span>
                      <div className="h-5 flex-1 overflow-hidden rounded-md bg-papel">
                        <div
                          className={`h-full rounded-md ${estagio === "fechado" ? "bg-tinta/70" : "bg-salvia"}`}
                          style={{ width: `${(n / maxFunil) * 100}%` }}
                        />
                      </div>
                      <span className="w-6 text-right font-mono text-[13px] tabular-nums">
                        {n}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-4 text-[11px] text-suave">
                contagem crua — percentual só quando houver volume
              </p>
            </div>

            <div
              className="rise rounded-2xl border border-superficie-2 bg-superficie p-5"
              style={{ animationDelay: "300ms" }}
            >
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-suave">
                atividade recente
              </div>
              {(interacoes.data?.length ?? 0) === 0 ? (
                <p className="text-[13px] text-suave">
                  nenhuma interação registrada ainda — /registrar e /pos-reuniao alimentam
                  esta lista.
                </p>
              ) : (
                <div className="space-y-3">
                  {interacoes.data?.map((it) => {
                    const pessoas = it.pessoas as unknown as
                      | { nome: string }
                      | { nome: string }[]
                      | null;
                    const nome = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
                    return (
                      <div key={it.id} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 rounded-md bg-papel px-1.5 py-0.5 font-mono text-[10px] uppercase text-suave">
                          {it.canal}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[13px] font-medium">{nome ?? "—"}</span>
                          <p className="truncate text-[12px] text-suave">{it.resumo}</p>
                        </div>
                        <span className="ml-auto shrink-0 font-mono text-[11px] tabular-nums text-suave">
                          {new Date(it.data).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
