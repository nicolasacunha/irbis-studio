"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  salvarDescricao,
  alternarMarco,
  adicionarMarco,
  comentar,
  excluirProjeto,
  atualizarProjeto,
  adicionarParcela,
  removerParcela,
  definirInvestimento,
  criarPortal,
  atualizarPortal,
  anexarPortalExterno,
  alternarVisibilidadePortal,
  removerMarco,
} from "./actions";
import { COLUNAS } from "@/lib/colunas-projeto";
import type { ProjetoBoard } from "./board";

const TIPOS = ["landing page", "site institucional", "e-commerce", "sistema IA", "bot"];
const PACOTES = ["Básico", "Pro"];
const TIPOS_PARCELA = ["entrada", "marco", "recorrencia", "escopo novo"] as const;

const rotulo = "mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-suave";
const campo =
  "w-full rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none";

function Checkbox({
  marcado,
  disabled,
  onChange,
}: {
  marcado: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={marcado}
      disabled={disabled}
      onClick={() => onChange(!marcado)}
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all duration-150 ${
        marcado
          ? "border-salvia bg-salvia"
          : "border-tinta/25 bg-papel hover:border-salvia/60"
      } disabled:opacity-50`}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        className={`transition-transform duration-150 ${marcado ? "scale-100" : "scale-0"}`}
      >
        <path
          d="M2 6.5L4.5 9L10 3"
          fill="none"
          stroke="#EEEDEA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function CardModal({ projeto, aoFechar }: { projeto: ProjetoBoard; aoFechar: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editandoDesc, setEditandoDesc] = useState(false);
  const [desc, setDesc] = useState(projeto.descricao ?? "");
  const [novoItem, setNovoItem] = useState("");
  const [novoComentario, setNovoComentario] = useState("");
  const [parcelaValor, setParcelaValor] = useState("");
  const [parcelaVencimento, setParcelaVencimento] = useState("");
  const [parcelaTipo, setParcelaTipo] = useState<string>("marco");
  const [erroParcela, setErroParcela] = useState<string | null>(null);
  const [dividir, setDividir] = useState(false);
  const [portalMensagem, setPortalMensagem] = useState(projeto.portal?.mensagem ?? "");
  const [portalTitulo, setPortalTitulo] = useState(projeto.portal?.titulo ?? "");
  const [portalSlug, setPortalSlug] = useState(projeto.portal?.slug ?? "");
  const [portalUrlExterna, setPortalUrlExterna] = useState(projeto.portal?.urlExterna ?? "");
  const [anexando, setAnexando] = useState(false);
  const [urlAnexo, setUrlAnexo] = useState("");
  const [linkCopiado, setLinkCopiado] = useState(false);
  const portalSujo =
    portalMensagem !== (projeto.portal?.mensagem ?? "") ||
    portalTitulo !== (projeto.portal?.titulo ?? "") ||
    portalSlug !== (projeto.portal?.slug ?? "") ||
    portalUrlExterna !== (projeto.portal?.urlExterna ?? "");
  const portalUrl = projeto.portal
    ? projeto.portal.urlExterna || `https://portal.irbis.com.br/${projeto.portal.slug}`
    : null;

  function salvarPortal() {
    rodar(async () => {
      const r = await atualizarPortal(projeto.portal!.id, {
        mensagem: portalMensagem,
        ativo: projeto.portal!.ativo,
        titulo: portalTitulo,
        slug: portalSlug,
        url_externa: portalUrlExterna,
      });
      if (r.erro) setErroParcela(r.erro);
    });
  }

  // investimento = a parcela em aberto do projeto (edita direto; cria se não existir)
  const abertas = projeto.parcelas.filter((f) => f.status !== "pago");
  const investimentoAtual = abertas.length === 1 ? abertas[0] : null;
  const [invValor, setInvValor] = useState(investimentoAtual?.valor.toString() ?? "");
  const [invVencimento, setInvVencimento] = useState(investimentoAtual?.vencimento ?? "");
  const invSujo =
    invValor !== (investimentoAtual?.valor.toString() ?? "") ||
    invVencimento !== (investimentoAtual?.vencimento ?? "");
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [bloqueio, setBloqueio] = useState<{ n: number; total: number } | null>(null);

  // detalhes editáveis
  const [tipo, setTipo] = useState(projeto.tipo ?? "");
  const [prazo, setPrazo] = useState(projeto.prazoPrometido ?? "");
  const [inicioReal, setInicioReal] = useState(projeto.inicioReal ?? "");
  const [entregaReal, setEntregaReal] = useState(projeto.entregaReal ?? "");
  const [escopoUrl, setEscopoUrl] = useState(projeto.escopoUrl ?? "");
  const [pacote, setPacote] = useState(projeto.pacoteAtivo ?? "");
  const [proximaCamada, setProximaCamada] = useState(projeto.proximaCamada ?? "");
  const [travadoPor, setTravadoPor] = useState(projeto.travadoPor ?? "");

  const detalhesSujos =
    tipo !== (projeto.tipo ?? "") ||
    prazo !== (projeto.prazoPrometido ?? "") ||
    inicioReal !== (projeto.inicioReal ?? "") ||
    entregaReal !== (projeto.entregaReal ?? "") ||
    escopoUrl !== (projeto.escopoUrl ?? "") ||
    pacote !== (projeto.pacoteAtivo ?? "") ||
    proximaCamada !== (projeto.proximaCamada ?? "") ||
    travadoPor !== (projeto.travadoPor ?? "");

  function salvarDetalhes() {
    rodar(() =>
      atualizarProjeto(projeto.id, {
        tipo: tipo || null,
        prazo_prometido: prazo || null,
        data_inicio_real: inicioReal || null,
        data_entrega_real: entregaReal || null,
        escopo_url: escopoUrl || null,
        pacote_ativo: pacote || null,
        proxima_camada: proximaCamada || null,
        travado_por: travadoPor || null,
      })
    );
  }

  function excluir(incluirParcelas: boolean) {
    startTransition(async () => {
      const r = await excluirProjeto(projeto.id, incluirParcelas);
      if (r.bloqueado) {
        setBloqueio(r.bloqueado);
        return;
      }
      aoFechar();
      router.refresh();
    });
  }

  const feitos = projeto.marcos.filter((m) => m.feito).length;
  const progresso =
    projeto.marcos.length > 0 ? Math.round((feitos / projeto.marcos.length) * 100) : 0;
  const statusLabel = COLUNAS.find((c) => c.valor === projeto.status)?.label ?? projeto.status;
  const inicial = projeto.nome.trim().charAt(0).toUpperCase();

  function rodar(fn: () => Promise<unknown>) {
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  }

  return (
    <div
      className="modal-veu fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-tinta/60 p-4 pt-[7vh] backdrop-blur-[3px]"
      onClick={aoFechar}
    >
      <div
        className="modal-painel w-full max-w-2xl overflow-hidden rounded-[20px] bg-superficie shadow-[0_32px_80px_rgba(38,37,31,0.45)] ring-1 ring-tinta/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── capa ─────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-[linear-gradient(130deg,#54684C_0%,#4A5D43_45%,#3C4B36_100%)] px-7 pb-6 pt-7 text-superficie">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-10 select-none font-serif text-[11rem] font-black leading-none text-[#EEEDEA]/[0.08]"
          >
            {inicial}
          </span>
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#EEEDEA]/60">
                  projeto
                </div>
                <h2 className="mt-1 font-serif text-[26px] font-bold leading-tight tracking-tight">
                  {projeto.nome}
                </h2>
                <div className="mt-1.5 text-[13px] text-[#EEEDEA]/75">
                  {projeto.cliente ?? "cliente não identificado"}
                  {projeto.tipo && <span className="text-[#EEEDEA]/50"> · {projeto.tipo}</span>}
                </div>
              </div>
              <button
                onClick={aoFechar}
                aria-label="fechar"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEEDEA]/12 text-[16px] leading-none transition-colors hover:bg-[#EEEDEA]/25"
              >
                ×
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#EEEDEA]/16 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                {statusLabel}
              </span>
              {projeto.marcos.length > 0 && (
                <span className="rounded-full bg-[#EEEDEA]/16 px-2.5 py-1 font-mono text-[10px] tabular-nums tracking-[0.1em]">
                  {feitos}/{projeto.marcos.length} marcos
                </span>
              )}
              {projeto.travadoPor && (
                <span className="rounded-full bg-alerta px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                  travado · {projeto.travadoPor}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-superficie-2">
          {/* ── detalhes ───────────────────────────────── */}
          <section className="px-7 py-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-suave">
                detalhes
              </h3>
              {detalhesSujos && (
                <button
                  disabled={pending}
                  onClick={salvarDetalhes}
                  className="rounded-lg bg-salvia px-3.5 py-1 text-[12px] font-medium text-superficie transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                >
                  salvar detalhes
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={rotulo}>tipo</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={campo}>
                  <option value="">indefinido</option>
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  {tipo && !TIPOS.includes(tipo) && <option value={tipo}>{tipo}</option>}
                </select>
              </div>
              <div>
                <label className={rotulo}>pacote de acompanhamento</label>
                <select value={pacote} onChange={(e) => setPacote(e.target.value)} className={campo}>
                  <option value="">nenhum</option>
                  {PACOTES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={rotulo}>prazo prometido</label>
                <input
                  value={prazo}
                  onChange={(e) => setPrazo(e.target.value)}
                  placeholder="ex: 3 semanas"
                  className={campo}
                />
              </div>
              <div>
                <label className={rotulo}>próxima camada (upsell)</label>
                <input
                  value={proximaCamada}
                  onChange={(e) => setProximaCamada(e.target.value)}
                  placeholder="ex: sistema de agendamento"
                  className={campo}
                />
              </div>
              <div>
                <label className={rotulo}>início real</label>
                <input
                  type="date"
                  value={inicioReal}
                  onChange={(e) => setInicioReal(e.target.value)}
                  className={campo}
                />
              </div>
              <div>
                <label className={rotulo}>entrega real</label>
                <input
                  type="date"
                  value={entregaReal}
                  onChange={(e) => setEntregaReal(e.target.value)}
                  className={campo}
                />
              </div>
              <div>
                <label className={rotulo}>link do escopo</label>
                <input
                  type="url"
                  value={escopoUrl}
                  onChange={(e) => setEscopoUrl(e.target.value)}
                  placeholder="https://..."
                  className={campo}
                />
              </div>
              <div>
                <label className={rotulo}>travado por (vazio = destravado)</label>
                <input
                  value={travadoPor}
                  onChange={(e) => setTravadoPor(e.target.value)}
                  placeholder="cliente, fornecedor, eu..."
                  className={campo}
                />
              </div>
            </div>
          </section>

          {/* ── descrição ──────────────────────────────── */}
          <section className="px-7 py-5">
            <div className="mb-2.5 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-suave">
                descrição
              </h3>
              {!editandoDesc && projeto.descricao && (
                <button
                  onClick={() => setEditandoDesc(true)}
                  className="text-[12px] text-suave transition-colors hover:text-tinta"
                >
                  editar
                </button>
              )}
            </div>
            {editandoDesc ? (
              <div>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  autoFocus
                  placeholder="o que é este projeto, o que foi combinado..."
                  className="w-full rounded-xl border border-superficie-2 bg-papel p-3.5 text-[14px] leading-relaxed transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    disabled={pending}
                    onClick={() => {
                      rodar(() => salvarDescricao(projeto.id, desc));
                      setEditandoDesc(false);
                    }}
                    className="rounded-lg bg-salvia px-4 py-1.5 text-[13px] font-medium text-superficie transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                  >
                    salvar
                  </button>
                  <button
                    onClick={() => {
                      setDesc(projeto.descricao ?? "");
                      setEditandoDesc(false);
                    }}
                    className="rounded-lg px-3 py-1.5 text-[13px] text-suave transition-colors hover:text-tinta"
                  >
                    cancelar
                  </button>
                </div>
              </div>
            ) : projeto.descricao ? (
              <p
                className="cursor-text whitespace-pre-wrap text-[14px] leading-relaxed"
                onClick={() => setEditandoDesc(true)}
              >
                {projeto.descricao}
              </p>
            ) : (
              <button
                onClick={() => setEditandoDesc(true)}
                className="w-full rounded-xl border border-dashed border-superficie-2 px-4 py-3 text-left text-[13px] text-suave transition-colors hover:border-suave hover:text-tinta"
              >
                escrever a descrição do projeto...
              </button>
            )}
          </section>

          {/* ── marcos ─────────────────────────────────── */}
          <section className="px-7 py-5">
            <div className="mb-2.5 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-suave">
                marcos
              </h3>
              {projeto.marcos.length > 0 && (
                <span className="font-mono text-[12px] tabular-nums text-suave">{progresso}%</span>
              )}
            </div>
            {projeto.marcos.length > 0 && (
              <div className="mb-3.5 h-[5px] overflow-hidden rounded-full bg-papel">
                <div
                  className="h-full rounded-full bg-salvia transition-[width] duration-300 ease-out"
                  style={{ width: `${progresso}%` }}
                />
              </div>
            )}
            <div className="-mx-2 space-y-0.5">
              {projeto.marcos.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-papel"
                >
                  <Checkbox
                    marcado={m.feito}
                    disabled={pending}
                    onChange={(v) => rodar(() => alternarMarco(m.id, v))}
                  />
                  <span
                    className={`text-[14px] transition-colors ${m.feito ? "text-suave line-through decoration-suave/50" : ""}`}
                  >
                    {m.nome}
                  </span>
                  {m.data && (
                    <span className="ml-auto font-mono text-[11px] tabular-nums text-suave">
                      {new Date(m.data + "T00:00:00").toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <form
              className="mt-2.5 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!novoItem.trim()) return;
                rodar(() => adicionarMarco(projeto.id, novoItem, projeto.marcos.length + 1));
                setNovoItem("");
              }}
            >
              <input
                value={novoItem}
                onChange={(e) => setNovoItem(e.target.value)}
                placeholder="novo marco..."
                className="flex-1 rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
              />
              <button
                disabled={pending || !novoItem.trim()}
                className="rounded-lg border border-superficie-2 px-3.5 py-2 text-[13px] transition-all hover:border-suave active:scale-[0.98] disabled:opacity-40"
              >
                adicionar
              </button>
            </form>
          </section>

          {/* ── atividade ──────────────────────────────── */}
          <section className="px-7 py-5">
            <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-suave">
              atividade
            </h3>
            <form
              className="mb-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!novoComentario.trim() || !projeto.pessoaId) return;
                rodar(() => comentar(projeto.id, projeto.pessoaId!, novoComentario));
                setNovoComentario("");
              }}
            >
              <input
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                placeholder="escreve um comentário..."
                className="flex-1 rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
              />
              <button
                disabled={pending || !novoComentario.trim()}
                className="rounded-lg bg-salvia px-4 py-2 text-[13px] font-medium text-superficie transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
              >
                comentar
              </button>
            </form>
            {projeto.atividade.length === 0 ? (
              <p className="text-[13px] text-suave">
                sem atividade ainda — comentários e registros do sistema aparecem aqui.
              </p>
            ) : (
              <div className="relative space-y-4 pl-4">
                <span
                  aria-hidden
                  className="absolute bottom-1 left-[3px] top-1 w-px bg-superficie-2"
                />
                {projeto.atividade.map((a) => (
                  <div key={a.id} className="relative">
                    <span className="absolute -left-4 top-[5px] h-[7px] w-[7px] rounded-full bg-salvia ring-2 ring-superficie" />
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="min-w-0 flex-1 text-[13.5px] leading-relaxed">{a.resumo}</p>
                      <span className="shrink-0 font-mono text-[11px] tabular-nums text-suave">
                        {new Date(a.data).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── financeiro do projeto ──────────────────── */}
          <section className="px-7 py-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-suave">
                investimento
              </h3>
              {projeto.parcelas.length > 1 && (
                <span className="font-mono text-[12px] tabular-nums text-suave">
                  R${" "}
                  {projeto.parcelas
                    .reduce((acc, f) => acc + f.valor, 0)
                    .toLocaleString("pt-BR")}{" "}
                  total
                </span>
              )}
            </div>

            {/* editor principal: o valor do projeto, direto — vira registro no financeiro */}
            {abertas.length <= 1 && (
              <div className="mb-3 grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[10rem_11rem_auto]">
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={invValor}
                  onChange={(e) => setInvValor(e.target.value)}
                  placeholder="R$ valor do projeto"
                  className="rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[14px] font-medium tabular-nums transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
                />
                <input
                  type="date"
                  value={invVencimento}
                  onChange={(e) => setInvVencimento(e.target.value)}
                  className="rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
                />
                {invSujo && (
                  <button
                    disabled={pending || !invValor || !invVencimento}
                    onClick={() => {
                      setErroParcela(null);
                      rodar(async () => {
                        const r = await definirInvestimento(
                          projeto.id,
                          Number(invValor),
                          invVencimento
                        );
                        if (r.erro) setErroParcela(r.erro);
                      });
                    }}
                    className="rounded-lg bg-salvia px-4 py-2 text-[13px] font-medium text-superficie transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
                  >
                    salvar
                  </button>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              {(projeto.parcelas.length > 1 || projeto.parcelas.some((f) => f.status === "pago")
                ? projeto.parcelas
                : []
              ).map((f) => (
                <div
                  key={f.id}
                  className="group flex items-center justify-between gap-3 rounded-lg bg-papel px-3 py-2"
                >
                  <span className="font-mono text-[14px] font-medium tabular-nums">
                    R$ {f.valor.toLocaleString("pt-BR")}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-suave">
                    vence{" "}
                    {new Date(f.vencimento + "T00:00:00").toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                      f.status === "pago"
                        ? "bg-salvia text-superficie"
                        : f.status === "vencido"
                          ? "bg-alerta text-superficie"
                          : "bg-superficie-2 text-suave"
                    }`}
                  >
                    {f.status}
                  </span>
                  {f.status !== "pago" && (
                    <button
                      disabled={pending}
                      onClick={() =>
                        rodar(async () => {
                          const r = await removerParcela(f.id);
                          if (r.erro) setErroParcela(r.erro);
                        })
                      }
                      aria-label="remover parcela"
                      className="text-[14px] leading-none text-suave opacity-0 transition-opacity hover:text-alerta group-hover:opacity-100 disabled:opacity-30"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {!dividir ? (
              <button
                onClick={() => setDividir(true)}
                className="mt-2 text-[12px] text-suave transition-colors hover:text-tinta"
              >
                + dividir em parcelas (entrada, marcos, recorrência...)
              </button>
            ) : (
            <form
              className="mt-2.5 grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[7rem_10rem_1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                const v = Number(parcelaValor);
                if (!v || !parcelaVencimento) return;
                setErroParcela(null);
                rodar(async () => {
                  const r = await adicionarParcela(projeto.id, v, parcelaVencimento, parcelaTipo);
                  if (r.erro) setErroParcela(r.erro);
                });
                setParcelaValor("");
                setParcelaVencimento("");
              }}
            >
              <input
                type="number"
                min="1"
                step="0.01"
                value={parcelaValor}
                onChange={(e) => setParcelaValor(e.target.value)}
                placeholder="R$ valor"
                className="rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] tabular-nums transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
              />
              <input
                type="date"
                value={parcelaVencimento}
                onChange={(e) => setParcelaVencimento(e.target.value)}
                className="rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
              />
              <select
                value={parcelaTipo}
                onChange={(e) => setParcelaTipo(e.target.value)}
                className="rounded-lg border border-superficie-2 bg-papel px-2 py-2 text-[13px] text-tinta/85 transition-shadow focus:border-salvia focus:outline-none"
              >
                {TIPOS_PARCELA.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button
                disabled={pending || !parcelaValor || !parcelaVencimento}
                className="rounded-lg border border-superficie-2 px-3.5 py-2 text-[13px] transition-all hover:border-suave active:scale-[0.98] disabled:opacity-40"
              >
                adicionar
              </button>
            </form>
            )}
            {erroParcela && <p className="mt-2 text-[12px] text-alerta">{erroParcela}</p>}
            <p className="mt-2 text-[11px] text-suave">
              o que você define aqui vira registro no financeiro — a conciliação de sexta marca
              pago sozinha quando o valor cair na conta.
            </p>
          </section>

          {/* ── portal do cliente ──────────────────────── */}
          <section className="px-7 py-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-suave">
                portal do cliente
              </h3>
              {projeto.portal && (
                <label className="flex cursor-pointer items-center gap-2 text-[12px] text-suave">
                  <input
                    type="checkbox"
                    checked={projeto.portal.ativo}
                    disabled={pending}
                    onChange={(e) =>
                      rodar(() =>
                        atualizarPortal(projeto.portal!.id, {
                          mensagem: portalMensagem,
                          ativo: e.target.checked,
                          titulo: portalTitulo,
                          slug: portalSlug,
                          url_externa: portalUrlExterna,
                        })
                      )
                    }
                    className="h-4 w-4 accent-[#4A5D43]"
                  />
                  {projeto.portal.ativo ? "no ar" : "desligado"}
                </label>
              )}
            </div>

            {!projeto.portal ? (
              anexando ? (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlAnexo}
                    onChange={(e) => setUrlAnexo(e.target.value)}
                    placeholder="https://irbis.com.br/portal-..."
                    autoFocus
                    className="flex-1 rounded-lg border border-superficie-2 bg-papel px-3 py-2 font-mono text-[12px] transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
                  />
                  <button
                    disabled={pending || !urlAnexo.trim().startsWith("http")}
                    onClick={() =>
                      rodar(() =>
                        anexarPortalExterno(
                          projeto.pessoaId!,
                          projeto.cliente ?? projeto.nome,
                          urlAnexo
                        )
                      )
                    }
                    className="rounded-lg bg-salvia px-3.5 py-2 text-[12px] font-medium text-superficie disabled:opacity-40"
                  >
                    anexar
                  </button>
                  <button
                    onClick={() => setAnexando(false)}
                    className="rounded-lg px-2 py-2 text-[12px] text-suave"
                  >
                    cancelar
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    disabled={pending || !projeto.pessoaId}
                    onClick={() =>
                      rodar(() => criarPortal(projeto.pessoaId!, projeto.cliente ?? projeto.nome))
                    }
                    className="rounded-xl border border-dashed border-superficie-2 px-4 py-3 text-left text-[13px] text-suave transition-colors hover:border-suave hover:text-tinta"
                  >
                    criar portal gerado — status e etapas ao vivo, direto do card
                  </button>
                  <button
                    disabled={pending || !projeto.pessoaId}
                    onClick={() => setAnexando(true)}
                    className="rounded-xl border border-dashed border-superficie-2 px-4 py-3 text-left text-[13px] text-suave transition-colors hover:border-suave hover:text-tinta"
                  >
                    anexar portal externo — link de uma página que já existe
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <a
                    href={portalUrl!}
                    target="_blank"
                    rel="noreferrer"
                    className={`min-w-0 flex-1 truncate rounded-lg bg-papel px-3 py-2 font-mono text-[12px] ${
                      projeto.portal.ativo ? "text-salvia" : "text-suave line-through"
                    }`}
                  >
                    {portalUrl}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(portalUrl!);
                      setLinkCopiado(true);
                      setTimeout(() => setLinkCopiado(false), 1500);
                    }}
                    className="shrink-0 rounded-lg border border-superficie-2 px-3 py-2 text-[12px] transition-all hover:border-suave active:scale-[0.98]"
                  >
                    {linkCopiado ? "copiado" : "copiar"}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={rotulo}>título do portal (o cliente vê)</label>
                    <input
                      value={portalTitulo}
                      onChange={(e) => setPortalTitulo(e.target.value)}
                      placeholder={projeto.cliente ?? "nome exibido"}
                      className={campo}
                    />
                  </div>
                  <div>
                    <label className={rotulo}>endereço (portal.irbis.com.br/...)</label>
                    <input
                      value={portalSlug}
                      onChange={(e) => setPortalSlug(e.target.value)}
                      className={`${campo} font-mono`}
                    />
                  </div>
                </div>

                <div>
                  <label className={rotulo}>link externo (deixa vazio pra usar o gerado)</label>
                  <input
                    type="url"
                    value={portalUrlExterna}
                    onChange={(e) => setPortalUrlExterna(e.target.value)}
                    placeholder="https://..."
                    className={`${campo} font-mono`}
                  />
                </div>

                <div>
                  <label className={rotulo}>mensagem de abertura (só no portal gerado)</label>
                  <textarea
                    value={portalMensagem}
                    onChange={(e) => setPortalMensagem(e.target.value)}
                    rows={2}
                    placeholder="ex: seu projeto está em produção. Qualquer dúvida, me chama no WhatsApp."
                    className="w-full rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] leading-relaxed transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none"
                  />
                </div>

                {portalSujo && (
                  <button
                    disabled={pending}
                    onClick={salvarPortal}
                    className="rounded-lg bg-salvia px-4 py-1.5 text-[13px] font-medium text-superficie transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                  >
                    salvar portal
                  </button>
                )}

                <label className="flex cursor-pointer items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={projeto.visivelPortal}
                    disabled={pending}
                    onChange={(e) =>
                      rodar(() => alternarVisibilidadePortal(projeto.id, e.target.checked))
                    }
                    className="h-4 w-4 accent-[#4A5D43]"
                  />
                  este projeto aparece no portal gerado
                </label>

                <p className="text-[11px] text-suave">
                  o portal gerado mostra só status e etapas — financeiro e comentários internos
                  ficam de fora. Link externo anexado não atualiza sozinho.
                </p>
              </div>
            )}
          </section>

          {/* ── rodapé ─────────────────────────────────── */}
          <section className="flex items-center justify-end px-7 py-3.5">
            {bloqueio ? (
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="text-[12px] text-alerta">
                  {bloqueio.n} parcela{bloqueio.n === 1 ? "" : "s"} (R${" "}
                  {bloqueio.total.toLocaleString("pt-BR")}) vinculada
                  {bloqueio.n === 1 ? "" : "s"} — excluir junto?
                </span>
                <button
                  disabled={pending}
                  onClick={() => excluir(true)}
                  className="rounded-lg bg-alerta px-3.5 py-1.5 text-[12px] font-medium text-superficie transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  excluir tudo
                </button>
                <button
                  onClick={() => {
                    setBloqueio(null);
                    setConfirmandoExclusao(false);
                  }}
                  className="rounded-lg px-2.5 py-1.5 text-[12px] text-suave hover:text-tinta"
                >
                  cancelar
                </button>
              </div>
            ) : confirmandoExclusao ? (
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-suave">
                  apaga o projeto, os marcos e a atividade dele.
                </span>
                <button
                  disabled={pending}
                  onClick={() => excluir(false)}
                  className="rounded-lg bg-alerta px-3.5 py-1.5 text-[12px] font-medium text-superficie transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  confirmar exclusão
                </button>
                <button
                  onClick={() => setConfirmandoExclusao(false)}
                  className="rounded-lg px-2.5 py-1.5 text-[12px] text-suave hover:text-tinta"
                >
                  cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmandoExclusao(true)}
                className="text-[12px] text-suave transition-colors hover:text-alerta"
              >
                excluir projeto
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
