---
name: irbis-projeto
description: "Responde 'o que trava?' e 'o que vence essa semana?' cruzando projetos, marcos e financeiro no Supabase da IRBIS, e executa destravar/marco cumprido/replanejar. Use quando o Nicolas disser '/projeto', 'o que tá travado', 'o que vence essa semana', 'destravar', 'marco entregue', ou pedir status de um projeto específico."
---

# IRBIS — `/projeto` (Supabase, Fase 3)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Spec completa: `irbis-os/fases/FASE-3-painel-e-projetos.md`,
seção 3. Sempre abra com a Fronteira dos Dados (consulta ao Supabase sem `limit`/filtro de
texto = `✅ LIDO`).

## Painel 1 — O QUE TRAVA

```
GET /rest/v1/projetos?select=*,pessoas(nome,empresa),marcos(*)&travado_por=not.is.null&order=travado_desde.asc
```

Ordene por **idade do bloqueio** (`hoje - travado_desde`), não por valor. Corte: 3+ dias sobe
pra matinal (se ela já existir integrada), 7+ dias vira decisão explícita pro Nicolas.

`travado_por` é sempre **um nome**, nunca "aguardando": o cliente, um fornecedor nomeado, ou o
próprio Nicolas. Trava por conta do Nicolas aparece com o mesmo destaque das outras, sem
suavizar.

Formato:

```
O QUE TRAVA · {{data}}
FRONTEIRA: ✅ Supabase/projetos ({{n}} ativos)
🔴 {{projeto}} · {{n}}d · travado por: {{quem}}
     esperando: {{o quê, específico}}
     custo: marco "{{nome}}" de {{data_planejada}} vai atrasar {{n}}d
     saídas: (1) {{cobrar — rascunho pronto}} (2) {{seguir sem o item}} (3) {{replanejar}}
```

Toda trava sai com **no mínimo duas saídas concretas**. "Esperar" é o estado atual, não é uma
saída válida — nunca liste como opção.

## Painel 2 — O QUE VENCE ESSA SEMANA

Junte, dos próximos 7 dias, em uma lista só **ordenada por data**, não por tipo:

```
GET /rest/v1/marcos?select=*,projetos(nome,pessoas(nome))&data_planejada=gte.{{hoje}}&data_planejada=lte.{{hoje+7}}
GET /rest/v1/financeiro?select=*,projetos(nome,pessoas(nome))&vencimento=gte.{{hoje}}&vencimento=lte.{{hoje+7}}
GET /rest/v1/projetos?select=*,pessoas(nome)&data_proximo_toque_carteira=gte.{{hoje}}&data_proximo_toque_carteira=lte.{{hoje+7}}
GET /rest/v1/propostas?select=*,pessoas(nome)&validade=gte.{{hoje}}&validade=lte.{{hoje+7}}
```

```
seg  marco "{{nome}}" · {{projeto}} · depende de: {{...}} {{⚠ se não chegou}}
ter  parcela R${{valor}} · {{cliente}}
qui  renovação do compromisso · {{cliente}} · rascunho pronto
sex  validade da proposta · {{lead}} · decisão sua
```

## Operações

### Destravar
Leia a trava, a idade (`hoje - travado_desde`) e o que está sendo esperado. Prepare a ação:
rascunho de cobrança (ASK, grava em `aprovacoes`) ou a decisão de seguir sem o item. Ao
destravar (o Nicolas confirma): `PATCH /rest/v1/projetos?id=eq.<uuid>` com `travado_por=null`,
`travado_desde=null`; registre em `interacoes` **o que destravou**, com data; recalcule
`data_planejada` dos marcos dependentes que ainda não têm `data_real`.

### Marco cumprido
`PATCH /rest/v1/marcos?id=eq.<uuid>` com `data_real=<hoje>`. Compare com `data_planejada` e
registre o desvio **sem julgamento** (não é "atrasou", é "N dias de diferença"). Abra o
próximo marco (`ordem+1` do mesmo projeto), nomeie `depende_de`, e se depender de algo do
cliente, prepare o pedido **agora** (ASK), não na véspera do próximo marco.

### Replanejar
Dias de pausa = `hoje - travado_desde` (ou intervalo específico se soubermos quando destravou).
Nova data = data original + dias de pausa. A nova data **só vai ao cliente com aprovação**
(ASK), mensagem de uma linha, sem tom de cobrança, sem desculpa:

```
{{nome}}, com os {{n}} dias que a gente ficou esperando {{o item}}, a entrega vai para {{data}}.
```

Se a pausa foi do lado da IRBIS, isso também é dito, com a data nova, sem inventar causa
externa. **Nunca cite cláusula, contrato, multa ou rescisão** — jurídico está fora do sistema
(ver núcleo, "As duas cegueiras").

### O medidor de prazo
`projetos.prazo_prometido`, `data_inicio_real`, `data_entrega_real` existem pra isso: quando
pedido, calcule a média das últimas 3 entregas por tipo e compare com o prazo público do site
(`irbis.com.br`, fonte de verdade pra prazo público). Reporte o desvio sem esconder, mesmo
quando o desvio é do lado do Nicolas — isso é decisão pra revisão de sexta, não pra esconder
aqui.

## O que esta skill NÃO cobre ainda (Fase 3, mas fora do que já dá pra construir sozinho)

- **Painel web (Next.js/Vercel) e espelho do Trello** não foram construídos. O painel web
  seria uma nova aplicação em produção com autenticação lendo dado de negócio sensível — isso
  pede aprovação explícita de deploy, que ainda não veio. O espelho do Trello depende de um
  board e credenciais do Trello que não confirmei existir no fluxo real da IRBIS. `/projeto`
  cobre as mesmas duas perguntas ("o que trava", "o que vence") direto no Claude Code,
  enquanto essas duas peças não entram.
- **Fila de aprovações em thread no Discord** exige um bot de verdade (aplicação + token +
  processo rodando o tempo todo escutando respostas), diferente dos webhooks de entrada que
  cobrem a Fase 0. Os rascunhos continuam sendo gravados em `aprovacoes` e aprovados nesta
  sessão, citando o identificador.
