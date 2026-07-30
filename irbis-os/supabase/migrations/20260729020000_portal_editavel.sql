-- Portal totalmente editável (pedido de 29/jul): título próprio (desacoplado do nome no
-- CRM), e controle de quais projetos aparecem no portal.
alter table portais add column titulo text;
alter table projetos add column visivel_portal boolean not null default true;
