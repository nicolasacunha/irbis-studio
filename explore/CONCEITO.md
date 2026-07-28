# IRBIS v2 — "igual, mas 10x melhor" (exploração jul/2026)

**Status:** protótipo de comparação. Não substitui o site no ar. Não deployado, não commitado — vive só em `explore/`, fora da raiz de deploy da Vercel (`site/`). Rodar local: `npx serve -l 3014 explore` (config `explore-olho-aceso` no launch.json).

**Direção (após redirecionamento do Nicolas):** réplica fiel da identidade que está no ar em irbis.com.br — paleta creme/carvão/sálvia, Besley + Archivo self-hosted, hero em cartão escuro com moldura, mascote de olhos, cursor VER, intro logo→bola, small caps, hairlines, scroll horizontal de serviços — com a execução elevada e a tese **sites + sistemas com IA** entrando pela voz da casa. A exploração "O Olho Aceso" (v1, do zero) foi descartada pelo dono.

## O que é igual ao site no ar

- Tokens exatos: `#F2EFE9 / #FAF8F4 / #E1DCD0 / #4A5D43 / #26251F / #6E6C60`; hero escuro `#21201B` com acento claro `#8FA987`.
- Besley (títulos, sentence case) + Archivo (corpo), woff2 copiados de `site/Design/fonts/`.
- Estrutura: intro cortina → nav fixa com flip → hero cartão → cases (EForce +350k) → números (+R$350k / 3sem / ZERO) → marquee → serviços horizontais pinados com snap → como opero (5 fases) → mid CTA → FAQ accordion → contato (form briefing) → footer.
- Comportamentos: cortina logo→bola→abre (timeline idêntica), hero-bg flipado com parallax de mouse, blur+foco nos números, hairlines que crescem, cursor dot/ring/VER, progress bar do trilho, fundo do body escurecendo no trilho e no contato.
- GSAP + ScrollTrigger locais (`vendor/`). Sem Lenis: scroll nativo (feedback registrado do Nicolas).

## Onde a tese sites+IA entra (o objetivo do brief)

1. **Hero:** label "SITES + SISTEMAS COM IA · PARA NEGÓCIOS QUE QUEREM CRESCER MAIS"; H1 "O site é a porta. / A IA que trabalha / **mora dentro.**"; desc com os dois lados nomeados.
2. **Faixa-tese** (nova, enxuta, na gramática da casa): 01 · A PORTA — "Sites que fazem o cliente entrar." | 02 · O QUE MORA DENTRO — "Sistemas com IA que devolvem horas." + ração: "a IRBIS opera com 13 rotinas de IA no próprio negócio" (fato do `valores-irbis.md`).
3. **Trilho de serviços 3 → 5 painéis:** os 3 claros do site atual (LP, institucional, e-commerce, com preços atuais) + 2 painéis ESCUROS — Sistema de Atendimento e Retaguarda com IA — no material do hero: a porta é clara, o que mora dentro é escuro. Sem preço nos painéis de IA ("Setup + mensalidade"), escopo no diagnóstico.
4. **FAQ:** nova pergunta "O que é um sistema com IA, na prática?" + "Quanto custa?" atualizado.
5. **Footer/tagline/marquee:** "Sites · Landing Pages · E-commerce · Sistemas com IA"; marquee troca Adash/Eduboxs (pré-pivot) por "SITES QUE VENDEM · SISTEMAS COM IA".

## Melhorias deliberadas sobre a réplica (lista de diferenças)

- Restos de laranja do tema antigo limpos: hover dos cases era `rgba(255,61,0,.25)` → sálvia; radial do hero era laranja → sálvia sutil.
- Legibilidade do hero: scrim lateral/inferior ancorando o texto sobre a foto + text-shadow no H1 e label (o site no ar deixa o label `#9C998A` batendo em área clara da pelagem).
- Cartão de case com radius 14px, rimando com o cartão do hero (no ar o case é reto).
- Footer com grid que não esmaga a tagline.
- `?static` e `?static&at=<id>` para verificação visual sem animação (ferramenta de trabalho, não afeta o uso normal).
- Form de contato sem backend no protótipo (botão vira "RECEBIDO — PROTÓTIPO SEM ENVIO").
- Links de fuga (cases, /call, manifesto etc.) apontam pra produção pra nada quebrar.

## Rodada de feedback 1 (23/jul, aplicada)

- Hero: "O site é a porta / A IA mora dentro" reprovado como AI slop → **"O site vende. / A IA trabalha."** + desc concreta.
- Case EForce: cartão-foto com overlay reprovado → **composição editorial assimétrica** (info + tabela de métricas com hairlines à esquerda, screenshot real do site EForce como obra à direita, ghost EF sálvia).
- Seção números+depoimento reprovada → **PROVA única**: citação grande em Besley + linha de fatos com dots sálvia (morre o grid de 3 stats gigantes).
- Marquee de clientes removido (só 2 marcas reais, virava enchimento).
- **E-commerce removido do site inteiro** (painel, FAQ, tese, footer). Trilho agora com 4 painéis: 2 claros (porta) + 2 escuros (IA).
- "Retaguarda com IA" → **"Operação no automático"** (tag IA · Retaguarda), copy seco.

## Rodada de feedback 2 (23/jul, aplicada)

- **Como Opero:** as 5 colunas iguais viraram **lista editorial** — número serif sálvia, nome da fase em Besley grande (sentence case), descrição em coluna à direita, hairlines entre linhas e hover que preenche a linha (gesto de lista da casa). Copy das fases mantido.
- **Contato:** virou **cartão escuro** espelhando o hero (mesma moldura, radius e tokens noturnos) — a página abre e fecha em cartão escuro. Form em tema noturno, ENVIAR BRIEFING em creme rimando com o CTA do hero. Fundo do body escurece ao redor do cartão (transição existente).

## Rodada de feedback 3 (23/jul, aplicada)

- **FAQ:** full-width com header solto virou **layout assimétrico** — coluna esquerda sticky (kicker "FAQ // 06 questões", "Perguntas" em Besley, sub e link "Ficou outra? WhatsApp →") e, à direita, as 6 perguntas **numeradas em Besley** com hairlines, rimando com a lista de fases. Resposta aberta alinha com o texto da pergunta. Copy mantido.

## Rodada de feedback 4 (23/jul, aplicada)

- **Faixa de clientes no hero** (pedido com referência visual): base do cartão escuro ganhou hairline + label "Quem constrói com a IRBIS" + marquee de logos (Odery, EForce, A.Cunha adv) uniformizadas em creme via filtro, com fade nas bordas. JS clona o grupo e calcula a duração pela largura → velocidade constante (~45px/s): pra adicionar cliente, basta mais um `<img>` no `.logo-grupo` em `explore/index.html` (e o ciclo se alonga sozinho). Logos ficam em `explore/img/logo-*.png`.

## Pendências conhecidas

- Intro e animações não são verificáveis por screenshot no pane do Claude (rAF estrangulado — memória `raf-pausado-screenshots`); a mecânica foi validada por DOM: pin do trilho com range exato (progress 0.55 → painel 3/5, translate -1958px de -3560px), FAQ abrindo, zero erros de console, todos os assets 200.
- EN não replicado (só PT nesta exploração).
