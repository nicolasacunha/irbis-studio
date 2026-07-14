# Briefing-prompt — demo Alison Lin (Tier 1, 13/jul/2026)

Prompt pronto para colar numa sessão nova do Claude Code na raiz do repo irbis. Fatos abaixo verificados em 13/jul/2026 direto de alisonkimberlin.com e do LinkedIn dela.

---

Rode a skill irbis-demo-prospect. Lead Tier 1 já qualificada, dossiê resumido abaixo. Construa o protótipo e as mensagens de outreach.

## A lead

- **Quem:** Alison Lin, fundadora da Alison Lin LLC. Designer de joias e gem dealer no diamond district de NY, nascida no Brooklyn.
- **Pedido publicado (2 sem atrás, LinkedIn):** "if anyone knows any web designers... please send them my way", no mesmo post em que comemorou 2,2M de impressões no Instagram no mês e contou que trabalha em 2 empregos há 1 ano para lançar a primeira coleção. Post: https://www.linkedin.com/posts/alison-lin-550974ba_alisonlin-diamonddistrict-jewelrydesigner-activity-7475268030558765056-t0ki
- **Contato:** LinkedIn (linkedin.com/in/alison-lin-550974ba), IG @alisonkimberlin (37k), e-mail público alisonlin96@gmail.com.

## O site atual (alisonkimberlin.com — Shopify)

Fatos verificados em 13/jul/2026:
- Loja Shopify no ar com 172 produtos: anéis de gema (US$ 1.800 a 5.900, ex.: Black Opal 'Legacy' Signet US$ 5.900, 2ct Lab Diamond Bezel US$ 3.100+), brincos e colares (US$ 400 a 2.600), gemas avulsas (US$ 84 a 4.040) e um pouco de vestuário (tee US$ 33, tricô US$ 190).
- Nav: Shop All, Bracelets, Earrings, Rings, Necklaces, Gemstones, Clothing, Custom, About. Banner: "New rings are live!". Seletor de país/moeda.
- About com história forte: engenharia industrial, aprendizado de lapidação na R. Gems, coleções inspiradas em memórias de infância, "nostalgia com elegância moderna".
- Logo Y2K estilo graffiti bolha (azul/branco), personalidade jovem e streetwear.

## O gargalo (a tese da demo)

A marca tem duas forças que o tema Shopify atual não traduz: uma identidade visual Y2K/streetwear com personalidade rara em joalheria, e uma história de fundadora excepcional (lapidadora de verdade, formada no diamond district) que está enterrada numa página About de texto corrido. 2,2M de impressões mensais de IG chegam num site que parece template. Em joia de US$ 2-6k, quem não sente a marca não compra: o site precisa fazer o tráfego do Instagram confiar o suficiente para gastar isso.

## Escopo do protótipo (mínimo que prova o ponto)

1. **Home** mobile-first: hero com a energia Y2K da marca, história da fundadora à vista (não escondida no About), entrada para a coleção nova ("New rings are live!"), prova de autoridade (lapidária, diamond district).
2. **1 PDP** (usar o Black Opal 'Legacy' Signet Ring ou o 2ct Lab Diamond Bezel Ring): jornada mobile de compra de item de alto valor, com storytelling da peça, sticky ATC, e a assinatura da lapidadora como diferencial.
3. Reaproveitar o aprendizado da demo Panda Storee (PDP + jornada mobile em joalheria D2C).

Regras de construção:
- Dados e fotos REAIS do catálogo via products.json do Shopify (mesma técnica da Panda Storee). Preços reais. Zero reviews, ratings, urgência ou políticas inventadas.
- Fidelidade à marca primeiro: extrair o logo, as fotos e o clima Y2K/nostalgia do site e do IG dela. Não inventar paleta nova; evoluir a existente. Copy em inglês (EUA).
- Código em `Testes/alison-lin/`, config no launch.json, deploy em `alison-lin-concept.vercel.app` (conta nicolascunha14).
- Rodar /impeccable antes de declarar pronto.

## Pendências a confirmar (não afirmar no protótipo nem na mensagem)

- [Não verificado] O que exatamente ela quer do "web designer" (o pedido veio numa lista com stylist, fotógrafo, modelos).
- [Não verificado] Quais produtos compõem "a primeira coleção" do lançamento.
- [Não verificado] Políticas de frete/troca (não checadas; não prometer nada disso na demo).

## Depois do protótipo

Gerar conexão LinkedIn (≤300 chars, cita o post dela, sem link) + DM (3-5 linhas, link da demo, CTA reunião 15 min com 2 horários) + variante e-mail curta, em inglês, seguindo irbis-brand-voice (sem preço, sem prazo prometido, assina "Nicolas"). Salvar em `03 - Comercial/01 - Prospecção/demos/alison-lin/outreach.md`. Nada é enviado sem aprovação explícita do Nicolas.
