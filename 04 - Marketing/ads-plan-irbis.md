# Plano de Anúncios IRBIS

**Status atual:** Tráfego pago inativo — este documento define quando e como ativar  
**Atualizado em:** 2026-06
**Posicionamento:** A IRBIS faz só sites. Landing pages, sites institucionais, e-commerce. Nada de branding, identidade visual, app ou sistema.

---

## Por Que Não Rodar Ads Agora

Rodar ads sem os elementos certos queima budget e não converte. O problema não é a plataforma — é o que o founder vai encontrar depois do clique.

**Bloqueadores atuais:**
- Apenas 2 cases publicados (mínimo recomendado: 3 com contexto de negócio completo)
- Pipeline de inbound zero — sem audiência para retargeting
- LP de destino não foi testada em termos de conversão (formulário, tempo de carregamento, CTA)
- Sem dados de qual conteúdo orgânico gera mais engajamento do ICP

**Regra prática:** Ads amplificam o que já funciona. Se o orgânico não gera nenhum interesse, ads vão amplificar a indiferença — com custo.

---

## Quando Ativar

Checklist de prontidão (todos os itens precisam estar marcados):

- [ ] Pelo menos 3 cases publicados com problema → processo → resultado
- [ ] Depoimento do Mauricio Odery visível na LP principal
- [ ] Pixel com eventos `Lead` e `ViewContent` validados no Meta Events Manager
- [ ] GA4 com conversão mapeada e funcionando
- [ ] LP de destino carrega em menos de 3s no mobile
- [ ] Formulário de contato respondido consistentemente em menos de 24h
- [ ] Ao menos 1 mês de conteúdo orgânico com engajamento mensurável do ICP
- [ ] Budget reservado para 45–60 dias de teste sem pressão de retorno imediato

---

## Plataforma: LinkedIn vs Meta (Instagram)

### Meta Ads (Instagram)

**Vantagens para IRBIS:**
- Founders de startup/negócio em crescimento usam Instagram — especialmente para acompanhar estúdios e referências de design
- Criativo visual tem vantagem clara: portfólio, processo, antes/depois performam bem em feed
- Custo por clique mais baixo que LinkedIn
- Pixel já instalado — base para retargeting e lookalike

**Limitações:**
- Segmentação por cargo/setor menos precisa que LinkedIn
- Requer criativo forte — anúncio mediano não converte em nicho premium

**Veredicto: plataforma principal para IRBIS.** O produto é visual. O Instagram é o canal certo para mostrar execução.

---

### LinkedIn Ads

**Vantagens:**
- Segmentação por cargo (Founder, CEO, CTO), setor (Software, Blockchain) e tamanho de empresa (1–10 funcionários) é muito mais precisa
- Audiência de tomadores de decisão direta

**Limitações:**
- CPL (custo por lead) entre 3x e 5x mais alto que Meta
- Formato de anúncio menos favorável para portfólio visual
- Budget mínimo para teste significativo é maior
- IRBIS ainda não tem volume de leads suficiente para justificar CPL alto

**Veredicto: canal secundário.** Considerar apenas na Fase 3 (escala), com budget separado e objetivo específico de alcançar founders B2B SaaS com ticket acima de R$30k.

---

## Estrutura de Campanhas (quando ativar)

### Nível 1 — Aquecimento e Reconhecimento

**Objetivo:** Construir audiência antes de converter.

- Campanha de tráfego para os cases publicados
- Público: interesses em startups, empreendedorismo, negócio digital, UX/UI — Brasil
- Orçamento: R$15–20/dia
- Duração: 3–4 semanas
- Meta: acumular audiência de visitantes para retargeting (mínimo 500–1.000 visitantes únicos na LP)

---

### Nível 2 — Retargeting

**Objetivo:** Converter visitantes que já conhecem a IRBIS.

- Público: visitantes do site nos últimos 30 dias que não preencheram o formulário
- Ângulos: velocidade (3 semanas) e comunicação direta (ver `creative-brief-instagram-ads.md`)
- Orçamento: R$20–30/dia
- Formato: Stories 15s + feed carrossel
- Meta: CPA (custo por lead) abaixo de R$300

---

### Nível 3 — Lookalike

**Objetivo:** Expandir para prospects semelhantes aos que já converteram.

- Público: lookalike 1–3% baseado em lista de clientes ou visitantes que converteram
- Somente ativar após ter pelo menos 30 leads históricos no pixel
- Orçamento: R$30–50/dia
- Meta: manter CPA abaixo de R$400

---

## Budget Mínimo para Teste

| Fase | Budget Diário | Duração Mínima | Investimento Total |
|---|---|---|---|
| Nível 1 (aquecimento) | R$20/dia | 30 dias | R$600 |
| Nível 2 (retargeting) | R$25/dia | 30 dias | R$750 |
| Total de teste real | — | 60 dias | R$1.350 |

**Nota:** Abaixo de R$600/mês em Meta Ads, o algoritmo não tem dados suficientes para otimizar. Menos que isso é desperdício.

---

## Sequência Recomendada

```
Orgânico (Instagram + site)
       ↓
Audiência acumulada (visitantes + seguidores engajados)
       ↓
Nível 1: Campanha de reconhecimento → tráfego para cases
       ↓
Pixel com 500+ visitantes acumulados
       ↓
Nível 2: Retargeting → anúncio de conversão (formulário)
       ↓
30+ leads históricos no pixel
       ↓
Nível 3: Lookalike → expansão
       ↓
LinkedIn Ads (Fase 3, budget separado)
```

---

## O Que Precisa Estar Pronto Antes de Ligar os Ads

### Pixel e Eventos
- Meta Pixel instalado e disparando corretamente (já feito)
- Evento `Lead` configurado no envio do formulário de contato
- Evento `ViewContent` na abertura de cada case
- Teste completo no Meta Events Manager sem erros

### LP Otimizada
- Headline orientada ao ICP (ex: "A IRBIS faz só sites. Por isso faz melhor.")
- Cases com contexto de negócio — não só imagens bonitas
- Depoimento real acima da dobra ou na primeira seção
- Formulário simples: nome, e-mail, descrição do projeto (landing page / site institucional / e-commerce), prazo
- CTA único e claro — sem múltiplas opções de ação na mesma página
- Velocidade: menos de 3s no mobile (testar com PageSpeed Insights)

### Cases (mínimo 3)
- Cada case precisa ter: contexto do cliente → problema → o que foi feito → resultado ou entrega
- Imagens em alta resolução, otimizadas para web
- Cases publicados devem ser de founders de startup/negócio em crescimento — não qualquer cliente
- Cada case deve especificar o tipo de site (landing page, site institucional ou e-commerce)

---

## Concorrência e Diferenciação nos Anúncios

Monitorar o GG Studio (ggstudio.com.br) periodicamente via Meta Ads Library para:
- Ver quais ângulos estão sendo testados
- Evitar posicionamento idêntico
- Identificar lacunas de mensagem que a IRBIS pode ocupar

**Diferencial principal a comunicar em todos os anúncios:** 
- Especialização exclusiva em sites (landing pages, sites institucionais, e-commerce)
- Velocidade (3 semanas do briefing ao ar)
- Comunicação direta (sem intermediário)
- Sem branding, identidade visual, app ou sistema — só sites

Não comunicar "design premium" — esse é o posicionamento genérico que todo estúdio usa.
