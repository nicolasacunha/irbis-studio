# Copy — Formulário de escopo pré-call (página /call)

> Rascunho para aprovação do Nicolas. Fase 1 do spec
> `docs/superpowers/specs/2026-07-14-funil-formulario-agendamento-design.md`.
> Lead chega aqui por link enviado pelo Nicolas depois de qualificado.
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
| Site atual | Site atual, se existir | Apoio: "Não tem? Sem problema. É sobre isso que a gente vai conversar." | Não |
| Canais de aquisição | De onde vêm seus clientes hoje? | Apoio: "Indicação, Instagram, Google, tráfego pago, ninguém sabe direito? Me conta como eles te acham." | **Sim** |
| Valor do cliente | Quanto vale um cliente novo pra você? | Apoio: "Ticket médio, ou quanto um cliente deixa ao longo do tempo. Um número aproximado já resolve. Me ajuda a mostrar na call o retorno que o site precisa dar." | **Sim** (obrigatório desde 15/jul — Nicolas: "saber isso me ajuda a montar o pricing") |

---

## Bloco 3 — Sobre o projeto

**Título do bloco:** Sobre o site que vamos construir

**P7. O que o site precisa fazer pelo seu negócio?** (múltipla escolha, obrigatória)
- [ ] Vender direto, com pagamento no site
- [ ] Gerar pedidos de orçamento e contato
- [ ] Agendar reuniões ou serviços
- [ ] Apresentar a empresa com credibilidade
- [ ] Mostrar portfólio e trabalhos
- [ ] Outro: _________

**P8. O que mais te incomoda hoje?** (múltipla escolha, obrigatória)
- [ ] Cliente não me acha no Google
- [ ] O site que tenho (ou a falta dele) não passa a credibilidade que meu negócio tem
- [ ] Dependo de indicação e queria atrair cliente sozinho
- [ ] Outro: _________

**P9. Pra quando você precisa do site no ar?** (texto livre, obrigatório)
Apoio: "Quanto mais contexto, melhor. Tem lançamento, campanha ou evento puxando essa data? Me conta."

**P10. Quanto você pretende investir no site?** (texto livre, OPCIONAL)
Apoio: "Opcional. Me ajuda a chegar na call com uma proposta no tamanho certo pro seu momento."

> Decisão do Nicolas (14/jul): prazo e orçamento em texto livre, sem faixas.
> Quanto mais o lead escreve, mais munição pra call.

**P11. Já tem logo, fotos ou referências?** (upload, opcional)
Apoio: "Manda aqui: logo, materiais da marca, sites que você admira, prints de referência. Tudo que me ajudar a chegar na call já com a sua marca na cabeça."
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
