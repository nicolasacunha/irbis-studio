-- Achado guardado.
--
-- O chat do Company Brain já era capaz de achar problema real cruzando as tabelas (em 06/ago
-- achou duas `aprovacoes` duplicadas pro mesmo caso e um projeto entregue que o pipeline
-- ainda mostrava em "Aprovação do design"). O achado morria na conversa: fechou a aba,
-- sumiu. Esta tabela é onde ele para de morrer.
--
-- NÃO é a fila de `aprovacoes`. `aprovacoes` guarda rascunho de mensagem esperando o Nicolas
-- aprovar o ENVIO — tem canal, pessoa e corpo, e várias skills leem essa fila contando que
-- todo registro ali seja isso. Um achado de auditoria não é mensagem pra ninguém; misturar
-- os dois envenenaria a fila que `irbis-carteira`/`irbis-cobrar` consomem.
--
-- Lei 1 continua de pé: registrar achado é anotação interna, não ação. Nada aqui manda
-- mensagem, muda dado operacional nem executa skill.
create table if not exists achados (
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
