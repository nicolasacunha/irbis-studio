---
name: irbis-precall
description: 'Use para preparar uma reunião JÁ MARCADA da IRBIS: auditoria pré-call, dossiê de preparação de videochamada, "vou ter call com X amanhã", transformar respostas do formulário /call em diagnóstico, levantar concorrência do lead antes da reunião, montar munição de SPIN e rapport de dever de casa. Produz o artefato "auditoria pré-call" que `irbis-call-de-vendas` consome (rapport, prova ao vivo na objeção 1) e que o formulário de escopo promete ao lead.'
---

# IRBIS — Auditoria Pré-Call (entre o agendamento e a videochamada)

Preenche o vão entre `irbis-prospeccao-e-diagnostico` (que **gera** a reunião) e `irbis-call-de-vendas` (que **conduz** a reunião). Entrada: uma reunião marcada. Saída: um arquivo de auditoria que o Nicolas lê nos 10 minutos antes de entrar na call.

Paths relativos à raiz `Business/irbis/`, têm espaços — sempre use aspas.

## Quando NÃO usar esta skill

| Tarefa | Skill certa |
|---|---|
| Gerar a reunião (cold call, DM, dossiê de prospect antes do 1º contato) | `irbis-prospeccao-e-diagnostico` |
| Conduzir a videochamada, preço ao vivo, objeções, fechamento | `irbis-call-de-vendas` |
| Pós-fechamento: briefing, entrega, repitch, indicação | `irbis-entrega-e-recorrencia` |
| Decidir o que é canônico vs pré-pivot; vocabulário proibido | `irbis-guarda-pivot` |
| Escrever copy externa com a voz da marca | `irbis-brand-voice` |

A diferença de momento importa: o dossiê de prospecção existe para **conseguir** a atenção do lead; a auditoria pré-call existe para **não desperdiçar** a atenção que ele já deu.

## Regras herdadas (não afrouxar)

1. **Marque todo fato** com `[Confirmado]` / `[Provável]` / `[Não verificado]`. Nada entra sem etiqueta.
2. **Nunca invente número.** Prova social permitida e banida está na tabela de `irbis-call-de-vendas` e `irbis-prospeccao-e-diagnostico` — "+R$350k E-Force" é o único número de resultado afirmável; "+500" e "LTV 1,8x" são BANIDOS.
3. **Nenhuma estimativa de perda em reais** ("você perde R$X/mês") sem base medida. Dor se sustenta em dado observado no site do lead + dado de fonte pública verificada (`dados-custo-site-ruim.md`).
4. **Sem preço na auditoria.** Preço nasce na call, ancorado, conforme regras JDP.
5. Se a auditoria não achar nada real, **diga isso** em vez de encher linguiça. Rapport de dever de casa sem observação real é pior que nenhum: `irbis-call-de-vendas` manda ir direto ao pacto.

## Entradas

Colete o que existir, nesta ordem de prioridade:

1. **Respostas do formulário de escopo** (`/call`) — é o insumo mais rico e o lead já esperou que fosse usado. Copy do formulário em `03 - Comercial/02 - Qualificação e Agendamento/formulario-escopo-precall-copy.md`.
2. **Notas da call de diagnóstico** (se houve) — o roteiro manda anotar tudo; a seção ESPELHO já contém a dor no vocabulário do lead.
3. **Domínio do site**, @ do Instagram, telefone, cidade.
4. **Estágio e origem** no pipeline do Notion (pergunte ao dono; trackers do repo não valem como status).

Sem site e sem formulário respondido: faça a versão curta (seções 1, 2, 6, 7) e sinalize o que faltou.

## Procedimento

### 1. Negócio em 5 linhas
O que vende, para quem, como cobra, praça, há quanto tempo. Fontes: site, GMB, Instagram, Receita/CNPJ quando público. Objetivo: o Nicolas conseguir descrever o negócio do lead sem ler nada na hora da call.

### 2. Como o cliente encontra ele hoje
Canais ativos e o estado de cada um: site (existe? atualizado?), GMB (nota + nº de avaliações), Instagram (frequência, última postagem), **anúncios ativos na Biblioteca de Anúncios do Meta**, blog, e presença de GTM/pixel/Analytics no site.

A biblioteca de anúncios é a fonte mais subutilizada: se ele anuncia, está gastando dinheiro para levar tráfego a um site que você vai auditar — isso muda completamente o peso da conversa. Se não anuncia, o gargalo é outro. Marque qual dos dois.

### 3. Auditoria da porta (site) — só se houver site
Mesma profundidade dos dossiês existentes (referência boa: `03 - Comercial/01 - Prospecção/dossie-mgitech-14jul2026.md`):

- **Performance:** Lighthouse mobile e desktop (score, LCP, FCP, TBT, CLS); TTFB real por `curl` em 3–4 amostras; compressão; peso e nº de requests.
- **Conversão/CRO:** o caminho do botão principal até o contato. Página de contato tem telefone/WhatsApp? CTA muda entre slides? Cases têm nome e número ou são anônimos? Formulário funciona?
- **SEO técnico:** H1, title, meta description, Open Graph (o link dele no WhatsApp aparece sem imagem?), sitemap, canonical, headers de segurança, imagens sem WebP/alt.
- **Visual/UX:** abra no browser em 1440px e em mobile. Quebras de menu, sobreposições, fotos cortadas, links mortos.

Cada achado precisa ser **mostrável ao vivo na call** — é isso que `irbis-call-de-vendas` usa na objeção "preciso pensar" (compartilhar tela e apontar 2–3 problemas reais).

### 4. Sinais de operação manual (perna de IA)
⚠️ **Só produza esta seção se o dono confirmar que a call inclui a frente de IA.** A skill de prospecção ainda diz "IRBIS faz exclusivamente sites"; a visão de 21/jul descreve o pivot sites + IA. Em conflito, `irbis-guarda-pivot` decide — pergunte antes, não presuma.

Sinais observáveis de fora, sem entrevistar o lead:
- WhatsApp como canal único de atendimento (link direto na home, sem formulário nem agenda)
- Agendamento por "chame no WhatsApp" em vez de agenda online
- Formulário que claramente só dispara e-mail (sem CRM detectável)
- FAQ longo respondendo a mesma pergunta que o atendimento responde no chat
- Catálogo/tabela de preços em PDF ou imagem, atualizado à mão
- Blog parado + redes ativas (produção de conteúdo sem processo)
- Equipe pequena visível + volume de avaliações alto no GMB (sinal de operação apertada)

Cada sinal vira uma pergunta na call, **nunca uma afirmação**: "vi que o contato de vocês é todo por WhatsApp — quem responde isso no dia a dia?"

### 5. Concorrência (3 nomes)
Escolha 3 concorrentes diretos da praça dele e compare em uma tabela curta: site (existe/qualidade), anúncios ativos, GMB (nota e volume), posicionamento declarado.

Do workshop de agência: **não existe nada que mexa mais com um dono de negócio do que o concorrente dele.** Um "o [concorrente] está anunciando desde março e o site dele carrega em 2s; o seu leva 9s" faz na call o que nenhum argumento sobre performance faz sozinho. Use com fato, nunca com adjetivo.

### 6. Munição para a call
Esta é a seção que o Nicolas realmente lê antes de entrar. Produza:

- **Rapport de dever de casa** — uma linha, factual, específica, nunca social. Sem achado real, escreva "sem observação real — ir direto ao pacto".
- **3 achados em linguagem leiga** — o que um dono de negócio entende sem saber o que é LCP.
- **Hipótese de ESPELHO** — a frase de devolução no vocabulário do lead, no formato do roteiro de diagnóstico ("hoje seu cliente te acha por X, mas quando chega em Y ele não Z"). É hipótese, para ser confirmada na call, não afirmada.
- **5 perguntas de anamnese do segmento** — perguntas que só quem conhece o mercado dele faria. Imobiliária: alto/médio padrão, faixa de VGV, carteira concentrada em qual praça, mais investidor ou moradia. Advocacia: área, volume vs. contencioso, como chega o cliente hoje. Clínica: procedimento âncora, ticket, ocupação da agenda. **Elas valem mais pelo que provam do que pelo que perguntam** — nivelam o Nicolas como especialista nos primeiros minutos.
- **2–3 problemas mostráveis ao vivo** com onde clicar para mostrar cada um.

### 7. Riscos e red flags
Franquia/rede (decisão centralizada), já tem agência com site premium pelos 3 critérios da skill de prospecção, decisor não mapeado, sócio ausente da reunião, sinais de fora do SAM (≥R$8k). Sócio não mapeado é o mais caro: `irbis-call-de-vendas` lista "preciso falar com sócio" como objeção causada por falha no agendamento.

### 8. O que não foi possível verificar
Lista explícita. Instagram atrás de login wall, dado de ticket ausente, decisor sem nome. Serve para o Nicolas saber o que perguntar e para ninguém tratar lacuna como fato.

## Saída

Arquivo em `03 - Comercial/01 - Prospecção/` seguindo a convenção existente: `precall-<lead>-<DDmmmAAAA>.md`.

Ordem das seções no arquivo: **6 primeiro** (munição), depois 1–5 e 7–8. O Nicolas abre esse arquivo 10 minutos antes da call — o que ele precisa ler primeiro tem que estar no topo, não no fim.

Cabeçalho obrigatório: nome do lead, data e hora da call, origem, decisor `[etiquetado]`, e a data em que a auditoria foi medida (medições envelhecem; um site pode mudar entre a auditoria e a call).

## Time-box

Auditoria completa: ~40 min. Se a call for em menos de 1h, faça a **versão curta** — seções 2, 3 (só performance e o caminho até o contato), 6 e 8 — em ~15 min. Melhor uma auditoria curta e verdadeira que uma completa e chutada.

## Depois da call

Anexe ao mesmo arquivo o que se confirmou e o que caiu por terra. Duas linhas bastam. É o que faz a próxima auditoria do mesmo segmento nascer melhor — e é o insumo de qualquer avaliação futura das calls.

## Proveniência

Método de auditoria: dossiês reais da casa (`dossie-mgitech-14jul2026.md`, `dossie-sbie-14jul2026.md`, `dossie-yamaho-15jul2026.md`).
Anamnese nichada, uso da concorrência e biblioteca de anúncios como munição: `~/Projects/Conhecimento/vendas/fontes/workshop-agencia-com-ia-processo-comercial.md` (Skale, jul/2026).
Regras de etiqueta de fato, prova social e preço: herdadas de `irbis-prospeccao-e-diagnostico` e `irbis-call-de-vendas`.
