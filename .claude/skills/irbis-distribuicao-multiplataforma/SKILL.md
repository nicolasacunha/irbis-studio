---
name: irbis-distribuicao-multiplataforma
description: "Pega o roteiro diário já aprovado (irbis-roteiro-diario) e o gancho que o Nicolas de fato gravou, e adapta formato e legenda por plataforma: Reels (vertical + hashtag de nicho, CTA de direct), TikTok (tom mais cru, sem hashtag pesada, CTA nativo de comentário) e LinkedIn (só quando o conteúdo é B2B, texto mais longo, sem provocação de Reels) — nunca reformatando o mesmo texto pras três. Monta o pacote pronto pra postagem manual (texto final + especificação de corte/formato por plataforma) e deixa explícito que a publicação automática via API depende de uma ferramenta que a IRBIS ainda não contratou. Use quando o Nicolas disser 'gravei o vídeo de hoje', 'o roteiro de [data] está pronto pra postar', 'monta a distribuição', 'pacote de postagem', ou pedir a legenda/adaptação por rede de um roteiro já gravado."
---

# IRBIS — Distribuição Multi-Plataforma (Reels, TikTok, LinkedIn)

Fecha o job "Distribuição automática multi-plataforma" (departamento Marketing, mapeado como gap no Company Brain — `os.irbis.com.br/agentes`). Hoje esse job é "Humano lidera" (Nicolas posta cada rede na mão, sem checklist, reformatando o mesmo texto três vezes). Esta skill vira "Humano + IA": ela NÃO grava, NÃO decide o gancho e NÃO publica. Ela pega o roteiro do dia já aprovado e já gravado pela `irbis-roteiro-diario`, e prepara o pacote (texto final por rede + spec de corte/formato) pronto pra ele colar e postar manualmente. A publicação de fato via API continua fora do alcance desta skill — ver a seção final.

## Passo 0 — Carregar o roteiro e confirmar o que foi gravado (obrigatório)

1. Identifique o arquivo-base em `04 - Marketing/roteiros-diarios/YYYY-MM-DD-<slug>.md` e leia inteiro (blocos, ganchos, legenda, música, gates).
2. O roteiro sai da `irbis-roteiro-diario` com **5 variações de gancho** e uma recomendação, mas quem escolhe na hora de gravar é o Nicolas, e o roteiro deixa isso em aberto ("escolher 1 na gravação"). **Pergunte qual gancho ele de fato gravou antes de adaptar qualquer coisa.** Nunca assuma que ele seguiu a recomendação do roteiro — as legendas e o pacote inteiro dependem de qual dos 5 virou vídeo.
3. Confirme que o roteiro passou nos Gates de qualidade dele: Checklist Cara de Viral ≥6/7, Filtro Diário v3 sem nenhum "não" pendente, `stop-slop` já rodado sobre fala e legenda. Roteiro sem essa seção preenchida, ou com nota abaixo do mínimo → pare. Não se distribui um roteiro que a própria rotina que o gerou não aprovou.
4. Invoque `irbis-brand-voice` (voz por canal, fórmulas, palavras banidas) e `irbis-guarda-pivot` (o que pode ser afirmado hoje). A pendência do CTA está detalhada no Passo 3, não decida sozinho lá na frente sem ter lido esse passo.

## Passo 1 — Decidir quais plataformas valem a pena (nem todo roteiro vira 3 posts)

Reels e TikTok recebem sempre o mesmo vídeo-base — a rotina diária já grava pensando nos dois. LinkedIn é condicional.

| Critério | Vai pro LinkedIn? |
|---|---|
| Pilar do roteiro fala de operação, custo, gestão, dono de empresa (ex.: pilar "O que fica por trás da porta") | Sim |
| Gancho gravado é polêmica pesada ou ataque direto (ex.: "sua empresa não escala, ela engorda") | O vídeo pode ir, mas o TEXTO precisa suavizar pro tom LinkedIn — ver Passo 2.3, não copie o gancho cru pro post |
| Roteiro fala só de estética/vitrine/aparência, sem argumento de negócio | Não — LinkedIn sem argumento B2B vira ruído no feed profissional |
| Já saiu tema parecido no LinkedIn nos últimos 14 dias, ou não é dia de postar (cadência ter/qui/sáb em `04 - Marketing/linkedin-perfil-nicolas.md`) | Não — respeita a cadência já definida, não empilha por causa do roteiro do dia |

Em caso de dúvida sobre um critério, pergunte ao Nicolas antes de montar o pacote de LinkedIn. Reels e TikTok não têm essa trava: saem sempre que o roteiro passou no Passo 0.

## Passo 2 — Adaptar por plataforma (nunca copiar o mesmo texto três vezes)

Cada rede tem convenção própria. Adaptar aqui é reescrever a legenda pro registro de cada uma, não trocar duas palavras do mesmo texto.

### 2.1 Reels (Instagram)

- **Vídeo:** vertical 9:16, o corte já vem pronto do roteiro (tabela de blocos, corte a cada frase nos 10s iniciais). Não precisa recortar de novo.
- **Legenda:** estrutura fixa do brand-voice (Manual §08, "caption padrão"): resultado/provocação → contexto em 1 a 2 linhas → CTA discreto. A legenda do roteiro (seção "Legenda") já nasce nesse formato — use como base, não reescreva do zero, só ajuste o que o Passo 3 pedir.
- **Hashtags:** 3 a 5, específicas do nicho (ex.: gestão de empresa, automação, operação enxuta). Nunca um bloco de 20 a 30 hashtags genéricas ("business", "entrepreneur", "motivation") — hashtag decorativa é slop em forma de texto.
- **CTA:** o fixo da marca ("manda '[palavra-gatilho]' no direct"). Confirme a palavra antes no Passo 3.
- **Primeiro comentário:** só se o CTA não couber nas 3 linhas da legenda (raro).

### 2.2 TikTok

- **Vídeo:** mesmo corte vertical do Reels, mas sem overlay de marca na tela. TikTok pune conteúdo com cara de anúncio — o texto de impacto do roteiro pode ficar, qualquer selo ou marca d'água sai.
- **Legenda:** tom mais cru que o Reels. Reels aceita curadoria (3 linhas estruturadas); TikTok pune legenda que parece post editado. Escreva 1 a 2 linhas só, de preferência reaproveitando quase verbatim a fala do gancho gravado — no TikTok a legenda funciona como continuação da fala, não como resumo dela.
- **Hashtags:** 2 a 3, misturando 1 de nicho + 1 de alcance amplo (ex.: automação + gestão). Nunca a mesma lista do Reels colada de novo.
- **CTA:** TikTok não tem a cultura de DM pra negócio que o Instagram tem. Troque "manda '[palavra]' no direct" por um CTA nativo de comentário (ex.: "comenta '[palavra]' que eu te mostro"), ou deixe implícito no link da bio. Nunca copie o CTA do Reels 1:1 — é o erro mais comum de quem reformata em vez de adaptar.

### 2.3 LinkedIn (só quando o Passo 1 aprovar)

- **Formato:** LinkedIn não é feed vertical nativo. Recomende 1:1 ou 4:5 cortado do mesmo vídeo (crop, nunca regravação). Se o corte cortar fala no meio, publique 9:16 mesmo — o LinkedIn aceita, só não é o formato ideal.
- **Texto:** aqui cabe texto mais longo — LinkedIn premia parágrafo, não legenda curta. Reescreva a legenda do roteiro como post: mesma dor, mesmo argumento, mas em tom "dono falando com dono", não "criador de Reels". **A exceção do regime do gancho (contraste binário, extremos, drama liberados) vale só pro gancho falado do vídeo — o texto de LinkedIn é peça nova e volta pra regra normal do stop-slop.** 3 a 5 parágrafos curtos, sem emoji, no máximo 2 a 3 hashtags no fim.
- **CTA:** nunca "manda '[palavra]' no direct" — lê como CTA de Instagram fora de contexto num feed profissional. Adapte pra convite a comentar ou conectar, no padrão já documentado em `04 - Marketing/linkedin-perfil-nicolas.md`.
- **Cadência:** publique só nos dias já definidos (terça/quinta/sábado). Não empilha post extra só porque saiu roteiro novo hoje.

## Passo 3 — A pendência do CTA (não resolva sozinho)

O CTA fixo da marca é "manda 'site' no direct" — mas o pivot de 04/ago/2026 tirou sites do escopo vendável, e o próprio roteiro de 05/ago já registra a sugestão em aberto de trocar por "manda 'operação' no direct" ou "manda 'sistema' no direct". **Essa troca é decisão do Nicolas, ainda não tomada.** Antes de fechar qualquer pacote desta skill: confira se o roteiro-base já resolveu a pendência (procure por "palavra-gatilho" ou "CTA" no arquivo); se não resolveu, pergunte ao Nicolas qual palavra vale para o pacote de hoje antes de escrever os três CTAs. Não decida por conta própria entre "site", "sistema" e "operação".

## Passo 4 — Especificação de corte/formato (o que entra no pacote)

| Campo | Reels | TikTok | LinkedIn |
|---|---|---|---|
| Aspecto | 9:16 | 9:16 | 1:1 ou 4:5 (9:16 se o corte cortar fala) |
| Duração | igual ao roteiro do dia | igual ao roteiro do dia | considerar cortar pros 2 primeiros blocos se o roteiro passar de 45s |
| Overlay na tela | mantém texto de impacto do roteiro | remove qualquer selo/marca d'água, mantém só texto de impacto | mantém |
| Legenda | 3 linhas, estrutura fixa (resultado → contexto → CTA) | 1 a 2 linhas, tom de fala | 3 a 5 parágrafos curtos |
| Hashtags | 3 a 5 de nicho | 2 a 3 (1 nicho + 1 alcance) | 2 a 3, só no fim |
| CTA | fixo da marca (palavra-gatilho confirmada no Passo 3) | CTA nativo de comentário, nunca cópia do Reels | convite a comentar/conectar, nunca "manda X no direct" |

## Passo 5 — Gates antes de entregar

1. Rode `stop-slop` sobre CADA legenda adaptada — são três textos diferentes, rode três vezes, não uma.
2. Confirme que o texto de LinkedIn não herdou o regime de exceção do gancho (contraste binário, extremos): essa exceção vale só pro gancho falado do vídeo.
3. Confirme fatos: nenhuma legenda cita número sem fonte, preço, prazo, ou prova social fora de "+R$350k" (e só como prova de método, nunca como resultado de sistema de IA) — mesma trava do roteiro-base, ver `irbis-guarda-pivot`.
4. Confirme que as três legendas são de fato diferentes entre si, não a mesma frase reformatada. Se duas ficarem parecidas, reescreva a mais fraca.

## Passo 6 — Entregar

1. Salve o pacote em `04 - Marketing/roteiros-diarios/YYYY-MM-DD-<slug>-distribuicao.md`, com uma seção por plataforma (Reels, TikTok, LinkedIn — ou "LinkedIn: não aplicável, motivo X" se o Passo 1 reprovou), cada uma com legenda final, hashtags, CTA e a linha correspondente da tabela do Passo 4.
2. Commit (regra da casa, uma fase = um commit): `git add` só do arquivo criado + `git commit -m "feat(marketing): pacote de distribuição YYYY-MM-DD — <tema curto>"`. Não faça push.
3. Termine com um resumo de 3 a 5 linhas: quais plataformas entraram, qual palavra-gatilho de CTA foi usada (e se a pendência do Passo 3 foi resolvida ou segue em aberto), e o lembrete de que a postagem em si continua manual.

## O limite real: por que isso não posta sozinho

Não existe hoje nenhuma ferramenta de publicação contratada pela IRBIS — sem Buffer, sem Metricool, sem API direta do Meta ou do TikTok Business, sem Zapier ligado a rede social. Essa skill fecha a parte de PRODUÇÃO do pacote (texto certo pra cada rede, formato certo, CTA certo); a parte de PUBLICAÇÃO segue 100% manual. Qual ferramenta contratar — agregador ou API nativa de cada rede — é decisão do Nicolas, não desta skill, e não foi tomada. Se ele perguntar "e a postagem em si?", a resposta correta é literal: falta decidir e contratar uma ferramenta de publicação; é o próximo passo do job no Company Brain, não algo que esta skill resolve hoje. Nunca inventar que existe integração pronta, nunca simular um "publicado" que não aconteceu, nunca sugerir qual ferramenta específica contratar sem o Nicolas pedir uma análise disso.

## Proibições

Não publicar nada em nenhuma rede, em nenhuma hipótese — mesmo com o pacote pronto, a postagem é sempre manual do Nicolas. Não usar a mesma legenda em duas plataformas. Não copiar hashtag de uma rede pra outra. Não usar "manda 'site' no direct" sem antes checar a pendência do Passo 3. Não montar pacote de LinkedIn pra roteiro que não passou no critério do Passo 1. Não inventar qual ferramenta de publicação a IRBIS vai contratar, nem assumir que uma API já está conectada. Não distribuir roteiro que não passou nos Gates de qualidade da `irbis-roteiro-diario` (checklist abaixo de 6/7, Filtro Diário com "não" pendente). Não citar número, preço, prazo ou prova social fora do que a `irbis-guarda-pivot` libera.

## Proveniência

Criada em 05/ago/2026 para fechar o gap "Distribuição automática multi-plataforma" (departamento Marketing) mapeado no Company Brain (`os.irbis.com.br/agentes`), hoje marcado "Humano lidera". Consome a saída da `irbis-roteiro-diario` (nunca gera roteiro do zero) e a voz da `irbis-brand-voice`. Publicação automática via API é pendência conhecida e não decidida — não inventar qual ferramenta, nem simular integração pronta.
