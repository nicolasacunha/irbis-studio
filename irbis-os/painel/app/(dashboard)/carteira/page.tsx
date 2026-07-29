import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";

export const dynamic = "force-dynamic";

function diasDesde(data: string | null) {
  if (!data) return null;
  return Math.floor((Date.now() - new Date(data).getTime()) / 86_400_000);
}

export default async function CarteiraPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projetos")
    .select("id, nome, pacote_ativo, proxima_camada, ultimo_toque_valor, data_entrega_real, pessoas(nome, papel)")
    .eq("status", "carteira");

  return (
    <div>
      <FronteiraDados
        leituras={[
          {
            fonte: "Supabase — projetos em carteira",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${data?.length ?? 0} clientes ativos`,
          },
        ]}
      />
      <h1 className="mb-4 text-base font-medium text-neutral-100">Carteira</h1>
      {error && <p className="text-sm text-red-400">estou cego: {error.message}</p>}
      {!error && (data?.length ?? 0) === 0 && (
        <p className="text-sm text-neutral-500">nenhum projeto em carteira ainda.</p>
      )}
      <div className="space-y-2">
        {data?.map((p) => {
          const pessoas = p.pessoas as unknown as { nome: string } | { nome: string }[] | null;
          const cliente = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
          const dias = diasDesde(p.ultimo_toque_valor ?? p.data_entrega_real);
          const alerta = dias !== null && dias >= 60;
          return (
            <div
              key={p.id}
              className={`rounded-md border p-3 text-sm ${
                alerta ? "border-amber-900 bg-amber-950/20" : "border-neutral-800 bg-neutral-900/40"
              }`}
            >
              <div className="flex justify-between text-neutral-200">
                <span>{cliente ?? p.nome}</span>
                <span className="text-neutral-500">{p.pacote_ativo ?? "sem pacote"}</span>
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                {dias === null ? "sem toque de valor registrado" : `${dias}d sem toque de valor`}
                {p.proxima_camada && ` · próxima camada: ${p.proxima_camada}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
