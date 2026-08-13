# 🧾 Catálogo de Produtos Stripe — IRBIS

> Cada produto e preço pra cadastrar na Stripe. Moeda: **BRL (R$)**. Fontes: `calculadora-preco-build-irbis.md` (projeto) e `planos-recorrencia-irbis.md` (recorrência).

> ⚠️ **Atualização 04/ago/2026 — REESTRUTURADO.** Os 5 produtos antigos (Acompanhamento Básico/Pro, Criação de Site, Gerenciamento de Infraestrutura, Fábrica de Landing Pages) eram todos de site — produto fora de escopo desde a decisão de 04/ago (ver `CLAUDE.md` seção IDENTITY). Produtos antigos ficam preservados no fim deste doc como histórico — não usar pra cobrar cliente novo.
>
> ✅ **Preço definido pelo dono em 09/ago/2026** (ver seções 1-3 abaixo). Ainda faltam confirmar: teto de Sistemas muito complexo, preço do tier "empresa muito grande" de Consultoria, e se Automações (fora do Bot de IA) tem componente recorrente — tudo marcado ⚠️ nos lugares certos. Isso não bloqueia mais cadastrar os Prices que já têm número.
>
> 🔁 **FUNIL MUDOU em 13/ago/2026.** Consultoria de IA é a porta (o que se prospecta e o que a Reunião Única vende). Sistemas e Soluções com IA viraram "produção" — vendida na entrega da consultoria, não mais oferta de entrada. Os preços abaixo continuam valendo, só a ordem de venda muda. Árbitro: `03 - Comercial/00 - Planejamento/funil-consultoria-producao-irbis.md`. Numeração das seções abaixo preservada por compatibilidade com o resto do repo — ler seção 3 (Consultoria) como a entrada do funil, e seções 1-2 (Sistemas, Soluções com IA) como a produção vendida depois.

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
| `bot-ia-setup` | R$ 1.000 | one-time ⚠️ ver pendência abaixo |
| `bot-ia-mensal` | R$ 500 a R$ 3.000/mês (faixa; número na reunião) | recurring, **fidelidade mínima de 6 meses** ⚠️ **PENDENTE DE CADASTRO** |

> 🛑 **Revogado em 13/ago/2026:** "o Bot de IA virou a porta da IRBIS" (decisão de 12/ago). A porta agora é a Consultoria de IA (seção 3) — ver `funil-consultoria-producao-irbis.md`. O que segue abaixo sobre fidelidade, escopo da mensalidade e custo continua valendo; só o papel de "produto de entrada" mudou. Fidelidade de 6 meses. A mensalidade cobre infraestrutura, monitoramento, correção de defeito e **até 2 ajustes de prompt ou fluxo por mês**, que não acumulam; o que passa disso é fila ou aditivo. Escopo completo em `planos-recorrencia-irbis.md`, cláusula em `06 - Jurídico/contrato-prestacao-software-modelo.md` (Cláusula 5).

> ✅ **12/ago/2026 — a mensalidade virou faixa.** Era R$ 500 fixo. Olhando a Odery, o dono constatou que cobraria cerca de R$ 3.000 de um cliente daquele porte, e um preço único não cobre uma diferença de seis vezes. Mesma mecânica de Sistemas: faixa pública, número fechado na reunião. **Calibração: topo da faixa quando a operação é grande e o bot é central; base quando é conveniência.** Receita contratada por bot vai de R$ 4.000 no piso (R$ 1.000 + 6 × R$ 500) a R$ 19.000 no topo (R$ 1.000 + 6 × R$ 3.000).

⚠️ **O que a faixa significa no cadastro da Stripe:** um Price recurring guarda um valor, não um intervalo. Duas saídas, e o dono precisa escolher uma antes de cadastrar:
> 1. **Um Price por valor fechado** (ex.: `bot-ia-mensal-500`, `bot-ia-mensal-1000`, `bot-ia-mensal-1500`, e assim por diante), criado sob demanda quando o número sai da reunião. Mais controle e relatório limpo por faixa; exige criar Price novo a cada valor inédito.
> 2. **Um Price customizável** (`custom_unit_amount` com `minimum` 50000 e `maximum` 300000 em centavos), onde o valor é definido na hora de gerar a assinatura. Um único Price cobre a faixa toda; em compensação, o relatório da Stripe não separa por degrau.
>
> **Enquanto isso não for decidido, `bot-ia-mensal` não deve ser cadastrado.** Cadastrar R$ 500 fixo agora recria o problema que a faixa resolveu.

⚠️ **O setup acompanha a faixa? Pendente.** O dono falou só da mensalidade. Um bot de operação grande também dá mais trabalho para construir, então R$ 1.000 fixo pode não se sustentar. **Não deduzir.** Até ele decidir, `bot-ia-setup` é R$ 1.000 para todo mundo.

**2b. Automações** (fora do bot padrão)
**Tipo:** ⚠️ **PENDENTE** — o dono disse que "vai muito de escopo a escopo", sem faixa fixa. Também não confirmou se automação fora do bot tem componente recorrente (mensalidade de manutenção/evolução) ou é só one-time. Cotar caso a caso usando a `calculadora-preco-build-irbis.md`; não usar o preço do Bot de IA como âncora, são produtos diferentes.

| Price nickname | Valor | Tipo |
|---|---|---|
| `automacao-custom` | **PENDENTE — cotar por escopo** | **PENDENTE** |

---

## 3. Consultoria de IA — a porta do funil (produto de entrada, desde 13/ago/2026)

**Product name:** `Consultoria de IA`
**Descrição:** Diagnóstico completo da operação do cliente — o que está errado e, principalmente, a oportunidade de onde IA/sistema muda o jogo pra aquele negócio. É o que se prospecta e o que a Reunião Única fecha. A venda da produção (Sistemas/Bot, seções 1-2) acontece depois, na entrega deste diagnóstico.
**Tipo:** one-time (engajamento; o dono não mencionou formato recorrente pra esta frente — não assumir assinatura).

Faixa definida pelo dono (09/ago/2026), por faturamento anual do cliente:

| Price nickname | Valor | Critério | Tipo |
|---|---|---|---|
| `consultoria-ia-pme` | R$ 5.000 | Empresa com faturamento até R$ 10 milhões/ano | one-time |
| `consultoria-ia-grande` | R$ 10.000 | Empresa com faturamento acima de R$ 10 milhões/ano | one-time |
| `consultoria-ia-enterprise` | **PENDENTE — sob consulta** | Empresa muito grande — exige mais reuniões e presença do Nicolas | one-time |

---

## Checklist de cadastro na Stripe

- [x] Preço confirmado pelo dono pra: Sistemas (faixa R$3-10k), Bot de IA (R$1.000 de setup + mensalidade na faixa de R$500 a R$3.000, número fechado na reunião), Consultoria de IA (R$5k/R$10k por faturamento).
- [ ] **Decidir como a faixa da mensalidade do bot vira Price:** Prices por valor fechado ou um Price customizável de R$500 a R$3.000. Sem essa decisão, `bot-ia-mensal` fica fora do cadastro.
- [ ] Ainda pendente: se o setup do bot também vira faixa, teto de Sistemas complexo, preço de Consultoria enterprise, faixa/modelo de Automações fora do bot.
- [ ] Criar os Products/Prices com número definido acima (sistemas-projeto, bot-ia-setup, consultoria-ia-pme, consultoria-ia-grande). `bot-ia-mensal` só depois da decisão acima.
- [ ] **Redigir com a advogada a multa por cancelamento antes dos 6 meses** do Bot de IA. A Cláusula 5.5 do contrato modelo já tem o lugar reservado e a intenção comercial registrada (proporcional ao período restante), falta o texto jurídico. 🔴 **Trava o primeiro fechamento do produto que virou a porta.**
- [ ] **Validar a estimativa de custo de IA contra uma fatura real**, no primeiro bot que rodar em API paga. A Odery não serve: aparentemente roda modelo local e não gera contagem de token. A estimativa calculada está em `custo-ia-bot-estimativa.md`. Isso não trava a margem da IRBIS (o custo é do cliente), trava a resposta na reunião.
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
