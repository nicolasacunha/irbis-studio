# 🧾 Catálogo de Produtos Stripe — IRBIS

> Cada produto e preço pra cadastrar na Stripe. Moeda: **BRL (R$)**. Fontes: `calculadora-preco-build-irbis.md` (projeto) e `planos-recorrencia-irbis.md` (recorrência).

> ⚠️ **Atualização 04/ago/2026 — REESTRUTURADO.** Os 5 produtos antigos (Acompanhamento Básico/Pro, Criação de Site, Gerenciamento de Infraestrutura, Fábrica de Landing Pages) eram todos de site — produto fora de escopo desde a decisão de 04/ago (ver `CLAUDE.md` seção IDENTITY). Produtos antigos ficam preservados no fim deste doc como histórico — não usar pra cobrar cliente novo.
>
> ✅ **Preço definido pelo dono em 09/ago/2026** (ver seções 1-3 abaixo). Ainda faltam confirmar: teto de Sistemas muito complexo, preço do tier "empresa muito grande" de Consultoria, e se Automações (fora do Bot de IA) tem componente recorrente — tudo marcado ⚠️ nos lugares certos. Isso não bloqueia mais cadastrar os Prices que já têm número.

## Como a Stripe organiza

- **Product** = o que você vende (ex.: "Sistemas — projeto").
- **Price** = quanto e como cobra. Um produto pode ter vários preços (ex.: 3, 6 e 12 meses).
- **one-time** = pagamento único (projeto fechado). **recurring** = assinatura (acompanhamento contínuo).

O **compromisso de duração** (3/6/12 meses), quando aplicável, não é nativo da Stripe. Cada duração vira um **Price mensal diferente**; o termo e a multa por cancelamento antecipado ficam no contrato, com `commitment_months` na metadata do Price pra rastrear.

---

## 1. Sistemas — pagamento único (projeto)

**Product name:** `Sistemas — Projeto`
**Descrição:** CRM, ERP e sistemas de IA sob medida (ex.: CRM da Odery, sistema da A. Cunha ADV). Qualquer tipo de sistema entra aqui, não só CRM/ERP.
**Tipo:** one-time.

Faixa definida pelo dono (09/ago/2026): **R$ 3.000–10.000**, valor fechado calibrado pela `calculadora-preco-build-irbis.md` (gargalo central → topo da faixa; conveniência → base).

⚠️ **Projeto muito complexo → sai da faixa, sob consulta.** O dono precisa estar presente pra avaliar antes de cotar; não tem teto definido — não cotar nada acima de R$10k sem essa reunião.

| Price nickname | Valor | Tipo |
|---|---|---|
| `sistemas-projeto` | R$ 3.000–10.000 (faixa fechada) | one-time |
| `sistemas-projeto-complexo` | **PENDENTE — sob consulta, dono precisa avaliar** | one-time |

---

## 2. Soluções com IA — dois produtos com lógica diferente

**Product name:** `Soluções com IA`
**Descrição:** Automações, chatbots e agentes de IA aplicados à operação do cliente.

**2a. Bot de IA** (ex.: bot de WhatsApp implementado na Odery)
**Tipo:** híbrido — setup one-time + assinatura recurring.

| Price nickname | Valor | Tipo |
|---|---|---|
| `bot-ia-setup` | R$ 1.000 | one-time |
| `bot-ia-mensal` | R$ 500/mês | recurring |

**2b. Automações** (fora do bot padrão)
**Tipo:** ⚠️ **PENDENTE** — o dono disse que "vai muito de escopo a escopo", sem faixa fixa. Também não confirmou se automação fora do bot tem componente recorrente (mensalidade de manutenção/evolução) ou é só one-time. Cotar caso a caso usando a `calculadora-preco-build-irbis.md`; não usar o preço do Bot de IA como âncora, são produtos diferentes.

| Price nickname | Valor | Tipo |
|---|---|---|
| `automacao-custom` | **PENDENTE — cotar por escopo** | **PENDENTE** |

---

## 3. Consultoria de IA — engajamento por porte do cliente

**Product name:** `Consultoria de IA`
**Descrição:** Diagnóstico de como a IA é usada hoje na empresa do cliente e indicação do caminho certo a seguir.
**Tipo:** one-time (engajamento; o dono não mencionou formato recorrente pra esta frente — não assumir assinatura).

Faixa definida pelo dono (09/ago/2026), por faturamento anual do cliente:

| Price nickname | Valor | Critério | Tipo |
|---|---|---|---|
| `consultoria-ia-pme` | R$ 5.000 | Empresa com faturamento até R$ 10 milhões/ano | one-time |
| `consultoria-ia-grande` | R$ 10.000 | Empresa com faturamento acima de R$ 10 milhões/ano | one-time |
| `consultoria-ia-enterprise` | **PENDENTE — sob consulta** | Empresa muito grande — exige mais reuniões e presença do Nicolas | one-time |

---

## Checklist de cadastro na Stripe

- [x] Preço confirmado pelo dono pra: Sistemas (faixa R$3-10k), Bot de IA (R$1.000 + R$500/mês), Consultoria de IA (R$5k/R$10k por faturamento).
- [ ] Ainda pendente: teto de Sistemas complexo, preço de Consultoria enterprise, faixa/modelo de Automações fora do bot.
- [ ] Criar os Products/Prices com número definido acima (sistemas-projeto, bot-ia-setup, bot-ia-mensal, consultoria-ia-pme, consultoria-ia-grande).
- [ ] Definir no contrato a **multa por cancelamento antecipado** do Bot de IA (único com componente recurring confirmado até agora).
- [ ] Gerar Payment Links por Price pra usar em proposta/fechamento.
- [ ] **Desativar/arquivar na Stripe** (se já estiverem cadastrados) os 5 produtos de site abaixo — não usar pra cliente novo.

---

## Histórico — catálogo de site (vigente até 04/ago/2026, fora de escopo)

Preservado como referência, não como catálogo ativo.

**1. Acompanhamento Básico — assinatura.** Hospedagem gerida, segurança, backup, monitoramento de uptime. `basico-3m` R$ 297/mês · `basico-6m` R$ 247/mês · `basico-12m` R$ 197/mês.

**2. Acompanhamento Pro — assinatura.** Tudo do Básico + alterações na página + ajuste de conversão + relatório mensal. `pro-3m` R$ 997/mês · `pro-6m` R$ 847/mês · `pro-12m` R$ 697/mês.

**3. Criação de Site — pagamento único.** Preço por valor, definido na call. Prices-âncora: `build-landing` R$ 1.997 · `build-institucional` R$ 3.497 · `build-integracoes` R$ 6.997 · `build-ecommerce` R$ 11.997.

**4. Gerenciamento de Infraestrutura — add-on.** Hospedagem + domínio + SSL geridos. `infra-mensal` R$ 197/mês.

**5. Fábrica de Landing Pages — add-on.** 1–2 landing pages/mês + análise de performance + reunião quinzenal. `fabrica-lp-mensal` R$ 2.497/mês.
