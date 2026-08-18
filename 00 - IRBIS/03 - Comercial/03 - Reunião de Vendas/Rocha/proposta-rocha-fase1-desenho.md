# Proposta Fase 1 · Rocha Auto Peças — o desenho por escrito

> Este é o texto integral da proposta, seção por seção, do jeito que vai pro PDF.
> O que estiver em bloco `▸ estratégia` é nota nossa — **não vai** pro documento final.
> Regra que governa tudo: **confirma, não revela.** A proposta prova que entendemos a operação e nomeia o caminho — mas o *como se constrói* é o produto, e produto não vai de graça.

---

## 0. Cabeçalho

**IRBIS — Proposta comercial**
Rocha Auto Peças · A/C Roberto
Campinas, 19 de agosto de 2026 · válida por 7 dias

# Fase 1 · O projeto do sistema
**Diagnóstico de Operação — desenhado dentro da sua operação, não na prateleira**

`▸ estratégia` — "Projeto do sistema" é o nome que conversa com o frame dele ("montar um modelo pra daí oferecer"). "Diagnóstico de Operação" fica como subtítulo: é o nome do serviço, mas o que ele compra é o projeto.

---

## 1. Abertura — uma frase que devolve o critério a ele

> Roberto, na segunda você nos disse que conversa superficial não resolve — que era preciso ver o tamanho do buraco de perto. Na terça, vimos. Esta proposta é o que fazemos com o que vimos: o projeto do sistema da Rocha, desenhado dentro da sua operação, com data, entrega e condução semanal.

`▸ estratégia` — Abre devolvendo o crédito das duas decisões a ele (a call e o convite pra visita). Nada de "temos o prazer de apresentar".

---

## 2. O que vimos — o diagnóstico em números (prova de entendimento)

> Em uma manhã dentro da operação, com a sua equipe:
>
> - Clientes mandando **foto da placa sem dizer qual é o carro** — e o televendas usando ferramenta gratuita limitada (trava com 15–20 dias de uso, catálogo restrito a um grupo de marcas) só para descobrir o modelo.
> - **Ligações perdidas em volume que a própria equipe chama de "absurdo".**
> - Cerca de **10 peças por dia guardadas em endereço errado** — e peça recém-chegada que ninguém encontra sem desmontar prateleira.
> - **8 coletores Zebra TC26 já comprados** — usados só para guarda e inventário, quando poderiam guiar a separação inteira.
> - O **tempo de separação já é medido** pelo sistema, senha a senha — o dado existe; hoje ele não vira gestão.
>
> Nada disso é problema de gente. É a informação da peça que não flui: do cliente pro vendedor, do vendedor pro estoque, do estoque pro seu placar. Somado, é por aí que escapa o R$ 1 milhão por mês que você mesmo estimou.

`▸ estratégia` — Cada bullet é verificável por ele com a equipe dele (João, Thiago, Marcos falaram na nossa frente). O fecho amarra os 3 gargalos na frase-tese que já usamos no deck ("os três são um") e recoloca a âncora do 1 mi — que é número DELE, não nosso.

---

## 3. As três frentes — com caminho nomeado

### Frente 1 · Atendimento que identifica a peça

> O cliente manda a placa (ou a foto dela) no WhatsApp — como já faz hoje. A diferença: em vez de o vendedor virar detetive, o sistema identifica o veículo, cruza com o catálogo e com o seu cross, e entrega ao vendedor **o pedido já traduzido**. O caminho técnico existe e está mais perto do que parece: a integração de placa com o catálogo Fraga **o Jacsys já possui** — o que não existe em lugar nenhum é a amarração disso com o WhatsApp. É essa camada que a Fase 1 projeta.
>
> **O desenho desta frente especifica:** o fluxo do cliente de ponta a ponta (placa, foto, áudio, lista de peças); as regras de uso do cross para nunca errar peça — inclusive as pegadinhas de ano/semestre e versão que a sua equipe conhece de cor; o que roda dentro do Jacsys e o que se constrói fora; a volumetria e o custo estimado por consulta; e o critério de sucesso: orçamento respondido em minutos, não em fila.

`▸ estratégia` — Note o que NÃO está aqui: qual API, qual arquitetura de bot, qual fornecedor de WhatsApp, como se faz a leitura de placa por foto. Nomeamos Fraga e Jacsys porque foi o João que nos mostrou — isso é prova de escuta, não revelação. As "pegadinhas de ano/semestre" são as palavras do Roberto na call de segunda — devolvidas de propósito.

### Frente 2 · O GPS do estoque

> O seu endereçamento é completo — corredor, coluna, posição, andar. O endereço vocês já pagaram; o que falta é **o carteiro nunca mais errar**. E o aparelho do carteiro vocês também já pagaram: os TC26. A Fase 1 projeta a separação guiada e a guarda auditada rodando neles — o cupom vira sequência no coletor, item a item, com confirmação por leitura; a guarda só fecha no endereço certo. **Sem hardware novo.**
>
> **O desenho desta frente especifica:** o fluxo de separação e de guarda nos coletores, para as lojas e os CDs; a trilha que transforma os seus ~10 erros de guarda por dia em exceção auditada; como o tempo de separação que o sistema já mede vira meta por equipe; e o que precisa do Jacsys versus o que se constrói ao lado.

`▸ estratégia` — Este é o desenho que o João disse que ia "jogar pro pessoal do sistema". Colocar por escrito, com data desta semana, marca a autoria da ideia e cria urgência silenciosa: se o Jacsys pode fazer, por que ainda não fez em 20 anos? Porque "outras coisas são mais importantes pro grupo" — frase do próprio fornecedor, contada pelo João.

### Frente 3 · O placar da operação

> A taxa de fechamento por vendedor existe — extraída na mão, trabalhada no Excel. A Fase 1 projeta o placar automático: venda, separação e atendimento por loja e por pessoa, com alerta quando algo foge da régua — no modelo que o seu colega de São Paulo usa para achar a loja no vermelho antes do fim do mês.
>
> **O desenho desta frente especifica:** os indicadores que importam (e os que são vaidade); as fontes de cada dado dentro do Jacsys; e o desenho de acesso por perfil — **cada pessoa vê só o que deve**, resolvendo por arquitetura o risco de vazamento, com a mesma lógica do seu código interno no orçamento.

`▸ estratégia` — O benchmark do amigo de SP é dele (contou na conversa final). A objeção de vazamento é dele. A analogia com o código interno no orçamento é a regra da casa que ele mesmo criou — usar a lógica DELE pra responder o medo DELE.

---

## 4. Como garantimos que isso anda — a resposta da garantia, por escrito

> Você nos perguntou, com razão, como garantir que um investimento desses vai pra frente — você já viu projeto ser vendido e morrer por falta de equipe. Três mecanismos, e nenhum é promessa:
>
> **1 · Você não paga e espera.** São no mínimo 8 reuniões em 6 semanas. O trabalho aparece toda semana, e o rumo se ajusta antes de cada etapa — não depois do estrago.
>
> **2 · Cada etapa entrega um documento que fica seu.** Se em qualquer ponto você decidir parar, o que foi entregue está pago e é seu — **inclusive para outro executar**. Está em contrato.
>
> **3 · O desenho sai da sua operação.** Do seu catálogo, do seu cross, dos seus coletores, das suas telas. Não é ferramenta de prateleira que a gente torce pra encaixar — é por isso que fomos até aí antes de desenhar qualquer coisa.

`▸ estratégia` — É a resposta que ficou sem ser dada na call E na visita. O item 2 é o que desarma o trauma do projeto parado: o risco máximo dele deixa de ser "perdi tudo" e vira "fiquei com o projeto pago até onde foi".

---

## 5. As 6 semanas — o que acontece, semana a semana

> | Semana | O que acontece | O que você recebe |
> |---|---|---|
> | 1 | Imersão: medição de linha de base na loja principal e no CD (tempos de separação extraídos do sistema, volume e perda no WhatsApp e no telefone) | Reunião de abertura + retrato numérico da operação hoje |
> | 2 | Frente 1 — desenho do atendimento que identifica a peça | Documento da Frente 1, validado em reunião |
> | 3 | Frente 2 — desenho do GPS do estoque, lojas e CDs | Documento da Frente 2, validado em reunião |
> | 4 | Frente 3 — desenho do placar da operação | Documento da Frente 3, validado em reunião |
> | 5 | Parecer da integração (o que roda no Jacsys, o que se constrói ao lado, custos de operação) + ordem de construção com retorno estimado por frente | Parecer + ordem de ataque |
> | 6 | Consolidação e apresentação executiva | **O projeto do sistema completo + a proposta de construção fechada** — você decide o passo seguinte com o projeto na mão |
> | +90 dias | Acompanhamento: dúvidas, ajustes do desenho e suporte à decisão de construção | Acesso direto a nós, sem custo adicional |

`▸ estratégia` — O cronograma materializa a garantia nº 1 (toda semana tem entrega com reunião) e faz o "algo pra mostrar" que ele pediu aparecer já na semana 1 (o retrato numérico). A linha de base da semana 1 também protege a construção: qualquer proposta futura sai comparável ("hoje X minutos, depois Y").

---

## 6. Investimento

> | O que está incluído | |
> |---|---|
> | Desenho da Identificação de Peça (placa → Fraga → WhatsApp) | R$ 13.000 |
> | Desenho do GPS do Estoque, lojas e CDs | R$ 20.800 |
> | Desenho do WhatsApp com pedido identificado | R$ 13.000 |
> | Parecer da integração com o Jacsys | R$ 7.800 |
> | Ordem de construção, com retorno por frente | R$ 7.800 |
> | 8 reuniões de condução | R$ 10.400 |
> | Acompanhamento de 90 dias | R$ 10.000 |
> | **Somado, comprado separado** | ~~R$ 82.800~~ |
>
> ## **R$ 20.000**
> à vista (Pix) ou em até 12× no cartão, com encargos da plataforma. Fechado — sem surpresa, sem mensalidade escondida.
>
> Para calibrar: é **menos de um dia** do que hoje sai pela porta todo mês.

`▸ estratégia` — Preço cheio, sem menção a parceria, indicação ou desconto. Se ele levantar a parceria na conversa, a resposta ensaiada é: *"Parceria eu topo — comissão por cliente que você indicar e fechar. Mas ela vem depois do preço, não no lugar dele: embaixador de projeto que valeu a pena, não de projeto barato."* A régua da diária (R$ 2.600 de consultor sênior) fica na manga pra defesa verbal, não no papel.

---

## 7. Fechamento — a frase dele e o próximo passo

> *"Nenhum programa sai do zero sem ter uma ideia futura. Conforme cê vai ajustando, vai arrumando, ele vai melhorando."* — Foi você quem disse. É exatamente assim que trabalhamos — a diferença é que a Fase 1 põe esse processo em cronograma, com entrega e condução semanal.
>
> **Próximo passo:** assinatura + primeira parcela → primeira reunião marcada em até 5 dias úteis, dentro da operação.
>
> Nicolas Cunha · IRBIS

`▸ estratégia` — Fechar com a citação dele transforma a proposta num espelho: recusar a Fase 1 é recusar o próprio método que ele descreveu. O próximo passo é binário e com prazo — nada de "qualquer coisa estamos à disposição".

---

## O que fica FORA da proposta, de propósito

1. **Qualquer "como se constrói"** — arquitetura, fornecedor de API de WhatsApp, como ler placa por foto, estimativas de custo de bot. Isso é o miolo da Fase 1 (e da construção). No papel, só o *o quê* e o *porquê*.
2. **Desconto, parceria, indicação, embaixador** — já foi oferecido verbalmente na visita (erro nosso); repetir por escrito consolidaria a âncora baixa. O papel volta a régua pros 20 mil.
3. **Preço da construção (Fase 2)** — "proposta de construção fechada na entrega do desenho". Precificar agora seria chutar — e chute é o que os 200 concorrentes fazem.
4. **A demo da Odery** — na call ela abriu o flanco do "o nosso não seria assim". Prova social só se ele pedir, e já com a adaptação na boca.
5. **Menção a CNPJ/nota** — se o financeiro pedir, a resposta combinada: documento fiscal em até 15 dias úteis, ou entrada agora e saldo contra a nota. (Depende de a viabilidade na Redesim estar protocolada — pendência sua, urgente.)

## Pendências antes de gerar o PDF

- [ ] Confirmar a **data de envio** (o texto assume 19/ago de manhã) e a validade de 7 dias
- [ ] Confirmar "lojas e CDs" vs. "8 unidades" (o deck usou 8; na visita apareceram 7 lojas + 2 CDs — qual número oficial?)
- [ ] Mensagem no grupo do WhatsApp **hoje** (texto pronto na análise da visita) pra travar a apresentação de quinta — a proposta chega melhor apresentada do que fria no e-mail
