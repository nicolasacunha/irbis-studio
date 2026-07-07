---
name: irbis-prospeccao-e-diagnostico
description: 'Use quando a tarefa envolver gerar ou qualificar reuniões para a IRBIS: prospecção, cold call a negócios locais, dossiê de prospect, outbound no LinkedIn, inbound do Instagram ("manda SITE no direct"), quiz de diagnóstico, qualificação BANT, agendamento de reunião, call de diagnóstico, follow-up de prospecção, listas do PhantomBuster, KPIs comerciais, gargalo de funil, ou arquivos de "03 - Comercial/" (00 - Planejamento, 01 - Prospecção, 02 - Qualificação e Agendamento).'
---

# IRBIS — Prospecção e Diagnóstico (topo de funil)

Playbook para gerar e qualificar reuniões de venda de site. Funil: **Prospecção → Qualificação → [Reunião]**. Índice de docs: `03 - Comercial/README.md`.

Paths relativos à raiz `Business/irbis/`, têm espaços — sempre use aspas.

## Quando NÃO usar esta skill

| Tarefa | Skill certa |
|---|---|
| Conduzir a videochamada de vendas (~45 min, preço ao vivo, objeções, fechamento) | `irbis-call-de-vendas` |
| Pós-fechamento: briefing, entrega, repitch MRR, pedir indicação a cliente | `irbis-entrega-e-recorrencia` |
| Escrever copy externa (post, bio, DM nova) com a voz da marca | `irbis-brand-voice` |
| Decidir o que é canônico vs pré-pivot; vocabulário proibido; case Adash | `irbis-guarda-pivot` |
| Editar ou publicar irbis.com.br | `irbis-site-ops` |
| Regras da casa, RTK, fluxo superpowers, commit por fase | `workbench-metodo-da-casa` |
| Prioridades do portfólio e metas de 90 dias | `portfolio-mapa-e-decisoes` |

Esta skill gera a reunião. O que acontece DENTRO da videochamada é `irbis-call-de-vendas`.

## Contexto mínimo (leia antes de agir)

- IRBIS faz **exclusivamente sites** desde 01/jun/2026 (`irbis/CLAUDE.md` — ⚠️ raiz do projeto irbis; `Business/CLAUDE.md` não existe). Nicolas opera **solo**. Nunca prospecte branding, identidade, dashboard ou app.
- Operação comercial de junho/2026 **adaptada do Grupo JDP** (mentoria; aulas fora do repo). **Regras JDP são fixas** (dono, 04/jul/2026: "Regras deles sao fixas") — não adapte o método. "Ajusta conforme sua realidade" (`kpis-comercial-irbis.md:3`) vale só para escolher o NÍVEL de meta (N1/N2/N3).
- Meta de 90 dias (dono, 04/jul/2026): "irbis tendo pelo menos 2 clientes por mes" = N1 dos KPIs (2 sites/mês ≈ R$9k).
- **Pipeline real: Notion "Grupo JDP <> IRBIS STUDIO", fora do repo** (`03 - Comercial/README.md:55`). ⚠️ Link e estrutura de colunas não documentados — peça ambos ao dono antes de consultar. Trackers do repo 100% vazios (☐/⬜) — vazio ≠ nada feito. **Nunca reporte status comercial a partir dos trackers**; pergunte ao dono ou peça print/export do Notion.
- Dono (04/jul/2026): "não vendi direito ainda" — trate taxas e "o que funciona" como hipótese, não histórico.

### Glossário

| Termo | Significado aqui |
|---|---|
| JDP | Grupo JDP — mentoria comercial; fonte dos scripts "Adaptado do Grupo JDP" |
| P1 / P2 | Entregas JDP: P1 = posicionamento/perfil pessoal; P2 = roteiros de conteúdo (fora do repo) |
| Tréplica | Resposta curta após resposta do lead, na sequência SPIN. Não é regra de toda conversa — ver tabela abaixo |
| SPIN | Situação → Problema → Implicação → Necessidade. Usado no cold call (A3) e na BANT; a call de diagnóstico de 25/jun usa outro framework de 8 etapas — não é SPIN |
| BANT | Budget, Authority, Need, Timing |
| Breakup | Última mensagem da cadência, sem pressão ("fica aqui se virar prioridade") |
| SAM | Mercado atendível; aqui só como corte de capacidade de pagamento (≥R$8k), não preço do projeto |
| ICP | Perfil de cliente ideal |
| GMB | Perfil Google Maps/Business (nota + nº avaliações) |
| PhantomBuster | Scraping (Google Maps/LinkedIn) que gera as listas |
| N1/N2/N3 | Níveis de meta: sobrevivência / estabilidade / escala |
| Hunter | Prospecção ativa por DM/WhatsApp (Nicolas) |
| No-show | Lead que agendou e não apareceu |
| "Conduzir" | Definição operacional na seção Convergência |

### Onde "Tréplica" se aplica

| Contexto | Usa tréplica? |
|---|---|
| Cold call (A3), SPIN | Sim — após cada resposta do lead nas 4 fases S/P/I/N |
| Qualificação BANT | Sim — após cada resposta, conforme o doc |
| Call de diagnóstico 15–20 min (Convergência) | Não documentado no roteiro — trate como opcional; a etapa ESPELHO cumpre função parecida |

## Regras fixas (derivadas do JDP — não adaptar)

| # | Regra | Fonte |
|---|---|---|
| 1 | Preço nunca na ligação fria, DM ou 1º WhatsApp. Preço nasce na reunião, deck + âncora R$7.000 → fecha R$4.500–5.000 | `dossie-cold-call-leva1-junho2026.md:6`; `script-cold-call-irbis.md:4` |
| 2 | Objetivo único = reunião agendada. Hunter não vende, conduz. Nunca explica projeto/preço no chat | regra JDP |
| 3 | Nunca mandar proposta solta ("matou as 3 anteriores") | `script-whatsapp-lead-site.md:4` |
| 4 | Ligação fria: máx. 10–12 min; 30% conteúdo / 70% entonação | `script-cold-call-irbis.md` |
| 5 | Validar o decisor sempre. Sócio envolvido → os dois na reunião | regra JDP |
| 6 | Guard-rail SAM ≥ R$8k/projeto. Abaixo (Tier 3) = treino/volume, sem âncora de R$7k, espere objeção de preço | `11_Relatorio_Segmentacao_Growth_IRBIS.md:87` (pré-pivot, mas re-citado pelo dossiê de 23/jun, segue vigente) |
| 7 | Duas opções concretas de horário, nunca "pode?" | `roteiro-call-diagnostico-irbis.md:72` |
| 8 | Confirmação de véspera com micro-pauta + reminder 1h30 antes | `script-agendamento-irbis.md` |
| 9 | Sem travessão, sem cara de agência; assina "Nicolas", nunca "Equipe IRBIS" | `roteiro-call-diagnostico-irbis.md:88`; voz completa em `irbis-brand-voice` |
| 10 | Registrar tudo no pipeline do Notion a cada bloco (estágio + origem + próximo contato) | regra JDP |
| 11 | Follow-up obrigatório, com teto — ver tabela abaixo | regra JDP |

### Teto de follow-up por canal

| Canal | Teto documentado |
|---|---|
| Outbound LinkedIn | Máx. 2 tentativas após o DM: D+4 e breakup D+10 |
| WhatsApp inbound, cold call com objeção, quiz qualificado | ⚠️ Não documentado — pergunte ao dono antes de fixar um número; use D+4/D+10 só como referência, não como regra confirmada |

## Estado do funil em 04/jul/2026 (datado — confira antes de confiar)

- **Decisão de canal (01/jul/2026, `~/.claude/history.jsonl`):** cold email **REJEITADO** — verbatim: "email frio tem uma taxa de conversao ridiculamente baixa. To fora. cold outreach eu gosto e lead magnets me atrai bastante, ainda mais se fizermos pelo linkedin".
  - **Ignore o fluxo de `email-sequences-prospects.md`** (e-mail após D+7 sem resposta no LinkedIn) — superado. Se pedirem cold email, confirme se a decisão mudou.
  - Cold outreach (LinkedIn) segue aprovado; lead magnets via LinkedIn aprovados como direção, mas nenhum produzido/publicado até 04/jul (único artefato: `workspace/artifacts/checklist-erros-site-saas.md`). Skills de apoio: `cold-outreach`, `lead-magnets`.
- **Execução das levas desconhecida no repo**: tracker outbound 100% "pendente" (`outbound-scripts-junho-2026.md:167-172`), to-do de 7 dias majoritariamente ⬜. Estado real só no Notion — pergunte ao dono.
- **Meta semanal do plano JDP:** "≥ 1 reunião agendada que NÃO veio de indicação" (`todo-plano-7dias.md:42`).
- Datas (mtime): scripts-base 16/jun; dossiê cold call 23/jun; quiz + call de diagnóstico 25/jun (mais recentes).

## Prova social: o que PODE e o que NÃO PODE ser dito (respostas do dono, 04/jul/2026)

| Afirmação | Status | Regra |
|---|---|---|
| "+R$350k em vendas" (E-Force, no lançamento) | **REAL — único número de resultado permitido** | Afirmável em call, DM e site |
| Depoimento Maurício Odery / case E-Force | Real (`commercial-roadmap.md`) | Usável — case para quem diz "não é o momento" |
| "EForce +500" | **INVENTADO** | **BANIDO** de qualquer peça (origem desconhecida) |
| "LTV 1,8x" (Odery) | **INVENTADO** | **BANIDO** de qualquer peça |
| Case/site Eduboxs | Site ainda não feito | NÃO é case; não citar como entrega |
| Case Adash | Fictício; remoção do site PENDENTE | Nunca usar como prova social (ver `irbis-guarda-pivot`) |
| "3 semanas de média" | Sem confirmação | PENDENTE — não afirmar |
| Dados de dor com fonte (53% >3s Google 2016; 75% design Stanford 2002; 98% pesquisam antes) | Verificados | Usáveis — fonte em `dados-custo-site-ruim.md` |

**Limpeza pendente dos números banidos** ("1,8x" ainda escrito em 4 arquivos; sem commit/tarefa de limpeza aberta — ao reutilizar trecho destes arquivos, remova a linha antes de publicar):
- `roteiro-vsl-irbis.md:29` (a VSL NÃO pode ser gravada/publicada com essa linha)
- `sistema-indicacao-base-irbis.md:15` e `dia1-indicacao-mensagens.md:16`
- `P1-posicionamento-nicolas.md:93,122`

Verificação rápida antes de publicar qualquer peça reaproveitada: `grep -rn "1,8x\|+500" "03 - Comercial" "04 - Marketing" --include="*.md"` — se retornar qualquer linha, remova antes de publicar.

## ICP: EM ABERTO — as duas frentes coexistem

Resposta do dono (04/jul/2026): "Ainda nao consegui definir meu ICP perfeitamente pq nao vendi direito." Não há ICP oficial.

| Hipótese | Evidência | Canal onde vive |
|---|---|---|
| Founders de startup (SaaS, fintech, creator economy) | Site fala com founder; outbound de 01/jun (SolarZ, Conty, Elephan.AI, Vitrify); bio "Sites para founders" | LinkedIn outbound + inbound do site |
| Negócios locais premium (odonto, estética, barbearia, arquitetura, advocacia, imobiliária alto padrão) | Virada das listas em 15/jun; dossiê de cold call 23/jun; verticais do CSV atual | Cold call + WhatsApp |

**Checklist antes de criar qualquer peça nova (lista, script, lead magnet, página):**
1. Pergunte ao dono: "Esta peça serve founders (LinkedIn) ou negócios locais (cold call/WhatsApp)?"
2. Sem resposta → não produza a peça travada num ICP só; aguarde.
3. Dentro de uma frente já existente, use o tom daquela frente (founder ↔ LinkedIn; dono local ↔ telefone/WhatsApp) sem reperguntar.

---

## FRENTE A — Cold call a negócios locais

### A1. Lista
- Lista ATUAL: `03 - Comercial/01 - Prospecção/phantom-buscas-verticais.csv` — **30 QUERIES de busca** (não resultados): estética, odontológico, arquitetura, advocacia, imobiliária alto padrão, pilates, em bairros premium (Itaim Bibi, Jardins, Alto de Pinheiros, Jardim Europa, Balneário Camboriú…).
- Resultados raspados (placeUrl, title, rating, reviewCount, phone, website): 3 CSVs na **raiz do repo** (`Business/irbis/`, não dentro de "03 - Comercial/") — `resultado teste - phantom.csv`, `resultado real.csv`, `result vertical.csv` (15/jun). Pull novo = PhantomBuster (Google Maps); não registrado; to-do "Rodar o pull real" segue ⬜.

### A2. Dossiê da leva (`dossie-cold-call-leva1-junho2026.md`, 23/jun)

4 blocos por negócio: **CONTATO** (tel, site, IG, decisor) / **DIAGNÓSTICO** (site, GMB, IG) / **GARGALO** (1 dor específica, em dinheiro) / **ABERTURA** (fala ~30s citando o dado observado). Marque cada fato: `[Confirmado]` / `[Provável]` / `[Não verificado]`.

**Tiers — critério objetivo (único corte de valor confirmado é o SAM ≥R$8k; sem tabela de preço por tier no repo):**

| Tier | Critério | Ação |
|---|---|---|
| Tier 1 | Ticket alto (SAM ≥R$8k) + gargalo forte + decisor acessível | Ligar primeiro |
| Tier 2 | Ticket médio, sem os 3 critérios de Tier 1 completos | Fila normal |
| Tier 3 | Abaixo do SAM (ex.: pilates/petshop) | Volume/treino; sem âncora de R$7k; espere objeção de preço |

⚠️ Sem valor de corte em reais além do SAM ≥R$8k (regra 6). Prospect sem dado de ticket claro: pergunte ao dono ou marque `[Não verificado]` e trate como Tier 2 até confirmar.

**Tabela NÃO LIGAR:**
- Franquia/rede — decisão de site centralizada, dono da unidade não compra.
- Já tem agência e site premium. Critério de "premium" ⚠️ não documentado — na ausência, considere premium só se TODOS: (a) domínio próprio ativo, (b) sem erros visuais na home, (c) atualizado nos últimos 12 meses. Wix genérico/site parado há anos não conta; na dúvida, ligue.
- Site sem retorno de conteúdo na leitura automática, sem confirmação manual.

Outras regras do dossiê:
- **"Sem site" no Maps engana** — botão Website ausente ≠ sem site. Onde só marcou `[Provável]`, confirme na hora antes de afirmar.
- **Instagram atrás de login wall** = sempre `[Não verificado]` até abrir manualmente.
- Praças da Leva 1: SP capital, Curitiba (Batel), Florianópolis, Porto Alegre (Moinhos). Sem rapport regional no Sul — ataque por dado observado; uma praça por dia.

### A3. Ligar (`script-cold-call-irbis.md`, 16/jun)

15 passos: abertura de quebra de padrão ("é uma ligação que você não esperava — me dá 30 segundos?") → rapport → SPIN (S/P/I/N; na Implicação entram os dados 98%/75%) → qualificação (momento + decisor; **não pergunta orçamento**, o filtro real é a âncora na reunião) → transição → 2–3 horários → urgência real ("pego um projeto de cada vez") → confirmação → convite por WhatsApp/e-mail.

Tier 3 usa o **mesmo roteiro A3** passo a passo (não há roteiro alternativo no repo) — a única diferença é o conteúdo dos passos "qualificação/transição": sem âncora de R$7k e espere objeção de preço mais cedo (regra 6 / Tier 3 acima).

⚠️ **Roteiro "Passar pela secretária" (citado em `script-cold-call-irbis.md:31`) NÃO existe em nenhum arquivo do repo — é material de aula JDP fora do repo.**

**Se a recepção atender antes do decisor (bloqueio real, não hipotético):** não desligue e não improvise um script novo. Aplique este fallback mínimo até o dono confirmar o material JDP:
1. Identifique-se e peça o decisor pelo nome, se souber ("Bom dia, é o Nicolas, da IRBIS — o [nome do decisor] está?").
2. Sem nome do decisor: "Preciso falar rapidinho com quem cuida do site/marketing daí, sabe me dizer quem é?"
3. Se a recepção pedir o assunto: use a mesma abertura de 30s do passo 1 do A3, adaptada para a recepção.
4. Se travar (recepção não passa, pede para ligar depois, pede e-mail): registre no Notion como "bloqueado na recepção", agende novo contato em D+2 e pare — não insista na mesma ligação.
5. Depois da leva, reporte ao dono quantas ligações travaram na recepção e peça o material JDP antes da próxima leva com esse padrão de negócio (clínica/escritório).

- Objeções por segmento no dossiê (5 alto ticket + 3 menor ticket), incluindo preço: "Depende do que seu site precisa fazer."
- Treino no dossiê (roleplay: dentista cético, dona sem tempo, dono durão) — use antes da leva real.

### A4. Registrar (por ligação, no Notion)
`ligações feitas | atendidas | passou da recepção | falou com decisor | reunião agendada`.
Leitura de gargalo: cai entre *atendidas → falou com decisor* = problema de abertura/tom; cai depois = problema no gancho da dor.

## FRENTE B — Outbound LinkedIn (founders)

Método: **auditar o site do prospect → achar UM problema específico → DM citando esse problema** (`outbound-scripts-junho-2026.md`, 01/jun).

### B1. Regras de ouro

1. Conectar ANTES de enviar DM (sem conexão a msg some em "Solicitações").
2. Verificar o site do prospect NO DIA do envio — se corrigiram o problema, adapte.
3. Uma empresa por dia — regra do outbound formal LinkedIn. ⚠️ Não confirmado se vale também para social selling/Instagram (C2 tem ritmo próprio de 5–10 abordagens/dia); trate como regras separadas até o dono confirmar o contrário.
4. Follow-up nunca antes do D+4.
5. Personalizar sempre a primeira linha (news da empresa, mudança no site).

### B2. Cadência por prospect

| Passo | Quando | Formato |
|---|---|---|
| Solicitação de conexão | D+0 | ≤300 caracteres, cita algo real (rodada, crescimento) |
| DM principal | Até 24h após aceitar | Problema do site + "Faço só sites e entrego em 2–3 semanas. Faz sentido conversar?" |
| Follow-up | D+4 | Um dado útil independente da venda |
| Breakup | D+10 | Encerra sem pressão |

Máximo 2 tentativas após o DM. Modelos completos da leva de junho (SolarZ, Conty, Elephan.AI, Vitrify) no doc. Lista com gancho pronto: `03 - Comercial/01 - Prospecção/phantombuster-prospects.csv` (10 empresas, coluna `dmHook`).

**Se o prospect responder fora da cadência prevista (D+0 a D+10):** a resposta do lead sempre interrompe a cadência automática — não é o relógio que manda, é a resposta. Assim que o prospect responder (a qualquer momento entre D+0 e D+10), pare os próximos passos programados (follow-up D+4 e/ou breakup D+10) e siga direto para B3 (Se responder). Só retome follow-up/breakup se ele responder e depois voltar a ficar em silêncio — aí a contagem de D+4/D+10 reinicia a partir da última resposta dele.

### B3. Se responder

- **Interesse:** responda em até 2h; NÃO mande proposta; marque call de 20 min; entenda o negócio antes de falar preço.
  - ⚠️ **O doc de 01/jun (`outbound-scripts-junho-2026.md`) ainda diz "após a call, proposta em 24h" — SUPERADO.** Fluxo vigente desde 11/jun: preço ao vivo e decisão na própria call; proposta em 24h só para quem NÃO fechou na hora. Antes de reutilizar qualquer trecho do doc de 01/jun que mencione "proposta em 24h", ajuste para refletir esse fluxo vigente — não copie a frase original, sem inventar script novo de substituição. Conduza a call com `irbis-call-de-vendas`.
- **"Não é o momento":** "Posso te mandar um exemplo do que entrego em 5 minutos de leitura?" → manda o case E-Force (+R$350k).

## FRENTE C — Inbound Instagram (funil de DM) + social selling

### C1. Mecanismo do funil (`quiz-diagnostico-site.md`, 25/jun)

1. Todo conteúdo termina com a CTA fixa **"manda SITE no direct"**.
2. ⚠️ Automação: ManyChat citado como "ou similar" — **contratação NÃO confirmada no repo**. Não prometa funil automatizado sem confirmar com o dono se a ferramenta está de fato ativa.
3. Quiz de 5 perguntas qualifica (site hoje? traz cliente? momento do negócio? maior incômodo? decisor pronto?). Alternativas 🔥 = sinal quente.
4. Diagnóstico personalizado (3 variações por perfil, definidas em `quiz-diagnostico-site.md`, mesma seção do quiz — ⚠️ path não confirmado por leitura direta nesta reescrita; se não estiverem nesse arquivo, é o único doc de `02 - Qualificação e Agendamento/` com "variações" no nome ou conteúdo) → CTA agendar a reunião de diagnóstico.
   ⚠️ **O link do calendário no doc (`quiz-diagnostico-site.md:63`) é o texto literal "[link do calendário]" — placeholder sem URL real.** **PARE antes de ativar este funil ou mandar esse link a qualquer prospect: pergunte ao dono a URL real do calendário (Calendly/Google Agenda ou similar) e só prossiga com a URL confirmada.** Sem URL real, ofereça agendamento manual por WhatsApp em vez do link.
5. Leitura: 3+ 🔥 = lead quente → puxar para call em até 24h. 1–2 🔥 = nutrição/follow-up.

Roteiros de conteúdo são da P2 do JDP (fora do repo); plano de posts vigente: `plano-conteudo-instagram.md` (10/jun). Copy de post = `irbis-brand-voice`.

### C2. Rotina de social selling (`rotina-sdr-social-selling-irbis.md`, 16/jun)

- 2 blocos/dia de 30–45 min (manhã: DMs + abordar 5 novos seguidores/engajados; tarde: follow-ups + 5 abordagens novas + pipeline).
- Ritmo solo: 5–10 abordagens novas + 5–10 follow-ups/dia; responder 100% de quem interagiu.
- Pipeline (Notion): `A contatar → Contatado → Respondeu → Conversa fluiu → Reunião agendada`, Origem = Social selling.
- Ferramentas: Notion, Instagram + WhatsApp, PhantomBuster, Canva, Google Meet/Zoom.

### C3. Abordagem fria por DM/WhatsApp (`script-hunter-irbis.md`, 16/jun)

Fluxo: Conectar → Engajar → Qualificar → Conduzir → Agendar (se não agendou, vira follow-up). Princípios: demonstre estar ocupado; personalização obrigatória; venda o TEMPO, não o site; gere curiosidade; nunca pitch nem preço no DM. Aberturas por situação no doc.

### C4. VSL (video sales letter)

`roteiro-vsl-irbis.md` (18/jun). **Não gravar/publicar sem remover a linha 29 ("LTV 1,8x" — banido em 04/jul/2026).**

## CONVERGÊNCIA — Qualificar e agendar

Toda frente converge para: qualificar → marcar reunião com data e hora.

### Nomenclatura: dois estágios distintos, mesmo nome popular (leia antes de agendar)

Os scripts de ligação/DM chamam de "reunião de diagnóstico" a própria **videochamada de vendas** (30–45 min, preço ao vivo, `irbis-call-de-vendas`). O roteiro de 25/jun criou um **degrau intermediário**, a "**call de diagnóstico**" (15–20 min, por telefone, sem preço fechado). São coisas diferentes.

**Regra de fluxo (⚠️ não explicitada nos docs originais — aplique até o dono confirmar diferente):**

| Origem do lead | Passa pela call de diagnóstico (15–20 min)? |
|---|---|
| Cold call (Frente A) | Não — o roteiro já agenda a videochamada diretamente |
| Outbound LinkedIn (Frente B) | Não — a call de 20 min de B3 já cumpre essa etapa |
| Inbound quiz/Instagram (Frente C) | Sim — funil para o qual o degrau de 25/jun foi desenhado |
| Lead indicado | Não documentado — trate como cold call (vai direto) até confirmar |

Origem fora da tabela → pergunte ao dono. Inegociável em qualquer caminho: sair da conversa com data e hora marcadas.

### Lead inbound no WhatsApp (quer site)

`script-whatsapp-lead-site.md` (16/jun). 4 blocos: primeiro contato → 3 perguntas de qualificação → explicação do processo ("não mando proposta solta") → fechamento com 2–3 horários. Preço de cara: reframe para escopo + reunião; se insistir: "casa dos milhares, não das centenas".

### Qualificação BANT

`script-qualificacao-bant-irbis.md` (16/jun). Perguntas por letra, tréplica após cada resposta. Régua interna de Budget: caixa R$4.500–5.000 (não falado ao lead). **Regra: faltou Budget OU Authority OU Timing claros → não força a reunião; entra em follow-up.**

⚠️ **Critério de "claro" não está no doc original — não invente régua fixa de aprovação/reprovação.** Na dúvida se uma resposta conta como clara (ex.: "precisa consultar sócio", "quando der"), trate como AMBÍGUA, não como aprovada: peça uma pergunta de esclarecimento adicional antes de decidir (ex.: "e esse sócio participaria da reunião?", "isso é uma questão de semanas ou de meses?"). Só force a reunião se, após esclarecer, as três letras (B, A, T) tiverem resposta específica (data, nome/papel do decisor, ou faixa de valor) — resposta vaga mesmo após pergunta extra = segue para follow-up, não para reunião.

Validação final → transição com 2–3 horários.

### Lead indicado

`script-agendamento-irbis.md` (16/jun). Abertura citando quem indicou → motivo → pitch (30–40 min) → checklist: Notion (Origem: Indicação), Google Agenda, confirmação por WhatsApp. Véspera: micro-pauta; dia: reminder 1h30 antes. Confirmação: dias seguintes → 8h45–9h45; mesmo dia → 14h30–17h. (GERAR indicação é `irbis-entrega-e-recorrencia`; aqui é só atender quem já chegou indicado.)

### Call de diagnóstico por telefone, 15–20 min

`roteiro-call-diagnostico-irbis.md` (25/jun — degrau mais novo, ver tabela de fluxo acima). Objetivo: NÃO vender. É (1) extrair escopo funcional, (2) ancorar com faixa, (3) marcar a videochamada.

8 etapas: Abertura 30s → Entender o momento 3–4 min → Diagnóstico/escopo 5–6 min (páginas? agendamento? integração? logo/textos/fotos? prazo?) → **ESPELHO** 1 min (devolver a dor nas palavras dele) → Valor 1 min → **Faixa "R$4.500 a R$7.500"** 1 min (se travar, não baixa preço: "o que pesou — o valor ou o momento?") → Marcar a videochamada com 2 horários → Encerramento (pedir logo + referências).

Regra: nunca feche o preço exato no diagnóstico — o preço fechado é a recompensa da videochamada.

**"Conduzir a conversa" — definição operacional (vale para TODO script desta skill que usa o verbo "conduzir" ou a frase "você conduz", não só a call de diagnóstico: inclui C3 "Conectar → Engajar → Qualificar → Conduzir → Agendar" e a regra 2 fixa "Hunter não vende, conduz"):**
1. Faz a próxima pergunta; se o lead sair do roteiro, traz de volta.
2. Não interrompe a resposta, mas não deixa silêncio longo sem retomar a próxima etapa.
3. Preço fora da hora certa (Política de preço abaixo) → redireciona, não responde.
4. Métrica de sucesso: "ele fala mais que você" — se você fala mais, está apresentando, não conduzindo.

## Política de preço por camada

| Camada | O que pode dizer sobre preço |
|---|---|
| Cold call, DM LinkedIn/IG, 1º WhatsApp | NADA. Reframe para a reunião. Última carta no WhatsApp: "casa dos milhares" |
| Call de diagnóstico (15–20 min) | Faixa R$4.500–7.500 para ancorar; nunca número fechado |
| Videochamada de vendas | Preço exato ao vivo, âncora R$7.000/7.500, decisão na call → `irbis-call-de-vendas` |
| Resposta pública de marca ("quanto custa?") | Copy aprovado: "Landing page a partir de R$5k. Site institucional e e-commerce sob escopo" (`.claude/brand-context.md:92`) |

**Nota de formatação (não é ambiguidade de valor):** a faixa da call de diagnóstico aparece como "R$4.500 a R$7.500" na Convergência e "R$4.500–7.500" nesta tabela — mesmo intervalo, hífen e "a" são sinônimos aqui. O valor de referência é sempre R$4.500 a R$7.500; use qualquer uma das duas grafias ao falar/escrever com o lead.

**Tensão documentada, não resolvida pelo dono:** o script de WhatsApp manda NÃO usar "a partir de"; o brand-context §08 aprova "a partir de R$5k" como resposta pública.

**Critério para decidir qual regime aplicar:**
- Conversa 1:1 de prospecção (ligação, DM, WhatsApp direto) → siga o script: NADA de número.
- Canal de marca estático (bio, FAQ, resposta padrão de anúncio) → use o copy do brand-context.
- Canal novo fora das duas linhas acima → pergunte ao dono; não decida sozinho.

## KPIs (`kpis-comercial-irbis.md`, 16/jun)

Pré-vendas (semana):

| Indicador | N1 | N2 | N3 |
|---|---|---|---|
| Contatos | 50 | 75 | 100 |
| Taxa de resposta | 15% | 20% | 25% |
| Conversão contato → reunião | 3% | 4% | 5% |
| Reuniões agendadas | 2 | 3 | 5 |
| Comparecimento (anti no-show) | 70% | 80% | 90% |
| Atividades do dia executadas | 80% | 85% | 90% |
| Follow-up (leads tocados) | 80% | 90% | 100% |

Social selling: novos seguidores abordados 60/70/80%; agendamentos por DM/stories 15/20/25%.

Vendas (mês):

| Indicador | N1 | N2 | N3 |
|---|---|---|---|
| Conversão reunião → fechamento | 20% | 30% | 40% |
| Ticket médio | R$4.500 | R$5.000 | R$6.000 |
| Sites fechados/mês | **2** | 4 | 6 |
| Faturamento/mês | ~R$9k | ~R$20k | R$30k+ |
| Indicações por cliente | 2 | 3 | 5 |
| Cash collected | 60% | 80% | 100% |

- N1 = meta de 90 dias do dono (≥2 clientes/mês). Acompanhamento no Notion.
- Gargalo: cai em *contato → reunião* = abordagem/gancho de dor; cai em *reunião → fechamento* = condução/ancoragem (`irbis-call-de-vendas`); cai em *comparecimento* = confirmação de véspera falhou.
- Lead que não fechou não morreu: follow-up ativo por 30 dias, depois base longa — `manual-follow-up-irbis.md`.

## Ambiguidades abertas — SEMPRE pergunte ao dono antes de decidir/publicar

| Pendência | O que se sabe | Antes de agir |
|---|---|---|
| ICP oficial | Em aberto; founders × locais premium coexistem | Pergunte qual frente a peça serve (checklist na seção ICP) |
| Resultado das levas (Leva 1, outbound SolarZ/Conty/Elephan/Vitrify) | Zero registro no repo; vive no Notion JDP | Peça o estado do pipeline ao dono |
| Quiz no ar? | ManyChat não confirmado; link do calendário é placeholder | Não prometa funil ativo; pergunte URL/ferramenta real |
| Roteiro "passar pela secretária" | Citado, não existe no repo | Peça o material JDP ao dono — não improvise |
| Voice agent Vapi para qualificação | Pré-pivot; produção desconhecida | Não plugar prospecção nele (`irbis-guarda-pivot`) |
| "Bia" (reativação no plano de 7 dias) | Nenhum outro registro | Pergunte quem é antes de disparar |
| Case Adash no site | Dono indeciso sobre remoção | Não citar como prova; decisão é do dono |
| Cold email voltar? | Rejeitado 01/jul ("To fora") | Só com nova decisão explícita |
| Adash (status geral) | Pendente | Pergunte antes de menção comercial |
| Link/estrutura do Notion | Não documentados | Peça ao dono |
| Teto de follow-up fora do LinkedIn | Não documentado | Pergunte ao dono; não invente número |

## Armadilhas conhecidas

- **Trackers do repo vazios ≠ nada aconteceu.** Estado comercial vive no Notion. Nunca conclua "nunca foi enviado" só pelo ☐.
- **`phantom-buscas-*.csv` são QUERIES, não leads.** Resultados raspados: 3 CSVs na raiz do repo.
- **Docs pré-pivot (< 01/jun/2026) não são referência**, exceto o corte SAM ≥R$8k, re-citado pelo dossiê de 23/jun. Resto de `05 - Análise de Growth/` (ICP Web3/SaaS, tickets R$18–45k) está morto — ver `irbis-guarda-pivot`.
- **Números banidos ainda nos docs** ("1,8x", "+500") — remova ao reutilizar trecho; paths na seção Prova social.
- **Paths com espaços** — sempre aspas.
- **Commit a cada fase** (dono: "Acumular nao da. Tem que ter commit a cada fase de trabalho."). Docs comerciais não eram commitados historicamente — commite ao fim de cada fase. Repo sem remote — recomende remote privado no GitHub. Método: `workbench-metodo-da-casa`.
- **Histórico git**: hook RTK trunca `git log` em 50 linhas — use `/usr/bin/git` direto.
- DM/copy nova → aplique `irbis-brand-voice` (palavras banidas, assinatura, sem travessão); scripts daqui dão a ESTRUTURA, não a voz.

## Proveniência e manutenção

**Escrito em 04/jul/2026** por agente da Fase 2 da livraria de skills; **reescrito em 06/07/2026** para execução por modelo júnior (checklists, tabelas de decisão, critérios objetivos, lacunas marcadas). Base: docs de `03 - Comercial/` (00, 01, 02 e apoios), `dossie-cold-call-leva1-junho2026.md` (23/jun), `outbound-scripts-junho-2026.md` (01/jun), `quiz-diagnostico-site.md` + `roteiro-call-diagnostico-irbis.md` (25/jun), `kpis-comercial-irbis.md` (16/jun), `.claude/brand-context.md`, `~/.claude/history.jsonl` (01/jul), `irbis-business.md` (02/jul) e respostas do dono de 04/jul/2026 (prevalecem sobre docs do repo).

Comandos de re-verificação (rode a partir de `Business/irbis/`; se divergir, a skill driftou). ⚠️ Hook RTK reescreve `grep` e dá falso-zero com padrões contendo `R$` — se retornar 0 inesperado, use `/usr/bin/grep`. Testados em 04/jul/2026, reconferidos em 06/07/2026:

- Preço proibido na ligação? → `grep -n "Preço NUNCA" "03 - Comercial/01 - Prospecção/dossie-cold-call-leva1-junho2026.md"` (linha 6)
- Corte SAM ≥R$8k? → `/usr/bin/grep -n "8k/projeto" "05 - Análise de Growth/IRBIS — Business Model Canvas/11_Relatorio_Segmentacao_Growth_IRBIS.md"` (linha 87)
- Faixa da call de diagnóstico 4.500–7.500? → `/usr/bin/grep -n "4.500 a" "03 - Comercial/02 - Qualificação e Agendamento/roteiro-call-diagnostico-irbis.md"` (linha 61)
- KPIs os mesmos? → `sed -n '14,42p' "03 - Comercial/00 - Planejamento/kpis-comercial-irbis.md"`
- Tracker do outbound vazio? → `/usr/bin/grep -c "| pendente |" "03 - Comercial/01 - Prospecção/outbound-scripts-junho-2026.md"` (4 = intocado; sem os pipes conta 5, pega "independente" na linha 58)
- Números banidos nos docs? → `grep -rn "1,8x\|+500" "03 - Comercial" "04 - Marketing" --include="*.md"`
- Decisão anti-cold-email de pé? → `grep -n "To fora" ~/.claude/history.jsonl`
- Lista de verticais atual? → `head -3 "03 - Comercial/01 - Prospecção/phantom-buscas-verticais.csv"` + `03 - Comercial/README.md:22`
- CTA do quiz "manda SITE"? → `grep -n "manda SITE" "03 - Comercial/02 - Qualificação e Agendamento/quiz-diagnostico-site.md"`
- Roteiro "secretária" ainda ausente? → `grep -rn "Passar pela secretária" "03 - Comercial"` (só a citação em `script-cold-call-irbis.md:31`)
- Link do calendário ainda placeholder? → `/usr/bin/grep -n "link do calendário" "03 - Comercial/02 - Qualificação e Agendamento/quiz-diagnostico-site.md"` (linha 63)
- Pipeline ainda no Notion? → `grep -n "Notion" "03 - Comercial/README.md"`
- Meta ≥2 clientes/mês e regras JDP fixas: resposta verbal do dono, sem artefato no repo — reconfirme a cada trimestre.
