import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";

export const dynamic = "force-dynamic";

function diasDesde(data: string | null) {
  if (!data) return null;
  return Math.floor((Date.now() - new Date(data).getTime()) / 86_400_000);
}

export default async function TravasPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projetos")
    .select("id, nome, travado_por, travado_desde, pessoas(nome)")
    .not("travado_por", "is", null)
    .order("travado_desde", { ascending: true });

  const n = data?.length ?? 0;

  return (
    <div>
      <PageTitle titulo="Travas" nota={error ? undefined : n === 0 ? "nada travado" : `${n} ativa${n === 1 ? "" : "s"}`} />

      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/projetos travados",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${n}`,
          },
        ]}
      />

      {error && <p className="text-[15px] text-alerta">estou cego: {error.message}</p>}
      {!error && n === 0 && (
        <div className="rounded-2xl border border-dashed border-superficie-2 px-6 py-16 text-center">
          <div className="mx-auto mb-4 h-2.5 w-2.5 rounded-full bg-salvia" />
          <p className="text-[15px] text-suave">nenhum projeto travado agora.</p>
        </div>
      )}

      <div className="space-y-2.5">
        {data?.map((p, i) => {
          const pessoas = p.pessoas as unknown as { nome: string } | { nome: string }[] | null;
          const cliente = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
          const dias = diasDesde(p.travado_desde);
          return (
            <div
              key={p.id}
              className="rise flex items-center gap-4 rounded-xl border border-alerta/40 bg-alerta/10 px-4 py-4"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-14 shrink-0 text-center">
                <div className="font-mono text-[24px] font-semibold tabular-nums leading-tight text-alerta">
                  {dias ?? "?"}
                </div>
                <div className="font-mono text-[10px] uppercase text-suave">dias</div>
              </div>
              <div className="min-w-0">
                <div className="truncate text-[16px] font-semibold tracking-tight">
                  {p.nome} <span className="font-normal text-suave">· {cliente ?? "cliente?"}</span>
                </div>
                <div className="mt-0.5 text-[13px] text-suave">
                  travado por <span className="font-medium text-alerta">{p.travado_por}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
