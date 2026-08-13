-- Automação fingida vs. automação real.
--
-- Até aqui `nivel_automacao='ai'` respondia "esse job SABE rodar sozinho". Não respondia
-- "esse job ESTÁ rodando sozinho, sem ninguém pedir". São dois eixos diferentes, e o mapa
-- misturava os dois: vários jobs apareciam como 100% IA sem ter nenhum disparo automático
-- por trás. Estas colunas separam capacidade de execução de fato.
--
-- ⚠️ Fonte de `cron_task_id`, `ultima_execucao_real` e `proxima_execucao_real`: as rotinas
-- do `scheduled-tasks` do Claude Code, que vivem em ~/.claude/scheduled-tasks/ na máquina
-- do Nicolas. O painel na Vercel NÃO enxerga essa pasta — os timestamps são um retrato
-- tirado por uma sessão do Claude Code e envelhecem sozinhos até a próxima sincronização.
-- Ver sistema-de-agentes/README.md.
alter table agentes_jobs add column if not exists agendado boolean not null default false;
alter table agentes_jobs add column if not exists cron_task_id text;
alter table agentes_jobs add column if not exists ultima_execucao_real timestamptz;
alter table agentes_jobs add column if not exists proxima_execucao_real timestamptz;

comment on column agentes_jobs.agendado is
  'true = existe rotina agendada disparando esse job sozinho. Eixo INDEPENDENTE de nivel_automacao: um job pode ser "ai" e não ser agendado (sabe fazer, só não faz sem alguém mandar).';
comment on column agentes_jobs.cron_task_id is
  'taskId da rotina em ~/.claude/scheduled-tasks/. Um por job: quando mais de uma rotina alimenta o mesmo job, fica o disparo principal e o resto vira nota no README.';
comment on column agentes_jobs.ultima_execucao_real is
  'lastRunAt da rotina no momento da última sincronização manual. Não se atualiza sozinho — timestamp velho significa sincronização velha, não rotina parada.';
comment on column agentes_jobs.proxima_execucao_real is
  'nextRunAt da rotina no momento da última sincronização manual. Mesma ressalva de ultima_execucao_real.';
