"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { atualizarCard, atualizarPessoa } from "./actions";
import type { CardPipeline } from "./pipeline-view";

const TIPOS = [
  "landing page",
  "site institucional",
  "e-commerce",
  "sistema IA",
  "bot",
  "Sistema Operacional",
  "CRM",
];

const TEMPERATURAS = ["quente", "morno", "frio"] as const;

const rotuloCampo = "mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-suave";
const campo =
  "w-full rounded-lg border border-superficie-2 bg-papel px-3 py-2 text-[13px] transition-shadow focus:border-salvia focus:shadow-[0_0_0_3px_rgba(74,93,67,0.15)] focus:outline-none";

export function LeadModal({ card, aoFechar }: { card: CardPipeline; aoFechar: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [erro, setErro] = useState<string | null>(null);

  const [nome, setNome] = useState(card.nome);
  const [empresa, setEmpresa] = useState(card.empresa ?? "");
  const [email, setEmail] = useState(card.email ?? "");
  const [telefone, setTelefone] = useState(card.telefone ?? "");
  const [tipo, setTipo] = useState(card.tipo_projeto ?? "");
  const [valorMin, setValorMin] = useState(card.valor_min?.toString() ?? "");
  const [valorMax, setValorMax] = useState(card.valor_max?.toString() ?? "");
  const [temperatura, setTemperatura] = useState(card.temperatura ?? "morno");
  const [proximoPasso, setProximoPasso] = useState(card.proximo_passo);
  const [dataToque, setDataToque] = useState(card.data_proximo_toque ?? "");

  const inicial = nome.trim().charAt(0).toUpperCase() || "?";

  function salvar() {
    setErro(null);
    startTransition(async () => {
      const r1 = await atualizarPessoa(card.pessoaId, {
        nome,
        empresa: empresa || null,
        email: email || null,
        telefone: telefone || null,
      });
      if (r1.erro) {
        setErro(r1.erro.includes("duplicate") ? "e-mail ou telefone já cadastrado em outra pessoa" : r1.erro);
        return;
      }
      const r2 = await atualizarCard(card.id, {
        tipo_projeto: tipo || null,
        valor_min: valorMin ? Number(valorMin) : null,
        valor_max: valorMax ? Number(valorMax) : valorMin ? Number(valorMin) : null,
        temperatura,
        proximo_passo: proximoPasso,
        data_proximo_toque: dataToque,
      });
      if (r2.erro) {
        setErro(r2.erro);
        return;
      }
      router.refresh();
      aoFechar();
    });
  }

  return (
    <div
      className="modal-veu fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-tinta/60 p-4 pt-[7vh] backdrop-blur-[3px]"
      onClick={aoFechar}
    >
      <div
        className="modal-painel w-full max-w-xl overflow-hidden rounded-[20px] bg-superficie shadow-[0_32px_80px_rgba(38,37,31,0.45)] ring-1 ring-tinta/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* capa */}
        <div className="relative overflow-hidden bg-[linear-gradient(130deg,#54684C_0%,#4A5D43_45%,#3C4B36_100%)] px-6 pb-5 pt-6 text-superficie">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-10 select-none font-serif text-[10rem] font-black leading-none text-[#EEEDEA]/[0.08]"
          >
            {inicial}
          </span>
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#EEEDEA]/60">
                lead · {card.estagio}
              </div>
              <h2 className="mt-1 font-serif text-[24px] font-bold leading-tight tracking-tight">
                {nome || "sem nome"}
              </h2>
            </div>
            <button
              onClick={aoFechar}
              aria-label="fechar"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEEDEA]/12 text-[16px] leading-none transition-colors hover:bg-[#EEEDEA]/25"
            >
              ×
            </button>
          </div>
        </div>

        <div className="space-y-5 px-6 py-5">
          {/* contato */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={rotuloCampo}>nome</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} className={campo} />
            </div>
            <div>
              <label className={rotuloCampo}>empresa</label>
              <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} className={campo} />
            </div>
            <div>
              <label className={rotuloCampo}>e-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={campo}
              />
            </div>
            <div>
              <label className={rotuloCampo}>telefone</label>
              <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className={campo} />
            </div>
          </div>

          <div className="h-px bg-superficie-2" />

          {/* negócio */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={rotuloCampo}>tipo de projeto</label>
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
              <label className={rotuloCampo}>temperatura</label>
              <div className="flex gap-1">
                {TEMPERATURAS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTemperatura(t)}
                    className={`flex-1 rounded-lg border px-2 py-2 text-[12px] transition-colors ${
                      temperatura === t
                        ? "border-salvia bg-salvia text-superficie"
                        : "border-superficie-2 bg-papel text-suave hover:border-suave"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={rotuloCampo}>valor de (R$)</label>
              <input
                type="number"
                value={valorMin}
                onChange={(e) => setValorMin(e.target.value)}
                placeholder="2997"
                className={campo}
              />
            </div>
            <div>
              <label className={rotuloCampo}>valor até (R$)</label>
              <input
                type="number"
                value={valorMax}
                onChange={(e) => setValorMax(e.target.value)}
                placeholder="4497"
                className={campo}
              />
            </div>
          </div>

          <div className="h-px bg-superficie-2" />

          {/* o card que se cobra */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_11rem]">
            <div>
              <label className={rotuloCampo}>próximo passo *</label>
              <input
                value={proximoPasso}
                onChange={(e) => setProximoPasso(e.target.value)}
                className={campo}
              />
            </div>
            <div>
              <label className={rotuloCampo}>próximo toque *</label>
              <input
                type="date"
                value={dataToque}
                onChange={(e) => setDataToque(e.target.value)}
                className={campo}
              />
            </div>
          </div>

          {erro && <p className="text-[13px] text-alerta">{erro}</p>}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={aoFechar}
              className="rounded-lg px-3.5 py-2 text-[13px] text-suave transition-colors hover:text-tinta"
            >
              cancelar
            </button>
            <button
              disabled={pending || !proximoPasso.trim() || !dataToque || !nome.trim()}
              onClick={salvar}
              className="rounded-lg bg-salvia px-5 py-2 text-[13px] font-medium text-superficie transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
            >
              {pending ? "salvando..." : "salvar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
