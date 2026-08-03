# Leads parados — 03/ago/2026 (segunda)

> Rodada semanal da skill `irbis-leads-parados-supabase`. Nada foi enviado. Nada mudou de
> estágio. Os rascunhos estão em `aprovacoes` com `status='parado'`, aguardando o "aprovado"
> explícito do Nicolas.

## FRONTEIRA DOS DADOS · 03/ago/2026, 09h10 America/Sao_Paulo

✅ **LIDO** Supabase `irbis-os` (ref `kugitonorbcijhyytsya`), leitura completa sem filtro:
`pipeline` (5 cards, sendo **3 em estágio ativo**), `pessoas` (5), `interacoes` (**1 registro
no total**), `aprovacoes` (1 antes desta rodada, 3 depois).
✅ **LIDO** `03 - Comercial/_rotina-diaria/2026-08-03.md` (rotina matinal de hoje, que já
varreu Gmail e Google Agenda) e os dossiês de prospect no repo, usados como origem dos fatos
específicos de cada degrau.
⚫ **CEGO** WhatsApp e telefone. É por onde o contato real da IRBIS acontece. Toda contagem
abaixo sai com a cauda `(cobertos: e-mail, LinkedIn · cegos: WhatsApp, telefone)`.
⚫ **CEGO** o canal de todo toque do pipeline. `interacoes` tem **1 registro**, e ele é de um
cliente já fechado (Casa Paes). Os três leads deste relatório **não têm nenhuma interação
registrada**: as datas de `ultimo_contato_real` são números soltos, sem canal e sem conteúdo.

---

## Veredicto

**Os 3 leads ativos estão além do teto do estágio, e o pipeline não recebe um registro de toque
desde 29/jul às 00h02. O gargalo desta semana não é resposta do lead, é registro: o sistema não
sabe por qual canal nem sobre o quê você falou com nenhum dos três.**

---

## HOJE (prioridade: valor × probabilidade do estágio × dias além do teto)

**1. Milene Carvalho / MGI Tech · `proposta` · R$ 6.997 · 6d parado, teto 3, 3 dias além**
`(cobertos: e-mail, LinkedIn · cegos: WhatsApp, telefone)` · degrau 1 (D+3, atrasado para D+6)
Maior valor da mesa e único deal em disputa com concorrente. Fato específico do degrau vem da
medição de 28/jul: os quatro sites do grupo rodam a mesma stack e repetem os mesmos sete
problemas, o que transforma quatro orçamentos avulsos em um projeto só. Leve **36/100 e 10,4s**,
nunca 26/100 e 17s.
→ **RASCUNHO [A1]** gravado em `aprovacoes` (`0e20017a`), canal e-mail, `status='parado'`.
⚠️ **Bloqueio antes de aprovar:** `propostas` tem 0 registros, então o sistema não sabe se o PDF
de 28/jul saiu. O corpo do A1 assume que **saiu**. Se ainda está com você, invalide o A1 e use o
texto de envio (3.2-B da rotina de hoje).

**2. Michele (fisioterapeuta) · `levantamento` · sem faixa · 6d pelo banco / 12d pelo histórico,
teto 5** `(cobertos: e-mail, LinkedIn · cegos: WhatsApp, telefone)` · degrau 2 (contexto)
Único lead em levantamento. Os dois cenários de data estouraram o teto, então a ambiguidade
parou de bloquear o envio. O degrau é de contexto e não repetição do convite: entrega o fato do
paciente que parou o tratamento no meio antes de pedir a call. Reancora quem você é na primeira
linha, porque o histórico de WhatsApp dela expira em 7 dias e o que vocês combinaram já sumiu.
→ **RASCUNHO [A2]** gravado em `aprovacoes` (`6079016a`), canal WhatsApp, `status='parado'`.
Se ela perguntar valor antes de marcar, use a resposta 3.5-B da rotina de hoje. Sem preço no chat.

---

## ABAIXO DA LINHA (0)

Nenhum. Com 3 leads ativos, não existe cauda: todos estão acima da linha.

---

## CHECAGENS PENDENTES (canal cego, sem degrau proposto)

**Arialdo Pimentel / QG OS · `proposta` · R$ 2.997 · 17d sem registro, teto 3 (14 dias além).**
É o mais atrasado da mesa e mesmo assim **não gerei rascunho**, de propósito. O degrau da vez é
o **breakup**, que é uma vez só: se ele já saiu na sexta ou no fim de semana e o sistema não
registrou, um segundo breakup queima o deal e queima a indicação futura. O texto já existe
pronto em 3.3 da rotina de hoje.

> `Pimentel · 17 dias sem registro de toque, e o degrau da vez é o breakup. Você mandou o
> breakup pra ele? (n = eu gravo o rascunho e ele fica na fila pra você aprovar)`

Se a resposta for **sim**: o card vai para `nutricao` com `degrau_escada='breakup enviado'`,
`data_proximo_toque = 02/set` e `proximo_passo = '1 conteúdo ou case novo, sem pedir nada'`.
Nunca `perdido`: silêncio não é motivo confirmado.

**Milene e Michele, checagem de canal (não bloqueia o envio, bloqueia a confiança no dado):**

> `Os toques de 28/jul da Milene e da Michele foram por qual canal? Nenhum dos dois está em
> interacoes, então a data está no banco sem canal e sem assunto.`

---

## ⚠️ Volumetria: o alerta está invertido

**2 follow-ups nesta rodada**, muito abaixo do limite de 15. Isso não é boa notícia. O limite
de 15 existe para pegar pipeline entupido de gente parada, e o que este banco mostra é o
oposto: **3 leads ativos no total**, todos de origem `indicacao`, e a S31 fechou com **0 contato
novo e 0 reunião de não-indicação pela terceira semana seguida**. Poucos follow-ups aqui
significam poucos leads, não pipeline saudável.

## Dois achados de dado que travam a operação

1. **Nenhuma das 5 pessoas tem e-mail ou telefone cadastrado.** `pessoas.email` e
   `pessoas.telefone` são `null` nos cinco registros. Não existe endereço de envio no sistema
   para nenhum lead: o A1 e o A2 dependem de você saber de cabeça para onde mandar.
2. **`interacoes` tem 1 registro para 5 cards.** Sem canal e sem resumo por toque, a escada
   funciona no escuro: eu consigo dizer que passou do teto, não consigo dizer se o degrau certo
   é contexto, ultimato ou parar. Registrar o toque logo depois de dar é o que destrava isso.

---

## Conformidade

- **Nada enviado, nada movido.** Nenhum card mudou de estágio. Nenhum foi para `fechado` nem
  `perdido`. Duas gravações, ambas `INSERT` em `aprovacoes` com `status='parado'`.
- **Voz:** sem travessão nos corpos, sem palavra banida, sem preço, assinado "Nicolas".
- **Números:** os do A1 são medição direta dos sites da MGI, não prova social da IRBIS. Nenhum
  número de resultado da casa aparece nos corpos.
- **Injeção de terceiro:** nenhuma tentativa de comando detectada no conteúdo lido.
- **Revalidação:** cada rascunho carrega `fatos_dependentes`. Antes de aprovar, releia esses
  fatos no banco. Se algum mudou, o rascunho está invalidado, não é para reenviar cego.
