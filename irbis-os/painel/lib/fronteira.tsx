export type LeituraFonte = {
  fonte: string;
  status: "lido" | "falhou";
  detalhe: string;
};

export function FronteiraDados({ leituras }: { leituras: LeituraFonte[] }) {
  const hora = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  });
  const algumaFalhou = leituras.some((l) => l.status === "falhou");

  return (
    <div className="mb-6 rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs">
      <div className="mb-1 text-neutral-500">FRONTEIRA DOS DADOS · {hora}</div>
      <div className="flex flex-col gap-0.5">
        {leituras.map((l) => (
          <div
            key={l.fonte}
            className={l.status === "lido" ? "text-neutral-400" : "text-red-400"}
          >
            {l.status === "lido" ? "✅ LIDO" : "❌ FALHOU"} {l.fonte} — {l.detalhe}
          </div>
        ))}
      </div>
      {algumaFalhou && (
        <div className="mt-1 text-red-400">
          consequência: os dados dependentes da fonte que falhou estão cegos, não vazios.
        </div>
      )}
    </div>
  );
}
