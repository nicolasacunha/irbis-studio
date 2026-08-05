---
name: irbis-pesquisa-mercado
description: "Rotina mensal de pesquisa de mercado da IRBIS via WebSearch: responde 4 perguntas fixas e repetíveis sobre o nicho real (IA para economia real, sistemas sob medida) — oferta e preço de concorrentes diretos/adjacentes, mudança em ferramenta de IA que baixa custo de entrega, notícia que valida ou ameaça a tese do pivot (Service as a Software), e lead público com dor que a IRBIS resolve. Produz achado real ou 'nada relevante essa rodada', nunca lista forçada. Use na rotina mensal, ou quando o Nicolas disser 'pesquisa de mercado', 'o que mudou lá fora', 'tem concorrente novo', 'saiu modelo novo que muda alguma coisa', ou pedir pra revisar se a tese do pivot ainda se sustenta."
---

# IRBIS — Pesquisa de Mercado (Inteligência, recorrente)

Job do Company Brain (`os.irbis.com.br/agentes`, departamento Inteligência): "Pesquisa de
mercado recorrente". Hoje é ad hoc — alguém lembra de olhar de vez em quando. Esta skill vira
isso em rotina: **Humano + IA**. A IA busca, filtra contra o ICP e resume; o Nicolas decide o
que fazer com cada achado. Nenhuma decisão de preço, oferta ou canal sai desta skill sozinha.

## Onde essa skill NÃO pisa (leia antes de rodar, evita duplicar trabalho)

- **`irbis-guarda-pivot`** — vigia consistência de fatos INTERNOS (o que a própria IRBIS afirma
  sobre si: escopo, preço, cases, ICP). Esta skill olha pra FORA: o que o mercado está fazendo,
  não o que o site ou a call da IRBIS dizem. Toda vez que esta skill for citar um fato da própria
  IRBIS (preço atual, ICP, o que ela vende) para comparar com o achado externo, rode
  `irbis-guarda-pivot` primeiro — não repita de memória um preço ou claim que pode estar
  desatualizado.
- **`irbis-sinal-de-marca`** — rastreia menções À MARCA IRBIS (quem está falando do estúdio,
  do Nicolas, do domínio) e o vocabulário de posicionamento do nicho adjacente (as vozes de
  referência tipo @odanilogato). Cadência quinzenal, foco inbound: "estão falando de nós?". Essa
  skill aqui é o oposto: outbound, sem citar o nome IRBIS na busca — "o que a concorrência e o
  mercado estão fazendo, independente de saberem que a IRBIS existe". `irbis-sinal-de-marca`
  registra explicitamente que rastreamento de concorrente direto (preço, oferta) é uma **lacuna**
  dela ("Não existe hoje... lista de concorrentes diretos... isso é uma lacuna, não uma omissão
  desta skill") — a pergunta 1 desta skill fecha exatamente essa lacuna. As duas convivem: se
  `irbis-sinal-de-marca` achar um concorrente novo usando linguagem parecida com a da IRBIS, essa
  informação pode virar ponto de partida pra pergunta 1 daqui, mas as execuções são
  independentes.
- **`irbis-demo-prospect`** — reativa: o Nicolas traz 1 lead específico com necessidade
  publicada de SITE, vira dossiê + protótipo no ar + outreach em horas. Sites não são mais
  escopo vendável (pivot 04/ago), então nem essa comparação vale mais 1:1 — mas o padrão de
  reatividade continua o contraste certo: aquela skill não roda sem lead trazido. Esta skill é
  proativa e periódica, varre o mercado inteiro sem lead trazido, e **nunca constrói nada** — a
  pergunta 4 aqui só sinaliza um nome, canal e a dor nas palavras dele. Se qualificar, vira
  input pra prospecção normal (`irbis-prospeccao-e-diagnostico`) ou pipeline de demo, fora desta
  skill.
- Não é auditoria de portfólio pontual (isso foi "Auditoria Estratégica jul/2026" e "Auditoria
  Zapfy jul/2026" — projetos específicos do portfólio, feitas ad hoc, não o mercado externo de
  IA/sistemas em si).
- Não é `irbis-revisao-trimestral-oferta` — aquela audita dado INTERNO do Supabase (taxa de
  fechamento por faixa de preço, tempo até decisão); esta busca dado EXTERNO na web.

## Cadência

**Mensal**, não semanal — empresa solo, e uma rotina a mais toda semana é carga que não se
paga: o mercado de IA/sistemas pra economia real não vira rápido o bastante pra justificar
cadência maior. Sugestão de gatilho: 1º dia útil do mês. Se algo urgente aparecer fora da
rotina (o Nicolas viu um lançamento, uma notícia), ele traz na hora — não espera a rotina
mensal pra reagir a isso.

## As 4 perguntas fixas (nunca mais que isso, nunca menos)

Toda pergunta roda filtrada pelo ICP e pela tese atuais — economia real, sem site como produto,
três frentes (Soluções com IA, Consultoria de IA, Sistemas). Não abrir uma 5ª pergunta ad hoc
no meio da execução: se surgir algo relevante fora das quatro, ele entra dentro da pergunta mais
próxima ou fica fora da rodada — nunca vira seção nova sem o Nicolas pedir.

1. **Concorrência direta/adjacente** — o que agências, estúdios, freelancers ou produtos de
   automação/chatbot/agente de IA/sistemas sob medida pra empresa fora de tech estão anunciando
   de novo: preço, oferta, posicionamento. Fecha a lacuna que `irbis-sinal-de-marca` deixa
   explicitamente aberta.
2. **Ferramentas de IA** — mudança em modelo, API ou plataforma que baixa o custo (ou abre a
   viabilidade) de algo que hoje é caro ou difícil de entregar sozinho. O teste: "isso muda o
   que a IRBIS consegue prometer, ou só é uma novidade de tecnologia sem efeito em oferta?".
   Só o primeiro caso vira achado.
3. **Validação ou ameaça à tese do pivot** — notícia ou tendência que sustenta ou contesta
   "Service as a Software: sistemas, automação e IA pra empresas da economia real, sem sites
   nem branding" (decisão do dono, 04/ago/2026, ver CLAUDE.md seção IDENTITY).
4. **Leads públicos** — negócio real da economia real (nunca startup/founder — ICP fechado em
   21/jul, ver `irbis-guarda-pivot`) que expôs publicamente uma dor que Soluções com IA,
   Consultoria de IA ou Sistemas resolve. Mesmo padrão de sinal que `irbis-demo-prospect` usava
   pra site (post, vaga, pedido) — aqui é varredura proativa do mês, sem lead trazido, e sem
   escopo de site pra procurar.

## Execução

Para cada pergunta: 2–3 queries objetivas via `WebSearch`, ler os resultados, filtrar contra
ICP/tese antes de tratar como achado. Um resultado só entra no relatório se muda alguma decisão
possível do Nicolas — preço, oferta, canal, ICP, ou "vale abordar esse lead". Curiosidade de
mercado sem consequência prática fica de fora, mesmo que seja um resultado interessante.

Sem `WebSearch` disponível ou com erro na execução, o relatório não sai como se a busca tivesse
rodado:

```
❌ WebSearch não respondeu nesta execução. Sem busca, sem relatório — não decida
   "nada relevante" sem ter buscado.
```

## Formato de saída

```
PESQUISA DE MERCADO · {{mês/ano}} · {{data}} {{hora}} America/Sao_Paulo
✅ WebSearch — {{n}} queries em 4 perguntas

1. CONCORRÊNCIA
   {{achado: quem, o quê, preço/oferta, fonte com link}}
   (sem achado → "nada relevante essa rodada")

2. FERRAMENTAS DE IA
   {{achado: o que mudou, o que isso abre pra IRBIS oferecer, fonte}}
   (sem achado → "nada relevante essa rodada")

3. TESE DO PIVOT
   {{valida ou ameaça, com o porquê em uma frase, fonte}}
   (sem achado → "nada relevante essa rodada")

4. LEADS PÚBLICOS
   {{nome, canal, dor nas palavras dele, fonte}}
   (sem achado → "nenhum lead qualificado essa rodada")

→ {{se algum achado pede ação: qual skill/decisão ele alimenta}}
  (sem nenhum achado nas 4 perguntas → relatório fecha em uma linha:
  "nada relevante essa rodada")
```

Achado na pergunta 1 ou 3 que aponte pra mudar preço, oferta ou ICP não vira decisão aqui —
vira uma pergunta objetiva pro Nicolas, no mesmo estilo de `irbis-revisao-trimestral-oferta`:
achado + UMA pergunta, decisão fica com ele.

## Proibições

Nunca gerar achado pra preencher espaço — "nada relevante essa rodada" é resultado válido e
esperado na maioria dos meses, não falha de execução. Nunca abrir uma 5ª pergunta fora das
quatro fixas sem o Nicolas pedir. Nunca citar preço, ICP ou fato da própria IRBIS sem checar
`irbis-guarda-pivot` primeiro. Nunca construir dossiê, protótipo ou mensagem de outreach a
partir de um lead achado na pergunta 4 — isso é `irbis-demo-prospect` ou prospecção padrão,
fora desta skill, e só depois de passar pelo gate de qualificação delas. Nunca recomendar
mudança de preço, oferta ou canal como decisão pronta — achado + pergunta, nunca achado +
veredito. Nunca subir a cadência pra semanal por conta própria. Nunca declarar "nada relevante"
sem ter rodado a busca desta execução.
