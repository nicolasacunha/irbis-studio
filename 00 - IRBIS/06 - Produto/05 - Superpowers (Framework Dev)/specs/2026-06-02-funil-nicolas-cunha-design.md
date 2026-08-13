# Funil Nicolas Cunha — Design Spec

**Data:** 2026-06-02  
**Responsável:** Nicolas Cunha  
**Status:** Aprovado para planejamento

---

## Objetivo

Construir um funil de aquisição de clientes baseado em marca pessoal para o serviço de design 1-on-1 do IRBIS.

Modelo de referência: Casper Verbeek (Aesthetify) — Conteúdo → Site → Aplicação → Call → Projeto.

---

## Posicionamento

**Âncora:** "O site do founder"  
**Quem:** Nicolas Cunha (marca pessoal separada do IRBIS, que aparece como o estúdio de execução)  
**Para quem:** Founders de SaaS, Web3 e startups com produto definido que precisam de site, landing page ou identidade visual  
**Oferta final:** Projeto de design 1-on-1 (site, LP ou identidade) · R$5k – R$45k+  

---

## Arquitetura do Funil

```
Instagram @nicolascunha
     │
     │  Reels/Carrosséis curtos → CTA para YouTube
     ▼
YouTube (canal Nicolas Cunha)
     │
     │  Blueprints 15-25min → CTA para página
     ▼
irbis.com.br/founder
     │
     │  VSL / texto + casos + formulário de aplicação
     ▼
Call 30min (diagnóstico gratuito)
     │
     │  Qualificação + proposta
     ▼
Projeto de design
(site / LP / identidade · R$5k – R$45k+)
```

---

## Componente 1 — Instagram @nicolascunha

**Conta:** nova, desvinculada de @byirbis  
**Handle sugerido:** @nicolascunha ou @nicolas.cunha  
**Frequência:** 3x/semana no início  

**Tipos de conteúdo:**
- **Reels curtos (30-60s):** erros comuns no site de founders, princípios de design explicados rápido
- **Carrosséis (5-8 slides):** frameworks visuais — "os 5 elementos do site que fecha deal", "por que seu hero não converte"
- **Bio CTA:** link único para irbis.com.br/founder ou YouTube

**Tom:** direto, baseado em resultado, sem jargão de agência

---

## Componente 2 — YouTube Nicolas Cunha

**Canal:** novo, em nome pessoal  
**Formato:** vídeos 15-25min (blueprint/tutorial)  
**Frequência:** 1x/semana ou quinzenal no início  

**Temas iniciais (backlog de conteúdo):**
1. "Por que o site da sua startup está perdendo clientes"
2. "A anatomia do site que fecha deal"
3. "Como construo sites para founders em 3 semanas"
4. "Transformação de cliente: antes e depois do EForce Drums"
5. "O erro de design que afasta investidor na primeira visita"
6. "Micro-niche site blueprint para SaaS founders"

**Fórmula de título (modelo Casper):**
- `[problema ou resultado] + [audiência] + [formato entre colchetes]`
- Ex: `por que o site do seu saas está perdendo demo requests [full breakdown]`

**CTA obrigatório no final de cada vídeo:** irbis.com.br/founder  
**Descrição:** link para irbis.com.br/founder + redes

---

## Componente 3 — irbis.com.br/founder (página a construir)

**URL:** `irbis.com.br/founder`  
**Objetivo:** converter visitante qualificado em aplicação

### Estrutura da página

#### Seção 1 — Hero
- Kicker: "Designer · Founder do IRBIS"
- H1: "Trabalhe diretamente comigo no site do seu negócio"
- Subheadline: "Projeto 1-on-1. Sem agência, sem intermediário. Você fala direto com quem executa."
- CTA primário: "Aplicar para trabalhar comigo" → ancora para formulário
- CTA secundário: "Ver casos anteriores ↓" (scroll suave)
- Prova social inline: depoimento curto de Mauricio Odery (EForce Drums)

#### Seção 2 — Para quem é
**Qualifica quem entra, descarta quem não serve.**

✓ Founder com produto ou serviço já definido  
✓ Precisa do site no ar em menos de 60 dias  
✓ Quer converter cliente, fechar deal ou atrair investidor  
✓ Entende que template não resolve o problema  

✕ Ainda está validando a ideia (sem produto ou oferta definida)  
✕ Quer algo rápido e barato sem pensar em resultado  

#### Seção 3 — O que você recebe
3 cards:
- **Site institucional** — credibilidade para fechar parceria e captação
- **Landing page** — convertida para tráfego pago ou orgânico
- **Identidade visual** — brand que posiciona e diferencia no mercado

#### Seção 4 — Casos
2 cases: EForce Drums e Adash  
Formato: screenshot + nome + descrição de 1 linha + resultado  
CTA secundário: link para irbis.com.br/cases ou página de case completo

#### Seção 5 — Formulário de aplicação
Campos:
- Nome
- Email
- URL do site atual (se tiver)
- O que você precisa? (landing page / site / identidade)
- Qual é o prazo e o orçamento aproximado?

Após submit: redireciona para Calendly (agendamento da call de 30min) ou exibe mensagem "Analisarei sua aplicação e entrarei em contato em até 48h"

Nota abaixo do botão: "Não é call de vendas. É um diagnóstico gratuito de 30 minutos."

---

## Componente 4 — Call 30min

**Ferramenta:** Calendly (já em uso no IRBIS)  
**Duração:** 30 minutos  
**Objetivo:** diagnóstico + qualificação + proposta verbal  
**Não:** call de vendas agressiva

---

## Tech Stack da Página

O site irbis.com.br é HTML puro (sem framework), hospedado no Vercel.

- **Arquivo a criar:** `irbis/site/founder.html` (mesmo padrão dos outros pages: index.html, sobre.html, etc.)
- **Formulário:** HTML nativo com `action` para Formspree (ou similar) OU botão direto para Calendly sem formulário (versão mais rápida de lançar)
- **Analytics:** GA4 — adicionar evento de conversão no submit do formulário (mesmo setup do site)
- **Deploy:** push para o repositório → Vercel detecta e publica automaticamente em `irbis.com.br/founder`

---

## Versão mínima (MVP)

Para lançar rápido, a ordem de execução é:

1. Página `/founder` no ar com Hero + Para quem + Casos + Formulário
2. Calendly configurado para call de diagnóstico
3. Bio do Instagram apontando para a página
4. Primeiro vídeo no YouTube com CTA para a página

O Instagram e YouTube são contínuos — não bloqueiam o lançamento da página.

---

## O que NÃO está no escopo

- Novo domínio pessoal (nicolascunha.com) — fica em irbis.com.br/founder
- VSL gravado (opcional para v2 — página pode funcionar só com texto)
- Curso ou produto digital
- Blog ou newsletter
- Qualquer feature da plataforma IRBIS (@byirbis)

---

## Métricas de sucesso (90 dias)

- Página `/founder` no ar
- 1 vídeo publicado no YouTube com CTA para a página
- Instagram com pelo menos 10 posts publicados
- 1 cliente fechado via funil
