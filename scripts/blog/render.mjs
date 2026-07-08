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
