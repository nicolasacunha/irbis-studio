# IRBIS Posicionamento — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atualizar todos os materiais da IRBIS para refletir o novo posicionamento: especialista em sites apenas (landing pages, sites institucionais, e-commerce).

**Architecture:** Atualização sequencial de arquivos de texto/markdown/HTML. Sem dependências técnicas entre tarefas — cada uma pode ser executada de forma independente. O `brand-context.md` deve ser atualizado primeiro pois é a referência mestre.

**Tech Stack:** Markdown, HTML

---

## Arquivos modificados

| Arquivo | O que muda |
|---|---|
| `.claude/brand-context.md` | Audiência, pilares de conteúdo, linguagem permitida/proibida, assinatura |
| `04 - Marketing/content-strategy-instagram.md` | ICP, pilares (remover branding), bio |
| `03 - Comercial/commercial-roadmap.md` | Segmento prioritário, serviços no menu, copy de prospecção |
| `04 - Marketing/creative-brief-instagram-ads.md` | Mensagem central, copy dos anúncios |
| `04 - Marketing/ads-plan-irbis.md` | Targeting e copy |
| `site/index.html` | Seção de serviços, hero copy |

---

### Tarefa 1: Atualizar brand-context.md (referência mestre)

**Arquivo:** `.claude/brand-context.md`

- [ ] **Passo 1: Atualizar seção 01 / Identidade**

Substituir:
```
Ajudo founders e equipes de produto a ter presença digital de agência sem depender de uma.
```
Por:
```
Faço sites para founders. Só isso.
```

- [ ] **Passo 2: Atualizar seção 02 / Audiência — Para quem é**

Substituir:
```
Founders de startups e SaaS, líderes de produto e empreendedores que precisam de webdesign, branding ou dashboards com qualidade e prazo real — sem burocracia de agência.
```
Por:
```
Founders de startups e negócios em crescimento que precisam de site — e já sabem que template não resolve. Landing page, site institucional ou e-commerce.
```

- [ ] **Passo 3: Atualizar seção 04 / Pilares de conteúdo**

Substituir os 4 pilares por:
```
01. **Sites que convertem** — landing pages, sites institucionais e e-commerce com intenção comercial
02. **Especialista vs. generalista** — por que quem só faz uma coisa faz melhor
03. **Bastidores do estúdio** — processo, método, como a IRBIS opera
04. **O custo real das agências** — o que você compra vs. o que você recebe
```

- [ ] **Passo 4: Atualizar seção 05 / Ponto de vista — adicionar linha nova**

Na tabela, substituir a linha:
```
| Você não precisa de agência para ter qualidade de agência | Escala exige estrutura grande |
```
Por duas linhas:
```
| Especialista bate generalista | Quem faz tudo é bom em tudo |
| Você não precisa de agência para ter qualidade de agência | Escala exige estrutura grande |
```

- [ ] **Passo 5: Atualizar seção 06 / Linguagem**

Substituir:
```
**Sempre:** estúdio, entrega, briefing, construir, founder, sistema, direto, máx. 3 projetos ativos
**Nunca:** agência (para se referir à IRBIS), soluções, inovar, transformar, revolucionar, sinergia, ecossistema, "de ponta a ponta"
```
Por:
```
**Sempre:** sites, especialista, entrega, briefing, construir, founder, direto, landing page, e-commerce, semanas

**Nunca:** agência (para se referir à IRBIS), soluções, inovar, transformar, revolucionar, sinergia, ecossistema, "de ponta a ponta", branding (como serviço), identidade visual (como serviço), dashboard (como serviço), SaaS (como serviço)
```

- [ ] **Passo 6: Atualizar seção 07 / Assinatura**

Substituir:
```
**Linha recorrente:** *O estúdio que entrega como agência, sem ser.*
```
Por:
```
**Tagline:** *A IRBIS faz só sites.*

**Hero copy:**
BRANDING? NÃO.
APP? NÃO.
IDENTIDADE? NÃO.

SITE? SIM.
O melhor que você já teve.

**Bio Instagram:** Sites para founders. Nada mais.
```

---

### Tarefa 2: Atualizar content-strategy-instagram.md

**Arquivo:** `04 - Marketing/content-strategy-instagram.md`

- [ ] **Passo 1: Atualizar seção de diagnóstico**

No diagnóstico, substituir referências a "SaaS/Web3" por "founders que precisam de site". O problema continua o mesmo (conteúdo de design teórico que atrai audiência errada), mas o ICP descrito muda.

Substituir:
```
**Problema:** A série `brand_notes` (logo, cor, tipografia) fala para designers e branding enthusiasts — não para founders de SaaS/Web3, que são o ICP real do IRBIS.
```
Por:
```
**Problema:** A série `brand_notes` (logo, cor, tipografia) fala para designers e branding enthusiasts — não para founders que precisam de site, que são o ICP real da IRBIS.
```

- [ ] **Passo 2: Atualizar seção ICP para conteúdo**

Substituir:
```
**Quem é:** Founder de SaaS, Web3 ou startup digital, geralmente solo ou em equipe pequena (2-5 pessoas). Ticket de projeto: R$18–45k.
```
Por:
```
**Quem é:** Founder de startup ou negócio em crescimento que precisa de site (landing page, institucional ou e-commerce). Geralmente solo ou equipe pequena (2-5 pessoas). Ticket: a partir de R$5k.
```

- [ ] **Passo 3: Remover qualquer pilar sobre branding ou identidade visual**

Verificar se existe pilar "Branding para founders" ou equivalente. Substituir por:

**Pilar novo — "Especialista vs. generalista"**
```
**Objetivo:** Justificar o posicionamento de foco exclusivo em sites.
**Tom:** Analítico, com lógica de negócio.
**Frequência:** 2x/mês

Ideias de post:
- "Por que contrato advogado tributarista, não advogado geral." *(analogia do especialista)*
- "A IRBIS recusou X projetos de branding nesse mês. Veja por quê." *(recusa como prova de critério)*
- "O que muda quando você contrata alguém que só faz sites." *(argumento de especialização)*
```

- [ ] **Passo 4: Atualizar bio sugerida**

Localizar qualquer linha que contenha a bio do Instagram. Substituir pelo novo texto:
```
Sites para founders. Nada mais.
```

---

### Tarefa 3: Atualizar commercial-roadmap.md

**Arquivo:** `03 - Comercial/commercial-roadmap.md`

- [ ] **Passo 1: Atualizar seção "Prioridade de Segmento"**

Substituir:
```
**Qual segmento atacar primeiro:** Web3 e SaaS early-stage com produto validado e rodada ou receita inicial.
```
Por:
```
**Qual segmento atacar primeiro:** Founders de startup ou negócio em crescimento que precisam de site — landing page para tráfego pago, site institucional para credibilidade ou e-commerce para converter melhor.
```

Substituir os bullets de justificativa para remover referências a Web3/SaaS como categorias isoladas. Manter o argumento de velocidade e ticket compatível.

- [ ] **Passo 2: Atualizar template de DM de prospecção**

Localizar o template de mensagem de outbound. Substituir pelo novo copy:
```
Faço só sites: landing page, site institucional, e-commerce. Vi que vocês [estão captando / lançando produto / subindo tráfego]. Faz sentido conversar?
```

- [ ] **Passo 3: Atualizar "Estado Atual" — ticket alvo**

Substituir:
```
- Ticket alvo: R$18–45k por projeto
```
Por:
```
- Ticket alvo: R$5k (landing page) a R$45k+ (site complexo / e-commerce)
```

---

### Tarefa 4: Atualizar creative-brief-instagram-ads.md

**Arquivo:** `04 - Marketing/creative-brief-instagram-ads.md`

- [ ] **Passo 1: Atualizar headline/hook principal de cada ângulo**

Para cada ângulo de anúncio que mencione branding, identidade visual, Web3 ou SaaS como diferencial: substituir pelo argumento de especialização em sites.

Exemplo de substituição:
- Antes: "Design de produto que converte, sem agência."
- Depois: "Sites feitos por especialista. Não por quem também faz branding, app e identidade."

- [ ] **Passo 2: Atualizar CTA e oferta**

Qualquer CTA que mencione serviços além de sites: remover. Padronizar oferta para os 3 produtos (landing page, site institucional, e-commerce).

---

### Tarefa 5: Atualizar ads-plan-irbis.md

**Arquivo:** `04 - Marketing/ads-plan-irbis.md`

- [ ] **Passo 1: Atualizar targeting de audiência**

Remover Web3 como segmento isolado de targeting. Manter founders/empreendedores como público.

- [ ] **Passo 2: Atualizar copy dos anúncios**

Substituir qualquer headline que mencione branding, identidade ou "produto digital" pelo copy novo focado em sites.

---

### Tarefa 6: Atualizar site/index.html — seção de serviços

**Arquivo:** `site/index.html`

- [ ] **Passo 1: Localizar a seção de serviços no HTML**

Buscar por: `serviços`, `services`, `IDENTIDADE DE MARCA`, `BRAND WARFARE`, `PRODUTOS DIGITAIS`, `SISTEMAS`

- [ ] **Passo 2: Substituir os serviços listados**

Trocar os 4 serviços atuais (identidade de marca, produtos digitais, experiências web, direção criativa) pelos 3 produtos:

```html
<!-- Produto 1 -->
LANDING PAGE
Para founder que vai subir tráfego e precisa de página que converte. A partir de R$5k. Entrega em 1-2 semanas.

<!-- Produto 2 -->
SITE INSTITUCIONAL
O site completo da empresa. Para quem precisa de presença que representa o negócio. Entrega em 2-3 semanas.

<!-- Produto 3 -->
E-COMMERCE
Para quem vende online e o site atual está perdendo venda. Escopo definido no briefing.
```

Adaptar ao markup HTML existente sem alterar estilos.

- [ ] **Passo 3: Verificar hero copy**

Localizar a headline principal (`DESIGN IS DEAD` ou equivalente). Avaliar se mantém ou adapta para o novo posicionamento. Recomendação: manter o hero atual — é forte e não contradiz o foco em sites. Apenas garantir que a seção de serviços abaixo reflita os 3 produtos.

- [ ] **Passo 4: Testar o site localmente**

Abrir `site/index.html` no browser e verificar que a seção de serviços está legível e sem quebra de layout.

---

## Auto-review da cobertura

| Requisito do spec | Tarefa que cobre |
|---|---|
| Atualizar brand-context.md | Tarefa 1 |
| Remover SaaS/Web3 como segmento isolado | Tarefa 3 |
| Bio Instagram nova | Tarefa 2 |
| Remover pilar de branding do conteúdo | Tarefa 2 |
| Atualizar abertura de proposta | Tarefa 3 |
| Atualizar DM de prospecção | Tarefa 3 |
| Atualizar site — seção de serviços | Tarefa 6 |
| Atualizar anúncios | Tarefas 4 e 5 |
