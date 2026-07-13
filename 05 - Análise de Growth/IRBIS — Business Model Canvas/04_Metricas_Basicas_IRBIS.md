# IRBIS  |  Métricas Básicas

*Atividade 4 — Planilha de Métricas Básicas  |  Documento vivo*

**Aviso:** A IRBIS opera há **≈ 2 meses** e não tem dados estruturados de funil. Todos os números abaixo são **dados reais reportados pelo sócio + chutes informados** sobre tempo investido. Tratados como hipóteses iniciais para direcionar análises futuras. Refinaremos no template 5.

**🔄 BASELINE CORRIGIDA (2026-05):** versões anteriores deste documento usaram "4 leads/mês", "10% de conversão" e "R$ 8.000 de ticket" como suposições. A baseline real reportada pelo sócio é: **4 leads totais em 2 meses (= 2/mês), 2 fechamentos (= 50% — estatisticamente enviesado por n=4 e canal 100% indicação), ticket médio R$ 6.000**. Os números abaixo refletem essa correção.

**Aviso adicional sobre volatilidade:** a média de R$ 6.000/mês (R$ 12.000 acumulados em 2 meses) é uma **média estatística achatada**. A realidade é que a IRBIS opera em fluxo **extremamente volátil** — pode ter tido um mês com R$ 12k concentrados e outro com R$ 0, ou variações similares. A média esconde essa variabilidade. Trate o número como ordem de grandeza, não como expectativa mensal regular.

---

## 1. ENTRADAS (chutar mesmo)

| Variável | Valor (real / chute) | Observação |
|---|---|---|
| **Quantos leads chegam (mês)** | 2 | **Dado real:** 4 leads totais em 2 meses de operação. 100% via indicação. |
| **% que vira cliente** | 50% | **Dado real:** 2 fechamentos em 4 leads. **⚠️ Estatisticamente enviesado** (n=4, canal único de indicação). Tendência sustentada esperada: 15–25% quando canal ativo entrar. |
| **Ticket médio (R$)** | R$ 6.000 | **Dado real reportado.** Sem padrão definido, varia caso-a-caso. |
| **Projetos por cliente / ano** | 1 | Sem dado de recorrência ainda (operação ≈ 2 meses). Conservador: assume projeto pontual. |
| **Tempo médio como cliente (meses)** | 3 | Duração média estimada de um projeto. Sem retenção formal/contrato recorrente. |
| **Investimento em aquisição (R$/mês)** | R$ 0 | Sem mídia paga, eventos pagos ou ferramentas relevantes. Só tempo do sócio. |
| **Tempo do sócio em aquisição (h/mês)** | 20 h | Estimativa: ~5h/semana entre LinkedIn, conversas iniciais, follow-up. |
| **Custo-hora de oportunidade do sócio (R$/h)** | R$ 200 | Chute conservador para sócio único multi-papel. |

---

## 2. RESULTADOS (calcular)

| Métrica | Conta | Resultado |
|---|---|---|
| **Clientes novos/mês** | 2 × 50% | **1 cliente/mês** (com ressalva: n=4, taxa de fechamento real esperada cai para 15–25% com canal ativo) |
| **Receita/mês** | 1 × R$ 6.000 × 1 | **R$ 6.000 / mês** (média achatada; volatilidade alta — meses zerados alternando com meses concentrados) |
| **CAC monetário** | R$ 0 ÷ 1 | **R$ 0** (sem investimento direto) |
| **CAC em tempo do sócio** | (20h × R$ 200) ÷ 1 | **R$ 4.000 / cliente** (custo de oportunidade) |
| **LTV** | R$ 6.000 × 1 × 1 | **R$ 6.000 / cliente** |
| **LTV / CAC monetário** | R$ 6.000 ÷ 0 | **∞ (irreal)** — o número monetário esconde o custo real |
| **LTV / CAC em tempo** | R$ 6.000 ÷ R$ 4.000 | **1,5x** — abaixo do ideal de 3x, mas acima de 1. Operação é frágil, não insustentável. **⚠️ Esse 1,5x é otimista por causa do n=4 e da taxa 50%.** Se a taxa de fechamento real (com canal ativo) for 20%, o cálculo vira 2 × 20% = 0,4 cliente/mês → CAC tempo R$ 10k → LTV/CAC = 0,6x (insustentável). |

---

## 3. LEITURA RÁPIDA

**CAC alto ou baixo?**

Aparentemente **muito baixo** (R$ 0 em dinheiro) — mas essa leitura é **enganosa**. Quando se contabiliza o tempo do sócio único (que vale uma hora de delivery não-entregue), o CAC implícito está em torno de **R$ 4 mil/cliente** — significativo, mas hoje proporcional ao ticket. A IRBIS não está pagando CAC em dinheiro porque está pagando em **escassez de tempo do sócio** — que é o recurso mais finito que ela tem hoje. **⚠️ Ressalva crítica:** esse CAC só está "tolerável" porque a taxa de fechamento (50%) é estatisticamente enviesada por canal único de indicação e n=4. Quando o LinkedIn ativo entrar e a taxa real cair para 15–25%, o CAC tempo sobe para R$ 8–13k/cliente — aí o problema reaparece.

**LTV vale a pena?**

**Frágil — não insustentável, mas longe do saudável.** LTV/CAC tempo de 1,5x está acima de 1 (não destrói valor), mas muito abaixo do ideal de ≥ 3x. Para virar saudável, três caminhos são possíveis (não excludentes):
- Aumentar **ticket médio** (pacotes nomeados, posicionamento premium — Templates 10/11/12 mostram que ICPs A e B aceitam ticket muito maior que R$ 6k)
- Criar **recorrência real** (contrato anual, retainer, segunda venda planejada — alavanca confirmada no Template 14, Foco C)
- Reduzir o **CAC em tempo** (referral sistematizado, conteúdo que pré-qualifica, sócio externo de Growth — Template 14, Foco D)

**Problema parece estar onde?**

Principalmente em:
- **Volume de leads é baixíssimo** — 2/mês não permite testar nada com significância estatística
- **Taxa de fechamento de 50% engana** — parece excelente, mas reflete apenas indicação direta (canal mais qualificado possível). Quando canais frios entrarem, vai despencar para 15–25%, e isso **não significa que algo está errado** — é regressão à média normal
- **Ticket médio sem padrão** — R$ 6 mil para serviços digitais customizados é piso de mercado; com posicionamento e pacotes pode triplicar (Template 13, padrão #2)
- **Sem recorrência estruturada** — cliente entra e sai; não há "segunda venda" planejada
- **Sobrecarga do sócio** vira **gargalo de aquisição** (não há mãos para puxar mais leads e fechar mais deals em paralelo)
- **Volatilidade severa da receita** — meses zerados alternando com meses concentrados, agravada pela ausência de precificação definida (cada proposta é caso-a-caso, sem tabela/pacote/padrão)

A combinação **"pouco volume × ticket modesto × sem recorrência × canal único"** explica por que a operação ainda está na faixa de R$ 6 mil/mês de receita média — não há vazamento único, há um sistema sub-otimizado em quatro pontos ao mesmo tempo.

---

## 4. O QUE É CHUTE?

**Parte é dado real, parte é chute.**

**Dados reais reportados pelo sócio:**

- Volume de leads (4 totais em 2 meses)
- Taxa de fechamento (2 em 4 = 50%, com ressalva estatística)
- Ticket médio (R$ 6.000)
- Origem do canal (100% indicação)

**Chutes (ainda sem registro/instrumentação):**

- Projetos por cliente / ano (assumido 1, sem evidência de recorrência ainda)
- Tempo médio como cliente (assumido 3 meses, duração estimada de projeto)
- Tempo do sócio em aquisição (assumido 20 h/mês, sem registro real)
- Custo-hora de oportunidade do sócio (assumido R$ 200/h, sem cálculo formal)

**Os resultados da seção 2 são consequência da combinação dos 2** — não são mais "tudo chute" como na versão anterior, mas ainda têm margem de erro significativa nos componentes assumidos.

Esses números servem **apenas como hipóteses iniciais** para direcionar pesquisa e análise. O refinamento entra no **template 5 (Refinamento de Métricas)** e **template 6 (Métricas Aprofundadas)**, idealmente já com dados reais coletados ao longo das próximas 4–8 semanas.

---

## 5. O QUE PRECISA DESCOBRIR URGENTE?

Em ordem de prioridade:

1. **Volume real de leads/mês por canal** — quantos vêm de indicação vs LinkedIn vs outros, separado.
2. **Coeficiente de variação da receita mensal** — quanto a receita varia mês a mês, % de meses zerados nos últimos 6, mês mais alto vs mais baixo.
3. **Taxa de fechamento real por canal** — indicação fecha mais que LinkedIn? Quanto?
4. **Ticket médio real por tipo de serviço** — site vs CRM vs dashboard vs produto digital têm tickets diferentes?
5. **Tempo médio entre primeiro contato e contrato fechado** — ciclo de venda real (semanas? meses?)
6. **% de clientes que voltam para 2º projeto** — existe recorrência informal?
7. **Tempo real do sócio em aquisição** — registrar 30 dias para validar o chute de 20h/mês.
8. **Motivos de perda de deal** — entre os 90% que não fecharam, por que não fecharam?
9. **Ticket médio dos concorrentes diretos** — para benchmark de posicionamento premium.
10. **Custo-hora real do sócio** — se ele está em delivery 70% do tempo, quanto ele "deixa de entregar" para prospectar?
11. **Recorrência viável por tipo de serviço** — quais entregas naturalmente abrem porta para 2ª venda (CRM > dashboard > site?).

---


---

## 6. Próxima movimentação planejada — começar a investir em CAC

O sócio sinalizou intenção de **começar a investir dinheiro em aquisição** a partir do próximo ciclo (templates 5 e 6). Isso muda a equação do CAC:

- O CAC sai de **R$ 0 monetário + R$ 10 mil em tempo** para **R$ X monetário + (idealmente menos) R$ Y em tempo** — o dinheiro investido deve, ao menos em parte, **comprar tempo de volta** para o sócio.
- Bons usos do orçamento inicial de CAC, para a fase atual da IRBIS: (a) **ferramentas que pré-qualificam o lead** (CRM, automação de LinkedIn, e-mail tool); (b) **conteúdo pago de autoridade** (ads em LinkedIn promovendo post-âncora); (c) **freelancer/parceiro de SDR** para abrir conversas; (d) **patrocínio/presença em 1 evento setorial** alinhado ao setor-foco escolhido.
- Maus usos do orçamento inicial: (a) ads de performance sem ICP definido; (b) ferramentas caras (CRM enterprise) com poucos contatos; (c) eventos fora do ICP só por aparecer.
- **Meta de orçamento sugerida para teste:** R$ 1.500–3.000/mês nos próximos 60 dias, distribuídos em **2 frentes no máximo**, com medição clara de CAC × qualificação por frente. Isso permite manter o LTV/CAC monitorado de perto.

> **Documento vivo:** os números desta planilha serão revisitados no **template 5** com dados parciais coletados, e finalizados no **template 6** com instrumentação mínima funcionando (CRM básico + planilha de pipeline).
