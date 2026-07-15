# Versão EN do site — Fase 1 (rotas + toggle + home EN + hreflang) — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para executar tarefa a tarefa. Steps usam checkbox (`- [ ]`).

**Goal:** entregar a home EN em `/en`, indexável, com toggle de bandeira nos dois sentidos e hreflang recíproco, provando o padrão inteiro antes de escalar para o resto do site.

**Architecture:** arquivo estático `site/en/index.html` (cópia da home PT com copy traduzida na voz da marca e head localizado), roteado por rewrite em `site/vercel.json`. Toggle de bandeira em SVG na nav de cada lado. PT continua na raiz sem prefixo. Zero build.

**Tech Stack:** HTML/CSS/JS vanilla, Sora, GSAP 3.12.5 + ScrollTrigger + Lenis 1.3.21 (mesmos da home PT), Vercel (deploy do diretório `site/`).

## Global Constraints (copiados do spec, valem para toda tarefa)

- PT na raiz sem prefixo; EN sob `/en/` com slug inglês.
- Nenhum travessão (—) em conteúdo/título/atributo (usar `:` ou `·`).
- Fonte Sora; accent `#FF3D00` só em ação/ênfase, nunca decoração; tokens `:root` iguais aos da home PT.
- Prova social: só número afirmável (`+R$350k` / equivalente). Zero número inventado. "+500" e "LTV 1,8x" BANIDOS.
- Preço na versão EN: soft ("pricing on the call" / "starting at"), sem número USD fechado.
- Copy EN aplicando a voz IRBIS (skill `irbis-brand-voice` + ogilvy + stop-slop); não tradução literal.
- Deploy sobe o filesystem de `site/`, não o git. NÃO deployar sem OK do dono. `--prod` só de dentro de `site/`.
- Commits: sempre `git add` de arquivos ESPECÍFICOS (nunca `-A`). Working tree está sujo (várias páginas modificadas pré-existentes) — não commitar o que não é da tarefa.

## Setup (antes da Task 1)

- [ ] Criar branch de trabalho a partir da main:

```bash
cd /Users/nicolascunha/Projects/Business/irbis
git checkout -b feat/site-en
```

Nota: a branch protege o histórico git; a produção só é protegida por não deployar. As mudanças pré-existentes não commitadas do working tree acompanham a branch (esperado).

---

### Task 1: Toggle de bandeira (SVG) na home PT

**Files:**
- Modify: `site/index.html` (nav ~1811-1816; mobile-nav ~1820-1827; bloco `<style>`)

**Interfaces:**
- Produces: classe CSS `.lang-toggle` (link com bandeira SVG, 20×14px, `aria-label`), reutilizada nas próximas páginas. Na home PT aponta para `/en` com bandeira dos EUA.

- [ ] **Step 1: Adicionar o CSS do toggle** no `<style>` da home (perto de `.nav-cta`, ~linha 407):

```css
.lang-toggle { display:inline-flex; align-items:center; justify-content:center; width:22px; height:16px; border-radius:2px; overflow:hidden; opacity:.75; transition:opacity .2s, transform .2s; }
.lang-toggle:hover { opacity:1; transform:translateY(-1px); }
.lang-toggle svg { display:block; width:100%; height:100%; }
```

- [ ] **Step 2: Inserir o botão de bandeira US na nav desktop**, dentro do bloco flex (entre a `</a>` do `nav-cta` e o `<button nav-hamburger>`, ~linha 1812). Bandeira dos EUA em SVG inline (aponta para `/en`):

```html
<a href="/en" class="lang-toggle" aria-label="View in English" title="English">
  <svg viewBox="0 0 7410 3900" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="7410" height="3900" fill="#b22234"/>
    <g fill="#fff">
      <rect y="300" width="7410" height="300"/><rect y="900" width="7410" height="300"/>
      <rect y="1500" width="7410" height="300"/><rect y="2100" width="7410" height="300"/>
      <rect y="2700" width="7410" height="300"/><rect y="3300" width="7410" height="300"/>
    </g>
    <rect width="2964" height="2100" fill="#3c3b6e"/>
  </svg>
</a>
```

- [ ] **Step 3: Inserir o mesmo link no mobile-nav-overlay** (dentro de `.mobile-nav-links`, após o link "Sobre", ~linha 1826), em texto para caber no menu mobile:

```html
<a href="/en">English 🇺🇸</a>
```

(No overlay mobile pode usar o emoji, que ali é aceitável como rótulo de texto; a bandeira SVG fica só na nav desktop.)

- [ ] **Step 4: Verificar no preview local** que o toggle aparece e aponta para `/en`:

```bash
cd /Users/nicolascunha/Projects/Business/irbis/site && (curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/ 2>/dev/null | grep -q 200 || (npx serve . --listen 3002 >/tmp/irbis-serve.log 2>&1 & sleep 2))
curl -sL http://localhost:3002/ | /usr/bin/grep -o 'lang-toggle" aria-label="View in English"' | head -1
```

Esperado: retorna a string do toggle. `/en` ainda dará 404 até a Task 2 (ok).

- [ ] **Step 5: Commit**

```bash
cd /Users/nicolascunha/Projects/Business/irbis
git add site/index.html
git commit -m "feat(site): toggle de idioma (bandeira US) na nav da home PT"
```

---

### Task 2: Rota `/en` + home EN (estrutura e head, sem traduzir ainda)

**Files:**
- Create: `site/en/index.html` (cópia de `site/index.html`)
- Modify: `site/vercel.json` (novo rewrite)

**Interfaces:**
- Consumes: `.lang-toggle` da Task 1.
- Produces: página `/en` servida; head localizado (lang/canonical/og/title); toggle invertido (bandeira BR → `/`).

- [ ] **Step 1: Copiar a home para o diretório EN**

```bash
cd /Users/nicolascunha/Projects/Business/irbis
mkdir -p site/en && cp site/index.html site/en/index.html
```

- [ ] **Step 2: Localizar o `<head>` de `site/en/index.html`** (edições exatas, valores novos):
  - `<html lang="pt-BR">` → `<html lang="en">`
  - `<link rel="canonical" href="https://irbis.com.br/">` → `href="https://irbis.com.br/en"`
  - `<meta property="og:locale" content="pt_BR">` → `content="en_US"`
  - `<meta property="og:url" content="https://irbis.com.br/">` → `https://irbis.com.br/en`
  - `<title>` e `<meta name="description">`/`og:*`/`twitter:*`: versão EN (feito na Task 3; por ora pode deixar o PT, será sobrescrito).
  - Manter TODO o CSS/JS/GSAP/Lenis idênticos.

- [ ] **Step 3: Inverter o toggle na home EN** — a bandeira US (`href="/en"`) vira bandeira BR apontando para `/`. Substituir o bloco `.lang-toggle` por (SVG da bandeira do Brasil):

```html
<a href="/" class="lang-toggle" aria-label="Ver em português" title="Português">
  <svg viewBox="0 0 720 504" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="720" height="504" fill="#009c3b"/>
    <path d="M360 66 666 252 360 438 54 252z" fill="#ffdf00"/>
    <circle cx="360" cy="252" r="88" fill="#002776"/>
  </svg>
</a>
```

E no mobile-overlay trocar `<a href="/en">English 🇺🇸</a>` por `<a href="/">Português 🇧🇷</a>`.

- [ ] **Step 4: Adicionar o rewrite em `site/vercel.json`** — Read o arquivo primeiro; inserir como ÚLTIMO elemento do array `rewrites` (antes do `]`), ajustando a vírgula da entrada anterior:

```json
{ "source": "/en", "destination": "/en/index.html" }
```

- [ ] **Step 5: Validar o JSON**

```bash
cd /Users/nicolascunha/Projects/Business/irbis
python3 -m json.tool site/vercel.json > /dev/null && echo OK
```

Esperado: `OK`. Se erro, desfazer a edição do vercel.json e refazer.

- [ ] **Step 6: Verificar a home EN local** (o `serve` não honra rewrites; testar pelo path literal):

```bash
curl -s http://localhost:3002/en/index.html | /usr/bin/grep -o '<html lang="en">\|canonical" href="https://irbis.com.br/en"\|og:locale" content="en_US"' 
curl -s http://localhost:3002/en/index.html | /usr/bin/grep -o 'aria-label="Ver em português"'
```

Esperado: as 3 tags de head localizadas + o toggle BR presente.

- [ ] **Step 7: Commit**

```bash
cd /Users/nicolascunha/Projects/Business/irbis
git add site/en/index.html site/vercel.json
git commit -m "feat(site): rota /en + estrutura da home EN (head localizado, toggle BR)"
```

---

### Task 3: Traduzir a copy da home EN (voz da marca)

**Files:**
- Modify: `site/en/index.html` (todo o conteúdo visível + meta/title/og/twitter + texto de schema JSON-LD)

**Interfaces:**
- Consumes: estrutura da Task 2.
- Produces: home EN com copy final em inglês; **checkpoint de tom** — o dono revisa antes de qualquer outra página ser traduzida.

- [ ] **Step 1: Traduzir aplicando a skill `irbis-brand-voice`.** Regras: preservar estrutura/CSS/JS/animações; traduzir só texto visível e metadados. Sem travessão. Registro direto e confiante (não literal). Preço soft ("Pricing on the call"). Só número afirmável (`+R$350k` vira, no texto EN, o mesmo fato de resultado, ex.: "+R$350k in sales generated by a site I built"). Itens-chave a traduzir:
  - `<title>`, `<meta name="description">`, `og:title/description`, `twitter:title/description`
  - hero-label, título do hero, subheadline, CTAs (nav e hero), labels dos 3 números, nomes/descrições dos 3 cards de serviço, seção "como opero", FAQ, footer, e qualquer texto de schema `description`/`name`.

- [ ] **Step 2: Verificar ausência de PT óbvio nos pontos-chave** (heurística, não prova absoluta):

```bash
cd /Users/nicolascunha/Projects/Business/irbis
/usr/bin/grep -oiE 'INICIAR PROJETO|AGENDAR CONVERSA|do briefing ao|SERVIÇOS|PROCESSO|Perguntas|seu negócio' site/en/index.html
```

Esperado: vazio (ou só ocorrências dentro de dados que devem mesmo ficar). Qualquer hit visível = ainda não traduzido; corrigir.

- [ ] **Step 3: Verificar zero travessão**

```bash
/usr/bin/grep -c "—" site/en/index.html
```

Esperado: `0`.

- [ ] **Step 4: Revisão de marca (checkpoint do dono).** Apresentar a home EN no preview local (`/en/index.html`) e pedir aprovação do TOM antes de seguir para a Fase 2. Não avançar sem OK.

- [ ] **Step 5: Commit**

```bash
cd /Users/nicolascunha/Projects/Business/irbis
git add site/en/index.html
git commit -m "feat(site): copy EN da home na voz da marca (preço soft, sem travessão)"
```

---

### Task 4: hreflang recíproco + sitemap

**Files:**
- Modify: `site/index.html` (head: adicionar hreflang)
- Modify: `site/en/index.html` (head: adicionar cluster hreflang)
- Modify: `site/sitemap.xml` (entrada `/en`)

**Interfaces:**
- Consumes: `/en` da Task 2.
- Produces: descoberta bidirecional PT↔EN pelo Google.

- [ ] **Step 1: Na home PT (`site/index.html`), após o `<link rel="canonical">`,** adicionar:

```html
<link rel="alternate" hreflang="pt-BR" href="https://irbis.com.br/">
<link rel="alternate" hreflang="en" href="https://irbis.com.br/en">
<link rel="alternate" hreflang="x-default" href="https://irbis.com.br/">
```

- [ ] **Step 2: Na home EN (`site/en/index.html`), após o canonical,** adicionar o mesmo cluster (self em en):

```html
<link rel="alternate" hreflang="pt-BR" href="https://irbis.com.br/">
<link rel="alternate" hreflang="en" href="https://irbis.com.br/en">
<link rel="alternate" hreflang="x-default" href="https://irbis.com.br/">
```

- [ ] **Step 3: Adicionar `/en` ao `site/sitemap.xml`** (novo bloco `<url>` antes de `</urlset>`; hreflang duplo é o padrão do arquivo — aqui com a 3ª tag apontando en):

```xml
<url>
  <loc>https://irbis.com.br/en</loc>
  <lastmod>2026-07-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="pt-BR" href="https://irbis.com.br/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://irbis.com.br/en"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://irbis.com.br/"/>
</url>
```

- [ ] **Step 4: Validar XML e reciprocidade**

```bash
cd /Users/nicolascunha/Projects/Business/irbis
python3 -c "import xml.dom.minidom as m; m.parse('site/sitemap.xml')" && echo "XML OK"
/usr/bin/grep -c 'hreflang="en" href="https://irbis.com.br/en"' site/index.html site/en/index.html
```

Esperado: `XML OK` e cada arquivo com 1 ocorrência.

- [ ] **Step 5: Commit**

```bash
cd /Users/nicolascunha/Projects/Business/irbis
git add site/index.html site/en/index.html site/sitemap.xml
git commit -m "feat(site): hreflang recíproco PT<->EN na home + sitemap /en"
```

---

### Task 5: Verificação final (analytics + preview desktop/mobile)

**Files:** nenhum novo (só verificação; commit apenas se houver correção).

- [ ] **Step 1: Paridade de analytics** na home EN:

```bash
cd /Users/nicolascunha/Projects/Business/irbis
/usr/bin/grep -c 'G-VKHL68G50M' site/en/index.html   # GA4, esperado >=1
/usr/bin/grep -c 'clarity.ms/tag/xmqsnmt3uv' site/en/index.html  # Clarity, esperado 1
```

Se a home PT tiver Meta Pixel e a EN não, copiar o bloco do Pixel.

- [ ] **Step 2: Preview desktop** — abrir `http://localhost:3002/en/index.html`, conferir hero, números, cards e o toggle BR. Validar animação via DOM se o screenshot vier preto (rAF ocluído: forçar `gsap.globalTimeline.progress(1)` e ler `.num-item`).

- [ ] **Step 3: Preview mobile ~390px** — `resize_window` para 390px, conferir nav/hero/CTAs sem overflow; o toggle mobile (link "Português") aparece no overlay.

- [ ] **Step 4: Checklist pré-deploy** (do runbook irbis-site-ops): sem GA4 intruso; sem número banido; sem `[PLACEHOLDER]`/`XXXXX` novo; zero travessão na home EN; commits das tarefas feitos.

- [ ] **Step 5 (opcional): fix commit** se algo acima exigiu correção, com `git add` do arquivo específico.

---

## Handoff / deploy

Ao fim da Fase 1, com OK do dono do tom (Task 3, Step 4) e da verificação (Task 5): deploy de dentro de `site/` (`npx vercel --prod --yes`), que resolve os clean URLs `/en`. **Só com o "pode dar deploy" explícito.** Depois, seguir para o plano da Fase 2 (about, method, cases, vs-agency, for/*, manifesto, thank-you, call).

## Notas de verificação (adaptação a este repo)

- Sem framework de testes: "verificação" = `python3 -m json.tool` (JSON), parse XML, `curl`+grep no `serve` local (rewrites não funcionam no `serve` → testar por path literal `/en/index.html`), e checagem via DOM no browser pane (screenshots podem vir pretos por rAF ocluído — cruzar com DOM).
