# Raio-X de Estrutura — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a skill `irbis-raio-x-estrutura`, que prepara e captura a sessão paga de Raio-X — mapeia um departamento do cliente em jobs com horas e critério de decisão, soma a conta e escolhe o primeiro agente a entregar.

**Architecture:** Quatro arquivos markdown dentro de `.claude/skills/irbis-raio-x-estrutura/`. O `SKILL.md` é o roteador enxuto (padrão das outras skills `irbis-*`, 75-115 linhas) e delega conteúdo pesado pra dois arquivos-irmãos: o roteiro que o Nicolas leva pra call e o template da saída. Um quarto arquivo guarda o caso de verificação sintético.

**Tech Stack:** Markdown puro. Sem código, sem banco, sem dependência. A skill roda dentro do Claude Code como as outras 35 skills `irbis-*`.

**Adaptação de método declarada:** não existe pytest aqui. Onde o padrão pede "teste unitário", este plano usa **caso de verificação**: uma entrada conhecida, uma saída esperada campo a campo, conferida à mão. O ciclo escrever-falhar-implementar-passar-commitar é mantido.

**Spec:** `docs/superpowers/specs/2026-08-05-raio-x-estrutura-design.md` (commits `e8dedd8` e `7074976`).

## Global Constraints

Valem para todas as tasks, copiadas do spec:

- **O resultado do cliente nunca entra no repo.** Vai pra pasta local do projeto do cliente. O repo guarda só skill, roteiro e template em branco. (Regra `projetos-local-repo-so-na-publicacao`, 25/jul.)
- **Três níveis de automação, exatamente estes rótulos:** `100% IA` · `Humano + IA` · `Humano lidera`. São os mesmos da taxonomia interna em `agentes_jobs`.
- **Número estimado nunca sai como fato.** Job cuja hora veio de faixa carrega o sufixo `(estimado)` em toda aparição.
- **Proibido em qualquer saída:** ROI, "economiza X%", "reduz X horas", preço, prazo de projeto. Não existe entrega medida.
- **Nome do produto pago é Raio-X.** A palavra "diagnóstico" está reservada à call gratuita de topo (`irbis.com.br` → "AGENDAR DIAGNÓSTICO"). A skill nunca chama a sessão paga de diagnóstico.
- **Enquadramento é realocação, nunca corte de pessoal.** Vale como regra escrita, não como preferência.
- **Teto de escopo:** 3 caixinhas ou ~6 jobs por caixinha. Estourou, corta e agenda segunda sessão.
- **A sessão só fecha com um agente rodando.** Mapa sozinho é relatório, que está fora de escopo desde 03/ago.
- **Voz:** direta, sem "ecossistema", "jornada", "solução", "transformar". Sem travessão em texto que vá virar peça externa.

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `.claude/skills/irbis-raio-x-estrutura/SKILL.md` | Roteador: quando dispara, os dois modos, as proibições. Enxuto. |
| `.claude/skills/irbis-raio-x-estrutura/roteiro-sessao.md` | Os 5 blocos da sessão com perguntas literais, armadilhas e reformulações. É o que o Nicolas lê durante a call. |
| `.claude/skills/irbis-raio-x-estrutura/template-raio-x.md` | O formato da saída em branco, com os 5 blocos e a tabela de campos. |
| `.claude/skills/irbis-raio-x-estrutura/caso-verificacao.md` | Entrada sintética (notas de uma sessão fictícia) e a saída esperada. Usado nas tasks 1, 4 e 5. |

Ordem de construção: template → roteiro → SKILL.md (preparo) → SKILL.md (captura) → regras de proteção → registro no mapa de agentes.

---

### Task 1: Template da saída

**Files:**
- Create: `.claude/skills/irbis-raio-x-estrutura/template-raio-x.md`
- Create: `.claude/skills/irbis-raio-x-estrutura/caso-verificacao.md`

**Interfaces:**
- Consumes: nada. É a fundação.
- Produces: os nomes de campo que todas as tasks seguintes usam, exatamente estes — `job`, `quem`, `frequencia`, `horas_semana`, `precisa_decidir`, `sistemas`, `classificacao`. Valores permitidos: `frequencia` ∈ {`diária`, `semanal`, `mensal`}; `precisa_decidir` ∈ {`sim`, `não`}; `classificacao` ∈ {`100% IA`, `Humano + IA`, `Humano lidera`}; `horas_semana` é número decimal OU faixa ∈ {`<1h`, `1-5h`, `>5h`} sempre seguida de `(estimado)`.

- [ ] **Step 1: Escrever o caso de verificação (a entrada e a saída esperada)**

Criar `caso-verificacao.md` com uma sessão fictícia. Empresa sintética, nunca dado de cliente real nem do deck de terceiro que originou o spec.

````markdown
# Caso de verificação — Raio-X

Entrada e saída esperada para conferir os modos da skill. Empresa fictícia.

## Entrada: notas cruas da sessão

> Cliente: Distribuidora Vale Norte, 34 funcionários, vende material de construção pra
> lojas. Departamento escolhido: Comercial Interno — contrataram 2 pessoas nos últimos
> 12 meses.
>
> Frentes: (1) Atendimento de pedido, responsável Cleide. (2) Cobrança, responsável
> Cleide também. (3) Cadastro de cliente novo, responsável Marcos.
>
> Segunda-feira da Cleide: chega 8h, abre o WhatsApp e tem uns 25 pedidos da noite.
> Ela lê cada um e digita no ERP. Leva uns 4 minutos por pedido. Faz isso todo dia de
> manhã. Depois ela confere se o que digitou bateu com o que o cliente mandou, umas 3
> vezes por semana, meia hora cada vez. À tarde ela puxa a lista de quem está atrasado
> e manda mensagem, todo dia, uns 40 minutos.
>
> Marcos: cadastro de cliente novo. Chega uns 6 por semana, cada um leva uns 20 minutos
> porque ele consulta CNPJ, copia dados pro ERP e cria a ficha de crédito. A ficha de
> crédito ele decide na hora, olhando o histórico, quando é cliente conhecido.
>
> Dono não soube dizer quanto tempo o Marcos gasta respondendo dúvida de vendedor.
> Disse que "é bastante".
>
> Sistemas: WhatsApp Business, ERP (Bling), planilha de cobrança.

## Saída esperada — campos, não prosa

| job | quem | frequencia | horas_semana | precisa_decidir | sistemas | classificacao |
|---|---|---|---|---|---|---|
| Digitar pedido do WhatsApp no ERP | Cleide | diária | 8.3 | não | WhatsApp Business → Bling | 100% IA |
| Conferir pedido digitado contra a mensagem original | Cleide | semanal | 1.5 | não | Bling, WhatsApp Business | 100% IA |
| Mandar mensagem pra quem está atrasado | Cleide | diária | 3.3 | não | planilha de cobrança → WhatsApp Business | 100% IA |
| Cadastrar cliente novo no ERP | Marcos | semanal | 2.0 | não | consulta CNPJ → Bling | 100% IA |
| Decidir ficha de crédito de cliente conhecido | Marcos | semanal | — | sim | Bling | Humano lidera |
| Responder dúvida de vendedor | Marcos | diária | 1-5h (estimado) | sim | — | Humano + IA |

**A conta esperada:** 15,1 h/semana em jobs onde ninguém precisa decidir.
(8.3 + 1.5 + 3.3 + 2.0 = 15.1. A dúvida de vendedor fica fora da conta: precisa decidir.
A ficha de crédito fica fora: precisa decidir e não tem hora apurada.)

**Primeiro agente esperado:** digitar pedido do WhatsApp no ERP. Maior número de horas,
sem decisão, dois sistemas com API, não toca dinheiro, não depende de credencial demorada.

## Contas que a captura precisa acertar

- 25 pedidos/dia × 4 min × 5 dias = 500 min/semana = **8.3 h**
- 3 conferências/semana × 30 min = 90 min = **1.5 h**
- 40 min/dia × 5 = 200 min = **3.3 h**
- 6 cadastros/semana × 20 min = 120 min = **2.0 h**
- Dúvida de vendedor: dono não soube. Vira faixa `1-5h (estimado)`, fica fora da conta.
````

- [ ] **Step 2: Conferir que o template ainda não existe**

Run: `ls .claude/skills/irbis-raio-x-estrutura/template-raio-x.md`
Expected: FAIL com "No such file or directory". O caso de verificação não tem onde ser preenchido ainda.

- [ ] **Step 3: Escrever o template**

Criar `template-raio-x.md`:

````markdown
# Raio-X de Estrutura — {CLIENTE}

**Departamento:** {DEPARTAMENTO}
**Data da sessão:** {DATA}
**Participaram:** {NOMES}

## 1. Caixinhas

| Caixinha | Responsável | O que entrega |
|---|---|---|
| | | |

Marcar com ⚠ toda pessoa que aparece em mais de uma caixinha.

## 2. Jobs

Um bloco por caixinha. Campos obrigatórios, nesta ordem:

| job | quem | frequencia | horas_semana | precisa_decidir | sistemas | classificacao |
|---|---|---|---|---|---|---|
| | | | | | | |

**Regras dos campos:**
- `job` — verbo no infinitivo + objeto. "Digitar pedido do WhatsApp no ERP", nunca "atendimento".
- `frequencia` — `diária`, `semanal` ou `mensal`.
- `horas_semana` — decimal com uma casa. Quando o cliente não soube estimar nem por
  volume × duração, usar faixa `<1h`, `1-5h` ou `>5h`, sempre com `(estimado)`.
- `precisa_decidir` — `sim` ou `não`. Se alguém escolhe entre caminhos olhando o caso, é `sim`.
- `sistemas` — usar `→` quando o dado atravessa de um pro outro.
- `classificacao` — `100% IA`, `Humano + IA` ou `Humano lidera`.

## 3. A conta

**{N} horas por semana** em trabalho onde ninguém precisa decidir.

Entram na soma apenas jobs com `precisa_decidir = não` e `horas_semana` numérico.
Job com hora em faixa fica fora da conta e é listado à parte como não apurado.

Não apurados: {LISTA}

## 4. Ordem de ataque

Ranquear por horas × ausência de decisão ÷ esforço de construir.

1.
2.
3.

## 5. Primeiro agente

**Job escolhido:** {JOB}
**Por quê:** {HORAS} h/semana, sem decisão, e passa nos três cortes de viabilidade.
**O que ele faz:** {DESCRIÇÃO}
**Estado no fim da sessão:** {rodando | rascunhando sem enviar}
````

- [ ] **Step 4: Verificar preenchendo o caso**

Preencher o template à mão com a entrada do `caso-verificacao.md` e conferir:
- Os 6 jobs cabem na tabela sem campo sobrando nem faltando.
- A conta dá 15,1 h.
- "Responder dúvida de vendedor" aparece em "Não apurados" e fora da soma.
- Nenhum campo do template pede informação que a entrada não tem.

Expected: PASS nos quatro pontos. Se algum campo não couber, o template muda, não o caso.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/irbis-raio-x-estrutura/template-raio-x.md .claude/skills/irbis-raio-x-estrutura/caso-verificacao.md
git commit -m "feat(raio-x): template da saída e caso de verificação"
```

---

### Task 2: Roteiro da sessão

**Files:**
- Create: `.claude/skills/irbis-raio-x-estrutura/roteiro-sessao.md`

**Interfaces:**
- Consumes: os campos definidos na Task 1 — cada pergunta do roteiro existe pra preencher um campo específico.
- Produces: os cinco blocos nomeados `Bloco 1: Recorte`, `Bloco 2: Caixinhas`, `Bloco 3: A semana real`, `Bloco 4: A conta`, `Bloco 5: Primeiro agente`. O `SKILL.md` (Task 3) referencia esses nomes literalmente.

- [ ] **Step 1: Escrever o caso de verificação do roteiro**

Adicionar ao fim de `caso-verificacao.md`:

````markdown
## Verificação do roteiro

Rodando o roteiro contra a entrada da Distribuidora Vale Norte, cada bloco precisa ter
uma pergunta que produza o dado abaixo. Se um dado não tem pergunta que o arranque, o
roteiro está incompleto.

| Dado da entrada | Bloco que arranca |
|---|---|
| "contrataram 2 pessoas nos últimos 12 meses" | 1 |
| "Cleide responde por atendimento E cobrança" | 2 |
| "25 pedidos, 4 minutos cada, todo dia" | 3 |
| "ela confere se bateu" (trabalho que só existe porque algo falhou) | 3 |
| "a ficha de crédito ele decide na hora" | 3 |
| "WhatsApp → Bling" | 3 |
| "dono não soube dizer quanto tempo o Marcos gasta" | 3, com queda pra faixa |
| 15,1 h somadas na frente dele | 4 |
| digitar pedido escolhido como primeiro agente | 5 |
````

- [ ] **Step 2: Verificar que nenhum arquivo responde a isso ainda**

Run: `ls .claude/skills/irbis-raio-x-estrutura/roteiro-sessao.md`
Expected: FAIL com "No such file or directory".

- [ ] **Step 3: Escrever o roteiro**

Criar `roteiro-sessao.md`:

````markdown
# Roteiro da sessão de Raio-X

Duração alvo: 2h. Você lê isto durante a call. Não digite na frente do cliente.

## Bloco 1: Recorte — 10 min

**Pergunta principal:** "Onde você contratou mais gente nos últimos 12 meses?"

Contratação recente é prova de que o trabalho cresceu junto com a venda. É o recorte mais
confiável que existe, porque tem folha de pagamento atrás.

**Reservas, se ele não souber responder:**
- "Qual área te procura fora do horário?"
- "Se você sumisse uma semana, qual área para primeiro?"

**Já vem pronto:** o formulário da `/call` pergunta qual processo está travando. Chegue
com essa resposta lida e use a pergunta principal só pra confirmar ou corrigir o recorte.

**Armadilha:** o dono escolhe a área que ele gosta, não a que dói. Se ele escolher a área
que ele mesmo toca, pergunte de novo pela contratação.

## Bloco 2: Caixinhas — 20 min

**Pergunta:** "Me lista as frentes dessa área e quem responde por cada uma."

Sai rápido, porque é assim que o dono já pensa.

**Armadilha 1 — ele responde cargo:** "a Cleide é do comercial."
Reformulação: "e o que essa frente entrega, na prática, no fim do dia?"

**Armadilha 2 — acúmulo escondido:** quando o mesmo nome aparece em duas frentes, marque ⚠
e diga em voz alta: "então a Cleide responde por duas frentes." Ele geralmente não tinha
notado, e esse é o primeiro momento de tensão útil da sessão.

**Teto:** 3 caixinhas. Chegou na quarta, pare e agende a segunda sessão.

## Bloco 3: A semana real — 45 min

O coração. Nunca pergunte "o que o fulano faz" — devolve descrição de cargo.

**A pergunta:** "Descreve a segunda-feira do fulano, da hora que ele senta até a hora que sai."

Sobre cada tarefa que aparecer, quatro cortes:

1. **Frequência:** "Isso acontece todo dia ou só segunda?"
2. **Horas:** "Quantas vezes por dia, e quanto tempo cada vez?"
   Nunca pergunte "quantas horas por semana". Isso devolve chute. Volume × duração devolve
   estimativa. Você faz a multiplicação depois, calado.
3. **Decisão:** "Nessa hora ele decide alguma coisa, ou executa uma sequência que já é conhecida?"
   Teste de desempate: "se ele fizesse os passos fora de ordem, quebraria?" Se quebra, é sequência.
4. **Sistemas:** "Ele tira de onde e põe onde?"

**Dois garimpos que o dono nunca oferece sozinho:**
- "O que vocês fazem que só existe porque alguma coisa deu errado antes?"
  (conferência, retrabalho, cobrança — costuma ser o segundo maior bloco de horas)
- "O que foi esquecido esse mês?"

**Quando o dono não sabe:** não insista e não invente. Registre a faixa (`<1h`, `1-5h`, `>5h`),
marque `(estimado)`, e o job fica fora da conta final.

**Gate obrigatório:** se o dono não souber descrever a semana de alguém, chame essa pessoa
pra sessão. Quinze minutos com quem executa valem mais que uma hora com quem manda. Sem isso
o raio-x sai errado, e sair errado é pior que sair incompleto.

**Teto:** ~6 jobs por caixinha.

## Bloco 4: A conta — 15 min

Some **na frente dele**, na sala. Não mande depois, não deixe pro documento.

Diga o número sozinho, sem adjetivo: "esse departamento gasta N horas por semana em
trabalho onde ninguém precisa decidir."

Depois cale a boca e espere ele reagir. É o único momento da sessão em que o cliente
sente o tamanho do problema em número próprio.

**Não diga:** quanto isso custa em salário, quanto ele economizaria, nenhum percentual.
Você não tem entrega medida pra sustentar nada disso.

## Bloco 5: Primeiro agente — 20 min

Escolha por horas × ausência de decisão ÷ esforço, e passe pelos três cortes de viabilidade:

1. Não depende de credencial que demora pra sair.
2. Não toca dinheiro.
3. Não exige integração com sistema fechado.

**Se nenhum job passar nos três:** reduza até caber. Um agente que rascunha e não envia
ainda conta como rodando. Se nem isso couber, diga na sessão — não prometa pra depois.

Feche dizendo o que vai estar rodando e o que fica na ordem de ataque.
````

- [ ] **Step 4: Verificar contra a tabela do Step 1**

Percorrer a tabela de verificação linha a linha e apontar, para cada dado, a pergunta
literal do roteiro que o arranca.

Expected: PASS nas 9 linhas. Se algum dado não tiver pergunta, adicione a pergunta ao
bloco correspondente.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/irbis-raio-x-estrutura/roteiro-sessao.md .claude/skills/irbis-raio-x-estrutura/caso-verificacao.md
git commit -m "feat(raio-x): roteiro dos 5 blocos da sessão"
```

---

### Task 3: SKILL.md com o modo preparo

**Files:**
- Create: `.claude/skills/irbis-raio-x-estrutura/SKILL.md`

**Interfaces:**
- Consumes: `roteiro-sessao.md` (Task 2) e `template-raio-x.md` (Task 1), ambos por caminho relativo.
- Produces: a seção `## Modo preparo` e o frontmatter `name: irbis-raio-x-estrutura`. A Task 4 acrescenta `## Modo captura` neste mesmo arquivo.

- [ ] **Step 1: Escrever o caso de verificação do modo preparo**

Adicionar ao fim de `caso-verificacao.md`:

````markdown
## Verificação do modo preparo

Gatilho: "vou fazer o raio-x da Distribuidora Vale Norte na quinta, comercial interno."

A saída precisa conter, obrigatoriamente:
1. Os 5 blocos na ordem, com a duração de cada um.
2. A pergunta principal do Bloco 1 escrita por extenso, não referenciada.
3. O que já se sabe do cliente puxado do que existir em `pessoas`/`pipeline`, ou a
   declaração explícita de que não há registro.
4. O teto de escopo (3 caixinhas, ~6 jobs) escrito.
5. Nenhuma menção a preço, ROI ou horas economizadas.

A saída NÃO pode conter:
- A palavra "diagnóstico" se referindo a esta sessão.
- Instrução de digitar durante a call.
````

- [ ] **Step 2: Verificar que a skill não existe**

Run: `ls .claude/skills/irbis-raio-x-estrutura/SKILL.md`
Expected: FAIL com "No such file or directory".

- [ ] **Step 3: Escrever o SKILL.md com frontmatter e modo preparo**

````markdown
---
name: irbis-raio-x-estrutura
description: "Conduz e captura a sessão paga de Raio-X de Estrutura: mapeia um departamento do cliente em jobs com horas e critério de decisão, soma quanto tempo por semana vai em trabalho que ninguém precisa decidir, e escolhe o primeiro agente a entregar. Use quando o Nicolas disser '/raio-x', 'vou fazer o raio-x do cliente X', 'terminei a sessão de raio-x', ou colar notas de uma sessão de mapeamento de estrutura."
---

# IRBIS — `/raio-x` (Consultoria de IA)

Spec: `docs/superpowers/specs/2026-08-05-raio-x-estrutura-design.md`.
Roteiro da sessão: `roteiro-sessao.md`. Formato da saída: `template-raio-x.md`.

**O que esta sessão é:** produto pago, cliente já fechado, um departamento por vez, e ela
só termina com um agente rodando. **O que ela não é:** a call gratuita de topo do site.
Aquela se chama diagnóstico; esta se chama Raio-X. Nunca troque os nomes.

## Modo preparo — antes da call

Dispara quando o Nicolas avisa que vai fazer uma sessão.

1. **Puxe o que já existe do cliente:** `pessoas`, `pipeline` e `interacoes` no Supabase
   (conexão em `irbis-os/CONEXAO-SUPABASE.md`), mais o campo do formulário da `/call` onde
   ele descreveu o processo travado. Se não houver registro nenhum, diga isso em uma linha
   em vez de inventar contexto.
2. **Cuspa o roteiro dos 5 blocos** de `roteiro-sessao.md`, com as perguntas por extenso —
   ele vai ler isso durante a call, então referência a arquivo não serve.
3. **Adapte o Bloco 1:** se o formulário já nomeou a área travada, a pergunta principal
   vira confirmação em vez de descoberta.
4. **Repita o teto de escopo** no fim: 3 caixinhas, ~6 jobs por caixinha.

Nunca instrua o Nicolas a digitar durante a call. A captura acontece depois.
````

- [ ] **Step 4: Verificar contra o caso**

Rodar o gatilho "vou fazer o raio-x da Distribuidora Vale Norte na quinta, comercial
interno" e conferir os 5 itens obrigatórios e as 2 proibições do Step 1.

Expected: PASS nos 7 pontos.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/irbis-raio-x-estrutura/SKILL.md .claude/skills/irbis-raio-x-estrutura/caso-verificacao.md
git commit -m "feat(raio-x): skill com modo preparo"
```

---

### Task 4: Modo captura

**Files:**
- Modify: `.claude/skills/irbis-raio-x-estrutura/SKILL.md` (acrescenta seção após `## Modo preparo`)

**Interfaces:**
- Consumes: `## Modo preparo` (Task 3), os campos da Task 1 e os blocos da Task 2.
- Produces: a seção `## Modo captura`, que a Task 5 complementa com as proibições.

- [ ] **Step 1: O caso de verificação já existe — releia**

A entrada e a saída esperada da Distribuidora Vale Norte, escritas na Task 1, são o teste
deste modo. Releia a seção "Contas que a captura precisa acertar" antes de escrever.

- [ ] **Step 2: Rodar o caso contra a skill como ela está**

Colar a entrada crua do `caso-verificacao.md` e pedir a captura.
Expected: FAIL — a skill só tem modo preparo, então ela devolve o roteiro em vez do
markdown preenchido, ou inventa um formato próprio.

- [ ] **Step 3: Escrever o modo captura**

Acrescentar ao `SKILL.md`, depois do modo preparo:

````markdown
## Modo captura — depois da call

Dispara quando o Nicolas cola notas, transcrição ou áudio transcrito de uma sessão.

### 1. Quebrar a semana em jobs

Cada tarefa descrita vira uma linha. O nome do job é **verbo no infinitivo + objeto**:
"digitar pedido do WhatsApp no ERP", nunca "atendimento", nunca "comercial".

Se a nota descreve um cargo em vez de um trabalho, não invente o job — registre como
lacuna e pergunte ao Nicolas.

### 2. Calcular horas, nunca perguntar por elas

A nota traz volume e duração. Você faz a conta:

`vezes por dia × minutos por vez × 5 dias ÷ 60 = horas por semana`

Uma casa decimal. Frequência semanal usa o volume semanal direto, sem multiplicar por 5.

Quando a nota registra que o cliente não soube estimar, o campo vira faixa (`<1h`,
`1-5h`, `>5h`) com `(estimado)`, e o job **fica fora da conta final**, listado à parte
como não apurado. Nunca converta faixa em número.

### 3. Classificar

| Situação na nota | classificacao |
|---|---|
| Sequência conhecida, mesma ordem, ninguém escolhe caminho | `100% IA` |
| Alguém escolhe olhando o caso, mas o preparo é repetitivo | `Humano + IA` |
| A decisão é o trabalho | `Humano lidera` |

`precisa_decidir = sim` nunca recebe `100% IA`.

### 4. Somar a conta

Soma apenas jobs com `precisa_decidir = não` **e** `horas_semana` numérico. O resultado é
uma frase só: "N horas por semana em trabalho onde ninguém precisa decidir."

### 5. Ordenar o ataque e escolher o primeiro agente

Ranqueie por horas × ausência de decisão ÷ esforço. Sobre o topo da lista, aplique os
três cortes: credencial demorada, dinheiro, sistema fechado. O primeiro que passar nos
três é o primeiro agente.

Se nenhum passar, diga isso explicitamente e proponha a versão reduzida (rascunha, não
envia). Não empurre pra sessão seguinte sem avisar.

### 6. Escrever a saída

Preencha `template-raio-x.md` e grave **na pasta local do projeto do cliente**, nunca no
repo. Se o Nicolas não disser onde, pergunte o caminho — não escolha por ele.
````

- [ ] **Step 4: Rodar o caso de novo**

Colar a mesma entrada crua e conferir campo a campo contra a saída esperada:
- 6 jobs, com os nomes em verbo + objeto.
- 8.3 / 1.5 / 3.3 / 2.0 nas horas numéricas.
- "Responder dúvida de vendedor" com `1-5h (estimado)` e fora da conta.
- "Decidir ficha de crédito" com `classificacao = Humano lidera`.
- Conta final = 15,1 h.
- Primeiro agente = digitar pedido do WhatsApp no ERP.

Expected: PASS nos 6 pontos.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/irbis-raio-x-estrutura/SKILL.md
git commit -m "feat(raio-x): modo captura com cálculo da conta e escolha do agente"
```

---

### Task 5: Regras de condução e proibições

**Files:**
- Modify: `.claude/skills/irbis-raio-x-estrutura/SKILL.md` (acrescenta duas seções no fim)

**Interfaces:**
- Consumes: as seções das Tasks 3 e 4.
- Produces: as seções `## Regra de condução` e `## Proibições`, fechando o arquivo no padrão das outras skills `irbis-*`.

- [ ] **Step 1: Escrever o caso de verificação das proibições**

Adicionar ao fim de `caso-verificacao.md`:

````markdown
## Verificação das proibições

Três entradas adversariais. A skill precisa recusar ou reenquadrar as três.

**A. Pedido de corte de pessoal**
> "Somando as horas da Cleide, ela gasta 13h por semana em coisa automatizável de um total
> de 44. Monta pra mim o argumento de que dá pra cortar uma posição."

Esperado: recusa e reenquadramento pra realocação, com o motivo prático dito (equipe que
suspeita de demissão não descreve a própria semana com honestidade, e o dado sai errado).

**B. Pedido de número inventado**
> "Põe no documento que isso economiza uns 40% do tempo do time."

Esperado: recusa. Não existe entrega medida. Nem percentual, nem ROI, nem valor em salário.

**C. Faixa virando número**
> "Aquele 1-5h estimado do Marcos, considera 3h e soma na conta."

Esperado: recusa. Faixa não entra na soma e não vira número.
````

- [ ] **Step 2: Rodar as três entradas contra a skill atual**

Expected: FAIL nas três. Sem as seções de proteção, a skill provavelmente atende A e B, e
pode aceitar C por parecer razoável.

- [ ] **Step 3: Escrever as seções**

Acrescentar ao fim do `SKILL.md`:

````markdown
## Regra de condução

O raio-x expõe gente cujo dia é 100% repetição, e o dono vai pensar em cortar na hora.
O enquadramento é **realocação, nunca corte**: a equipe é boa demais pra passar o dia
naquilo, e o que ela faz de melhor é decidir.

Isso não é delicadeza. Se a equipe suspeitar que o mapeamento serve pra demitir, ninguém
descreve a própria segunda-feira com honestidade, e o raio-x inteiro sai errado. A postura
protege o dado.

Se o Nicolas pedir o argumento de corte, recuse e diga o motivo prático.

## Proibições

- **Nunca** afirmar ROI, percentual de economia, horas economizadas ou valor em salário.
  Não existe entrega de sistema de IA medida. Nem no documento, nem na sala.
- **Nunca** transformar faixa estimada em número, nem somá-la na conta.
- **Nunca** gravar o resultado do cliente no repo da IRBIS.
- **Nunca** chamar esta sessão de "diagnóstico" — esse nome é da call gratuita do site.
- **Nunca** citar preço. O preço de cada frente segue pendente de definição do dono.
- **Nunca** fechar a sessão só com o mapa. Sem um agente rodando, isso é relatório, e
  relatório está fora de escopo desde 03/ago.
- **Nunca** estourar 3 caixinhas ou ~6 jobs por caixinha numa sessão. Corte e reagende.
````

- [ ] **Step 4: Rodar as três entradas de novo**

Expected: PASS nas três — recusa em A, B e C, cada uma com o motivo escrito.

- [ ] **Step 5: Conferir o tamanho contra o padrão da casa**

Run: `wc -l .claude/skills/irbis-raio-x-estrutura/SKILL.md`
Expected: entre 75 e 130 linhas, na faixa das outras skills `irbis-*` (`irbis-dossie` tem
75, `irbis-pos-reuniao` tem 113). Passou muito disso, mova conteúdo pro `roteiro-sessao.md`.

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/irbis-raio-x-estrutura/SKILL.md .claude/skills/irbis-raio-x-estrutura/caso-verificacao.md
git commit -m "feat(raio-x): regra de condução e proibições"
```

---

### Task 6: Registrar o job no mapa de agentes

**Files:**
- Modify: tabela `agentes_jobs` no Supabase `irbis-os` (projeto `kugitonorbcijhyytsya`)

**Interfaces:**
- Consumes: a skill pronta das Tasks 3-5.
- Produces: uma linha nova em `agentes_jobs`, refletida automaticamente na rota `/agentes` do painel.

**Escopo:** esta task vai além do spec, que declarou "sem tocar em produção". Ela existe
porque o mapa aurora é o inventário de jobs da IRBIS e passaria a mentir por omissão. É
inserção aditiva, sem `ALTER`, sem `DROP`. Se o Nicolas não quiser tocar o banco agora,
pule esta task inteira — as Tasks 1-5 entregam a skill funcionando.

- [ ] **Step 1: Levantar o estado real antes de escrever**

Ler a estrutura e o conteúdo atual:

```bash
curl -s "$SUPABASE_URL/rest/v1/agentes_jobs?select=departamento,titulo,skill,nivel_automacao,ordem&order=departamento,ordem" -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY" | head -60
```

Credenciais em `irbis-os/CONEXAO-SUPABASE.md`. Confirme os nomes exatos das colunas antes
de montar o insert — este plano não assume que eles estão corretos.

- [ ] **Step 2: Verificar que o job ainda não existe**

Procure na saída do Step 1 por qualquer linha cujo `skill` seja `irbis-raio-x-estrutura`.
Expected: nenhuma. Se já existir, pare e reporte — outra sessão pode ter feito isso.

- [ ] **Step 3: Decidir o departamento e mostrar o insert antes de rodar**

O job é "mapear a estrutura do cliente e escolher o primeiro agente". Ele pertence à
entrega, não à prospecção, então o candidato natural é **Clientes** ou **Operações** —
confira na saída do Step 1 qual dos dois agrupa os jobs de entrega, e use esse.

`nivel_automacao` = `Humano + IA`: a IA prepara e captura, o Nicolas conduz a sessão.

Monte o insert e **mostre pro Nicolas antes de executar**, com o departamento escolhido e
o motivo.

- [ ] **Step 4: Inserir e conferir**

Depois do OK dele, rodar o insert e reler a tabela filtrando pelo departamento escolhido.
Expected: a linha nova aparece, o total de jobs sobe de 37 para 38, e nenhuma linha
existente mudou.

- [ ] **Step 5: Commit**

Não há arquivo a commitar — a mudança é de dado. Registre no Expert Brain que o inventário
foi de 37 pra 38 jobs, atualizando a nota `w31o7hu5xdj2`.

---

## Self-Review

**Cobertura do spec:**

| Requisito do spec | Task |
|---|---|
| Skill com dois modos, espelhando `irbis-pos-reuniao` | 3 e 4 |
| Saída na pasta local do cliente, fora do repo | 4 (passo 6) e 5 (proibições) |
| Os 7 campos por job | 1 |
| Os 3 níveis de automação da taxonomia | 1 e 4 |
| A conta somada só com jobs sem decisão | 1 e 4 |
| Ordem de ataque | 1 e 4 |
| Primeiro agente com os 3 cortes de viabilidade | 2 (bloco 5) e 4 |
| Os 5 blocos da sessão | 2 |
| Técnica de horas por volume × duração | 2 e 4 |
| Gate de chamar quem executa | 2 (bloco 3) |
| Regra de realocação, nunca corte | 5 |
| Faixa estimada fora da conta | 1, 4 e 5 |
| Teto de 3 caixinhas / 6 jobs | 2, 3 e 5 |
| Nome Raio-X, não diagnóstico | 3 e 5 |
| Proibição de ROI, preço e percentual | 5 |
| Formulário da `/call` pré-carrega o recorte | 2 (bloco 1) e 3 |

Sem lacunas. Os três usos de marketing e o multi-tenant ficaram fora de propósito: os
primeiros não são software, o segundo o spec cortou por YAGNI.

**Placeholders:** nenhum "TBD", nenhum "similar à task anterior", nenhum passo sem conteúdo
literal. As chaves `{CLIENTE}`, `{DEPARTAMENTO}` e afins no template são marcadores de
preenchimento em runtime, não lacunas do plano.

**Consistência de tipos:** os sete nomes de campo definidos na Task 1 aparecem idênticos
nas Tasks 2, 4 e 5. Os rótulos de classificação são os mesmos três em toda parte. Os cinco
blocos mantêm nome e número da Task 2 até a Task 4.
