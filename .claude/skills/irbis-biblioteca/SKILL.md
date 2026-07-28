---
name: irbis-biblioteca
description: "Inventaria os templates comerciais reais da IRBIS (proposta por tipo, briefing, anexo de escopo, kit de onboarding) com status ok/⚠/⛔ honesto, aplica versionamento sem sobrescrita silenciosa, e roda a máquina de melhoria contínua que lê post-mortems do Supabase e propõe mudança de template com diff quando um padrão bate 3 ocorrências. Use quando o Nicolas disser '/biblioteca', 'que templates eu tenho', ou pedir revisão de padrões de objeção."
---

# IRBIS — `/biblioteca` (repo + Supabase, Fase 6)

Spec completa: `irbis-os/fases/FASE-6-conhecimento.md`, seção 1. Conexão Supabase:
`irbis-os/CONEXAO-SUPABASE.md`.

## 1. O inventário — sempre varra o repo de verdade, nunca reporte de memória

Caminhos reais a checar (28/jul/2026):

| Template | Onde procurar | Estado real conhecido |
|---|---|---|
| proposta, por tipo (LP/institucional/e-commerce/sistema IA/bot) | `03 - Comercial/07 - Biblioteca/propostas/` | ⛔ não existe como arquivo — a estrutura vive no procedimento da skill `irbis-nova-proposta` (Fase 5), não em template solto |
| briefing/levantamento | `03 - Comercial/02 - Qualificação e Agendamento/formulario-escopo-precall-copy.md` | existe, mas é o formulário do `/call`, não um briefing pós-venda genérico — reporte como `⚠ adjacente, não é o mesmo artefato` |
| anexo de escopo | `03 - Comercial/06 - Jurídico/anexo-escopo-qgos.md` | existe só para o QG OS (cliente específico) — não é template genérico, reporte `⚠ existe 1 instância específica, não generalizada` |
| kit de onboarding (4 peças) | `03 - Comercial/07 - Biblioteca/kit-onboarding/` | criado nesta fase (28/jul/2026), v1.0 — ver seção 3 |

**Não confie nesta tabela cegamente em execuções futuras** — ela descreve o estado no
momento em que esta skill foi escrita. Rode `find`/`ls` nos caminhos reais a cada execução;
se algo mudou (template novo, versão nova), o inventário reflete o que está no disco agora,
não o que está documentado aqui.

Saída:

```
BIBLIOTECA · {{data}}
TEMPLATE              TIPO           VERSÃO  ATUALIZADO  STATUS
proposta               (todos)        —       —           ⛔ não existe como arquivo — procedimento vive em irbis-nova-proposta
briefing               (todos)        —       —           ⚠ só existe o formulário de /call, não um briefing pós-venda
anexo de escopo        QG OS          —       —           ⚠ existe 1 instância específica, não generalizada
kit de onboarding      (todos)        v1.0    28/jul/2026 ok
```

Três status, sem meio-termo: `ok` existe, versionado, usado mais de uma vez · `⚠` existe mas
não validado/generalizado · `⛔` não existe. **Nenhuma skill finge que existe** —
`irbis-nova-proposta` já sabe disso e monta a partir do tipo mais próximo, declarando de onde
tirou (é assim que ela cobre o `⛔` de proposta por enquanto).

## 2. Versionamento

- Todo template versionado abre com cabeçalho: nome, tipo, versão, data, **o que mudou da
  anterior** em uma linha.
- Mudança gera versão nova (v1.0 → v1.1). **Nunca sobrescreva o arquivo em silêncio** — o
  histórico de por que o template era como era é dado, não lixo.
- Template datado antes de 21/jul/2026 (pivot) é `pré-pivot`: vale pela estrutura e voz, não
  pelo escopo de serviço descrito.
- **Nunca preço fixo dentro do template.** Preço vem da tabela do núcleo na hora de
  instanciar (via `irbis-nova-proposta`).

## 3. Kit de onboarding

Escrito em `03 - Comercial/07 - Biblioteca/kit-onboarding/`, 4 peças (ver arquivos, já
versionados v1.0): `01-boas-vindas.md`, `02-o-que-preciso-de-voce.md`,
`03-canais-e-cadencia.md`, `04-kickoff.md`. Instanciados por `irbis-projeto` ou manualmente no
momento de entrega/onboarding de um cliente novo — preencha os placeholders com o nome do
cliente e o projeto real, nunca envie o template cru.

## 4. A máquina de melhoria contínua

```
GET /rest/v1/propostas?select=*,pessoas(nome)&status=in.(aceita,recusada,expirada)&post_mortem=not.is.null&data_envio=gte.{{hoje-90}}
```

1. **Agrupe por padrão, não por palavra literal.** "Achou caro", "não cabe no orçamento
   agora" e "vou comparar com outra proposta" podem ser o mesmo padrão (ancoragem fraca).
   Agrupamento é julgamento seu — mostre o agrupamento com a contagem, pro Nicolas discordar
   se achar errado.
2. **Conte de verdade.** Padrão com 3+ ocorrências dispara proposta de mudança.
   **Nunca invente contagem**: se `post_mortem` está vazio na maioria das propostas
   decididas, diga isso — "post-mortem preenchido em {{n}} de {{m}} propostas decididas, não
   dá pra falar de padrão ainda" — em vez de estimar.
3. **Proponha com diff, sempre ASK:**

```
PADRÃO: {{nome do padrão}} · {{n}} ocorrências ({{datas}})
  "{{citação 1}}" · "{{citação 2}}" · "{{citação 3}}"
DIAGNÓSTICO: {{por que isso aconteceu, ligado a um passo específico do processo}}
MUDANÇA PROPOSTA
  1. {{template}} v{{X}} → v{{X+1}}: {{mudança específica}}
Aplicar? (1 · a = todas · n = nenhuma, mas registro o padrão)
```

4. **Registre a decisão, inclusive "não".** Padrão recusado não volta a ser proposto por 90
   dias — grave a data da recusa em algum lugar rastreável (comentário no próprio template ou
   nota em `irbis-os/relatorios/`), mas continua contando pro total histórico.

## O que NUNCA vira template

Dossiê de lead (é por definição único) · diagnóstico (o valor é ser específico) · mensagem de
follow-up (vive na escada de `irbis-leads-parados-supabase`, não aqui) · qualquer peça usada
uma vez só (custo de manutenção sem retorno).
