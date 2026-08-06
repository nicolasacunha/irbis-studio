import { getCreditosGateway } from "@/lib/ai-gateway";

// Saldo atualizado da AI Gateway, chamado pelo chat depois de cada resposta pra o custo
// aparecer descendo ao vivo em vez de só no carregamento da página. Protegida pelo mesmo
// middleware do resto do painel (proxy.ts cobre /api/*).
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getCreditosGateway());
}
