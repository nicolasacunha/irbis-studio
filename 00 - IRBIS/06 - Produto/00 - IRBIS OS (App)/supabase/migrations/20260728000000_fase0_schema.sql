-- Fase 0 — Sistema Operacional IRBIS
-- 8 tabelas: pessoas, pipeline, interacoes, projetos, marcos, propostas, financeiro, aprovacoes

-- 1. PESSOAS
create table pessoas (
  id            uuid primary key default gen_random_uuid(),
  nome          text not null,
  empresa       text,
  email         text,
  telefone      text,
  origem        text check (origem in ('indicacao','inbound site','outbound','evento')),
  indicado_por  uuid references pessoas(id),
  papel         text check (papel in ('lead','cliente ativo','ex-cliente','parceiro','indicador')),
  dossie_url    text,
  criado_em     timestamptz not null default now()
);
create unique index pessoas_email_uniq on pessoas (lower(email)) where email is not null;
create unique index pessoas_fone_uniq  on pessoas (regexp_replace(telefone,'\D','','g'))
  where telefone is not null;

-- 2. PIPELINE
create table pipeline (
  id                  uuid primary key default gen_random_uuid(),
  pessoa_id           uuid not null references pessoas(id),
  estagio             text not null check (estagio in
                        ('primeiro contato','levantamento','proposta','negociacao',
                         'fechado','perdido','nutricao')),
  tipo_projeto        text,
  valor_min           numeric,
  valor_max           numeric,
  temperatura         text check (temperatura in ('quente','morno','frio')),
  proximo_passo       text not null,
  data_proximo_toque  date not null,
  ultimo_contato_real date,
  degrau_escada       text,
  motivo_perda        text check (motivo_perda in ('preco','momento','escopo','silencio','outro')),
  atualizado_em       timestamptz not null default now()
);

-- 3. INTERACOES
create table interacoes (
  id                 uuid primary key default gen_random_uuid(),
  pessoa_id          uuid not null references pessoas(id),
  data               timestamptz not null default now(),
  canal              text not null check (canal in
                       ('email','call','presencial','linkedin','whatsapp',
                        'automatico','financeiro','outro')),
  direcao            text check (direcao in ('enviado','recebido')),
  resumo             text not null,
  artefato_url       text,
  origem_do_registro text not null check (origem_do_registro in
                       ('vigia','registrar','pos-reuniao','sistema'))
);
create index interacoes_pessoa_data on interacoes (pessoa_id, data desc);

-- 4. PROJETOS
create table projetos (
  id                          uuid primary key default gen_random_uuid(),
  pessoa_id                   uuid not null references pessoas(id),
  nome                        text not null,
  tipo                        text,
  status                      text not null default 'onboarding' check (status in
                                ('onboarding','em producao','em revisao','entregue',
                                 'em garantia','carteira')),
  escopo_url                  text,
  travado_por                 text,
  travado_desde               date,
  pacote_ativo                text,
  proxima_camada               text,
  data_proximo_toque_carteira date,
  prazo_prometido              text,
  data_inicio_real             date,
  data_entrega_real            date
);

-- 5. MARCOS
create table marcos (
  id             uuid primary key default gen_random_uuid(),
  projeto_id     uuid not null references projetos(id) on delete cascade,
  nome           text not null,
  ordem          int  not null,
  data_planejada date,
  data_real      date,
  depende_de     text
);

-- 6. PROPOSTAS
create table propostas (
  id             uuid primary key default gen_random_uuid(),
  pessoa_id      uuid not null references pessoas(id),
  pipeline_id    uuid references pipeline(id),
  tipo           text,
  valor          numeric,
  data_envio     date,
  validade       date,
  status         text not null default 'rascunho' check (status in
                   ('rascunho','enviada','aceita','recusada','expirada')),
  condicoes      text,
  pdf_url        text,
  post_mortem    text,
  motivo_decisao text
);

-- 7. FINANCEIRO
create table financeiro (
  id                    uuid primary key default gen_random_uuid(),
  projeto_id            uuid references projetos(id),
  proposta_id           uuid references propostas(id),
  tipo                  text check (tipo in ('entrada','marco','recorrencia','escopo novo')),
  valor                 numeric not null,
  vencimento            date not null,
  status                text not null default 'a receber'
                          check (status in ('a receber','pago','vencido')),
  forma                 text,
  credito_conciliado_id text unique,
  documento_fiscal      text default 'n/a' check (documento_fiscal in ('a emitir','emitido','n/a'))
);

-- 8. APROVACOES (o coração da LEI 1)
create table aprovacoes (
  id                uuid primary key default gen_random_uuid(),
  identificador     text not null,
  criado_em         timestamptz not null default now(),
  criado_por        text not null,
  pessoa_id         uuid references pessoas(id),
  canal             text,
  gatilho           text not null,
  corpo             text not null,
  fatos_dependentes jsonb not null default '[]',
  status            text not null default 'parado' check (status in
                      ('parado','aprovado','editado','descartado','enviado','invalidado')),
  aprovado_em       timestamptz,
  texto_enviado     text,
  enviado_em        timestamptz
);
create index aprovacoes_status on aprovacoes (status, criado_em desc);
