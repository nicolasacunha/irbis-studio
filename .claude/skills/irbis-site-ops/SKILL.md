---
name: irbis-site-ops
description: "Use quando a tarefa tocar o site irbis.com.br: editar ou criar páginas HTML em site/, criar/atualizar case no cases-hub, mexer em site/vercel.json, sitemap.xml, robots.txt, rotas e rewrites, imagens LQIP, nav/footer, GSAP/Lenis, tokens de design, analytics (GA4, Meta Pixel, Contentsquare), preview local ou deploy com npx vercel; e quando surgir 404 em rota nova, página fora do ar, produção divergente do git ou dúvida sobre commit antes de deploy."
---

# irbis-site-ops — operar o site irbis.com.br

Runbook para editar, criar páginas/cases e publicar o site do estúdio IRBIS. O site vive em `site/` na raiz do repo (`/Users/nicolascunha/Projects/Business/irbis`); todos os paths abaixo são relativos a essa raiz. Este repo é o workspace INTEIRO do negócio (marca, comercial, projetos de cliente) — esta skill cobre só o site do estúdio.

## Glossário (leia antes do runbook)

| Termo | Definição |
|---|---|
| **Rewrite** | Regra em `site/vercel.json` que mapeia URL limpa → arquivo `.html`. Sem rewrite, a página só abre pelo path literal (`/pagina.html`) |
| **LQIP** | Low-Quality Image Placeholder: miniatura borrada (`*-lq.jpg`, 3–11 KB) exibida enquanto a imagem real carrega (efeito blur-up) |
| **Working tree à frente do git** | Arquivos modificados/novos no disco nunca commitados, mas JÁ EM PRODUÇÃO — o deploy sobe o filesystem local, não o git |
| **Tokens** | Variáveis CSS no bloco `:root` de cada página (cor, espaçamento) — ver tabela "Tokens de design" abaixo |
| **hreflang duplo** | No sitemap, cada `<url>` traz DUAS tags `<xhtml:link>` idênticas: uma `hreflang="pt-BR"` e uma `hreflang="x-default"`, ambas apontando pro mesmo `<loc>`. É o padrão do arquivo — sempre as duas, nunca uma só |

## Quando NÃO usar esta skill

| Situação | Use em vez desta |
|---|---|
| Decidir O QUE o site pode afirmar (números, cases válidos, escopo pós-pivot, vocabulário banido) | `irbis-guarda-pivot` |
| Escrever ou reescrever copy de qualquer página | `irbis-brand-voice` (+ skills ogilvy e stop-slop) |
| Sites de CLIENTES (`02 - Projetos/` — Odery, adash etc.): produzir o site do cliente em si | `irbis-producao-de-site` |
| Processo comercial de entrega ao cliente (termo, checkpoints, repitch MRR, indicação) | `irbis-entrega-e-recorrencia` |
| Regras globais da casa: RTK, superpowers, formato de commit, `/usr/bin/git` | `workbench-metodo-da-casa` |
| Prioridade entre projetos do portfólio, decisões de council | `portfolio-mapa-e-decisoes` |
| Vídeo promo (`site/video/irbis-promo/`) | subprojeto HyperFrames 0.6.53 com CLAUDE.md próprio; use as skills `hyperframes-*` instaladas em `.claude/skills/` |

## Regras do dono que prevalecem (respostas de 04/jul/2026 — NUNCA alterar ou contradizer)

1. **Commit a cada fase.** Verbatim: "Acumular nao da. Tem que ter commit a cada fase de trabalho." Commit ao fechar cada fase de trabalho e SEMPRE antes de qualquer deploy. Isso SUPERA o padrão observável no histórico (silêncios de semanas entre commits) — o padrão antigo NÃO é referência.
2. **Prova social:** único número de resultado permitido é **"+R$350k em vendas"** (E-Force, real e afirmável). **"+500" é BANIDO. "LTV 1,8x" é BANIDO.** Eduboxs não tem site feito, não é case. Verificado em 04/jul/2026: nenhum número banido está no HTML — mantenha assim (checklist pré-deploy, item 4).
3. **Adash:** case fictício, permanência no site **PENDENTE de decisão do dono**. Não crie material novo citando Adash; não remova `/adash` do ar sem ordem explícita. Detalhe em `irbis-guarda-pivot`.
4. **Preço do site (institucional/landing, distinto do item 4):** o site hoje publica preço em VÁRIAS superfícies que DIVERGEM entre si (mapeado em 04/jul/2026):
   - `site/index.html:78` schema Organization `priceRange` = "A partir de R$3.000"
   - `site/index.html:119–123` schema Offer `price: "5000"` BRL + texto "A partir de R$5k"
   - `site/index.html:181` FAQ schema "a partir de R$3k"
   - `site/index.html:2022` card de produto VISÍVEL "A partir de R$3k"
   - `site/index.html:2210` FAQ visível "a partir de R$3k"
   - `site/vs-agencia.html:60` FAQ schema "a partir de R$5k"
   - `site/founder.html:881,889,897` (arquivo untracked — não está no git, mas o deploy sobe o filesystem local, então ESTÁ no ar) "A partir de R$12k/R$5k/R$8k"
   - **PENDENTE — pergunte antes:** qual preço vale e qual superfície corrigir. Não publique preço novo, não altere nenhum lado, não "harmonize" sozinho. Varredura: `/usr/bin/grep -rn "partir de R" site --include="*.html"`.
5. **Backup:** repo SEM remote git (zero backup do histórico). Recomendação pendente: remote privado no GitHub — **pergunte antes**, não crie por conta própria.

## Tokens de design (fonte de verdade)

| Token | Valor | Onde verificar |
|---|---|---|
| `--bg` | `#0C0C0E` | `site/index.html:214-234` |
| `--s1` | `#18181B` | idem |
| `--s2` | `#27272A` | idem |
| `--accent` | `#FF3D00` | idem |
| `--text` | `#FAFAFA` | idem |
| `--muted` | **`#8A8A93`** em `site/index.html` ⚠️ | idem |

⚠️ **Divergência confirmada de `--muted` entre páginas (verificado 07/jul/2026):** `site/index.html:220` usa `#8A8A93`; `site/metodo.html:44`, `site/manifesto.html:46`, `site/sobre.html:62`, `site/404.html:13` e `site/review-copy.html:12` usam `#71717A` (o mesmo valor que `site/.impeccable.md:15` documenta). Ou seja, a home é a exceção — a maioria das páginas reais já usa `#71717A`. **Não existe fonte única de verdade nem ordem de precedência definida pelo dono entre "o que a home usa" e "o que as outras 5 páginas + o `.impeccable.md` usam". PENDENTE — pergunte ao dono qual valor é o correto antes de sincronizar qualquer página ou editar o token em massa.** Ao editar UMA página específica, mantenha o valor que já está no `:root` daquela página (não troque por conta própria); só se torna ambíguo se a tarefa for "unificar o token em todas as páginas" — nesse caso, pare e pergunte.

Fonte da marca: **Sora** (Google Fonts, pesos 100–800) — `site/index.html:206`. Não troque.

Regra do accent (`.impeccable.md` princípio 4): `#FF3D00` só em elementos que o usuário aciona ou que marcam destaque funcional — exemplos concretos: botão de CTA, estado `:hover`/`:focus` de link, número/stat em destaque no resultado de um case. NUNCA como cor de fundo decorativa, borda decorativa ou preenchimento de área grande.

Regras de estilo fixas: nenhum travessão (—) em conteúdo, título ou atributo (use `:` ou `·`); `color-scheme: dark`; bloco `prefers-reduced-motion` obrigatório; cursor customizado (dot+ring com lerp).

Bibliotecas: GSAP **3.12.5** + ScrollTrigger (cdnjs) e Lenis **1.3.21** (unpkg, css+js) — `site/index.html:2337-2340`. Presentes só em index, manifesto, metodo, sobre, cases. Ausentes em vs-agencia/founder/para/\*/obrigado/404/blog.

Stack: HTML vanilla, zero build, sem package.json em `site/`. Cada página = 1 arquivo, CSS num único `<style>`, JS inline no fim. Não existe CSS/template compartilhado — consistência é disciplina manual, replicada em cada arquivo.

## Mapa de páginas e rotas

Roteamento = rewrites manuais em `site/vercel.json` (33 regras verificadas em 07/jul/2026 via `python3 -m json.tool`; o número muda com o tempo — não trate como fixo, re-conte antes de confiar nele). Estado git em 04/jul/2026:

| Rota | Arquivo | Git |
|---|---|---|
| `/` | `site/index.html` | tracked, modificado |
| `/manifesto`, `/metodo`, `/sobre`, `/obrigado`, `/vs-agencia` | `site/{nome}.html` | tracked, modificados |
| `/para/saas`, `/para/startups` | `site/para/*.html` | tracked, modificados |
| `/cases` | `site/cases-hub/index.html` | tracked, modificado |
| `/adash`, `/eforce` | `site/cases-hub/{adash,eforce}/index.html` | tracked, modificados |
| (sem rota própria) | `site/cases-hub/lumeform/index.html` — **typo no dir: "lumeform"**, marca é "Lumenform" | tracked; rewrite `/lumenform` foi REMOVIDO no working tree |
| `/design` + `/design/{alba,arvo,atelier-norr,lumenform,meridian,vektor}` | `site/cases-hub/design/*` (conceitos fictícios; aqui a grafia é correta) | **untracked** |
| `/founder` | `site/founder.html` — form com Formspree placeholder `XXXXX` (`site/founder.html:963`), funil não funcional | **untracked, mas SERVIDO em produção** (deploy sobe o filesystem local, não o git) |
| `/processo`, `/processo/adash` | `site/processo/adash.html` | **untracked** |
| `/adash-demo` | rewrite existe, diretório não existe — rota morta (robots.txt já dá Disallow) | — |
| sem rota | `site/blog/erros-site-startup.html` (linkado no footer da home) | untracked |

**Vercel serve qualquer arquivo do deploy pelo path literal**, mesmo sem rewrite: `site/review-copy.html` (página interna de revisão de copy) e `site/index.html.bak` ficam acessíveis em produção como `/review-copy.html` e `/index.html.bak`. Não há `.vercelignore` (verificado 04/jul) — não crie um sem aprovação do dono (ver Ambiguidades).

Armadilha de vercel.json duplicado: existem `site/cases-hub/vercel.json` (resíduo com 4 rewrites) e `skills/vercel.json` (resíduo `/(.*) → /site/$1`). A Vercel só lê o vercel.json da raiz do deploy — **o único que vale é `site/vercel.json`**. Não delete os resíduos sem perguntar; apenas não os edite.

## Elementos globais: sincronização manual

Não há template/include. Nav, footer e tags de analytics são copiados à mão em cada HTML, e o markup do nav varia por página (index usa `<nav>` + `<nav class="mobile-nav-links">`; manifesto/metodo usam `<nav id="m-nav">`; sobre usa `<nav id="s-nav">`; founder usa `<nav aria-label=...>`). Mudou um elemento global → replique SÓ nos arquivos que já têm aquele elemento (ver quebra por tipo abaixo) e confira com o grep.

Conjunto de sincronização = 21 HTMLs. **Trate os 21 como um único grupo — não separe em "14 com nav" vs "resto".** As tags globais (Contentsquare + Vercel Insights) vão nos 21; dentro desse mesmo grupo, SÓ replique nav/footer nas páginas que já têm nav/footer (não crie nav do zero numa página que nunca teve). Ou seja: escopo de sincronização = 21 arquivos sempre; o que muda por tipo de elemento é se aquele arquivo específico já possui esse elemento — não o tamanho do grupo.

Páginas reais (têm rota pública, recebem toda mudança global — nav, footer, analytics):

```
site/index.html  site/manifesto.html  site/metodo.html  site/sobre.html
site/obrigado.html  site/vs-agencia.html  site/404.html  site/founder.html
site/para/saas.html  site/para/startups.html
site/cases-hub/index.html  site/cases-hub/{adash,eforce,lumeform}/index.html
site/processo/adash.html  site/blog/erros-site-startup.html
```
(16 páginas)

Arquivos internos/template — recebem SÓ tags de analytics (Contentsquare/Insights), NUNCA nav/footer de página (não têm rota pública, servem de base para novos cases ou são páginas de uso interno; nav/footer aqui seria inútil ou incoerente):

```
site/cases-hub/_template-case.html  site/cases-hub/_mockup-preview.html
site/cases-hub/_mockup-case-eforce.html  site/review-copy.html
site/Design/og-image.html
```
(5 arquivos)

16 + 5 = 21. Dentro dos 16, nav existe em 14 (obrigado e 404 são páginas terminais, sem nav) e footer em ~10 — ou seja, "replicar nav" e "replicar footer" são subconjuntos DENTRO dos 16 reais, nunca alcançam os 5 internos. Regra prática: mudou nav/footer → toque só nos 16 reais que já têm esse elemento; mudou tag de analytics (Contentsquare/Insights) → toque nos 21.

Verificação pós-mudança global — quem ficou de fora:

```bash
/usr/bin/grep -rL "contentsquare" --include="*.html" site/
# ignore os hits em site/cases-hub/design/, site/video/ e site/index.html.bak — não fazem parte do conjunto
```
Sucesso = a lista de saída não contém nenhum arquivo do conjunto de sincronização acima.

Precedente real: commit `6500aac` (10/06/2026) tocou 6 arquivos; o diff não commitado adicionou as mesmas 2 linhas (Contentsquare + Vercel Insights) em ~16 HTMLs tracked. Esse é o custo fixo de qualquer mudança global.

Nota: o link do manifesto foi removido da nav "temporariamente" em 27/05 (`d0851ad`) e não voltou (o footer da home ainda linka manifesto). Não recoloque sem perguntar ao dono.

## Runbook: editar página existente

1. Leia `/Users/nicolascunha/Projects/Business/irbis/.claude/brand-context.md` — a versão presente no disco agora (working tree) é a válida, pós-pivot; não existe outra versão a escolher. Leia também `site/.impeccable.md`; para o token `--muted`, ver a divergência entre páginas na tabela de tokens acima (não copie cegamente nem do `.impeccable.md` nem do valor da home). Copy nova → delegue à skill `irbis-brand-voice`.
2. Edite o HTML da página. Respeite os tokens `:root` locais, Sora, accent só em ação/ênfase (nunca decoração), zero travessão.
3. Se a mudança é global (nav/footer/analytics/link de rodapé): replique no conjunto de sincronização (seção acima) e rode o grep de conferência.
4. Preview local (seção "Preview local" abaixo) em desktop E em viewport mobile ~390px — precedente `91f99f5`: mobile exigiu redesign completo logo após o desktop ficar pronto.
5. Verifique: `/usr/bin/git diff -- site/<arquivo>` mostra só a mudança pretendida, nenhum travessão novo (compare contagem de `—` antes/depois).
6. Commit da fase → deploy (seções abaixo).

## Runbook: criar página nova

1. Crie `site/nome.html` (ou `site/secao/nome.html`). Copie uma página existente do mesmo tipo, com o bloco `:root` junto — institucional → `site/sobre.html`; funil → `site/founder.html`; case → `site/cases-hub/_template-case.html`.

2. **Adicione o rewrite em `site/vercel.json`.** Read o arquivo antes de editar para confirmar o estado atual do array (o número de entradas muda com o tempo). É um objeto JSON com uma chave `"rewrites"` cujo valor é um array de `{ "source": ..., "destination": ... }`. Insira sua entrada como ÚLTIMO elemento do array, antes do `]` final (evita conflito de ordem com wildcards existentes).
   - Página solta: `{ "source": "/nome-da-pagina",  "destination": "/nome-da-pagina.html" }`
   - Subdiretório com assets (padrão dos cases — o wildcard de assets vem ANTES da rota exata):
     ```json
     { "source": "/slug/(.*)", "destination": "/cases-hub/slug/$1" },
     { "source": "/slug",      "destination": "/cases-hub/slug/index.html" }
     ```
   - Vírgula: toda entrada exceto a última do array termina com `,` após o `}`. Ao adicionar a sua como última, a entrada anterior PASSA a precisar de vírgula.
   - **Valide antes de seguir:** `python3 -m json.tool site/vercel.json > /dev/null && echo OK`. Erro = JSON quebrado, desfaça e refaça.

3. **Adicione a entrada no `site/sitemap.xml`.** Arquivo = `<urlset>` com blocos `<url>` sequenciais, sem ordem obrigatória — insira o novo bloco no fim, antes de `</urlset>`, com hreflang duplo (ver Glossário):
     ```xml
     <url>
       <loc>https://irbis.com.br/nome-da-pagina</loc>
       <lastmod>2026-07-06</lastmod>
       <changefreq>yearly</changefreq>
       <priority>0.7</priority>
       <xhtml:link rel="alternate" hreflang="pt-BR" href="https://irbis.com.br/nome-da-pagina"/>
       <xhtml:link rel="alternate" hreflang="x-default" href="https://irbis.com.br/nome-da-pagina"/>
     </url>
     ```
   - Use a MESMA URL nas 3 tags (`<loc>` e as 2 `hreflang`) — é o padrão do arquivo, não erro de duplicação.
   - `</urlset>` deve continuar sendo a ÚLTIMA linha do arquivo depois da sua inserção.
   - **Valide antes de seguir:** `python3 -c "import xml.dom.minidom as m; m.parse('site/sitemap.xml')" && echo OK`. Erro = XML quebrado, desfaça.
   - O sitemap está DESATUALIZADO no geral (8 URLs, todas lastmod 2026-05-28; faltam vs-agencia, para/\*, founder, design/\*). **Adicionar a página nova que você está criando ao sitemap é permitido e faz parte deste passo — não é o gate.** O gate é outro: harmonizar/atualizar retroativamente as 8 URLs já defasadas é pendência que exige **perguntar ao dono ANTES de começar** essa harmonização. Não confunda os dois: pode adicionar a sua entrada nova sem perguntar; não pode tocar nas 8 antigas sem perguntar.

4. **Analytics (GA4):** hoje só em 4 páginas (index, obrigado, vs-agencia, founder — ver tabela de IDs). Critério objetivo para decidir se a página nova precisa de GA4: a página tem um CTA que leva a agendamento (Calendly) OU a WhatsApp OU é a página de confirmação de lead (tipo `/obrigado`)? Se SIM, copie o bloco `gtag` de `site/obrigado.html` ou `site/index.html` com o ID vigente `G-VKHL68G50M`. Se a página é só institucional/conteúdo sem CTA de conversão, NÃO instale GA4 — **pergunte antes** se ficar em dúvida.

5. Tags presentes em TODAS as páginas do conjunto de sincronização — copie as 2 linhas antes do `</head>`:
   ```html
   <script src="https://t.contentsquare.net/uxa/f628ebc890c4d.js" defer></script>
   <script defer src="/_vercel/insights/script.js"></script>
   ```

6. Aplique o bloco anti-AI-slop do `/Users/nicolascunha/.claude/CLAUDE.md` global (fontes/paletas/layouts/copy banidos). Sora é a fonte da marca e não está na lista banida — mantenha.

7. Preview (seção abaixo) → commit → deploy (seções abaixo).

## Runbook: criar case novo

Pipeline real observado nos commits de 10/06/2026 (`6f80041` case Lumenform, `584e769` LQIP) e no working tree:

1. **Copie o template:** `site/cases-hub/_template-case.html` → `site/cases-hub/<slug>/index.html`. Slug em minúsculo, sem acento — o nome do diretório vira contrato com o `vercel.json` (lição do typo `lumeform`, faltando o N de "Lumenform").
2. **Siga o checklist obrigatório** no comentário HTML no topo do template (~45 linhas). Resumo verificável:
   - META: `<title>` sem travessão; `<meta description>` 120–160 caracteres; `<link canonical>` definitivo; `og:`/`twitter:` preenchidos; favicon `/Design/icone/favicon_true.png`.
   - SCHEMA: `BreadcrumbList` com 3 níveis (IRBIS > Cases > [CASE]) — não invente a sintaxe JSON-LD: Read o schema `BreadcrumbList` já presente em `site/cases-hub/eforce/index.html` ou `site/cases-hub/lumeform/index.html` (um case já publicado) e replique a estrutura trocando só os valores; `@type` = `CreativeWork` (site institucional) ou `SoftwareApplication` (produto digital/dashboard/SaaS); `datePublished`/`dateModified` reais.
   - CONTEÚDO: zero travessão; mínimo 4 desafios numerados; resultados com 3 stats; CTA WhatsApp `wa.me/5519991591265`.
   - TÉCNICO: Lenis 1.3.21 + GSAP 3.12.5 + ScrollTrigger; bloco `prefers-reduced-motion`; assets em `cases-hub/<slug>/assets/`.
3. **Substitua todos os `[PLACEHOLDER]`** ([SLUG], [CASE], [NOME], [ANO], [NUM]...). Verificação: `/usr/bin/grep -n '\[' "site/cases-hub/<slug>/index.html"` deve retornar vazio.
4. **Screenshots reais em 2x (retina)**, exporte JPEG qualidade 90, salve em `site/cases-hub/<slug>/assets/`. Fonte pequena → upscale AI antes (precedente `0e669e3`, case E-Force).
5. **Gere o LQIP de cada imagem**, faixa-alvo 3–11 KB (faixa real dos existentes, ex. `ADASH-HERO-lq.jpg` = 3.3 KB, `EFORCE-CASE-lq.jpg` = 6.9 KB). Sem script versionado no repo — loop bash no macOS para todas as imagens do case de uma vez:
   ```bash
   cd site/cases-hub/<slug>/assets
   for f in *.jpg; do
     [[ "$f" == *-lq.jpg ]] && continue
     sips -Z 24 -s format jpeg -s formatOptions 40 "$f" --out "${f%.jpg}-lq.jpg"
   done
   ```
   **Valide:** `ls -la *-lq.jpg` — cada arquivo entre 3 KB e 11 KB. Fora da faixa: ajuste `formatOptions` (menor = mais compressão) e regenere só esse arquivo.
6. **Aplique o padrão blur-up (LQIP) em cada `<img>`.** O template NÃO vem com esse padrão (confirmado: zero ocorrências de `lqip`/`data-src` no template) — você tem que ADICIONAR os 3 elementos abaixo em CADA imagem do case. **Antes de aplicar, Read `site/cases-hub/lumeform/index.html` inteiro** (não confie só nos blocos copiados abaixo, que podem desatualizar) e use-o como referência (CSS ~linha 351, `<img>` ~linha 432, JS ~linha 585):
   - HTML de cada `<img>` (substitua src simples por este padrão, com paths ABSOLUTOS começando em `/cases-hub/`, nunca relativos):
     ```html
     <img src="/cases-hub/<slug>/assets/IMG-lq.jpg"
          data-src="/cases-hub/<slug>/assets/IMG.jpg"
          alt="Nome: descrição" loading="lazy" class="lqip">
     ```
   - CSS (uma vez só, no `<style>` da página):
     ```css
     .lqip { filter: blur(12px); transform: scale(1.02); transition: filter 0.6s ease, transform 0.6s ease; }
     .lqip.loaded { filter: none; transform: scale(1); }
     ```
   - JS (uma vez só, antes do `</body>` — copie exatamente este bloco, que já está em produção em lumeform):
     ```html
     <script>
       document.querySelectorAll('img.lqip[data-src]').forEach(img => {
         const hi = new Image();
         hi.onload = () => { img.src = hi.src; img.classList.add('loaded'); };
         hi.src = img.dataset.src;
       });
     </script>
     ```
   - Motivo do path absoluto: a URL pública (via rewrite) difere do path físico do arquivo — path relativo quebra fora do diretório físico.
   - **Contradição confirmada entre esta regra e a referência real (verificado 07/jul/2026):** o `<img>` de `site/cases-hub/lumeform/index.html:432` — a própria referência citada acima — usa `loading="eager"` (não `"lazy"`) e `alt="Lumenform — hero section"` (contém travessão, o que a regra de estilo fixa deste documento proíbe). **PENDENTE — pergunte ao dono qual seguir:** replicar a regra escrita aqui (`loading="lazy"`, zero travessão) ou replicar o padrão real já em produção em lumeform (`loading="eager"`, travessão no alt). Não decida sozinho nem "corrija" lumeform por conta própria; até resposta do dono, para casos NOVOS siga a regra escrita aqui (lazy + sem travessão) e sinalize a divergência no output.
7. **Rewrite** (2 linhas, ver Runbook: criar página nova, passo 2) + **sitemap** (passo 3 do mesmo runbook) + card novo no hub `site/cases-hub/index.html` — antes de escrever o card novo, Read `site/cases-hub/index.html` e copie a estrutura (tag, classes, atributos) de um card de case já existente ali; não invente markup novo. Valide depois: abra `/cases` no preview local e confira visualmente que o card novo mantém o mesmo grid/layout dos demais.
8. **Valide o conteúdo do case contra o material real do cliente** antes de publicar — pasta `"02 - Projetos/<Cliente>/"` na raiz do repo (ex.: `"02 - Projetos/Odery Drums/"`, `"02 - Projetos/adash/"`). Lição de origem: `94a629e` (27/05/2026) publicou o case E-Force dizendo "pedais" quando o produto é bateria eletrônica — copy errada sobre cliente real foi ao ar. "Validar" = reler cada afirmação do case (produto, resultado, prazo) contra os arquivos dessa pasta; se a pasta não tiver o dado, pergunte ao dono antes de publicar. Confira também com `irbis-guarda-pivot` se o case e os números são afirmáveis (ex.: só "+R$350k" é permitido como número de resultado).

## Preview local

Sem build — servir arquivos estáticos. Configs em `.claude/launch.json` **na raiz do repo** (não em `site/`):

```bash
cd site && npx serve . --listen 3002        # opção 1 — default recomendado
cd site && python3 -m http.server 8080      # opção 2 — alternativa se a porta 3002 estiver ocupada
```

Rode sempre a partir de `site/` (não da raiz) — senão o servidor expõe o workspace inteiro do negócio. **Abra o servidor de preview em um terminal separado (ou via `run_in_background`) e só rode o `curl` depois que o servidor já estiver aceitando conexões** — rodar o `curl` no mesmo processo/terminal antes do servidor subir só resulta em "connection refused". Confirmação sem depender de abrir browser: `curl -s http://localhost:3002/index.html | grep -o '<title>[^<]*</title>'` deve retornar o `<title>` da home IRBIS. Se estiver com preview visual disponível, abra `http://localhost:3002/index.html` (ou 8080) e confira a mesma coisa na aba.

Limitação: os rewrites do `vercel.json` NÃO funcionam no serve local — teste pelas URLs literais (`/nome.html`). Clean URLs só em preview/prod da Vercel.

## Runbook: deploy

Projeto Vercel **`irbis-studio`** (projectId `prj_A8fjDRg5tu4Q7yr51P6StBU4w7np`, org `team_nrKsYjAemGbEQQSbV5SxOhdn`), linkado em `site/.vercel/project.json` E TAMBÉM em `.vercel/project.json` na raiz (mesmo projeto). Requer login na conta Vercel do Nicolas. `.claude/settings.local.json` já permite `npx vercel` e `git add/commit`.

**DEPLOYE SEMPRE DE DENTRO DE `site/`.** A raiz também está linkada ao mesmo projeto Vercel — um `npx vercel --prod` rodado da raiz sobe o workspace INTEIRO do negócio (comercial, propostas, PDFs de 37 MB, projetos de cliente) para o site público. O resíduo `skills/vercel.json` é evidência de uma tentativa antiga de deploy da raiz. **Confira `pwd` antes de qualquer `npx vercel`** — deve terminar em `/irbis/site`.

**AVISO CRÍTICO: o deploy sobe o FILESYSTEM local de `site/` inteiro, incluindo untracked e modificados sem commit — não o que está no git.** Prova: `site/Design/` (38 MB, untracked) serve favicon/og-image/mascote em produção; `founder.html`, `review-copy.html`, `index.html.bak` sobem juntos. Consequências: (a) produção pode estar à frente do git; (b) clone/checkout NÃO reconstitui o site em produção; (c) qualquer lixo em `site/` vaza para o ar.

**Gate de produção (regra da casa):** `npx vercel --prod` publica conteúdo público. Exige autorização explícita do dono na conversa (`workbench-metodo-da-casa` §9; eco em `irbis-guarda-pivot` item 6) para QUALQUER `--prod` que muda algo visível/indexável — página nova, case novo, preço, copy, rota. Uma autorização cobre a fase de trabalho inteira, não item por item. Sem confirmação registrada, pare antes do passo 5 abaixo. Preview (`npx vercel` sem `--prod`) não publica e não precisa do gate.

Sequência obrigatória (commit ANTES de deploy; `--prod` só com o sim do dono):

```bash
cd /Users/nicolascunha/Projects/Business/irbis
/usr/bin/git status --porcelain -- site/                       # 1. o que vai subir?
git add site/pagina.html site/vercel.json site/sitemap.xml     # 2. arquivos ESPECÍFICOS da fase (nunca -A)
git commit -m "feat(site): descrição da fase"                  # 3. conventional commit PT-BR com escopo
cd site
npx vercel                                                     # 4. deploy de preview — confira a URL gerada
npx vercel --prod                                              # 5. produção (só com autorização do dono)
```

Passo 1, "inesperado" = qualquer path na saída do `git status --porcelain` que você NÃO editou nesta fase (arquivo de cliente, `.env`, binário grande). Se aparecer, pare e pergunte antes de commitar.

Passo 2, "arquivo por arquivo" = liste cada path tocado nesta fase no `git add` (exemplo acima). NUNCA `git add -A`/`git add .` na raiz: ~164 entradas untracked (pastas de negócio, 38 MB de Design/, symlinks, .DS_Store) — add cego commita o workspace inteiro.

**Como saber quais paths são "desta fase" quando `git status --porcelain -- site/` retorna dezenas de linhas (working tree historicamente sujo):** não confie na memória nem tente adivinhar pelo volume da saída. Use um destes métodos, do mais confiável ao mais simples:
- **Método 1 (preferido): rode `git status --porcelain -- site/` ANTES de começar a editar nesta sessão e salve a lista.** Ao final da fase, rode de novo e faça o diff das duas listas — só os paths NOVOS na segunda lista (ou com status mudado) são "desta fase". Se você não salvou o "antes", use o Método 2.
- **Método 2: liste, na hora do `git add`, exatamente os arquivos que VOCÊ tocou com Edit/Write nesta conversa** — não os que aparecem no `git status`. Você sabe quais são porque foram as ferramentas que você mesmo chamou. Ignore todo o resto da saída do `git status`, mesmo que pareça relacionado.
- Nunca use o volume do `git status --porcelain` (ex.: "50+ mudanças") como critério para decidir entre "commitar tudo" ou "pedir ajuda" — o volume alto é o estado normal e conhecido deste repo (ver seção "Estado do repo"), não um sinal de emergência. Se depois de aplicar o Método 1 ou 2 ainda restar dúvida sobre se um path específico é seu, pare e pergunte ao dono — não commite por adivinhação nem deixe de commitar por medo.

- Escopos de commit usados no histórico: `site, home, mobile, cases, eforce, lumenform, adash, assets, seo, ga4, pixel, cta, routes, nav, perf`.
- **Rollback:** sem pipeline de CI. `npx vercel ls` lista deployments e URLs; abra o dashboard do projeto `irbis-studio` em vercel.com, ache o deployment desejado e use "Promote to Production" (a CLI sozinha não promove — ação de UI). Domínio irbis.com.br aponta pro projeto via configuração no dashboard (não verificável pelo repo).
- Para saber o que está NO AR agora (produção pode ≠ git): dashboard Vercel → deployments, ou `curl -sI https://irbis.com.br/founder` para testar rotas específicas.

## Checklist pré-deploy (incidentes-lição)

Cada item nasceu de um incidente real. Rode antes de QUALQUER `--prod`:

| # | Checagem | Comando | Lição de origem |
|---|---|---|---|
| 0 | Autorização explícita do dono para esta fase de deploy em produção (ver critério na seção Deploy) | confirmação do dono na conversa (sem registro dela, pare) | Regra da casa (`workbench-metodo-da-casa` §9; `irbis-guarda-pivot` item 6) |
| 1 | Nenhum Measurement ID GA4 intruso | `/usr/bin/grep -rho "G-[A-Z0-9]\{8,\}" site --include="*.html" \| sort -u` → esperado: `G-VKHL68G50M` (vigente) **+ `G-XXXXXXXX`** (placeholder documentacional em `site/review-copy.html:624`, ruído conhecido, ignorar). Qualquer TERCEIRO ID é problema | 28/05/2026: commit `de1c0e5` às 20:03 publica o ID errado `G-85R1XFT54P`; commit `3e1ad3a` às 20:06 corrige para o vigente `G-VKHL68G50M`. Nunca copie bloco de analytics sem conferir o ID na propriedade real |
| 2 | Fatos de case batem com o material do cliente | releia a página × pasta `"02 - Projetos/<Cliente>/"` | 27/05/2026 `94a629e`: case E-Force publicado dizendo "pedais" — produto é bateria eletrônica |
| 3 | Nome de diretório × rewrites consistentes | `/usr/bin/grep -c "<slug>" site/vercel.json` e `ls site/cases-hub/` | Typo `lumeform` (sem N): o dir errado virou contrato. Nunca renomeie diretório sem atualizar vercel.json no mesmo commit |
| 4 | Nenhum número banido entrou | `/usr/bin/grep -rn "+500\|1,8x" site --include="*.html"` → vazio | "+500" e "LTV 1,8x" são inventados — banidos (regra do dono nº2) |
| 5 | Nenhum `[PLACEHOLDER]` nem `XXXXX` NOVO em página com rota | `/usr/bin/grep -rn "PLACEHOLDER\|XXXXX" site --include="*.html" \| grep -v "_template\|_mockup\|review-copy"` | `founder.html:963` está no ar com Formspree `XXXXX` — form morto em produção |
| 6 | Sem travessão em conteúdo novo | `/usr/bin/grep -c "—" site/pagina-editada.html` (compare com antes da edição) | Regra da casa + checklist do template |
| 7 | Commit da fase feito | `/usr/bin/git status --porcelain -- site/` sem os arquivos da fase | Regra do dono 04/jul/2026 |
| 8 | Mobile conferido no preview | viewport ~390px | `91f99f5` (27/05): mobile exigiu redesign completo logo após o desktop |

O hit conhecido de `founder.html:963` (Formspree `XXXXX`) é estado catalogado em "Ambiguidades abertas" — mas isso NÃO dispensa o item 5 do checklist. Se o grep do item 5 acusar qualquer `PLACEHOLDER`/`XXXXX`, incluindo esse já conhecido, pare antes do deploy em produção e confirme com o dono (não decida sozinho que um hit catalogado deixa de bloquear).

## IDs vigentes de analytics e conversão

Verificado por grep em 04/jul/2026:

| ID / recurso | O quê | Onde está |
|---|---|---|
| `G-VKHL68G50M` | GA4 vigente (antigo `G-85R1XFT54P` tem zero ocorrências) | só 4 páginas: index, obrigado, vs-agencia, founder |
| `G-XXXXXXXX` | Placeholder em TEXTO documentacional ("Substituir G-XXXXXXXX pelo Measurement ID real"), não é tag ativa | só `site/review-copy.html:624` (página interna, acessível por path literal) |
| `26926853710268489` | Meta Pixel | só index e obrigado |
| `/obrigado` | Conversão: `fbq('track','Lead')` + `gtag('event','generate_lead',{event_category:'discovery_call'})`; única página com `noindex` | `site/obrigado.html:21,34` |
| `f628ebc890c4d.js` | Contentsquare (`t.contentsquare.net/uxa/`) | os 21 HTMLs do conjunto de sincronização |
| `/_vercel/insights/script.js` | Vercel Web Analytics | os mesmos 21 HTMLs |
| `twsp7zbqg0fvr0ylejum8fcxkraq1m` | facebook-domain-verification | `site/index.html:9` |
| `calendly.com/nicolas-cunhan-aluno/30min` | CTA de agendamento (nav + CTAs) | index e páginas de funil |
| `wa.me/5519991591265` | CTA WhatsApp dos cases | template + cases |

GA4 ausente em metodo/manifesto/sobre/cases/para/\*. Critério de decisão está no Runbook: criar página nova, passo 4. Não "corrija" em massa sem perguntar.

## Estado do repo em jul/2026 e armadilhas

- **52 commits**, todos de Nicolas; primeiro 09/04/2026, último `d419627` em 10/06/2026 14:06. Zero tags, zero merges. Histórico SEMPRE via `/usr/bin/git` — o hook RTK trunca `git log` (detalhe em `workbench-metodo-da-casa`).
- `git remote -v` vazio → ZERO backup do histórico. Só existe nesta máquina. Pendência recomendada ao dono: remote privado no GitHub (decisão dele, **pergunte antes**).
- Working tree à frente do git desde 10/06: 21 tracked modificados + 1 deletado (o `index.html` órfão da raiz, −1706 linhas) + 164 untracked; +407/−1743 nos tracked. Edições mais recentes do site: 25/06/2026 09:27–09:29 (template + 3 cases: paths absolutos de assets + tags de analytics).
- Untracked que JÁ SERVEM em produção (deploy sobe o filesystem, não o git): `site/Design/` (38 MB — favicon `Design/icone/favicon_true.png`, `Design/og-image.png`, mascote do hero), `site/founder.html`, `site/cases-hub/design/` (6 conceitos + hub), `site/processo/`, `site/blog/`, `site/review-copy.html`, `site/.gitignore`, `site/.impeccable.md`.
- `site/founder.html:963` segue com Formspree placeholder `XXXXX` (reverificado 04/jul/2026) — o funil `/founder` não captura leads.
- Lixo conhecido e inofensivo: worktree prunable em `~/Projects/IRBIS/.claude/worktrees/` e 2 branches `claude/*` paradas no commit inicial. Ignore; não limpe sem necessidade.
- Paths com espaço (`"02 - Projetos/"` etc.) — sempre aspas em comandos.
- `site/llms.txt` é PRÉ-PIVOT (anuncia "branding, dashboards, sistemas digitais") — contradiz o escopo só-sites definitivo de 01/jun/2026 do CLAUDE.md. Não use como referência de escopo; reescrever = copy (`irbis-brand-voice` + `irbis-guarda-pivot`) + aprovação do dono.

## Ambiguidades abertas — pergunte ao dono antes de decidir/publicar

| Ambiguidade | Hipóteses coexistentes | Ação segura |
|---|---|---|
| Funil `/founder` (Formspree `XXXXX`, untracked, sem mexida desde 16/06) | (a) pausado/abandonado; (b) aguardando endpoint real | Não divulgue a rota nem crie conta Formspree; pergunte |
| Backlog untracked (Design/, founder, design/\*, blog, processo) deve entrar no git? | (a) política "workspace ≠ código"; (b) acúmulo a regularizar sob a regra nova de commit | Commite os arquivos das SUAS fases; o backlog histórico (dezenas de MB com binários) só com decisão do dono |
| `review-copy.html` e `index.html.bak` públicos por path literal | (a) irrelevante; (b) vazamento a corrigir (mover para fora de site/ ou criar `.vercelignore`) | Não crie `.vercelignore` sem aprovação — muda o comportamento do deploy inteiro |
| Case Adash (fictício) publicado em `/adash` | (a) remover; (b) manter até substituto | Decisão PENDENTE do dono; não use em material novo |
| Conceitos `/design/*` — já estão no ar? | rewrites existem só no working tree; depende de quando foi o último deploy | `curl -sI https://irbis.com.br/design` antes de assumir |
| Link do manifesto fora da nav ("temporariamente" desde 27/05, `d0851ad`) | (a) volta; (b) descartado | Pergunte antes de recolocar |
| GA4 só em 4 páginas | (a) intencional (só funil); (b) lacuna | Pergunte antes de instalar em massa |
| Schema da home diz "Entrega em 2-3 semanas" para institucional; processo interno documenta 3-4 | (a) manter 2-3; (b) corrigir para 3-4 | Não altere sem o dono (contexto em `irbis-guarda-pivot`) |
| Preço público divergente (ver regra 4 acima) | (a) R$5k vale e o site corrige; (b) R$3k vale e schema/copy corrigem | Pergunte ao dono QUAL preço vale e QUAL superfície corrigir — não altere nenhum lado sozinho |
| Sitemap e llms.txt defasados | — | Sitemap: adicione a página que você criar; varredura completa e llms.txt novo = perguntar |

## Proveniência e manutenção

**Escrita em 04/jul/2026** (agente autor da Fase 2 da livraria de skills); **revisada em 06/jul/2026** para execução por modelo júnior (checklists e comandos de verificação explícitos, sem perda de fato). Fontes: verificação direta no repo (`site/index.html`, `site/vercel.json`, `site/sitemap.xml`, `site/robots.txt`, `site/llms.txt`, `site/.impeccable.md`, `site/founder.html`, `site/obrigado.html`, `site/cases-hub/_template-case.html`, `site/cases-hub/lumeform/index.html`, `.vercel/project.json` raiz e site/, `.claude/launch.json`, `.claude/settings.local.json`, histórico e status via `/usr/bin/git`), dossiês da Fase 1 (`irbis-site-code.md`, `irbis-history-tooling.md`, DISCOVERY.md) e respostas do dono de 04/jul/2026, que PREVALECEM sobre qualquer doc do repo.

Re-verificação de 1 linha para cada fato que pode driftar (rode da raiz do repo):

| Fato | Comando |
|---|---|
| Último commit / working tree ainda sujo? | `/usr/bin/git log -1 --format='%h %ad %s' --date=short && /usr/bin/git status --porcelain \| wc -l` |
| Ainda sem remote/backup? | `/usr/bin/git remote -v` (vazio = sem backup) |
| Projeto Vercel ainda irbis-studio (raiz e site/)? | `cat .vercel/project.json site/.vercel/project.json` |
| Rotas atuais | `cat site/vercel.json` |
| GSAP/Lenis ainda 3.12.5/1.3.21? | `/usr/bin/grep -n "gsap/3\|lenis@" site/index.html` |
| Tokens ainda os mesmos? | `sed -n '214,234p' site/index.html` |
| GA4 vigente (esperado: `G-VKHL68G50M` + ruído `G-XXXXXXXX` de review-copy.html)? | `/usr/bin/grep -rho "G-[A-Z0-9]\{8,\}" site --include="*.html" \| sort -u` |
| Meta Pixel ainda o mesmo? | `/usr/bin/grep -rl "26926853710268489" site --include="*.html"` |
| Superfícies de preço ainda as mapeadas (divergência R$3k × R$5k ainda aberta)? | `/usr/bin/grep -rn "partir de R\|priceRange" site --include="*.html"` |
| Formspree do /founder ainda placeholder? | `/usr/bin/grep -n "formspree" site/founder.html` |
| Números banidos continuam fora do site? | `/usr/bin/grep -rn "+500\|1,8x" site --include="*.html"` (vazio = ok) |
| Sitemap ainda com 8 URLs defasadas? | `/usr/bin/grep -c "<loc>" site/sitemap.xml` |
| Case Adash ainda no ar? | `/usr/bin/grep -n '"/adash"' site/vercel.json && curl -sI https://irbis.com.br/adash \| head -1` |
| llms.txt ainda pré-pivot? | `head -3 site/llms.txt` (se citar branding/dashboards, segue pré-pivot) |
| .vercelignore continua inexistente (deploy sobe tudo)? | `ls site/.vercelignore` (erro = inexistente, comportamento descrito aqui vale) |
| Typo lumeform ainda existe? | `ls site/cases-hub/ \| /usr/bin/grep lume` |
