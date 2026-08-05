"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconeVisao,
  IconeAprovacoes,
  IconePipeline,
  IconeProjetos,
  IconeSemana,
  IconeTravas,
  IconeFinanceiro,
  IconeCarteira,
  IconeAgentes,
} from "@/lib/icones";

const GRUPOS: {
  titulo: string | null;
  itens: { href: string; label: string; Icone: (p: { className?: string }) => React.ReactNode }[];
}[] = [
  {
    titulo: null,
    itens: [{ href: "/visao", label: "Visão geral", Icone: IconeVisao }],
  },
  {
    titulo: "operação",
    itens: [
      { href: "/aprovacoes", label: "Aprovações", Icone: IconeAprovacoes },
      { href: "/pipeline", label: "Pipeline", Icone: IconePipeline },
      { href: "/projetos", label: "Projetos", Icone: IconeProjetos },
      { href: "/semana", label: "Semana", Icone: IconeSemana },
      { href: "/travas", label: "Travas", Icone: IconeTravas },
    ],
  },
  {
    titulo: "negócio",
    itens: [
      { href: "/financeiro", label: "Financeiro", Icone: IconeFinanceiro },
      { href: "/carteira", label: "Carteira", Icone: IconeCarteira },
    ],
  },
  {
    titulo: "inteligência",
    itens: [{ href: "/agentes", label: "Agentes", Icone: IconeAgentes }],
  },
];

const TODOS = GRUPOS.flatMap((g) => g.itens);

function Badge({ n, ativo }: { n: number; ativo: boolean }) {
  return (
    <span
      className={`rounded-full px-1.5 font-mono text-[10px] leading-4 tabular-nums ${
        ativo ? "bg-papel/20 text-papel" : "bg-salvia text-superficie"
      }`}
    >
      {n}
    </span>
  );
}

export function NavLinks({
  aprovacoesPendentes,
  mobile = false,
}: {
  aprovacoesPendentes: number;
  mobile?: boolean;
}) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="nav-scroll flex gap-1 overflow-x-auto px-3 pb-2 pt-1 text-[13px]">
        {TODOS.map((item) => {
          const ativo = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 transition-colors ${
                ativo ? "bg-tinta text-papel" : "text-suave"
              }`}
            >
              {item.label}
              {item.href === "/aprovacoes" && aprovacoesPendentes > 0 && (
                <Badge n={aprovacoesPendentes} ativo={ativo} />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {GRUPOS.map((grupo) => (
        <nav key={grupo.titulo ?? "raiz"} className="flex flex-col gap-0.5 text-[13px]">
          {grupo.titulo && (
            <div className="mb-1.5 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-suave">
              {grupo.titulo}
            </div>
          )}
          {grupo.itens.map((item) => {
            const ativo = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-2 py-[7px] transition-colors ${
                  ativo
                    ? "bg-tinta font-medium text-papel"
                    : "text-suave hover:bg-superficie-2/50 hover:text-tinta"
                }`}
              >
                <item.Icone className={ativo ? "opacity-90" : "opacity-60"} />
                {item.label}
                {item.href === "/aprovacoes" && aprovacoesPendentes > 0 && (
                  <span className="ml-auto">
                    <Badge n={aprovacoesPendentes} ativo={ativo} />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      ))}
    </div>
  );
}
