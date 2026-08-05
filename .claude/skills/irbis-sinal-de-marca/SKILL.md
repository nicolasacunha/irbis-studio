---
name: irbis-sinal-de-marca
description: "Rastreia o sinal da marca IRBIS no mercado com busca web pontual (WebSearch): menções ao nome (filtradas contra o observatório russo e outros ruídos homônimos), chatter da categoria 'service as a software'/'sistemas com IA para economia real' e as vozes de referência do nicho adjacente. Produz um relatório curto — menção real vs. ruído, sem gatilho de resposta automática. Use na rotina quinzenal, ou quando o Nicolas disser 'sinal de marca', 'o que estão falando da IRBIS', 'monitora a marca', 'social listening', 'alguém tá citando a gente'."
---

# IRBIS — Sinal de Marca (WebSearch pontual)

Esta skill não substitui uma ferramenta de social listening contratada — a IRBIS não tem
assinatura de nenhuma (Mention, Brand24, Talkwalker etc.) e não é o caso de negócio para uma
operação solo hoje. O que existe é `WebSearch`, rodado sob demanda. Isso significa: **retrato
de um instante, não vigilância contínua.** Menção feita e desindexada entre duas execuções,
conversa fechada em grupo de WhatsApp/Discord, ou post sem indexação no Google — a skill não vê
nada disso, e o relatório final precisa dizer isso, não fingir cobertura total.

## 1. Cadência

Sugestão: **quinzenal** (a cada 15 dias), não semanal — o volume de menções à IRBIS hoje é
baixo o bastante para que uma rotina semanal só reproduza o mesmo resultado vazio duas vezes.
Se o volume real subir (relatório com 3+ menções reais em duas execuções seguidas), suba para
semanal. Rode manualmente quando o Nicolas pedir, ou dentro da rotina de fechamento de semana
se ele decidir encaixar aqui.

## 2. O filtro de contexto — por que "IRBIS" sozinho não serve

"IRBIS" é nome comum demais para busca solta: é o nome de um sistema de automação de
bibliotecas (ИРБИС, difundido em bibliotecas russas e da CEI), aparece em observatórios e
catálogos astronômicos, é usado por clubes esportivos e produtos de outras marcas sem nenhuma
relação com o estúdio. Rodar `WebSearch` só com "IRBIS" traz majoritariamente isso — ruído, não
sinal.

**Toda query desta skill combina "IRBIS" com pelo menos um qualificador de contexto:**

| Qualificador | Cobre |
|---|---|
| `IRBIS` + `Nicolas Cunha` | citação direta ao fundador |
| `IRBIS` + `irbis.com.br` | referência ao site/domínio |
| `IRBIS` + `IA` | citação no contexto certo de IA |
| `IRBIS` + `sistemas` | citação no contexto de sistemas sob medida |
| `IRBIS` + `service as a software` | citação da tese de posicionamento atual |
| `IRBIS` + `estúdio` | citação no contexto de negócio/estúdio |

Query de descarte automático (não precisa rodar, é o padrão do ruído): "IRBIS" sozinho, ou
"IRBIS" + qualquer um destes — `observatório`, `telescópio`, `astronomia`, `biblioteca`,
`catálogo bibliográfico`, `клуб`/`Rússia` — some do resultado sem virar linha no relatório.

**Detalhe curioso, não uso comercial:** "irbis" também é a palavra turcomana/cazaque para
leopardo das neves — coincide com o predador que é o símbolo visual da marca, mas isso não é
motivo pra tratar toda menção a leopardo das neves como sinal da IRBIS-estúdio. Filtro de
contexto vale igual.

## 3. Concorrência e vocabulário de posicionamento

**Não existe hoje, registrado no repo, uma lista de concorrentes diretos para o escopo pós-pivot
(Soluções com IA, Consultoria de IA, Sistemas) — isso é uma lacuna, não uma omissão desta
skill.** `irbis-guarda-pivot` trata concorrência só de forma indireta (o teste "se um concorrente
ler isso, ele descobre a tese antes das assinaturas fecharem?"). O que existe é o garimpo de
`"04 - Marketing/garimpo-concorrencia-jul2026.md"`, mapeado para a fase de conteúdo pessoal do
Nicolas — não são concorrentes de venda, são **vozes de referência do nicho adjacente "IA para
negócios"**: @odanilogato, @thaismartan, @oalanicolas, @bubows.ia, @diegoalmeida.ia,
@eusoutwins, @paulo.ia, @kenaum. Rastrear o que eles publicam não é espionagem de concorrente —
é calibração de como o mercado já fala de "IA para empresa" em PT-BR, útil pra saber se a IRBIS
soa diferente ou se está repetindo o discurso genérico do nicho.

Termos de posicionamento próprio a buscar (sem o nome IRBIS — aqui o objetivo é ver quem mais
está usando a mesma tese, não achar menções à marca):

- `"service as a software"` Brasil
- `"sistemas com IA para empresa"` OR `"automação com IA"` agência OR estúdio
- `"consultoria de IA"` PME OR "economia real"

Se aparecer um concorrente novo usando linguagem muito parecida com a da IRBIS (ex.: "service
as a software", "site é a porta"), isso vira uma linha específica no relatório — é o tipo de
sinal que justifica um "isso muda alguma coisa?" mais alto que o normal.

**Se o Nicolas quiser rastreamento mais afiado:** pergunte uma vez por execução (não repita
toda vez) se ele quer nomear 3–5 concorrentes diretos reais para essa skill passar a rastrear
por nome. Sem essa lista, a seção de concorrência fica limitada ao vocabulário de posicionamento
acima — diga isso no relatório, não finja cobertura de concorrência que não existe.

## 4. Execução da rotina

Rode `WebSearch` com as combinações da seção 2 (menções à marca) e da seção 3 (chatter de
categoria). Não é preciso rodar as seis combinações da tabela em toda execução — três ou quatro
cobrindo os qualificadores mais prováveis (Nicolas Cunha, IA, sistemas) já pegam a maioria dos
casos reais; amplie para os demais se a primeira leva trouxer algo ambíguo.

Cada resultado retornado passa pela classificação da seção 5 antes de entrar no relatório.
Resultado que a busca não retornou não existe para este relatório — não complete a lacuna com
suposição ("provavelmente não tem nada no Reddit") nem com conhecimento geral do modelo sobre a
marca.

## 5. Classificação — menção real vs. ruído

| Critério | Classificação |
|---|---|
| Cita "IRBIS" + qualificador de contexto (seção 2), fala do estúdio/Nicolas/produto | **Menção real** |
| Cita "IRBIS" sem nenhum qualificador, ou com qualificador de ruído (observatório, biblioteca, clube) | **Ruído** — não entra na lista, só no contador |
| Cita vocabulário de posicionamento (seção 3) sem citar "IRBIS" | **Sinal de categoria**, seção própria, nunca misturado com menção real |
| Menção real mas de baixíssima relevância (perfil sem seguidores reais, spam, bot) | **Menção real de baixo peso** — entra, mas marcada, sem inflar o total |

Toda menção real recebe uma linha com: fonte (URL), data (se a busca trouxer), o que foi dito
resumido em uma frase, e o link. Nunca parafraseie de forma que mude o sentido do que foi dito.

## 6. A linha "isso muda alguma coisa?"

Depois da lista, uma linha só — nunca um plano de ação, nunca uma sugestão de resposta:

```
isso muda alguma coisa? {{não / talvez, {{motivo em uma frase}} / sim, {{motivo em uma frase}}}}
```

"Sim" é raro: reservado para coisas como um concorrente citando a mesma tese, uma menção de
cliente insatisfeito em canal público, ou uma menção com alcance real (veículo de imprensa,
perfil grande). O padrão esperado, dado o volume de menções à IRBIS hoje, é "não" — e "não" é um
resultado válido, não uma falha da execução.

## 7. Formato de saída

```
SINAL DE MARCA · {{data}} {{hora}} America/Sao_Paulo · busca pontual, não monitoramento contínuo
queries rodadas: {{n}} ({{lista curta}})

MENÇÕES REAIS ({{n}})
  {{fonte}} · {{data ou "sem data"}}
    "{{resumo em uma frase do que foi dito}}"
    {{url}}
  (sem menção real nesta execução → linha única: "nenhuma menção real encontrada")

SINAL DE CATEGORIA ({{n}})
  {{termo}} · {{quem usou}} · {{url}}
  (vazio → omitir a seção inteira, não escrever "nenhum")

RUÍDO DESCARTADO: {{n}} resultados (observatório/biblioteca/outro homônimo)

isso muda alguma coisa? {{resposta de uma linha}}
```

Sem WebSearch disponível ou com erro na chamada, o relatório não sai como se a busca tivesse
rodado — sai como:

```
❌ WebSearch não respondeu nesta execução. Sem busca, sem relatório — não decida "sem menções"
   sem ter buscado.
```

## Proibições

Nunca declarar "nenhuma menção" sem ter rodado a busca desta execução — silêncio de dado é
diferente de ausência de sinal. Nunca tratar homônimo (observatório, biblioteca, clube) como
menção real. Nunca disparar mensagem, resposta pública ou contato a partir de uma menção
encontrada — esta skill rastreia, não reage; qualquer resposta é decisão do Nicolas, fora desta
skill. Nunca listar como "concorrente" uma conta que é só voz de referência do nicho adjacente
(seção 3) sem deixar essa distinção explícita. Nunca apresentar busca pontual como cobertura
contínua ou em tempo real. Nunca inventar data, alcance ou número de engajamento de uma menção
que a busca não trouxe.
