# Demo v2 · Atendimento por placa com IA de verdade

Conversa rodando na API do Claude + consulta de placa plugável. A tela do vendedor atualiza ao vivo.

## Rodar (precisa do Node 18 ou mais novo)

```bash
cd demo-v2
ANTHROPIC_API_KEY=sk-ant-...  node server.mjs
```

Abre http://localhost:3010. Pronto.

Sem chave por variável de ambiente? Edita o topo do `server.mjs` e cola a chave em `ANTHROPIC_API_KEY`. A chave se cria em console.anthropic.com (a demo inteira de quinta custa centavos).

## Consulta de placa real (opcional)

A demo funciona sem nada: placas semeadas + qualquer placa desconhecida cai num carro padrão, então nunca quebra na frente do Roberto.

Pra plugar a consulta real: cria conta na **apiplacas.com.br** (créditos pré-pagos, GET simples), pega o token e roda com `PLACA_TOKEN=seutoken`. Se a API cair no meio da reunião, o servidor volta sozinho pros dados semeados. A APIBrasil (apibrasil.io) tem um nível grátis de consulta de placa se quiser testar antes de pagar.

**Antes de apresentar:** a placa FVN9148 (a que o Thiago consultou na visita) está semeada como Argo 2017/18 prata, que foi chute meu. Confirma o carro real e corrige em `PLACAS_SEMEADAS` no `server.mjs`. Se estiver com o token da API real, isso se resolve sozinho.

## Truques pra quinta

- **Duas janelas:** abre http://localhost:3010 numa janela (o celular) e http://localhost:3010/?tela=vendedor em outra. O pedido fechado no WhatsApp aparece na segunda janela na hora. Celular numa tela, vendedor no projetor.
- O Roberto pode falar do jeito dele ("tô com barulho no freio") porque agora quem conversa é o Claude, não um script de palavra-chave.
- Peças que a demo conhece: vela, amortecedor (com a pegadinha de semestre), pastilha, pivô, retentor, filtro, correia (pegadinha do tensor), farol, bateria. Edita em `PECAS` no `server.mjs`.
- **Plano B:** se a internet do local falhar, usa o `demo-atendimento-rocha.html` da pasta Rocha (a v1, roteirizada, roda 100% offline). Leva os dois no notebook.

## O que dizer se ele pedir pra ficar com a demo

"Isso aqui é maquete: meia dúzia de peças decoradas e uma placa de teste. A versão de verdade consulta a Fraga, o seu cross e o seu estoque ao vivo, e o desenho dela é exatamente o que está na proposta."
