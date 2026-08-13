# Anexo I — Escopo do Projeto

## MINUTA — Sistema de IA para petição inicial, réplica e recursos

**Contratante:** A. Cunha Advocacia
**Prestador:** Nicolas Cunha (IRBIS)

Este anexo é parte integrante do Contrato de Prestação de Serviços de Desenvolvimento de Software. O que não está descrito aqui não está contratado. Qualquer item fora deste anexo segue a Cláusula 4 do contrato (aditivo).

---

## O que é o MINUTA

Sistema interno do escritório para gerar minutas de petição inicial, réplica e recursos, no padrão de redação da própria casa, com pesquisa de jurisprudência com fonte conferível.

**Área coberta:** direito do trabalho, contencioso bancário, atuando pelo reclamante. Outras áreas seguem a Cláusula 4 (aditivo).

**Usuários:** as 3 advogadas do escritório, com login próprio. Até 5 usuários sem impacto neste escopo.

**Uso:** interno do escritório, sem revenda nem comercialização a terceiros.

---

## Módulos incluídos (escopo fechado)

### 1. Painel do escritório

- Login individual por advogada.
- Cadastro de processo: número, cliente, cargo do reclamante, tribunal e vara, fase e status.
- Upload e armazenamento dos documentos do caso.
- Histórico das peças geradas por processo.
- Resumo processual por caso, gerado a partir dos documentos anexados.

### 2. Base da casa (memória do escritório)

- Os modelos por cargo, as teses e as jurisprudências do escritório são carregados no sistema e passam a servir de referência para toda peça gerada.
- Volume coberto e formato aceito estão na seção **Volume da migração**.

### 3. Petição inicial

- Geração de minuta completa no template do escritório, a partir dos dados do caso, dos documentos anexados e da base da casa.

### 4. Réplica e manifestações

- Leitura da contestação e dos documentos juntados pela parte contrária.
- Resposta tópico por tópico e por ID de documento, com impugnação redigida.

### 5. Recursos

- Geração de minuta de **Recurso Ordinário (TRT)** e **Recurso de Revista (TST)**, a partir da sentença ou do acórdão anexado.
- Outras espécies recursais não fazem parte deste escopo (ver **O que fica fora**).

### 6. Jurisprudência com fonte

- Busca em bases públicas de jurisprudência dos tribunais, com prioridade para TRT 2, TRT 15 e TST.
- Toda citação sai com número do processo, órgão julgador, data e link para a fonte.
- O sistema não cita de memória: quando não encontra a fonte, não cita.

---

## Volume da migração da base

A migração da base da casa cobre, neste contrato:

- até **40 modelos de peça**, organizados por cargo;
- até **30 teses**;
- até **60 jurisprudências**.

O material é entregue pelo escritório em **uma única pasta** no Google Drive ou OneDrive, em formato de texto pesquisável (.docx, .pdf com texto, .txt).

Não entram na migração: material em papel, manuscrito, imagem escaneada sem texto pesquisável e arquivos em formato não pesquisável. Volume acima dos limites acima segue a Cláusula 4 (aditivo).

---

## Ajuste de formato até o padrão da casa

O ajuste do formato da peça até o padrão que vai ao juiz é feito por rodadas:

- até **3 rodadas por tipo de peça** (petição inicial, réplica, recurso), 9 rodadas no total;
- cada rodada é **uma lista consolidada de ajustes**, enviada de uma vez, por escrito;
- o escritório tem até **5 dias úteis** para devolver cada lista. Passado esse prazo sem retorno, a rodada é considerada aprovada;
- rodadas adicionais entram no pacote de acompanhamento mensal (3h/mês) ou são cobradas por hora avulsa, conforme a Cláusula 5 do contrato.

---

## Quando uma peça é considerada pronta (critério de aceite)

Uma peça está **pronta para revisão** quando, ao mesmo tempo:

1. sai no template do escritório, com as seções na ordem do padrão da casa;
2. endereça todos os tópicos e pedidos identificáveis nos documentos do caso anexados ao sistema;
3. traz cada citação de jurisprudência com número do processo, órgão julgador e link conferível;
4. é gerada em **menos de 1 dia útil**, contado do momento em que os documentos do caso estão no sistema.

Não fazem parte do critério de aceite: acerto do mérito, escolha de tese, estratégia processual e resultado do processo. Essas decisões são da advogada responsável.

---

## Revisão obrigatória e responsabilidade sobre o conteúdo jurídico

- Toda peça gerada pelo MINUTA passa por **revisão de uma advogada do escritório antes do protocolo**. Esta é uma condição de uso do sistema, e não uma recomendação.
- O MINUTA é ferramenta de apoio à redação. A responsabilidade técnica, o conteúdo jurídico e o resultado de qualquer processo são do escritório e da advogada responsável pela peça.
- O Prestador não responde por decisão judicial, perda de prazo, erro de conteúdo em peça protocolada sem revisão, nem pelo resultado de qualquer processo.

---

## Infraestrutura e custo de uso

As contas de serviço do sistema — **Anthropic (Claude)** e **Vercel** — ficam em nome de A. Cunha Advocacia, contratadas e pagas diretamente por ela, conforme a Cláusula 9 do contrato. O Prestador entra nessas contas como colaborador técnico.

O consumo da API do Claude é **variável**: cresce com o número de peças geradas e com o tamanho dos documentos processados. Esse consumo não está incluído no valor de setup nem no pacote de acompanhamento mensal.

Até o fim da fase 2, o Prestador apresenta ao escritório uma estimativa de consumo mensal com base nos primeiros casos reais rodados no sistema.

---

## O que fica fora deste escopo

Os itens abaixo não estão incluídos neste contrato.

- **Recepção automatizada do cliente** (resumo da reunião, e-mail padrão, conferência dos documentos recebidos): possível via aditivo.
- **Acesso de clientes do escritório à plataforma**: possível via aditivo.
- **Integração com software jurídico** (CPJ, ProJuris, Astrea ou similar): possível via aditivo.
- **Outras áreas além do trabalhista bancário**: possível via aditivo.
- **Outras peças processuais**: contestação, contrarrazões, embargos de declaração, agravo de instrumento, embargos à execução, cálculos de liquidação e peças de execução de valores.
- **Integração com o PJe e peticionamento automático**: o sistema gera a minuta; o protocolo continua sendo feito pelo escritório.
- **Integração com o Jusbrasil**: a busca de jurisprudência roda sobre bases públicas dos tribunais. Uso da conta ou da API do Jusbrasil segue a Cláusula 4.
- **Migração do histórico dos processos ativos**: o sistema começa sem processos cadastrados. Os casos entram conforme o uso do dia a dia.
- **Aplicativo de celular**: o sistema é acessado pelo navegador.
- Qualquer funcionalidade não listada nos módulos 1 a 6 acima.

---

## Prazo

Prazo estimado de entrega: **30 dias úteis**, contados a partir do que ocorrer por último entre (a) a confirmação da entrada, conforme a Cláusula 3, e (b) a entrega dos acessos e do material listados abaixo.

O prazo segue a Cláusula 6 do contrato: sempre que a entrega parar à espera de algo do escritório, o prazo fica pausado e volta a correr quando a pendência for resolvida. Cada item atrasado empurra a entrega pelo mesmo número de dias.

**Pendências que pausam o relógio:**

1. Acesso ao Google Drive e ao OneDrive onde vivem os modelos e a base de jurisprudência.
2. Entrega da pasta única com modelos, teses e jurisprudências, no formato descrito em **Volume da migração**.
3. Contas Anthropic e Vercel criadas em nome do escritório, com o Prestador incluído como colaborador.
4. Casos reais disponibilizados para calibrar petição inicial (fase 2) e réplica e recursos (fase 3).
5. Devolução das listas de ajuste dentro dos 5 dias úteis de cada rodada.

---

## Fases da entrega

| Fase | O que acontece |
|---|---|
| 1 · Aceite e entrada | Escopo assinado e entrada confirmada. O relógio começa. |
| 2 · Base e primeira peça | Migração da base da casa e painel com petição inicial funcionando em casos reais. |
| 3 · Réplica e recursos | Réplica e recursos calibrados com processos do próprio escritório. |
| 4 · Rotina e acompanhamento | Treinamento das 3 advogadas, sistema no dia a dia e ajuste fino nas primeiras semanas. |

---

## Indicadores acompanhados

O escritório e o Prestador acompanham dois indicadores durante e após a entrega:

1. **Número de peças geradas por mês** no sistema.
2. **Tempo médio** entre a entrada dos documentos do caso no sistema e a peça pronta para revisão.

---

## Entrega final

Com a quitação total do valor de setup, conforme a Cláusula 7 do contrato, o Prestador entrega a A. Cunha Advocacia o código-fonte do sistema, os dados cadastrados e o acesso às contas de serviço, tudo em nome do escritório.
