# Funil de aplicação — página, formulário e resposta rápida

> Escrito em 20/ago/2026 (quinta). Fecha a tarefa **3.4** do `plano-mesclado-18a24ago.md`: formulário + página + sequência de resposta rápida. Regra dura do plano: **nada de tráfego (4.1) antes disto estar fechado.**
>
> Fonte de voz: `IRBIS_Manual_de_Copy_v2.md`. Fonte da isca e do vilão: `P1-posicionamento-nicolas.md` (Big Idea v4). Árbitro do funil de produto: `funil-consultoria-producao-irbis.md` (13/ago). Objeções: `banco-objecoes-prospeccao-irbis.md`. Camada de aprofundamento: `script-qualificacao-bant-irbis.md`.
>
> **Aprovado pelo dono em 20/ago.** Ajustes da mesma data: (1) qualificação em duas camadas — **formulário qualifica (triagem), BANT aprofunda** (Bloco 1.5 + passo A1.5); (2) decisão 3.3 fechada — **reserva de R$ 97 reembolsável** no A2.5, tratada como premissa a testar (ver fim do doc).

---

## Como as três peças se encaixam (leia antes de montar)

```
CRIATIVO (sexta, 4.2)                          →  promete o DIAGNÓSTICO DE OPERAÇÃO
  ↓  "manda 'IA' no direct" / clica no link
PÁGINA (isca)                                  →  vende a análise, não o serviço. Sem preço.
  ↓  CTA único: preencher
FORMULÁRIO DE APLICAÇÃO   ── CAMADA 1 ──       →  triagem automática (Budget/Need/Timing rasos)
  ↓  quem passa no filtro de topo
WHATSAPP + BANT (Gabriel) ── CAMADA 2 ──       →  aprofunda e cobre Authority (o buraco do form)
  ↓  quem passa nas DUAS camadas
REUNIÃO ÚNICA (1h, Nicolas)                    →  fecha CONSULTORIA DE IA (R$5–7k PME)
  ↓
ENTREGA DA CONSULTORIA                          →  2º fechamento: produção (Sistemas / Bot)
```

**Qualificação em duas camadas (aprovado 20/ago):** o **formulário qualifica** de graça e no automático — corta quem está fora da faixa ou sem dor antes de gastar um minuto de agenda. O **BANT aprofunda** — é a conversa consultiva do Gabriel que confirma o que o form só tocou e pega o que ele não alcança (quem decide, urgência real, impacto). Uma camada é barata e rasa; a outra é cara e profunda. Só quem passa nas duas chega na reunião do Nicolas. Detalhe do encaixe no Bloco 1.5.

**A distinção que não pode borrar:** a isca (a análise de topo, com reserva de R$ 97 reembolsável) **não é** a Consultoria de IA paga. A isca revela *que* o caixa está escapando e aponta *onde* — o suficiente pra pessoa querer a reunião. A Consultoria de IA (R$5–10k, o produto pago da porta, per `funil-consultoria-producao-irbis.md`) é o diagnóstico completo, ponta a ponta, com a devolutiva e o caminho. A reunião de 1h é onde a Consultoria fecha. Se a isca entregar o diagnóstico inteiro de graça, ela canibaliza o produto pago — então ela dá o **sinal**, não o **mapa**.

**✅ Decisão 3.3 fechada (dono, 20/ago): reserva de R$ 97 reembolsável.** Não é o preço da análise — é uma **reserva de vaga**, que volta inteira na contratação, cobrada **depois** do formulário e do BANT (não na entrada). Serve pra filtrar quem está sério de quem só passeia. **É uma premissa, não verdade:** existe o risco de um lead qualificado ver os R$ 97 e não pagar por achar que é "slop" (isca barata/duvidosa). Por isso a cobrança fica no fim do funil, depois de uma pessoa real já ter conversado com ele, e vira número no placar — medida, não assumida. Detalhe e plano de teste no fim do doc.

---

# BLOCO 1 · FORMULÁRIO DE APLICAÇÃO

Serve pra **filtrar antes de agendar**, não pra coletar dado bonito. Cada campo existe pra provar (ou derrubar) um critério do corte de lead. Typeform ou página própria — a estrutura é a mesma. Uma pergunta por tela.

### Abertura do formulário (tela 0)

> **Antes de eu abrir uma vaga de diagnóstico, preciso entender sua operação.**
> São 6 perguntas, menos de 2 minutos. Eu leio uma por uma — quem passa, eu chamo no WhatsApp pra marcar.

### As perguntas

**1. Qual o seu nome e o da empresa?**
`[campo aberto]`
→ *Critério: nome real + empresa identificável. Sem isso, não é lead (regra do `prompt-captacao-leads-site.md`).*

**2. Qual o faturamento aproximado da empresa por mês?**
`( ) até R$ 50 mil  ( ) R$ 50–150 mil  ( ) R$ 150–500 mil  ( ) acima de R$ 500 mil`
→ *Critério: capacidade de pagar a faixa. Não pede número exato — porte basta pra decidir se entra pela análise (PME) ou é lead grande (Fase 1).*

**3. Quantas pessoas trabalham na operação hoje?**
`( ) só eu  ( ) 2 a 8  ( ) 9 a 30  ( ) mais de 30`
→ *Critério: dono acessível + time pequeno é o ICP real (3 a 8 nos casos que fecharam). "Só eu" e "mais de 30" não desqualificam, mas mudam a conversa.*

**4. Em que setor a empresa atua?**
`[campo aberto — uma linha]`
→ *ICP é amplo de propósito. O setor não filtra: alimenta o gancho da reunião e o vocabulário da abordagem.*

**5. Qual parte da operação hoje mais depende de gente lembrar, copiar, checar ou digitar na mão?**
`[campo aberto]`
→ *O gargalo nomeado. É o critério 3 do corte de lead e a matéria-prima da reunião. "Depende de gente lembrar/copiar/checar" é a linguagem da dor, não "onde você quer automação".*

**6. Você já tentou resolver isso com alguma ferramenta pronta? O que aconteceu?**
`[campo aberto]`
→ *O critério mais forte do P1: já tentou ferramenta de prateleira e ela não conheceu a operação. Quem responde "sim, tentei o [X] e não pegou o nosso jeito" é o lead mais quente que existe — o vilão já bateu nele.*

**7. O que fez você preencher isso agora?**
`[campo aberto]`
→ *O gatilho de urgência. Separa quem tem uma dor com data de quem está curioso. Resposta vaga = nutrição; resposta com evento ("perdi um pedido semana passada") = prioridade.*

### Contato (tela final)

**8. Melhor WhatsApp pra eu te chamar:**
`[campo — telefone]`

### Fechamento do formulário

> Pronto. Eu leio a sua e te chamo no WhatsApp. Se fizer sentido, a gente marca uma reunião de 1 hora onde eu te mostro onde a sua operação está vazando tempo e dinheiro — e o que dá pra sistematizar.

### Lógica de triagem (não vai na tela — é pro Nicolas/Gabriel)

| Sinal | Leitura | Ação |
|---|---|---|
| Faturamento ≥ R$ 50 mil/mês + gargalo nomeado + já tentou ferramenta pronta | Lead quente, ICP cheio | Chamar no mesmo dia, agendar reunião |
| Faturamento ≥ R$ 500 mil + operação grande | Possível lead grande (régua Fase 1, não análise) | Passar pro Nicolas, não tratar como PME |
| Gargalo vago + "curiosidade" na 7 | Morno | Entra na nutrição, não na agenda |
| Até R$ 50 mil + "só eu" + sem gargalo claro | Fora da faixa hoje | Resposta educada, sem reunião |

---

# BLOCO 1.5 · AS DUAS CAMADAS DE QUALIFICAÇÃO

O formulário **não** substitui o BANT — ele o prepara. O form é a peneira grossa (automática, barata, roda sem ninguém); o BANT é a peneira fina (conversa consultiva, cara, exige o Gabriel na linha). Cada pergunta do form já é uma semente de uma dimensão do BANT — o Gabriel chega na conversa sabendo onde cavar.

### O que cada camada cobre

| Dimensão BANT | O formulário (camada 1) já dá | O BANT (camada 2) aprofunda |
|---|---|---|
| **Budget** | Porte pela faixa de faturamento (pergunta 2) | Quanto o problema custa hoje (ferramenta + tempo + retrabalho); se investir já está previsto |
| **Authority** | *nada — o form não pergunta quem decide* | **Todo o Authority nasce aqui:** quem mais decide, precisa validar com sócio, quem aprova investimento |
| **Need** | O gargalo nomeado (5) + já tentou ferramenta pronta (6) | Como a dor acontece na prática, há quanto tempo, se já bate no faturamento |
| **Timing** | O gatilho "o que fez preencher agora" (7) | Urgência de 0 a 10, o que trava se nada mudar em 3 meses, se depende de meta/contratação |

**O buraco que o BANT tapa:** o formulário lê Budget, Need e Timing de raspão e **não toca Authority nenhuma**. Um lead pode passar no form inteiro e não ser quem decide. Por isso o BANT não é opcional — é ele que evita marcar a reunião de 1h do Nicolas com quem não pode dizer sim.

### Onde cada gate corta

1. **Gate do formulário (automático):** fora da faixa de faturamento **ou** sem gargalo nomeado → não avança pro BANT. Resposta educada, entra na nutrição.
2. **Gate do BANT (Gabriel decide):** faltou **Budget OU Authority OU Timing** claro → não força a reunião, entra no follow-up (regra literal do `script-qualificacao-bant-irbis.md`). Só Need forte não basta pra queimar uma vaga do Nicolas.
3. **Passou nos dois** → Gabriel agenda a reunião única e passa pro Nicolas quem cruzou os quatro critérios (tarefa 2.3 do plano).

### Quem roda o quê

- **Formulário:** roda sozinho. Ninguém opera.
- **BANT:** é o **Gabriel**, na conversa de WhatsApp entre o primeiro toque e o agendamento (encaixe exato no Bloco 3, passo A1.5). Usa o `script-qualificacao-bant-irbis.md` como está — conversa consultiva com tréplica, não interrogatório. O form já entregou metade das respostas; o Gabriel não repete pergunta que o lead já respondeu, cava a partir dela.

---

# BLOCO 2 · PÁGINA DO FUNIL (a isca)

Landing de uma coluna, uma leitura, um CTA. **Preço não entra** (mesma regra da VSL). O produto desta página é a **análise**, não o sistema. Linguagem do Diagnóstico de Operação, nunca "eu faço automação".

Voz: Fórmula 1 (setup calmo + punch em caps), Fórmula 6 (afirmação que parece provocação), número concreto antes de afirmação vaga.

---

### [HERO]

**Headline (caps, sem ponto final, ataca o vilão):**

> SEU NEGÓCIO FATURA BEM E AINDA RODA NA PLANILHA
> O PROBLEMA NÃO É FALTA DE ESFORÇO. É A ESTRUTURA POR TRÁS

**Subheadline:**

> Toda semana um pedaço do seu caixa escapa por um processo que ainda depende de alguém lembrar, copiar ou checar na mão. Você não vê na hora — vê no fim do mês.

**CTA (imperativo direto):**

> `QUERO MEU DIAGNÓSTICO`

---

### [A DOR — nomear o que ele já sente]

> Não aparece de uma vez. Aparece devagar.
>
> O retrabalho que ninguém mede. O pedido que escapou porque demorou pra responder. A pessoa boa gastando hora com uma tarefa que uma automação resolveria em segundo.
>
> Cresceu o volume, e o processo que era normal com o time pequeno virou gargalo. **Não é o seu time que está devagar. É a estrutura que não acompanhou o negócio.**

---

### [O VILÃO — as duas armadilhas]

> Aí você tenta resolver de dois jeitos, e os dois falham:
>
> **Plugar uma IA pronta.** Chatbot genérico, automação de prateleira que promete resolver e não entende como a sua operação funciona de verdade. Vira água — qualquer um tem, não muda nada.
>
> **Contratar uma agência.** Meses de processo, intermediário, e uma conta que não fecha com o resultado.
>
> AUTOMAÇÃO DE PRATELEIRA VIROU ÁGUA. SISTEMA PENSADO PRA SUA OPERAÇÃO É O DIAMANTE.

---

### [A ISCA — o que é o diagnóstico, sem entregar o mapa]

> Antes de construir qualquer coisa, tem um passo que quase ninguém dá: **olhar a operação e achar onde o caixa está escapando.**
>
> É isso que eu faço no Diagnóstico de Operação. Numa reunião de 1 hora, eu percorro como o seu negócio roda por dentro e te mostro:
>
> — onde tem processo manual custando tempo e dinheiro sem você perceber;
> — o que dá pra sistematizar primeiro, pelo retorno, não pela moda;
> — se o seu caso pede sistema, automação, ou nenhum dos dois ainda.
>
> Não é call de vendas disfarçada. É análise real, com devolutiva real. Você sai com clareza do que está te custando — decida construir comigo ou não.

---

### [PROVA — Odery, as 3 frentes]

> Na Odery Drums eu implementei o CRM, coloquei um bot de WhatsApp rodando na operação e ajudei na forma como a empresa usa IA no dia a dia. Sistema, automação e critério — no mesmo cliente, na operação real.
>
> No fim, o sistema é do cliente: código, acessos, tudo. Sem depender de mim pra tocar.

*(Se surgir a pergunta "vocês entendem de venda?" — sim, o Nicolas já ajudou cliente a passar de R$ 350 mil num lançamento. Mas isso é credencial de geração de demanda, não é o que se vende aqui. Não usar como prova de produto na página.)*

---

### [QUEM NÃO É PRA ISSO — exclusão como posicionamento]

> Se você quer uma ferramenta genérica plugada em cinco minutos pra dizer que "tem IA" — não é aqui.
>
> Se você tem um negócio que fatura, entrega bem, e trava porque a operação por dentro ainda roda no improviso — é exatamente esse o caso que eu resolvo.

---

### [CTA FINAL]

> As vagas de diagnóstico são poucas — trabalho com atenção total por projeto.
>
> Preenche o formulário. Eu leio, e se fizer sentido, te chamo no WhatsApp pra marcar a sua. Pra travar a vaga tem uma reserva de R$ 97, que volta pra você inteira se decidir construir comigo — ela existe pra eu não abrir agenda pra quem não está levando a própria operação a sério.
>
> `QUERO MEU DIAGNÓSTICO`

---

# BLOCO 3 · SEQUÊNCIA DE RESPOSTA RÁPIDA

Duas engrenagens: **(A)** a resposta imediata pra quem preencheu (leva à reunião marcada) e **(B)** a escada de follow-up única pra quem não respondeu. Toda conversa vira linha em `interacoes` no mesmo dia, com origem preenchida.

## A. Quem preencheu o formulário

### A0 · Auto-resposta imediata (tela de obrigado + primeira mensagem)

Dispara no segundo em que ele envia. Sem esperar o Nicolas.

> Recebi a sua, [nome]. Eu leio pessoalmente — não é robô respondendo.
> Se fizer sentido pro seu caso, te chamo aqui no WhatsApp em até 1 dia útil pra marcar o diagnóstico. Fica de olho.
> Nicolas — IRBIS

### A1 · Primeiro toque no WhatsApp (até 24h, Nicolas ou Gabriel)

Abre pelo gargalo que ELE nomeou na pergunta 5, não pela IRBIS.

> Oi [nome], aqui é o Nicolas, da IRBIS — você preencheu sobre a [empresa].
> Você falou que [gargalo que ele escreveu] ainda roda na mão aí. É isso que mais te consome hoje ou tem outra coisa pior?

*(Abrir com pergunta sobre a operação dele, nunca com "vamos marcar?". A regra do banco de objeções: toda mensagem termina em pergunta sobre o negócio dele.)*

### A1.5 · BANT na conversa (Gabriel — a camada 2, antes de marcar)

Aqui é onde a qualificação aprofunda. **Não é bloco de perguntas seguidas** — é conversa, uma dimensão de cada vez, tréplica após cada resposta (`script-qualificacao-bant-irbis.md`). O form já entregou Need e um sinal de Budget/Timing; o Gabriel foca no que falta, principalmente **Authority** e **urgência real**:

> *(Need — já semeado pela pergunta 5/6, só aprofunda)* Isso que você me contou do [gargalo] — há quanto tempo tá assim? Já chegou a custar um pedido ou um cliente?
>
> *(Authority — o buraco do form, nasce aqui)* Além de você, mais alguém entra nessa decisão de mexer na operação, ou é você que puxa?
>
> *(Timing)* Tem alguma meta ou momento agora que depende de resolver isso, ou ainda é planejamento pra frente?

**Gate:** se Budget, Authority e Timing aparecerem claros → segue pro A2 e marca. Se faltar um deles → **não força a reunião**, joga na escada de follow-up (Bloco 3B). Só Need forte não passa.

### A2 · Proposta de horário (passou no BANT, a dor confirma)

> Isso aí é exatamente o tipo de coisa que o diagnóstico pega. É uma reunião de 1 hora, eu te mostro onde está vazando e o que dá pra resolver primeiro.
> Consigo quinta às 14h ou sexta às 10h. Qual funciona?

*(Uma reunião só, de 1h. Nunca marcar duas calls antes dela.)*

### A2.5 · Reserva da vaga (R$ 97 reembolsável — trava o horário)

Depois que ele escolhe o horário, e só então. A reserva não abre a conversa, fecha ela.

> Fechei [dia] às [hora] no seu nome. Pra travar a vaga tem uma reserva de R$ 97 — ela volta inteira pra você se a gente fechar a construção, e existe só pra eu segurar o horário pra quem tá sério. Segue o link: [pagamento].
> Assim que cair, tá confirmado e eu te mando o material pra chegar preparado.

**Regra:** a reserva entra **depois** do BANT, nunca antes do form. Quem trava o horário e não paga em [prazo] libera a vaga e cai no follow-up — não perde o lead, só não ocupa agenda sem compromisso. Registrar em `interacoes`: horário oferecido → reserva paga (sim/não). **Esse "não" é o dado que testa a premissa** (ver fim do doc).

### A3 · Confirmado — contexto + vídeo de boas-vindas

Depois de marcar, manda o vídeo pós-formulário (`roteiro-vsl-irbis.md`) com uma linha de contexto:

> Fechado, [nome] — [dia] às [hora]. Te mando o link/local perto da hora.
> Gravei um recado rápido de 1 min pra você chegar preparado e a gente aproveitar a hora inteira: [vídeo].
> Vai pensando em 3 coisas: qual processo depende mais de gente do que devia, o que isso te custa, e onde você quer o negócio daqui a 6 meses.

### A4 · Lembrete (véspera e 1h antes)

> [nome], nosso diagnóstico é amanhã às [hora]. Tá de pé aí? Se precisar remarcar, sem problema — só me avisa.

## B. Escada de follow-up única (quem não respondeu)

Cadência fixa do `escada-follow-up-irbis.md`: **D+0, D+3, D+7, D+14, breakup D+21.** O intervalo nunca muda; muda o conteúdo. Aqui, o estágio é "preencheu o formulário e sumiu, ou não confirmou horário".

**D+0** — (é o A1 acima, o primeiro toque)

**D+3** — reforço com um dado do setor dele, sem cobrar
> [nome], sem pressão. Uma coisa que vejo direto em [setor dele]: [insight específico — ex: "o pedido que entra por WhatsApp e ninguém registra vira o furo mais caro do mês"]. Divido porque é útil mesmo que a gente não trabalhe junto. O seu caso é parecido?

**D+7** — reduz o atrito do compromisso
> [nome], se a hora cheia tá difícil essa semana, a gente pode começar com 15 min só pra eu entender se vale um diagnóstico completo. Prefere assim?

**D+14** — prova, não pergunta de venda
> [nome], montei o [CRM + bot] da Odery na operação inteira deles. É o tipo de coisa que sai do diagnóstico. Quando quiser olhar o seu, é só responder.

**D+21 (breakup)** — fecha o loop, deixa a porta
> [nome], vou parar de te chamar pra não encher. A vaga de diagnóstico segue aberta se virar prioridade — é só mandar "IA" aqui. Sucesso com a [empresa].

*(Breakup é uma vez só. Depois dele, o card vai pra nutrição, não some.)*

---

# Régua de resposta a preço (se perguntarem no chat)

A faixa é pública, o número fechado nasce na reunião (regra literal). Se perguntarem antes de marcar:

> Consultoria de IA é R$ 5.000 — R$ 10.000 acima de R$ 10 milhões de faturamento por ano. Sem mensalidade, e o diagnóstico é seu independente do que você decidir construir depois.
> O número de um projeto de construção eu só fecho depois de entender o que trava a operação. Mas a faixa é essa, sem enrolação.
> [pergunta sobre o gargalo]

**Nunca sai antes da reunião:** número fechado de construção, valor por hora, estimativa de projeto complexo.

---

# ✅ Decisão 3.3 — reserva de R$ 97 reembolsável (dono, 20/ago)

**O que foi decidido:** a vaga de diagnóstico tem uma **reserva de R$ 97, reembolsável na contratação.** Objetivo do dono: filtrar quem está sério de quem só passeia, e afastar quem não tem caixa pra seguir.

**Onde ela entra:** depois do formulário e do BANT (passo A2.5), como trava do horário — **nunca na entrada.** Isso mantém o topo do funil livre, então o teste de tráfego de sexta ainda lê "qual criativo converte" pelo preenchimento do form, sem misturar com "quem topa pagar". A cobrança só toca lead já qualificado, com uma pessoa real já na conversa — que é o que reduz a chance de parecer slop.

**Nota sobre o que os R$ 97 filtram:** eles filtram **seriedade e show-up**, não capacidade de pagar os R$ 5–10k da Consultoria. Quem paga 97 não provou que paga 5 mil — isso é o campo de faturamento (form) + o Budget do BANT que provam. Não confundir os dois filtros.

**⚠️ A ressalva do dono — isto é premissa, não verdade:** é possível que um lead qualificado veja os R$ 97 e não pague por achar que é isca barata/duvidosa (slop). A hipótese é que a reserva qualifica; ela pode, em vez disso, espantar gente boa. **Por isso vira teste, não fé:**

- **Medir:** entre os leads que passaram no BANT e receberam o link (A2.5), quantos pagam vs. somem no pagamento. Registrar em `interacoes`.
- **Sinal de que a premissa está errada:** lead que estava quente na conversa, com dor e budget claros, esfria **no momento do link**. Se isso virar padrão (não caso isolado), o problema é a reserva, não o lead.
- **Plano B se falhar:** testar a mesma reserva reformulada (ex: "garantia de comparecimento" em vez de "reserva"), ou remover e voltar pro filtro form+BANT puro. Decisão pelo placar de domingo (7.1), não por sensação.
- **Enquanto o dado não chega:** a reserva fica, porque a hipótese é do dono e o custo de testá-la é baixo (dá pra reembolsar na hora quem reclamar).

---

# Checklist pra fechar 3.4 (antes de subir tráfego)

- [x] Decidir 3.3 — **reserva de R$ 97 reembolsável**, no A2.5 (depois do BANT). Página e sequência já ajustadas
- [ ] Montar o link de pagamento da reserva (Stripe/Pix) + definir o prazo pra pagar antes de liberar a vaga
- [ ] Registrar no placar a coluna "reserva paga (sim/não)" pra testar a premissa
- [ ] Montar o formulário (Typeform ou página própria) com as 8 perguntas
- [ ] Publicar a página com o CTA apontando pro formulário
- [ ] Gravar/confirmar o vídeo de boas-vindas pós-formulário (já tem roteiro)
- [ ] Deixar A0 (auto-resposta) automática; A1–A4 e a escada prontos pra colar
- [ ] Gabriel: rodar o BANT (A1.5) em cada lead que passa no form, antes de marcar — é a camada 2 (tarefa 2.3)
- [ ] Só então: 4.1 (subir a campanha de R$ 2 mil na sexta)
