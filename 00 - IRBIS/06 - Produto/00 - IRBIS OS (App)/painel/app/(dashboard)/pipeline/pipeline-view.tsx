"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { moverEstagio } from "./actions";
import { LeadModal } from "./lead-modal";

export type CardPipeline = {
  id: string;
  pessoaId: string;
  estagio: string;
  valor_min: number | null;
  valor_max: number | null;
  temperatura: string | null;
  tipo_projeto: string | null;
  proximo_passo: string;
  data_proximo_toque: string | null;
  dias: number | null;
  parado: boolean;
  nome: string;
  empresa: string | null;
  email: string | null;
  telefone: string | null;
};

const ORDEM_ESTAGIOS = [
  "primeiro contato",
  "levantamento",
  "proposta",
  "negociacao",
  "fechado",
  "nutricao",
  "perdido",
];

const TETO: Record<string, number> = {
  negociacao: 2,
  proposta: 3,
  levantamento: 5,
  "primeiro contato": 7,
  nutricao: 30,
};

const MOTIVOS_PERDA = ["preco", "momento", "escopo", "silencio", "outro"] as const;

function moeda(v: number) {
  return v.toLocaleString("pt-BR");
}

/* ── conteúdo do cartão ─────────────────────────────────── */

function CartaoConteudo({ c, arrastando = false }: { c: CardPipeline; arrastando?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        c.parado ? "border-alerta/40 bg-alerta/10" : "border-superficie-2 bg-superficie"
      } ${
        arrastando
          ? "rotate-2 shadow-[0_12px_32px_rgba(38,37,31,0.18)]"
          : "shadow-[0_1px_3px_rgba(38,37,31,0.05)] transition-shadow hover:shadow-[0_4px_14px_rgba(38,37,31,0.10)]"
      }`}
    >
      <div className="text-[15px] font-semibold tracking-tight">{c.nome}</div>
      <div className="mt-1 flex items-center gap-2 font-mono text-[12px] tabular-nums text-suave">
        <span>{c.valor_min ? `R$ ${moeda(c.valor_min)}` : "faixa aberta"}</span>
        {c.dias !== null && (
          <span className={c.parado ? "font-semibold text-alerta" : ""}>· {c.dias}d</span>
        )}
        {c.parado && (
          <span className="rounded bg-alerta px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-superficie">
            teto
          </span>
        )}
      </div>
      <div className="mt-2.5 border-t border-superficie-2 pt-2 text-[13px] leading-snug text-tinta/85">
        {c.proximo_passo}
      </div>
    </div>
  );
}

function Cartao({ c, aoAbrir }: { c: CardPipeline; aoAbrir: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: c.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={aoAbrir}
      className={`cursor-pointer touch-none active:cursor-grabbing ${isDragging ? "opacity-30" : ""}`}
    >
      <CartaoConteudo c={c} />
    </div>
  );
}

function Coluna({
  estagio,
  cards,
  aoAbrir,
}: {
  estagio: string;
  cards: CardPipeline[];
  aoAbrir: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: estagio });
  return (
    <div className="w-[19rem] shrink-0">
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.12em] text-suave">{estagio}</h2>
        <span className="font-mono text-[12px] tabular-nums text-suave">{cards.length}</span>
        {TETO[estagio] !== undefined && (
          <span className="ml-auto font-mono text-[10px] tabular-nums text-suave">
            teto {TETO[estagio]}d
          </span>
        )}
      </div>
      <div
        ref={setNodeRef}
        className={`min-h-[8rem] space-y-3 rounded-xl p-1 transition-colors ${
          isOver ? "bg-salvia/10 outline-2 outline-dashed outline-salvia/40" : ""
        }`}
      >
        {cards.map((c) => (
          <Cartao key={c.id} c={c} aoAbrir={() => aoAbrir(c.id)} />
        ))}
      </div>
    </div>
  );
}

/* ── pergunta de motivo ao mover pra perdido ────────────── */

function MotivoPerdaModal({
  nome,
  aoEscolher,
  aoCancelar,
}: {
  nome: string;
  aoEscolher: (motivo: string) => void;
  aoCancelar: () => void;
}) {
  return (
    <div
      className="modal-veu fixed inset-0 z-50 flex items-center justify-center bg-tinta/60 p-4 backdrop-blur-[3px]"
      onClick={aoCancelar}
    >
      <div
        className="modal-painel w-full max-w-sm rounded-[20px] bg-superficie p-6 shadow-[0_32px_80px_rgba(38,37,31,0.45)] ring-1 ring-tinta/10"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-[18px] font-bold tracking-tight">
          Por que perdeu {nome}?
        </h3>
        <p className="mt-1 text-[12px] text-suave">
          silêncio não é motivo — lead que sumiu vai pra nutrição, não pra perdido.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {MOTIVOS_PERDA.map((m) => (
            <button
              key={m}
              onClick={() => aoEscolher(m)}
              className="rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] capitalize transition-colors hover:border-salvia hover:text-tinta"
            >
              {m === "preco" ? "preço" : m === "silencio" ? "silêncio" : m}
            </button>
          ))}
          <button
            onClick={aoCancelar}
            className="rounded-lg px-3 py-2 text-[13px] text-suave hover:text-tinta"
          >
            cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── vista principal ────────────────────────────────────── */

export function PipelineView({ cards: iniciais }: { cards: CardPipeline[] }) {
  const [cards, setCards] = useState(iniciais);
  const [visao, setVisao] = useState<"quadro" | "tabela">("quadro");
  const [arrastandoId, setArrastandoId] = useState<string | null>(null);
  const [abertoId, setAbertoId] = useState<string | null>(null);
  const [pendentePerda, setPendentePerda] = useState<{ id: string; nome: string } | null>(null);
  const acabouDeArrastar = useRef(false);
  const [, startTransition] = useTransition();

  useEffect(() => setCards(iniciais), [iniciais]);

  useEffect(() => {
    const salva = localStorage.getItem("pipeline-visao");
    if (salva === "tabela" || salva === "quadro") setVisao(salva);
  }, []);

  function trocar(v: "quadro" | "tabela") {
    setVisao(v);
    localStorage.setItem("pipeline-visao", v);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } })
  );

  function aplicarMovimento(id: string, estagio: string, motivo?: string) {
    setCards((atual) => atual.map((c) => (c.id === id ? { ...c, estagio } : c)));
    startTransition(() => moverEstagio(id, estagio, motivo));
  }

  function aoSoltar(e: DragEndEvent) {
    setArrastandoId(null);
    acabouDeArrastar.current = true;
    setTimeout(() => (acabouDeArrastar.current = false), 250);
    const destino = e.over?.id;
    if (!destino) return;
    const id = String(e.active.id);
    const card = cards.find((c) => c.id === id);
    if (!card || card.estagio === destino) return;
    if (destino === "perdido") {
      // regra da casa: perdido exige motivo — pergunta antes de gravar
      setPendentePerda({ id, nome: card.nome });
      return;
    }
    aplicarMovimento(id, String(destino));
  }

  const arrastando = cards.find((c) => c.id === arrastandoId);
  const aberto = cards.find((c) => c.id === abertoId);

  function abrir(id: string) {
    if (acabouDeArrastar.current) return;
    setAbertoId(id);
  }

  const colunas = ORDEM_ESTAGIOS.map(
    (e) => [e, cards.filter((c) => c.estagio === e)] as const
  ).filter(([e, lista]) => lista.length > 0 || ["primeiro contato", "levantamento", "proposta", "negociacao"].includes(e));

  return (
    <div>
      <div className="mb-5 inline-flex rounded-lg border border-superficie-2 bg-superficie p-0.5 text-[13px]">
        {(["quadro", "tabela"] as const).map((v) => (
          <button
            key={v}
            onClick={() => trocar(v)}
            className={`rounded-md px-3.5 py-1.5 capitalize transition-colors ${
              visao === v ? "bg-tinta font-medium text-papel" : "text-suave hover:text-tinta"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {visao === "quadro" ? (
        <DndContext
          sensors={sensors}
          onDragStart={(e: DragStartEvent) => setArrastandoId(String(e.active.id))}
          onDragEnd={aoSoltar}
        >
          <div className="nav-scroll -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 lg:-mx-10 lg:px-10">
            {colunas.map(([estagio, lista]) => (
              <Coluna key={estagio} estagio={estagio} cards={lista} aoAbrir={abrir} />
            ))}
          </div>
          <DragOverlay>
            {arrastando ? (
              <div className="w-[18rem]">
                <CartaoConteudo c={arrastando} arrastando />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <Tabela cards={cards} aoAbrir={abrir} />
      )}

      {aberto && <LeadModal card={aberto} aoFechar={() => setAbertoId(null)} />}
      {pendentePerda && (
        <MotivoPerdaModal
          nome={pendentePerda.nome}
          aoEscolher={(motivo) => {
            aplicarMovimento(pendentePerda.id, "perdido", motivo);
            setPendentePerda(null);
          }}
          aoCancelar={() => setPendentePerda(null)}
        />
      )}
    </div>
  );
}

/* ── tabela ─────────────────────────────────────────────── */

function Tabela({ cards, aoAbrir }: { cards: CardPipeline[]; aoAbrir: (id: string) => void }) {
  const ordenados = [...cards].sort(
    (a, b) => ORDEM_ESTAGIOS.indexOf(a.estagio) - ORDEM_ESTAGIOS.indexOf(b.estagio)
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-superficie-2 bg-superficie">
      <table className="w-full min-w-[40rem] text-left text-[14px]">
        <thead>
          <tr className="border-b border-superficie-2 font-mono text-[11px] uppercase tracking-[0.1em] text-suave">
            <th className="px-4 py-3 font-medium">lead</th>
            <th className="px-4 py-3 font-medium">estágio</th>
            <th className="px-4 py-3 text-right font-medium">valor</th>
            <th className="px-4 py-3 text-right font-medium">últ. contato</th>
            <th className="px-4 py-3 font-medium">próximo passo</th>
          </tr>
        </thead>
        <tbody>
          {ordenados.map((c) => (
            <tr
              key={c.id}
              onClick={() => aoAbrir(c.id)}
              className={`cursor-pointer border-b border-superficie-2 transition-colors last:border-0 hover:bg-papel/60 ${
                c.parado ? "bg-alerta/10" : ""
              }`}
            >
              <td className="px-4 py-3 font-semibold tracking-tight">{c.nome}</td>
              <td className="px-4 py-3">
                <span className="rounded-md bg-papel px-2 py-1 font-mono text-[11px] text-suave">
                  {c.estagio}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-mono text-[13px] tabular-nums">
                {c.valor_min ? `R$ ${moeda(c.valor_min)}` : "—"}
              </td>
              <td
                className={`px-4 py-3 text-right font-mono text-[13px] tabular-nums ${
                  c.parado ? "font-semibold text-alerta" : "text-suave"
                }`}
              >
                {c.dias !== null ? `${c.dias}d` : "—"}
              </td>
              <td className="max-w-[16rem] truncate px-4 py-3 text-[13px] text-tinta/85">
                {c.proximo_passo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
