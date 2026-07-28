---
name: irbis-novo-lead
description: "Cadastra um lead novo no CRM Supabase da IRBIS (pessoas + pipeline), com checagem de duplicata, dossiê-esqueleto e primeira mensagem de outreach pronta pra aprovação. Use quando o Nicolas disser '/novo-lead', 'novo lead', 'cadastra esse lead', ou trouxer um contato novo pra registrar no funil."
---

# IRBIS — `/novo-lead` (Supabase, Fase 1)

Conexão e credenciais: `irbis-os/CONEXAO-SUPABASE.md`. Spec completa em
`irbis-os/fases/FASE-1-crm-e-alertas.md`, seção 3.

## 1. Antiduplicata, antes de qualquer escrita

Busque por e-mail e telefone normalizado (o banco já bloqueia duplicata por índice único —
mas cheque antes pra dar erro amigável, não deixar o Postgres estourar `23505`):

```
GET /rest/v1/pessoas?or=(email.eq.<email>,telefone.eq.<telefone_normalizado>)
GET /rest/v1/pessoas?nome=ilike.*<nome>*
GET /rest/v1/pessoas?empresa=ilike.*<empresa>*
```

Nome e empresa são busca textual parcial: **zero resultado não prova ausência**. Se houver
qualquer sinal de que essa pessoa ou empresa já passou pela casa, pergunte antes de criar
duplicata:

`Achei "{{nome/empresa similar}}" já cadastrado. É a mesma pessoa/empresa? (s/n)`

## 2. Criar o registro

`pessoas`: nome, empresa, email, telefone, origem (indicacao/inbound site/outbound/evento),
`indicado_por` se aplicável, papel = `lead`.

`pipeline`: `estagio = 'primeiro contato'`. Temperatura por **sinal objetivo**, nunca por
entusiasmo — quente = tem prazo declarado OU dor específica nomeada OU indicação com
contexto; sem nenhum desses, morno; frio só se o próprio lead sinalizou baixa prioridade.
`valor_min`/`valor_max` como faixa (nunca número fechado). `tipo_projeto` vazio se
desconhecido — não invente, faixa inventada polui o forecast. `proximo_passo` e
`data_proximo_toque` são obrigatórios (o banco recusa sem eles).

## 3. Dossiê-esqueleto

Crie o arquivo em `03 - Comercial/01 - Prospecção/dossie-{{slug-nome}}.md` com as seções da
Fase 1 (seção 4 deste sistema, ver skill `irbis-dossie`), preenchendo só o que se sabe. Seção
sem dado leva `—` e um comentário do que falta descobrir, nunca suposição de setor. Grave o
caminho em `pessoas.dossie_url`.

**As 5 perguntas que faltam saber, na ordem em que mudam o preço** (isso é a pauta do
primeiro contato, não um formulário):
1. De onde vêm os clientes dele hoje.
2. Quanto vale um cliente novo para ele.
3. Quem decide junto.
4. Prazo puxado por algum evento.
5. O que já existe.

## 4. Dívida de indicação

Se `origem = 'indicacao'`: além do card do lead, crie uma pendência de agradecer o indicador
hoje (registre em `interacoes` do indicador, `origem_do_registro='registrar'`, com
`proximo_passo` "agradecer indicação do {{lead}}" se ele tiver card de pipeline; senão,
reporte a pendência em texto pro Nicolas). Indicação não agradecida é a forma mais barata de
perder a próxima.

## 5. Primeira mensagem (ASK, nunca envia sozinho)

Regras: um fato específico do negócio dele antes de qualquer coisa sobre a IRBIS · zero preço
· objetivo único é reunião marcada · duas opções concretas de horário, nunca "pode?" · se veio
de indicação, a primeira linha nomeia o indicador · segue a voz da `irbis-brand-voice` (sem
travessão, sem palavra banida).

Se você não tem nenhum fato específico dele, **diga isso** e proponha o que pesquisar antes de
escrever — mensagem genérica gasta o único disparo com chance real de resposta.

Grave o rascunho em `aprovacoes` (ver skill `irbis-leads-parados-supabase`, seção 5, para o
formato exato do insert) e apresente no formato:

```
RASCUNHO [A] · PARA: {{nome}} · {{canal}}
GATILHO: novo lead cadastrado, primeira mensagem
--- MENSAGEM ---
{{texto pronto}}
--- FIM ---
CHECAGEM: sem travessão ✓ · sem palavra banida ✓ · sem preço no corpo ✓ · assina Nicolas ✓
[A] parado. Aprovação só na sua sessão, citando [A].
```
