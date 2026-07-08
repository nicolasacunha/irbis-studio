# Blog Semanal Automático (SEO/GEO) — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o pipeline que permite a rotina semanal de blog da IRBIS pesquisar, escrever e publicar um post novo sozinha, sem revisão humana, com gates de qualidade automáticos.

**Architecture:** Site estático (sem build system). Um script Node puro (`scripts/blog/render.mjs`, sem dependências externas) transforma um template HTML + dados em `posts.json` + conteúdo do post em um artigo publicado, e mantém `index.html`, `sitemap.xml` e `llms.txt` sincronizados. A publicação em produção passa a ser via `git push` para `main` num repositório GitHub conectado ao projeto Vercel (Git Integration), substituindo o `vercel deploy` manual usado até aqui. As instruções da rotina em si vivem numa skill de projeto (`irbis-blog-semanal`).

**Tech Stack:** Node.js 24 (nativo, sem deps — `node:fs`, `node:path`, `node:test`), HTML/CSS estático, GitHub (repo privado), Vercel Git Integration.

## Global Constraints

- Todo conteúdo de post é em PT-BR, seguindo a skill `irbis-brand-voice` e o Manual de Copy da IRBIS.
- Nenhuma dependência de npm é instalada — `scripts/blog/render.mjs` usa só módulos nativos do Node.
- `scripts/blog/render.mjs` nunca sobrescreve `site/blog/erros-site-startup.html` (post pré-existente, mantido como está).
- Cor de acento da marca em qualquer HTML novo: `#FF6600` (não `#FF3D00`, que é a cor antiga).
- Pilares de conteúdo fixos (chave usada em `posts.json`, no manifest de capas e nos rótulos): `erros-de-site`, `hora-de-trocar`, `tendencias`, `conversao-cro`, `seo-geo`.
- Pool de imagens de capa já existe em `site/blog/assets/covers/manifest.json` (28 imagens, 4 por pilar + 8 no pool `geral`) — a rotina consome dali, não gera imagem nova por padrão.
- `site/blog/_concorrentes-bloqueados.md` é a fonte da verdade de marcas a nunca citar (estúdios/agências/freelancers de site + qualquer site-builder: Webflow, Wix, Framer, WordPress etc.).
- URLs canônicas de post: `https://irbis.com.br/blog/<slug>` (sem `.html`).

---

## Task 1: Repositório GitHub + Vercel Git Integration

**Files:**
- Nenhum arquivo de código — ação de infraestrutura (git remote, GitHub, dashboard Vercel).

**Interfaces:**
- Produz: um remote `origin` apontando pro GitHub, branch `main` publicada lá, projeto Vercel `irbis-studio` com Git Integration ativa (Root Directory = `site`, Production Branch = `main`).

> **Importante para quem executar esta task:** ela envolve criar um repositório remoto e dar `git push` pela primeira vez — uma ação difícil de reverter. **Não delegue este task para um subagente sem supervisão.** Rode os comandos você mesmo (ou acompanhe de perto) e confirme com o Nicolas explicitamente antes do passo de push.

- [ ] **Step 1: Conferir que nenhum arquivo sensível está rastreado pelo git**

Run: `git -C /Users/nicolascunha/Projects/Business/irbis ls-files | grep -iE "marca|comercial|prospect|dossie" || echo "nenhum arquivo sensível rastreado"`
Expected: `nenhum arquivo sensível rastreado` (as pastas `01 - Marca/` e `03 - Comercial/` nunca foram commitadas — confirmado antes de escrever este plano).

- [ ] **Step 2: Confirmar autenticação no GitHub CLI**

Run: `gh auth status`
Expected: linha `✓ Logged in to github.com account <usuário> (keyring)` com `Active account: true`.

- [ ] **Step 3: Criar o repositório privado no GitHub**

Run:
```bash
cd /Users/nicolascunha/Projects/Business/irbis
gh repo create irbis-studio --private --source=. --remote=origin
```
Expected: saída confirmando criação do repo `<usuário>/irbis-studio` e remote `origin` adicionado. Se o comando pedir para não adicionar remote automaticamente, rode manualmente:
```bash
git remote add origin https://github.com/<usuário>/irbis-studio.git
```

- [ ] **Step 4: Checkpoint — confirmar com o Nicolas antes de publicar o histórico**

Mostrar a ele: nome do repo, visibilidade (privado), e a saída do Step 1 (nada sensível rastreado). Só seguir para o Step 5 após confirmação explícita.

- [ ] **Step 5: Push da branch main**

Run: `git push -u origin main`
Expected: saída terminando em algo como `branch 'main' set up to track 'origin/main'`.

- [ ] **Step 6: Conectar o projeto Vercel ao repositório**

Run (a partir de `site/`, onde o projeto Vercel já está linkado):
```bash
cd /Users/nicolascunha/Projects/Business/irbis/site
npx vercel git connect https://github.com/<usuário>/irbis-studio.git
```
Expected: confirmação de que o Git Integration foi conectado ao projeto `irbis-studio`.

- [ ] **Step 7: Ajustar o Root Directory no dashboard da Vercel (passo manual)**

Instruções passo a passo (interface em português):
1. Abrir https://vercel.com/dashboard e entrar no projeto `irbis-studio`.
2. Ir em **Configurações** (Settings) → **Geral** (General).
3. Encontrar o campo **Diretório Raiz** (Root Directory) e definir como `site`.
4. Confirmar que **Branch de Produção** (Production Branch) está como `main`.
5. Salvar.

- [ ] **Step 8: Verificar que o Git Integration dispara deploy**

Run:
```bash
cd /Users/nicolascunha/Projects/Business/irbis
git commit --allow-empty -m "chore: verificar git integration com a vercel"
git push origin main
```
Expected: um novo deployment aparece no dashboard da Vercel (aba **Deployments**) alguns segundos depois do push, com status passando de "Building" para "Ready". Confirmar visualmente antes de seguir pro Task 2.

---

## Task 2: Rewrites de `/blog` no `vercel.json`

**Files:**
- Modify: `site/vercel.json`

**Interfaces:**
- Consumes: nenhum.
- Produces: rotas `/blog` e `/blog/<slug>` resolvendo pros arquivos estáticos correspondentes — usado por todo post publicado a partir daqui.

- [ ] **Step 1: Adicionar as rotas de blog ao vercel.json**

Editar `site/vercel.json`, adicionando estas duas entradas ao array `rewrites` (logo após a entrada `{ "source": "/cases", "destination": "/cases-hub/index.html" }`):

```json
    { "source": "/blog",            "destination": "/blog/index.html" },
    { "source": "/blog/(.*)",       "destination": "/blog/$1.html" },
```

- [ ] **Step 2: Validar que o JSON continua válido**

Run: `node -e "JSON.parse(require('fs').readFileSync('site/vercel.json', 'utf8')); console.log('JSON válido')"`
Expected: `JSON válido`

- [ ] **Step 3: Commit**

```bash
git add site/vercel.json
git commit -m "feat(blog): adiciona rewrites /blog e /blog/:slug"
git push origin main
```

---

## Task 3: Template do post + `posts.json` + seed do post existente

**Files:**
- Create: `site/blog/_template-post.html`
- Create: `site/blog/posts.json`

**Interfaces:**
- Produces: template com placeholders `{{TITLE}}`, `{{DESCRIPTION}}`, `{{SLUG}}`, `{{DATE_ISO}}`, `{{DATE_HUMAN}}`, `{{READING_MIN}}`, `{{ARTICLE_SECTION}}`, `{{KEYWORDS}}`, `{{COVER_IMAGE_PATH}}`, `{{BODY_HTML}}` — consumido pelo Task 4 (`render.mjs`).
- Produces: `posts.json` no formato `{ "posts": [{ slug, title, description, dateISO, pilar, keywords: string[], coverImage: string|null, readingTimeMin }] }` — consumido pelos Tasks 4, 5 e 7.

- [ ] **Step 1: Criar o template do post**

Create `site/blog/_template-post.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} | IRBIS</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <link rel="canonical" href="https://irbis.com.br/blog/{{SLUG}}">
  <meta property="og:title" content="{{TITLE}}">
  <meta property="og:description" content="{{DESCRIPTION}}">
  <meta property="og:image" content="https://irbis.com.br{{COVER_IMAGE_PATH}}">
  <meta property="og:url" content="https://irbis.com.br/blog/{{SLUG}}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="author" content="Nicolas Cunha">
  <meta name="keywords" content="{{KEYWORDS}}">
  <link rel="icon" href="/Design/icone/favicon_true.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{TITLE}}",
    "description": "{{DESCRIPTION}}",
    "author": { "@type": "Person", "name": "Nicolas Cunha", "url": "https://irbis.com.br/sobre" },
    "publisher": { "@type": "Organization", "name": "IRBIS", "url": "https://irbis.com.br" },
    "datePublished": "{{DATE_ISO}}",
    "dateModified": "{{DATE_ISO}}",
    "url": "https://irbis.com.br/blog/{{SLUG}}",
    "image": "https://irbis.com.br{{COVER_IMAGE_PATH}}",
    "articleSection": "{{ARTICLE_SECTION}}",
    "keywords": "{{KEYWORDS}}"
  }
  </script>
  <style>
    :root {
      --bg: #0C0C0E;
      --text: #FAFAFA;
      --muted: #71717A;
      --accent: #FF6600;
      --s1: #18181B;
      --s2: #27272A;
      --f: 'Sora', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { background: var(--bg); color: var(--text); font-family: var(--f); -webkit-font-smoothing: antialiased; }
    body { max-width: 720px; margin: 0 auto; padding: 2rem 1.5rem 6rem; }

    nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0 3rem; border-bottom: 1px solid var(--s2); margin-bottom: 3rem; }
    .nav-logo { font-size: 1.2rem; font-weight: 800; letter-spacing: -.03em; text-decoration: none; color: var(--text); }
    .nav-cta { font-size: .6rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--text); border: 1px solid var(--s2); padding: .5rem 1rem; text-decoration: none; transition: border-color .2s; }
    .nav-cta:hover { border-color: var(--accent); }

    .meta { font-size: .6rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.5rem; }
    h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.1; margin-bottom: 1.5rem; }

    h2 { font-size: 1.4rem; font-weight: 800; letter-spacing: -.03em; margin: 2.5rem 0 1rem; }
    h2 span { color: var(--accent); }
    p { font-size: .95rem; font-weight: 300; line-height: 1.8; color: rgba(250,250,250,.85); margin-bottom: 1rem; }
    strong { font-weight: 700; color: var(--text); }
    .intro { font-size: 1rem; font-weight: 300; color: rgba(250,250,250,.8); line-height: 1.75; margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 1px solid var(--s2); }
    .example { background: var(--s1); border-left: 2px solid var(--accent); padding: 1rem 1.25rem; margin: 1rem 0 1.5rem; font-size: .85rem; line-height: 1.7; color: var(--muted); }
    .example strong { color: var(--accent); font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; display: block; margin-bottom: .5rem; }

    .cta-box { background: var(--s1); padding: 2rem; margin: 3rem 0; border: 1px solid var(--s2); }
    .cta-box h3 { font-size: 1.1rem; font-weight: 800; letter-spacing: -.02em; margin-bottom: .75rem; }
    .cta-box p { font-size: .85rem; margin-bottom: 1.25rem; }
    .cta-btn { display: inline-block; background: var(--accent); color: var(--text); font-size: .6rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; padding: .75rem 1.5rem; text-decoration: none; transition: opacity .2s; }
    .cta-btn:hover { opacity: .85; }

    footer { border-top: 1px solid var(--s2); padding-top: 2rem; margin-top: 4rem; display: flex; justify-content: space-between; align-items: center; }
    footer a { font-size: .65rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); text-decoration: none; }
    footer a:hover { color: var(--text); }
  </style>
</head>
<body>

<nav>
  <a href="https://irbis.com.br" class="nav-logo">IRBIS.</a>
  <a href="https://irbis.com.br/#contato" class="nav-cta">Falar sobre o meu site →</a>
</nav>

<article>

  <p class="meta">Nicolas Cunha · IRBIS · {{DATE_HUMAN}} · {{READING_MIN}} min de leitura</p>

  <h1>{{TITLE}}</h1>

  {{BODY_HTML}}

</article>

<footer>
  <a href="https://irbis.com.br">← Voltar para irbis.com.br</a>
  <a href="https://irbis.com.br/#contato">Iniciar projeto</a>
</footer>

</body>
</html>
```

- [ ] **Step 2: Criar `posts.json` com o post existente**

Create `site/blog/posts.json`:

```json
{
  "posts": [
    {
      "slug": "erros-site-startup",
      "title": "7 Erros de Site que Afastam Clientes antes da Primeira Conversa",
      "description": "Auditei 13 sites de startups brasileiras em uma semana. Os mesmos erros aparecem em quase todos. Veja o que está custando leads antes de você perceber.",
      "dateISO": "2026-06-01",
      "pilar": "erros-de-site",
      "keywords": ["erros de site startup", "webdesign para startup", "landing page que converte", "site para founder", "CRO startup brasil"],
      "coverImage": null,
      "readingTimeMin": 6
    }
  ]
}
```

- [ ] **Step 3: Validar o JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('site/blog/posts.json', 'utf8')); console.log('JSON válido')"`
Expected: `JSON válido`

- [ ] **Step 4: Commit**

```bash
git add site/blog/_template-post.html site/blog/posts.json
git commit -m "feat(blog): template de post e posts.json (seed com o post existente)"
git push origin main
```

---

## Task 4: `scripts/blog/render.mjs` — funções puras (TDD)

**Files:**
- Create: `scripts/blog/render.mjs`
- Test: `scripts/blog/render.test.mjs`

**Interfaces:**
- Consumes: template de `site/blog/_template-post.html` (Task 3), formato de `posts.json` (Task 3).
- Produces: funções exportadas `stripHtml(html)`, `estimateReadingMinutes(bodyHtml)`, `formatDateHuman(dateISO)`, `renderPostHtml(post, templateStr)`, `renderIndexHtml(posts)`, `sitemapEntryXml(slug, dateISO)`, `addSitemapEntry(sitemapXml, slug, dateISO)`, `llmsTxtWithBlogSection(llmsTxt, posts)` — usadas pelo Task 5 (CLI/I-O) e indiretamente pelo Task 7 (rotina).

- [ ] **Step 1: Escrever os testes (vão falhar — o arquivo ainda não existe)**

Create `scripts/blog/render.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  stripHtml,
  estimateReadingMinutes,
  formatDateHuman,
  renderPostHtml,
  renderIndexHtml,
  sitemapEntryXml,
  addSitemapEntry,
  llmsTxtWithBlogSection,
} from './render.mjs';

test('stripHtml remove tags e normaliza espaços', () => {
  const html = '<p>Olá   <strong>mundo</strong></p>\n<p>de novo</p>';
  assert.equal(stripHtml(html), 'Olá mundo de novo');
});

test('estimateReadingMinutes arredonda pra cima com mínimo de 1 minuto', () => {
  const shortBody = '<p>' + 'palavra '.repeat(10) + '</p>';
  assert.equal(estimateReadingMinutes(shortBody), 1);

  const longBody = '<p>' + 'palavra '.repeat(410) + '</p>';
  assert.equal(estimateReadingMinutes(longBody), 3); // ceil(410/200) = 3
});

test('formatDateHuman formata data ISO em pt-BR abreviado', () => {
  assert.equal(formatDateHuman('2026-07-08'), '08 jul 2026');
  assert.equal(formatDateHuman('2026-01-01'), '01 jan 2026');
});

test('renderPostHtml substitui todos os placeholders', () => {
  const template = `<title>{{TITLE}}</title><meta name="description" content="{{DESCRIPTION}}"><link rel="canonical" href="https://irbis.com.br/blog/{{SLUG}}"><span>{{DATE_HUMAN}} · {{READING_MIN}} min</span><span>{{ARTICLE_SECTION}}</span><meta name="keywords" content="{{KEYWORDS}}"><meta property="og:image" content="https://irbis.com.br{{COVER_IMAGE_PATH}}"><article>{{BODY_HTML}}</article>`;
  const post = {
    slug: 'teste-post',
    title: 'Título de Teste',
    description: 'Descrição de teste.',
    dateISO: '2026-07-08',
    pilar: 'erros-de-site',
    keywords: ['a', 'b'],
    coverImage: '/blog/assets/covers/erros-site-01.png',
    bodyHtml: '<p>Corpo do post.</p>',
  };
  const html = renderPostHtml(post, template);
  assert.match(html, /<title>Título de Teste<\/title>/);
  assert.match(html, /blog\/teste-post/);
  assert.match(html, /08 jul 2026 · 1 min/);
  assert.match(html, /Erros de Site/);
  assert.match(html, /content="a, b"/);
  assert.match(html, /erros-site-01\.png/);
  assert.match(html, /<p>Corpo do post\.<\/p>/);
  assert.doesNotMatch(html, /\{\{[A-Z_]+\}\}/);
});

test('renderPostHtml lança erro se sobrar placeholder desconhecido', () => {
  const template = '<title>{{TITLE}}</title><p>{{UNKNOWN_TOKEN}}</p>';
  const post = {
    slug: 'x', title: 'X', description: 'd', dateISO: '2026-07-08',
    pilar: 'erros-de-site', keywords: [], coverImage: null, bodyHtml: '<p>x</p>',
  };
  assert.throws(() => renderPostHtml(post, template), /UNKNOWN_TOKEN/);
});

test('renderIndexHtml lista posts do mais novo pro mais antigo', () => {
  const posts = [
    { slug: 'a', title: 'Post A', description: 'desc a', dateISO: '2026-06-01', readingTimeMin: 5 },
    { slug: 'b', title: 'Post B', description: 'desc b', dateISO: '2026-07-08', readingTimeMin: 3 },
  ];
  const html = renderIndexHtml(posts);
  const posB = html.indexOf('Post B');
  const posA = html.indexOf('Post A');
  assert.ok(posB < posA, 'Post B (mais recente) deve aparecer antes de Post A');
  assert.match(html, /href="\/blog\/a"/);
  assert.match(html, /href="\/blog\/b"/);
});

test('sitemapEntryXml gera bloco com loc e lastmod corretos', () => {
  const xml = sitemapEntryXml('meu-post', '2026-07-08');
  assert.match(xml, /<loc>https:\/\/irbis\.com\.br\/blog\/meu-post<\/loc>/);
  assert.match(xml, /<lastmod>2026-07-08<\/lastmod>/);
});

test('addSitemapEntry adiciona uma vez e é idempotente', () => {
  const base = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n</urlset>';
  const once = addSitemapEntry(base, 'meu-post', '2026-07-08');
  const twice = addSitemapEntry(once, 'meu-post', '2026-07-08');
  const count = (twice.match(/<loc>https:\/\/irbis\.com\.br\/blog\/meu-post<\/loc>/g) || []).length;
  assert.equal(count, 1);
});

test('llmsTxtWithBlogSection adiciona seção Blog antes de Contato e é idempotente', () => {
  const base = '# IRBIS\n\n## Páginas principais\n\n- item\n\n## Contato\n\n- Site: https://irbis.com.br\n';
  const posts = [
    { slug: 'a', title: 'Post A', description: 'desc a', dateISO: '2026-06-01' },
  ];
  const once = llmsTxtWithBlogSection(base, posts);
  assert.match(once, /## Blog\n\n- \[Post A\]\(https:\/\/irbis\.com\.br\/blog\/a\): desc a/);
  const contatoIdx = once.indexOf('## Contato');
  const blogIdx = once.indexOf('## Blog');
  assert.ok(blogIdx < contatoIdx, 'seção Blog deve vir antes de Contato');

  const posts2 = [...posts, { slug: 'b', title: 'Post B', description: 'desc b', dateISO: '2026-07-08' }];
  const twice = llmsTxtWithBlogSection(once, posts2);
  const blogSectionCount = (twice.match(/## Blog/g) || []).length;
  assert.equal(blogSectionCount, 1);
  assert.match(twice, /Post B/);
});
```

- [ ] **Step 2: Rodar os testes e confirmar que falham (módulo não existe ainda)**

Run: `node --test scripts/blog/render.test.mjs`
Expected: falha com erro do tipo `Cannot find module './render.mjs'`.

- [ ] **Step 3: Implementar as funções puras**

Create `scripts/blog/render.mjs`:

```js
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const BLOG_DIR = path.resolve(__dirname, '../../site/blog');
export const POSTS_JSON = path.join(BLOG_DIR, 'posts.json');
export const TEMPLATE_PATH = path.join(BLOG_DIR, '_template-post.html');
export const CONTENT_DIR = path.join(BLOG_DIR, '_content');
export const SITEMAP_PATH = path.resolve(__dirname, '../../site/sitemap.xml');
export const LLMS_PATH = path.resolve(__dirname, '../../site/llms.txt');
export const INDEX_PATH = path.join(BLOG_DIR, 'index.html');

export const PILAR_LABELS = {
  'erros-de-site': 'Erros de Site',
  'hora-de-trocar': 'Hora de Trocar de Site',
  'tendencias': 'Tendências',
  'conversao-cro': 'Conversão / CRO',
  'seo-geo': 'SEO / GEO',
};

export function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function estimateReadingMinutes(bodyHtml) {
  const text = stripHtml(bodyHtml);
  const words = text.length ? text.split(' ').filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDateHuman(dateISO) {
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const [y, m, d] = dateISO.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${months[m - 1]} ${y}`;
}

export function renderPostHtml(post, templateStr) {
  const readingMin = post.readingTimeMin ?? estimateReadingMinutes(post.bodyHtml);
  const replacements = {
    '{{TITLE}}': post.title,
    '{{DESCRIPTION}}': post.description,
    '{{SLUG}}': post.slug,
    '{{DATE_ISO}}': post.dateISO,
    '{{DATE_HUMAN}}': formatDateHuman(post.dateISO),
    '{{READING_MIN}}': String(readingMin),
    '{{ARTICLE_SECTION}}': PILAR_LABELS[post.pilar] ?? post.pilar,
    '{{KEYWORDS}}': post.keywords.join(', '),
    '{{COVER_IMAGE_PATH}}': post.coverImage ?? '/Design/og-image.png',
    '{{BODY_HTML}}': post.bodyHtml,
  };
  let html = templateStr;
  for (const [token, value] of Object.entries(replacements)) {
    html = html.split(token).join(value);
  }
  const leftover = html.match(/\{\{[A-Z_]+\}\}/);
  if (leftover) {
    throw new Error(`Placeholder não substituído no template: ${leftover[0]}`);
  }
  return html;
}

export function renderIndexHtml(posts) {
  const sorted = [...posts].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  const items = sorted.map((p, i) => {
    const idx = String(i + 1).padStart(2, '0');
    const readingMin = p.readingTimeMin ?? estimateReadingMinutes(p.bodyHtml ?? '');
    return `    <a class="post-item" href="/blog/${p.slug}">
      <span class="post-idx">${idx}</span>
      <div class="post-body">
        <h2 class="post-name">${p.title}</h2>
        <p class="post-desc">${p.description}</p>
        <span class="post-meta">${formatDateHuman(p.dateISO)} · ${readingMin} min de leitura</span>
      </div>
      <svg class="post-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 12H20M20 12L13 5M20 12L13 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>`;
  }).join('\n\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | IRBIS</title>
  <meta name="description" content="Conteúdo sobre criação de site, conversão e presença digital — para quem decide sobre o site do próprio negócio.">
  <link rel="canonical" href="https://irbis.com.br/blog">
  <link rel="icon" href="/Design/icone/favicon_true.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #0C0C0E; --text: #FAFAFA; --muted: #71717A; --accent: #FF6600; --s1: #18181B; --s2: #27272A; --f: 'Sora', sans-serif; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { background: var(--bg); color: var(--text); font-family: var(--f); -webkit-font-smoothing: antialiased; }
    body { max-width: 760px; margin: 0 auto; padding: 2rem 1.5rem 6rem; }
    nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0 3rem; border-bottom: 1px solid var(--s2); margin-bottom: 3rem; }
    .nav-logo { font-size: 1.2rem; font-weight: 800; letter-spacing: -.03em; text-decoration: none; color: var(--text); }
    .nav-cta { font-size: .6rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--text); border: 1px solid var(--s2); padding: .5rem 1rem; text-decoration: none; transition: border-color .2s; }
    .nav-cta:hover { border-color: var(--accent); }
    h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; letter-spacing: -.04em; margin-bottom: 3rem; }
    .post-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.75rem 0; border-bottom: 1px solid var(--s2); text-decoration: none; color: var(--text); transition: opacity .2s; }
    .post-item:hover { opacity: .7; }
    .post-idx { font-size: .7rem; font-weight: 700; color: var(--muted); flex-shrink: 0; }
    .post-body { flex: 1; }
    .post-name { font-size: 1.1rem; font-weight: 800; letter-spacing: -.02em; margin-bottom: .4rem; }
    .post-desc { font-size: .85rem; font-weight: 300; color: rgba(250,250,250,.7); line-height: 1.6; margin-bottom: .5rem; }
    .post-meta { font-size: .6rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
    .post-arrow { flex-shrink: 0; color: var(--muted); }
  </style>
</head>
<body>

<nav>
  <a href="https://irbis.com.br" class="nav-logo">IRBIS.</a>
  <a href="https://irbis.com.br/#contato" class="nav-cta">Falar sobre o meu site →</a>
</nav>

<h1>Blog</h1>

<div class="posts">
${items}
</div>

</body>
</html>
`;
}

export function sitemapEntryXml(slug, dateISO) {
  const loc = `https://irbis.com.br/blog/${slug}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${dateISO}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
  </url>`;
}

export function addSitemapEntry(sitemapXml, slug, dateISO) {
  const loc = `https://irbis.com.br/blog/${slug}`;
  if (sitemapXml.includes(`<loc>${loc}</loc>`)) {
    return sitemapXml;
  }
  const entry = sitemapEntryXml(slug, dateISO);
  return sitemapXml.replace('</urlset>', `${entry}\n\n</urlset>`);
}

export function llmsTxtWithBlogSection(llmsTxt, posts) {
  const sorted = [...posts].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  const lines = sorted.map(p => `- [${p.title}](https://irbis.com.br/blog/${p.slug}): ${p.description}`);
  const section = `## Blog\n\n${lines.join('\n')}\n`;
  const sectionRegex = /## Blog\n\n[\s\S]*?(?=\n## |\n?$)/;
  if (sectionRegex.test(llmsTxt)) {
    return llmsTxt.replace(sectionRegex, section);
  }
  const contatoIdx = llmsTxt.indexOf('## Contato');
  if (contatoIdx === -1) {
    return `${llmsTxt.trimEnd()}\n\n${section}\n`;
  }
  return `${llmsTxt.slice(0, contatoIdx)}${section}\n${llmsTxt.slice(contatoIdx)}`;
}

export function loadPosts() {
  const data = JSON.parse(readFileSync(POSTS_JSON, 'utf8'));
  return data.posts;
}

export function savePosts(posts) {
  writeFileSync(POSTS_JSON, JSON.stringify({ posts }, null, 2) + '\n', 'utf8');
}

export function regenerateAggregates(posts) {
  writeFileSync(INDEX_PATH, renderIndexHtml(posts), 'utf8');
  let sitemap = readFileSync(SITEMAP_PATH, 'utf8');
  for (const p of posts) {
    sitemap = addSitemapEntry(sitemap, p.slug, p.dateISO);
  }
  writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  const llms = readFileSync(LLMS_PATH, 'utf8');
  writeFileSync(LLMS_PATH, llmsTxtWithBlogSection(llms, posts), 'utf8');
}

export function publishPost(slug) {
  const posts = loadPosts();
  const post = posts.find(p => p.slug === slug);
  if (!post) {
    throw new Error(`Post "${slug}" não encontrado em posts.json`);
  }
  const contentPath = path.join(CONTENT_DIR, `${slug}.html`);
  if (!existsSync(contentPath)) {
    throw new Error(`Conteúdo não encontrado: ${contentPath}`);
  }
  const bodyHtml = readFileSync(contentPath, 'utf8');
  const templateStr = readFileSync(TEMPLATE_PATH, 'utf8');
  const readingTimeMin = estimateReadingMinutes(bodyHtml);

  const postHtml = renderPostHtml({ ...post, bodyHtml, readingTimeMin }, templateStr);
  writeFileSync(path.join(BLOG_DIR, `${slug}.html`), postHtml, 'utf8');

  post.readingTimeMin = readingTimeMin;
  savePosts(posts);
  regenerateAggregates(posts);

  return { postPath: path.join(BLOG_DIR, `${slug}.html`) };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Uso: node scripts/blog/render.mjs <slug> | --reindex');
    process.exit(1);
  }
  try {
    if (arg === '--reindex') {
      regenerateAggregates(loadPosts());
      console.log('OK: index.html, sitemap.xml e llms.txt atualizados');
    } else {
      const { postPath } = publishPost(arg);
      console.log(`OK: ${postPath}`);
    }
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}
```

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `node --test scripts/blog/render.test.mjs`
Expected: todas as linhas `✔` (pass), 0 falhas, saída final tipo `# pass 9` (uma por `test(...)` declarado).

- [ ] **Step 5: Commit**

```bash
git add scripts/blog/render.mjs scripts/blog/render.test.mjs
git commit -m "feat(blog): funções puras de renderização (TDD) em render.mjs"
git push origin main
```

---

## Task 5: Gerar `index.html` inicial a partir do post existente

**Files:**
- Create: `site/blog/index.html` (gerado pelo script, não escrito à mão)
- Modify: `site/sitemap.xml` (entrada nova adicionada pelo script)
- Modify: `site/llms.txt` (seção `## Blog` adicionada pelo script)

**Interfaces:**
- Consumes: `regenerateAggregates(posts)` e `loadPosts()` de `scripts/blog/render.mjs` (Task 4), `posts.json` seedado (Task 3).
- Produces: `site/blog/index.html` navegável, `sitemap.xml` e `llms.txt` com a entrada do post existente — essa é a saída que o Task 7 (rotina) vai atualizar a cada novo post.

- [ ] **Step 1: Rodar o modo `--reindex`**

Run: `node scripts/blog/render.mjs --reindex`
Expected: `OK: index.html, sitemap.xml e llms.txt atualizados`

- [ ] **Step 2: Verificar que `index.html` foi criado e lista o post existente**

Run: `grep -o 'href="/blog/erros-site-startup"' site/blog/index.html`
Expected: `href="/blog/erros-site-startup"`

- [ ] **Step 3: Verificar que a entrada nova está no sitemap**

Run: `grep -c '<loc>https://irbis.com.br/blog/erros-site-startup</loc>' site/sitemap.xml`
Expected: `1`

- [ ] **Step 4: Verificar que a seção Blog está no llms.txt**

Run: `grep -A 2 '^## Blog' site/llms.txt`
Expected: linha `## Blog` seguida de linha em branco e depois `- [7 Erros de Site que Afastam Clientes antes da Primeira Conversa](https://irbis.com.br/blog/erros-site-startup): ...`

- [ ] **Step 5: Rodar `--reindex` de novo e confirmar que é idempotente (sem duplicar nada)**

Run: `node scripts/blog/render.mjs --reindex && grep -c '<loc>https://irbis.com.br/blog/erros-site-startup</loc>' site/sitemap.xml && grep -c '^## Blog' site/llms.txt`
Expected: `1` (sitemap) e `1` (llms.txt) — mesmo depois de rodar duas vezes.

- [ ] **Step 6: Commit**

```bash
git add site/blog/index.html site/sitemap.xml site/llms.txt
git commit -m "feat(blog): gera index.html do blog e sincroniza sitemap/llms.txt"
git push origin main
```

---

## Task 6: Lista de concorrentes bloqueados

**Files:**
- Create: `site/blog/_concorrentes-bloqueados.md`

**Interfaces:**
- Produces: arquivo consultado pela rotina (Task 7) no gate de qualidade "sem concorrente citado".

- [ ] **Step 1: Criar o arquivo**

Create `site/blog/_concorrentes-bloqueados.md`:

```markdown
# Marcas a nunca citar nos posts do blog

Antes de publicar qualquer post, o texto final não pode mencionar nenhum nome desta lista (nem variações óbvias de grafia). Se o rascunho citar algo daqui, reescreva o trecho sem o nome — o conteúdo pode continuar genérico ("algumas plataformas de montar site sozinho...") sem nomear.

## Site-builders / plataformas DIY (tratadas como concorrente direto)

- Webflow
- Wix
- Framer
- WordPress (inclui Elementor, Divi e outros construtores baseados em WordPress)
- Squarespace
- Shopify (quando citado como opção de "monte seu site", não como referência de e-commerce em geral)

## Estúdios, agências e freelancers de criação de site

Adicione aqui, conforme for identificando, qualquer estúdio/agência/freelancer que compita pelo mesmo tipo de cliente da IRBIS (founders e donos de negócio decidindo sobre o próprio site). Nenhum nome conhecido está registrado ainda — a lista começa vazia e cresce com o tempo.

<!-- adicionar um nome por linha, formato: - Nome da agência/estúdio -->
```

- [ ] **Step 2: Commit**

```bash
git add site/blog/_concorrentes-bloqueados.md
git commit -m "feat(blog): lista de marcas bloqueadas pro gate de qualidade da rotina"
git push origin main
```

---

## Task 7: Skill da rotina — `irbis-blog-semanal`

**Files:**
- Create: `.claude/skills/irbis-blog-semanal/SKILL.md`

**Interfaces:**
- Consumes: `site/blog/posts.json`, `site/blog/assets/covers/manifest.json`, `site/blog/_concorrentes-bloqueados.md`, `scripts/blog/render.mjs` (comando `node scripts/blog/render.mjs <slug>`), skill `irbis-brand-voice`, skill `stop-slop`.
- Produces: a rotina em si — este é o "prompt pronto" que o Nicolas vai usar pra configurar a routine agendada no app.

- [ ] **Step 1: Criar a skill**

Create `.claude/skills/irbis-blog-semanal/SKILL.md`:

```markdown
---
name: irbis-blog-semanal
description: "Rotina semanal que pesquisa, escreve e publica um post novo no blog da IRBIS (site/blog/), sem revisão humana antes do ar. Use quando disparado pela routine agendada, ou quando o Nicolas pedir manualmente pra rodar uma edição do blog."
---

# IRBIS — Rotina Semanal do Blog

Você vai pesquisar, escrever e publicar **um post novo** no blog da IRBIS (`site/blog/`), sozinho, sem pedir aprovação antes de publicar. Siga os passos nesta ordem. Se qualquer gate do Passo 4 falhar, tente no máximo mais uma vez (pauta ou redação diferente) antes de desistir da semana — nunca publique algo que não passou nos gates.

## Passo 0 — Preparar o ambiente

1. Garanta que está na branch `main`, atualizada: `git pull origin main`.
2. Leia `site/blog/posts.json` — isso é o histórico de tudo que já foi publicado.

## Passo 1 — Escolher a pauta

1. Pilares fixos: `erros-de-site`, `hora-de-trocar`, `tendencias`, `conversao-cro`, `seo-geo`.
2. Conte quantos posts de cada pilar existem em `posts.json` e olhe a data do último post de cada um. Escolha o pilar com o post mais antigo (ou nenhum post ainda).
3. Dentro do pilar escolhido, defina um ângulo específico que **não se repete** com nenhum post dos últimos ~2 meses (compare títulos/descrições em `posts.json`).
4. Público-alvo do post: founders e donos de negócio decidindo sobre o site da própria empresa — não escreva para outros desenvolvedores/designers.

## Passo 2 — Pesquisar sinal real

1. Busque notícias, dados e mudanças recentes (últimos ~30 dias, se possível) relacionadas ao ângulo escolhido, usando busca web disponível (Firecrawl ou WebSearch).
2. Anote as fontes e os números/fatos específicos encontrados — você só pode citar estatística que veio de uma fonte real desta busca.
3. Se a busca não trouxer nenhum sinal confiável e verificável, **não invente dado**. Escreva o post em tom observacional/instrutivo (baseado em padrão conhecido do mercado, sem número específico) em vez de citar estatística fantasma.

## Passo 3 — Redigir

1. Invoque a skill `irbis-brand-voice` antes de escrever — siga o Manual de Copy da marca (tom direto, sem travessão, sem clichê de IA).
2. Escreva **só o corpo do artigo** (do parágrafo de abertura até a caixa de CTA final) como um fragmento HTML — nada de `<html>`, `<head>`, `<nav>` ou `<h1>` (isso o template já cuida). Use as classes já existentes no template: `.intro` pro parágrafo/bloco de abertura, `<h2><span>0N</span> — Título</h2>` pra cada seção, `.example` pra caixas de destaque com dado/exemplo, `.cta-box` com um `<a class="cta-btn" href="https://wa.me/5519991591265?text=...">` no final.
3. Inclua pelo menos **um link interno contextual** dentro do corpo do texto (não no CTA final) apontando pra página do site mais relevante ao tema do post — ex.: um post sobre CRO linka pra `https://irbis.com.br/#servicos` ou pra um case relevante em `https://irbis.com.br/cases`; um post sobre "hora de trocar de site" pode linkar pro `https://irbis.com.br/metodo`. Use `<a href="...">texto âncora</a>` dentro de um `<p>` já existente, sem forçar um parágrafo só pra isso.
4. Salve esse fragmento em `site/blog/_content/<slug>.html`, onde `<slug>` é um slug novo, curto, em kebab-case, sem acento, coerente com o título (ex.: `sinais-hora-trocar-site`).
5. Escolha uma capa: abra `site/blog/assets/covers/manifest.json`, pegue uma imagem do pool do pilar escolhido que ainda não está na lista `used`; se o pool do pilar estiver esgotado, use o pool `geral`. Anote o caminho (ex.: `/blog/assets/covers/erros-site-02.png`) — isso vai virar `coverImage` no Passo 5. Depois de publicar, adicione o nome do arquivo escolhido à lista `used` do manifest e commit essa mudança junto.

## Passo 4 — Gates de qualidade (bloqueiam a publicação se falharem)

Confira cada item abaixo no fragmento HTML que você escreveu:

1. **Sem concorrente citado** — abra `site/blog/_concorrentes-bloqueados.md` e confirme que nenhum nome de lá aparece no texto (nem variação óbvia de grafia).
2. **Sem estatística inventada** — todo número citado tem que vir da pesquisa do Passo 2. Se não tiver certeza da origem de um número que você escreveu, reescreva sem ele.
3. **Sem clichê de IA** — rode a skill `stop-slop` sobre o texto e aplique as correções sugeridas.
4. **Pauta não repetida** — reconfirme que o ângulo não bate com nenhum post dos últimos ~2 meses em `posts.json`.
5. **HTML válido** — o fragmento não pode ter tags não fechadas; todo link (`href="https://..."`) tem que apontar pra um domínio real (irbis.com.br ou wa.me).

Se **qualquer** item falhar: ajuste a pauta ou a redação e repita os Passos 1–4 mais uma vez. Se falhar de novo, pare aqui, não publique, e vá direto pro Passo 6 (notificação) explicando o motivo do abort — não execute o Passo 5.

## Passo 5 — Gerar e publicar

1. Adicione a entrada nova em `site/blog/posts.json` (dentro do array `posts`), preenchendo `slug`, `title`, `description` (1-2 frases, sem clichê), `dateISO` (data de hoje, formato `YYYY-MM-DD`), `pilar`, `keywords` (4-6 termos), `coverImage` (caminho do Passo 3.4), e `readingTimeMin: null` (o script recalcula sozinho).
2. Rode: `node scripts/blog/render.mjs <slug>` — isso gera `site/blog/<slug>.html`, atualiza `site/blog/index.html`, `site/sitemap.xml` e `site/llms.txt`.
3. Confira a saída do comando: se der `Erro: ...`, corrija o problema apontado (geralmente `posts.json` malformado ou arquivo de conteúdo faltando) antes de continuar.
4. Marque a imagem de capa escolhida como usada em `site/blog/assets/covers/manifest.json` (adicione o nome do arquivo à lista `used`).
5. Commit e push:
   ```bash
   git add site/blog/posts.json site/blog/_content/<slug>.html site/blog/<slug>.html site/blog/index.html site/sitemap.xml site/llms.txt site/blog/assets/covers/manifest.json
   git commit -m "feat(blog): publica post semanal — <título curto>"
   git push origin main
   ```
6. O push em `main` dispara o deploy automático na Vercel (Git Integration) — não rode `vercel deploy` manualmente.

## Passo 6 — Notificar

Envie uma notificação curta pro Nicolas:
- Se publicou: título do post + `https://irbis.com.br/blog/<slug>`.
- Se abortou: qual gate falhou e por quê, sem publicar nada.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/irbis-blog-semanal/SKILL.md
git commit -m "feat(blog): skill da rotina semanal (irbis-blog-semanal)"
git push origin main
```

---

## Task 8: Dry run ponta-a-ponta com um post real

**Files:**
- Create: `site/blog/_content/<slug-do-primeiro-post>.html` (conteúdo real, escrito seguindo o Passo 3 da skill)
- Modify: `site/blog/posts.json` (nova entrada)
- Create: `site/blog/<slug-do-primeiro-post>.html` (gerado pelo script)
- Modify: `site/blog/index.html`, `site/sitemap.xml`, `site/llms.txt`, `site/blog/assets/covers/manifest.json`

**Interfaces:**
- Consumes: tudo dos Tasks 1–7.
- Produces: o primeiro post gerado pela rotina de verdade — prova de que o pipeline funciona ponta a ponta antes do Nicolas ligar o cron semanal.

> Este task só deve rodar depois que o Nicolas confirmar que quer ver o pipeline publicando um post de verdade. **Pausar e confirmar antes do Step 6 (push)** — mesma lógica do Task 1: é a primeira vez que o pipeline completo vai ao ar sozinho.

- [ ] **Step 1: Rodar a skill `irbis-blog-semanal` manualmente**

Invocar a skill (`Skill: irbis-blog-semanal`) e deixá-la executar os Passos 0 a 4 (pesquisa, redação, gates) — sem pular etapa.

- [ ] **Step 2: Verificar que o fragmento de conteúdo existe e passou nos gates**

Run: `ls site/blog/_content/`
Expected: um arquivo `<slug>.html` novo (além de nenhum outro, já que é o primeiro).

Conferir manualmente (leitura humana) que nenhum nome de `site/blog/_concorrentes-bloqueados.md` aparece no arquivo gerado.

- [ ] **Step 3: Rodar a geração**

Run: `node scripts/blog/render.mjs <slug>`
Expected: `OK: /Users/nicolascunha/Projects/Business/irbis/site/blog/<slug>.html`

- [ ] **Step 4: Rodar os testes automatizados de novo, pra garantir que nada quebrou**

Run: `node --test scripts/blog/render.test.mjs`
Expected: todas `✔`, 0 falhas.

- [ ] **Step 5: Revisar o HTML gerado localmente**

Run: `npx serve site -l 3002` (ou reaproveitar o servidor já configurado em `.claude/launch.json`), abrir `http://localhost:3002/blog/<slug>.html` e `http://localhost:3002/blog/index.html` no navegador, conferir visualmente que título, texto, CTA e capa aparecem corretos.

- [ ] **Step 6: Checkpoint — confirmar com o Nicolas antes do push**

Mostrar o post gerado e pedir confirmação explícita antes de publicar em produção pela primeira vez.

- [ ] **Step 7: Commit e push**

```bash
git add site/blog/posts.json site/blog/_content/<slug>.html site/blog/<slug>.html site/blog/index.html site/sitemap.xml site/llms.txt site/blog/assets/covers/manifest.json
git commit -m "feat(blog): primeiro post gerado pela rotina automática"
git push origin main
```

- [ ] **Step 8: Confirmar o deploy e o ar**

Esperar o deployment aparecer como "Ready" no dashboard da Vercel, depois checar `https://irbis.com.br/blog/<slug>` e `https://irbis.com.br/blog` ao vivo.

---

## Depois deste plano

Com os 8 tasks concluídos, o pipeline está pronto pra ser chamado sob demanda (`Skill: irbis-blog-semanal`) ou agendado como routine semanal pelo Nicolas no app do Claude — isso fica fora do escopo deste plano, por decisão dele durante o brainstorming.
