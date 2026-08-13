# Dossiê — Matt McGarry / Newsletter Operator (demo de landing de captura)

Data: 13/jul/2026 · Lead Tier 1 da varredura 3 (13/jul) · Skill: irbis-demo-prospect

## Decisor e canal

- **Matt McGarry** — founder da GrowLetter (agência de growth para newsletters), autor da newsletter Newsletter Operator, host do New Media Summit. Greensboro, NC. [Confirmado]
- LinkedIn: https://www.linkedin.com/in/matt-mcgarry (18,4k seguidores) [Confirmado]
- E-mail público: matt@growletter.co (rodapé do growletter.co) [Confirmado]

## A dor nas palavras dele

Post no LinkedIn (≈08/jul/2026, 169 comentários):
> "Looking for a good freelancer who can design and build websites, pages, and newsletters on beehiiv. Comment or DM me if that's you!"

https://www.linkedin.com/posts/matt-mcgarry_looking-for-a-good-freelancer-who-can-design-activity-7480711290580135936-rffM

## Gargalo em dinheiro

A página de captura atual (newsletteroperator.com/subscribe) é o template default do beehiiv: hero centrado + form + 1 linha de lead magnet + 3 depoimentos. Sem edições reais na página, sem logos/empresas dos leitores, sem seção sobre o autor, sem FAQ, sem repetição de CTA. Para quem VENDE growth de newsletter (agência com "Website, funnel and CRO" no cardápio), a própria captura abaixo do padrão que ele recomenda é o gargalo: cada visita do LinkedIn/YouTube que não converte é assinante (e cliente da agência) perdido. E a demanda dele é recorrente: revende páginas para clientes de newsletter.

## Fatos verificados (fonte anotada) — o que PODE ir na página

| Fato | Fonte | Status |
|---|---|---|
| Headline atual: "How to grow and monetize an audience you own" | /subscribe | [Confirmado] |
| Promessa: "The #1 source for newsletter, email marketing, and SMS strategies and tactics that grow your business" | home + /subscribe | [Confirmado] |
| "Trusted by 50,000+ founders, marketers, publishers, and creators" | /subscribe (H2) e og:description | [Confirmado] |
| Lead magnet no signup: guia grátis "how to get your next 1000+ email subscribers in 30 days" | /subscribe | [Confirmado] |
| CTA atual: "Join Free" / placeholder "Your Best Email" | /subscribe | [Confirmado] |
| Depoimento Tim Huelskamp, CEO of 1440 Media ("…level up 1440 to over 4,000,000 subscribers.") | /subscribe | [Confirmado] |
| Depoimento Austin Rief, CEO of Morning Brew ("Matt's newsletter is by far the best resource of all things newsletters.") | /subscribe | [Confirmado] |
| Depoimento Dan Ni, CEO of TLDR ("…best resource I've found for keeping up with the newsletter industry…") | /subscribe | [Confirmado] |
| GrowLetter: "generated over 10,000,000 email subscribers and over $100M in sales for clients in the past 2 years" | growletter.co | [Confirmado] |
| Clientes GrowLetter: The Hustle, 1440 Media, The Milk Road, Bankless, The Rundown AI, The Daily Upside, Chartr, etc. | growletter.co (logos) | [Confirmado] |
| Edições reais (título, URL, read time): "My business earns $200k+ per month…" (13 min), "The 5 Best Newsletter Niches…" (9 min), "First 1,000 Subscribers in 30 Days" (15 min), "Newsletters 3.0" (13 min), "How ONE Book Drove $7M in Sales" (10/jul, 3 min), "I Ranked 20+ Newsletter Growth Tactics…" (8 min) | home (beehiiv) | [Confirmado] |
| Propriedades: newsletteroperator.com, growletter.co, newmediasummit.com, writegrowsell.com | nav da home | [Confirmado] |
| Logo e paleta: laranja #FB8500, fundo #FFFCF9, tinta #000B1B; logo em media.beehiiv.com | branding scrape | [Confirmado] |
| Cadência aos sábados / semanal | só citado em depoimento antigo no growletter.co | [Provável] — NÃO usar na página |

## Pendências a confirmar (com o Matt, na reunião)

- Número atual de assinantes (site diz "50,000+ trusted by" — pode estar defasado; ele decide o claim).
- Cadência de envio (semanal? sábado?) — fora da demo por falta de fonte firme.
- Foto oficial dele para a seção "who writes this" (não usei foto na demo por direitos).
- Form da demo é mock (JS com estado de sucesso); em produção pluga direto na API/embed do beehiiv.
- Lead magnet: confirmar se o guia entregue é a edição "First 1,000 Newsletter Subscribers in 30 Days" ou PDF separado.

## Ângulo comercial (não vai na página)

Relação recorrente: GrowLetter vende "Website, funnel and CRO" para clientes de newsletter. A demo precisa parecer replicável em série (sistema de captura padrão beehiiv elevado), não peça única. Na DM, oferta = essa página para as propriedades dele E como serviço white-label para os clientes da GrowLetter.

## Demo

- Código: `Testes/newsletteroperator/` (estático: index.html + styles.css)
- Deploy: https://newsletteroperator-demo.vercel.app
- Pedido de conexão (já escrito): `03 - Comercial/01 - Prospecção/demos/leva-13jul-prompts-e-outreach.md` §5
- DM principal: gerar quando a conexão for aceita (estrutura PAS da skill)
