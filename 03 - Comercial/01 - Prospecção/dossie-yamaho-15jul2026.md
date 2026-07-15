# Dossiê Yamaho — análise do yamaho.com.br (15/jul/2026)

Lead: **Bruno Máximo**, CEO da Yamaho desde 2022 (confirmado no /quem-somos). Conector da rede G4: indicou a Milena e, no agradecimento do Nicolas, pediu análise do site da Yamaho ("nosso site sinto que tem muita oportunidade de melhoria"). Multi-empresas: entrega boa aqui abre o grupo.

## EMPRESA

- Yamaho: fabricante de equipamentos e acessórios agrícolas (pulverizadores manuais/bateria/motorizados, adubadeiras, motobombas, perfuradores) `[Confirmado no site]`
- Fundada em 1985 pelo Sr. Mituo Maeda (Diadema/SP); sucessão 2017 (Leonel Zeferino e Thiago Lara); hoje em Mogi das Cruzes/SP `[Confirmado /quem-somos]`
- Números da marca: 40 anos, "+2.000 clientes ativos", revenda em 27 estados `[Confirmado, contadores da home]`
- Modelo B2B2C: vende via rede de revendedores (wp-store-locator); WooCommerce presente mas sem carrinho/preço público
- Stack: WordPress + Elementor 4.1.4 (Pro) + WooCommerce, tema Blocksy; site relançado ~out-dez/2025; SEM plugin de SEO (não há Yoast/RankMath)
- Contatos do site: (11) 4059-3545, vendas@yamaho.com.br, WhatsApp widget 5511999871765

## PLACAR: 48/100

| Aspecto | Nota | Âncora |
|---|---|---|
| Velocidade | 4/20 | Lighthouse mobile 56 e desktop 60; LCP mobile 16,9s; Speed Index 29,6s; TTFB médio 3,8s (com pedágio de 1,4s do redirect www); 4,3MB/91 requests; PNGs de até 1,15MB; carrossel injeta a imagem LCP via JS e a segura por 4,8s. A favor: CLS 0,03 e TBT ~0 |
| Conversão | 10/20 | Página de produto SEM nenhum CTA (nem "onde comprar"); home fala com lojista ("Sou Lojista", "Quero ser Representante") e não com comprador; tel/e-mail texto morto sem href; form contato 7 campos com typos ("Pernanbuco") |
| Conteúdo e prova | 13/20 | Números fortes (40 anos, 2.000 clientes, 27 estados, fundador nomeado, specs técnicas, catálogo 2025); contra: ZERO depoimentos, "Avaliações (0)" público nos produtos, valores da empresa em JPEG de WhatsApp sem alt, lang="pt-PT", zero certificações/normas |
| Google | 9/20 | ZERO meta description no site; ZERO Open Graph (grave: público compartilha por WhatsApp); home/contato/quem-somos SEM H1; produto sem Product schema; sitemap com /teste/, /manute/, /produto/123/, carrinho; robots "Allow: *" fora do padrão; PHP/Apache expostos; sem headers de segurança |
| Design e mobile | 12/20 | Visual atual (relançado 2025), sem quebras no mobile, inputs ok; contra: 12/12 imagens sem alt, texto rasterizado nos banners do carrossel, alvos sociais 26px, strings pt-PT |

## OS 3 MAIORES VAZAMENTOS (para o PDF)

1. **A página de produto abandona o comprador decidido.** Zero botão de ação na página mais próxima do dinheiro. O agricultor que chegou na ficha técnica não tem "onde comprar", "encontrar revendedor" nem "falar com vendas". Vitória rápida nº 1 do site inteiro.
2. **A home recruta canal em vez de vender produto.** Primeiros CTAs: "Sou Lojista" e "Quero ser Representante". O visitante majoritário (comprador) não tem promessa nem ação na primeira tela. Sem H1.
3. **Invisível e feio no Google e no WhatsApp.** Sem meta description o Google inventa o texto do resultado; sem OG o link compartilhado (num negócio que roda por WhatsApp) sai sem foto e sem título; sem Product schema o concorrente aparece com card rico e a Yamaho com link seco.

## O QUE JÁ ESTÁ CERTO

40 anos + 2.000 clientes + 27 estados já contados na home; specs técnicas de fabricante; garantia declarada; site relançado em 2025 com visual atual; 404 real; HTTPS ok; localizador de revendedores existe.

## PRÓXIMOS PASSOS

- [x] PDF entregue ao Nicolas 15/jul (analise-yamaho-irbis-15jul2026.pdf) com CTA para irbis.com.br/call
- [ ] Áudio do Nicolas (gancho + explicação, ele improvisa) ANTES do texto
- [ ] Mensagem de texto com o PDF + convite pro /call
- [ ] Registrar no pipeline (origem: indicação G4 / retribuição Milena)
