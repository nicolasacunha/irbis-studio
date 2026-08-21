# Painel operacional — 20/ago · funil, entregáveis e estado verificável

> Fonte de verdade operacional da sessão de 20/ago, derivada do `plano-mesclado-18a24ago.md`.
> Mudança de cenário confirmada: o Rocha não fechou na visita de terça. A prioridade passa a ser **follow-up do Rocha + implementação do funil**. Tráfego continua bloqueado até o funil funcionar de ponta a ponta.

---

## 1. Como ler os estados

| Estado | Significado | Evidência mínima |
|---|---|---|
| **Decidido** | Nicolas aprovou uma regra ou direção | decisão registrada, sem significar execução |
| **Escrito** | existe rascunho ou especificação no repositório | arquivo revisável |
| **Implementado** | a peça funciona no canal real | URL, formulário, pagamento ou automação testada |
| **Entregue** | o destinatário recebeu | reunião, envio ou registro confirmado |
| **Validado** | funcionou com usuário/lead real e gerou dado | resultado registrado no placar |

**Regra:** um estado não implica o seguinte. Documento escrito não é implementação; arquivo pronto não é entrega; entrega não é validação.

---

## 2. Decisões vigentes

### 2.1 Funil e qualificação

**Decidido:** página da análise inicial → formulário → conversa BANT com Gabriel → reserva do horário → reunião de 1h com Nicolas.

- O formulário faz triagem inicial de porte, dor e urgência.
- O BANT aprofunda Budget, Authority, Need e Timing.
- O formulário não substitui o BANT.
- Só chega à reunião quem passa pelos dois filtros.

### 2.2 O que são os R$ 97

**Decidido como hipótese de teste:** R$ 97 são uma **reserva para confirmar o horário depois do BANT**. Não são o preço da análise e não provam capacidade de pagar a Consultoria.

- A reserva é abatida integralmente se o lead contratar a Consultoria de IA.
- A página informa a reserva perto do CTA final; o preço da Consultoria não aparece como número fechado.
- Medir: leads aprovados no BANT que receberam o link, pagaram, recusaram ou sumiram nesse ponto.
- Se leads com dor, autoridade, urgência e orçamento esfriarem repetidamente no link, revisar ou remover a reserva.

### 2.3 Escada de oferta e preço

O árbitro continua sendo `politica-de-preco-irbis.md`:

- Consultoria de IA: **R$ 5 mil** até R$ 10 milhões/ano de faturamento.
- Consultoria de IA: **R$ 10 mil** acima de R$ 10 milhões/ano.
- Enterprise: sob consulta.
- Produção é proposta na entrega da Consultoria.
- O intervalo de **R$ 5–7 mil** recebido no plano do JDP não altera a política vigente.
- Rocha é uma proposta específica de Fase 1 a R$ 20 mil; não cria uma régua geral.

---

## 3. Estado verificável dos entregáveis

| Entregável | Estado atual | Evidência | O que falta para o próximo estado |
|---|---|---|---|
| Script genérico de vendas | **Escrito** | `script-generico-vendas-jdp-20ago.md` | revisar em uso e registrar entrega ao Cauã |
| Apresentação reestruturada | **Escrita como blueprint** | Parte B do script | executar o deck visual; revisar; apresentar ao Cauã |
| Gravação/call do Rocha para o JDP | **Disponível, entrega não confirmada** | transcrição/gravação no acervo | levar à reunião e registrar que foi entregue |
| Proposta do Rocha | **Escrita; não liberada como final** | `Rocha/proposta-rocha-fase1-desenho.md` e PDF | confirmar unidades, data, validade, mensagem e envio |
| Método de entrega | **Escrito** | `metodo-entrega-irbis.md`, com F0 a F7 (**8 fases**) | definir portal e validar o método em projeto real |
| Funil de aplicação | **Especificado; não implementado** | `funil-de-aplicacao-20ago.md` | formulário, página, pagamento, registros e teste ponta a ponta |
| Régua de preço | **Política existente; consolidação pendente** | `politica-de-preco-irbis.md` | incorporar tratamento de exceções sem criar nova faixa |
| Banco de objeções | **Existe; atualização pendente** | `banco-objecoes-prospeccao-irbis.md` | adicionar as três objeções da call real |
| Portal por fase | **Não escrito** | ausência confirmada no método | definir visão do cliente, responsável e atualização |
| Resposta de prova social | **Escrita; não treinada** | `blocos-reuniao-rocha-17ago.md`, seção 7 | aprovar versão, treinar e validar em conversa real |
| Esteira de produtos | **Decisão parcial** | `funil-consultoria-producao-irbis.md` | fechar entregável, prazo e reunião de entrega da Consultoria |

---

## 4. Fila de execução por dependência

### P0 · Hoje — protege receita e compromissos existentes

| Ação | Responsável | Prazo | Concluído quando |
|---|---|---|---|
| Confirmar se a proposta do Rocha foi enviada | Nicolas | 20/ago | data, canal e resposta registrados |
| Corrigir unidades, data e validade da proposta se ainda não saiu | Nicolas | antes do envio | PDF final confere com a operação real |
| Reescrever e enviar a mensagem de apresentação do Rocha, se ainda aplicável | Nicolas | 20/ago | mensagem enviada e horário solicitado com duas opções |
| Entregar script, blueprint e call ao Cauã | Nicolas | reunião JDP | recebimento ou discussão registrados |
| Destravar CNPJ/Redesim | Nicolas | 20/ago | protocolo ou bloqueio humano documentado |

### P1 · Antes de qualquer tráfego — caminho crítico

| Ação | Responsável | Prazo | Concluído quando |
|---|---|---|---|
| Montar o formulário com as 8 perguntas | Nicolas | antes da campanha | submissão real chega ao destino correto |
| Publicar a página apontando para o formulário | Nicolas | antes da campanha | URL pública testada em celular e desktop |
| Criar link de pagamento/Pix da reserva | Nicolas | antes da campanha | pagamento de teste e regra de abatimento confirmados |
| Definir prazo para pagar e liberar a vaga | Nicolas | antes da campanha | regra escrita na mensagem e no processo |
| Criar campos de placar: BANT aprovado, link enviado, reserva paga | Nicolas/Gabriel | antes da campanha | um lead de teste percorre e grava todos os estados |
| Configurar resposta inicial, lembretes e destino dos reprovados | Nicolas/Gabriel | antes da campanha | cada ramificação gera mensagem e registro corretos |
| Testar página → formulário → WhatsApp/BANT → pagamento → confirmação | Nicolas/Gabriel | antes da campanha | teste ponta a ponta, incluindo reprovação e ausência de pagamento, concluído sem etapa esquecida |
| Produzir estático, vídeo e depoimento/análise falada | Nicolas | antes da campanha | três criativos aprovados e vinculados à URL correta |
| Configurar campanha e eventos sem publicar | Nicolas | antes da campanha | verba, segmentação e eventos revisados; gasto permanece zerado |

**Gate de tráfego:** a campanha de R$ 2 mil só pode subir depois de todas as evidências acima. Copy pronta ou arquivo escrito não libera verba.

### P2 · Sexta e sábado — fortalece venda e entrega

| Ação | Responsável | Prazo | Concluído quando |
|---|---|---|---|
| Atualizar as três objeções reais | Nicolas | 21/ago | banco contém variação, leitura, erro, resposta e motivo |
| Consolidar preço por porte sem contrariar o árbitro | Nicolas | 21/ago | política contém R$ 5 mil/R$ 10 mil, enterprise e exceções |
| Aprovar e treinar a resposta de prova social já escrita | Nicolas/Gabriel | 21/ago | frase treinada em simulação e resultado registrado quando usada |
| Definir portal de acompanhamento | Nicolas | 22/ago | campos, frequência, dono da atualização e visão do cliente definidos |
| Fechar esteira Consultoria → produção → acompanhamento | Nicolas | 22/ago | entregável, prazo e reunião de entrega definidos |

### P3 · Domingo — validação

Registrar no placar: conversas iniciadas, formulários, BANT aprovados, reuniões, links de reserva enviados, reservas pagas, vendas e custo por lead qualificado. Revisar o script pelo que ocorreu, escolher a prioridade de 25–31/ago pelos números, levar o placar ao JDP e manter o projeto para médicos estacionado no papel.

---

## 5. Pendências do plano que não podem desaparecer do consolidado

- Treino de BANT com Gabriel e revisão dos últimos cinco minutos do fechamento.
- Aplicação do BANT nos agendamentos reais, sem repetir perguntas já respondidas no formulário.
- Continuidade da prospecção enquanto o tráfego não sobe.
- Placar diário alimentado por Gabriel e consolidado pelos dois.
- Portal por fase, pontos de contato do projeto e esteira de produtos.

**Visita ao Rocha:** realizada e integralmente gravada no Claude. Não é pendência operacional. O conteúdo ainda não foi migrado para este repositório; essa centralização é opcional e não bloqueia o plano atual.

---

## 6. Riscos e controles

1. **Subir tráfego sobre especificação, não sobre um funil funcional.** Controle: gate P1 com teste ponta a ponta.
2. **Tratar R$ 97 como produto barato ou filtro de capacidade financeira.** Controle: chamar de reserva e medir abandono exatamente nessa etapa.
3. **Continuar produzindo documentos enquanto follow-ups e entregas externas ficam pendentes.** Controle: P0 vem antes de novos artefatos.
4. **A semana virar só Rocha.** Controle: Gabriel mantém BANT, prospecção e placar em paralelo.
5. **Status otimista esconder atraso.** Controle: todo “entregue”, “implementado” ou “validado” exige evidência registrada.

---

## 7. Próxima ação sem ambiguidade

Primeiro, Nicolas confirma se a proposta do Rocha já foi enviada. Enquanto isso, a execução do funil começa pelo formulário e pelos campos do placar. Nenhum novo documento interno tem prioridade sobre esses dois caminhos.
