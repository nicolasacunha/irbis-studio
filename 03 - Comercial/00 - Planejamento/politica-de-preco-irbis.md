# Política de preço da IRBIS

> Criado em 12/ago/2026 por decisão do dono. **Este documento é o árbitro.** Onde qualquer script, roteiro, manual ou skill divergir sobre quando o preço pode ser dito, vale o que está aqui.

## A regra, em uma linha

**A faixa é pública. O número fechado nasce na reunião.**

Faixa pode ser dita em qualquer canal, por qualquer um dos dois, a qualquer momento, inclusive antes de qualquer conversa. O valor fechado de um projeto específico só existe depois do diagnóstico, e só sai na reunião de venda.

## O que é "faixa" e o que é "número fechado"

| | Faixa | Número fechado |
|---|---|---|
| O que é | O intervalo público da frente | O valor daquele projeto, daquele cliente |
| Exemplo | "Sistema fechado fica entre R$ 3.000 e R$ 10.000, depende do escopo" | "O seu fica R$ 7.400" |
| Onde pode sair | Qualquer canal | Só na reunião de venda, depois do diagnóstico |
| Quem pode dizer | Nicolas e o colaborador | Só o Nicolas |
| Precisa de contexto antes? | Não | Sim, sempre |

## Faixas vigentes (desde 09/ago/2026)

| Frente | Faixa pública | Recorrência |
|---|---|---|
| Sistemas (projeto padrão) | R$ 3.000 a R$ 10.000, valor fechado por escopo | Não tem |
| Sistemas muito complexo | Sob consulta. **Não estimar teto**, não inventar número | Não tem |
| Bot de IA (dentro de Soluções com IA) | R$ 1.000 de setup + **R$ 500 a R$ 3.000/mês** (faixa; número na reunião) | Sim, a mensalidade |
| Automações fora do bot | Sob consulta. **Faixa ainda não definida** | Pendente |
| Consultoria de IA, cliente até R$ 10 mi/ano | R$ 5.000 | Não tem |
| Consultoria de IA, cliente acima de R$ 10 mi/ano | R$ 10.000 | Não tem |
| Consultoria de IA enterprise | Sob consulta. **Preço ainda não definido** | Pendente |

Fonte: `03 - Comercial/04 - Entrega e Recorrência/stripe-catalogo-produtos-irbis.md`.

**Nunca cotar por hora.** Falou em hora, virou freelancer na cabeça do cliente. A única exceção documentada está na cláusula de horas excedentes do contrato assinado, que é pós-venda, não é oferta.

## A escada de oferta (decisão de 12/ago/2026)

**Bot de IA é a porta. Sistemas é o upsell.**

| Degrau | Produto | Preço | Papel |
|---|---|---|---|
| **Entrada** | **Bot de IA** | R$ 1.000 setup + **R$ 500 a R$ 3.000/mês** (número na reunião) | O que se prospecta. Venda rápida, objeção baixa, gera MRR |
| **Camada seguinte** | **Sistemas** | R$ 3.000 a 10.000 | Vendido a quem já é cliente do bot, não prospectado a frio |
| Lateral | **Consultoria de IA** | R$ 5.000 ou R$ 10.000 | Não é porta. A R$5.000 tem tamanho de projeto, não de entrada. Entra quando o cliente pede diagnóstico, não como oferta de topo |

**O que isso muda na prática:**
- O colaborador prospecta **Bot de IA**, não as três frentes. Uma oferta por lista, um gancho por oferta.
- Sistemas sai do discurso de prospecção e entra no de carteira. O momento do upsell é o repitch de F7 do método e o campo "próxima camada" da carteira.
- A faixa de Sistemas continua pública (ver tabela acima), porque quem pergunta pergunta. O que muda é que ela não é mais o que se oferece primeiro.

**Por que isso importa para o caixa:** o Bot é o único produto recorrente que existe. Sistemas e Consultoria são one-time e não constroem base. Cada bot vale **R$ 4.000 de receita contratada** no dia da assinatura (R$ 1.000 de setup mais os 6 meses travados), e a meta vigente é **3 bots até 30/set**, ou R$ 12.000 contratados. Ver `docs/metas-por-chapeu.md`.

## Como a faixa aparece em cada canal

**Instagram, conteúdo, páginas de intenção do pSEO.** A faixa pode ser o assunto do conteúdo. As páginas de "quanto custa sistema com IA para advocacia" já operam assim e estão certas. O conteúdo entrega a faixa e o CTA leva pra conversa.

**DM e WhatsApp.** Se o lead perguntar preço, responde com a faixa das três frentes na hora, sem rodeio. Se ele insistir por um número exato, repete a faixa e vira pra reunião:

> Sistema fechado fica entre R$ 3.000 e R$ 10.000. Bot de IA é R$ 1.000 de implementação mais uma mensalidade entre R$ 500 e R$ 3.000, dependendo do tamanho da operação. Consultoria de IA é R$ 5.000, ou R$ 10.000 se a empresa fatura acima de R$ 10 milhões por ano.
> O número do seu caso eu só consigo te dar depois de entender o que trava a sua operação. É pra isso que serve a reunião. Consegue [dia] às [hora]?

**Cold call.** A faixa pode ser dita se o lead perguntar. A regra antiga ("preço nunca na ligação") **está revogada**. O que não sai na ligação é o número fechado, porque na ligação você ainda não diagnosticou nada.

**Reunião de venda.** É onde o número fechado nasce, no bloco de ancoragem. Calibração dentro da faixa: **topo quando o gargalo é central pro negócio, base quando é conveniência.** Método em `03 - Comercial/03 - Reunião de Vendas/calculadora-preco-build-irbis.md`.

**Proposta escrita.** Sai depois da reunião, com o número fechado que foi apresentado ao vivo. A proposta confirma o que já foi dito, nunca revela.

## O que nunca sai, em nenhum canal

- Número fechado antes do diagnóstico.
- Estimativa de "Sistema complexo", "Automação fora do bot" ou "Consultoria enterprise". Os três estão sob consulta e **não têm faixa**. Se cair um lead desses, o valor volta depois da reunião, com o Nicolas.
- Valor por hora como oferta.
- Desconto oferecido antes de o cliente pedir.
- Qualquer preço do catálogo antigo de site (R$ 197, R$ 297, R$ 997, R$ 1.997, R$ 2.497, R$ 3.497, R$ 4.497, R$ 6.997, R$ 11.997). Estão mortos desde 04/ago/2026.

## Exceção declarada: QG OS

O contrato do Arialdo/QG OS foi cotado em **R$ 2.997 de setup, R$ 197/mês e R$ 127/h**, abaixo do piso da faixa de Sistemas. Isso foi **decisão do dono para formar portfólio**, confirmada em 20/jul/2026 e reafirmada em 12/ago/2026.

Regras que decorrem disso:
- Não é precedente. Nenhum projeto novo de Sistemas nasce abaixo de R$ 3.000.
- Não usar R$ 2.997 como âncora em nenhuma conversa.
- A mensalidade de R$ 197 e a hora de R$ 127 **não existem no catálogo**. Não repetir em proposta nova.
- Quando esse projeto virar case, o valor não entra na comunicação.

## Pendências que travam preço

### ✅ Resolvidas em 12/ago, junto com a decisão da porta

1. **Fidelidade do Bot de IA: 6 meses.** LTV mínimo de R$ 4.000, acima do piso de Sistemas, então a reunião de 1 hora se paga. O vencimento no mês 6 é o gatilho natural do upsell para Sistemas, com 5 meses de resultado medido na mão.
2. **O que a mensalidade cobre:** infraestrutura e disponibilidade, monitoramento, correção de erro do que foi entregue, e **até 2 ajustes de prompt ou fluxo por mês**, que não acumulam. O que passa disso é fila do mês seguinte ou aditivo cotado. Lista completa em `03 - Comercial/04 - Entrega e Recorrência/planos-recorrencia-irbis.md`. ⚠️ O escopo é o mesmo em toda a faixa: quem paga R$ 3.000 recebe a mesma lista de quem paga R$ 500. Se isso não se sustentar na prática, é decisão nova do dono, não dedução.

3. **Custo de IA: é do cliente, não da IRBIS.** A infraestrutura e o consumo dos modelos rodam na conta do cliente e são pagos por ele. A mensalidade remunera trabalho, não compute. **Não há custo marginal comendo o MRR.**

4. **A faixa de custo de nuvem por volume, para dizer na reunião.** Calculada em 12/ago: **entre 6 e 19 centavos de real por conversa**, o que dá cerca de R$ 50 a R$ 150 por mês num volume de mil conversas. Fala pronta, tabela por volume e premissas em `03 - Comercial/04 - Entrega e Recorrência/custo-ia-bot-estimativa.md`. É estimativa calculada, não medição: o consumo real da Odery segue sem acesso.

### 🔴 Ainda aberto

5. **A cláusula de multa** por cancelamento antes dos 6 meses. O lugar está reservado como 5.5 no contrato modelo, com a intenção comercial registrada, faltando o texto jurídico.
6. **O teto de uso** da Cláusula 9.2. Com a tabela de custo por volume agora existindo, dá pra propor um teto em conversas por mês com excedente cotado à parte. O número é decisão do dono.

### Abertas, não bloqueantes agora

4. Teto de "Sistemas muito complexo" e critério de gatilho para sair da faixa padrão.
5. Faixa e modelo de "Automações fora do bot".
6. Preço de "Consultoria de IA enterprise" e o que caracteriza enterprise.
7. Trava 2 da calculadora de preço: a âncora de mercado ainda é a do mundo de site (freelancer de GetNinjas, agência de site). Precisa ser levantada de novo contra dev freelancer, consultoria de automação e agência de software.

Enquanto as itens 4 a 6 estiverem abertos, o cliente que cair neles ouve "sob consulta" e o valor volta com o Nicolas.

## O que este documento substitui

As quatro políticas conflitantes que circulavam até 11/ago/2026:

| Documento | O que dizia | Estado |
|---|---|---|
| `01 - Prospecção/script-cold-call-irbis.md` | "Preço NUNCA na ligação" | Revogado. Faixa pode |
| `02 - Qualificação e Agendamento/script-whatsapp-lead-site.md` | Cita as três faixas por mensagem | Confirmado, vira o padrão |
| `02 - Qualificação e Agendamento/roteiro-call-diagnostico-irbis.md` | Dá a faixa na call curta de 15 a 20 min | A call curta deixou de existir. Ver estrutura da reunião única |
| `03 - Reunião de Vendas/script-call-comercial-junho-2026.md` | "Só apresente o número depois do sim" | Confirmado, mas só para o **número fechado** |
| `03 - Reunião de Vendas/script-quebra-objecoes-junho-2026.md` (objeção 8) | Manda citar as faixas | Confirmado |
| `04 - Reunião de Vendas/Mapa Mental da Call.html` | Manda **não** citar faixa na mesma objeção | Revogado |

## Quem faz o quê

| Situação | Quem |
|---|---|
| Diz a faixa em DM, WhatsApp, ligação, conteúdo | Colaborador ou Nicolas |
| Conduz a reunião e apresenta o número fechado | Nicolas |
| Escreve a proposta depois da reunião | Nicolas |
| Responde "quanto custa?" de um lead sob consulta | Colaborador registra e passa pro Nicolas, sem estimar |
