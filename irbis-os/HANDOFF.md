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
**https://os.irbis.com.br** (domínio próprio, projeto `irbis-os-painel` na Vercel — mesma
conta/domínio do irbis.com.br, projeto separado do site estático; URL antiga
`irbis-os-painel.vercel.app` continua funcionando). Código em `irbis-os/painel/`. Login
travado por dois mecanismos: usuário pré-criado no Supabase Auth só pra
`nicolas.cunhan@aluno.lsb.com.br`, e o `proxy.ts` (middleware) desloga na hora qualquer
sessão com e-mail diferente. 7 telas: Aprovações, Pipeline, **Projetos (Kanban nativo)**,
Semana, Travas, Financeiro, Carteira — todas lendo o Supabase real com os 5 leads migrados.
Aprovações lê/escreve em `aprovacoes` de verdade. Testado ponta a ponta, inclusive
`/pos-reuniao` com lead fake (criado e apagado na mesma sessão).

**Redesign do painel em andamento (29/jul):** aplicando a identidade real da IRBIS (modo
Papel, Besley+Archivo, vocabulário de cartão do site) — spec em
`docs/superpowers/specs/2026-07-28-painel-sistema-os-redesign-design.md`. Implementação tela
por tela, com aprovação no navegador a cada uma.

**Discord:** removido do escopo a pedido do Nicolas (28/jul) — nem os 5 webhooks da Fase 0
nem o bot com threads da Fase 3 vão ser construídos.

**Trello:** substituído por completo pelo board Kanban nativo em `/projetos` — Nicolas não
quis link externo ("quero as mesmas funcionalidades do trello mas no meu OS"). Sem segunda
fonte de verdade: mover um card no painel já escreve direto no Supabase.

## O que ficou pendente, e o que cada pendência trava

| Pendência | Trava | Quem resolve |
|---|---|---|
| ~~Conectar Google Calendar~~ | **RESOLVIDO 28/jul à noite** — conector ativo e testado (`list_calendars` retornou a agenda da conta operacional). `irbis-vigia-reunioes` está destravada; falta só agendar a rotina recorrente dela quando o Nicolas quiser | feito |
| Redesign visual do painel | telas ainda no dark mode genérico até a implementação tela-a-tela terminar | em andamento |

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
