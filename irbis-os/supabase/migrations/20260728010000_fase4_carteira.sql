-- Fase 4 — Carteira: rastrear o último toque de valor por cliente ativo.
-- data_proximo_toque_carteira (Fase 0) guarda o PRÓXIMO toque planejado; faltava o histórico
-- do ÚLTIMO toque de valor real, que é o que o vigia de 60/75/90 dias precisa medir.
alter table projetos add column ultimo_toque_valor date;
comment on column projetos.ultimo_toque_valor is
  'Data do último contato que entregou relatório, ideia ou resultado (Fase 4). Mensagem de "tudo bem?" não conta e não atualiza este campo.';
