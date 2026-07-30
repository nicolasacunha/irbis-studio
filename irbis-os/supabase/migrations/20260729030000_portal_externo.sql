-- Portal pode ser um link externo anexado (caso portal-acunha: página estática feita à mão
-- em irbis.com.br/portal-acunha) em vez do portal interno gerado em /portal/{slug}.
alter table portais add column url_externa text;
