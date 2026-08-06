# Raio-X de Estrutura — {CLIENTE}

**Departamento:** {DEPARTAMENTO}
**Data da sessão:** {DATA}
**Participaram:** {NOMES}

## 1. Caixinhas

| Caixinha | Responsável | O que entrega |
|---|---|---|
| | | |

Marcar com ⚠ toda pessoa que aparece em mais de uma caixinha.

## 2. Jobs

Um bloco por caixinha. Campos obrigatórios, nesta ordem:

| job | quem | frequencia | horas_semana | precisa_decidir | sistemas | classificacao |
|---|---|---|---|---|---|---|
| | | | | | | |

**Regras dos campos:**
- `job` — verbo no infinitivo + objeto. "Digitar pedido do WhatsApp no ERP", nunca "atendimento".
- `frequencia` — `diária`, `semanal` ou `mensal`.
- `horas_semana` — decimal com uma casa. Quando o cliente não soube estimar nem por
  volume × duração, usar faixa `<1h`, `1-5h` ou `>5h`, sempre com `(estimado)`. Terceiro
  valor aceito: `—`, quando o job existe de verdade mas o tempo dele já está embutido em
  outro job já contado (não dá pra medir separado sem inventar um número). Job com `—`
  nunca entra na soma da Seção 3.
- `precisa_decidir` — `sim` ou `não`. Se alguém escolhe entre caminhos olhando o caso, é `sim`.
- `sistemas` — usar `→` quando o dado atravessa de um pro outro.
- `classificacao` — `100% IA`, `Humano + IA` ou `Humano lidera`.

## 3. A conta

**{N} horas por semana** em trabalho onde ninguém precisa decidir.

Entram na soma apenas jobs com `precisa_decidir = não` e `horas_semana` numérico.
Job sem hora numérica fica fora da conta e é listado à parte como não apurado —
tanto faixa estimada (`<1h`, `1-5h`, `>5h`) quanto `—` (tempo embutido em outro job).

Não apurados: {LISTA}

## 4. Ordem de ataque

Ranquear por horas × ausência de decisão ÷ esforço de construir.

1.
2.
3.

## 5. Primeiro agente

**Job escolhido:** {JOB}
**Por quê:** {HORAS} h/semana, sem decisão, e passa nos três cortes de viabilidade.
**O que ele faz:** {DESCRIÇÃO}
**Estado no fim da sessão:** {rodando | rascunhando sem enviar}
