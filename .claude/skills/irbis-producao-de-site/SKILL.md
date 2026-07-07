---
name: irbis-producao-de-site
description: "Use quando a IRBIS for produzir um site de cliente, do briefing ao ar: começar projeto novo em '02 - Projetos/', criar landing page, site institucional ou e-commerce para cliente, escolher stack, protótipo, design no Stitch, tokens, copy do cliente, QA pré-lançamento, deploy Vercel do projeto do cliente, handoff técnico. Dispara em: 'criar o site do cliente X', 'começar o projeto', 'briefing fechado', estudo de persona, identidade verbal do cliente, kickoff baseline, prototype.html."
---

# IRBIS — Produção de Site de Cliente (execução)

Runbook de EXECUÇÃO: o que acontece entre "cliente fechou" e "site do cliente no ar e entregue". Detalhamento técnico da fase Produção do processo de entrega — a camada comercial (termo de aceite, checkpoint com cliente, repitch MRR, indicação) vive em `irbis-entrega-e-recorrencia`; abra-a antes da Fase 6/7.

Paths relativos à raiz `Business/irbis/`. Paths têm espaços — sempre aspas em comandos.

## Quando NÃO usar esta skill

| Situação | Use no lugar |
|---|---|
| Termo de aceite, condição de pagamento, checkpoint com cliente, reunião de entrega, repitch MRR, indicação | `irbis-entrega-e-recorrencia` |
| Editar/publicar o site do ESTÚDIO (irbis.com.br, cases, vercel.json do site/) | `irbis-site-ops` |
| Copy externa DA IRBIS (posts, DMs, proposta, VSL) | `irbis-brand-voice` |
| O que a IRBIS pode afirmar (números, cases, escopo pós-pivot) | `irbis-guarda-pivot` |
| Gerar ou fechar a venda | `irbis-prospeccao-e-diagnostico` / `irbis-call-de-vendas` |
| Regras globais da casa (RTK, superpowers, anti-AI-slop completo) | `workbench-metodo-da-casa` (`/Users/nicolascunha/Projects/Business/.claude/skills/workbench-metodo-da-casa/SKILL.md`; symlink em `Business/irbis/.claude/skills/workbench-metodo-da-casa`) |

## Princípios inegociáveis (verificados em 06/jul/2026)

1. **Ordem FIXA: Estratégia → Design → Copy → Código.** Não inverta (`03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md`, seção DURANTE).
2. **Produção começa ao fim da call de briefing** — sem intervalo morto entre fechar e começar (mesmo doc, seção ANTES).
3. **Stack oficial:** Design = Stitch (Google) · Código = Claude Code · Deploy = Vercel (mesmo doc).
4. **Commit a cada fase concluída e antes de todo deploy** (regra do dono, 04/jul/2026, verbal, sem artefato no repo). Git próprio por cliente; NUNCA commitar código de cliente no repo raiz da IRBIS.
5. **Prazos reais com cliente:** LP 1–2 semanas · institucional 3–4 semanas · e-commerce sob escopo. O deck diz "2–3" para institucional — use o prazo real, não o do deck.
6. **Anti-AI-slop integral em cada página** (fontes banidas, paletas proibidas, layouts genéricos, stop-slop na copy). Lista completa em `workbench-metodo-da-casa`; mínimo aplicável sem ela: nenhuma fonte genérica de IA, nenhum gradiente roxo/azul decorativo, nenhum grid de 3-4 cards idênticos, sem adjetivos vazios na copy.
7. **Copy na voz do CLIENTE, não da IRBIS.** `irbis-brand-voice` é só para peças DA IRBIS; num projeto de cliente valem as regras de QUALIDADE (ogilvy, stop-slop) com a personalidade da marca dele.
8. **Cliente acompanha por preview Vercel** desde o início + checkpoint semanal (sem upsell durante a produção).

## Fase 0 — Setup do projeto (D0, ~30 min, logo após o briefing)

### 0.1 Estrutura de pastas — decida ANTES pela tabela

Raiz absoluta do repo IRBIS: `/Users/nicolascunha/Projects/Business/irbis/` (todo path relativo desta skill parte daqui — `cd` para essa raiz antes de qualquer comando da Fase 0 caso a sessão não tenha aberto já dentro dela).

| Padrão de projeto | Caminho (relativo à raiz acima) | Precedente |
|---|---|---|
| Aninhado (Cliente com subprojeto nomeado) | `02 - Projetos/<Cliente>/site-<cliente>/` | `02 - Projetos/Odery Drums/Site Odery/` |
| Flat (Cliente = projeto, sem subpasta) | `02 - Projetos/<cliente>/` | `02 - Projetos/adash/` |

⚠️ Confirme com o dono qual padrão usar na primeira vez de cada projeto novo (ver "Pergunte antes"). **Default se não houver resposta em até 4h úteis: ANINHADO** (`02 - Projetos/<Cliente>/site-<cliente>/`) — é o padrão com mais precedentes na casa (Odery Drums). Prossiga com o default e registre a pendência em `docs/kickoff-baseline.md` para o dono corrigir depois se divergir; não trave a Fase 0 esperando resposta.

**Slug do nome do cliente** (usado em pasta e repo): minúsculo, sem acento, espaços e caracteres especiais viram `-`, sem `-` duplicado nem `-` nas pontas. Exemplo: "Café Bella" → `cafe-bella`. Comando: `echo "Café Bella" | iconv -t ascii//TRANSLIT | tr '[:upper:]' '[:lower:]' | /usr/bin/sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'`.

### 0.2 Git + GitHub + Vercel

```bash
# ANINHADO: mkdir -p "02 - Projetos/<Cliente>/site-<cliente>" && cd "02 - Projetos/<Cliente>/site-<cliente>"
# FLAT:     mkdir -p "02 - Projetos/<cliente>" && cd "02 - Projetos/<cliente>"

/usr/bin/git init
/usr/bin/git status  # verificar: "On branch main" (ou master) sem erro

# Remote privado desde o D0 — CRIE o repo de fato (só "remote add" deixa o backup inexistente em silêncio).
# Plataforma GitHub, conta nicolasacunha (precedente: odery-drums).
# Slug do <cliente>: ver regra de slug na seção 0.1 (minúsculo, sem acento, "-" como separador).
gh repo create nicolasacunha/<cliente>-site --private --source=. --remote=origin
/usr/bin/git remote -v  # verificar: deve retornar a URL do repo

npx vercel link
# Prompts: "Set up and deploy?"->No | "Which scope?"-> org do Nicolas
#   -> ID esperado: team_nrKsYjAemGbEQQSbV5SxOhdn (conta/login: a mesma sessão `vercel login`
#      já usada nos projetos da casa — NÃO a conta pessoal do operador, se forem contas diferentes
#      na mesma máquina). Se essa opção não aparecer na lista (primeira vez na máquina ou token
#      novo), rode `npx vercel teams ls` para ver os scopes disponíveis; se
#      team_nrKsYjAemGbEQQSbV5SxOhdn não estiver lá, PARE e confirme o scope certo com o dono
#      antes de prosseguir — não escolha outro scope por conta própria (risco real: linkar o
#      projeto do cliente à conta pessoal do operador em vez da org certa).
# | "Link to existing project?"->No | "Project name?"-><cliente>-site
test -f .vercel/project.json && echo "Vercel linkado OK"  # verificação
```

**Regra de push:** todo `git commit` de fim de fase é seguido de `git push`, sem exceção — commit sem push não é backup.

### 0.3 Symlinks das skills IRBIS dentro do repo do cliente

Motivo: o repo do cliente é raiz de projeto própria — uma sessão aberta dentro dele NÃO enxerga as skills da IRBIS por padrão (incidente real: Site Odery, 06/jul/2026). Contagem de `../` = nº de níveis entre `.claude/skills/<link>` do cliente e `Business/irbis/.claude/skills/` (a origem real do link).

`workbench-metodo-da-casa` vive um nível ACIMA de `Business/irbis/`, em `Business/.claude/skills/workbench-metodo-da-casa/SKILL.md` — dentro do próprio repo IRBIS o link já existente é `Business/irbis/.claude/skills/workbench-metodo-da-casa -> ../../../.claude/skills/workbench-metodo-da-casa` (3 níveis, confirmado por inspeção direta).

Contagem verificada para o padrão ANINHADO (`02 - Projetos/<Cliente>/site-<cliente>/.claude/skills/<link>` subindo até `Business/irbis/.claude/skills/`): `site-<cliente>` → `<Cliente>` → `02 - Projetos` → raiz `Business/irbis/` = 4 subidas, mais 1 para entrar em `.claude/skills/` = **5 níveis de `../`**. Exemplo concreto — de dentro de `02 - Projetos/Odery Drums/Site Odery/.claude/skills/irbis-producao-de-site`, o alvo real é `Business/irbis/.claude/skills/irbis-producao-de-site`, e o link é `../../../../../.claude/skills/irbis-producao-de-site`.

| Padrão de projeto | Profundidade até `Business/irbis/.claude/skills/` | Comando (exemplo com cliente "Odery Drums" / projeto "Site Odery") |
|---|---|---|
| Aninhado: `02 - Projetos/<Cliente>/site-<cliente>/` | 5 níveis acima | `ln -sfn "../../../../../.claude/skills/irbis-producao-de-site" .claude/skills/irbis-producao-de-site` |
| Flat: `02 - Projetos/<cliente>/` | 4 níveis acima (um `../` a menos que o aninhado) | `ln -sfn "../../../../.claude/skills/irbis-producao-de-site" .claude/skills/irbis-producao-de-site` |

`workbench-metodo-da-casa` fica em `Business/.claude/skills/`, um nível ACIMA de `Business/irbis/`, logo +1 `../` vs. a tabela acima — ou seja, 6 níveis no aninhado / 5 no flat (comando incluído no bloco abaixo).

```bash
mkdir -p .claude/skills
# Padrão ANINHADO (5 níveis até Business/irbis/.claude/skills/; 6 para workbench, que fica 1 nível acima em Business/.claude/skills/) — repita para cada skill, ajustando o nome:
ln -sfn "../../../../../.claude/skills/irbis-producao-de-site"      .claude/skills/irbis-producao-de-site
ln -sfn "../../../../../.claude/skills/irbis-entrega-e-recorrencia" .claude/skills/irbis-entrega-e-recorrencia
ln -sfn "../../../../../../.claude/skills/workbench-metodo-da-casa" .claude/skills/workbench-metodo-da-casa
# Padrão FLAT (4 níveis; 5 para workbench) — troque o bloco acima por este se o projeto for flat:
# ln -sfn "../../../../.claude/skills/irbis-producao-de-site"      .claude/skills/irbis-producao-de-site
# ln -sfn "../../../../.claude/skills/irbis-entrega-e-recorrencia" .claude/skills/irbis-entrega-e-recorrencia
# ln -sfn "../../../../../.claude/skills/workbench-metodo-da-casa" .claude/skills/workbench-metodo-da-casa

# Validação obrigatória — rode SÓ DEPOIS de criar os symlinks acima (bloco ANINHADO ou FLAT já
# executado; rodar esta validação ANTES de criar os links vai imprimir "QUEBRADO" para todos,
# porque os arquivos ainda não existem — isso não é erro fatal, é só sequência errada, refaça na ordem certa).
# Cada linha deve imprimir "OK", nenhuma "QUEBRADO".
# Se aparecer "QUEBRADO", ajuste a contagem de "../" um nível de cada vez e rode de novo — não prossiga com link quebrado:
for l in .claude/skills/*; do test -f "$l/SKILL.md" && echo "OK $l" || echo "QUEBRADO $l"; done
```

### 0.4 Decisão de stack

| Tipo de projeto | Stack | Precedente |
|---|---|---|
| LP / site de conversão | **HTML single-file** (CSS+JS inline, sem build; GSAP+Lenis via CDN se pedir motion) | `site/` do estúdio + `02 - Projetos/Testes/` (alba, arvo, lumenform…) |
| Produto / app-like | **Vite + React + Tailwind** | `02 - Projetos/adash/` (React 19, TS 5.9, Tailwind 4) |
| Multi-página, conteúdo, bilíngue | **Next.js SSG** com markdown versionado | `02 - Projetos/Odery Drums/Site Odery/` (App Router, PT/EN) |

Na dúvida: **single-file** — padrão mais rodado da casa, elimina build/dependências no handoff.

⚠️ Esta decisão de stack (0.4) é só a escolha de FERRAMENTA/repositório (HTML vs. framework) e NÃO antecipa a Fase 1. Ela não substitui nem pula a Estratégia — o Princípio 1 (Ordem FIXA: Estratégia → Design → Copy → Código) continua valendo integralmente: nenhum código real, design no Stitch ou copy final acontece antes dos 4 artefatos da Fase 1 estarem prontos e aprovados. Stack é decidida no D0 porque afeta o `git init`/estrutura de pastas; o CONTEÚDO só é produzido na ordem fixa.

## Fase 1 — Estratégia (D0–D2)

Ordem instituída pelo dono (06/jul/2026, decisão verbal): **persona → identidade verbal → estratégia detalhada → kickoff baseline → "aí sim seguimos"**. Nada de design antes dos 4 artefatos abaixo.

Use a skill `superpowers:brainstorming` para gerar cada artefato — ela entrevista antes de escrever, não pule direto pro texto final. É uma skill de plugin global (vive em `~/.claude/plugins/cache/claude-plugins-official/superpowers/`, não em `.claude/skills/` do projeto) — invocação: chame a ferramenta Skill com `skill: "superpowers:brainstorming"`, não um comando de barra.

Os 4 artefatos vivem em `docs/` do repo do cliente (convenção proposta aqui; ver "Pergunte antes") e seguem no handoff.

1. **`docs/persona.md`** — para quem o CLIENTE fala: quem compra dele (máx. 2–3 perfis, 1 primário), dor que traz, objeções típicas, nível de consciência do problema, contexto de uso (mobile × desktop, deliberado × impulso), o que precisa ver para confiar. Insumos: briefing, Instagram/Google Maps/reviews do cliente, concorrentes diretos. Estrutura mínima: 1 seção por perfil + tabela "seção do site → perfil que ela mira".

   Template mínimo:
   ```markdown
   # Persona — <Cliente>

   ## Perfil 1 (primário): <nome do perfil>
   - Quem é: <idade, papel, contexto>
   - Dor que traz: <...>
   - Objeções típicas: <...>
   - Nível de consciência do problema: <inconsciente | consciente do problema | consciente da solução | consciente do produto>
   - Contexto de uso: <mobile/desktop, decisão deliberada/impulso>
   - O que precisa ver para confiar: <...>

   ## Perfil 2 (secundário, se houver): <nome>
   - (mesmos campos)

   ## Seção do site → perfil que ela mira
   | Seção | Perfil primário mirado | Objeção que mata |
   |---|---|---|
   | Hero | ... | ... |
   ```
   Nota: as seções do site ainda não existem nesta fase (só nascem na Fase 2/Spec). Preencha esta tabela com as seções PLANEJADAS (ex.: Hero, Prova social, Oferta) — é normal ajustá-la depois que a arquitetura de conteúdo da Fase 1.3 (`spec-design.md`) estiver fechada. Não pule a tabela; deixe-a como rascunho e atualize quando a arquitetura de conteúdo for definida.

2. **`docs/identidade-verbal.md`** — a voz DELE, não a da IRBIS: tom em 3 palavras, léxico (usa/nunca usaria), formalidade, proposta central em 1 frase, 5 frases-exemplo validadas com o cliente. Bloqueante: sem este doc a copy da Fase 3 sai genérica.

   Template mínimo:
   ```markdown
   # Identidade verbal — <Cliente>

   - Tom em 3 palavras: <ex.: direto, acolhedor, técnico>
   - Palavras que usa: <...>
   - Palavras que nunca usaria: <...>
   - Formalidade: <formal | neutro | informal>
   - Proposta central em 1 frase: <...>

   ## 5 frases-exemplo (validadas com o cliente)
   1. ...
   2. ...
   3. ...
   4. ...
   5. ...
   ```

3. **`docs/spec-design.md`** — só depois dos dois acima. Obrigatório: objetivo de conversão (número, não sensação), proposta de valor, arquitetura de conteúdo seção por seção amarrada à persona (qual objeção cada seção mata), CTA principal, **abordagem responsiva decidida aqui** (nunca no meio do código; sem certeza, pergunte ao dono antes de codar), referências visuais, seção "o que NÃO está incluído".

   Template mínimo:
   ```markdown
   # Spec de design — <Cliente>

   - Objetivo de conversão: <ex.: 20 leads/mês via formulário>
   - Proposta de valor: <...>
   - CTA principal: <...>
   - Abordagem responsiva: <mobile-first | desktop-first — decidida com o dono/cliente aqui>

   ## Arquitetura de conteúdo
   | Seção | Conteúdo | Objeção que mata (persona) |
   |---|---|---|
   | Hero | ... | ... |

   ## Referências visuais
   - <links/prints>

   ## O que NÃO está incluído
   - <item fora de escopo>
   ```

4. **`docs/kickoff-baseline.md`** (datado) — foto do ANTES, para comparar em **D+30, D+90, D+150** pós-lançamento (regra do dono, 06/jul/2026). Obrigatório: leads/vendas por mês e origem hoje, posição/nota/nº avaliações no GMB, tráfego atual (se houver acesso), Lighthouse do site antigo, prints do site antigo. Sem baseline não há comparação — e a comparação vira número REAL de case e munição do repitch MRR (`irbis-entrega-e-recorrencia`).

   Template mínimo:
   ```markdown
   # Kickoff baseline — <Cliente> (data: <YYYY-MM-DD>)

   - Leads/vendas por mês hoje: <número + origem>
   - GMB: posição <...> / nota <...> / nº avaliações <...>
   - Tráfego atual: <se houver acesso; senão "sem acesso">
   - Lighthouse do site antigo: <perf/a11y/SEO>
   - Prints do site antigo: <path/link>

   ## Marcos de comparação (preencher depois do lançamento)
   - D+30: <pendente>
   - D+90: <pendente>
   - D+150: <pendente>
   ```

**Gate de saída da Fase 1** (todos verdadeiros para avançar):
- [ ] Os 4 arquivos existem em `docs/` do repo do cliente
- [ ] Estratégia aprovada pelo dono E pelo cliente (o visível ao cliente, alinhado com ele)
- [ ] `git commit` + `git push` feitos

**Como solicitar aprovação e SLA:** envie os 4 artefatos (ou o resumo deles) ao dono pelo canal já em uso com ele (WhatsApp/mensagem direta — mesmo canal do resto do projeto; canal e contato são estabelecidos no briefing/D0, esta skill não define um novo); ao cliente, pelo link de preview Vercel ou pelo canal combinado no briefing. Se a sessão for automatizada/assíncrona e não houver canal de mensagem disponível para o agente (sem MCP de WhatsApp/e-mail configurado), registre a pendência em `docs/spec-design.md` e trate como "sem resposta" para efeito do SLA abaixo — não invente contato. Aguarde até **1 dia útil** por cada aprovação. "Prova de aprovação" aceitável: resposta escrita do dono/cliente (mensagem de texto, e-mail) confirmando explicitamente — não conta reação/emoji isolado nem silêncio. Sem resposta do dono em 1 dia útil: prossiga para Fase 2 com a estratégia como rascunho aprovado condicionalmente, registre isso em `docs/spec-design.md` ("aprovação do dono pendente, prosseguindo por SLA vencido em <data>") e sinalize ao dono assim que possível. Sem resposta do CLIENTE em 1 dia útil: reenvie uma vez; se ainda sem resposta após o reenvio, escale ao dono antes de assumir aprovação tácita — não presuma concordância do cliente por silêncio.

Só então Fase 2 — as janelas das fases seguintes deslocam ~+1 dia em relação aos rótulos.

## Fase 2 — Design (D1–D3)

1. Direção visual no **Stitch** (ferramenta web da Google, https://stitch.withgoogle.com — acesso manual do dono/operador, não integrada ao Claude Code) — gere 2–3 direções dentro do Stitch a partir do `docs/spec-design.md`, escolha 1. Skill de apoio: `stitch-design-taste` (orienta os prompts/critérios de escolha dentro do Stitch). Exporte/baixe os frames escolhidos e salve em `docs/design/` do repo do cliente (screenshots ou export do Stitch) — é a referência visual para os tokens e o protótipo HTML abaixo.
2. **Tokens do cliente** num `:root` próprio, na estrutura de `site/index.html` linhas ~214–234 (bg / superfícies / 1 accent / texto / muted / tipografia / easings).
   - **Accent escasso**: só em botões de ação e ênfases pontuais (CTA principal, links ativos, ícone de destaque) — nunca em fundo decorativo, bordas ornamentais ou blocos grandes. Teste: tire o accent de 3 elementos aleatórios; se a hierarquia não quebrar, está decorativo — revise.
   - Fontes banidas e regras de paleta/layout: bloco anti-AI-slop em `workbench-metodo-da-casa` ou resumo no Princípio 6.
3. **Protótipo HTML real** da página principal (padrão do redesign do estúdio, `docs/superpowers/plans/2026-05-23-irbis-redesign.md`), com Claude Code traduzindo a direção do Stitch (passo 1) em HTML/CSS real. Sequência exata:
   1. Crie `prototype.html` completo, usando os tokens do passo 2 e a direção visual do Stitch como referência de layout/estilo. Copy final AINDA NÃO existe nesta fase (é a Fase 3) — preencha os textos com **placeholders visivelmente marcados** (ex.: `[COPY: headline principal aqui]`, `[COPY: bullet de benefício 1]`) nunca lorem ipsum genérico, para que o cliente avalie estrutura/hierarquia/visual sem confundir com copy final.
   2. Publique: rode `npx vercel` (sem `--prod`) de dentro do projeto do cliente para gerar uma preview URL; envie esse link ao cliente e colete aprovação.
   3. Se existir `index.html` anterior, renomeie para `index.html.bak` (mantenha, não delete).
   4. Renomeie `prototype.html` para `index.html` (isso já remove o protótipo residual).
4. **Gate: cliente aprova o protótipo** (preview Vercel gerado no passo 3.2). `git commit` obrigatório neste gate, igual às demais fases — **`git push` também obrigatório** (o Princípio 4/regra da casa "todo commit seguido de push" vale sempre, sem exceção nesta fase).
5. `.impeccable.md` do cliente, se for criar: NOVO documento com o público DELE — nunca copie `site/.impeccable.md` (esse fala com founders de estúdio). Mínimo: público do cliente, o que ele precisa ver para confiar, tom visual esperado.

## Fase 3 — Copy (D3–D4)

1. Copy escrita **antes** do código final, na voz do cliente — conforme `docs/identidade-verbal.md` da Fase 1.
   - Ordem das skills de apoio: `ogilvy` (estrutura persuasiva/promessa) → `reef-copywriting` (refinamento) → `stop-slop` (remove clichês de IA, sempre por último). Sequencial, não em paralelo.
   - `irbis-brand-voice` NÃO se aplica aqui — é só para peças DA IRBIS.
2. Revisão em bloco: página interna `review-copy.html` com os textos por seção (template: `site/review-copy.html` do estúdio). Publique no preview Vercel e envie o link; aprova tudo de uma vez ali, não por WhatsApp solto.
3. **Todo fato sobre o negócio do cliente confirmado COM ele** antes de publicar — lição E-Force 27/mai/2026 (case publicado com "pedais" quando o produto era baterias eletrônicas, corrigido em `94a629e`).
4. **Gate: copy aprovada pelo cliente.** `git commit` + `git push`.

## Fase 4 — Código (D4 → D8 na LP; até D15 no institucional)

1. Plano de execução em markdown com checkboxes (`- [ ] tarefa`) a partir da `spec-design.md`, salvo em `docs/plan-codigo.md`. Execute via Claude Code; seções independentes podem ir para subagentes em paralelo.
2. Padrões técnicos obrigatórios (observáveis em `site/` e projetos de cliente):
   - **Comentário de seção** — banner de 3 linhas, régua `=` (abre) / nome da seção / régua `=` (fecha). Exemplo real (`site/index.html:1891-1893`):
     ```html
     <!-- ================================================================
          SECTION 02 — CASES
     ================================================================ -->
     ```
   - **Motion**: GSAP + ScrollTrigger + Lenis via CDN quando pedir movimento; easings nomeados seguindo o `:root` do estúdio (padrão Emil Kowalski).
   - **Imagens**: JPEG quality 90 em 2x (retina) + LQIP blur-up (`*-lq.jpg`, ~3–11 KB) em `assets/`. Geração: comando `sips` documentado em `irbis-site-ops` (default; se não achar lá, pergunte ao dono antes de outro pipeline).
   - **Forms com endpoint REAL desde o primeiro commit** — nunca suba com placeholder (lição `site/founder.html`, Formspree `XXXXX` ainda aberto em 06/jul/2026). Serviço default da casa: **Formspree** (mesmo usado em `site/founder.html`) — crie um form novo em https://formspree.io na conta do cliente ou da IRBIS (perguntar ao dono qual, se não tiver sido definido no briefing) e substitua o endpoint placeholder pelo ID real antes do primeiro commit que suba o formulário. Sem endpoint = página morta em produção.
3. Qualidade em camadas, nesta ordem, para CADA página (critério de saída: sem itens alto/crítico pendentes):
   1. `impeccable`/`frontend-design` — durante a escrita, já nasce com boa base visual.
   2. `critique` — avalia hierarquia/UX; corrija antes de seguir.
   3. `polish` — alinhamento/espaçamento/consistência.
   4. `audit` — a11y/performance; trate bloqueantes.
   5. `web-design-guidelines` — conferência final.
   6. Checklist anti-AI-slop (Princípio 6) — última barreira antes do commit.
   Documente achados relevantes no commit da página (ex.: `polish(hero): corrige alinhamento vertical do CTA`).
4. **Commit + push ao fim de cada seção/feature.** Conventional Commits PT-BR com escopo `<tipo>(<escopo>): <descrição>`. Tipos: `feat`, `copy`, `fix`, `docs`, `refactor`, `style`, `perf`. Ex.: `feat(hero): adiciona seção hero com CTA`. Mudança cruzando seções = vários commits pequenos, um por seção — não agrupe. Nunca `git add -A` em tree suja; confira `git status --short` antes. Preview Vercel sempre atualizado.

## Fase 5 — QA e lançamento (D8–D10 / D15–D20)

Checklist-gate — os 3 primeiros são incidentes reais que viraram regra. Marque só quando a verificação for verdadeira:

- [ ] **Analytics do CLIENTE com ID certo, único, da conta DELE** — lição GA4 (28/mai/2026: Measurement ID corrigido 2× no mesmo dia; placeholder → errado → `G-VKHL68G50M`). O Measurement ID (`G-XXXXXXXXXX`) NÃO é inventado nem herdado do estúdio: peça ao cliente que compartilhe o ID da conta GA4 dele (se ele já tiver GA4) ou crie uma propriedade GA4 nova em nome/conta do cliente e registre o ID resultante em `docs/kickoff-baseline.md` assim que obtido — não espere a Fase 5 para conseguir o ID, peça já na Fase 0/1 junto com o resto do baseline. Verificar aqui: no código-fonte publicado, o `G-XXXXXXXXXX` embutido bate exatamente com o ID registrado em `docs/kickoff-baseline.md`, não é placeholder nem o ID do estúdio.
- [ ] **Todo form testado ponta a ponta** — submeta um dado de teste no formulário publicado no preview e confirme chegada no destino real (e-mail/planilha/CRM do cliente). Preview já vale, não precisa esperar produção. Lição Formspree `XXXXX`.
- [ ] **Fatos e copy re-conferidos com o cliente** — envie o link do preview final para confirmação por escrito (WhatsApp/e-mail). Lição E-Force "pedais → baterias eletrônicas".
- [ ] Mobile testado em aparelho físico real (não só DevTools) + Lighthouse (perf/a11y/SEO, sem métrica vermelha). Sem aparelho físico disponível na sessão: use device emulation do Chrome DevTools como aproximação, registre em `docs/spec-design.md` que o teste em aparelho real ficou pendente de confirmação do dono, e não marque este item como definitivamente concluído — apenas como "testado via emulação, aparelho real pendente".
- [ ] Pack SEO: `<link rel="canonical">` (meta tag no `<head>`), OG/Twitter cards (validar no debugger do X ou preview do WhatsApp), `sitemap.xml`, `robots.txt`, `404.html`, favicon.
- [ ] Domínio/DNS do cliente apontado no Vercel dele — o apontamento em si (cliente configura o DNS no provedor dele, ou dono/operador orienta) acontece ANTES deste item, assim que o domínio do cliente for conhecido (idealmente já na Fase 0/1, para dar tempo de propagação); aqui é só a VALIDAÇÃO final antes do deploy de produção: validar com `dig <dominio-do-cliente>` e conferir que o resultado bate com o painel Vercel do projeto: no painel Vercel (aba Domains do projeto do cliente), o domínio deve aparecer com status "Valid Configuration"/checkmark verde; rode `dig <dominio-do-cliente> +short` e confirme que o IP/CNAME retornado é o mesmo que o painel Vercel exibe como valor esperado (A record `76.76.21.21` ou CNAME `cname.vercel-dns.com`, conforme o tipo configurado). Se o painel mostrar erro de configuração ou o `dig` não bater com o valor exibido, o domínio NÃO está pronto — não avance neste item.
- [ ] `/usr/bin/git status --short` sem nenhuma linha (nada modificado/não-rastreado; ajuste `.gitignore` se houver lixo de build/IDE) → commit + push.
- [ ] **Autorização explícita do dono para ESTE deploy de produção** — regra da casa, sem exceção: nenhuma skill contorna isto. Peça direto a ele pelo canal já em uso (WhatsApp/mensagem direta; mesmo canal do resto do projeto, estabelecido no briefing/D0), citando o link do preview. Sem resposta: aguarde — não interprete silêncio como autorização, não rode o deploy de produção, e não escale para outro canal sem indicação do dono. Preview (`npx vercel`, sem `--prod`) não precisa dessa autorização e pode ser publicado livremente durante toda a produção.

Só com todos marcados: `npx vercel --prod` (de dentro do projeto do cliente — NUNCA do `site/` do estúdio).

Depois do ar: **~3 dias de teste do cliente** antes da reunião de entrega.
- **Como o cliente começa a testar:** envie a ele, pelo canal combinado no briefing (WhatsApp/e-mail), a URL de produção (não a de preview) com uma mensagem curta pedindo que navegue pelo site, teste os formulários e avise qualquer problema — sem checklist formal a menos que o cliente peça; o objetivo é uso real, não QA estruturado por parte dele.
- Bugs relatados recebem hotfix imediato (commit + push + novo deploy), não esperam a reunião.

## Fase 6 — Handoff técnico

Preparar o pacote da reunião de entrega (a reunião em si e o que vem junto — repitch, indicação — é `irbis-entrega-e-recorrencia`).

⚠️ Ordem: durante a Fase 5 (QA), o projeto Vercel/domínio ainda é operado só pela IRBIS — o cliente NÃO tem acesso ao painel Vercel nesse momento, e o checklist-gate da Fase 5 (ex.: validação de DNS) é executado pelo dono/operador, não pelo cliente. O acesso ao cliente é concedido só agora, na Fase 6, como parte do handoff pós-lançamento — não antes.

- [ ] Acesso ao repositório GitHub transferido/compartilhado com o cliente
- [ ] Acessos Vercel (convite como membro/colaborador do projeto) + domínio/DNS entregues ao cliente
- [ ] Analytics com acesso do cliente (convite de usuário na propriedade GA4 registrada em `docs/kickoff-baseline.md`)
- [ ] Guia de edição — ⚠️ bônus prometido no deck comercial; entrega A CONFIRMAR com o dono antes de cada projeto. Não prometa ao cliente sem essa confirmação.

## Fase 7 — Virar case do estúdio (mesma semana)

Pré-requisito: **autorização do cliente** + **número REAL** — único afirmável hoje é "+R$350k" ("+500" e "LTV 1,8x" são BANIDOS, ver invariantes abaixo). Confirme afirmável em `irbis-guarda-pivot` antes de publicar número.

Sequência: `site/cases-hub/_template-case.html` (base) → screenshots 2x JPEG 90 + LQIP → rewrite em `site/vercel.json` → atualizar sitemap → deploy do site do estúdio. Runbook exato: `irbis-site-ops`.

Cada entrega vira ativo de venda — alimenta a meta de ≥2 clientes/mês (dono, 04/jul/2026; horizonte ~out/2026).

## Checklist do ciclo completo (copy-paste por projeto)

```
[ ] F0  Padrão de pasta confirmado · repo+remote privado · Vercel linkado (.vercel/project.json) · symlinks OK · stack decidida
[ ] F1  persona.md · identidade-verbal.md · spec-design.md (responsivo+"não incluído") · kickoff-baseline.md → commit+push
[ ] F2  Direção Stitch escolhida · tokens :root · protótipo aprovado (prototype→promote) → commit
[ ] F3  Copy (ogilvy→reef-copywriting→stop-slop) · fatos confirmados · review-copy aprovada → commit+push
[ ] F4  Plan com checkboxes · impeccable→critique→polish→audit→web-design-guidelines→anti-AI-slop por página · commit por seção
[ ] F5  Checklist-gate QA completo · git limpo+commit+push → autorização do dono → npx vercel --prod → ~3 dias de teste
[ ] F6  Handoff: repo + acessos Vercel/DNS + analytics + guia de edição* (*confirmar com dono)
[ ] F7  Case no site do estúdio (autorização + "+R$350k") → irbis-site-ops
```

## Pergunte antes — pendências que NUNCA se decidem sozinho

| Pendência | Antes de agir |
|---|---|
| Guia de edição + "30 dias de ajustes" (bônus do deck A CONFIRMAR — canônica: `irbis-entrega-e-recorrencia`) | Não prometer ao cliente |
| Cadência de checkpoint (1×/semana recomendada, não ratificada — canônica: `irbis-entrega-e-recorrencia`) | Não formalizar outra cadência |
| Onde salvar artefatos de estratégia (proposto aqui: `docs/` do cliente; precedente da casa: `docs/superpowers/` do repo IRBIS raiz) | Confirmar na primeira vez de cada projeto |
| Padrão de pasta aninhado/flat + naming do repo remoto (precedentes divergem: `adash/` flat vs. `Odery Drums/Site Odery/` aninhado) | Confirmar antes da Fase 0 |
| Ferramenta de screenshot/LQIP (sem script commitado, `584e769`; default `sips` via `irbis-site-ops`) | Usar o default; confirmar se há ferramenta própria |

Nota de escopo: pendências que não são desta skill (ex.: piloto Zapfy, freemium, Adash, ICP) vivem em outras skills/dossiês da casa — não foram trazidas para cá porque não pertencem ao runbook de produção de site de cliente e não têm base nos documentos-fonte desta skill (ver Proveniência).

## Invariantes do dono (nunca contradizer, remover ou alterar)

Único número afirmável em case de site de cliente: **"+R$350k"** — "+500" e "LTV 1,8x" são BANIDOS em qualquer peça. Confirme o afirmável em `irbis-guarda-pivot` antes de publicar qualquer número (Fase 7). Commit a cada fase concluída, sem acumular (Princípio 4).

## Proveniência e manutenção

**Escrito em 06/jul/2026** com base em: `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md` (lido na íntegra), dossiê `irbis-site-code.md` (02/jul/2026, verificado 04–05/jul), inspeção direta do repo em 06/jul (template de case, launch.json, Testes/, remotes de adash e Site Odery), histórico git (incidentes GA4 28/mai, E-Force `94a629e`, LQIP `584e769`, redesign 23/mai) e decisão verbal do dono de 04/jul/2026 (commit por fase). O invariante de número afirmável ("+R$350k"; "+500" e "LTV 1,8x" banidos) vem de decisão do dono comunicada diretamente a este agente em 04/jul/2026 e confirmável em `irbis-guarda-pivot` — não consta no processo-entrega-padrao-irbis.md nem no dossiê irbis-site-code.md; tratado aqui como invariante externo aplicado ao afirmável de case (Fase 7), não como fato derivado dos documentos-fonte do runbook.

**Revisado em 2026-07-06** para execução por modelo júnior: symlinks com profundidade explícita por padrão de pasta, `superpowers:brainstorming` nomeada, sequência exata prototype→promote, ordem de skills de copy e de qualidade explicitada, `dig`/checagens objetivas no QA gate.

**Revisão adicional em 2026-07-06** (correção de ambiguidades e fidelidade): defaults e SLA explícitos para os gates que dependiam de resposta do dono/cliente sem prazo (padrão de pasta, aprovação de estratégia, autorização de deploy); regra de slug de nome de cliente; correção da contagem de `../` dos symlinks para 5 níveis no padrão aninhado (era 4, quebrava o link na prática); esclarecido que a decisão de stack (0.4) não fura a Ordem FIXA da Fase 1; sintaxe exata de invocação de `superpowers:brainstorming`; templates mínimos para os 4 artefatos da Fase 1; Stitch como ferramenta externa (não integrada) com fluxo de exportação explícito; conteúdo do protótipo definido como placeholders de copy marcados; comando de publish (`npx vercel` sem `--prod`) explicitado na Fase 2; removida a exceção de push da Fase 2 (push agora obrigatório em todo gate, sem exceção); origem do GA4 Measurement ID do cliente explicitada; critério objetivo de `dig`/painel Vercel para o gate de DNS; fluxo de início de teste do cliente pós-deploy; ordem corrigida entre QA (Fase 5, sem acesso do cliente ao Vercel) e handoff (Fase 6, quando o acesso é concedido). Removidas desta skill pendências fora de escopo (piloto Zapfy, freemium, Adash, ICP) que não têm base nos documentos-fonte listados acima — vivem em outras skills da casa, não nesta.

**Revisão de round 2 em 2026-07-06** (correção de execFailures reais; nenhuma fidViolation apontada para esta skill): path absoluto da raiz do repo IRBIS explicitado em 0.1 (`/Users/nicolascunha/Projects/Business/irbis/`) para eliminar ambiguidade de onde `mkdir`/`cd` operam; canal de aprovação (Fase 1 e Fase 5) esclarecido como o mesmo já estabelecido com dono/cliente no briefing — não é uma ferramenta nova, e sessão automatizada sem canal de mensagem disponível trata a pendência como "sem resposta" (SLA já existente) em vez de travar; "prova de aprovação" definida objetivamente (resposta escrita, não emoji/silêncio); serviço default de formulário nomeado (Formspree, mesmo padrão de `site/founder.html`) com passo de criação do form antes do primeiro commit; ordem esclarecida na checagem de DNS (apontamento acontece antes, idealmente na Fase 0/1; o item do gate da Fase 5 é só a validação final); escopo Vercel (0.2) esclarecido como a mesma conta/login já usado nos projetos da casa, não a pessoal do operador; validação de symlinks (0.3) marcada como "rodar só depois" de criados; tabela "seção do site → perfil" do template de persona marcada como rascunho normal a atualizar após a Fase 1.3, não bloqueante. Gates "pergunte ao dono", dependências externas documentadas como pendência (workbench-metodo-da-casa, guia de edição) e o requisito de aparelho físico real no QA foram mantidos como estavam — são decisão do dono ou já vêm com fallback documentado, não defeitos de execução.

**Revisão de round 3 em 2026-07-07** (correção de 2 execFailures residuais do round 2; nenhuma fidViolation reportada para esta skill): item de mobile no gate da Fase 5 ganhou fallback explícito para sessão sem aparelho físico (device emulation do Chrome DevTools como aproximação + registro da pendência em `docs/spec-design.md` para confirmação do dono, sem marcar o item como definitivamente concluído) — o requisito de aparelho real em si NÃO foi removido nem enfraquecido, só passou a ter um caminho de execução quando o aparelho não está disponível; comentário da validação de symlinks (0.3) explicitado para o caso em que o executor rode o comando de checagem antes de criar os links (resultado "QUEBRADO" generalizado nesse caso é sequência errada, não link quebrado de fato) — não altera o comando nem a contagem de `../`, só documenta a ordem correta. Nenhum outro execFailure do round 2 exigia mudança: os demais (path root, canal de comunicação, endpoint de formulário, escopo Vercel, `workbench-metodo-da-casa`, template de persona, prova de aprovação) já tinham sido corrigidos na revisão anterior.

**Revisão de round 4 em 2026-07-07** (correção de 2 fidViolations da re-verificação; nenhum execFailure novo apontado): 0.3 restaurado para criar os 3 symlinks do original (`irbis-producao-de-site`, `irbis-entrega-e-recorrencia` e `workbench-metodo-da-casa`) nos blocos ANINHADO e FLAT — a revisão anterior tinha removido o comando executável do terceiro link, deixando só uma nota de "confira manualmente"; o comando `ln -sfn` completo (6 níveis aninhado / 5 flat) foi restaurado. Gate de autorização de deploy (Fase 5) teve o SLA de "1 dia útil" removido — essa política não existe no original, que trata a autorização do dono como regra da casa incondicional e sem prazo ("nenhuma skill contorna isto"); o texto voltou a refletir isso, sem inventar mecanismo de prazo/reenvio para este gate específico. O SLA de 1 dia útil da Fase 1 (aprovação de estratégia) NÃO foi alterado — é pendência distinta, sem fidViolation reportada contra ela.

**Revisão de round 5 em 2026-07-07** (correção de claims falsos sobre `workbench-metodo-da-casa`): removidos todos os avisos de "path não localizado/não encontrado em 06/jul/2026" — verificação direta confirma que a skill existe em `/Users/nicolascunha/Projects/Business/.claude/skills/workbench-metodo-da-casa/SKILL.md` e que já há symlink funcional em `Business/irbis/.claude/skills/workbench-metodo-da-casa -> ../../../.claude/skills/workbench-metodo-da-casa` (3 níveis). Nenhum fallback ou exceção foi inventado; apenas os claims falsos e o `find` de fallback associado foram corrigidos para refletir o path real. `superpowers:brainstorming` confirmada como skill de plugin global (`~/.claude/plugins/cache/claude-plugins-official/superpowers/`), invocada via ferramenta Skill — texto da Fase 1 ajustado para deixar essa origem explícita.

Re-verificação (rodar da raiz `Business/irbis/`; divergiu = skill driftou):

- Ordem fixa/stack/prazos ainda valem? → `sed -n '17,45p' "03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md"`
- Template de case existe? → `ls "site/cases-hub/" | /usr/bin/grep _template` (esperado: `_template-case.html`)
- Preview local nas portas 3002/8080? → `cat .claude/launch.json`
- Remote do cliente ainda vale? → `/usr/bin/git -C "02 - Projetos/Odery Drums/Site Odery" remote -v`
- Stacks dos precedentes mudaram? → `/usr/bin/grep -o '"react": "[^"]*"' "02 - Projetos/adash/package.json"` + `ls "02 - Projetos/Testes/"`
- Skills de qualidade instaladas? → `ls .claude/skills/ | /usr/bin/grep -E "impeccable|critique|polish|audit|ogilvy|stop-slop|stitch"`
- Formspree resolvido? → `/usr/bin/grep -n "formspree.io/f/" site/founder.html` (`XXXXX` = ainda aberto; aberto em 06/jul/2026)
- Symlinks num repo de cliente resolvem? → `for l in "02 - Projetos/<Cliente>/<projeto>/.claude/skills/"*; do test -f "$l/SKILL.md" && echo "OK $l" || echo "QUEBRADO $l"; done`
- `workbench-metodo-da-casa` existe no path esperado? → `test -f /Users/nicolascunha/Projects/Business/.claude/skills/workbench-metodo-da-casa/SKILL.md && echo OK` (confirmado presente em 07/jul/2026, com symlink em `Business/irbis/.claude/skills/workbench-metodo-da-casa`)
- Regras verbais sem artefato no repo (commit por fase; ordem persona→identidade→estratégia+kickoff com marcos D+30/90/150): reconfirmar por trimestre.
</content>
