import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";
import { PageTitle } from "@/lib/page-title";
import { AprovacaoCard } from "./aprovacao-card";

export const dynamic = "force-dynamic";

export default async function AprovacoesPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("aprovacoes")
    .select("id, identificador, gatilho, canal, corpo, pessoas(nome)")
    .eq("status", "parado")
    .order("criado_em", { ascending: true });

  const n = data?.length ?? 0;

  return (
    <div>
      <PageTitle
        titulo="Aprovações"
        nota={error ? undefined : n === 0 ? "fila limpa" : `${n} parado${n === 1 ? "" : "s"}`}
      />

      <FronteiraDados
        leituras={[
          {
            fonte: "supabase/aprovacoes",
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
            nada esperando por você. As rotinas gravam aqui quando algo precisar de aprovação.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {data?.map((row, i) => {
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
              indice={i}
            />
          );
        })}
      </div>
    </div>
  );
}
