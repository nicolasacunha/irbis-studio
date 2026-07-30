"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// A senha não existe em lugar nenhum deste código: vive só no Supabase Auth (hash).
// O e-mail operacional também fica só no servidor (env sem NEXT_PUBLIC_).
export async function entrar(_prev: { erro: string | null }, formData: FormData) {
  const senha = formData.get("senha");
  if (typeof senha !== "string" || senha.length === 0) {
    return { erro: "digite a senha" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.IRBIS_OPERATOR_EMAIL!,
    password: senha,
  });

  if (error) {
    return { erro: "senha incorreta" };
  }

  redirect("/visao");
}
