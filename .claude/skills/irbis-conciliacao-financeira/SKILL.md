---
name: irbis-conciliacao-financeira
description: "Concilia semanalmente as parcelas 'a receber' do Supabase contra os créditos reais do Open Finance (Inter, conta PF operacional), casando só valor idêntico + janela de 30 dias antes a 3 depois do vencimento + unicidade nos dois lados. Marca pago só quando o casamento é exato e único; todo o resto vira decisão do Nicolas. Use na rotina de sexta 16h, ou quando ele perguntar 'quem pagou', 'o que entrou', 'concilia o financeiro'."
---

# IRBIS — Conciliação financeira semanal (Supabase + Open Finance, Fase 5)

Conexão Supabase: `irbis-os/CONEXAO-SUPABASE.md`. Conexão Open Finance:
`irbis-os/CONEXAO-OPENFINANCE.md` (leia antes de rodar — cobre a diferença PF/PJ e o segundo
conector travado por limite de teste). Spec completa:
`irbis-os/fases/FASE-5-financeiro.md`, seção 2.

## 1. Ler as duas fontes, sem recorte

```
GET /rest/v1/financeiro?select=*,projetos(nome,pessoas(nome)),propostas(pessoas(nome))&status=eq.a receber
```

**Sem filtro de vencimento.** O universo de casamento é TODAS as parcelas em aberto, não só
as que vencem essa semana — unicidade calculada sobre conjunto filtrado é unicidade falsa.

```
mcp__3127b280-d585-413b-88be-3f3c586f3b93__openfinance_list_transactions
```

Peça só créditos (entradas) dos últimos 30 dias. Se este conector responder
`free_tier_limit_reached` ou erro: **isso é `❌ FALHOU Open Finance`** — pare, não tente o
outro conector (`dfabea12`) como substituto, ele está travado por assinatura pendente. Não
marque nada como pago nesta execução.

## 2. Regra de casamento — as 5 condições, todas obrigatórias

```
[ ] valor idêntico ao da parcela (tolerância R$ 0,00)
[ ] data do crédito entre (vencimento - 30 dias) e (vencimento + 3 dias)
[ ] o crédito não casa com nenhuma outra parcela do conjunto INTEIRO em aberto
[ ] a parcela não casa com nenhum outro crédito do período lido
[ ] o crédito ainda não foi usado (não existe financeiro.credito_conciliado_id igual)
```

Casamento exato e único → `PATCH /rest/v1/financeiro?id=eq.<uuid>` com `status='pago'`,
`credito_conciliado_id='<id do crédito>'`, `documento_fiscal='a emitir'`. Isso é EXECUTE —
não precisa de aprovação, é atualização de campo derivado de fonte viva.

**Qualquer outra coisa vira decisão do Nicolas, nunca "mais provável":**

| Caso | Tratamento |
|---|---|
| 1 crédito, 2+ parcelas de mesmo valor | listar as candidatas, ele escolhe o número |
| crédito maior que a parcela | não marcar — pode ser 2 parcelas juntas |
| crédito menor que a parcela | não marcar — pagamento parcial, decisão sobre o saldo |
| crédito sem parcela correspondente | listar como **receita não prevista** (pode ser projeto que nunca virou registro — é achado, não ruído a descartar) |
| descrição do extrato ilegível | listar crua, sem adivinhar o pagador |

## 3. Ao marcar pago

- Se a parcela era `tipo='entrada'`: libera o início do projeto — sinalize pro Nicolas
  atualizar `projetos.data_inicio_real` (via `irbis-projeto`, não aqui).
- Se era `tipo='recorrencia'`: atualiza sinal de MRR e checa proximidade de renovação
  (compromisso − 30 dias).
- Sempre: `POST /rest/v1/interacoes` (canal `financeiro`, `origem_do_registro='sistema'`,
  resumo com valor e data).

## 4. Formato de saída

```
FRONTEIRA DOS DADOS · {{data}} {{hora}} America/Sao_Paulo
✅ LIDO Supabase — financeiro ({{n}} a receber, sem recorte)
✅ LIDO Open Finance — Inter, créditos últimos 30d ({{n}} transações)

CASADOS AUTOMATICAMENTE ({{n}})
  {{cliente}} · R${{valor}} · venceu {{data}} · pago em {{data_credito}}

DECISÃO PENDENTE ({{n}})
  {{descrição do caso ambíguo, com as opções numeradas}}

RECEITA NÃO PREVISTA ({{n}})
  crédito de R${{valor}} em {{data}}, sem parcela correspondente. É de {{hipótese, se houver}}?
```

Se Open Finance falhou, a seção inteira vira `❌ FALHOU Open Finance — nada foi conciliado
nesta execução` e nada é marcado.

## Proibições

Não usar saldo da conta como proxy de "recebido". Não escolher o candidato "mais provável" em
empate. Não reconciliar duas vezes o mesmo crédito (o índice único em
`credito_conciliado_id` já barra isso no banco — se der erro `23505`, é o banco fazendo o
trabalho certo). Não tratar transação pessoal misturada na conta PF como dado da IRBIS — só
entra no relatório o que bateu exatamente com uma parcela ou que sobrou sem explicação
(receita não prevista, que exige confirmação humana antes de qualquer ação).
