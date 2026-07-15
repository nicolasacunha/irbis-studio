# Design — Funil: formulário de escopo + agendamento próprio

**Data:** 14/jul/2026 (rev. 3 — call de 1h; rev. 2 — agenda própria no lugar do Calendly)
**Status:** aprovado pelo Nicolas em 14/jul
**Dono:** Nicolas

## Objetivo

Depois que Nicolas qualifica um lead manualmente, ele envia um link do site da IRBIS.
O lead preenche um formulário de escopo e, na mesma página, agenda a call de vendas
nos horários reais do calendário pessoal do Nicolas — em uma agenda construída por
nós, 100% na identidade IRBIS. Nicolas chega na call com o diagnóstico pronto.

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
   - Na mesma página, sem redirect, aparece a **grade de horários da IRBIS**
     (agenda própria), já com os dados do lead carregados.
5. Lead escolhe horário → o sistema cria o evento no Google Calendar pessoal do
   Nicolas com link de Google Meet e convite para o email do lead → email de
   confirmação → redirect para `/obrigado` (evento Lead GA4/Meta Pixel já dispara
   lá hoje — tracking existente aproveitado sem retrabalho).

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
| 9 | **Prazo desejado** (texto livre) | **Sim** | Pedido explícito do Nicolas: saber o prazo antes da call para surpreender com prazo menor. Texto livre, não faixas (decisão 14/jul): quanto mais o lead escreve, mais munição |
| 10 | **Previsão de orçamento** (texto livre) | **Não** | Opcional para não ser invasivo. Texto livre, não faixas (decisão 14/jul). Perguntar budget do lead NÃO viola a regra "preço só na call" — a regra protege o preço da IRBIS |
| 11 | **Anexos** (logo, referências, materiais) | Não | Upload direto no form; simplifica o onboarding |
| 12 | Quem decide junto (sozinho / sócio / esposa / outra pessoa) | Sim | Regra 5 do playbook: decisor acompanhado → os dois na call. O form **avisa**, não bloqueia — Nicolas decide caso a caso |
| 13 | Campo livre: "algo que eu deva saber antes da nossa conversa?" | Não | |

Copy final de todas as perguntas passa por `irbis-brand-voice` na fase de build
(sem travessão, assina Nicolas, vocabulário leigo).

## Agendamento — agenda própria (v1)

Decisão do Nicolas (14/jul): construir a agenda no próprio site em vez de embutir
Calendly. Ganhos: visual 100% IRBIS e reminders automatizáveis. O que mantém o
build em dias (escopo disciplinado da v1):

- **Um único tipo de evento:** call de vendas, 1 hora, Google Meet.
- **Só o calendário pessoal do Nicolas** como fonte de conflitos.
- **Disponibilidade por configuração** (não por UI de admin): janelas de
  atendimento semanais, buffer entre calls, antecedência mínima (ex.: 12h) e
  horizonte máximo (ex.: 14 dias). Valores exatos definidos com o Nicolas na
  fase de build.
- **Fuso:** slots gerados em America/Sao_Paulo; exibição convertida para o fuso
  do navegador do lead (leads internacionais existem no pipeline).
- **Sem remarcação/cancelamento self-service na v1** — lead responde o email de
  confirmação ou chama no WhatsApp; Nicolas ajusta direto no Google Calendar.

### Integração Google Calendar

- Service account no Google Cloud com o calendário pessoal do Nicolas
  compartilhado com ela (padrão para conta Gmail pessoal, sem OAuth por sessão).
- Fluxo: free/busy do calendário + regras de disponibilidade → gera slots →
  lead escolhe → API cria o evento (com Meet + convite ao lead) → revalida
  conflito no momento da criação (dois leads não podem pegar o mesmo slot).

### Confirmações e reminders

- Email de confirmação imediato ao lead (com dados da call e link do Meet) e
  notificação ao Nicolas.
- Convite nativo do Google Calendar chega ao lead (aceitar/adicionar à agenda).
- **Fase 2 (pós-v1):** cron diário para reminder de véspera por email; a
  micro-pauta de véspera pelo WhatsApp segue manual (regra 8 do playbook, e é
  mais pessoal). Reminder 1h30 antes: automatizável no mesmo cron.

## Técnica

- Página nova no site atual da IRBIS (identidade da marca), rota fora do menu,
  `noindex`.
- Submit do form → endpoint no próprio site → grava no Notion (API, banco CRM de
  Clientes) + email para Nicolas.
- **Anexos:** upload para storage (Vercel Blob ou similar — confirmar stack do site
  na fase de build); links dos arquivos vão no card do Notion e no email.
- **Agenda:** endpoints de disponibilidade (gera slots) e de booking (cria evento),
  falando com a API do Google Calendar via service account.
- **Email transacional:** Resend ou SMTP do Zoho (definir na fase de build).
- Pré-requisitos de setup: integração do Notion (token interno) com acesso ao CRM;
  projeto no Google Cloud + service account + compartilhamento do calendário.

## Fases de construção

1. **Copy do formulário** — fechar textos das perguntas, faixas de orçamento e
   opções de prazo na voz IRBIS (Nicolas aprova).
2. **Setup de acessos** — service account Google + compartilhamento do calendário;
   token do Notion; provedor de email. (Passos de painel viram instruções leigas
   para o Nicolas onde exigirem interação humana.)
3. **Página no site** — form + upload + integração Notion/email.
4. **Agenda própria** — endpoints de slots e booking + UI da grade de horários.
5. **Teste ponta a ponta** — lead fake preenche, anexa arquivo, agenda; verificar:
   card no Notion, email dos dois lados, evento com Meet no calendário, conflito
   duplo bloqueado, pixel disparando em `/obrigado`.
6. **(Fase 2, depois da v1 rodando)** — cron de reminders (véspera + 1h30 antes).

## Fora de escopo (por decisão)

- Formulário como filtro de qualificação (lead já chega qualificado).
- Página pública/aberta no menu do site.
- Calendly ou qualquer scheduler de terceiro (decisão de 14/jul: agenda própria).
- Remarcação/cancelamento self-service (v1); múltiplos tipos de evento; UI de
  admin de disponibilidade.

## Riscos e compromissos aceitos

- Agenda própria = manutenção nossa: bugs de slot/fuso são nossos para corrigir.
  Mitigação: escopo v1 mínimo + teste ponta a ponta com casos de conflito.
- Pergunta de sócio (campo 12) só avisa, não impede agendamento sem o decisor par.
- Orçamento opcional pode vir vazio — a call de vendas segue cobrindo budget ao vivo.
- Sem self-service de remarcação na v1, no-show/remarcação passam pelo WhatsApp.
