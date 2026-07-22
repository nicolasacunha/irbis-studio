# Manual de Operações IRBIS — índice-mestre

**Criado:** 22/jul/2026. **Função:** um lugar só que aponta para TODOS os processos documentados da empresa. Quando um processo mudar, muda o documento dele; este índice só aponta. Novo documento de processo = nova linha aqui, no mesmo commit.

**Versão navegável no Notion:** "Swipe File IRBIS" (board por categoria, dentro da página IRBIS): https://app.notion.com/p/b296bcf2ced54c35bd7e8d01a95cad2d — 27 cards em 6 colunas (Estratégia · Aquisição · Vendas · Entrega & Produto · Gestão · IA & Ferramentas). Regra: processo novo = linha aqui + card lá; divergência entre card e repo, o repo vence.

Paths relativos à raiz do repo (`~/Projects/Business/irbis/`).

## 1. Estratégia (quem somos, pra onde vamos)

| Processo/documento | Onde | Status |
|---|---|---|
| Visão (tese, ponto A/B, bifurcação) | `docs/visao-irbis.md` | Aprovado 21/jul |
| Valores (framework de decisão) | `docs/valores-irbis.md` | Aprovado 22/jul |
| Metas por chapéu + ritual semanal | `docs/metas-por-chapeu.md` | Aprovado 22/jul |
| Mapa de maturidade (42 itens) | `docs/mapa-maturidade-vs-realidade.md` | Vivo, recontado a cada avanço |
| Spec da fundação (4 fases) | `docs/superpowers/specs/2026-07-20-fundacao-agencia-design.md` | Fase 1 executada; 2-4 com gatilho |
| Decisões estratégicas (councils/ADRs) | `../negocios-geral/council-transcript-*.md` | Permanente |

## 2. Aquisição e marketing

| Processo/documento | Onde | Status |
|---|---|---|
| Plano de canais e medição (70/20/10, input/output) | `04 - Marketing/plano-canais-e-medicao.md` | Aprovado 22/jul |
| Plano JDP de 7 dias (ICP, perfil, produção viral) | `~/Projects/Pessoal/JDP/plano_7dias_*.pdf` | Em execução |
| Garimpo de concorrência | `04 - Marketing/garimpo-concorrencia-jul2026.md` | Aguarda sessão de lupa do Nicolas |
| Posicionamento pessoal (P1: Big Idea, vilão, filtro) | `04 - Marketing/P1-posicionamento-nicolas.md` | Vigente |
| Voz da marca (tom, fórmulas, palavras banidas) | `01 - Marca/IRBIS_Manual_de_Copy.md` + `.claude/brand-context.md` | Vigente |
| Prospecção e diagnóstico (cadências, dossiês, quiz) | `03 - Comercial/01 - Prospecção/` + skill `irbis-prospeccao-e-diagnostico` | Vigente |

## 3. Venda e fechamento

| Processo/documento | Onde | Status |
|---|---|---|
| Call de diagnóstico e fechamento | `03 - Comercial/02 - Qualificação e Agendamento/` + skill `irbis-call-de-vendas` | Vigente |
| Pricing (charm pricing, build por valor, recorrência) | skill `irbis-precificacao` + docs comerciais | Vigente; pricing de IA em exploração |
| Escada de follow-up (D+3 leve, D+7 contexto, D+10 ultimato) | hoje só em `03 - Comercial/_rotina-diaria/pendencias-*.md` | ⚠️ LACUNA: vira doc próprio na Fase 3 |
| Proposta-modelo do novo escopo | não existe ainda | ⚠️ LACUNA: entregável da Fase 3 (template a partir do PDF QG OS) |
| Contrato + anexos + assinatura + recebimento | `03 - Comercial/06 - Jurídico/` (6 documentos) | Completo; contrato em revisão jurídica |
| Checklist do dia do sim | `03 - Comercial/06 - Jurídico/checklist-dia-do-sim.md` | Pronto |

## 4. Entrega e pós-venda

| Processo/documento | Onde | Status |
|---|---|---|
| Processo de entrega padrão | `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md` | Vigente (sites) |
| Repitch MRR + pedido de indicação | `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md` | Vigente |
| Planos de recorrência (2 pacotes) | `03 - Comercial/04 - Entrega e Recorrência/planos-recorrencia-irbis.md` | Vigente; versão software junto da proposta da mãe |
| Gestão de carteira (ciclo, upsell, 4 campos no CRM) | `03 - Comercial/04 - Entrega e Recorrência/processo-gestao-carteira.md` | Aprovado 22/jul; estreia com fundadores |
| Voz do cliente (pulso, depoimento, feedback) | `03 - Comercial/04 - Entrega e Recorrência/voz-do-cliente.md` | Aprovado 22/jul; estreia com fundadores |
| Kit de onboarding pós-assinatura | não existe ainda | ⚠️ LACUNA: dispara na 1ª assinatura (Fase 3) |

## 5. CRM e ferramentas

| Ferramenta | O que faz | Estado |
|---|---|---|
| CRM (board no Notion) | Recebe todo lead do form `/call` e `/en/call` com card automático (campos: negócio, contato, estágio, origem, prazo, orçamento, objetivo, incômodo, decisor e agora tipo de projeto no "O que faz") | Funcionando; upgrades de 5 min pendentes do Nicolas: coluna "Tipo" e os 4 campos de carteira (último contato, pacote ativo, próxima camada, próximo toque) |
| Funil `/call` (form + agenda própria + Meet) | Agendamento e briefing antes da call | No ar; automação do convite/Meet pendente (tarefa 1.4 do plano JDP) |
| Financeiro via Open Finance | Extrato e categorização direto no Claude | Ativo; vira o registro oficial na conta PJ (Fase 2) |
| Placar da semana | Instrumento de bordo comercial + conteúdo | `03 - Comercial/_rotina-diaria/placar-semana-*.md` |

## 6. Rotinas automáticas (a empresa que roda sozinha)

13 rotinas agendadas no Claude: roteiro diário de conteúdo (3h) · prospecção matinal (7h33, dias úteis) · revisão comercial (sexta 17h) · blogs IRBIS/Odery/E-Force (semanais) · auditoria mensal dos sites de clientes (dia 1) · health check (seg 7h) · backup git (20h diário) · sync do cérebro (21h30) · digestor de estudos (sáb) · ingest 2nd brain (dom) · + lembretes pontuais sob demanda. ROI estimado do conjunto: `docs/roi-ia-irbis.md` (em validação).

## 7. Conhecimento (o acervo que alimenta tudo)

`~/Projects/Conhecimento/` — 13 fontes em 7 domínios, playbook de growth destilado. Regra da casa: conteúdo novo só entra puxado por item travado.

## As 3 lacunas nomeadas (todas com dono e gatilho)

1. **Escada de follow-up como doc próprio** + 2. **Proposta-modelo** + 3. **Kit de onboarding** — os três são entregáveis da **Fase 3 da fundação**, que dispara na primeira assinatura. Não são esquecimento: são fila.
