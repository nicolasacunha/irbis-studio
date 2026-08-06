# Raio-X de Estrutura — instrumento de diagnóstico da Consultoria de IA

**Data:** 05/ago/2026
**Status:** design aprovado bloco a bloco pelo Nicolas nesta sessão. Nada construído ainda.
**Escopo:** frente **Consultoria de IA** (uma das 3 do pivot de 04/ago). Não é site, não é dashboard avulso.

## Origem

Nicolas recebeu, num grupo de mentoria, um deck de auditoria interna do organograma de marketing da Academia Gaviões 24 Horas (ago/2026, produzido por Ari Junior). O deck mapeia a área em 4 "caixinhas" — frentes, posições internas e parceiros fixos —, declara que "responsabilidade escrita ainda não existe formalmente" e chama o mapeamento de primeiro passo pra desenhar a estrutura ideal junto com o RH.

Duas leituras saíram disso:

1. **Abordar a Gaviões — descartado nesta sessão.** Nicolas não tem relação com eles e o material circulou num grupo onde o pessoal já recebe acompanhamento semanal de alguém que entra dentro da empresa. A vaga está ocupada por quem tem muito mais acesso do que uma abordagem fria teria. O deck é documento interno de terceiro: serve como inteligência, nunca como citação em abordagem. Registrado em `expert-brain` (nota `sumuq73fdt4u`, tag `abordagem-descartada`).
2. **Usar o formato na IRBIS — este spec.**

## A lacuna que isto preenche

A IRBIS já tem a **saída** montada: taxonomia de 7 departamentos × 37 Jobs To Be Done × skill × nível de automação, viva no painel (`irbis-os/painel/app/agentes/`, tabela `agentes_jobs`), com o mapa aurora como representação visual. Ver `2026-08-05-sistema-agentes-departamentos-design.md`.

O que não existe é a **entrada**: como extrair essa estrutura da cabeça de um cliente. O deck da Gaviões é exatamente a matéria-prima que um cliente produziria — e levou uma reunião mais uma semana pra ficar pronto, ainda assim com 1 das 4 caixinhas em branco porque o responsável não enviou.

**A diferença decisiva:** o deck da Gaviões mapeia 14 posições e não traz um único número. Nenhuma hora, nenhuma frequência, nenhum volume. Sem isso é organograma. Com isso vira caso de negócio.

## Decisões tomadas

| Pergunta | Resposta |
|---|---|
| O que nasce primeiro? | **Instrumento de diagnóstico** (o roteiro de extração), não o entregável visual nem a peça de venda. A saída visual já existe; a entrada não. |
| Quando roda? | **Sessão paga de consultoria**, cliente já fechou. Não é call de vendas gratuita nem formulário assíncrono. |
| Quanto cobre? | **Um departamento por vez.** O resto vira a venda seguinte. |
| O que o cliente leva? | **Mapa + 1 agente no ar.** |
| Como se constrói? | **Skill + captura estruturada**, sem tocar em produção. |

### Por que "mapa + 1 agente no ar" não é opcional

A decisão de 03/ago (`consultoria-ia-com-entregavel`) diz que a IRBIS faz consultoria de IA **desde que termine com algo rodando**. Consultoria que acaba em reunião, diagnóstico e relatório é a "consultoria avulsa" proibida no `CLAUDE.md`. Um raio-x que termina num mapa é relatório. Por isso a sessão só fecha com um agente entregue.

## Arquitetura

Skill `irbis-raio-x-estrutura`, dois modos, espelhando `irbis-pos-reuniao`:

- **Modo preparo** — antes da call, gera o roteiro que o Nicolas leva pra sessão: perguntas na ordem, armadilhas por bloco, reformulações prontas. Ele conduz olhando isso, sem digitar na frente do cliente.
- **Modo captura** — depois da call, ele cola notas ou transcrição; a skill estrutura, classifica os jobs e calcula a conta.

**Onde o resultado mora:** pasta local do projeto do cliente, **fora do repo**. Regra de 25/jul (`projetos-local-repo-so-na-publicacao`): projeto de cliente não entra em repo compartilhado. O repo guarda apenas a skill e o template em branco.

## Estrutura da saída

Markdown no mesmo vocabulário da taxonomia interna (departamento → job → nível de automação), pra que o dado do cliente e o da IRBIS falem a mesma língua se um dia forem pro mesmo mapa.

**1. Caixinhas** — nome, responsável, o que responde. A camada que o deck da Gaviões tem.

**2. Jobs, por caixinha** — a camada que o deck não tem:

| Campo | Razão de existir |
|---|---|
| Job (verbo + objeto) | "Lançar pedido do WhatsApp no ERP", não "atendimento". Cargo não automatiza; trabalho automatiza. |
| Quem faz | Revela acúmulo: a mesma pessoa em duas ou mais caixinhas. |
| Frequência | Dia, semana ou mês. |
| Horas por semana | O número ausente no deck da Gaviões. |
| Alguém precisa decidir? | Separa o que vira agente do que é trabalho de gente. É o critério do roteiro de 05/ago. |
| Sistemas tocados | Dado atravessando janelas é o job mais barato de matar. |
| Classificação | 100% IA · Humano + IA · Humano lidera — os mesmos 3 níveis da taxonomia interna. |

**3. A conta** — soma das horas semanais em jobs onde ninguém precisa decidir, do departamento inteiro. Um número só.

**4. Ordem de ataque** — jobs ranqueados por horas × ausência de decisão ÷ esforço de construir.

**5. O primeiro agente** — qual foi escolhido, por quê, e o que ele faz. Preenchido no fim da sessão.

O que o cliente recebe não é "seu organograma", é "seu departamento gasta N horas por semana em trabalho que ninguém precisa decidir, e essas são as três primeiras que eu tiro".

## A sessão — ~2h

O problema central: dono não sabe descrever o próprio trabalho. Descreve cargo, descreve o que deveria acontecer, e chuta horas. Todo o roteiro existe pra contornar isso.

**1. Recorte — 10 min.** Escolher o departamento pela dor, não pelo organograma. Pergunta principal: *"Onde você contratou mais gente nos últimos 12 meses?"* — contratação recente é prova de que o trabalho cresceu junto com a venda. Reservas: quem te procura fora de hora; qual área para primeiro se você sumir uma semana.

**2. Caixinhas — 20 min.** "Me lista as frentes dessa área e quem responde por cada uma." Sai rápido, porque o dono já pensa assim. Marcar: mesma pessoa em duas frentes (acúmulo) e resposta em forma de cargo em vez de entrega.

**3. A semana real — 45 min.** O coração da sessão. Nunca "o que o fulano faz", que devolve descrição de cargo. Sempre: *"Descreve a segunda-feira do fulano, da hora que ele senta até a hora que sai."*

Quatro cortes sobre cada tarefa que aparecer:
- *"Isso acontece todo dia ou só segunda?"* → frequência
- *"Quantas vezes por dia, e quanto tempo cada vez?"* → **horas nunca são perguntadas direto.** Volume × duração é estimativa; "quantas horas por semana" é chute.
- *"Nessa hora ele decide algo, ou executa uma sequência já conhecida?"* → a linha entre agente e gente
- *"Ele tira de onde e põe onde?"* → sistemas

Dois garimpos que o dono nunca oferece: *"o que vocês fazem que só existe porque algo deu errado antes?"* (conferência, retrabalho, cobrança) e *"o que foi esquecido esse mês?"*.

**Gate obrigatório:** se o dono não souber descrever a semana de alguém, essa pessoa entra na sessão. Quinze minutos com quem executa valem mais que uma hora com quem manda. A Gaviões mostra o custo de pular isso — a caixinha do Vinicius foi pro RH em branco.

**4. A conta — 15 min.** Somar na frente dele, na sala. Não mandar depois, não deixar pro PDF. É o único momento em que o cliente sente o tamanho do problema em número próprio.

**5. Primeiro agente — 20 min.** Escolha por horas × ausência de decisão ÷ esforço, com três cortes de viabilidade: nada que dependa de credencial demorada, nada que toque dinheiro, nada que exija integração com sistema fechado. Tem que subir em dias.

### Regra de condução obrigatória

O raio-x expõe gente cujo dia é 100% repetição, e o dono vai pensar em demitir na hora. O enquadramento é o do roteiro de 05/ago: *"sua equipe é boa demais pra passar o dia nisso, o que ela faz de melhor é decidir."* Isso vai escrito na skill.

Não é só princípio: se a equipe cheirar que o consultor veio mapear pra cortar cabeça, ninguém descreve a própria segunda-feira com honestidade e o raio-x sai errado. A postura protege o dado.

## Uso no marketing

**1. O CTA órfão ganha destino.** O roteiro de 05/ago registra "manda site no direct" como gatilho que atrai o lead errado desde o pivot, com a troca em aberto. O raio-x oferece a palavra: *"manda RAIO-X no direct"*. **Recomendação, não mudança aplicada** — trocar palavra de funil é decisão do Nicolas.

**2. Prova visual sem depender de cliente.** O mapa aurora da IRBIS é o "depois" da tese: 37 jobs mapeados, 36 com skill própria depois do commit `bcd1c67`, que fechou 10 dos 11 gaps. Material próprio, afirmável hoje. (O spec de 05/ago cita 26 com skill — número anterior a esse commit.)

**3. Publicar as perguntas, não o diagnóstico.** O roteiro de extração é fácil de ler e difícil de executar sozinho — o dono tenta, empaca na terceira pergunta e percebe que não sabe descrever a própria operação. Conteúdo e qualificação ao mesmo tempo, sem entregar a sessão de graça. **Decisão do Nicolas**, porque encosta na linha do que ele tirou de escopo.

**Barrado em qualquer peça:** horas economizadas, ROI, "reduzi X%". Não existe entrega medida. A estimativa de ~27,5h/semana da página de ROI segue em validação e fora de peça, conforme o roteiro de 05/ago.

## Modos de falha

| Quebra | Resposta da skill |
|---|---|
| Dono não estima horas nem por volume × duração | Cai pra faixas (<1h · 1-5h · >5h); job marcado como estimado. Número estimado não sai da sala como fato. |
| Sessão vira reclamação sobre pessoas | Pergunta sempre sobre o trabalho, nunca sobre quem faz. Reformulação pronta na skill. |
| Nenhum job é entregável em dias | Reduzir o agente até caber — um que rascunha e não envia ainda conta como rodando. Se nem isso couber, dizer na sessão. |
| Departamento grande demais | Teto de 3 caixinhas ou ~6 jobs por caixinha. Estourou, corta e agenda segunda sessão. O marketing da Gaviões sozinho tem 4 caixinhas e 14 posições: não caberia. |
| Cliente espera peça visual | Markdown vira PDF na identidade IRBIS, padrão já usado em análise. |

## Fora de escopo, de propósito

- **Multi-tenant no painel** — `cliente_id` em `agentes_jobs`, rota por cliente, aurora com dado do cliente. Fica pra quando houver segundo comprador. O spec de 05/ago já cortou por YAGNI.
- **Preço da sessão** — o preço de cada frente segue pendente de definição do dono (`CLAUDE.md`). Não entra na skill nem em peça.
- **Abordagem à Gaviões** — descartada, ver Origem.

## Perguntas em aberto

1. Trocar o CTA do funil de "site" para "raio-x"? Decisão do Nicolas, pendente desde 04/ago.
2. Publicar o roteiro de perguntas como conteúdo? Decisão do Nicolas.
3. Primeiro cliente onde isso roda: A. Cunha ADV já fechou e o kickoff está atrasado — o raio-x entra nesse projeto ou espera o próximo?
