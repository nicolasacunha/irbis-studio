# Recomendação para problema, ICP e solução

## Formulação do problema

### Frase

> Em operações com múltiplos pivôs centrais, o responsável precisa juntar dados, coordenar pessoas e equipamentos e conferir se cada aplicação aconteceu; quando uma condição muda ou uma falha escapa, o manejo realizado se afasta do planejado.

### Parágrafo

Todos os dias, alguém precisa decidir quando e quanto irrigar em cada área, considerando cultura, solo, chuva, clima e capacidade do sistema. Depois, precisa transformar a decisão em programação, acompanhar bombas, válvulas ou pivôs e verificar se a água chegou como deveria. Parte desse trabalho continua manual porque informações, regras e equipamentos ficam separados e porque um comando no painel não garante o resultado no campo. A consequência é atraso para descobrir falhas, deslocamento desnecessário, repetição de checagens e risco de perder a janela de manejo.

## ICP operacional

### Comprador provável

Proprietário-gestor ou gerente agrícola responsável pelo custo, produtividade e risco de uma operação comercial com dois ou mais pivôs centrais.

### Usuário diário provável

Gerente de irrigação, encarregado ou operador que programa equipamentos, acompanha ciclos e trata falhas.

### Autoridade agronômica

Agrônomo interno ou consultor que define faixas, prioridades, limites e situações que exigem aprovação.

### Condições que tornam o problema mais provável

- dois ou mais pivôs centrais;
- pivôs atendendo áreas com condições ou programações diferentes;
- distâncias relevantes entre equipamentos;
- marcas, idades ou painéis diferentes;
- dados divididos entre aplicativos, planilhas e pessoas;
- falhas descobertas com atraso;
- necessidade de operar em janelas de energia ou água;
- equipe enxuta ou muitas tarefas concorrentes;
- desejo de automação, mas baixa confiança em execução sem confirmação.

### Condições de desqualificação

- uma única área simples, próxima e fácil de inspecionar;
- operação com apenas um pivô central;
- operação baseada somente em gotejamento, microaspersão ou inundação;
- telemetria integrada que já fecha decisão, execução e confirmação;
- equipe em que falhas chegam imediatamente ao responsável e não geram perda;
- ausência de atuadores ou dados mínimos confiáveis;
- operação que não aceita qualquer comando automatizado.

## Trabalho do agente

1. Receber objetivo, limites e janela operacional aprovados.
2. Consultar estado do solo, clima, previsão, equipamento e programação.
3. Identificar necessidade ou conflito.
4. Propor um plano e verificar as regras determinísticas de segurança.
5. Acionar as ferramentas autorizadas.
6. Confirmar estado do equipamento, vazão/pressão/consumo e resposta esperada.
7. Replanejar ou chamar uma pessoa quando faltar confiança.
8. Registrar planejado, executado, confirmado e justificativa.

## Limite do agente

O agente não deve inventar limites agronômicos, diagnosticar deficiência nutricional a partir de pH/EC ou assumir que um comando enviado foi cumprido. A autonomia deve ocorrer dentro de uma política aprovada.

## Perguntas para as entrevistas

1. “Conte a última irrigação, desde a decisão até você ter certeza de que terminou certo.”
2. “Quais pessoas, telas ou mensagens participaram?”
3. “Quem decidiu quando e quanto? Quem operou? Quem respondeu se desse errado?”
4. “Como você soube que a água chegou na quantidade esperada?”
5. “Conte a última falha que demorou para ser percebida. Quanto tempo passou?”
6. “Quais checagens você repete todos os dias?”
7. “Quando a previsão indica chuva, o que faz você irrigar mesmo assim ou esperar?”
8. “Qual dado você já deixou de confiar? O que aconteceu?”
9. “O que o aplicativo atual resolve e o que continua no WhatsApp, planilha ou cabeça das pessoas?”
10. “Qual decisão você permitiria que um sistema executasse sozinho? Em que situação ele deveria parar e chamar você?”
11. “Que número provaria em 30 dias que isso vale a pena?”

Não apresente a solução antes de reconstruir o último caso real. Perguntas sobre comportamento passado produzem evidência melhor do que “você usaria?”.
