# Custo de IA do Bot: estimativa por volume

> Criado em 12/ago/2026. Fecha a pendência aberta na `politica-de-preco-irbis.md`: **o que responder quando o cliente perguntar "além dos R$ 500, quanto mais eu pago?"**
>
> ⚠️ **Isto é estimativa calculada, não medição.** O consumo real do bot da Odery não pôde ser medido (a conta é do cliente e a IRBIS não tem acesso ao painel). As premissas estão todas declaradas abaixo, então qualquer uma pode ser trocada e a conta refeita.

## Quem paga

O cliente, direto ao provedor. Não entra na margem da IRBIS. Ver Cláusula 9.1 do contrato modelo.

## As premissas (troque e recalcule)

| Premissa | Valor usado | Por quê |
|---|---|---|
| Modelo | **Claude Haiku 4.5** ($1,00 por milhão de tokens de entrada, $5,00 de saída) | É o modelo certo pra bot de atendimento: rápido e barato. Ver a ressalva sobre modelo mais caro abaixo |
| Prompt de sistema | 5.000 tokens | Instruções, regras do negócio, catálogo, tom de voz |
| Mensagem do cliente | ~50 tokens | Frase curta de WhatsApp |
| Resposta do bot | ~150 tokens | Resposta útil e objetiva |
| Cache de prompt | Ligado | Leitura de cache custa 10% do preço de entrada |
| Cotação | **R$ 5,50 por dólar** | ⚠️ Assumida. Confira a do dia e refaça a multiplicação |

## Custo por conversa

Uma conversa é uma sequência de idas e voltas. O custo cresce com o número de turnos, porque cada turno reenvia o histórico.

| Tipo de conversa | Turnos | Custo em dólar | Em real |
|---|---|---|---|
| Curta (tira uma dúvida e sai) | 3 | US$ 0,010 | R$ 0,06 |
| Média (pergunta, responde, confirma) | 6 | US$ 0,017 | R$ 0,09 |
| Longa (negocia, muda de ideia, fecha) | 12 | US$ 0,035 | R$ 0,19 |

**Ordem de grandeza pra guardar: entre 6 e 19 centavos de real por conversa.**

## Custo mensal por volume

| Conversas por mês | Cenário econômico | Cenário caro |
|---|---|---|
| 500 | R$ 28 | R$ 96 |
| 1.000 | R$ 55 | R$ 193 |
| 3.000 | R$ 165 | R$ 578 |
| 10.000 | R$ 550 | R$ 1.925 |

O cenário econômico assume conversas curtas; o caro assume conversas longas. A realidade de um cliente típico fica no meio.

## A fala pronta pra reunião

> Além dos R$ 500 por mês, você paga o consumo da nuvem direto no seu cartão, e isso varia com quanto o bot trabalha. Pra um volume de umas mil conversas por mês, fica em torno de R$ 50 a R$ 150. Se o bot atender muito mais que isso, sobe proporcionalmente, e eu te aviso antes de virar surpresa. A conta fica no seu nome desde o primeiro dia, então você vê tudo.

## Três coisas que mudam a conta de verdade

**1. O modelo escolhido é a maior alavanca, e não é decisão técnica, é comercial.** Trocar Haiku por Sonnet multiplica o custo por três; por Opus, por cinco. Um bot de atendimento a dúvidas frequentes não precisa do modelo mais caro. Como quem paga é o cliente, **essa escolha vira argumento de venda**: usar o modelo certo é economia que ele sente na fatura.

**2. O prompt de sistema precisa passar de 4.096 tokens para o cache funcionar no Haiku 4.5.** Abaixo disso o cache simplesmente não ativa, sem erro e sem aviso, e a conta do cliente sobe cerca de 40%. É requisito de implementação, não detalhe: prompt curto demais é mais caro que prompt longo bem escrito.

**3. Imagem e áudio mudam a ordem de grandeza.** As contas acima são só texto. Cliente que manda foto de produto ou áudio consome muito mais. Se o bot precisar tratar mídia, a estimativa precisa ser refeita antes de ir pra proposta.

## O que ainda falta medir

1. **Qual modelo o bot da Odery usa.** Sem isso, não dá pra validar a estimativa contra um caso real. Basta uma pergunta ao Maurício, ou acesso de leitura ao painel de billing.
2. **Volume real de conversas de um cliente típico.** A tabela cobre de 500 a 10.000 por mês porque não existe um número medido.
3. **Se algum bot precisa de mídia.**

## Consequência operacional que decorre disso

A Cláusula 9.1 obriga o Prestador a **informar estimativa antes do início e avisar em variação relevante**. Para cumprir isso, o acesso de leitura ao billing do cliente precisa entrar na lista de acessos da Fase 5 do método (`acessos.md`), junto com Vercel e Supabase.

Sem esse acesso, a cláusula é impossível de cumprir: não dá para avisar sobre uma variação que não se enxerga. Foi exatamente o que aconteceu na Odery.

## Teto de uso (Cláusula 9.2)

O lugar está reservado no contrato e continua vazio. Com a tabela acima, dá pra propor um: um teto em conversas por mês, com o excedente cotado à parte, protege o cliente da surpresa e a IRBIS da conversa difícil no mês 2. O número é decisão do dono.
