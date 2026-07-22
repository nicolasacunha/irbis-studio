# Processo de gestão de carteira — IRBIS (Pilar 4)

**Escrito:** noite de 21/jul/2026. **Status:** RASCUNHO aguardando revisão do Nicolas.
**Método:** playbook de growth (`growth-aquisicao/_playbook.md`): retenção > aquisição ("não adianta trazer cliente que vai embora"); recorrência como indicador nº 1; upsell quase de graça para quem já confia. Ledson: vender camadas para quem já comprou é mais barato que adquirir cliente novo.

## O princípio

Cliente entregue não é projeto encerrado, é carteira aberta. Cada cliente ativo tem três receitas possíveis: o projeto que fechou, o acompanhamento mensal (MRR) e a próxima camada (site↔IA). O processo abaixo garante que nenhuma das três morra por esquecimento.

## O ciclo por cliente (roda a partir da entrega)

1. **Na entrega:** repitch do acompanhamento mensal (2 pacotes) como etapa fixa, não como venda improvisada. Roteiro já existe em `processo-entrega-mrr-indicacao-irbis.md`.
2. **30 dias após a entrega:** fim da garantia (Cláusula 10 do contrato) = segundo momento natural de oferta do pacote, com dado na mão ("neste mês você precisou de X ajustes").
3. **Mensal (cliente de site):** auditoria automática do site entregue (rotina do dia 1 do mês: uptime, links, performance, SEO) vira mensagem de valor + gancho de recorrência. A rotina já roda; o processo é USAR o relatório como contato, não deixar no repo.
4. **Trimestral (todo cliente ativo):** 1 mensagem de "camada seguinte" conforme o que o cliente ainda não tem: cliente de site recebe 1 ideia concreta de sistema/IA para a operação dele; cliente de IA recebe o diagnóstico do site. Sempre 1 ideia específica do negócio dele, nunca catálogo.
5. **No fim de cada projeto:** pedido de indicação (processo existente) + voz do cliente (`voz-do-cliente.md`).

## Registro (sem ferramenta nova)

Uma seção "Carteira" no CRM existente com 4 campos por cliente: último contato, pacote ativo (sim/não/qual), próxima camada candidata, data do próximo toque. Regra: **nenhum cliente ativo passa 90 dias sem um contato que gere valor** (relatório, ideia, resultado), e nenhum contato é "só passando pra ver se precisa de algo" (banido pelo manual de follow-up).

## Gatilhos de upsell (sinal → resposta)

| Sinal | Resposta |
|---|---|
| Cliente pede "ajustezinho" que é feature | Aditivo formal (Cláusula 4) + avaliar se abre conversa de pacote maior |
| Auditoria mensal acha problema recorrente | Oferta do pacote de manutenção com o problema como prova |
| Cliente menciona dor operacional (tempo, retrabalho, planilha) | 1 ideia de sistema/IA específica, com estimativa de horas devolvidas |
| Cliente de IA sem site decente | Diagnóstico do site no padrão das análises que já fazemos |
| Cliente elogia entrega | Pedido de depoimento + indicação na mesma conversa (janela quente) |

## Métricas da carteira (entram no placar mensal quando houver 3+ clientes ativos)

Receita recorrente (MRR) · % de clientes com pacote ativo · receita de expansão (aditivos + camadas) vs receita nova · clientes sem contato há 60+ dias (meta: zero).

## Estado atual (jul/2026, honesto)

Carteira ativa: 0 clientes em acompanhamento. Este processo nasce ANTES da carteira de propósito: os 2 clientes fundadores estreiam ele completo, e o hábito começa com o primeiro.
