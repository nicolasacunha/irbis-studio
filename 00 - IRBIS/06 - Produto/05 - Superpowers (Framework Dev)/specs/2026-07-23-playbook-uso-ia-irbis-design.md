# Playbook de uso de IA na IRBIS

**Escrito:** 23/jul/2026. **Status:** aprovado pelo Nicolas na mesma sessão. **Gatilho:** prevenção — ainda não virou problema real (fatura ou sessão específica), mas o uso de IA tende a crescer e o custo/qualidade ficam mais difíceis de controlar sem regra escrita.

## Por que existe

Quanto mais uma sessão de IA se estende e acumula contexto não relacionado, dois problemas crescem juntos: o gasto de tokens (mais contexto = mais tokens processados a cada troca) e o risco de erro (contexto poluído faz a IA perder o fio e alucinar). Este playbook prioriza **custo** como dor principal, mas as regras de higiene de sessão atacam os dois problemas ao mesmo tempo — são a mesma causa raiz.

Escopo: cobre todas as ferramentas de IA que a operação usa hoje — Claude Code, ChatGPT e as rotinas automatizadas do repo (blog semanal, roteiro diário, prospecção) — não só esta ferramenta.

Não duplica [`docs/roi-ia-irbis.md`](../../roi-ia-irbis.md) (Pilar 6): aquele documento mede horas devolvidas pela IA para fins de ROI/pitch de venda. Este documento é tático — como operar sessão a sessão para não desperdiçar tokens nem degradar qualidade.

## Camada 1 — Higiene de sessão (Claude Code)

Regras operacionais, sempre ativas:

1. **Uma sessão = um assunto.** Trocar de tópico não relacionado (comercial → design → outro projeto) é sinal pra fechar a sessão e abrir uma nova, não empilhar no mesmo contexto.
2. **O que se repete entre sessões vai pra memória, não pra reexplicação.** O sistema de memória automática é o destino padrão de decisão/contexto recorrente — evita reconstruir o mesmo pano de fundo (e gastar os mesmos tokens) toda sessão nova.
3. **Exploração ampla do repo passa por subagente, nunca pela conversa principal.** Protege o contexto principal de ficar poluído com resultado bruto de busca — a causa mais comum de a IA "se perder".
4. **Tarefas paralelas e independentes vão para subagentes, não sequencial na mesma conversa.** Cada rodada sequencial de tool calls acumula no contexto principal; delegar mantém a conversa enxuta.
5. **Workflows multiagente (orquestração pesada) só sob pedido explícito.** É o maior gasto potencial de tokens de uma sessão — nunca deve disparar por iniciativa própria.
6. **Sessão longa e multi-tópico é sinal de alerta, não normalidade.** Ao perceber que a sessão já virou mistura de assuntos diferentes: fechar, garantir que o essencial foi pra memória, recomeçar.

## Camada 2 — Roteamento entre ferramentas

Critério objetivo para decidir onde uma tarefa nasce:

- **Claude Code** — qualquer tarefa que toca o repo, código, site ou decisão que depende de contexto acumulado da marca/clientes/pipeline. É onde a memória e o CLAUDE.md vivem, então sai mais barato e mais preciso fazer aqui do que reexplicar contexto em outro lugar.
- **ChatGPT** — uso avulso e descartável, sem vínculo com o repo: pesquisa geral, brainstorm solto, rascunho de ideia antes de trazer pro projeto. Regra objetiva: **se o output vai virar algo do produto IRBIS (copy final, código, decisão registrada), não nasce no ChatGPT** — nasce ou migra pro Claude Code, porque é lá que tem contexto de marca e memória acumulados. ChatGPT é rascunho solto; Claude Code é onde vira trabalho real.
- **Rotinas automatizadas do repo** (blog semanal, roteiro diário, prospecção) — já rodam sozinhas via skill agendada. Regra: não trazer essas tarefas de volta pra sessão manual "só pra conferir" toda vez — isso duplica custo (a rotina já gastou tokens rodando, reabrir em sessão manual gasta de novo). Revisar output em lote, não em tempo real.

## Camada 3 — Checkpoint semanal

Acoplado ao ritual de sexta já existente (`_rotinas/revisão-comercial/`), sem criar processo novo. Uma pergunta objetiva a mais no checklist de sexta:

> Teve sessão longa/multi-tópico essa semana? Alguma tarefa repetitiva que devia virar rotina automatizada em vez de sessão manual recorrente?

Não cria métrica formal de R$/tokens agora — isso ficaria redundante com a metodologia de horas devolvidas do `roi-ia-irbis.md`, que já está em validação separada. O checkpoint aqui é qualitativo: hábito de sessão, não número.

## Onde isso vive

- Este documento — o porquê e o detalhe de cada regra.
- `CLAUDE.md` do projeto — versão condensada em regras objetivas, para seguir automaticamente em toda sessão sem precisar reler este doc.
- `_rotinas/revisão-comercial/` — a pergunta de checkpoint semanal entra no checklist existente a partir da próxima revisão de sexta.

## Não-objetivos (v1)

- Dashboard ou métrica formal de custo em R$ — decisão futura do Nicolas, não automática.
- Regra de seleção de modelo (Sonnet/Opus/Haiku) — fora de escopo por ora; revisar se o custo por sessão continuar sendo dor depois de aplicadas as camadas 1–3.
- Extensão às demais ferramentas MCP conectadas (Notion, Gmail, etc.) — este playbook cobre o fluxo de trabalho central (Claude Code, ChatGPT, rotinas); ferramentas MCP pontuais seguem as regras gerais de higiene de sessão sem necessidade de regra própria.
