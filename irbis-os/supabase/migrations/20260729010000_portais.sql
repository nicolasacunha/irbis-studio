-- Portal de cliente (pedido de 29/jul): página pública por cliente em /portal/{slug},
-- mostrando status + marcos dos projetos dele. Gerenciado pelo card do projeto no OS.
create table portais (
  id         uuid primary key default gen_random_uuid(),
  pessoa_id  uuid not null references pessoas(id) on delete cascade,
  slug       text not null unique,
  ativo      boolean not null default true,
  mensagem   text,
  criado_em  timestamptz not null default now()
);
create unique index portais_pessoa_uniq on portais (pessoa_id);
