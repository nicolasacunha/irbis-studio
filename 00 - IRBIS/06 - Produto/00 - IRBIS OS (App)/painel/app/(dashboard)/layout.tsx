import { createAdminClient } from "@/lib/supabase/admin";
import { LogoutButton } from "./logout-button";
import { NavLinks } from "./nav-links";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createAdminClient();
  const { count } = await supabase
    .from("aprovacoes")
    .select("id", { count: "exact", head: true })
    .eq("status", "parado");

  const hoje = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="grid-paper min-h-screen bg-papel text-tinta lg:grid lg:grid-cols-[13.5rem_1fr]">
      {/* ── sidebar (desktop) ─────────────────────────────── */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-superficie-2 bg-superficie/80 px-4 py-5 backdrop-blur lg:flex">
        <div className="mb-8 px-2">
          <div className="font-serif text-[13px] font-extrabold tracking-[0.18em]">
            SISTEMA&nbsp;OS
          </div>
          <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-suave">irbis</div>
        </div>
        <NavLinks aprovacoesPendentes={count ?? 0} />
        <div className="mt-auto space-y-2 px-2">
          <div className="font-mono text-[10px] uppercase tracking-wide text-suave">{hoje}</div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── chrome mobile ─────────────────────────────────── */}
      <div className="sticky top-0 z-10 border-b border-superficie-2 bg-papel/90 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 pb-1 pt-3">
          <span className="font-serif text-[12px] font-extrabold tracking-[0.18em]">
            SISTEMA&nbsp;OS <span className="font-sans font-normal text-suave">· irbis</span>
          </span>
          <LogoutButton />
        </div>
        <NavLinks aprovacoesPendentes={count ?? 0} mobile />
      </div>

      <main className="w-full px-4 py-6 lg:px-10 lg:py-8">{children}</main>
    </div>
  );
}
