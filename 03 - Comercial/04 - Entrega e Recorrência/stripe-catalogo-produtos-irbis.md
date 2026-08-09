# 🧾 Catálogo de Produtos Stripe — IRBIS

> Cada produto e preço pra cadastrar na Stripe. Moeda: **BRL (R$)**. Fontes: `calculadora-preco-build-irbis.md` (projeto) e `planos-recorrencia-irbis.md` (recorrência).

> ⚠️ **Atualização 04/ago/2026 — REESTRUTURADO, PREÇO PENDENTE.** Os 5 produtos antigos (Acompanhamento Básico/Pro, Criação de Site, Gerenciamento de Infraestrutura, Fábrica de Landing Pages) eram todos de site — produto fora de escopo desde a decisão de 04/ago (ver `CLAUDE.md` seção IDENTITY). Nenhum tinha Price cadastrado equivalente pras 3 frentes atuais. Abaixo está a estrutura nova, com o preço de cada frente marcado como **PENDENTE**: não cadastrar nada na Stripe a partir daqui até o número ser confirmado pelo dono. Produtos antigos ficam preservados no fim deste doc como histórico — não usar pra cobrar cliente novo.

## Como a Stripe organiza

- **Product** = o que você vende (ex.: "Sistemas — projeto").
- **Price** = quanto e como cobra. Um produto pode ter vários preços (ex.: 3, 6 e 12 meses).
- **one-time** = pagamento único (projeto fechado). **recurring** = assinatura (acompanhamento contínuo).

O **compromisso de duração** (3/6/12 meses), quando aplicável, não é nativo da Stripe. Cada duração vira um **Price mensal diferente**; o termo e a multa por cancelamento antecipado ficam no contrato, com `commitment_months` na metadata do Price pra rastrear.

---

## 1. Sistemas — pagamento único (projeto)

**Product name:** `Sistemas — Projeto`
**Descrição:** CRM, ERP e sistemas de IA sob medida (ex.: sistema da A. Cunha ADV). Qualquer tipo de sistema entra aqui, não só CRM/ERP.
**Tipo:** one-time (provável — confirmar com o dono se algum formato de Sistemas deveria ser recorrente desde o início)

> ⚠️ **PENDENTE — sem preço nem faixa definida.** `calculadora-preco-build-irbis.md` tinha faixas por tipo de site (landing/institucional/integrações/e-commerce); a lógica de "preço por valor entregue ao negócio, não por hora" provavelmente transfere, mas as faixas em R$ precisam ser refeitas do zero pra escopo de sistema — não são as mesmas faixas de site com nome trocado.

| Price nickname | Valor | Tipo |
|---|---|---|
| `sistemas-projeto` | **PENDENTE** | one-time |

---

## 2. Soluções com IA — modelo de cobrança pendente

**Product name:** `Soluções com IA`
**Descrição:** Automações, chatbots e agentes de IA aplicados à operação do cliente.
**Tipo:** **PENDENTE** — não decidido se é one-time (build de automação) ou recurring (manutenção/evolução do agente ao longo do tempo, parecido com a lógica antiga de "Acompanhamento"). Automação que roda continuamente pode justificar assinatura; automação pontual pode ser projeto fechado. Não decidi isso sozinho.

| Price nickname | Valor | Tipo |
|---|---|---|
| `solucoes-ia` | **PENDENTE** | **PENDENTE** |

---

## 3. Consultoria de IA — modelo de cobrança pendente

**Product name:** `Consultoria de IA`
**Descrição:** Diagnóstico de como a IA é usada hoje na empresa do cliente e indicação do caminho certo a seguir.
**Tipo:** **PENDENTE** — provável one-time (engajamento de diagnóstico com prazo definido), mas pode ter formato recorrente se virar acompanhamento contínuo. Confirmar com o dono.

| Price nickname | Valor | Tipo |
|---|---|---|
| `consultoria-ia` | **PENDENTE** | **PENDENTE** |

---

## Checklist de cadastro na Stripe (pausado)

- [ ] **BLOQUEADO até o dono confirmar preço e modelo de cobrança (one-time/recurring) das 3 frentes.**
- [ ] Decidir se Soluções com IA e/ou Consultoria de IA têm componente recorrente.
- [ ] Definir se algum formato de recorrência (estilo "compromisso de 3/6/12 meses" do plano antigo) se aplica a alguma das 3 frentes.
- [ ] Criar os Products acima só depois do preço confirmado.
- [ ] Definir no contrato a **multa por cancelamento antecipado**, se houver componente recorrente.
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
