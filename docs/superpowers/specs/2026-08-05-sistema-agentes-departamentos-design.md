# Sistema de Agentes por Departamento — IRBIS (v1)

**Data:** 05/ago/2026
**Status:** protótipo v1 construído e navegável. Decisões abaixo foram tomadas sem rodada completa de perguntas — o Nicolas encerrou o brainstorming com `/goal` ("sem mais perguntas, trabalhe até ter algo útil") depois de uma única resposta confirmada. Este doc registra o que foi decidido no lugar dele, pra revisão.

## Origem

Nasceu de uma pergunta sobre um lead magnet ("The Zero-Money AI Business Stack") que citava ZeroEntropy como camada de memória de agente. Virou um pedido maior: um sistema de agentes de IA organizado por departamento pra rodar a própria IRBIS primeiro, testar, e depois considerar vender como oferta (linha **Sistemas**, dentro do pivot 04/ago — não é site, não é dashboard avulso).

## O que foi respondido antes do `/goal`

Única pergunta fechada: o v1 foca em quê primeiro?
→ **Resposta do Nicolas: a taxonomia completa dos 7 departamentos.** O visual viria depois pra representar esse conteúdo real, não o contrário.

A segunda pergunta (cobrir só o que já tem skill, ou o trabalho inteiro incluindo o que ainda é manual) não chegou a ser respondida — a ferramenta de pergunta falhou e, na sequência, o `/goal` mudou o modo de trabalho. Decisão tomada no lugar dele: **inventário completo, incluindo gaps.** Jobs sem skill entram como "a construir". Motivo: é o que o pedido original pedia ("uma skill pra cada job") e é o que torna o mapa útil como backlog, não só como retrato do que já existe.

## Decomposição

O pedido original tinha 3 subsistemas independentes:

1. **Taxonomia** (7 departamentos × Jobs To Be Done × skill × nível de automação) — **construída neste v1**, com dado real.
2. **Company Brain** (base que sabe 100% da empresa) — **não construída como sistema novo neste v1.** Hoje ela é 3 coisas fragmentadas (expert-brain, Supabase `irbis-os`, o repositório). O mapa representa isso honestamente: o núcleo mostra as 3 fontes e nomeia a consolidação como o maior gap do mapa, em vez de fingir que já existe uma camada unificada.
3. **Mapa visual** ("aurora espacial" ao redor do Company Brain, árvores clicáveis por departamento) — **construído neste v1**, como artefato HTML autocontido.

## Taxonomia — fonte e método

Toda skill citada é real, lida direto de `.claude/skills/irbis-*/SKILL.md` nesta sessão — nenhuma foi inventada. Onde não existe skill, o job entra como gap (`skill: null`).

**37 Jobs To Be Done mapeados, 26 já têm skill rodando, 11 não têm dono de IA ainda.**

| Departamento | Jobs | Sem skill | Observação |
|---|---|---|---|
| Vendas | 10 | 1 | mais maduro — quase todo o funil de `irbis-novo-lead` a `irbis-pos-reuniao` já tem skill |
| Negócio | 5 | 2 | decisões estruturais (pivot, revisão trimestral de preço) ficam humano-lidera de propósito — não deveriam virar skill de IA |
| Marketing | 5 | 2 | distribuição multi-plataforma e monitoramento de sinal de marca são gaps reais, não decisão consciente |
| Clientes | 4 | 2 | pulso de satisfação e portal de status pro cliente existem como ideia/template, não como rotina viva |
| Back Office | 4 | 1 | o gap (formalização de CNPJ) está travado por decisão de negócio, não por falta de skill — ver `formalizacao-irbis-sem-cnpj` na memória |
| Operações | 5 | 1 | QA de handoff técnico hoje vive embutido em `irbis-producao-de-site`, sem skill isolada |
| Inteligência | 4 | 2 | o job mais importante do departamento — consolidar tudo numa base única — é justamente o Company Brain ainda não construído |

### Classificação de automação

Três níveis, atribuídos por job (não por departamento):

- **100% IA** — roda e entrega sozinho, sem preparo humano prévio de conteúdo (ex.: `irbis-fechar-semana`, `irbis-dossie`, conciliação financeira quando o match é exato).
- **Humano + IA** — a IA prepara/rascunha, o Nicolas decide, aprova ou executa o contato (maioria das skills comerciais e de carteira).
- **Humano lidera** — decisão ou execução que só ele faz (a call de vendas em si, decisão de portfólio, decisão estrutural de posicionamento). Todo job sem skill entra aqui por definição — sem automação, é 100% manual hoje.

## Visual — decisões de design

- **Identidade herdada, não inventada:** paleta e tipografia vêm direto de `irbis-os/painel/app/globals.css` (tokens D2 Grafite & Sálvia — `--color-salvia #4a5d43`, `--color-alerta #b4552d`, fontes Besley + Archivo self-hosted, inlined como `@font-face` base64 no artefato pra funcionar fora do domínio da IRBIS).
- **Modo escuro único, decisão deliberada.** O conceito "aurora espacial" pede céu noturno — não existe uma segunda versão clara. Isso diverge do modo Papel do painel (`os.irbis.com.br`), que é claro; aqui o compromisso com o "espaço" venceu a consistência com o painel. Se este mapa for embutido dentro do painel depois, essa tensão precisa ser resolvida.
- **Automação vira cor, não é decorativo:** sálvia = 100% IA, terracota = humano lidera, cinza-suave = híbrido — é o mesmo espectro cromático da marca, sem inventar roxo/azul.
- **Árvore é geradas por código (canvas), não SVG desenhado à mão** — galho recursivo com seed determinística por departamento, contagem de brotos ligada à quantidade de jobs reais.
- **Gaveta lateral em vez de modal central** — mantém o mapa visível atrás; fechada por clique fora, Esc ou X.
- **Bug corrigido em teste:** com a gaveta aberta, clicar em outra árvore fechava a gaveta em vez de trocar o conteúdo (o overlay escuro tinha z-index acima dos nós). Corrigido — troca direta entre departamentos funciona.
- **Mobile:** funcional, não otimizado. É uma peça pensada pra tela de call/apresentação, não pro bolso — não foi tratada como mobile-first (regra do CLAUDE.md pessoal pede perguntar antes de assumir isso, e o `/goal` cortou a pergunta).

## O que NÃO foi construído (e por quê)

- **Company Brain real** — consolidar expert-brain + Supabase + repo numa camada única e consultável. Não decidido: se vira uma 4ª skill, uma view no painel, ou infra nova. Não precisa de chave nova pra decidir isso — as 3 fontes já estão conectadas.
- **Wiring vivo com o painel `os.irbis.com.br`** — o mapa hoje é estático (dado embutido no HTML), não lê o Supabase ao vivo. Se a ideia é usar isso operacionalmente (não só pra vender), o próximo passo natural é esse.
- **Versão "produto"** — pra vender pra outro negócio, o mapa precisaria de dado dinâmico por cliente, não a taxonomia hardcoded da IRBIS. Não foi desenhado multi-tenant de propósito (YAGNI até ter o primeiro comprador).

## Onde está

- Protótipo: `sistema-de-agentes/mapa-aurora.html` (repo), preview via `.claude/launch.json` → configuração `aurora-agentes`, porta 3016.
- Sem commit ainda — arquivo criado, não versionado.

## Perguntas em aberto pro Nicolas

1. ~~A classificação de automação por job está certa?~~ **Respondido 05/ago: sim, está certa.**
2. ~~Company Brain real: prioridade agora ou só quando o mapa for além de demo?~~ **Respondido 05/ago: entra agora.**
3. ~~Este mapa fica só como peça de venda ou vira ferramenta de uso diário?~~ **Respondido 05/ago: uso diário.**

## Addendum 05/ago — da demo estática pro painel real

As três respostas acima mudaram o escopo: o mapa deixou de ser um artefato HTML estático pra virar rota do painel de produção, lendo dado real.

**O que foi construído nesta segunda passada:**

- **Migration nova no banco real** (`irbis-os`, projeto `kugitonorbcijhyytsya`, não é ambiente de staging — é o único banco que existe): `supabase/migrations/20260805000000_agentes_jobs.sql`, tabela `agentes_jobs` (departamento, título, skill, nível de automação, ordem). Aditiva, sem DROP/ALTER destrutivo, aplicada via `supabase db push` depois de `--dry-run` confirmar que só essa migration seria empurrada.
- **37 jobs semeados de verdade** via REST API (service role key), mesmo conteúdo do protótipo estático, agora fonte única no banco.
- **Rota nova no painel**: `irbis-os/painel/app/agentes/` (`page.tsx` server component lendo `agentes_jobs` + contagens reais de `pessoas`/`projetos` do Supabase; `aurora-map.tsx` client component com a mesma lógica visual do protótipo, portada pra React; `aurora.module.css` escopado). Fica **fora** do grupo `(dashboard)` de propósito — é uma experiência full-bleed/escura, não cabe dentro do shell claro com sidebar. Herda a proteção do middleware (`proxy.ts`) automaticamente: só a conta operacional do Nicolas entra, como todo o resto do painel.
- **Nav novo**: grupo "inteligência" → "Agentes", com ícone novo (`IconeAgentes`) e link de volta ("← sistema OS") dentro da própria página, já que ela não tem sidebar.
- **Company Brain, 2 dos 4 fatos agora são live**: "Dado operacional" mostra contagem real de pessoas/carteira/jobs; "Histórico e contexto" tenta pegar o SHA do commit do deploy (`VERCEL_GIT_COMMIT_SHA`, só existe em produção). "Memória viva" (expert-brain) e "Consolidação" continuam honestos sobre o que falta — não fingem estar prontos.

**Bloqueio real, não contornado:** o MCP `expert-brain` está com **autenticação pendente nesta sessão** — não consegui chamar as tools dele pra puxar dado de memória de verdade. Além disso, mesmo autorizado pra mim, isso não conecta automaticamente o app em produção: o painel (Next.js na Vercel) não tem acesso ao MCP do Claude Code, só eu tenho. Pra "Memória viva" virar um fato realmente live na página, tem duas rotas possíveis, sem decisão ainda: (a) o worker do expert-brain expor uma API HTTP própria que o painel chama direto, ou (b) uma sync periódica onde uma sessão Claude escreve um resumo no Supabase e o painel só lê isso. Não escolhi nenhuma — é decisão do Nicolas.

**Verificação:** `tsc --noEmit` limpo, `eslint` limpo nos arquivos novos, `next build` completo com `/agentes` aparecendo na árvore de rotas como as demais. **Não verifiquei visualmente a página autenticada** — o middleware corretamente bloqueia qualquer acesso sem o login real do Nicolas (magic link no e-mail dele), e isso não foi contornado de propósito: é a mesma trava que protege o resto do painel. A confiança vem de: o layout/canvas/interação já foi validado pixel a pixel no protótipo estático antes de portar, e a lógica portada é a mesma, só trocando array hardcoded por `props` vindas do Supabase.

**Deployado em produção 05/ago** via `vercel --prod` depois de aprovação explícita ("pode dar deploy"). `os.irbis.com.br/agentes` no ar, confirmado protegido pelo mesmo middleware (307 pro login sem sessão, igual `/visao`).

**Como ver:** [os.irbis.com.br/agentes](https://os.irbis.com.br/agentes), login de sempre, "Agentes" na sidebar (grupo "inteligência"). Local também segue disponível via `.claude/launch.json` → `irbis-os-painel`, porta 3017.

## Addendum 05/ago (2) — Memória viva ao virar de verdade

Depois de resolver a autenticação do MCP `expert-brain` em `~/.claude.json` (PAT via header, ver memória `mcp-expert-brain-auth-persistente`), testei o mesmo PAT direto por HTTP (igual o `~/.claude/expert-brain-sync/sync.py` já fazia) e confirmei: **o worker do expert-brain é uma API HTTP com Bearer token comum — não depende do MCP do Claude Code estar rodando.** Isso destrava o item que o addendum anterior tinha marcado como "sem decisão": o painel em produção (Vercel) PODE chamar o expert-brain direto, sem sync intermediária.

**Descoberta que muda o mapa mental:** o expert-brain não é só um vault de notas. Tem 5 sub-sistemas: notas (`recall`/`save_note`/`get_note`/`expand`/`link`), tarefas (`save_task`/`list_tasks`/`complete_task`/`share_task`), contatos (`list_contacts`/`search_contacts`/`get_contact_by_phone`), inbox de captura (`capture`/`list_inbox`/`resolve_inbox`) e um digest diário de resurfacing. O vault de contatos em particular **pode se sobrepor com a tabela `pessoas` do Supabase `irbis-os`** — dois sistemas de contato, não resolvido, não é escopo deste addendum.

**Decisão do Nicolas 05/ago:** Company Brain mostra só domínio de negócio do vault (growth, financas, gestao, estrategia, cultura, marketing, vendas, business, personal-brand, moats, product, entrepreneurship — **144 de 203 notas**), não a vida pessoal (nutrição, treino, hormônios, fisiologia — os outros ~60).

**Construído:**
- `lib/expert-brain.ts` — cliente server-only, JSON-RPC direto (`initialize` → `tools/call stats`), soma os domínios de negócio, timeout de 8s, nunca importável em código de cliente.
- `EXPERT_BRAIN_PAT` adicionado ao `.env.local` (local only).
- `app/agentes/page.tsx` chama `getCompanyBrainMemoria()` em paralelo com o Supabase; "Memória viva" agora mostra número real (testado: 144 notas de negócio, 203 no vault todo, 30 nos últimos 7 dias); "Consolidação" reflete que a página já cruza os três ao vivo, com honestidade sobre o que falta (contatos/tarefas ainda não viram consulta, só contagem de notas).
- `tsc`, `eslint`, `next build` limpos. Testei o helper isolado via `tsx` com o `.env.local` real antes de plugar na página — retornou o número certo.

**O único passo que falta pra isso rodar em produção:** o `EXPERT_BRAIN_PAT` precisa virar variável de ambiente no projeto Vercel (`irbis-os-painel`), igual já é local. Não fiz isso sozinho — é credencial indo pra uma plataforma de terceiro em produção, pedido de confirmação explícita antes.

**Atualização:** feito — Nicolas confirmou, `EXPERT_BRAIN_PAT` está criptografado na Vercel em Development e Production. Ainda não deployado (aguardando "pode dar deploy").

## Addendum 05/ago (3) — Crítica de design formal e correções

Nicolas: "a ideia é por aí mesmo, não encontrei referências, use suas skills pra melhorar o máximo que der." Rodei o processo `/critique` completo: contexto salvo em `.impeccable.md` (sintetizado das decisões já tomadas nesta sessão + regras Anti-AI-Slop do CLAUDE.md, sem re-perguntar o que já estava respondido), duas avaliações independentes em paralelo (revisão de design LLM ao vivo no navegador + detector automatizado `impeccable`), sem uma ver a outra.

**Resultado:** 31/40 nas heurísticas de Nielsen, passa no teste de AI slop (nenhum padrão proibido do `.impeccable.md` presente). Detector automatizado achou 6 pontos, só 2 reais depois de conferir contra o código — os outros 4 eram falso positivo (o detector assumiu fundo branco por não resolver `var(--void)`; o fundo real é quase preto, contraste real ~16:1).

**Nicolas escolheu:** corrigir tudo (P0 a P3), e resolver a ilegibilidade de cor aumentando o ponto (não trocando a paleta já aprovada).

**Corrigido, nas duas versões (estática e produção):**
- **P0 — nós de árvore clicáveis por trás da gaveta aberta.** O `z-index` do scrim ficava abaixo dos nós — clique "atravessava" a gaveta, e o escurecimento nunca chegava nos rótulos. Mantive a troca direta de departamento (era feature, não bug), mas os nós de fundo agora recuam visualmente (opacidade) quando a gaveta abre, e tirei o `aria-modal="true"` porque ele prometia um isolamento de teclado que o comportamento real não entrega — mais honesto que forçar o resto do mapa a virar inacessível.
- **P0 — viewport quebrado no arquivo estático.** Sem `<meta viewport>`, mobile renderizava a 980px de largura fixa. Adicionado — não precisou de `<head>` completo, HTML5 hoiste `<meta>`/`<title>` soltos pro head implícito (mesmo truque que já fazia o `<title>` funcionar). Não afetava a rota `/agentes` do painel (Next.js já injeta viewport).
- **P1 — cor do nível de automação ilegível na árvore.** Ponto "com skill" tinha ~2,6px de raio; dobrei pra ~4,4px (`size*0.024`, era `size*0.014`). Anel do "sem skill" cresceu proporcionalmente pra não colidir com o novo tamanho.
- **P1 — layout radial colidindo com o header no mobile.** Não foi resolvido por ajuste fino de parâmetro (tentei raio menor + centro mais baixo, ainda colidia — 7 rótulos de texto não cabem num círculo estreito, é limite físico). **Virou lista** abaixo de 720px: os mesmos botões (mesma árvore, agora ícone de 52px), em fluxo normal de documento em vez de posição radial — testado ao vivo em 375×812, sem sobreposição, drawer continua legível.
- **P2 — zero afordância de clique na primeira visão.** Pulso de convite no núcleo do Company Brain nos primeiros 4s (3 ciclos, depois some, não repete), desativado se `prefers-reduced-motion`.
- **P3 — hierarquia dos stats.** "Rodando sozinho" (o número que importa acompanhar semana a semana) virou o primeiro da fileira, maior, cor sálvia — os outros três viraram contexto de apoio.
- **Observação menor endereçada:** a recursão da árvore não garantia uma ponta por job (galhos podiam parar cedo demais). Adicionei rede de segurança: jobs que sobrarem sem galho aparecem como pontos extras perto da base — a contagem no rótulo nunca mais pode mentir sobre o que a árvore mostra.

**Não corrigido / aceito como está:**
- **2 achados reais de `dark-glow`** do detector (glow do núcleo, pontos da legenda) — julgamento, não bug: é literalmente o tema "aurora". Mantido.
- **`react-hooks/set-state-in-effect`** (2 novos casos, no cálculo responsivo do layout radial) — é o padrão SSR-safe correto pra evitar hydration mismatch (calcular `window.innerWidth` só depois de montar no cliente); a regra do eslint é mais rígida que o caso legítimo. Já existiam 3 casos iguais, não corrigidos, em outros arquivos do painel antes desta sessão — não bloqueia `next build`.

Verificação: `tsc`, `eslint` (só os 2 casos aceitos acima) e `next build` limpos depois de cada rodada de correção; testado ao vivo no navegador em desktop e mobile (375×812) nas duas versões, incluindo o bug do z-index confirmado corrigido (trocar de departamento com a gaveta aberta funciona, fundo dimm corretamente).
