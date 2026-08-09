# 💵 Calculadora de Preço — IRBIS

> Como definir o preço de um projeto de Sistemas (build sob medida, preço cheio).

> ⚠️ **Atualização 04/ago/2026 — REESTRUTURADO, VALORES PENDENTES.** Este doc era "Calculadora de Preço do Build (site)". Site saiu do escopo (ver `CLAUDE.md` seção IDENTITY). A lógica de precificação por valor (não por hora) é filosofia de negócio, não é específica de site, e mantive ela como está. **Os números — faixas em R$, referências de mercado (freelancer/agência) — eram calibrados pro mercado de site e não migram automaticamente pra Sistemas.** Precisam ser recalibrados com o dono antes de qualquer proposta usar essa tabela. Versão original (faixas de site) preservada no fim como histórico.

## Regra de ouro

O preço de um sistema **não é sobre o sistema. É sobre o que o sistema faz pelo negócio do cliente.** O mesmo esforço técnico vale menos pra um e mais pra outro, dependendo de quanto o negócio depende daquele sistema pra operar ou vender.

Nunca precificar por esforço/hora. Cost-plus pune eficiência, ancora contra freelancer e ignora o cliente.

---

## Passo 1 — Ancorar pelo tipo (piso técnico)

⚠️ **PENDENTE.** A tabela de site tinha 4 faixas (landing / institucional / com integrações / e-commerce) de R$ 1.997 a R$ 12k+. Sistemas provavelmente precisa de uma escala diferente — por exemplo automação simples / sistema modular / sistema com múltiplas integrações / sistema completo de operação — mas eu não tenho base pra inventar os números-piso de cada faixa. Preciso do dono pra definir a escala nova.

| Tipo (rascunho — nomes e faixas pendentes) | Faixa-base |
|---|---|
| [a definir] | PENDENTE |
| [a definir] | PENDENTE |
| [a definir] | PENDENTE |
| [a definir] | PENDENTE |

## Passo 2 — Mover dentro da faixa (a pergunta que calibra)

Na call, perguntar: **"Quanto essa operação te custa hoje — em tempo, retrabalho ou venda perdida — por não estar sistematizada?"**

- **O sistema resolve um gargalo central da operação** (processo que trava o negócio inteiro, ou que consome horas do dono todo dia) → topo da faixa **ou acima**. O sistema se paga rápido, o teto de valor é alto.
- **O sistema é conveniência/organização** (melhora processo que já funciona, não desbloqueia nada crítico) → base da faixa.

*(Lógica adaptada da versão de site — "site é canal de venda principal" virou "sistema resolve gargalo central". Mesma estrutura de pergunta, conteúdo ajustado.)*

## Passo 3 — Calibrar por porte

Mesmo escopo, cliente maior paga mais. Não é injustiça: é capacidade de pagar e de extrair valor.

## Passo 4 — Modificadores de escopo

Cada item empurra o preço pra cima dentro (ou acima) da faixa:
- Cada integração (com sistema já existente do cliente, API externa, etc.)
- Volume de dados/processos migrados
- Prazo apertado
- Necessidade de treinar a equipe do cliente pra usar o sistema

---

## As duas travas

1. **Nunca cotar por hora nem mostrar "quantas horas".** Sempre valor fechado. Falou em hora, virou freelancer na cabeça do cliente.
2. **Piso da IRBIS: acima de freelancer, abaixo de agência/consultoria de software.** ⚠️ **PENDENTE** — a v1 usava GetNinjas (R$ 800–1.500) e agência de site (R$ 15k+) como referência de mercado. Isso não é o mercado de Sistemas/IA sob medida; a referência de piso e teto precisa ser levantada de novo (dev freelancer, consultoria de automação, agência de software) antes de valer como âncora.

---

## Resumo pra call

1. Antes da call, já sei a **faixa pelo tipo** de projeto — quando a tabela do Passo 1 estiver preenchida.
2. Na call, a pergunta do Passo 2 me diz se fico na **base ou no topo**.
3. Porte e modificadores ajustam o número final.
4. Cota **valor fechado**, nunca hora.

---

## Histórico — versão site (vigente até 04/ago/2026, fora de escopo)

**Passo 1 (site):** Landing única R$ 1.997–2.997 · Institucional (3–6 páginas) R$ 3.497–6.497 · Com integrações R$ 6.997–11.997 · E-commerce/sistema R$ 12k+. Referência: build padrão IRBIS (R$ 4.497) no meio da faixa institucional.

**Passo 2 (site):** pergunta era "De onde vêm seus clientes hoje, e quanto vale um cliente novo pra você?" — site como canal de venda principal (topo) vs. cartão de visitas (base).

**Trava 2 (site):** freelancer GetNinjas R$ 800–1.500, agência R$ 15k+.
