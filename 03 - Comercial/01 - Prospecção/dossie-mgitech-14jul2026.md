# Dossiê MGITECH / MGI Soluções — análise prévia do site (14/jul/2026)

Lead quente inbound via WhatsApp (outreach G4 Scale). Respondeu em minutos: "Tenho algumas empresas, mas principalmente a MGITECH, uma análise sua prévia me interessaria." Indicou o site mais relevante do grupo: www.mgi.com.br. Nicolas já confirmou que faria a análise.

## CONTATO

- WhatsApp: +55 11 99503-7570 (conta comercial desde out/2022) `[Confirmado]`
- Nome do decisor: ainda não informado (Nicolas perguntou na conversa) `[Não verificado]`
- Empresa: MGI Soluções, "boutique de outsourcing de TI" do grupo MGITECH `[Confirmado no site]`
- Sede: Av. João XXIII, 300, Socorro, Mogi das Cruzes/SP `[Confirmado no site]`
- Negócio: locação de equipamentos de TI (notebooks, dispositivos móveis), outsourcing de impressão (adquiriu a Kaprinter em 03/jul/2026), assistência técnica, software (MyIN, Mototalk) `[Confirmado no site]`
- Perfil do lead: dono de mais de uma empresa, respondeu pessoalmente. Tier 1 (ticket B2B, decisor acessível, gargalo forte) `[Provável]`

## DIAGNÓSTICO (medido em 14/jul/2026)

Stack: WordPress 7.0.1 + Elementor 4.1.3, PHP 8.3, Apache, HubSpot (forms + chat). Site NÃO está abandonado: blog ativo (post de 13/jul/2026), copyright 2026.

### Performance (Lighthouse local, mesma engine do PSI)

| Métrica | Mobile | Desktop | Meta |
|---|---|---|---|
| Score | 26/100 | 40/100 | 90+ |
| LCP | 17,3s | 3,8s | ≤2,5s |
| FCP | 9,3s | 2,8s | ≤1,8s |
| TBT | 3.440ms | 0ms | ≤200ms |
| CLS | 0 | 0,498 | ≤0,1 |

- TTFB real (curl, 4 amostras): 1,9s a 4,1s. Servidor sem cache de página.
- Sem compressão gzip/brotli: HTML de 265KB baixado cru (seria ~40KB).
- 45 scripts + 36 CSS na home; 3,2MB, 124 requests; ~580KB de JS e ~336KB de CSS não usados.
- Na prática o scroll da página chegou a travar durante o teste no browser.

### Conversão / CRO

1. **Página /contato sem telefone, WhatsApp ou e-mail.** Só "selecione o assunto" + formulário HubSpot carregado via JS. Destaques da página: "2ª via de boletos" e "Trabalhe conosco". Todo CTA do site ("Falar com especialista") desemboca nesse beco. Existe chat HubSpot flutuante, único canal imediato.
2. **Hero é carrossel de 4 slides.** O CTA principal muda conforme o slide; quem chega no slide 2 vê "Conhecer soluções" em vez de "Falar com especialista".
3. **Cases anônimos e fora do menu.** /cases tem números reais (22% de aumento de cobertura, 98% de disponibilidade) mas nenhum nome, logo ou depoimento. Sem faixa de logos na home.
4. **Catálogo sem hierarquia:** menu separa Soluções/Locações/Serviços/Software, mas locação de notebooks mora dentro de "Soluções" junto com 13 itens de natureza distinta (Prontuário eletrônico, WMS, PDV, Concessão de crédito), lista seca de "Saiba mais". Um "Saiba mais" aponta para `#` (link morto).
5. **Copy autorreferente na diferenciação:** "boutique de outsourcing", "soluções completas, personalizadas e estratégicas", "único ecossistema". H1/headline não diz para quem (porte, segmento).

### SEO técnico (nota 52/100)

- Zero meta description em todas as páginas testadas; sem plugin de SEO detectável.
- Home sem H1 (26 H2, zero H1). Title genérico: "MGI – Conectando Tecnologia e Negócios".
- Zero Open Graph/Twitter Card: link compartilhado no WhatsApp/LinkedIn aparece sem imagem/título.
- Zero headers de segurança; expõe versões de WP/PHP/Elementor.
- /obrigado/ indexável e no sitemap (suja Analytics e Google).
- Imagens 100% jpg/png (sem WebP), sem lazy loading, 8 sem alt.
- Pontos bons: redirects limpos em 301 único, canonical correto, sitemap ok, SSR (Google lê sem JS), boa arquitetura de SEO local (/aluguel-de-impressoras/{cidade}/), schema completo na página de aluguel de impressoras (replicável nas demais).

### Visual/UX (browser, 14/jul)

- Menu desktop quebra em 2 linhas a 1440px ("Artigos" cai sozinho).
- Carrossel de cards com seta de navegação sobreposta ao texto dos cards (mobile e desktop).
- Fotos de banco de imagem com corte estranho (cabeças cortadas na seção "Por que escolher locação").
- Link da Política de Privacidade do banner de cookies aponta para outro domínio (mgitech.com.br).

## GARGALO (em dinheiro, para a conversa)

O site recebe tráfego B2B (SEO local de impressoras, blog ativo, provavelmente anúncios: GTM instalado) e desperdiça nas duas pontas: **no topo, 17s de carregamento mobile** expulsam a maioria antes da primeira tela (Google: 53% abandonam após 3s); **no fundo, a página de contato sem telefone/WhatsApp** faz o comprador com urgência ligar para o concorrente. Entre as duas pontas, cases anônimos não sustentam a decisão.

## ABERTURA (usada na mensagem de WhatsApp)

3 achados em linguagem leiga (17s no mobile, contato sem telefone, cases anônimos) + convite para call de 20 min com 2 horários. Sem preço, sem proposta no chat (regras JDP 1-3).

## Próximos passos

- [ ] Enviar mensagem de análise prévia (aguardando aprovação do Nicolas)
- [ ] Registrar lead no pipeline do Notion (estágio: Respondeu / origem: outreach G4)
- [ ] Se topar a call: 20 min, entender o negócio, faixa só na call de diagnóstico, preço fechado só na videochamada
- [ ] Descobrir nome do decisor (já perguntado no WhatsApp)
