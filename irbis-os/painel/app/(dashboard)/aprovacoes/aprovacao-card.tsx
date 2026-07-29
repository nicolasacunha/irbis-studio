"use client";

import { useState, useTransition } from "react";
import { aprovar, descartar } from "./actions";

type Props = {
  id: string;
  identificador: string;
  gatilho: string;
  canal: string | null;
  corpo: string;
  nomePessoa: string | null;
};

export function AprovacaoCard({ id, identificador, gatilho, canal, corpo, nomePessoa }: Props) {
  const [texto, setTexto] = useState(corpo);
  const [editando, setEditando] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-900/40 p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
        <span>
          [{identificador}] · {nomePessoa ?? "sem pessoa vinculada"} · {canal ?? "canal não informado"}
        </span>
      </div>
      <div className="mb-3 text-xs text-neutral-500">gatilho: {gatilho}</div>
      {editando ? (
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={6}
          className="mb-3 w-full rounded-md border border-neutral-700 bg-neutral-950 p-2 text-sm text-neutral-100"
        />
      ) : (
        <p className="mb-3 whitespace-pre-wrap rounded-md bg-neutral-950 p-3 text-sm text-neutral-200">
          {texto}
        </p>
      )}
      <div className="flex gap-2 text-sm">
        <button
          disabled={pending}
          onClick={() => startTransition(() => aprovar(id, texto))}
          className="rounded-md bg-neutral-100 px-3 py-1.5 font-medium text-neutral-950 disabled:opacity-50"
        >
          {editando ? "aprovar com a edição" : "aprovar"}
        </button>
        {!editando && (
          <button
            onClick={() => setEditando(true)}
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-neutral-300"
          >
            editar
          </button>
        )}
        <button
          disabled={pending}
          onClick={() => startTransition(() => descartar(id))}
          className="rounded-md border border-neutral-800 px-3 py-1.5 text-neutral-500 disabled:opacity-50"
        >
          descartar
        </button>
      </div>
    </div>
  );
}
