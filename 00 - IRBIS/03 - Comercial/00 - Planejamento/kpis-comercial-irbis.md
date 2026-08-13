# KPIs comercial IRBIS

**v2 · reescrito em 12/ago/2026.** Substitui a v1 (adaptada do Grupo JDP), calibrada para operação solo vendendo site. Mudou o que se vende, quem vende e qual número decide.

> 🔁 **FUNIL MUDOU em 13/ago/2026 — revoga a premissa "Bot na porta" desta v2.** A porta agora é a Consultoria de IA; Sistemas e Bot viraram produção, vendida na entrega da consultoria. Isso muda o KPI de fundo de funil (seção "Fundo de funil" abaixo) e a leitura de "onde o funil trava". As tabelas de topo e meio de funil (abordagem, conversas, reuniões) não mudam de mecânica — só de oferta. Árbitro: `03 - Comercial/00 - Planejamento/funil-consultoria-producao-irbis.md`.

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
| **Consultorias fechadas** ← *KPI que decide, desde 13/ago/2026* | Sem baseline ainda — primeiro mês do funil novo mede. Substitui "Bots fechados" como topo do funil de receita | Nicolas | `pipeline` |
| **Taxa de upsell: Consultoria → Produção** | Sem baseline. É a linha que mede se o diagnóstico está virando venda de Sistemas/Bot na entrega | Nicolas | `pipeline` |
| **Receita contratada (Consultoria)** | R$5.000 ou R$10.000 por fechamento, conforme faturamento do cliente. Sem meta agregada ainda — decisão do dono pendente | Nicolas | `pipeline` + financeiro |
| **Receita contratada (Produção)** | Vendida na entrega da consultoria. Bot: R$4.000 a R$19.000 contratado (setup + 6 meses). Sistema: R$3.000–10.000. Meta agregada pendente | Nicolas | `pipeline` + financeiro |
| **Mensalidade média fechada (Bot, quando vendido)** | Sem meta. Termômetro de onde os clientes caem na faixa de R$ 500 a R$ 3.000 | Nicolas | `pipeline` |
| **MRR ativo** | Termômetro, não meta — voltou a ser termômetro porque a receita da porta agora é one-time (Consultoria), não recorrente | Nicolas | Financeiro |
| Conversão reunião → fechamento (Consultoria) | Referência da mentoria de 03/ago: 35 a 40% com apresentação estruturada, 10 a 15% sem. Sem baseline próprio | Nicolas | `pipeline` |
| **Ticket médio por frente** (medido separado, nunca em média única) | Consultoria: R$5.000 ou R$10.000. Bot: R$ 1.000 setup + mensalidade dentro de R$ 500 a R$ 3.000. Sistemas: dentro de R$ 3.000 a 10.000 | Nicolas | `pipeline` |
| Propostas enviadas em até 24h da reunião | 100% | Nicolas | `pipeline` |
| Propostas decididas com motivo registrado (sim ou não) | 100%. Proposta sem post-mortem não fecha o ciclo | Nicolas | `pipeline` |
| Indicações coletadas por cliente entregue | Sem meta aprovada | Nicolas | `interacoes` |
| Churn de bot | Só mensurável a partir do mês 7 de cada contrato, porque a fidelidade é de 6 meses. Antes disso, o que existe é multa, não churn | Nicolas | Financeiro |

**Por que Consultorias fechadas é o KPI que decide agora:** a Consultoria é a porta do funil desde 13/ago/2026 (ver `funil-consultoria-producao-irbis.md`). Ela é o que se prospecta e o que a Reunião Única vende — é o número que mede se o topo do funil está funcionando. A receita de produção (Sistemas/Bot) vem depois, na entrega, e depende de uma segunda venda que ainda não tem baseline.

**Isto substitui a lógica de 12/ago ("Bots fechados" e "MRR" como KPI que decide).** Naquele modelo o Bot era a porta e a receita recorrente nascia na prospecção. Com a Consultoria na porta, a primeira receita é one-time — o MRR volta a ser termômetro, não meta, até a taxa de upsell pra Bot ter baseline.

---

## Onde o funil trava · leitura por etapa

| Sintoma | Etapa | O que investigar |
|---|---|---|
| Poucas conversas iniciadas | Abordagem | A lista está errada, ou ninguém está abordando. Hoje é o segundo caso |
| Conversa acontece, reunião não é agendada | Gancho e oferta | O gancho fala de sistema em vez de falar do gargalo operacional dele |
| Reunião agendada, lead não aparece | Confirmação de véspera | Confirmação explícita foi pedida, ou só foi avisado o horário? |
| Reunião acontece, não vira proposta | Gate de entrada | Está entrando gente sem decisor, sem verba ou sem prazo |
| Proposta na mesa, não fecha | Condução e ancoragem | Bloco 6 sem gargalo quantificado no bloco 4. O preço fica sem lastro |
| Consultoria fecha, mas não vira produção | **Upsell na entrega** | O diagnóstico não está sendo usado como prova na Reunião de Entrega — ou o script dessa reunião ainda nem existe (ver pendência em `funil-consultoria-producao-irbis.md`) |
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
| O que a mensalidade do bot cobre | Dono | Escopo do recorrente e o primeiro fechamento |
| Custo de token por cliente | Dono | Margem do MRR |
| Prazo mínimo de contrato do bot | Dono | Previsibilidade do MRR e a métrica de churn |
| Meta de MRR além de 30/set | Dono | A Fase 3 do roadmap |

## Diretriz final

Sem KPI, sem controle. Sem controle, sem escala. Alta performance não é esforço, é gestão.

Só que gestão com número inventado é pior que sem número. Onde este painel diz "sem baseline", a resposta certa é medir por um mês, não preencher com estimativa.
