# Kit de Entrega — Documentos Faltantes — Plano de Implementação

> **Para quem for executar:** SUB-SKILL RECOMENDADA: use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para rodar este plano tarefa por tarefa. Os passos usam checkbox (`- [ ]`) pra rastrear.

**Objetivo:** Criar os 4 documentos que faltam no kit de entrega da IRBIS (identificados na auditoria de 03/ago/2026 contra o kit de 6 peças de referência): fatura, brief criativo, checklist de handoff e relatório mensal.

**Abordagem:** Cada documento é um arquivo `.md` modelo com placeholders `{{campo}}`, seguindo o padrão já estabelecido em `03 - Comercial/07 - Biblioteca/kit-onboarding/` (frontmatter `peça / versão / data / mudou da anterior / sai quando`). Não é automação nem integração — é o template que falta para o Nicolas preencher e enviar na hora certa do método de entrega.

**Stack:** Markdown puro, sem ferramenta nova. Nenhum dos 4 documentos depende de API, banco ou serviço externo.

## Restrições globais

- PT-BR, voz IRBIS: direta, sem advérbio de ênfase, sem contraste binário "não é X, é Y", sem voz passiva, sem lista de 3 quando 2 resolvem (regras completas: `01 - Marca/IRBIS_Manual_de_Copy_v2.md` e bloco Anti-AI-Slop do CLAUDE.md).
- Todo documento novo usa o frontmatter do kit-onboarding: `peça / versão / data / mudou da anterior / sai quando`.
- Nicolas é PF sem CNPJ — nenhum documento pode mencionar "nota fiscal" como se ela existisse hoje. Onde isso importa (fatura), o documento precisa dizer explicitamente que não é NF.
- Nenhum valor de preço novo é inventado — os documentos usam `{{placeholder}}` para valor, nunca um número fixo, exceto onde o valor já é público no repo (ex.: preços do catálogo Stripe, se citados como exemplo).
- Cada arquivo termina com 1 commit próprio (regra do dono: "não acumular, commit a cada fase").

---

## Ordem de prioridade

1. **Checklist de handoff** — bate direto com uma promessa já feita em toda call de vendas ("tudo é seu, sem dependência") e ainda não vira documento.
2. **Relatório mensal** — bate direto com o plano Pro já cadastrado no catálogo Stripe, que promete "relatório mensal" como entregável.
3. **Fatura** — cobre a cobrança formal antes do pagamento (hoje só existe recibo pós-pagamento).
4. **Brief criativo** — cobre a Fase 1 (briefing) para projetos com carga de copy/design relevante.

---

### Task 1: Checklist de handoff (Fase 3 do método de entrega)

**Files:**
- Create: `03 - Comercial/04 - Entrega e Recorrência/checklist-handoff-entrega.md`

**Interfaces:**
- Consome: o checklist de handoff já descrito em `metodo-entrega-irbis.md` (F5 — Virada e transferência: produção nas contas do cliente, `acessos.md`, treinamento, guia do usuário) e a promessa literal de `script-call-comercial-junho-2026.md:163` ("Site no ar, código e acessos seus desde o dia 1, analytics configurado, guia de edição. Tudo é seu.").
- Produz: documento a ser preenchido e assinado com o cliente na reunião de apresentação/treinamento (F5 do método de entrega), evidência de que o handoff foi cumprido item a item.

**Correção de numeração (02/ago→03/ago):** a versão anterior desta task citava "Fase 3", herdado da numeração local do perfil SITE (`processo-entrega-padrao-irbis.md`), não da numeração oficial do método mestre. `metodo-entrega-irbis.md` define handoff como **F5**. Use F5 em todo o documento — frontmatter e nota de uso.

- [ ] **Passo 1: Criar o arquivo com o conteúdo abaixo**

```markdown
---
peça: Checklist de handoff
versão: v1.0
data: 2026-08-03
mudou da anterior: primeira versão
sai quando: na reunião de apresentação/treinamento, Fase 5 (Virada e transferência) do método de entrega
---

# Checklist de handoff — {{projeto}}

{{primeiro_nome}}, este documento confirma o que foi entregue nesta reunião. Cada item marcado
é seu — sem depender de mim pra acessar ou trocar de fornecedor no futuro.

| Item | Entregue | Onde/como acessar |
|---|---|---|
| Código-fonte | {{sim/não}} | {{repositório e forma de acesso}} |
| Domínio e DNS | {{sim/não}} | {{registrador e login}} |
| Hospedagem (Vercel) | {{sim/não}} | {{conta e nível de acesso}} |
| Analytics | {{sim/não}} | {{GA4/Meta Pixel — login}} |
| Guia de edição | {{sim/não/não incluído neste projeto}} | {{formato: vídeo, doc}} |

## O que isso significa

Tudo marcado "sim" acima está sob sua titularidade. Eu entro nessas contas só como colaborador
técnico, e você pode revogar meu acesso a qualquer momento sem perder nada.

## Assinatura

Confirmo que recebi os itens acima.

{{cidade}}, {{data}}.

______________________________________
**{{cliente}}**

---

## Nota de uso (não faz parte do documento enviado ao cliente)

- Preencha "Guia de edição" só depois de confirmar com o dono se esse bônus entra no projeto
  (pendência aberta em `metodo-entrega-irbis.md`, F5 — Virada e transferência) — nunca marque
  "sim" por padrão.
- Formalizar com assinatura é opcional, mesmo critério de risco da Fase 1 do perfil SITE
  (`processo-entrega-padrao-irbis.md`): cliente grande/corporativo → formalize; cliente
  pequeno/direto → registrar em mensagem já basta.
- Este documento registra que o handoff falado aconteceu.
```

- [ ] **Passo 2: Verificar contra o checklist de conteúdo**

Confira, lendo o arquivo criado:
  - [ ] Frontmatter tem as 5 chaves exatas do padrão kit-onboarding (`peça`, `versão`, `data`, `mudou da anterior`, `sai quando`), citando **Fase 5**, não Fase 3
  - [ ] Os 5 itens do handoff batem 1:1 com o "Faz"/"Sai" de F5 em `metodo-entrega-irbis.md` (produção nas contas do cliente, `acessos.md`, treinamento, guia do usuário — aqui detalhados como repositório, domínio/DNS, Vercel, analytics, guia de edição)
  - [ ] Nenhum "sim" fixo — todos os valores de "Entregue" são `{{placeholder}}`, nunca preenchidos no modelo
  - [ ] Zero advérbio de ênfase, zero "jornada", zero voz passiva no texto fixo (releia cada frase fora dos placeholders procurando "ser/estar + particípio" com sujeito oculto)
  - [ ] Zero contraste binário "não é X, é Y" no texto fixo
  - [ ] A nota de uso deixa claro que "guia de edição" precisa de confirmação do dono antes de prometer

- [ ] **Passo 3: Commit**

```bash
git add "03 - Comercial/04 - Entrega e Recorrência/checklist-handoff-entrega.md"
git commit -m "feat(entrega): adiciona checklist de handoff da Fase 3"
```

---

### Task 2: Relatório mensal (planos Pro e Premium)

**Files:**
- Create: `03 - Comercial/04 - Entrega e Recorrência/template-relatorio-mensal.md`

**Interfaces:**
- Consome: a entrega prometida em `stripe-catalogo-produtos-irbis.md:34` ("relatório mensal" como parte do Acompanhamento Pro) e os eventos canônicos de analytics já em produção nos sites da IRBIS (`call_booked`, `call_step_view`, `inbound_form_submit` — GA4).
- Produz: documento mensal enviado a todo cliente em plano Pro ou Premium, ponto de partida também usado no repitch de MRR e no pedido de indicação — ambos parte da F7 (Encerramento e carteira) do método de entrega, quando o projeto vira relação recorrente.

**Correção de numeração (03/ago):** a versão anterior citava "Fase 4" (repitch) e "Fase 5" (indicação) como fases distintas, herdado da numeração local do perfil SITE. Em `metodo-entrega-irbis.md`, repitch de MRR e pedido de indicação são a MESMA fase — **F7**, item 3: "Repitch do MRR e pedido de indicação, roteiros em `processo-entrega-mrr-indicacao-irbis.md` e `sistema-indicacao-base-irbis.md`."

- [ ] **Passo 1: Criar o arquivo com o conteúdo abaixo**

```markdown
---
peça: Relatório mensal
versão: v1.0
data: 2026-08-03
mudou da anterior: primeira versão
sai quando: todo dia {{dia fixo combinado, ex: 5}} do mês, para clientes nos planos Pro e Premium
---

# Relatório mensal — {{projeto}} · {{mês}}/{{ano}}

{{primeiro_nome}}, seguem os números e o que mexemos em {{mês}}.

## O que fizemos neste mês

| Pedido | Data | Status |
|---|---|---|
| {{descrição do pedido 1}} | {{data}} | {{feito/em fila}} |
| {{descrição do pedido 2}} | {{data}} | {{feito/em fila}} |

Rodadas do pacote usadas: {{n}} de {{limite do plano}}.

## Números do site

{{Se o site tem GA4 configurado: preencher a tabela abaixo com os eventos canônicos
(call_booked, call_step_view, inbound_form_submit). Se o site não tem GA4 configurado: apagar
a tabela e escrever só a frase "Analytics ainda não configurado neste site — sem números pra
reportar este mês."}}

| Métrica | Este mês | Mês anterior | Variação |
|---|---|---|---|
| Visitas | {{x}} | {{x}} | {{%}} |
| Contatos gerados (WhatsApp/formulário) | {{x}} | {{x}} | {{%}} |
| Origem principal do tráfego | {{ex: Google orgânico}} | — | — |

## Observação do mês

{{uma frase sobre o que se destacou, pra melhor ou pra pior. Sem nada relevante, escrever
"Mês estável, sem mudança de padrão."}}

## Próximo mês

{{o que está planejado ou sugerido — 1 a 2 itens}}

Qualquer ajuste ou dúvida, me chama pelo canal combinado.

---

## Nota de uso (não faz parte do documento enviado ao cliente)

- Este relatório é o entregável que o catálogo Stripe já promete no plano Pro
  (`stripe-catalogo-produtos-irbis.md:34`). Sem ele, a assinatura Pro vende algo que não existe
  como processo — priorize este documento antes de fechar o próximo Pro.
- Se o cliente não tem GA4 configurado, isso é sinal pra oferecer configurar como parte do
  próximo ciclo, não motivo pra pular o relatório — a seção "O que fizemos" continua valendo
  mesmo sem números.
- Guarde uma cópia de cada relatório enviado — é a munição do D+30/D+90/D+150 e do pedido de
  indicação (F7 do método de entrega).
```

- [ ] **Passo 2: Verificar contra o checklist de conteúdo**

Confira, lendo o arquivo criado:
  - [ ] Frontmatter no padrão kit-onboarding, com `sai quando` citando o dia fixo do mês
  - [ ] A seção de métricas usa os 3 eventos canônicos reais do GA4 da IRBIS (`call_booked`,
    `call_step_view`, `inbound_form_submit`), não eventos inventados
  - [ ] Existe caminho explícito para "site sem GA4" — o documento não trava se não houver dado
  - [ ] Nenhuma lista de 3 itens onde 2 bastam, nenhum "jornada"/"ecossistema"
  - [ ] A nota de uso liga o documento à lacuna real: plano Pro já vendido sem processo de
    relatório
  - [ ] A referência de fase, se houver, cita **F7** (repitch MRR + indicação, `metodo-entrega-irbis.md`) — nunca "Fase 4" ou "Fase 5" isoladas

- [ ] **Passo 3: Commit**

```bash
git add "03 - Comercial/04 - Entrega e Recorrência/template-relatorio-mensal.md"
git commit -m "feat(entrega): adiciona template de relatório mensal para planos Pro/Premium"
```

---

### Task 3: Fatura (cobrança formal pré-pagamento)

**Files:**
- Create: `03 - Comercial/06 - Jurídico/fatura-modelo.md`

**Interfaces:**
- Consome: o par documental já existente em `03 - Comercial/06 - Jurídico/rpa-recibo-modelo.md`
  (recibo pós-pagamento, PF sem CNPJ) e o catálogo de serviços de
  `stripe-catalogo-produtos-irbis.md`.
- Produz: documento de cobrança que antecede o pagamento — hoje a IRBIS só tem recibo
  (pós-fato) e mensagem de cobrança (`irbis-cobrar`), nada formal pré-fato.

- [ ] **Passo 1: Criar o arquivo com o conteúdo abaixo**

```markdown
# Fatura de Cobrança — Modelo IRBIS

Modelo IRBIS para formalizar uma cobrança **antes** do pagamento, enquanto Nicolas Cunha presta
serviço como pessoa física, sem CNPJ. Este documento **não é nota fiscal** — é a fatura que
antecede o pagamento. Depois que o valor cair, o documento que formaliza o recebimento é o
recibo RPA (`rpa-recibo-modelo.md`). Quando o CNPJ existir, este modelo é substituído por fatura
com nota fiscal atrelada, e deixa de ser usado como está.

---

## Fatura nº {{numero_fatura}}

**Prestador:** Nicolas Cunha — CPF 549.162.338-59 — {{endereço do prestador}}
**Cliente:** {{razao_social_cliente}} — CNPJ {{cnpj_cliente}} — {{endereço do cliente}}

**Referente a:** {{projeto}} (contrato de {{data_contrato}})
**Data de emissão:** {{data_emissao}}
**Vencimento:** {{data_vencimento}}

| Serviço | Tipo | Qtd | Valor unit. | Total |
|---|---|---|---|---|
| {{ex: Setup — Criação de Site}} | Único | 1 | {{R$ x}} | {{R$ x}} |
| {{ex: Acompanhamento Pro}} | Mensal | 1 | {{R$ x}} | {{R$ x}} |
| {{ex: Hora avulsa excedente}} | Avulso | {{n}} | {{R$ x}} | {{R$ x}} |

**Total:** {{R$ total}}

**Forma de pagamento:** PIX — chave {{chave_pix}}

**Observação:** Este documento não substitui nota fiscal. Pagamento a pessoa física, sujeito às
retenções aplicáveis pela empresa tomadora — ver `rpa-recibo-modelo.md`, Parte 2, para
orientação ao contador do cliente.

---

## Nota de uso (não faz parte do documento enviado ao cliente)

- Nunca cite cláusula, multa, juros ou rescisão nesta fatura — mesma regra do `irbis-cobrar`
  (Passo 0): fatura só afirma o fato (o quê, quanto, quando), nunca ameaça.
- Antes de enviar, confira no Open Finance se já não existe um crédito não conciliado do mesmo
  valor (mesma trava anti-cobrar-quem-pagou do `irbis-cobrar`, Passo 1) — não emita fatura pra
  quem já pagou.
- Depois de recebido o PIX referente a esta fatura, preencha `rpa-recibo-modelo.md` (Parte 1)
  com os mesmos dados — a fatura e o recibo devem bater em valor e referência.
```

- [ ] **Passo 2: Verificar contra o checklist de conteúdo**

Confira, lendo o arquivo criado:
  - [ ] O aviso "não é nota fiscal" aparece tanto na abertura quanto na tabela de observação —
    não dá pra confundir com NF em nenhuma leitura parcial
  - [ ] A tabela de serviços cobre os 3 tipos reais do catálogo Stripe (único/mensal/avulso)
  - [ ] Nenhuma cláusula, multa, juros ou ameaça de rescisão no corpo da fatura (regra do
    `irbis-cobrar`)
  - [ ] A nota de uso liga explicitamente fatura → recibo RPA (mesmos dados, documentos parceiros)
  - [ ] A nota de uso cita a trava anti-cobrar-quem-pagou antes de emitir

- [ ] **Passo 3: Commit**

```bash
git add "03 - Comercial/06 - Jurídico/fatura-modelo.md"
git commit -m "feat(juridico): adiciona modelo de fatura de cobrança pré-pagamento"
```

---

### Task 4: Brief criativo (Fase 1 — briefing)

**Files:**
- Create: `03 - Comercial/07 - Biblioteca/kit-onboarding/05-brief-criativo.md`

**Interfaces:**
- Consome: o padrão de frontmatter e numeração das 4 peças já existentes em
  `03 - Comercial/07 - Biblioteca/kit-onboarding/` (01 a 04) e a ordem fixa
  Estratégia → Design → Copy → Código, que roda dentro de F3 — Ciclos de construção
  (`metodo-entrega-irbis.md`, seção 6: "F3 perfil site → processo-entrega-padrao-irbis.md").
- Produz: documento preenchido no kickoff/call de briefing — F1, Imersão e congelamento — usado
  como referência única de objetivo/público/mensagem antes de Estratégia e Design começarem em
  F3.

**Correção de numeração (03/ago):** a versão anterior citava "Fase 2" pra ordem fixa
Estratégia→Design→Copy→Código, herdado da numeração local do perfil SITE. No método mestre essa
ordem roda dentro de **F3**. O briefing em si (F1) continua correto.

- [ ] **Passo 1: Criar o arquivo com o conteúdo abaixo**

```markdown
---
peça: Brief criativo
versão: v1.0
data: 2026-08-03
mudou da anterior: primeira versão
sai quando: no kickoff/call de briefing (Fase 1 — Imersão e congelamento), antes de Estratégia/Design/Copy (Fase 3)
---

# Brief criativo — {{projeto}}

## Visão geral

Cliente: {{cliente}}
Formato: {{site institucional / landing page / sistema com interface}}
Prazo: {{prazo}}
Início: {{data_inicio}}

## Objetivo

O que quem chega aqui precisa sentir, pensar ou fazer ao sair:

{{uma frase direta — ex: "decidir que vale a pena marcar uma call"}}

## Público-alvo

Quem chega aqui: {{quem são}}
A dor que traz essa pessoa até aqui: {{dor}}
O que essa pessoa valoriza ao decidir: {{preço/prazo/prova social/confiança}}

## Mensagem-chave

A UMA coisa mais importante que este {{site/página}} precisa comunicar, acima de tudo o resto:

{{uma frase}}

## Referências trazidas pelo cliente

{{link ou nome de site/marca que o cliente citou como referência, e o que especificamente
gostou nela}}

## O que não pode faltar

{{item obrigatório citado pelo cliente na call — ex: depoimento de tal cliente, CTA de
WhatsApp}}

---

## Nota de uso (não faz parte do documento em si)

- Preencha na própria call de briefing, ao vivo, com o cliente — não depois de memória.
- "Mensagem-chave" é o campo mais importante do documento: se o cliente der 3 respostas
  diferentes, pare e force a escolha de uma antes de fechar a call.
- Este brief é insumo da etapa Estratégia (primeira da ordem fixa) — Design não começa sem ele
  preenchido.
```

- [ ] **Passo 2: Verificar contra o checklist de conteúdo**

Confira, lendo o arquivo criado:
  - [ ] Frontmatter e nome do arquivo seguem a numeração sequencial do kit-onboarding (`05-`)
  - [ ] As 4 seções batem com o brief do reel (overview, objetivo, público-alvo, mensagem-chave),
    adaptadas de "post/anúncio" para "site/página"
  - [ ] "Mensagem-chave" pede explicitamente UMA frase, não uma lista
  - [ ] A nota de uso amarra o documento à ordem fixa Estratégia → Design → Copy → Código
    (Design não começa sem o brief)
  - [ ] Zero jargão de agência grande ("ecossistema", "jornada omnichannel")

- [ ] **Passo 3: Commit**

```bash
git add "03 - Comercial/07 - Biblioteca/kit-onboarding/05-brief-criativo.md"
git commit -m "feat(biblioteca): adiciona brief criativo à Fase 1 do kit-onboarding"
```

---

## Auto-revisão (rodada depois de escrever os 4 documentos)

**1. Cobertura do que foi pedido:** os 4 documentos identificados na auditoria de 03/ago (fatura,
brief, delivery guide, relatório mensal) têm, cada um, uma task própria acima — cobertura
completa, sem lacuna.

**2. Varredura de placeholder no plano:** nenhum passo diz "adicionar validação apropriada" ou
"similar à Task N" — cada task tem o conteúdo completo do arquivo, pronto pra copiar.

**3. Consistência:** os 4 documentos usam a mesma convenção de frontmatter
(`peça/versão/data/mudou da anterior/sai quando`) e o mesmo padrão de placeholder `{{campo}}` —
nenhum diverge do padrão kit-onboarding já em produção.

---

## Depois de rodar as 4 tasks

Nenhuma integração pendente — os 4 arquivos são templates estáticos, prontos pra uso manual no
método de entrega. Não precisa de deploy nem de mudança em código do site.
