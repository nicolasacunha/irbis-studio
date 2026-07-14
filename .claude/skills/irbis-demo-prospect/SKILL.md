---
name: irbis-demo-prospect
description: Pipeline "demo antes do pitch" da IRBIS. Use quando o Nicolas trouxer um lead com necessidade publicada de site (post no LinkedIn/Reddit/X, vaga no Upwork, pedido em grupo) e quiser o protótipo pronto + mensagem de outreach. Trigger: /demo-prospect <link do post ou site do lead>.
---

# IRBIS — Demo Prospect (protótipo antes do pitch)

Transforma 1 lead qualificado em: dossiê verificado → protótipo no ar na Vercel → mensagens de outreach prontas para o Nicolas enviar. O envio é SEMPRE humano (Nicolas), nunca automatizado.

## Regra de ouro (auditoria jul/2026)

O gargalo histórico da IRBIS não é construir, é enviar. **Nenhuma demo nova começa enquanto existir demo pronta não enviada.** Primeiro passo obrigatório: perguntar ao Nicolas o status de envio das demos anteriores (pipeline vive no Notion "Grupo JDP <> IRBIS STUDIO", fora do repo). Se houver demo pronta sem outreach feito, o output desta skill é a mensagem de envio daquela demo, não um protótipo novo.

## Gate de qualificação (antes de gastar horas de build)

Só construir demo se TODOS:
1. **Intenção publicada** — o lead declarou publicamente que precisa de site novo/melhor (post, vaga, pedido). Data do post ≤ 30 dias.
2. **Decisor identificável** — nome + canal de contato direto (LinkedIn, e-mail, WhatsApp). Sem decisor = descartar.
3. **Capacidade de pagamento** — negócio ativo com receita aparente; corte SAM ≥ R$8k/projeto (Tier 3 = só como treino, decisão explícita do Nicolas).
4. **Escopo é site** — exclusivamente criação de site. App, branding, dashboard = fora.

Falhou em qualquer item → registrar o motivo e parar. Demo para lead ruim é o erro caro.

## Captação no LinkedIn (fonte de leads com intenção publicada)

Canal único de captação aprovado (decisão do Nicolas, 13/jul/2026): LinkedIn. Reddit descartado.

Prompt de busca completo (queries PT + EN, critérios obrigatórios, formato de saída): `03 - Comercial/01 - Prospecção/prompt-captacao-leads-site.md`.

Como buscar (em ordem de preferência):
1. **Busca de posts no LinkedIn logado** — via claude-in-chrome (Chrome real do Nicolas, sessão logada) ou manualmente por ele. Buscar em "Publicações", filtro "Última semana", com queries de intenção:
   - PT: `"preciso de um site"`, `"indicação de alguém que faça sites"`, `"quem faz site"`, `"refazer meu site"`, `"indicação web designer"`
   - EN: `"looking for a web designer"`, `"need a new website"`, `"website recommendations"`, `"redesign our website"`
2. **PhantomBuster** (LinkedIn Search Export / Activity Extractor) para exportar resultados em CSV — já é ferramenta da casa.
3. ChatGPT/busca web só como complemento (não enxerga posts atrás do login do LinkedIn).

Ritmo e segurança da conta:
- **Uma empresa por dia** (regra de ouro do outbound LinkedIn, fixa). O custo de 2–4h/demo já limita a isso naturalmente.
- Varredura em ritmo humano: nada de scraping agressivo na conta principal — risco de restrição do LinkedIn. Poucas buscas por dia, coleta manual ou Phantom com limite baixo.
- Post com ≤30 dias; ideal ≤7 (quem pediu ontem ainda está procurando; quem pediu há 1 mês provavelmente já contratou).

Cada candidato encontrado entra no Gate de qualificação abaixo antes de virar demo.

## Pipeline (por lead aprovado)

### 1. Dossiê (15 min, automatizável)
Pesquisar (Firecrawl/Tavily/browser): site atual, o post com a necessidade, Instagram/LinkedIn, GMB se local. Marcar cada fato `[Confirmado]` / `[Provável]` / `[Não verificado]`. Saída em `03 - Comercial/01 - Prospecção/demos/<slug>/dossie.md`:
- Quem decide, canal de contato
- A dor NAS PALAVRAS DELE (citação do post)
- 1 gargalo em dinheiro (ex.: sem agendamento online, mobile quebrado, checkout confuso)
- Fatos verificados da marca (cores, fotos, claims REAIS — nunca inventar números, depoimentos ou resultados do cliente)

### 2. Protótipo (2–4h, Claude Code)
- Código em `Testes/<slug>/`, deploy em `<slug>.vercel.app`.
- Escopo mínimo que prova o ponto: home + 1–2 páginas que atacam o gargalo do dossiê. Não é o site completo — a demo vende a reunião, não substitui o projeto.
- Fidelidade à marca do lead primeiro (extrair identidade real do site/IG atual), regras Anti-AI-Slop do CLAUDE.md global depois. Rodar `/impeccable` antes de declarar pronto.
- Zero claims inventados sobre o negócio do lead. Dúvida factual = usar placeholder neutro e listar em "pendências a confirmar" no dossiê.
- Se o lead pediu explicitamente trabalho sem IA: transparência obrigatória na mensagem (precedente Nathalia/Vento Manso — apresentar como assistido por IA).

### 3. Mensagens (o Nicolas envia)
Gerar as DUAS variantes em `03 - Comercial/01 - Prospecção/demos/<slug>/outreach.md`, aplicando `irbis-brand-voice` (sem travessão, assina "Nicolas", palavras banidas):
- **DM LinkedIn/WhatsApp** (canal preferido, decisão de 01/jul/2026): conexão ≤300 chars citando o post dele; depois DM curta.
- **E-mail** (fallback p/ leads internacionais/Upwork): 50–100 palavras, texto puro.

**No LinkedIn, e-mail e DM são formatos diferentes — nunca colar o corpo do e-mail na DM.** Fluxo obrigatório em 2 passos:
1. **Pedido de conexão** (D+0, ≤300 caracteres): cita o post dele, sem link e sem pitch. Ex.: "Oi [Nome], vi seu post procurando alguém pra [refazer o site]. Trabalho só com isso e tive uma ideia pro caso de vocês. Bora conectar?"
2. **DM principal** (até 24h após aceitar, 3–5 linhas no máximo): aí sim entra o link da demo e a CTA de reunião. Sem conexão aceita, a mensagem morre em "Solicitações".

Estrutura fixa da mensagem principal (PAS comprimido):
1. Primeira linha cita O POST dele (prova que não é massa).
2. "Em vez de te mandar portfólio, montei uma primeira versão pra você ver funcionando: <link>". Enquadrar como estudo/versão inicial, nunca "seu site está pronto" (soa presunçoso e mata a reunião).
3. CTA = reunião, nunca preço: "Se fizer sentido, te mostro o resto em 15 minutos. Terça 10h ou quarta 15h?"

Regras JDP invioláveis: preço NUNCA na primeira mensagem; objetivo único = reunião; demo não é proposta (proposta solta é proibida); prova social permitida apenas "+R$350k" (E-Force) — "1,8x" e "+500" são banidos.

Follow-up: D+4 (um dado útil, sem "só passando pra ver") e breakup D+10. Resposta do lead interrompe a cadência.

### 4. Registro
- Notion (pipeline JDP): estágio + origem "Demo outbound" + próximo contato. Sem acesso ao Notion na sessão: entregar ao Nicolas a linha pronta para colar.
- Commit no repo ao fim de cada fase (dossiê, protótipo, outreach).

## Métricas (para validar antes de escalar)
Registrar por leva: demos enviadas → respostas → reuniões → fechamentos. Referência: cold email genérico agenda 0,5–2%; este formato (intenção publicada + demo) precisa performar MUITO acima disso para pagar as ~3h/lead. Se após 10 envios a taxa de resposta for < 20%, o problema é copy ou qualificação — parar e revisar antes da leva seguinte.

## O que NUNCA automatizar
- Envio de mensagens (deliverability, ban de conta, e regra JDP: hunter conduz).
- Qualificação final do lead (gate do Nicolas).
- Preço em qualquer mensagem escrita.
