# Regras do hackathon e implicações para o projeto

Fonte: fotografias dos slides apresentados pela organização, recebidas em 8 de agosto de 2026.

## Discovery exigido

Antes de desenvolver, responder:

1. Qual trabalho ou fluxo de trabalho alguém precisa executar?
2. Por que isso ainda é feito manualmente?
3. O que muda para quem usa se funcionar?

### Resposta atual do projeto

- **Trabalho:** decidir diariamente quando e quanto irrigar em cada área, coordenar a execução e confirmar a aplicação.
- **Motivo do trabalho manual:** dados, regras, pessoas e equipamentos ficam separados; sensores e comandos não garantem sozinhos o resultado no campo.
- **Mudança:** o responsável deixa de reconstruir e conferir todo o processo e passa a supervisionar objetivos e exceções com registro do planejado, executado e confirmado.

## Orientação principal

> Começar pelo problema, não pela solução.

Consequência: sensores, digital twin, MCP, banco de dados e arquitetura não devem abrir o pitch. Eles aparecem depois que a dor e o usuário estiverem claros.

## Demo Day

Cada time terá **3 minutos**.

Estrutura sugerida pela organização:

- equipe: quem são e nome do time;
- problema: qual é, quem sofre e por que ainda não foi resolvido;
- solução: mostrar como resolve a dor por meio de demo ao vivo ou vídeo.

A organização destacou que os juízes querem ver o produto funcionando e que demo ao vivo supera descrição.

## Critérios de avaliação

Os quatro critérios têm pesos iguais:

1. Qualidade e aderência do protótipo ao tema do desafio.
2. Viabilidade do produto para se tornar uma startup.
3. Pitch oral do projeto.
4. Criatividade e originalidade.

### Consequência para a equipe

Um protótipo tecnicamente amplo não compensa uma dor confusa, assim como um pitch forte não compensa uma demo quebrada. O trabalho deve ser dividido entre os quatro critérios.

## Regras gerais identificadas

1. O projeto deve ser desenvolvido durante o hackathon.
2. O uso de IA é obrigatório como parte da solução.
3. Código pré-existente, bibliotecas e frameworks são permitidos desde que não comprometam a integridade competitiva.
4. APIs de terceiros, modelos pré-treinados e plataformas de IA são permitidos, desde que o uso seja legal e declarado à organização.
5. Os times devem ter de duas a quatro pessoas; participação individual não é permitida.
6. A apresentação no Demo Day é obrigatória para concorrer à premiação.
7. Apenas projetos submetidos pelo Painel do Hackathon serão considerados.
8. Trapaça ou desonestidade resulta em desqualificação imediata.

## Proteção contra risco de desclassificação

Antes de começar o desenvolvimento, registrar:

- o que já existia no backend e na simulação;
- o que será construído durante o hackathon;
- bibliotecas, APIs, modelos e plataformas externas;
- quem implementou cada parte;
- horário do primeiro commit e histórico dos commits durante o evento.

Na submissão, declarar o backend pré-existente e destacar como entregas do hackathon o agente, as ferramentas, as políticas, o ciclo de confirmação, a interface e a demo que forem de fato construídos durante o evento.

## Distribuição inicial dos 180 segundos

- **0–10 s:** nome do time e frase de contexto.
- **10–50 s:** personagem, trabalho e falha concreta.
- **50–65 s:** promessa da solução.
- **65–145 s:** demo do ciclo observar → decidir → agir → confirmar ou escalar.
- **145–165 s:** viabilidade de startup e comprador.
- **165–180 s:** resultado demonstrado e encerramento.

Essa divisão deve ser ajustada após cronometrar a demo. O tempo da demonstração é prioridade.

## Demo recomendada para o protótipo atual

Evitar três demonstrações independentes de irrigação, chuva e NPK. Em três minutos, uma única história com sucesso e exceção explica melhor o valor do agente:

1. O Pivô A atende uma área seca e não há chuva suficiente prevista.
2. O agente consulta estado, previsão e política aprovada.
3. O agente liga bomba e irrigador pelas ferramentas disponíveis.
4. Telemetria, consumo e resposta da umidade confirmam que a aplicação aconteceu.
5. O Pivô B recebe comando, mas não existe bomba/pressão disponível.
6. A umidade não responde; o agente identifica a divergência, interrompe o ciclo e chama o responsável.

Essa sequência demonstra raciocínio contextual, uso de ferramentas, ação no ambiente, verificação do resultado e escalonamento. Também torna visível a diferença entre “mandar ligar” e “confirmar que irrigou”.

Para manter aderência ao recorte, a interface e a narração devem apresentar cada unidade como **Pivô A** e **Pivô B**, e não apenas como talhões ou irrigadores genéricos. O backend atual simula áreas e atuadores; durante o hackathon, o time precisa tornar explícito que cada cenário representa um pivô central com estado e ciclo próprios.
