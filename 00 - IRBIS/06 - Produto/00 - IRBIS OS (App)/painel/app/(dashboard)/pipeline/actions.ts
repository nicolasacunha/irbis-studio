"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function moverEstagio(id: string, estagio: string, motivoPerda?: string) {
  const supabase = createAdminClient();
  await supabase
    .from("pipeline")
    .update({
      estagio,
      motivo_perda: estagio === "perdido" ? (motivoPerda ?? "outro") : null,
    })
    .eq("id", id);
  revalidatePath("/pipeline");
  revalidatePath("/visao");
}

export async function atualizarCard(
  id: string,
  campos: {
    tipo_projeto: string | null;
    valor_min: number | null;
    valor_max: number | null;
    temperatura: string | null;
    proximo_passo: string;
    data_proximo_toque: string;
  }
) {
  if (!campos.proximo_passo.trim() || !campos.data_proximo_toque) {
    return { erro: "próximo passo e data são obrigatórios — card sem próximo passo é o defeito que o sistema existe pra eliminar" };
  }
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pipeline")
    .update({ ...campos, proximo_passo: campos.proximo_passo.trim() })
    .eq("id", id);
  revalidatePath("/pipeline");
  revalidatePath("/visao");
  return { erro: error?.message ?? null };
}

export async function atualizarPessoa(
  pessoaId: string,
  campos: { nome: string; empresa: string | null; email: string | null; telefone: string | null }
) {
  if (!campos.nome.trim()) return { erro: "nome é obrigatório" };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pessoas")
    .update({
      nome: campos.nome.trim(),
      empresa: campos.empresa?.trim() || null,
      email: campos.email?.trim() || null,
      telefone: campos.telefone?.trim() || null,
    })
    .eq("id", pessoaId);
  revalidatePath("/pipeline");
  // índice único de e-mail/telefone pode recusar duplicata — devolve o erro cru
  return { erro: error?.message ?? null };
}
