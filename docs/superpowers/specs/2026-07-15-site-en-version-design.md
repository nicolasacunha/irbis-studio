# Versão EN do irbis.com.br — Design/Spec

Data: 2026-07-15
Autor: Nicolas Cunha (via assistente)
Status: aprovado para virar plano de implementação

## Objetivo

Capturar tráfego orgânico dos EUA com um espelho em inglês do site, indexável no Google americano, alternável por uma bandeira na navbar. O português continua sendo o padrão (default) e vive na raiz sem prefixo.

## Decisões travadas (respostas do dono, 2026-07-15)

1. **Escopo:** site inteiro (todas as ~16 páginas reais), executado em fases.
2. **Arquitetura:** arquivos EN estáticos separados sob `/en/` (não toggle por JavaScript). Motivo: SEO indexável é o objetivo; JS toggle não indexa.
3. **Slugs:** inglês sob `/en/` (ex.: `/en/about`, `/en/method`). PT permanece na raiz sem prefixo (`/sobre`, `/metodo`).
4. **Preço na versão EN:** soft — "pricing on the call" / "starting at", sem número fechado. (De quebra, evita ancorar barato pro comprador US e não propaga a divergência de preço R$3k×R$5k atual.)
5. **Tradução:** copy EN escrita aplicando a voz da marca IRBIS (direta, confiante), não tradução literal. Home traduzida primeiro como checkpoint de tom antes de replicar no resto.
6. **Bandeira:** SVG (não emoji — emoji de bandeira quebra em Windows).
7. **Trabalho em branch**, main como rede de segurança; deploy de cada fase só após OK do dono.

## Arquitetura de rotas

- Arquivos físicos espelham a estrutura PT sob `site/en/` (ex.: `site/en/index.html`, `site/en/about.html`, `site/en/for/saas.html`).
- Clean URLs via novos rewrites em `site/vercel.json` (o único vercel.json que a Vercel lê é o da raiz do deploy = `site/vercel.json`).
- `<html lang="en">` em todas as páginas EN.

### Mapa de slugs (PT na raiz → EN sob /en/)

| PT (raiz) | EN (/en/) |
|---|---|
| `/` | `/en` |
| `/sobre` | `/en/about` |
| `/metodo` | `/en/method` |
| `/manifesto` | `/en/manifesto` |
| `/cases` | `/en/cases` |
| `/vs-agencia` | `/en/vs-agency` |
| `/para/saas` | `/en/for/saas` |
| `/para/startups` | `/en/for/startups` |
| `/obrigado` | `/en/thank-you` |
| funil de agendamento (`/call`) | `/en/call` |
| `/eforce` | `/en/eforce` |
| `/adash` | `/en/adash` |
| `/lumenform` (dir `lumeform`) | `/en/lumenform` |
| `/processo`, `/processo/adash` | `/en/process`, `/en/process/adash` |
| `/404` | `/en/404` |
| `/blog`, `/blog/*` | `/en/blog`, `/en/blog/*` |

Enumeração final e conferência contra `site/vercel.json` acontece no plano; o slug é sempre inglês, kebab-case.

## Toggle de idioma (navbar)

- Botão de bandeira em SVG na navbar de cada página.
  - Nas páginas PT: bandeira 🇺🇸 (US) → leva à contraparte EN.
  - Nas páginas EN: bandeira 🇧🇷 (BR) → volta à contraparte PT.
- Cada página aponta explicitamente para a URL da sua contraparte (hardcoded por página, já que não há template compartilhado; a nav é copiada à mão e o markup varia por página — index, manifesto/metodo `#m-nav`, sobre `#s-nav`, founder etc.).
- Estilo alinhado aos tokens da marca (Sora, accent `#FF3D00` só em ação/hover; bandeira é ícone funcional, não decoração).
- Entra em todas as variações de nav do conjunto de páginas com nav.

## Tradução

- Copy EN aplicando a voz IRBIS via a skill `irbis-brand-voice` (+ ogilvy/stop-slop). Sem tradução literal de robô; sem travessão (regra fixa do site); sem palavras banidas do glossário.
- **Checkpoint de tom:** a home EN é traduzida primeiro; o dono aprova o registro antes de o resto ser traduzido no mesmo tom.
- Prova social afirmável: manter só o número permitido (`+R$350k` / equivalente em texto de resultado), sem inventar números. Na versão EN, apresentar o mesmo fato de resultado.

## SEO / hreflang

- Cada página PT ganha `<link rel="alternate" hreflang="en" href="…/en/…">` além das tags `pt-BR`/`x-default` já existentes.
- Cada página EN recebe cluster hreflang: `en` (self), `pt-BR` (contraparte PT) e `x-default` (aponta para a PT, o default).
- Canonical próprio em cada página EN (self-canonical para a URL `/en/…`).
- `og:locale` = `en_US` nas páginas EN.
- `site/sitemap.xml`: adicionar todas as URLs `/en/…` com o cluster hreflang. (Adicionar entradas novas é permitido; harmonizar as 8 URLs PT já defasadas continua sendo item à parte que exige OK do dono — não misturar.)

## Analytics

- Páginas EN levam os mesmos snippets das PT: GA4 (`G-VKHL68G50M`), Microsoft Clarity (`xmqsnmt3uv`) e, onde a PT correspondente tiver, Meta Pixel. Contentsquare foi removido (não replicar).

## Funil / conversão

- CTAs das páginas EN apontam para o mesmo Calendly (resolve fuso dos EUA) e o mesmo WhatsApp; labels em inglês.
- A página de agendamento (`/call`) ganha gêmea `/en/call` com o mesmo backend; apenas a copy/labels em inglês. Endpoints e integrações inalterados.

## Faseamento (regra da casa: uma seção por vez, aprovar antes da próxima)

- **Fase 1 — Padrão end-to-end:** rewrites de rota + componente de toggle de bandeira (nos dois sentidos) + **home EN completa** + wiring de hreflang (home PT↔EN) + sitemap. Prova o padrão inteiro numa página; dono aprova tom e mecânica antes de escalar.
- **Fase 2 — Conversão:** about, method, cases (hub), vs-agency, for/saas, for/startups, manifesto, thank-you, e o funil `/en/call`.
- **Fase 3 — Cases:** eforce, adash, lumenform, process (+ process/adash).
- **Fase 4 — Blog:** posts (maior volume de tradução, menor prioridade de conversão) — por último.

Cada fase: preview local (desktop + mobile ~390px) → OK do dono → deploy de dentro de `site/`.

## Tradeoffs e custos (explícitos)

- **Manutenção dobra:** toda edição futura do site passa a exigir a mudança nos dois idiomas. Aceito pelo dono em troca do tráfego US indexável.
- **Blog é o lift mais pesado** de tradução (long-form) e o de menor prioridade de conversão → fica por último.
- **Deploy sobe o filesystem**, não o git: a branch protege o histórico, não a produção. Proteção real = não deployar cada fase antes do OK.

## Fora de escopo (por ora)

- Números USD fechados de preço (decisão: soft/"on the call"; o dono passa a tabela depois, se quiser).
- Auto-redirect por geolocalização/Accept-Language (US cai direto nas páginas `/en` via busca; toggle é manual, default PT). Pode virar v2.
- Harmonizar retroativamente as 8 URLs PT defasadas do sitemap (item à parte, exige OK do dono).

## Critérios de aceite da Fase 1

- `/en` abre a home EN traduzida com a voz da marca, sem travessão, sem número inventado.
- Toggle de bandeira funciona nos dois sentidos entre `/` e `/en`.
- hreflang recíproco entre `/` e `/en` válido; canonical próprio; `og:locale=en_US`; `<html lang="en">`.
- `site/vercel.json` válido (`python3 -m json.tool`) e `site/sitemap.xml` válido (parse XML) com a entrada `/en`.
- GA4 + Clarity presentes na home EN.
- Preview local confere em desktop e mobile ~390px.
