# Ataque ao funil vazio — 12 a 26/ago/2026

**Escrito em 12/ago/2026 (noite).** Este doc não cria estratégia nova: ele transforma o
`04 - Marketing/plano-canais-e-medicao.md` (v2, 12/ago) e os KPIs v2 em movimentos com nome,
mensagem e dono. Janela: os 14 dias do teste de sinal (até 26/ago).

```
FRONTEIRA DOS DADOS · 2026-08-12 ~19h30 America/Sao_Paulo
✅ LIDO Supabase — pessoas (5, todas origem=indicacao), pipeline (5 cards),
   interacoes (2 registros, ambos Casa Paes), aprovacoes (7 registros)
✅ LIDO plano-canais-e-medicao.md v2, kpis-comercial-irbis.md v2,
   sistema-indicacao-base-irbis.md (09/ago), carteira-2026-08-12.md
```

**Estado que este plano ataca:** 2 leads ativos (Michele em levantamento, Arialdo em
proposta), ambos com toque vencido. Zero pessoa nova há 15 dias. Sétima semana sem reunião
fora de indicação. Indicação nunca foi disparada como processo. Base morna nunca foi
trabalhada.

---

## Camada 0 — o que destrava HOJE, sem produzir nada novo (Nicolas, ~30 min)

Três rascunhos prontos esperam decisão na tabela `aprovacoes` (os.irbis.com.br). Aprovar e
enviar já reativa os 2 únicos leads vivos do funil.

| Ordem | Rascunho | Situação |
|---|---|---|
| 1º | **A2 · Arialdo — aviso da página Adash** | O rascunho foi desenhado pra sair antes da call do Zapfy de 12/ago. Se a call já passou e ele não tocou no assunto, o aviso continua valendo: sai antes que ele descubra por fora. Corpo intacto |
| 2º | **A3 · Arialdo — breakup + pedido de indicação** | Só depois do A2. Atenção à pré-condição escrita no gatilho: breakup é uma vez só; se algum texto de 04 a 06/ago já foi enviado por fora do sistema, descarte |
| 3º | **A1-v2 · Michele — reancoragem + convite pra reunião de 1h** | Gravado hoje. Substitui o A1 de 11/ago, que prometia "25 minutos" e violava a reunião única de 1h decidida em 12/ago. Pede quinta ou sexta: é a única reunião possível desta semana |

**Higiene pendente dos aprovados de 08/ago** (os dois estão `aprovado` com `enviado_em`
nulo): o follow-up da Milene aconteceu (card foi pra nutrição em 11/ago com "não por agora"
registrado), mas o pedido de dados da Casa Paes não tem confirmação de envio nem resposta.
Se foi enviado, registrar em `interacoes`; se não foi, enviar. Sem esses dados a LP segue
com telefone de teste, e sem entrega fechada não existe pedido de indicação ao Matheus.

---

## Motor 1 — Indicação e comunidades (dono: Nicolas)

O único canal com histórico de conversão (5 de 5). Processo escrito em
`03 - Comercial/05 - Indicação/sistema-indicacao-base-irbis.md`, nunca disparado. As três
verticais de prospecção têm cada uma um hub natural na base:

| Vertical | Hub | Movimento |
|---|---|---|
| Indústria | Maurício (Odery) | Call de acompanhamento + pedido estruturado. É o único cliente cuja entrega já é o que a IRBIS vende hoje |
| Agência | Arialdo (QG Group) | O breakup A3 já embute o pedido de indicação. Aprovar a Camada 0 cobre esta vertical |
| Advocacia | Ana Cunha (A. Cunha) | Pedido de gatilho de rede, mas só depois do kickoff da MINUTA acontecer. Pedir indicação de projeto que não começou queima credibilidade |

### 1a. Odery — a primeira call de acompanhamento com coleta (esta semana)

Convite (WhatsApp, Nicolas envia):

> Maurício, queria marcar 30 minutos essa semana pra olhar como o CRM e o bot estão
> rodando aí na Odery e ajustar qualquer ponto fino. Quinta às 10h ou sexta às 14h?

Dentro da call, seguir o roteiro F4 do sistema de indicação (ajuste fino → indução à
satisfação → transição → gatilhos → registro). Duas correções ao ler o roteiro:
- Onde diz "founder indicando founder", falar **dono indicando dono**. O ICP é dono de
  negócio da economia real.
- Onde diz "registra no Notion", o registro é **`pessoas` + `interacoes` no Supabase**, no
  mesmo dia, com `indicado_por` preenchido.

Gatilho extra que vale ouro na Odery: fornecedores e clientes B2B da fábrica, e qualquer
grupo ou associação de indústria que o Maurício participe.

### 1b. Contato com indicado (em até 24h da indicação)

Versão atualizada do modelo (o doc de 09/ago ainda pedia "20 minutos"; a reunião é uma, de
1 hora):

> Oi [nome], o [cliente] me passou seu contato, falou que você tá [contexto do gatilho].
> Eu construo bot de IA e sistemas pra negócio da economia real. Topa uma reunião de 1
> hora pra eu entender sua operação? Você sai com o desenho e o valor do seu caso.
> Nicolas

### 1c. Ana Cunha — condicionado ao kickoff

Pré-requisito: kickoff da MINUTA acontecer (está com 6+ dias de atraso; é pendência de
entrega, não deste plano, mas trava este movimento). Depois dele, o pedido é gatilho de
rede, não case:

> Mãe, uma coisa de trabalho. Advogado que vive com cliente entrando pelo WhatsApp e
> triagem se perdendo na mão é exatamente o tipo de operação que eu resolvo agora. Você
> consegue pensar em 2 ou 3 colegas nessa situação? Eu chamo citando você.

(Pedido privado de indicação. Nomear A. Cunha em peça pública segue em aberto, não
confundir as duas coisas.)

### 1d. Comunidades (G4, LSB, JDP, call do Zapfy)

Regra do plano v2: presença e contribuição, não anúncio. Movimentos da janela:
- **Call semanal do Zapfy (quartas, Discord):** já é presença recorrente com Arialdo, Odery
  e Lucas Padovani. Nada a criar, só não faltar.
- **G4:** o canal já provou (MGITECH chegou em horas). Reconexão natural da janela: Bruno
  Máximo (Yamaho, conector multi-empresas). Um toque de relação, sem pitch. Se a conversa
  abrir, a porta é o bot.
- **1 contribuição útil por semana** em cada comunidade (responder dúvida de operação/IA
  de outro membro), registrada em `interacoes` quando virar conversa 1:1.

---

## Motor 2 — Social selling na base morna (dono: colaborador)

A base: **84 seguidores do @o.nicolascunha + quem engajou no vídeo de ~9 mil views**. Nunca
foi trabalhada. Sequência de 3 fases dentro da janela:

### 2a. Mapear (dias 1 e 2)

Planilha ou lista com: @ · nome · negócio (se identificável) · vertical (advocacia /
indústria / agência / outra) · sinal de dono de negócio (sim/não) · engajou em quê.
Meta do KPI v2: **100% da lista mapeada**. Filtro de qualificação, na ordem de força:

1. Já tentou resolver com ferramenta pronta e a ferramenta não conheceu a operação (o mais
   forte, é o vilão do P1 como critério).
2. Time pequeno com dono acessível (3 a 8 pessoas nos casos reais).
3. Trabalho repetitivo e documentável dependendo de WhatsApp/planilha/memória.

Quem não é dono de negócio (dev, designer, curioso de IA) fica na lista como "não abordar".

### 2b. Aquecer (dias 2 a 7)

Uma semana antes de qualquer DM: seguir de volta, reagir a story, comentar com substância
(sobre o negócio da pessoa, nunca sobre a IRBIS). Sem pitch, sem link, sem preço.

### 2c. Abordar (a partir do dia 8)

Ritmo da rotina SDR: **5 a 10 abordagens novas + 5 a 10 follow-ups por dia**, responder
100% de quem interagir. Primeiro toque: até 3 linhas, gargalo observável antes de qualquer
oferta, zero pitch, zero preço. Estrutura (adaptar o gancho ao que foi observado no
mapeamento):

> Vi que [observação específica do negócio dele, do perfil ou do engajamento].
> Como vocês seguram [atendimento / orçamento / pedido] hoje? Ainda alguém digitando no
> WhatsApp na mão?

Se a conversa abrir e a dor aparecer, a condução é pra **reunião única de 1 hora** (nunca
duas calls). Se perguntarem preço no chat, a faixa é pública: bot de IA a R$ 1.000 de setup
mais mensalidade entre R$ 500 e R$ 3.000, número fechado sai na reunião.

Follow-up: escada única D+0, D+3, D+7, D+14, breakup D+21
(`03 - Comercial/03 - Reunião de Vendas/escada-follow-up-irbis.md`). Degraus padrão saem
sem aprovação; a contrapartida inegociável é **toda conversa virar linha em `interacoes`
no mesmo dia, com origem preenchida**.

### ⚠️ Decisão pendente antes do primeiro DM (dono decide, não deduzir)

**De qual conta o colaborador aborda?** A base morna é do perfil pessoal do Nicolas; DM
saindo de conta desconhecida perde o calor da relação, e DM no perfil do Nicolas escrita
por outra pessoa precisa ser decisão explícita. Opções: (a) colaborador opera o
@o.nicolascunha com os rascunhos; (b) colaborador aborda de conta própria/IRBIS citando o
Nicolas. Mapear e aquecer (2a, 2b) não dependem dessa resposta; abordar (2c) depende.

---

## Medição da janela

- **Toda sexta:** conversas iniciadas com dono de negócio, por origem (`interacoes`).
  É a métrica que decide. Abordagens e taxa de resposta informam.
- **Teste de sinal (proposto, aguardando confirmação do dono):** 5 conversas reais com
  dono de negócio até 26/ago somando os dois motores. Se não der, o problema deixa de ser
  canal e vira oferta.
- Pessoa nova no banco com origem ≠ indicação: hoje zero há 15 dias. Qualquer valor > 0
  na janela já quebra a seca.

## O que este plano não faz

Hunter frio (só entra quando a lista morna esgotar), tráfego pago, conteúdo novo pro
Instagram (os 3 consertos do perfil são outra frente), e qualquer envio sem aprovação
explícita do Nicolas fora dos degraus padrão da escada.
