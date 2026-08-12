---
name: irbis-brand-voice
description: "Use quando for escrever ou revisar qualquer comunicação externa da IRBIS ou do perfil pessoal do Nicolas: copy de site, proposta comercial, DM ou mensagem de outreach (LinkedIn, WhatsApp, Instagram), post, legenda, bio, e-mail de follow-up, roteiro de VSL ou reel, headline, CTA, página de blog/pSEO. Também para dúvidas de tom de voz, palavras proibidas, fórmulas de copy, prova social citável em texto, política de preço em copy, regra sem-travessão do JDP, ou tokens visuais (cores, fonte Sora, pantera)."
---

# IRBIS — Sistema de voz da marca

> **Reescrita em 12/ago/2026.** A versão anterior (04/jul/2026) descrevia a IRBIS como estúdio que fazia "exclusivamente sites" e estava produzindo copy no escopo morto. Se você encontrar qualquer cópia dessa versão, ela não vale.

A IRBIS é operada por **Nicolas Cunha e um colaborador generalista com foco comercial**. Vende **três frentes** para empresas da economia real:

1. **Soluções com IA** — automações, chatbots e agentes aplicados à operação do cliente.
2. **Consultoria de IA** — diagnóstico de como a empresa usa IA hoje e o caminho a seguir.
3. **Sistemas** — CRM, ERP e sistemas sob medida, com IA quando ela melhora o processo.

**Sites e landing pages saíram da oferta em 04/ago/2026.** Junto com branding, identidade visual avulsa, app/dashboard avulso, Web3, motion avulso e gestão de redes sociais. A recusa é parte do posicionamento.

Esta skill define COMO a IRBIS escreve. Toda palavra que sai com o nome IRBIS, ou no perfil pessoal do Nicolas, passa por aqui.

**Regra zero:** nada é publicado sem aprovação explícita do Nicolas, na mesma conversa em que o rascunho foi apresentado. Sem "aprovado" / "pode mandar" escrito por ele aqui, trate como NÃO aprovado.

## Quando NÃO usar esta skill

| Tarefa | Skill certa |
|---|---|
| Decidir O QUE pode ser afirmado (número, case, prazo, escopo) | `irbis-guarda-pivot` — rode ANTES de afirmar qualquer fato |
| Editar HTML do site, deploy, sitemap, analytics | `irbis-site-ops` |
| Estrutura da reunião de venda | `irbis-call-de-vendas` + `03 - Comercial/03 - Reunião de Vendas/estrutura-reuniao-unica-irbis.md` |
| Mecânica de prospecção, quiz de DM, cadência | `irbis-prospeccao-e-diagnostico` + `escada-follow-up-irbis.md` |
| Mensagens de entrega, repitch, indicação | `irbis-entrega-e-recorrencia` |
| Regras globais da casa (anti-AI-slop, commit por fase) | `workbench-metodo-da-casa` |

Esta skill dá a VOZ. As outras dão o conteúdo, o processo e a validação de fatos. Use `irbis-guarda-pivot` junto sempre que a peça citar número, prazo ou case.

## Fontes canônicas

Paths relativos a `Business/irbis/`. Ordem de consulta: **1) `CLAUDE.md` → 2) `.claude/brand-context.md` → 3) Manual de Copy v2.**

| Arquivo | O que vale | Cuidado |
|---|---|---|
| `CLAUDE.md` | Escopo, ICP, preço, prova social, quem é o time. **Vence tudo** | Nenhum. É o topo da hierarquia |
| `.claude/brand-context.md` | Identidade, público, voz, proibições, evidência pública permitida | Atualizado 12/ago. Confirme com `grep -n "três frentes" .claude/brand-context.md` |
| `01 - Marca/IRBIS_Manual_de_Copy_v2.md` | A VOZ: tom por contexto, 7 fórmulas, banidos, glossário | ⚠️ Tem sobras de site vivas. Ver a lista abaixo antes de copiar qualquer exemplo |
| `04 - Marketing/P1-posicionamento-nicolas.md` | Camada pessoal: Big Idea v4, Bio v4, vilão, filtro, 3 pilares | Versões v1 a v3 ficam empilhadas como histórico. **Use só o que estiver marcado v4** |
| `03 - Comercial/00 - Planejamento/politica-de-preco-irbis.md` | O que pode ser dito de preço em cada canal | Vence qualquer preço citado em doc antigo |
| `01 - Marca/brand_guide_completo.html` | Tokens visuais: paleta, Sora, pantera | `<title>` tem placeholder "[MARCA]". Cosmético, ignore |
| `05 - Growth/pseo/evidence.json` | Evidência pública estruturada | Fonte de prova para páginas de conteúdo |

### ⚠️ Sobras de site ainda vivas no Manual de Copy v2

O Manual foi reescrito em 09/ago mas ficou com trechos do mundo antigo **sem marcação**. Não copie nenhum destes:

| Onde | O que está errado |
|---|---|
| §06, template de recusa | "A gente faz [site / sistema acoplado à operação]" — oferece site na frase que deveria recusar escopo |
| §05, Fórmula 1 | "O mercado passou anos fazendo site bonito sem pensar no negócio" |
| §05, Fórmula 3 | "Sites que você mostra pra alguém" |
| §05, Fórmula 4 | Os dois exemplos ("site simples mesmo", "não fazemos site bonito") |
| §05, Fórmula 6 | "SEU SITE ESTÁ MATANDO SUA MARCA" e a trava "Camada 2 até 19/ago" (extinta) |
| §08 | Canal "Site" inteiro, e o breakup "tentei duas vezes sobre o site de vocês" |
| §09, glossário | "Porta / o que mora dentro" como "metáfora-mãe da tese atual". **Está aposentada desde 04/ago** |
| Cabeçalho e rodapé | Dizem 28/jul apesar da reescrita de 09/ago |

Use a **estrutura** das fórmulas do Manual. Os exemplos vivos deste arquivo, abaixo, substituem os de lá.

## A marca em 6 linhas

- **Identidade:** "Sou Nicolas Cunha. Construo sistemas, automação e IA para empresas da economia real."
- **Bio Instagram pessoal (v4, fechada em 09/ago/2026, usar verbatim):**
  > Sistemas com IA pra empresas da economia real.
  > Critério de quem entende o negócio, não ferramenta de prateleira.
  > Já gerei +R$350k em vendas pra cliente — sei atrair e converter.
  > Manda "IA" no direct.
  > 🔗 irbis.com.br
- **CTA fixo de conteúdo:** **manda "IA" no direct.** Substituiu "manda 'site' no direct" em 09/ago/2026. Palavra-chave única, uma ação só por peça.
- **Assinatura:** em DM, e-mail e post assina só **"Nicolas"**. Em rodapé de proposta ou documento, **"Nicolas · IRBIS"**. NUNCA "Equipe IRBIS".
- **Anti-ICP:** quem quer o mais barato, quem decide por comitê, quem quer branding/site/social media, quem procura dica técnica de graça.
- **Nome da marca:** "irbis" é o nome mongol da pantera das neves, o fantasma das montanhas. A metáfora é aparecer, entregar resultado com número e prazo, e sumir. Adjetivo vago sem número não está na metáfora.

### Nome do perfil: decisão registrada, não pendência

O perfil do Instagram continua **"Nicolas Cunha / Web Design & IA"** por decisão consciente do dono (reafirmada em 12/ago/2026): dono de empresa tradicional ainda pesquisa "site" e "web design", e o nome funciona como campo de busca.

**Não trate isso como item em aberto.** Não sugira trocar, não liste em auditoria, não abra pendência. O que continua valendo: **nenhuma peça oferece site**, mesmo com o nome do perfil dizendo Web Design.

## Público

Dono de empresa da economia real que já tem equipe, operação e receita. A dor aparece quando atendimento, orçamento, pedido, follow-up ou decisão ainda dependem de WhatsApp, planilha, memória e trabalho repetido.

**ICP amplo é decisão, não lacuna.** Resolvido em 09/ago/2026: sem nicho ou vertical definido, por escolha do dono, até haver dado para segmentar. Mesmo ICP para as 3 frentes. Não pergunte "qual o ICP" e não trate como aberto.

Não escrever para designer, desenvolvedor ou founder de SaaS procurando dica técnica. Escrever para quem decide orçamento e sente o custo do gargalo.

## Voz (constante) e tom (varia por canal)

**Voz — 5 traços que nunca mudam:**
1. Confiante sem arrogância vazia. Sente na forma, não na repetição.
2. Direta. Sem "no sentido de", "de certa forma", "acreditamos que".
3. Com propósito. Instinto por resultado, não por ego.
4. Técnica. Domina o assunto, não simplifica para parecer acessível.
5. Seletiva. Escolhe o cliente tanto quanto é escolhida.

**Regras de escrita que valem em qualquer canal:**
- Uma ideia por parágrafo.
- Problema e consequência antes da ferramenta.
- O sujeito age: Nicolas constrói, a equipe usa, o vendedor registra. Nunca "a solução entende".
- Número só entra com fonte ou medição verificável.
- IA é trabalho executado, não selo decorativo.

**Tom por canal:**

| Canal | Tom | Regras duras |
|---|---|---|
| Site / headline | Cortante, caps | CAPS; até 12 palavras na linha; sem ponto final; subheading em sentence case; CTA imperativo |
| Proposta comercial | Confiante, claro | Título = cliente + o que será feito; problema ANTES da solução; preço direto, sem rejustificar |
| WhatsApp / DM | Direto, dono falando com dono | Nunca abrir com "Olá, tudo bem?"; 1ª mensagem até 3 linhas; gargalo específico antes do pitch; assina "Nicolas" |
| E-mail de follow-up | Objetivo, sem pedir desculpa | Assunto curto, sem emoji, sem "follow-up" no assunto; corpo de 2 a 3 linhas |
| Instagram / redes | Provocador, com posição | Sem "depende" / "cada caso é um caso"; linha 1 resultado ou provocação, linha 2 contexto, linha 3 CTA; CTA fixo "manda 'IA' no direct" |
| LinkedIn | Igual DM, cadência própria | Nunca citar prospect nominalmente em análise pública |
| Blog / pSEO | Explicativo, com faixa de preço | Responde a pergunta do título direto no primeiro parágrafo; faixa de preço pode e deve aparecer |
| Reunião de venda | Dono falando com dono | Sem travessão, sem tom de agência. Mecânica em `estrutura-reuniao-unica-irbis.md` |

## As 7 fórmulas de copy — exemplos vivos, escopo atual

A estrutura vem do Manual §05. **Os exemplos abaixo substituem os de lá**, que são todos de site.

| # | Fórmula | Estrutura | Exemplo vivo |
|---|---|---|---|
| 1 | Setup + Punch | contexto calmo em minúsculas → verdade em CAPS | "Seu time copia pedido do WhatsApp pra planilha todo dia de manhã. Ninguém contratou ninguém pra isso. E NINGUÉM VAI CONSERTAR SOZINHO." |
| 2 | Negação Tripla | SEM [ruim]. SEM [ruim]. SEM [ruim]. | "SEM PLANILHA. SEM RETRABALHO. SEM DEPENDER DE MEMÓRIA." |
| 3 | Resultado antes do processo | o que o cliente TEM depois, não o que a IRBIS faz durante | "A manhã da sua equipe de volta." |
| 4 | Exclusão como posicionamento | dizer quem NÃO é cliente | "Se você quer plugar uma ferramenta pronta e torcer, a IRBIS NÃO É PRA VOCÊ." |
| 5 | Dois substantivos em tensão | [instinto] + [técnica] | "CRITÉRIO HUMANO. EXECUÇÃO DE MÁQUINA." |
| 6 | Afirmação-provocação | declaração radical → a IRBIS como nova realidade | "IA DE PRATELEIRA NÃO CONHECE SUA OPERAÇÃO." → Sistema construído em cima dela, sim. |
| 7 | Oferta com escopo fechado | o que entra, o prazo, o preço, sem floreio | "Sistema sob medida, escopo fechado, entre R$3.000 e R$10.000. O número exato sai na reunião." |

**Template de recusa (substitui o do Manual §06, que ainda oferece site):**

> Isso a IRBIS não faz, e não é falsa modéstia, é escolha. A gente faz sistema, automação e IA acoplados na operação. Quando você faz tudo, não domina nada.

## Preço em copy

Regra completa em `03 - Comercial/00 - Planejamento/politica-de-preco-irbis.md`. O que a copy precisa saber:

**A faixa é pública.** Pode aparecer em post, DM, WhatsApp, ligação, site e página de pSEO:

| Frente | Faixa citável |
|---|---|
| Sistemas | R$ 3.000 a R$ 10.000, valor fechado por escopo |
| Bot de IA | R$ 1.000 de setup + R$ 500/mês |
| Consultoria de IA | R$ 5.000 até R$ 10 mi de faturamento anual do cliente; R$ 10.000 acima |

**O número fechado de um projeto nunca entra em copy.** Ele nasce na reunião.

**Nunca cite:** valor por hora; estimativa de "Sistema complexo", "Automação fora do bot" ou "Consultoria enterprise" (os três estão sob consulta e **não têm faixa**); os R$ 2.997 do QG OS (exceção de portfólio, não é âncora); qualquer preço do catálogo de site (R$197, R$297, R$997, R$1.997, R$2.497, R$3.497, R$4.497, R$6.997, R$11.997).

**Duração da reunião: 1 hora.** Em qualquer peça, convite ou script. Nunca 20, 30 ou 45 minutos.

**Prazo: não invente.** Não existe prazo padrão por frente. Em peça pública, diga o que é verdade: o prazo sai na proposta, em dias úteis, e entra no contrato.

## Prova social: o que pode entrar em texto

| Case | Como pode ser usado | Limite |
|---|---|---|
| **Odery Drums** | **Prova de produto das 3 frentes.** CRM implementado = Sistemas. Bot de WhatsApp rodando = Soluções com IA. Ajuda na implementação = Consultoria (qualitativa, "ajudei a implementar") | **Sem número financeiro.** Não existe resultado medido publicável |
| **E-Force** | Credencial pessoal: "já gerei +R$350k em vendas pra cliente". Prova que o Nicolas sabe atrair e converter | **Não faz ponte para Sistemas/IA.** Proibido usar como se provasse que a oferta atual funciona. É site, e o dono definiu baixo alinhamento com a oferta |
| **MINUTA / A. Cunha Advocacia** | Obra em andamento, com fontes conferíveis e revisão humana obrigatória. Pode falar em primeira pessoa que está construindo | **Sem resultado.** E **nomear o cliente em peça pública não está decidido** — é o escritório da mãe do Nicolas. Pergunte antes de citar nome ou nicho |
| **13 rotinas de IA operando a própria IRBIS** | Contagem operacional. Prova de que a casa usa o que vende | Não é ROI. Não derive economia de horas disso |

**Único número financeiro afirmável:** **+R$350k em vendas** (E-Force), com o enquadramento da tabela acima.

**Banidos, nunca em peça nova:**
- **"+500"** e **"LTV 1,8x"** (inventados, decisão do dono em 04/jul/2026).
- **Adash** — nunca foi entregue. Não citar.
- **Eduboxs** — não é case, registro divergente não resolvido.
- **~27,5h/semana de ROI de IA** — estimativa marcada "em validação", com regra explícita do dono de não usar externamente.
- **98% pesquisam antes / 75% julgam pelo design / 53% abandonam por lentidão** — são pesquisa de comportamento em SITE. **Não migram para operação ou sistema.** Se precisar de dado de dor de operação manual, ache fonte nova. Não invente número.

## Regra JDP: sem travessão

Regra fixa do Grupo JDP, confirmada pelo dono em 04/jul/2026. Ninguém adapta por conta própria.

- **Peça nova** (qualquer texto que você está gerando ou alterando agora): **sem travessão (—)**. Use ponto, vírgula ou dois-pontos.
- **Bloco aprovado** citado verbatim entre aspas nesta skill: mantenha exatamente como está.
- **Teste:** está digitando as palavras agora? Peça nova, sem travessão. Está copiando bloco entre aspas sem mudar nada? Mantenha.

## Palavras e padrões banidos

**Formalidade e clichê:** "Prezado(a)", "Venho por meio desta", "Soluções personalizadas", "Transformamos ideias em realidade", "Metodologia ágil", "Entregamos valor", "Nossa missão é", "Estamos aqui para ajudar", "Qualquer dúvida, estou à disposição", "Sucesso!" como encerramento, "Simples assim", "Humildemente", "Tenho certeza que vai adorar".

**Linguagem de agência grande:** "agência" para se referir à IRBIS, "soluções", "inovar", "transformar", "revolucionar", "sinergia", "ecossistema", "jornada", "jornada omnichannel", "transformação digital", "de ponta a ponta", "agregar valor", "potencial".

**Escopo morto oferecido:** site, landing page, branding, identidade visual, dashboard avulso, Web3, motion, social media. **Permitido só para NEGAR** (Fórmulas 2 e 4). "Você faz site? Não. Faço sistema e automação." nega, não oferece.

**Anti-slop da casa:** advérbios de ênfase ("realmente", "simplesmente", "literalmente"); contraste binário "Não é X, é Y"; falsa agência ("a solução resolve" — nomeie quem age); abertura com "Aqui está" ou "A verdade é"; pontuação dramática ("Ponto final.", "Deixa isso absorver."); voz passiva; emoji como ícone em UI; lista de 3 itens quando 2 resolvem.

**Vocabulário sempre usar:** sistema, automação, agente, operação, gargalo, construir, escopo fechado, critério, dono de negócio, economia real, devolver tempo, rodar.

## Camada P1 — perfil pessoal do Nicolas (JDP)

Fonte: `04 - Marketing/P1-posicionamento-nicolas.md`. **Use só os blocos marcados v4.**

- **Big Idea (v4, 04/ago/2026):**
  > A maioria acha que plugar uma IA pronta já resolve o negócio. Mas empresa da economia real não cresce por ter uma ferramenta genérica rodando, cresce pelo critério de quem construiu aquilo pra operação específica dela. Eu construo o sistema acoplado na operação real do cliente, decidido por quem entende do negócio, não por quem só sabe plugar automação de prateleira. É isso que devolve hora pro dono.

- **Vilão de duas caras (não mudou com o pivot):** (1) a **IA de prateleira**, que promete e não conhece a operação; (2) a **operação manual aceita como normal**.

- **Os 3 pilares de conteúdo (v4):**
  1. **IA que trabalha, não que promete** (autoridade técnica). Ataca a IA de prateleira. Bastidor de construção, "por que seu chatbot pronto não resolve", diagnóstico antes de construir.
  2. **O que roda por trás do negócio** (resultado). Ataca a operação manual. "Por que faturar bem não é o mesmo que ter negócio que escala", "quanto tempo seu negócio te devolve".
  3. **O terceiro caminho** (posicionamento). Ataca a agência de software cara e a ferramenta de prateleira ao mesmo tempo.

- **Filtro diário, rode antes de qualquer post pessoal:**
  1. Isso defende a tese?
  2. Isso bate em alguma cara do vilão?
  3. Só com esse post, a pessoa saberia no que eu acredito?

  Qualquer "não" → reescreve o post e roda as **três** perguntas de novo.

- **Fixado 2 (A Prova) está em aberto.** O dono precisa escolher entre usar E-Force só como credencial pessoal, ou trocar o case pela Odery. **Não escolha por ele.** Se a peça depender disso, pergunte.

**Qual voz usar:**

| A peça é... | Use |
|---|---|
| Site, proposta, material com nome/logo da IRBIS | Voz IRBIS, sem camada P1 |
| Post, story ou DM do perfil pessoal do Nicolas | Voz IRBIS + camada P1 por cima, com filtro diário obrigatório |

## Tokens visuais

| Token | Valor | Uso |
|---|---|---|
| `--abyss` | `#0C0C0E` | Fundo principal |
| `--onyx` | `#18181B` | Fundo secundário |
| `--slate` | `#27272A` | Bordas, superfícies |
| `--signal` | `#FF3D00` | Cor de marca. Uso escasso, é acento |
| `--deep-signal` | `#E63900` | Hover |
| `--light` | `#FAFAFA` | Texto principal |
| `--muted` | `#8A8A93` | Texto secundário |
| `--dim` | `#52525B` | Texto terciário |

**Tipografia: Sora.** ExtraBold 800 headlines (48 a 72px, line-height 1.1); Bold 700 títulos de seção; Regular 400 corpo (14 a 16px, line-height 1.7); SemiBold 600 labels (10 a 12px, uppercase, letter-spacing 0.15em).

**Mascote:** a pantera das neves. É o ícone da marca. Não usar icon set genérico no lugar dela.

## Exemplos bom vs ruim

**1. DM de prospecção**

Ruim:
> Olá, tudo bem? Somos a IRBIS, uma agência especializada em soluções de IA personalizadas. Gostaríamos de apresentar como podemos agregar valor à jornada digital do seu negócio. Qualquer dúvida, estou à disposição!

(Viola: "Olá, tudo bem?", "agência", "soluções personalizadas", "agregar valor", "jornada", "estou à disposição", zero gargalo específico, assina como empresa.)

Bom:
> Vi que os pedidos de vocês entram por WhatsApp e alguém passa pra planilha depois.
> Isso é uma manhã por semana que some, e é onde pedido se perde.
> Posso te mostrar como isso fica automático? Nicolas

**2. Post de posicionamento (Instagram)**

Ruim:
> A IRBIS realmente entrega soluções de IA inovadoras que transformam a operação do seu negócio. Não é só uma automação, é um ecossistema completo. Entre em contato e saiba mais!

(Viola: "realmente", "soluções inovadoras", "transformam", "ecossistema", contraste binário, CTA genérico.)

Bom (Fórmula 1, sem travessão):
> Você plugou um chatbot pronto e ele respondeu errado pro seu melhor cliente.
> Ele não conhece seu processo, seu prazo, sua exceção. Ninguém ensinou.
> IA DE PRATELEIRA NÃO CONHECE SUA OPERAÇÃO.
> Sistema construído em cima dela, sim. Manda "IA" no direct.

**3. Resposta a "quanto custa?" no WhatsApp**

Ruim:
> Depende muito do escopo! Cada caso é um caso. Vamos marcar uma call de 20 minutinhos pra eu te explicar tudo?

(Viola: "cada caso é um caso", diminutivo, esconde a faixa que é pública, duração errada.)

Bom:
> Sistema fechado fica entre R$ 3.000 e R$ 10.000. Bot de IA é R$ 1.000 de implementação mais R$ 500 por mês. Consultoria de IA é R$ 5.000, ou R$ 10.000 acima de R$ 10 milhões de faturamento.
> O número do seu caso sai depois que eu entender o que trava a operação. São 60 minutos e você sai com o valor real.
> Consegue quinta às 15h? Nicolas

## Checklist antes de entregar qualquer peça

1. [ ] Escopo: só as 3 frentes? Site, branding, dashboard e Web3 aparecem **só para negar**, nunca para oferecer?
2. [ ] Zero palavras e padrões banidos? Zero travessão em peça nova?
3. [ ] Uma ideia por parágrafo, sujeito que age, número concreto antes de afirmação vaga, "você" antes de "nós"?
4. [ ] Prova social dentro dos limites da tabela? Nada de "+500", "1,8x", Adash, Eduboxs, 27,5h, ou as 3 estatísticas de site?
5. [ ] Se cita preço: é **faixa**, não número fechado? Nenhuma frente "sob consulta" ganhou estimativa inventada?
6. [ ] Se cita reunião: **1 hora**?
7. [ ] Se cita prazo: não inventei número?
8. [ ] Se é conteúdo do perfil pessoal: passou pelo Filtro Diário (3 perguntas, qualquer "não" reescreve tudo)?
9. [ ] Assinatura certa ("Nicolas", nunca "Equipe IRBIS")? CTA "manda 'IA' no direct" quando for conteúdo?
10. [ ] Rodei `stop-slop` sobre o rascunho? Se é peça de venda, rodei `ogilvy` também?
11. [ ] Aprovação explícita do Nicolas nesta conversa antes de publicar ou enviar?

## Ambiguidades abertas (pergunte ao dono antes de decidir)

| Questão | Estado |
|---|---|
| Fixado 2 do P1: E-Force como credencial, ou trocar pela Odery? | ABERTO desde 09/ago. Impacto de roteiro grande demais para decidir sozinho |
| Nomear A. Cunha Advocacia em peça pública | ABERTO. É o escritório da mãe do Nicolas. Pergunte antes |
| "Predador técnico" sobrevive ao pivot? | ABERTO. Era persona da era site/branding |
| Manifesto da marca | PENDENTE. Era 100% da era branding/site. Reescrever do zero ou aposentar |
| Deck `Apresentação Comercial.html` | NÃO AUDITADO. Pode ainda mostrar "SITE? SIM.". Não use em call sem conferir |
| Rede de indicação da E-Force pós-pivot | ABERTO. A rede foi construída em torno de quem precisava de site |
| Site irbis.com.br | Ainda publica preço e oferta de site em várias páginas. Ver `irbis-site-ops` |

## Proveniência e manutenção

- **Reescrita em 12/ago/2026**, substituindo integralmente a versão de 04/jul/2026 (que descrevia a IRBIS como "exclusivamente sites"). Fontes: `CLAUDE.md` (12/ago), `.claude/brand-context.md` (12/ago), `01 - Marca/IRBIS_Manual_de_Copy_v2.md`, `04 - Marketing/P1-posicionamento-nicolas.md` (v4), `politica-de-preco-irbis.md`, `estrutura-reuniao-unica-irbis.md`, `01 - Marca/brand_guide_completo.html`.
- **Quando reconferir:** antes de peça que cite número, preço, prazo ou case. Esses são os campos que driftam.
- **Comandos de verificação** (raiz do projeto, use `/usr/bin/grep` porque o hook rtk trunca saída):
  - Escopo ainda é 3 frentes? → `/usr/bin/grep -n "Três frentes" CLAUDE.md`
  - brand-context é pós-pivot? → `/usr/bin/grep -n "três frentes" .claude/brand-context.md`
  - Faixa de preço mudou? → `/usr/bin/grep -n "3.000" "03 - Comercial/00 - Planejamento/politica-de-preco-irbis.md"`
  - Duração da reunião ainda é 1h? → `/usr/bin/grep -n "1 hora" "03 - Comercial/03 - Reunião de Vendas/estrutura-reuniao-unica-irbis.md"`
  - CTA ainda é "IA"? → `/usr/bin/grep -n "manda 'IA' no direct\|Manda \"IA\" no direct" "04 - Marketing/P1-posicionamento-nicolas.md"`
  - Fixado 2 foi decidido? → `/usr/bin/grep -n "Fixado 2" "04 - Marketing/P1-posicionamento-nicolas.md"`
  - Tokens visuais intactos? → `/usr/bin/grep -n "FF3D00" "01 - Marca/brand_guide_completo.html"`
- **Fatos datados que driftam mais rápido:** faixa de preço (09/ago), política de preço e duração da reunião (12/ago), time de duas pessoas (12/ago), prova social por case (09/ago), decisão do Fixado 2 (em aberto).
