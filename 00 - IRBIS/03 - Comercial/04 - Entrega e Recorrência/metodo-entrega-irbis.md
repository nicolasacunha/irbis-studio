# Método de Entrega IRBIS — o padrão que todo projeto herda

**Criado:** 01/ago/2026. **Status:** regra vigente a partir do próximo projeto que entrar.
**Verificado 09/ago/2026 contra o pivot de 04/ago:** este documento já nasceu agnóstico de produto (fases, gates e leis valem pra "site, landing page, sistema, agente de IA, conteúdo") — não precisou de correção. Único ajuste de leitura: como site saiu de escopo, o perfil **"Sistema / agente de IA"** (seção 4) é o perfil padrão agora, não mais um entre vários — os perfis de Landing page/Site institucional ficam como referência histórica, não como opção ativa.
**O que ele é:** a espinha fixa de qualquer entrega da IRBIS — site, landing page, sistema, agente de IA, conteúdo. Sete fases, sete portões. O que muda de projeto pra projeto está isolado em **3 botões de adaptação** (seção 4). Tudo o resto é igual sempre.
**O que ele NÃO é:** um cronograma. Cronograma é artefato da Fase 2, feito por projeto.

**Relação com o que já existia:** `processo-entrega-padrao-irbis.md` deixa de ser "o processo" e passa a ser **o perfil SITE instanciado deste método** (ordem Estratégia → Design → Copy → Código, prazos de LP/institucional, stack Stitch/Claude/Vercel). Este documento manda; aquele detalha um perfil.

Este documento também fecha a lacuna nomeada no `manual-operacoes-irbis.md` como **"Kit de onboarding pós-assinatura"**: as Fases 0, 1 e 2 são o kit.

---

## 1. As 5 leis (invioláveis — quebrar uma é o que estraga projeto, não a falta de talento)

**Lei 1 — Nada avança sem gate.** Cada fase termina num critério **binário**: passou ou não passou. Se você precisa "achar" que está pronto, o gate está mal escrito.

**Lei 2 — Fase sem artefato não aconteceu.** Toda fase produz um arquivo, com nome fixo, na pasta do projeto. Reunião boa sem arquivo = fase não cumprida. O artefato é a prova, o contrato de memória e a defesa quando o cliente lembrar diferente.

**Lei 3 — Escopo é lista fechada com critério de aceite por item.** Cada item de escopo tem uma frase que descreve o teste que ele precisa passar. **"Até ficar bom", "até sair do jeito que ele quer" e "ajustes ilimitados" são proibidos por escrito.** Toda vez que aparecer um "até", ele precisa de número: *até 2 rodadas*, *até 3 formatos*, *até 5 casos reais*.

**Lei 4 — Pedido novo não entra no ciclo em curso.** Vira linha na Fila (`03-ciclos/fila.md`). No fim do ciclo você classifica: cabe no escopo congelado → entra no próximo ciclo; não cabe → **aditivo cotado antes de ser feito** (Cláusula 4 do contrato). Nunca "faz que é rapidinho".

**Lei 5 — Dependência do cliente pausa o relógio, por escrito, no dia.** Todo insumo que depende do cliente tem dono, data e um lugar onde é cobrado. Atrasou 1 dia → a data final desloca 1 dia e você **comunica no mesmo dia**, não no fim. Prazo que estoura sem aviso vira culpa sua mesmo quando não é.

---

## 2. A pasta obrigatória (o esqueleto que nasce junto com o projeto)

Criada na Fase 0, sempre igual, em `02 - Projetos/<Cliente>/`:

```
02 - Projetos/<Cliente>/
├── 00-contrato/          contrato assinado, anexo de escopo, recibo, comprovante da entrada
├── 01-escopo/            escopo-congelado.md · criterios-aceite.md · mapa-de-decisao.md
├── 02-plano/             plano-entrega.md · dependencias-cliente.md
├── 03-ciclos/            ciclo-01.md, ciclo-02.md … · fila.md · decisoes.md
├── 04-homologacao/       roteiro-testes.md · termo-aceite.md
├── 05-virada/            acessos.md · treinamento.md · guia-do-usuario.*
├── 06-estabilizacao/     chamados.md · medicao-resultado.md
└── 07-encerramento/      post-mortem.md · voz-do-cliente.md · repitch.md
```

Regra: **pasta vazia é sinal**. Se `04-homologacao/` está vazia na semana da entrega, o projeto não está onde você acha que está.

---

## 3. As 7 fases

Formato de leitura: **Entra** (pré-requisito) · **Faz** · **Sai** (artefato) · **🚪 Gate** · **Erro clássico**.

---

### F0 — Arranque
Do "sim" ao relógio começar a contar.

- **Entra:** proposta aceita.
- **Faz:** roda o `03 - Comercial/06 - Jurídico/checklist-dia-do-sim.md` inteiro (contrato preenchido → anexo de escopo → assinatura Gov.br → entrada por PIX → recibo). Cria a pasta do projeto com as 8 subpastas. Agenda o kickoff **em até 48h** da entrada compensada.
- **Sai:** `00-contrato/` completo + pasta criada + kickoff na agenda.
- **🚪 Gate:** entrada **compensada no extrato** (não "prometida") **e** kickoff marcado com data.
- **Erro clássico:** começar a produzir antes da entrada cair. Cláusula 3 existe pra isso — e você já quebrou essa regra antes por ansiedade de mostrar serviço.

---

### F1 — Imersão e congelamento
A fase que define se o projeto vai ser lucrativo ou um pesadelo. Nenhuma linha de código aqui.

- **Entra:** F0 fechada.
- **Faz:**
  1. **Kickoff (60–90 min)** com o decisor. Pauta fixa: o que existe hoje, como o trabalho é feito hoje passo a passo, o que precisa existir, o que **não** vai existir, quem decide.
  2. Escreve o **escopo congelado**: lista numerada de entregáveis. Cada item ganha **critério de aceite** — a frase do teste (Lei 3).
  3. Escreve o **mapa de decisão**: quem é o **decisor único** (uma pessoa), quem são os usuários que dão opinião mas não decidem, e como as opiniões chegam (um canal só).
  4. Levanta a lista de acessos, dados e materiais que você precisa receber.
- **Sai:** `01-escopo/escopo-congelado.md` · `01-escopo/criterios-aceite.md` · `01-escopo/mapa-de-decisao.md`
- **🚪 Gate:** o **decisor único** respondeu por escrito (WhatsApp serve, print vale) **"aprovado"** ao escopo congelado, incluindo a lista do que fica **fora**.
- **Erro clássico:** confundir entusiasmo com aprovação. Cliente animado na call ≠ escopo aprovado. E: coletar opinião de todo mundo do time do cliente sem definir quem decide — é assim que 3 pessoas te dão 3 padrões diferentes de "pronto".

---

### F2 — Plano de entrega
Traduzir o escopo em datas, e — mais importante — em **obrigações do cliente**.

- **Entra:** escopo aprovado por escrito.
- **Faz:**
  1. Quebra o escopo em **ciclos** (semanais por padrão). Cada ciclo tem um entregável demonstrável.
  2. Define a **data-alvo** de cada marco e a data de homologação, contando do dia da entrada (Cláusula 6).
  3. Escreve `dependencias-cliente.md`: cada insumo com **o quê / quem / até quando / o que trava se atrasar**.
  4. Manda o plano pro cliente em **uma mensagem única**, com as dependências dele em destaque.
- **Sai:** `02-plano/plano-entrega.md` · `02-plano/dependencias-cliente.md`
- **🚪 Gate:** cliente confirmou o plano **e** as datas das dependências dele.
- **Erro clássico:** cronograma que só lista o que **você** faz. O atraso quase nunca é seu — é o material que não chegou. Sem esse arquivo você não tem como provar isso depois.

---

### F3 — Ciclos de construção
O loop. Sempre o mesmo, quantas vezes forem necessárias.

- **Entra:** plano confirmado.
- **Faz (por ciclo, sem variação):**
  1. **Segunda:** abre `ciclo-NN.md` com o escopo do ciclo (só itens do escopo congelado) e puxa o que ficou na fila.
  2. **Construção.** Ambiente de preview sempre no ar — o cliente vê evoluir, não precisa perguntar.
  3. **Demo (20–30 min, dia fixo da semana):** mostra o que ficou pronto, **testa junto** contra o critério de aceite do item, coleta ajustes.
  4. **Fecha o ciclo:** ajustes que cabem no escopo → próximo ciclo. Pedidos novos → `fila.md`. Decisões tomadas na call → `decisoes.md`, uma linha por decisão com data.
  5. Manda o resumo do ciclo em texto: **feito / próximo / preciso de você**.
- **Sai:** `03-ciclos/ciclo-NN.md` · `fila.md` · `decisoes.md` atualizados
- **🚪 Gate (por ciclo):** demo feita, resumo enviado, fila classificada (escopo vs. aditivo). **Gate final da fase:** 100% dos itens do escopo congelado marcados como construídos.
- **Erro clássico:** deixar a demo cair quando a semana foi ruim. É justamente na semana ruim que a demo salva o projeto — cliente aguenta atraso avisado, não aguenta silêncio.

---

### F4 — Homologação
A fase que quase toda agência pula, e é a que mata o "até ficar bom".

- **Entra:** todos os itens construídos.
- **Faz:**
  1. Escreve o **roteiro de testes**: um caso real do cliente por item de escopo. Em software, casos **do próprio negócio dele**, não exemplo inventado.
  2. Cliente testa por conta durante um período fechado (padrão: **3 dias úteis**), registrando o que achou.
  3. **Call de aceite:** percorre o `criterios-aceite.md` item a item. Cada um recebe ✅ aceito / 🔧 ajuste (dentro do critério) / ➕ aditivo (fora).
  4. Ajustes 🔧 têm janela fechada — padrão: **1 rodada, até 5 dias úteis**. Acabou a rodada, acabou.
- **Sai:** `04-homologacao/roteiro-testes.md` · `termo-aceite.md` (a lista com o carimbo de cada item)
- **🚪 Gate:** **termo de aceite com 100% dos itens em ✅**, confirmado por escrito pelo decisor. Sem isso não existe entrega, não existe fim de projeto e não começa a contar garantia.
- **Erro clássico:** entregar e "ir ajustando". Sem termo de aceite o projeto nunca termina — e você trabalha de graça por meses no que vendeu por 6 semanas.

---

### F5 — Virada e transferência
O cliente sai daqui **sem depender de você para operar**. Isso não enfraquece a recorrência: fortalece, porque a recorrência passa a ser escolha e não refém.

- **Entra:** termo de aceite fechado.
- **Faz:**
  1. Produção no ar, nas contas **do cliente** (Vercel, Supabase, Claude, domínio — no CNPJ dele).
  2. `acessos.md`: cada serviço, quem é o dono da conta, onde estão as credenciais, o que acontece se ele quiser te tirar amanhã.
  3. **Treinamento** dos usuários finais (grave a tela — vira o material de suporte e o próximo ativo de venda).
  4. Guia do usuário: curto, com os 5 caminhos que ele vai usar 95% do tempo.
- **Sai:** `05-virada/acessos.md` · gravação do treinamento · guia do usuário
- **🚪 Gate:** cliente conseguiu executar **sozinho**, na frente de você, o fluxo principal — pelo menos uma vez.
- **Erro clássico:** treinar o decisor e não quem vai usar todo dia. Sistema morre pelo usuário, não pelo chefe.

---

### F6 — Estabilização (30 dias)
A garantia (Cláusula 10) vira instrumento, não passivo.

- **Entra:** sistema/site no ar com usuários usando.
- **Faz:**
  1. `chamados.md`: registra tudo que aparece — bug, dúvida, pedido. Classifica: garantia / suporte / aditivo.
  2. **Pulso de satisfação na entrega**, roteiro do `voz-do-cliente.md`. Nota 9–10 abre a janela do depoimento na mesma conversa.
  3. **Mede o resultado prometido.** Você vendeu um número (tempo devolvido, peça em 1 dia, X leads). Vai atrás dele e escreve em `medicao-resultado.md`, com o dado que der pra verificar.
  4. **Call de 30 dias:** fim da garantia. Chega com o número na mão e com o histórico de chamados — é a prova concreta pro pacote de acompanhamento.
- **Sai:** `06-estabilizacao/chamados.md` · `medicao-resultado.md`
- **🚪 Gate:** call de 30 dias feita, resultado medido (mesmo que o número tenha vindo pior do que você prometeu — aí é ainda mais importante ser você a levantar isso).
- **Erro clássico:** sumir depois do ar e reaparecer só pra vender mensalidade. O chamado registrado é o que transforma "quer contratar suporte?" em "neste mês você precisou de 7 ajustes; o pacote cobre isso".

---

### F7 — Encerramento e carteira
Projeto encerra. Cliente não.

- **Entra:** F6 fechada.
- **Faz:**
  1. **Post-mortem interno (30 min, sozinho):** o que estourou prazo e por quê · o que entrou como aditivo · quantas horas o projeto custou de verdade vs. o preço · **o que vira regra nova neste documento**.
  2. **Feedback de fim de projeto** — as 3 perguntas do `voz-do-cliente.md` (Must-Have · momento de fricção · próxima dor).
  3. **Repitch do MRR** e **pedido de indicação**, roteiros em `processo-entrega-mrr-indicacao-irbis.md` e `sistema-indicacao-base-irbis.md`.
  4. **Entra na carteira:** os 4 campos do `processo-gestao-carteira.md` (último contato · pacote ativo · próxima camada candidata · data do próximo toque). A "próxima dor" da pergunta 3 preenche o campo da próxima camada sozinha.
- **Sai:** `07-encerramento/post-mortem.md` · `voz-do-cliente.md` · `repitch.md` + linha do cliente na carteira do CRM
- **🚪 Gate:** os 4 campos da carteira preenchidos **com data do próximo toque agendada**. Cliente sem próximo toque marcado = cliente perdido em 90 dias.
- **Erro clássico:** pular o post-mortem porque "deu certo". Projeto que deu certo é exatamente de onde sai a regra que faz o próximo dar certo — e o preço do próximo.

---

## 4. Os 3 botões de adaptação (a única coisa que muda por projeto)

Toda vez que um projeto novo entrar, você responde a **3 perguntas** na Fase 2. O resto do método não se discute.

| Botão | Pergunta | Onde é definido |
|---|---|---|
| **1. Ritmo** | Quantos ciclos, de que tamanho, com demo em que dia? | `02-plano/plano-entrega.md` |
| **2. Definição de pronto** | O que, concretamente, faz um item passar no aceite? | `01-escopo/criterios-aceite.md` |
| **3. Métrica prometida** | Que número você vai medir em F6 pra provar que valeu? | `02-plano/plano-entrega.md`, medido em `06-estabilizacao/medicao-resultado.md` |

### Perfis pré-ajustados (ponto de partida, não camisa de força)

| Perfil | Ritmo (botão 1) | Definição de pronto (botão 2) | Métrica prometida (botão 3) |
|---|---|---|---|
| **Sistemas** (CRM, ERP, sistema sob medida) | 4–6 ciclos, demo semanal + validação com casos reais do cliente a partir do ciclo 2. **Um fluxo principal por ciclo** | **N casos reais** do próprio cliente rodados com saída aprovada pelo decisor, dentro de **N rodadas de formato** — ambos os números escritos no contrato | Tempo devolvido por tarefa (antes × depois, medido em casos reais) |
| **Soluções com IA** (bot, agente, automação) | 2–4 ciclos, demo semanal + validação em conversas/casos reais a partir do ciclo 1 | N casos reais respondidos com saída aprovada, dentro de N rodadas de ajuste de prompt/fluxo — números no contrato | Tempo devolvido ou volume atendido sem humano, medido em 30 dias |
| **Consultoria de IA** | Sem ciclos. Diagnóstico → plano de ação → entrega em sessão única | Documento de diagnóstico entregue **e** plano de ação apresentado ao decisor, com priorização | Não tem métrica de resultado: a entrega é o diagnóstico. Ver ressalva abaixo |
| ~~Landing page~~ · ~~Site institucional~~ | 🛑 **PERFIS HISTÓRICOS.** Site e landing page saíram do escopo em 04/ago/2026. Não são opção ativa de entrega. Preservados só para leitura de projetos antigos | | |

**Detalhamento obrigatório do perfil Sistemas:** `processo-sistemas-irbis.md` (os 5 artefatos de F1 e F2).

**Ressalva do perfil Consultoria:** consultoria que termina em PDF é a que o dono já recusou. Quando a consultoria incluir algo rodando ao fim, ela deixa de ser perfil Consultoria e vira perfil Sistemas ou Soluções com IA para a parte construída, com escopo e aceite próprios.

> **Aviso pro perfil sistema/IA:** é o único perfil em que "pronto" é subjetivo por natureza (o cliente lê a saída e acha que "não é bem assim"). Por isso ele é o único que **exige número de casos e número de rodadas escritos antes de começar**. Sem isso, o projeto não tem fim — tem desistência.

---

## 5. Rituais fixos (a agenda que todo projeto tem)

| Ritual | Quando | Duração | Quem |
|---|---|---|---|
| Kickoff | F1, até 48h da entrada | 60–90 min | Decisor |
| Demo de ciclo | F3, dia fixo da semana | 20–30 min | Decisor (+ usuários se fizer sentido) |
| Call de aceite | F4 | 60–90 min | Decisor, com o `criterios-aceite.md` na tela |
| Treinamento | F5 | 60 min, gravado | Usuários do dia a dia |
| Call de 30 dias | F6 | 45 min | Decisor |

Nada de "call quando precisar". Data fixa marcada na F2, todas de uma vez.

---

## 6. Como este método pluga no que já existe

| Etapa | Documento que manda |
|---|---|
| F0 arranque | `06 - Jurídico/checklist-dia-do-sim.md` · `contrato-prestacao-software-modelo.md` |
| F1 escopo congelado | modelo em `06 - Jurídico/anexo-escopo-qgos.md` (o anexo do contrato **é** o escopo congelado) |
| **F1 + F2 perfil Sistemas** | **`processo-sistemas-irbis.md`** — os 5 artefatos obrigatórios (system design com 3 fluxos · requisitos não-funcionais · entidades · APIs · arquitetura). Nenhuma linha de código antes dos 5 aprovados |
| ~~F3 perfil site~~ | ~~`processo-entrega-padrao-irbis.md`~~ 🛑 **NEUTRALIZADO 09/ago/2026** — era o perfil SITE; site saiu do escopo em 04/ago. Preservado só como histórico |
| F6 pulso / F7 feedback | `voz-do-cliente.md` |
| F7 repitch MRR | `processo-entrega-mrr-indicacao-irbis.md` · `planos-recorrencia-irbis.md` |
| F7 indicação | `05 - Indicação/sistema-indicacao-base-irbis.md` |
| F7 carteira | `processo-gestao-carteira.md` |

---

## 7. Checklist de bolso (a versão de 1 página)

```
F0  entrada compensada + pasta criada + kickoff em 48h
F1  escopo congelado + critérios de aceite + decisor único   → "aprovado" por escrito
F2  ciclos + datas + dependências do cliente com dono e data → cliente confirmou
F3  [loop] ciclo aberto → construção → demo → fila classificada → resumo enviado
F4  roteiro de testes → cliente testa 3 dias → call de aceite item a item
    → 1 rodada de ajuste (5 dias úteis) → TERMO DE ACEITE 100% ✅
F5  produção nas contas do cliente + acessos documentados + treinamento gravado
    → cliente executa o fluxo sozinho na sua frente
F6  chamados registrados + pulso de satisfação + resultado medido → call de 30 dias
F7  post-mortem + 3 perguntas + repitch MRR + indicação → 4 campos da carteira
```

Se você não consegue apontar em qual letra o projeto está agora, o projeto está travado — e a resposta é voltar pro último gate que passou de verdade.

---

## 8. Manutenção deste documento

Regra: **toda regra nova nasce de um post-mortem**, nunca de uma ideia solta. Se um projeto estourou por um motivo que não estava previsto aqui, a linha entra na F7 daquele projeto e sobe pra cá no mesmo dia. Documento que só cresce por inspiração vira enfeite; documento que cresce por cicatriz vira método.

**Histórico**
- 01/ago/2026 — versão 1. Escrito a partir do processo de entrega de sites + os processos de carteira, voz do cliente e dia do sim já aprovados. Fecha a lacuna "Kit de onboarding pós-assinatura" do manual de operações.
