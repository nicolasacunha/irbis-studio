---
name: irbis-call-de-vendas
description: 'Use quando a tarefa envolver a reunião de vendas da IRBIS — videochamada de fechamento de ~45 min, preço ao vivo, decisão na call. Dispara em: script da call, SPIN, ancoragem de preço, objeções ("tá caro", "vou pensar", "falar com o sócio"), silêncio pós-preço, cases e números citáveis em call, termo de aceite, proposta em 24h, follow-up de quem não fechou, deck Apresentação Comercial, mapa-mental-call-irbis.html, dados-custo-site-ruim.md.'
---

# IRBIS — Call de Vendas (fechamento em ~45 min)

Videochamada de ~45 min onde a IRBIS apresenta o método, ancora o preço ao vivo e pede decisão na própria call. Etapa "Reunião" do funil (Prospecção → Qualificação → **Reunião** → Entrega/Recorrência → Indicação, cf. `03 - Comercial/README.md`). Runbook completo: preparação, condução minuto a minuto, preço, objeções, pós-call.

**Glossário** (definido uma vez, usado no resto do documento):
- **SPIN** — sequência de perguntas Situação → Problema → Implicação → Necessidade; extrai a dor e o número de perda do prospect.
- **Ancoragem / âncora** — apresentar primeiro um valor alto de referência (R$ 7.000–7.500) para o fechamento (R$ 4.500–5.000) parecer decisão fácil.
- **Pré-fechamento** — obter o "sim, isso resolve meu problema" ANTES de falar qualquer número.
- **Termo de aceite** — documento que o cliente assina no fechamento (substitui a proposta escrita para quem fechou na call).
- **Grupo JDP** — mentoria comercial que originou este método. Checkpoints com avaliador ("Arthur"); pipeline vive no Notion, workspace "Grupo JDP <> IRBIS STUDIO" (fora do repo — sem link disponível nesta skill; peça o link ao dono se precisar registrar um toque).
- **MRR** — receita recorrente mensal (planos de sustentação pós-entrega).
- **Downsell** — oferta menor (ex.: só landing page) quando o projeto completo não cabe.

## Quando NÃO usar esta skill

| Situação | Use no lugar |
|---|---|
| Gerar a reunião: cold call, outbound LinkedIn, quiz de DM, call de diagnóstico de 15–20 min | `irbis-prospeccao-e-diagnostico` |
| Depois do "sim": briefing, produção, entrega, repitch MRR, pedido de indicação | `irbis-entrega-e-recorrencia` |
| Decidir o que é canônico vs obsoleto no repo, lista completa de números banidos | `irbis-guarda-pivot` |
| Escrever qualquer copy externa (proposta escrita, mensagens, posts) | `irbis-brand-voice` |
| Editar/publicar o site irbis.com.br (ex.: remover o case Adash do ar) | `irbis-site-ops` |
| Regras globais da casa, RTK, fluxo superpowers, regra de commit | `workbench-metodo-da-casa` |
| Contexto do portfólio e metas de 90 dias | `portfolio-mapa-e-decisoes` |

## Regras inegociáveis (NUNCA ajustar sem autorização explícita do Nicolas)

1. **Método JDP é fixo.** Dono, 04/jul/2026, verbatim: *"Regras deles sao fixas."* Não adapte por conta própria: timing de cada etapa, ordem da ancoragem, ordem das etapas, e a regra de decisão da call = **"pré-fechamento (sim/não sobre resolver o problema) sempre antes de qualquer número; silêncio absoluto depois do número"** (ver seção Fechamento).
2. **Meta vigente** (dono, 04/jul/2026, verbatim): *"Sucesso em 90 dias seria zapfy aprovado e irbis tendo pelo menos 2 clientes por mes."* ⚠️ Cheque a data: se hoje já passou de ~out/2026, confirme com o dono se a meta ainda é essa antes de reportar progresso contra ela. KPI de referência: conversão reunião→fechamento 20/30/40% (N1/N2/N3, `03 - Comercial/00 - Planejamento/kpis-comercial-irbis.md:36`). Gargalo nessa etapa = problema de condução/ancoragem (mesmo arquivo, linha 56).
3. **Só prova social confirmada.** Em jul/2026, único número afirmável: **"+R$ 350k em vendas"** (case E-Force — empresa cliente da IRBIS; entregue 27/abr/2026). Ver tabela de munição.
4. **Preço nunca antes do pré-fechamento; silêncio absoluto depois do preço.**
5. **Escassez só se verdadeira.** "Escassez fabricada quebra a marca" (`script-call-comercial-junho-2026.md:223`). Confirme status real da agenda antes de toda call (ver checklist pré-call, item 7, para o processo).
6. **Não passar de 50 min sem decisão explícita na mesa** (`script-call-comercial-junho-2026.md:36`).
7. **Voz IRBIS**: confiante sem arrogância, direta, técnica, seletiva. Sem entusiasmo fabricado, sem pedir desculpa por cobrar. Detalhe completo: skill `irbis-brand-voice`.

## Fontes primárias

Todas em `03 - Comercial/03 - Reunião de Vendas/`, salvo indicado:

| Arquivo | O que é | Data |
|---|---|---|
| `script-call-comercial-junho-2026.md` | Roteiro mestre da call, etapa a etapa | criado 11/jun/2026 |
| `script-quebra-objecoes-junho-2026.md` | Passo universal + 8 objeções com scripts | criado 11/jun/2026 |
| `dados-custo-site-ruim.md` | Munição de dados com fonte primária + lista do que NÃO citar | 15/jun/2026 |
| `manual-follow-up-irbis.md` | Follow-up de quem teve a reunião e não fechou | 16/jun/2026 |
| `mapa-mental-call-irbis.html` | Mapa interativo mobile da call (9 ramos) — abrir no navegador como cola de call | 11/jun/2026 |
| `Cópia de IRBIS — Apresentação Comercial.pdf` | O deck (ver seção Deck) | 15/jun/2026 |
| `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md` | Quebra de preço e planos MRR | jun/2026 |
| `03 - Comercial/00 - Planejamento/todo-plano-7dias.md` | Âncora definida + pendências do deck | jun/2026 |
| `03 - Comercial/02 - Qualificação e Agendamento/roteiro-call-diagnostico-irbis.md` | Roteiro da call anterior (diagnóstico); define a faixa de preço já ouvida pelo prospect | — |

## Timing cronometrado

| Etapa | Janela | Fase do deck |
|---|---|---|
| 1. Intro / warm-up | 0–5 min | Abertura (capa → agenda) |
| 2. Autoridade | 5–7 min | Resultados |
| 3. SPIN + diagnóstico | 7–20 min | Diagnóstico |
| 4. Pitch | 20–33 min | Método → Entrega → Suporte → Cases |
| 5. Ancoragem | 33–38 min | Bônus → Oferta |
| 6. Fechamento | 38–45/50 min | Decisão |

**Como cronometrar/gravar** (processo mínimo até o dono definir ferramenta oficial): ligue a gravação nativa da plataforma de call usada (Zoom/Meet/Whatsapp) antes do item 1 do checklist pré-call; use um cronômetro de celular ou o timer do computador, anotando o minuto de início de cada etapa da tabela acima. Depois da call, compare o timing real com a tabela — desvio recorrente numa etapa = ponto de treino.

## Roteiro etapa a etapa

### 1. Intro (0–5 min)
- Energia calma e firme ("você não está animado, você está em casa").
- **Rapport de dever de casa** (1 linha real, nunca social): "Vi seu site antes da call. [observação específica da auditoria pré-call]." Sem observação real → vá direto ao pacto.
- **Aviso de anotação**: "Se eu olhar pra baixo durante a conversa, é porque estou anotando o que você fala."
- **Pacto de abertura** (verbatim do script): "Eu não vou tentar te empurrar nada. Mas no final eu vou te pedir uma resposta: sim ou não. Os dois são respostas boas. Combinado?"

### 2. Autoridade (5–7 min — máximo 2 min de fala)
- "Eu faço só sites — landing page, institucional, e-commerce. Mais nada. Foco é uma decisão: quem faz de tudo não é referência em nada."
- Prova social: cite **apenas** "+R$ 350k em vendas no lançamento" (E-Force) e feche com "A pergunta dessa call é: qual vai ser o seu número?".
- ⚠️ **Não use o bloco de exemplos da linha 76 do script** ("Adash — processo de dias virou horas. Odery — aumento de LTV"): script interno desatualizado, contradiz regra do dono (Adash não é case afirmável, LTV da Odery é inventado — ver Munição). Mencione só E-Force; regra do dono sempre vence sobre o script.

### 3. SPIN + diagnóstico (7–20 min)
**Onde ficam as "6 dores" citadas abaixo**: elas vivem no deck "IRBIS — Apresentação Comercial" (fase Diagnóstico, ver tabela de Timing) e no `script-call-comercial-junho-2026.md` — não estão reproduzidas nesta skill porque são conteúdo visual do deck, não texto de runbook. Sem acesso ao deck nem ao script no momento da call → pergunte ao dono quais são as 6 dores antes de conduzir esta etapa; não invente uma lista própria.

Deck para no slide "Seu cenário"; a conversa manda. Ordem:
1. **Situação**: como o cliente chega hoje; tem site/quem fez/quem mexe; roda tráfego pago e quanto; meta de faturamento 12 meses.
2. **Problema**: "O que te fez aceitar essa conversa?"; maior travamento do site (ou da falta dele). Avance pelos slides das 6 dores (ver acima) e pare na que ele citou; slide Checklist: "Dessas seis, quantas são suas?"
3. **Implicação**: "Quantos leads ou vendas você estima que perde por mês por causa disso?" — **anote o número exato citado pelo prospect** (reutilizado na ancoragem e no fechamento; regra mais importante do SPIN, `script:116`). Se ele responder "não sei" → peça um chute ("1, 5, 20 leads/mês?"); qualquer número aproximado dito por ele é usável. **Se ele responder com um intervalo** (ex.: "uns 5 ou 10"), anote o intervalo completo como dito ("5 a 10 leads/mês") — não arredonde nem escolha um dos extremos; reuse o intervalo inteiro, verbatim, na ancoragem e no fechamento ("você me disse que perde entre 5 e 10 leads por mês"). Se recusar-se a estimar, ancore no "custo de continuar sem decidir" (ver Ancoragem), sem número.
4. **Necessidade**: "Se o site virasse seu melhor vendedor…"; "De 0 a 10, quão urgente?" Nota <7 → "O que faria isso virar um 9?"
5. **Pacto para apresentação**: "Não é o tráfego, não é o produto, não é falta de esforço. Faz sentido eu te mostrar como você sai de [situação, palavras DELE] para [objetivo, palavras DELE]? No final você me dá um sim ou um não. Fechado?"

Regra transversal: anote as respostas às 4 perguntas do SPIN com **as palavras exatas do prospect** (não parafraseie, não transcreva a call inteira) — são reusadas literalmente na ancoragem e no fechamento.

### 4. Pitch (20–33 min)
- Virada: "O que resolve isso não é esforço. É estrutura."
- **Método (5 fases: Escuta, Diagnóstico, Estratégia, Execução, Ritual)** — conecte cada fase a algo que ELE disse no SPIN.
- IA como alavanca: "A estratégia é minha. A execução é amplificada. O que leva semanas numa agência, aqui leva dias. IA como alavanca, não muleta."
- **Micro-confirmação obrigatória antes da Entrega**: "Faz sentido esse cenário até aqui?"
- Entrega (4 pilares): ler só o "na prática" de cada pilar. Handoff: "Site no ar, código e acessos seus desde o dia 1, analytics configurado, guia de edição. Tudo é seu. Eu não crio dependência."
- Suporte: "Checkpoint semanal, WhatsApp direto, resposta em horas. Quem responde é quem executa."
- **Cases: 1 ou 2, nunca os 3** — escolha o mais parecido com o cenário dele; formato contexto → ação → resultado, 1 min cada. Em jul/2026, o único case com número afirmável é E-Force (ver Munição).
- Transição para oferta: "De tudo que você viu, o que é mais urgente pra você hoje? De 0 a 10, quanto isso impacta seu negócio agora?"

### 5. Ancoragem (33–38 min)
- "Antes do número, uma distinção: preço é o que você paga uma vez. Valor é o que o site devolve todo mês."
- **Stack completo na tela**: slide "Investimento" do deck (mesma fase "Oferta" da tabela de Timing — é o slide seguinte ao de Bônus; ver pendência 3 e 6 da tabela de Deck, que tratam desse mesmo slide). Mostre os 4 pilares + suporte + 4 bônus com o valor cheio **R$ 7.500**: "Isso não é extra. Isso faz parte da conta."
- **Reuso do número de perda do SPIN** (slide "A pergunta certa"): "A pergunta não é quanto custa o site. É quanto custa continuar sem ele. Você me disse que perde [implicação DELE — leads/R$ por mês]. Esse é o preço de não decidir." Sem número (prospect não estimou no SPIN) → "Cada mês sem resolver isso é um mês pagando o custo de não decidir."

### 6. Fechamento (38–45/50 min)
1. **Pré-fechamento ANTES do número**: "Tirando os valores da equação — isso resolve o seu problema?" Só apresente o número depois do "sim". "Depende" → "Depende do quê?"
2. **Apresentação do número**, amarrada no SPIN: "Você me disse que [dor, palavras dele], que isso custa [implicação] por mês, e que resolver é prioridade [nota] de 10. Pra esse escopo — [tipo de site] — o investimento é R$ [X]." (X = ver tabela de Preço abaixo, conforme escopo).
3. **SILÊNCIO. Quem fala primeiro depois do preço não é você.** Regra do Manual de Copy: apresente o valor, explique uma vez, não justifique mais.
4. **Fechamento direto**: "Se a condição encaixar pra você, fechamos hoje — e seu briefing acontece ainda essa semana. Fechado?"
5. **Escassez verdadeira** (slide "1 vaga por vez"): "Eu pego um projeto por vez — atenção total. A agenda fecha quando lotada. Hoje ela está [status REAL confirmado antes da call — ver checklist item 7; se o número real for diferente de "1 vaga", fale o número real em vez do texto do slide, conforme regra de resolução de conflito do checklist]."
6. **Semente de indicação** (fechando ou não): "Se essa conversa te ajudou a enxergar o problema, quem você conhece que está com o site travando o negócio? Me apresenta que eu faço a mesma análise pra ele."

## Preço: âncora, número apresentado e quebra

| Item | Valor |
|---|---|
| Site (obrigatório) | R$ 4.500 |
| Acompanhamento (opcional — 3 meses × R$ 1.000, equivale ao plano Pro embutido) | R$ 3.000 |
| **Projeto completo (âncora do stack, com acompanhamento)** | **R$ 7.500** |

**Qual número apresentar na call — regra de decisão:**
- Mostre o stack completo (Ancoragem, item "Stack completo na tela") com o valor cheio **R$ 7.500** como referência.
- No Fechamento (passo 2), o número que você diz em voz alta ao prospect é a **faixa de fechamento real: R$ 4.500–5.000** — não R$ 7.500. A quebra R$ 7.500 é o que ele viu na tela como âncora; o que ele ouve como "seu investimento" é 4.500–5.000.
- Se ele perguntar sobre o acompanhamento: é **opcional** — tirar = R$ 4.500. Enquadre o corte de escopo como escolha do cliente, nunca como desconto que você deu.

Outras referências de preço:
- Âncora verbal documentada: **"R$ 7.000 → fecha 4.500–5.000"** (`todo-plano-7dias.md:6`; o follow-up escrito usa R$ 7.000 como valor apresentado por escrito).
- O prospect já ouviu a faixa **R$ 4.500–7.500** na call de diagnóstico anterior (⚠️ verificar — path pode ter mudado: `03 - Comercial/02 - Qualificação e Agendamento/roteiro-call-diagnostico-irbis.md:61`); a call de vendas fecha o número exato.
- **Regra de desconto** (objeção "tá caro"): preço não se justifica duas vezes e não cai sem cortar escopo. "Padrão" = os valores desta tabela (R$ 4.500 site / R$ 7.500 completo) — sem desagregação por tipo de site (landing/institucional/e-commerce) nesta fonte; sem essa quebra, use a faixa geral, não invente. "Se o orçamento for menor, posso adaptar o escopo — mas não o padrão." Caminhos: **condição** (entrada + parcelas; "TMB": parte à vista, resto em boleto parcelado) ou **escopo** (começa pela landing page).
  - **% de entrada e nº de parcelas**: não definidos em nenhuma fonte primária (nem script, nem processo de entrega). Não invente um percentual ou número de parcelas fixo ao vivo. Trate como decisão caso a caso: pergunte ao prospect a condição que ele consegue ("Quanto você consegue de entrada, e em quantas vezes fecha o resto?") e monte a partir da resposta dele — a única regra fixa é "parte à vista, resto em boleto parcelado" (TMB), sem trava numérica. Se o dono quiser padronizar % e nº de parcelas, é decisão dele; pergunte antes de repetir a mesma condição em várias calls.
  - **Preço de landing única / downsells**: as fontes citam os downsells (landing page única, página de captação/agendamento, refação só da home — ver Pós-call) mas **nenhuma fonte lista o preço de nenhum deles**. Não invente um valor ao vivo. Se o prospect pedir o preço do downsell na call, responda com a mesma lógica da objeção 8 ("Quanto custa?"): peça o escopo exato e ofereça levar um número real depois, ou pergunte ao dono antes de cotar ao vivo.
- Planos MRR citáveis como contexto (não vendidos nesta call): Básico R$ 350/mês, Pro R$ 1.000/mês, Premium R$ 2.500/mês (+ Infra R$ 150–250/mês; "Fábrica de LPs" R$ 2–3k — pacote recorrente de landing pages avulsas, sem outra definição nas fontes). Repitch de MRR acontece na call de acompanhamento pós-entrega, NÃO aqui — skill `irbis-entrega-e-recorrencia`.
- **Alterar qualquer valor desta tabela é decisão do dono** — doc de origem marca os preços como "ponto de partida, ajusta conforme margem".

## Munição de prova social — o que pode e o que é BANIDO

Respostas do dono em **04/jul/2026** prevalecem sobre qualquer doc do repo:

| Afirmação | Status (04/jul/2026) | Uso em call |
|---|---|---|
| "+R$ 350k em vendas" (E-Force, entregue 27/abr/2026) | **REAL** — dono: "+350k em vendas é real" | Pode afirmar |
| "+500" (E-Force) | **INVENTADO** — dono: "500 inventado acho, nem sei onde ta isso" | **BANIDO** em qualquer peça |
| "LTV 1,8x" (Odery) | **INVENTADO** — dono: "LTV inventado tbm" | **BANIDO** em qualquer peça |
| Case Adash | Fictício ("projeto não foi entregue de fato"); permanência no site pendente de decisão do dono | **NUNCA** citar em call ou peça nova |
| Eduboxs | Dono: "eduboxs ainda nao fiz o site" — não é case | **NUNCA** citar como case |
| "3 semanas de média" (prazo) | Em revisão desde 11/jun, nunca confirmado | Não afirmar; prazos reais: LP 1–2 sem, institucional 3–4 sem |
| Odery como cliente entregue (sem métrica) | Cliente real, mas todo claim de resultado dele está contaminado pelo 1,8x banido | ⚠️ Pergunte ao dono antes de usar qualquer afirmação sobre a Odery |

**Referências no repo já superadas pela regra do dono de 04/jul/2026** (não siga esses trechos, mesmo que ainda estejam escritos):
- "LTV 1,8x" e a linha "Eduboxs … site entregue" em `03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md` (linhas 15–16) e a "Versão Odery" da mensagem de indicação (linhas 43–46).
- "EForce +500" em `script-call-comercial-junho-2026.md:80` — número canônico é +R$ 350k.
- Detalhe completo de canônico vs banido: skill `irbis-guarda-pivot`.

**Dados de mercado utilizáveis** (verificados com fonte primária em `dados-custo-site-ruim.md`):

| Dado | Fonte |
|---|---|
| 53% abandonam site mobile que demora >3s | Google/DoubleClick, 2016 |
| 75% julgam credibilidade pelo design | Stanford Web Credibility/Fogg, 2002 |
| Primeira impressão em 50 ms | Lindgaard et al., Carleton, 2006 |
| 83% das objeções de confiança são sobre aparência | Sillence et al., Northumbria, 2004 |
| 98% pesquisam negócio local online | BrightLocal, 2023 |
| +0,1s de velocidade = +8–10% conversão | Deloitte/Google, 2020 |
| Landing bem feita converte 3–5x a média | Unbounce, 2024 |

**NUNCA citar** (números inflados que derrubam na objeção): "94% das primeiras impressões são design" (use 83%), "US$1 em UX retorna US$100" (Forrester), "88% não voltam após experiência ruim" (Gomez), "Amazon: 100ms = 1% das vendas".

## As 8 objeções (`script-quebra-objecoes-junho-2026.md`)

**Passo a passo universal** (aplicar antes de qualquer script específico):

| # | Ação | Frase-chave |
|---|---|---|
| 1 | Despressurizar | "Faz sentido." |
| 2 | Amarrar ao que ele validou | (retome o "sim" de uma etapa anterior) |
| 3 | Isolar | "Tirando isso, você está 100% dentro?" |
| 4 | Confirmação dupla | "Então, resolvendo isso, a gente fecha?" |
| 5 | Lidar | (use as palavras dele do SPIN para responder a objeção específica, ver tabela abaixo) |
| 6 | Avançar | Fechamento, condição ou ajuste de escopo |

Se ele hesitar no passo 3 (não confirmar "100% dentro"), a objeção declarada não é a real → pergunte "O que mais está pesando?" e recomece do passo 1 com a resposta nova.

| # | Objeção | Resposta-chave |
|---|---|---|
| 1 | "Preciso pensar" | "O que costuma ajudar a decidir — é o escopo, o valor ou o timing?" → "De 0 a 10, quão seguro…? O que falta pra ser 10?" → prova ao vivo: compartilhe a tela e aponte 2–3 problemas reais do site dele (usar a auditoria pré-call) |
| 2 | "Tá caro" | "Tirando o investimento, você está 100% dentro?" → condição (entrada + parcelas) OU escopo (começa pela landing) — nunca baixar o padrão. Silêncio depois |
| 3 | "Preciso falar com meu sócio" | Prevenção: mapear decisor no agendamento ("Quem mais participa dessa decisão? Traz ele junto"). Na call: "Se dependesse só de você, você fecharia?" → oferecer 15 min com os dois ainda essa semana. Se pediu preço "pra levar" → "Número sem contexto vira só custo — e ele vai comparar com o sobrinho que faz site" |
| 4 | "Não vou fechar hoje" | "Se o investimento não fosse questão, você faria? Por quê?" (deixa ele vender pra si) → "O lead que saiu não volta pra conferir se o site melhorou — ele fechou com o concorrente. Qual o risco maior: decidir agora ou continuar pagando esse custo todo mês?" |
| 5 | "E se não funcionar?" | Isole a razão: prazo, qualidade ou resultado. Prazo → checkpoint semanal; Qualidade → cases e estudos de design; Resultado → "Analytics desde o dia 1… a gente não torce, a gente mede e corrige." + "Tudo é seu desde o primeiro dia. Eu não crio dependência — não preciso" |
| 6 | "Já tenho quem faz meu site" | "Há quanto tempo? E o site atual entrega [meta do SPIN]?" → "Se em X meses o caminho atual não te levou aí…" + "Você não precisa demitir ninguém — o site sai com guia de edição" |
| 7 | "Tenho outras prioridades" | "Me fala quais. Qual dessas prioridades não passa pelo site? Tráfego aterrissa no site. Cliente novo pesquisa o site antes da reunião. O site não concorre com as suas prioridades — ele é a infraestrutura delas" |
| 8 | "Quanto custa?" (pré-call) | Manual de Copy (`01 - Marca/IRBIS_Manual_de_Copy.md:363`): "Depende do escopo. Me fala o que você precisa e te dou um número real, não um 'a partir de'." Se insistir → "Número sem escopo é chute — e eu não chuto. 20 minutos de conversa e você sai com número e prazo reais" |

**Diagnóstico reverso** (objeção recorrente = etapa da call que falhou — anote e treine a etapa):

| Objeção que apareceu | Etapa que falhou |
|---|---|
| "Preciso pensar" | Implicação fraca no SPIN — a dor não doeu |
| "Tá caro" | Ancoragem fraca — o número chegou antes do valor |
| "Preciso falar com sócio" | Decisor não mapeado no agendamento/pré-call |
| "Será que funciona?" | Autoridade e cases mal usados no pitch |

Mindset: espere objeções (surpresa é falta de preparo); não reaja; silêncio estratégico; "não" honesto vale mais que "sim" arrancado — cliente espremido vira projeto problema.

## Pós-call

| Desfecho | Ação (`script-call-comercial-junho-2026.md:266-271`) |
|---|---|
| **Fechou** | Termo de aceite + agendamento do briefing no mesmo dia. Daí em diante → skill `irbis-entrega-e-recorrencia` |
| **Não fechou, mas quente** | Proposta por escrito em até 24h. Encerramento padrão: "Esse é o projeto. Quando quiser começar, é só falar." |
| **Sumiu depois da proposta** | Follow-up D+4: "[Nome], a proposta segue aberta. Se quiser ajustar algo, pode falar. Se o timing mudou, tudo bem também — só me avisa." |

**Termo de aceite — processo (não existe template editável no repo):**
1. Não existe .md/template pronto para editar (confirmado 04/jul/2026; só o script menciona o conceito).
2. Únicos modelos existentes: PDFs do caso ADash em `03 - Comercial/Propostas Em Espera/QG/` — path completo: `/03 - Comercial/Propostas Em Espera/QG/IRBIS · Termo de Aceite · ADash.pdf` (em branco) + versão assinada no mesmo diretório. ⚠️ Path documentado em 04/jul/2026 — se o arquivo não estiver lá, rode `find . -iname "*Termo de Aceite*"` a partir da raiz `Business/irbis/` antes de perguntar ao dono.
3. Para gerar um termo novo: use o PDF ADash como referência de estrutura/campos e edite manualmente (Canva ou editor de PDF, à sua escolha), substituindo os dados do caso ADash pelos do cliente atual.
4. **Peça aprovação explícita do dono antes de enviar** — não há modelo jurídico validado; passo obrigatório, não opcional. Pode agendar o briefing com o cliente no mesmo dia sem esperar essa aprovação, mas não envie o termo final ao cliente antes do "ok" do dono (canal não especificado nas fontes; use o canal que já existir com o dono).

**Follow-up estendido** (`manual-follow-up-irbis.md`, adaptado do JDP): 1 tentativa forte até 48h → follow-up ativo por 30 dias → base longa. Meta semanal 10–15 follow-ups (6–10 por ligação/áudio). No preço, o manual reapresenta "R$ 7.000 é o projeto completo" e desce ao vivo para R$ 4.500–5.000 — **nunca por escrito**. Downsell disponível: landing page única, página de captação/agendamento, refação só da home. Follow-up nível 3 sempre com horário concreto ("nunca 'me avisa quando puder'").

**Registro de cada toque**: pipeline Notion, workspace "Grupo JDP <> IRBIS STUDIO" (Estágio + Próximo contato). ⚠️ Sem link de acesso disponível nesta skill — o repo não guarda estado comercial; peça o link do workspace ao dono na primeira vez que precisar registrar.

**Gravação da call**: revisar timing real vs. tabela de Timing cronometrado (ver seção acima para processo de gravação).

## Deck "IRBIS — Apresentação Comercial" — estado e pendências

Dois PDFs no repo, **com bytes diferentes** (não são cópias idênticas; verificado 04/jul/2026):
- Raiz: `IRBIS — Apresentação Comercial.pdf` — 39.384.741 bytes, mtime 11/jun/2026.
- `03 - Comercial/03 - Reunião de Vendas/Cópia de IRBIS — Apresentação Comercial.pdf` — 39.322.699 bytes, mtime 15/jun/2026.

O deck é editado **no Canva** (`todo-plano-7dias.md`, Dia 3) — os PDFs são snapshots; o estado vivo está no Canva, conta pessoal do dono (sem link compartilhado nesta skill). **Verificação antes da primeira call**: sem acesso à conta Canva, pergunte diretamente ao dono "as 9 pendências abaixo já foram resolvidas no deck?" antes de usar o deck ao vivo — não presuma que sim.

| # | Pendência | Fonte |
|---|---|---|
| 1 | Números dos cases nos slides: trocar/remover "+500" (inventado) e "1,8x" (inventado); manter só +R$ 350k | `script-call-comercial:288-290` + dono 04/jul |
| 2 | Deletar as 2 slides do Adash (resultado "008" + case "045") | `todo-plano-7dias.md:19` (⬜) |
| 3 | Colar o slide de preço com âncora (duplicar a slide do "+350k" e trocar o texto) | `todo-plano-7dias.md:20` (⬜) |
| 4 | Tirar os números do footer das últimas 7 slides | `todo-plano-7dias.md:21` (⬜) |
| 5 | Slide Agenda diz "30 minutos" — a call é ~45. O script interno (`script-call-comercial:56`, Pacto de Transição) repete o mesmo erro — ao falar em voz alta, diga "essa conversa" ou "os próximos 45 minutos", nunca "30 minutos" | `script-call-comercial:291` |
| 6 | Slide Investimento: copy deve refletir número ao vivo; passo "01 Proposta — você recebe hoje" vira **termo de aceite no fechamento** | `script-call-comercial:292` |
| 7 | E-mail do slide final quebrado (proteção Cloudflare) → corrigir para contato@irbis.com.br | `script-call-comercial:293` |
| 8 | Deck promete "institucional 2–3 semanas"; prazo real é 3–4 — corrigir | `processo-entrega-padrao-irbis.md:60` |
| 9 | Bônus do deck ("30 dias de ajustes pós-lançamento", "guia de edição"): confirmar com o dono se entrega de fato; se não, tirar do deck | `processo-entrega-padrao-irbis.md:58-59` |

O conteúdo interno do PDF (37+ MB) nunca foi auditado pela descoberta — não presuma que qualquer pendência já foi resolvida.

## Checklist pré-call

1. [ ] **Site do prospect auditado NO DIA da call** — 1 observação específica anotada para o rapport (passo 1 do Roteiro). Sem site (prospect não tem um) → auditoria vira "ausência de site" como o próprio problema; pule para a observação do zero.
2. [ ] **Decisor mapeado no agendamento** — pergunta a fazer ainda na etapa de agendamento/qualificação (`irbis-prospeccao-e-diagnostico`): "Quem mais participa dessa decisão? Traz ele junto." Se a call de vendas já está marcada e isso NÃO foi perguntado antes: pergunte no início da Intro, antes do pacto de abertura ("Além de você, mais alguém decide isso?") — não deixe para o Fechamento, onde vira objeção 3 já tarde.
3. [ ] Case escolhido (o mais parecido com o cenário dele; com número, só E-Force +R$ 350k)
4. [ ] Faixa de preço definida para o escopo provável (âncora 7–7,5k → fecha 4,5–5k)
5. [ ] Deck aberto e testado; pendências da tabela acima perguntadas ao dono (ver seção Deck)
6. [ ] Gravação ligada; cronômetro pronto (ver seção Timing para processo)
7. [ ] **Status real da agenda confirmado com o dono** antes da call — pergunte "quantas vagas reais na agenda agora?" (canal não especificado nas fontes; use o canal que já existir com o dono). **Resolução de conflito entre a resposta e o slide "1 vaga"**: o slide é um template fixo que diz "1 vaga" — se o dono responder um número diferente (ex.: "2–3 vagas"), NÃO edite o deck ao vivo; ao falar o passo 5 do Fechamento, substitua verbalmente o texto do slide pela resposta literal do dono (ex.: diga "hoje eu tenho 2 vagas abertas" em vez de ler "1 vaga" da tela) — a regra é a fala bater com a realidade confirmada, não com o slide. Se a resposta for "0 vagas" (agenda lotada), não ofereça fechamento nesta call sem antes perguntar ao dono como proceder.
8. [ ] Contato com o dono sobre as pendências do deck (tabela da seção Deck): mesmo canal (WhatsApp direto) e mesma janela da checagem de agenda acima (noite anterior ou, no mínimo, 1h antes da call) — pode ser a mesma mensagem que a do item 7, perguntando as duas coisas juntas.
9. [ ] `mapa-mental-call-irbis.html` aberto no celular como cola (opcional)

## O que NUNCA entra na call

- Entusiasmo de palco ("tendo o melhor dia da minha vida") — a IRBIS é firme, não eufórica
- "Se gostar indica 10 amigos…" — cafona, fora da marca
- "Estou à disposição", "qualquer dúvida", "parceria", "soluções personalizadas", "metodologia ágil"
- Pedir desculpa por preço, follow-up ou silêncio
- Justificar o preço mais de uma vez
- Prometer fora do escopo: a IRBIS faz **só sites** (pivot definitivo de 01/jun/2026)
- Qualquer item da coluna BANIDO da tabela de munição

## Ambiguidades abertas — pergunte ao dono antes de decidir/publicar

| Tema | Hipóteses coexistentes | Regra até resposta |
|---|---|---|
| ICP (perfil de cliente ideal) oficial | (a) founders de startup (site inteiro fala com eles); (b) negócios locais premium (prospecção ativa desde 15–23/jun) | Dono, 04/jul/2026: "Ainda nao consegui definir meu ICP perfeitamente pq nao vendi direito." Na call, adapte exemplos ao prospect à sua frente; NÃO trave peça/copy nova num único ICP sem perguntar ao dono primeiro |
| Case Adash no site | (a) remover de irbis.com.br; (b) manter como peça de portfólio | Dono: "Case adash ainda indecidido." Em call: nunca citar, sem exceção. Remoção do ar: decidir com o dono via skill `irbis-site-ops` |
| PDF canônico do deck | (a) raiz (11/jun); (b) cópia da pasta Reunião (15/jun, bytes diferentes) | Estado vivo = Canva. Confirme com o dono qual exportação vale antes de apresentar |
| Bônus do deck | (a) entrega os 30 dias de ajustes + guia; (b) não entrega | Não prometa em call sem confirmação (pendência 9 do deck) |
| Claims da Odery | (a) citável como cliente entregue sem número; (b) não citar até ter métrica real | Número 1,8x banido sem exceção; qualquer outra afirmação sobre a Odery → pergunte ao dono antes de usar |
| Copy pública "como funciona?" | `.claude/brand-context.md:94-95` ainda descreve "em 24h mando proposta" (fluxo antigo); na call vigora decisão ao vivo + termo de aceite (`script-call-comercial-junho-2026.md:292`) | Na call, siga o script vigente (decisão ao vivo). Atualizar a copy pública é decisão do dono |

## Regra de commit (casa, desde 04/jul/2026)

Dono, verbatim: *"Acumular nao da. Tem que ter commit a cada fase de trabalho."* Se você alterar qualquer arquivo deste repo (scripts de call, docs comerciais, deck exportado), **commite ao fim de cada fase de trabalho e sempre antes de qualquer deploy**. O repo IRBIS não tem remote (`/usr/bin/git remote -v` vazio, 52 commits só nesta máquina, último de 10/jun/2026) — criar um remote privado no GitHub é pendência do dono; lembre-o. Detalhes do fluxo: skill `workbench-metodo-da-casa`.

## Proveniência e manutenção

**Escrito em 04/jul/2026, revisado em 06/jul/2026** a partir de: `03 - Comercial/03 - Reunião de Vendas/` (script, quebra de objeções, dados, follow-up, mapa mental, deck), `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md`, `03 - Comercial/00 - Planejamento/{todo-plano-7dias,kpis-comercial-irbis}.md`, `03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md`, `03 - Comercial/02 - Qualificação e Agendamento/roteiro-call-diagnostico-irbis.md`, dossiê `skills-library-discovery/irbis-business.md` (02/jul/2026) e **respostas do dono de 04/jul/2026** (prevalecem sobre o repo: +R$350k real; +500 e LTV 1,8x inventados; Eduboxs sem site; Adash indeciso; ICP em aberto; regras JDP fixas; commit por fase; meta 90 dias).

Comandos de re-verificação (rodar da raiz `Business/irbis/`):

- Docs da call mudaram? → `ls -la "03 - Comercial/03 - Reunião de Vendas/"`
- Âncora ainda 7k→4,5–5k? → `grep -n "Ancoragem de preço" "03 - Comercial/00 - Planejamento/todo-plano-7dias.md"`
- Quebra ainda 4.500 + 3×1.000 = 7.500? → `grep -n "4.500\|7.500" "03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md"`
- Planos MRR ainda 350/1.000/2.500? → `grep -n "R\$ 350\|R\$ 1.000\|R\$ 2.500" "03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md"`
- Pendências do deck ainda listadas? → `grep -n -A6 "## Pendências" "03 - Comercial/03 - Reunião de Vendas/script-call-comercial-junho-2026.md"`
- Slides do Adash ainda a deletar? → `grep -n "Adash" "03 - Comercial/00 - Planejamento/todo-plano-7dias.md"`
- Case Adash ainda referenciado no roteamento do site? → `grep -n "adash" site/vercel.json` (confirmado presente em 06/jul/2026, linhas 3–6)
- Números banidos voltaram a algum doc? → `grep -rn "1,8x\|+500" "03 - Comercial/" --include="*.md"`
- Template de termo de aceite ainda inexistente? → `grep -rli "termo de aceite" "03 - Comercial/" --include="*.md"` (só o script = sem template)
- Repo ainda sem remote/commits parados? → `/usr/bin/git remote -v && /usr/bin/git log -1 --format="%h %ad" --date=short`
- KPI reunião→fechamento mudou? → `grep -n "reunião → fechamento" "03 - Comercial/00 - Planejamento/kpis-comercial-irbis.md"`
- `brand-context.md` ainda no path esperado? → `find . -iname "brand-context*"` (confirmado em `.claude/brand-context.md`, 06/jul/2026)
