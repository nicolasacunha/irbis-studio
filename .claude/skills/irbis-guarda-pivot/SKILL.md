---
name: irbis-guarda-pivot
description: Use quando for afirmar qualquer fato sobre a IRBIS — serviços, escopo, clientes, cases, números, prazos, preço, ICP — em call, proposta, copy, deck ou site; quando aparecer branding, identidade visual, dashboard, Web3, Adash, Eduboxs, Lumenform, "+500", "R$350k", "LTV 1,8x"; quando um doc (site/llms.txt, docs/voice-agent/, "05 - Análise de Growth/") contradisser o CLAUDE.md; ou antes de reaproveitar qualquer documento anterior a 01/jun/2026.
---

# IRBIS — Guarda do Pivot

Skill anti-catástrofe. Impede 3 erros que destroem a credibilidade da IRBIS:

1. **Vender escopo morto** — branding, identidade visual avulsa, app/dashboard avulso, SaaS próprio para terceiros, Web3. A IRBIS não vende nada disso desde 01/jun/2026. ⚠️ **Sistema com IA acoplado à operação do cliente NÃO é escopo morto desde 21/jul/2026** — ver seção de escopo abaixo.
2. **Citar case fictício** — Adash nunca foi entregue; Eduboxs não tem site feito.
3. **Citar número inventado** — só "+R$350k em vendas" (E-Force, grafado "EForce" sem hífen no site e nos docs — busque pelos dois) é real. "+500" e "LTV 1,8x" são inventados.

**Contexto:** IRBIS é estúdio SOLO de Nicolas Cunha — nenhuma estratégia pode exigir time. Repo `/Users/nicolascunha/Projects/Business/irbis` é o workspace inteiro do negócio, não só código. Todo path com espaço leva aspas — exemplo: `"03 - Comercial/01 - Prospecção/dossie-cold-call-leva1-junho2026.md"` (o padrão "espaço-hífen-espaço" em nomes numerados de pasta é o motivo).

**Hierarquia de verdade (da mais forte para a mais fraca):**

0. **`docs/visao-irbis.md` (aprovada pelo dono em 21/jul/2026) e `docs/mapa-maturidade-vs-realidade.md` (21-22/jul)** — são a fonte mais recente aprovada por ele e vencem, **apenas nos pontos que tratam** (escopo sites + IA, ICP economia real, ponto A/B, bifurcação de 5 anos), as respostas de 04/jul do item 1. Em tudo o que a visão NÃO trata — prova social, cases, preço, deploy, Adash/Eduboxs —, o item 1 continua valendo integralmente.
1. Respostas do dono (Nicolas), 04/jul/2026 — citadas nesta skill. Vencem qualquer doc do repo, INCLUSIVE o `.claude/brand-context.md` do item 2 — nunca use o brand-context para contradizer uma resposta citada aqui (ex.: preço, prova social).
2. `CLAUDE.md` (raiz) + `.claude/brand-context.md`, só nos pontos em que esta skill não registra uma resposta do dono. O brand-context tem mudança não commitada — use sempre a versão do disco (working tree), não a do último commit.
3. Docs de `"03 - Comercial/"` e `"04 - Marketing/"` datados de jun/2026.
4. Todo o resto: suspeite. `CLAUDE.md:22` (bloco NUNCA): "Tratar documentos anteriores ao pivot como referência atual — estão desatualizados".

---

## Checklist obrigatório — rode as 6 perguntas antes de afirmar qualquer coisa

Se a resposta a qualquer pergunta for "não sei", PARE e rode o comando de verificação da seção Proveniência antes de continuar.

| # | Pergunta | Se a resposta for SIM → faça isto |
|---|---|---|
| 1 | A frase oferece algo além de SITE (landing page, institucional, e-commerce) **ou de SISTEMA COM IA acoplado à operação do cliente**? | Corte a oferta. Esses dois são o escopo inteiro — ver seção de escopo. Branding, identidade avulsa, app/dashboard avulso, SaaS para terceiros e Web3 seguem cortados |
| 1b | A peça é **comunicação externa** (site, deck, post, anúncio, bio) que reposiciona a IRBIS como empresa de IA? | PARE. O rebranding público está condicionado às 2 assinaturas até ~19/ago/2026. Vender IA em call/proposta já está liberado; **mudar a comunicação pública, não** — precisa do gatilho e da aprovação da pergunta 6 |
| 2 | Estou citando número de resultado de cliente? | Só "+R$350k em vendas" (E-Force) é afirmável. "+500" e "LTV 1,8x": NUNCA use. "3 semanas de média" como afirmação geral: NÃO afirme — mas pode citar "3 semanas" como o prazo específico do case E-Force (está na página do case) |
| 3 | Estou citando cliente ou case? | Só E-Force (via pai) e Odery Drums são clientes reais. Adash = fictício, não use. Eduboxs = sem site feito, não use como prova. Lumenform e demais `design/*` = conceitos internos — nunca chame de "cliente" |
| 4 | O doc de onde tirei o fato é anterior a 01/jun/2026? | Não use como referência (`CLAUDE.md:22`). Confira a tabela "Obsoleto" abaixo |
| 5 | A peça mira **founder de startup**? | ICP definido em 21/jul é **economia real** — founder ficou fora. Confirme com o dono antes de escrever. Peça mirando negócio da economia real (incl. locais premium) segue sem precisar perguntar |
| 6 | Vou publicar, deployar, remover case ou enviar algo para fora (cliente, ar, redes)? | PARE — bloqueio absoluto, não uma sugestão. Deploy, remoção de case (incluindo Adash/Eduboxs), preço público e qualquer publicação externa exigem aprovação explícita do dono ANTES de qualquer ação; "pergunte antes" nesta skill é sempre subordinado a este PARE, nunca uma via alternativa mais permissiva. Ação correta: descreva a mudança proposta e peça a decisão do dono; não edite/publique nada nesse meio-tempo. Só depois de editar (com aprovação), faça commit antes de qualquer deploy (regra de 04/jul/2026, ver seção Git) |

---

## Escopo válido — duas camadas (01/jun/2026 + 21/jul/2026)

**Camada 1 — Sites (01/jun/2026, segue integralmente válida).** Fonte: `docs/superpowers/specs/2026-06-01-irbis-posicionamento-design.md` (Aprovado) + `docs/superpowers/plans/2026-06-01-irbis-posicionamento.md`.

**Camada 2 — Sistemas com IA (21/jul/2026).** Fonte: `docs/visao-irbis.md`, aprovada pelo dono. Tese: **"Empresas da economia real pagam caro por aquilo que trabalha dentro delas. Site é a porta; sistema com IA é o que mora dentro."** Sites e IA são upsell mútuo. Estado em 21/jul: 2 clientes fundadores de IA em negociação (escritório A. Cunha + QG OS), com fechamento alvo até ~19/ago/2026.

**A distinção que evita os dois erros opostos:**

| Ação | Liberado? |
|---|---|
| Oferecer sistema com IA em call, proposta ou diagnóstico | **Sim**, desde 21/jul |
| Prospectar cliente com a frente de IA | **Sim** |
| Reposicionar publicamente a marca como "IA para a economia real" (site, deck, bio, anúncio) | **Não até o gatilho** — condicionado às 2 assinaturas até ~19/ago; depois disso ainda exige aprovação explícita (pergunta 6) |

⚠️ **Material de marca ainda descreve só a camada 1** e não foi reescrito: tagline `.claude/brand-context.md` §07 ("A IRBIS faz só sites") e hero aprovado ("BRANDING? NÃO. / APP? NÃO. / IDENTIDADE? NÃO. / SITE? SIM."). Isso **não é contradição a corrigir sozinho** — é a comunicação pública esperando o gatilho do rebranding. Não reescreva nenhuma peça externa por conta própria.

### Os 3 produtos que a IRBIS vende

| Produto | Prazo real | Preço público |
|---|---|---|
| Landing page | 1–2 semanas | ⚠️ DIVERGENTE — ver o bloco "Preço: R$3k ou R$5k" logo abaixo antes de citar em call/copy |
| Site institucional | 3–4 semanas (a spec e o deck dizem "2–3", mas o processo real corrigiu — `"03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md"`, seção PRAZOS, pendência linha 60) | Varia por escopo |
| E-commerce | Sob escopo — a 1ª conversa define | Varia por escopo |

**Preço: R$3k ou R$5k — divergência real, sem decisão do dono (verificado 04/jul/2026):** diz R$3k em `site/index.html:78` (schema priceRange), `:181` (FAQ), `:2022` (card visível), `:2210` (FAQ visível). Diz R$5k em `site/index.html:121` (schema Offer) e `.claude/brand-context.md` §08 (copy aprovado).

Regra: **não afirme nenhum dos dois valores como definitivo sem perguntar ao dono.** Não invente ou monte uma resposta de call/copy para "resolver" essa divergência sozinho — nem uma formulação "neutra". Se precisar responder no ato, pare e registre para o dono: "qual dos dois preços é o correto, e qual das 5 superfícies corrigir?" Não corrija nenhum lado sozinho, e não decida um texto de fallback no lugar dele.

### O que a IRBIS NÃO vende (proibido oferecer)

Branding, identidade visual avulsa, app ou dashboard avulso, SaaS próprio para terceiros, Web3, direção criativa, motion avulso, gestão de redes sociais, consultoria avulsa. Fonte: spec do pivot ("A recusa é parte do posicionamento") + `.claude/brand-context.md` §06.

**A linha que separa** — o teste é a âncora, não a tecnologia: sistema **acoplado à operação do cliente**, que resolve uma dor dele e que a IRBIS entrega e acompanha, está dentro. Software genérico, produto próprio vendido a terceiros, dashboard solto sem processo por trás, ou "consultoria de IA" sem entregável, está fora. Na dúvida, pergunte ao dono — não amplie o escopo sozinho.

A recusa é ARGUMENTO DE VENDA — nunca ofereça um item proibido "de brinde" para fechar negócio.

---

## Mapa CANÔNICO vs OBSOLETO

### Canônico — pode usar como fonte

| Arquivo | O que é |
|---|---|
| `CLAUDE.md` (raiz) | Identidade e regras do assistente |
| `.claude/brand-context.md` | Referência mestre de marca (versão do working tree, não do último commit) |
| `docs/superpowers/specs/2026-06-01-irbis-posicionamento-design.md` | Spec do pivot (Aprovado) |
| `"03 - Comercial/"` (subpastas 00–05) | Funil comercial — quase tudo de jun/2026 |
| `"04 - Marketing/copy-arsenal-irbis.md"`, `linkedin-perfil-nicolas.md`, `content-strategy-instagram.md`, `ads-plan-irbis.md` | Reescritos em 01/jun |
| `"04 - Marketing/P1-posicionamento-nicolas.md"` (25/jun) | Posicionamento pessoal (JDP = Grupo JDP, mentoria comercial do dono). ⚠️ Contém "R$350k" (linhas 68,81,93,101,122 — OK usar) E "Odery 1,8x" (linha 93,122 — BANIDO, não use, mesmo estando neste doc canônico — ver nota de resolução de conflito na tabela "Prova social") |
| `"05 - Análise de Growth/gtm-plano-90-dias.md"` e `seo-auditoria-irbis.md` | Únicas exceções da pasta Growth — criados em 01/jun, pós-pivot |

### Obsoleto / contaminado — não use como fonte de escopo ou prova

| Arquivo | Erro que contém | Ação |
|---|---|---|
| `site/llms.txt` | Lista branding/dashboards como serviço; cita case Adash | Commitado, provavelmente NO AR. Reescrever é pendência aberta — avise o dono, não edite sem confirmar |
| `docs/voice-agent/system-prompt.md` | Confirmado 04/jul: linha 20-21 lista branding e identidade visual como o que a IRBIS FAZ; linha 24 lista e-commerce como o que NÃO FAZ — ambos contrários ao pivot (e-commerce hoje É produto) | Se o voice agent (Vapi) estiver ativo, está qualificando lead com escopo morto. Avise o dono, não corrija sozinho |
| `docs/claude-project-instructions.md` | "Serviços: webdesign, branding, dashboards e sistemas digitais" | Prompt de assistente antigo, não usar |
| `docs/comercial-assets.md` | Script de prospecção linha 13: "Trabalho com produto, marca e dashboard" | Script WhatsApp pré-pivot, não usar |
| `site/video/irbis-promo/SCRIPT.md` | Linha 12 (beat 4, 14-18s): "Webdesign · Branding · Sistemas Digitais" | Vídeo promo renderizado com escopo morto — não reusar sem re-renderizar |
| `"01 - Marca/IRBIS_AdIdeasBank.md"` | "Gerado em Maio 2026 · Uso interno IRBIS Estúdio Digital" | Conceitos da era pré-pivot, não usar como estão |
| `"05 - Análise de Growth/"` (exceto os 2 arquivos canônicos acima) | Segmentação Web3/SaaS, tickets R$15-40k, "Sprint de CRM/Dashboard R$18-28k" — tudo de 19-29/mai. Inclui subpasta `"IRBIS — Business Model Canvas/"` (15 templates, 25/mai) | Não usar |
| `"01 - Marca/IRBIS_Manual_de_Copy.md"` | v1.0 de abril/2026, descreve serviços pré-pivot | ⚠️ RESSALVA: vale pela VOZ (fórmulas, tom, palavras banidas — é referência de KNOWLEDGE citada em `CLAUDE.md:35`), NÃO pelo escopo de serviços. Use só para tom, nunca para "o que vender" |
| `docs/superpowers/specs/2026-06-02-funil-nicolas-cunha-design.md` | Linhas 21-22 oferecem "site, LP ou identidade visual · R$5k – R$45k+" — contradiz o pivot de 1 dia antes | Spec do funil /founder, não usar como fonte de escopo |
| `site/founder.html` | Linhas 7, 894, 921 oferecem "identidade visual"; linha 963 tem formulário Formspree com placeholder `f/XXXXX` (não funcional); linha 931 mostra Adash como case | Arquivo existe no disco (35,6K) e está UNTRACKED no git (`git status --porcelain` mostra `??`). Se houver deploy manual fora do git, o conteúdo pode estar no ar sem estar versionado — confira com o dono antes de publicar ou de assumir que está fora do ar |

Regra prática: se um doc descreve branding/dashboard/identidade como serviço da IRBIS, é pré-pivot ou herdou erro de um pré-pivot — não importa o que o título ou a data de "última edição" digam. Confirme pelo conteúdo, não pelo nome do arquivo.

---

## Prova social — afirmável vs BANIDO (respostas do dono, 04/jul/2026, citadas verbatim)

| Afirmação | Veredito | Fonte |
|---|---|---|
| "+R$350k em vendas" (E-Force, entregue 27/abr/2026) | AFIRMÁVEL em call, site e peças — ÚNICO número de resultado permitido | Dono: "+350k em vendas é real" |
| "+500" ("EForce +500", "+500 VENDAS") | BANIDO — nunca use, mesmo se aparecer dentro de um doc marcado como canônico nesta skill (ex.: `P1-posicionamento-nicolas.md`). **Resolução de conflito:** a decisão do dono (linha 18 desta skill, item 1 da hierarquia de verdade) vence SEMPRE um doc canônico — "canônico" nesta skill significa apenas "confiável quanto a escopo/prazo/estrutura pós-pivot", não "todo número dentro dele está pré-aprovado". Trate a banição de número como um filtro que roda por cima de qualquer fonte, canônica ou não | Dono: "500 inventado acho" (ele mesmo não sabe a origem do número) |
| "LTV 1,8x" (Odery) e variações ("meu LTV quase dobrou") | BANIDO — nunca use | Dono: "LTV inventado tbm" |
| Eduboxs como case/prova | NÃO é case — site não foi feito | Dono: "eduboxs ainda nao fiz o site". Isso invalida "Eduboxs — site entregue" em `"03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md":16` e "clientes externos pagos e entregues" em `dia1-indicacao-mensagens.md:7` |
| Adash | FICTÍCIO — projeto não foi entregue (termo assinado 24/mai, cliente QG desistiu; `sistema-indicacao-base-irbis.md:18`). Não use em peça nova. Remoção do site: PENDENTE — pergunte ao dono antes de mexer | Dono: "Case adash ainda indecidido" |
| "3 semanas de média" | EM REVISÃO — não afirme como média geral. Pode citar como prazo específico do case E-Force (está na página do case). Ação: se precisar de uma média para call/copy nova, pergunte ao dono antes — não use até ele responder | `script-call-comercial-junho-2026.md:80,290` |
| Depoimento Maurício Odery (CEO EForce Drums) | Existe como copy aprovado, sem números — pode usar | `"04 - Marketing/copy-arsenal-irbis.md":13,130` |
| Lumenform, Alba, Arvo, Atelier Nørr, Meridian, Vektor | Conceitos internos de `"02 - Projetos/Testes/"` publicados como portfólio de design. Confirmado: `site/cases-hub/lumeform/index.html` tem "Cliente: Lumenform" no HTML (bloco `case-hero-meta`). NÃO é cliente pagante. Ação: nunca venda como "case de cliente" em call ou proposta; a correção do HTML (trocar "Cliente" por outro rótulo) é pendência — pergunte ao dono antes de editar | Dossiê de descoberta, confirmado no repo em 04/jul/2026 |
| Zumo e Zapfy em "Trabalhou com" (`site/sobre.html:421-422`) | São projetos próprios do dono, não clientes externos — não cite como clientes em call | Verificado no repo |

Clientes reais para prova social: **E-Force** (via pai; +R$350k) e **Odery Drums** (cliente externo real, sem métrica citável). Números internos de operação (âncora R$7k → fecha R$4,5-5k; baseline ~R$12k acumulado até mai/2026) são material INTERNO de call — nunca publicar. Ver skill `irbis-call-de-vendas`.

### Onde a contaminação está hoje — o que fazer ao encontrar

Regra geral para tudo nesta seção: **listar aqui é conhecimento, não autorização.** Ao encontrar qualquer um destes itens fora de um contexto de auditoria, a ação é: (1) não reproduza o número/case banido em peça nova; (2) avise o dono da localização; (3) NÃO edite/delete arquivos de produção (site/) por conta própria — isso exige aprovação explícita dele (checklist pergunta 6).

**Site (`site/`):** confirmado 04/jul — "+500", "R$350k" e "1,8x" NÃO aparecem em nenhuma página. O case E-Force no ar usa só stats de processo (4 modelos, 6 idiomas, design system 100%, "3 sem. do briefing ao ar"). Preço tem a divergência R$3k/R$5k já tratada acima.

**Adash no site** — lista completa de onde está, para o dono decidir remover ou não (não mexa sem decisão dele):

| Arquivo | O quê |
|---|---|
| `site/cases-hub/adash/index.html` | Página inteira do case |
| `site/processo/adash.html` | Breakdown "SaaS em 3 semanas" inteiro |
| `site/index.html:1921-1931` | Card do case na home |
| `site/index.html:1988-1991` | Marquee "ODERY DRUMS · EFORCE · ADASH · EDUBOXS" |
| `site/sobre.html:419` | "Adash" em "Trabalhou com" |
| `site/founder.html:931-936` | Card do case (arquivo untracked) |
| `site/cases-hub/index.html:209-212` | Item ADASH no hub de cases |
| `site/cases-hub/eforce/index.html`, `site/cases-hub/lumeform/index.html` | Link cruzado "Mais projetos" → /adash |
| `site/vercel.json:3-6,28-29` | Rewrites `/adash`, `/adash-demo`, `/processo/adash` — **atenção: `/processo` sozinho cai em adash.html** |
| `site/sitemap.xml:51,69` | URLs `/adash` e `/processo/adash` indexáveis |
| `site/robots.txt:3` | `Disallow: /adash-demo/` |
| `site/llms.txt` | Case ADASH descrito para LLMs |
| Não linkados mas presentes no deploy | `site/review-copy.html`, `site/index.html.bak`, `site/cases-hub/_mockup-*.html`, `site/cases-hub/_template-case.html`, `site/video/irbis-promo/DESIGN.md`, `site/Design/og-image.html` |

**Eduboxs no site:** `site/index.html:1988-1991` (marquee) e `site/sobre.html:420` ("Trabalhou com"). Como o dono confirmou que o site do Eduboxs não foi feito, isso é remoção de menção de case — cai sob o PARE da pergunta 6 do checklist: não edite essas linhas por conta própria, descreva a mudança proposta e peça aprovação explícita do dono antes de mexer, inclusive em qualquer republicação.

**Números banidos nos DOCS (não replique ao reaproveitar texto):**
- "+500": `script-call-comercial-junho-2026.md:80,290` (já marcado "em revisão"); `mapa-mental-call-irbis.html:190` como "+500 VENDAS" — corrigir antes de usar o mapa em call.
- "LTV 1,8x": `roteiro-vsl-irbis.md:29`; `sistema-indicacao-base-irbis.md:15`; `dia1-indicacao-mensagens.md:16` (inclui a frase pronta "meu LTV quase dobrou" — não usar); `script-call-comercial-junho-2026.md:80,290`; `mapa-mental-call-irbis.html:192` ("LTV 1,8X"); `P1-posicionamento-nicolas.md:93,122` (nota: aqui o número aparece sem a sigla "LTV" ao lado — buscar só por "LTV" não encontra este caso; busque por "1,8x").
- "+R$350k" (este É PERMITIDO): `roteiro-vsl-irbis.md:28`; `sistema-indicacao-base-irbis.md:13`; `todo-plano-7dias.md:20`; `P1-posicionamento-nicolas.md:68,81,93,101,122`.

**Deck comercial (Canva/PDF) — CONTAMINADO, não use em call sem confirmar limpeza:**

Existem 2 exports PDF divergentes: `"IRBIS — Apresentação Comercial.pdf"` na raiz (mtime 11/jun, mais antigo) e `"03 - Comercial/03 - Reunião de Vendas/Cópia de IRBIS — Apresentação Comercial.pdf"` (mtime 15/jun, mais recente — mesma referência usada na skill `irbis-call-de-vendas`).

- "LTV 1,8x maior." está PROVADO nos DOIS exports (`grep -a -n "1,8x"`, 6 hits em cada) — o número banido está no deck em uso.
- "+500" está PROVADO no export de 11/jun (3 hits) e AUSENTE no de 15/jun — pode ter sido removido entre os exports; confirme no Canva.
- "Adash" é inconclusivo por grep nos PDFs (0 hits, mas PDF é só parcialmente greppable) — o checkbox `⬜ "Deletar as 2 slides do Adash"` em `todo-plano-7dias.md:19` ainda não foi marcado, o que sugere que as slides seguem lá.
- Outras pendências do deck (slide diz "30 minutos" para uma call de ~45min; e-mail do slide final quebrado pela proteção Cloudflare, corrigir para contato@irbis.com.br): `script-call-comercial-junho-2026.md:288-293`.

**A fonte viva do deck é o Canva, não os PDFs exportados.** Ação: não use o deck em nenhuma call antes de o dono confirmar diretamente no Canva que a limpeza (Adash, 1,8x, +500) foi feita. Os PDFs são só evidência de contaminação passada, não a versão atual.

---

## ICP — DEFINIDO em 21/jul/2026: economia real

**Atualização de 21/jul/2026 (supera a resposta de 04/jul).** `docs/visao-irbis.md` (aprovada pelo dono) e `docs/mapa-maturidade-vs-realidade.md` (Pilar 3, marcado ✅) fixam o ICP: **economia real — empresário que fatura 6 a 7 dígitos por ano, com baixo domínio digital, que "paga caro por aquilo que trabalha dentro dele"**. É a frase oficial do plano JDP.

Isso encerra o "EM ABERTO" registrado aqui em 04/jul ("Ainda nao consegui definir meu ICP perfeitamente pq nao vendi direito") — a resposta de 21/jul é do mesmo dono, posterior, e está em documento aprovado.

| Frente histórica | Status sob o ICP de 21/jul |
|---|---|
| Negócios locais premium (odonto, estética, arquitetura, advocacia, imobiliária alto padrão) | **Dentro do ICP** — leitura direta de "economia real". Cold call e WhatsApp seguem válidos |
| Founders de startup (SaaS, fintech, creator economy) | **Fora do ICP declarado.** Material existente não precisa ser destruído, mas **peça nova mirando founder exige confirmação do dono** — pergunte antes |

⚠️ **O site inteiro ainda fala com founder** (`site/index.html:7,14-15`; `.claude/brand-context.md` §02). Assim como a tagline "só sites", isso é comunicação pública esperando o gatilho do rebranding — **não reescreva nada disso sozinho** (pergunta 6 do checklist). Anote como pendência e leve ao dono.

**Quando a peça mirar founder, use este texto:** "Essa peça mira founder de startup? O ICP definido em 21/jul é economia real — founder ficou fora. Confirma antes de eu escrever?"

Meta de 90 dias (dono, 04/jul/2026, verbatim): "Sucesso em 90 dias seria zapfy aprovado e irbis tendo pelo menos 2 clientes por mes. Regras deles sao fixas." Para a IRBIS: ≥2 clientes novos/mês até ~out/2026. As regras do Grupo JDP (mentoria comercial do dono) são FIXAS — não adapte. Contexto completo do portfólio: skill `portfolio-mapa-e-decisoes`.

---

## Pendências "pergunte ao dono antes" — lista consolidada

Nenhum item tem decisão registrada. Regra única para todos: não decida por conta própria, não publique, não edite site de produção, não corrija divergência sozinho — pergunte ao dono. Detalhe de cada um já foi dado nas seções acima; aqui só a lista de checagem rápida antes de fechar qualquer entrega:

| Pendência | Onde está o detalhe nesta skill |
|---|---|
| Adash sai do site ou fica? | Seção "Onde a contaminação está hoje" |
| O que existe de fato do Eduboxs? | Seção "Onde a contaminação está hoje" |
| Deck ainda tem slides do Adash e "+500"? | Seção "Deck comercial" |
| Preço público da LP: R$3k ou R$5k? | Seção "O pivot de 01/jun/2026", tabela de preço |
| Funil /founder vai ao ar? | Tabela "Obsoleto", linha `site/founder.html` |
| Voice agent Vapi em produção com escopo morto? | Tabela "Obsoleto", linha `docs/voice-agent/system-prompt.md` |
| Rebranding: as 2 assinaturas fecharam até ~19/ago? Liberar reescrita da comunicação pública (tagline, hero, site que fala com founder)? | Seção "Escopo válido — duas camadas" + seção ICP |
| Números finais do deck (prazos médios) | Seção "Prova social" |
| Rótulo "Cliente" no case Lumenform | Seção "Prova social", linha Lumenform |

---

## Regra de git (regra da casa, 04/jul/2026)

Dono verbatim: "Acumular nao da. Tem que ter commit a cada fase de trabalho."

**Como isto convive com o PARE da pergunta 6 do checklist (edição de site de produção exige aprovação):** a regra de commit não é uma licença para editar `site/` por conta própria. O fluxo correto é: (a) o dono aprova a mudança (ou você já está autorizado a editar naquele arquivo/fase, ex.: skills como `irbis-site-ops`); (b) você edita; (c) você faz commit ao final dessa fase — antes de acumular a próxima; (d) só então, se houver deploy, ele exige uma aprovação explícita adicional do dono, também precedida de commit. Ou seja: aprovação → edição → commit → (se for deployar) aprovação de deploy → deploy. Nunca pule a aprovação inicial alegando que "vai commitar mesmo". Se a tarefa é só descrever/propor a mudança (sem aprovação ainda), não há o que commitar — registre a proposta para o dono decidir.

1. **Faça commit ao final de cada fase de trabalho concluída** (ex.: terminou de escrever uma seção, terminou uma correção pontual, terminou um arquivo) — não acumule várias fases num commit só.
2. **Sempre faça commit antes de qualquer deploy**, em qualquer projeto.
3. Estado do repo em 04/jul/2026: último commit `d419627` (10/jun/2026); 52 commits; working tree com 21 modificados + 1 deletado + 158 untracked. A produção (deploy Vercel local) provavelmente está à frente do git — não assuma que o git reflete o que está no ar.
4. `git remote -v` está VAZIO — o histórico só existe nesta máquina. Recomendar remote privado no GitHub é pendência aberta; não crie remote nem faça push sem autorização do dono.
5. Para auditar histórico, use `/usr/bin/git` direto — o hook `rtk` trunca `git log` (mostra 50 de 52 commits).
6. Método completo de trabalho (fluxo superpowers, RTK, convenções de mensagem de commit): skill `workbench-metodo-da-casa` (em `Business/.claude/skills/`).

---

## Quando NÃO usar esta skill

| Tarefa | Use em vez desta |
|---|---|
| Escrever copy, post, DM, proposta (voz e fórmulas da marca) | `irbis-brand-voice` |
| Editar página, criar case, deployar irbis.com.br | `irbis-site-ops` |
| Cold call, outbound, inbound, call de diagnóstico | `irbis-prospeccao-e-diagnostico` |
| Conduzir a call de fechamento de 45min (ancoragem, objeções) | `irbis-call-de-vendas` |
| Entregar site, repitch MRR, pedir indicação | `irbis-entrega-e-recorrencia` |
| Regras globais da casa, fluxo superpowers, RTK, commits | `workbench-metodo-da-casa` (em `Business/.claude/skills/`) |
| Estado de outros projetos (Zapfy, wpp-agent, Zumo) e metas do portfólio | `portfolio-mapa-e-decisoes` (em `Business/.claude/skills/`) |

Esta skill é o FILTRO que roda antes das outras: as skills irmãs assumem que você já sabe o que é afirmável. Em conflito entre esta skill e um doc do repo, esta skill vence — ela carrega as respostas do dono de 04/jul/2026.

---

## Proveniência e manutenção

**Escrita em:** 04/jul/2026, revisada em 06/jul/2026 e em **28/jul/2026** (revisão de escopo e ICP: incorpora `docs/visao-irbis.md` de 21/jul — camada 2 de IA e ICP economia real —, com o rebranding público mantido congelado atrás do gatilho de ~19/ago. Prova social, cases, preço, Adash/Eduboxs e regras de deploy **não** foram alterados). Baseada em (a) respostas diretas de Nicolas em 04/jul/2026 (prova social, Eduboxs, Adash, ICP, regra de commit, metas de 90 dias); (b) verificação arquivo a arquivo no repo em 04/jul/2026, com re-checagem em 06/jul/2026; (c) dossiês de descoberta de 02/jul/2026 (`skills-library-discovery/irbis-business.md` e `irbis-history-tooling.md`, usados como mapa, cada fato re-verificado direto no repo).

**Fontes principais:** `CLAUDE.md` · `.claude/brand-context.md` · `docs/superpowers/specs/2026-06-01-irbis-posicionamento-design.md` · `"03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md"` · `"03 - Comercial/05 - Indicação/dia1-indicacao-mensagens.md"` · `"03 - Comercial/03 - Reunião de Vendas/script-call-comercial-junho-2026.md"` · `"03 - Comercial/00 - Planejamento/todo-plano-7dias.md"` · `"03 - Comercial/01 - Prospecção/dossie-cold-call-leva1-junho2026.md"` · `site/` (greps completos em 06/jul/2026).

**Re-verificação (rode da raiz do projeto `irbis/`; 1 comando por fato que pode driftar):**

- Escopo do `CLAUDE.md` já reflete as duas camadas? → `grep -n "sites e sistemas com IA" CLAUDE.md` (se voltar vazio e aparecer "exclusivamente criação de sites", o arquivo regrediu para a versão pré-21/jul — avise o dono)
- Rebranding disparou? → procure decisão datada pós-19/ago sobre as 2 assinaturas em `docs/` e `"03 - Comercial/"`; sem registro, a comunicação pública segue congelada na camada 1
- Adash ainda no site? → `grep -rli adash site/ | grep -vE '\.(jpg|jpeg|png|webp)$'`
- Eduboxs ainda no site? → `grep -rni eduboxs site/` (confirmado 06/jul/2026: aparece em `site/index.html:1988-1991`, dentro do marquee "ODERY DRUMS · EFORCE · ADASH · EDUBOXS". Use sempre `-i`/case-insensitive e rode a partir da raiz do repo `irbis/` — um grep sem `-i` ou rodado do diretório errado pode falhar em achar o termo e sugerir falsamente que foi removido)
- "+500" voltou a alguma peça? → `grep -rn '+500\|500 VENDAS' "03 - Comercial" "04 - Marketing" site/`
- "1,8x" (LTV) ainda nos docs? → `grep -rn '1,8x' "03 - Comercial" "04 - Marketing"` (busque por "1,8x", não só por "LTV" — em `P1-posicionamento-nicolas.md` o número aparece sem a sigla do lado. Não encadeie um segundo grep por pipe — o hook rtk reformata a saída e o pipe pode devolver vazio, observado em 04/jul/2026)
- Deck ainda tem o 1,8x? → `grep -a -n "1,8x" "IRBIS — Apresentação Comercial.pdf"` (grep -a força leitura de texto no PDF; resultado vazio NÃO significa limpo, o PDF é só parcialmente greppable. O PDF da raiz é o export antigo de 11/jun — o mais recente é a "Cópia de..." de 15/jun em `"03 - Comercial/03 - Reunião de Vendas/"`)
- Preço no site ainda divergente (R$3k × R$5k)? → `grep -n "partir de R\$" site/index.html` (deve mostrar linhas 78, 121, 181, 2022, 2210 — se sumiu alguma, a divergência pode ter sido resolvida, confirme com o dono antes de assumir qual lado venceu)
- llms.txt ainda pré-pivot? → `head -3 site/llms.txt` (se falar "branding/dashboards", segue obsoleto)
- founder.html ainda oferece identidade visual? → `grep -n -i identidade site/founder.html`
- founder.html ainda untracked? → `git status --porcelain site/founder.html` (linha começando com `??` = ainda untracked)
- Voice agent ainda contrário ao pivot? → `grep -n "O QUE A IRBIS FAZ\|NÃO FAZ" -A3 docs/voice-agent/system-prompt.md`
- Deck: slides do Adash deletadas? → `grep -n "Adash" "03 - Comercial/00 - Planejamento/todo-plano-7dias.md"` (checkbox ⬜ = pendente; confirmação final só no Canva com o dono)
- Eduboxs corrigido nos docs de indicação? → `grep -n "Eduboxs" "03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md"`
- Lumenform ainda rotulado como "Cliente"? → `grep -n "Cliente" site/cases-hub/lumeform/index.html`
- Remote de git criado? → `/usr/bin/git remote -v` (vazio = ainda sem backup)
- Git voltou a andar? → `/usr/bin/git log -1 --format="%h %ad %s" --date=short && /usr/bin/git status --porcelain | wc -l`
- ICP ainda é economia real? → `grep -n "economia real" docs/visao-irbis.md` (definido em 21/jul; se aparecer decisão datada posterior em `docs/`, `"03 - Comercial/"` ou `"04 - Marketing/"`, a mais recente vence)
