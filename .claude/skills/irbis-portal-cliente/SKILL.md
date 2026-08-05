---
name: irbis-portal-cliente
description: "Provisiona, mantém e desativa o portal público de status do cliente (portal.irbis.com.br/{slug}, tabela `portais` do Supabase) — a página em si já existe e está no ar (`irbis-os/painel/app/portal/[slug]/page.tsx`); esta skill cuida só do ciclo de vida hoje manual: cria a linha do portal e rascunha a mensagem de boas-vindas com o link quando o plano de entrega é confirmado (gate F2 do método), mantém `mensagem`/`marcos` sincronizados com o status real do projeto sem vazar dado interno (financeiro, atividade da equipe), e desativa (`ativo=false`) quando o cliente vira ex-cliente. Use quando o Nicolas disser 'cria o portal de [cliente]', 'manda o link do portal', 'atualiza o portal', 'o portal tá desatualizado', quando um projeto passar do gate F2 (plano de entrega confirmado), quando um ciclo/marco fechar, ou quando um cliente virar ex-cliente."
---

# IRBIS — Portal do Cliente (Supabase, provisionamento e manutenção)

A página pública já existe e está no ar: `irbis-os/painel/app/portal/[slug]/page.tsx`, servida
em `portal.irbis.com.br/{slug}` via rewrite em `proxy.ts`. Ela lê a tabela `portais` (`id`,
`pessoa_id`, `slug`, `ativo`, `mensagem`) e, a partir do `pessoa_id`, todos os `projetos` da
pessoa com seus `marcos`. Esta skill não mexe na página — cuida do que hoje é manual/ad-hoc:
abrir a linha, manter `mensagem`/`marcos` batendo com a realidade, e fechar quando o cliente sai.

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Schema:
`irbis-os/supabase/migrations/20260729010000_portais.sql` — **1 portal por pessoa** (índice
único em `pessoa_id`), então o portal cobre TODOS os projetos daquela pessoa, não um por
projeto.

## 1. Quando provisionar

Gatilho: o gate de **F2** do método de entrega
(`03 - Comercial/04 - Entrega e Recorrência/metodo-entrega-irbis.md`) — "cliente confirmou o
plano [de ciclos] e as datas das dependências dele." É o mesmo momento em que
`02-plano/plano-entrega.md` fecha e o cronograma de ciclos passa a existir de verdade. A própria
página pública já assume isso: o estado vazio de marcos diz *"as etapas deste projeto entram
aqui assim que o cronograma fechar"* (`page.tsx`, bloco de marcos vazios). Não crie o portal
antes disso (F0/F1) — sem cronograma não há o que mostrar, e link vazio não ajuda ninguém a
"acompanhar".

Isso não duplica `irbis-entrega-e-recorrencia`: aquela skill conduz F0→F7 inteiro; esta entra
só neste ponto específico, como uma tarefa a mais do fechamento de F2, e some do fluxo até a
próxima atualização de marco (seção 3) ou até o cliente sair (seção 5).

Também dispara quando o Nicolas pedir direto: "cria o portal de [cliente]", "manda o link do
portal".

## 2. Provisionar (idempotente — 1 portal por pessoa)

**Passo 0 — nunca duplique.** Confira antes de qualquer insert:

```
GET /rest/v1/portais?pessoa_id=eq.<uuid>&select=id,slug,ativo
```

Se já existe uma linha: pule para o Passo 3 (reativar), não insira de novo — o índice único em
`pessoa_id` recusaria com `23505`, e isso seria o banco fazendo o trabalho certo, não um erro
seu pra contornar.

**Passo 1 — gerar o slug.**
- Base = nome da empresa se existir e for curta/reconhecível; senão o nome da pessoa.
- Normalizar: minúsculas, sem acento, espaços viram hífen, remove tudo que não for
  `[a-z0-9-]`. Ex.: "Ana Cunha Advocacia" → `ana-cunha-advocacia`.
- Se o cliente já tem um nome curto de uso corrente (ex.: como aparece no board do pipeline),
  prefira esse — não invente uma sigla nova que ninguém usa.
- Colisão entre pessoas diferentes com nome parecido: sufixo `-2`, `-3`...

**Passo 2 — inserir.**

```
POST /rest/v1/portais
{ "pessoa_id": "<uuid>", "slug": "<slug>", "ativo": true, "mensagem": "<texto — ver seção 3>" }
```

**Passo 3 — se existia mas estava inativo** (cliente reativado, projeto novo com o mesmo
cliente):

```
PATCH /rest/v1/portais?id=eq.<uuid>
{ "ativo": true }
```

**Passo 4 — rascunhar a mensagem de boas-vindas com o link.** Nunca envia sozinho:

```
POST /rest/v1/aprovacoes
{
  "identificador": "portal-boas-vindas-<slug>",
  "criado_por": "irbis-portal-cliente",
  "pessoa_id": "<uuid>",
  "canal": "<mesmo canal já em uso com o cliente — WhatsApp/e-mail; nunca abrir canal novo>",
  "gatilho": "portal provisionado — plano de entrega confirmado (F2)",
  "corpo": "<mensagem — ver seção 4>",
  "fatos_dependentes": ["portais.slug", "pessoas.nome"]
}
```

## 3. `mensagem` do portal — o que aparece NA página pública

Releia o comentário no topo de `page.tsx`: *"Página PÚBLICA — só status + marcos, nada de
financeiro, atividade interna ou Fronteira dos Dados."* `mensagem` é a única linha de texto
livre que a IRBIS controla ali — curta (2–3 linhas cabem), tom da linha "Onboarding de cliente"
do Manual de Copy (`01 - Marca/IRBIS_Manual_de_Copy_v2.md` §04): preciso, técnico, confiante.
Nunca vende, nunca faz repitch, nunca pede indicação — isso é conversa, não texto de página
pública.

**Entra:**
- em que etapa o projeto está agora, com o label que o cliente já ouviu — use exatamente os
  rótulos de `COLUNAS` (`irbis-os/painel/lib/colunas-projeto.ts`: Onboarding / Em produção /
  Em revisão / Entregue / Em garantia / Carteira). Nunca invente um status novo que não exista
  no enum de `projetos.status`.
- o que vem a seguir, só se já tiver data confirmada (ex.: "próxima demo dia X").

**Nunca entra:** valor de parcela, status de pagamento, quem da equipe está fazendo o quê,
conteúdo de `fila.md`/`decisoes.md`, nem qualquer dado que não venha de `projetos`/`marcos`.

**Atualize sempre que:**
- `projetos.status` mudar (ex.: `em producao` → `em revisao`);
- um `marcos.data_real` for preenchido (fim de ciclo, aceite, virada);
- passarem 14 dias sem nenhuma das duas coisas acima — nesse caso, escreva uma linha honesta
  ("seguimos no ciclo X, sem novidade pra registrar essa semana") em vez de deixar a mensagem
  datada mostrando pra sempre a etapa anterior.

```
PATCH /rest/v1/portais?id=eq.<uuid>
{ "mensagem": "<novo texto>" }
```

## 4. Mensagem de boas-vindas com o link — o que o CLIENTE recebe (WhatsApp/e-mail)

Diferente da seção 3: isso não é a página, é o convite pra ela. Tom de DM/WhatsApp do manual
(§04): direto, humano, sem informalidade forçada. Nunca as frases banidas do §07 do manual
("qualquer dúvida, estou à disposição", "saiba mais" como CTA, emoji fora do vermelho de marca).

```
{{nome}}, o link pra acompanhar o {{projeto}} é esse: https://portal.irbis.com.br/{{slug}}
Atualizo conforme os ciclos fecham — sem precisar me perguntar "como tá".
```

Ajuste a segunda linha se o Nicolas já tiver combinado outro ritmo de atualização com o cliente
— F2 já define isso no plano de entrega (`02-plano/plano-entrega.md`); reaproveite o que já foi
combinado, não invente um ritmo novo aqui.

Sempre rascunho em `aprovacoes` (Passo 4 da seção 2), nunca disparo automático — mesma trava de
toda skill desta casa (Lei 1 do método de entrega: nada sai sem aprovação por escrito).

## 5. Desativar

Gatilho: `pessoas.papel` muda para `ex-cliente`, ou o Nicolas confirma que o projeto foi
cancelado/abandonado antes de F5 (virada). **NÃO desative só porque um projeto específico
chegou em F7/carteira** — "Projeto encerra. Cliente não." (método de entrega, F7): o portal
segue mostrando os momentos fixos do pós-venda que `irbis-carteira` grava em `marcos` (repitch,
pulso de satisfação, fim de garantia, camada seguinte) enquanto a pessoa segue `cliente ativo`.
Desativar aqui cedo demais mata um link que o cliente pode ter salvo nos favoritos.

Se a pessoa tiver mais de um projeto e só um encerrar sem sucesso, não desative — o portal é da
**pessoa**, não do projeto (índice único em `pessoa_id`); os demais projetos dela continuam
precisando dele.

```
PATCH /rest/v1/portais?id=eq.<uuid>
{ "ativo": false }
```

Não apague a linha (sem `DELETE`) — o histórico fica, só para de ser público. A própria página
já trata `ativo=false` mostrando *"este portal não está disponível. Fala com o Nicolas."* — não
precisa de nenhuma ação adicional pra esconder o link antigo.

## Proibições

Não criar o portal antes do gate F2 (sem cronograma, link vazio). Não duplicar portal para a
mesma pessoa — sempre checar antes de inserir (Passo 0). Não escrever em `mensagem` nada que
não venha de `projetos`/`marcos` — financeiro, parcela, atividade interna e conteúdo de
`fila.md`/`decisoes.md` ficam de fora, sempre. Não usar voz de venda/repitch dentro de
`mensagem` — isso é papel da mensagem de boas-vindas ou de uma conversa, nunca da página
pública. Não disparar a mensagem de boas-vindas nem qualquer atualização por conta própria —
sempre rascunho em `aprovacoes`. Não desativar o portal só porque um projeto entrou em
carteira — só quando a pessoa deixar de ser cliente ativo. Não usar `DELETE` na tabela
`portais`.
