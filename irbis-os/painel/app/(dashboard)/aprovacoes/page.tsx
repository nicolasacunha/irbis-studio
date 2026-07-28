import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { AprovacaoCard } from "./aprovacao-card";

export const dynamic = "force-dynamic";

export default async function AprovacoesPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("aprovacoes")
    .select("id, identificador, gatilho, canal, corpo, pessoas(nome)")
    .eq("status", "parado")
    .order("criado_em", { ascending: true });

  return (
    <div>
      <FronteiraDados
        leituras={[
          {
            fonte: "Supabase — aprovacoes",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${data?.length ?? 0} rascunhos parados`,
          },
        ]}
      />
      <h1 className="mb-4 text-base font-medium text-neutral-100">
        O que está esperando por você
      </h1>
      {error && <p className="text-sm text-red-400">estou cego: {error.message}</p>}
      {!error && (data?.length ?? 0) === 0 && (
        <p className="text-sm text-neutral-500">
          nenhum rascunho parado. Se o banco está vazio (migração pendente), isso é esperado,
          não é bug.
        </p>
      )}
      <div className="space-y-3">
        {data?.map((row) => {
          const pessoas = row.pessoas as unknown as { nome: string } | { nome: string }[] | null;
          const nomePessoa = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
          return (
            <AprovacaoCard
              key={row.id}
              id={row.id}
              identificador={row.identificador}
              gatilho={row.gatilho}
              canal={row.canal}
              corpo={row.corpo}
              nomePessoa={nomePessoa ?? null}
            />
          );
        })}
      </div>
    </div>
  );
}
