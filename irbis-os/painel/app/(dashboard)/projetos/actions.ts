"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function moverStatus(id: string, novoStatus: string) {
  const supabase = createAdminClient();
  await supabase.from("projetos").update({ status: novoStatus }).eq("id", id);
  revalidatePath("/projetos");
}

export async function criarProjeto(nome: string, pessoaId: string, tipo: string, status: string) {
  if (!nome.trim() || !pessoaId) return { erro: "nome e cliente são obrigatórios" };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("projetos")
    .insert({ nome: nome.trim(), pessoa_id: pessoaId, tipo: tipo || null, status });
  revalidatePath("/projetos");
  return { erro: error?.message ?? null };
}

export async function salvarDescricao(id: string, descricao: string) {
  const supabase = createAdminClient();
  await supabase.from("projetos").update({ descricao: descricao.trim() || null }).eq("id", id);
  revalidatePath("/projetos");
}

export async function alternarMarco(marcoId: string, feito: boolean) {
  const supabase = createAdminClient();
  await supabase
    .from("marcos")
    .update({ data_real: feito ? new Date().toISOString().slice(0, 10) : null })
    .eq("id", marcoId);
  revalidatePath("/projetos");
}

export async function adicionarMarco(projetoId: string, nome: string, ordem: number) {
  if (!nome.trim()) return;
  const supabase = createAdminClient();
  await supabase.from("marcos").insert({ projeto_id: projetoId, nome: nome.trim(), ordem });
  revalidatePath("/projetos");
}

export async function excluirProjeto(id: string, incluirParcelas = false) {
  // marcos e interacoes caem em cascata; financeiro NÃO — parcela vinculada bloqueia a
  // exclusão de propósito (dinheiro não some em silêncio). Só apaga com ordem explícita.
  const supabase = createAdminClient();
  const { data: parcelas } = await supabase
    .from("financeiro")
    .select("id, valor")
    .eq("projeto_id", id);

  if ((parcelas?.length ?? 0) > 0 && !incluirParcelas) {
    const total = (parcelas ?? []).reduce((acc, p) => acc + Number(p.valor), 0);
    return { bloqueado: { n: parcelas!.length, total } };
  }
  if (incluirParcelas) {
    await supabase.from("financeiro").delete().eq("projeto_id", id);
  }
  const { error } = await supabase.from("projetos").delete().eq("id", id);
  revalidatePath("/projetos");
  revalidatePath("/financeiro");
  return { bloqueado: null, erro: error?.message ?? null };
}

export async function atualizarProjeto(
  id: string,
  campos: {
    tipo: string | null;
    prazo_prometido: string | null;
    data_inicio_real: string | null;
    data_entrega_real: string | null;
    escopo_url: string | null;
    pacote_ativo: string | null;
    proxima_camada: string | null;
    travado_por: string | null;
  }
) {
  const supabase = createAdminClient();
  const { data: atual } = await supabase
    .from("projetos")
    .select("travado_por, travado_desde")
    .eq("id", id)
    .single();

  // travado_desde acompanha a trava: seta quando trava, limpa quando destrava
  let travado_desde = atual?.travado_desde ?? null;
  if (campos.travado_por && !atual?.travado_por) {
    travado_desde = new Date().toISOString().slice(0, 10);
  } else if (!campos.travado_por) {
    travado_desde = null;
  }

  const { error } = await supabase
    .from("projetos")
    .update({ ...campos, travado_desde })
    .eq("id", id);
  revalidatePath("/projetos");
  revalidatePath("/travas");
  return { erro: error?.message ?? null };
}

function slugify(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function criarPortal(pessoaId: string, nomeCliente: string) {
  const supabase = createAdminClient();
  const base = slugify(nomeCliente) || "cliente";
  // se o slug já existir (outro cliente com nome igual), sufixa
  let slug = base;
  for (let i = 2; i <= 5; i++) {
    const { error } = await supabase.from("portais").insert({ pessoa_id: pessoaId, slug });
    if (!error) {
      revalidatePath("/projetos");
      return { slug, erro: null };
    }
    if (error.message.includes("portais_pessoa_uniq")) {
      // já existe portal pra essa pessoa — devolve o existente
      const { data } = await supabase
        .from("portais")
        .select("slug")
        .eq("pessoa_id", pessoaId)
        .single();
      return { slug: data?.slug ?? null, erro: null };
    }
    slug = `${base}-${i}`;
  }
  return { slug: null, erro: "não consegui gerar um endereço único" };
}

export async function atualizarPortal(
  portalId: string,
  campos: {
    mensagem: string | null;
    ativo: boolean;
    titulo: string | null;
    slug: string;
    url_externa: string | null;
  }
) {
  const slug = slugify(campos.slug);
  if (!slug) return { erro: "endereço não pode ficar vazio" };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("portais")
    .update({
      mensagem: campos.mensagem?.trim() || null,
      ativo: campos.ativo,
      titulo: campos.titulo?.trim() || null,
      slug,
      url_externa: campos.url_externa?.trim() || null,
    })
    .eq("id", portalId);
  revalidatePath("/projetos");
  if (error?.message.includes("duplicate")) {
    return { erro: "esse endereço já está em uso por outro portal" };
  }
  return { erro: error?.message ?? null, slug };
}

export async function anexarPortalExterno(pessoaId: string, nomeCliente: string, url: string) {
  if (!url.trim().startsWith("http")) return { erro: "url inválida" };
  const supabase = createAdminClient();
  const slug = slugify(nomeCliente) || "cliente";
  // upsert: se a pessoa já tem portal, só anexa a url; senão cria o registro
  const { data: existente } = await supabase
    .from("portais")
    .select("id")
    .eq("pessoa_id", pessoaId)
    .single();
  if (existente) {
    await supabase.from("portais").update({ url_externa: url.trim() }).eq("id", existente.id);
  } else {
    const { error } = await supabase
      .from("portais")
      .insert({ pessoa_id: pessoaId, slug, url_externa: url.trim() });
    if (error) return { erro: error.message };
  }
  revalidatePath("/projetos");
  return { erro: null };
}

export async function alternarVisibilidadePortal(projetoId: string, visivel: boolean) {
  const supabase = createAdminClient();
  await supabase.from("projetos").update({ visivel_portal: visivel }).eq("id", projetoId);
  revalidatePath("/projetos");
  return { erro: null };
}

export async function removerMarco(marcoId: string) {
  const supabase = createAdminClient();
  await supabase.from("marcos").delete().eq("id", marcoId);
  revalidatePath("/projetos");
}

export async function definirInvestimento(projetoId: string, valor: number, vencimento: string) {
  if (!valor || valor <= 0 || !vencimento) return { erro: "valor e vencimento são obrigatórios" };
  const supabase = createAdminClient();
  const { data: abertas } = await supabase
    .from("financeiro")
    .select("id")
    .eq("projeto_id", projetoId)
    .neq("status", "pago");

  if ((abertas?.length ?? 0) > 1) {
    return { erro: "este projeto tem mais de uma parcela em aberto — edita na lista abaixo" };
  }
  if ((abertas?.length ?? 0) === 1) {
    await supabase
      .from("financeiro")
      .update({ valor, vencimento })
      .eq("id", abertas![0].id);
  } else {
    await supabase.from("financeiro").insert({
      projeto_id: projetoId,
      valor,
      vencimento,
      tipo: "entrada",
      status: "a receber",
    });
  }
  revalidatePath("/projetos");
  revalidatePath("/financeiro");
  revalidatePath("/visao");
  return { erro: null };
}

export async function adicionarParcela(
  projetoId: string,
  valor: number,
  vencimento: string,
  tipo: string
) {
  if (!valor || valor <= 0 || !vencimento) return { erro: "valor e vencimento são obrigatórios" };
  const supabase = createAdminClient();
  const { error } = await supabase.from("financeiro").insert({
    projeto_id: projetoId,
    valor,
    vencimento,
    tipo,
    status: "a receber",
  });
  revalidatePath("/projetos");
  revalidatePath("/financeiro");
  revalidatePath("/visao");
  return { erro: error?.message ?? null };
}

export async function removerParcela(id: string) {
  const supabase = createAdminClient();
  // parcela paga não sai pelo card: é registro de conciliação, não rascunho
  const { data } = await supabase.from("financeiro").select("status").eq("id", id).single();
  if (data?.status === "pago") {
    return { erro: "parcela paga não pode ser removida pelo card" };
  }
  await supabase.from("financeiro").delete().eq("id", id);
  revalidatePath("/projetos");
  revalidatePath("/financeiro");
  revalidatePath("/visao");
  return { erro: null };
}

export async function comentar(projetoId: string, pessoaId: string, texto: string) {
  if (!texto.trim()) return;
  const supabase = createAdminClient();
  await supabase.from("interacoes").insert({
    pessoa_id: pessoaId,
    projeto_id: projetoId,
    canal: "outro",
    resumo: texto.trim(),
    origem_do_registro: "sistema",
  });
  revalidatePath("/projetos");
}
