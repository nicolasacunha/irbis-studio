-- Alinha `achados` ao formato final.
--
-- Por que existe: a migration 20260806010000 foi aplicada no banco com um desenho anterior
-- (colunas `categoria`/`fonte`/`visto_em`/`resolvido_em`, `chave` opcional com índice único
-- parcial) e o arquivo dela foi reescrito na mesma sessão, depois que o desenho mudou
-- (`origem`, `fechado_em`, `chave` obrigatória e unique, severidade urgente/atencao/nota).
-- O `db push` não reaplica migration já registrada, então arquivo e banco divergiram: o
-- INSERT de `registrar-achado-tool.ts` falha com PGRST204 ("Could not find the 'origem'
-- column"). Esta migration fecha a divergência.
--
-- DROP é seguro AQUI e só aqui: a tabela foi criada nesta mesma sessão e verificada com
-- 0 linhas (`Prefer: count=exact` → `content-range: */0`) antes de escrever isto. Não há
-- dado a preservar. Se por qualquer motivo houver linha nesta tabela quando isto rodar,
-- PARE e migre o conteúdo à mão em vez de executar.
drop table if exists achados;

create table achados (
  id           uuid primary key default gen_random_uuid(),
  criado_em    timestamptz not null default now(),
  -- 'company-brain' (o chat), ou o taskId da rotina que gravou, ou 'nicolas'.
  criado_por   text not null,
  -- Dedup. Sem isso, uma rotina que roda todo dia grava o mesmo achado todo dia e a lista
  -- vira ruído até o Nicolas parar de olhar. Slug estável do PROBLEMA, não da execução:
  -- 'aprovacoes-duplicadas:44ad5d69', não 'auditoria-2026-08-06'.
  chave        text not null unique,
  titulo       text not null,
  detalhe      text not null,
  -- De onde saiu: [{"tabela":"aprovacoes","id":"44ad5d69-..."}]. Sustenta a conferência
  -- manual — sem isso o achado é uma afirmação sem endereço.
  origem       jsonb not null default '[]',
  severidade   text not null default 'atencao' check (severidade in ('urgente','atencao','nota')),
  status       text not null default 'aberto' check (status in ('aberto','resolvido','ignorado')),
  fechado_em   timestamptz
);

create index achados_abertos on achados (criado_em desc) where status = 'aberto';

comment on table achados is
  'Problemas de dado/operação encontrados por auditoria automática, guardados pro Nicolas ver sem precisar perguntar de novo. Não é fila de envio — ver aprovacoes.';
comment on column achados.chave is
  'Slug estável do problema, unique. Registrar o mesmo achado de novo é no-op (on conflict do nothing), não linha duplicada.';
comment on column achados.origem is
  'Array de {tabela, id} que sustenta o achado. Achado sem origem é opinião, não achado.';
