-- Card de projeto estilo Trello (pedido do Nicolas, 28/jul à noite):
-- descrição livre no projeto + comentários/atividade ancorados no projeto.
-- Checklist já existe: é a tabela marcos (data_real preenchida = item feito).
alter table projetos add column descricao text;
alter table interacoes add column projeto_id uuid references projetos(id) on delete cascade;
create index interacoes_projeto_data on interacoes (projeto_id, data desc) where projeto_id is not null;
