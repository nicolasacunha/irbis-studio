---
peça: Relatório mensal
versão: v1.0
data: 2026-08-03
mudou da anterior: primeira versão
sai quando: todo dia {{dia fixo combinado, ex: 5}} do mês, para clientes no plano Pro
---

# Relatório mensal — {{projeto}} · {{mês}}/{{ano}}

{{primeiro_nome}}, seguem os números e o que mexemos em {{mês}}.

## O que fizemos neste mês

| Pedido | Data | Status |
|---|---|---|
| {{descrição do pedido 1}} | {{data}} | {{feito/em fila}} |
| {{descrição do pedido 2}} | {{data}} | {{feito/em fila}} |

Pedidos atendidos no mês: {{n}} · fila atual: {{n}} · prazo de resposta combinado: 48h úteis.

## Números do site

{{Se o site do cliente tem GA4 configurado: preencher a tabela abaixo com os eventos de
contato configurados naquele site (ex.: clique em WhatsApp, envio de formulário — variam por
projeto, não são os mesmos da IRBIS). Se o site não tem GA4 configurado: apagar a tabela e
escrever só a frase "Analytics ainda não configurado neste site — sem números pra reportar
este mês."}}

| Métrica | Este mês | Mês anterior | Variação |
|---|---|---|---|
| Visitas | {{x}} | {{x}} | {{%}} |
| Contatos gerados (WhatsApp/formulário) | {{x}} | {{x}} | {{%}} |
| Origem principal do tráfego | {{ex: Google orgânico}} | — | — |

## Observação do mês

{{uma frase sobre o que se destacou, pra melhor ou pra pior. Sem nada relevante, escrever
"Mês estável, sem mudança de padrão."}}

## Próximo mês

{{o que está planejado ou sugerido — 1 a 2 itens}}

Qualquer ajuste ou dúvida, me chama pelo canal combinado.

---

## Nota de uso (não faz parte do documento enviado ao cliente)

- Este relatório é o entregável que o catálogo Stripe já promete no plano Pro
  (`stripe-catalogo-produtos-irbis.md:34`). Sem ele, a assinatura Pro vende algo que não existe
  como processo — priorize este documento antes de fechar o próximo Pro.
- Se o cliente não tem GA4 configurado, isso é sinal pra oferecer configurar como parte do
  próximo ciclo, não motivo pra pular o relatório — a seção "O que fizemos" continua valendo
  mesmo sem números.
- Guarde uma cópia de cada relatório enviado — é a munição do D+30/D+90/D+150 e do pedido de
  indicação (F7 do método de entrega).
- Onde guardar a cópia mensal ainda não tem pasta definida no esqueleto do método
  (`02-plano/` a `07-encerramento/` cobrem o ciclo de entrega, não a recorrência pós-carteira)
  — decidir com o dono antes do primeiro envio real.
