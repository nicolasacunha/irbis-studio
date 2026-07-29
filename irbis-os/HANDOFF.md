# Sistema OS da IRBIS — Handoff (28/jul/2026)

Construído em uma sessão, Fases 0 a 6, ignorando o gate de "fase anterior fechada com teste de
aceite passando" a pedido explícito do Nicolas. Isso significa: **o código e as skills
existem, mas nenhum teste de aceite formal rodou ainda** (a maioria pede uso real ao longo de
dias/semanas, que não dá pra simular numa sessão).

## O que está construído e funcional hoje

**Banco (Fase 0):** projeto Supabase `irbis-os` (`kugitonorbcijhyytsya`, São Paulo), 8 tabelas
+ 1 coluna extra (`projetos.ultimo_toque_valor`, Fase 4), acesso via REST documentado em
`irbis-os/CONEXAO-SUPABASE.md`. **Tabelas vazias** — migração do Notion ("🎯 CRM IRBIS")
pendente.

**Skills novas** (`.claude/skills/`): `irbis-leads-parados-supabase`, `irbis-novo-lead`,
`irbis-dossie`, `irbis-vigia-reunioes`, `irbis-pos-reuniao`, `irbis-projeto`,
`irbis-carteira`, `irbis-nova-proposta`, `irbis-conciliacao-financeira`, `irbis-cobrar`,
`irbis-biblioteca`, `irbis-fechar-semana`.

**Rotinas agendadas novas:** `irbis-leads-parados-segunda` (9h08 seg), `irbis-vigia-carteira`
(8h12 diário), `irbis-conciliacao-financeira-sexta` (16h05 sex).

**Rotinas existentes estendidas** (não recriadas, editadas): `irbis-auditoria-sites-clientes`
(agora alimenta `aprovacoes` de verdade) e `irbis-revisao-comercial-sexta` (agora roda
`irbis-fechar-semana` sobre o Supabase).

**Kit de onboarding** (`03 - Comercial/07 - Biblioteca/kit-onboarding/`): 4 peças v1.0 — a
lacuna que o blueprint original nomeou explicitamente.

**Open Finance:** conectado de verdade (Inter, conta PF operacional — a IRBIS não tem CNPJ,
ver `irbis-os/CONEXAO-OPENFINANCE.md`). Um segundo conector (`dfabea12-...`) bateu o limite do
teste grátis; Nicolas confirmou (28/jul) que não precisa dele — só o Inter já cobre a
conciliação. Esse conector fica ignorado, sem assinatura.

**Painel web (Fase 3, construído em 28/jul depois de aprovação explícita "vercel vc consegue
fazer q eu sei"):** Next.js 16 + Supabase Auth (magic link), deployado em produção na Vercel:
**https://irbis-os-painel.vercel.app**. Código em `irbis-os/painel/`. Login travado por dois
mecanismos: usuário pré-criado no Supabase Auth só pra `nicolas.cunhan@aluno.lsb.com.br`, e o
`proxy.ts` (middleware) desloga na hora qualquer sessão com e-mail diferente. As 6 telas
(Aprovações, Pipeline, Semana, Travas, Financeiro, Carteira) leem o Supabase real — vão
aparecer vazias até a migração do CRM. Aprovações lê/escreve na tabela `aprovacoes` de
verdade (aprovar/editar/descartar já funciona). Testado ponta a ponta: login por magic link
mandou o e-mail de verdade pra sua caixa de entrada.

**Discord:** removido do escopo a pedido do Nicolas (28/jul) — nem os 5 webhooks da Fase 0
nem o bot com threads da Fase 3 vão ser construídos. O painel web passa a ser a superfície
principal de aprovação.

**Trello (Fase 3):** Nicolas confirmou que quer o espelho construído, mas não passei ainda
por credenciais — sem board/API key do Trello eu não tenho como começar. Fica como próximo
passo assim que ele mandar.

## O que ficou pendente, e o que cada pendência trava

| Pendência | Trava | Quem resolve |
|---|---|---|
| Migrar CRM IRBIS (Notion) → Supabase | todo o sistema (painel incluso) opera sobre banco vazio até isso acontecer | Nicolas decide quando |
| Conectar Google Calendar nesta sessão do Claude | `irbis-vigia-reunioes` inteira (dossiê T-24h, confirmação, reminder) | Nicolas, via configurações de conector |
| Credenciais do Trello (board + API key) | espelho do Trello (Fase 3) não pode começar sem isso | Nicolas manda |
| Domínio próprio pro painel (opcional) | hoje é `irbis-os-painel.vercel.app`, funcional mas genérico | Nicolas decide se quer domínio custom |

## Rotina de manutenção (spec pediu, ainda não agendada)

A Fase 6 pede um `health-check-semanal` cobrindo especificamente as conexões deste sistema
(Supabase, Gmail, Calendar quando conectar, Open Finance). Já existe um `health-check-semanal`
rodando (segunda 7h04) de antes desta sessão, cobrindo Vercel/expert-brain/backup — **ainda
não inclui as conexões novas desta sessão**. Ajustar isso é a próxima coisa pequena e barata a
fazer, quando o Nicolas quiser.

Revisão de rascunhos recusados (mensal), atualização de templates por post-mortem (mensal, já
coberta por `irbis-biblioteca` quando invocada), ajuste dos tetos de estágio com dado real
(trimestral) e call de evolução (mensal): nenhuma dessas está agendada — são decisões de
cadência, não código, e ficam para quando houver dado real de uso.
