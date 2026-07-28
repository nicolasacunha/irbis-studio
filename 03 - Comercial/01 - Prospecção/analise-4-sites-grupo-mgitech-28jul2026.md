# Análise dos 4 sites do Grupo MGITECH

> Avaliação nos 5 eixos IRBIS: **CRO, Copy, Design, Performance e SEO**, 20 pontos cada, total 100.
> Medições e inspeção visual em **28/jul/2026**, entre 10h50 e 11h30. Lighthouse 13.4.1 em perfil mobile (mesma engine do PageSpeed Insights), testes de servidor por curl, navegação real em viewport de 390px.
> Base para o escopo pedido pela Milene Fernandes Carvalho (marketing do grupo) na reunião de 28/jul: entregas, prazos e custo para as quatro propriedades.

---

## Placar geral

| Site | CRO | Copy | Design | Perf. | SEO | **Total** |
|---|---|---|---|---|---|---|
| MGD Distribuição | 9 | 9 | 10 | 3 | 14 | **45**/100 |
| Grupo MGITECH | 7 | 10 | 12 | 6 | 4 | **39**/100 |
| MGI Soluções | 5 | 9 | 11 | 4 | 7 | **36**/100 |
| MGI IA | 8 | 7 | 6 | 6 | 4 | **31**/100 |
| **Média do grupo** | **7,3** | **8,8** | **9,8** | **4,8** | **7,3** | **38**/100 |

**Leitura em uma linha:** o grupo tem design razoável e copy mediana, e perde nos dois eixos que decidem venda — performance e conversão. Nenhum site passa de 45.

⚠️ **Sobre a nota citada na reunião.** Foi dito "26/100" para a MGI. Com as medições de hoje ela dá **36/100**, porque a performance melhorou de 17,3s (14/jul) para 10,4s. **Use 36 e use 10,4s.** Se a Milene rodar o PageSpeed na frente dela, os dois números batem. Repetir 17s e 26 pontos é o único jeito de perder credibilidade numa análise que está certa.

---

## O que é igual nos quatro (o argumento de proposta única)

Estes sete pontos aparecem nos quatro sites. É o que justifica tratar como um projeto de grupo e não como quatro trabalhos avulsos.

### 1. Nenhum canal de contato direto, em nenhum dos quatro
Zero `tel:`, zero `mailto:` nas quatro homes, verificado no DOM renderizado. Confirmado também nas páginas `/contato` da MGI e da MGD: **nenhuma das duas tem telefone, e-mail ou WhatsApp**. Só o MG.ia tem um botão de WhatsApp.

Na reunião, a Milene rebateu esse ponto dizendo que o formulário dispara e-mail automático. O e-mail automático confirma que a mensagem chegou; ele não dá ao comprador com pressa um jeito de falar agora. E o problema não é da MGI: é dos quatro.

### 2. Três identidades visuais sem nenhuma relação entre si
- **MGI Soluções:** azul-marinho `#002E6D` com ciano.
- **MGD Distribuição:** grafite `#231F1D` com amarelo `#FFCD00`.
- **MG.ia:** preto com verde neon `#3DC96F` e fonte Orbitron.

Três marcas, três universos visuais, nenhum elemento comum além do logo. **O marketing do grupo foi unificado em julho e os sites ainda não foram.** Esse é o argumento mais forte da proposta, porque é exatamente o problema que ela foi contratada para resolver.

O site do Grupo é o único que tenta ser sistema: o logo carrega as três cores das três empresas e a paleta da página as reúne. A intenção existe, só não desceu para os sites-filho.

### 3. Banner de cookies cobrindo 55% da tela no celular
Nos quatro, o aviso aparece como bloco branco no centro da viewport, não como faixa de rodapé. No celular ele tapa a headline, o CTA e a primeira dobra inteira. É a primeira coisa que o visitante vê nos quatro sites do grupo.

### 4. Três famílias tipográficas na mesma página
Instrument Sans, DM Sans e Inter convivem nas mesmas páginas da MGI e da MGD. Não é escolha de hierarquia, é acúmulo de plugin. Custa peso de carregamento e tira a sensação de acabamento.

### 5. HTML servido sem nenhuma compressão
Testado bruto e com `--compressed`: tamanho idêntico, nenhum `Content-Encoding` em nenhum dos quatro. A home da MGI baixa **265 KB de HTML cru** que caberia em cerca de 35 KB. A MGD, 224 KB. É configuração de servidor, não de site.

### 6. Servidor lento nos quatro
"Reduce initial server response time" é a **oportunidade número 1 dos quatro**, valendo de 1,1s a 2,2s. TTFB medido: MGI 2,59s · MGD 1,26s · Grupo 1,10s · MG.ia 1,09s. Não há cache de página em nenhum.

### 7. Zero header de segurança e erros de JavaScript nos quatro
Sem HSTS, sem CSP, sem X-Frame-Options, sem X-Content-Type-Options, sem Referrer-Policy. Os quatro anunciam `Server: Apache` e `X-Powered-By: PHP/8.3.0`, entregando a versão exata a quem procurar vulnerabilidade. E os quatro reprovam em "Browser errors were logged to the console".

Stack idêntica nos quatro: WordPress 7.0.2 + Elementor.

---

## Eixo a eixo

### CRO — média 7,3/20

**O pior eixo do grupo depois de performance, e o mais barato de corrigir.**

- **Nenhum contato imediato** em nenhum dos quatro (ver ponto 1 acima).
- **CTA sem hierarquia.** A home da MGI tem "Falar com especialista" quatro vezes, "Conhecer soluções", "Conhecer serviços", "Ver todas" e **"Saiba mais" catorze vezes**. Quando tudo é um botão, nada é o botão.
- **A MGD tem doze rótulos de CTA diferentes**, incluindo "Ver todos" e "Ver tudo" na mesma página. O único CTA com intenção comercial ("Solicitar orçamento") disputa espaço com onze outros.
- **O CTA principal da MGD não vende:** "Conheça a MGD" é convite para passear, não para comprar. Numa distribuidora B2B, o botão do hero deveria ser catálogo ou orçamento.
- **Hero em carrossel na MGI e na MGD.** O CTA muda conforme o slide, então quem chega no segundo slide nunca vê a ação principal.
- **Setas do carrossel por cima do texto.** Na MGD, as setas do hero cortam o parágrafo ao meio e o deixam ilegível. Na MGI, a seta dos cards cobre o texto do card seguinte. É defeito visível em tela cheia, não detalhe.
- **Carga de decisão alta:** 203 links na home da MGI, 177 na da MGD, com 17 e 11,4 telas de rolagem respectivamente.
- **Cases fora do menu na MGI.** Existem números fortes (22% de aumento de cobertura, 98% de disponibilidade) numa página que não está na navegação, e sem nome, logo ou depoimento que os sustentem.
- **"Trabalhe conosco" ocupando um terço do menu do MG.ia** (três itens no total) e um quarto do menu do Grupo. Numa página comercial, RH não disputa espaço com venda.

**Nota:** MGI 5 · MG.ia 8 · MGD 9 · Grupo 7.
O MG.ia leva a melhor nota do eixo por ter WhatsApp e "Solicitar proposta" visíveis, apesar de ser o site mais raso.

### Copy — média 8,8/20

**O eixo mais salvável: existe matéria-prima boa, mal distribuída.**

O que está bom:
- **"Atualize seu parque tecnológico sem impactar o orçamento"** (MGI) é headline de benefício de verdade: fala do problema do cliente e não da empresa.
- **"Há mais de 34 anos, o Grupo MGITECH conecta tecnologia e operação"** é o maior ativo de autoridade do grupo.
- **"Distribuidora oficial de tablets robustos, coletores de dados e automação industrial"** (MGD) é concreto e específico.

O que custa:
- **Os 34 anos só existem no site que o Google não lê.** Estão no Grupo, cujo sitemap tem uma única URL. Não aparecem na MGI nem na MGD, que são os sites comerciais.
- **Copy autorreferente na diferenciação:** "A MGI não é apenas mais um fornecedor de tecnologia. Somos uma boutique de outsourcing de TI." Fala da empresa, e "boutique de outsourcing" é vocabulário que o comprador não usa nem pesquisa.
- **Headline do grupo é propósito interno:** "Nosso propósito é simplificar o trabalho operacional das pessoas". Quem chega quer saber o que o grupo resolve para ele.
- **Erros de digitação em página de venda,** no menu da MGI: "Solução de ponto de venda ( PDV)", "Comprovação de entrega (pod)", "Concessão de credito". Num pitch de customização, erro de digitação corrói a promessa.
- **O mesmo serviço com dois nomes.** O menu da MGI diz "Locação de notebooks", o rodapé da mesma página diz "Outsourcing de notebooks". O rodapé ainda oferece "Trade marketing", que não existe no menu.
- **O MG.ia tem 286 palavras na página inteira.** Não há o que a divisão faz na prática, para quem, com que resultado. Não convence quem lê nem ranqueia para quem busca.
- **Headline da MGD é jargão:** "Soluções B2B em Mobilidade Corporativa" descreve a categoria, não o ganho.

**Nota:** MG.ia 7 · MGI 9 · MGD 9 · Grupo 10.

### Design — média 9,8/20

**O eixo menos grave, e o que mais aparece na reunião. Cuidado para não vender aqui o que o cliente precisa nos outros.**

- **Fragmentação de identidade** (ver ponto 2 acima). É a questão de design mais cara do grupo.
- **MGI:** o mais bem resolvido. Azul consistente, tipografia grande e legível, hierarquia clara na primeira dobra. Perde pontos com dois azuis quase idênticos convivendo (`#002E6D` e `#012B61`), três famílias de fonte, e fotos de banco de imagem com corte ruim.
- **MGD:** identidade grafite e amarelo é forte e distinta, mas o defeito das setas sobre o texto acontece logo no hero, que é onde o site tem uma chance só.
- **MG.ia:** é o clichê visual de IA. Mão de robô de banco de imagem, verde neon sobre preto e **Orbitron** na headline, que é fonte de ficção científica e prejudica a leitura de um H1 de quatro linhas. Contraste do verde sobre preto no limite. É também o único com layout pulando durante o carregamento (CLS 0,125). Para uma divisão que quer ser levada a sério em IA corporativa, o visual entrega o oposto.
- **Grupo:** o mais coerente como sistema, e o mais vazio como página. São 7,4 telas de rolagem para 366 palavras.

**Nota:** MG.ia 6 · MGD 10 · MGI 11 · Grupo 12.

### Performance — média 4,8/20

**O pior eixo, com folga, e o de maior retorno por hora investida.**

| Site | Score | LCP | FCP | TBT | CLS | Peso | Requests |
|---|---|---|---|---|---|---|---|
| MGI Soluções | 36/100 | 10,4s | 7,5s | 912ms | 0,000 | 3.306 KB | 125 |
| MG.ia | 52/100 | 11,2s | 4,6s | 232ms | 0,125 | 2.176 KB | 82 |
| MGD Distribuição | **34/100** | **13,1s** | 7,2s | **1.069ms** | 0,000 | **4.841 KB** | **156** |
| Grupo MGITECH | 55/100 | 12,3s | 5,8s | 141ms | 0,001 | 3.674 KB | 146 |
| *Meta* | *90+* | *≤2,5s* | *≤1,8s* | *≤200ms* | *≤0,1* | | |

**O pior site do grupo é a MGD, não a MGI.** 13,1 segundos, 4,8 MB e 156 requisições.

Código morto carregado em toda visita: MGD **817 KB de JS + 335 KB de CSS**; MGI **586 KB + 336 KB**. Na MGD, CSS e JS ainda vêm sem minificar.

**Nota:** MGD 3 · MGI 4 · MG.ia 6 · Grupo 6.

### SEO — média 7,3/20

- **MGI:** sem H1 na home (26 H2 e nenhum H1), sem meta description, **sem nenhuma tag Open Graph** — o link compartilhado no WhatsApp ou no LinkedIn sai sem imagem e sem título. `/obrigado/` responde 200 e está indexável, sujando o Analytics. Title genérico. Do lado bom: canonical correto, sitemap com 11 URLs, conteúdo servido no HTML (o Google lê sem depender de JS) e uma boa arquitetura de SEO local por cidade em aluguel de impressoras, que serve de modelo.
- **MG.ia:** **roda em HTTP puro.** O certificado existe e o HTTPS responde, mas não há redirecionamento, e o `canonical` aponta para o endereço `http://`. O Chrome marca "Não seguro" e o Google indexa a versão insegura. É o achado mais grave dos quatro e um dos mais baratos de corrigir. Sem meta description, sem Open Graph, sem schema.
- **MGD:** o melhor do grupo, com folga. Yoast instalado, meta description escrita, 10 tags Open Graph, 2 blocos de schema, WebP e lazy loading, sitemap com 13 URLs. Falha só no H1 ausente. **Serve de modelo para os outros três.**
- **Grupo:** **sitemap com uma URL só.** O Google enxerga uma página nesse domínio. Sem meta description, sem Open Graph. E `mgitech.com.br` redireciona para `grupomgitech.com.br`, então o domínio que a empresa divulga não é o que o Google indexa. Pior: o hub do grupo **linka para as empresas em HTTP** (`http://mgd-dist.com.br`, `http://mgi.ia.br`), mandando o visitante para versões inseguras de sites que têm HTTPS funcionando.

**Nota:** MG.ia 4 · Grupo 4 · MGI 7 · MGD 14.

⚠️ **O Lighthouse dá SEO 92 na MGI e 100 na MGD.** Não é contradição: ele checa presença de tags, não se a página é achada e clicada. Mas se a Milene rodar o PageSpeed e vir 92, a nota 7/20 precisa estar explicada. Na proposta, separe **performance (que ela reproduz sozinha)** de **conversão e busca (avaliação IRBIS)**.

---

## Ordem de ataque

Por retorno sobre esforço, não por gravidade.

**1. Servidor e configuração — vale 1,5s a 2,5s por site, não toca no conteúdo.**
Compressão gzip/brotli, cache de página, headers de segurança, HTTPS forçado no MG.ia, minificação na MGD. Se os quatro estiverem no mesmo servidor, é uma correção só. É a melhor relação custo-benefício do projeto inteiro.

**2. Contato e CTA — a correção mais barata com efeito comercial direto.**
Telefone e WhatsApp clicáveis nos quatro, um CTA principal por página, fim do "Saiba mais" genérico, setas do carrossel fora do texto.

**3. SEO de base — replica o que a MGD já tem.**
H1 na MGI e na MGD, meta description e Open Graph em três sites, `/obrigado` fora do índice, sitemap do grupo, links internos do hub em HTTPS. O padrão Yoast da MGD vira o padrão dos quatro.

**4. Copy — trazer o que já existe para onde é visto.**
Os 34 anos e os números dos cases saem do site que ninguém indexa e entram nas home comerciais. Cases ganham nome e logo. Typos corrigidos. Nomenclatura igual entre menu e rodapé.

**5. Sistema visual do grupo — o que ela foi contratada para resolver.**
Uma linguagem comum entre as três marcas, sem apagar a identidade de cada uma. O logo do Grupo já mostra que a intenção existe.

**6. O que ajuste não resolve.**
Os 10 a 13 segundos não caem para menos de 3 com os itens 1 a 5. A causa raiz é a stack: Elementor carregando 30 a 36 folhas de CSS e 23 a 45 scripts por página, com mais de 1 MB de código morto na MGD. Isso é reconstrução de front-end.

**Consequência comercial:** dá para vender 1 a 5 como o pacote de ajustes que ela pediu, com resultado real e mensurável, **desde que a proposta diga com todas as letras onde a performance vai parar**. Prometer 3 segundos dentro de escopo de ajuste é assinar embaixo de algo que a stack não entrega.

---

## Pendências antes de fechar o escopo

1. Os quatro sites estão no mesmo servidor? Se sim, o item 1 vira uma correção só e o custo por site cai.
2. O escopo cobre páginas internas ou só as homes? A MGI tem 11 URLs no sitemap, a MGD tem 13.
3. Quem mantém os sites hoje? O `dataLayer` da MGI e da MGD registra `pagePostAuthor: internouxagency`, o que indica agência externa envolvida na publicação.
4. Existe um fornecedor incumbente com proposta na mesa, sendo ajustada na tarde de 28/jul.
5. A identidade visual de cada marca é intocável ou pode evoluir? Muda o tamanho do item 5.
