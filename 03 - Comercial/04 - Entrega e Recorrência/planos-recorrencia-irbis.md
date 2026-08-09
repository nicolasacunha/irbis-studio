# 🔁 Planos de Recorrência — IRBIS

> Fonte de verdade dos planos de acompanhamento.

> ⚠️ **Atualização 04/ago/2026 — REESTRUTURADO, PREÇO PENDENTE.** Este doc era inteiro sobre plano de manutenção de site (produto fora de escopo desde 04/ago, ver `CLAUDE.md` seção IDENTITY). A lógica de fundo — sistema que não evolui perde valor, recorrência é o ativo que dá valor de empresa — provavelmente se aplica a Sistemas e talvez a Soluções com IA (automação que precisa de ajuste contínuo), mas **nenhum dos dois tem confirmação do dono de que roda em formato de recorrência, e nenhum tem preço.** Não decidi isso sozinho. Versão original (planos de site) preservada no fim como histórico.

## Princípio (adaptado — confirmar se ainda se aplica)

Um sistema entregue e parado perde valor: a operação do cliente muda, o volume cresce, surge processo novo que o sistema não cobre. Sistema (ou automação) que não evolui apodrece — a recorrência não é manutenção, é evolução com a manutenção embutida.

⚠️ **Isso é uma hipótese minha, não confirmada.** Diferente de site, nem todo projeto de Sistemas ou Soluções com IA necessariamente precisa de acompanhamento mensal — alguns podem ser "entrega e pronto". Preciso que o dono confirme se recorrência faz sentido pra quais das 3 frentes antes de eu estruturar planos em cima disso.

---

## Estrutura dos planos — PENDENTE

⚠️ Não recriei "Básico" e "Pro" com conteúdo novo porque não sei o que cada tier deveria cobrir pra Sistemas/Soluções com IA (era óbvio pra site: hospedagem, backup, alterações de página — não é óbvio o equivalente pra um sistema de IA). Preciso do dono pra definir:

- [ ] Quais frentes têm componente recorrente (Sistemas? Soluções com IA? as duas? nenhuma?)
- [ ] O que cada tier de recorrência entrega (ex.: monitoramento do sistema, ajustes de automação, suporte, evolução de funcionalidade — a definir)
- [ ] Quantos tiers (a v1 de site tinha 2 — Básico e Pro — não é regra que o novo modelo precise ser igual)

## Preço por compromisso de duração — mecânica preservada, valores pendentes

A mecânica de negócio abaixo (não é específica de site) provavelmente continua valendo, mas os valores em R$ não existem ainda:

- Contrato por **compromisso de duração** (3, 6 ou 12 meses), não "R$ X por mês" solto.
- Quanto mais longo o compromisso, menor o preço por mês — prazo longo é caixa previsível e churn baixo.
- Régua de desconto sugerida (a mesma da v1, só a base muda): 3 meses = base · 6 meses = −15% · 12 meses = −30%.

| Plano | 3 meses | 6 meses (−15%) | 12 meses (−30%) |
|---|---|---|---|
| [tier a definir] | PENDENTE | PENDENTE | PENDENTE |

---

## Renovação, contrato e multa — mecânica preservada

Essas regras não dependiam de ser site especificamente, mantidas como estavam:

- No fim do compromisso, o cliente mantém plano/duração ou muda de plano e/ou duração.
- O preço/mês segue a duração escolhida na renovação — descer de duração sobe o preço/mês. Isso precisa estar escrito no contrato.
- Contrato pela duração escolhida (3/6/12 meses); cancelamento antes do fim paga multa proporcional ao restante.
- **A multa é a rede, não o motor.** Ela retém quem quer sair; não faz ninguém querer ficar. O lock-in de verdade é o valor entregue.

## Fair use (proteção do operador solo) — mecânica preservada, conteúdo pendente

A lógica de fila + prazo de resposta (proteger o tempo de quem opera sozinho) provavelmente se aplica a qualquer tier recorrente que envolva pedidos do cliente, mas o que exatamente entra na fila (era "alterações na página" pro site) precisa ser redefinido pro que for o equivalente em Sistemas/Soluções com IA.

---

## Histórico — planos de site (vigentes até 04/ago/2026, fora de escopo)

**Princípio original:** "O site é a porta de entrada; a recorrência é o ativo." Site é foto parada, mercado se mexe — recorrência é evolução com manutenção embutida.

**Básico — "Cuidado":** hospedagem gerida, segurança, backup, monitoramento de uptime/carregamento. R$ 297/mês (3m) · R$ 247/mês (6m) · R$ 197/mês (12m).

**Pro — "Evolução":** tudo do Básico + alterações na página (fila, 1 por vez, resposta 48h úteis) + ajuste de conversão + relatório mensal. R$ 997/mês (3m) · R$ 847/mês (6m) · R$ 697/mês (12m).

**Receita total do contrato:** Básico R$ 891 (3m) / R$ 1.482 (6m) / R$ 2.364 (12m). Pro R$ 2.991 (3m) / R$ 5.082 (6m) / R$ 8.364 (12m).

**Nota de ajuste (14/jul/2026):** proposta original era Básico R$ 500/400/250 e Pro R$ 1.000/850/700. Pro mantido (só charmizado); Básico reancorado pra baixo — R$ 500/mês só por hospedagem ancorava contra Hostinger, e o desconto de −50% original era inconsistente com o Pro.

**Add-ons (fora dos planos, também de site):** Gerenciamento de Infraestrutura R$ 150–250/mês · Fábrica de Landing Pages R$ 2.000–3.000/mês.
