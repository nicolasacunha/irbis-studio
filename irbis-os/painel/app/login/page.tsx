"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function enviarLink(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setCarregando(false);
    if (error) {
      setErro(error.message);
      return;
    }
    setEnviado(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-lg font-medium text-neutral-100">Sistema OS · IRBIS</h1>
        <p className="mb-8 text-sm text-neutral-500">Acesso só com o link enviado por e-mail.</p>

        {enviado ? (
          <p className="text-sm text-neutral-300">
            Link enviado para {email}. Abre o e-mail e clica para entrar.
          </p>
        ) : (
          <form onSubmit={enviarLink} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu e-mail"
              className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-md bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-950 disabled:opacity-50"
            >
              {carregando ? "enviando..." : "enviar link"}
            </button>
            {erro && <p className="text-sm text-red-400">{erro}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
