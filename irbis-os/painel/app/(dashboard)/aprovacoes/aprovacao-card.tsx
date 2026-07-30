"use client";

import { useRef, useState, useTransition } from "react";
import { aprovar, descartar } from "./actions";

type Props = {
  id: string;
  identificador: string;
  gatilho: string;
  canal: string | null;
  corpo: string;
  nomePessoa: string | null;
  indice: number;
};

export function AprovacaoCard({
  id,
  identificador,
  gatilho,
  canal,
  corpo,
  nomePessoa,
  indice,
}: Props) {
  const [texto, setTexto] = useState(corpo);
  const [editando, setEditando] = useState(false);
  const [pending, startTransition] = useTransition();
  const cardRef = useRef<HTMLDivElement>(null);

  function atalhos(e: React.KeyboardEvent) {
    // atalhos só valem com o card focado e fora do modo edição
    if (editando || pending) return;
    if (e.target instanceof HTMLTextAreaElement) return;
    const k = e.key.toLowerCase();
    if (k === "a") startTransition(() => aprovar(id, texto));
    if (k === "e") setEditando(true);
    if (k === "x") startTransition(() => descartar(id));
  }

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onKeyDown={atalhos}
      className="rise rounded-2xl border border-superficie-2 bg-superficie shadow-[0_1px_3px_rgba(38,37,31,0.06)] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-salvia hover:shadow-[0_4px_16px_rgba(38,37,31,0.08)]"
      style={{ animationDelay: `${indice * 60}ms` }}
    >
      {/* cabeçalho: quem e por onde */}
      <div className="flex items-center gap-3 border-b border-superficie-2 px-5 py-3.5">
        <span className="font-mono text-[13px] font-medium text-salvia">[{identificador}]</span>
        <span className="truncate text-[16px] font-semibold tracking-tight">
          {nomePessoa ?? "sem pessoa vinculada"}
        </span>
        <span className="ml-auto shrink-0 rounded-md bg-papel px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-suave">
          {canal ?? "canal?"}
        </span>
      </div>

      {/* gatilho: por que este rascunho existe */}
      <div className="px-5 pt-3.5 text-[13px] leading-snug text-suave">{gatilho}</div>

      {/* corpo da mensagem */}
      <div className="px-5 py-4">
        {editando ? (
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={7}
            autoFocus
            className="w-full rounded-xl border border-superficie-2 bg-papel p-4 text-[15px] leading-relaxed focus:border-salvia focus:outline-none"
          />
        ) : (
          <p className="whitespace-pre-wrap rounded-xl bg-papel px-4 py-3.5 text-[15px] leading-relaxed">
            {texto}
          </p>
        )}
      </div>

      {/* ações */}
      <div className="flex items-center gap-2 px-5 pb-4">
        <button
          disabled={pending}
          onClick={() => startTransition(() => aprovar(id, texto))}
          className="inline-flex items-center gap-2 rounded-lg bg-salvia px-4 py-2 text-[14px] font-medium text-superficie transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {editando ? "aprovar com a edição" : "aprovar"}
          <span className="kbd">A</span>
        </button>
        {!editando && (
          <button
            onClick={() => setEditando(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-superficie-2 px-4 py-2 text-[14px] transition-colors hover:border-suave"
          >
            editar
            <span className="kbd">E</span>
          </button>
        )}
        <button
          disabled={pending}
          onClick={() => startTransition(() => descartar(id))}
          className="ml-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] text-suave transition-colors hover:text-alerta disabled:opacity-50"
        >
          descartar
          <span className="kbd">X</span>
        </button>
      </div>
    </div>
  );
}
