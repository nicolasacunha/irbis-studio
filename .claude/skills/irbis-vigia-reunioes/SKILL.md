---
name: irbis-vigia-reunioes
description: "Vigia o Google Calendar da IRBIS pra montar o dossiê pré-reunião a T-24h, a confirmação de véspera, o reminder a T-1h30 e detectar reunião sem card, sem link, alterada ou cancelada. Use quando disparado pela rotina agendada, ou quando o Nicolas disser 'tenho call amanhã', 'prepara a reunião de X', 'o que muda com esse evento remarcado', ou pedir o dossiê de uma call específica."
---

# IRBIS — Vigia de Calendar e dossiê pré-reunião (Fase 2)

Pré-requisito técnico: Google Calendar conectado nesta sessão (MCP de Calendar). Se não
estiver — confira a lista de ferramentas disponíveis antes de prometer qualquer coisa —, a
saída é `❌ FALHOU Calendar` na Fronteira dos Dados e você para aqui, sem inventar agenda.
Isso é esperado, não é bug: ver `irbis-os/CONEXAO-SUPABASE.md` e o status da conexão de
Calendar em `irbis-os/fases/FASE-0-banco-e-captura.md` (seção 3).

Spec completa: `irbis-os/fases/FASE-2-reunioes.md`, seções 1 a 3. Fontes do dossiê: mesma
cadeia da skill `irbis-dossie` (pessoas → pipeline → interacoes → propostas → projetos →
Gmail → Calendar → dossiê no repo), acrescida do evento em si.

## Quando rodar

- Manualmente, quando o Nicolas pedir preparo de uma reunião específica.
- Pela rotina agendada (quando existir — ver nota no fim sobre por que ainda não está
  agendada automaticamente).

## 1. Ler a agenda e classificar cada evento externo

Evento com pelo menos um convidado fora do domínio operacional, ou com nome de pessoa no
título mesmo sem convidado formal (trate como reunião e sinalize a falta do convidado — sinal
de call combinada por fora que nunca virou evento de verdade).

Para cada evento relevante nas próximas 24h e no próximo 1h30, calcule em qual janela ele
está e o que já foi disparado (confira em `interacoes` se já existe um registro
`origem_do_registro='sistema'` com resumo citando esse evento — é assim que você sabe se o
T-24h ou o T-1h30 já saiu, já que rotinas rodam sem memória entre execuções).

Casos especiais, trate explicitamente:
- **Sem link nem endereço** → sinalize: "reunião sem lugar é reunião que não acontece".
- **Criado com menos de 24h de antecedência** → dispare o T-24h imediatamente, mesmo fora do
  horário padrão.
- **Alterado** (hora ou data mudou) → recalcule as janelas. Se a confirmação de véspera já
  tinha saído com a hora antiga, isso é o erro mais caro desta fase: avise explicitamente,
  não silencie.
- **Cancelado** → registre em `interacoes` (canal `automatico`), atualize
  `pipeline.proximo_passo`/`data_proximo_toque` do card e pergunte se remarca. Não invente
  nova data sozinho.
- **Terminou** → esse é o gancho pro `/pos-reuniao` (skill `irbis-pos-reuniao`) — só avise,
  não processe a call por conta própria.

## 2. T-24h: três entregas numa execução

### 2.1 Dossiê (EXECUTE — montar; ASK só se for enviar pra fora, o que nunca acontece aqui)

Rode a skill `irbis-dossie` pra pessoa (ou pessoas) do evento e acrescente no topo:

```
REUNIÃO: {{título}} · {{data}} {{hora}} · {{duração}} · {{link}}
PARTICIPANTES EXTERNOS: {{lista}} — {{quais estão no pipeline, quais não}}
TIPO: diagnóstico (20 min) / venda (45 min) / maturidade de IA (25 min) / kickoff / alinhamento
```

Se o tipo não for óbvio pelo título/duração, pergunte qual roteiro carregar em vez de
adivinhar.

Cole no fim o roteiro do tipo correspondente:

| Tipo | Roteiro vem de |
|---|---|
| Diagnóstico (20 min) | skill `irbis-prospeccao-e-diagnostico` (etapa de qualificação/agendamento) |
| Venda (45 min) | skill `irbis-call-de-vendas` (SPIN, ancoragem, objeções, silêncio pós-preço) |
| Kickoff / Alinhamento | skill `irbis-entrega-e-recorrencia` |

**Preço já apresentado é a linha mais importante depois do estágio.** Se houver divergência
entre `propostas.valor` e algum valor citado em `interacoes`, mostre os dois lado a lado e
marque conflito — não escolha qual é o certo.

Entrega: e-mail completo (MCP Gmail já conectado, use `create_draft` — nunca `send`, isso é
ASK) + 1 linha com link pro dossiê no Discord `#matinal` se o webhook estiver configurado.

### 2.2 Confirmação de véspera (ASK — grava em `aprovacoes`, nunca envia)

```
{{primeiro_nome}}, confirmando nossa call {{dia}} às {{hora}}, {{duração}}.
A ideia é: {{3 itens curtos da pauta}}.
{{se aplicável}} Como o {{sócio/decisor}} decide junto, faz sentido ele estar também.
Link: {{...}}
Nicolas
```

Sem "tudo bem?". Sem reconfirmar preço. Se `interacoes`/dossiê indicam decisor que não está
no convite, a linha do decisor é obrigatória, não opcional.

### 2.3 Higiene (EXECUTE, reportado)

```
⚠ HIGIENE: {{nome}} está na sua agenda e não está no pipeline. Crio o card? (s)
```

## 3. T-1h30: reminder (ASK)

Só dispare se não houve resposta à confirmação de véspera, ou se o tipo é venda (onde no-show
custa mais). Curto:

```
{{primeiro_nome}}, daqui a pouco então: {{hora}}. {{link}}
```

Junto, entregue ao dono **o roteiro resumido**, não o dossiê inteiro: as perguntas na ordem,
a pergunta que não pode faltar, a linha de preço já apresentado.

**Revalide o Calendar no instante do disparo.** Se o evento sumiu ou foi cancelado entre o
T-24h e agora, **não envie o reminder** e reporte:
`⛔ não enviei o reminder de {{nome}}: evento cancelado/alterado desde a confirmação.`

## Formato de saída

Abra sempre com a Fronteira dos Dados. Se Calendar falhar, a seção inteira vira "estou cego
na agenda" — nunca um dossiê montado sem o evento real por trás.

## Por que isto ainda não está numa rotina agendada

Depende de Google Calendar conectado nesta sessão do Claude, e até 28/jul/2026 essa conexão
não existe (só Gmail está ativo). Agendar um vigia recorrente contra uma fonte que sempre
falha é gasto sem valor. Assim que o Calendar for autorizado (configurações de conectores do
Claude, ou `claude mcp`/`/mcp` numa sessão interativa — não dá pra fazer isso de dentro de uma
rotina automática), crie o scheduled task apontando pra esta skill, de hora em hora em horário
comercial, e ele passa a rodar sozinho.
