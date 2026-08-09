# Resumo atualizado do problema, ICP, solução e MVP

Documento preparatório para o hackathon. Ele registra as mudanças feitas após a análise do pitch inicial, das rotas do backend, dos relatos de produtores e das regras apresentadas pela organização.

## Resumo em uma frase

O projeto será um agente de IA para operações com múltiplos pivôs centrais. O agente coordena o manejo aprovado, executa ações permitidas, confirma se a água chegou ao campo e chama uma pessoa quando encontra uma falha ou uma situação sem segurança para agir.

## 1. Como a ideia começou

A proposta inicial descrevia um digital twin da fazenda que recebia dados de solo e clima. Um agente usaria essas informações para controlar irrigação e adubação sem esperar comando humano.

O pitch inicial apresentava estes pontos:

- decisão de irrigação com sensores e previsão do tempo;
- atuação automática sobre irrigação e NPK;
- correção de acidez a partir de pH e salinidade;
- arquitetura modular com MCP;
- digital twin por talhão;
- possibilidade de adicionar visão computacional e imagens de satélite.

A proposta explicava a tecnologia com detalhes, mas descrevia pouco o trabalho diário do cliente. Também tratava como geral uma dor que varia entre as propriedades.

## 2. O que a pesquisa mostrou

Produtores e estudos de campo confirmaram que o responsável pelo manejo precisa decidir quando e quanto irrigar. A rotina inclui programação, acompanhamento do equipamento e verificação do resultado.

Os relatos também trouxeram uma contradição. Alguns produtores ganharam tempo com telemetria e controle remoto. Outros disseram que alertas adicionais não ajudam porque o agrônomo e o operador já detectam os problemas.

Esse contraste refinou o projeto. O produto precisa atender operações nas quais a coordenação entre pivôs, pessoas e sistemas ainda apresenta atrasos ou falhas sem confirmação.

## 3. Problema que descartamos

A frase “o produtor desperdiça água porque decide tudo manualmente” ficou ampla e pouco segura.

Ela apresenta quatro falhas:

- vários produtores já usam sensores, aplicativos e controle remoto;
- uma decisão manual pode ser correta e adequada à operação;
- um sensor adicional não garante uma decisão melhor;
- não temos base para prometer um percentual universal de economia.

## 4. Problema atual

### Frase principal

> Em operações com múltiplos pivôs centrais, o responsável precisa juntar dados, coordenar pessoas e equipamentos e conferir se cada aplicação aconteceu. Mudanças no clima, falhas mecânicas ou problemas de comunicação podem afastar o manejo executado do plano aprovado.

### Explicação simples

O responsável cuida de vários pivôs ao mesmo tempo. Cada pivô pode atender uma cultura, um solo e uma programação diferente. A pessoa consulta dados, decide prioridades, envia comandos e acompanha a operação.

O painel pode informar que um comando foi enviado ou que o pivô se movimentou. Essa informação não prova que a área recebeu a quantidade de água planejada. Uma bomba pode falhar, a pressão pode cair ou a aplicação pode terminar fora do tempo esperado.

Chamamos a diferença entre o plano e o resultado de **desvio de manejo**.

## 5. Trabalho que alguém precisa executar

O responsável precisa manter cada área atendida pelos pivôs dentro do manejo hídrico aprovado.

A rotina envolve:

1. Consultar umidade, clima, previsão e estado dos pivôs.
2. Avaliar quais áreas precisam de água e quais devem esperar.
3. Definir a sequência e a quantidade de aplicação.
4. Programar o pivô ou orientar o operador.
5. Acompanhar bomba, consumo e evolução do ciclo.
6. Confirmar se a área respondeu à aplicação.
7. Corrigir o plano ou chamar alguém diante de uma falha.

## 6. Motivos para o trabalho continuar manual

- Dados ficam espalhados entre sensores, aplicativos, painéis e pessoas.
- Solo e chuva variam dentro da mesma propriedade.
- Um sensor representa o ponto onde foi instalado e pode não representar toda a área.
- Equipamentos de marcas e idades diferentes usam controles distintos.
- A conexão rural pode atrasar comandos e atualizações.
- Regras agronômicas dependem da cultura, da fase e do objetivo produtivo.
- O responsável mantém a obrigação pelo resultado e precisa confiar no sistema.
- Muitas ferramentas mostram dados, mas deixam a coordenação e as exceções com a equipe.

## 7. ICP do MVP

O MVP atenderá operações comerciais com **dois ou mais pivôs centrais**.

### Comprador provável

Proprietário-gestor ou gerente agrícola responsável por custo, produtividade e risco operacional.

### Usuário diário provável

Gerente de irrigação, encarregado ou operador que programa pivôs, acompanha ciclos e trata falhas.

### Autoridade agronômica

Agrônomo interno ou consultor que define faixas, limites e situações que exigem aprovação.

Esses papéis podem pertencer à mesma pessoa em uma propriedade menor. Em operações maiores, pessoas diferentes compram, usam e aprovam o manejo.

### Condições que fortalecem a dor

- vários pivôs ou propriedades distantes;
- painéis, marcas ou gerações diferentes;
- equipe enxuta e tarefas concorrentes;
- falhas descobertas com atraso;
- operação em horários específicos de água ou energia;
- informações divididas entre aplicativos, planilhas e mensagens;
- baixa confiança em comandos automáticos sem confirmação.

### Perfis fora do MVP

- operação com apenas um pivô;
- gotejamento, microaspersão ou inundação;
- propriedade simples e próxima, com inspeção fácil;
- operação que já integra decisão, execução e confirmação;
- cliente que não permite nenhum comando automatizado.

## 8. Mudança feita na solução

A primeira versão concentrava a proposta em sensores, digital twin e decisões autônomas sobre irrigação e nutrientes.

A versão atual concentra o MVP em coordenação multipivô e execução confirmada. O agente trabalha dentro de regras aprovadas por pessoas responsáveis.

O digital twin mantém a representação do estado de cada pivô e da área atendida. O agente usa esse estado para planejar, agir e verificar. O digital twin apoia o produto, mas não ocupa o centro do pitch.

## 9. Solução atual

O agente recebe um objetivo de manejo e limites aprovados. Depois, executa este ciclo:

1. **Observar:** consulta solo, clima, previsão, consumo e estado dos pivôs.
2. **Avaliar:** identifica necessidade, conflito ou falha.
3. **Planejar:** escolhe uma sequência de ações dentro das regras permitidas.
4. **Autorizar:** verifica limites determinísticos de segurança.
5. **Executar:** usa ferramentas para ligar, desligar ou ajustar os equipamentos.
6. **Confirmar:** compara comando, estado do equipamento, consumo e resposta da área.
7. **Replanejar ou escalar:** tenta outra ação segura ou chama o responsável.
8. **Registrar:** salva o plano, a execução, a confirmação e a justificativa.

## 10. Motivo para usar um agente de IA

Uma automação por limite executa uma regra fixa, como ligar quando a umidade cai abaixo de um valor.

O agente recebe um objetivo, consulta fontes diferentes, escolhe ferramentas, executa vários passos e observa o resultado. Ele pode mudar o plano ou pedir ajuda quando o campo não responde como esperado.

Essa capacidade atende o tema do hackathon e permite demonstrar autonomia com limite de segurança.

## 11. Limites da autonomia

O agente não criará regras agronômicas sem aprovação. Ele também não substituirá o agrônomo.

O agente deve interromper ou escalar quando encontrar:

- sensor ausente ou incoerente;
- falta de cultura ou regra aprovada;
- previsão e dados locais em conflito;
- falha de bomba, pressão ou comunicação;
- resposta diferente da esperada;
- risco fora do limite definido.

## 12. Mudança na fertirrigação

A versão inicial dizia que o agente corrigiria a acidez com NPK quando o pH saísse da faixa.

Essa lógica saiu do MVP pelos seguintes motivos:

- pH mede acidez ou alcalinidade, não informa sozinho a necessidade de NPK;
- condutividade elétrica indica concentração total de íons, sem identificar cada nutriente;
- uma prescrição nutricional depende de cultura, fase, análise e orientação agronômica;
- uma decisão errada pode prejudicar a lavoura.

A fertirrigação poderá entrar como módulo supervisionado. O agente executará uma receita aprovada e respeitará limites de pH, condutividade e operação. Ele não criará a receita.

## 13. Diferencial competitivo revisado

Empresas do setor já oferecem sensores, recomendações, telemetria e controle remoto de pivôs. O pitch não deve afirmar que nenhuma solução faz isso.

Nossa hipótese de diferenciação combina:

- coordenação de vários pivôs e fontes de dados;
- integração independente de marca por ferramentas;
- regras explícitas de segurança;
- confirmação do resultado no campo;
- replanejamento e escalonamento de exceções;
- histórico do planejado, executado e confirmado.

A equipe ainda precisa validar essa diferença com produtores e comparar integrações disponíveis nos concorrentes.

## 14. Demo recomendada

A demonstração contará uma história com dois pivôs.

### Pivô A: execução confirmada

1. A área está seca e a previsão não indica chuva suficiente.
2. O agente consulta estado e regras.
3. O agente liga a bomba e o pivô.
4. Consumo e umidade respondem.
5. O agente registra a aplicação como confirmada.

### Pivô B: desvio detectado

1. A área também precisa de água.
2. O agente envia o comando.
3. A bomba ou a pressão não responde.
4. A umidade permanece sem mudança.
5. O agente detecta a divergência, interrompe o ciclo e chama o responsável.

A demo mostra o diferencial em poucos segundos: enviar um comando não garante que a irrigação aconteceu.

## 15. Mudança no pitch

O pitch terá três minutos. A organização pediu que os times comecem pelo problema e mostrem o produto funcionando.

Distribuição inicial:

- 10 segundos para equipe e contexto;
- 40 segundos para personagem e problema;
- 15 segundos para apresentar a proposta;
- 80 segundos para a demo;
- 20 segundos para comprador e viabilidade;
- 15 segundos para resultado e encerramento.

A interação “fechem os olhos” pode ocupar os primeiros segundos, desde que não atrase a demonstração.

Detalhes como MCP, PostgreSQL e arquitetura de serviços entram quando ajudam a explicar uma ação visível. A apresentação não deve gastar tempo enumerando componentes técnicos.

## 16. Critérios do hackathon

Os quatro critérios possuem o mesmo peso:

1. Qualidade e aderência do protótipo ao desafio.
2. Viabilidade para se tornar uma startup.
3. Pitch oral.
4. Criatividade e originalidade.

A IA precisa participar da solução. A organização permite código anterior, bibliotecas, APIs e modelos pré-treinados, desde que o time declare o uso e preserve a integridade da competição.

O time deve registrar o que existia antes do evento e o que construiu durante o hackathon.

## 17. Afirmações que não usaremos

- “Todo produtor sofre com falta de informação.”
- “A agricultura ainda faz tudo manualmente.”
- “Nenhum concorrente integra irrigação e dados.”
- “O sistema economiza 50% ou 60% de água.”
- “O agente substitui o agrônomo.”
- “pH baixo significa necessidade de NPK.”
- “Comando enviado significa irrigação executada.”

Essas frases não possuem sustentação suficiente ou descrevem o campo de forma errada.

## 18. Evidências que sustentam o problema

- Leandro Sato relatou decisão diária, área por área, sobre quando e quanto irrigar.
  Fonte: https://qa.abid.org.br/Recursos/Arquivos/item_116_117.pdf

- Cristian Braun, Arthur Tondato e Luiz Renato Barros Correia relataram controle remoto, redução de deslocamentos e reação a falhas. A matéria foi produzida com a Valley e deve ser tratada como promocional.
  Fonte: https://opresenterural.com.br/irrigacao-remota-reduz-deslocamentos-e-muda-rotina-operacional-no-campo/

- Um produtor brasileiro anônimo de soja e milho irrigados disse que novos alertas não agregavam porque o agrônomo e o operador já cobriam o processo. O relato serve como contraprova e não como retrato do mercado inteiro.
  Fonte: https://www.reddit.com/r/empreendedorismo/comments/1s5506a/montei_um_software_pro_agro_e_o_maior_desafio_%C3%A9/

- Um estudo com dez agricultores da Geórgia encontrou decisões constantes, sensores que exigem interpretação, limitações de conexão e sobrecarga tecnológica.
  Fonte: https://getd.libs.uga.edu/pdfs/stone_whitney_a_201905_maee.pdf

- A Alabama Cooperative Extension documentou um pivô configurado para aplicar 0,8 acre-inch que aplicou cerca de 0,2. O produtor não percebeu a falha pelo painel; a resposta do solo revelou o desvio.
  Fonte: https://www.aces.edu/blog/topics/crop-production/operation-maintenance-problems-of-center-pivot-irrigation/

- A família McPheeters relatou que uma parada sem monitoramento poderia custar de 12 a 24 horas de irrigação.
  Fonte: https://www.agriculture.com/technology/crop-management/technology-subs-for-labor

## 19. Pontos que ainda exigem validação

Antes de tratar a proposta como negócio validado, precisamos entrevistar gestores, gerentes de irrigação e operadores de operações multipivô.

As entrevistas devem medir:

- quantidade de pivôs e distância percorrida;
- ferramentas e marcas em uso;
- pessoas envolvidas em cada decisão;
- frequência de falhas e tempo de descoberta;
- forma usada para confirmar a aplicação;
- custo de uma janela perdida;
- ações que o responsável aceitaria delegar;
- número que provaria valor em um piloto de 30 dias.

## 20. Definição final para orientar o time

### Problema

Operações com múltiplos pivôs dependem de pessoas para juntar informações, coordenar equipamentos e conferir o resultado. Uma falha pode criar diferença entre o manejo aprovado e a água entregue à lavoura.

### Cliente

Proprietário-gestor ou gerente agrícola de uma operação comercial com dois ou mais pivôs centrais e lacunas de coordenação ou confirmação.

### Solução

Agente de IA que coordena pivôs dentro de regras aprovadas, executa ações permitidas, confirma o resultado e escala exceções.

### Promessa do MVP

Dar ao responsável uma visão confiável do que foi planejado, do que os equipamentos fizeram e do que o campo confirmou.
