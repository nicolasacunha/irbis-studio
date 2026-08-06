---
name: irbis-raio-x-estrutura
description: "Conduz e captura a sessão paga de Raio-X de Estrutura: mapeia um departamento do cliente em jobs com horas e critério de decisão, soma quanto tempo por semana vai em trabalho que ninguém precisa decidir, e escolhe o primeiro agente a entregar. Use quando o Nicolas disser '/raio-x', 'vou fazer o raio-x do cliente X', 'terminei a sessão de raio-x', ou colar notas de uma sessão de mapeamento de estrutura."
---

# IRBIS — `/raio-x` (Consultoria de IA)

Spec: `docs/superpowers/specs/2026-08-05-raio-x-estrutura-design.md`.
Roteiro da sessão: `roteiro-sessao.md`. Formato da saída: `template-raio-x.md`.

**O que esta sessão é:** produto pago, cliente já fechado, um departamento por vez, e ela
só termina com um agente rodando. **O que ela não é:** a call gratuita de topo do site.
Aquela se chama diagnóstico; esta se chama Raio-X. Nunca troque os nomes.

## Modo preparo — antes da call

Dispara quando o Nicolas avisa que vai fazer uma sessão.

1. **Puxe o que já existe do cliente:** `pessoas`, `pipeline` e `interacoes` no Supabase
   (conexão em `irbis-os/CONEXAO-SUPABASE.md`), mais o campo do formulário da `/call` onde
   ele descreveu o processo travado. Se não houver registro nenhum, diga isso em uma linha
   em vez de inventar contexto.
2. **Cuspa o roteiro dos 5 blocos** de `roteiro-sessao.md`, com as perguntas por extenso —
   ele vai ler isso durante a call, então referência a arquivo não serve.
3. **Adapte o Bloco 1:** se o formulário já nomeou a área travada, a pergunta principal
   vira confirmação em vez de descoberta.
4. **Repita o teto de escopo** no fim: 3 caixinhas, ~6 jobs por caixinha.

Nunca instrua o Nicolas a digitar durante a call. A captura acontece depois.

## Modo captura — depois da call

Dispara quando o Nicolas cola notas, transcrição ou áudio transcrito de uma sessão.

### 1. Quebrar a semana em jobs

Cada tarefa descrita vira uma linha. O nome do job é **verbo no infinitivo + objeto**:
"digitar pedido do WhatsApp no ERP", nunca "atendimento", nunca "comercial".

Se a nota descreve um cargo em vez de um trabalho, não invente o job — registre como
lacuna e pergunte ao Nicolas.

### 2. Calcular horas, nunca perguntar por elas

A nota traz volume e duração. Você faz a conta:

`vezes por dia × minutos por vez × 5 dias ÷ 60 = horas por semana`

Uma casa decimal. Frequência semanal usa o volume semanal direto, sem multiplicar por 5.

Quando a nota registra que o cliente não soube estimar, o campo vira faixa (`<1h`,
`1-5h`, `>5h`) com `(estimado)`, e o job **fica fora da conta final**, listado à parte
como não apurado. Nunca converta faixa em número.

### 3. Classificar

| Situação na nota | classificacao |
|---|---|
| Sequência conhecida, mesma ordem, ninguém escolhe caminho | `100% IA` |
| Alguém escolhe olhando o caso, mas o preparo é repetitivo | `Humano + IA` |
| A decisão é o trabalho | `Humano lidera` |

`precisa_decidir = sim` nunca recebe `100% IA`.

### 4. Somar a conta

Soma apenas jobs com `precisa_decidir = não` **e** `horas_semana` numérico. O resultado é
uma frase só: "N horas por semana em trabalho onde ninguém precisa decidir."

### 5. Ordenar o ataque e escolher o primeiro agente

Ranqueie por horas × ausência de decisão ÷ esforço. Sobre o topo da lista, aplique os
três cortes: credencial demorada, dinheiro, sistema fechado. O primeiro que passar nos
três é o primeiro agente.

Se nenhum passar, diga isso explicitamente e proponha a versão reduzida (rascunha, não
envia). Não empurre pra sessão seguinte sem avisar.

### 6. Escrever a saída

Preencha `template-raio-x.md` e grave **na pasta local do projeto do cliente**, nunca no
repo. Se o Nicolas não disser onde, pergunte o caminho — não escolha por ele.
