# IRBIS — Estratégia de Paid Ads

## Contexto

- **Produto:** estúdio digital solo (webdesign, branding, dashboards, sistemas digitais)
- **Cliente ideal:** founder de startup ou SaaS em São Paulo, budget mín. R$5k
- **Objetivo:** leads qualificados para discovery call
- **Histórico:** zero (primeira campanha)
- **Ciclo de venda:** médio (1–3 semanas do lead à proposta aceita)

---

## Plataforma recomendada: Meta Ads primeiro

| Critério | Meta Ads | Google Ads |
|---|---|---|
| Custo de entrada | Baixo (~R$30/dia) | Médio (~R$60/dia) |
| Formato | Visual — ideal para portfolio | Texto — busca ativa |
| Onde estão os founders | Instagram / Feed | Buscam "webdesign para startup SP" |
| Momento do funil | Awareness + consideração | Intenção direta |
| **Decisão** | **Fase 1** | **Fase 2 (mês 3+)** |

---

## Arquitetura de campanhas — Meta Ads

```
Conta IRBIS
├── [Sempre ativo] Brand — retargeting de visitantes do site
└── Prospecção
    ├── Fase 1 · Awareness — portfolio e ponto de vista
    │   ├── Ad Set A: Founders SP (interesses: startup, SaaS, Notion, Figma)
    │   └── Ad Set B: Lookalike de visitantes do site (quando tiver volume)
    └── Fase 2 · Conversão — lead para discovery call
        ├── Ad Set A: Engajados com anúncios (7 dias)
        └── Ad Set B: Visitantes do site sem agendamento (30 dias)
```

---

## Budget — Fase 1 (meses 1–2)

| Campanha | Budget diário | Budget mensal |
|---|---|---|
| Prospecção — Awareness | R$30 | ~R$900 |
| Retargeting — site visitors | R$15 | ~R$450 |
| **Total** | **R$45** | **~R$1.350** |

Fase de aprendizado — esperar CPA alto. Meta: 2–3 leads qualificados/mês.

---

## Criativos — Pilares

| Pilar | Formato | Mensagem central |
|---|---|---|
| **Portfolio** | Carrossel / Reel 15s | Antes/depois de um projeto real |
| **Ponto de vista** | Imagem com copy** | "Você não precisa de agência para ter qualidade de agência" |
| **Prova social** | Quote card | Depoimento de cliente com resultado concreto |
| **Processo** | Vídeo bastidores 30s | Como a IRBIS trabalha — direto, sem burocracia |
| **Urgência** | Imagem | "Agenda limitada · máx. 3 projetos ativos" |

**P1 para produção:** 1 carrossel de portfolio + 1 imagem de ponto de vista + 1 quote card.

---

## Segmentação — Ad Set A (Founders SP)

- **Localização:** São Paulo (cidade) + raio 30km
- **Idade:** 25–44
- **Interesses:** Startup, SaaS, Product Hunt, Figma, Webflow, Notion, empreendedorismo
- **Comportamento:** Proprietários de pequenas empresas
- **Exclusões:** Estudantes, funcionários de grandes empresas

---

## Tracking (pré-lançamento obrigatório)

- [ ] Meta Pixel instalado no site (via GTM ou manual)
- [ ] Evento `Lead` disparando na confirmação do agendamento Cal.com
- [ ] Evento `PageView` no `/sobre`, `/vs-agencia`, `/para/saas`
- [ ] GA4 já ativo (`G-VKHL68G50M`) — importar conversões no Meta

---

## Roadmap

| Semana | Ação |
|---|---|
| 1 | Instalar Meta Pixel + configurar conversões |
| 2 | Produzir 3 criativos P1 (carrossel, imagem, quote) |
| 3 | Lançar Fase 1 com R$30/dia — Awareness |
| 4 | Ativar retargeting de visitantes do site |
| 5–8 | Analisar dados, matar criativos < 0,5% CTR, testar variações |
| 9–12 | Migrar budget para conversão, lançar Google Ads (busca) |

---

## KPIs — Fase 1

| Métrica | Meta |
|---|---|
| CPM | < R$25 |
| CTR | > 1,2% |
| CPC | < R$2,50 |
| Custo por lead qualificado | < R$200 |
| Leads/mês (mês 1–2) | 2–3 |
| Leads/mês (mês 3+) | 5–8 |
