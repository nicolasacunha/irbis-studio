import { createAdminClient } from "@/lib/supabase/admin";
import { COLUNAS } from "@/lib/colunas-projeto";

export const dynamic = "force-dynamic";

/* Página PÚBLICA — o que o cliente vê pelo link. Só status + marcos, nada de
   financeiro, atividade interna ou Fronteira dos Dados. Voz da casa, assina IRBIS. */

export default async function PortalPage(props: PageProps<"/portal/[slug]">) {
  const { slug } = await props.params;
  const supabase = createAdminClient();

  const { data: portal } = await supabase
    .from("portais")
    .select("id, ativo, mensagem, pessoas(nome, empresa)")
    .eq("slug", slug)
    .single();

  const pessoas = portal?.pessoas as unknown as
    | { nome: string; empresa: string | null }
    | { nome: string; empresa: string | null }[]
    | null;
  const cliente = Array.isArray(pessoas) ? pessoas[0] : pessoas;

  if (!portal || !portal.ativo || !cliente) {
    return (
      <div className="grid-paper flex min-h-screen items-center justify-center bg-papel px-4 text-tinta">
        <div className="text-center">
          <div className="font-serif text-[15px] font-extrabold tracking-[0.18em]">IRBIS</div>
          <p className="mt-4 text-[14px] text-suave">
            este portal não está disponível. Fala com o Nicolas.
          </p>
        </div>
      </div>
    );
  }

  const { data: pessoaId } = await supabase
    .from("portais")
    .select("pessoa_id")
    .eq("id", portal.id)
    .single();

  const { data: projetos } = await supabase
    .from("projetos")
    .select("id, nome, tipo, status, prazo_prometido, marcos(nome, data_real, ordem)")
    .eq("pessoa_id", pessoaId!.pessoa_id)
    .order("nome");

  type Marco = { nome: string; data_real: string | null; ordem: number };
  const hoje = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="grid-paper min-h-screen bg-papel text-tinta">
      <div className="mx-auto max-w-2xl px-5 py-10 lg:py-16">
        {/* cabeçalho */}
        <header className="mb-10">
          <div className="font-serif text-[13px] font-extrabold tracking-[0.2em]">IRBIS</div>
          <h1 className="mt-6 font-serif text-[30px] font-bold leading-tight tracking-tight lg:text-[36px]">
            {cliente.nome}
          </h1>
          <p className="mt-2 text-[14px] text-suave">
            acompanhamento do seu projeto · atualizado em {hoje}
          </p>
          {portal.mensagem && (
            <p className="mt-5 max-w-[60ch] whitespace-pre-wrap rounded-xl border border-superficie-2 bg-superficie px-4 py-3.5 text-[14.5px] leading-relaxed">
              {portal.mensagem}
            </p>
          )}
        </header>

        {/* projetos */}
        <div className="space-y-6">
          {(projetos ?? []).map((p) => {
            const marcos = ((p.marcos ?? []) as Marco[]).sort((a, b) => a.ordem - b.ordem);
            const feitos = marcos.filter((m) => m.data_real !== null).length;
            const progresso = marcos.length > 0 ? Math.round((feitos / marcos.length) * 100) : null;
            const statusLabel = COLUNAS.find((c) => c.valor === p.status)?.label ?? p.status;
            return (
              <section
                key={p.id}
                className="overflow-hidden rounded-2xl border border-superficie-2 bg-superficie shadow-[0_2px_12px_rgba(38,37,31,0.06)]"
              >
                <div className="bg-[linear-gradient(130deg,#54684C_0%,#4A5D43_60%,#3C4B36_100%)] px-6 py-5 text-superficie">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-serif text-[20px] font-bold tracking-tight">{p.nome}</h2>
                    <span className="rounded-full bg-[#EEEDEA]/16 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                      {statusLabel}
                    </span>
                  </div>
                  {p.prazo_prometido && (
                    <div className="mt-1 text-[12.5px] text-[#EEEDEA]/70">
                      prazo combinado: {p.prazo_prometido}
                    </div>
                  )}
                </div>
                <div className="px-6 py-5">
                  {marcos.length === 0 ? (
                    <p className="text-[13.5px] text-suave">
                      as etapas deste projeto entram aqui assim que o cronograma fechar.
                    </p>
                  ) : (
                    <>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-suave">
                          etapas
                        </span>
                        <span className="font-mono text-[12px] tabular-nums text-suave">
                          {feitos} de {marcos.length} · {progresso}%
                        </span>
                      </div>
                      <div className="mb-4 h-[6px] overflow-hidden rounded-full bg-papel">
                        <div
                          className="h-full rounded-full bg-salvia"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>
                      <ol className="space-y-2.5">
                        {marcos.map((m, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span
                              className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full ${
                                m.data_real ? "bg-salvia" : "border border-tinta/20 bg-papel"
                              }`}
                            >
                              {m.data_real && (
                                <svg width="11" height="11" viewBox="0 0 12 12">
                                  <path
                                    d="M2 6.5L4.5 9L10 3"
                                    fill="none"
                                    stroke="#EEEDEA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                            <span
                              className={`text-[14.5px] ${m.data_real ? "text-suave" : ""}`}
                            >
                              {m.nome}
                            </span>
                            {m.data_real && (
                              <span className="ml-auto font-mono text-[11px] tabular-nums text-suave">
                                {new Date(m.data_real + "T00:00:00").toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                })}
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <footer className="mt-12 border-t border-superficie-2 pt-5 text-[12px] text-suave">
          <span className="font-serif font-extrabold tracking-[0.18em] text-tinta">IRBIS</span>
          <span className="mx-2">·</span>
          <a href="https://irbis.com.br" className="underline-offset-2 hover:underline">
            irbis.com.br
          </a>
        </footer>
      </div>
    </div>
  );
}
