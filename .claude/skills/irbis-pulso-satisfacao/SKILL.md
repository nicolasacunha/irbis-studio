---
name: irbis-pulso-satisfacao
description: "Executa o momento 'Pulso de satisfação' do pós-venda IRBIS (Supabase, marco fixo entrega+30d): monta o rascunho das duas perguntas de nota, processa a resposta que o Nicolas cola de volta na sessão (WhatsApp/e-mail, não existe formulário), registra em interacoes, marca o marco cumprido e ramifica — nota alta prepara pedido de depoimento + indicação citando algo específico do projeto, nota baixa prepara só 'o que faltou pra ser 10?'. Não é rotina independente: é chamada pela irbis-carteira quando o marco 'Pulso de satisfação' vence em marcos (data_planejada<=hoje, data_real nulo). Use quando a irbis-carteira sinalizar esse marco, ou quando o Nicolas disser '/pulso [cliente]', 'manda o pulso pro [cliente]', ou colar a nota que um cliente respondeu."
---

# IRBIS — Pulso de Satisfação (Supabase, Fase 4)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Momento definido em `irbis-carteira` §4 e
`irbis-os/fases/FASE-4-carteira.md` §4 (linha "Pulso de satisfação"). Esta skill não redefine
o formato — ela **executa** o que já está especificado ali: duas perguntas de nota, nota alta
abre janela de depoimento, nota baixa gera só "o que faltou pra ser 10?".

## 0. Quando dispara

Normalmente **não** é chamada direto. A `irbis-carteira`, ao rodar o vigia, encontra a linha
`marcos` com `nome='Pulso de satisfação'`, `data_planejada<=hoje`, `data_real is null` e
delega aqui. Só rode isolada quando o Nicolas pedir explicitamente ("/pulso [cliente]") ou
colar uma resposta de pulso sem contexto prévio na sessão — nesse segundo caso, pule direto
pro Passo 3.

## 1. Carregar o marco e o projeto

```bash
source irbis-os/.secrets/supabase.env
curl -s "${SUPABASE_URL}/rest/v1/marcos?select=*,projetos(*,pessoas(nome,empresa,email,telefone))&nome=eq.Pulso%20de%20satisfação&data_real=is.null&data_planejada=lte.$(date +%F)" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
```

Sem resultado → nada a fazer, reporte `✅ LIDO marcos — 0 pulsos vencidos` e pare. Com
resultado, para cada linha: `pessoa = projetos.pessoas`, `projeto = projetos`.

## 2. Montar e gravar o rascunho do pulso (grava em `aprovacoes`, nunca envia)

Duas perguntas de nota, curtas, sem parecer pesquisa de empresa grande. Canal: `whatsapp` se
`pessoas.telefone` existir, senão `email`. Nunca abrir com "Olá, tudo bem?" (Manual de Copy
§08).

```
{{nome}}, uma pergunta rápida sobre o {{projeto.nome}}: de 0 a 10, quanto você indicaria a
IRBIS pra outro negócio? E de 0 a 10, o quanto o que foi entregue resolveu o que você
precisava? Sem pesquisa longa, só isso.
Nicolas
```

```bash
curl -s -X POST "${SUPABASE_URL}/rest/v1/aprovacoes" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "identificador": "pulso-satisfacao-<projeto_id>",
    "criado_por": "irbis-pulso-satisfacao",
    "pessoa_id": "<pessoa_id>",
    "canal": "whatsapp",
    "gatilho": "marco Pulso de satisfação venceu em <data_planejada>",
    "corpo": "<mensagem acima>",
    "fatos_dependentes": ["marcos.id=<marco_id>", "projetos.nome=<projeto.nome>"]
  }'
```

Pare aqui até a nota voltar. Isso não é um envio — é o rascunho parado esperando aprovação do
Nicolas (Lei 1), que ele manda por fora desta skill.

## 3. A nota volta colada — como processar

Não existe formulário nem webhook: a resposta chega no WhatsApp/e-mail do cliente e o Nicolas
cola o texto de volta nesta sessão. Procure dois números de 0 a 10 no texto colado, na ordem
em que aparecem — primeiro é "indicaria" (nota A), segundo é "resolveu" (nota B). Se o texto
citar as notas fora de ordem ou junto de comentário livre ("nota 8 pra indicação, 9 pro
resultado"), use o que estiver explicitamente rotulado em vez da ordem de aparição.

Achou só um número, ou o texto é ambíguo (ex.: "foi ótimo" sem nota) → pare e pergunte ao
Nicolas: `Só achei uma nota clara ({{n}}) no que você colou. Confirma que é a das duas
perguntas, ou pede a segunda pro cliente?` Nunca infira a segunda nota a partir do tom do
texto.

**Corte:** nota alta = **as duas notas ≥ 9**. Qualquer nota abaixo de 9 em qualquer uma das
duas perguntas = nota baixa. É proposital ser mais rígido que NPS clássico — a janela de
depoimento só abre com sinal limpo dos dois lados.

## 4. Registrar em `interacoes` e marcar o marco cumprido

```bash
curl -s -X POST "${SUPABASE_URL}/rest/v1/interacoes" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "pessoa_id": "<pessoa_id>",
    "canal": "whatsapp",
    "direcao": "recebido",
    "resumo": "Pulso de satisfação — {{projeto.nome}}: nota indicaria={{A}}, nota resolveu={{B}}.",
    "origem_do_registro": "sistema"
  }'

curl -s -X PATCH "${SUPABASE_URL}/rest/v1/marcos?id=eq.<marco_id>" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"data_real":"<hoje>"}'
```

`origem_do_registro='sistema'` — a nota chegou por canal humano, mas quem está registrando é
esta skill, não o Nicolas digitando manualmente (`registrar`) nem um vigia de rotina (`vigia`).

## 5. Nota alta — prepara depoimento + indicação (rascunho, nunca envia)

Nota alta é janela quente (mesma regra da `irbis-carteira` §5: "cliente elogia a entrega →
depoimento + indicação na mesma conversa, a janela é curta"). Antes de escrever o pedido, ache
**um detalhe específico** do projeto, nesta ordem de fonte:

1. O próprio texto que o cliente colou na nota B, se citar algo concreto ("resolveu o
   problema de X")
2. `interacoes.resumo` perto de `projetos.data_entrega_real` (mesma busca da `irbis-carteira`
   §2)
3. `projetos.nome` + `projetos.tipo`, só se as duas anteriores não trouxerem nada — nesse
   caso o pedido é mais fraco e a skill sinaliza isso no relatório interno, nunca finge que
   achou algo melhor

**Nunca "adorei trabalhar com vocês" genérico.** O pedido cita o que foi resolvido, não a
experiência de trabalhar junto.

```
{{nome}}, que bom. Topa eu usar isso? Uma frase sobre {{detalhe específico — ex: "quanto tempo
o {{sistema}} tirou do seu dia" ou "o que mudou depois que a página foi pro ar"}}, com seu nome
e {{empresa}}, vira case. E se tiver alguém que também precisa disso, me passa o contato — eu
cuido do resto.
Nicolas
```

```bash
curl -s -X POST "${SUPABASE_URL}/rest/v1/aprovacoes" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "identificador": "depoimento-indicacao-<projeto_id>",
    "criado_por": "irbis-pulso-satisfacao",
    "pessoa_id": "<pessoa_id>",
    "canal": "whatsapp",
    "gatilho": "pulso de satisfação nota alta (indicaria=<A>, resolveu=<B>) em <hoje>",
    "corpo": "<mensagem acima>",
    "fatos_dependentes": ["interacoes.id=<id da fonte usada>"]
  }'
```

## 6. Nota baixa — só a pergunta extra

Nenhuma oferta, nenhuma cobrança, nenhum pedido nessa mensagem — só a pergunta, sem tentar
consertar nada ainda.

```
{{nome}}, entendido. O que faltou pra ser 10?
Nicolas
```

```bash
curl -s -X POST "${SUPABASE_URL}/rest/v1/aprovacoes" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "identificador": "pulso-baixo-<projeto_id>",
    "criado_por": "irbis-pulso-satisfacao",
    "pessoa_id": "<pessoa_id>",
    "canal": "whatsapp",
    "gatilho": "pulso de satisfação nota baixa (indicaria=<A>, resolveu=<B>) em <hoje>",
    "corpo": "<mensagem acima>",
    "fatos_dependentes": []
  }'
```

No relatório desta skill, sinalize nota baixa como o que é — risco de carteira, não um número
qualquer: entra na mesma linguagem de alerta que a `irbis-carteira` usa pra 90d sem toque
(decisão pendente explícita), mesmo que o marco de dias-sem-toque não tenha vencido.

## 7. Formato de saída

```
FRONTEIRA DOS DADOS · {{data}} {{hora}} America/Sao_Paulo
✅ LIDO Supabase — marcos (Pulso de satisfação, {{n}} vencidos)

PULSO · {{cliente}} · {{projeto}}
  → RASCUNHO [X] das 2 perguntas pronto em aprovacoes   (se nota ainda não voltou)

  ou, com nota já processada:
  notas: indicaria={{A}} · resolveu={{B}} → {{ALTA/BAIXA}}
  registrado em interacoes · marco marcado cumprido em {{hoje}}
  → RASCUNHO [X] {{depoimento+indicação / "o que faltou"}} pronto em aprovacoes
```

## Proibições

Nunca enviar a mensagem de pulso, a de depoimento/indicação ou a de nota baixa sozinha — as
três são sempre rascunho em `aprovacoes`, status `parado`. Nunca inferir a segunda nota a
partir do tom do texto colado; sem os dois números claros, pergunte. Nunca pedir depoimento com
elogio genérico ("adorei trabalhar com vocês") — sempre um detalhe específico, e se não achar
um bom, diga isso no relatório em vez de inventar. Nunca misturar a pergunta "o que faltou pra
ser 10?" com desculpa, oferta ou tentativa de reverter a nota na mesma mensagem. Nunca tratar
nota baixa como assunto encerrado sem sinalizar risco no relatório. Nunca gravar em `marcos`
sem ter processado as duas notas primeiro — `data_real` só é preenchida depois do Passo 4.
