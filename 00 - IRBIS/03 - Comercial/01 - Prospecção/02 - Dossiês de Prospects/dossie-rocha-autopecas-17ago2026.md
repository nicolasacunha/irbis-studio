# Dossiê + Reunião · Rocha Auto Peças — segunda, 17/ago/2026

> Escrito em 14/ago/2026 a partir do `PlanoPratico7DiasNicolasCunha.pdf` (Grupo JDP, Dia 1) cruzado com os documentos-árbitro da IRBIS.
> **Este doc instancia o Dia 1 do plano JDP dentro do que a IRBIS já decidiu.** Onde os dois divergem, a resolução está na seção 3, com o motivo.
> Nada aqui é proposta aprovada. O número fechado é decisão do dono.

```
FRONTEIRA DOS DADOS · 2026-08-14
✅ PESQUISADO   site institucional do Rocha, Econodata (2 CNPJs), busca web
✅ LIDO         politica-de-preco-irbis.md (13/ago), funil-consultoria-producao-irbis.md (13/ago),
                estrutura-reuniao-unica-irbis.md (12/ago), script-qualificacao-bant-irbis.md (13/ago),
                calculadora-preco-build-irbis.md, ataque-funil-12-26ago.md, rotina 12 e 13/ago
⚫ CEGO         o que o Gabriel já levantou por contato próximo (não está no repo nem no Supabase)
⚫ CEGO         faturamento real. Os R$100 milhões vêm do plano do JDP, não de fonte pública
⚫ NÃO EXISTE   nenhum registro de "Rocha" ou "Gabriel" em nenhum documento do repo até hoje
```

---

## 1. Dossiê: o que dá pra saber antes de segunda

### Verificado

| Item | Dado |
|---|---|
| Empresa | Rocha Auto Peças, Campinas/SP, varejo de peças e acessórios novos (CNAE 4530-7/03) |
| Idade | Fundada em 1992. O site fala em "mais de 33 anos" |
| Lojas | **7 unidades**: Campinas (3), Indaiatuba, Jundiaí, Araraquara, Hortolândia |
| Pessoas | **Mais de 180 colaboradores** (número do próprio site) |
| Logística | Centro de distribuição próprio desde 2012, no Vila Nova em Campinas. **Nova unidade em planejamento** |
| Sócios | **Roberto Rocha de Souza Pinto** e **Isabel Aparecida Amalfi**, os dois em todos os CNPJs que apareceram |
| Estrutura | Opera por **múltiplos CNPJs** (RRA Comercio, aberta em 2005; RRACE Comercio, aberta em 2009), mesma dupla de sócios |

### O que esses dados já entregam pra reunião

**1. Não existe um decisor, existem dois.** A Isabel está no quadro societário de todos os CNPJs desde a abertura. A pergunta de Authority do BANT deixa de ser protocolo e vira necessária: se ela não estiver na sala, a reunião fecha um sim que precisa de segundo sim. O gate de entrada da Reunião Única é explícito nisso: *"se o decisor não vem, a reunião é remarcada, não adaptada."*

**2. Múltiplos CNPJs significa dado fragmentado.** Sete lojas abertas em ondas, cada uma com seu histórico. É onde mora a chance de o estoque, o cadastro de cliente e o histórico de compra não conversarem entre unidades. **Isso é hipótese, não fato** — mas é a primeira pergunta que vale fazer no bloco de diagnóstico.

**3. "Nova unidade em planejamento" é o gatilho de urgência.** Empresa que vai abrir CD novo está prestes a descobrir que o processo manual que aguentava 7 lojas não aguenta a operação seguinte. Timing não precisa ser inventado: já está no site deles.

**4. 180 pessoas é o número que sustenta a conversa de folha.** O mecanismo do diagnóstico (seção 5) vive disso. Não é "eu automatizo X", é "quantas dessas 180 estão digitando o que um sistema resolveria".

### Hipóteses de gargalo, pra confirmar na reunião (não afirmar)

Autopeças tem um formato de operação bem previsível. As quatro apostas, em ordem de força:

1. **O balcão e o WhatsApp são o ponto onde a venda escapa.** Mecânico que precisa da peça hoje liga pra três lojas e compra de quem responder primeiro. Cada mensagem não respondida é venda perdida que ninguém contabiliza, porque ela nunca virou pedido. É invisível na DRE e óbvia pra quem atende.
2. **Consulta de aplicação depende de gente veterana.** Saber que peça serve em que carro, ano e motor é conhecimento que mora na cabeça do atendente antigo. Isso trava contratação, trava expansão e cria fila no balcão.
3. **Estoque entre 7 lojas + CD se resolve por telefone.** "Aqui não tem, mas na loja 3 tem" é uma transferência negociada na mão.
4. **Cotação de oficina chega como lista solta.** O mecânico manda 8 itens no WhatsApp e alguém digita um por um no sistema.

> ⚠️ Nenhuma dessas quatro pode ser afirmada como verdade do Rocha na reunião. Elas são **pauta de pergunta**, não diagnóstico. Afirmar dor que o cliente não confirmou é o jeito mais rápido de perder autoridade com dono que conhece a própria operação há 33 anos.

### O que só o Gabriel pode levantar antes de segunda

Ele tem contato próximo. As respostas abaixo valem mais que qualquer pesquisa:

- Qual sistema/ERP eles usam hoje, e há quanto tempo
- Se vende por WhatsApp, televendas, e-commerce ou só balcão
- Quantas pessoas atendem cliente (das 180)
- Se a Isabel participa das decisões de investimento em sistema
- **O que o Roberto já tentou e não deu certo** (esse é o atributo que qualifica mais que a vertical, segundo a decisão de 12/ago)

---

## 2. Choque de agenda: resolvido em 14/ago

O plano JDP manda alinhar o terreno com o Vitor **segunda às 11h**, o que colide com a Aula recorrente de 08h00 às 12h20.

✅ **Decisão do Nicolas em 14/ago: vai faltar a Aula.** A reunião das 11h acontece como planejado, sem remarcação.

Pauta dessa reunião em `00 - Planejamento/preparo-jdp-17ago-rocha.md`. Índice geral da semana em `00 - Planejamento/indice-plano-7dias-ago2026.md`.

---

## 3. O conflito central: o que você vende segunda

O plano do JDP foi escrito assumindo que a IRBIS vende **implementação e consultoria** como um pacote, com ancoragem "a partir de [valor]". A IRBIS decidiu outra coisa **ontem**.

### A decisão de 13/ago que o plano não conhecia

`funil-consultoria-producao-irbis.md`, criado 13/ago, é o árbitro do funil:

> **Consultoria de IA é a porta. Produção (Sistemas e/ou Soluções com IA) é o que se vende na entrega da consultoria.**

Isso revogou a decisão de 12/ago ("Bot de IA é a porta") que ainda está escrita no `CLAUDE.md`. **O `CLAUDE.md` está um dia atrasado nesse ponto** e vale corrigir antes que alguém prospecte pela regra velha.

### A convergência que resolve tudo

O plano JDP manda chegar na reunião com o **mecanismo do diagnóstico** pronto: *"não é eu automatizo X, é eu revelo onde a sua empresa perde dinheiro com folha e processo."*

Isso não é um gancho pra vender outra coisa. **Isso é literalmente a Consultoria de IA.** O JDP tratou o diagnóstico como isca; a IRBIS decidiu ontem que o diagnóstico é o produto pago.

Então não há nada a inventar pra segunda:

| Bloco | O que fecha |
|---|---|
| Reunião de segunda | **Consultoria de IA.** Um número, um escopo, um sim |
| Reunião de entrega da consultoria | Sistemas e/ou Bot de IA, calibrados pelo que o diagnóstico achou |

**O que isso corta da reunião de segunda:** não apresente projeto de implementação, não cite faixa de Sistemas nem mensalidade de bot como oferta, não prometa prazo de construção. Nada disso foi diagnosticado ainda. Se ele perguntar quanto custa construir, a faixa é pública e você responde a faixa, mas deixa claro que o número dele nasce depois da consultoria.

### Tabela de reconciliação

| Ponto | Plano JDP | Árbitro IRBIS | Vale segunda |
|---|---|---|---|
| O que se vende | Implementação + consultoria | Consultoria é a porta (13/ago) | **Consultoria de IA** |
| Ancoragem | "a partir de [valor]" | Consultoria tem **preço fixo**, não faixa | Número fixo, não "a partir de" |
| BANT | Roteiro de qualificação | Bloco 2 da Reunião Única, min 4 a 14 | BANT dentro da reunião |
| Duração | não diz | **1 hora**, em todo canal | 1h |
| Quem conduz | Nicolas | Nicolas, sem exceção enquanto os 4 buracos do deck existirem | Nicolas |
| Deck na tela | não diz | **Não compartilhar** o deck: nunca foi auditado pós-pivot | Sem deck |

---

## 4. Ancoragem de preço: a decisão é sua, e ela precisa sair hoje

### O que a tabela vigente diz

| Faixa | Valor |
|---|---|
| Consultoria de IA, cliente até R$ 10 mi/ano | R$ 5.000 |
| Consultoria de IA, cliente acima de R$ 10 mi/ano | R$ 10.000 |
| **Consultoria de IA enterprise** | **Sob consulta. Preço ainda não definido** |

### O problema

Se os R$100 milhões estiverem certos, o Rocha está **10x acima** do degrau que ativa os R$10.000. Ele é o primeiro caso real que cai na linha "enterprise", e essa linha está em branco na política desde que foi escrita.

E aqui o plano do JDP tem razão no diagnóstico: R$10.000 para uma operação de R$100 milhões e 180 pessoas é **0,01% do faturamento anual**. O risco não é ele achar caro. É ele achar que você não entendeu o tamanho do problema dele.

Ao mesmo tempo, "sob consulta" **não pode sair na reunião**. O bloco 7 da Reunião Única exige número fechado ao vivo, e essa foi a decisão que subiu conversão de 10-15% para 35-40%. Sair de lá com "eu te mando depois" desmonta o formato inteiro.

**Conclusão: o número precisa existir antes de segunda. Não tem caminho do meio.**

### Direção definida em 14/ago

🟡 **O Nicolas está inclinado a R$ 20.000 a R$ 25.000, e leva a decisão pra reunião com o JDP de segunda às 11h.** O número fecha lá, quatro horas antes do Rocha.

**Âncora de mercado levantada em 14/ago** (fecha parcialmente a Trava 2 da `calculadora-preco-build-irbis.md`, que ainda usava referência do mundo de site):

| Referência | Serviço | Faixa | Prazo |
|---|---|---|---|
| Guia Waxi 2026 | Diagnóstico e priorização de IA, **PME** | **R$ 10.000 a R$ 40.000** | 3 a 6 semanas |
| Guia Waxi 2026 | Primeiro caso de uso (piloto + implementação) | R$ 30.000 a R$ 120.000 | 2 a 4 meses |
| IAEO 2026 | Consultoria + implementação | R$ 5.000 a R$ 30.000 | variável |
| IAEO 2026 | Sistema sob medida com IA (ERP/CRM) | R$ 15.000 a R$ 50.000 | projeto |

**O que isso faz com o argumento:** R$ 20-25 mil deixa de ser preço agressivo e vira o **meio de uma faixa descrita para PME, aplicada a um cliente acima da PME**. Cobrar R$ 10.000 do Rocha seria cobrar o piso de uma faixa de PME de uma empresa com 7 lojas, CD próprio e 180 pessoas.

### O efeito colateral, e a saída

Se a consultoria custa R$ 20-25 mil e a produção custa R$ 3-10 mil, o cliente pergunta por que **pensar custa mais que construir**, e a pergunta é justa.

A saída coerente é tratar o Rocha como enterprise nas duas pontas:

| Etapa | Rocha |
|---|---|
| Consultoria de IA | Degrau enterprise, R$ 20-25 mil |
| Produção (Sistemas) | **"Sistemas muito complexo, sob consulta"** — a política já prevê e manda não estimar teto |

O que não pode acontecer: cotar consultoria enterprise e depois oferecer sistema de R$ 7.000 pra oito unidades.

### A frase de ancoragem, pronta pra usar

Sem travessão, sem "a partir de", número fixo:

```
A Consultoria de IA da IRBIS é um diagnóstico completo da operação. Eu entro,
mapeio processo por processo onde vocês perdem tempo, dinheiro e venda, e saio
com o desenho do que dá pra automatizar, o que dá pra sistematizar e em que
ordem fazer, com o retorno estimado de cada frente.

Numa operação do tamanho da de vocês, com sete lojas e o centro de distribuição,
o diagnóstico é [VALOR]. Ele é fechado e não tem mensalidade.

Depois que ele está na sua mão, você decide o que construir. Se quiser que a
gente construa, aí a gente conversa projeto. Se quiser levar pra outro
implementar, o diagnóstico é seu.
```

A última linha é o que faz esse preço fechar. Ela tira o medo de estar comprando um orçamento disfarçado, e é verdade.

---

## 5. O mecanismo do diagnóstico (item 1.4 do plano)

O que você mostra na reunião não é como você faz. É o que você enxerga.

### A abertura, em três movimentos

**Movimento 1: o que ele acha que compra.**
> A maior parte das empresas que me procura acha que o problema é falta de sistema. Quase nunca é. O sistema existe, ele só não conhece a operação de vocês.

**Movimento 2: onde o dinheiro some sem aparecer.**
> Numa operação de balcão, o dinheiro escapa em três lugares que não aparecem em relatório nenhum. O cliente que mandou mensagem e não foi respondido a tempo. A consulta que só uma pessoa da equipe sabe fazer, então ela vira fila. E a peça que existia em outra loja, mas ninguém descobriu a tempo de vender.
>
> Nenhum desses três vira número. Venda perdida não entra na DRE, porque ela nunca virou pedido.

**Movimento 3: a conta da folha.**
> Com 180 pessoas, a pergunta que interessa não é quanto custa a folha. É quanto da folha está fazendo trabalho que se documenta. Trabalho que se documenta é trabalho que se automatiza. É isso que o diagnóstico mede.

### A regra de execução

> **Mostre o problema e o caminho. Nunca o passo a passo técnico.**
> O plano JDP: *"Vc encanta o cliente com o que fazer. O como fica com vc depois que ele fecha."*

Não fale em modelo, prompt, integração, API ou plataforma. Se ele perguntar como funciona por dentro, devolve pro resultado: *"a parte técnica é minha. O que muda pra você é [resultado]."*

---

## 6. Roteiro da reunião: os 7 blocos aplicados ao Rocha

Estrutura de `estrutura-reuniao-unica-irbis.md`. O BANT do plano JDP entra no bloco 2, sem virar interrogatório.

### Bloco 1 · 0 a 4 min · Abertura e contrato

```
Roberto, nossa próxima hora funciona assim. Os primeiros dez minutos eu entendo
o contexto de vocês. Depois eu faço as perguntas que revelam onde a operação
perde tempo e venda. Na última parte eu te mostro o que eu faria aqui e quanto
custa. No fim eu vou te pedir uma resposta, mesmo que seja não. Fechado?
```

### Bloco 2 · 4 a 14 min · Triagem (o BANT)

Quatro perguntas. As do plano JDP, reescritas pro vocabulário de autopeças e pro produto certo.

**Authority** (primeiro, porque a Isabel existe e isso muda tudo):
```
Roberto, antes de entrar na operação: decisão de investir em sistema aqui é
sua sozinha ou passa pela Isabel também?
```
> Se ela decide junto e não está na sala: siga a reunião até o fim do diagnóstico, mas **não feche**. Marque o fechamento com os dois. Gate de entrada: reunião se remarca, não se adapta.

**Budget**:
```
Hoje vocês já investem em sistema, ferramenta ou estrutura pra organizar a
operação? Quanto isso pesa por mês, somando licença, gente e retrabalho?
```

**Need**:
```
Com sete lojas e o CD, onde você sente que mais escapa venda hoje?
```
> Cale a boca depois dessa. O silêncio é o que traz a resposta real.

**Timing** (com o gancho do CD novo):
```
Vi que vocês estão planejando uma unidade nova. Resolver isso antes dela abrir
é prioridade agora ou está em avaliação?
```

**Tréplica após cada resposta**, nunca emendar pergunta em pergunta.

### Bloco 3 · 14 a 17 min · Autoridade · **máximo 3 minutos**

Sem deck. Sem lista de pilares (os quatro pilares antigos eram de site e morreram; a estrutura da reunião proíbe inventar nomes novos ao vivo).

```
Eu construo sistema e IA pra empresa da economia real. Fábrica, escritório de
advocacia, operação de serviço. O que eu faço é entrar na operação, achar onde
o trabalho repetido está comendo margem, e resolver isso com sistema feito pra
aquela operação, não com ferramenta de prateleira.
```

Prova social disponível, se ele pedir: **Odery Drums** (indústria, CRM implementado e bot de WhatsApp rodando). É o caso alinhado com a oferta atual.
**Não citar:** Adash (nunca foi entregue). E-Force serve só como prova de geração de demanda, não de produto.

### Bloco 4 · 17 a 34 min · Diagnóstico

A pergunta que abre, direto do árbitro:
```
Como funciona a operação de vocês hoje? O que já é sistema e o que ainda é
manual?
```

Depois, na ordem, e só onde ele abrir:
- Cliente que precisa de peça entra por onde? Balcão, telefone, WhatsApp, os três?
- Quem responde? Quantas pessoas fazem isso?
- Quando não tem a peça na loja, como vocês descobrem se tem em outra?
- Consulta de aplicação, quem sabe fazer? Quanto tempo leva pra treinar alguém novo?
- Oficina que compra a prazo, como vocês controlam?
- **Já tentaram resolver isso com alguma ferramenta? O que aconteceu?**

**Saia deste bloco com número.** Quantas horas por semana, quantas mensagens por dia, quantas pessoas envolvidas. É esse número que sustenta o preço no bloco 6. Sem ele, a ancoragem vira opinião.

### Bloco 5 · 34 a 46 min · Apresentação

Aqui você usa o mecanismo da seção 5, aplicado ao que ele acabou de contar. Não é um pitch genérico: é a devolução do que ele falou, organizada.

Formato: *"você me disse [X]. Isso significa [consequência em dinheiro ou tempo]. O que eu faria aqui é [caminho], nessa ordem, por esse motivo."*

### Bloco 6 · 46 a 52 min · Ancoragem

A frase da seção 4. Número fixo, escopo declarado, sem mensalidade.

### Bloco 7 · 52 a 60 min · Fechamento

```
O não me libera pra cuidar de outro cliente. O talvez é o que me atrapalha.
Amanhã às 14h você me dá a resposta?
```

Proposta escrita em até 24h, confirmando o que já foi apresentado ao vivo. A proposta confirma, nunca revela.

---

## 7. As três objeções que vão aparecer, e a resposta

### "Vocês já fizeram isso pra empresa do meu tamanho?"

A resposta honesta, do plano JDP, ajustada pra não prometer case que não existe:
```
A gente não vende um case de um nicho só. Eu aplico um método de diagnóstico e
automação que já rodou em segmentos diferentes. O princípio é o mesmo, o que
muda é a execução em cada operação. Pra vocês, eu adapto pro setor de vocês.
```
Não force um case de porte equivalente. Você não tem, e ele vai perceber.

### "Dez mil pra um relatório?"

```
Não é relatório. É o mapa de onde a sua operação perde dinheiro, com o número
de cada frente e a ordem de resolver. Se ele achar uma coisa só, do tamanho
que a gente conversou aqui, ele se paga antes de você decidir construir
qualquer coisa.
```

### "Vou pensar / preciso alinhar com a Isabel"

Essa você já antecipou no bloco 2. Se a Authority foi mapeada certo, ela não aparece de surpresa. Se aparecer mesmo assim:
```
Faz sentido. Quando vocês conseguem sentar? Eu prefiro marcar agora um horário
pra resposta do que ficar te cobrando por mensagem.
```

---

## 8. Checklist até segunda às 15h

| Quando | Quem | O quê |
|---|---|---|
| **Hoje (sexta)** | Nicolas | **Mandar a mensagem do Gabriel** (texto pronto na seção 5 do `preparo-jdp-17ago-rocha.md`) |
| ~~Hoje~~ | ~~Nicolas~~ | ~~Resolver o horário do preparo com o Vitor~~ ✅ resolvido: vai faltar a Aula |
| Até domingo à noite | Gabriel | Levantar as 5 respostas da seção 1 (ERP, canais, nº de atendentes, papel da Isabel, o que já tentaram) |
| Sábado/domingo | Nicolas | Ler este doc uma vez. Não decorar, só fixar a ordem dos blocos |
| **Segunda 11h** | Nicolas + JDP | **Fechar o número, o prazo da consultoria e a resposta pra "vinte mil por um relatório?"**. Pauta no `preparo-jdp-17ago-rocha.md` |
| Segunda 13h-14h | Nicolas | Reler blocos 2, 4 e 6. São os únicos que não podem improvisar |
| Segunda 14h50 | Nicolas | Confirmar quem estará na sala. Se a Isabel não vem, o plano do bloco 7 muda |
| Segunda pós-reunião | Gabriel | Registrar em `pessoas` + `interacoes` no Supabase no mesmo dia, com origem preenchida |

---

## 9. O que não fazer, em nenhuma hipótese

- **Não oferecer site, landing page ou nada de identidade visual.** Fora de escopo desde 04/ago
- **Não compartilhar tela com o deck.** Nunca foi auditado depois do pivot e provavelmente ainda mostra produtos de site
- **Não prometer prazo de construção.** Não existe prazo padrão por frente. Se perguntarem: *"o prazo depende do escopo. Ele vai na proposta, em dias úteis, e entra no contrato"*
- **Não vender Sistemas nem Bot de IA nesta reunião.** Eles nascem na entrega da consultoria
- **Não cotar por hora.** Nem uma vez, nem de exemplo
- **Não citar R$ 2.997.** É a exceção do QG OS, não é âncora
- **Não marcar segunda call antes de fechar.** Se precisou de duas conversas pra chegar aqui, a triagem falhou
- **Não citar o case Adash.** Nunca foi entregue
- **Não afirmar nenhuma das 4 hipóteses de gargalo como se fosse fato do Rocha.** São pauta de pergunta

---

## 10. Pendências que este doc abre

1. **O degrau "Consultoria de IA enterprise" segue sem valor na política.** Se o número do Rocha for fechado, ele vira o primeiro dado real dessa faixa e a `politica-de-preco-irbis.md` precisa ser atualizada com o critério, não só com o valor
2. **O `CLAUDE.md` está desatualizado**: ainda registra "Bot de IA é a porta, Sistemas é o upsell" (12/ago), revogado em 13/ago pelo `funil-consultoria-producao-irbis.md`
3. **Script da Reunião de Entrega da Consultoria não existe.** Se o Rocha fechar segunda, esse script vira urgente, porque é onde a produção é vendida
4. **O que entra no entregável da consultoria** (documento, apresentação, os dois) não está definido. Se ele perguntar o que recebe, hoje não há resposta canônica
5. **Prazo da consultoria** não definido. Não inventar na reunião
6. **Gabriel não existe em nenhum documento do repo.** Nem no `CLAUDE.md`, nem no Supabase, nem na rotina diária. Vale registrar quem é e o que ele opera, senão a próxima rotina automatizada segue escrevendo "o colaborador"
