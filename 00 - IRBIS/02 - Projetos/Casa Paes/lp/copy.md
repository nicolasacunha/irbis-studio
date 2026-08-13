# LP Protocolo de Emagrecimento — Casa Paes (Matheus Utrabo)

**Copy v3 — 11/ago/2026 — IRBIS (aplicação da revisão do cliente)**
Fonte da v3: `02-plano/Revisao LP.pdf`, enviado pelo Matheus. A revisão reescreveu copy e estrutura da página inteira; esta versão substitui a v2 (24/jul).
Público: adultos 30-55, unissex, Brasil. Página para tráfego pago, foco mobile.

## O que mudou da v2 para a v3

1. **Novo CTA.** Saiu "Agendar minha avaliação" (label único). Entraram três labels conforme o momento da página: **"Quero começar meu protocolo"** (hero e protocolo), **"Quero minha avaliação"** (seção da dor) e **"Iniciar avaliação médica"** (header, simulador, CTA final, sticky mobile). Destino segue o WhatsApp em todos.
2. **Hero reescrito.** Nova headline, nova subheadline, os 4 bullets de valor saíram e entrou o selo de confiança (+2.000 pacientes • Atendimento 100% médico • Sigilo total).
3. **Barra de números com dados de resultado** (89%, 5.000 consultas), no lugar dos placeholders de volume/experiência da v2.
4. **Seção nova "Virada / método"** entre a dor e o como funciona.
5. **Como funciona reescrito:** o passo "Tudo na sua casa" assume a entrega de medicação no endereço do paciente (a v2 não citava entrega).
6. **Protocolo/tratamento** absorve a antiga seção de personalização, com o dado clínico de até 22,5% do peso corporal e nota de rodapé sobre dispensação.
7. **Seção nova de depoimentos** com 3 relatos e 5 estrelas. O depoimento único que ficava dentro da seção do médico migrou pra cá.
8. **FAQ trocado por inteiro:** 7 perguntas novas (JSON-LD FAQPage atualizado). Saíram as perguntas sobre preço, duração do tratamento, cancelamento/fidelidade e comprar o medicamento por fora.
9. **Footer legal ampliado** com os 4 blocos enviados pelo cliente.
10. **Mantidas da v2, por não constarem da revisão:** seção comparativa (por que não comprar por conta própria) e seção do médico responsável.

---

## CTAs da página

| Posição | Label | Destino |
|---|---|---|
| Header | Iniciar avaliação médica | WhatsApp |
| Hero | Quero começar meu protocolo | WhatsApp |
| Seção da dor | Quero minha avaliação | WhatsApp |
| Protocolo | Quero começar meu protocolo | WhatsApp |
| Simulador | Iniciar avaliação médica | WhatsApp |
| CTA final | Iniciar avaliação médica | WhatsApp |
| Sticky mobile | Iniciar avaliação médica | WhatsApp |

**Destino base:** `https://wa.me/5549999999999`
[PLACEHOLDER: número de WhatsApp real do Matheus — trocar o 5549999999999 em TODOS os botões]

---

## Seção 1 — Header fixo

- **Logo (texto provisório):** CASA PAES — wordmark em EB Garamond, caps, letter-spacing 0.18em. [PLACEHOLDER: nome/logo final]
- **Botão:** Iniciar avaliação médica
- Sem menu de navegação.

---

## Seção 2 — Hero

- **Badge:** Protocolo de emagrecimento com acompanhamento médico
- **H1:** O peso cobra um preço muito mais alto do que aparece na balança.
- **Subcopy:** Cansaço, disposição lá embaixo, roupa apertando, saúde em risco. A boa notícia: dá pra virar esse jogo com avaliação médica, protocolo individual e acompanhamento de verdade, tudo online.
- **CTA:** Quero começar meu protocolo
- **Linha de apoio:** Comece pela avaliação médica. Rápido, online e sem compromisso.
- **Selo:** +2.000 pacientes acompanhados • Atendimento 100% médico • Sigilo total
  [PLACEHOLDER: confirmar o nº real de pacientes acompanhados]

---

## Seção 3 — Barra de números

1. **+2.000** — Pacientes acompanhados
2. **89%** — Melhoraram peso e disposição
3. **5.000** — Consultas realizadas
4. **6 meses** — De protocolo acompanhado

- **Linha fina:** Pacientes reais. Resultados variam conforme cada organismo e por isso cada protocolo é individual.

[PLACEHOLDER: os 4 números precisam de dado real e fonte verificável antes do ar.]
[NOTA CFM: "89% melhoraram peso e disposição" é métrica de resultado clínico agregado. A v2 evitava esse tipo de número de propósito. Entrou por decisão do cliente e precisa da validação do médico responsável, que responde pela publicidade.]

---

## Seção 4 — Seção da dor

- **Headline:** Os sinais aparecem muito antes da balança acusar.
- **Subcopy:** Não é preguiça, não é falta de vontade. É o corpo pedindo ajuda, e cada mês adiando cobra mais caro.

- **6 sinais:**
  1. Acordar cansado, como se não tivesse dormido.
  2. A energia despencar no meio da tarde e derrubar seu dia.
  3. A roupa que parou de servir e a que você evita comprar.
  4. Fugir do espelho e sair de toda foto.
  5. Cansar antes dos filhos numa brincadeira boba.
  6. Sentir a saúde escapando: pressão, sono, exames.

- **Destaque (gancho extra 2), entre a lista e o fecho:** Você não falhou nas dietas. As dietas falharam com você.
- **Fecho:** O peso não avisa com dor. Avisa em silêncio, todo dia. Quanto antes você trata, mais fácil é reverter.
- **Microcopy:** Chega de empurrar com a barriga.
- **CTA:** Quero minha avaliação

Formato: a revisão pede "seis cartões"; a página mantém a lista numerada da v2 (mesmos seis itens, com a foto ao lado). Trocar por grid de cartões é ajuste de 10 minutos, se o Matheus quiser o formato literal.

---

## Seção 5 — Virada / método (nova)

- **Epígrafe (gancho extra 1):** O objetivo nunca foi só perder peso. É recuperar disposição, confiança e saúde.
- **Headline:** Emagrecer não deveria depender só de força de vontade.
- **Texto:** Se dieta da moda e "fechar a boca" resolvessem, você já teria resolvido. Emagrecer com saúde é ciência e acompanhamento: entender por que **o seu** corpo ganha peso e montar um plano feito pra ele, com médico do seu lado do começo ao fim.

---

## Seção 6 — Como funciona

- **Headline:** Do primeiro contato ao resultado, em poucos dias.

1. **Avaliação médica online.** Consulta por vídeo com médico, sem sala de espera.
2. **Análise do seu caso.** Histórico, rotina e exames olhados de perto.
3. **Protocolo individual.** O médico define a conduta certa pro seu corpo.
4. **Tudo na sua casa.** Você recebe o que precisa no seu endereço, com praticidade.
5. **Acompanhamento contínuo.** Retornos, ajustes e canal direto com a equipe.

- **Fecho:** Simples pra você. Rigoroso por dentro: cada etapa passa por médico.

[NOTA CFM: "do primeiro contato ao resultado, em poucos dias" liga prazo a resultado. É o tipo de promessa que a v2 evitava. Validar com o médico responsável.]

---

## Seção 7 — Protocolo / tratamento

- **Headline:** Não existe um único protocolo. Existe o certo pra você.

- **Texto 1:** Cada pessoa engorda por um motivo diferente: metabolismo, rotina, histórico, saúde. Por isso nós não entregamos "receita de bolo". Depois de avaliar seu caso, o médico define a estratégia ideal, que **pode incluir medicação quando indicada**, sempre com dose e acompanhamento individuais. A decisão é médica e é sua, nunca automática.

- **Texto 2:** Estudos clínicos com esse tipo de tratamento mostram perda de peso significativa ao longo de 6 meses, em alguns casos de até 22,5%* do peso corporal. Resultados variam individualmente e dependem da avaliação, da adesão e do acompanhamento médico.

- **CTA:** Quero começar meu protocolo
- **Microcopy (gancho extra 3):** Comece pela avaliação. O resto o médico monta com você.

[PLACEHOLDER: fonte do dado de 22,5% (estudo, ano, população). Número sem referência publicada é frágil em publicidade médica.]

---

## Seção 7B — Comparativo (mantida da v2)

Não consta da revisão do cliente. Mantida porque sustenta o argumento de procedência que o FAQ da v3 deixou de cobrir. Único ajuste: a coluna do cuidado agora cita laboratórios parceiros homologados e entrega refrigerada, alinhando com as seções 6 e 11.

- **Headline:** Por que não comprar o medicamento por conta própria
- **Subcopy:** Tirzepatida e semaglutida funcionam dentro de contexto clínico. O que muda tudo é como elas chegam até você.
- **Fecho:** Cuidado médico existe pra isso: alguém responsável pelo seu caso quando o corpo responde de um jeito que a bula não previu.

---

## Seção 8 — Simulador de peso

- **Headline:** Veja uma projeção da sua jornada.
- **Subcopy:** Arraste seu peso atual e veja um exemplo de evolução em 6 meses. Simulação ilustrativa: resultados variam conforme organismo, adesão e acompanhamento médico.
- **Micro-CTA:** Quer saber o que é realista pro *seu* caso? Comece pela avaliação.
- **Disclaimer (mantido, visível junto ao gráfico):** Esta projeção é ilustrativa e não representa promessa de resultado. Cada organismo responde de um jeito; ritmo e resultado dependem de avaliação médica, adesão ao protocolo e características individuais.

---

## Seção 9 — Depoimentos (nova)

- **Headline:** Resultados reais de quem parou de adiar.
- Formato: 3 relatos, 5 estrelas, sem kg e sem antes/depois.

1. "Em 4 meses eu voltei a subir escada sem parar no meio. Foi a primeira vez que senti que olharam pro meu caso." — M. Ferreira, 44, paciente há 8 meses
2. "Em 3 meses minha disposição mudou. Acordo antes do despertador e a tarde não me derruba mais." — R. Alves, 38, paciente há 6 meses
3. "Em 5 meses parei de fugir das fotos. O plano coube na minha rotina e eu tenho com quem falar no meio da semana." — C. Lima, 51, paciente há 9 meses

- **Linha fina:** Depoimentos de pacientes reais, publicados com autorização.

[PLACEHOLDER: os 3 são fictícios. Substituir por relatos reais, por escrito e com autorização de uso, antes do ar. A linha fina afirma que são reais.]

---

## Seção 10 — Médico responsável (mantida da v2, sem o depoimento)

- **Headline:** Quem acompanha você do primeiro exame à manutenção
- 2 parágrafos de história.

[PLACEHOLDER: nome completo + CRM/UF + RQE, história real e foto profissional do médico. A foto atual é de banco.]

---

## Seção 11 — O que está incluído

- **Headline:** Tudo num acompanhamento só

1. Avaliação médica online
2. Protocolo individual desenvolvido pro seu caso
3. Acompanhamento médico contínuo
4. Suporte especializado entre as consultas
5. Entrega refrigerada no seu endereço, com praticidade
6. Suporte também na fase de manutenção

- **Fecho:** Sem custo escondido, sem pacote surpresa: você sabe exatamente o que recebe.

---

## Seção 12 — FAQ (7 perguntas, espelhadas no JSON-LD)

- **Headline:** Casa Paes responde suas dúvidas

**1. A avaliação é online mesmo? É segura?**
Sim. Tudo passa por médico: a avaliação, a conduta e os ajustes. O online muda o canal, não o rigor.

**2. Como funciona a primeira consulta?**
Você fala com a equipe, agenda e é atendido por vídeo. O médico analisa seu caso antes de indicar qualquer coisa.

**3. O tratamento inclui medicação injetável?**
Pode incluir, se o médico indicar depois de avaliar você, nunca no automático. Qual conduta serve, ou se serve, é decisão médica individual.

**4. E se eu tiver alguma contraindicação?**
Por isso existe a avaliação: o médico revisa seu histórico e exames antes de indicar qualquer conduta.

**5. As medicações são seguras?**
Sim. Todos os tratamentos são prescritos após avaliação médica individual e produzidos por laboratórios parceiros homologados, seguindo rigorosos padrões de qualidade, segurança e conformidade regulatória.

**6. Quais são as contraindicações?**
As contraindicações variam de acordo com cada protocolo e histórico de saúde do paciente. Por isso, todas as informações são analisadas pela equipe médica antes de qualquer prescrição, garantindo uma indicação segura e individualizada.

**7. Quem fabrica os produtos?**
Os tratamentos são produzidos por laboratórios parceiros homologados, selecionados com base em critérios rigorosos de qualidade, segurança e conformidade regulatória.

[Perguntas que saíram nesta revisão e valem reconsiderar: preço/pagamento, duração do tratamento, cancelamento/fidelidade. São as três dúvidas que mais travam decisão em tráfego frio.]

---

## Seção 13 — CTA final

- **Detalhe caligráfico (Luxurious Script, único uso na página):** avaliação
- **Headline:** Recuperar sua disposição pode começar com uma simples avaliação.
- **Texto:** O próximo mês vai passar de qualquer jeito. A pergunta é como você quer chegar nele. Comece hoje, com quem entende do assunto.
- **Botão:** Iniciar avaliação médica
- **Selo:** Online • Sem compromisso • Atendimento 100% médico • Sigilo total

---

## Seção 14 — Footer (disclaimer legal)

Quatro blocos, em ordem:

1. *Se prescrito, conectaremos você a uma farmácia parceira para realizar a dispensação. (nota de rodapé do asterisco da seção 7)
2. Venda e uso sob prescrição médica. Imagens meramente ilustrativas. Resultados podem variar conforme avaliação médica individual.
3. Bloco regulatório longo, conforme enviado pelo cliente (automedicação, preços, marketplace, RDC 67/2007 e RDC 44/2009).
4. Casa Paes · Responsável técnico + CNPJ + endereço. [PLACEHOLDER]

[ATENÇÃO — bloco 3: o texto veio com uma lacuna de nome ("A ___ é um marketplace...") e foi preenchido com "Casa Paes". Ele descreve uma operação de marketplace de cosméticos, medicamentos e suplementos, com carrinho e sacola de compras. A Casa Paes, como descrita no kickoff, é protocolo médico com entrega, não marketplace, e a página não tem carrinho. Precisa de revisão jurídica antes do ar: afirmar operação que não existe é risco maior do que ficar sem o parágrafo.]

---

## Checklist de pendências pro Matheus

1. Número de WhatsApp real (trocar em todos os CTAs)
2. Nome da marca/logo final
3. Os 4 números da barra de prova, com fonte (inclusive o 89%)
4. Fonte do dado de até 22,5% do peso corporal
5. Depoimentos reais autorizados (os 3 atuais são fictícios)
6. História do médico, CRM/UF, RQE, foto real
7. Razão social, CNPJ, endereço, responsável técnico
8. Validação jurídica do bloco legal de marketplace
9. Validação de compliance da página inteira pelo médico responsável antes do ar

[NOTA CFM GERAL: a v3 traz três claims que a v2 evitava de propósito — percentual agregado de melhora, percentual de perda de peso e prazo ligado a resultado ("em poucos dias") — além de depoimentos com estrelas. São decisões do cliente e a responsabilidade publicitária perante o CFM é do médico responsável. A revisão dele é condição pra publicar.]
