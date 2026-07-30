export function PageTitle({ titulo, nota }: { titulo: string; nota?: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h1 className="font-serif text-[26px] font-bold tracking-tight lg:text-[30px]">{titulo}</h1>
      {nota && <span className="font-mono text-[12px] text-suave">{nota}</span>}
    </div>
  );
}
