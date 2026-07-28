import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";

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

  return (
    <div>
      <FronteiraDados
        leituras={[
          {
            fonte: "Supabase — projetos travados",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${data?.length ?? 0} travas ativas`,
          },
        ]}
      />
      <h1 className="mb-4 text-base font-medium text-neutral-100">O que trava</h1>
      {error && <p className="text-sm text-red-400">estou cego: {error.message}</p>}
      {!error && (data?.length ?? 0) === 0 && (
        <p className="text-sm text-neutral-500">nenhum projeto travado agora, ou carteira ainda vazia.</p>
      )}
      <div className="space-y-2">
        {data?.map((p) => {
          const pessoas = p.pessoas as unknown as { nome: string } | { nome: string }[] | null;
          const cliente = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
          const dias = diasDesde(p.travado_desde);
          return (
            <div key={p.id} className="rounded-md border border-red-900 bg-red-950/30 p-3 text-sm">
              <div className="text-neutral-200">
                🔴 {p.nome} · {cliente ?? "cliente não identificado"}
              </div>
              <div className="mt-1 text-xs text-neutral-400">
                {dias !== null ? `${dias}d travado` : "data de travamento não registrada"} · travado por: {p.travado_por}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
