# Demo The Holos Lab — Deanna Cowling (registro)

**Data:** 13/jul/2026 · **URL:** https://holoslab-demo.vercel.app · **Código:** `Testes/holoslab/`
**Dossiê da lead:** `03 - Comercial/01 - Prospecção/leads-tier1-varredura2-13jul2026.md` (item 2)
**Outreach (conexão):** `03 - Comercial/01 - Prospecção/demos/leva-13jul-prompts-e-outreach.md` (item 3)

## O que a demo entrega

Home completa em resposta literal ao brief do post dela ("clean, modern, high-end, polished without being overdesigned"):

- Hero assimétrico: headline real do site em serif editorial (Libre Caslon Text) no lugar do Times New Roman de template, retrato dela com moldura hairline dourada, CTAs "Begin a Conversation" + "Work With Me"
- Faixa de prova acima da dobra: Kellogg Executive MBA + linhas de serviço reais
- The Holos Method em 3 colunas numeradas (Clarity / Alignment / Intentional Action)
- Who this work is for (lista real do site), For Organizations (banda escura), Results com o depoimento real do Executive MBA Client
- About Deanna com credenciais verificadas (23 anos U.S. Secret Service, Kellogg)
- Apply em banda escura + telefone real (773) 408-2559
- Rodapé corrige o "Copyright © 2025 Executive Coach" (sobra de template do site atual) para "© 2026 The Holos Lab, LLC"
- Nota de transparência no rodapé: "Concept redesign — not the official website"

Todo o texto é do site atual dela (redesign, não recopy). Zero claims inventados.

## Identidade extraída do site atual

- Dourado `#d3a45d` (ajustado para `#c89b5a` fills / `#8a6631` texto pequeno), creme `#f0e7c2` → `#f2ecdd`, marfim `#faf7f0`, tinta `#211b12`
- Tipografia nova: Libre Caslon Text (títulos) + Hanken Grotesk (corpo) + Marcellus (wordmark/eyebrows) — o site atual cai em Times New Roman + Plus Jakarta Sans
- Fotos e logo (círculo dourado) reaproveitados do próprio site

## Antes/depois

- `antes-dobra.png` / `depois-dobra.png` (1440×900, nesta pasta)

## Pendências a confirmar com a Deanna

1. **Foto do hero**: usei o retrato da página About (terno azul-marinho, mais executivo). Confirmar se é a foto que ela prefere — as fotos do site atual parecem geradas/tratadas por IA; se ela tiver ensaio profissional real, melhora ainda mais.
2. **"23 years with the U.S. Secret Service"**: verificado no LinkedIn dela, mas não está escrito no site atual. Confirmar se ela quer esse dado publicado.
3. **Chicago**: não aparece no site atual (só o DDD 773). Não usei na demo; confirmar se ela quer localização visível.
4. **Speaking e Resources**: mantidos como links para o site atual no rodapé (fora do escopo da home). No projeto real viram páginas.
5. **Formulário do Apply**: o CTA aponta para o /apply do site atual dela. No projeto real, formulário próprio.
6. **Copyright**: o site atual diz "© 2025 Executive Coach" (sobra de template) — corrigido na demo para "The Holos Lab, LLC"; confirmar razão social.

## Técnico

- Estático (HTML+CSS+JS vanilla), sem build. `?static` na URL desliga animações (uso em screenshot/verificação).
- Deploy: projeto Vercel `holoslab-demo` (produção). Redeploy: `cd Testes/holoslab && vercel deploy --prod`.
