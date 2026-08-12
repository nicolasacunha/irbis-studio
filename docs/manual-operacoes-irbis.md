# Manual de Operações IRBIS — índice-mestre

**Criado:** 22/jul/2026. **Função:** um lugar só que aponta para TODOS os processos documentados da empresa. Quando um processo mudar, muda o documento dele; este índice só aponta. Novo documento de processo = nova linha aqui, no mesmo commit.

**Versão navegável no Notion:** "Swipe File IRBIS" (board por categoria, dentro da página IRBIS): https://app.notion.com/p/b296bcf2ced54c35bd7e8d01a95cad2d — 27 cards em 6 colunas (Estratégia · Aquisição · Vendas · Entrega & Produto · Gestão · IA & Ferramentas). Regra: processo novo = linha aqui + card lá; divergência entre card e repo, o repo vence.

Paths relativos à raiz do repo (`~/Projects/Business/irbis/`).

## 0. Onboarding de novo colaborador

| Processo/documento | Onde | Status |
|---|---|---|
| Ponto de entrada pra quem entra na IRBIS agora (comercial + geral) | `onboarding-comercial-novo-colaborador.md` (raiz do repo) | ✅ Criado 09/ago/2026 — leia antes de qualquer outro doc |

## 1. Estratégia (quem somos, pra onde vamos)

| Processo/documento | Onde | Status |
|---|---|---|
| Visão (tese, ponto A/B, bifurcação) | `docs/visao-irbis.md` | Aprovado 21/jul; **tese revisada 04/ago (fim dos sites) — v2 vigente** |
| Valores (framework de decisão) | `docs/valores-irbis.md` | Aprovado 22/jul |
| Metas por chapéu + ritual semanal | `docs/metas-por-chapeu.md` | Aprovado 22/jul |
| Mapa de maturidade (42 itens) | `docs/mapa-maturidade-vs-realidade.md` | Vivo, recontado a cada avanço |
| Spec da fundação (4 fases) | `docs/superpowers/specs/2026-07-20-fundacao-agencia-design.md` | Fase 1 executada; 2-4 com gatilho |
| Decisões estratégicas (councils/ADRs) | `../negocios-geral/council-transcript-*.md` | Permanente |

## 2. Aquisição e marketing

| Processo/documento | Onde | Status |
|---|---|---|
| Plano de canais e medição (70/20/10, input/output) | `04 - Marketing/plano-canais-e-medicao.md` | Aprovado 22/jul; **produto/preço atualizado 04/ago (fim dos sites)** |
| Plano JDP de 7 dias (ICP, perfil, produção viral) | `~/Projects/Pessoal/JDP/PlanoPratico7DiasNicolasAlvesCunha.pdf` | Em execução — versão mais recente (04/ago); versões anteriores (`plano_7dias_*.pdf`) na mesma pasta |
| Garimpo de concorrência | `04 - Marketing/garimpo-concorrencia-jul2026.md` | Aguarda sessão de lupa do Nicolas |
| Posicionamento pessoal (P1: Big Idea, vilão, filtro) | `04 - Marketing/P1-posicionamento-nicolas.md` | Vigente; **v4 fechada 09/ago/2026 — bio, CTA ("manda 'IA' no direct"), ICP e case (Odery) resolvidos** |
| Voz da marca (tom, fórmulas, palavras banidas) | `01 - Marca/IRBIS_Manual_de_Copy_v2.md` + `.claude/brand-context.md` | Vigente |
| Prospecção e diagnóstico (cadências, dossiês, quiz) | `03 - Comercial/01 - Prospecção/` + skill `irbis-prospeccao-e-diagnostico` | Vigente |

## 3. Venda e fechamento

| Processo/documento | Onde | Status |
|---|---|---|
| **Reunião única de venda (~1h, triagem embutida)** | `03 - Comercial/03 - Reunião de Vendas/estrutura-reuniao-unica-irbis.md` | **✅ Vigente desde 12/ago/2026 — árbitro de duração e sequência.** Acabou a call de diagnóstico separada; todo canal promete 1 hora |
| **Política de preço (quando o número sai)** | `03 - Comercial/00 - Planejamento/politica-de-preco-irbis.md` | **✅ Criada 12/ago/2026 — árbitro.** Faixa é pública em qualquer canal; número fechado só na reunião |
| Método de precificação (valor, não hora) | `03 - Comercial/03 - Reunião de Vendas/calculadora-preco-build-irbis.md` + skill `irbis-precificacao` | Vigente para Sistemas. ⚠️ Trava 2 sem âncora de mercado do setor novo |
| **Escada de follow-up (única: D+0, D+3, D+7, D+14, breakup D+21)** | `03 - Comercial/03 - Reunião de Vendas/escada-follow-up-irbis.md` | **✅ LACUNA FECHADA em 12/ago/2026.** Substitui as 6 cadências divergentes. Conteúdo varia por estágio, intervalo nunca |
| Proposta-modelo do novo escopo | não existe ainda | ⚠️ **LACUNA ABERTA.** Bloqueia a etapa entre a reunião e o contrato |
| Deck da reunião (`Apresentação Comercial.html`) | não auditado desde o pivot | ⚠️ **LACUNA ABERTA.** Pode ainda mostrar "SITE? SIM.". Não usar em call sem conferir |
| Contrato + anexos + assinatura + recebimento | `03 - Comercial/06 - Jurídico/` (6 documentos) | Completo; contrato em revisão jurídica |
| Checklist do dia do sim | `03 - Comercial/06 - Jurídico/checklist-dia-do-sim.md` | Pronto |

## 4. Entrega e pós-venda

| Processo/documento | Onde | Status |
|---|---|---|
| **Método de entrega (espinha de TODO projeto: 7 fases + gates)** | `03 - Comercial/04 - Entrega e Recorrência/metodo-entrega-irbis.md` | **Vigente desde 01/ago — manda sobre os processos de entrega abaixo** |
| **Processo de operação para Sistemas (perfil SISTEMAS do método)** | `03 - Comercial/04 - Entrega e Recorrência/processo-sistemas-irbis.md` | **✅ Criado 12/ago/2026.** Os 5 artefatos obrigatórios de F1 e F2: system design com os 3 fluxos principais · requisitos não-funcionais · entidades · APIs · arquitetura. Nenhuma linha de código antes dos 5 aprovados por escrito |
| Processo de entrega padrão | `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md` | 🛑 NEUTRALIZADO 09/ago/2026 — era o **perfil SITE** do método; site fora de escopo, preservado só como histórico. Substituído na prática pelo `processo-sistemas-irbis.md` |
| Repitch MRR + pedido de indicação | `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md` | Vigente — **não auditado nesta rodada de pivot, confira antes de usar** |
| Planos de recorrência (2 pacotes) | `03 - Comercial/04 - Entrega e Recorrência/planos-recorrencia-irbis.md` | ✅ Reescrito 09/ago/2026 — recorrência confirmada só pro Bot de IA (R$1.000 setup + R$500/mês); Sistemas e Consultoria sem recorrência confirmada |
| Gestão de carteira (ciclo, upsell, 4 campos no CRM) | `03 - Comercial/04 - Entrega e Recorrência/processo-gestao-carteira.md` | Aprovado 22/jul; estreia com fundadores |
| Voz do cliente (pulso, depoimento, feedback) | `03 - Comercial/04 - Entrega e Recorrência/voz-do-cliente.md` | Aprovado 22/jul; estreia com fundadores |
| Kit de onboarding pós-assinatura | `03 - Comercial/04 - Entrega e Recorrência/metodo-entrega-irbis.md` (Fases 0, 1 e 2) | ✅ FECHADA em 01/ago: o kit é o arranque + imersão + plano de entrega do método |

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

1. **Escada de follow-up como doc próprio** + 2. **Proposta-modelo** + ~~3. Kit de onboarding~~ — restam duas. As duas são entregáveis da **Fase 3 da fundação**, que dispara na primeira assinatura. Não são esquecimento: são fila.

**Atualização 01/ago/2026:** a lacuna 3 (kit de onboarding) foi fechada pelo `metodo-entrega-irbis.md`, que virou a espinha de entrega de todo projeto — 7 fases com gate binário, artefato obrigatório por fase e 3 botões de adaptação por perfil (site, sistema/IA, conteúdo).
