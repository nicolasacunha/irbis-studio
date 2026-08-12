# 🔁 Planos de Recorrência — IRBIS

> Fonte de verdade dos planos de acompanhamento.

> ⚠️ **Atualização 04/ago/2026 — REESTRUTURADO.** Este doc era inteiro sobre plano de manutenção de site (produto fora de escopo desde 04/ago, ver `CLAUDE.md` seção IDENTITY). Versão original (planos de site) preservada no fim como histórico.
>
> ✅ **09/ago/2026 — resposta do dono: recorrência é real, mas não do jeito que este doc supunha.** Não é um plano "Básico/Pro" por compromisso de duração (3/6/12 meses com desconto) — é um preço mensal fixo, ligado a um produto específico dentro de Soluções com IA. Reescrevi a seção abaixo pra refletir isso. Sistemas e Consultoria de IA seguem **sem recorrência confirmada** (o dono descreveu os dois como preço fechado, sem mencionar mensalidade) — não assumir que a lógica de recorrência se estende pra lá.

## Princípio (validado — recorrência existe, mas só onde há confirmação)

Um sistema/automação entregue e parado perde valor com o tempo. Isso segue valendo como racional — mas só se aplica onde o dono confirmou que existe cobrança recorrente.

---

## O Bot de IA, fechado em 12/ago/2026

O Bot de IA (dentro de Soluções com IA, ex.: o bot de WhatsApp implementado na Odery) deixou de ser produto lateral: **é a porta da IRBIS**, o que se prospecta, e a única fonte de MRR da casa. Ver `03 - Comercial/00 - Planejamento/politica-de-preco-irbis.md`.

| Item | Definição |
|---|---|
| Setup | **R$ 1.000**, one-time ⚠️ ver pendência abaixo |
| Mensalidade | **Faixa de R$ 500 a R$ 3.000/mês.** Número fechado sai na reunião |
| **Fidelidade mínima** | **6 meses** |
| Receita contratada por bot | **R$ 4.000 no piso** (R$ 1.000 + 6 × R$ 500) a **R$ 19.000 no topo** (R$ 1.000 + 6 × R$ 3.000) |

### Por que a mensalidade virou faixa (12/ago/2026)

O valor era R$ 500 fixo, definido quando o Bot era produto lateral. Ao olhar a Odery, o dono constatou que cobraria **cerca de R$ 3.000** de um cliente daquele porte, *"de tantos que eles gastam, porque é uma empresa muito grande, que tem muitos pedidos todos os dias"*. Um preço único não cobre uma diferença de seis vezes.

**A mecânica é a mesma de Sistemas**, que já funciona assim: faixa pública, número fechado na reunião. Calibração idêntica: **topo da faixa quando a operação é grande e o bot é central; base quando é conveniência.**

O que justifica o topo não é só o porte do cliente, é o trabalho real: mais volume significa mais casos extremos aparecendo, mais monitoramento e mais ajustes dentro dos dois mensais. Um bot atendendo centenas de pedidos por dia dá mais trabalho de sustentar que um respondendo dúvidas de horário de funcionamento.

⚠️ **Pendência: o setup acompanha a faixa?** O dono falou só da mensalidade. Um bot de operação grande também dá mais trabalho para construir, então o setup de R$ 1.000 provavelmente também deveria variar. **Não deduzi.** Até ele decidir, o setup é R$ 1.000 para todo mundo.

### Por que 6 meses

Três razões, nesta ordem:

1. **Faz a reunião se pagar.** A venda passa pela reunião única de 1 hora do Nicolas. Com LTV de R$ 4.000, o bot fica acima do piso de Sistemas (R$ 3.000) e a hora se justifica. Mês a mês, uma hora poderia ser gasta por um cliente que sai em 60 dias.
2. **O vencimento é o gatilho do upsell.** No mês 6 existem 5 meses de resultado medido, e a conversa deixa de ser "renova?" e passa a ser "renova ou sobe pra Sistemas". Fidelidade de 12 meses enterraria esse momento; 3 meses chegaria antes de haver prova.
3. **Não põe atrito na porta.** O bot existe para ser a entrada de baixa fricção. Exigir um ano de compromisso na primeira compra contraria o trabalho do produto.

### O que os R$ 500/mês cobrem

Definido em 12/ago/2026. **Esta lista é o escopo. O que não está aqui é fila ou aditivo.**

**Está incluso:**
- Infraestrutura e disponibilidade do bot no ar.
- Monitoramento do funcionamento.
- Correção de erro no que foi entregue (o bot deixou de responder, respondeu quebrado, integração caiu).
- **Até 2 ajustes de prompt ou de fluxo por mês.**

**Não está incluso, e é cotado à parte:**
- Ajuste 3 em diante no mesmo mês. Entra na fila do mês seguinte ou vira aditivo.
- Fluxo novo, canal novo, integração nova.
- Mudança que exige remodelar o comportamento do bot, e não ajustar o existente.
- Treinamento de novas pessoas depois do treinamento de virada.

**Ajuste não acumula.** Dois por mês significa dois naquele mês; mês sem uso não vira crédito. Isso protege o operador de uma dívida de 12 ajustes chegando de uma vez.

**A regra que fecha a porta do "até ficar bom":** todo pedido é classificado na hora em correção (coberta), ajuste (uma das duas do mês) ou aditivo (cotado). É a Lei 3 do método aplicada à recorrência.

### Multa e renovação

**"A multa é a rede, não o motor."** Cancelamento antes dos 6 meses paga multa proporcional ao que resta. A multa retém; quem faz o cliente querer ficar é o valor entregue.

Após os 6 meses, o contrato segue mês a mês, salvo renovação por novo período. **A conversa de renovação é a mesma do upsell de Sistemas** e acontece no mês 5, com o resultado medido na mão.

⚠️ **Redação da cláusula de multa e do aviso prévio ainda não existe no contrato modelo.** É o que falta para o primeiro bot ser vendido com segurança. Ver `03 - Comercial/06 - Jurídico/contrato-prestacao-software-modelo.md`.

### O que segue sem recorrência

- **Sistemas** e **Consultoria de IA**: preço fechado, one-time. Não assumir mensalidade em nenhum dos dois.
- **Automações fora do bot padrão**: o dono descreveu como "vai muito de escopo a escopo". Sem faixa e sem recorrência confirmada.

## Quem paga o custo de IA: o cliente

✅ **Resolvido em 12/ago/2026.** A infraestrutura e o consumo dos modelos de IA rodam **na conta do cliente e são pagos por ele**, direto ao provedor. É assim que o bot da Odery já opera hoje, e é coerente com a Lei da F5 do método (produção nas contas do cliente) e com a Cláusula 9 do contrato.

**O que isso significa para a margem:** os R$ 500/mês remuneram trabalho, não compute. Não há custo marginal crescente comendo o MRR, e a margem do produto é o tempo do Nicolas, não a fatura da nuvem. **A trava de margem que estava aberta deixou de existir.**

### Mas o risco mudou de lugar, não sumiu

Passar o custo variável ao cliente resolve a margem e cria um problema novo, do outro lado da mesa: **quanto mais o bot trabalha, maior a fatura que o cliente recebe.** Um bot que atende bem gera uma conta maior no mês seguinte, e é o cliente quem abre essa fatura.

Duas consequências práticas:

1. **É objeção de venda, no produto que virou a porta.** A pergunta "além dos R$ 500, quanto mais eu pago?" vai aparecer em toda reunião de bot, e hoje não tem resposta. Precisa de uma faixa estimada de custo mensal de nuvem por volume, para dizer na reunião sem inventar.
2. **É risco de churn no mês 2 ou 3.** Fatura maior que o esperado é o tipo de surpresa que faz cliente pedir para desligar, mesmo satisfeito com o bot. A fidelidade de 6 meses segura o contrato, não a relação.

**Mitigação registrada na Cláusula 9.1 do contrato:** o Prestador informa uma estimativa antes do início e avisa quando observar variação relevante. A Cláusula 9.2 reserva o lugar de um **teto de uso**, ainda a definir.

⚠️ **O que falta:** medir o consumo real do bot da Odery, que já roda, e transformar isso numa faixa de custo por volume de conversa. Deixou de ser trava de margem e virou **munição de venda e proteção contra churn**.

---

## Histórico — planos de site (vigentes até 04/ago/2026, fora de escopo)

**Princípio original:** "O site é a porta de entrada; a recorrência é o ativo." Site é foto parada, mercado se mexe — recorrência é evolução com manutenção embutida.

**Básico — "Cuidado":** hospedagem gerida, segurança, backup, monitoramento de uptime/carregamento. R$ 297/mês (3m) · R$ 247/mês (6m) · R$ 197/mês (12m).

**Pro — "Evolução":** tudo do Básico + alterações na página (fila, 1 por vez, resposta 48h úteis) + ajuste de conversão + relatório mensal. R$ 997/mês (3m) · R$ 847/mês (6m) · R$ 697/mês (12m).

**Receita total do contrato:** Básico R$ 891 (3m) / R$ 1.482 (6m) / R$ 2.364 (12m). Pro R$ 2.991 (3m) / R$ 5.082 (6m) / R$ 8.364 (12m).

**Nota de ajuste (14/jul/2026):** proposta original era Básico R$ 500/400/250 e Pro R$ 1.000/850/700. Pro mantido (só charmizado); Básico reancorado pra baixo — R$ 500/mês só por hospedagem ancorava contra Hostinger, e o desconto de −50% original era inconsistente com o Pro.

**Add-ons (fora dos planos, também de site):** Gerenciamento de Infraestrutura R$ 150–250/mês · Fábrica de Landing Pages R$ 2.000–3.000/mês.
