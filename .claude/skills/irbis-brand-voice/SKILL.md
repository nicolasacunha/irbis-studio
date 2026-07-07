---
name: irbis-brand-voice
description: "Use quando for escrever ou revisar qualquer comunicação externa da IRBIS ou do perfil pessoal do Nicolas: copy de site/landing page, proposta comercial, DM ou mensagem de outreach (LinkedIn, WhatsApp, Instagram), post, legenda, bio, e-mail de follow-up, roteiro de VSL ou reel, headline, CTA. Também para dúvidas de tom de voz, palavras proibidas, fórmulas de copy, prova social citável em texto, regra sem-travessão do JDP, ou tokens visuais (cores, fonte Sora, pantera)."
---

# IRBIS — Sistema de voz da marca

A IRBIS é o estúdio solo de Nicolas Cunha que faz **exclusivamente sites** (landing page, institucional, e-commerce) desde o pivot de 01/jun/2026. Esta skill define COMO a IRBIS escreve. Toda palavra que sai com o nome IRBIS (ou no perfil pessoal do Nicolas) passa por aqui.

**Regra zero:** nada é publicado (site, Instagram, LinkedIn, proposta enviada) sem aprovação explícita do Nicolas. Esta skill produz rascunhos prontos para aprovação, não publicações. Como o feedback de aprovação chega: Nicolas responde diretamente na conversa/prompt onde o rascunho foi apresentado (mensagem de texto dizendo "aprovado", "pode mandar", ou pedindo ajuste). Não existe canal separado (sem e-mail, sem comentário em arquivo) — se a aprovação não veio como resposta explícita nesta conversa, trate como NÃO aprovado e não publique.

## Quando NÃO usar esta skill

| Tarefa | Skill certa |
|---|---|
| Decidir O QUE pode ser afirmado (números, cases, canônico vs obsoleto pós-pivot, escopo) | `irbis-guarda-pivot` — use ANTES de afirmar qualquer fato (número, prazo, case, ICP) em qualquer peça |
| Editar/criar HTML do site, deploy em irbis.com.br, sitemap, analytics, GSAP | `irbis-site-ops` — use quando a tarefa TOCAR arquivos em `site/` ou exigir deploy; brand-voice só dá o texto, não mexe no site |
| Estrutura da call de fechamento de 45min (timing, ancoragem, objeções, pós-call) | `irbis-call-de-vendas` |
| Mecânica de prospecção (cadências, dossiês, quiz de DM, call de diagnóstico) | `irbis-prospeccao-e-diagnostico` |
| Mensagens do fluxo de entrega, repitch MRR e pedido de indicação | `irbis-entrega-e-recorrencia` |
| Regras globais da casa (anti-AI-slop completo, RTK, commit por fase, superpowers) | `workbench-metodo-da-casa` |

Esta skill dá a VOZ; as skills acima dão o conteúdo, o processo e a validação de fatos. Use `irbis-guarda-pivot` + `irbis-brand-voice` juntas sempre que a peça citar número, prazo ou case.

## Fontes canônicas (e a armadilha nº 1)

Paths relativos à raiz do projeto (`Business/irbis/`). Rode os comandos abaixo a partir dessa raiz (`cd` até `Business/irbis/` antes, se seu diretório atual for outro).

**Antes de tudo, rode este comando para saber se `brand-context.md` está em dia:**

```
/usr/bin/git status --porcelain -- .claude/brand-context.md
```

Mapa de saída → ação (não há caso "não sei o que fazer"):

| Saída do comando | O que significa | Ação |
|---|---|---|
| ` M .claude/brand-context.md` (ou `M ` / `MM`) | Versão em disco tem mudanças não commitadas | Use a versão em disco AS-IS. NUNCA rode `git checkout`/`restore` nesse arquivo. |
| (vazio, nenhuma linha impressa) | Working tree == HEAD; arquivo já commitado, nenhuma edição pendente | Não significa "desatualizado" nem "errado" — significa apenas que a versão em disco É a versão do git. Prossiga para o passo de confirmação de conteúdo abaixo. |
| `?? .claude/brand-context.md` | Arquivo não rastreado (novo, nunca commitado) | Use a versão em disco AS-IS; ela é a única que existe. |

Independente da saída acima, sempre rode em seguida (é o que confirma que o CONTEÚDO é pós-pivot, não a versão do git):

```
grep -n "só sites" .claude/brand-context.md
```

- Se encontrar a linha → arquivo é pós-pivot, use-o normalmente.
- Se NÃO encontrar (comando roda sem output) → arquivo é pré-pivot ou foi alterado por fora; PARE e pergunte ao Nicolas antes de usar qualquer trecho dele como fonte de voz ou copy aprovado.
- Se o arquivo não existir (comando de status já retorna erro/nada e o `grep` acima também falha por arquivo ausente) → PARE; não há fonte-mestre de marca disponível. Pergunte ao Nicolas onde está o `brand-context.md` atual antes de escrever qualquer peça — não prossiga só com o Manual de Copy (pré-pivot) como substituto.

| Arquivo | O que vale | Cuidado |
|---|---|---|
| `.claude/brand-context.md` | Referência MESTRE de marca pós-pivot: identidade, audiência, voz, linguagem, copy aprovado (§08 — ver "Como localizar §08" abaixo) | Ver protocolo de verificação acima. |
| `01 - Marca/IRBIS_Manual_de_Copy.md` (v1.0, abril/2026) | A VOZ: persona, tom por canal, 6 fórmulas, palavras banidas, glossário, respostas prontas | Escopo pré-pivot. Para achar as seções a ignorar, rode `grep -n "^## " "01 - Marca/IRBIS_Manual_de_Copy.md"` e localize pelo TÍTULO da seção (não pelo número de linha, que muda a cada edição): a seção cujo título contém "identidade" ou "app" ou "BRAND WARFARE"; a seção que faz diagnóstico do site antigo (título com "diagnóstico" ou "análise do site"); a seção de perguntas frequentes cuja resposta a "o que a IRBIS faz" lista "identidade, site, app". Se o `grep -n "^## "` não mostrar títulos autoexplicativos, abra o arquivo e procure pelo texto literal "identidade", "app" ou "diagnóstico" com `grep -n -i "identidade\|BRAND WARFARE\|diagnóstico"  "01 - Marca/IRBIS_Manual_de_Copy.md"` — as linhas retornadas são as que devem ser ignoradas como escopo pré-pivot. |
| `04 - Marketing/copy-arsenal-irbis.md` (01/jun) | Copy pós-pivot pronto: abertura de proposta, 3 posts IG, respostas rápidas, regras sempre/nunca | Contém 3 e-mails de cold outreach. Canal cold e-mail foi rejeitado por Nicolas em 01/jul/2026 (conversão baixa): use a VOZ como referência, não monte campanha com eles. |
| `04 - Marketing/P1-posicionamento-nicolas.md` (versão a confirmar — ver protocolo abaixo) | Camada P1 (marca pessoal, JDP): tese, vilão, filtro diário, bio, pilares | Contém referência a "Odery (1,8x)" — número banido em 04/jul/2026. Para localizar e excluir automaticamente, rode `/usr/bin/grep -n "1,8" "04 - Marketing/P1-posicionamento-nicolas.md"`; ignore/exclua QUALQUER linha retornada por esse grep (não memorize números de linha fixos — eles mudam se o arquivo for editado). O restante do arquivo vale. |
| `01 - Marca/brand_guide_completo.html` (v1.1) | Tokens visuais: paleta, tipografia Sora, pantera | `<title>` tem placeholder "[MARCA]" — cosmético, ignore. |
| `04 - Marketing/linkedin-perfil-nicolas.md` (01/jun) | Headline, About e cadência de LinkedIn aprovados | Fala só com founder — ver "ICP em aberto" antes de peça nova. |

**Confirmando que `P1-posicionamento-nicolas.md` é a versão referenciada nesta skill:** esta skill foi escrita citando o conteúdo do arquivo como estava em 25/jun/2026. Antes de usar qualquer citação textual dele (Big Idea, bio, filtro diário), rode:

```
/usr/bin/stat -f "%Sm" "04 - Marketing/P1-posicionamento-nicolas.md"
```

(comando `-f "%Sm"` é específico de macOS/BSD; ambiente desta skill é macOS, então use como está.)

- Se a data de modificação for 25/jun/2026 ou anterior → conteúdo desta skill está sincronizado, use normalmente.
- Se for posterior → o arquivo mudou depois desta skill ser escrita; leia o arquivo atual (Read) antes de citar qualquer trecho (Big Idea, bio, filtro) — use o conteúdo atual do arquivo como fonte, e trate o texto citado nesta skill como referência desatualizada, não como verdade a preservar.

O `CLAUDE.md` do projeto manda consultar o manual de copy e o brand guide antes de escrever qualquer comunicação externa. Ordem de consulta: 1) `brand-context.md` (referência mestre) → 2) Manual de Copy (fórmulas e tom).

## A marca em 6 linhas

- **Identidade:** "Sou Nicolas Cunha. Faço sites para founders. Só isso." (`brand-context.md` §01)
- **Tagline:** *A IRBIS faz só sites.*
- **Bio Instagram da IRBIS:** "Sites para founders. Nada mais."
- **Assinatura:** em DM, e-mail e post assina só "Nicolas" (nome, sem sobrenome nem "IRBIS" junto); "Nicolas — IRBIS." é a forma usada em contexto mais formal (rodapé de proposta/documento). NUNCA "Equipe IRBIS" em nenhum canal.
- **Anti-ICP:** quem quer o mais barato, projeto que exige time de 10 pessoas, quem decide por comitê.

Nome da marca: "irbis" é o nome mongol da pantera das neves ("o fantasma das montanhas") — o mascote é a pantera; a metáfora é aparecer, entregar um resultado com número + prazo curto (ex.: "+R$350k em semanas"), e sumir. Adjetivo vago ("incrível", "surpreendente") sem número não está na metáfora.

### ⚠️ Hero da home — trave até o dono decidir

Existem DOIS heros e eles não são iguais:

1. **Hero aprovado** (`brand-context.md` §07, spec do pivot, NUNCA implementado): "BRANDING? NÃO. / APP? NÃO. / IDENTIDADE? NÃO. / SITE? SIM. / O melhor que você já teve."
2. **Hero publicado** (`site/index.html:1874-1882`, no ar agora): "O site que seu negócio merece ter." (label: "Para founders de startups e negócios em crescimento").

**Regra:** reescrevendo/revisando a home, PARE e pergunte ao Nicolas qual hero vale antes de escrever. Fora disso (post, proposta), ignore a divergência e siga.

## Voz (constante) e tom (varia por canal)

**Voz — 5 traços que nunca mudam** (Manual §04):
1. Confiante sem arrogância vazia — você sente na forma, não na repetição
2. Direta — sem "no sentido de", "de certa forma", "acreditamos que"
3. Predatória com propósito — instinto por resultado, não por ego
4. Técnica — domina o assunto, não simplifica para parecer acessível
5. Seletiva — escolhe o cliente tanto quanto é escolhida

**Persona:** "predador técnico". Fala como founder que já provou o que sabe fazer; nunca como freelancer inseguro, agência grande fingindo ser acessível, ou alguém que pede desculpa por cobrar o que vale.

**Tom por canal** (Manual §04 + §07, complementado pelos docs de junho):

| Canal | Tom | Regras duras |
|---|---|---|
| Site / headline | Agressivo, cortante, caps | CAPS; até 12 palavras na linha (mobile: deixe quebrar naturalmente, não force); sem ponto final; subheading >5 palavras em sentence case; CTA imperativo direto. Ex.: "SEM TEMPLATE. SEM PIEDADE. SEM DESCULPA." (8 palavras) |
| Proposta comercial | Confiante, claro, sem florear | Título = cliente + o que será feito, em caps; problema ANTES da solução; preço direto, sem rejustificar; encerramento verbatim: "Esse é o projeto. Quando quiser começar, é só falar." |
| WhatsApp / DM | Direto, humano, founder com founder | Nunca abrir com "Olá, tudo bem?"; 1ª mensagem até 3 linhas; problema específico antes do pitch; assina "Nicolas" (exemplo completo em "Exemplos bom vs ruim") |
| E-mail follow-up | Objetivo, sem desculpa por seguir | Assunto curto, sem emoji, sem "follow-up" no assunto; corpo 2-3 linhas |
| Instagram / redes | Provocador, opinativo, com posição | Sem "depende"/"cada caso é um caso"; caption: linha 1 resultado/provocação, linha 2 contexto, linha 3 CTA discreto; CTA fixo: "manda 'site' no direct" |
| LinkedIn | Igual DM/redes, cadência própria | 3x/semana (ter/qui/sáb): auditoria pública, dado de CRO, bastidor — `linkedin-perfil-nicolas.md`; nunca citar prospects diretos em auditoria pública |
| Call (diagnóstico/venda) | Dono falando com dono | Sem travessão, sem tom de agência (`roteiro-call-diagnostico-irbis.md:88`); mecânica completa nas skills comerciais |

## As 6 fórmulas de copy (Manual §05 — exemplos verbatim)

| # | Fórmula | Estrutura | Exemplo aprovado | Onde usar |
|---|---|---|---|---|
| 1 | Setup + Punch | contexto calmo em minúsculas → VERDADE EM CAPS | "O mercado passou anos fazendo bonito sem pensar no negócio. Três meses de processo pra entregar o que devia levar três semanas. A GENTE NÃO OPERA ASSIM." | Posts, propostas, problema/solução |
| 2 | Negação Tripla | SEM [ruim 1]. SEM [ruim 2]. SEM [ruim 3]. | "SEM TEMPLATE. SEM PIEDADE. SEM DESCULPA." | Headlines, bullets |
| 3 | Resultado antes do processo | o que o cliente TEM depois, não o que a IRBIS faz durante | "Sites que você mostra pra alguém." | Descrições de serviço, IG |
| 4 | Exclusão como posicionamento | dizer quem NÃO é cliente | "Se você quer algo genérico, um site 'simples mesmo' — A IRBIS NÃO É PRA VOCÊ." | Stories, qualificação de lead |
| 5 | Dois substantivos em tensão | [instinto/emoção] + [técnica/racionalidade] | "PREDADOR TÉCNICO", "VELOCIDADE CIRÚRGICA", "INSTINTO CALCULADO" | Headlines de slide, taglines |
| 6 | Afirmação-provocação | declaração radical → IRBIS como nova realidade | "AGÊNCIAS NÃO FUNCIONAM." → Estúdios de excelência, sim. | Heros, abertura de proposta |

Aplicação nos 3 pilares de conteúdo P1 (ver seção "Camada P1" abaixo): as 6 fórmulas são ferramentas de FRASE, os 3 pilares (IA do jeito certo / Site que vende / O terceiro caminho) são ferramentas de TEMA — não há mapeamento 1:1 entre eles. Ao escrever um post de um pilar específico, escolha a fórmula (1-6) que melhor serve o argumento daquele pilar; um post do pilar "O terceiro caminho" tende a combinar bem com a Fórmula 4 (Exclusão) ou 6 (Afirmação-provocação), mas isso é orientação, não regra fixa.

Nota: "DESIGN IS DEAD." aparece no Manual como hero, mas era o hero do site PRÉ-pivot — use só como exemplo didático da Fórmula 6, nunca como copy do site atual. Para o hero atual, ver a seção "⚠️ Hero da home" acima.

## Copy aprovado — usar SEM adaptar (`brand-context.md` §08)

**Como localizar §08 dentro do arquivo:** o brand-context.md numera seções com cabeçalhos markdown no formato `## §NN` ou `## Seção NN`. Para pular direto para §08, rode:

```
/usr/bin/grep -n "§08\|Seção 08\|## 08" .claude/brand-context.md
```

Isso retorna o número da linha onde §08 começa; leia a partir dali até o próximo cabeçalho `## §` (que marca o início de §09). Se o grep não retornar nada, o arquivo pode ter sido reestruturado — nesse caso rode `grep -n "^## " .claude/brand-context.md` para listar todos os cabeçalhos e localize pelo conteúdo: a seção de "copy aprovado" é a que contém a frase "O site que seu negócio merece ter" ou o rótulo "Quanto custa?" — use `grep -n "Quanto custa\|site que seu negócio merece" .claude/brand-context.md` para confirmar em qual cabeçalho ela cai.

Estes blocos foram aprovados pelo Nicolas no pivot. Copie verbatim; não "melhore" o texto.

- **Abertura de proposta:** "O site que seu negócio merece ter — em 2 a 3 semanas. Imagine o próximo investidor, parceiro ou cliente abrindo o site de vocês e sentindo, antes de ler uma linha, que é um negócio sério." **Contém travessão.** Ver "Regra JDP" abaixo: bloco aprovado, mantenha verbatim, NÃO reescreva para tirar o travessão sem pedido explícito do Nicolas — mesmo que a peça onde ele for inserido seja "nova". Este bloco específico é uma EXCEÇÃO documentada à regra sem-travessão, não uma peça nova.
- **"Como funciona?":** "Briefing direto por call (20 min). Em 24h mando proposta com escopo, prazo e valor. Aprovando, começo em até 3 dias."
- **"Não é o momento":** "Sem problema. Posso te mandar um exemplo do que entrego em 5 minutos de leitura, só pra ficar na memória quando a hora chegar?"
- **Case âncora (depoimento):** Maurício Odery, CEO da EForce Drums — "O site antigo afastava os parceiros certos antes de qualquer conversa." Use como CITAÇÃO — a relação formal pai ↔ E-Force ↔ Odery nunca foi documentada. Peça que DEPENDE dessa atribuição (ex.: vídeo entrevistando-o como CEO) → confirme com Nicolas antes; citação de texto já aprovada → siga normalmente.

**"Quanto custa?" — trave antes de citar preço, EXCETO se o brief do cliente já define o preço.** Existem dois valores em conflito para peça de aquisição genérica (site institucional, material de prospecção, proposta-modelo sem cliente definido):
- Copy aprovado (`brand-context.md` §08): "Landing page a partir de R$5k. Site institucional e e-commerce sob escopo — a complexidade define. Na call de 20 min já te dou uma estimativa real."
- Site publicado (`site/index.html:2022,2210,78,181`): "a partir de R$3k".

NÃO cite nenhum dos dois valores sem perguntar ao Nicolas qual vale. Isso vale para qualquer peça, incluindo proposta comercial de cliente específico — mesmo que o Nicolas já tenha verbalmente combinado um preço com o cliente, confirme com ele qual valor/fonte usar antes de redigir, não decida sozinho entre §08 e o site publicado.

Ver também `irbis-guarda-pivot` e `irbis-site-ops`.

**Prazo de institucional — trave antes de citar prazo.** Copy aprovado promete "2 a 3 semanas"; processo real é 3 a 4 semanas (fonte: `04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md` ⚠️ path pode ter mudado — se não existir, rode `find "03 - Comercial" -iname "processo-entrega*"`).

Regra: pergunte ao Nicolas qual número usar antes de citar prazo em peça nova. Não há fallback sem essa resposta — se não houver como perguntar agora, não finalize a peça com prazo citado; entregue o restante e sinalize que o prazo falta confirmação do dono.

Versões expandidas (proposta 4 Ps completa, 3 posts de IG prontos, respostas rápidas) em `04 - Marketing/copy-arsenal-irbis.md`. Método por trás: Reef Copywriting + Ogilvy — as skills `reef-copywriting`, `ogilvy`, `stop-slop` e `copy-editing` estão instaladas em `.claude/skills/` deste repo. Invoque-as com a ferramenta Skill pelo nome (`stop-slop`, `ogilvy` etc.), passando o rascunho pronto como argumento/contexto — mesmo mecanismo usado para chamar `irbis-brand-voice`, como parte do checklist item 9.

## Palavras e padrões banidos

Se aparecer qualquer item abaixo, o copy não está no tom. Reescreva antes de entregar.

**Do Manual de Copy (§06):**

| Banido | Por quê |
|---|---|
| "Prezado(a)", "Venho por meio desta" | Formal corporativo velho |
| "Soluções personalizadas" | Clichê de agência |
| "Transformamos ideias em realidade" | Vazio |
| "Metodologia ágil", "Entregamos valor" | Jargão sem significado |
| "Nossa missão é" | Clichê de institucional |
| "Estamos aqui para ajudar", "Qualquer dúvida, estou à disposição" | Submisso, servil |
| "Sucesso!" como encerramento | Cafona |
| Emoji em contexto profissional | Exceto 🔴 em contexto de marca |
| "Simples assim" | Minimiza o trabalho |
| "Humildemente" | A IRBIS não é humilde, é precisa |
| "Tenho certeza que vai adorar" | Inseguro |
| "Fica à vontade" | Informal demais sem contexto |

**Do brand-context (§06) e copy-arsenal:** "agência" (para se referir à IRBIS), "soluções", "inovar", "transformar", "revolucionar", "sinergia", "ecossistema", "de ponta a ponta", "potencial", "agregar valor", "branding/identidade visual/dashboard" como serviço oferecido (escopo morto no pivot — mencionar como CONTEXTO é diferente, ver regra abaixo), CTA genérico ("saiba mais", "entre em contato"), parágrafo com mais de 3 linhas em copy de venda.

**Regra objetiva para "branding/identidade/dashboard":** proibido oferecer ("também fazemos branding"). Permitido para NEGAR escopo (Fórmulas #2 e #4) — ex.: "Você faz branding? Não, só sites." nega o serviço, não oferece.

**Do `CLAUDE.md` do projeto (linguagem de agência grande):** "ecossistema", "jornada omnichannel", "transformação digital".

**Anti-slop da casa** (lista completa na skill `workbench-metodo-da-casa`): advérbios de ênfase ("realmente", "simplesmente", "literalmente"); contraste binário "Não é X, é Y"; falsa agência ("a solução resolve" — nomeie quem age: Nicolas, a IRBIS); abertura com "Aqui está" / "A verdade é"; pontuação dramática ("Ponto final."); "jornada", "realizar seu sonho"; voz passiva.

**Vocabulário SEMPRE usar** (brand-context §06): sites, especialista, entrega, briefing, construir, founder, direto, landing page, e-commerce, semanas.

## Regra JDP: SEM TRAVESSÃO (regra fixa do programa)

JDP = Grupo JDP, mentoria comercial em que Nicolas está inscrito. Em 04/jul/2026 ele confirmou: as regras do JDP são fixas, ninguém as adapta por conta própria.

- **A regra:** sem travessão (—), voz humana (`P1-posicionamento-nicolas.md:3`; eco em `roteiro-call-diagnostico-irbis.md:88`: "sem travessão, sem cara de agência").
- **Aplicação padrão (não precisa perguntar) — critério objetivo "peça nova" vs "bloco aprovado":**
  - **"Peça nova"** = qualquer texto que você está gerando agora, do zero ou por paráfrase, que ainda não tem aprovação prévia registrada nesta skill (post, DM, e-mail, proposta nova, script novo) → SEM travessão. Use ponto, vírgula ou dois-pontos. Isso inclui revisar/editar um texto de terceiro (ex.: ajustar um rascunho que veio de outra fonte) — se você está alterando as palavras, é peça nova nesse trecho.
  - **"Bloco já aprovado"** = texto citado literalmente entre aspas na seção "Copy aprovado" acima ou em `copy-arsenal-irbis.md`, que você está reproduzindo verbatim (copiar e colar, não reescrever) → mantenha EXATAMENTE como está, travessões incluídos.
  - **Teste prático:** se você está digitando/gerando/alterando as palavras agora → é peça nova, sem travessão. Se você está copiando um bloco entre aspas desta skill sem mudar nada → é bloco aprovado, mantenha o travessão. Nunca misture os dois modos dentro do mesmo bloco de texto.
- **Pedido explícito para revisar o copy aprovado por causa da regra JDP** → pare e pergunte ao Nicolas; não decida sozinho entre as hipóteses:

| Hipótese | Implicação |
|---|---|
| A regra vale para TODO texto novo, incluindo revisão do copy já aprovado | Nicolas precisa revisar §08 e o arsenal numa passada |
| A regra vale só para conteúdo "voz humana" (posts pessoais, DMs, calls); copy de proposta/site aprovado fica como está | Os dois convivem: peça nova sem travessão, blocos aprovados verbatim |

## Prova social: o que pode entrar em texto

**Único número afirmável em qualquer peça** (confirmado pelo dono em 04/jul/2026): **"+R$350k em vendas"** (case E-Force).

Banidos (nunca usar em peça nova): "+500" (inventado); "LTV 1,8x"/"Odery (1,8x)" (inventado, aparece por engano em `P1-posicionamento-nicolas.md` — localize e ignore com `/usr/bin/grep -n "1,8" "04 - Marketing/P1-posicionamento-nicolas.md"`, ver seção "Fontes canônicas" acima); Eduboxs (não é case — site ainda não feito em 04/jul/2026); Adash (case fictício, permanência no site pendente de decisão do dono).

Lista completa, contexto e datas: skill `irbis-guarda-pivot` (consulte antes de afirmar qualquer número).

Dados de dor de mercado COM fonte, liberados para uso: 53% abandonam em >3s (Google, 2016); 75% julgam credibilidade pelo design (Stanford, 2002); 50ms para a primeira impressão (Carleton, 2006). Frases prontas em `03 - Comercial/03 - Reunião de Vendas/dados-custo-site-ruim.md` (esse arquivo também lista o que NÃO citar).

## Camada P1 — marca pessoal do Nicolas (JDP)

P1 = camada de posicionamento do perfil PESSOAL do Nicolas (não da IRBIS como marca), com IA como tese de execução. Fonte: `04 - Marketing/P1-posicionamento-nicolas.md` (protocolo de verificação de versão na seção "Fontes canônicas" acima).

- **Big Idea (tese):** "A maioria acha que pra ter site bonito e que vende tem que esperar meses e pagar agência. A verdade é que isso é problema da agência, não do trabalho. Com IA eu entrego bonito, rápido e vendendo. Sozinho, em semanas."
- **Versão falada (15s):** "Bonito, rápido e que vende. Falam que você escolhe dois. Eu entrego os três."
- **Vilão de duas caras:** (1) a agência — lenta, cara, cheia de camadas; (2) a IA preguiçosa — site genérico e mal feito. Nicolas é o terceiro caminho.
- **Bio IG pessoal aprovada:** "foundermaxxing / Site bonito, rápido e que vende. Nem agência lenta, nem IA genérica. / +R$350k gerados pra founders. / Manda 'site' no direct pra começar. / 🔗 irbis.com.br"
- **Filtro diário — rode antes de QUALQUER post pessoal, com critério de parada explícito:**
  1. Isso defende a tese?
  2. Isso bate em alguma cara do vilão?
  3. A pessoa saberia, só com esse post, que a tese é "IA bem feita entrega o que agência nenhuma entrega"?

  Se qualquer resposta for "não", reescreva o post e rode o filtro de novo (as 3 perguntas, não só a que falhou, porque mudar uma frase pode quebrar outra resposta).
- **3 pilares de conteúdo P1:** IA do jeito certo (ataca a IA genérica) · Site que vende (prova a tese com +R$350k e dados de dor) · O terceiro caminho (ataca a agência).
- **3 posts fixados (estrutura de referência, não modelo obrigatório):** Tese → Prova ("Dizem que site com IA é genérico. Esse aqui gerou R$350k.") → Caminho. Esta estrutura de 3 posts é o exemplo ORIGINAL que fixou o tom do P1 — ao escrever um post NOVO de qualquer um dos 3 pilares, use essa estrutura (Tese → Prova → Caminho) como esqueleto de parágrafos e escolha, dentre as 6 fórmulas de copy, a que melhor serve o argumento específico daquele post (ver nota de aplicação na seção das 6 fórmulas acima). Não são a mesma coisa: os "3 posts fixados" são um formato de 3 parágrafos; as "6 fórmulas" são recursos de frase dentro de qualquer parágrafo.
- Destaques IG na ordem: Método → Cases → Me → Lifestyle (capas preto e laranja já geradas).

**Critério de qual voz usar (P1 vs voz IRBIS):**

| A peça é... | Use |
|---|---|
| Site, proposta, material com o nome/logo da IRBIS | Voz IRBIS (seções acima), sem camada P1 |
| Post/story/DM do perfil PESSOAL do Nicolas (@ dele, não @irbis) | Voz IRBIS + camada P1 por cima (filtro diário obrigatório) |

A IA é argumento CENTRAL no P1 e nas calls ("IA como alavanca, não muleta"); no site institucional da IRBIS ela não era tematizada até jun/2026 — não misture os dois sem necessidade.

## ICP em aberto — não trave a copy num público

ICP = Perfil de Cliente Ideal. Em 04/jul/2026 o dono declarou: "Ainda não consegui definir meu ICP perfeitamente porque não vendi direito." Duas hipóteses COEXISTEM, nenhuma foi descartada:

| Hipótese de ICP | Onde aparece | Evidência |
|---|---|---|
| Founders de startup | Site inteiro, brand-context, LinkedIn, P1 ("pra founders") | `.claude/brand-context.md` §02; `linkedin-perfil-nicolas.md` |
| Negócios locais premium (odonto, estética, barbearia) | Prospecção ativa desde 15-23/jun | `03 - Comercial/01 - Prospecção/dossie-cold-call-leva1-junho2026.md` |

**Regra objetiva:** peça que usa voz/fórmulas normalmente (post, DM avulsa, headline genérica) → siga direto, não precisa perguntar. Peça que ESCOLHE um ICP como "o público oficial" (reposicionamento de site, bio nova, campanha nova) → pare e pergunte ao Nicolas. Materiais existentes que falam com founder continuam valendo até ele decidir o contrário.

Canais (decisão de 01/jul/2026): cold e-mail rejeitado; cold outreach + lead magnets via LinkedIn aprovados. Mecânica em `irbis-prospeccao-e-diagnostico`.

## Glossário da marca (Manual §08 — usar com frequência, sem virar filler)

| Termo | Quando usar |
|---|---|
| Caçar | Prospecção, conquista de cliente |
| Predador técnico | A IRBIS como entidade |
| Território | Área de atuação, domínio de mercado |
| Construir | Processo de criação — nunca "fazer" |
| Incopiável | Qualidade máxima de originalidade |
| Velocidade | Diferencial de entrega (com qualidade) |
| Excelência técnica | O que separa a IRBIS de agência comum |
| Manda o sinal | CTA de contato |

"Dominância visual" e "marcas que ficam de pé" constam no Manual mas são vocabulário de identidade/branding — escopo morto no pivot. Prefira os termos da tabela acima.

## Tokens visuais (brand_guide_completo.html v1.1)

| Token | Valor | Uso |
|---|---|---|
| `--abyss` | `#0C0C0E` | Fundo principal |
| `--onyx` | `#18181B` | Fundo secundário |
| `--slate` | `#27272A` | Bordas, superfícies |
| `--signal` | `#FF3D00` | Cor de marca (laranja) — uso ESCASSO, é acento |
| `--deep-signal` | `#E63900` | Hover do signal |
| `--light` | `#FAFAFA` | Texto principal |
| `--muted` | `#71717A` | Texto secundário |
| `--dim` | `#52525B` | Texto terciário |

- **Tipografia: Sora** (Google Fonts) — ExtraBold 800 headlines (48-72px, line-height 1.1); Bold 700 títulos de seção (24-36px); Regular 400 corpo (14-16px, line-height 1.7); SemiBold 600 labels (10-12px, uppercase, letter-spacing 0.15em).
- **Mascote/ícone:** a pantera (preta → das neves/snow leopard). É o ícone da marca — não usar icon set genérico (Feather, Lucide).
- Capas de destaque IG: preto e laranja.
- Implementação no site (easings, GSAP, estrutura): skill `irbis-site-ops`.

## Exemplos bom vs ruim

**1. DM de prospecção (LinkedIn/WhatsApp)**

Ruim:
> Olá, tudo bem? Somos a IRBIS, uma agência especializada em soluções digitais personalizadas. Gostaríamos de apresentar nosso portfólio e entender como podemos agregar valor à jornada do seu negócio. Qualquer dúvida, estou à disposição!

(Viola: "Olá, tudo bem?", "agência" para a IRBIS, "soluções personalizadas", "agregar valor", "jornada", "estou à disposição", zero problema específico, mais de 3 linhas, assina como empresa.)

Bom (template do Manual §07):
> O CTA principal do site de vocês some no mobile: o formulário quebra antes do envio.
> A IRBIS resolve isso.
> Posso te mandar 3 referências do que faríamos? Nicolas

**2. Post de posicionamento (Instagram)**

Ruim:
> A IRBIS realmente entrega soluções inovadoras que transformam a presença digital do seu negócio. Não é só um site, é um ecossistema completo. Entre em contato e saiba mais!

(Viola: "realmente", "soluções inovadoras", "transformam", "ecossistema", contraste binário "não é X, é Y", CTA genérico.)

Bom (Fórmula 1 Setup + Punch, sem travessão):
> Founder paga agência por três meses pra ver a primeira versão do site.
> O concorrente lançou duas campanhas nesse tempo.
> A GENTE NÃO OPERA ASSIM.
> Do briefing ao ar em semanas. Manda "site" no direct.

## Checklist antes de entregar qualquer peça

1. [ ] Rodei `/usr/bin/git status --porcelain -- .claude/brand-context.md` e segui o mapa de saída → ação da seção "Fontes canônicas"? Confirmei pós-pivot com `grep -n "só sites" .claude/brand-context.md`?
2. [ ] Zero palavras/padrões banidos das tabelas acima? Zero travessão em peça nova (teste do "Regra JDP": estou gerando texto agora, ou copiando bloco aprovado verbatim)?
3. [ ] Uma ideia por parágrafo; número concreto antes de afirmação vaga ("2 semanas", não "entrega rápida"); benefício antes de feature; "você" antes de "nós"?
4. [ ] Escopo = só sites? Branding/app/dashboard só aparecem para NEGAR serviço, nunca para oferecer?
5. [ ] Prova social: só "+R$350k em vendas"? Nada de "+500", "1,8x", Eduboxs ou Adash?
6. [ ] Se é conteúdo do perfil PESSOAL do Nicolas: passou pelo Filtro Diário (3 perguntas do P1; qualquer "não" → reescreve tudo e testa de novo)?
7. [ ] Se a peça trava um ICP único, cita preço, ou cita prazo de institucional: perguntei ao Nicolas e esperei a resposta antes de finalizar?
8. [ ] Assinatura certa ("Nicolas", nunca "Equipe IRBIS")? CTA da marca ("manda o sinal" / "manda 'site' no direct")?
9. [ ] Invoquei a skill `stop-slop` sobre o rascunho (mesmo mecanismo de invocação de skill usado para chamar esta própria skill)? Se é peça de venda (proposta, script de call, e-mail comercial, DM de prospecção) — post e conteúdo editorial NÃO contam como venda para este item — invoquei também `ogilvy`?
10. [ ] Aprovação explícita do Nicolas: recebi resposta dele NESTA conversa confirmando ("aprovado", "pode mandar" ou equivalente) antes de publicar/enviar? Se não recebi, NÃO publiquei.
11. [ ] Se criei/editei arquivos no repo: fiz o commit da fase de trabalho (regra da casa desde 04/jul/2026 — ver `workbench-metodo-da-casa`)?

## Ambiguidades abertas (pergunte ao dono antes de decidir)

| Questão | Estado |
|---|---|
| ICP oficial (founders x negócios locais premium) | ABERTO — dono: "não vendi direito ainda"; hipóteses coexistem |
| Sem-travessão se aplica ao copy aprovado de 01/jun? | ABERTO — regra padrão desta skill: blocos aprovados ficam verbatim; só pergunte se alguém pedir para revisá-los |
| Case Adash no site (fictício) | PENDENTE — decisão de remoção é do dono; nunca usar em peça nova |
| Prazo de institucional em peça nova (2-3 vs 3-4 semanas) | ABERTO — copy aprovado diz 2-3, processo real diz 3-4; pergunte ao Nicolas antes de citar prazo, sem exceção |
| Hero da home ("BRANDING? NÃO...") x hero publicado ("O site que seu negócio merece ter.") | ABERTO — não reescreva a home sem o dono decidir qual vale |
| Preço de LP em peça nova (copy aprovado R$5k x site publicado R$3k) | ABERTO — não cite nenhum dos dois sem perguntar ao Nicolas, mesmo em proposta de cliente específico (ver `irbis-guarda-pivot`) |
| Atribuição pública do depoimento (Maurício Odery x E-Force) | ABERTO — citação de texto já aprovada; relação formal (CEO) não documentada, confirme antes de peça que dependa disso |
| Manual de Copy v2.0 pós-pivot | PENDENTE — v1.0 segue como fonte da voz; escopo dele é pré-pivot |

## Proveniência e manutenção

- **Escrita em:** 04/jul/2026; revisada em 06/jul/2026 (correção de referências e paths; substituição de números de linha fixos por comandos grep; explicitação de protocolos de decisão). Fontes: `.claude/brand-context.md` (working tree), `01 - Marca/IRBIS_Manual_de_Copy.md` v1.0, `04 - Marketing/copy-arsenal-irbis.md`, `04 - Marketing/P1-posicionamento-nicolas.md`, `04 - Marketing/linkedin-perfil-nicolas.md`, `01 - Marca/brand_guide_completo.html`, `CLAUDE.md` do projeto, e respostas verbatim do Nicolas em 04/jul/2026 (prova social, ICP, regras JDP fixas). As respostas de 04/jul prevalecem sobre qualquer doc do repo.
- **Quando rodar:** antes de peça que cite número, preço ou prazo (drift mais provável), ou se suspeitar que doc-fonte mudou. Não precisa em peça avulsa que só usa voz/fórmulas.
- **Comandos** (raiz do projeto; use `/usr/bin/git` e `/usr/bin/grep` — hook rtk trunca saídas):
  - brand-context ainda à frente do git? → `/usr/bin/git status --porcelain -- .claude/brand-context.md` (ver mapa de saída → ação na seção "Fontes canônicas"; depois confirme conteúdo com `grep -n "só sites" .claude/brand-context.md`)
  - Palavras banidas do CLAUDE.md mudaram? → `grep -n "jornada omnichannel" CLAUDE.md`
  - Regra sem-travessão ainda registrada? → `/usr/bin/grep -rn "travessão" "04 - Marketing/P1-posicionamento-nicolas.md" "03 - Comercial/02 - Qualificação e Agendamento/roteiro-call-diagnostico-irbis.md"`
  - "Odery 1,8x" ainda no P1 (a ignorar) ou já removido? → `/usr/bin/grep -n "1,8" "04 - Marketing/P1-posicionamento-nicolas.md"`
  - "+R$350k" ainda é o número citado? → `/usr/bin/grep -rn "350k" "04 - Marketing/copy-arsenal-irbis.md" "04 - Marketing/P1-posicionamento-nicolas.md"` (se o valor mudar, pergunte ao dono qual vale antes de usar)
  - Tokens visuais intactos? → `/usr/bin/grep -n "signal: #FF3D00" "01 - Marca/brand_guide_completo.html"`
  - Manual de Copy ainda v1.0? → `head -2 "01 - Marca/IRBIS_Manual_de_Copy.md"` (se surgir v2.0, ela substitui as ressalvas de escopo desta skill)
  - Seções pré-pivot do Manual de Copy ainda nos mesmos títulos? → `grep -n "^## " "01 - Marca/IRBIS_Manual_de_Copy.md"` (localize pelo título, nunca por número de linha memorizado)
  - Path do processo de entrega existe? ⚠️ verificar — path pode ter mudado. Tente `04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md`; se não existir, rode `find "03 - Comercial" -iname "processo-entrega*"` para localizar.
  - `P1-posicionamento-nicolas.md` foi editado depois de 25/jun/2026? → `/usr/bin/stat -f "%Sm" "04 - Marketing/P1-posicionamento-nicolas.md"` (se posterior, releia antes de citar Big Idea/bio/filtro)
  - Saiu Manual/brand-context novo em `01 - Marca/` ou `04 - Marketing/`? → `ls -lt "01 - Marca/" "04 - Marketing/" | head -15`
- **Fatos datados que driftam mais rápido:** decisão de canais (01/jul/2026), prova social afirmável e ICP (04/jul/2026), pendência do case Adash. Se qualquer um mudar, atualize as seções "Prova social", "ICP em aberto" e a tabela de ambiguidades ANTES de escrever peça nova.
