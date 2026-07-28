---
name: irbis-nova-proposta
description: "Monta proposta comercial da IRBIS a partir de um lead no Supabase: portão de entrada com 6 itens obrigatórios, precificação passo a passo com a conta mostrada, estrutura fixa (problema, sistema, escopo, investimento, condições) e anexo de escopo comercial. Use quando o Nicolas disser '/nova-proposta [lead]', 'monta a proposta do', ou pedir pra precificar/propor um projeto pra alguém do funil."
---

# IRBIS — `/nova-proposta [pessoa]` (Supabase, Fase 5)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Spec completa: `irbis-os/fases/FASE-5-financeiro.md`,
seção 1. Preços e faixas: núcleo do sistema (ver o próprio arquivo da fase) — **nunca invente
faixa, sempre confira contra a tabela publicada**.

## 1. Portão de entrada — não negociável

Antes de montar qualquer coisa, confira em `interacoes`/`pipeline`/dossiê:

```
[ ] Houve reunião registrada com este lead (interacoes, canal=call)
[ ] O problema do cliente está registrado nas palavras dele (citação, não paráfrase)
[ ] De onde vêm os clientes dele hoje
[ ] Quanto vale um cliente novo para ele
[ ] Quem decide
[ ] Tipo de projeto identificado
```

Faltando qualquer item: liste os que faltam, uma linha cada, e **pare** — não monte estrutura
"enquanto isso". Só monte com lacuna se o Nicolas mandar explicitamente ("monta assim mesmo");
nesse caso, marque cada seção afetada com `⚠ SEM DADO`.

## 2. Precificação, passo a passo (mostre a conta sempre)

1. **Piso público primeiro.** Nunca cotar abaixo do "a partir de" publicado em irbis.com.br.
2. **Classifique o tipo.** Integração muda de FAIXA, nunca é modificador dentro da mesma
   faixa (institucional + agendamento = "com integrações", não institucional caro).
3. **Calibre dentro da faixa:** site como canal de venda principal → topo/acima; site como
   cartão de visitas → base.
4. **Modificadores:** copy do zero, prazo apertado, mais de um idioma.
5. **Charm pricing:** termina em 7 ou 9, sempre.
6. **Teto real = WTP revelada** (o que ele já recusou/pagou em outro lugar, tirado de
   `interacoes` com a citação e a data).

Saída obrigatória, a conta explícita:

```
PREÇO SUGERIDO: R$ {{valor}}
  tipo: {{...}} → faixa {{min}} a {{max}} ({{nota sobre integração, se aplicável}})
  calibragem: {{motivo}}
  modificadores: {{...}}
  charm ✓ · acima do piso absoluto (R$2.997) ✓
  WTP revelada: {{citação com data}} → teto
```

**Proibições:** nunca horas/dias · nunca ancorar em número de terceiro que o Nicolas não
sustenta · **nunca desconto por escrito** — desconto e ancoragem só ao vivo.

**A quebra que ancora:** se houver recorrência vendável, apresente sempre
`Build + Acompanhamento (n × mensal) = Projeto completo`. Todo número vem das tabelas do
núcleo — número redondo fora da tabela é sinal de invenção.

## 3. Estrutura da proposta (ordem fixa)

Título em CAPS: nome do cliente + o que será feito.

1. **PROBLEMA** — com as palavras dele, citadas. Implicação em dinheiro se ele deu na call.
2. **SISTEMA** — o que muda na operação dele, não lista de tecnologia.
3. **ESCOPO** — numerado, e **o que fica de fora**, explícito.
4. **INVESTIMENTO** — o número, explicado uma vez, sem rejustificar.
5. **CONDIÇÕES** — forma de pagamento, entrada antes do início, prazo (só o que o site
   publica), validade, o que pausa o relógio.

Encerramento verbatim: "Esse é o projeto. Quando quiser começar, é só falar." Nunca "aguardo
retorno" nem "estou à disposição".

## 4. Anexo de escopo (comercial, não jurídico)

`O que é` → `Usuários` → `Módulos incluídos` (numerados) → `Integrações permitidas` →
`Infraestrutura` (contas em nome de quem) → `O que fica fora` (item a item) → `Prazo` →
`Entrega`.

**Lei do Anexo:** o que não está escrito não está vendido. Módulo que você não consegue
descrever com precisão suficiente pra alguém julgar "está pronto" não entra — marque como
pendência de levantamento em vez de forçar.

## 5. Ao aprovar (ASK — você nunca envia)

```
POST /rest/v1/propostas
{ "pessoa_id": "<uuid>", "pipeline_id": "<uuid>", "tipo": "...", "valor": <n>,
  "data_envio": "<hoje>", "validade": "<hoje+15>", "status": "enviada", "condicoes": "..." }
PATCH /rest/v1/pipeline?id=eq.<uuid>  { "estagio": "proposta" }
```

Arme (registre como próximo passo do card): vigia de silêncio D+3, alerta de validade T-3,
post-mortem no momento da decisão. Você monta e para — o envio ao cliente é ato do Nicolas.

## Proibições gerais

Nunca cite cláusula, multa, rescisão. Nunca gere PDF/documento assinável (fora do sistema).
Nunca mostre preço fora da tabela do núcleo. Nunca proponha sem os 6 itens do portão, salvo
ordem explícita.
