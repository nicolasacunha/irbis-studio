import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const site = path.join(root, 'site');
const blog = path.join(site, 'blog');
const drafts = path.join(root, '00 - IRBIS/05 - Growth/02 - pSEO/drafts');
const postsPath = path.join(blog, 'posts.json');
const articles = [
  {
    slug: 'quanto-custa-automacao-com-ia-para-agencia-de-marketing',
    title: 'Quanto custa automação com IA para agência de marketing?',
    description: 'Entenda o que define o investimento em um Bot de IA para agência de marketing, incluindo escopo, dados e revisão humana.',
    dateISO: '2026-08-14', pilar: 'solucoes-com-ia', readingTimeMin: 7, draftDate: '2026-08-14',
  },
  {
    slug: 'quanto-custa-crm-sob-medida-para-agencia-de-marketing',
    title: 'Quanto custa CRM sob medida para agência de marketing?',
    description: 'Entenda como funil, dados, integrações e regras de acesso definem o investimento em um CRM para agência.',
    dateISO: '2026-08-15', pilar: 'sistemas-ia', readingTimeMin: 7, draftDate: '2026-08-15',
  },
  {
    slug: 'como-automatizar-o-follow-up-comercial-em-agencia-de-marketing',
    title: 'Como automatizar o follow-up comercial em agência de marketing',
    description: 'Organize origem, responsável e próxima ação antes de automatizar o follow-up comercial de uma agência.',
    dateISO: '2026-08-17', pilar: 'solucoes-com-ia', readingTimeMin: 7, draftDate: '2026-08-16',
  },
  {
    slug: 'alternativa-a-planilha-de-follow-up-comercial-para-escritorio-de-advocacia',
    title: 'Alternativa à planilha de follow-up comercial para escritório de advocacia',
    description: 'Estruture responsáveis, próxima ação e revisão humana para substituir a planilha de follow-up comercial do escritório.',
    dateISO: '2026-08-19', pilar: 'sistemas-ia', readingTimeMin: 7, draftDate: '2026-08-19',
  },
];

const labels = { 'solucoes-com-ia': 'Soluções com IA', 'sistemas-ia': 'Sistemas', 'automacao-ia': 'Soluções com IA' };
const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const escape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = (value) => escape(value)
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" rel="noopener noreferrer" target="_blank">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>');
const humanDate = (iso) => { const [year, month, day] = iso.split('-'); return `${day} ${months[Number(month) - 1]} ${year}`; };

function bodyFromMarkdown(markdown, title, imagePath) {
  const blocks = markdown.trim().split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const html = blocks.map((block) => {
    if (block === `# ${title}`) return '';
    if (block.startsWith('## ')) return `<h2>${inline(block.slice(3))}</h2>`;
    if (block.startsWith('### ')) return `<h3>${inline(block.slice(4))}</h3>`;
    return `<p>${inline(block.replace(/\n/g, ' '))}</p>`;
  }).filter(Boolean);
  const firstParagraph = html.findIndex((block) => block.startsWith('<p>'));
  if (firstParagraph >= 0) html[firstParagraph] = html[firstParagraph].replace('<p>', '<p class="intro">');
  html.splice(firstParagraph + 1, 0, `<figure><img src="${imagePath}" alt="${escape(title.toLowerCase().replace(/[?]/g, ''))}"><figcaption>Material editorial sobre ${escape(title.toLowerCase().replace(/[?]/g, ''))}.</figcaption></figure>`);
  html.push('<section class="cta-box"><h3>O follow-up ou o CRM ainda depende de planilha?</h3><p>Conte qual etapa trava hoje. Nicolas avalia o processo, os dados e as regras de revisão antes de definir o próximo passo.</p><a class="cta-btn" href="https://irbis.com.br/#contato">Falar sobre a operação</a></section>');
  return html.join('\n');
}

function renderArticle(article, body, coverImage, keywords) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(article.title)} | IRBIS</title><meta name="description" content="${escape(article.description)}"><link rel="canonical" href="https://irbis.com.br/blog/${article.slug}"><meta property="og:title" content="${escape(article.title)}"><meta property="og:description" content="${escape(article.description)}"><meta property="og:image" content="https://irbis.com.br${coverImage}"><meta property="og:url" content="https://irbis.com.br/blog/${article.slug}"><meta property="og:type" content="article"><meta name="twitter:card" content="summary_large_image"><meta name="author" content="Nicolas Cunha"><meta name="keywords" content="${escape(keywords.join(', '))}"><link rel="icon" type="image/svg+xml" href="/Design/icone/favicon-eye.svg"><link rel="preload" href="/Design/fonts/besley-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/Design/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.description, author: { '@type': 'Person', name: 'Nicolas Cunha', url: 'https://irbis.com.br/sobre' }, publisher: { '@type': 'Organization', name: 'IRBIS', url: 'https://irbis.com.br' }, datePublished: article.dateISO, dateModified: article.dateISO, url: `https://irbis.com.br/blog/${article.slug}`, image: `https://irbis.com.br${coverImage}`, articleSection: labels[article.pilar], keywords: keywords.join(', ') })}</script><style>@font-face{font-family:Besley;src:url('/Design/fonts/besley-latin.woff2')}@font-face{font-family:Archivo;src:url('/Design/fonts/archivo-latin.woff2')}:root{--bg:oklch(.94 .01 92);--ink:oklch(.24 .018 95);--muted:oklch(.47 .018 95);--line:oklch(.83 .014 95);--paper:oklch(.975 .008 92);--sage:oklch(.39 .055 142);--serif:Besley,Georgia,serif;--sans:Archivo,sans-serif}*{box-sizing:border-box}html{background:var(--bg);color:var(--ink);font-family:var(--sans)}body{max-width:760px;margin:0 auto;padding:2rem 1.5rem 6rem}nav,footer{display:flex;justify-content:space-between;align-items:center;gap:1rem}nav{padding:1.5rem 0 3rem;border-bottom:1px solid var(--line);margin-bottom:3rem}.logo{font:800 1.2rem var(--serif);color:var(--ink);text-decoration:none}.nav-cta{font-size:.6875rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);border:1px solid var(--line);padding:.65rem .9rem;text-decoration:none}.meta{font-size:.6875rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin:0 0 1.5rem}h1,h2,h3{font-family:var(--serif)}h1{font-size:clamp(2.2rem,7vw,4rem);line-height:1.02;letter-spacing:-.035em;margin:0 0 1.8rem}h2{font-size:clamp(1.55rem,4vw,2.1rem);line-height:1.15;letter-spacing:-.02em;margin:3.5rem 0 1rem}h3{font-size:1.2rem;margin:2rem 0 .7rem}p{font-size:1rem;line-height:1.8;color:color-mix(in oklch,var(--ink) 87%,var(--bg));margin:.9rem 0}.intro{font-size:1.12rem;line-height:1.75;padding-bottom:2.5rem;border-bottom:1px solid var(--line)}figure{margin:2rem 0 2.75rem}figure img{display:block;width:100%;height:auto;border:1px solid var(--line)}figcaption{font-size:.74rem;line-height:1.5;color:var(--muted);margin-top:.65rem}.cta-box{background:var(--paper);border:1px solid var(--line);padding:2rem;margin:3.5rem 0}.cta-box h3{margin:0 0 .7rem;font-size:1.5rem}.cta-btn{display:inline-block;background:var(--ink);color:var(--paper);font-size:.6875rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:.85rem 1.1rem;text-decoration:none;margin-top:.75rem}a{color:var(--sage);text-underline-offset:.18em}footer{border-top:1px solid var(--line);padding-top:2rem;margin-top:4rem}footer a{font-size:.6875rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none}@media(max-width:480px){body{padding:1rem 1.1rem 4rem}nav{padding:1rem 0 2rem;margin-bottom:2rem}.nav-cta{font-size:.6875rem;padding:.55rem .65rem}h1{font-size:2.3rem}.cta-box{padding:1.2rem}footer{align-items:flex-start;flex-direction:column}}</style></head><body><nav><a class="logo" href="https://irbis.com.br">IRBIS.</a><a class="nav-cta" href="https://irbis.com.br/#contato">Falar sobre a operação</a></nav><article><p class="meta">Nicolas Cunha · IRBIS · ${humanDate(article.dateISO)} · ${article.readingTimeMin} min de leitura</p><h1>${escape(article.title)}</h1>${body}</article><footer><a href="https://irbis.com.br">← Voltar para irbis.com.br</a><a href="https://irbis.com.br/#contato">Iniciar projeto</a></footer></body></html>`;
}

let posts = JSON.parse(readFileSync(postsPath, 'utf8')).posts;
for (const article of articles) {
  const manifest = JSON.parse(readFileSync(path.join(drafts, article.draftDate, `${article.slug}.manifest.json`), 'utf8'));
  const markdown = readFileSync(path.join(drafts, article.draftDate, `${article.slug}.md`), 'utf8');
  const asset = path.join(drafts, article.draftDate, `${article.slug}.svg`);
  const coverImage = `/blog/assets/covers/${article.slug}.svg`;
  copyFileSync(asset, path.join(blog, 'assets/covers', `${article.slug}.svg`));
  const keywords = [manifest.keyword, ...manifest.faq.slice(0, 3).map((faq) => faq.question)];
  writeFileSync(path.join(blog, `${article.slug}.html`), renderArticle(article, bodyFromMarkdown(markdown, article.title, coverImage), coverImage, keywords));
  posts = posts.filter((post) => post.slug !== article.slug);
  posts.unshift({ slug: article.slug, title: article.title, description: article.description, dateISO: article.dateISO, pilar: article.pilar, keywords, coverImage, readingTimeMin: article.readingTimeMin });
}
posts.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
writeFileSync(postsPath, JSON.stringify({ posts }, null, 2) + '\n');
const sitemap = readFileSync(path.join(site, 'sitemap.xml'), 'utf8');
const entries = articles.filter((article) => !sitemap.includes(`/blog/${article.slug}</loc>`)).map((article) => `  <url>\n    <loc>https://irbis.com.br/blog/${article.slug}</loc>\n    <lastmod>${article.dateISO}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.6</priority>\n    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://irbis.com.br/blog/${article.slug}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="https://irbis.com.br/blog/${article.slug}"/>\n  </url>`).join('\n\n');
writeFileSync(path.join(site, 'sitemap.xml'), sitemap.replace('</urlset>', `${entries}\n\n</urlset>`));
const llmsPath = path.join(site, 'llms.txt');
const llms = readFileSync(llmsPath, 'utf8');
const additions = articles
  .filter((article) => !llms.includes(`https://irbis.com.br/blog/${article.slug}`))
  .map((article) => `- [${article.title}](https://irbis.com.br/blog/${article.slug}): ${article.description}`)
  .join('\n');
if (additions) writeFileSync(llmsPath, llms.replace('## Contato', `${additions}\n\n## Contato`));
console.log(`Preparadas ${articles.length} páginas estáticas para publicação.`);
