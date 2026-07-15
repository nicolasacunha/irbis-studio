# Design — Funil: formulário de escopo + agendamento automático

**Data:** 14/jul/2026
**Status:** aprovado em conversa (14/jul), aguardando revisão final do spec
**Dono:** Nicolas

## Objetivo

Depois que Nicolas qualifica um lead manualmente, ele envia um link do site da IRBIS.
O lead preenche um formulário de escopo e, na mesma página, agenda a call de vendas
nos horários reais do calendário pessoal do Nicolas. Nicolas chega na call com o
diagnóstico pronto.

O formulário **substitui a call de diagnóstico de 15–20 min** do playbook para leads
que passam por esse caminho. A call agendada é a **videochamada de vendas** (preço ao
vivo — conduzida com `irbis-call-de-vendas`).

## Fluxo do lead

1. Nicolas qualifica o lead no canal de origem (DM, WhatsApp, cold call). Nada muda.
2. Nicolas envia link pessoal: página nova no irbis.com.br (ex.: `/call`), fora do
   menu, com `noindex`. Só chega quem recebeu o link.
3. Lead preenche o formulário (2–3 min).
4. Ao enviar:
   - Respostas criam/atualizam card no CRM do Notion (via API) e disparam email
     para Nicolas com tudo (incluindo links dos anexos).
   - Na mesma página, sem redirect, aparece o widget do Calendly com nome e email
     pré-preenchidos.
5. Lead escolhe horário → Calendly cria evento no Google Calendar do Nicolas +
   convite ao lead → redirect para `/obrigado` (evento Lead GA4/Meta Pixel já
   dispara lá hoje — tracking existente aproveitado sem retrabalho).

## O formulário — campos aprovados

### Bloco 1 — Sobre você
| # | Campo | Obrigatório |
|---|---|---|
| 1 | Nome completo | Sim |
| 2 | Email | Sim |
| 3 | WhatsApp/telefone | Sim |

### Bloco 2 — Sobre o negócio
| # | Campo | Obrigatório |
|---|---|---|
| 4 | Nome do negócio | Sim |
| 5 | O que o negócio faz (1–2 linhas) | Sim |
| 6 | Site atual (URL) | **Não** — quem não tem, pula |

### Bloco 3 — Sobre o projeto
| # | Campo | Obrigatório | Nota |
|---|---|---|---|
| 7 | O que o site precisa fazer (múltipla escolha: vender direto, gerar contato/orçamento, agendar, apresentar portfólio…) | Sim | |
| 8 | Maior incômodo hoje (Google, credibilidade, dependência de indicação — as 3 dores do quiz) | Sim | |
| 9 | **Prazo desejado** | **Sim** | Pedido explícito do Nicolas: saber o prazo antes da call para surpreender com prazo menor |
| 10 | **Previsão de orçamento** (faixas) | **Não** | Opcional para não ser invasivo. Faixas fazem ancoragem silenciosa; valores definidos na fase de copy alinhados à régua interna (R$4.500–7.500). Perguntar budget do lead NÃO viola a regra "preço só na call" — a regra protege o preço da IRBIS |
| 11 | **Anexos** (logo, referências, materiais) | Não | Upload direto no form; simplifica o onboarding |
| 12 | Quem decide junto (sozinho / sócio / esposa / outra pessoa) | Sim | Regra 5 do playbook: decisor acompanhado → os dois na call. O form **avisa**, não bloqueia — Nicolas decide caso a caso |
| 13 | Campo livre: "algo que eu deva saber antes da nossa conversa?" | Não | |

Copy final de todas as perguntas passa por `irbis-brand-voice` na fase de build
(sem travessão, assina Nicolas, vocabulário leigo).

## Agendamento (Calendly)

- **Novo event type** dedicado: "Call de projeto — 45 min" (separado do link
  genérico de 30 min usado nos CTAs do site).
- Sincronização com Google Calendar pessoal: já nativa do Calendly (conta grátis
  existente: `calendly.com/nicolas-cunhan-aluno`).
- Embed inline na página do form, com prefill de nome/email via query params.
- Redirect pós-agendamento: `/obrigado` (já configurado, dispara Lead no GA4/Meta).
- **Limitação aceita:** widget tem visual do Calendly (plano grátis), não da IRBIS.
- **Confirmações:** email de confirmação imediato é nativo. Véspera com micro-pauta
  + reminder 1h30 antes (regra 8 do playbook) ficam **manuais no WhatsApp do
  Nicolas**, usando as respostas do form como micro-pauta. Se virar gargalo,
  upgrade do Calendly resolve.

## Técnica

- Página nova no site atual da IRBIS (identidade da marca), rota fora do menu,
  `noindex`.
- Submit do form → endpoint no próprio site → grava no Notion (API, banco CRM de
  Clientes) + email para Nicolas.
- **Anexos:** upload para storage (Vercel Blob ou similar — confirmar stack do site
  na fase de build); links dos arquivos vão no card do Notion e no email.
- Pré-requisito: criar integração do Notion (token interno) com acesso ao CRM.

## Fases de construção

1. **Copy do formulário** — fechar textos das perguntas e faixas de orçamento na
   voz IRBIS (Nicolas aprova).
2. **Calendly** — criar event type 45 min, redirect, prefill.
3. **Página no site** — form + upload + integração Notion/email + embed Calendly.
4. **Teste ponta a ponta** — lead fake preenche, anexa arquivo, agenda; verificar:
   card no Notion, email recebido, evento no calendário, pixel disparando.

## Fora de escopo (por decisão)

- Formulário como filtro de qualificação (lead já chega qualificado).
- Página pública/aberta no menu do site.
- Agenda própria via API do Google Calendar (semanas de trabalho vs. Calendly pronto).
- Automação de reminders paga (Workflows do Calendly).

## Riscos e compromissos aceitos

- Widget Calendly quebra parcialmente a estética IRBIS na página.
- Pergunta de sócio (campo 12) só avisa, não impede agendamento sem o decisor par.
- Orçamento opcional pode vir vazio — a call de vendas segue cobrindo budget ao vivo.
