# Rotina de intenção de compra da IRBIS

Esta rotina transforma combinações de oferta, vertical e gargalo em uma fila priorizada de pautas para SEO e busca por IA. Ela não publica variações automáticas por cidade e não considera uma palavra-chave usada até confirmar que a URL final está pública.

## Por que não é “parasite SEO” automático

O Google classifica como abuso de conteúdo em escala a criação de muitas páginas cujo objetivo principal é manipular ranking, independentemente de o texto ter sido produzido por pessoas ou automação. Também trata como abuso de reputação a publicação em um domínio de terceiros principalmente para explorar os sinais de ranking desse domínio.

Referências oficiais:

- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Por isso, o modo padrão é `review_required`: a rotina pesquisa e prepara o rascunho; Nicolas aprova antes de qualquer publicação ou deploy.

## Estado da primeira versão

- 168 consultas de alta intenção, sem camada geográfica artificial.
- SQLite com `UNIQUE` na palavra-chave normalizada.
- Falhas voltam para a fila até três tentativas.
- O status `published` só existe depois de verificar uma URL pública com HTTP 200 e presença da palavra-chave no conteúdo.
- Importação de perguntas reais do Search Console por CSV.
- Medium, Substack, YouTube e GitHub ficam desativados até conexão e política editorial por plataforma.

## Comandos

```bash
python3 scripts/pseo/pipeline.py init
python3 scripts/pseo/pipeline.py generate
python3 scripts/pseo/pipeline.py status
python3 scripts/pseo/pipeline.py next --platform owned_blog
python3 scripts/pseo/pipeline.py import-gsc caminho/export-search-console.csv
python3 scripts/pseo/pipeline.py draft --keyword-id 1 --manifest caminho/manifest.json
python3 scripts/pseo/pipeline.py fail --keyword-id 1 --reason "fonte primária insuficiente"
python3 scripts/pseo/pipeline.py publish --keyword-id 1 --platform owned_blog --url https://irbis.com.br/blog/slug
```

O banco local fica em `.pseo/queue.sqlite` e não entra no Git. O comando `status` mostra contagem por estado e as próximas pautas.

## Manifesto do rascunho

O comando `draft` espera um JSON com:

```json
{
  "keyword": "quanto custa sistema com IA para indústria",
  "title": "Quanto custa um sistema com IA para uma indústria?",
  "summary": "Resumo de três a cinco frases que responde a pergunta sem introdução.",
  "faq": [
    { "question": "Pergunta real?", "answer": "Resposta direta." }
  ],
  "sources": [
    { "url": "https://fonte-primaria.example/estudo", "type": "pesquisa", "claim": "O que a fonte sustenta." }
  ],
  "firstPartyEvidence": ["odery-crm-entrega"],
  "image": {
    "filename": "quanto-custa-sistema-com-ia-para-industria.webp",
    "alt": "quanto custa sistema com IA para indústria"
  },
  "internalLinks": ["https://irbis.com.br/odery-crm"],
  "bodyPath": "05 - Growth/pseo/drafts/slug.md"
}
```

O primeiro run não usa dados do Search Console porque não há credencial local com o escopo necessário. Quando houver um CSV exportado, `import-gsc` guarda apenas consultas em formato de pergunta e seus dados de cliques, impressões, CTR e posição.

## Intenção local

A fila admite São Paulo como única localização verificada. A IRBIS atende presencialmente, mediante agendamento, na Avenida Brigadeiro Luís Antônio, 5083, São Paulo - SP. A rotina não deve gerar páginas para bairros nem para outras cidades sem presença real, e o endereço não deve ser descrito como sede ou escritório exclusivo.
