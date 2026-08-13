# Sistema Operacional do Estúdio ("OS") — Blueprint de construção

**Data:** 28/jul/2026. **Status:** rascunho para revisão do Nicolas.
**Cliente:** empresa idêntica à IRBIS (estúdio solo de sites + sistemas com IA, operação IA-nativa, pipeline outbound + indicação, carteira em formação).
**Ticket de referência:** a definir. ⚠️ O valor de R$ 100.000 que constava aqui era **fictício**, criado pelo Nicolas para um exercício de prompt. Não usar como âncora, nem derivar preço dele.
**Único preço real hoje:** a proposta em aberto do QG Group (CRM IRBIS, 28/jul/2026) marca R$ 2.997 de setup + R$ 197/mês. Atenção: R$ 197/mês é exatamente o `basico-12m` de `planos-recorrencia-irbis.md` — plano de manutenção de **site** (hospedagem, backup, monitoramento), não de OS. Ou a linha do QG está rotulada errada no CRM, ou o OS está sendo vendido ao preço de sustentação de site. Resolver antes de precificar.
**Natureza:** blueprint interno de construção. A proposta comercial deriva DESTE documento, não o contrário.

**Decisões de arquitetura tomadas em 28/jul (Nicolas):**

1. **Notion é o banco de dados** de leads, projetos, propostas e financeiro. Claude é o motor que lê, escreve e alerta. O dono acessa tudo do celular sem depender de sessão de IA aberta.
2. **WhatsApp entra via Pipedream** como ponte (webhook inbound + envio outbound). Limitação assumida: só cobre número WhatsApp Business/Cloud API — conversa no número pessoal continua manual, com registro por comando rápido (seção 6.3).
3. **Blueprint primeiro, proposta depois.** Este doc é o padrão replicável; se um segundo cliente comprar o MESMO sistema com pouca customização, é o teste da rota "produto" da bifurcação de 5 anos.

---

## 0. A tese do sistema (por que ele vale o que vale)

O cliente deste sistema não sofre de falta de processo — sofre de processo que vive em documento e morre na execução. Ele tem funil documentado de ponta a ponta, escada de follow-up escrita, gestão de carteira aprovada em doc… e ao mesmo tempo: rotina matinal cega pro pipeline vivo (5 relatórios seguidos sem acesso a Notion/Agenda/WhatsApp), deal fundador 11 dias em aberto, lead com histórico de WhatsApp evaporando por mensagem temporária, call "confirmada ✅" há 7 dias sem data legível em lugar nenhum, e placar da semana aberto com atraso.

O diagnóstico em uma linha: **a inteligência existe, mas opera sobre dado morto.** Cada módulo deste sistema existe para uma única coisa — garantir que a informação certa chegue viva, no momento certo, sem o dono precisar lembrar de buscá-la.

Três consequências de projeto:

- **Fonte viva > relatório inferido.** Nenhuma rotina do sistema pode "inferir" estado de pipeline por data de arquivo. Se a fonte não está conectada, a rotina diz "não sei" e aponta a conexão faltante — nunca preenche com suposição.
- **Registro automático > disciplina heroica.** O dono solo não vai logar interações manualmente todo dia. O sistema captura sozinho o que der (e-mail, agenda, WhatsApp Business via ponte) e reduz o resto a um comando de 10 segundos.
- **Rascunho pronto + aprovação humana.** Toda comunicação externa nasce pronta para disparo, mas nada sai sem "pode mandar" explícito. O sistema acelera o braço; o dedo no gatilho é do dono.

---

## 1. Princípios de design (invioláveis)

1. **Operável por uma pessoa.** Custo diário de operação do dono: ≤ 10 min (aprovar rascunhos + 1 comando de registro). Qualquer módulo que exija mais que isso está mal projetado.
2. **Uma fonte de verdade por tipo de dado.** Dados operacionais (leads, projetos, propostas, financeiro) → Notion. Processos, templates e copy → repositório de arquivos. Decisões e preferências recorrentes → memória persistente do workspace. Divergência entre card e doc: o doc de processo vence; divergência de dado: o Notion vence.
3. **Notificação proativa > checagem manual.** O dono nunca "abre o sistema pra ver se tem algo". O sistema empurra: rotina matinal, alertas de vencimento, vigias de resposta.
4. **Higiene de sessão de IA** (playbook 23/jul): uma sessão = um assunto; exploração via subagente; rotina automatizada se revisa em lote; workflow multiagente só sob pedido explícito. O sistema herda essas regras como configuração, não como boa intenção.
5. **Aprovação humana em toda comunicação externa** (modo Ask). Automação plena (modo Execute) só para leitura, consolidação e alerta interno.
6. **Cada fase entrega valor sozinha.** Se o projeto parar na Fase 2, o cliente ficou com um CRM vivo e alertas funcionando — não com metade de nada.

---

## 2. Arquitetura em 4 camadas

```
┌────────────────────────────────────────────────────────────┐
│  INTERFACE — onde o dono vê e decide                       │
│  Dashboards salvos · rotina matinal (e-mail/WhatsApp) ·    │
│  Notion mobile · alertas push                              │
├────────────────────────────────────────────────────────────┤
│  MOTOR — Claude/Cowork                                     │
│  Skills (procedimentos) · Workflows (/comandos) ·          │
│  Agendamentos · Vigias · Agentes p/ tarefas paralelas ·    │
│  Memória do workspace (decisões, preferências)             │
├────────────────────────────────────────────────────────────┤
│  DADOS — Notion (banco) + repo (processos/templates)       │
│  6 databases relacionados (seção 3) ·                      │
│  templates versionados em arquivo                          │
├────────────────────────────────────────────────────────────┤
│  CONEXÕES — fontes vivas                                   │
│  Gmail · Google Calendar · Notion API ·                    │
│  Pipedream (WhatsApp Business, Discord, Trello) ·          │
│  Google Drive/Sheets · Open Finance (conciliação) ·        │
│  situacionais: GitHub, Figma, GA4/Clarity                  │
└────────────────────────────────────────────────────────────┘
```

Regra de fluxo: **conexões alimentam dados; o motor lê dados e produz interface; o dono decide na interface; a decisão volta pros dados.** O motor nunca é a fonte de verdade — se a sessão de IA sumir, o estado do negócio continua íntegro no Notion.

---

## 3. Modelo de dados (Notion — 6 databases relacionados)

### 3.1 `Pessoas & Empresas` (o cadastro-mestre)

Um registro por contato/empresa. Tudo aponta pra cá.

| Campo | Tipo | Nota |
|---|---|---|
| Nome / Empresa | título | |
| Contatos | telefone, e-mail, @ | inclui o número exato do WhatsApp |
| Origem | select | indicação (de quem), inbound site, outbound, G4, evento |
| Papel | select | lead, cliente ativo, ex-cliente, parceiro, indicador |
| Dossiê | URL/arquivo | link pro dossiê no repo |
| Relações | relation | → Leads, Projetos, Propostas, Interações, Financeiro |

### 3.2 `Pipeline` (CRM leve — módulo 1)

| Campo | Tipo | Nota |
|---|---|---|
| Lead | relation → Pessoas | |
| Estágio | select | primeiro contato → levantamento → proposta → negociação → fechado / perdido / **nutrição** |
| Valor potencial | número | |
| Temperatura | select | 🔥 quente / 🟠 morno / 🧊 frio |
| Próximo passo | texto | SEMPRE preenchido — card sem próximo passo é alerta |
| Data do próximo toque | data | motor dos alertas de lead parado |
| Último contato real | data | atualizado automaticamente pela db Interações |
| Degrau da escada | select | D+3 leve · D+7 contexto · D+10 ultimato · breakup enviado |
| Motivo da perda | select | preço, momento, escopo, silêncio, outro — alimenta post-mortem |

O estágio **nutrição** existe porque o manual de follow-up da casa manda: lead que não fechou em 30 dias não morre, vai pra base longa. Sem esse estágio, "perdido" vira cemitério de oportunidade.

### 3.3 `Interações` (o histórico que hoje evapora)

Um registro por toque: data, canal (WhatsApp, e-mail, call, presencial), direção (enviado/recebido), resumo de 1-2 linhas, link pro artefato (thread, gravação, dossiê), relação → Pessoa.

**Como é alimentada (em ordem de automação):**
1. **E-mail:** vigia no Gmail registra automaticamente threads de deals ativos.
2. **Reuniões:** o workflow pós-reunião (seção 4.3) grava resumo + decisões.
3. **WhatsApp Business:** webhook Pipedream → registro automático de inbound/outbound.
4. **WhatsApp pessoal e resto:** comando `/registrar` — 10 segundos: "registrar: Michele respondeu, quer call quinta". O sistema completa o resto (data, relação, atualização do card).

Esta database é a resposta direta ao problema real de mensagens temporárias de 7 dias apagando histórico de negociação: **o registro passa a ser do sistema, não do aplicativo de mensagem.**

### 3.4 `Projetos` (módulo 2)

| Campo | Tipo | Nota |
|---|---|---|
| Projeto | título | |
| Cliente | relation → Pessoas | |
| Tipo | select | LP · site institucional · e-commerce · sistema IA · bot |
| Status | select | onboarding → em produção → em revisão → entregue → em garantia (30d) → carteira |
| Escopo | página/anexo | link pro anexo de escopo assinado |
| Próximo marco + data | texto+data | |
| **Travado por** | texto | vazio = destravado; preenchido = aparece no painel "o que trava" |
| Travado desde | data | dispara alerta com a idade do bloqueio |
| Pacote ativo | select | nenhum · Básico · Pro (os 4 campos de carteira da casa) |
| Próxima camada candidata | texto | site↔IA, upsell mútuo |
| Data do próximo toque de carteira | data | regra: nenhum cliente ativo passa 90 dias sem contato de valor |

### 3.5 `Propostas` (módulo 4a)

Proposta, relação → Pessoa/Pipeline, tipo de projeto, valor, data de envio, validade, status (rascunho → enviada → aceita / recusada / expirada), condições (à vista, 50/50, parcelado), link do PDF, **post-mortem** (as 3 perguntas da casa, preenchidas em 15 min quando a proposta decide — ganhe ou perca).

### 3.6 `Financeiro` (módulo 4b)

Um registro por parcela/cobrança: relação → Projeto/Proposta, tipo (entrada, marco, recorrência, aditivo), valor, vencimento, status (a receber → pago / vencido), forma, NF emitida (sim/não). Recorrências geram registros mensais automaticamente com data de renovação do compromisso (3/6/12 meses) marcada.

**Conciliação:** rotina semanal cruza os registros "a receber" com o extrato da conta PJ via Open Finance e marca pagos/vencidos sozinha. Sem digitação de extrato.

---

## 4. Os 6 módulos

### 4.1 Módulo 1 — Pipeline de vendas (CRM leve)

**O que já existe no padrão do cliente:** board no Notion recebendo lead do form `/call` com card automático; escada de follow-up documentada (D+3 leve → D+7 contexto → D+10 ultimato); manual de follow-up com scripts prontos; dossiês por lead no repo.

**O que o sistema acrescenta:**

- **Migração do board atual pro modelo 3.2** (estágios do funil pedidos + nutrição + campos de alerta). Sem recomeçar do zero: os cards existentes são enriquecidos, não recriados.
- **Alerta de lead parado, por estágio** (não um X global — proposta parada 3 dias é incêndio; primeiro contato parado 3 dias é normal):

| Estágio | Alerta após | Racional |
|---|---|---|
| Negociação | 2 dias sem toque | é onde deal morre por silêncio |
| Proposta enviada | 3 dias | degrau D+3 da escada da casa |
| Levantamento | 5 dias | |
| Primeiro contato | 7 dias | |
| Nutrição | 30 dias | 1 conteúdo/caso novo por mês |

- **O alerta já vem com o degrau certo da escada e o rascunho da mensagem** (a partir dos scripts do manual de follow-up, na voz da marca, sem palavra banida, sem preço no corpo). O dono aprova ou edita — não redige.
- **Histórico por pessoa:** a db Interações + dossiê linkado no card = clicou no lead, viu tudo (toques, propostas, análises entregues, objeções já respondidas).
- **Post-mortem obrigatório em proposta decidida** — o campo Motivo da perda alimenta o placar semanal com dado, não achismo.

**Critério de aceite:** nenhum card sem próximo passo + data; alerta de parado dispara na rotina matinal com rascunho anexo; histórico completo de um deal consultável em 1 clique.

### 4.2 Módulo 2 — Gestão de projetos por cliente

**O que o sistema acrescenta:** db Projetos (3.4) com dois painéis salvos que respondem as duas perguntas que importam pro solo:

- **"O que está travado"** — todo projeto com `Travado por` preenchido, ordenado por idade do bloqueio, com o culpado nomeado (cliente não mandou acesso, aguardando fornecedor, aguardando eu mesmo). Bloqueio com 3+ dias sobe pra rotina matinal com sugestão de destravamento (cobrar acesso, escalar, replanejar marco).
- **"O que vence essa semana"** — marcos + vencimentos financeiros + toques de carteira + renovações, todos os clientes numa lista só, segunda de manhã.

A visão de carteira embutida cumpre o processo aprovado da casa: 4 campos por cliente (último contato, pacote ativo, próxima camada, próximo toque), regra dos 90 dias vigiada por rotina — cliente chegando em 60 dias sem contato de valor aparece com sugestão concreta (relatório da auditoria mensal do site como gancho, 1 ideia de camada específica do negócio dele — nunca catálogo).

**Critério de aceite:** as duas perguntas ("o que trava?", "o que vence?") respondidas em ≤ 30 segundos, sem abrir projeto por projeto.

### 4.3 Módulo 3 — Preparação de reuniões e follow-ups (A PRIORIDADE)

**Antes — dossiê automático T-24h e T-1h30:**

- Vigia no Google Calendar detecta reunião com participante externo.
- **T-24h:** agente monta o dossiê pré-reunião puxando das fontes: card do Pipeline (estágio, valor, próximo passo combinado), Interações (últimos toques e o que ficou pendente), Propostas (o que foi enviado, valores — pra não rejustificar preço, regra da casa), projeto ativo se houver (o que está travado), últimos e-mails da thread, análise/diagnóstico já entregue. Entrega por e-mail + WhatsApp do dono: 1 página — contexto, pendências, 3 objetivos da call, a pergunta que não pode faltar.
- **T-24h também dispara a confirmação de véspera pro cliente** (rascunho com micro-pauta, regra da casa) e **T-1h30 o reminder** — os dois em modo Ask.
- **Reunião sem dossiê possível** (lead sem card) = alerta de higiene: "tem gente na sua agenda que não está no pipeline".

**Depois — comando `/pos-reuniao`:**

O dono cola notas soltas ou transcrição (ou grava áudio de 2 min com o que lembrou). O workflow gera, em uma passada: resumo estruturado (decisões, pendências de cada lado, sinais de compra/risco) gravado em Interações; atualização do card (estágio, próximo passo, data do próximo toque); rascunho do e-mail de follow-up + versão WhatsApp na voz da marca; se houve mudança de escopo — flag pra aditivo (cláusula da casa: feature nova = cotação à parte, por escrito).

Nada disparado sem aprovação. Meta de esforço do dono: **≤ 3 minutos entre o fim da call e o follow-up aprovado.**

**Critério de aceite:** 100% das reuniões com dossiê entregue até T-24h; follow-up enviado em < 24h em 100% das calls; zero reunião "confirmada" sem data legível no sistema.

### 4.4 Módulo 4 — Financeiro e propostas

- Dbs Propostas (3.5) + Financeiro (3.6), conciliação semanal via Open Finance.
- **Alertas:** parcela vencendo em 3 dias (lembrete de cobrança com rascunho), parcela vencida (escalada de cobrança em 3 degraus, mesmo espírito da escada comercial), renovação de recorrência a T-30d (com o histórico de valor entregue no período como argumento — relatórios mensais, ajustes feitos), proposta expirando sem resposta.
- **Painel financeiro:** a receber (30/60/90), MRR ativo e % da carteira com pacote, receita de expansão vs nova (métricas do processo de carteira da casa), propostas em aberto por valor.
- **Emissão:** o sistema prepara os dados da NF/recibo por parcela paga (não emite — prepara e lembra).

**Critério de aceite:** pergunta "quanto tem pra entrar esse mês e quem está atrasado?" respondida em 1 comando; zero recorrência renovando sem conversa de renovação preparada.

### 4.5 Módulo 5 — Automação de comunicação

**Gmail:** vigias por thread de deal ativo — cliente respondeu → alerta imediato + card atualizado + rascunho de resposta se o padrão for reconhecível. Fim do "não vi o e-mail".

**Google Calendar:** motor do módulo 3 + agenda de toques (todo próximo toque do Pipeline pode virar evento privado, pra agenda e sistema nunca divergirem).

**WhatsApp Business (via Pipedream):** inbound → webhook → registro em Interações + push pro dono com contexto do card ("Michele respondeu — está em D+7 da escada, roteiro da call pronto"). Outbound → mensagem aprovada na sessão → Pipedream → disparo. **Honestidade de escopo:** cobre o número business; conversa que acontece no número pessoal do dono depende do `/registrar` (10s). Migrar negociação pro número business vira recomendação de processo, não pré-requisito.

**Discord + Trello (via Pipedream, nice to have):** relevante pro perfil de cliente agência (caso Arialdo/QG: operação em Trello+Discord). Vigia de canal → resumo diário de menções relevantes; card Trello criado/movido → reflete no painel de projeto. Entra na Fase 4, só se a operação do cliente realmente rodar lá.

**Critério de aceite:** nenhuma resposta de lead quente descoberta com > 2h de atraso em canal conectado; zero copiar-e-colar entre ferramentas nos fluxos cobertos.

### 4.6 Módulo 6 — Base de conhecimento reutilizável

**O que já existe na casa:** contrato-modelo + anexo de escopo padrão + checklist do dia do sim + RPA/recibo + manual de follow-up + scripts de call. **Lacuna nomeada pela própria casa:** proposta-modelo e kit de onboarding — este módulo os entrega.

- **Templates versionados no repo, por tipo de projeto** (LP · site · e-commerce · sistema IA · bot): proposta (estrutura problema → sistema → escopo → investimento → condições, a partir do PDF que já fechou negócio), briefing/levantamento, anexo de escopo, kit de onboarding (boas-vindas + 7/14/30 dias + canais e cadência + kickoff em 48h).
- **Skills que os consomem:** `/nova-proposta [lead]` puxa o template do tipo certo + dossiê + dados do card e devolve proposta 80% pronta; `/novo-projeto [cliente]` instancia projeto + onboarding + marcos; `/novo-lead` cria card + dossiê-esqueleto.
- **Regra de melhoria contínua:** post-mortem que revela padrão (mesma objeção 3x) gera atualização do template — o conhecimento compõe em vez de evaporar.

**Critério de aceite:** proposta nova em ≤ 30 min a partir do comando; zero documento comercial começado "em branco".

---

## 5. Camada de automação (agendamentos, vigias, permissões)

### 5.1 Rotinas agendadas

| Rotina | Quando | O que faz |
|---|---|---|
| **Matinal comercial** | dias úteis, 7h30 | follow-ups do dia com rascunhos, leads parados por estágio, agenda do dia com dossiês, travas de projeto 3+ dias, cobranças. **Lê fonte viva ou declara a lacuna — proibido inferir** |
| Leads parados (resumo) | segunda 9h | visão semanal do funil: parados, degraus vencidos, propostas expirando |
| Pré-reunião | T-24h e T-1h30 | dossiê + confirmação de véspera + reminder |
| Conciliação financeira | sexta 16h | Open Finance × db Financeiro, marca pagos/vencidos |
| Revisão comercial | sexta 17h | placar da semana montado com dado do sistema (não com memória), post-mortems pendentes, pergunta de higiene de IA do playbook |
| Auditoria de sites da carteira | dia 1 | já existe na casa — o output agora vira gancho registrado como toque de carteira |
| Vigia de carteira | diária, silenciosa | clientes se aproximando de 60/90 dias sem contato de valor |

### 5.2 Vigias (monitoramento por evento)

Thread de e-mail de deal ativo (resposta → alerta + registro) · webhook WhatsApp Business (inbound → registro + push) · Calendar (evento novo com externo → fluxo pré-reunião) · proposta enviada (silêncio até o degrau → rascunho do próximo toque da escada) · parcela (vencimento → cobrança).

### 5.3 Modos de permissão (contrato de operação)

- **Execute (autônomo):** leitura de fontes, registro em Interações, atualização de campos derivados (último contato), montagem de dossiês e painéis, alertas internos.
- **Ask (confirma antes):** toda comunicação externa (e-mail, WhatsApp, convite), criação/edição de proposta, mudança de estágio para fechado/perdido, qualquer escrita fora dos databases do sistema.
- **Explore (só leitura):** sessões de análise e diagnóstico.

### 5.4 Skills e workflows nomeados (v1)

`/registrar` · `/pos-reuniao` · `/nova-proposta` · `/novo-lead` · `/novo-projeto` · `/fechar-semana` · `/cobrar [parcela]` · `/dossie [pessoa]` — cada um com skill própria, consumindo os templates do módulo 6 e escrevendo nos databases da seção 3. Memória do workspace guarda decisões e preferências recorrentes (voz, regras de preço, palavras banidas) pra nenhuma sessão recomeçar do zero.

### 5.5 Dashboards salvos

Pipeline (funil + parados + valor por estágio) · Semana (vence essa semana, tudo junto) · Travas (bloqueios por idade) · Financeiro (a receber, MRR, expansão) · Carteira (toques, pacotes, camadas candidatas).

---

## 6. Conexões — papel e prioridade

| Conexão | Papel no sistema | Prioridade |
|---|---|---|
| Notion | banco de dados de tudo | P0 — fundação |
| Google Calendar | motor do módulo 3, agenda de toques | P0 |
| Gmail | vigias de deal, follow-up, cobrança | P0 |
| Pipedream + WhatsApp Business | inbound/outbound WhatsApp, Discord/Trello depois | P1 (Fase 4) |
| Open Finance / banco | conciliação automática | P1 |
| Google Drive / Sheets | propostas PDF, planilhas legadas, export | P2 |
| Trello / Discord | espelho da operação de cliente-agência | P2, condicional |
| GitHub | projetos com código (sistemas IA) | situacional |
| Figma | handoff de design | situacional |
| GA4 / Clarity | relatório mensal do plano Pro, munição de upsell | situacional |

Regra: **conexão só entra quando um módulo em produção precisa dela.** Conector ligado sem consumidor é superfície de erro e custo.

---

## 7. Fases de implantação (8 semanas, cada fase útil sozinha)

| Fase | Semanas | Entrega | Critério de aceite |
|---|---|---|---|
| **F0 — Fundação de dados** | 1-2 | 6 databases criados/migrados, board atual enriquecido, Calendar+Gmail conectados, `/registrar` no ar | rotina matinal roda com fonte viva — zero inferência |
| **F1 — CRM vivo + alertas** | 3 | alertas por estágio com rascunho, escada de follow-up automatizada, post-mortem | 1 semana sem lead parado não-detectado |
| **F2 — Reuniões (a prioridade)** | 4 | dossiê T-24h, confirmação de véspera, `/pos-reuniao` | 100% das calls com dossiê + follow-up < 24h |
| **F3 — Projetos + carteira** | 5 | db Projetos, painéis Travas/Semana, vigia de 90 dias | as 2 perguntas em ≤ 30s |
| **F4 — Comunicação** | 6 | Pipedream + WhatsApp Business, vigias de e-mail por deal | inbound registrado sozinho, push com contexto |
| **F5 — Financeiro** | 7 | dbs Propostas/Financeiro, conciliação, cobranças | "quanto entra esse mês?" em 1 comando |
| **F6 — Conhecimento + polimento** | 8 | templates por tipo, `/nova-proposta`, dashboards finais, handoff | proposta nova em ≤ 30 min |

Ordem tem lógica de dependência: **a prioridade declarada (reuniões) é F2, não F1, porque dossiê automático sobre CRM vazio é gerador de confiança falsa.** F0/F1 são o solo; sem eles o módulo 3 repete o defeito que o cliente já tem hoje — inteligência sobre dado morto.

---

## 8. Operação contínua (pós-implantação)

- **Rotina do dono (o contrato de 10 min/dia):** manhã — ler a matinal, aprovar/editar rascunhos (5-8 min); durante o dia — `/registrar` quando algo acontece fora dos canais conectados (10s cada); sexta — revisão semanal guiada (15 min).
- **Manutenção (recorrência do fornecedor):** vigiar quebra de conexão/webhook, ajustar rotinas, evoluir templates, 1 call mensal de evolução. Modelo: 2 pacotes (ajuste/correção vs evolução), coerente com a recorrência da casa.
- **Sinais de saúde do sistema (medidos, não sentidos):** % de interações registradas automaticamente vs manual · leads sem próximo passo (meta: 0) · tempo call→follow-up · clientes 60+ dias sem contato (meta: 0) · % de rotinas que rodaram com fonte viva (meta: 100%).

---

## 9. Riscos nomeados

| Risco | Mitigação |
|---|---|
| **Adoção — o sistema morre se o dono não aprovar rascunhos nem usar `/registrar`** | contrato de 10 min/dia explícito no onboarding; tudo que puder ser automático é automático; F0 só fecha com 1 semana de uso real |
| WhatsApp pessoal fora da automação | `/registrar` de 10s + recomendação de migrar negociação pro número business; nunca prometer cobertura do número pessoal |
| Notion como banco tem limites (sem transação, API com rate limit) | volume do cliente (dezenas de leads, < 10 projetos ativos) está ordens de grandeza abaixo do limite; se a rota "produto" da bifurcação vencer, migração pra app próprio (Vercel+Supabase) é a evolução natural — e o modelo de dados da seção 3 migra 1:1 |
| Custo de tokens das rotinas | herda o playbook da casa: rotinas revisadas em lote, sessão-um-assunto, subagentes pra exploração; medição qualitativa no checkpoint de sexta |
| Fundação como fuga (construir sistema em vez de vender) | pro cliente, irrelevante — ele está comprando; pro fornecedor solo, a implantação em fases de ~1 semana com aceite objetivo impede o projeto de virar buraco |
| Vigia/webhook quebra em silêncio | health check semanal testa cada conexão e alerta o fornecedor, não o cliente |

---

## 10. Decomposição do escopo (sem valores)

⚠️ **Esta seção tinha uma tabela de preços somando R$ 100.000. Todos aqueles valores eram inventados** — vieram de um exercício de prompt, não de custo, hora ou proposta real. Foram removidos em 28/jul/2026. O que sobra abaixo é a quebra de escopo, que continua válida.

| Bloco | Conteúdo | Valor |
|---|---|---|
| Discovery + modelagem | auditoria da operação, migração de dados, modelo da seção 3 | a definir |
| Módulo 1 — CRM + alertas + escada | F1 | a definir |
| Módulo 3 — reuniões e follow-up | F2 (a prioridade, maior valor percebido) | a definir |
| Módulo 2 — projetos + carteira | F3 | a definir |
| Módulo 5 — comunicação (Pipedream/WhatsApp/vigias) | F4 | a definir |
| Módulo 4 — financeiro + propostas | F5 | a definir |
| Módulo 6 — conhecimento + skills + dashboards + handoff | F6 | a definir |
| Recorrência (fora do setup) | manutenção/evolução | a definir — a faixa de R$ 1.497–2.997/mês que constava aqui era **fictícia** (confirmado 28/jul): `R$ 1.497` não existe em nenhum outro arquivo do repo, e o catálogo real de recorrência (`planos-recorrencia-irbis.md`) tem teto de **R$ 997/mês** no Pro trimestral |

**Para precificar de verdade, as entradas que faltam:** horas reais por módulo, custo mensal de infra por cliente (Notion API, Pipedream, tokens), e o que o QG Group efetivamente aceitar pagar. Antes disso, qualquer número aqui é chute com cara de referência.

Âncora de ROI pra proposta (essa não depende de preço): o dono solo gasta hoje 60-90 min/dia entre checar ferramentas, reconstruir contexto pré-call e redigir follow-up. O sistema devolve ~1h/dia ≈ 20-25h/mês. E o custo real dele hoje não é hora: é deal fundador esfriando 11 dias por follow-up manual.

---

## 11. Fora de escopo (v1)

Disparo de mensagem sem aprovação humana · cobertura do WhatsApp pessoal · app próprio/portal robusto (candidato a v2 se a rota produto vencer) · branding, social media, tráfego (fora de escopo da casa, sem exceção) · métrica formal de custo de tokens em R$ (decisão futura, como no playbook) · multiusuário/time (o sistema é solo-first; time é v2 com permissões).
