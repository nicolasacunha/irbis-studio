"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function aprovar(id: string, textoEditado?: string) {
  const supabase = createAdminClient();
  const { data: linha } = await supabase
    .from("aprovacoes")
    .select("corpo")
    .eq("id", id)
    .single();

  const status = textoEditado && textoEditado !== linha?.corpo ? "editado" : "aprovado";

  await supabase
    .from("aprovacoes")
    .update({
      status,
      aprovado_em: new Date().toISOString(),
      texto_enviado: textoEditado ?? linha?.corpo ?? null,
    })
    .eq("id", id);

  revalidatePath("/aprovacoes");
}

export async function descartar(id: string) {
  const supabase = createAdminClient();
  await supabase.from("aprovacoes").update({ status: "descartado" }).eq("id", id);
  revalidatePath("/aprovacoes");
}
