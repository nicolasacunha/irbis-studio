---
name: irbis-pos-reuniao
description: "Fecha o follow-up de uma call em até 3 minutos: transforma notas soltas, transcrição ou áudio em resumo estruturado gravado no Supabase, atualiza o card do pipeline e monta dois rascunhos de follow-up prontos pra aprovação. Use quando o Nicolas disser '/pos-reuniao', 'acabei a call com X', 'terminei a reunião', ou colar notas/transcrição de uma call que acabou de acontecer."
---

# IRBIS — `/pos-reuniao` (Supabase, Fase 2)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Spec completa: `irbis-os/fases/FASE-2-reunioes.md`,
seção 4. Funciona **sem depender do Calendar estar conectado** — o gatilho tanto pode vir do
vigia (`irbis-vigia-reunioes`, quando existir agendado) quanto de o Nicolas simplesmente
avisar que a call acabou.

**Meta: 3 minutos entre o fim da call e o follow-up aprovado.** Tudo aqui cabe na janela em
que o dono ainda lembra.

## 1. Recuperar contexto ANTES de processar

Busque a pessoa em `pessoas`, o card em `pipeline`, o histórico em `interacoes` e a proposta
mais recente em `propostas`, se houver. Você precisa saber, antes de ler qualquer nota nova: o
que estava combinado, o estágio, se já havia preço apresentado, o que estava pendente de cada
lado. Sem isso o resumo vira transcrição sem julgamento.

## 2. Extrair em 5 baldes

| Balde | Entra | NÃO entra |
|---|---|---|
| Decisões | o que ficou decidido, e quem decidiu | o que foi cogitado |
| Pendências dele | o que o cliente entrega, com prazo se houver | suposição de prazo |
| Pendências minhas | o que o dono prometeu, com prazo | tarefa que ninguém assumiu |
| Sinais de compra | fala literal: urgência, orçamento, decisor presente, pergunta de implementação | leitura de humor |
| Sinais de risco | fala literal: comitê, "vou pensar", sócio ausente, comparação com concorrente | pessimismo genérico |

Cada item dos baldes 4 e 5 carrega a citação que o sustenta. Sinal sem citação não entra.

## 3. Gravar em `interacoes`

```
POST /rest/v1/interacoes
{
  "pessoa_id": "<uuid>",
  "canal": "call",
  "direcao": "recebido",
  "resumo": "<resumo estruturado dos 5 baldes>",
  "artefato_url": "<link da transcrição/áudio, se houver>",
  "origem_do_registro": "pos-reuniao"
}
```

## 4. Atualizar o card (`pipeline`)

`ultimo_contato_real` = data da call · `degrau_escada` = null (zera) · `proximo_passo` e
`data_proximo_toque` **obrigatórios**, derivados das decisões — nunca deixe vazio · temperatura
recalculada com o motivo em até 4 palavras. **Estágio você propõe, não executa** — pergunta de
1 caractere. `fechado` e `perdido` nunca são setados aqui.

## 5. Rascunhos (ASK), duas versões — grave ambos em `aprovacoes`

- **[A] e-mail** — assunto curto sem a palavra "follow-up", corpo de 2 a 3 linhas, pendências
  dos dois lados. Este é o que o sistema poderia enviar (só com aprovação).
- **[B] versão curta** — uma pendência só, a mais importante. Este o dono copia manualmente
  pro canal que o sistema não lê (WhatsApp).

Conteúdo obrigatório dos dois: (1) uma linha que prova que você ouviu, usando as palavras
dele; (2) o que acontece a seguir, com data; (3) o que você precisa dele, se precisa. Nada
mais — não repita preço já apresentado, não recapitule a call inteira, não agradeça duas
vezes. Siga a voz de `irbis-brand-voice` (sem travessão, sem palavra banida).

## 6. Flags automáticas

| Detectou | Flag |
|---|---|
| pedido de funcionalidade fora do escopo combinado | **ESCOPO NOVO.** Cotação à parte — você registra e cota, a formalização é com o Nicolas |
| decisor ausente da call | **DECISOR.** propõe call de 15 min com os dois |
| objeção de preço | **PREÇO.** roteia pra conversa ao vivo. Não redija mensagem com número |
| pediu proposta | **PROPOSTA.** o prazo de 24h começa agora |
| "vou pensar" sem data | **SEM DATA.** propõe a pergunta de diagnóstico (valor, momento ou escopo?) |
| cliente ativo elogiou a entrega | **JANELA QUENTE.** depoimento + indicação na mesma conversa |
| pediu item fora de escopo da casa | **FORA DE ESCOPO.** prepare a negativa, nunca a oferta |

## 7. Saída

```
CALL · {{nome}} · {{data}} · {{duração}}
DECISÕES / PENDÊNCIAS (dele e minhas, com prazo)
SINAIS  compra: "{{citação}}"  ·  risco: "{{citação}}"
CARD  último contato → {{data}} · próximo passo → {{...}} · próximo toque → {{data}}
      proposta: estágio {{X}} → {{Y}}? (s/n)
FLAGS: {{...}}
RASCUNHO [A] e-mail (eu envio) · RASCUNHO [B] curto (você copia)
os dois parados. aprovar: "manda A" · "manda A e B"
```

## Modo memória curta

Quando o Nicolas só diz "acabei a call com X" sem notas, **não invente a call.** No máximo 4
perguntas, resposta curta, nesta ordem de valor:

```
1. O que ficou decidido?
2. O que você prometeu entregar, e quando?
3. Ele deu algum sinal de prazo ou orçamento? (a frase dele, se lembrar)
4. Próximo passo e data?
```

Se ele responder só 1 e 4, isso já basta: registre o que veio, marque o resto como "não
capturado", siga. Registro parcial é infinitamente melhor que nenhum.

## Proibições

Não escreva "reunião produtiva" nem qualquer avaliação de clima. Não crie pendência que
ninguém assumiu. Não mova estágio sozinho. Não envie nada, nem convite de próxima call, até
aprovação explícita citando o identificador. Não deixe a call sem próximo passo com data: se
o dono não sabe, isso é decisão pendente em aberto, não campo vazio.
