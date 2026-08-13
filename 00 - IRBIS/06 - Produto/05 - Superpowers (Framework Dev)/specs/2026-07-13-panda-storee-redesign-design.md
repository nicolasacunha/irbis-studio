# The Panda Storee — Conceito de Redesign (CRO mobile-first)

Cliente: Aksheta Maheshwari · thepandastoree.in · 13/jul/2026

## Contexto verificado (auditoria do site atual)

Loja Shopify no tema Dawn (default), fonte Assistant, botão dourado `#D4AF37`.
Logo panda preto/branco. Catálogo: 250 produtos (bijuterias 18K gold plated,
waterproof, anti-tarnish, skin safe; sets bridal em silver/rose gold; bolsas;
roupas). Preços ₹399–₹5.612, descontos reais até 64%. Presença em Amazon,
Flipkart, AJIO e Myntra.

Fatos de política (fonte: /policies/*):
- Free shipping em pedidos prepaid (Índia); COD disponível (exceto poucos produtos)
- Despacho em 3–5 dias úteis (pre-order: 14–20)
- Sem devolução/troca/reembolso, exceto produto errado ou danificado
  (vídeo de unboxing obrigatório); contato por e-mail/WhatsApp/Instagram
- Envio internacional para 200+ países
- Rating da loja: 4.8 (303 reviews, widget de reviews do Google no site)

## Fricções da página de produto atual (mobile 375px)

1. Header de ~340px (logo gigante) empurra o produto para baixo
2. "Add to cart" branco com borda fina — sem contraste; "Buy now" dourado logo
   abaixo compete com ele; nenhum dos dois é sticky
3. Stepper de quantidade ANTES do CTA (fricção desnecessária em ticket de ₹899)
4. "1354 in stock" como sinal — mata urgência e parece dado interno vazado
5. Sales-pop de terceiro ("Rakesh from NAGAUR purchased… Há 2 dias" — com bug
   de locale em PT) — padrão manipulativo e quebrado
6. Widget WhatsApp flutuante cobre o título e concorre com o CTA
7. Descrição em parágrafo denso com emojis, sem hierarquia escaneável
8. Política de troca (restritiva) escondida — descoberta só no pós-venda
9. Preço/variante/entrega dispersos em ~3 telas de scroll

## Decisões de design

**Formato**: protótipo estático navegável (3 páginas HTML), mobile-first,
responsivo até desktop, com imagens e dados reais do catálogo.
Páginas: `produto.html` (prioridade), `index.html`, `colecao.html`.

**Identidade**: evolução, não invenção — preto do logo panda + dourado dos
produtos (refinado via OKLCH a partir do #D4AF37 atual) + ivory quente como
base + blush sutil (variante rosa dos produtos) para o tom jovem.
Tipografia: Bricolage Grotesque (títulos, personalidade jovem) +
Assistant (corpo — fonte atual da marca, continuidade).

**PDP (mobile)** — ordem da página:
compact sticky header (56px) → galeria edge-to-edge swipeável com contador e
thumbnails → chips de material (18K Gold Plated · Waterproof · Anti-Tarnish ·
Skin Safe) → título + rating da loja → bloco de preço (sale grande, MRP
riscado, % off calculado, "inclusive of all taxes") → swatches visuais de
variante (foto real de cada cor) → bloco de entrega (checador de pincode +
fatos reais: free shipping prepaid, COD, despacho 3–5 dias) → sticky bottom
bar com preço + Add to Cart preto (sempre visível) → accordions (detalhes,
material & cuidado, envio & COD, política de troca HONESTA e visível) →
"Complete the look" (cross-sell real) → reviews reais da loja → WhatsApp
como linha de ajuda discreta, não bolha flutuante.

**Home**: header slim com busca visível → hero compacto e shoppável →
tiles de categoria com foto real (scroll horizontal) → rail de bestsellers →
faixa de USPs reais → ponte de marketplace ("você nos conhece da Amazon/
Flipkart/AJIO/Myntra — esta é a nossa loja própria") → reviews → footer.

**Coleção**: barra sticky de filtros em chips (finish, preço, ordenar) →
grid 2 colunas → cards com preço/desconto + quick-add.

**Removido de propósito**: sales-pop falso, contador de estoque, quantity
stepper no PDP, hero decorativo vazio. Nada de reviews/ratings/urgência
inventados — só dados verificáveis do site atual.

## Critério de sucesso

Do primeiro paint à decisão de compra em ≤2 telas de scroll no mobile;
CTA visível 100% do tempo; toda claim rastreável ao site/políticas atuais.
