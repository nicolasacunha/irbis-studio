# IRBIS Site — Redesign Design Spec
**Data:** 2026-05-23  
**Status:** Aprovado  

---

## 1. Feature Summary

Rebuild completo do `site/index.html`. O site migra de landing page de estúdio de branding (4 serviços genéricos + scroll horizontal com 3 panels) para site de consultoria digital com posicionamento claro: diagnóstico → projeto → acompanhamento. A identidade visual permanece idêntica; a arquitetura de conteúdo é inteiramente nova.

---

## 2. Primary User Action

Visitante lê o Hero, entende o que a IRBIS oferece e clica em um dos 3 CTAs (Diagnóstico, Ver Projetos, Conversar) para iniciar contato.

---

## 3. Design Direction

- **Tema:** dark. `#0C0C0E` fundo, `#18181B`/`#27272A` superfícies, `#FF3D00` accent único
- **Tipografia:** Sora (mantida). Hierarquia: headings 800 uppercase com letter-spacing negativo; body 300 muted
- **Tom:** declarativo, anti-explicativo. Copy máximo de 1 ideia por linha
- **Animações:** GSAP + ScrollTrigger + Lenis (mantidos). Cursor customizado (dot + ring)
- **Anti-padrões proibidos:** glassmorphism, gradient text, border-left accent stripe, cards genéricos com ícone

---

## 4. Arquitetura de Seções

```
index.html
├── 01. Hero           — headline + label + 3 CTAs (Diagnóstico · Ver Projetos · Conversar)
├── 02. Como Opero     — 5 fases em colunas (01 Escuta → 05 Ritual)
├── 03. Horizontal     — 4 panels pinned (desktop), stack vertical (mobile)
│   ├── Panel 1: Diagnósticos   — 2 cards lado a lado
│   ├── Panel 2: Projetos       — lista de 5 itens com hover
│   ├── Panel 3: Integrado      — bloco full-panel com lista de entregas
│   └── Panel 4: Acompanhamento — 4 módulos grid + bundle bar
├── 04. Cases          — placeholder "EM BREVE"
├── 05. Sobre          — bio 3 linhas + link manifesto + área de foto
├── 06. Contato        — heading + email/WhatsApp + form 2 campos
└── Footer             — logo + copyright
```

---

## 5. Scroll Horizontal — Especificação Técnica

| Propriedade | Valor |
|---|---|
| `.h-track` width | `400vw` (4 × 100vw) |
| Snap points | `[0, 1/3, 2/3, 1]` |
| `end` | `+= track.scrollWidth` |
| `scrub` | `0.6` |
| Background no enter | `#18181B` |
| Background no leave | `#0C0C0E` |
| Mobile breakpoint | `< 768px` → sem pin, stack vertical |

---

## 6. Copy Aprovado

### Hero
- **Label:** `ESTRATÉGIA · EXECUÇÃO`
- **Headline:** `CLAREZA ANTES. RESULTADO DEPOIS.`
- **Desc:** `Da estratégia ao ar. Sem agência no meio.`
- **CTAs:** `DIAGNÓSTICO` / `VER PROJETOS` / `CONVERSAR`

### Como Opero
| # | Nome | Desc |
|---|---|---|
| 01 | ESCUTA | Entender o negócio antes de qualquer proposta. |
| 02 | DIAGNÓSTICO | Mapear o que está travando. Dados, não achismo. |
| 03 | ESTRATÉGIA | Decidir o que não fazer é tão importante quanto o que fazer. |
| 04 | EXECUÇÃO | Velocidade e precisão. Sem terceirização de responsabilidade. |
| 05 | RITUAL | Presença contínua para quem quer resultado acumulado. |

### Diagnósticos
| Card | Tag | Nome | Desc | Meta |
|---|---|---|---|---|
| 01 | ENTRADA | DIAGNÓSTICO RÁPIDO | Uma área crítica. Clareza para agir rápido. | 1–2 SEMANAS |
| 02 | COMPLETO | DIAGNÓSTICO ESTRATÉGICO | Posicionamento, canais, produto. Mapa de ação priorizado. | 3–4 SEMANAS |

### Projetos (lista)
`01 SITE · 02 DASH COM CRM · 03 DIAGNÓSTICO · 04 PROJETO INTEGRADO · 05 LANÇAMENTO`

### Integrado
- **Tag:** `CARRO-CHEFE`
- **Headline:** `PROJETO INTEGRADO`
- **Desc:** `Da marca ao sistema. Do posicionamento ao primeiro cliente.`
- **Inclui:** Diagnóstico estratégico / Identidade e posicionamento / Site ou produto digital / Estrutura de captação / Ritual de acompanhamento

### Acompanhamento
| # | Nome | Desc |
|---|---|---|
| 01 | CONTEÚDO ESTRATÉGICO | Cada peça com propósito. Posicionamento ou captação. |
| 02 | TRÁFEGO E MÍDIA | Campanhas pagas com foco em CAC. Resultado, não relatório. |
| 03 | ANÁLISE E DADOS | Métricas para decidir, não para preencher reunião. |
| 04 | CRM E OPERAÇÃO | Automações e fluxos que funcionam enquanto você dorme. |
- **Bundle:** `ACOMPANHAMENTO COMPLETO — 4 módulos integrados. Ritual mensal.`

### Sobre
- **Nome:** `NICOLAS CUNHA`
- **Bio:** Trabalho com founders que precisam de clareza antes de escalar. Diagnóstico preciso, execução sem enrolação. A IRBIS resolve o sistema — não só a criatividade.

---

## 7. Estados

| Estado | Comportamento |
|---|---|
| Cases vazio | Placeholder `EM BREVE` com borda dashed |
| Sobre sem foto | Área `#18181B` com texto placeholder visível |
| Form submit | Sem backend definido — comportamento padrão do browser por ora |
| Mobile < 768px | Horizontal scroll desativado; panels empilhados verticalmente |

---

## 8. O que NÃO muda

- Cursor customizado (dot + ring com lerp)
- Lenis smooth scroll (`lerp: 0.07`)
- GSAP ScrollTrigger reveals (`.reveal` classe)
- Intro curtain (manter do `index.html` atual)
- Manifesto (`manifesto.html`) — arquivo separado, sem alteração
- Cases hub (`cases-hub/`) — sem alteração
- CSS variables (`--bg`, `--s1`, `--s2`, `--accent`, `--text`, `--muted`)

---

## 9. Arquivo de referência

O protótipo aprovado está em `site/prototype.html`. O rebuild vai para `site/index.html` (substituindo o atual).
