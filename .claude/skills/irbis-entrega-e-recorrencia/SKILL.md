---
name: irbis-entrega-e-recorrencia
description: "Use quando um cliente da IRBIS fechou e o trabalho é a camada comercial do pós-venda: termo de aceite, condição de pagamento, prazos prometidos, checkpoint semanal com o cliente, reunião de entrega, handoff, plano de sustentação, MRR, recorrência, upsell, repitch, indicação, reativação da base (E-Force, Odery, Eduboxs), processo-entrega-padrao, processo-entrega-mrr-indicacao, sistema-indicacao-base-irbis. Para produzir o site em si (código, design, QA), veja irbis-producao-de-site."
---

# IRBIS — Entrega e Recorrência (do sim ao MRR)

Runbook do pós-venda: do "sim" do prospect até virar receita recorrente + indicações. Princípio do dono (verbatim, `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md` linha 3): **"O site é a porta de entrada; a recorrência é o ativo."**

Meta 90 dias (dono, 04/jul/2026, verbatim): *"Sucesso em 90 dias seria zapfy aprovado e irbis tendo pelo menos 2 clientes por mes."* → **≥2 clientes novos/mês até ~out/2026** (bate com KPI "Sites fechados/mês: 2", `03 - Comercial/00 - Planejamento/kpis-comercial-irbis.md`). Motor da meta: entregar bem + coletar indicação (3–8 por cliente bem entregue, Fase 5).

## REGRA MESTRA — quando a instrução for ambígua

Se um passo abaixo não tiver critério objetivo, **NÃO decida sozinho**: pare e pergunte ao Nicolas antes de agir. Toda linha marcada "⚠️ PERGUNTE AO DONO" é bloqueante — não prometa nada ao cliente sobre esse ponto até ter resposta.

## Glossário (definições — leia antes do resto)

| Sigla/termo | Significado |
|---|---|
| MRR | Monthly Recurring Revenue — receita mensal recorrente dos planos de sustentação |
| Repitch | Reoferecer o plano de recorrência a quem já comprou o site, no momento de satisfação |
| Upsell | Vender plano/serviço adicional a cliente existente |
| Handoff | Entrega total ao cliente (código, acessos, analytics, guia) sem dependência do estúdio |
| Pico de satisfação | Momento logo após o cliente ver o site pronto — melhor janela para repitch/indicação |
| Sustentação | Manutenção mensal do site (planos Básico/Pro/Premium) |
| F4 | Nome do sistema de indicação usado em `sistema-indicacao-base-irbis.md`. ⚠️ Sigla não definida em nenhum doc do repo (contexto Grupo JDP) — não invente expansão; se precisar explicar o termo a alguém, pergunte ao dono |
| Grupo JDP | Mentoria comercial do Nicolas; "Arthur" avalia os checkpoints. Regra fixa do dono (04/jul/2026): **"Regras deles sao fixas"** — nunca adapte regra do JDP |
| LP | Landing page |
| TMB | Meio de parcelamento citado no doc de MRR ("parte à vista, resto em boleto parcelado"). ⚠️ Sigla não definida no repo — NÃO prometa split de pagamento ao cliente sem confirmar com o dono |
| Stitch | Ferramenta de design do Google (fase de Design) |
| ICP | Perfil de cliente ideal — oficialmente EM ABERTO, ver Ambiguidades #5 |

## Quando NÃO usar esta skill

| Situação | Use em vez disso |
|---|---|
| Conduzir/fechar a call de vendas (ancoragem, objeções, pós-call) | `irbis-call-de-vendas` |
| Gerar reuniões: cold call, outbound, quiz, call de diagnóstico | `irbis-prospeccao-e-diagnostico` |
| Editar/publicar irbis.com.br (case, template, vercel.json, deploy do site do ESTÚDIO) | `irbis-site-ops` |
| Produção do site do cliente (repo, stack, protótipo, copy, QA, deploy do projeto) | `irbis-producao-de-site` |
| Copy externa completa (mensagens, posts, VSL, sistema de voz) | `irbis-brand-voice` |
| Decidir o que é canônico pós-pivot e quais números são afirmáveis | `irbis-guarda-pivot` |
| Regras globais da casa (RTK, superpowers, anti-AI-slop, convenção de commits) | `workbench-metodo-da-casa` (`Business/.claude/skills/`) |
| Prioridades de portfólio e metas de 90 dias em detalhe | `portfolio-mapa-e-decisoes` (`Business/.claude/skills/`) |

## Fontes primárias (relativas à raiz `Business/irbis/`)

| Doc | mtime | Papel |
|---|---|---|
| `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md` | 18/jun/2026 | Processo de entrega real ("o Arthur avalia se a entrega está à altura de um projeto de R$4,5–5k") |
| `03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md` | 18/jun/2026 | Preço + planos MRR + 2 pontos de oferta |
| `03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md` | 18/jun/2026 | Sistema F4: mapa da base, gatilhos, script, mensagens |
| `03 - Comercial/05 - Indicação/dia1-indicacao-mensagens.md` | 14/jun/2026 | Mensagens de reativação prontas (com correções obrigatórias, ver Base atual) |
| `03 - Comercial/03 - Reunião de Vendas/script-call-comercial-junho-2026.md` | 11/jun/2026 | Pós-call e promessa de handoff (linha 163) |
| `03 - Comercial/00 - Planejamento/todo-plano-7dias.md` | 16/jun/2026 | Pendências de execução (checkboxes) |
| `03 - Comercial/01 - Prospecção/roteiro-vsl-irbis.md` | 18/jun/2026 | Prova social em vídeo — parte BANIDA (ver Prova social) |
| `docs/comercial-assets.md` | 28/mai/2026 | ⚠️ PRÉ-PIVOT — só a ESTRUTURA do template de brief serve; escopo e pagamento 50/50 NÃO são referência |

Todos os paths acima foram verificados e existem no repo (checado 06/jul/2026). Pipeline de leads vive no **Notion "Grupo JDP <> IRBIS STUDIO"**, fora do repo — trackers dentro do repo estão vazios, isso não significa que nada aconteceu.

## Visão geral do fluxo

```
FECHOU (call de vendas)                    → irbis-call-de-vendas termina aqui
  Fase 0  mesmo dia: termo de aceite + briefing agendado
  Fase 1  call de briefing (ideal: dia seguinte) → produção começa AO FIM da call
  Fase 2  produção: Estratégia → Design → Copy → Código (ordem FIXA)
          preview Vercel + checkpoint semanal (SEM upsell); commit a cada fase
  Fase 3  site no ar → cliente testa ~3 dias → reunião de apresentação (handoff)
  Fase 4  pico de satisfação: repitch MRR
  Fase 5  indicação (F4): call de acompanhamento → gatilhos → mensagem pronta → contato 24h
```

## Fase 0 — Fechou: mesmo dia

Regra (`script-call-comercial-junho-2026.md` linha 268, verbatim): **"Fechou: termo de aceite + agendamento do briefing no mesmo dia."**

1. **Termo de aceite.**
   - Não existe template `.md` no repo. Único exemplar: PDF do caso ADash em `03 - Comercial/Propostas Em Espera/QG/IRBIS · Termo de Aceite · ADash_signed.pdf` (cliente que desistiu — serve só de modelo de FORMATO, não de case de sucesso; path não verificado como aplicável a novo cliente — confira se o PDF ainda existe nesse path antes de usar como referência).
   - Não existe contrato formal no repo (pendência conhecida: "Contrato formal: Nenhum — proposta + e-mail", `05 - Análise de Growth/IRBIS — Business Model Canvas/11_Relatorio_Segmentacao_Growth_IRBIS.md` linha 38, doc pré-pivot mas regime segue sem contrato).
   - ⚠️ PERGUNTE AO DONO antes de criar ou enviar qualquer contrato/termo novo.
2. **Condição de pagamento.**
   - Doc de MRR: "Parcelamento (TMB): parte à vista, resto em boleto parcelado."
   - O split exato (% à vista) NÃO está fixado em doc pós-pivot. O "50%+50%" de `docs/comercial-assets.md` é pré-pivot — **PROIBIDO usar como padrão atual.**
   - **Não existe split padrão pós-pivot vigente.**
   - ⚠️ PERGUNTE AO DONO o split para este cliente específico antes de fechar a condição — não existe regra fixa vigente.
3. **Marcar a call de briefing.** Prazo: ASAP, de preferência até o dia seguinte. Registre o horário combinado direto no Notion.
4. **Registrar o fechamento no pipeline Notion (JDP).** Board: "Grupo JDP <> IRBIS STUDIO" (Notion, fora do repo — acesso já provisionado ao dono/operador humano; nenhum MCP/URL de Notion está configurado para este fluxo, então este passo é executado por um humano, não pelo agente). Verificação: o card do cliente aparece no board com status "Fechado".

## Fase 1 — Call de briefing

Objetivo (`processo-entrega-padrao-irbis.md`, seção ANTES): alinhar expectativa — o que o cliente quer, referências, o que não pode faltar.

1. Ao fim da call, a produção COMEÇA no mesmo dia. Regra (linha 21, verbatim): "Sem intervalo morto entre fechar e começar." Isso sustenta o posicionamento (linha 11): "O que é bom e rápido não pode ser barato."
   - "Ao fim da call" = o horário real em que a call de briefing terminar (a call dura 1–2h; não há hora fixa marcada em doc). Ao informar prazo de entrega ao cliente, conte os dias corridos a partir da DATA da call de briefing (não da data do fechamento) — ex.: call de briefing terminou na terça → para site institucional (3–4 semanas), diga "você recebe entre a terça-feira daqui 3 semanas e a terça-feira daqui 4 semanas", nunca uma data-hora exata.
2. Formalização por escrito: **opcional**, decida pelo risco de disputa de escopo do cliente (cliente grande/corporativo → formalize; cliente pequeno/direto → pode pular). Se formalizar:
   - Quando enviar: logo após a call de briefing, mesmo dia.
   - Estrutura a usar (só a estrutura, não o conteúdo): `docs/comercial-assets.md` §2 — "O que entendi / O que proponho / O que não está incluído / Como vamos trabalhar / Investimento / Próximo passo".
   - Reescreva o CONTEÚDO no escopo pós-pivot (só sites) e na voz da marca (`irbis-brand-voice`).
   - A seção "O que não está incluído" é obrigatória quando formalizar — evita disputa de escopo depois.

## Fase 2 — Produção

> Runbook técnico completo (setup do repo, stack, protótipo, copy, QA, lançamento): skill `irbis-producao-de-site`. Abaixo, só o resumo de processo comercial.

### Ordem fixa e stack (`processo-entrega-padrao-irbis.md` linhas 25–31)

**Ordem FIXA: Estratégia → Design → Copy → Código. Nunca inverta.**

| Etapa | Ferramenta |
|---|---|
| Design | Stitch (Google) |
| Código | Claude Code |
| Deploy | Vercel |

- Código do cliente mora em `02 - Projetos/<cliente>/` com **git próprio** (confirmado 04/jul/2026: `02 - Projetos/adash/.git`, `02 - Projetos/Odery Drums/Site Odery/.git`). NUNCA commite código de cliente no repo raiz da IRBIS.
- **Para cliente novo, o git próprio NÃO existe ainda por padrão.** Antes de qualquer commit desta fase, confirme que a Fase 1 de `irbis-producao-de-site` (setup do repo) já rodou: `ls "02 - Projetos/<cliente>/.git"` (ou equivalente). Se não existir, pare e rode o setup de `irbis-producao-de-site` primeiro — não crie um git ad-hoc aqui, essa skill não define o passo a passo de setup.
- Stack varia por cliente (adash = React 19 + Vite; Site Odery = Next.js SSG); o processo (ordem fixa + preview + checkpoint) é igual para todos.
- Deploy em projeto Vercel próprio na org do Nicolas (`team_nrKsYjAemGbEQQSbV5SxOhdn`; ex. adash = `prj_VfJaHcaZkCsL9i3w0bVispTWPAUr`). Cliente acompanha por preview Vercel em tempo real.
- Antes de finalizar qualquer página: aplicar o bloco Anti-AI-Slop obrigatório (fontes/paletas/layouts proibidos, stop-slop na copy) — detalhe em `workbench-metodo-da-casa`. Site de cliente segue a regra integralmente.

### Regra de commit (dono, 04/jul/2026 — obrigatória)

Verbatim: **"Acumular nao da. Tem que ter commit a cada fase de trabalho."**

**O que conta como "uma fase" aqui:** as 4 fases da ordem fixa da seção acima — Estratégia, Design, Copy, Código — cada uma tratada como UMA unidade de commit, não uma por arquivo. Dentro de uma fase, múltiplos commits são aceitáveis (ex.: 3 commits diferentes durante o Código, um por feature) — o critério mínimo obrigatório é: nenhuma fase pode fechar com ZERO commits, e nenhum trabalho de uma fase pode ficar misturado sem commit até a fase seguinte começar. Não é preciso 1 commit exato por fase — é proibido acumular fase inteira sem nenhum commit.

1. Commit no git do projeto do cliente ao concluir CADA fase (Estratégia, Design aplicado, Copy, Código/feature).
2. Commit SEMPRE antes de qualquer deploy — em todos os projetos, sem exceção.
3. Convenção: Conventional Commits em PT-BR com escopo (`feat(home): ...`, `copy(cases): ...`). Evite `git add -A` em working tree sujo.
4. Para ver histórico git: prefira `rtk git log` (verificado instalado, `rtk 0.42.0` em `/opt/homebrew/bin/rtk`). Se `rtk` não responder (ex. "command not found"), use `/usr/bin/git log` direto — o hook do RTK trunca `git log` em 50 linhas.
5. Contexto de risco (verificado 04/jul/2026): repo raiz da IRBIS SEM remote (`/usr/bin/git remote -v` vazio — zero backup) e com 186 entradas sujas desde 10/jun. Recomende ao dono criar remote privado no GitHub para o repo raiz — é decisão DELE, não sua. Precedente: Site Odery já tem remote (`github.com/nicolasacunha/odery-drums`).

Verificação do passo: rode `/usr/bin/git log --oneline -5` no repo do cliente e confira que existe 1 commit por fase concluída.

### Checkpoint semanal com o cliente

1. Call rápida mostrando progresso e alinhando ajustes — pelo mesmo canal já em uso com o cliente nesta negociação (WhatsApp/e-mail/call de vídeo, o que já estiver estabelecido desde a Fase 0/1; não inicie um canal novo).
2. Foco EXCLUSIVO em progresso/alinhamento. Regra (linha 34, verbatim): "Ainda não é hora de pedir indicação nem empurrar upsell." Isso só acontece depois que o cliente vê o resultado pronto (Fases 4/5).
3. Cadência: **trate como 1 checkpoint/semana até novo aviso** — é a prática recomendada pelo doc, mesmo com o checkbox de confirmação ainda aberto (`processo-entrega-padrao-irbis.md` linha 57). Não combine outra cadência com o cliente sem confirmar com o dono (Ambiguidade #3).

### Prazos

| Tipo | Prazo REAL a usar com cliente |
|---|---|
| Landing page | 1–2 semanas |
| Site institucional | 3–4 semanas |
| E-commerce | Sob escopo — não tem prazo fixo aqui. Na 1ª conversa com o cliente, defina escopo e prazo junto com a skill `irbis-producao-de-site` (Fase 1 dela trata do levantamento de escopo); esta skill não tem passos próprios para e-commerce |

⚠️ **Divergência conhecida — use SEMPRE o prazo REAL (3–4 semanas) ao falar com cliente, NUNCA o do deck.** O deck comercial (`IRBIS — Apresentação Comercial.pdf`, no Canva) ainda promete "institucional 2–3 semanas". O processo manda corrigir o deck (linha 60) mas o checkbox segue aberto (04/jul/2026). NÃO corrija o deck por conta própria (vive no Canva, fora do repo) — pergunte ao dono se já foi corrigido antes de reutilizá-lo. **Critério de desempate obrigatório (não é ambíguo): o prazo REAL do processo (3–4 semanas) sempre vence o prazo do deck ao falar com CLIENTE — o deck desatualizado nunca é fonte para promessa de prazo, só é reaproveitado como peça visual depois de corrigido pelo dono.**

## Fase 3 — Entrega

Sequência (`processo-entrega-padrao-irbis.md`, seção DEPOIS):

1. **Site no ar** → cliente testa por **~3 dias** sozinho. Commit + deploy de produção antes (regra da Fase 2).
2. **Reunião de apresentação (1h–1h30)**, ~3 dias após a entrega:
   - Demonstrar o site.
   - Explicar cada etapa e onde está cada coisa (código, acessos).
   - Coletar feedback: o que ficou bom e o que não ficou.
3. **Handoff total.** Promessa literal da call de vendas (`script-call-comercial-junho-2026.md` linha 163): *"Site no ar, código e acessos seus desde o dia 1, analytics configurado, guia de edição. Tudo é seu. Eu não crio dependência."*

   Checklist do handoff:
   - [ ] Acesso ao repositório/código transferido ou compartilhado
   - [ ] Acessos Vercel/domínio/DNS entregues
   - [ ] Analytics configurado, com acesso do cliente
   - [ ] Guia de edição — ⚠️ **PERGUNTE AO DONO antes de prometer.** "Guia de edição" e "30 dias de ajustes pós-lançamento" são bônus do deck cuja entrega real está A CONFIRMAR (`processo-entrega-padrao-irbis.md` linhas 58–59). Critério para decidir sem perguntar: NÃO EXISTE — sempre confirme com o dono antes de prometer esses dois itens a um cliente novo. Formato do guia (vídeo/Loom/doc) também não está definido — não assuma.
4. Nesta mesma reunião, com o cliente no pico de satisfação: siga para repitch MRR (Fase 4) e/ou pedido de indicação (Fase 5).

## Fase 4 — Repitch MRR no pico de satisfação

Fonte: `processo-entrega-mrr-indicacao-irbis.md` (18/jun/2026). Aviso do próprio doc: "Preços abaixo são ponto de partida — ajusta conforme margem." São âncoras internas de venda 1-a-1, **nunca** tabela pública.

- ⚠️ PERGUNTE AO DONO qual margem-alvo usar antes de ajustar um preço para baixo da tabela abaixo — não há margem-alvo (bruta ou líquida) documentada; o critério de ajuste é do dono, caso a caso.
- Nunca publique preço de sustentação em site ou peça externa sem decisão do dono.

### Os 2 pontos de oferta (doc §4)

1. **Reunião de vendas** (território de `irbis-call-de-vendas`) — se o cliente comprou o "projeto completo", ele já entra com 3 meses de acompanhamento embutidos = plano Pro.
2. **Call de acompanhamento/entrega** — com o cliente vendo valor, faça o repitch (pontual → recorrente; Pro → Premium; ou adicionar Infra/Fábrica de LPs). Regra dura (doc §4.7, verbatim): *"Nunca oferta fria do nada"* — encaixe no contexto de performance ("já que tá rodando bem, deixa eu te mostrar como manter isso evoluindo").

### Quebra de preço da oferta principal (doc §1)

| Item | Valor |
|---|---|
| Site | R$ 4.500 |
| Acompanhamento (3 meses × R$ 1.000) | R$ 3.000 |
| **Projeto completo** | **R$ 7.500** |

Acompanhamento é opcional (sem ele: R$ 4.500) — a quebra ancora alto e transforma corte de escopo em escolha do cliente, não desconto. Os 3 meses embutidos = plano Pro; no fim deles, pergunta obrigatória: "manter no Pro ou subir pro Premium?"

### Planos de sustentação (doc §2)

| Plano | Inclui | Preço/mês |
|---|---|---|
| Básico | Atualizações, segurança, backup, monitoramento uptime/carregamento | R$ 350 |
| Pro | Básico + pequenas alterações a qualquer momento + suporte monitorado + coleta de feedback | R$ 1.000 |
| Premium | Pro + evolução contínua + reunião quinzenal/semanal | R$ 2.500 |

### Avulsos (doc §3)

| Avulso | O quê | Preço/mês |
|---|---|---|
| Gerenciamento de Infraestrutura | Hospedagem + domínio + SSL geridos pelo estúdio | R$ 150–250 |
| Fábrica de Landing Pages | 1–2 LPs/mês + análise de performance + reunião quinzenal | R$ 2.000–3.000 |

Escada de receita (linha 62): `Infra R$150–250 < Básico R$350 < Pro R$1.000 < Fábrica LP R$2–3k < Premium R$2.500`. Quanto mais alto na escada, mais previsível o mês e mais difícil o cliente cancelar.

## Medição pós-lançamento — D+30 / D+90 / D+150 (regra do dono, 06/jul/2026)

1. Todo projeto nasce com baseline registrado no kickoff: `docs/kickoff-baseline.md` no repo do CLIENTE (Fase 1 de `irbis-producao-de-site`).
2. **Antes de medir, Read `docs/kickoff-baseline.md` no repo desse cliente específico** — não presuma a estrutura de memória nem copie de outro cliente: replique exatamente as seções que aquele baseline já registrou (tipicamente leads/vendas e origem, Google/GMB, tráfego, velocidade — mas confira no arquivo real, ele pode variar). Se o arquivo não existir (baseline pulado na Fase 1 de `irbis-producao-de-site`), pare e avise o dono — sem baseline não há comparação possível; não invente um formato novo para preencher a lacuna.
3. Refaça a medição, no MESMO formato do baseline, em:
   - **D+30** — alimenta a call de acompanhamento ("o que mudou na prática?", Fase 5 passo 2) e é o melhor contexto para o repitch MRR.
   - **D+90 e D+150** — geram o número REAL do case. Só vira peça externa depois de confirmado pelo dono E pelo cliente (regra de prova social: `irbis-guarda-pivot`). Reabastece o pedido de indicação.
4. Agende os 3 marcos no calendário no dia do lançamento — não confie na memória.

## Fase 5 — Indicação (sistema F4)

Fonte: `03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md`. Meta: **3 a 8 indicações por cliente bem entregue** (§Metas) — trate como range esperado, sem piso obrigatório por entrega individual; não há penalidade documentada por ficar abaixo de 3 numa entrega isolada. Acontece DENTRO da call de acompanhamento — entre falando de performance, não de venda.

### Script da call de acompanhamento + coleta (30–45 min, doc §4)

| Passo | O que fazer | Regra dura / como encerrar o passo |
|---|---|---|
| 1. Ajuste fino | Começar por performance e ajustes do site | Nada de venda ainda |
| 2. Indução à satisfação | Perguntar: "Desde que o site subiu, o que mudou na prática?" / "Comparado com o que você tinha antes, qual a diferença real?" / "Quando você manda o link pra um cliente ou investidor, qual a primeira reação?" | Não interromper. Sem limite de tempo documentado — se o cliente entrar em loop repetindo o mesmo ponto, avance para o passo 3 assim que ele repetir a mesma resposta pela 2ª vez |
| 3. Transição pra indicação | "...a maior parte dos meus projetos novos vem de founder indicando founder... Você consegue pensar em alguém da sua rede nesse ponto agora?" | Depois da pergunta, SILÊNCIO — não preencha a pausa (doc §4.3). Sem duração fixa documentada: espere até o cliente falar, não corte antes disso |
| 4. Se travar | Puxar os gatilhos um a um (lista abaixo) | — |
| 5. Registrar na hora | Nome + WhatsApp/@/LinkedIn + campo "Quem indicou" | Registrar no Notion (pipeline JDP), NÃO no repo. Não há template/DB pronto documentado — use o board Notion já existente do pipeline |
| 6. Encaminhamento na hora | Mandar mensagem pronta pro cliente encaminhar; pedir 5 min dele no início da call com o indicado | Use a mensagem correspondente de `dia1-indicacao-mensagens.md` §3 — escolha a versão que casa com o perfil do indicado. **Exceção obrigatória: a mensagem 1A (versão Odery) NÃO pode ser usada como está — ela cita "LTV 1,8x", métrica BANIDA pelo dono (ver Prova social). Se o indicado vier do contexto Odery, use a versão genérica (1C ou equivalente sem métrica) e cite só a natureza do resultado ("ajudou a melhorar a retenção") sem número — NUNCA pare a call para esperar o dono responder qual número usar; resolva no momento simplesmente omitindo o número** |
| 7. Repitch MRR | Encaixar plano de sustentação no contexto | "Nunca oferta fria do nada" |

### Gatilhos de memória (doc §2 — em vez de "conhece 5 pessoas?")

Founder que acabou de levantar rodada com site improvisado · quem vai lançar produto novo · MVP travado em no-code · loja que converte mal/plataforma ruim · quem está rebrandeando · quem reclamou do dev/agência atual · pergunta extra: "de qual aceleradora, mastermind ou comunidade você participa?"

Os gatilhos foram escritos para founders. ICP oficialmente EM ABERTO (Ambiguidade #5). Critério para cliente de negócio local: adapte só o VOCABULÁRIO do gatilho — troque o substantivo do contexto, mantendo a estrutura da frase intacta. Exemplo concreto (o limite é: troque só o objeto citado, nunca a pergunta em si):
- Original (founder): "Founder que acabou de levantar rodada com site improvisado"
- Adaptado (negócio local): "Dono de negócio que acabou de abrir uma segunda unidade/loja com site improvisado"
- Original: "de qual aceleradora, mastermind ou comunidade você participa?"
- Adaptado: "de qual associação comercial, grupo de empresários ou comunidade local você participa?"
Isso NÃO é reescrever a copy — é troca de substituto lexical 1-para-1. Se o cliente não se encaixa em nenhum gatilho nem com essa troca simples, pare e pergunte ao dono em vez de inventar um gatilho novo.

### Contato com o indicado (doc §5)

1. Em até 24h após receber o nome.
2. Abrir SEMPRE falando da outra pessoa: "O [cliente] me passou seu contato..." — regra: "Referência quente esfria em horas."
3. Se não responder: follow-up em D+6, curto, sem desculpa.
4. Funil de medição no pipeline Notion (board "Grupo JDP <> IRBIS STUDIO", fora do repo — acesso já provisionado ao dono/operador humano; nenhum MCP/URL configurado, registro é manual): coletadas → contatadas → respondidas → reuniões agendadas.
5. **O prazo de 24h nunca fica bloqueado por confirmação do dono.** A dúvida sobre "qual resultado da Odery citar" (ver Base atual) diz respeito só ao CONTEÚDO da mensagem de encaminhamento — resolva-a no momento (passo 6 da tabela acima, omitindo número) e dispare a mensagem dentro das 24h. Só pare o relógio das 24h se o próprio cliente não tiver mandado o contato do indicado ainda.

### Base atual para reativação (estado corrigido em 04/jul/2026 — prevalece sobre `sistema-indicacao-base-irbis.md` §1 e `dia1-indicacao-mensagens.md`)

| Cliente | Status real (04/jul/2026) | Pode reativar/pedir indicação? |
|---|---|---|
| E-Force (via pai do Nicolas, advogado) | Entregue 27/abr/2026; resultado +R$350k REAL | SIM — nó mais quente; pai atua como apresentador (mensagem 1C) |
| Odery | Cliente externo real, landing de retenção entregue | SIM, mas SEM citar a métrica de LTV 1,8x (BANIDA) — mesmo que `dia1-indicacao-mensagens.md` linha 16 ainda cite "Odery (resultado: LTV 1,8x)": esse trecho está SUPERADO pelo banimento do dono e NUNCA deve ser copiado como está. ⚠️ PERGUNTE AO DONO qual resultado real da Odery pode ser citado para peça EXTERNA nova (site, post, case). Para a mensagem de encaminhamento no calor da call de acompanhamento (bloqueio síncrono), NÃO espere essa resposta — omita o número e descreva o resultado qualitativamente (ver Fase 5, tabela do script, passo 6) |
| Eduboxs | Site AINDA NÃO FEITO (dono, 04/jul/2026: "eduboxs ainda nao fiz o site") | NÃO — ignore a linha "Eduboxs · site entregue" em §1 do sistema-indicação e a mensagem 1B do dia1-indicação; ambas superadas |
| Adash (QG) | Fictício — "o projeto não foi entregue de fato" | NUNCA — "não se pede indicação a quem desistiu" |

⚠️ As mensagens do Dia 1 seguem NÃO disparadas (checkbox aberto em `todo-plano-7dias.md` linha 7, confirmado 04/jul/2026). PERGUNTE AO DONO antes de disparar qualquer uma — critério para disparar sem perguntar: nenhum definido; trate sempre como bloqueio.

## Prova social: o que pode e o que NÃO pode (dono, 04/jul/2026 — prevalece sobre todo doc do repo)

| Afirmação | Veredito do dono (verbatim onde houver) | Ação |
|---|---|---|
| "+R$350k em vendas" (E-Force) | "+350k em vendas é real" | Pode afirmar em call, site, mensagem |
| "E-Force +500" | "500 inventado acho, nem sei ondet a isso" | **BANIDO** — nunca usar (pendência em `script-call-comercial-junho-2026.md` linha 80) |
| "LTV 1,8x" / "meu LTV quase dobrou" (Odery) | "LTV inventado tbm" | **BANIDO** — nunca usar. Afeta a "Versão Odery" de `sistema-indicacao-base-irbis.md` §3, a mensagem 1A de `dia1-indicacao-mensagens.md`, e o bloco PROVA de `roteiro-vsl-irbis.md`. Reescreva sem a métrica ou pergunte ao dono o resultado real da Odery antes de usar qualquer uma dessas três peças |
| Eduboxs como case/cliente entregue | "eduboxs ainda nao fiz o site" | Ignore docs que o listam como entregue; pendência "gancho/resultado Eduboxs" (`todo-plano-7dias.md:49`) segue aberta |
| Case Adash | "Case adash ainda indecidido" | NÃO usar em peça nova. Remover/manter o case do site (irbis.com.br/adash) é decisão pendente do dono — não decida sozinho, pergunte |

Regra geral: qualquer número novo de case só entra em peça externa depois de confirmado pelo dono. Se a tarefa for de ENTREGA (não marketing) e você precisar citar um número num repitch/indicação — por exemplo repitch da Odery — aplique a mesma regra: pergunte ao dono direto (Notion/WhatsApp) antes de citar; só use a skill `irbis-guarda-pivot` quando a dúvida for sobre o que é canônico vs. obsoleto, não para autorizar um número novo.

## Ambiguidades abertas — pergunte ao dono antes de decidir/publicar

| # | Questão | Hipóteses coexistentes | Não faça sem resposta |
|---|---|---|---|
| 1 | Deck diz "institucional 2–3 sem"; processo real diz 3–4 | (a) deck já corrigido no Canva; (b) segue errado | Não cite prazo do deck; use 3–4 com cliente |
| 2 | Bônus do deck: "30 dias de ajustes pós-lançamento" e "guia de edição" | (a) entrega de fato; (b) sai do deck | Não prometa os bônus ao cliente |
| 3 | Cadência de checkpoint | 1/semana (recomendado, não ratificado) | Não formalize outra cadência em proposta |
| 4 | Condição de pagamento padrão | (a) TMB parte à vista + boleto; (b) 50/50 pré-pivot | Não prometa split de pagamento |
| 5 | ICP oficial (dono, 04/jul/2026: "Ainda nao consegui definir meu ICP perfeitamente pq nao vendi direito") | founders × negócios locais premium — COEXISTEM | Nenhuma copy nova trava num ICP só |
| 6 | Resultado citável da Odery pós-banimento do 1,8x | (a) existe métrica real a apurar; (b) case fica qualitativo | Não envie mensagens 1A/"Versão Odery" como estão |
| 7 | Contrato formal (não existe modelo no repo) | (a) termo de aceite basta; (b) criar contrato | Não invente contrato novo |
| 8 | Preços MRR ("ponto de partida — ajusta conforme margem") | valores são âncora 1-a-1, não preço público | Não publique preço de sustentação em site/peça |

## Checklist de ciclo completo (copy-paste por cliente)

```
[ ] F0  Termo de aceite: pergunta enviada ao dono AGORA; nada enviado ao cliente sem resposta (ver bloqueio síncrono)
[ ] F0  Condição de pagamento: cliente informado só que é "à vista + boleto parcelado (TMB)", sem % até o dono confirmar
[ ] F0  Briefing marcado (ideal: dia seguinte)
[ ] F1  Call de briefing feita; produção iniciada no mesmo dia
[ ] F2  Git próprio do cliente confirmado/criado em "02 - Projetos/<cliente>/" (checar antes de commitar)
[ ] F2  Commit em cada fase (Estratégia/Design/Copy/Código) — zero fases fechadas sem nenhum commit — e sempre antes de deploy
[ ] F2  Preview Vercel compartilhado com o cliente
[ ] F2  Checkpoint semanal feito (sem upsell/indicação)
[ ] F2  Anti-AI-Slop aplicado antes de finalizar cada página
[ ] F3  Deploy de produção (commit antes)
[ ] F3  ~3 dias de teste do cliente
[ ] F3  Reunião de apresentação 1h–1h30 + handoff (código, acessos, analytics; guia de edição só com confirmação do dono)
[ ] F4  Repitch MRR no pico de satisfação (nunca oferta fria)
[ ] F5  Pedido de indicação (silêncio após a pergunta) + gatilhos
[ ] F5  Indicados registrados no Notion; contato em até 24h
[ ] F5  Fim dos 3 meses Pro: conversa "manter no Pro ou subir pro Premium?"
[ ] D+30/D+90/D+150 medidos vs kickoff-baseline (D+30 municia repitch; D+90/150 só viram case externo com dono + cliente confirmando)
```

## Proveniência e manutenção

**Escrito em 04/jul/2026, revisado em 06/jul/2026** por agente da livraria de skills, com base em: leitura direta dos docs de `03 - Comercial/` (mtimes 11–18/jun/2026), `docs/comercial-assets.md` (28/mai, pré-pivot), inspeção do git (`/usr/bin/git`) e dos projetos em `02 - Projetos/`, dossiês de descoberta (irbis-business.md, irbis-site-code.md, 02/jul/2026) e respostas do dono de 04/jul e 06/jul/2026 (prevalecem sobre qualquer doc do repo). Todos os paths citados neste doc foram verificados como existentes em 06/jul/2026.

Comandos de re-verificação (rode da raiz `Business/irbis/`; se o resultado mudar, ATUALIZE esta skill e avise o dono — não silencie a divergência):

- Ordem fixa/stack/prazos ainda valem? → `sed -n '17,60p' "03 - Comercial/04 - Entrega e Recorrência/processo-entrega-padrao-irbis.md"`
- Planos MRR ainda 350/1.000/2.500 e quebra 4.500+3.000? → `grep -n 'R\$' "03 - Comercial/04 - Entrega e Recorrência/processo-entrega-mrr-indicacao-irbis.md"` (use aspas simples no padrão, senão o shell come o `\`)
- Base de indicação mudou (Eduboxs virou case? métrica nova da Odery?) → `grep -rn "Eduboxs\|Odery" "03 - Comercial/05 - Indicação/" | head`
- Mensagens do Dia 1 já disparadas? → `grep -n "Disparar as 3 mensagens" "03 - Comercial/00 - Planejamento/todo-plano-7dias.md"` (checkbox)
- Repo raiz ganhou remote/backup? → `/usr/bin/git remote -v` (vazio em 06/jul/2026)
- Working tree ainda acumulando? → `/usr/bin/git status --short | wc -l` (186 em 04/jul/2026)
- Case Adash ainda publicado no site do estúdio? → `grep -n "adash" site/vercel.json && ls "site/cases-hub/adash/"`
- Pendência do deck (2–3 vs 3–4 sem) resolvida? → não é grepável (deck vive no Canva); pergunte ao dono
- Meta "≥2 clientes/mês" ainda vigente? → skill `portfolio-mapa-e-decisoes` + perguntar ao dono (horizonte ~out/2026)
- Números afirmáveis mudaram? → skill `irbis-guarda-pivot` (fonte canônica de prova social)
- RTK segue instalado e funcional (para o passo de commit)? → `which rtk && rtk --version`; se falhar, use `/usr/bin/git` direto em todos os comandos git desta skill
