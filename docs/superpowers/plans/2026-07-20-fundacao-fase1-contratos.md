# Fundação da Agência — Fase 1 (Assinar e Poder Receber) — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Quando o Pimentel ou a mãe do Nicolas disserem "sim", existe contrato pronto para assinar no mesmo dia e forma legal de receber a entrada como PF.

**Architecture:** Documentos em markdown no repo (`03 - Comercial/06 - Jurídico/`), redigidos por Claude, auditados pela skill `legal:review-contract`, revisados pela mãe (advogada e primeira signatária). Nenhum código; nenhum desembolso. Contrato genérico + anexos de escopo por projeto.

**Tech Stack:** Markdown no repo; assinatura via Gov.br (gratuita); skills `legal:review-contract`, `stop-slop`.

**Spec:** `docs/superpowers/specs/2026-07-20-fundacao-agencia-design.md` (Fase 1)

## Global Constraints

- Todo texto em PT-BR, voz IRBIS onde couber; **sem travessão em texto novo** (regra JDP).
- **Nenhum documento é enviado a terceiros sem aprovação explícita do Nicolas nesta conversa.** Os entregáveis são rascunhos prontos para aprovação.
- Custo total da fase: **R$ 0**.
- Decisão de IP (spec, decisão 1): **código do cliente após quitação total** + oferta de acompanhamento mensal em **2 pacotes**; valores dos pacotes NÃO são definidos neste plano (pricing precisa do aval do Nicolas; o contrato referencia "proposta comercial vigente").
- Termos já fixados no caso QG OS: entrada antes de codar; manutenção cobre só ajuste/correção; hora excedente **R$ 180/h**; feature nova = aditivo.
- Commit ao fim de cada task (regra da casa; usar `/usr/bin/git`).
- Fatos afirmados sobre a IRBIS passam pelo crivo da skill `irbis-guarda-pivot` (ex.: nada de "+500", "LTV 1,8x").

---

### Task 1: Modelo de contrato de prestação de serviços de desenvolvimento de software

**Files:**
- Create: `03 - Comercial/06 - Jurídico/contrato-prestacao-software-modelo.md`

**Interfaces:**
- Produces: contrato genérico com campos `{{CONTRATANTE}}`, `{{CNPJ_CONTRATANTE}}`, `{{ANEXO_ESCOPO}}`, `{{VALOR_SETUP}}`, `{{MARCOS_PAGAMENTO}}`, `{{VALOR_HORA_EXCEDENTE}}` — consumido pelas Tasks 2 e 6.

- [ ] **Step 1: Redigir o contrato completo** com exatamente estas 12 cláusulas, nesta ordem:
  1. **Partes:** Nicolas Cunha, pessoa física (CPF), "Prestador"; empresa cliente, "Contratante".
  2. **Objeto:** desenvolvimento de sistema de software conforme **Anexo I (Escopo)**, parte integrante do contrato. O que não está no Anexo I não está contratado.
  3. **Preço e pagamento:** valor de setup `{{VALOR_SETUP}}`; **entrada obrigatória antes do início de qualquer desenvolvimento**; demais marcos em `{{MARCOS_PAGAMENTO}}`; atraso de pagamento suspende o cronograma sem penalidade ao Prestador.
  4. **Alterações de escopo (aditivo):** funcionalidade nova ou mudança sobre o Anexo I = aditivo escrito com valor e prazo próprios; nada é desenvolvido por acordo verbal.
  5. **Manutenção (opcional, pós-entrega):** acompanhamento mensal em 2 pacotes conforme proposta comercial vigente; pacote cobre **ajuste e correção**, nunca funcionalidade nova; hora excedente a `{{VALOR_HORA_EXCEDENTE}}`.
  6. **Prazo e cronograma:** prazo estimado no Anexo I; dependências do Contratante (acessos, conteúdo, aprovações) pausam o relógio.
  7. **Propriedade intelectual:** o código-fonte e o sistema são **cedidos ao Contratante após a quitação total** do valor de setup; até lá, titularidade do Prestador. Bibliotecas de terceiros permanecem sob suas licenças. Prestador pode citar o projeto como portfólio (sem dados confidenciais).
  8. **Confidencialidade e dados (LGPD):** sigilo mútuo; Prestador trata dados pessoais só para executar o contrato, como operador; ao término, devolve ou apaga dados sob instrução do Contratante.
  9. **Infraestrutura:** contas de hospedagem/serviços em nome e custo do Contratante; Prestador como colaborador técnico (padrão QG OS: Vercel + Supabase na conta do cliente).
  10. **Garantia e suporte de entrega:** correção de defeitos reportados em até 30 dias da entrega, sem custo; depois disso, via pacote de manutenção ou hora avulsa.
  11. **Rescisão:** por qualquer parte com aviso de 15 dias; trabalho executado até a data é devido; entrada não é reembolsável após iniciado o desenvolvimento.
  12. **Foro:** comarca da cidade do Nicolas.

- [ ] **Step 2: Passar o texto pela skill `stop-slop`** (linguagem limpa, sem travessão, sem juridiquês vazio; contrato deve ser legível por dono de empresa leigo).

- [ ] **Step 3: Auditar com a skill `legal:review-contract`** — a skill aponta cláusulas faltantes, riscos e termos desequilibrados. Incorporar os apontamentos procedentes; listar num bloco "Notas para revisão da advogada" os pontos que a skill levantar e que precisam de decisão humana.

- [ ] **Step 4: Verificar contra a spec** — checklist: entrada antes de codar ✓; aditivo escrito ✓; manutenção só ajuste/correção ✓; IP = cessão na quitação + 2 pacotes ✓; LGPD ✓; infra na conta do cliente ✓. Qualquer item ausente: voltar ao Step 1.

- [ ] **Step 5: Commit**

```bash
/usr/bin/git add "03 - Comercial/06 - Jurídico/contrato-prestacao-software-modelo.md"
/usr/bin/git commit -m "feat(juridico): modelo de contrato de prestação de serviços de software"
```

### Task 2: Anexo I de escopo — QG OS

**Files:**
- Create: `03 - Comercial/06 - Jurídico/anexo-escopo-qgos.md`
- Read: `02 - Projetos/QG Group/QG OS/escopo.md`

**Interfaces:**
- Consumes: campos do contrato da Task 1 (preenche `{{VALOR_SETUP}}` = R$ 2.997, `{{VALOR_HORA_EXCEDENTE}}` = R$ 180/h).
- Produces: anexo pronto para o dia do "sim" do Pimentel.

- [ ] **Step 1: Converter `escopo.md` em anexo contratual**: módulos 1 a 6 do escopo fechado (auth/permissões, kanban, dashboard, clientes + chat 5 canais, conteúdos, calendário simples SE confirmado), itens explicitamente **fora de escopo** (portal do cliente = Modelo 2/aditivo; integrações Trello/Discord/Ads), anexos permitidos (texto, imagem, documento, links; sem vídeo), notificação por badge. NÃO incluir o som de mensagem (presente-surpresa, fica fora do papel). Cronograma: proposto pelo Prestador conforme agenda, sem data rígida (posição do escopo de 16/jul).
- [ ] **Step 2: Verificar** que nenhum item do anexo contradiz a proposta comercial enviada dia 17/jul (PDF `02 - Projetos/QG Group/QG OS/IRBIS — Proposta Comercial QG OS.pdf`): valores R$ 2.997 + R$ 297/mês + R$ 180/h idênticos.
- [ ] **Step 3: Commit**

```bash
/usr/bin/git add "03 - Comercial/06 - Jurídico/anexo-escopo-qgos.md"
/usr/bin/git commit -m "feat(juridico): anexo de escopo QG OS pronto para assinatura"
```

### Task 3: Recibo de autônomo (RPA) + explicação para o tomador

**Files:**
- Create: `03 - Comercial/06 - Jurídico/rpa-recibo-modelo.md`

**Interfaces:**
- Produces: modelo de recibo + meia página "como pagar um autônomo PF" — consumido pela Task 6 (checklist do dia do sim).

- [ ] **Step 1: Redigir o modelo de recibo** com campos: prestador (nome, CPF, endereço, NIT/PIS se houver), tomador (razão social, CNPJ), descrição do serviço ("desenvolvimento de software conforme contrato de DD/MM/AAAA"), valor bruto, data, assinatura.
- [ ] **Step 2: Redigir a explicação de meia página para o contador do tomador**: pagamento a autônomo PF envolve retenções e encargos pela empresa (INSS, IRRF conforme tabela, ISS conforme município); a página NÃO calcula valores (isso é do contador do cliente), só avisa o que é, cita que o contrato está disponível, e informa que a partir da abertura do CNPJ (Fase 2) os pagamentos passam a ser contra NF. Tom: informativo e humilde tecnicamente correto, sem fingir consultoria tributária.
- [ ] **Step 3: Passar por `stop-slop` e commit**

```bash
/usr/bin/git add "03 - Comercial/06 - Jurídico/rpa-recibo-modelo.md"
/usr/bin/git commit -m "feat(juridico): modelo de RPA e guia de pagamento a autônomo"
```

### Task 4: Mensagem ao contador (2 perguntas)

**Files:**
- Create: `03 - Comercial/06 - Jurídico/mensagem-contador.md`

- [ ] **Step 1: Redigir mensagem de WhatsApp** (curta, leiga, pronta pra colar) com exatamente 2 perguntas: (1) "Participo de uma holding familiar como sócio. Se eu abrir uma LTDA de desenvolvimento de software, isso me impede de optar pelo Simples Nacional?" (2) "Até a empresa existir, o caminho certo pra eu receber de duas empresas clientes é RPA/recibo de autônomo, ou tem opção melhor?" Fechar perguntando se ele faria a abertura da LTDA e por quanto/mês (informação pra Fase 2, sem compromisso).
- [ ] **Step 2: Apresentar ao Nicolas para aprovação e envio** (gate: ele envia, não o Claude).
- [ ] **Step 3: Commit**

```bash
/usr/bin/git add "03 - Comercial/06 - Jurídico/mensagem-contador.md"
/usr/bin/git commit -m "feat(juridico): mensagem ao contador sobre holding, Simples e RPA"
```

### Task 5: Guia de assinatura eletrônica Gov.br

**Files:**
- Create: `03 - Comercial/06 - Jurídico/guia-assinatura-govbr.md`

- [ ] **Step 1: Redigir passo a passo leigo** (para Nicolas E para o cliente): exportar contrato+anexo para PDF; acessar assinador do Gov.br (assinatura.iti.gov.br), login conta Gov.br nível prata/ouro; subir PDF, posicionar assinatura, assinar; enviar ao cliente para a assinatura dele; validar em validar.iti.gov.br. Incluir a linha: assinatura avançada Gov.br tem validade jurídica para contratos entre particulares.
- [ ] **Step 2: Commit**

```bash
/usr/bin/git add "03 - Comercial/06 - Jurídico/guia-assinatura-govbr.md"
/usr/bin/git commit -m "docs(juridico): guia de assinatura eletrônica via Gov.br"
```

### Task 6: Checklist "dia do sim"

**Files:**
- Create: `03 - Comercial/06 - Jurídico/checklist-dia-do-sim.md`

**Interfaces:**
- Consumes: Tasks 1, 2, 3, 5.

- [ ] **Step 1: Redigir o checklist operacional** que o Nicolas executa no dia em que um cliente fundador disser sim: (1) preencher contrato com dados do cliente + anexar Anexo I do projeto; (2) enviar para revisão/assinatura via Gov.br (guia Task 5); (3) após assinado, cobrar a entrada (PIX + recibo RPA da Task 3, com a explicação para o contador do cliente); (4) confirmar entrada caiu → agendar kickoff em até 48h; (5) disparar gatilho da Fase 2 (abrir LTDA com a entrada) e da Fase 3 (kit de onboarding). Caso mãe: anexo de escopo dela ainda não existe; o checklist aponta a dependência (pesquisa do Nicolas → proposta → anexo).
- [ ] **Step 2: Verificação de ponta a ponta (dry run):** simular o fluxo com o caso QG OS — todos os documentos referenciados existem no repo e os valores batem (R$ 2.997 entrada/setup, R$ 297/mês, R$ 180/h). Qualquer referência quebrada: corrigir antes do commit.
- [ ] **Step 3: Commit**

```bash
/usr/bin/git add "03 - Comercial/06 - Jurídico/checklist-dia-do-sim.md"
/usr/bin/git commit -m "docs(juridico): checklist operacional do dia do sim"
```

---

## Gates de aprovação humana (não pular)

1. Contrato modelo (Task 1) → revisão da mãe antes de qualquer assinatura real.
2. Mensagem ao contador (Task 4) → Nicolas aprova e envia.
3. Nenhum documento vai a cliente sem "aprovado" do Nicolas na conversa.

## Fora deste plano

Fases 2, 3 e 4 da spec (ganham plano próprio quando o gatilho disparar: entrada caiu → Fase 2; primeira assinatura → Fase 3; duas assinaturas → Fase 4). Valores dos 2 pacotes de manutenção (pricing com aval do Nicolas, na proposta da mãe). Anexo de escopo da mãe (depende da pesquisa dele).
