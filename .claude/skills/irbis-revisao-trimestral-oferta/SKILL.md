---
name: irbis-revisao-trimestral-oferta
description: "Rotina periódica (não sob demanda) que audita a base inteira de propostas/projetos fechados no trimestre e pergunta se o preço e a oferta atuais da IRBIS ainda fazem sentido — taxa de fechamento por faixa de valor, tempo até decisão, objeção de preço registrada e comparação com o trimestre anterior, tudo com dado real do Supabase. Nunca recomenda número novo: entrega achado + UMA pergunta objetiva por achado, decisão fica com o Nicolas. Use na virada de trimestre, ou quando o Nicolas disser 'revisão trimestral', 'revisa o preço', 'ainda faz sentido cobrar isso', 'tá na hora de subir o preço', 'preço parado desde quando', ou pedir o retrospecto comercial do período. Não usar para cotar um caso específico — isso é `irbis-precificacao`."
---

# IRBIS — Revisão Trimestral de Oferta e Preço (Supabase)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Schema: `irbis-os/supabase/migrations/20260728000000_fase0_schema.sql`
(tabelas `propostas`, `pipeline`, `pessoas`, `interacoes`).

## Diferença com `irbis-precificacao` (não duplicar escopo)

| | `irbis-precificacao` | esta skill |
|---|---|---|
| Quando roda | sob demanda, um caso por vez | periódica, trimestral |
| Pergunta | "quanto cobro **deste** projeto?" | "o que cobramos **no geral** ainda faz sentido?" |
| Insumo | briefing do prospect na hora | histórico de `propostas`/`pipeline` do trimestre |
| Saída | um número, pronto pra call | achados + perguntas, sem número novo |

Esta skill não precifica nada. Se um achado aqui sugerir mexer em faixa ou piso, quem faz a
conta nova é `irbis-precificacao` — esta skill só levanta o sinal.

## Os princípios que a revisão respeita, não reinventa

Ver `irbis-precificacao` para a lista completa. Os que mais colidem com "vamos só subir o
preço":

- **Sem case numa categoria nova, preço não vai acima de quem já se provou** (players
  provados são o teto, não o comparável de "quanto eu acho que vale").
- **Recorrência é o ativo, o projeto é a porta** — uma queda na taxa de fechamento do build
  pontual não é automaticamente "preço errado"; pode ser mix (menos gente perguntando MRR).
- **Charm pricing é decisão firme do dono** — a revisão nunca sugere terminar em número redondo.

## 0. Recorte do trimestre e o filtro do pivot (04/ago/2026)

Trimestre = últimos 90 dias corridos a partir de hoje (a IRBIS é solo e não fecha trimestre de
calendário com dado limpo — se o Nicolas quiser trimestre civil, ele pede). Trimestre anterior
= os 90 dias antes desse.

```bash
DATA_FIM=$(date +%F)
DATA_INICIO=$(date -v-90d +%F)
DATA_INICIO_ANTERIOR=$(date -v-180d +%F)
```

**Filtro obrigatório do pivot:** toda proposta com `data_envio < 2026-08-04` é era pré-pivot
(site/LP/branding — fora do escopo vendável hoje, ver `irbis-guarda-pivot`). Ela entra no
relatório separada, rotulada `[pré-pivot]`, e nunca compõe a taxa de fechamento da oferta
atual. Misturar as duas é comparar dois negócios diferentes.

## 1. Ler as propostas do trimestre

```
GET /rest/v1/propostas?select=*,pipeline(estagio,tipo_projeto,motivo_perda,atualizado_em),pessoas(nome,empresa)&data_envio=gte.{{DATA_INICIO}}&data_envio=lte.{{DATA_FIM}}&order=data_envio.asc
```

Classifique cada proposta em uma das 4 categorias, por `tipo` (propostas) / `tipo_projeto`
(pipeline) — case-insensitive, sem inventar categoria que o texto não sustenta:

| Categoria | Palavras que indicam |
|---|---|
| Soluções com IA | automação, chatbot, agente, integração |
| Consultoria de IA | diagnóstico, auditoria de IA, mapeamento |
| Sistemas | CRM, ERP, sistema, software sob medida |
| `[pré-pivot]` | site, landing page, LP, branding, identidade visual |
| `sem classificação clara` | não force — reporte a lista bruta e pergunte ao Nicolas |

Repita a mesma leitura com `data_envio=gte.{{DATA_INICIO_ANTERIOR}}&data_envio=lt.{{DATA_INICIO}}`
para o trimestre anterior.

## 2. Taxa de fechamento por faixa de preço

**Nunca reuse as faixas antigas de `calculadora-preco-build-irbis.md`** — eram preço de site,
categoria que saiu do escopo. As faixas desta revisão nascem dos dados do próprio trimestre:
ordene `valor` de todas as propostas enviadas (excluindo `[pré-pivot]`) e corte em tercis
(terço mais barato / meio / mais caro). Com menos de 6 propostas no trimestre, tercil não tem
significado — pule para "amostra insuficiente" (seção 6).

Para cada tercil: `fechadas / enviadas` (`status='aceita'` sobre o total do tercil, contando
`aceita`+`recusada`+`expirada` como decididas; `rascunho`/`enviada` ainda em aberto não entram
no denominador).

| Tercil | Faixa (R$) | Enviadas | Decididas | Fechadas | Taxa |
|---|---|---|---|---|---|
| Baixo | {{min}}–{{p33}} | | | | |
| Médio | {{p33}}–{{p66}} | | | | |
| Alto | {{p66}}–{{max}} | | | | |

## 3. Tempo até a decisão, por faixa

`propostas` não tem campo de data de decisão — só `data_envio`. O melhor proxy disponível é
`pipeline.atualizado_em` no momento em que `estagio` virou `fechado` ou `perdido`, mas esse
campo atualiza em qualquer edição do card, não só na virada de estágio. Trate o número como
**◐ aproximado**, nunca como fato exato:

```
dias_ate_decisao ≈ pipeline.atualizado_em − propostas.data_envio
  (só quando pipeline.estagio in ('fechado','perdido'))
```

Se o Nicolas quiser esse número exato no futuro, a lacuna é um campo `decidido_em` em
`propostas` — não crie a coluna sozinho aqui, isso é decisão de schema fora do escopo desta
skill; só sinalize a lacuna no relatório.

## 4. Objeção de preço

Duas fontes, níveis de confiança diferentes:

1. **✅ Estruturada:** `pipeline.motivo_perda = 'preco'` — já é o campo que
   `irbis-leads-parados-supabase` grava no post-mortem. Conte direto:
   ```
   GET /rest/v1/pipeline?select=id,motivo_perda,pessoas(nome)&estagio=eq.perdido&motivo_perda=eq.preco&atualizado_em=gte.{{DATA_INICIO}}
   ```
2. **◐ Heurística (texto livre):** varra `interacoes.resumo` do período por menção a preço
   (`caro`, `preço`, `orçamento`, `não consegue pagar`, `desconto`) via `ilike`:
   ```
   GET /rest/v1/interacoes?select=pessoa_id,resumo,data&resumo=ilike.*caro*&data=gte.{{DATA_INICIO}}
   ```
   repita para cada termo. Isso é busca de texto, não campo estruturado — pode ter falso
   positivo (cliente dizendo "não achei caro") e falso negativo (objeção sem a palavra). Reporte
   como contagem aproximada, nunca some com a fonte 1 como se fossem o mesmo dado.

## 5. Comparação com o trimestre anterior

Repita as seções 2–4 para `{{DATA_INICIO_ANTERIOR}}`–`{{DATA_INICIO}}`. Se o trimestre anterior
tiver menos propostas ainda que o atual (empresa nova, ou o recorte cai antes do pivot de
04/ago), diga isso e não force um "aumentou X%" — variação percentual sobre base de 2 ou 3
casos é ruído, não sinal.

## 6. Amostra insuficiente — não force conclusão

Menos de 6 propostas decididas (`aceita`+`recusada`+`expirada`) no trimestre, na oferta atual
(excluindo `[pré-pivot]`): a revisão para na contagem bruta e diz isso com todas as letras. Não
calcule taxa, não calcule tercil, não compare com o trimestre anterior como se fosse
estatística. Isso é honestidade de dado, não é a skill falhando — é o estado real de uma
operação recém-pivotada (`irbis-guarda-pivot`: pivot foi 04/ago/2026, o trimestre inteiro pode
não ter nem 90 dias de oferta atual ainda).

## 7. Uma pergunta objetiva por achado — nunca uma recomendação

Cada achado vira exatamente uma pergunta de sim/não ou escolha fechada, com o número real
embutido. Nunca "recomendo subir o preço" — a decisão é do Nicolas, a skill só traz o fato e a
pergunta.

Exemplos de forma (adapte ao achado real, nunca copie o número):

- "{{n}} das {{total}} propostas do tercil alto fecharam ({{taxa}}%), contra {{taxa_baixo}}% no
  tercil baixo. Ainda vale empurrar proposta pro topo da faixa, ou o dado sugere o contrário?"
- "{{n}} dos {{total}} 'não' do trimestre citaram preço (`motivo_perda`) — ainda no piso, ou já
  é hora de subir?"
- "Tempo até decisão caiu de ~{{dias_anterior}}d pra ~{{dias_atual}}d (aproximado, ver seção 3)
  — decisão mais rápida costuma ser preço mais claro ou processo mais claro. Sabe dizer qual?"
- Sem sinal claro em nenhuma seção: "Nada no trimestre aponta preço como gargalo — o problema
  do funil está em outro lugar (volume, follow-up, conversão de call)?"

## 8. Gravar o relatório

Salve em `irbis-os/relatorios/revisao-trimestral-oferta-{{AAAA-MM-DD}}.md` (mesma pasta usada
pelo relatório de carteira). Não grava em `aprovacoes` — não é mensagem pra enviar a ninguém,
é leitura interna do Nicolas. Se um achado virar decisão de preço, quem executa a mudança é
`irbis-precificacao` (recálculo) e a atualização dos docs canônicos
(`calculadora-preco-build-irbis.md`, `planos-recorrencia-irbis.md`) — sempre com o Nicolas
confirmando o número antes, nunca publicado sozinho (CLAUDE.md: "preço de cada frente ainda
não definido").

## 9. Formato de saída

```
FRONTEIRA DOS DADOS · {{data}} {{hora}} America/Sao_Paulo
✅ LIDO propostas ({{n}} no trimestre, {{n_prepivot}} pré-pivot excluídas) · pipeline (motivo_perda) · interacoes (busca por termo, heurística)
◐ tempo até decisão: aproximado via pipeline.atualizado_em, não há campo de data de decisão em propostas

REVISÃO TRIMESTRAL DE OFERTA — {{DATA_INICIO}} a {{DATA_FIM}}

{{veredicto de uma linha, honesto, ou "amostra insuficiente" se < 6 decididas}}

FECHAMENTO POR FAIXA
  {{tabela da seção 2, ou "sem tercil — amostra insuficiente"}}

TEMPO ATÉ DECISÃO
  {{por faixa, marcado ◐}}

OBJEÇÃO DE PREÇO
  ✅ estruturada (motivo_perda=preco): {{n}}
  ◐ heurística (texto livre): {{n}}, termos: {{lista}}

TRIMESTRE ANTERIOR
  {{comparação, ou "sem base comparável"}}

PERGUNTAS PRA VOCÊ
1. {{pergunta objetiva, seção 7}}
2. ...
```

## Proibições

Nunca recomendar preço, faixa ou aumento — só achado + pergunta. Nunca somar a contagem
estruturada (`motivo_perda`) com a heurística de texto como se fossem a mesma fonte. Nunca
reusar faixa de preço de site (`calculadora-preco-build-irbis.md`) como referência da oferta
atual — categoria saiu do escopo em 04/ago/2026. Nunca calcular taxa/tercil/comparação sobre
amostra abaixo do piso da seção 6 — reporta contagem bruta e para. Nunca tratar
`pipeline.atualizado_em` como data exata de decisão — é proxy, sempre marcado ◐. Nunca gravar
em `aprovacoes` (isto não é mensagem a enviar). Nunca publicar ou comunicar o achado fora da
sessão do Nicolas.
