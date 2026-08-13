# Rotina Operacional — IRBIS

> Criado em 13/ago/2026. **Este documento existe porque os scripts dizem o que falar, mas não existia um lugar só que dissesse o que fazer, quando fazer e quem faz.** Essa informação estava espalhada em `kpis-comercial-irbis.md` (rotina de acompanhamento), `rotina-sdr-social-selling-irbis.md` (rotina diária de prospecção), `escada-follow-up-irbis.md`, `estrutura-reuniao-unica-irbis.md` e `politica-de-preco-irbis.md` (cada um com sua própria tabela "quem faz o quê"), e `processo-gestao-carteira-mrr-irbis.md` (cadência com cliente ativo). Este documento não substitui nenhum deles — consolida a camada de aplicação: a agenda real da semana, de quem, fazendo o quê, e o que sobe pro Nicolas revisar.
>
> Time: **duas pessoas.** Nicolas (conduz reunião, fecha, entrega, decide preço fora de faixa) e o colaborador (prospecção, agendamento, follow-up dentro do modelo, registro).
>
> 🔁 **Atualizado em 13/ago/2026 — funil mudou.** A porta agora é a Consultoria de IA, não o Bot de IA. A produção (Sistemas/Bot) é vendida na entrega da consultoria, não na prospecção. Ver `funil-consultoria-producao-irbis.md`.

---

## O dia do colaborador

Rotina enxuta, não turno inteiro de social selling — o resto do dia é outras funções.

| Bloco | Horário sugerido | O que faz | Onde registra |
|---|---|---|---|
| Bloco manhã | 30–45 min | Responder DMs/comentários da noite + abordar 5 novos seguidores/engajados (`script-hunter-irbis.md`, `rotina-sdr-social-selling-irbis.md`) | `interacoes` (Supabase) |
| Prospecção ativa | Resto da manhã, conforme lista | Cold call (`script-cold-call-irbis.md`) e/ou disparo de degraus da Escada de Follow-up do dia (`escada-follow-up-irbis.md`) | `interacoes` |
| Bloco fim de tarde | 30–45 min | Follow-up de quem não respondeu + 5 abordagens novas + atualizar pipeline | `interacoes`, `pipeline` |
| Fim do dia | 5 min | Mini-relatório: abordagens feitas, conversas abertas, reuniões agendadas, 1 aprendizado | `_rotina-diaria` ou equivalente no Supabase |

**Regra que atravessa o dia inteiro:** toque não registrado no mesmo dia é toque que não aconteceu (`kpis-comercial-irbis.md`). Isso vale mais que volume — um dia com 5 abordagens registradas vale mais que um dia com 15 não registradas.

**O que o colaborador dispara sem aprovação:** qualquer degrau padrão da Escada de Follow-up, usando os modelos já escritos. **O que precisa do Nicolas antes de sair:** qualquer mensagem fora do modelo — negociação, condição especial, objeção nova, ou qualquer coisa pra cliente ativo (ver `escada-follow-up-irbis.md`, seção "Quem executa").

## O dia do Nicolas

| Bloco | O que faz | Onde registra |
|---|---|---|
| Reuniões de venda agendadas | Conduz a Reunião Única de 1h inteira (`script-call-comercial-junho-2026.md`), do bloco 1 ao 7 — fecha **Consultoria de IA** | `pipeline` |
| Até 24h depois de cada reunião | Proposta escrita enviada, mesmo se fechou ao vivo | `pipeline` |
| Entrega de Consultoria fechada | Monta o diagnóstico (o que está errado + a oportunidade) e conduz a **Reunião de Entrega da Consultoria** — é ali que a produção (Sistemas e/ou Bot de IA) é vendida, com o diagnóstico como prova. Script ainda pendente, ver `funil-consultoria-producao-irbis.md` | `pipeline` |
| Entrega de projeto de produção ativo | Segue `metodo-entrega-irbis.md` (7 fases, gate por fase) | Conforme o método |
| D+0 pós-reunião (áudio) | O único degrau da escada que o Nicolas faz pessoalmente, nunca o colaborador (`escada-follow-up-irbis.md`) | `interacoes` |
| Preço fora de faixa, exceção, caso ambíguo | Decide, não delega | — |

## A semana

| Quando | O quê | Quem |
|---|---|---|
| Segunda a sexta | Rotina diária de ambos, acima | Os dois |
| **Sexta — placar da semana** | Fecha: conversão por etapa, taxa de comparecimento, conversas por origem, fechamentos da semana, MRR da semana. Toda meta estourada ganha 1 linha de causa (`kpis-comercial-irbis.md`) | Nicolas fecha, com o dado que o colaborador registrou |

## O mês

| Quando | O quê | Quem |
|---|---|---|
| Todo mês, por cliente ativo | Auditoria/checkpoint do que foi entregue vira contato de valor (nunca "só passando pra ver") — carteira de bot/sistema entregue não pode passar 90 dias sem toque que gere valor (`processo-gestao-carteira-mrr-irbis.md`) | Nicolas |
| Fim de mês | MRR acumulado contra a meta vigente, ticket médio por frente (medido separado — nunca em média única), receita por origem, ajuste de rota | Nicolas |
| Trimestral, por cliente ativo | 1 ideia concreta de "próxima camada" (cliente de bot recebe ideia de Sistemas; nunca catálogo genérico) | Nicolas |

## O gargalo real da casa, pra não perder de vista

`kpis-comercial-irbis.md` já registra isso, mas vale repetir aqui porque muda como você aloca a semana: **reunião realizada é o recurso mais escasso**, porque só o Nicolas conduz e ele também entrega. O teto de quantas reuniões cabem numa semana ainda não foi medido — enquanto não for, qualquer meta de fechamento é estimativa, não compromisso.

## O que este documento NÃO cobre (fica nos documentos-fonte)

- **O que falar** em cada etapa → os scripts individuais (`script-hunter-irbis.md`, `script-cold-call-irbis.md`, `script-call-comercial-junho-2026.md`, etc.)
- **Quanto cobrar** → `politica-de-preco-irbis.md`
- **Quando reprovar um lead** → gate de entrada em `estrutura-reuniao-unica-irbis.md`
- **O que fazer no dia do fechamento** → `checklist-dia-do-sim.md` (`06 - Jurídico/`)
- **Métricas e metas exatas** → `kpis-comercial-irbis.md` (fonte de verdade de números — este documento só organiza a agenda, não repete meta)

## Pendência que trava a rotina, não resolvida aqui

`00 - Planejamento/commercial-roadmap.md` está marcado 🛑 PRÉ-PIVOT no índice (`00 - Planejamento/README.md`) — é o roadmap de fases da era de site (R$0 → 15k → 30k). Só a estrutura de fases ainda pode servir; metas e ticket, não. Enquanto ele não for reescrito ou arquivado, a operação roda pela rotina deste documento e pelas metas do `kpis-comercial-irbis.md` — não pelo roadmap antigo. Fica registrado aqui pra não sumir de vista.
