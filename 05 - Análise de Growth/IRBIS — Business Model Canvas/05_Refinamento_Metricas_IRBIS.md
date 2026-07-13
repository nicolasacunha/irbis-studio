# IRBIS  |  Refinamento das Métricas Iniciais

*Atividade 5 — Refinamento de Métricas  |  Documento vivo*

**De métricas genéricas a métricas que de fato movem o sistema IRBIS.**

**🔄 BASELINE CORRIGIDA (2026-05):** este documento foi atualizado para refletir a baseline real reportada pelo sócio: 2 meses de operação, 4 leads totais (= 2/mês), 2 fechamentos (= 50% — enviesado por canal único de indicação e n=4), ticket médio R$ 6.000, receita acumulada R$ 12k em 2 meses.

Saída do Template 4 (Métricas Básicas) confirmou: o problema da IRBIS não é uma única métrica vazando — é um **sistema sub-otimizado em quatro pontos simultâneos** (volume × ticket × recorrência × canal único), agravado pela escassez de tempo do sócio único. Refinar significa **desagregar** essas métricas para conseguir agir em cada ponto.

---

## North Star candidata para a IRBIS

> **Receita mensal previsível ≥ R$ 25.000**  sustentada por  **LTV/CAC blended ≥ 3:1**  e  **≥ 50% do pipeline vindo de canais ativos** (não-indicação), com a **capacidade de delivery do sócio ≤ 70%** (deixando 30% para vender, pensar e crescer).

A north star tem **um número de saída** (receita previsível) e **três condições simultâneas** (LTV/CAC ≥ 3, ≥50% pipeline ativo, capacidade ≤ 70%) — porque atingir só a receita comprometendo capacidade ou queimando network não é sucesso real.

---

## Tabela de Refinamento

| Métrica inicial (Template 4) | Insight do Refinamento | Métrica refinada | Meta / benchmark |
|---|---|---|---|
| **CAC (R$ 0 monetário + R$ 4k em tempo, com ressalva estatística)** | CAC monetário zero esconde o custo real; o CAC em tempo está hoje proporcional ao ticket apenas porque a taxa de fechamento (50%) é enviesada por canal único. Precisamos medir CAC **com a entrada planejada de dinheiro** e separar por canal. | **CAC por canal** (indicação, LinkedIn orgânico, LinkedIn ads, evento, parceria) + **CAC blended** com dinheiro + tempo do sócio | CAC blended ≤ R$ 4 mil/cliente (≤ 50% do ticket-alvo de R$ 15k) • CAC pago ≤ 0,8× CAC blended (canal pago tem que ser ≥ média) |
| **LTV médio (R$ 6.000)** | Média de uma operação com 1 projeto/cliente é piso, não teto. LTV varia muito por tipo de serviço — dashboard recorrente ≠ site pontual. | **LTV 12m por tipo de serviço** (site / CRM / dashboard / produto digital / lançamento) | LTV blended ≥ R$ 16 mil em 12m • Pelo menos 1 tipo de serviço com LTV > R$ 30k (candidato a verticalização) |
| **Taxa de fechamento (50% — enviesada por n=4 e canal único)** | Os 50% atuais refletem apenas indicação direta. Quando canais frios entrarem, vai cair para 15–25% — regressão à média normal. Sem segmentar por canal, número agregado engana. | **Taxa de fechamento por canal** + **por estágio do funil** (lead → reunião → proposta → contrato) | Indicação ≥ 35% • Canais ativos ≥ 12% • Sem etapa do funil com queda > 60% (gargalo crítico) |
| **Ticket médio (R$ 6.000, sem padrão)** | Variação caso-a-caso impede crescimento. Pacotes nomeados deslocam a conversa de "horas" para "valor". | **Ticket médio por tipo de serviço + % de propostas com pacote nomeado** (vs proposta custom) | Ticket blended ≥ R$ 15.000 em 6 meses • ≥ 60% das propostas com pacote nomeado |
| **Volume de leads (2/mês — 4 totais em 2 meses)** | Total esconde origem (hoje 100% indicação). Precisamos saber quanto vem de cada canal para decidir onde investir. | **Leads/mês por canal** + **% de leads qualificados** (passaram do 1º contato) por canal | ≥ 12 leads/mês total • ≥ 4 leads/mês vindos de canal ativo (não-indicação) • ≥ 50% dos leads qualificados |
| **Tempo do sócio em aquisição (20h/mês, estimado)** | Sem registro real, não dá para otimizar. Cada hora em prospecção é uma hora não-entregue (custo de oportunidade). | **Horas/semana por atividade do sócio** (LinkedIn, indicação ativa, follow-up, delivery, operação, financeiro) + **leads gerados por hora investida em aquisição** | ≤ 8h/semana do sócio em aquisição • ≥ 1 lead qualificado por cada 4h investidas em aquisição |
| **Recorrência (assumida em 0)** | Cliente atual entra e sai. Sem segunda venda planejada, LTV é o ticket. | **% de clientes que compram 2º projeto em 12m** + **tempo médio até 2ª venda** | ≥ 30% de clientes com 2ª venda em 12m • Tempo até 2ª venda ≤ 6 meses |
| **Investimento em aquisição (R$ 0)** | Vai sair de zero. Sem método, vira queima. | **Orçamento mensal de aquisição** + **CAC por R$ investido por frente** | R$ 1.500–3.000/mês nos próximos 60 dias • Máximo 2 frentes simultâneas com medição clara |
| **— (não existia antes)** | Brand awareness é objetivo, mas não estava medido. | **Volume de buscas pelo nome "IRBIS" no Google** + **menções diretas/mês** (LinkedIn, e-mail, indicação espontânea) | +50% em 6 meses (baseline a definir em 30 dias com Google Trends + autorrelato) |
| **— (não existia antes)** | Capacidade de delivery é variável crítica do sistema (template 8). | **% de capacidade ocupada do sócio em delivery** + **Nº de projetos simultâneos sustentáveis** | Capacidade ocupada ≤ 70% • Projetos simultâneos ≤ 3 com 1 sócio único |

---

## Critério de boa métrica (filtro do refinamento)

Toda métrica que ficar nesta tabela passou pelos 4 filtros abaixo. Métricas que falhem em qualquer um devem ser descartadas ou refinadas mais:

1. **Acionável** — sei qual alavanca mexer se ela subir ou cair (não é "interessante saber", é "vou agir").
2. **Segmentável** — consigo abrir por canal, tipo de serviço, setor ou cohort. Métricas blended são apoio, não diagnóstico.
3. **Com janela temporal clara** — semanal, mensal, trimestral. Métricas sem janela não viram rotina.
4. **Conectada a uma variável crítica do sistema IRBIS** (do template 8): capacidade do sócio, escolha ativa de setor, narrativa/marca, motor de aquisição ativo, ticket via pacotes nomeados.

---

## Como ler esta tabela

- **Métricas iniciais** (coluna 1) são as variáveis simples do Template 4 — boas para um chute inicial, fracas para decisão.
- **Métricas refinadas** (coluna 3) são as que entram no painel da IRBIS — segmentadas e acionáveis.
- **Metas/benchmarks** (coluna 4) são alvos de 6 meses, calibrados para uma operação ainda jovem. Não são metas anuais de empresa madura.
- **As metas se sustentam mutuamente:** atingir LTV/CAC ≥ 3 sem aumentar volume de leads é matematicamente improvável; subir ticket sem pacotes nomeados é difícil; reduzir CAC em tempo do sócio sem instrumentação básica (CRM) é cego. Por isso a north star pede 4 condições simultâneas.

---

## O que destrava esta lista (pré-requisitos antes de medir tudo isto)

1. **CRM básico funcionando** (HubSpot Free / Pipedrive) com leads + canal de origem + estágio + ticket — pré-requisito de qualquer métrica segmentável por canal.
2. **Planilha de tempo do sócio por 30 dias** — pré-requisito de medir CAC em tempo de forma realista.
3. **Definição dos pacotes nomeados** (≥ 2 inicialmente) — pré-requisito de medir "% propostas com pacote nomeado".
4. **Escolha do canal pago de teste** (1 frente) — pré-requisito de medir CAC monetário.
5. **Definição do setor-foco** (template 10/11) — pré-requisito de segmentar métricas por setor.

> **Documento vivo:** revisitar a cada 30 dias com dado real entrando. O template **6 (Métricas Aprofundadas)** parte daqui e adiciona drivers, funil completo, alavancas e cenários de simulação.
