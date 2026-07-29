---
name: irbis-carteira
description: "Vigia diário e silencioso da carteira de clientes ativos da IRBIS (Supabase): mede dias sem toque de valor (corte 60/75/90), gera UMA ideia específica por cliente com a fonte citada, instancia os momentos fixos do pós-venda (repitch, pulso de satisfação, fim de garantia, camada seguinte, renovação, indicação) e transforma achado de auditoria em contato. Use na rotina diária/mensal, ou quando o Nicolas disser 'carteira', 'cliente esfriando', 'quem não recebo há tempos', 'renovação', 'upsell', ou marcar um projeto como entregue."
---

# IRBIS — Carteira (Supabase, Fase 4)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Spec completa: `irbis-os/fases/FASE-4-carteira.md`.
Schema: `projetos.ultimo_toque_valor` (adicionado nesta fase — migration
`20260728010000_fase4_carteira.sql`) guarda a data do último contato que entregou relatório,
ideia ou resultado. Mensagem de "tudo bem?" não conta e não atualiza esse campo.

## 1. Vigia diário, silencioso

```
GET /rest/v1/projetos?select=*,pessoas(nome,empresa,papel)&status=eq.carteira&pessoas.papel=eq.cliente ativo
```

Para cada projeto em carteira, `dias = hoje - coalesce(ultimo_toque_valor, data_entrega_real)`.

| Corte | Ação |
|---|---|
| 60d | entra no relatório, seção "abaixo da linha", com 1 ideia pronta |
| 75d | sobe pra "acima da linha" |
| 90d | vira decisão pendente explícita, some no placar de sexta se existir |

**Nunca dispare contato sozinho.** Todo alerta produz um rascunho gravado em `aprovacoes`
(status `parado`) — nunca um envio.

## 2. A ideia específica

Regras, nesta ordem de prioridade de fonte:
1. `projetos.proxima_camada`
2. feedback registrado no fim do projeto (`interacoes`, resumo próximo à `data_entrega_real`)
3. dor operacional citada em `interacoes` (busque por menção a tempo/retrabalho/planilha)
4. achado da última auditoria mensal do site desse cliente

**Uma só ideia, nunca catálogo.** Efeito em tempo/dinheiro só entra na mensagem se foi **o
cliente quem disse**, com data, citado como fonte: "você disse em {{data}} que são 3 horas
por semana". Estimativa sua fica só no relatório interno, marcada
`estimativa minha, não enviável` — nunca no rascunho que pode virar mensagem.

Sem material em nenhuma das 4 fontes:

```
{{cliente}} · {{n}}d sem toque de valor · sem material para uma ideia específica.
O que existe: {{...}}. Rodo uma auditoria do site dele pra gerar gancho? (s)
```

## 3. Auditoria mensal como gancho

A auditoria técnica já roda (scheduled task `irbis-auditoria-sites-clientes`, dia 1, gera
`_rotinas/auditoria-sites/AAAA-MM.md` com uma seção "Oportunidades de contato"). Esta skill
consome esse arquivo do mês corrente e, pra cada oportunidade listada, aplica a tabela abaixo
antes de gravar em `aprovacoes` — a auditoria por si só nunca justifica oferta:

| Achado | Uso comercial |
|---|---|
| Nada errado, cliente **com** Pro | prova de valor. Munição de renovação, não oferta nova |
| Nada errado, cliente **sem** pacote | "está tudo certo" e ponto — NÃO force oferta sobre bom resultado |
| Problema pontual, cliente com pacote | reporta a correção. É o produto funcionando |
| Problema recorrente, cliente **sem** pacote | oferta do pacote com o problema como prova — o gatilho mais legítimo que existe |
| Queda de performance por crescimento de tráfego | conversa de camada, não de manutenção |

Uptime só entra no texto se a auditoria mediu de verdade nesta execução (ela faz request HTTP
real). Sem essa leitura, a linha é `uptime: cego, monitoramento não conectado` — nunca invente
um número plausível numa mensagem que vai pra um cliente pagante.

Ao aprovar e enviar (fora desta skill, na sessão do Nicolas): atualize
`projetos.ultimo_toque_valor = hoje` e registre em `interacoes` (canal `automatico` ou
`email`, `origem_do_registro='sistema'`).

## 4. Momentos fixos do ciclo

Modelados como linhas em `marcos` do projeto (reaproveita a tabela da Fase 3 — não é alerta,
é calendário). Ao marcar um projeto `status='entregue'` (ou quando o Nicolas pedir), insira:

```
POST /rest/v1/marcos  (uma linha por momento, ordem sequencial após os marcos de produção)
{ "projeto_id": "<uuid>", "nome": "Repitch do acompanhamento", "ordem": <próxima>, "data_planejada": "<hoje>" }
{ "nome": "Pulso de satisfação", "data_planejada": "<hoje + 30>" }
{ "nome": "Fim da garantia", "data_planejada": "<hoje + 30>" }
{ "nome": "Camada seguinte", "data_planejada": "<hoje + 90>" }
```

`Renovação` não é um marco fixo — nasce de `pipeline`/compromisso de recorrência a T-30d
(fora do escopo desta skill até a Fase 5 trazer o financeiro completo; se o dado já existir,
gere o alerta mesmo assim). `Indicação` não é marco: é anexo obrigatório do momento de entrega
e de toda "janela quente" (cliente elogiou).

Quando um desses marcos vence (`data_planejada <= hoje` e `data_real` ainda nulo), gere o
rascunho correspondente:
- **Repitch:** oferta dos 2 pacotes (Básico "Cuidado", Pro "Evolução") como etapa fixa do
  processo, nunca como venda improvisada.
- **Pulso de satisfação:** duas perguntas de nota. Nota alta → abre janela de depoimento.
  Nota baixa → uma pergunta a mais, só: "o que faltou pra ser 10?".
- **Fim da garantia:** segunda oferta, com dado real: "neste mês você precisou de {{n}}
  ajustes" (conte em `interacoes`, canal relacionado a suporte, se existir; sem dado, omita a
  linha em vez de inventar).
- **Camada seguinte:** 1 ideia específica (mesma regra da seção 2).

## 5. Gatilhos de upsell

| Sinal | Resposta |
|---|---|
| "ajustezinho" que é feature nova | cotação à parte + avaliar pacote maior |
| auditoria acha problema recorrente | oferta do pacote com o problema como prova |
| dor operacional citada (tempo/retrabalho/planilha) | 1 ideia de sistema, número dele citado com data |
| cliente de IA sem site decente | diagnóstico do site, padrão das análises da casa |
| cliente elogia a entrega | depoimento + indicação **na mesma conversa** — a janela é curta |

## 6. Formato de saída

```
FRONTEIRA DOS DADOS · {{data}} {{hora}} America/Sao_Paulo
✅ LIDO Supabase — projetos ({{n}} em carteira)
{{◐/❌ auditoria do mês, se aplicável}}

CARTEIRA
  {{cliente}} · {{n}}d sem toque de valor · pacote: {{...}}
    ideia: {{uma linha específica}}
    base: {{fonte, com data}}
    → RASCUNHO [X] pronto em aprovacoes
```

## Proibições

Não enviar relatório de auditoria automaticamente. Não oferecer catálogo. Nunca "só passando
pra ver se precisa de algo", em nenhuma variação. Não forçar oferta sobre auditoria limpa. Não
tratar cliente sem pacote como inativo. Não escrever número que você mesmo produziu. Não
juntar cobrança com upsell na mesma mensagem.
