# Cognitiva: documento consolidado do hackathon

**Data de consolidação:** 8 de agosto de 2026  
**Objetivo:** registrar as decisões, pesquisas, hipóteses, mudanças de escopo, preparação do pitch e referências discutidas neste chat.

## Como ler este documento

- **Confirmado:** informação presente em uma fonte identificada ou em um artefato técnico já existente.
- **Hipótese:** interpretação usada para orientar o MVP e o pitch, ainda dependente de entrevistas.
- **Pendente:** ponto que precisa de validação antes de virar promessa comercial.

O documento consolida o trabalho. Ele não substitui a lista completa de fontes, disponível em `RESEARCH/Fontes_74_pesquisa_irrigacao_fertirrigacao.csv`.

---

## 1. Origem do projeto

O projeto começou com dois materiais enviados pelo time:

- `README2.md`, com a descrição do backend da Fazendinha, suas rotas, simulador, persistência e telemetria.
- `PitchComercial.txt`, com uma proposta de digital twin, sensores, previsão do tempo, irrigação, fertirrigação e agente de IA.

O backend atual simula uma fazenda com cenas, objetos, sensores, atuadores, clima, consumo e histórico em Postgres. A ideia inicial do pitch descrevia a solução com bastante detalhe técnico, mas explicava pouco o trabalho diário do cliente e o problema que justificaria a compra.

O trabalho deste chat reorganizou a proposta para começar pelo problema, definir o cliente, verificar a oportunidade e só depois explicar a solução.

---

## 2. Ideia inicial e desalinhamentos encontrados

### Ideia inicial

A proposta inicial descrevia:

- digital twin da fazenda e dos talhões;
- sensores de solo e clima;
- previsão do tempo;
- agente que decidiria quando irrigar;
- atuação automática sobre irrigação e NPK;
- correção de acidez com base em pH e salinidade;
- arquitetura modular usando MCP;
- possibilidade de visão computacional e imagens de satélite;
- execução on-premises ou na nuvem;
- dashboard e notificações ao produtor.

### Problemas do pitch inicial

- O pitch começava pela tecnologia e não pelo trabalho do cliente.
- A frase “o produtor desperdiça água porque decide tudo manualmente” era ampla demais.
- Muitos produtores já usam telemetria, aplicativos, sensores e operadores.
- Uma decisão manual pode ser correta para a situação local.
- Sensor novo não garante decisão melhor.
- Comando enviado não prova que a água foi aplicada.
- O material prometia automação de fertirrigação sem delimitar a responsabilidade agronômica.
- O pitch original usava números de mercado e de economia sem uma base que pudesse ser defendida no palco.
- A solução parecia competir diretamente com plataformas de telemetria já existentes.

### Afirmações retiradas ou colocadas em revisão

O material inicial mencionava:

- irrigação como 46% da retirada de água e 67% do consumo no Brasil;
- perdas de 50% a 60% por má gestão;
- setor de R$ 300 bilhões por ano;
- menos de 20% do potencial irrigável utilizado;
- até 35% de economia de água;
- inexistência de produto que una solo, clima, previsão e cultura em um único agente.

Essas afirmações não devem entrar no pitch atual sem uma fonte específica e verificável. A pesquisa posterior não validou esses percentuais nem autorizou prometer economia universal.

---

## 3. Processo de discovery do hackathon

Os slides da organização pediram respostas para três perguntas antes de abrir o editor:

1. Qual é o trabalho ou fluxo de trabalho que alguém precisa fazer?
2. Por que esse trabalho ainda é feito manualmente?
3. O que muda para quem usa se isso funcionar?

Também ficou claro que o pitch deve começar pelo problema, mostrar quem sofre e demonstrar o protótipo funcionando.

### Respostas consolidadas

**Trabalho:** decidir diariamente quando e quanto irrigar em cada área, coordenar a execução e confirmar a aplicação.

**Por que continua manual:** dados, regras, pessoas e equipamentos ficam separados; sensores e comandos não garantem sozinhos o resultado no campo.

**O que muda:** o responsável deixa de reconstruir e conferir todo o processo manualmente e passa a supervisionar objetivos e exceções, com registro do planejado, executado e confirmado.

---

## 4. Pesquisa realizada

Foi feita uma pesquisa em fontes brasileiras e internacionais, incluindo:

- publicações setoriais;
- Embrapa, ANA, IBGE e órgãos públicos;
- estudos acadêmicos;
- reportagens e casos de produtores;
- LinkedIn;
- Reddit;
- NewAgTalk;
- páginas de empresas e fornecedores;
- relatos sobre operação, telemetria, falhas, sensores e fertirrigação.

O conjunto consolidado reúne 74 referências classificadas na planilha de fontes. A pesquisa separou Brasil e exterior e registrou limitações de identidade, amostra, atualidade e possível influência de fornecedores.

### Regra de evidência

Um relato prova que uma pessoa descreveu determinada experiência. Ele não prova que todos os produtores enfrentam o mesmo problema. Conclusões de mercado exigem fontes independentes e entrevistas próprias.

---

## 5. O problema definido

### Frase principal

> Em operações com múltiplos pivôs centrais, o responsável precisa juntar dados, coordenar pessoas e equipamentos e conferir se cada aplicação aconteceu. Mudanças no clima, falhas mecânicas ou problemas de comunicação podem afastar o manejo executado do plano aprovado.

### Parágrafo explicativo

Todos os dias, alguém precisa decidir quando e quanto irrigar em cada área, considerando cultura, solo, chuva, clima e capacidade do sistema. Depois, precisa transformar a decisão em programação, acompanhar bombas, pivôs e outros equipamentos e verificar se a água chegou como deveria. Parte desse trabalho continua manual porque informações, regras e equipamentos ficam separados e porque um comando no painel não garante o resultado no campo. A consequência pode ser atraso para descobrir falhas, deslocamento desnecessário, repetição de checagens e perda de uma janela de manejo.

### Nome do desvio

Foi adotado o termo **desvio de manejo** para descrever a diferença entre:

- a necessidade agronômica;
- o plano aprovado;
- a execução realizada;
- a confirmação do resultado.

O termo é mais preciso do que dizer simplesmente “desperdício de água” ou “erro humano”.

### Explicação para leigos

O responsável pode mandar um pivô irrigar, mas isso não encerra o trabalho. Uma bomba pode não criar pressão, um equipamento pode parar, a conexão pode falhar ou a água pode ser aplicada por tempo diferente do planejado. O painel pode indicar que o comando foi enviado sem provar que a quantidade correta chegou ao solo.

---

## 6. Fluxo de trabalho do cliente

O trabalho diário inclui:

1. Consultar umidade, clima, previsão e estado dos pivôs.
2. Avaliar quais áreas precisam de água e quais devem esperar.
3. Definir a sequência e a quantidade da aplicação.
4. Programar o pivô ou orientar o operador.
5. Acompanhar bomba, pressão, consumo e evolução do ciclo.
6. Confirmar se a área respondeu à aplicação.
7. Corrigir o plano ou chamar outra pessoa diante de uma falha.

### Por que a coordenação ainda pode ser manual

- Dados ficam espalhados em sensores, aplicativos, painéis, planilhas e mensagens.
- Solo e chuva podem variar dentro da mesma propriedade.
- Um sensor representa o ponto onde foi instalado.
- Equipamentos de marcas, idades e painéis diferentes usam controles distintos.
- Conectividade rural pode atrasar comandos e atualizações.
- Regras dependem de cultura, fase, solo, água e objetivo produtivo.
- O responsável continua respondendo pelo resultado.
- Muitas ferramentas exibem dados, mas deixam a coordenação e as exceções para a equipe.

### O que está dentro do problema

- Coordenação de dois ou mais pivôs.
- Deslocamento e acompanhamento de equipamentos.
- Fragmentação de dados e pessoas.
- Falha descoberta tarde.
- Diferença entre comando e execução.
- Ausência de confirmação confiável.
- Necessidade de agir em uma janela de água ou energia.

### O que ficou fora do problema inicial

- Todos os produtores irrigantes.
- Toda forma de irrigação.
- Ausência geral de sensores.
- Falta de conhecimento agronômico do produtor.
- Promessa universal de redução de água.
- Substituição do agrônomo.
- Correção automática de nutrientes sem receita aprovada.

---

## 7. Evidências de campo

### Brasil

- Leandro Sato, da Fazenda Maringá em Cristalina, foi associado a uma rotina de análise diária, área por área, sobre quando e quanto irrigar. Fonte: [Revista ITEM/ABID](https://qa.abid.org.br/Recursos/Arquivos/item_116_117.pdf).
- Relatos de Cristian Braun, Arthur Tondato e Luiz Renato Barros Correia mostram atividades diferentes entre operar painel, definir aplicação, acompanhar falhas e organizar horários de energia. Parte do material foi publicado com participação da Valley e deve ser tratada como material promocional.
- Um participante brasileiro anônimo relatou chuva de 20 mm em uma parte da fazenda e zero em outra. O relato ajuda a formular perguntas, mas não mede prevalência.
- Outro produtor brasileiro disse que alertas adicionais não agregavam porque o agrônomo e o operador já cobriam o processo. Essa contraprova impede uma promessa para todo produtor.
- Estudos brasileiros apontaram desafios de desempenho da aplicação, assistência técnica, informação de produtividade, energia, manutenção e peças. Esses estudos incluem amostras antigas e não validam sozinhos o ICP atual.

### Exterior

- A [Alabama Cooperative Extension](https://www.aces.edu/blog/topics/crop-production/operation-maintenance-problems-of-center-pivot-irrigation/) documentou um pivô programado para aplicar 0,8 acre-inch que completou o ciclo em 14 horas, em vez de 56, e aplicou cerca de 0,2. O produtor não percebeu a falha pelo painel; sensores de solo revelaram a ausência de resposta.
- Os [McPheeters](https://www.agriculture.com/technology/crop-management/technology-subs-for-labor) passaram a monitorar pivôs pela manhã e à noite. O relato menciona que uma parada poderia custar de 12 a 24 horas de irrigação sem monitoramento remoto.
- [Clay Price](https://www.nrcs.usda.gov/conservation-basics/conservation-by-state/kentucky/news/farmer-uses-technology-to-improve-irrigation) passou a controlar pivôs pelo celular, mas ainda verifica pneus e problemas mecânicos. A tecnologia reduz trabalho, mas não elimina inspeção.
- O estudo de Whitney Stone com agricultores da Geórgia descreveu decisões contínuas sobre irrigação, clima, equipamentos, mercado e família. Também mostrou que sensores, previsão e experiência são combinados.

### O que essas evidências permitem afirmar

- O fluxo decisão → execução → confirmação existe.
- Falhas físicas e de comunicação podem afastar o resultado do plano.
- Telemetria ajuda quando reduz distância e atraso.
- Alguns produtores já têm um fluxo suficiente e podem achar alertas redundantes.
- Ainda não existe base para afirmar frequência anual de falhas, perda financeira média ou economia percentual.

---

## 8. ICP do MVP

### Definição operacional

O MVP atende uma **operação agrícola comercial profissionalizada com três a dez pivôs centrais**, equipamentos conectados ou conectáveis e alguma lacuna entre decisão, execução e confirmação.

O recorte obrigatório do hackathon é operação com **dois ou mais pivôs**. A faixa de três a dez é uma hipótese comercial para o primeiro foco, não uma classificação oficial do setor.

### Por que não usar apenas “pequeno, médio ou grande”

As classificações de porte podem considerar receita, crédito ou módulos fiscais. Elas não mostram a complexidade operacional da irrigação. Uma propriedade menor pode ter vários pivôs e vários operadores. Uma propriedade maior pode ter uma operação simples.

### Comprador, usuário e autoridade técnica

| Papel | Pessoa provável | Responsabilidade |
|---|---|---|
| Comprador | Proprietário-gestor, gerente agrícola ou diretor operacional | Aprova investimento e cobra retorno |
| Usuário principal | Gerente de irrigação ou gerente de operações | Acompanha ciclos, prioriza exceções e confere resultados |
| Usuário operacional | Operador de irrigação | Inspeciona, executa tarefas e trata falhas físicas |
| Autoridade agronômica | Agrônomo interno ou consultor | Define limites, prioridades e receitas aprovadas |

Em propriedades menores, uma pessoa pode ocupar mais de um papel. Em operações maiores, comprador e usuário provavelmente serão pessoas diferentes.

### Persona do pitch

Leandro continua sendo um bom personagem porque representa um gestor que precisa decidir por área em uma operação irrigada. Ele deve ser usado como referência de perfil e não como prova de que usa a Cognitiva ou de que vive uma falha específica.

### Condições que aumentam a aderência

- Três a dez pivôs.
- Áreas com culturas, solos ou programações diferentes.
- Equipamentos de marcas ou gerações diferentes.
- Distâncias relevantes entre equipamentos.
- Dados divididos entre aplicativos, planilhas e pessoas.
- Falhas descobertas com atraso.
- Equipe enxuta e tarefas concorrentes.
- Operação em horários de energia ou disponibilidade hídrica.
- Desejo de automação com exigência de confirmação.

### Perfis fora do primeiro foco

- Operação com um único pivô.
- Propriedade simples, próxima e fácil de inspecionar.
- Operação sem atuadores ou dados mínimos confiáveis.
- Fazenda que já fecha decisão, execução e confirmação em uma plataforma integrada.
- Cliente que não aceita nenhum comando automatizado.
- Irrigação baseada apenas em gotejamento, microaspersão ou inundação.

---

## 9. Solução revisada

### Resumo em uma frase

> A Cognitiva é um agente de IA para operações com múltiplos pivôs centrais. Ela coordena o manejo aprovado, executa ações permitidas, confirma se a aplicação aconteceu e chama uma pessoa quando encontra uma falha ou uma situação sem segurança para agir.

### Ciclo do agente

1. **Observar:** consulta solo, clima, previsão, consumo, pressão, vazão e estado dos pivôs.
2. **Avaliar:** identifica necessidade, conflito, anomalia ou ausência de informação.
3. **Planejar:** organiza uma sequência de ações dentro das regras aprovadas.
4. **Autorizar:** verifica limites determinísticos de segurança.
5. **Executar:** usa ferramentas para ligar, desligar ou ajustar os equipamentos.
6. **Confirmar:** compara comando, estado do equipamento, consumo e resposta da área.
7. **Replanejar ou escalar:** tenta outra ação segura ou chama o responsável.
8. **Registrar:** salva planejado, executado, confirmado e justificativa.

### Por que a solução é agêntica

Uma automação fixa executa uma regra, como ligar quando a umidade fica abaixo de certo valor. O agente recebe um objetivo, consulta fontes diferentes, escolhe ferramentas, executa vários passos, observa o resultado e altera o plano quando necessário.

A autonomia precisa ocorrer dentro de uma política aprovada. O agente não deve criar sozinho uma prescrição agronômica nem considerar o envio de comando como prova de sucesso.

### Limites de autonomia

O agente deve interromper ou escalar quando encontrar:

- sensor ausente ou incoerente;
- cultura ou regra não cadastrada;
- previsão e dados locais em conflito;
- falha de bomba, pressão, vazão ou comunicação;
- resposta do solo diferente da esperada;
- risco fora do limite aprovado;
- falta de confiança para escolher uma ação segura.

### Fertirrigação

A versão inicial sugeria que o agente corrigiria acidez com NPK usando pH e salinidade. Essa parte saiu do MVP autônomo.

- pH mede acidez ou alcalinidade, não necessidade de NPK.
- Condutividade elétrica indica concentração total de íons, sem identificar individualmente os nutrientes.
- Prescrição nutricional depende de cultura, fase, análise, fonte, dose, frequência e orientação agronômica.
- Uma decisão errada pode prejudicar a lavoura.

Fertirrigação pode entrar como módulo supervisionado. O agente executa uma receita aprovada e respeita limites de pH, condutividade e operação.

### Diferencial desejado

Empresas já oferecem sensores, recomendações, telemetria e controle remoto. A Cognitiva não deve vender apenas um painel novo.

A hipótese de diferenciação é:

- coordenar vários pivôs e fontes de dados;
- atuar por ferramentas independentemente da marca, quando houver integração;
- aplicar regras explícitas de segurança;
- confirmar o resultado no campo;
- replanejar e escalar exceções;
- manter histórico do planejado, executado e confirmado.

---

## 10. Estado técnico do backend

O backend recebido se chama Fazendinha e expõe a API em `http://localhost:8096`, com Swagger em `/docs`. Em um ambiente limpo do hackathon, a porta pode ser alterada para 8095.

### Características técnicas confirmadas

- API simulada de uma fazenda.
- Cenas desenhadas no mapa.
- Telemetria ao vivo.
- Simulador de lavoura.
- Ciclo automático de clima.
- Histórico em Postgres.
- Contrato das 14 rotas originais preservado.
- Seis rotas adicionais de série temporal.
- Escopo inicial do arquivo: backend, sem frontend e sem ponte MQTT.

### Rotas principais

#### Cenas e configuração

- `GET /health`
- `GET /api/config`
- `GET /api/cenas`
- `GET /api/cenas/{id}`
- `PUT /api/cenas/{id}`
- `DELETE /api/cenas/{id}`
- `GET /api/objetos`

#### Telemetria

- `GET /api/coisas/leituras`
- `GET /api/coisas/{id}/leitura`
- `POST /api/coisas/{id}/leitura`
- `POST /api/coisas/{id}/comando`
- `GET /api/consumo`

#### Clima

- `GET /api/clima/previsao`
- `POST /api/clima`

#### Histórico

- `GET /api/coisas/{id}/historico`
- `GET /api/coisas/{id}/historico/resumo`
- `GET /api/objetos/{id}/historico`
- `GET /api/consumo/historico`
- `GET /api/clima/historico`

#### Estado consolidado para o agente

`GET /api/agente/estado` junta desenho, telemetria, consumo, cultura, clima e previsão em uma chamada.

O endpoint é somente leitura. Para agir, o agente usa `POST /api/coisas/{id}/leitura` e `POST /api/coisas/{id}/comando`.

### Regras do simulador

- Um laço de três segundos faz sensores reagirem a atuadores do mesmo objeto.
- Irrigador sem bomba ligada não cria pressão, não muda sensores e não consome água.
- Irrigação eleva umidade e afeta a temperatura conforme as regras da simulação.
- Dosador aumenta salinidade e reduz pH; ele não conta como irrigação.
- Valores enviados pela API têm uma janela manual de override de 60 segundos.
- Temperatura e umidade propagam para sensores irmãos do mesmo objeto.
- pH e salinidade não propagam.
- O clima muda automaticamente a cada dois minutos.
- A previsão de múltiplos passos é determinística.
- Histórico registra pontos a cada 15 segundos por padrão.
- `valor: null` significa que a coisa nunca reportou, não necessariamente erro.
- Sem cultura cadastrada, o agente não deveria gerir a área.

### Ajuste necessário para a narrativa

O backend usa termos como `cena`, `objeto`, `coisa`, `talhão`, `irrigador` e `bomba`. O MVP do hackathon precisa apresentar explicitamente os objetos como **Pivô A** e **Pivô B**, cada um com estado, ciclo, bomba, irrigador e confirmação próprios.

O backend simula áreas e atuadores. A narrativa da demo deve deixar claro que cada cenário representa um pivô central com unidade própria de decisão, execução e confirmação.

---

## 11. Demo recomendada

A demo deve contar uma única história com dois pivôs.

### Pivô A: sucesso

1. A área está seca.
2. A previsão não indica chuva suficiente.
3. O agente consulta estado e limites.
4. O agente liga bomba e pivô.
5. Consumo e umidade mudam.
6. O agente registra a aplicação como confirmada.

### Pivô B: desvio

1. A área também precisa de água.
2. O agente envia o comando.
3. O pivô não possui pressão ou bomba disponível.
4. A umidade não responde.
5. O agente identifica a divergência.
6. O agente interrompe o ciclo e chama o responsável.

### Frase para entregar a demo

> “Agora vocês vão ver a diferença entre mandar um pivô ligar e ter certeza de que a irrigação aconteceu.”

Depois da história do problema:

> “O [nome] vai mostrar a Cognitiva coordenando dois pivôs, confirmando um ciclo e escalando o outro quando a execução sai do plano.”

---

## 12. Oportunidade de mercado

### Dados públicos atuais

A [Embrapa](https://www.embrapa.br/en/busca-de-publicacoes/-/publicacao/1167756/agricultura-irrigada-por-pivos-centrais-no-brasil-em-2024) identificou em 2024:

- 33.846 pivôs centrais no Brasil;
- 2.200.960 hectares irrigados por pivôs;
- 3.807 novos equipamentos em relação a 2022;
- crescimento de 14,68% da área entre 2022 e 2024;
- mais de 70% dos equipamentos no Cerrado.

Minas Gerais, Bahia, Goiás, São Paulo, Rio Grande do Sul e Mato Grosso concentram aproximadamente 92% da área irrigada por pivôs. Os principais polos incluem Extremo Oeste Baiano, Noroeste de Minas, Triângulo Mineiro/Alto Paranaíba, Sul Goiano, Leste Goiano e regiões de Mato Grosso.

### O que esses dados permitem dizer

Existe uma base instalada relevante, concentrada e em crescimento. Isso cria uma oportunidade de entrada por polos geográficos e por canais de revendas, integradores e consultores de irrigação.

### O que ainda não sabemos

- Quantos pivôs estão agrupados na mesma propriedade.
- Quantas operações têm três ou mais pivôs.
- Quantos equipamentos possuem telemetria e atuadores compatíveis.
- Quantas propriedades enfrentam desvio de manejo com frequência.
- Quanto o cliente pagaria.
- Qual retorno financeiro um piloto comprovaria.

Por isso, os 33.846 pivôs representam a base de equipamentos, não o número de clientes.

### Segmento inicial proposto

Operações com três a dez pivôs, aproximadamente 195 a 650 hectares irrigados quando se usa a média nacional de cerca de 65 hectares por pivô. Essa faixa é uma hipótese de entrada e precisa de entrevistas.

### Posicionamento de mercado

O cliente não deve ser descrito apenas como “o produtor rural”. A frase mais precisa é:

> “Gestor de uma operação agrícola comercial com múltiplos pivôs, equipamentos conectados e responsabilidade sobre a execução do manejo.”

### Concorrência relevante

A [Valley](https://www.valleyirrigation.com.br/equipamento/dispositivos-remotos) oferece monitoramento e controle remoto, gestão de frota mista, alertas, bombas, sensores de umidade e clima. Portanto, a Cognitiva precisa atuar acima ou entre esses sistemas, coordenando objetivos e exceções e confirmando a execução.

---

## 13. Empresas de agricultura vertical pesquisadas

Esta seção foi adicionada para iniciar uma pesquisa de benchmarks. As empresas estão listadas, sem comparação aprofundada.

### Brasil

| Empresa | Localização | Modelo público identificado |
|---|---|---|
| [Pink Farms](https://pinkfarms.com.br/) | São Paulo | Fazenda vertical indoor com folhas, temperos, microverdes e cogumelos. |
| [100% Livre](https://www.cemporcentolivre.com/) | São Paulo | Cultivo hidropônico vertical de folhas, temperos e cogumelos. |
| [BeGreen](https://begreen.com.br/) | MG, SP e outras cidades | Fazendas urbanas hidropônicas em estufas e unidades corporativas. |
| [Fazenda Cubo](https://www.fazendacubo.com.br/) | São Paulo | Fazenda indoor de hortaliças e microverdes próxima ao consumidor. |
| [Zaya Farms](https://www.zayafarms.com.br/) | Santos | Fazenda vertical hidropônica com NFT, sensores IoT e automação. |
| [Fazendas Bioma](https://fazendasbioma.com.br/) | Florianópolis e rede de franquias | Fazendas verticais de microverdes, com modelo de franquia. |
| [MightyGreens](https://www.mightygreens.com.br/) | Brasil | Fazendas modulares, IoT, automação, projetos, treinamento e consultoria. |
| [Fazendas Up](https://www.fazendasup.com.br/) | Manaus | Empresa que se apresenta como operação de agricultura vertical sustentável. O site público tem poucos detalhes. |

### Exterior

| Empresa | País | Modelo público identificado |
|---|---|---|
| [80 Acres Farms](https://www.80acresfarms.com/) | Estados Unidos | Fazendas indoor com robôs, IA e produção de folhas, ervas e microverdes. |
| [Plenty](https://www.plenty.ag/) | Estados Unidos | Fazendas verticais indoor, atualmente com foco forte em morangos; saiu de Chapter 11 em 2025. |
| [Oishii](https://oishii.com/) | Estados Unidos | Morangos premium em fazendas verticais indoor. |
| [AeroFarms](https://www.aerofarms.com/) | Estados Unidos | Sistemas e operação de agricultura vertical, além de projetos educacionais e comunitários. |
| [GoodLeaf](https://www.goodleaffarms.com/) | Canadá | Rede de fazendas verticais indoor em Montreal, Guelph e Calgary. |
| [Planet Farms](https://www.planetfarms.ag/en) | Itália | Fazendas verticais automatizadas para saladas, folhas e manjericão. |
| [Growy](https://www.growy.nl/our-story) | Países Baixos | Fazenda vertical em Amsterdam com folhas, ervas e microverdes. |
| [Stacked Farm](https://stackedfarm.com/) | Austrália | Fazendas verticais automatizadas com robótica. |
| [YesHealth Group](https://www.yeshealthgroup.com/) | Taiwan e outros países | Construção e operação de fazendas verticais por parcerias e joint ventures. |
| [Babylon Micro-Farms](https://babylonmicrofarms.com/) | Estados Unidos | Microfazendas verticais instaladas em hotéis, escolas, hospitais e empresas, com software remoto. |

### Tecnologia e infraestrutura

| Empresa | País | Foco público identificado |
|---|---|---|
| [Urban Crop Solutions](https://urbancropsolutions.com/) | Bélgica | Projetos completos de fazendas verticais e câmaras de cultivo. |
| [Sananbio](https://sananbio.com/) | China | Sistemas de cultivo, iluminação, controle climático e software. |
| [Farmtastica](https://www.farmtastica.com/) | Chile | Fazendas verticais automatizadas e software de controle. |
| [Nongshim Farm](https://www.nongshimfarm.com/) | Coreia do Sul | Soluções completas, automação e tecnologia para fazendas verticais. |
| [Freight Farms](https://www.freightfarms.com/) | Estados Unidos e Canadá | Fazendas hidropônicas verticais em contêineres; passou a fazer parte da Growcer em 2025. |

Empresas com sinais públicos de encerramento, como Farmshelf, Bowery Farming, Kalera e Infarm, não foram tratadas como benchmark operacional atual sem uma checagem específica de status.

---

## 14. Estrutura do pitch

### Divisão do time informada

O time foi apresentado como Nicolas, Pitágoras, Arthur e Vitor.

Distribuição inicial:

**Nicolas:**

- apresentação da equipe;
- introdução do problema com personagem e função;
- desenvolvimento do problema;
- promessa da solução.

Tempo estimado inicial: aproximadamente 1 minuto e 15 segundos. A recomendação posterior foi reduzir esse bloco para cerca de 55 segundos e proteger a demo.

**Pitágoras, Arthur e Vitor:**

- demonstração ao vivo e explicação da solução;
- comprador e viabilidade comercial;
- resultado e encerramento.

Tempo estimado: aproximadamente 1 minuto e 45 segundos.

Em uma mensagem posterior, os nomes apareceram como “capitão, Guilheres, Arthur e Victor”. Essa divergência precisa ser confirmada antes de fechar os slides.

### Número recomendado de slides antes da demo

O ideal é usar três slides antes da demonstração:

1. **Equipe e contexto:** nome Cognitiva, integrantes e interação inicial.
2. **Personagem e problema:** Leandro, operação multipivô e decisões diárias.
3. **Lacuna operacional e promessa:** comando enviado, resultado não confirmado e promessa da Cognitiva.

Mais de três slides antes da demo tende a consumir o tempo que os jurados precisam ver o protótipo funcionando.

### Estrutura de três minutos

- 0–10 s: equipe e nome.
- 10–50 s: personagem, trabalho e falha concreta.
- 50–65 s: promessa da solução.
- 65–145 s: demo.
- 145–165 s: comprador e viabilidade.
- 165–180 s: resultado e encerramento.

---

## 15. Abertura interativa do pitch

### Ideia original

“Boa noite, pessoal. Meu nome é Nicolas, estou aqui com o capitão, Guilheres, o Arthur, o Victor, e o nosso projeto se chama Cognitiva. Jurado 1, você pode fechar os olhos por dois segundos para mim? Agora me fala, o que foi que você viu durante esses dois segundos? Ah, nada? Interessante. Isso é exatamente o que o Leandro vê quando a gente introduz o problema.”

### Problema da frase original

Não foi encontrada uma fonte que dissesse que Leandro “vê nada” ou não possui visibilidade. A frase transforma uma metáfora em afirmação sobre a experiência pessoal dele.

### Versão recomendada

> Boa noite, pessoal. Meu nome é Nicolas. Estou aqui com [nomes corretos da equipe], e o nosso projeto se chama Cognitiva.
>
> [Nome do jurado], você pode fechar os olhos por dois segundos, por favor?
>
> [Pausa]
>
> Pode abrir. O que você viu?
>
> Nada. Durante esses dois segundos, você ficou sem informação visual.
>
> Essa é a lacuna que existe entre mandar um pivô irrigar e saber se a água chegou ao campo como deveria.
>
> Este é o Leandro Sato. Na Fazenda Maringá, em Cristalina, ele e sua equipe coordenam uma operação irrigada com múltiplos pivôs. Todos os dias, precisam decidir, área por área, quando irrigar, quanto aplicar e depois confirmar se tudo aconteceu conforme o planejado.
>
> Em um caso documentado, um pivô entregou apenas um quarto da água programada, sem que o produtor percebesse durante a operação.
>
> Com vários pivôs trabalhando ao mesmo tempo, esse risco se multiplica. A Cognitiva coordena cada ciclo, confirma o resultado e chama o responsável quando algo sai do plano.
>
> Agora, o [nome] vai mostrar isso funcionando.

### Fallback caso o jurado não responda “nada”

Se o jurado responder “escuro”, “nada” ou outra coisa:

> “Exato. Durante esses dois segundos, você ficou sem informação visual. É essa lacuna que queremos mostrar.”

Se a pessoa não quiser fechar os olhos ou não responder:

> “Durante esses dois segundos, você ficou sem informação visual. Essa é a lacuna entre enviar um comando e confirmar o resultado no campo.”

### Cuidados

- Não depender da resposta exata do jurado.
- Evitar “Ah, nada? Interessante”, que pode soar ensaiado.
- Fazer a interação durar poucos segundos.
- Não afirmar que Leandro sofreu uma falha específica se a fonte não disser isso.
- Confirmar os nomes da equipe antes da apresentação.

---

## 16. Viabilidade comercial

### Quem compra

O comprador provável é o proprietário-gestor, gerente agrícola ou diretor operacional que responde por custo, produtividade e risco.

### Quem usa

O usuário diário tende a ser o gerente de irrigação, gerente de operações, encarregado ou operador.

### Como vender

A unidade de valor é a operação ou a frota de pivôs, não uma simples tela por usuário. Uma possibilidade futura é combinar:

- mensalidade base da operação;
- cobrança por quantidade de pivôs;
- implantação e integração;
- suporte e acompanhamento do piloto.

Preço ainda não foi definido nem validado.

### Condição de implantação

A solução completa exige telemetria, atuadores, conectividade e regras aprovadas. Para fazendas sem esses recursos, a Cognitiva precisaria operar inicialmente como coordenadora e escalonadora ou trabalhar com parceiros de hardware e integração.

### Risco comercial central

Uma operação já atendida por uma plataforma integrada pode perceber a Cognitiva como outra camada de alertas. A proposta precisa demonstrar coordenação entre sistemas, decisão dentro de políticas e confirmação de execução.

---

## 17. Entrevistas e contatos prioritários

### Perfis brasileiros

- [Arthur Tondato](https://br.linkedin.com/in/arthur-tondato-97b3b561): engenheiro agrônomo e produtor de soja e milho irrigados.
- [José Carlos Contiero](https://br.linkedin.com/in/jos%C3%A9-carlos-contiero-9a190333a): gestão de produção agrícola e fertirrigação.
- Cristian Braun: produtor irrigante em Primavera do Leste, com caminhos públicos via Notícias Agrícolas e Valley.
- Luiz Renato Barros Correia: produtor irrigante em Tibagi, com depoimento público.
- [Evaldo Kazushi Takizawa](https://pt.linkedin.com/posts/evaldo-takizawa_irriga%C3%A7%C3%A3o-sustentabilidade-agriculturairrigada-activity-7480638193240006656-K9jL): consultor agronômico no Cerrado.
- [Eduardo Saldanha](https://br.linkedin.com/in/eduardo-saldanha-17923071): agrônomo sênior de nutrição e fertirrigação.
- [Rannilson Oliveira](https://br.linkedin.com/in/rannilson-oliveira-87b377293): agrônomo de campo no Vale do São Francisco.

### Perfis internacionais

- [Clark McPheeters](https://www.bpia.org/events/2023-annual-meeting-program/clark-mcpheeters/) e família: telemetria, falhas e equipe enxuta.
- [G2 Farming](https://webassetsprod.valmont.com/valmontproduction/docs/librariesprovider129/case-studies/irrigation-solutions/valley-scheduling---g2-farming---hermiston-or.pdf?sfvrsn=502fe239_2): operação de grande escala e maturidade digital.
- [The Patch Organics](https://www.thepatchorganics.com.au/): operação pequena e diversificada.

### Perguntas para entrevistas

1. Conte a última irrigação desde a decisão até você ter certeza de que terminou certo.
2. Quais pessoas, telas ou mensagens participaram?
3. Quem decidiu, quem operou e quem respondeu se desse errado?
4. Como você soube que a água chegou na quantidade esperada?
5. Qual foi a última falha que demorou para ser percebida?
6. Quantos pivôs a operação possui e qual distância existe entre eles?
7. Quais ferramentas e marcas estão em uso?
8. O que o sistema atual resolve e o que continua no WhatsApp, na planilha ou na cabeça das pessoas?
9. Qual decisão você permitiria que um agente executasse sozinho?
10. Em que situação o agente deveria parar e chamar você?
11. Qual resultado em 30 dias provaria valor?

Não apresentar a solução antes de reconstruir o último caso real. Perguntas sobre comportamento passado são mais confiáveis do que “você usaria?”.

---

## 18. Riscos e limitações

- Há poucos relatos públicos brasileiros que descrevem todo o fluxo em operações comerciais multipivô.
- Parte dos relatos brasileiros está em materiais financiados ou publicados por fornecedores.
- Relatos de Reddit e NewAgTalk podem ser anônimos.
- Estudos brasileiros incluem amostras antigas e perfis diferentes do ICP proposto.
- Evidência internacional não deve ser transferida automaticamente para preço, infraestrutura e organização brasileira.
- A pesquisa não mediu frequência anual de falhas, tempo médio de resposta, distância percorrida ou perda financeira.
- A pesquisa não validou disposição de permitir atuação autônoma.
- Não existe base para prometer percentual específico de economia de água, energia ou fertilizante.

### O que poderia mudar a conclusão

- Se a maioria do ICP já tiver decisão, execução e confirmação integradas, a dor diminui.
- Se os atrasos forem raros e sem impacto, execução confirmada perde valor comercial.
- Se os operadores rejeitarem comandos automáticos, o produto deve começar como coordenação e escalonamento.
- Se a dor maior for manutenção, energia ou disponibilidade hídrica, o produto deve estreitar o caso de uso.

---

## 19. Regras e avaliação do hackathon

Os slides recebidos indicaram:

1. O projeto deve ser desenvolvido durante o hackathon.
2. IA é obrigatória na solução.
3. Código pré-existente, bibliotecas e frameworks são permitidos, desde que a integridade seja preservada.
4. APIs, modelos pré-treinados e plataformas de IA são permitidos se declarados e usados legalmente.
5. Os times devem ter de duas a quatro pessoas.
6. A apresentação do Demo Day é obrigatória.
7. Apenas projetos submetidos pelo Painel do Hackathon concorrem.
8. Trabalho desonesto ou fraude causa desclassificação imediata.

### Critérios com pesos iguais

- Qualidade e aderência do protótipo.
- Viabilidade para virar startup.
- Pitch oral.
- Criatividade e originalidade.

### Proteção contra dúvidas sobre autoria

Antes do desenvolvimento, registrar:

- o que já existia no backend e no simulador;
- o que será construído durante o evento;
- bibliotecas, APIs, modelos e plataformas;
- quem implementou cada parte;
- histórico de commits e primeiro commit do hackathon.

Na submissão, declarar o backend pré-existente e destacar como entregas do evento o agente, ferramentas, políticas, ciclo de confirmação, interface e demo efetivamente construídos durante o hackathon.

---

## 20. Definição final de trabalho

### Problema

Operações com múltiplos pivôs dependem de pessoas para juntar informações, coordenar equipamentos e conferir o resultado. Uma falha pode criar diferença entre o manejo aprovado e a água entregue à lavoura.

### ICP

Proprietário-gestor, gerente agrícola ou gerente de operações de uma operação comercial com três a dez pivôs centrais, conectividade suficiente e lacunas entre planejamento, execução e confirmação.

### Usuário

Gerente de irrigação, encarregado ou operador.

### Autoridade técnica

Agrônomo interno ou consultor que define limites e aprova receitas.

### Solução

Agente de IA que coordena pivôs dentro de regras aprovadas, executa ações permitidas, confirma o resultado e escala exceções.

### MVP

Demo multipivô com dois cenários:

- Pivô A executa e confirma.
- Pivô B recebe o comando, não responde e é escalado.

### Promessa

> Dar ao responsável uma visão confiável do que foi planejado, do que os equipamentos fizeram e do que o campo confirmou.

---

## 21. Próximos passos

1. Confirmar os nomes exatos dos quatro integrantes.
2. Confirmar se o personagem será chamado de Leandro ou se o time prefere um personagem composto baseado em relatos reais.
3. Ajustar o backend para apresentar explicitamente Pivô A e Pivô B.
4. Definir o fluxo exato da demo e ensaiar com cronômetro.
5. Criar as políticas de autonomia e escalonamento.
6. Garantir que a demo mostra comando, estado, confirmação e exceção.
7. Fazer entrevistas com dois gestores ou produtores e um agrônomo antes de transformar a hipótese em promessa.
8. Verificar compatibilidade futura com plataformas como Valley 365 e outras soluções de telemetria.
9. Escolher cinco empresas de agricultura vertical para uma segunda etapa de benchmark.
10. Medir em piloto tempo de checagem, tempo de detecção, ciclos confirmados e intervenções humanas.

---

## 22. Arquivos e referências locais

- [Resumo atualizado do problema, ICP, solução e MVP](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/Resumo_atualizado_problema_solucao_MVP.md>)
- [Contexto e vocabulário do domínio](</Users/nicolascunha/Projects/Business/irbis/CONTEXT.md>)
- [Resumo executivo da pesquisa](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/discovery_manejo_irrigacao/08_report/00_executive_summary.md>)
- [Achados completos da pesquisa](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/discovery_manejo_irrigacao/08_report/01_findings.md>)
- [Recomendações de problema, ICP e solução](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/discovery_manejo_irrigacao/08_report/02_recommendations.md>)
- [Limitações da pesquisa](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/discovery_manejo_irrigacao/08_report/03_limitations.md>)
- [Regras do hackathon e implicações](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/discovery_manejo_irrigacao/06_regras_hackathon_e_implicacoes.md>)
- [Pessoas prioritárias para entrevistas](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/Pessoas_prioritarias_para_entrevistas.md>)
- [Catálogo das 74 fontes](</Users/nicolascunha/Projects/Business/irbis/RESEARCH/Fontes_74_pesquisa_irrigacao_fertirrigacao.csv>)

## Fechamento

A Cognitiva deixou de ser apresentada como um conjunto amplo de sensores, NPK e digital twin. O projeto agora tem um recorte mais específico: coordenar operações com múltiplos pivôs, executar ações dentro de regras aprovadas, confirmar o que aconteceu e escalar o que saiu do plano.

O problema, o ICP e a solução já possuem uma formulação coerente para o hackathon. A validação comercial ainda depende de entrevistas com operações reais e de uma demonstração que torne visível a diferença entre enviar um comando e confirmar a irrigação.
