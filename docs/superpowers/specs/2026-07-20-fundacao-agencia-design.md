# Fundação da agência IRBIS — Design

**Data:** 20/jul/2026
**Status:** aguardando revisão do Nicolas
**Contexto de decisão:** council de 20/jul ("pivot atrás de caixa", transcript em `negocios-geral/council-transcript-irbis-pivot-ia-20260720.md`). Nicolas declarou que montou a agência "rápido demais" e quer a fundação que nunca existiu. Abordagem aprovada: **fundação mínima puxada pela venda** — cada peça só entra na fila porque um evento real dos próximos 30 dias precisa dela. Nada de fundação pode atrasar as duas assinaturas do Tempo 1 (escritório da mãe + QG OS/Arialdo, até ~19/ago).

## Restrições de partida (fatos de 20/jul/2026)

- IRBIS **não tem CNPJ**; receita entra como PF. MEI está **bloqueado** (Nicolas participa de holding). LTDA não é bloqueada pela holding; enquadramento no Simples é pergunta para contador.
- **Sem caixa para desembolso antecipado** — a fundação se autofinancia: tudo que custa dinheiro é pago pela primeira entrada de cliente.
- Não existe nenhum modelo de contrato no repo (verificado por find em 20/jul).
- Nicolas opera solo; orçamento de fundação ~2–4h/semana, o resto é venda e entrega.
- Plano T3 (auditoria 06/jul) segue valendo; Banco MCP estava na lista de subtração — não recontratar ferramenta paga só para a fundação.

## Fase 1 — Assinar e poder receber (semana de 20/jul, custo R$ 0)

**Objetivo:** quando o Pimentel disser sim ou a mãe aprovar a proposta, existe papel pronto para assinar no dia e forma legal de receber a entrada.

| Entregável | Conteúdo | Quem faz |
|---|---|---|
| Modelo de contrato de prestação de serviços de software (5–6 págs) | Objeto por **anexo de escopo** (anexo QG OS já pronto: `02 - Projetos/QG Group/QG OS/escopo.md`; anexo da mãe entra quando a pesquisa dela terminar); pagamento com **entrada antes de codar** e marcos; **aditivo** (feature nova = cotação à parte, por escrito); manutenção (pacote mensal cobre só ajuste/correção; hora excedente definida — QG OS: R$ 180/h); confidencialidade + tratamento de dados (LGPD; crítico no escritório da mãe); **propriedade intelectual** (decisão pendente do Nicolas, ver "Decisões em aberto"); prazo, rescisão, foro. Este documento É o "agreement" (escopo, entregáveis, timeline, políticas) — não existe documento separado. | Claude redige (com skill `legal:review-contract` como auditoria interna); mãe revisa como advogada e primeira signatária; advogado empresarial conhecido = revisão paga opcional, quitada pela primeira entrada |
| Recibo de autônomo (RPA) + explicação de meia página para o tomador | Como a empresa cliente processa pagamento a PF (encargos, retenções) — vai pro contador da QG e pro financeiro do escritório | Claude redige |
| Mensagem ao contador conhecido (2 perguntas) | (1) Participação na holding impede Simples Nacional ao abrir LTDA? (2) RPA é o caminho certo para receber das duas empresas até o CNPJ existir? | Claude redige; Nicolas envia |
| Assinatura eletrônica | Gov.br (gratuita, válida juridicamente); sem DocuSign | Nicolas |

**Critério de conclusão:** modelo de contrato revisado e pronto para assinatura + resposta do contador. Meta: sexta 24/jul.

## Fase 2 — Dinheiro limpo (dispara quando a primeira entrada cair)

**Objetivo:** a partir da primeira entrada, dinheiro de cliente nunca mais se mistura com PIX de família; a receita da IRBIS vira número auditável (inclusive para o checkpoint do pivot em 30/set).

- Abrir **LTDA** com contador digital (Contabilizei/Agilize ou o conhecido): abertura tipicamente gratuita, mensalidade ~R$ 200 paga pela entrada. Enquadramento conforme resposta da Fase 1.
- **Conta PJ** gratuita (Inter/Nubank PJ). Todo recebimento de cliente entra na PJ; Nicolas se paga valor fixo mensal para a conta pessoal.
- **Emissão de NF** configurada com o contador; a partir daí clientes pagam contra nota (fim do RPA).
- **Registro:** conta PJ conectada via Open Finance ao Claude (conectores já disponíveis) SE o custo for zero ou a assinatura já estiver paga — Banco MCP estava na lista de subtração do T3, não recontratar só para isso. Fallback: extrato do app + consolidação pelo Claude sob demanda. Sem sistema financeiro complexo.
- **Invoice/fatura com identidade IRBIS:** template de recibo/fatura com a marca, usado por cima do RPA (Fase 1) e depois junto da NF. Resolve o item "invoice" do onboarding.

**Divisão:** contador faz quase tudo; Nicolas ~2h de cadastros; Claude entrega checklist na ordem + textos do que pedir ao contador.

**Critério de conclusão:** primeira NF emitida para um dos dois clientes fundadores.

## Fase 3 — Máquina comercial e onboarding (semanas 3–4, em paralelo com a venda)

**Objetivo:** o próximo lead de IA do G4 recebe o mesmo processo que fechou os dois primeiros; cliente que assina não esfria.

- **Proposta-modelo do novo escopo:** o PDF do QG OS vira template (problema do cliente → sistema proposto → escopo fechado → investimento → condições). A proposta da mãe é o primeiro teste do template.
- **Kit de onboarding pós-assinatura** (anti-remorso do comprador — o cliente assina e no mesmo dia recebe):
  1. **Documento de boas-vindas:** overview do projeto, o que acontece nos próximos 7/14/30 dias, canais e cadência de comunicação (onde falar, tempo de resposta), link do **portal do cliente**.
  2. **Portal do cliente:** Nicolas quer criar. **v1 = página simples por cliente** (status do projeto, próximos marcos, links) — NÃO é software novo; proibido virar projeto de engenharia antes das assinaturas. Versão robusta é candidata a Fase 4/produto.
  3. **Kickoff em até 48h da assinatura** + primeira entrega visível na semana 1 (mata o remorso com momentum, não com palavras).
  4. **Calls de estratégia recorrentes:** quinzenal ou mensal por cliente ativo, agendadas no onboarding.
- **Pipeline enxuto no CRM próprio** (funil /call): todo contato comercial com próximo passo e data.
- **Cadência de follow-up padrão documentada:** D+3 leve → D+7 contexto → D+10 ultimato (a escada do Pimentel vira o padrão).
- **Post-mortem de 15 min por proposta decidida** (ganhou ou perdeu): 3 perguntas respondidas e arquivadas em `03 - Comercial/`.

**Divisão:** Claude monta template de proposta, kit de onboarding, cadência e formato de post-mortem; Nicolas cria o portal v1 (com Claude) e alimenta o pipeline (5 min/dia).

**Critério de conclusão:** proposta da mãe gerada a partir do template + kit de onboarding usado num cliente real + pipeline com todos os leads vivos.

## Fase 4 — Oferta e rebranding (TRAVADA atrás das 2 assinaturas)

Só inicia quando mãe E QG OS estiverem assinados (gate do council de 20/jul). Conteúdo: oferta empacotada de IA (pacotes, pricing, SLA), posicionamento, rebranding do site, prospecção estruturada no G4 pago. Se nenhum contrato assinar até ~19/ago, esta fase morre e o escopo de sites continua. Design detalhado desta fase será feito quando o gate abrir — não agora.

## Decisões (resolvidas pelo Nicolas em 20/jul/2026)

1. **Propriedade intelectual — DECIDIDO (opção a):** o código é do cliente após quitação total. A monetização recorrente vem do **acompanhamento mensal em 2 pacotes** (mesmo modelo de recorrência da IRBIS em `03 - Comercial/04 - Entrega e Recorrência/planos-recorrencia-irbis.md`, adaptado a software: ajuste/correção + evolução). O contrato da Fase 1 reflete isso: cessão de código na quitação + oferta dos 2 pacotes de manutenção como cláusula/anexo.
2. **Enquadramento tributário — ADIADO** por decisão do Nicolas: define com o contador quando a resposta da Fase 1 chegar.
3. **Banco MCP — ATIVO e útil (dono, 20/jul):** registro da Fase 2 usa Open Finance/Banco MCP direto na conta PJ. Sai da lista de subtração.
4. **Portal do cliente — trava confirmada:** v1 = página simples por cliente nas Fases 1–3; a versão robusta é objetivo declarado do Nicolas para a Fase 4 (candidata a fazer parte da oferta).

## Riscos nomeados

- **Fundação como fuga:** o risco nº 1 (apontado pelo peer review do council). Mitigação: nenhuma tarefa de fundação antes do contato comercial do dia; fases 2–3 só andam puxadas por evento real (entrada caiu, cliente assinou).
- **Capacidade solo:** QG OS + sistema da mãe + T3 + fundação não cabem sem orçamento de horas. A fundação está teto de 4h/semana.
- **Portal do cliente virar buraco de engenharia** antes de existir receita — v1 travada em página simples.

## Fora de escopo

Rebranding/site novo antes do gate; sistema financeiro complexo; CRM novo (usa o próprio); portal robusto; qualquer ferramenta paga nova.
