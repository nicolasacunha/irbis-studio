# Dossiê SBIE — análise do site sbie.com.br (14/jul/2026)

Lead inbound: dono (com sócio) pediu orçamento para "modernizar e atualizar" o site. Nicolas segurou o preço para a reunião e ofereceu análise. Regra do formato: mapa completo no PDF, notas x/20 por aspecto + total /100, sem preço.

## CONTATO

- Lead: nome não registrado; tem sócio (decisor em dupla: os dois na call) `[Confirmar]`
- Empresa: SBIE, Sociedade Brasileira de Inteligência Emocional; presidente Rodrigo Fonseca; treinamentos e imersões de inteligência emocional, loja (WooCommerce) e landing pages de captação em lp.sbie.com.br `[Confirmado no site]`
- Fundada em 1999 (meta description da página Conheça a SBIE); endereços nos rodapés divergem: Rua Curupá, 59 e Rua Itapura, 239 `[Confirmado]`

## PLACAR (0 a 20 por aspecto)

| Aspecto | Nota | Âncora |
|---|---|---|
| Velocidade | 4/20 | Lighthouse mobile 22/100; LCP 12,7s; TTFB ~2,1s em todas as páginas testadas; Speed Index 41,9s; 4,6MB/192 requests |
| Conversão | 8/20 | Hero sem CTA; menu manda para fora do site em nova guia (23 links); vídeo da home atrás de login do Vimeo; funil disperso em 6 LPs; a favor: telefone/e-mail no topo, WhatsApp flutuante |
| Conteúdo e prova | 11/20 | Prova social forte (celebridades, "200 mil pessoas", 28 anos, blog ativo até 23/jun/2026); contra: "Em breve... aguarde novidades!" na home, depoimentos que não renderizaram no teste, copy institucional |
| Google | 9/20 | Yoast + sitemap + redirects 301 limpos + schema presente; contra: H1 "Home 2023", dois H1 na home, "-->" vazando como H1, meta description ausente em /treinamentos /contato /store, páginas de teste públicas no sitemap (/teste/, /teste-lead-rd/, /teste-de-pagina/), /home/ duplicada, OG image de 2019 |
| Design e mobile | 6/20 | Tema `sbie-2019`; texto justificado; bio cortada no meio da palavra no desktop 1440px; 3 widgets flutuantes empilhados no mobile; texto rasterizado na imagem do hero; CLS mobile 0,162; cores e fotos sem sistema de hierarquia |
| **TOTAL** | **38/100** | |

## DIAGNÓSTICO DETALHADO (medições 14/jul/2026)

Stack: WordPress 6.9.4 + WooCommerce 10.8.1 + Elementor 3.35.8, tema `sbie-2019`, Yoast, Gravity Forms, Groovy Menu, CRM próprio (sbie.crm10a.com), 14+ plugins ativos detectáveis.

### Performance (Lighthouse local + curl)

| Métrica | Mobile | Desktop | Bom |
|---|---|---|---|
| Score | 22/100 | 60/100 | 90+ |
| LCP | 12,7s | 4,2s | ≤2,5s |
| FCP | 8,9s | 2,7s | ≤1,8s |
| TBT | 1.510ms | 30ms | ≤200ms |
| CLS | 0,162 | 0,002 | ≤0,1 |
| Speed Index | 41,9s | 8,0s | ≤3,4s |
| Peso / requests | 4,6MB / 192 | 4,4MB / 199 | — |

- TTFB ~2,1s consistente em /, /conheca-a-sbie, /treinamentos, /contato, /rodrigo-fonseca (sem cache de página).
- 87 scripts + 55 CSS na home; ~832KB de JS e ~168KB de CSS sem uso; fila de arquivos de 5 domínios bloqueando a primeira pintura (~7,3s de economia estimada no mobile).
- Interatividade plena só aos 30,8s no teste mobile; 20 tarefas longas.
- Página /rodrigo-fonseca: HTML responde em 2,1s mas a renderização trava (relato do dono em navegação real: "não carrega de jeito nenhum").

### Conversão / UX

1. Hero: banner com texto rasterizado na imagem, sem botão de ação na primeira tela.
2. 23 links internos com target=_blank: itens do menu (Lotus, Formação, Business, Embaixadores...) abrem nova guia apontando para lp.sbie.com.br. O visitante coleciona abas e perde o fio.
3. Vídeo central da home ("Em breve... assista ao vídeo abaixo") hospedado no Vimeo com restrição de login. Barreira que YouTube não teria.
4. 6+ landing pages de captação com estrutura parecida e mensagem genérica (observação do dono em navegação; estrutura confirmada nos links do menu).
5. Placeholder "Em breve... aguarde novidades!" publicado na home.
6. Dois rodapés com menus e endereços diferentes; link de telefone quebrado exibindo configuração de plugin (número argentino de demo).

### SEO técnico

- OK: robots.txt saudável, sitemap Yoast, 301 únicos (www→raiz), canonical, schema em todas as páginas testadas, meta description boa na home/blog/institucionais.
- Falhas: H1 da home é "Home 2023" (título interno do Elementor); segundo H1 no meio da página; H1 com conteúdo "-->" (comentário HTML vazando) em todas as páginas testadas; meta description ausente em /treinamentos, /contato, /store; páginas de teste no sitemap público; /home/ duplicando /; OG image de ago/2019; versões de WP/Woo/Elementor expostas.

### Conteúdo e prova social

- Forte: nomes conhecidos (Juliana Paes, Wolf Maya, Júlio Cocielo, Fafá de Belém, Cátia Fonseca), "mais de 200 mil pessoas", 28 anos de carreira do fundador, blog ativo (último post 23/jun/2026).
- Fraco: depoimentos em seção que não renderizou no teste automatizado `[verificar em navegador comum]`; copy fala da instituição, pouco do resultado de quem faz o treinamento; texto justificado dificulta leitura.

## GARGALO (para a call)

A SBIE tem a matéria-prima que a maioria paga caro para ter: marca fundada em 1999, celebridades como prova social e tráfego de conteúdo (28 anos é a carreira do Rodrigo Fonseca, não a idade da SBIE). O site desperdiça isso três vezes: a página demora 12,7s para mostrar conteúdo no celular, o menu espalha o visitante em guias e landing pages iguais, e a cara de 2019 cobra imposto de credibilidade de um produto premium.

## Próximos passos

- [ ] PDF entregue ao lead (14/jul)
- [ ] Call com o lead E o sócio juntos (preço só na call; duas opções de horário)
- [ ] Registrar no pipeline Notion (origem: inbound WhatsApp)
