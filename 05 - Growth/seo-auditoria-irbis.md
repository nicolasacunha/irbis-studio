# SEO Auditoria — irbis.com.br
**Data:** 01/jun/2026

---

```
Overall Score: 61/100

On-Page SEO:     55/100  █████░░░░░
Content Quality: 78/100  ███████░░░
Technical:       72/100  ███████░░░
Schema:          65/100  ██████░░░░
Images:          40/100  ████░░░░░░
```

---

## Problemas Críticos

### 1. Title tag subdimensionado (CRÍTICO)
**Atual:** "IRBIS | Sites para founders" (28 chars)
**Problema:** Desperdiça 32 caracteres. Sem keywords de cauda longa.
**Corrigir para:**
```
IRBIS | Webdesign para Startups e Founders | Landing Page · Site Institucional
```
(80 chars — usar ~60 chars idealmente)

**Ou mais focado em busca:**
```
Webdesign para Startups | Landing Page e Site Institucional | IRBIS
```

---

### 2. H1 sem keyword primária (CRÍTICO)
**Atual:** "O site que seu negócio merece ter."
**Problema:** H1 de conversão excelente mas invisível para SEO. Google usa H1 para entender o tópico da página.
**Solução:** Manter H1 atual para conversão e adicionar keyword no title + uma seção com texto rico em keyword para SEO.

---

### 3. Zero conteúdo indexável de cauda longa (CRÍTICO)
**Problema:** O site não tem nenhuma página ou seção que responda buscas como:
- "webdesign para startup brasil"
- "landing page para startup"
- "site para empresa pré-seed"
- "quanto custa um site para startup"

**Solução:** Criar páginas de destino por keyword (ver seção Oportunidades).

---

### 4. Imagens sem alt text descritivo (ALTO)
**Hero image:** `alt=""` (correto pois é decorativa + aria-hidden)
**Problema:** Não há outras imagens indexáveis. Cases e clientes são apenas texto/CSS — sem imagens otimizadas.

---

## Problemas de Alto Impacto

### 5. Schema incompleto (ALTO)
**O que existe:** ProfessionalService, WebSite, WebPage, FAQPage ✅
**O que falta:**
- `Person` schema para Nicolas Cunha
- `Service` schema individual para cada produto (Landing Page, Site Institucional, E-commerce)
- `LocalBusiness` com endereço de São Paulo (aumenta visibilidade local)

**Schema Person a adicionar:**
```json
{
  "@type": "Person",
  "@id": "https://irbis.com.br/sobre#nicolas",
  "name": "Nicolas Cunha",
  "jobTitle": "Especialista em Webdesign para Startups",
  "worksFor": {"@id": "https://irbis.com.br/#organization"},
  "sameAs": ["https://www.linkedin.com/in/nicolas-cunha-irbis/"]
}
```

---

### 6. Nenhuma estratégia de link building (ALTO)
**Problema:** Site sem backlinks externos de qualidade provavelmente.
**Solução:** Aparecer em:
- startups.com.br (pitchar case EForce como história)
- startupi.com.br (guest post sobre sites para startups)
- LinkedIn articles (indexados pelo Google)

---

### 7. Falta Google My Business (MÉDIO)
**Ação:** Criar perfil no Google Business com:
- Categoria: "Empresa de design gráfico" ou "Designer de websites"
- Endereço: São Paulo, SP
- Site: irbis.com.br
- Horário: horário comercial

---

## Oportunidades de Keyword (SEO Inbound)

### Cluster 1 — Intenção de contratar (alta conversão)
| Keyword | Volume estimado | Dificuldade | Ação |
|---|---|---|---|
| webdesign para startups | Baixo-médio | Baixa | Página dedicada |
| landing page para startup brasil | Baixo | Muito baixa | Sub-seção ou página |
| site para empresa pré-seed | Muito baixo | Muito baixa | FAQ ou blog |
| quanto custa um site para startup | Baixo | Baixa | FAQ expandido |

### Cluster 2 — Intenção de comparar (tráfego de pesquisa)
| Keyword | Volume estimado | Dificuldade | Ação |
|---|---|---|---|
| webdesign freelancer vs agência | Médio | Média | vs-agencia.html já existe |
| estúdio de design digital são paulo | Baixo | Baixa | Adicionar geo ao schema |
| criação de site para startup | Baixo | Baixa | Otimizar para/startups.html |

### Cluster 3 — Intenção de aprender (topo de funil)
| Keyword | Volume estimado | Dificuldade | Ação |
|---|---|---|---|
| como fazer landing page que converte | Médio | Alta | Blog post |
| erros de site de startup | Baixo | Muito baixa | Blog post (já temos o conteúdo das auditorias!) |
| site para founder | Muito baixo | Muito baixa | Página dedicada |

---

## Ações Prioritárias (implementar nessa ordem)

### Semana 1 — Quick wins
1. **Corrigir title tag** para incluir keywords primárias
2. **Criar Google My Business** (15 min)
3. **Adicionar schema Person** no JSON-LD existente
4. **Adicionar schema Service** para cada produto no JSON-LD

### Semana 2 — Conteúdo
5. **Otimizar para/startups.html** com keywords do cluster 1
6. **Otimizar para/saas.html** com keywords específicas de SaaS
7. **Criar 1 blog post** sobre "Os 4 erros mais comuns em sites de startup" (já temos o conteúdo das auditorias — só publicar)

### Mês 2 — Link building
8. **Pitchar case EForce para startups.com.br** — história real de transformação digital
9. **Publicar LinkedIn articles** (indexados pelo Google) sobre CRO e webdesign para founders
10. **Guest post em 1 newsletter de startups BR**

---

## Implementação Imediata — Title Tag

Editar em `site/index.html` linha 6:

```html
<!-- ATUAL -->
<title>IRBIS | Sites para founders</title>

<!-- CORRIGIR PARA -->
<title>Webdesign para Startups | Landing Page e Site Institucional | IRBIS</title>
```

---

## Implementação Imediata — Schema adicional

Adicionar dentro do `@graph` no JSON-LD existente:

```json
{
  "@type": "Service",
  "name": "Landing Page para Startups",
  "provider": {"@id": "https://irbis.com.br/#organization"},
  "description": "Landing pages de alta conversão para founders de startup. Entrega em 1-2 semanas. A partir de R$5k.",
  "areaServed": "BR",
  "offers": {
    "@type": "Offer",
    "price": "5000",
    "priceCurrency": "BRL"
  }
},
{
  "@type": "Service",
  "name": "Site Institucional para Startups",
  "provider": {"@id": "https://irbis.com.br/#organization"},
  "description": "Sites institucionais para startups e empresas em crescimento. Entrega em 2-3 semanas.",
  "areaServed": "BR"
},
{
  "@type": "Service",
  "name": "E-commerce para Marcas",
  "provider": {"@id": "https://irbis.com.br/#organization"},
  "description": "Sites de e-commerce para marcas que querem vender mais. Escopo definido no briefing.",
  "areaServed": "BR"
}
```
