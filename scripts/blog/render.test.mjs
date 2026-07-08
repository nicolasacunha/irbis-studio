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
