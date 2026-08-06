---
name: irbis-raio-x-estrutura
description: "Conduz e captura a sessão paga de Raio-X de Estrutura: mapeia um departamento do cliente em jobs com horas e critério de decisão, soma quanto tempo por semana vai em trabalho que ninguém precisa decidir, e escolhe o primeiro agente a entregar. Use quando o Nicolas disser '/raio-x', 'vou fazer o raio-x do cliente X', 'terminei a sessão de raio-x', ou colar notas de uma sessão de mapeamento de estrutura."
---

# IRBIS — `/raio-x` (Consultoria de IA)

Spec: `docs/superpowers/specs/2026-08-05-raio-x-estrutura-design.md`.
Roteiro da sessão: `roteiro-sessao.md`. Formato da saída: `template-raio-x.md`.

**O que esta sessão é:** produto pago, cliente já fechado, um departamento por vez, e ela
só termina com um agente rodando. **O que ela não é:** a call gratuita de topo do site
(essa se chama diagnóstico) nem a peça gratuita "Raio-X de Cultura" já publicada em
`site/raio-x-cultura.html`. O nome completo do produto é **Raio-X de Estrutura** — use o
qualificador sempre que houver risco de confundir com a peça de cultura.

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
5. **Lembre o reenquadramento:** se o cliente emendar corte de gente no Bloco 4, a
   resposta é realocação, ali na sala, sem esperar o documento.

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
Frequência mensal usa o volume mensal direto, dividido por **4,33 semanas** (52 semanas
÷ 12 meses): `vezes por mês × minutos por vez ÷ 60 ÷ 4,33 = horas por semana`.

Quando a nota registra que o cliente não soube estimar, o campo vira faixa (`<1h`,
`1-5h`, `>5h`) com `(estimado)`, e o job **fica fora da conta final**, listado à parte
como não apurado. Nunca converta faixa em número.

Quando o job existe de verdade mas o tempo dele já está embutido em outro job já
contado — não dá pra medir separado sem inventar um número —, `horas_semana` recebe
`—`. Esse job também **fica fora da conta final** e entra na mesma lista de não
apurados, junto com as faixas estimadas.

Se o job absorvido tem `precisa_decidir = sim`, o job-pai não pode entrar inteiro na
conta como sem-decisão: ou separa as horas de decisão, ou o pai também vira `sim`.

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

## Regra de condução

O raio-x expõe gente cujo dia é 100% repetição, e o dono vai pensar em cortar na hora.
O enquadramento é **realocação, nunca corte**: a equipe é boa demais pra passar o dia
naquilo, e o que ela faz de melhor é decidir.

Isso não é delicadeza. Se a equipe suspeitar que o mapeamento serve pra demitir, ninguém
descreve a própria segunda-feira com honestidade, e o raio-x inteiro sai errado. A postura
protege o dado.

É por isso que o Bloco 4 (`roteiro-sessao.md`) soma o número na frente do cliente e depois
cala a boca de propósito: o silêncio é pra ele sentir o tamanho do problema, não uma deixa
pra cortar gente. Se ele emendar com corte ali, na sala, a resposta é a mesma desta regra —
reenquadre pra realocação, no ato, sem esperar o documento.

Se o Nicolas pedir o argumento de corte, recuse e diga o motivo prático.

## Proibições

- **Nunca** afirmar ROI, percentual de economia, horas economizadas ou valor em salário.
  Não existe entrega de sistema de IA medida. Nem no documento, nem na sala.
- **Nunca** transformar faixa estimada em número, nem somá-la na conta.
- **Nunca** gravar o resultado do cliente no repo da IRBIS.
- **Nunca** chamar esta sessão de "diagnóstico" (call gratuita do site) nem de só
  "Raio-X" sem qualificador quando puder confundir com a peça gratuita "Raio-X de
  Cultura" (`site/raio-x-cultura.html`).
- **Nunca** citar preço. O preço de cada frente segue pendente de definição do dono.
- **Nunca** citar prazo — cronograma, data de entrega ou estimativa de duração do que vier
  depois da sessão. Mesmo motivo do preço e do ROI: não existe entrega de sistema de IA
  medida, então não há base pra prometer prazo.
- **Nunca** fechar a sessão só com o mapa. Sem um agente rodando, isso é relatório, e
  relatório está fora de escopo desde 03/ago.
- **Nunca** estourar 3 caixinhas ou ~6 jobs por caixinha numa sessão. Corte e reagende.
