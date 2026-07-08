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

1. Adicione a entrada nova em `site/blog/posts.json` (dentro do array `posts`), preenchendo `slug`, `title`, `description` (1-2 frases, sem clichê), `dateISO` (data de hoje, formato `YYYY-MM-DD`), `pilar`, `keywords` (4-6 termos), `coverImage` (caminho do Passo 3.5), e `readingTimeMin: null` (o script recalcula sozinho).
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
