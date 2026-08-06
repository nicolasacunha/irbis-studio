# Caso de verificação — Raio-X

Entrada e saída esperada para conferir os modos da skill. Empresa fictícia.

## Entrada: notas cruas da sessão

> Cliente: Distribuidora Vale Norte, 34 funcionários, vende material de construção pra
> lojas. Departamento escolhido: Comercial Interno — contrataram 2 pessoas nos últimos
> 12 meses.
>
> Frentes: (1) Atendimento de pedido, responsável Cleide. (2) Cobrança, responsável
> Cleide também. (3) Cadastro de cliente novo, responsável Marcos.
>
> Segunda-feira da Cleide: chega 8h, abre o WhatsApp e tem uns 25 pedidos da noite.
> Ela lê cada um e digita no ERP. Leva uns 4 minutos por pedido. Faz isso todo dia de
> manhã. Depois ela confere se o que digitou bateu com o que o cliente mandou, umas 3
> vezes por semana, meia hora cada vez. À tarde ela puxa a lista de quem está atrasado
> e manda mensagem, todo dia, uns 40 minutos.
>
> Marcos: cadastro de cliente novo. Chega uns 6 por semana, cada um leva uns 20 minutos
> porque ele consulta CNPJ, copia dados pro ERP e cria a ficha de crédito. A ficha de
> crédito ele decide na hora, olhando o histórico, quando é cliente conhecido.
>
> Dono não soube dizer quanto tempo o Marcos gasta respondendo dúvida de vendedor.
> Disse que "é bastante".
>
> Sistemas: WhatsApp Business, ERP (Bling), planilha de cobrança.

## Saída esperada — campos, não prosa

| job | quem | frequencia | horas_semana | precisa_decidir | sistemas | classificacao |
|---|---|---|---|---|---|---|
| Digitar pedido do WhatsApp no ERP | Cleide | diária | 8.3 | não | WhatsApp Business → Bling | 100% IA |
| Conferir pedido digitado contra a mensagem original | Cleide | semanal | 1.5 | não | Bling, WhatsApp Business | 100% IA |
| Mandar mensagem pra quem está atrasado | Cleide | diária | 3.3 | não | planilha de cobrança → WhatsApp Business | 100% IA |
| Cadastrar cliente novo no ERP | Marcos | semanal | 2.0 | não | consulta CNPJ → Bling | 100% IA |
| Decidir ficha de crédito de cliente conhecido | Marcos | semanal | — | sim | Bling | Humano lidera |
| Responder dúvida de vendedor | Marcos | diária | 1-5h (estimado) | sim | — | Humano + IA |

**A conta esperada:** 15,1 h/semana em jobs onde ninguém precisa decidir.
(8.3 + 1.5 + 3.3 + 2.0 = 15.1. A dúvida de vendedor fica fora da conta: precisa decidir.
A ficha de crédito fica fora: precisa decidir e não tem hora apurada.)

**Primeiro agente esperado:** digitar pedido do WhatsApp no ERP. Maior número de horas,
sem decisão, dois sistemas com API, não toca dinheiro, não depende de credencial demorada.

## Contas que a captura precisa acertar

- 25 pedidos/dia × 4 min × 5 dias = 500 min/semana = **8.3 h**
- 3 conferências/semana × 30 min = 90 min = **1.5 h**
- 40 min/dia × 5 = 200 min = **3.3 h**
- 6 cadastros/semana × 20 min = 120 min = **2.0 h**
- Dúvida de vendedor: dono não soube. Vira faixa `1-5h (estimado)`, fica fora da conta.

## Verificação do roteiro

Rodando o roteiro contra a entrada da Distribuidora Vale Norte, cada bloco precisa ter
uma pergunta que produza o dado abaixo. Se um dado não tem pergunta que o arranque, o
roteiro está incompleto.

| Dado da entrada | Bloco que arranca |
|---|---|
| "contrataram 2 pessoas nos últimos 12 meses" | 1 |
| "Cleide responde por atendimento E cobrança" | 2 |
| "25 pedidos, 4 minutos cada, todo dia" | 3 |
| "ela confere se bateu" (trabalho que só existe porque algo falhou) | 3 |
| "a ficha de crédito ele decide na hora" | 3 |
| "WhatsApp → Bling" | 3 |
| "dono não soube dizer quanto tempo o Marcos gasta" | 3, com queda pra faixa |
| 15,1 h somadas na frente dele | 4 |
| digitar pedido escolhido como primeiro agente | 5 |
