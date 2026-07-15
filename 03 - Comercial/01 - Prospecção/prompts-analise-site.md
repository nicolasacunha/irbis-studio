# Prompts de análise de site — IRBIS (1 por aspecto)

Uso: rodar os 5 em paralelo (subagentes) ou um a um, trocando `{URL}`. Cada um devolve achados verificados + nota x/20. A soma vira o placar /100 do PDF ([[formato-pdf-analise]]). Regra de ouro em todos: só reportar o que foi medido ou visto, com evidência e data.

---

## 1. VELOCIDADE (x/20)

```
Meça a performance de {URL} e dê uma nota de 0 a 20.

Como medir (não pule etapas):
1. Rode Lighthouse local (npx lighthouse, mobile E desktop, categoria performance) ou PageSpeed Insights se a API estiver disponível.
2. Meça TTFB real com curl, 3 amostras.
3. Liste os 10 maiores arquivos da página por transferSize e identifique o elemento LCP.

Extraia: score mobile e desktop, LCP, FCP, TBT, CLS, Speed Index, peso total, nº de requests, TTFB médio, e as 3-5 maiores oportunidades com economia estimada.

Reporte em PT-BR:
- Tabela mobile vs desktop vs referência boa (LCP ≤2,5s, FCP ≤1,8s, TBT ≤200ms, CLS ≤0,1)
- Cada problema traduzido em impacto de negócio leigo (ex.: "mais da metade dos visitantes abandona após 3s, segundo o Google")
- O arquivo ou causa nº 1 do LCP, nomeado

Nota (0-20), ancorada assim:
- 17-20: score mobile 90+, LCP ≤2,5s nos dois
- 12-16: score mobile 60-89 ou LCP mobile ≤4s
- 6-11: score mobile 30-59 ou LCP mobile 4-10s
- 0-5: score mobile <30 ou LCP mobile >10s
Ajuste ±2 por TTFB (>1s piora, <0,2s melhora). Justifique a nota em 1 frase com os números.

Só reporte números que você mediu nesta execução, com data.
```

---

## 2. CONVERSÃO (x/20)

```
Avalie {URL} como consultor de CRO e dê uma nota de 0 a 20. Analise a home e as 2-3 páginas mais próximas do dinheiro (contato, orçamento, produto/serviço, checkout).

Verifique (com evidência real de cada item):
1. Primeira tela: existe promessa clara + botão de ação visível sem rolar? Cite o headline e o CTA reais.
2. Caminho até o contato/compra: quantos cliques? O formulário pede o mínimo? Tem telefone/WhatsApp visível para quem tem urgência?
3. Atrito: links abrindo em nova guia, barreiras de login, popups, carrosséis escondendo conteúdo, funil espalhado em páginas paralelas.
4. Oferta: preço/prazo/próximo passo aparecem em algum lugar, ou o site obriga a adivinhar?
5. Página de contato: canais completos ou só formulário mudo?

Reporte em PT-BR: os 5 achados mais caros em ordem de impacto na receita, cada um com evidência (citação, contagem, print do caminho) e o custo em linguagem de dono de negócio.

Nota (0-20):
- 17-20: promessa + CTA na primeira tela, caminho de 1-2 cliques, canais imediatos (tel/WhatsApp), zero barreiras
- 12-16: base existe, mas com atrito relevante (CTA fraco OU canal imediato escondido)
- 6-11: sem CTA na primeira tela OU contato sem telefone/WhatsApp OU funil disperso
- 0-5: visitante interessado não tem como agir sem esforço ativo
Justifique em 1 frase.
```

---

## 3. CONTEÚDO E PROVA (x/20)

```
Avalie o conteúdo e a prova social de {URL} e dê uma nota de 0 a 20. Leia a home + sobre + blog/notícias + páginas de produto/serviço.

Verifique (citando trechos reais):
1. Proposta de valor: em 5 segundos um visitante entende o que é, para quem e por que escolher? Cite o headline.
2. Copy: fala do resultado do cliente ou da própria empresa? Conte quantas frases começam com "nós/a empresa" vs "você/seu".
3. Prova social: depoimentos com nome e rosto? Números concretos (clientes, anos, resultados)? Cases nomeados ou "cliente do setor X"?
4. Frescor: data do último post/notícia, copyright do rodapé, eventos passados anunciados como futuros, seções "em breve" publicadas.
5. Autoridade: quem assina o conteúdo? Credenciais aparecem?

Reporte em PT-BR: o que sustenta a credibilidade e o que a derruba, em ordem de impacto, com evidência real de cada afirmação.

Nota (0-20):
- 17-20: proposta clara em 5s, prova nomeada com números, conteúdo atualizado (≤3 meses)
- 12-16: prova existe mas anônima/escassa, OU conteúdo parado 3-12 meses
- 6-11: copy autorreferente, prova genérica, sinais de abandono (>12 meses)
- 0-5: sem prova nenhuma, conteúdo desatualizado anos, placeholders públicos
Justifique em 1 frase.
```

---

## 4. GOOGLE (x/20)

```
Faça uma auditoria técnica de SEO de {URL} e dê uma nota de 0 a 20. Use curl/fetch no HTML real da home + 3-4 páginas internas principais. Não use suposição: cada achado precisa da evidência no código.

Verifique:
1. robots.txt (existe? bloqueia algo crítico? libera crawlers de IA?), sitemap.xml (existe? tem lixo: páginas de teste, duplicadas?)
2. Redirects: http→https, www vs raiz (301 único?), página 404 real (status 404, não 200)
3. Em cada página: <title> único e descritivo, meta description, canonical, og:title/og:image (imagem existe? peso <300KB?), UM h1 com a palavra-chave, hierarquia de headings sem vazamento de código
4. Schema (ld+json): existe? tipo correto?
5. Higiene: versões de CMS/plugins expostas, páginas de teste públicas, títulos internos vazando ("Home 2023"), texto extraível (spans sem espaço quebram a leitura do crawler)

Reporte em PT-BR: problemas em ordem de impacto, cada um com a evidência (trecho do código ou URL) e o que custa em visibilidade, explicado para leigo.

Nota (0-20):
- 17-20: tudo da lista presente e correto, no máximo 2 detalhes menores
- 12-16: base sólida com furos pontuais (descriptions faltando em algumas páginas, og pesado)
- 6-11: falhas estruturais (H1 quebrado/duplicado, sitemap com lixo, canonical ausente em várias)
- 0-5: sem sitemap/robots, metas ausentes em massa, conteúdo invisível para crawler
Justifique em 1 frase.
```

---

## 5. DESIGN E MOBILE (x/20)

```
Avalie o design e a experiência mobile de {URL} e dê uma nota de 0 a 20. Abra no navegador em viewport desktop (1440px) E mobile (390px). Tire screenshot dos dois e da página rolada (mínimo 3 pontos da página). Cruze o que o screenshot mostra com o DOM antes de declarar bug (animações pausadas geram tela preta falsa).

Verifique:
1. Idade aparente: o site parece deste ano ou de que ano? Sinais: texto justificado, texto rasterizado dentro de imagem, sombras/gradientes datados, carrossel automático, nome do tema no código
2. Hierarquia: existe UMA coisa mais importante por tela? Ou tudo grita junto?
3. Quebras: parágrafos cortados, elementos sobrepostos, widgets flutuantes empilhados, banner de cookie cobrindo conteúdo no mobile
4. Consistência: cores e tipografia seguem um sistema ou cada seção inventa o seu? Rodapés/menus duplicados divergindo?
5. Mobile: CLS medido, alvos de toque ≥44px, fonte legível sem zoom, conteúdo em coluna única sem scroll horizontal
6. Acessibilidade rápida: contraste do texto principal, alt nas imagens

Reporte em PT-BR: os achados em ordem de gravidade, cada um com o print ou o trecho de código como evidência, e o custo de credibilidade em linguagem de dono (75% julgam a credibilidade pelo design — Stanford).

Nota (0-20):
- 17-20: atual, hierarquia clara, zero quebras nos dois viewports, sistema consistente
- 12-16: sólido com deslizes (1-2 quebras pontuais, inconsistências menores)
- 6-11: aparência datada OU quebras visíveis no mobile OU hierarquia confusa
- 0-5: quebrado nos dois viewports, sem sistema, ilegível no celular
Justifique em 1 frase.
```

---

**Montagem do placar:** soma das 5 notas = /100. No PDF, cada aspecto vira uma barra com a nota e 1 linha de justificativa; o total entra em destaque na página do placar.
