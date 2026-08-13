# Blog automático semanal (SEO/GEO) — Design

Data: 2026-07-08

## Objetivo

Um blog no site da IRBIS que se atualiza sozinho, uma vez por semana, com conteúdo sobre o universo de "ter/trocar de site" voltado para o público que a IRBIS atende (founders e donos de negócio decidindo sobre o próprio site) — para ganhar presença em buscadores (SEO) e ser citado por IAs de busca (GEO). Não é um canal de conteúdo para navegação humana em destaque: fica indexado e linkado, mas fora do menu principal.

A geração e publicação do post é feita por uma rotina do Claude Code, sem revisão humana antes de ir ao ar (fully autonomous), com checks de qualidade automáticos como gate de segurança.

## Não-objetivos

- Não é uma reformulação do blog em CMS/headless. Continua HTML estático, seguindo o padrão do resto do site.
- Não inclui geração de imagem de capa customizada nesta primeira versão (ver seção "Imagem do post").
- Não inclui ativação do cron semanal em si — isso fica a cargo do Nicolas, via routines do app Claude. Este projeto entrega a rotina pronta para ser invocada (manualmente ou por schedule).
- Não deploya nada além do necessário para o blog funcionar (rewrites, script, template, dados). Não migra o resto do site para o novo fluxo de deploy além do necessário (ver "Mudança de fluxo de deploy").

## Mudança de fluxo de deploy (afeta todo o site, não só o blog)

Hoje: repositório só local (sem remote), deploy manual via `vercel deploy --prod` a partir da working directory — o que sobe inclusive arquivos não commitados (risco real, quase aconteceu numa sessão anterior).

Novo:
- Repositório sobe para o GitHub (privado).
- Projeto Vercel (`irbis-studio`) conecta nesse repositório via Git Integration, branch de produção = `main`. Todo push em `main` builda e publica sozinho.
- A rotina do blog clona o repositório, mexe apenas em arquivos do blog, commita e dá push direto em `main` (sem branch própria — baixo risco de conflito porque o escopo de arquivos tocados é isolado).
- Deploys manuais do Nicolas passam a ser via `git push`, não mais via `vercel deploy` direto na working directory. Isso é mais seguro que o fluxo atual: só vai ao ar o que estiver commitado.

## Arquitetura da rotina

```
[Cron semanal — configurado pelo Nicolas via routines do app]
        │
        ▼
[Rotina "irbis-blog-semanal" — cloud agent]
        │
        ├─ 1. Escolher pauta (posts.json → pilar menos usado)
        ├─ 2. Pesquisar sinal real (Firecrawl/web search, últimos ~30 dias)
        ├─ 3. Redigir (irbis-brand-voice + Manual de Copy)
        ├─ 4. Checks de qualidade (gate — ver abaixo)
        │      │
        │      ├─ falhou → tenta nova pauta/redação (máx. 2 tentativas totais)
        │      └─ falhou de novo → aborta a semana, notifica Nicolas com o motivo, não publica
        │
        ├─ 5. Gerar página (scripts/blog/render.mjs — template fixo, não HTML feito à mão)
        ├─ 6. git commit + git push origin main (Vercel builda e publica)
        └─ 7. Notificar Nicolas (título + link do post publicado)
```

## Pilares de conteúdo (rotação)

Fixos, um por semana, priorizando o menos usado recentemente:

1. Erros de site que perdem cliente/venda
2. Sinais de que é hora de trocar de site
3. Tendências que mudam a decisão de compra de quem visita um site
4. Conversão / CRO prático
5. SEO/GEO — como aparecer no Google e ser citado pelas IAs de busca

## Checks de qualidade (gate antes de publicar)

Todos precisam passar. Se algum falhar, a rotina tenta gerar pauta/redação alternativa (até 2 tentativas no total); se ainda assim falhar, não publica naquela semana.

1. **Sem concorrente citado** — nenhuma marca da lista em `site/blog/_concorrentes-bloqueados.md` aparece no texto. Essa lista trata como concorrente qualquer estúdio/agência/freelancer de criação de site, e também qualquer site-builder (Webflow, Wix, Framer, WordPress etc.), já que competem pela mesma decisão de compra do cliente da IRBIS. Ferramentas de dados/analytics não-competidoras (ex: Google Search Console) não entram nessa lista.
2. **Sem estatística inventada** — todo número/dado citado precisa vir da pesquisa do passo 2 (rastreável); se a pesquisa não trouxer sinal confiável, o post fica no campo observacional/instrutivo, sem números fabricados.
3. **Passa revisão anti-clichê de IA** (skill `stop-slop`).
4. **HTML e JSON-LD válidos, sem link quebrado** no artigo gerado.
5. **Pauta não repetida** — nem o pilar nem o ângulo específico coincidem com um post dos últimos ~2 meses (checagem contra `posts.json`).

## Estrutura de arquivos

```
site/blog/
  posts.json                    # [{slug, title, description, dateISO, pilar, keywords[], readingTimeMin}]
  index.html                    # listagem simples (título, data, resumo) — gerada/atualizada pelo script
  _template-post.html           # template com placeholders, baseado no post existente
  _concorrentes-bloqueados.md   # lista mantida pelo Nicolas — nomes a nunca citar
  erros-site-startup.html       # post existente, passa a ser o primeiro registro em posts.json
  <slug>.html                   # um arquivo por post novo

scripts/blog/render.mjs         # Node puro (sem dependências externas):
                                 #  - renderiza <slug>.html a partir do template + dados do post
                                 #  - reescreve site/blog/index.html a partir de posts.json
                                 #  - adiciona a URL nova em site/sitemap.xml
                                 #  - atualiza a seção de blog em site/llms.txt

.claude/skills/irbis-blog-semanal/SKILL.md   # instruções completas da rotina, para ser
                                              # invocada manualmente ou por uma routine agendada
```

`site/vercel.json` ganha:
```json
{ "source": "/blog", "destination": "/blog/index.html" },
{ "source": "/blog/(.*)", "destination": "/blog/$1.html" }
```
(mesmo padrão já usado para `/eforce`, `/design` etc. — corrige de quebra a URL canônica do post existente, que hoje aponta para `/blog/erros-site-startup` sem `.html`, algo que não resolve.)

## SEO / GEO

- Cada post mantém o padrão já usado no post existente: `<title>`, meta description, canonical, Open Graph, Twitter card, JSON-LD `Article` (author, publisher, datePublished, articleSection, keywords).
- `sitemap.xml` ganha entrada por post publicado.
- `llms.txt` ganha uma seção "Blog" listando os posts, para crawlers de IA.
- `robots.txt` já libera explicitamente os crawlers de IA relevantes (GPTBot, ClaudeBot, PerplexityBot etc.) — nenhuma mudança necessária aí.
- Internal linking: cada post linka de volta para a página de serviço/case mais relevante ao tema (ex: um post sobre CRO linka pra `#servicos`/landing page), e o rodapé do site já lista posts individualmente — o novo `index.html` do blog passa a ser o hub central.

## Imagem do post

Primeira versão: reaproveita o `og-image.png` genérico do site (zero custo/complexidade extra). Fica registrado como possível evolução futura usar o MCP do Higgsfield para gerar capa única por post — não faz parte deste escopo inicial, pode ser adicionado depois sem mudar a arquitetura (é só mais um campo em `posts.json` + um passo na rotina).

## Notificação

Ao final de cada rodada (publicou ou não), a rotina envia uma notificação curta pro Nicolas: título + link se publicou; motivo do abort se não publicou.

## Riscos / notas à parte (fora de escopo, mas registrados)

- `site/llms.txt` hoje ainda lista o case ADASH, que foi removido das listagens do site numa sessão anterior — inconsistência pré-existente, não relacionada a este projeto. Fica como possível ajuste futuro à parte.
- A rotina depende de as mesmas MCP/skills usadas aqui localmente (Firecrawl, irbis-brand-voice, stop-slop) estarem disponíveis no ambiente do cloud agent quando a routine rodar — a ser validado na primeira execução manual.
