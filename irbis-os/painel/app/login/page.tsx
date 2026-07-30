"use client";

import { useActionState } from "react";
import { entrar } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(entrar, {
    erro: null as string | null,
  });

  return (
    <div className="grid-paper flex min-h-screen items-center justify-center bg-papel px-4 text-tinta">
      <div className="w-full max-w-sm rounded-2xl border border-superficie-2 bg-superficie p-8 shadow-[0_2px_12px_rgba(38,37,31,0.06)]">
        <div className="mb-8">
          <div className="font-serif text-[15px] font-extrabold tracking-[0.18em]">
            SISTEMA&nbsp;OS
          </div>
          <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-suave">
            irbis
          </div>
        </div>

        <form action={formAction} className="space-y-3">
          <input
            type="password"
            name="senha"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="senha"
            className="w-full rounded-lg border border-superficie-2 bg-papel px-3.5 py-2.5 text-[15px] placeholder:text-suave focus:border-salvia focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-salvia px-3.5 py-2.5 text-[15px] font-medium text-superficie transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "entrando..." : "entrar"}
          </button>
          {state.erro && <p className="text-[13px] text-alerta">{state.erro}</p>}
        </form>
      </div>
    </div>
  );
}
