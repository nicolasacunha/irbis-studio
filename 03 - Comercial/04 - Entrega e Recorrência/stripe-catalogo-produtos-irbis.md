# 🧾 Catálogo de Produtos Stripe — IRBIS

> Cada produto e preço pra cadastrar na Stripe. Moeda: **BRL (R$)**. Fontes: `calculadora-preco-build-irbis.md` (build) e `planos-recorrencia-irbis.md` (recorrência).

## Como a Stripe organiza

- **Product** = o que você vende (ex.: "Acompanhamento Pro").
- **Price** = quanto e como cobra. Um produto pode ter vários preços (ex.: 3, 6 e 12 meses).
- **one-time** = pagamento único (builds). **recurring** = assinatura (planos e add-ons).

O **compromisso de duração** (3/6/12 meses) não é nativo da Stripe. Cada duração vira um **Price mensal diferente**; o termo e a multa por cancelamento antecipado ficam no contrato, com `commitment_months` na metadata do Price pra você rastrear.

---

## 1. Acompanhamento Básico — assinatura

**Product name:** `Acompanhamento Básico`
**Descrição:** Hospedagem gerida, segurança, backup e monitoramento de uptime.
**Tipo:** recurring · intervalo mensal

> ⚠️ **Preço pendente de decisão.** Valores abaixo são o ajuste recomendado (dor = preço de dor). A proposta original era R$ 500 / 400 / 250. Confirmar antes de cadastrar. Ver `planos-recorrencia-irbis.md`.

| Price nickname | Valor/mês | Intervalo | Metadata |
|---|---|---|---|
| `basico-3m` | R$ 297 | month | `commitment_months=3` |
| `basico-6m` | R$ 247 | month | `commitment_months=6` |
| `basico-12m` | R$ 197 | month | `commitment_months=12` |

---

## 2. Acompanhamento Pro — assinatura

**Product name:** `Acompanhamento Pro`
**Descrição:** Tudo do Básico + alterações na página (fila, 1 por vez, resposta em 48h úteis) + ajuste de conversão + relatório mensal.
**Tipo:** recurring · intervalo mensal

| Price nickname | Valor/mês | Intervalo | Metadata |
|---|---|---|---|
| `pro-3m` | R$ 997 | month | `commitment_months=3` |
| `pro-6m` | R$ 847 | month | `commitment_months=6` |
| `pro-12m` | R$ 697 | month | `commitment_months=12` |

---

## 3. Criação de Site (build) — pagamento único

**Product name:** `Criação de Site`
**Descrição:** Montagem do site. Preço por valor, definido na call (ver calculadora).
**Tipo:** one-time

O build é **por valor**, não preço fixo. Duas formas de cobrar:

- **Recomendado — preço avulso (ad-hoc):** ao gerar o Payment Link ou a fatura do cliente, digite o valor fechado na call. Não precisa cadastrar Price fixo.
- **Opcional — Prices-âncora** (agiliza, use o piso de cada faixa e ajuste pra cima quando o valor da call for maior):

| Price nickname | Valor (piso da faixa) | Tipo |
|---|---|---|
| `build-landing` | R$ 1.997 | one-time |
| `build-institucional` | R$ 3.497 | one-time |
| `build-integracoes` | R$ 6.997 | one-time |
| `build-ecommerce` | R$ 11.997 | one-time |

> **Site + Pro (setup subsidiado):** quando o cliente assina a recorrência, o build entra com desconto (setup ~R$ 1.997 + assinatura Pro). Cobrar como duas linhas: `Criação de Site` (valor de setup ad-hoc) + assinatura `Acompanhamento Pro`. Confirmar valor do setup antes de fixar.

---

## 4. Gerenciamento de Infraestrutura — add-on

**Product name:** `Gerenciamento de Infraestrutura`
**Descrição:** Hospedagem + domínio + SSL geridos. Entrada mais barata, pra quem nem quer site novo.
**Tipo:** recurring · intervalo mensal

| Price nickname | Valor/mês | Intervalo |
|---|---|---|
| `infra-mensal` | R$ 197 *(faixa R$ 150–250)* | month |

---

## 5. Fábrica de Landing Pages — add-on

**Product name:** `Fábrica de Landing Pages`
**Descrição:** 1–2 landing pages por mês + análise de performance + reunião quinzenal. Pra quem roda tráfego pago.
**Tipo:** recurring · intervalo mensal

| Price nickname | Valor/mês | Intervalo |
|---|---|---|
| `fabrica-lp-mensal` | R$ 2.497 *(faixa R$ 2.000–3.000)* | month |

---

## Checklist de cadastro na Stripe

- [ ] Confirmar preço do **Básico** antes de cadastrar (pendente).
- [ ] Criar os 5 Products acima.
- [ ] Básico e Pro: 3 Prices recorrentes cada (3m/6m/12m), com `commitment_months` na metadata.
- [ ] Build: decidir entre preço ad-hoc (recomendado) ou cadastrar os 4 Prices-âncora.
- [ ] Infra e Fábrica de LP: 1 Price recorrente cada.
- [ ] Definir no contrato a **multa por cancelamento antecipado** (a Stripe não força o termo).
- [ ] Gerar Payment Links por Price pra usar em proposta/fechamento.
