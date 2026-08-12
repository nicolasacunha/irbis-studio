# Escada de follow-up da IRBIS

> Criado em 12/ago/2026 por decisão do dono. **Este documento é o árbitro de cadência.** Substitui as seis cadências divergentes que circulavam no repo e fecha a lacuna nomeada em `docs/manual-operacoes-irbis.md`.

## A regra, em uma linha

**O intervalo é sempre o mesmo. O que muda por estágio é o conteúdo de cada toque.**

Uma escada só, cinco degraus, mesmos dias para todo mundo. Isso existe para que ninguém precise decidir "quando mando de novo" no meio do dia.

## A escada

| Degrau | Dia | Objetivo | Canal |
|---|---|---|---|
| 1 | D+0 | Registrar o combinado enquanto a conversa está quente | O mesmo canal da conversa |
| 2 | D+3 | Entregar algo novo, sem cobrar resposta | Canal diferente do degrau 1 |
| 3 | D+7 | Trazer contexto ou prova e fazer uma pergunta fechada | Áudio ou ligação |
| 4 | D+14 | Nomear o silêncio e oferecer a saída | O canal onde ele mais respondeu |
| 5 | D+21 | Breakup. Encerra a escada | Texto, curto |

**D+0 é o dia do evento**, não o dia em que você lembrou. O evento é o que abriu o ciclo: a reunião aconteceu, a proposta foi enviada, o indicado foi apresentado, o primeiro contato frio saiu.

Dias corridos, não úteis. Se cair em fim de semana, sobe para a segunda.

## Regras que valem em todos os degraus

1. **Todo toque carrega algo além da cobrança.** Um dado, um exemplo, um recorte do problema dele. Mensagem que só pergunta "conseguiu ver?" queima o degrau sem comprar nada.
2. **Nunca dois degraus no mesmo canal seguido.** Se o D+3 foi WhatsApp, o D+7 é ligação ou áudio.
3. **Uma pergunta por mensagem.** Duas perguntas viram nenhuma resposta.
4. **O breakup é real.** Depois do D+21 o lead sai da escada. Não existe degrau 6.
5. **Um "não" explícito encerra a escada na hora**, em qualquer degrau. Registra o motivo e agradece.
6. **Todo toque vira linha em `interacoes` no Supabase, no mesmo dia.** Toque não registrado é toque que não aconteceu, e é a causa raiz de a revisão semanal medir preparação em vez de conversão.

## O conteúdo por estágio

### A. Prospecção fria (nunca conversou com você)

| Degrau | Conteúdo |
|---|---|
| D+0 | Abertura com um gargalo específico que você observou na operação dele. Sem pitch, sem preço, sem apresentação da IRBIS |
| D+3 | Um exemplo concreto de como esse gargalo é resolvido, de um negócio parecido. Sem pedir nada |
| D+7 | Ligação. Se não atender, áudio curto com a mesma pergunta que faria ao vivo |
| D+14 | "Percebi que isso talvez não seja prioridade agora. Faz sentido eu voltar em [mês]?" |
| D+21 | Breakup: "Vou parar de te procurar. Se em algum momento [gargalo] virar prioridade, é só me chamar." |

### B. Reunião aconteceu, proposta na mesa

Este é o estágio mais caro. Um lead aqui já custou uma hora do Nicolas.

| Degrau | Conteúdo |
|---|---|
| D+0 | Áudio no mesmo dia da reunião, recapitulando o gargalo dele com as palavras dele e confirmando o que foi combinado. A proposta escrita segue em até 24h |
| D+3 | Um detalhe a mais do escopo, ou a resposta antecipada da objeção que apareceu na reunião |
| D+7 | Ligação. Pergunta fechada: "O que ficou faltando pra ser sim?" |
| D+14 | Isola a objeção real: "Se o valor não fosse o ponto, você faria? Quero saber se o problema é o preço ou o momento" |
| D+21 | Breakup com porta aberta e data: "Vou encerrar a proposta. Posso te procurar em [mês]?" |

### C. Reunião aconteceu, sem proposta (reprovou na triagem ou não é o momento)

| Degrau | Conteúdo |
|---|---|
| D+0 | Agradece e manda o material combinado no encerramento |
| D+7 | Um conteúdo útil ligado ao gargalo dele. Sem pergunta comercial |
| D+21 | "Continua fazendo sentido eu te procurar quando [gatilho concreto] acontecer?" |

Aqui os degraus D+3 e D+14 são pulados de propósito. Lead sem timing não precisa de pressão, precisa de memória.

### D. Indicação

| Degrau | Conteúdo |
|---|---|
| D+0 | Contato com o indicado em até 24h do encaminhamento, citando quem indicou logo na primeira linha |
| D+3 | Toque de volta **no cliente que indicou**, contando que você falou com a pessoa. Isso mantém a rede quente |
| D+7 | Ligação para o indicado |
| D+14 | "O [nome do cliente] comentou que vocês têm [gargalo]. Ainda faz sentido conversar?" |
| D+21 | Breakup com o indicado. **Nunca com quem indicou** |

### E. Base longa (pós-breakup e clientes antigos)

Fora da escada. **Um toque a cada 30 dias, sem pedir nada.** Um resultado que você entregou, um dado do setor dele, uma pergunta sobre o negócio dele. O objetivo é continuar existindo, não vender.

Um cliente sem próximo toque marcado é um cliente perdido em 90 dias.

## Antes da reunião: confirmação de comparecimento

Não é follow-up, é o que protege a hora do Nicolas. Cada no-show custa uma manhã.

1. Convite de agenda enviado na hora do agendamento, com o link.
2. **Pedir confirmação explícita, nunca só avisar.** "Confirma pra mim que às [hora] você está?" em vez de "te espero às [hora]".
3. Véspera: mensagem entre 8h45 e 9h45. Reunião no mesmo dia: entre 14h30 e 17h.
4. Postura de agenda cheia. Remarcação existe, mas não é oferecida.
5. Agenda curta. Mesmo dia é melhor que D+1, que é melhor que D+2.

## Quem executa

| Etapa | Quem | Aprovação |
|---|---|---|
| Degraus da escada em qualquer estágio, usando os modelos deste doc | Colaborador | **Dispara direto, sem aprovação** |
| Mensagem que sai do modelo (negociação, condição especial, objeção nova) | Colaborador escreve | Nicolas aprova antes |
| Áudio de D+0 pós-reunião | Nicolas | Ele mesmo |
| Registro em `interacoes` | Quem mandou, no mesmo dia | Não tem |

> ✅ **Aprovado pelo dono em 12/ago/2026.** O colaborador dispara os degraus padrão sem esperar aprovação. Isso substitui o modelo anterior, em que todo rascunho ficava na fila: a semana S32 mediu quatro rascunhos parados 4 e 5 dias, e o veredicto foi "a máquina de rascunho funcionou; o botão de aprovar não foi apertado nenhuma vez".
>
> **A proteção é o modelo, não a aprovação.** O colaborador só dispara o que está escrito neste documento. Qualquer coisa fora dele (negociação, condição especial, objeção nova, mensagem para cliente ativo) volta a passar pelo Nicolas antes de sair.
>
> **A contrapartida é o registro.** Toque disparado sem linha em `interacoes` no mesmo dia é o que quebra esse acordo, porque tira a única visibilidade que sobrou depois de remover o gate de aprovação.

## O que este documento substitui

| Documento | Cadência que usava | Ação |
|---|---|---|
| `docs/manual-operacoes-irbis.md` | Declarava D+3 / D+7 / D+10 **e** dizia que o doc não existia | Lacuna fechada. Atualizar a linha do índice |
| `03 - Reunião de Vendas/manual-follow-up-irbis.md` | 48h / 3 a 7d / 7 a 30d / 30+ | Substituído pela escada. O resto do manual (diagnóstico de objeção, downsell, quebra de preço) continua valendo |
| `03 - Reunião de Vendas/script-call-comercial-junho-2026.md` | D+4 | Corrigir para D+3 |
| `01 - Prospecção/email-sequences-prospects.md` | D+4 / D+8 no template, D+4 / D+12 nos exemplos | Corrigir para a escada |
| `01 - Marca/IRBIS_Manual_de_Copy_v2.md` §08 | D+0 / D+4 / D+12 | Corrigir para a escada |
| `05 - Indicação/sistema-indicacao-base-irbis.md` | D2 / D4 / D4.2 / D6 | Substituído pelo estágio D |
