---
name: irbis-fechar-semana
description: "Monta o placar semanal da IRBIS com dado do Supabase, não com memória: funil com delta, higiene (bloqueia se houver post-mortem pendente), saúde do sistema, os 3 fios que decidem a semana, checkpoint de higiene de IA, e um veredicto honesto de uma linha. Use na rotina de fechamento de sexta, ou quando o Nicolas disser '/fechar-semana', 'como foi a semana', 'placar da semana'."
---

# IRBIS — `/fechar-semana` (Supabase, Fase 6)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Spec completa: `irbis-os/fases/FASE-6-conhecimento.md`,
seção 2. **Regra de honestidade, acima de tudo:** semana fraca, o relatório abre dizendo isso,
com o número. Nunca "semana produtiva com bons avanços" — isso destrói a série histórica.

## 1. Ler tudo primeiro (Fronteira dos Dados completa)

```
GET /rest/v1/interacoes?select=*&data=gte.{{semana_inicio}}
GET /rest/v1/pipeline?select=*,pessoas(nome)
GET /rest/v1/propostas?select=*,pessoas(nome)&data_envio=gte.{{semana_inicio}}
GET /rest/v1/propostas?select=*&status=in.(aceita,recusada,expirada)&post_mortem=is.null
GET /rest/v1/financeiro?select=*&status=eq.a receber
GET /rest/v1/projetos?select=*,marcos(*)&travado_por=not.is.null
```

## 2. O placar — só números com fonte

```
Contatos novos: {{n}} · Respostas: {{n}} · Reuniões agendadas: {{n}}
Reuniões realizadas: {{n}} (comparecimento {{%}})
  das quais NÃO vieram de indicação: {{n}}   ← a métrica que o Nicolas persegue
Propostas enviadas: {{n}}, R${{x}} · decididas: {{ganhas}}/{{perdidas}} · Fechamentos: {{n}}
Entradas recebidas: R${{x}}
```

Linha sem fonte vira `cego`, nunca `0`. Zero e cego são fatos diferentes: zero é "consultei e
não achei nada", cego é "não consegui consultar".

## 3. O funil, com delta

Não mostre só o estado, mostre o que mudou: `levantamento: 3 (−1: 1 avançou, 0 morreu)`.
Conversão entre estágios só entra com 10+ eventos no período — com menos, mostre contagem
crua e diga que percentual ali é ruído.

## 4. Higiene (checklist, um bloqueia)

```
[ ] cards sem próximo passo .................. {{n}}  (o banco já impede isso — deve ser 0)
[ ] degraus vencidos não executados .......... {{n}}
[ ] propostas decididas sem post-mortem ...... {{n}}  ← BLOQUEIA o fechamento
[ ] projetos travados além do corte .......... {{n}}
[ ] clientes além do corte de carteira ....... {{n}}  (meta: 0)
[ ] parcelas vencidas sem cobrança ........... {{n}}
[ ] pessoas na agenda fora do pipeline ....... {{n}}
```

**Se houver proposta decidida sem post-mortem, PARE aqui.** Faça a pergunta ali mesmo, uma de
cada vez: "O que decidiu? O fato específico, não a categoria." Só continue o fechamento depois
de registrar a resposta (ou de ele explicitamente pular).

## 5. Saúde do sistema (medida, não sentida)

```
% interações automáticas vs manual (vigia vs registrar) ...... {{%}}
  (abaixo de 50%, o sistema está apoiado na disciplina do Nicolas — risco nº 1)
leads ativos com último contato em canal cego ................ {{n}}/{{m}}
tempo médio call → follow-up aprovado ......................... {{min}}
rascunhos aprovados SEM edição ................................ {{%}}
  (proxy de qualidade da voz — se ele edita 80%, o módulo de voz está calibrado errado)
fila de aprovações parada há mais de 48h ...................... {{n}}
% de rotinas desta semana com fonte 100% viva .................. {{%}}  (meta: 100)

DESVIO DE PRAZO
institucional: prometido 2 a 3 semanas · últimas 3 entregas: {{x}}, {{y}}, {{z}}
⚠ se a média passar de 3 semanas: vira decisão (acelerar processo ou mudar a vitrine)
```

## 6. Os 3 fios que decidem a próxima semana

Não a lista de tudo — os três que, se andarem, mudam o mês. Cada um: estado, próximo
movimento, data. Se algum estiver parado além do teto, anexe o rascunho do degrau
(via `irbis-leads-parados-supabase`).

## 7. Checkpoint de higiene de IA

1. Teve sessão longa ou multi-tópico essa semana?
2. Alguma tarefa repetitiva que devia virar rotina em vez de sessão manual?

O que sair aqui vira decisão a registrar, não observação solta.

## 8. Uma linha da biblioteca

Convoque `irbis-biblioteca` (seção "máquina de melhoria contínua") pra saber se algum padrão
de objeção acumulou 3+ ocorrências esta semana. Uma linha só: quantos padrões abertos, se
algum bateu o gatilho.

## 9. O veredicto (obrigatório, uma linha)

O que o Nicolas lê se ler só uma coisa. Números antes de adjetivo, sem suavizar:

```
Semana de 0 reunião realizada e 1 proposta parada há 11 dias. O gargalo é fechamento.
```

ou

```
2 fechamentos e R$ 3,6k de entrada. O risco agora é entrega: 3 projetos e 1 travado há 5 dias.
```

## Proibições

Não montar de memória nem "com base no que sabemos". Não converter `cego` em `0`. Não
calcular conversão sobre menos de 10 eventos. **Não parabenizar, não consolar.** Não fechar
com post-mortem pendente sem pelo menos ter feito a pergunta.
