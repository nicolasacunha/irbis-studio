# Checklist: dia do sim

Roteiro operacional para o dia em que um cliente fundador (Arialdo Pimentel / QG OS ou a mãe do Nicolas) responde "sim" à proposta. Segue os passos na ordem. Cada passo depende do anterior estar fechado.

## Antes de começar

1. Confirme que o modelo de contrato (`contrato-prestacao-software-modelo.md`) já passou pela revisão da mãe como advogada. Sem essa revisão, nenhuma assinatura real acontece, mesmo que o cliente já tenha dito sim.
2. Nenhum documento (contrato, anexo, recibo, mensagem) sai para o cliente ou para terceiros sem "aprovado" do Nicolas na conversa. Isso vale mesmo para os documentos já redigidos deste checklist.

## Passo 1. Preencher o contrato e anexar o escopo

Abra `contrato-prestacao-software-modelo.md` e preencha **todos os campos entre chaves**. Não existe campo opcional: contrato incompleto não vai para assinatura.

Dados fixos do Prestador (CPF, endereço completo com CEP, comarca São Paulo/SP e cidade de assinatura) já estão TODOS preenchidos no modelo desde 21/jul/2026. Os campos restantes são só do cliente e do projeto:

1. `{{CONTRATANTE}}`
2. `{{CNPJ_CONTRATANTE}}`
3. `{{ENDERECO_CONTRATANTE}}`
4. `{{ANEXO_ESCOPO}}`
5. `{{VALOR_SETUP}}`
6. `{{MARCOS_PAGAMENTO}}`
7. `{{VALOR_HORA_EXCEDENTE}}`

Depois de preencher os 11 campos, anexe o Anexo I do projeto (o documento de escopo correspondente ao cliente) como parte integrante do contrato, conforme a Cláusula 2.

**Aviso sobre valores do caso QG OS.** Para o contrato do Arialdo/QG OS, use os valores do PDF da proposta comercial enviada a ele em 17/jul (pasta `02 - Projetos/QG Group/QG OS/`): `{{VALOR_SETUP}}` = R$ 2.997, manutenção mensal R$ 197 (vai na proposta comercial vigente, não no contrato), `{{VALOR_HORA_EXCEDENTE}}` = R$ 127/h, prazo 10 dias úteis a partir da confirmação da entrada. Não use os valores R$ 297/R$ 180 de um escopo interno anterior: estão superados para fins de contrato. Nicolas confirmou em 20/jul/2026 que os valores do PDF são intencionais e valem para o documento assinado.

A proposta enviada oferece pagamento à vista, 50/50 ou parcelado, à escolha do cliente. Antes de preencher `{{MARCOS_PAGAMENTO}}`, Nicolas confirma com o cliente a modalidade escolhida e o valor exato da entrada.

## Passo 2. Enviar para assinatura via Gov.br

Siga `guia-assinatura-govbr.md` de ponta a ponta:

1. Exporte contrato preenchido + Anexo I para um único PDF.
2. Nicolas assina primeiro em assinatura.iti.gov.br (conta Gov.br nível prata ou ouro).
3. Envia o PDF já assinado ao cliente, pelo canal combinado.
4. Cliente assina no mesmo documento.
5. Valide as duas assinaturas em validar.iti.gov.br antes de considerar o contrato fechado.

Se o cliente não tiver conta Gov.br nível prata, use a seção do guia sobre como ele sobe de nível (app com reconhecimento facial, banco credenciado ou atendimento presencial) antes de seguir.

## Passo 3. Cobrar a entrada

Só depois das duas assinaturas validadas:

1. Envie a cobrança da entrada por PIX, no valor definido em `{{MARCOS_PAGAMENTO}}` do contrato assinado.
2. Assim que o PIX cair, preencha o modelo de recibo em `rpa-recibo-modelo.md` (Parte 1) com os dados do pagamento. Esse documento tem seus próprios campos entre chaves, separados dos 11 do contrato: preencha todos antes de enviar.
3. Envie ao cliente o recibo (RPA) assinado junto com a explicação de meia página para o contador do tomador, que já está na Parte 2 do mesmo arquivo. É essa explicação que orienta o contador do cliente sobre retenções e encargos de pagar um autônomo pessoa física.
4. Não confunda esse envio com `mensagem-contador.md`: aquele documento é a pergunta do Nicolas para o contador dele mesmo, sobre abrir LTDA e Simples Nacional. Não vai para o cliente. Ele entra no Passo 5.

O Prestador não começa nenhum desenvolvimento antes de a entrada cair na conta, conforme a Cláusula 3 do contrato.

## Passo 4. Confirmar a entrada e agendar o kickoff

1. Confirme no extrato que o valor da entrada caiu na conta.
2. Agende o kickoff com o cliente em até 48 horas depois da confirmação.
3. Registre a data de início real do prazo do Anexo I (o relógio do cronograma começa a contar a partir da entrada, conforme a Cláusula 6).

## Passo 5. Disparar os gatilhos de fase

A entrada confirmada dispara duas ações fora deste checklist, cada uma com plano próprio:

1. **Fase 2 (dinheiro limpo).** A entrada é o evento que autoriza abrir a LTDA e a conta PJ. Se `mensagem-contador.md` ainda não foi enviada ao contador do Nicolas, envie agora (com aprovação dele) para destravar a resposta sobre holding, Simples Nacional e abertura de LTDA. Essa fase é detalhada em `docs/superpowers/specs/2026-07-20-fundacao-agencia-design.md` (seção "Fase 2 - Dinheiro limpo").
2. **Fase 3 (onboarding).** A primeira assinatura dispara o kit de onboarding pós-contrato (documento de boas-vindas, cadência de comunicação, kickoff, calls recorrentes). Esse kit ainda não existe como documento pronto: ganha plano próprio quando o gatilho disparar.

Nenhuma das duas fases atrasa o kickoff do Passo 4. Elas correm em paralelo, puxadas pelo mesmo evento.

## Caso mãe: dependência em aberto

Para o cliente "mãe do Nicolas", o Passo 1 não pode ser concluído hoje: o Anexo I de escopo dela ainda não existe. A ordem é:

1. Nicolas pesquisa e define o escopo do sistema dela.
2. Sai uma proposta comercial (mesmo formato do PDF do QG OS).
3. O escopo vira Anexo I em `03 - Comercial/06 - Jurídico/`, no mesmo padrão de `anexo-escopo-qgos.md`.
4. Só depois desse anexo existir, este checklist roda para o caso dela a partir do Passo 1.

## Referências

- `contrato-prestacao-software-modelo.md`
- `anexo-escopo-qgos.md`
- `rpa-recibo-modelo.md`
- `mensagem-contador.md`
- `guia-assinatura-govbr.md`
- PDF da proposta comercial QG OS (17/jul), em `02 - Projetos/QG Group/QG OS/`
- `docs/superpowers/plans/2026-07-20-fundacao-fase1-contratos.md`
