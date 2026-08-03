---
peça: Relatório mensal
versão: v1.0
data: 2026-08-03
mudou da anterior: primeira versão
sai quando: todo dia {{dia fixo combinado, ex: 5}} do mês, para clientes nos planos Pro e Premium
---

# Relatório mensal — {{projeto}} · {{mês}}/{{ano}}

{{primeiro_nome}}, seguem os números e o que mexemos em {{mês}}.

## O que fizemos neste mês

| Pedido | Data | Status |
|---|---|---|
| {{descrição do pedido 1}} | {{data}} | {{feito/em fila}} |
| {{descrição do pedido 2}} | {{data}} | {{feito/em fila}} |

Rodadas do pacote usadas: {{n}} de {{limite do plano}}.

## Números do site

{{Se o site tem GA4 configurado: preencher a tabela abaixo com os eventos canônicos
(call_booked, call_step_view, inbound_form_submit). Se o site não tem GA4 configurado: apagar
a tabela e escrever só a frase "Analytics ainda não configurado neste site — sem números pra
reportar este mês."}}

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
