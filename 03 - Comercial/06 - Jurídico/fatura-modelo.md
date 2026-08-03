# Fatura de Cobrança — Modelo IRBIS

Modelo IRBIS para formalizar uma cobrança **antes** do pagamento, enquanto Nicolas Cunha presta
serviço como pessoa física, sem CNPJ. Este documento **não é nota fiscal**: formaliza a cobrança
antes do pagamento cair. Depois que o valor cair, o documento que formaliza o recebimento é o
recibo RPA (`rpa-recibo-modelo.md`). Quando o CNPJ existir, este modelo é substituído por fatura
com nota fiscal atrelada, e deixa de ser usado como está.

---

## Fatura nº {{numero_fatura}}

**Prestador:** {{NOME_PRESTADOR}} — CPF {{CPF_PRESTADOR}} — {{ENDERECO_PRESTADOR}}
**Cliente:** {{RAZAO_SOCIAL_TOMADOR}} — CNPJ {{CNPJ_TOMADOR}} — {{ENDERECO_TOMADOR}}

**Referente a:** {{projeto}} (contrato de {{data_contrato}})
**Parcela:** {{parcela n de N — marco: entrada/homologação/entrega}}
**Data de emissão:** {{data_emissao}}
**Vencimento:** {{data_vencimento}}

| Serviço | Tipo | Qtd | Valor unit. | Total |
|---|---|---|---|---|
| {{ex: Setup — Criação de Site}} | Único | 1 | {{R$ x}} | {{R$ x}} |
| {{ex: Acompanhamento Pro}} | Mensal | 1 | {{R$ x}} | {{R$ x}} |
| {{ex: Gerenciamento de Infraestrutura}} | Mensal (add-on) | 1 | {{R$ x}} | {{R$ x}} |

**Total:** {{R$ total}}

**Forma de pagamento:** PIX — chave {{chave_pix}}

**Observação:** Este documento não substitui nota fiscal. Pagamento a pessoa física, sujeito às
retenções aplicáveis pela empresa tomadora — o contador da empresa apura as retenções conforme
a legislação aplicável.

---

## Nota de uso (não faz parte do documento enviado ao cliente)

- A orientação detalhada pro contador do cliente sobre retenções está em
  `rpa-recibo-modelo.md`, Parte 2 — envie esse trecho separadamente se o contador pedir, não
  precisa ir junto com a fatura.
- Nunca cite cláusula, multa, juros ou rescisão nesta fatura — mesma regra do `irbis-cobrar`
  (seção Proibições): fatura só afirma o fato (o quê, quanto, quando), nunca ameaça.
- Antes de enviar, confira no Open Finance se já não existe um crédito não conciliado do mesmo
  valor (mesma trava anti-cobrar-quem-pagou do `irbis-cobrar`, Passo 1) — não emita fatura pra
  quem já pagou.
- Depois de recebido o PIX referente a esta fatura, preencha `rpa-recibo-modelo.md` (Parte 1)
  com os mesmos dados — a fatura e o recibo devem bater em valor e referência.
