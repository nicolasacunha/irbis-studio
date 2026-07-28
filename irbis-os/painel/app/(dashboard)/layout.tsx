import Link from "next/link";
import { LogoutButton } from "./logout-button";

const NAV = [
  { href: "/aprovacoes", label: "Aprovações" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/semana", label: "Semana" },
  { href: "/travas", label: "Travas" },
  { href: "/financeiro", label: "Financeiro" },
  { href: "/carteira", label: "Carteira" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <span className="text-sm font-medium text-neutral-300">Sistema OS · IRBIS</span>
          <LogoutButton />
        </div>
        <nav className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-4 pb-2 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-2.5 py-1 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  );
}
