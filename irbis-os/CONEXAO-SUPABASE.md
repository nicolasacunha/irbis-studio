# Conexão com o Supabase do Sistema OS

Projeto: `irbis-os` (ref `kugitonorbcijhyytsya`, região São Paulo). Banco vivo da Fase 0
(pessoas, pipeline, interacoes, projetos, marcos, propostas, financeiro, aprovacoes).

Não há MCP do Supabase conectado nesta sessão nem `psql` instalado na máquina. O acesso é
via **REST API (PostgREST)** com a service role key, que ignora RLS.

## Credenciais

Em `irbis-os/.secrets/supabase.env` (fora do git):

```
SUPABASE_URL=https://kugitonorbcijhyytsya.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Padrão de leitura

```bash
source irbis-os/.secrets/supabase.env
curl -s "${SUPABASE_URL}/rest/v1/pipeline?select=*&estagio=eq.negociacao" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
```

Sintaxe de filtro é PostgREST: `coluna=eq.valor`, `coluna=lt.valor`, `coluna=is.null`,
`select=col1,col2,pessoas(nome,email)` para join por FK, `order=coluna.desc`, `limit=N`.

**Consulta sem `limit` nem filtro de texto = leitura completa da tabela → `✅ LIDO` na
Fronteira dos Dados.**

## Padrão de escrita

```bash
# Insert
curl -s -X POST "${SUPABASE_URL}/rest/v1/pessoas" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{"nome":"...", "papel":"lead"}'

# Update
curl -s -X PATCH "${SUPABASE_URL}/rest/v1/pipeline?id=eq.<uuid>" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"ultimo_contato_real":"2026-07-28"}'
```

As constraints do schema (NOT NULL em `proximo_passo`/`data_proximo_toque`, índices únicos de
e-mail/telefone, checks de enum) já foram testadas: o banco recusa insert inválido com erro
`23502`/`23505` do Postgres. Se um insert falhar por constraint, **isso é o banco fazendo o
trabalho certo** — não contorne, corrija o dado.

## Tabelas e o que cada uma guarda

Ver o schema completo em `irbis-os/supabase/migrations/20260728000000_fase0_schema.sql`.
Resumo: `pessoas` (cadastro-mestre) · `pipeline` (1 card por pessoa em negociação) ·
`interacoes` (histórico de toques) · `projetos` / `marcos` (pós-venda, ainda não usado antes
da Fase 3) · `propostas` / `financeiro` (ainda não usado antes da Fase 4-5) · `aprovacoes`
(fila de rascunhos parados, ver LEI 1 do núcleo).

## Estado dos dados (28/jul/2026)

Todas as tabelas estão **vazias**. O board real está no Notion ("🎯 CRM IRBIS") e ainda não
foi migrado. Enquanto isso, qualquer skill que ler o Supabase vai reportar honestamente "0
registros" — isso é `✅ LIDO`, não `❌ FALHOU`: a tabela foi consultada de verdade, só não tem
dado ainda. Não confunda com "cego".
