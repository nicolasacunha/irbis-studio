# Conciliação financeira — 01/ago/2026

```
FRONTEIRA DOS DADOS · 2026-08-01 16:33 America/Sao_Paulo
✅ LIDO Supabase — financeiro (2 parcelas 'a receber', sem recorte de vencimento)
❌ FALHOU Open Finance — Inter: conexão OUTDATED, sem dados de jun/jul/ago
```

## ❌ FALHOU Open Finance — nada foi conciliado nesta execução

A conexão **não retornou erro nem `free_tier_limit_reached`** — ela respondeu, mas com dados
mortos. O diagnóstico:

- `openfinance_get_item_status` (item `c5c7be29-260d-4f62-ae83-284b6c5c952d`, Inter):
  status **`OUTDATED`**, `executionStatus: USER_INPUT_TIMEOUT`
  ("User requested input had expired"), `lastUpdatedAt: 2026-05-28T02:33:56Z`.
- `openfinance_list_transactions` na janela pedida (02/jul → 01/ago): **0 transações**.
- Varredura de controle (01/fev → 01/ago): 324 transações, a **mais recente em 27/mai/2026**.
  Nenhum lançamento em junho, julho ou agosto.

O histórico congelou no dia do consentimento (28/mai) e nunca mais sincronizou. Os "0 créditos
nos últimos 30 dias" são **cegueira, não ausência de crédito** — tratar essa resposta vazia
como "ninguém pagou" seria inventar um fato. Por isso nenhuma parcela foi marcada como paga e
nenhum `PATCH` foi executado.

**Ação que só o Nicolas pode fazer:** reautenticar a conta Inter pelo widget (abre em modo
UPDATE, não consome slot nem desconecta):

```
https://app.mcp.ai/connect/mi_j4rk6DXOuWQ8bW_B?u=usr_yhu6c2c6tymy&flow=quick&update_item=c5c7be29-260d-4f62-ae83-284b6c5c952d&field_bank_id=215
```

Abre o link no navegador, faz login no Inter e confirma o token/MFA dentro do prazo (o erro
anterior foi exatamente o tempo de input estourando). Depois disso a conciliação volta a
enxergar. O segundo conector (`dfabea12`) **não foi tentado** — segue travado por assinatura
pendente, decisão de gasto que é sua.

## CASADOS AUTOMATICAMENTE (0)

Nenhum. Sem extrato vivo, não há casamento possível.

## DECISÃO PENDENTE (0)

Nenhum caso ambíguo a decidir — não houve conjunto de créditos para comparar.

## RECEITA NÃO PREVISTA (0)

Não apurável nesta execução: identificar crédito sem parcela correspondente exige o extrato do
período, que está indisponível.

---

## Parcelas em aberto (lidas, à espera de extrato)

Universo completo de `status = 'a receber'`, sem recorte — 2 parcelas, **R$ 5.597,00**:

| Cliente / Projeto | Tipo | Valor | Vencimento | Janela de casamento (venc −30d / +3d) |
|---|---|---|---|---|
| Matheus Utrabo · Casa Paes | marco | R$ 600,00 | 27/ago/2026 | 28/jul → 30/ago — **já aberta** |
| Ana Cunha · Minuta - A. Cunha Advocacia | entrada | R$ 4.997,00 | 26/set/2026 | 27/ago → 29/set — ainda não abriu |

Os dois valores são distintos entre si, então quando o extrato voltar não há risco estrutural
de empate de valor entre as parcelas do conjunto.

Ponto de atenção para a próxima execução: a parcela da A. Cunha é `tipo = 'entrada'` — quando
ela for conciliada, libera o início do projeto e pede atualizar
`projetos.data_inicio_real` (via `irbis-projeto`, não pela conciliação).

*Sem commit e sem deploy — relatório apenas.*
