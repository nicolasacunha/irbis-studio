---
name: irbis-buy-intent-seo
description: "Rotina noturna de SEO/GEO de alta intenção da IRBIS. Pesquisa uma pauta da fila transacional, produz um rascunho verificável e para na revisão humana."
---

# IRBIS · Rotina noturna de intenção de compra

Produza uma pauta por execução. O objetivo é responder uma pergunta comercial real com evidência própria e fontes verificáveis. O objetivo não é preencher uma matriz de palavras-chave.

## Passo 0 · Fonte de verdade

Leia, nesta ordem:

1. `CLAUDE.md`
2. `.claude/brand-context.md`
3. `05 - Growth/pseo/config.json`
4. `05 - Growth/pseo/evidence.json`
5. `site/blog/posts.json`

Se qualquer documento antigo vender site ou landing page, ignore. A decisão de 04/ago/2026 em `CLAUDE.md` vence.

## Passo 1 · Preparar a fila

Rode:

```bash
python3 scripts/pseo/pipeline.py init
python3 scripts/pseo/pipeline.py generate
```

Se existir um CSV novo em `05 - Growth/pseo/input/`, importe o mais recente:

```bash
python3 scripts/pseo/pipeline.py import-gsc "<arquivo.csv>"
```

Não invente pergunta do Search Console quando não houver exportação.

São Paulo pode entrar em pautas locais porque há atendimento presencial mediante agendamento na Avenida Brigadeiro Luís Antônio, 5083. Não expanda a matriz para bairros ou outras cidades e não chame o endereço de sede ou escritório exclusivo.

## Passo 2 · Reservar uma pauta

Rode:

```bash
python3 scripts/pseo/pipeline.py next --platform owned_blog
```

O comando reserva a pauta em transação. Nunca escolha outra palavra-chave por fora da fila.

## Passo 3 · Pesquisar evidência

1. Use os `evidenceCandidates` do job como fatos próprios permitidos.
2. Abra cada URL antes de citar.
3. Busque no mínimo duas fontes externas de tipos diferentes, priorizando fonte primária, documentação oficial, pesquisa acadêmica e dados públicos.
4. Registre para cada fonte qual afirmação ela sustenta.
5. Não cite número sem URL verificável.
6. Não transforme mecanismo de case em resultado financeiro.

Se não houver evidência suficiente, devolva a pauta à fila:

```bash
python3 scripts/pseo/pipeline.py fail --keyword-id <ID> --reason "evidência verificável insuficiente"
```

## Passo 4 · Escrever o rascunho

Crie dois arquivos em `05 - Growth/pseo/drafts/YYYY-MM-DD/`:

- `<slug>.md`: artigo completo.
- `<slug>.manifest.json`: manifesto de validação conforme `05 - Growth/pseo/README.md`.

Requisitos do texto:

- Resposta direta no primeiro parágrafo.
- Resumo citável de 3 a 5 frases.
- Pelo menos 900 palavras, apenas quando o assunto sustentar esse tamanho.
- FAQ com no mínimo 3 perguntas, preferindo as importadas do Search Console.
- Um link interno contextual.
- Uma evidência própria registrada em `evidence.json`, com a limitação explícita.
- Duas fontes externas de tipos diferentes.
- Uma imagem cujo arquivo e alt contenham a palavra-chave.
- Autor: Nicolas Cunha.
- Sem preço, estatística, quote ou resultado inventado.
- Sem travessão e sem copy da antiga oferta de sites.

## Passo 5 · Validar

Rode:

```bash
python3 scripts/pseo/pipeline.py draft \
  --keyword-id <ID> \
  --platform owned_blog \
  --manifest "<manifest.json>" \
  --verify-sources
```

Se falhar, corrija uma vez. Se falhar novamente, rode `fail` com o motivo real. A palavra-chave volta para a fila; falha não conta como publicação.

## Passo 6 · Parar para revisão

Entregue ao Nicolas:

- palavra-chave e score;
- título e resumo;
- fontes usadas;
- evidência própria e limitação;
- caminhos dos dois arquivos;
- recomendação de canal.

Não execute `review`, `publish`, `git push`, deploy ou publicação externa. Esses passos exigem aprovação humana explícita.

Medium, Substack, YouTube e GitHub permanecem desativados em `config.json` até cada conta e formato terem uma política editorial própria.
