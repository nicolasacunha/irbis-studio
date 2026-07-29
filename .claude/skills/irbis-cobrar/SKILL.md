---
name: irbis-cobrar
description: "Prepara cobrança de parcela vencida da IRBIS com a trava anti-cobrar-quem-pagou (checa Open Finance antes de qualquer rascunho) e a escada de 5 degraus (T-3, D+0, D+3, D+10, escalada). Também responde 'quanto entra esse mês e quem está atrasado'. Use quando o Nicolas disser '/cobrar [pessoa]', 'quem tá devendo', 'quanto entra esse mês', ou pedir pra cobrar alguém."
---

# IRBIS — `/cobrar` (Supabase + Open Finance, Fase 5)

Conexões: `irbis-os/CONEXAO-SUPABASE.md`, `irbis-os/CONEXAO-OPENFINANCE.md`. Spec completa:
`irbis-os/fases/FASE-5-financeiro.md`, seção 3.

## Passo 0 — cobrança nunca cita contrato

Sai só o fato: o que foi entregue, o valor, a data, os dias em aberto. Se a cobrança ficaria
mais forte citando contrato, isso vai pro **relatório interno**, nunca na mensagem:
`essa cobrança ficaria mais firme citando contrato, e contrato está fora do sistema. Decide você.`

## Passo 1 — a trava anti-cobrar-quem-pagou (obrigatória, sem exceção)

Antes de preparar qualquer degrau, busque no Open Finance **qualquer** crédito de valor igual
ao da parcela nos **últimos 60 dias**, sem filtro de vencimento e sem janela estreita:

```
mcp__3127b280-d585-413b-88be-3f3c586f3b93__openfinance_list_transactions
```

Achou candidato não conciliado:

```
⚠ {{cliente}} · parcela R$ {{valor}} vencida há {{n}}d · existe crédito de R$ {{valor}} em
  {{data}} não conciliado. Antes de cobrar: é este pagamento? (s/n)
```

Se sim: encaminhe pra `irbis-conciliacao-financeira` marcar, não prepare cobrança.

**Open Finance não respondeu → não cobra, ponto:**

```
❌ Open Finance não respondeu. Não preparo cobrança às cegas: risco de cobrar quem já pagou.
   {{n}} parcelas venceram e eu não sei o status: {{lista}}.
```

Isso vale mesmo que o Nicolas peça "cobra assim mesmo" — recuse e explique o motivo em uma
linha; se ele insistir depois de entender o risco, aí sim prepare com o aviso explícito de que
não foi checado.

## Passo 2 — os degraus (ASK, sempre — grava em `aprovacoes`)

| Degrau | Quando | Tom | Pedido |
|---|---|---|---|
| T-3 | 3 dias antes do vencimento | neutro, informativo | nenhum, só avisa |
| D+0 | no dia | neutro | confirma o comprovante |
| D+3 | 3 dias vencido | direto, assume esquecimento | pede a data |
| D+10 | 10 dias vencido | firme, sem contrato | pede decisão binária |
| escalada | além de D+10 | não é mensagem automática — traga opções e o Nicolas escolhe | — |

Regras comuns a todos: cite o que foi **entregue**, não o que foi combinado ("a landing está
no ar desde {{data}}") · um número só (valor + data) · nunca peça desculpa por cobrar · nunca
ameace em T-3 ou D+3 · sempre ofereça o caminho fácil de resolver.

```
T-3:  {{nome}}, a parcela de {{descrição}} vence {{data}}, R$ {{valor}}. {{forma}}.
      Qualquer coisa me chama.
D+3:  {{nome}}, a parcela de {{descrição}} venceu {{data}} e não caiu aqui. R$ {{valor}}.
      Consegue me dizer que dia entra? Se precisar ajustar a data, me fala que a gente acerta.
D+10: {{nome}}, a parcela de {{data}} segue em aberto, R$ {{valor}}.
      Preciso de uma definição para saber se sigo com o cronograma de {{projeto}} ou se
      pauso até regularizar. Me diz até {{dia}} qual dos dois.
```

## Modo "quanto entra esse mês" (sem pessoa específica)

```
GET /rest/v1/financeiro?select=*,projetos(nome,pessoas(nome))&status=eq.a receber
```

```
FRONTEIRA: {{✅/❌}} Supabase/financeiro · {{✅/❌}} Open Finance (sync {{hora}})
A RECEBER   este mês R$ {{x}} ({{n}} parcelas) · 30d R$ {{x}} · 60/90 R$ {{x}}/{{x}}
VENCIDO     {{cliente}} · R$ {{x}} · {{n}}d · degrau {{X}} · [A] rascunho pronto
RECORRÊNCIA MRR R$ {{x}} · {{n}} clientes · {{%}} da carteira com pacote
            renovações em 30d: {{cliente}}
EXPANSÃO    expansão R$ {{x}} vs nova R$ {{x}}
```

Número sem fonte viva desta execução não aparece como número — aparece como
`cego, {{fonte}} não respondeu`.

## Proibições

Nunca citar cláusula, multa, juros, rescisão, suspensão. Nunca instruir sobre nota fiscal.
Nunca preparar cobrança sem passar pelo Passo 1. Nunca "adivinhar" que um crédito
provavelmente é daquele cliente sem casamento exato — isso é trabalho da
`irbis-conciliacao-financeira`, não deste comando.
