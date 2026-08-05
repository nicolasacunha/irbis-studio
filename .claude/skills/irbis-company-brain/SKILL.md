---
name: irbis-company-brain
description: "Cruza as 3 fontes de conhecimento da IRBIS — memória viva (expert-brain), dado operacional (Supabase irbis-os) e histórico/decisão versionada (repo git) — numa resposta única, com origem citada por trecho e contradição reportada em vez de resolvida sozinha. Use quando o Nicolas fizer uma pergunta que exige cruzar fontes: 'o que sabemos sobre {{cliente/tema}}', 'qual foi a última decisão sobre {{assunto}}', 'isso já apareceu antes?', 'já discutimos isso', 'já vimos esse padrão', 'cruza as fontes', 'consulta o company brain', ou qualquer pergunta ampla que não é claramente só CRM, só memória ou só decisão de projeto."
---

# IRBIS — Company Brain (expert-brain + Supabase + repo, Inteligência)

Esta é a skill que fecha o job "consolidar tudo numa base única" do mapa de departamentos
(`os.irbis.com.br/agentes`, depto Inteligência). Hoje não existe base única — existem 3
fontes vivas, cada uma com autoridade sobre um tipo de fato, e ninguém cruza as três sozinho
além do Nicolas. Esta skill não cria uma 4ª base. Ela consulta as 3 na hora, com honestidade
sobre o que cada uma respondeu.

## 0. As 3 fontes e o que cada uma sabe

| Fonte | O que guarda | Ferramenta desta sessão |
|---|---|---|
| **expert-brain** | Memória pessoal de longo prazo do Nicolas: conceitos, decisões, insights, padrões — vault Obsidian + D1 + Vectorize | `mcp__expert-brain__recall` |
| **Supabase (`irbis-os`)** | Dado operacional vivo: pipeline, pessoas, interações, projetos, financeiro | REST via `curl`, padrão em `irbis-os/CONEXAO-SUPABASE.md` |
| **Repo git** | Histórico versionado: decisões de posicionamento, specs de projeto, regras vigentes, calibrações de feedback | `Grep`/`Read` em `~/.claude/projects/-Users-nicolascunha-Projects-Business-irbis/memory/`, `docs/superpowers/specs/`, `CLAUDE.md`, `git log` |

Nenhuma fonte vence as outras por padrão. `CLAUDE.md` e a `irbis-guarda-pivot` têm hierarquia
de verdade própria só para fatos de posicionamento/escopo — quando a pergunta cair nesse
território (o que a IRBIS vende, preço, case, ICP), rode `irbis-guarda-pivot` e cite o
resultado dela como a fonte "repo" desta síntese, não invente uma hierarquia paralela aqui.

## 1. Roteamento — qual fonte consultar

Classifique a pergunta antes de disparar qualquer busca. Regra: **expert-brain quase sempre
entra** (é a memória mais barata de consultar e a mais propensa a ter o insight inesperado);
Supabase e repo entram conforme o assunto.

| Pergunta fala de... | expert-brain | Supabase | repo |
|---|---|---|---|
| cliente, lead, pipeline, financeiro, projeto em andamento | ✅ | ✅ | ◐ (se houver decisão registrada sobre ele) |
| decisão, posicionamento, regra, "por que fazemos X assim" | ✅ | — | ✅ |
| "isso já apareceu antes / já pensei nisso" | ✅ | ◐ | ◐ |
| pergunta ampla sem categoria clara | ✅ | ✅ | ✅ |

Na dúvida, consulte as 3 — o custo de uma fonte vazia é uma linha `✅ LIDO, 0 resultado`, não
um erro. Fonte deliberadamente fora do escopo da pergunta entra como `— NÃO CONSULTADO
(pergunta não é sobre isso)`, nunca como `❌`, para não parecer falha.

## 2. expert-brain — `recall`

Extraia da pergunta os **termos literais**, não uma paráfrase metafórica — a ferramenta é
explícita sobre isso: embeddings ativam por proximidade a vocabulário de domínio, não por
reinterpretação figurada. "Cliente esfriando" busca por `cliente esfriando`, `carteira`,
`toque de valor` — não por uma imagem como "relação congelando".

```
mcp__expert-brain__recall(query: "<termos literais>")
```

Leia **todos** os domínios retornados antes de responder — o match que importa costuma vir do
domínio inesperado (é a própria razão de a ferramenta balancear cross-domain). Se a primeira
busca vier vazia, reformule uma vez com sinônimo literal antes de concluir "não tem nada". Ao
citar, sempre com data da nota se o `recall`/`get_note` trouxer, e nunca cole o corpo inteiro —
resuma com atribuição.

## 3. Repo git — memória local + specs + regras vigentes

Três camadas, nesta ordem de leitura:

1. **Índice**: `~/.claude/projects/-Users-nicolascunha-Projects-Business-irbis/memory/MEMORY.md`
   — uma linha por nota, `[título](arquivo) — data: resumo`. Grep pelo termo da pergunta aqui
   primeiro; o prefixo do arquivo já diz o tipo — `project_` (estado de um projeto em curso),
   `feedback_` (calibração que o Nicolas corrigiu, trata como regra), `reference_` (fato
   técnico de como algo funciona).
2. **Nota completa**: `Read` no arquivo específico apontado pelo índice, quando o resumo não
   basta.
3. **Specs e regras vigentes**: `Grep` em `docs/superpowers/specs/*.md` (decisões de projeto
   com data no nome do arquivo) e em `CLAUDE.md` (raiz — regras e pivot vigentes, sempre a
   versão mais recente independente do que specs antigas digam).

`git log --oneline` no diretório relevante complementa quando a pergunta é "quando isso
mudou" — commit é fonte primária de data, memória e specs são fonte de contexto.

## 4. Supabase — dado operacional

Só quando a pergunta toca pipeline, pessoas, projeto, financeiro ou interações. Siga o padrão
de leitura de `irbis-os/CONEXAO-SUPABASE.md` (`source .secrets/supabase.env` + REST). Tabela
vazia é `✅ LIDO, 0 registros` — nunca confunda com fonte que não respondeu.

```bash
source irbis-os/.secrets/supabase.env
curl -s "${SUPABASE_URL}/rest/v1/pessoas?select=*,pipeline(*),projetos(*),interacoes(*)&nome=ilike.*<termo>*" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
```

## 5. Síntese — atribuição obrigatória, nunca misturar sem fonte

Cada frase da resposta carrega a origem. Nunca apresente um trecho sem dizer de onde veio —
o valor desta skill é justamente não deixar o Nicolas adivinhar qual fonte disse o quê.

```
{{expert-brain, {{data da nota}}}}: {{trecho}}
{{Supabase, projeto "{{nome}}"}}: {{trecho}}
{{repo, {{arquivo}}}}: {{trecho}}
```

Fonte sem nada sobre o assunto entra explicitamente como tal — nunca se preenche o silêncio
com suposição:

```
{{fonte}}: nada encontrado para "{{termo}}". Não significa que não existe — significa que
esta busca não achou.
```

## 6. Contradição entre fontes — reporta, não resolve

Se duas fontes dizem coisas diferentes sobre o mesmo fato, a skill **para e mostra as duas**,
com data de cada uma quando disponível. Nunca escolhe uma sozinha, mesmo que uma pareça mais
recente ou mais autoritativa — decidir qual vale é do Nicolas, não da síntese.

```
CONTRADIÇÃO
{{fonte A}} ({{data}}): {{trecho A}}
{{fonte B}} ({{data}}): {{trecho B}}
Não escolhi qual vale — decide você.
```

Exceção única: fatos de posicionamento/escopo/pivot já resolvidos por `irbis-guarda-pivot`
(hierarquia de verdade própria, `CLAUDE.md` no topo) — aí a skill cita a hierarquia dela em
vez de tratar como contradição aberta.

## 7. Formato de saída

```
FRONTEIRA DOS DADOS · {{data}} {{hora}} America/Sao_Paulo
✅ LIDO expert-brain — recall("{{termos}}") → {{n}} notas
{{✅/❌/◐/—}} Supabase — {{tabela(s)}} {{motivo se não consultado}}
{{✅/❌/◐/—}} repo — memória local + specs + CLAUDE.md

RESPOSTA
{{fonte, data}}: {{trecho}}
{{fonte, data}}: {{trecho}}
{{fonte}}: nada encontrado

{{CONTRADIÇÃO, se houver — seção 6}}
```

## Proibições

Nunca responder sem rodar a Fronteira dos Dados, mesmo pra pergunta que "parece simples".
Nunca misturar trecho de duas fontes numa frase só sem dizer qual é qual. Nunca preencher
fonte vazia com suposição plausível — vazio aparece como vazio. Nunca escolher um lado de uma
contradição sozinho, mesmo com uma fonte parecendo mais confiável. Nunca tratar "0 registros
no Supabase" como "fonte não respondeu" — são coisas diferentes (ver `CONEXAO-SUPABASE.md`).
Nunca pular `expert-brain` `recall` porque a pergunta "parece" só operacional — o insight
inesperado é a razão de existir da busca cross-domain. Nunca inventar uma hierarquia de
verdade própria para fato de posicionamento/escopo — isso é trabalho de `irbis-guarda-pivot`,
não desta skill.
