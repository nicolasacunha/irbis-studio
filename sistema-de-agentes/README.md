# Sistema de Agentes por Departamento

O mapa dos 7 departamentos da IRBIS, dos Jobs To Be Done reais de cada um, de quem faz cada
job hoje (skill, rotina agendada ou o Nicolas na mão) e do que ainda não tem dono.

| Onde | O quê |
|---|---|
| [os.irbis.com.br/agentes](https://os.irbis.com.br/agentes) | a versão viva, lendo o banco em tempo real (login do painel) |
| `irbis-os/painel/app/agentes/` | o código dela (`page.tsx`, `aurora-map.tsx`, `aurora.module.css`) |
| tabela `agentes_jobs` no Supabase `irbis-os` | **a fonte da verdade** do conteúdo |
| `mapa-aurora.html` (esta pasta) | cópia estática pra apresentação/call, com os dados congelados |

> ⚠️ **`mapa-aurora.html` está defasado desde 06/ago/2026.** Ele não tem o eixo `agendado`
> (órbita nas sinapses, grupo "faz sozinho" na legenda, badge na gaveta), nem os 3 jobs novos
> de rotina agendada — mostra 36 jobs e o stat antigo de "% que sabe rodar sozinho". Pra
> apresentar em call, use a rota do painel; pra ressuscitar o estático, é preciso portar as
> mudanças de `aurora-map.tsx` de 06/ago à mão.
| `docs/superpowers/specs/2026-08-05-sistema-agentes-departamentos-design.md` | histórico de decisões |

---

## ⚠️ O mapa é mantido à mão. Sem isso, ele mente.

Nada varre `.claude/skills/` nem `~/.claude/scheduled-tasks/` pra conferir se a tabela
`agentes_jobs` continua verdadeira. Toda linha foi escrita por uma pessoa e continua ali
até alguém trocar. Três formas de o mapa começar a mentir, e o que fazer em cada uma:

**1. Skill nova em `.claude/skills/irbis-*/`**
Se ela cobre um Job To Be Done que já está no mapa, atualize a coluna `skill` daquela linha.
Se cobre trabalho que o mapa ainda não conhecia, crie a linha. Skill nova sem linha
correspondente = o mapa continua contando aquele job como "sem dono de IA", e o número de
gaps no rodapé fica alto de mentira.

**2. Rotina agendada criada, removida ou com horário mudado (`scheduled-tasks`)**
As colunas `agendado`, `cron_task_id`, `ultima_execucao_real` e `proxima_execucao_real` são
um **retrato tirado à mão** de `list_scheduled_tasks` — o painel roda na Vercel e não
enxerga `~/.claude/scheduled-tasks/`, que vive na máquina do Nicolas. Os dois timestamps
envelhecem sozinhos: timestamp velho significa sincronização velha, **não** rotina parada.
Nunca leia esses campos como monitoramento ao vivo.

**3. Skill aposentada, ou job que sai de escopo**
Quando um job deixa de existir (ex.: os dois jobs de site removidos em 05/ago, depois do
pivot), apague a linha da `agentes_jobs`. A skill em si pode continuar no repo pra trabalho
legado — o mapa mostra capacidade atual, não arquivo histórico.

### Como conferir se derivou

Numa sessão do Claude Code, no repo da IRBIS: peça a comparação entre `ls .claude/skills/irbis-*`,
`list_scheduled_tasks` e um `select` na `agentes_jobs`. As três listas têm que fechar. É a
mesma checagem que produziu, em 06/ago/2026, a correção de 6 jobs marcados como agendados e
3 rotinas que rodavam há semanas sem aparecer no mapa.

### Dois eixos, não um

`nivel_automacao` e `agendado` respondem perguntas diferentes e não devem ser confundidos:

- `nivel_automacao` = **o que o job sabe fazer** — `ai` (entrega sozinho), `assisted` (a IA
  prepara, o Nicolas decide), `human` (só ele faz).
- `agendado` = **o que de fato dispara sozinho**, na hora marcada, sem ninguém pedir.

Um job pode ser `ai` e nunca rodar por conta própria: sabe fazer, só não faz sem alguém
mandar. Era exatamente isso que o mapa escondia antes de 06/ago, quando o número de destaque
media capacidade e era lido como execução.

### O que continua fora do mapa de propósito

- **`irbis-auditoria-sites-clientes`** (mensal) alimenta o mesmo job que o `irbis-vigia-carteira`
  (clientes · "Vigiar carteira e gerar ideia de contato"). `cron_task_id` guarda uma rotina só,
  e ficou a diária; a mensal existe e não aparece.
- **`odery-blog-semanal`** e **`eforce-blog-semanal`** rodam recorrência de cliente, não um job
  interno da IRBIS. Se virarem oferta ("operar blog do cliente"), aí ganham linha.
- **`digestor-de-estudos`**, **`ingest-2nd-brain`**, **`zapfy-*`** são de outros contextos
  (estudo pessoal, outro negócio).

## A auditoria que roda sozinha

`irbis-company-brain-diario` (seg–sex 07h08) cruza as tabelas do Supabase procurando o que
não bate entre elas, grava cada achado na tabela `achados` e devolve o resumo do dia. É a
única rotina do sistema que escreve algo fora de `aprovacoes` — e escreve **só** em `achados`.

A coluna `chave` (unique) é o que impede ela de recriar o mesmo achado toda manhã: a gravação
usa `on_conflict=chave` com `resolution=ignore-duplicates`, então registrar o mesmo problema
de novo é no-op, não linha duplicada. A chave descreve o **problema**, nunca a execução —
`aprovacoes-duplicadas:44ad5d69`, jamais `auditoria-2026-08-06`. Achado que deixou de ser
verdade vira `status='resolvido'` na execução seguinte, não é apagado.

O chat do Company Brain também escreve aqui, pela tool `registrarAchado`
(`lib/tools/registrar-achado-tool.ts`) — é a **única** escrita dele. Anotar um problema não é
agir sobre ele: nenhuma skill consome `achados` como fila de ação, ao contrário de
`aprovacoes`. O chat continua sem tocar em pessoas, pipeline, projetos, financeiro ou
aprovacoes, e sem mandar nada pra fora.

## Lei 1 vale aqui também

Nenhuma skill, rotina ou tool do chat do Company Brain manda mensagem, publica ou executa
sozinha. Tudo termina em rascunho na tabela `aprovacoes` ou fica só de leitura, esperando o
Nicolas aprovar. O chat do núcleo (`/api/company-brain`) lê Supabase e expert-brain e não
escreve em lugar nenhum.
