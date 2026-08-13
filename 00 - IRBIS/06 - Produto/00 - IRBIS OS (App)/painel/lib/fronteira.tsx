export type LeituraFonte = {
  fonte: string;
  status: "lido" | "falhou";
  detalhe: string;
};

/* Barra de status de sistema: um dot por fonte, verde sálvia = lido, terracota = cego.
   É chrome, não prosa — lê-se pelos dots; o detalhe fica em mono, discreto. */
export function FronteiraDados({ leituras }: { leituras: LeituraFonte[] }) {
  const hora = new Date().toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
  const algumaFalhou = leituras.some((l) => l.status === "falhou");

  return (
    <div className="mb-6 rounded-lg border border-superficie-2 bg-superficie/70 px-3 py-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-suave">
        <span className="uppercase tracking-[0.1em]">fronteira</span>
        {leituras.map((l) => (
          <span key={l.fonte} className="inline-flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                l.status === "falhou" ? "animate-pulse bg-alerta" : "bg-salvia"
              }`}
            />
            <span className={l.status === "falhou" ? "text-alerta" : ""}>
              {l.fonte} · {l.detalhe}
            </span>
          </span>
        ))}
        <span className="ml-auto tabular-nums">{hora}</span>
      </div>
      {algumaFalhou && (
        <p className="mt-1 font-mono text-[11px] text-alerta">
          o que depende da fonte cega não é vazio: é desconhecido.
        </p>
      )}
    </div>
  );
}
