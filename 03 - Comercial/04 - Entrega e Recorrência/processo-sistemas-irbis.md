# Processo de operação para Sistemas

> Criado em 12/ago/2026 por decisão do dono. É o **perfil SISTEMAS** do `metodo-entrega-irbis.md`, não um método paralelo. O Método continua sendo a espinha: 7 fases, gate binário, artefato obrigatório. Este documento diz **o que exatamente se produz** nas fases F1 e F2 quando a entrega é um sistema.
>
> Substitui o vazio deixado pela neutralização do `processo-entrega-padrao-irbis.md` (que era o perfil SITE, fora de escopo desde 04/ago/2026).

## Onde isso pluga

| Fase do Método | O que este documento acrescenta |
|---|---|
| F0 Arranque | Nada. Segue igual |
| **F1 Imersão e congelamento** | Artefatos 1 e 2: **system design** e **requisitos não-funcionais** |
| **F2 Plano de entrega** | Artefatos 3, 4 e 5: **entidades**, **APIs** e **arquitetura** |
| F3 Ciclos | Cada ciclo entrega um dos 3 fluxos principais, na ordem definida no artefato 1 |
| F4 Homologação | O roteiro de testes é derivado direto dos 3 fluxos, um caso real por fluxo |
| F5 a F7 | Seguem iguais |

## A lei desta frente

**Nenhuma linha de código antes dos cinco artefatos aprovados.**

É a Lei 2 do Método (fase sem artefato não aconteceu) aplicada a software. Em site, começar a construir cedo custava retrabalho de layout. Em sistema, começar cedo custa modelagem de dados errada, e modelagem errada não se conserta com ajuste: se reconstrói.

O gate é binário. Decisor aprovou por escrito os cinco, ou a construção não começa.

---

## Artefato 1 — System design (requisitos do produto e os 3 fluxos principais)

**O que é:** o documento que responde "o que este sistema faz", em linguagem que o dono do negócio entende e valida.

**Onde nasce:** no kickoff de F1, com o decisor na sala.

**A regra dos 3 fluxos.** Todo sistema é definido por **três fluxos principais**, não por uma lista de funcionalidades. O fluxo é o caminho completo que uma pessoa percorre para tirar um resultado do sistema, do gatilho até o fim.

Por que três: é o recorte que carrega a maior parte do uso real e é o que cabe num escopo de R$ 3.000 a R$ 10.000 sem virar projeto infinito. Se o cliente listar oito coisas, o trabalho aqui é descobrir quais três resolvem o gargalo que ele pagou para resolver, e escrever as outras cinco na lista do que fica fora.

**Conteúdo obrigatório:**

1. **O problema em uma frase**, com o número dele. "As três advogadas gastam a manhã montando petição a partir de modelo antigo."
2. **Quem usa**, por papel, e quantos são de cada.
3. **Os 3 fluxos principais.** Cada um escrito como sequência numerada de passos, do gatilho ao resultado, com o ator de cada passo. Nada de tela, nada de botão: comportamento.
4. **O critério de aceite de cada fluxo**, na forma da frase do teste (Lei 3). É esta frase que vira o roteiro de F4.
5. **O que fica fora**, numerado. Esta lista vale tanto quanto a de dentro.
6. **A ordem de construção** dos três fluxos, e por quê.

**Sai em:** `01-escopo/01-system-design.md`

**🚪 Gate:** o decisor leu os três fluxos e respondeu por escrito que é isso que ele espera receber, incluindo a lista do que fica fora.

**Erro clássico:** deixar o cliente descrever a tela que ele imagina em vez do trabalho que ele faz hoje. Tela é solução, e a solução é sua. Pergunte sempre "como isso é feito hoje, passo a passo, quem faz cada parte".

---

## Artefato 2 — Requisitos não-funcionais

**O que é:** tudo que o sistema tem que respeitar e que não aparece como funcionalidade. É o artefato que quase ninguém escreve e é de onde saem os problemas que aparecem depois da entrega.

**Conteúdo obrigatório:**

| Categoria | O que precisa estar escrito |
|---|---|
| **Volume** | Quantos usuários simultâneos, quantos registros hoje, quanto cresce por mês |
| **Performance** | Quanto tempo é aceitável para cada um dos 3 fluxos terminar. Com número |
| **Regras de negócio e lógica** | Cálculos, validações, o que o sistema recusa, o que ele exige, o que ele preenche sozinho |
| **Permissões** | Quem vê o quê, quem edita o quê, quem apaga. Por papel |
| **Dados sensíveis e LGPD** | Que dado pessoal circula, onde fica, quem acessa, o que acontece quando o titular pede exclusão |
| **Disponibilidade** | O sistema pode ficar fora do ar? Por quanto tempo? Tem horário crítico? |
| **Integrações obrigatórias** | O que ele tem que conversar com o que já existe na casa do cliente |
| **Limites de custo** | Teto de custo de infraestrutura e, quando houver IA, **teto de custo de token por mês** |
| **Auditoria** | O que precisa ficar registrado com quem fez e quando |

**A parte de IA, quando houver.** Sistema com IA acrescenta três linhas que nenhum sistema comum tem:

- **O que a IA decide e o que ela só sugere.** Onde existe revisão humana obrigatória.
- **O que acontece quando ela erra.** Qual é o caminho de correção e quem responde.
- **Quantos casos reais e quantas rodadas de formato** entram no escopo. Os dois números vão para o contrato. Sem eles, "pronto" é subjetivo e o projeto não termina, desiste.

**Sai em:** `01-escopo/02-requisitos-nao-funcionais.md`

**🚪 Gate:** decisor aprovou por escrito. Os números de volume, performance e custo estão preenchidos com número, não com adjetivo.

**Erro clássico:** aceitar "tem que ser rápido" e "tem que ser seguro". Nenhum dos dois é testável. Rápido é "a petição sai em menos de 1 dia útil". Seguro é "só as três sócias veem o financeiro".

---

## Artefato 3 — Entidades

**O que é:** o modelo de dados. As coisas que o sistema guarda, o que cada uma tem, e como elas se ligam.

É o artefato mais barato de acertar antes e o mais caro de consertar depois. Errar aqui é o único erro deste processo que obriga a reconstruir.

**Conteúdo obrigatório:**

1. **Lista das entidades**, com uma frase de definição cada, no vocabulário do cliente. Se o escritório fala "peça", a entidade se chama peça, não `document`.
2. **Campos de cada entidade**, com tipo, se é obrigatório e qual o valor padrão.
3. **Relações**, com a cardinalidade explícita. Um cliente tem muitos pedidos; um pedido pertence a um cliente.
4. **Estados**, quando a entidade tiver ciclo de vida. Quais são, e qual transição é permitida a partir de qual.
5. **O que é imutável.** Depois de criado, o que nunca muda.
6. **Volume de migração**, quando houver dado antigo entrando: quantos registros, de onde vêm, em que formato.

**Sai em:** `02-plano/03-entidades.md`

**🚪 Gate:** cada um dos 3 fluxos do artefato 1 consegue ser percorrido inteiro usando só as entidades desta lista. Se algum passo do fluxo não tem onde gravar, falta entidade.

**Erro clássico:** modelar pelo que o sistema mostra em vez de pelo que o negócio é. Tela some, muda, vira outra coisa. Entidade fica.

---

## Artefato 4 — APIs

**O que é:** o contrato entre as partes do sistema. Cada operação que existe, o que ela recebe, o que ela devolve e o que ela recusa.

**Conteúdo obrigatório, por operação:**

| Campo | O que escrever |
|---|---|
| Nome | O que ela faz, em verbo |
| Método e caminho | `POST /pedidos`, `GET /pedidos/:id` |
| Quem pode chamar | Qual papel do artefato 2 |
| Entrada | Campos, tipos, quais são obrigatórios |
| Saída de sucesso | O que volta, com exemplo |
| Erros previstos | Cada recusa possível, com a mensagem que o usuário vê |
| Efeito colateral | O que mais acontece quando isso roda (notificação, registro de auditoria, chamada externa) |

**Integrações externas ganham bloco próprio:** qual serviço, quem paga, qual limite de chamada, o que o sistema faz quando o serviço externo cai, e onde ficam as credenciais.

**Sai em:** `02-plano/04-apis.md`

**🚪 Gate:** cada passo de cada um dos 3 fluxos tem uma operação que o executa. Nenhuma operação existe sem estar em algum fluxo. Sobrou operação, é escopo que ninguém pediu; faltou operação, o fluxo não roda.

**Erro clássico:** escrever só o caminho feliz. O erro previsto é a parte que o cliente vive todo dia, e é a que gera chamado em F6.

---

## Artefato 5 — Arquitetura

**O que é:** como isso é construído, hospedado e mantido. É o artefato mais curto e o único que é decisão sua, não do cliente.

**Conteúdo obrigatório:**

1. **Stack**, com uma linha de justificativa por escolha.
2. **Desenho dos componentes**: o que roda onde, quem fala com quem.
3. **Onde mora**: hospedagem, banco, arquivos, filas. **Tudo em conta do cliente**, no CNPJ dele (Lei da F5). Se alguma coisa nascer na sua conta, precisa estar escrito quando e como migra.
4. **Ambientes**: preview e produção, e como um vira o outro.
5. **Custo mensal de infraestrutura estimado**, por serviço, somado. Quando houver IA, o custo de token entra aqui, calculado por volume do artefato 2.
6. **Backup e recuperação**: com que frequência, onde fica, quanto tempo leva para restaurar.
7. **O que acontece se o cliente quiser te tirar amanhã.** Já responde o `acessos.md` de F5.

**Sai em:** `02-plano/05-arquitetura.md`

**🚪 Gate:** o custo mensal está calculado e cabe no teto do artefato 2. Toda conta está no nome do cliente ou tem data de migração escrita.

**Erro clássico:** montar infraestrutura na sua conta "por enquanto". O "por enquanto" vira dependência, e dependência que o cliente não escolheu vira desconfiança na renovação.

---

## Escalonamento por tamanho de projeto

Os cinco artefatos são obrigatórios sempre. O que muda é a profundidade.

| Faixa | Profundidade | Tempo alvo de F1+F2 |
|---|---|---|
| R$ 3.000 a R$ 5.000 | Versão enxuta: cada artefato cabe em uma página. Entidades e APIs em tabela, sem prosa | 3 a 5 dias úteis |
| R$ 5.000 a R$ 10.000 | Versão completa como descrita acima | 5 a 10 dias úteis |
| Sob consulta | Versão completa mais prova de conceito do trecho mais arriscado, antes de fechar preço | Definido caso a caso |

Projeto de R$ 3.000 com dez dias de design não fecha a conta. Projeto de R$ 10.000 sem modelo de dados escrito vira prejuízo.

## Os 3 botões do Método, pré-ajustados para Sistemas

| Botão | Ajuste padrão |
|---|---|
| **Ritmo** | 4 a 6 ciclos semanais. Um fluxo principal por ciclo a partir do ciclo 2, com validação em casos reais do cliente |
| **Definição de pronto** | N casos reais do próprio cliente rodados com saída aprovada pelo decisor, dentro de N rodadas de formato. **Os dois números vão para o contrato** |
| **Métrica prometida** | Tempo devolvido por tarefa, medido antes e depois, no fluxo principal número 1 |

## Checklist de bolso

Antes de escrever a primeira linha de código:

- [ ] Os 3 fluxos estão escritos como sequência de passos, com ator por passo
- [ ] Cada fluxo tem a frase do teste
- [ ] A lista do que fica fora está numerada e foi aprovada junto
- [ ] Volume, performance e teto de custo têm número, não adjetivo
- [ ] Se tem IA: o que ela decide, o que ela sugere, quantos casos, quantas rodadas
- [ ] Cada passo de cada fluxo tem onde gravar (entidade) e o que o executa (API)
- [ ] Nenhuma entidade ou API sobra sem fluxo que a use
- [ ] Todo erro previsto tem a mensagem que o usuário vê
- [ ] Custo mensal somado e dentro do teto
- [ ] Todas as contas no nome do cliente, ou com data de migração escrita
- [ ] Decisor aprovou os cinco por escrito

Faltando qualquer item, F3 não abre.

## Como isso alimenta o comercial

O artefato 1 é o que vira **Anexo I do contrato**. Os 3 fluxos com critério de aceite e a lista do que fica fora são exatamente o que o `anexo-escopo-minuta.md` faz certo hoje, e o que falta no resto.

O artefato 2 é o que dá o número do prazo. Enquanto não existir prazo padrão por frente, é daqui que sai o prazo daquele projeto específico, em dias úteis, para entrar na proposta e no contrato.

O artefato 5 é o que responde, na reunião de venda, à pergunta "e se eu quiser trocar de fornecedor depois". A resposta honesta fecha mais que a evasiva.
