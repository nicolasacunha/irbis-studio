---
name: irbis-qa-handoff
description: "QA de handoff técnico isolado: lê o checklist real de `checklist-handoff-entrega.md` item por item e RODA cada verificação que dá pra rodar nesta execução — request HTTP real em link/domínio, `dig` de DNS, checagem de existência de variável de ambiente, colaborador de fato listado no repo — em vez de descrever o processo. Devolve veredito honesto por item (✅ passou / ❌ não passou / ◐ pendente de confirmação humana), nunca um resumo tipo 'está tudo certo, só revisar detalhes'. Separada da produção do site (`irbis-producao-de-site`) e da reunião/condução comercial do handoff (`irbis-entrega-e-recorrencia`) — roda DEPOIS das duas, como auditoria isolada. Use quando o Nicolas disser '/qa-handoff [cliente]', 'confere o handoff', 'roda o checklist de handoff', 'isso tá pronto pra entregar?', 'audita o handoff do X', ou antes de assinar/enviar o checklist de handoff a um cliente."
---

# IRBIS — QA de Handoff Técnico (verificação isolada, Fase 5/6 do método de entrega)

Esta skill não conduz a reunião de entrega nem escreve o handoff — ela **audita** o que já foi
(ou ainda não foi) entregue, rodando cada checagem possível nesta execução e devolvendo um
veredito item a item. Se um item não pode ser checado de verdade agora (login que só existe na
cabeça do cliente, aprovação verbal numa reunião passada), ele nunca vira "sim" — vira
`◐ pendente de confirmação humana`, sempre.

## 1. Quando NÃO usar esta skill

| Situação | Use no lugar |
|---|---|
| Construir/corrigir o site, aplicar anti-AI-slop, QA de código (impeccable/critique/polish/audit), decidir se o site está pronto para ir ao ar | `irbis-producao-de-site` (Fase 5 dela já cobre forms, Lighthouse, SEO pack — QA de PRODUTO, não de handoff) |
| Conduzir a reunião de apresentação, repitch MRR, pedido de indicação, termo de aceite, decidir se formaliza com assinatura | `irbis-entrega-e-recorrencia` |
| Decidir o que a IRBIS pode afirmar (número de case, escopo, ICP) | `irbis-guarda-pivot` |
| Gerenciar carteira pós-entrega (dias sem toque de valor, upsell) | `irbis-carteira` |

A diferença central: `irbis-producao-de-site` pergunta "o site está bom o suficiente pra
lançar?"; esta skill pergunta "o que prometi entregar ao cliente (código, acessos, analytics,
guia) *de fato* saiu da minha mão pra mão dele — e o que é só uma linha marcada 'sim' sem
verificação real?".

## 2. Fonte única do checklist — nunca reescreva de memória

`03 - Comercial/04 - Entrega e Recorrência/checklist-handoff-entrega.md` é a fonte. Leia o
arquivo inteiro no início de toda execução desta skill, mesmo que você "lembre" da última vez —
se ele mudou (nova versão do documento), os itens abaixo mudam junto. Hoje (v1.0, 03/ago/2026)
ele tem: uma tabela de 7 linhas (Código-fonte, Domínio e DNS, Hospedagem/Vercel, Contas de
dados e IA, Analytics, Guia de edição, Gravação do treinamento), uma seção **Assinatura**
(cliente executou o fluxo principal sozinho, na frente do estúdio, pelo menos uma vez) e uma
**Nota de uso** com 4 regras de tratamento (guia de edição é padrão "entregue" salvo exceção
combinada por escrito; formalizar com assinatura é opcional pelo mesmo critério de risco de
`irbis-entrega-e-recorrencia`; o documento registra que o handoff FALADO aconteceu; cópia
assinada vai para `05-virada/` junto de `acessos.md`).

Se a tabela do arquivo tiver menos, mais ou linhas diferentes das listadas na seção 4 abaixo, a
tabela do arquivo manda — ajuste a auditoria aos itens reais, não aos exemplos deste documento.

## 3. Localizar o projeto antes de rodar qualquer checagem

1. Pergunte o cliente, se não veio na mensagem.
2. Ache o repo dele em `02 - Projetos/<Cliente>/` (padrão aninhado) ou `02 - Projetos/<cliente>/`
   (padrão flat) — ver `irbis-producao-de-site` seção 0.1 para os dois padrões.
3. Leia `docs/kickoff-baseline.md` desse repo, se existir — é onde o Measurement ID do GA4
   correto do cliente fica registrado (necessário pra checar o item Analytics na seção 4).
4. Sem repo encontrado: pare. Não existe "handoff" pra auditar sem projeto — reporte
   `❌ projeto não localizado em 02 - Projetos/` e pergunte o path certo.

## 4. Verificação item a item — o que roda de verdade nesta execução

| Item do checklist | Comando/ação REAL rodado nesta execução | O que fica ◐ pendente de confirmação humana |
|---|---|---|
| **Código-fonte** | `/usr/bin/git -C "<repo>" remote -v` (existe remoto privado?) · `/usr/bin/git -C "<repo>" status --short` (working tree limpo, nada preso só na máquina do Nicolas) · `gh api repos/<owner>/<repo>/collaborators --jq '.[].login'` (o usuário GitHub do cliente está de fato na lista?) | Se `gh api` falhar (sem token/permissão) ou o cliente não tiver GitHub e o acesso for por outro meio (zip, transferência de titularidade): não force conclusão — pendente |
| **Domínio e DNS** | `dig <dominio-cliente> +short` real. Comparado ao valor esperado no painel Vercel do projeto (A `76.76.21.21` ou CNAME `cname.vercel-dns.com`, mesmo critério do gate de QA de `irbis-producao-de-site` Fase 5) | Login no registrador de fato nas mãos do cliente (dig não prova titularidade, só resolução) |
| **Hospedagem (Vercel)** | `test -f .vercel/project.json` no repo do cliente + conferir `orgId` contra o team da casa (`team_nrKsYjAemGbEQQSbV5SxOhdn`) · `npx vercel project ls --scope <team>` confirma que o projeto existe no scope certo | Nível de acesso do cliente (member/colaborador convidado) — a API não expõe isso de forma confiável nesta sessão; confirme no painel Vercel → Settings → Members |
| **Contas de dados e IA (Supabase, Claude — se aplicável)** | Primeiro decida aplicabilidade (o projeto usa Supabase/API de IA? veja `spec-design.md`/código). Se aplicável: `npx vercel env ls` no projeto do cliente lista os NOMES das variáveis configuradas (nunca o valor) — confirma que `SUPABASE_URL`/chaves equivalentes existem no ambiente de produção | Titularidade da conta (é do cliente ou ainda da IRBIS?) é decisão do Nicolas — sempre pendente até ele confirmar explicitamente. Se não aplicável, marque `N/A` — nunca `❌` |
| **Analytics** | Fetch HTTP real da URL de produção do cliente, grep do Measurement ID (`G-XXXXXXXXXX`) no HTML retornado, comparado ao ID registrado em `docs/kickoff-baseline.md` desse cliente. ID batendo com o do próprio estúdio ou com placeholder = mesma lição do incidente GA4 (`irbis-producao-de-site`) → `❌` | Convite de usuário na propriedade GA4 para o e-mail do cliente — não é checável via HTTP; pendente |
| **Guia de edição** | Se o item aponta um link (Loom/Drive): fetch HTTP real, código 200 = existe e abre. Se aponta arquivo local: `test -f`. **Ausência conta como falha por padrão** — a Nota de uso do próprio checklist trata "guia não entregue" como exceção que precisa estar combinada com o cliente por escrito; sem achar esse registro escrito em algum canal do projeto, não presuma a exceção | Se existe combinação escrita da exceção em canal fora do repo (WhatsApp/e-mail) que você não tem acesso — pergunte ao Nicolas antes de marcar `❌` definitivo |
| **Gravação do treinamento** | Fetch HTTP real do link do vídeo, código 200 | Nenhum específico deste item — é só "existe e abre"; se o link não existe, é `❌`, não pendência |
| **Assinatura** (seção separada do documento, não é linha da tabela, mas é parte do checklist) | Nenhuma checagem automática possível — é um fato observado numa reunião | SEMPRE `◐`: "o cliente executou o fluxo principal sozinho, na sua frente, pelo menos uma vez — isso aconteceu? Pergunte ao Nicolas, nunca presuma pelo documento existir" |

Regra dura por trás da tabela: **nenhum comando roda = nenhum ✅/❌ nesse item.** Se você não
tem acesso ao token do GitHub, ao CLI da Vercel autenticado, ou à internet para o fetch HTTP,
o item vira `◐ não verificado nesta execução — {{motivo técnico}}`, nunca um chute otimista.

## 5. Os 3 vereditos possíveis (nada além disso)

- `✅ PASSOU` — o comando/request rodou NESTA execução e confirmou o item.
- `❌ NÃO PASSOU` — o comando/request rodou NESTA execução e contradisse o item, OU o item
  exige um registro (ex.: exceção por escrito) que não foi encontrado.
- `◐ PENDENTE DE CONFIRMAÇÃO HUMANA` — o item depende de algo que nenhuma ferramenta desta
  sessão consegue observar (titularidade de login, nível de acesso não exposto por API,
  aprovação verbal, fato testemunhado numa reunião). Pergunte ao Nicolas ou ao cliente; nunca
  vira `✅` sozinho.
- `N/A` só é válido para "Contas de dados e IA" quando o projeto genuinamente não usa
  Supabase/IA — nunca use `N/A` para escapar de rodar uma checagem que era possível.

## 6. Formato de saída

```
FRONTEIRA DOS DADOS · {{data}} {{hora}} America/Sao_Paulo
✅ LIDO checklist-handoff-entrega.md (fonte dos itens, v{{versão}})
{{✅/❌/◐ por fonte tocada nesta execução: git, gh api, dig, vercel env ls, fetch HTTP}}

QA DE HANDOFF — {{cliente}}

[✅/❌/◐] Código-fonte
  git remote: {{url ou "nenhum"}} · working tree: {{limpo/sujo}}
  colaborador {{usuário GitHub do cliente}} na lista de {{n}}: {{sim/não/não verificado}}

[✅/❌/◐] Domínio e DNS
  dig {{domínio}} +short → {{resultado}}
  esperado (painel Vercel): {{valor}} · bate: {{sim/não}}

[✅/❌/◐] Hospedagem (Vercel)
  projeto no team certo: {{sim/não}}
  nível de acesso do cliente: PENDENTE — API não expõe; confirmar em Settings → Members

[✅/❌/◐/N/A] Contas de dados e IA
  aplicável: {{sim/não}} · variáveis presentes no ambiente: {{lista de nomes, nunca valores}}

[✅/❌/◐] Analytics
  Measurement ID publicado: {{G-XXXXXXXXXX ou "não encontrado"}}
  bate com docs/kickoff-baseline.md: {{sim/não}}

[✅/❌/◐] Guia de edição
  {{link testado → 200/erro, ou "não encontrado, sem exceção escrita registrada"}}

[✅/❌/◐] Gravação do treinamento
  {{link testado → 200/erro}}

[◐] Assinatura — cliente executou o fluxo sozinho, na sua frente
  PERGUNTE AO NICOLAS: isso aconteceu na reunião? Não presumo pelo documento existir.

VEREDITO GERAL: {{n}} passou · {{n}} não passou · {{n}} pendente
{{"NÃO ASSINAR/ENVIAR o checklist ao cliente enquanto houver ❌" se houver algum ❌}}
```

Nunca resuma essa saída numa frase tipo "está tudo certo, só revisar uns detalhes" — o veredito
geral é a contagem, não uma opinião.

## 7. Depois do veredito

Todos `✅` (e `◐` explicitamente confirmados pelo Nicolas): o checklist-handoff-entrega.md pode
ser preenchido de verdade e seguir para a reunião/assinatura — território de
`irbis-entrega-e-recorrencia`. Esta skill não preenche nem envia o documento ao cliente, só
audita se ele PODE ser preenchido com "sim" honesto em cada linha. Cópia assinada, quando
houver, vai em `05-virada/` (junto de `acessos.md`) — convenção já registrada na nota de uso do
próprio checklist.

## Proibições

Nunca resumir o veredito como "está tudo certo" ou "praticamente pronto" — todo item aparece
com veredito explícito, mesmo quando são todos ✅. Nunca marcar ✅ em item que depende de
titularidade, nível de acesso ou aprovação humana sem confirmação explícita nesta execução.
Nunca reescrever os itens do checklist de memória — sempre ler `checklist-handoff-entrega.md`
real antes de rodar qualquer coisa. Nunca gerar, assinar ou enviar o documento de handoff ao
cliente a partir desta skill — ela audita, quem conduz a entrega é `irbis-entrega-e-recorrencia`.
Nunca usar `N/A` para pular uma checagem que era tecnicamente possível rodar. Nunca disparar
deploy, alterar DNS, revogar/conceder acesso, ou tocar em produção — esta skill só lê e reporta.
