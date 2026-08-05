-- Sistema de Agentes por Departamento — inventário vivo dos Jobs To Be Done.
-- Antes disso o mapa (sistema-de-agentes/mapa-aurora.html) tinha os 37 jobs hardcoded no HTML.
-- Isso move o conteúdo pro banco, pra virar ferramenta de uso diário: quando uma skill nova
-- nasce ou um job muda de nível de automação, atualiza aqui — não precisa de deploy de código.
create table agentes_jobs (
  id uuid primary key default gen_random_uuid(),
  departamento text not null check (
    departamento in ('vendas', 'negocio', 'marketing', 'clientes', 'backoffice', 'operacoes', 'inteligencia')
  ),
  titulo text not null,
  skill text,
  nivel_automacao text not null check (nivel_automacao in ('ai', 'assisted', 'human')),
  ordem int not null default 0,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table agentes_jobs is
  'Um Job To Be Done por linha, por departamento. skill=null significa gap: job real sem automação ainda — vira backlog, não é erro.';
comment on column agentes_jobs.nivel_automacao is
  'ai = roda sozinho. assisted = IA prepara, humano decide. human = só humano, mesmo com skill de apoio (ex: conduzir a call em si).';

create index agentes_jobs_departamento_idx on agentes_jobs (departamento, ordem);
