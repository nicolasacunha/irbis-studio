# Auditoria do site irbis.com.br — 13/jul/2026

Auditoria técnica + conversão do site (estático, servido pela Vercel). Feita por leitura do código em `site/` e do site no ar. Separa o que já foi corrigido, o que é técnico-seguro, e o que **depende de decisão sua**.

## ✅ Corrigido nesta rodada (commitado, requer deploy para valer no ar)
- **`og:image` faltante** em `vs-agencia.html` (tinha og:title/description mas nenhuma imagem) e no `blog/index.html` (sem nenhuma og tag). Compartilhamentos dessas páginas no WhatsApp/LinkedIn saíam sem imagem. Adicionado og:image + twitter card reusando `Design/og-image.png`. Commit `8cd4d7e`.

## 🟢 Saudável (verificado, nada a fazer)
- Site no ar e carregando.
- **CTAs corretos**: Calendly (`nicolas-cunhan-aluno/30min`) e WhatsApp (`wa.me/5519991591265`) reais; **nenhum botão quebrado** (`#`/`#!`) — ao contrário de vários sites dos prospects.
- **Links internos da home**: todos resolvem (blog, cases-hub, metodo, sobre, vs-agencia, /para/saas, /para/startups).
- Prova social no ar = **"+350k em vendas"** (E-Force) — o único número afirmável. Sem "+500" nem "1,8x" no site. ✓
- SEO das páginas principais: title + description + canonical presentes (index, metodo, sobre, founder, manifesto). `obrigado.html` corretamente com `noindex`.

## 🟡 Decisões suas (não mexi — travadas por guardrail)
| Item | Estado no ar | Por que travei |
|---|---|---|
| **Hero da home** | "O site que seu negócio merece ter." | Diverge do hero aprovado no brand-context ("BRANDING? NÃO / APP? NÃO / SITE? SIM"). A skill manda travar a home até você decidir qual vale. |
| **Preço** | "Landing page a partir de R$3k" | Copy aprovado (§08) diz "a partir de R$5k". Conflito aberto — não publico/edito nenhum dos dois sem sua decisão. |
| **Case Adash** | Listado entre as marcas | Adash é case fictício; a remoção do site está pendente da sua decisão. Não removi. |
| **"3 sem. do briefing ao ar"** | Afirmado no hero/prova | A skill marca "3 semanas de média" como **sem confirmação** (processo real seria 3–4 sem). Confirme antes de manter como promessa pública. |

## 🔵 Melhorias técnicas sugeridas (baixo risco, pra sua aprovação antes de eu aplicar)
- **Cor de acento divergente**: o `blog/index.html` usa `--accent: #FF6600`; o brand guide define `--signal: #FF3D00`. Padronizar para o token da marca (a menos que o laranja mais claro do blog seja intencional).
- **Handle do Calendly** `nicolas-cunhan-aluno`: o "aluno" no link (herança do e-mail acadêmico) aparece pro prospect ao agendar. Um handle limpo (ex.: `irbis` ou `nicolas`) passa mais profissional. Troca é no Calendly, não no código.
- **Pricing pouco específico** (fraqueza de conversão apontada na auditoria no ar): só landing tem valor; institucional/e-commerce ficam "sob escopo", o que adiciona atrito. Isso conecta à decisão de preço acima — vale resolver junto.

## Nota de segurança (já reportada)
- O repo `nicolasacunha/irbis-studio` é **público**. O `brand-context`, posicionamento e funil já estão expostos no `origin`. Os dossiês de prospecção com dados de terceiros (telefones, perfis) estão **só locais** e não devem ir para lá enquanto o repo for público. Recomendação: tornar o repo privado antes de sincronizar.
- `site/.env.local` (token OIDC da Vercel) **não** está rastreado no git — sem vazamento. ✓
