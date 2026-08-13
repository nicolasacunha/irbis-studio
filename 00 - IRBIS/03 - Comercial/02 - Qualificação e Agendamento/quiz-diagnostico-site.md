# 🧭 Quiz de Diagnóstico + Funil de DM — IRBIS

> ✅ **REESCRITO em 09/ago/2026, pronto pra usar.** Substitui a versão de site (histórico preservado no fim do arquivo). CTA, ICP e as 5 perguntas do quiz atualizados conforme `CLAUDE.md` e `onboarding-comercial-novo-colaborador.md`. Mecanismo (CTA → ManyChat → quiz → agendamento) e infra do `/call` preservados sem mudança.

> Adaptado do mecanismo de funil do "prompt coringa", sem o que não serve (persona fake, infoproduto, saúde). Objetivo final: **agendar a reunião de diagnóstico**, não vender ebook.

## O mecanismo (como funciona)

1. Todo conteúdo termina com a mesma CTA: **"manda IA no direct"** (palavra-chave fixa).
2. A automação (ManyChat ou similar) responde na hora com o **link do quiz**.
3. O quiz qualifica o dono do negócio e entrega um **diagnóstico personalizado**.
4. CTA final do quiz: **agendar a reunião de diagnóstico** (link do calendário) ou voltar pro seu direct.
5. As marcas de **"lead quente"** em cada pergunta te ajudam a priorizar quem puxar primeiro pra call.

---

## O quiz (5 perguntas)

**1. Como está a operação do seu negócio hoje?**
- A) Ainda é tudo manual — planilha, WhatsApp, gente lembrando na cabeça 🔥
- B) Tenho alguns sistemas, mas eles não conversam entre si 🔥
- C) Já é bem estruturada, quero usar IA pra ir além
> Quente: A e B (dor operacional clara). C também é bom lead (quer evoluir com IA).

**2. Você sabe quanto isso te custa hoje (tempo, retrabalho ou oportunidade perdida)?**
- A) Não faço ideia, nunca medi
- B) Sinto que perco bastante, mas não parei pra calcular 🔥
- C) Já meço, e quero reduzir ainda mais
> Quente: B (sente a dor no bolso, mas ainda não agiu).

**3. Qual o momento do seu negócio?**
- A) Tô começando agora
- B) Tô crescendo e o processo ficou pra trás 🔥
- C) Tô estável e quero escalar com sistema e IA 🔥
> Quente: B e C (urgência e caixa).

**4. O que mais te incomoda hoje?**
- A) Meu time gasta tempo demais com tarefa repetitiva que dava pra automatizar
- B) A informação do negócio tá espalhada e isso trava minha decisão
- C) Sei que IA pode ajudar, mas não sei por onde começar
> Todas são dor. Serve pra você saber por qual frente conduzir a conversa (A → Soluções com IA, B → Sistemas, C → Consultoria de IA).

**5. Sobre tirar isso do papel:**
- A) Sou eu quem decide e tô pronto pra resolver agora 🔥
- B) Decido eu, mas tô avaliando o momento
- C) Preciso alinhar com sócio
> Quente: A (decisor e pronto). B e C entram em follow-up.

> **Leitura rápida:** 3 ou mais 🔥 = lead quente, puxa pra call em até 24h. 1 ou 2 = nutre e faz follow-up.

---

## Diagnóstico final (3 variações por perfil)

**Perfil Sistemas — operação manual ou desconectada, crescendo (quente):**
> Pelo que você respondeu, a sua operação tá custando tempo e dinheiro todo mês que passa sem ser sistematizada. E você tá no momento certo pra resolver isso. Bora marcar 30 minutos pra eu te mostrar exatamente o que dá pra fazer no seu caso.

**Perfil Soluções com IA — processo repetitivo, quer automação:**
> Você já identificou onde o time perde tempo com tarefa repetitiva — isso é exatamente o tipo de coisa que automação e agente de IA resolvem sem você precisar contratar mais gente. Vamos conversar sobre como aplicar isso na sua operação numa call rápida.

**Perfil Consultoria de IA — quer usar IA mas não sabe por onde começar:**
> Você sabe que IA pode ajudar seu negócio, só falta clareza de por onde começar — é exatamente pra isso que existe o diagnóstico de consultoria. Vale a gente alinhar o caminho numa conversa de 20 minutos, sem compromisso.

**CTA final (todas):**
> 👉 Agenda aqui: https://irbis.com.br/call
> Ou volta no meu direct e manda "bora" que eu te passo os horários.

> **Regra de uso do link (28/jul/2026):** o `/call` é `noindex` e fora do menu **por design** — ele não é destino público. Mande o link **só depois** da leitura do quiz (3+ 🔥 = lead quente). Para 1–2 🔥, não mande: siga em nutrição/follow-up. Quem preenche o formulário do `/call` cai direto na sua agenda, então o link é o último passo da qualificação, não o primeiro.
> Verificado em produção em 28/jul: a página responde, a grade puxa horários reais do Google Calendar, e o agendamento cria o evento.

---

> Os roteiros de conteúdo que alimentam esse funil são da P2 (com o JDP) — **ainda não revisados nesta auditoria**, confira o banner deles antes de publicar algo. Este doc é só o mecanismo comercial: palavra IA no direct → quiz → diagnóstico → reunião.

---

## Histórico — versão site (vigente até 04/ago/2026, fora de escopo)

> Mesmo mecanismo (CTA → ManyChat → quiz → agendamento), mas com CTA "manda SITE no direct" e as 5 perguntas todas sobre presença digital/site.

**1. Como está o site do seu negócio hoje?** — Não tenho site 🔥 / Tenho mas é fraco 🔥 / Tenho ok, quero evoluir.

**2. Seu site traz cliente hoje?** — Não faço ideia / Sinto que quase não traz 🔥 / Traz, mas quero mais.

**3. Qual o momento do seu negócio?** — Começando / Crescendo e o site ficou pra trás 🔥 / Estável, quero escalar 🔥.

**4. O que mais te incomoda hoje?** — Cliente não me acha no Google / Site não passa credibilidade / Dependo de indicação.

**5. Sobre tirar isso do papel:** — mesma estrutura de decisor (A/B/C) da versão atual.

Diagnósticos finais eram por "Sem site ou site fraco, crescendo", "Tem site ok, quer evoluir" e "Começando ou avaliando o momento" — todos focados em presença digital, não em operação/sistema.
