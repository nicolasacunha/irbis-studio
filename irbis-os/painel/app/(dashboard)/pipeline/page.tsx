import { createAdminClient } from "@/lib/supabase/admin";
import { FronteiraDados } from "@/lib/fronteira";

export const dynamic = "force-dynamic";

const TETO_POR_ESTAGIO: Record<string, number> = {
  negociacao: 2,
  proposta: 3,
  levantamento: 5,
  "primeiro contato": 7,
  nutricao: 30,
};

function diasDesde(data: string | null) {
  if (!data) return null;
  const ms = Date.now() - new Date(data).getTime();
  return Math.floor(ms / 86_400_000);
}

export default async function PipelinePage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pipeline")
    .select("id, estagio, valor_min, valor_max, temperatura, proximo_passo, ultimo_contato_real, degrau_escada, pessoas(nome)")
    .order("estagio");

  const porEstagio = new Map<string, typeof data>();
  data?.forEach((row) => {
    const lista = porEstagio.get(row.estagio) ?? [];
    lista.push(row);
    porEstagio.set(row.estagio, lista as never);
  });

  return (
    <div>
      <FronteiraDados
        leituras={[
          {
            fonte: "Supabase — pipeline",
            status: error ? "falhou" : "lido",
            detalhe: error ? error.message : `${data?.length ?? 0} cards`,
          },
        ]}
      />
      <h1 className="mb-4 text-base font-medium text-neutral-100">Funil</h1>
      {error && <p className="text-sm text-red-400">estou cego: {error.message}</p>}
      {!error && (data?.length ?? 0) === 0 && (
        <p className="text-sm text-neutral-500">
          pipeline vazio — migração do CRM (Notion) ainda pendente.
        </p>
      )}
      <div className="space-y-6">
        {Array.from(porEstagio.entries()).map(([estagio, cards]) => (
          <div key={estagio}>
            <h2 className="mb-2 text-sm font-medium text-neutral-300">
              {estagio} · {cards?.length ?? 0}
            </h2>
            <div className="space-y-2">
              {cards?.map((c) => {
                const pessoas = c.pessoas as unknown as { nome: string } | { nome: string }[] | null;
                const nome = Array.isArray(pessoas) ? pessoas[0]?.nome : pessoas?.nome;
                const dias = diasDesde(c.ultimo_contato_real);
                const teto = TETO_POR_ESTAGIO[estagio];
                const parado = dias !== null && teto !== undefined && dias > teto;
                return (
                  <div
                    key={c.id}
                    className={`rounded-md border p-3 text-sm ${
                      parado ? "border-red-900 bg-red-950/30" : "border-neutral-800 bg-neutral-900/40"
                    }`}
                  >
                    <div className="flex justify-between text-neutral-200">
                      <span>{nome ?? "sem nome"}</span>
                      <span className="text-neutral-500">
                        {c.valor_min ? `R$${c.valor_min}-${c.valor_max}` : "faixa não definida"}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {dias === null ? "sem contato registrado" : `${dias}d desde o último contato (cobertos: e-mail, LinkedIn · cegos: WhatsApp, telefone)`}
                      {parado && " · além do teto do estágio"}
                    </div>
                    <div className="mt-1 text-xs text-neutral-600">
                      próximo passo: {c.proximo_passo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
