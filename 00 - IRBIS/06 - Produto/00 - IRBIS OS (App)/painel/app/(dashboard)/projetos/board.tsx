"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { moverStatus, criarProjeto } from "./actions";
import { COLUNAS } from "@/lib/colunas-projeto";
import { CardModal } from "./card-modal";

export type ProjetoBoard = {
  id: string;
  nome: string;
  cliente: string | null;
  pessoaId: string | null;
  tipo: string | null;
  status: string;
  descricao: string | null;
  travadoPor: string | null;
  diasTravado: number | null;
  prazoPrometido: string | null;
  inicioReal: string | null;
  entregaReal: string | null;
  escopoUrl: string | null;
  pacoteAtivo: string | null;
  proximaCamada: string | null;
  marcos: { id: string; nome: string; feito: boolean; data: string | null }[];
  atividade: { id: string; data: string; resumo: string }[];
  parcelas: { id: string; valor: number; vencimento: string; status: string }[];
  portal: { id: string; slug: string; ativo: boolean; mensagem: string | null; titulo: string | null; urlExterna: string | null } | null;
  visivelPortal: boolean;
};

export type PessoaOpcao = { id: string; nome: string };

const TIPOS = ["landing page", "site institucional", "e-commerce", "sistema IA", "bot"];

function CartaoConteudo({ p, arrastando = false }: { p: ProjetoBoard; arrastando?: boolean }) {
  const feitos = p.marcos.filter((m) => m.feito).length;
  return (
    <div
      className={`rounded-xl border p-4 ${
        p.travadoPor ? "border-alerta/40 bg-alerta/10" : "border-superficie-2 bg-superficie"
      } ${
        arrastando
          ? "rotate-2 shadow-[0_12px_32px_rgba(38,37,31,0.18)]"
          : "shadow-[0_1px_3px_rgba(38,37,31,0.05)] transition-shadow hover:shadow-[0_4px_14px_rgba(38,37,31,0.10)]"
      }`}
    >
      <div className="text-[15px] font-semibold tracking-tight">{p.nome}</div>
      <div className="mt-0.5 text-[13px] text-suave">
        {p.cliente ?? "cliente não identificado"}
        {p.tipo && ` · ${p.tipo}`}
      </div>
      {p.travadoPor && (
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-alerta">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-alerta" />
          travado por {p.travadoPor}
          {p.diasTravado !== null && (
            <span className="font-mono tabular-nums">· {p.diasTravado}d</span>
          )}
        </div>
      )}
      {(p.marcos.length > 0 || p.descricao) && (
        <div className="mt-2 flex items-center gap-3 border-t border-superficie-2 pt-2 font-mono text-[11px] tabular-nums text-suave">
          {p.marcos.length > 0 && (
            <span>
              ☑ {feitos}/{p.marcos.length}
            </span>
          )}
          {p.descricao && <span>≡ descrição</span>}
        </div>
      )}
    </div>
  );
}

function Cartao({ p, aoAbrir }: { p: ProjetoBoard; aoAbrir: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: p.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={aoAbrir}
      className={`cursor-pointer touch-none active:cursor-grabbing ${isDragging ? "opacity-30" : ""}`}
    >
      <CartaoConteudo p={p} />
    </div>
  );
}

function NovoProjeto({
  status,
  pessoas,
  aoCriar,
}: {
  status: string;
  pessoas: PessoaOpcao[];
  aoCriar: (nome: string, pessoaId: string, tipo: string, status: string) => void;
}) {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [tipo, setTipo] = useState("");

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="w-full rounded-xl border border-dashed border-superficie-2 px-3 py-2.5 text-left text-[13px] text-suave transition-colors hover:border-suave hover:text-tinta"
      >
        + projeto
      </button>
    );
  }

  return (
    <form
      className="space-y-2 rounded-xl border border-superficie-2 bg-superficie p-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nome.trim() || !pessoaId) return;
        aoCriar(nome, pessoaId, tipo, status);
        setNome("");
        setTipo("");
        setPessoaId("");
        setAberto(false);
      }}
    >
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="nome do projeto"
        autoFocus
        className="w-full rounded-lg border border-superficie-2 bg-papel px-2.5 py-1.5 text-[13px] focus:border-salvia focus:outline-none"
      />
      <select
        value={pessoaId}
        onChange={(e) => setPessoaId(e.target.value)}
        className="w-full rounded-lg border border-superficie-2 bg-papel px-2 py-1.5 text-[13px] text-tinta/85 focus:border-salvia focus:outline-none"
      >
        <option value="">cliente...</option>
        {pessoas.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="w-full rounded-lg border border-superficie-2 bg-papel px-2 py-1.5 text-[13px] text-tinta/85 focus:border-salvia focus:outline-none"
      >
        <option value="">tipo (opcional)...</option>
        {TIPOS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button
          disabled={!nome.trim() || !pessoaId}
          className="rounded-lg bg-salvia px-3 py-1.5 text-[13px] font-medium text-superficie disabled:opacity-40"
        >
          criar
        </button>
        <button
          type="button"
          onClick={() => setAberto(false)}
          className="rounded-lg px-2.5 py-1.5 text-[13px] text-suave"
        >
          cancelar
        </button>
      </div>
    </form>
  );
}

function Coluna({
  valor,
  label,
  projetos,
  pessoas,
  aoAbrir,
  aoCriar,
}: {
  valor: string;
  label: string;
  projetos: ProjetoBoard[];
  pessoas: PessoaOpcao[];
  aoAbrir: (id: string) => void;
  aoCriar: (nome: string, pessoaId: string, tipo: string, status: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: valor });
  return (
    <div className="w-[19rem] shrink-0">
      <h2 className="mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-suave">
        {label} <span className="tabular-nums">· {projetos.length}</span>
      </h2>
      <div
        ref={setNodeRef}
        className={`min-h-[9rem] space-y-3 rounded-xl p-1 transition-colors ${
          isOver ? "bg-salvia/10 outline-2 outline-dashed outline-salvia/40" : ""
        }`}
      >
        {projetos.map((p) => (
          <Cartao key={p.id} p={p} aoAbrir={() => aoAbrir(p.id)} />
        ))}
        <NovoProjeto status={valor} pessoas={pessoas} aoCriar={aoCriar} />
      </div>
    </div>
  );
}

export function ProjetosBoard({
  projetos: iniciais,
  pessoas,
}: {
  projetos: ProjetoBoard[];
  pessoas: PessoaOpcao[];
}) {
  const router = useRouter();
  const [projetos, setProjetos] = useState(iniciais);
  const [arrastandoId, setArrastandoId] = useState<string | null>(null);
  const [abertoId, setAbertoId] = useState<string | null>(null);
  const acabouDeArrastar = useRef(false);
  const [, startTransition] = useTransition();

  useEffect(() => setProjetos(iniciais), [iniciais]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } })
  );

  function aoComecar(e: DragStartEvent) {
    setArrastandoId(String(e.active.id));
  }

  function aoSoltar(e: DragEndEvent) {
    setArrastandoId(null);
    acabouDeArrastar.current = true;
    setTimeout(() => (acabouDeArrastar.current = false), 250);
    const destino = e.over?.id;
    if (!destino) return;
    const id = String(e.active.id);
    const projeto = projetos.find((p) => p.id === id);
    if (!projeto || projeto.status === destino) return;
    setProjetos((atual) =>
      atual.map((p) => (p.id === id ? { ...p, status: String(destino) } : p))
    );
    startTransition(() => moverStatus(id, String(destino)));
  }

  function abrir(id: string) {
    // clique logo depois de um arrasto não abre o card
    if (acabouDeArrastar.current) return;
    setAbertoId(id);
  }

  function criar(nome: string, pessoaId: string, tipo: string, status: string) {
    startTransition(async () => {
      await criarProjeto(nome, pessoaId, tipo, status);
      router.refresh();
    });
  }

  const arrastando = projetos.find((p) => p.id === arrastandoId);
  const aberto = projetos.find((p) => p.id === abertoId);

  return (
    <>
      <DndContext sensors={sensors} onDragStart={aoComecar} onDragEnd={aoSoltar}>
        <div className="nav-scroll -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 lg:-mx-10 lg:px-10">
          {COLUNAS.map((coluna) => (
            <Coluna
              key={coluna.valor}
              valor={coluna.valor}
              label={coluna.label}
              projetos={projetos.filter((p) => p.status === coluna.valor)}
              pessoas={pessoas}
              aoAbrir={abrir}
              aoCriar={criar}
            />
          ))}
        </div>
        <DragOverlay>
          {arrastando ? (
            <div className="w-[18rem]">
              <CartaoConteudo p={arrastando} arrastando />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      {aberto && <CardModal projeto={aberto} aoFechar={() => setAbertoId(null)} />}
    </>
  );
}
