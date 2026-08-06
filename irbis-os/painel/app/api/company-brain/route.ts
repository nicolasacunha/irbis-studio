import { createAgentUIStreamResponse } from "ai";
import { companyBrainAgent } from "@/lib/agents/company-brain-agent";

// Protegida pelo mesmo middleware do resto do painel (proxy.ts cobre /api/* também) — só a
// conta operacional do Nicolas chega aqui.
export async function POST(request: Request) {
  const { messages } = await request.json();
  return createAgentUIStreamResponse({
    agent: companyBrainAgent,
    uiMessages: messages,
    // Token gasto de verdade viaja junto com a mensagem pro cliente somar na barra de
    // custo do chat. Sem isso a conta da AI Gateway só aparece na fatura.
    messageMetadata: ({ part }) =>
      part.type === "finish" ? { tokens: part.totalUsage.totalTokens } : undefined,
  });
}
