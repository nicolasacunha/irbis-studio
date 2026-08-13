# 🧭 Processo Completo de Outbound — IRBIS

> Criado em 13/ago/2026. Este documento não substitui nenhum script existente — ele é o **mapa que conecta todos eles**, do primeiro toque até o pipeline no Notion. Cada etapa abaixo aponta pro arquivo que tem o texto completo daquela etapa.
>
> A variante FSAE/e-racing **não é um processo separado** — ela só troca o gancho da Etapa 1 (Abertura). Tudo depois disso (resposta sim/não, agendamento, reunião, follow-up) é exatamente o mesmo fluxo de qualquer outbound da IRBIS.

---

## Visão geral do fluxo

```
FONTE DO LEAD
   ├── Frio (Phantom/Instagram/rede, sem contato prévio)  → HUNTER (Etapa 1)
   ├── Indicação (cliente satisfeito indicou alguém)        → AGENDAMENTO (Etapa 1B)
   └── Rede FSAE/e-racing (já patrocinou ou foi prospectado)→ HUNTER, gancho FSAE (Etapa 1)

ETAPA 1 — ABERTURA (DM/WhatsApp ou ligação)
        ↓
ETAPA 2 — RESPOSTA DO LEAD (sim / não / silêncio)
        ↓                              ↓
   ETAPA 3 — AGENDAMENTO          ESCADA DE FOLLOW-UP
        ↓                         (estágio A: prospecção fria)
   ETAPA 4 — REUNIÃO
        ↓
   ETAPA 5 — PROPOSTA
        ↓
   ESCADA DE FOLLOW-UP
   (estágio B: proposta na mesa)
        ↓
   FECHOU → onboarding        NÃO FECHOU → estágio C ou breakup
```

---

## Etapa 1 — Abertura (prospecção ativa)

**Canal:** DM/WhatsApp/Instagram (Hunter) ou ligação fria (Cold Call).
**Objetivo:** gerar curiosidade + conduzir pra reunião. **Nunca vender no chat/na ligação.**

| Fonte do lead | Script completo | Gancho |
|---|---|---|
| Frio, lista genérica (Phantom/Instagram) | `script-hunter-irbis.md` | Operação manual visível, crescimento público, ou abertura genérica (moderação) |
| Frio, negócio da lista sem cadastro prévio | `script-cold-call-irbis.md` | Estrutura SPIN completa, ligação de 10-12 min, agenda ao final |
| Rede FSAE/e-racing Unicamp | `script-abordagem-fsae-eracing-irbis.md` | Vínculo real e verificável (patrocínio ou prospecção passada da equipe) — usa a tabela de 4 grupos em `grupos-abordagem-fsae-irbis.xlsx` pra saber qual mensagem cabe em cada empresa |

**Regra fixa em todas as variantes (JDP):** nenhuma mensagem enviada ao lead usa travessão (—). Personalização mínima obrigatória — nunca manda a mesma mensagem sem trocar ao menos um detalhe real do negócio.

---

## Etapa 2 — Resposta do lead (sim / não / silêncio)

Isso vale pra qualquer abertura (genérica, cold call ou FSAE) — é o primeiro garfo de decisão depois que o lead responde.

**Se disse sim / demonstrou interesse:**
```
Boa, [nome]! Que bom. Vou te mandar dois ou três horários essa semana pra gente bater um papo rápido, sem compromisso. Qual período costuma ser melhor pra você, manhã ou tarde?
```
→ segue direto pra **Etapa 3 (Agendamento)**.

**Se disse não / não é o momento:**
```
Sem problema, [nome], entendo total. Fico à disposição se mudar de ideia lá na frente. Só uma pergunta rápida: faz sentido eu te chamar de novo daqui uns meses, ou prefere que eu não insista?
```
→ registra o motivo, encerra a escada na hora (regra 5 da escada de follow-up) ou marca retorno futuro se ele topar.

**Se não respondeu nada:**
→ não manda nada novo agora. Isso é gerido pela **Escada de Follow-up**, estágio A (prospecção fria), começando no D+3 — nunca insiste no mesmo dia.

---

## Etapa 3 — Agendamento

**Quando usar:** lead disse sim na Etapa 2, **ou** lead veio de indicação (pula direto pra cá, sem passar pela Etapa 1 de Hunter).

**Script completo:** `script-agendamento-irbis.md`

Resumo do fluxo: abordagem inicial → motivo do contato (cita quem indicou, se for o caso) → transição pro pitch → oferece 2-3 horários → registra no pipeline do Notion (Estágio: Reunião agendada) → convite no Google Agenda → confirmação de véspera → reminder 1h30 antes.

**Regra fixa:** não vende no agendamento, só marca. Preço e escopo nascem na reunião.

---

## Etapa 4 — Reunião comercial

Reunião única: diagnóstico → apresentação fantástica → proposta apresentada ao vivo, com espaço pra fechar ali (modelo validado no Plano de 7 Dias do Grupo JDP). Preço calibrado ao vivo pela pergunta de valor — ver `calculadora-preco-build-irbis.md`.

> Este documento não repete o roteiro de condução da reunião em si — isso vive em `script-call-comercial-junho-2026.md` (ainda em reescrita, conforme banner no `script-hunter-irbis.md`).

---

## Etapa 5 — Proposta e follow-up pós-reunião

Depois da reunião, o lead entra num dos três sub-estágios da **Escada de Follow-up** (`escada-follow-up-irbis.md`):

- **B — Proposta na mesa:** áudio D+0 recapitulando o combinado, proposta escrita em até 24h, ligação D+7 com pergunta fechada ("o que ficou faltando pra ser sim?"), isolamento de objeção no D+14, breakup com porta aberta no D+21.
- **C — Sem proposta (reprovou triagem ou não é o momento):** agradece no D+0, conteúdo útil no D+7, pergunta de gatilho no D+21 — sem pressão, porque não é questão de timing.
- **D — Indicação:** contato em até 24h citando quem indicou, toque de volta em quem indicou no D+3, ligação no D+7, breakup só com o indicado (nunca com quem indicou).

Regra que vale pra todos os estágios: **um "não" explícito encerra a escada na hora**, em qualquer degrau. Todo toque vira linha em `interacoes` no Supabase, no mesmo dia.

---

## Onde a rede FSAE/e-racing entra nesse mapa

A única diferença real: a **fonte do lead** e o **gancho da Etapa 1**. A partir da Etapa 2 em diante — sim/não, agendamento, reunião, escada de follow-up — é o processo padrão da IRBIS, sem nenhuma adaptação adicional. Isso inclui os casos específicos da rede FSAE:

- Empresa já patrocinou, contato conhecido (Grupo 1 da planilha) → abertura com gancho real → Etapa 2 em diante, padrão.
- Empresa já patrocinou, sem contato (Grupo 2) → abertura pede o decisor, não vende nada → depois de identificar a pessoa, reabre com a mensagem do Grupo 1 → Etapa 2 em diante, padrão.
- Nunca fechou, nome encontrado (Grupo 3) ou sem nome (Grupo 4) → mesma lógica, gancho mais fraco no Grupo 4.

---

## Registro (obrigatório em toda etapa)

- Planilha/pipeline do Notion: Estágio + Origem (Outbound / Cold Call / Indicação / FSAE-e-racing).
- Toda mensagem de follow-up disparada vira linha em `interacoes` no mesmo dia — sem isso a revisão semanal mede preparação em vez de conversão.
