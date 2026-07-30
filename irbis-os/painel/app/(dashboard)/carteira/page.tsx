import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";

export const dynamic = "force-dynamic";

function diasDesde(data: string | null) {
  if (!data) return null;
  return Math.floor((Date.now() - new Date(data).getTime()) / 86_400_000);
}

export default async function CarteiraPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projetos")
    .select(
      "id, nome, pacote_ativo, proxima_camada, ultimo_toque_valor, data_entrega_real, pessoas(nome, papel)"
    )
    .eq("status", "carteira");

  const n = data?.length ?? 0;

  return (
    <div>
      <PageTitle
        titulo="Carteira"
        nota={error ? undefined : `${n} cliente${n === 1 ? "" : "s"} ativo${n === 1 ? "" : "s"}`}
      />

      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/projetos em carteira",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${n}`,
          },
        ]}
      />

      {error && <p className="text-[15px] text-alerta">estou cego: {error.message}</p>}
      {!error && n === 0 && (
        <div className="rounded-2xl border border-dashed border-superficie-2 px-6 py-16 text-center">
          <div className="mx-auto mb-4 h-2.5 w-2.5 rounded-full bg-salvia" />
          <p className="mx-auto max-w-sm text-[15px] leading-relaxed text-suave">
            nenhum cliente em carteira ainda. Projeto entregue entra aqui, e o vigia de 60/90
            dias passa a contar.
          </p>
        </div>
      )}

      <div className="space-y-2.5">
        {data?.map((p, i) => {
          const pessoas = p.pessoas as unknown as { nome: string } | { nome: string }[] | null;
          const cliente = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
          const dias = diasDesde(p.ultimo_toque_valor ?? p.data_entrega_real);
          const alerta = dias !== null && dias >= 60;
          return (
            <div
              key={p.id}
              className={`rise flex items-center gap-4 rounded-xl border px-4 py-4 ${
                alerta ? "border-alerta/40 bg-alerta/10" : "border-superficie-2 bg-superficie"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-14 shrink-0 text-center">
                <div
                  className={`font-mono text-[24px] font-semibold tabular-nums leading-tight ${alerta ? "text-alerta" : ""}`}
                >
                  {dias ?? "—"}
                </div>
                <div className="font-mono text-[10px] uppercase text-suave">
                  {dias === null ? "sem toque" : "dias"}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[16px] font-semibold tracking-tight">
                  {cliente ?? p.nome}
                </div>
                <div className="mt-0.5 text-[13px] text-suave">
                  {p.proxima_camada ? `próxima camada: ${p.proxima_camada}` : "sem próxima camada definida"}
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-papel px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-suave">
                {p.pacote_ativo ?? "sem pacote"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
