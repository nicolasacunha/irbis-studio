---
name: irbis-precificacao
description: 'Use quando a tarefa envolver definir ou revisar preço na IRBIS — cotar um site/build, um sistema ou software custom, planos de recorrência/MRR, retainer de manutenção, ou responder objeção de preço. Dispara em: "quanto cobrar", "tá caro", "não consigo pagar", precificar, faixa de preço, orçamento, cotação, setup + mensalidade, charm pricing, cost-plus, ancoragem, capacidade de pagar do cliente, valor por hora, catálogo Stripe, cotação de projeto pontual.'
---

# IRBIS — Precificação

Como a IRBIS define preço: **por valor entregue ao negócio do cliente, nunca por hora ou esforço.** O projeto pontual é a porta; a recorrência é o ativo.

Esta skill é o raciocínio. Os números vivos e os catálogos estão nos docs canônicos (fim do arquivo) — sempre cheque-os antes de cotar, porque preço muda e a skill não.

## Quando NÃO usar esta skill

| Situação | Use no lugar |
|---|---|
| Conduzir a call, ancorar preço ao vivo, silêncio pós-preço, objeção na reunião | `irbis-call-de-vendas` |
| Escrever a copy da proposta/mensagem (tom, palavras proibidas) | `irbis-brand-voice` |
| Briefing, entrega, repitch de MRR, pedido de indicação pós-venda | `irbis-entrega-e-recorrencia` |
| O que é canônico vs. obsoleto no repo (pós-pivot) | `irbis-guarda-pivot` |

Esta skill decide **quanto**. As outras decidem **como comunicar** e **quando**.

## Os princípios inegociáveis

**1. Valor, não hora.** Preço vem do que o site/sistema faz pelo negócio do cliente, não do teu tempo. Cost-plus (horas × taxa) pune tua eficiência (quanto melhor fica, menos ganha), ancora contra freelancer, e ignora o cliente. **Tua velocidade é margem, não desconto.** Fazer em 7 dias o que levaria 6 semanas é o teu lucro — não motivo pra cobrar menos.

**2. Piso → teto → preço no meio-alto.** Piso = teu custo de oportunidade (só o chão, nunca a base). Teto = valor pro negócio do cliente **E** a capacidade real dele de pagar. O preço fica entre os dois, puxando pro valor.

**3. Ancora no mercado certo.** O comparável é o que o cliente realmente contrataria como alternativa — não um mercado inventado. Um app vibe-coded pra agência pequena ≠ software house enterprise. Nunca cite um número que você não sustenta ("uma agência cobraria R$150k") — âncora inventada destrói a confiança em tudo que você disse.

**4. Capacidade de pagar é um teto real.** Porte do cliente importa. Uma empresa pequena não tem o mesmo bolso que uma grande — mesmo escopo, preço diferente. **WTP revelada é ouro:** o que o cliente já recusou define o teto dele. Preço acima disso não fecha.

**5. Recorrência é o ativo; o projeto é a porta.** Não maximize o cheque de entrada. Maximize o MRR + o case. Cliente sem caixa → **build enxuto + mensalidade** (dilui o desembolso, resolve o fluxo dele, te dá MRR).

**6. Charm pricing sempre** (termina em 7 ou 9: R$ 4.497, R$ 997, R$ 297). Decisão firme do dono. Ver [[project_pricing-estrutura-irbis]].

**7. Nunca mostre horas ou dias ao cliente.** Sempre valor fechado. Falou em hora, virou freelancer na cabeça dele.

**8. Piso da IRBIS: acima de freelancer, abaixo de agência.** Não brigue na faixa do GetNinjas (R$ 800–1.500) nem finja ser software house. O preço tem que sinalizar o posicionamento.

## Método 1 — Build de site (projeto pontual)

Faixa-base por tipo → move dentro da faixa pela pergunta *"de onde vêm seus clientes hoje e quanto vale um cliente novo?"* (site = canal de venda → topo; cartão de visitas → base) → calibra por porte → modificadores (copy do zero, integrações, prazo, idiomas). Detalhe e faixas: doc `calculadora-preco-build-irbis.md`.

## Método 2 — Software / sistema custom

Não é site. É outra categoria (backend, auth, realtime, permissões). Mas **ancora no mercado certo** (freelancer que faz sob medida pra aquele porte, não software house) e no **teto de capacidade de pagar**. Estrutura vencedora pra cliente pequeno: **setup enxuto + mensalidade + aditivos**. O trabalho real fica no setup; a mensalidade é o MRR e cobre a manutenção (código vibe-coded quebra — a mensalidade é o seguro). Se é o primeiro case de uma categoria nova, o desconto no build compra a prova social — venda barato **em troca do case + depoimento + indicações**, explícito, não por fraqueza.

## Método 3 — Recorrência

Duas naturezas: **dor** (hospedagem/backup/uptime = teto baixo de WTP, ancora contra commodity) vs. **ganho** (o site/sistema melhora todo mês = teto alto, o cliente paga feliz). Venda por **compromisso de duração** (3/6/12 meses), preço/mês cai com o prazo. Para travar o compromisso na Stripe, **cobre o período inteiro adiantado** — preços mensais soltos não travam nada. Detalhe: `planos-recorrencia-irbis.md` e `stripe-catalogo-produtos-irbis.md`.

### Retainer de manutenção — regras

- É **seguro/disponibilidade, não venda de horas.** Não calcule "2h valem R$ X" — isso é cost-plus disfarçado.
- Precifique por **retenção**: baixo o bastante pra o cliente nunca pensar em cancelar > alto o bastante pra maximizar o mês. Reter 3 anos a R$ 297 > 4 meses a R$ 497.
- **Fronteira obrigatória** (senão o retainer morre): X horas/mês incluídas, só ajuste e correção; **feature nova = aditivo**; hora excedente com preço definido.
- **Ausência de custo não justifica preço baixo.** Se a infra fica na conta do cliente, o retainer é lucro limpo — cobre sem culpa, não cobre menos.

## Armadilhas (o preço que "parece certo" e está errado)

| Armadilha | Realidade |
|---|---|
| "Faço em 7 dias, então cobro 7 dias de trabalho" | Cost-plus. O cliente compra o resultado, não teus dias. Velocidade é margem. |
| "É tudo lucro (sem custo), posso cobrar pouco" | Ausência de custo ≠ cobrar menos. Preço vem do valor. Lucro limpo = cobrar sem culpa. |
| "Uma agência cobraria R$ X" (número que não sustento) | Âncora inventada. Se te pedem a fonte e não tem, você perde a credibilidade toda. |
| "8 funcionários, então mais caro / mais barato" | Headcount não precifica software. Porte é proxy de capacidade de pagar, não de escopo. |
| "O retainer é 2h, então vale o preço de 2h" | Retainer é disponibilidade, não horas. Precifica por retenção. |
| "Cobro cheio pra maximizar o projeto" | O ativo é o MRR + o case, não o cheque de entrada. Às vezes o build barato é a jogada. |
| "O protótipo já está quase pronto, é simples" | Protótipo visual esconde a engenharia (realtime, permissões). O caro é invisível. |

## Red flags — pare e recalibre

- Você citou um número de comparação sem fonte real.
- O preço saiu de "meu tempo × taxa" em vez do valor pro cliente.
- Você está cobrando menos porque "é fácil/rápido pra mim".
- Você ignorou o que o cliente já disse que consegue (ou não) pagar.
- Você está maximizando o upfront e esquecendo o MRR.

## Condições comerciais (sempre)

- **Entrada paga antes de começar**, escopo assinado. Em projeto de risco, dinheiro atrelado a marcos de entrega.
- Preço só na call/proposta, nunca solto no chat (reframe pra reunião — ver `irbis-call-de-vendas`).

## Docs canônicos (cheque antes de cotar — números vivem aqui)

- `03 - Comercial/03 - Reunião de Vendas/calculadora-preco-build-irbis.md` — faixas de build de site.
- `03 - Comercial/04 - Entrega e Recorrência/planos-recorrencia-irbis.md` — planos de recorrência por compromisso.
- `03 - Comercial/04 - Entrega e Recorrência/stripe-catalogo-produtos-irbis.md` — catálogo Stripe.
- `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md` — quebra de preço do build + MRR.
