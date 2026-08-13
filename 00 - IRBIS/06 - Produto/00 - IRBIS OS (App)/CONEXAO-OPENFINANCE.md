# Conexão com Open Finance (Fase 5)

## Estado real, 28/jul/2026

Existem **dois** conectores Banco MCP (mcp.ai/pluggy) disponíveis nesta sessão:

- **`mcp__3127b280-d585-413b-88be-3f3c586f3b93__openfinance_*`** — conectado, 1 banco: **Inter**
  (`connector_id=215`, `item_id=c5c7be29-260d-4f62-ae83-284b6c5c952d`, status `UPDATED`).
  Ferramentas: `openfinance_list_transactions`, `openfinance_get_account_balance`,
  `openfinance_list_accounts`, `openfinance_force_sync`, etc. `audience: "pf"` — é uma conta
  **pessoa física**, não uma conta PJ.
- **`mcp__dfabea12-b8da-4a03-8d21-2c8fb9735ccc__openfinance_*`** — mesma família de
  ferramentas, mas **o teste grátis acabou** (`free_tier_limit_reached`, 10 requisições
  incluídas). Exige assinatura (R$19,90 a R$49,90/mês) pra voltar a responder. **Não assinei
  nada** — contratar plano é decisão de gasto recorrente, fica com o Nicolas.

## A discrepância com o núcleo da Fase 5

O núcleo do sistema fala em "extrato **PJ**" e "conta PJ" o tempo todo. Isso não bate com a
realidade registrada: **a IRBIS não tem CNPJ** (decisão de 20/jul/2026 — tudo entra como PF,
sem nota fiscal). A conta Inter conectada via `3127b280` **é** a conta operacional real, só
que pessoa física, não jurídica. As skills desta fase tratam essa conta PF como a fonte de
Open Finance, e o texto "conta PJ" do núcleo é lido como "a conta bancária operacional",
sem forçar uma pessoa jurídica que não existe.

**Consequência de privacidade:** por ser conta PF, pode haver transações pessoais misturadas
com as da IRBIS. O desenho da conciliação (seção 2 da Fase 5) já mitiga isso por construção:
só casa crédito com **valor idêntico** a uma parcela cadastrada em `financeiro` — um gasto ou
recebimento pessoal sem parcela correspondente nunca vira match, e não é listado a menos que
bata exatamente com um valor esperado.

## Padrão de uso

```
mcp__3127b280-d585-413b-88be-3f3c586f3b93__openfinance_list_transactions
  (item_id opcional — só há 1 banco conectado, pode omitir)
```

Consulte só **créditos** (entradas) dos últimos 30-60 dias conforme a janela pedida pela
skill. Nunca use saldo (`get_account_balance`) como proxy de "recebido" — saldo mistura tudo.

Se este conector também retornar `free_tier_limit_reached` no futuro, trate como
`❌ FALHOU Open Finance` na Fronteira dos Dados — **não tente a outra conta (`dfabea12`) como
substituta silenciosa**, ela está travada até o Nicolas decidir assinar.
