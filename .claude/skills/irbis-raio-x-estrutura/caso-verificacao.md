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

Rodando o roteiro contra a entrada da Distribuidora Vale Norte, cada dado abaixo precisa
ter uma pergunta literal em `roteiro-sessao.md` que o arranque. Se a pergunta citada não
existir mais no arquivo (um `grep -F` pelo trecho falha), a verificação quebrou — a coluna
de bloco sozinha não pega isso, porque outras perguntas do mesmo bloco continuam de pé.

| Dado da entrada | Bloco | Pergunta literal que arranca |
|---|---|---|
| "contrataram 2 pessoas nos últimos 12 meses" | 1 | "Onde você contratou mais gente nos últimos 12 meses?" |
| "Cleide responde por atendimento E cobrança" | 2 | "Me lista as frentes dessa área e quem responde por cada uma." |
| "25 pedidos, 4 minutos cada, todo dia" | 3 | "Isso acontece todo dia ou só segunda?" + "Quantas vezes por dia, e quanto tempo cada vez?" |
| "ela confere se bateu" (trabalho que só existe porque algo falhou) | 3 | "O que vocês fazem que só existe porque alguma coisa deu errado antes?" |
| "a ficha de crédito ele decide na hora" | 3 | "Nessa hora ele decide alguma coisa, ou executa uma sequência que já é conhecida?" |
| "WhatsApp → Bling" | 3 | "Ele tira de onde e põe onde?" |
| "dono não soube dizer quanto tempo o Marcos gasta" | 3, com queda pra faixa | "isso é menos de 1 hora, entre 1 e 5, ou mais de 5 por semana?" |
| 15,1 h somadas na frente dele | 4 | "esse departamento gasta N horas por semana em [trabalho onde ninguém precisa decidir]" (não é pergunta ao cliente — é o que o Nicolas diz em voz alta na sala) |
| digitar pedido escolhido como primeiro agente | 5 | "Escolha por horas × ausência de decisão ÷ esforço" (não é pergunta ao cliente — é o critério de decisão do Bloco 5) |

## Verificação do modo preparo

Gatilho: "vou fazer o raio-x da Distribuidora Vale Norte na quinta, comercial interno."

A saída precisa conter, obrigatoriamente:
1. Os 5 blocos na ordem, com a duração de cada um.
2. A pergunta principal do Bloco 1 escrita por extenso, não referenciada.
3. O que já se sabe do cliente puxado do que existir em `pessoas`/`pipeline`, ou a
   declaração explícita de que não há registro.
4. O teto de escopo (3 caixinhas, ~6 jobs) escrito.
5. Nenhuma menção a preço, ROI ou horas economizadas.

A saída NÃO pode conter:
- A palavra "diagnóstico" se referindo a esta sessão.
- Instrução de digitar durante a call.
