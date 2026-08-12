# KPIs comercial IRBIS

**v2 · reescrito em 12/ago/2026.** Substitui a v1 (adaptada do Grupo JDP), calibrada para operação solo vendendo site. Mudou o que se vende, quem vende e qual número decide.

| Antes (v1) | Agora (v2) | Motivo |
|---|---|---|
| Premissa: "operação solo vendendo site" | Duas pessoas vendendo **Bot de IA** na porta e **Sistemas** no upsell | Sites saíram do escopo em 04/ago. O colaborador chegou em 12/ago |
| KPI de fundo: "Sites fechados/mês" (2/4/6) | **Bots fechados/mês** e **MRR acumulado** | Não existe mais unidade de venda chamada site |
| Não tinha KPI de receita recorrente | **MRR acumulado é o KPI que decide** | O bot é o único produto recorrente. A meta de R$ 4.000/mês depende só dele |
| Ticket médio único: R$ 4.500 / 5.000 / 6.000 | **Ticket médio por frente**, medido separado | Bot, Sistemas e Consultoria têm faixas e naturezas diferentes. Média entre eles não informa nada |
| Metas em 3 níveis (N1/N2/N3) amarradas ao roadmap R$0→15k→30k | Metas por fase do roadmap v2, e **linha em branco declarada onde não há baseline** | O roadmap antigo morreu. Inventar nível novo sem histórico seria repetir o erro |
| Nenhum KPI tinha dono | **Cada KPI tem dono**: colaborador ou Nicolas | Com duas pessoas, indicador sem dono não é acompanhado por ninguém |
| Rotina "no Notion" | Rotina no Supabase (`interacoes`, `pipeline`, `pessoas`) e no placar da semana | É onde o dado vive hoje |

**O que sobreviveu da v1:** os indicadores de topo de funil, a leitura de onde o funil trava por etapa, a rotina diário/semanal/mensal e a lista de erros comuns.

---

## Princípio

- O que não é medido, não melhora.
- O que não é acompanhado, não acontece.
- Decisão por dado, não por percepção.
- **Toque não registrado é toque que não aconteceu.** Toda conversa vira linha em `interacoes` no mesmo dia, com a origem preenchida.

---

## A verdade sobre o baseline

Em 12/ago/2026 a IRBIS **não tem taxa de conversão histórica confiável em nenhuma etapa**. Cinco pessoas no banco, todas por indicação, e nada registrado com origem e data de forma consistente.

Por isso este painel tem duas colunas de meta:

- **Meta**, onde existe número derivado de decisão do dono ou de aritmética fechada.
- **Sem baseline**, onde o primeiro mês de medição é que vai produzir o número.

Preencher a segunda coluna com um chute seria o mesmo erro da v1, que herdou metas de um time em volume de 250 a 350 leads por semana.

---

## 🟦 Topo de funil · abordagem até conversa

Quem enche: **colaborador**, exceto onde marcado.

| Indicador | Meta | Dono | Onde vive |
|---|---|---|---|
| **Conversas iniciadas com dono de negócio, por origem** | 5 até 26/ago ⚠️ proposto, ainda não confirmado pelo dono | Os dois | `interacoes` |
| Pessoas novas no banco com origem diferente de indicação | > 0. Hoje é zero há 15 dias | Colaborador | `pessoas` |
| Abordagens feitas por semana (base morna, hunter frio) | Sem baseline | Colaborador | `interacoes` |
| Taxa de resposta às abordagens | Sem baseline | Colaborador | `interacoes` |
| Pedidos de indicação feitos por semana | Sem baseline. Nunca foi disparado | Nicolas | `interacoes` |
| Toques registrados no mesmo dia | 100% | Quem falou | `interacoes` |
| Contatos da base morna já mapeados (84 seguidores + engajamento do vídeo de 9 mil views) | 100% da lista mapeada | Colaborador | Lista do colaborador |

**A métrica que decide neste bloco é conversa iniciada, não alcance.** View, seguidor e engajamento informam. Se o input crescer por três semanas e a conversa não mexer, o problema é oferta ou CTA, não alcance.

---

## 🟨 Meio de funil · conversa até reunião realizada

| Indicador | Meta | Dono | Onde vive |
|---|---|---|---|
| Conversão conversa → reunião agendada | Sem baseline | Colaborador | `pipeline` |
| Reuniões de 1h agendadas por semana | A aritmética da meta de 30/set pede ~3 | Colaborador | `pipeline` |
| **Taxa de comparecimento** (anti no-show) | Sem baseline. Confirmação explícita na véspera é obrigatória | Colaborador | `pipeline` |
| Leads que passaram no gate de entrada (decisor, gargalo nomeado, janela de decisão) sobre total agendado | Sem baseline | Colaborador | `pipeline` |
| Reuniões encerradas em ~20 min por reprovação na triagem | Não é meta, é diagnóstico. Alto = gate de entrada frouxo | Nicolas | `pipeline` |
| Taxa de follow-up: leads com o próximo degrau da escada disparado no dia certo | 100% | Colaborador | `interacoes` |

**Reunião realizada é o recurso mais escasso da casa**, porque só o Nicolas conduz e ele também entrega. Quantas cabem numa semana ainda não foi medido, e esse é o teto real do funil.

---

## 🟩 Fundo de funil · reunião até receita

| Indicador | Meta | Dono | Onde vive |
|---|---|---|---|
| **Receita contratada** ← *KPI que decide* | **R$ 12.000 até 30/set** = 3 bots × R$ 4.000 (setup + 6 meses travados), contados no dia da assinatura | Nicolas | `pipeline` + financeiro |
| **Bots fechados** | **3 até 30/set.** 1 em agosto, 2 em setembro. Compatível com "≥ 2 clientes novos/mês" das metas por chapéu | Nicolas | `pipeline` |
| **MRR ativo** | Termômetro, não meta. Soma das mensalidades correndo no mês. Projeção: R$ 1.500 em 30/set | Nicolas | Financeiro |
| Conversão reunião → fechamento | Referência da mentoria de 03/ago: 35 a 40% com apresentação estruturada, 10 a 15% sem. Sem baseline próprio | Nicolas | `pipeline` |
| Upsells de Sistemas vendidos para carteira | Sem meta. Depende de quantos bots existirem | Nicolas | `pipeline` |
| **Ticket médio por frente** (medido separado, nunca em média única) | Bot: R$ 1.000 setup + R$ 500/mês. Sistemas: dentro de R$ 3.000 a 10.000. Consultoria: R$ 5.000 ou R$ 10.000 | Nicolas | `pipeline` |
| Cash collected do setup do bot (R$ 1.000 antes de começar) | 100%. É a Cláusula 3, não é negociação | Nicolas | Financeiro |
| Propostas enviadas em até 24h da reunião | 100% | Nicolas | `pipeline` |
| Propostas decididas com motivo registrado (sim ou não) | 100%. Proposta sem post-mortem não fecha o ciclo | Nicolas | `pipeline` |
| Indicações coletadas por cliente entregue | Sem meta aprovada | Nicolas | `interacoes` |
| Churn de bot | Só mensurável a partir do mês 7 de cada contrato, porque a fidelidade é de 6 meses. Antes disso, o que existe é multa, não churn | Nicolas | Financeiro |

**Por que receita contratada é o KPI que decide:** faturamento de projeto some no mês seguinte. Em 2026 a casa recebeu R$ 600 e tem R$ 5.597 a receber, com MRR em R$ 0. Vender um Sistema de R$ 10.000 paga um mês e deixa a base no mesmo lugar. Só o bot acumula.

**E por que contratada, e não MRR num instante:** com fidelidade de 6 meses, o valor entra no dia da assinatura, não no dia do calendário. Medir MRR em 30/set contaria R$ 500 por um bot que vale R$ 4.000 e foi vendido cinco dias antes. A meta antiga media assim porque o produto anterior era manutenção mês a mês, sem trava, onde o retrato do mês era o valor real.

---

## Onde o funil trava · leitura por etapa

| Sintoma | Etapa | O que investigar |
|---|---|---|
| Poucas conversas iniciadas | Abordagem | A lista está errada, ou ninguém está abordando. Hoje é o segundo caso |
| Conversa acontece, reunião não é agendada | Gancho e oferta | O gancho fala de sistema em vez de falar do gargalo operacional dele |
| Reunião agendada, lead não aparece | Confirmação de véspera | Confirmação explícita foi pedida, ou só foi avisado o horário? |
| Reunião acontece, não vira proposta | Gate de entrada | Está entrando gente sem decisor, sem verba ou sem prazo |
| Proposta na mesa, não fecha | Condução e ancoragem | Bloco 6 sem gargalo quantificado no bloco 4. O preço fica sem lastro |
| Fecha, mas o MRR não sobe | **Mix de produto** | Está fechando Sistema (one-time) em vez de bot. Sintoma novo, não existia na v1 |
| Cliente entregue e some | Pós-venda | Repitch de F7 e "próxima camada" não foram disparados |

---

## Rotina de acompanhamento

| Quando | O quê | Quem |
|---|---|---|
| **Diário** | Abordagens feitas, conversas iniciadas, degraus da escada disparados, reuniões agendadas. Tudo em `interacoes` no mesmo dia | Colaborador registra o dele, Nicolas o dele |
| **Semanal (sexta)** | Placar: conversão por etapa, comparecimento, conversas por origem, fechamentos, MRR da semana. O que estourou ganha uma linha de causa | Nicolas fecha, com o dado do colaborador |
| **Mensal** | MRR acumulado contra a meta de 30/set, ticket médio por frente, receita por origem, ajuste de rota | Nicolas |

Meta estourada ganha uma linha de causa no placar. Comparar planejado contra realizado sem entender o desvio é registro, não gestão.

---

## Erros comuns

- Acompanhar só faturamento e não conversão por etapa.
- **Acompanhar faturamento e esquecer o MRR.** Um mês bom de projeto esconde uma base que não cresceu.
- Não registrar no pipeline. É a causa raiz de a revisão de sexta medir preparação em vez de conversão.
- Medir view e seguidor como se fossem resultado.
- Não agir sobre o dado.
- Trabalhar sem meta clara.

---

## O que ainda não dá para medir, e por quê

1. **WhatsApp e telefone são canal cego.** É por onde todo contato real acontece e nada entra no banco sozinho. Enquanto o registro for manual, ele é obrigação de quem falou.
2. **pSEO sem atribuição.** Sete páginas no ar e nenhuma forma de saber se um lead veio delas. Sem isso o canal nunca poderá ser julgado.
3. **Margem do MRR é desconhecida.** O custo de token por cliente por mês não foi levantado. O bot é o único produto com custo marginal que cresce com o uso, e é justamente a receita em que a casa está apostando.
4. **Churn não existe como métrica** enquanto não houver prazo mínimo de contrato definido (mês a mês, 3, 6 ou 12 meses).
5. **O teto de reuniões por semana do Nicolas.** Ele conduz todas e entrega todos os projetos. Sem esse número, qualquer meta de fechamento é chute.

## Decisões pendentes que afetam este painel

| Pendência | Quem decide | O que trava |
|---|---|---|
| Conflito entre "R$ 4.000 recorrente até 30/set" e "≥ 2 clientes novos/mês" | Dono | A meta de bots fechados por mês |
| Meta de 5 conversas até 26/ago | Dono | O único KPI de topo com número |
| O que os R$ 500/mês do bot cobrem | Dono | Escopo do recorrente e o primeiro fechamento |
| Custo de token por cliente | Dono | Margem do MRR |
| Prazo mínimo de contrato do bot | Dono | Previsibilidade do MRR e a métrica de churn |
| Meta de MRR além de 30/set | Dono | A Fase 3 do roadmap |

## Diretriz final

Sem KPI, sem controle. Sem controle, sem escala. Alta performance não é esforço, é gestão.

Só que gestão com número inventado é pior que sem número. Onde este painel diz "sem baseline", a resposta certa é medir por um mês, não preencher com estimativa.
