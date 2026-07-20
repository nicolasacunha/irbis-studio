# Contrato de Prestação de Serviços de Desenvolvimento de Software

Modelo IRBIS. O escopo de cada projeto vive no Anexo I. Preencha os campos entre chaves antes de enviar ao cliente.

---

## Cláusula 1. Partes

**Prestador:** Nicolas Cunha, brasileiro, inscrito no CPF sob o nº {{CPF_PRESTADOR}}, residente em {{ENDERECO_PRESTADOR}}, doravante "Prestador".

**Contratante:** {{CONTRATANTE}}, pessoa jurídica inscrita no CNPJ sob o nº {{CNPJ_CONTRATANTE}}, com sede em {{ENDERECO_CONTRATANTE}}, doravante "Contratante".

As partes contratam a prestação de serviços de desenvolvimento de software nos termos abaixo.

---

## Cláusula 2. Objeto

O Prestador desenvolve para o Contratante o sistema de software descrito no **Anexo I (Escopo)**, identificado como {{ANEXO_ESCOPO}}, que é parte integrante deste contrato.

O Anexo I define o que será entregue. O que não está no Anexo I não está contratado. Qualquer item fora dele segue a Cláusula 4 (aditivo).

---

## Cláusula 3. Preço e pagamento

O valor do setup (desenvolvimento inicial) é de {{VALOR_SETUP}}.

O Contratante paga uma **entrada obrigatória antes do início de qualquer desenvolvimento**. O Prestador não começa nenhum desenvolvimento antes de a entrada cair na conta.

Os demais marcos de pagamento seguem {{MARCOS_PAGAMENTO}}.

O atraso de qualquer pagamento suspende o cronograma até a regularização, sem penalidade ao Prestador. O prazo de entrega é adiado pelo mesmo número de dias que durar o atraso.

---

## Cláusula 4. Alterações de escopo (aditivo)

Toda funcionalidade nova ou mudança sobre o Anexo I entra por aditivo escrito, com valor e prazo próprios, assinado pelas duas partes.

Nada é desenvolvido por acordo verbal. Um pedido feito por conversa, mensagem ou reunião só vira trabalho depois de virar aditivo assinado.

---

## Cláusula 5. Manutenção (opcional, após a entrega)

Após a entrega, o Contratante pode contratar acompanhamento mensal. São 2 pacotes, conforme a proposta comercial vigente.

O pacote de manutenção cobre **ajuste e correção** do sistema entregue. Não cobre funcionalidade nova, que segue sempre a Cláusula 4.

Horas que passarem do limite do pacote são cobradas a {{VALOR_HORA_EXCEDENTE}} por hora.

A manutenção é opcional. O Contratante não é obrigado a contratá-la para receber o sistema.

---

## Cláusula 6. Prazo e cronograma

O prazo estimado de entrega está no Anexo I.

O relógio do cronograma depende do Contratante. Sempre que a entrega parar à espera de algo do Contratante (acesso a contas e sistemas, conteúdo, textos, imagens, aprovações ou respostas), o prazo fica pausado e volta a correr quando o item chega.

O prazo do Anexo I é uma estimativa de trabalho, não uma data fixa independente dessas dependências.

---

## Cláusula 7. Propriedade intelectual

Enquanto o setup não estiver pago por inteiro, o código-fonte e o sistema são de titularidade do Prestador.

Com a **quitação total do valor de setup**, o Prestador cede ao Contratante todos os direitos sobre o código-fonte e o sistema desenvolvidos sob medida neste contrato. A partir daí o Contratante é o dono do que foi feito para ele.

Bibliotecas e componentes de terceiros usados no projeto continuam sob suas próprias licenças. A cessão acima vale para o que o Prestador desenvolveu, não para software de terceiros embutido.

Ferramentas, trechos de código e componentes reutilizáveis que o Prestador já tinha antes deste projeto continuam sendo dele. A cessão cobre o sistema feito sob medida para o Contratante, e o Prestador segue livre para usar em outros projetos o material genérico que trouxe de fora.

O Prestador pode citar o projeto no seu portfólio, sem revelar dados confidenciais do Contratante.

---

## Cláusula 8. Confidencialidade e dados (LGPD)

As duas partes mantêm sigilo sobre as informações que trocarem para executar o contrato. Nenhuma delas repassa a terceiros o que souber da outra por causa deste trabalho.

Para fins da Lei nº 13.709/2018 (LGPD), o Contratante é o controlador dos dados pessoais tratados no sistema e o Prestador atua como operador: só trata esses dados para executar este contrato e seguindo as instruções do Contratante.

Ao fim do contrato, o Prestador devolve ou apaga os dados pessoais a que teve acesso, conforme o Contratante instruir.

---

## Cláusula 9. Infraestrutura

As contas de hospedagem e de serviços do sistema (por exemplo Vercel e Supabase) ficam em nome do Contratante e são pagas por ele.

O Prestador entra nessas contas como colaborador técnico, para configurar e operar o que o projeto precisa. A titularidade e o custo da infraestrutura são do Contratante.

---

## Cláusula 10. Garantia e suporte de entrega

Nos 30 dias seguintes à entrega, o Prestador corrige sem custo os defeitos que o Contratante reportar (erros do sistema em relação ao Anexo I).

Depois desses 30 dias, correções e ajustes seguem pelo pacote de manutenção (Cláusula 5) ou por hora avulsa.

A garantia cobre defeito. Não cobre pedido de mudança ou funcionalidade nova, que seguem a Cláusula 4.

---

## Cláusula 11. Rescisão

Qualquer das partes pode encerrar o contrato com aviso de 15 dias.

O trabalho já executado até a data do encerramento é devido ao Prestador e será pago.

A entrada não é reembolsável depois que o desenvolvimento começou.

---

## Cláusula 12. Foro

As partes elegem o foro da comarca de {{COMARCA_FORO}} para resolver qualquer questão deste contrato, com renúncia a qualquer outro, por mais privilegiado que seja.

---

E, por estarem de acordo, as partes assinam este contrato.

{{CIDADE_ASSINATURA}}, ______ de __________________ de ________.

<br>

______________________________________
**Nicolas Cunha (Prestador)**
CPF {{CPF_PRESTADOR}}

<br>

______________________________________
**{{CONTRATANTE}} (Contratante)**
CNPJ {{CNPJ_CONTRATANTE}}

<br>

Testemunhas:

1. ______________________________  Nome:                         CPF:

2. ______________________________  Nome:                         CPF:

---

## Notas para revisão da advogada

Este é o primeiro modelo de contrato da IRBIS e traz só as 12 cláusulas de base. A auditoria abaixo apontou pontos que pedem decisão jurídica antes do primeiro uso real. Nenhum deles foi resolvido no texto por conta própria: cada um é uma escolha de risco que cabe à revisão humana.

1. **Limitação de responsabilidade (ausente).** O contrato não põe um teto para o quanto o Prestador pode ser responsabilizado, nem exclui danos indiretos e lucros cessantes. Para uma pessoa física operando sozinha, isso é exposição alta. Sugestão a avaliar: teto igual ao valor do setup e exclusão de danos indiretos.

2. **Indenização (ausente).** Não há cláusula que diga quem responde por reclamação de terceiro (por exemplo, alegação de que o sistema viola direito de outra pessoa). Decidir se entra e se é recíproca.

3. **Juros e multa por atraso de pagamento.** Hoje o atraso só pausa o cronograma (Cláusula 3). Avaliar somar juros de mora e multa sobre o valor em atraso.

4. **LGPD, detalhamento (Cláusula 8).** A cláusula cobre o essencial, mas não fixa: prazo para avisar o Contratante em caso de incidente de segurança; autorização para suboperadores (Vercel e Supabase são suboperadores de dados); e as medidas mínimas de segurança. Avaliar detalhar.

5. **Prazo da confidencialidade (Cláusula 8).** O sigilo não tem prazo de sobrevivência definido após o fim do contrato. Definir por quanto tempo continua valendo.

6. **Emissão fiscal (PF sem CNPJ).** O Prestador é pessoa física e ainda não tem CNPJ. Confirmar com contador como o recebimento será formalizado (RPA, nota avulsa), o ISS e eventuais retenções. Isso afeta o valor líquido e a forma de faturar.

7. **Força maior e cessão do contrato (ausentes).** Não há cláusula de força maior nem regra sobre transferir o contrato a terceiros ou mudança de controle do Contratante. Avaliar se valem para este porte de contrato.

8. **Campos a confirmar antes de assinar.** `{{COMARCA_FORO}}` e `{{CIDADE_ASSINATURA}}` dependem da cidade do Nicolas; `{{CPF_PRESTADOR}}` e `{{ENDERECO_PRESTADOR}}` são dados dele; `{{ENDERECO_CONTRATANTE}}` é do cliente. Não há campo de valor para os pacotes de manutenção porque eles vão pela proposta comercial vigente (Cláusula 5).

9. **Anexo I.** O contrato depende do Anexo I (Escopo), que é peça separada. Sem ele preenchido, o objeto fica em aberto.

Nota: esta é uma revisão assistida por checklist comercial, não parecer jurídico. Revisar com advogada antes do primeiro uso.
