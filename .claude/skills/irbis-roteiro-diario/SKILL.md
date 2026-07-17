---
name: irbis-roteiro-diario
description: "Rotina noturna (3h) que gera o roteiro de 1 vídeo curto (Instagram Reels + TikTok) pro perfil pessoal do Nicolas, seguindo à risca as regras da P2 do JDP e o posicionamento P1 v2. Gera rascunho pra aprovação, nunca publica. Use quando disparado pela rotina agendada ou quando o Nicolas pedir um roteiro do dia manualmente."
---

# IRBIS — Roteiro Diário de Vídeo Curto (P2)

Você vai produzir **1 roteiro completo de vídeo curto** (30-60s, formato Reels/TikTok) pro perfil pessoal do Nicolas (@nicolasccunha), pronto pra ele gravar de manhã. É RASCUNHO: você nunca publica nada, nunca manda DM, nunca posta. O deliverable é um arquivo commitado no repo.

Regras fixas do JDP (não adaptáveis): estruturas PAS / ADP / Loop Aberto; Checklist Cara de Viral com nota mínima 6/7, sem autoengano; sem travessão em texto novo.

## Passo 0 — Carregar contexto (obrigatório, nesta ordem)

1. Invoque a skill `irbis-guarda-pivot` (fatos afirmáveis) e a `irbis-brand-voice` (voz, camada P1).
2. Leia `04 - Marketing/P1-posicionamento-nicolas.md` — tese v2 (commodity x critério, água x diamante), vilão de duas caras, Filtro Diário v2, pilares, ICP = **empresas da economia real** (decisão de 15/jul/2026).
3. Leia `04 - Marketing/garimpo-concorrencia-p2.md` — lista final de modelagem (jorgedaweb, webhubeducacao, _gustavocampelo, adalalibera, canalsegredosdodigital) e o diagnóstico: no nicho, **quem ensina cresce; portfólio estático não**.
4. Leia `04 - Marketing/roteiros-diarios/_indice.md` (se não existir, crie com cabeçalho de tabela: data | pilar | tema | estrutura). Ele evita repetição e controla o rodízio.

Fatos duros que valem sempre: prova social só "+R$350k em vendas" (E-Force); "3 semanas" só amarrado ao case E-Force; NUNCA citar preço nem prazo médio; NUNCA "+500", "1,8x", Adash ou Eduboxs; CTA único: manda "site" no direct.

## Passo 1 — Escolher pilar e tema (rodízio)

1. Pilares da P1 v2: **IA do jeito certo** (ataca o site-commodity) · **Site que vende** (prova com +R$350k e dados de dor com fonte) · **O terceiro caminho** (ataca a agência que cobra diamante por água).
2. Olhe o `_indice.md` e escolha o pilar menos usado recentemente (rodízio simples).
3. O tema precisa caber no pilar e falar com dono de empresa da economia real, não com designer.

## Passo 2 — Referências do dia

1. **Perguntas reais**: busque o tema no Google e colete a seção "As pessoas também perguntam" (plano B oficial do AlsoAsked, custo zero; use WebSearch ou o navegador). Anote 5-8 perguntas e escolha a com **dor ou medo explícito** ("por que meu site não vende?", "site feito com IA presta?"), nunca a informativa neutra ("o que é...").
2. **Sinal do nicho** (melhor esforço, não bloqueia): confira posts novos dos perfis da lista de modelagem em `https://app.notjustanalytics.com/analysis/<handle>` — anote ganchos/temas que performaram pra modelar a embalagem. Se não der, siga sem.
3. Todo dado numérico citado no roteiro precisa de fonte real (os liberados: 53% abandonam >3s, Google 2016; 75% julgam credibilidade pelo design, Stanford 2002; 50ms primeira impressão, Carleton 2006). Sem fonte = não cita.

## Passo 3 — Escrever o roteiro

1. Escolha a estrutura que melhor serve o argumento: **PAS** (dor nomeada com precisão → agitação → solução), **ADP** (antes com números → depois concreto → ponte) ou **Loop Aberto** (promessa nos 3s → tensão em partes → fechamento + CTA).
2. Formato do roteiro: tabela de blocos com tempo (0-3s gancho, desenvolvimento, UMA virada no meio, CTA), fala completa, texto na tela, direção de corte (corte a cada frase nos primeiros 10s; 1º frame = rosto com emoção ou texto de impacto, nunca logo).
3. **Ganchos: gere 5 variações em estilos DIFERENTES** (decisão do Nicolas de 16/jul: ele escolhe na produção): (a) polêmica assumida, (b) inimigo nomeado, (c) curiosidade/loop, (d) primeira pessoa com pele em jogo ("eu faço site com IA e tô te dizendo..."), (e) medo/status ("seu cliente percebeu antes de você"). Cada uma falável em 3s, com número, pergunta ou afirmação polêmica.
   **⚠️ REGIME DO GANCHO (decisão do Nicolas, 17/jul/2026): o gancho é EXCEÇÃO às regras anti-slop de prosa.** No gancho (e só nele) são permitidos e desejados: contraste binário, extremos ("todo mundo", "ninguém"), drama, frase de efeito quotable. Gancho asséptico é gancho morto. O que permanece inegociável mesmo no gancho: número estatístico só com fonte real (número retórico de estrutura como "3 sinais" ou "5 segundos" é livre), prova social só +R$350k, sem preço/prazo, sem travessão no texto escrito, e o Filtro Diário v2.
4. Legenda pronta (3 linhas: provocação/resultado · contexto · CTA discreto) e instrução de música (faixa de 10 mil a 500 mil usos; emoção: dinâmica pra dica, storytelling pra case).
5. CTA único e específico. Nunca "curte, salva e compartilha".

## Passo 4 — Gates de qualidade (bloqueiam a entrega)

1. **Checklist Cara de Viral (7 itens da P2)** — pontue com honestidade; mínimo 6/7 com a melhor variação de gancho. Nota <6: refaça o roteiro, sem exceção.
2. **Filtro Diário v2** (as 3 perguntas com tese e vilão v2). Qualquer "não": reescreva e rode as 3 de novo.
3. **Voz**: rode a skill `stop-slop` sobre fala e legenda. Zero travessão, zero palavras banidas do brand-voice, zero contraste "não é X, é Y" em texto novo.
4. **Fatos**: releia o Passo 0. Número sem fonte ou banido = corta.
5. **Repetição**: tema não pode bater com nenhuma entrada dos últimos 14 dias no `_indice.md`.

Se falhar 2 vezes seguidas nos gates, aborte a edição do dia e registre o motivo no arquivo de saída em vez do roteiro.

## Passo 5 — Imagens (só se o roteiro pedir edição)

1. Se o roteiro precisar de recurso visual além do rosto falando (card de texto, mockup de site, b-roll estático, thumb), gere as imagens com o MCP do Higgsfield (`generate_image`; carregue via ToolSearch se preciso). Estética: identidade IRBIS (fundo #0C0C0E, acento #FF3D00 escasso, tipografia Sora), sem slop visual (nada de gradiente roxo/neon, nada de glassmorphism).
2. Salve em `04 - Marketing/roteiros-diarios/assets/YYYY-MM-DD/` com nome descritivo.
3. **Se o Higgsfield estiver indisponível ou pedindo autenticação** (comum em execução headless): NÃO trave. Escreva os prompts prontos das imagens numa seção "Imagens pendentes" do arquivo e siga.

## Passo 6 — Entregar

1. Salve o roteiro em `04 - Marketing/roteiros-diarios/YYYY-MM-DD-<slug>.md` com: pilar, tema, pergunta real usada (e de onde veio), estrutura, tabela de blocos, 3 ganchos, legenda, música, nota do checklist (item a item), filtro v2, e imagens (ou prompts pendentes).
2. Atualize o `_indice.md` com a linha do dia.
3. Commit (regra da casa, uma fase = um commit): `git add` só dos arquivos criados + `git commit -m "feat(marketing): roteiro diário YYYY-MM-DD — <tema curto>"`. **Não faça push nem deploy.**
4. Termine com um resumo de 3-5 linhas: tema, estrutura, nota do checklist, se gerou imagens ou deixou prompts, e o que o Nicolas precisa decidir (qual gancho).

## Proveniência

Criada em 17/jul/2026 a pedido do Nicolas ("roteiro toda noite às 3h, referências do dia, textos, imagens via Higgsfield, seguindo à risca a P2"). Fontes: P2 do JDP (`~/Projects/Pessoal/JDP/P2_Roteiros_Conteudo_e_Inteligencia_Criativa_v3.docx`), P1 v2 e garimpo no repo. Se a tese, o ICP ou a lista de modelagem mudarem no repo, o repo vence esta skill.
