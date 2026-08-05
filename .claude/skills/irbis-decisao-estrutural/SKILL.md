---
name: irbis-decisao-estrutural
description: "Monta o dossiê de uma decisão estrutural de posicionamento da IRBIS ANTES de o Nicolas decidir — pergunta de decisão em uma frase, o que já foi decidido que essa mudança contradiz ou reforça (roda contra irbis-guarda-pivot primeiro), trade-off real sem retórica, o que precisa ser verdade pro 'sim' funcionar (dado, não opinião) e prazo natural se houver. Nunca recomenda um lado — só apresenta os dois e para; quem decide é sempre o Nicolas. Use quando ele estiver considerando mudar o rumo estrutural da empresa: 'devo continuar recusando sites?', 'faz sentido abrir uma 4ª linha de escopo?', 'vale a pena mudar o ICP', 'compensa contratar', 'devo pivotar', 'entrar em [mercado/vertical]', 'sair de [frente]', 'decisão estrutural', ou pedir pra pesar prós e contras de mudar o posicionamento da IRBIS."
---

# IRBIS — Decisão Estrutural

Esta skill não decide nada. Ela prepara a decisão pra que o Nicolas decida rápido e informado — o mesmo papel que `irbis-precificacao` cumpre pra preço: monta o raciocínio, nunca escolhe o número. Aqui, o "número" é o rumo da empresa.

**Por que isso precisa de skill própria:** a IRBIS já pivotou 4 vezes documentadas (01/jun sites, 21/jul sistemas com IA, 28/jul SaaS white-label, 04/ago fim dos sites) — ver `irbis-guarda-pivot`. Cada pivot anterior foi decidido em conversa solta, sem dossiê, e deixou rastro: preço de cada frente ainda sem número, destino dos cases de site ainda sem resposta (`CLAUDE.md`, seção "⚠️ Pendente"), um gatilho de ~19/ago que ficou órfão quando o pivot de 04/ago tornou a condição sem objeto. O objetivo aqui é reduzir esse rastro — não eliminar a demora de decidir (ela é do Nicolas), mas eliminar a demora de descobrir o que já foi decidido, o que uma mudança custa de fato, e o que falta saber antes de dizer sim.

## 1. O que é decisão estrutural (e o que não é)

| É decisão estrutural — usa esta skill | Não é — usa a skill certa |
|---|---|
| Mudar quais frentes a IRBIS vende (abrir/fechar linha de escopo) | Precificar um projeto específico → `irbis-precificacao` |
| Mudar o ICP (quem a IRBIS busca) | Qualificar um lead específico → `irbis-prospeccao-e-diagnostico` |
| Voltar atrás em algo já recusado (ex.: sites) | Responder uma objeção de preço numa call → `irbis-call-de-vendas` |
| Entrar ou sair de um mercado/vertical | Decidir se um cliente específico entra na carteira → operacional, não estrutural |
| Contratar (deixar de ser solo) | Ajustar prazo ou escopo de UM projeto → `irbis-entrega-e-recorrencia` |
| Mudar o modelo de negócio (ex.: virar produto/SaaS em vez de serviço) | Escrever a comunicação de uma decisão JÁ tomada → `irbis-brand-voice` (copy) + `irbis-guarda-pivot` (checar fato) |
| Definir preço-base de uma frente inteira (não de um projeto) | — |

Teste rápido: se a resposta muda o que a IRBIS **é** (o que vende, pra quem, como ganha dinheiro, quem executa), é estrutural. Se muda só como um caso específico é tratado dentro do que a IRBIS já é, não é.

## 2. Passo 1 — rodar contra `irbis-guarda-pivot` antes de qualquer outra coisa

Não é opcional e vem antes do resto do dossiê. Leia `irbis-guarda-pivot` inteira (ela muda com frequência) e responda, com fonte:

- Essa pergunta já tem resposta registrada em algum pivot anterior? Se sim, a decisão nova é **reverter** algo, não decidir do zero — isso muda o peso da prova exigida (reverter uma decisão já tomada pede mais do que decidir algo inédito).
- Essa pergunta está na lista de pendências abertas do `CLAUDE.md` (seção "⚠️ Pendente") ou da seção "Pendências" da `irbis-guarda-pivot`? Se sim, cite o pendente exato em vez de tratar como pergunta nova.
- Alguma parte do repo (site, deck, docs de comercial) já assume uma resposta pra essa pergunta sem ela ter sido decidida? Isso é sinal de deriva, não de decisão — nomeie no dossiê, não trate como precedente.

## 3. Passo 2 — os 5 elementos do dossiê

### 3.1 A pergunta de decisão, em uma frase

Formato obrigatório: uma frase que aceita sim/não ou uma escolha entre opções nomeadas. Nunca um tema solto.

- Ruim: "pensar sobre voltar a fazer sites"
- Bom: "A IRBIS deve voltar a oferecer sites como upsell da linha Sistemas, sim ou não?"
- Ruim: "e a questão de crescer"
- Bom: "A IRBIS contrata a primeira pessoa nos próximos 90 dias, sim ou não?"

Se o Nicolas trouxe a pergunta vaga, a primeira ação da skill é devolver a versão precisa e confirmar que é essa mesmo antes de montar o resto — dossiê sobre pergunta errada é trabalho jogado fora.

### 3.2 O que já decidido isso contradiz ou reforça

Resultado do Passo 1, mas formatado como confronto direto: cite a decisão anterior (data, fonte, citação verbatim do dono quando existir — `irbis-guarda-pivot` tem várias) e diga se a pergunta nova **reverte**, **estende** ou **é compatível** com ela.

| Relação | O que significa |
|---|---|
| Reverte | A pergunta desfaz uma decisão anterior explícita (ex.: voltar a vender sites reverte 04/ago). Marque em destaque — reversão pede o "o que mudou desde então" explícito no item 3.4. |
| Estende | A pergunta é uma decisão anterior aplicada a um caso novo (ex.: já existe Camada 3 SaaS white-label; "faz um segundo produto white-label" estende, não inaugura). |
| Inédita | Não há decisão anterior registrada — primeira vez que a pergunta aparece. |

### 3.3 O trade-off real — sem retórica

Duas colunas, sempre as duas, sempre preenchidas antes de mostrar ao Nicolas. Nunca uma coluna maior que a outra por design — se uma ficar visivelmente mais forte, é sinal de que a skill está puxando pra um lado, o que é proibido (ver seção Proibições).

| | Ganha | Perde |
|---|---|---|
| **Fazer a mudança (SIM)** | ... | ... |
| **Manter como está (NÃO)** | ... | ... |

Regras de preenchimento:
- Cada linha precisa ser concreta e verificável, não adjetivo. "Ganha mais clientes" não serve; "ganha acesso a X leads que hoje recusa por não vender sites, ~N/mês pelo histórico de `03 - Comercial/`" serve.
- Custo de oportunidade entra nas duas colunas: manter como está também tem um "perde" (o que se deixa na mesa por não mudar), não é neutro.
- Nicolas opera sozinho — todo trade-off que pressupõe time (delegar, escalar, "só contratar alguém pra cuidar disso") precisa vir marcado como dependente de uma decisão estrutural separada (contratar), não embutido como se fosse grátis.

### 3.4 O que precisa ser verdade pro "sim" funcionar — dado, não opinião

Lista de pré-condições factuais, cada uma com uma destas três marcações:

- ✅ **Verificado** — já é verdade, com fonte (arquivo, número, data).
- ❓ **Não verificado** — precisa ser checado antes de decidir; diga exatamente como checar.
- ⚠️ **Assumido sem prova** — está sendo tratado como verdade em conversas mas ninguém confirmou; sinalize, não deixe passar como se fosse ✅.

Nunca inventar um dado pra preencher esta lista. Se não existe fonte, o item é ❓ ou ⚠️, nunca ✅. Isso é o ponto onde a skill mais se parece com `irbis-guarda-pivot` — mesma disciplina de não afirmar sem fonte — mas aplicado a pré-condições de decisão futura, não a fatos de comunicação já publicada.

### 3.5 Prazo natural, se houver

Só inclua um prazo se ele for real — orçamento acabando, contrato vencendo, sazonalidade do cliente-alvo, compromisso já assumido com terceiro. Nunca fabrique urgência.

Cuidado com prazo auto-imposto: o gatilho de "~19/ago/2026" (2 assinaturas liberariam o rebranding público) foi criado numa decisão anterior e ficou órfão quando o pivot de 04/ago tornou a condição sem objeto — o prazo não empurrou decisão nenhuma, só ficou pendurado. Se a pergunta atual tem um prazo parecido (auto-imposto, não externo), nomeie isso explicitamente: "prazo é auto-imposto, não há custo real em estourá-lo" — é uma informação tão válida quanto um prazo real.

Se não houver prazo real, diga isso e pare: "sem prazo natural identificado" é uma resposta completa, não uma lacuna a preencher com pressão inventada.

## 4. Formato de saída

Sempre nesta ordem, sempre os 5 elementos, mesmo quando um deles for curto ("sem prazo natural identificado" conta como preenchido):

```
DECISÃO ESTRUTURAL — dossiê

1. Pergunta: [uma frase, sim/não ou escolha nomeada]

2. Relação com decisões anteriores: [reverte / estende / inédita] — [citação + fonte]

3. Trade-off:
   SIM → ganha: [...] · perde: [...]
   NÃO → ganha: [...] · perde: [...]

4. Pré-condições pro SIM:
   ✅ [fato verificado, com fonte]
   ❓ [precisa checar — como checar]
   ⚠️ [assumido, sem prova]

5. Prazo: [real, com fonte] OU [auto-imposto, sem custo real] OU [sem prazo natural identificado]
```

Termina aí. Nenhuma linha de "minha recomendação é..." ou "eu sugeriria...". Se o Nicolas pedir explicitamente a opinião depois de ver o dossiê, isso é uma pergunta separada — responda como opinião clara e rotulada como tal ("isso já não é o dossiê, é minha leitura:"), nunca misturada ao dossiê em si.

## 5. Exemplo aplicado — um pendente real do CLAUDE.md

Ilustração com um dos dois pendentes já registrados em `CLAUDE.md` ("destino dos cases de site já entregues"), pra calibrar o nível de concretude esperado — não é um dossiê pronto pra uso, os dados precisam ser reconferidos na hora:

```
1. Pergunta: Os cases de site já entregues (EForce +R$350k, Odery Drums) saem do
   site da IRBIS ou ficam como prova de execução/craft, mesmo sites não sendo
   mais vendáveis?

2. Relação com decisões anteriores: estende — 04/ago tirou sites do escopo
   VENDÁVEL mas não decidiu o que fazer com PROVA SOCIAL já publicada.
   CLAUDE.md, seção "⚠️ Pendente", registra isso como não decidido.

3. Trade-off:
   MANTER os cases → ganha: única prova social com número real
   ("+R$350k", verificado em irbis-guarda-pivot) num site que hoje não
   tem case de Sistemas/IA ainda publicável · perde: site comunica
   "fazemos site" bem depois de a IRBIS ter parado de vender isso —
   risco de prospect pedir site e ouvir "não fazemos mais"

   TIRAR os cases → ganha: site 100% coerente com o pivot, sem
   confundir prospect de Sistemas/IA · perde: fica sem NENHUM case
   com número real até o primeiro cliente de Sistemas/IA fechar e
   ter resultado citável

4. Pré-condições pro SIM (tirar os cases):
   ✅ Nenhum cliente de Sistemas/IA tem resultado publicável ainda —
   A. Cunha Advocacia assinou mas kickoff não aconteceu (memória
   project_ia-escritorio-mae.md, 05/ago)
   ❓ Quanto tráfego/lead o site perde reescrevendo a prova social —
   não medido, checar GA4 antes de decidir
   ⚠️ Assumido que "case de craft" ainda convence prospect de Sistemas
   mesmo sendo case de site — não testado

5. Prazo: sem prazo natural identificado — nenhum evento externo força
   essa decisão numa data específica.
```

## 6. Depois da decisão — o que a skill NÃO faz

O dossiê termina quando o Nicolas decide. A partir daí:

- Registrar a decisão (memória, `CLAUDE.md`, docs de comercial) é outra tarefa — faça só se ele pedir, e só o que ele decidiu, sem adicionar interpretação.
- Qualquer publicação, edição de site em produção, deploy ou comunicação externa resultante da decisão passa pelo checklist da `irbis-guarda-pivot` (pergunta 6: aprovação explícita antes de publicar) — esta skill não pula essa trava.
- Se a decisão muda escopo/preço/ICP de forma que a `irbis-guarda-pivot` precisa ser atualizada, sinalize isso como pendência pro Nicolas confirmar — não edite a skill sozinho.

## Proibições

- **Nunca recomendar um lado.** Nem em tom sutil ("o dado 4 sugere que..."), nem se o Nicolas perguntar "o que você acha" no meio do processo — devolva "ainda estou montando o dossiê, no final você decide"; só dê opinião separada e rotulada se ele pedir depois de ver o dossiê pronto.
- **Nunca inventar dado na seção 3.4.** Sem fonte, o item é ❓ ou ⚠️ — nunca ✅. Isso vale mesmo sob pressão de "só estima aí".
- **Nunca fabricar prazo/urgência.** Prazo tem que ser real e citável, ou a resposta é "sem prazo natural identificado".
- **Nunca tratar isso como `irbis-guarda-pivot`.** Guarda-pivot audita fato DEPOIS que a decisão já foi tomada (checa se copy/proposta/site condiz com o que foi decidido). Esta skill prepara a decisão ANTES — não confunda os papéis nem pule o passo 1 achando que já sabe o estado atual de cabeça.
- **Nunca decidir por omissão.** Não escolha silenciosamente qual das duas colunas do trade-off aparece primeiro, maior ou com mais itens de um jeito que empurre leitura — as duas colunas recebem o mesmo rigor de preenchimento.
- **Nunca publicar, registrar como definitivo ou comunicar pra fora** o resultado de um dossiê sem o Nicolas ter dito explicitamente qual lado escolheu.
- **Nunca propor decisão estrutural por iniciativa própria.** Esta skill só ativa quando o Nicolas traz a pergunta — não é gatilho pra sugerir "você já pensou em pivotar X" sem ele ter perguntado.
