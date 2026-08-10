# Copy — Formulário de escopo pré-call (página /call)

> ✅ **REESCRITO em 09/ago/2026, pronto pra usar como copy.** Substitui a versão de site (histórico preservado no fim do arquivo). Bloco 3 (perguntas de projeto) reescrito pra Sistemas/Soluções com IA/Consultoria de IA.
> 🛑 **Ressalva: este é o texto-fonte, não a página em produção.** Se `/call` já está no ar com o texto antigo (o quiz de diagnóstico menciona a página como "verificado em produção em 28/jul"), a página em si (HTML/form builder) também precisa ser atualizada — não confirmei isso nesta rodada, é trabalho separado de site, não de doc.

> Rascunho para aprovação do Nicolas. Fase 1 do spec
> `docs/superpowers/specs/2026-07-14-funil-formulario-agendamento-design.md`.
> Lead chega aqui por link enviado pelo Nicolas (ou pelo colaborador comercial) depois de qualificado.
> Ao enviar, a agenda própria abre na mesma página. Call: 1h, Google Meet.

---

## Topo da página

**Headline (caps, sem ponto final):**
ANTES DA NOSSA CONVERSA

**Subheadline:**
3 minutos aqui, e eu chego na call com o diagnóstico do seu caso pronto. Você sai da conversa com projeto e prazo definidos.

---

## Bloco 1 — Sobre você

**Título do bloco:** Sobre você

| Campo | Label | Placeholder / apoio | Obrigatório |
|---|---|---|---|
| Nome | Seu nome | Nome e sobrenome | Sim |
| Email | Email | voce@suaempresa.com.br | Sim |
| WhatsApp | WhatsApp | (11) 99999-9999 · Apoio: "É por aqui que eu confirmo a call." | Sim |

---

## Bloco 2 — Sobre o negócio

**Título do bloco:** Sobre o seu negócio

| Campo | Label | Placeholder / apoio | Obrigatório |
|---|---|---|---|
| Nome do negócio | Nome do negócio | | Sim |
| Descrição | O que vocês fazem? | Apoio: "Uma ou duas linhas, do jeito que você explica pra um cliente." | Sim |
| Sistema/ferramenta atual | Já usam algum sistema, CRM ou ferramenta pra organizar a operação? | Apoio: "Não tem nada? Sem problema. É sobre isso que a gente vai conversar." | Não |
| Canais de aquisição | De onde vêm seus clientes hoje? | Apoio: "Indicação, Instagram, Google, tráfego pago, ninguém sabe direito? Me conta como eles te acham." | **Sim** |
| Valor do cliente | Quanto vale um cliente novo pra você? | Apoio: "Ticket médio, ou quanto um cliente deixa ao longo do tempo. Um número aproximado já resolve. Me ajuda a mostrar na call o retorno que o projeto precisa dar." | **Sim** (obrigatório desde 15/jul — Nicolas: "saber isso me ajuda a montar o pricing") |

---

## Bloco 3 — Sobre o projeto

**Título do bloco:** Sobre o que vamos construir

**P7. O que você precisa resolver na operação?** (múltipla escolha, obrigatória)
- [ ] Organizar processo, dado ou cliente num sistema (CRM/ERP/sistema sob medida)
- [ ] Automatizar tarefa repetitiva com IA (atendimento, agendamento, follow-up)
- [ ] Diagnóstico de como usar IA no negócio — ainda não sei por onde começar
- [ ] Outro: _________

**P8. O que mais te incomoda hoje?** (múltipla escolha, obrigatória)
- [ ] Processo ainda é manual — planilha, WhatsApp, gente lembrando na cabeça
- [ ] Tenho sistemas, mas eles não conversam entre si
- [ ] Sei que IA pode ajudar, mas não sei por onde começar
- [ ] Outro: _________

**P9. Pra quando você precisa disso rodando?** (texto livre, obrigatório)
Apoio: "Quanto mais contexto, melhor. Tem crescimento, contratação ou momento puxando essa data? Me conta."

**P10. Quanto você pretende investir?** (texto livre, OPCIONAL)
Apoio: "Opcional. Me ajuda a chegar na call com uma proposta no tamanho certo pro seu momento."

> Decisão do Nicolas (14/jul): prazo e orçamento em texto livre, sem faixas.
> Quanto mais o lead escreve, mais munição pra call.

**P11. Tem algum material que ajude (planilha atual, print do processo, referência)?** (upload, opcional)
Apoio: "Manda aqui: planilha que usa hoje, print de como o processo funciona, exemplo de sistema que você admira. Tudo que me ajudar a chegar na call já com o seu caso na cabeça."
Botão: **Anexar arquivos**

**P12. Quem decide esse projeto com você?** (escolha única, obrigatória)
- ( ) Decido sozinho
- ( ) Sócio
- ( ) Esposa ou marido
- ( ) Outra pessoa: _________

Apoio (aparece se marcar qualquer opção que não seja "sozinho"):
"Então essa pessoa precisa estar na call. É o que faz a conversa valer pra vocês dois: decisão na hora, sem telefone sem fio."

**P13. Algo que eu deva saber antes da nossa conversa?** (texto livre, opcional)

---

## Botão de envio

**CONTINUAR PRO HORÁRIO**

---

## Tela de agendamento (mesma página, após envio)

**Headline:** ÚLTIMA ETAPA

**Sub:** Escolhe o melhor horário pra você. A call é de 1 hora, no Google Meet, direto comigo.

**Nota de fuso (discreta):** Horários já no seu fuso.

**Botão de confirmação:** CONFIRMAR CALL

---

## Confirmação (email ao lead após agendar + redirect pra /obrigado)

"Fechado, {primeiro nome}. Nossa call está marcada. {data}, às {hora}. Duração: 1 hora, Google Meet. Te mando o link do Google Meet no WhatsApp um pouco antes da call. Qualquer coisa antes disso, me chama no WhatsApp. Nicolas"

> Meet é manual (decisão do Nicolas 14/jul): ele envia o link na hora da call, como parte do processo anti-no-show. A confirmação não promete link no convite.

---

## Mensagens de estado (microcopy funcional)

| Situação | Mensagem |
|---|---|
| Campo obrigatório vazio | "Preciso dessa resposta pra seguir." |
| Email inválido | "Confere esse email? Parece incompleto." |
| Arquivo grande demais | "Esse arquivo passou de [X]MB. Comprime ou manda um link no campo livre." |
| Horário tomado por outro lead no meio do caminho | "Esse horário acabou de ser preenchido. Escolhe outro?" |
| Erro de envio | "Algo falhou aqui do meu lado. Tenta de novo ou me chama no WhatsApp." |

---

## Checklist de voz (rodado antes de entregar)

- Sem travessão em toda a peça (regra JDP)
- Sem palavras banidas, sem emoji, sem CTA genérico
- Nenhum preço ou prazo da IRBIS citado (só perguntas sobre o lead)
- Assinatura "Nicolas" na confirmação
- Vocabulário leigo, founder com founder

---

## Histórico — versão site (vigente até 04/ago/2026, fora de escopo)

**Bloco 2, campo "Site atual":** perguntava o site atual do lead, se existisse.

**Bloco 3 (P7-P8), inteiro sobre site:** "O que o site precisa fazer pelo seu negócio?" (vender direto, gerar orçamento, agendar, apresentar credibilidade, mostrar portfólio) e "O que mais te incomoda hoje?" (cliente não acha no Google, site não passa credibilidade, depende de indicação).

**P11:** pedia logo, materiais de marca e sites de referência — fazia sentido pro escopo de site/identidade visual.
