# Contrato de Prestação de Serviços de Desenvolvimento de Software

Modelo IRBIS. O escopo de cada projeto vive no Anexo I. Preencha os campos entre chaves antes de enviar ao cliente.

---

## Cláusula 1. Partes

**Prestador:** Nicolas Cunha, brasileiro, inscrito no CPF sob o nº 549.162.338-59, residente na Rua Oliveira Dias, 444, São Paulo/SP, CEP 01433-030, doravante "Prestador".

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

> ⚠️ **Reescrita em 12/ago/2026.** A versão anterior falava em "2 pacotes" de manutenção, que eram os planos Básico e Pro de **site**, mortos com o pivot de 04/ago. Também cobrava excedente **por hora**, contra a regra de ouro repetida em seis documentos da casa. Só existe um produto recorrente hoje: o Bot de IA.

Só o **Bot de IA** tem acompanhamento mensal. Sistemas e Consultoria de IA são de preço fechado, sem mensalidade.

Quando o objeto deste contrato for um Bot de IA, aplica-se o seguinte:

**5.1. Valor e prazo.** A mensalidade é de {{VALOR_MENSALIDADE}}, com **prazo mínimo de 6 (seis) meses** contados da entrada em produção. Encerrado o prazo mínimo, o contrato segue por prazo indeterminado, mês a mês, salvo renovação por novo período acordada por escrito.

**5.2. O que a mensalidade cobre.** Gestão da infraestrutura e da disponibilidade do bot em produção; monitoramento do funcionamento; correção de defeito no que foi entregue; e **até 2 (dois) ajustes de prompt ou de fluxo por mês**.

A mensalidade remunera o trabalho do Prestador. **Não inclui o custo da infraestrutura nem o custo de uso dos modelos de inteligência artificial**, que são do Contratante e seguem a Cláusula 9.

**5.3. O que a mensalidade não cobre.** Ajustes além do segundo no mesmo mês; fluxo novo, canal novo ou integração nova; mudança que exija remodelar o comportamento do bot; e treinamento de novos usuários após o treinamento de virada. Tudo isso segue a Cláusula 4 (aditivo), com escopo e valor acordados por escrito antes da execução.

**5.4. Ajustes não acumulam.** Os 2 ajustes mensais valem no mês de referência. Mês sem uso não gera crédito para o mês seguinte.

**5.5. Cancelamento antes do prazo mínimo.** {{CLÁUSULA_DE_MULTA}} ⚠️ **A redigir com a advogada.** A intenção comercial registrada é multa proporcional ao período restante. Ver `03 - Comercial/04 - Entrega e Recorrência/planos-recorrencia-irbis.md`.

**5.6.** A contratação do acompanhamento é condição do produto Bot de IA, não item opcional: o bot depende de infraestrutura ativa para operar.

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

**9.1. Custo de uso de inteligência artificial.** Quando o sistema ou o bot usar modelos de inteligência artificial, a conta do provedor do modelo também fica em nome do Contratante e é paga por ele. **Esse custo varia com o volume de uso**: quanto mais conversas o bot atender, maior a fatura do mês. O Prestador informa uma estimativa antes do início e avisa o Contratante quando observar variação relevante, mas não responde pelo valor da fatura.

**9.2. Sem limite de uso.** Não há teto de volume. O Contratante usa o sistema quanto precisar e paga o consumo que gerar, direto ao provedor.

> **Decisão do dono, 12/ago/2026.** A cláusula de teto foi descartada em vez de preenchida. O raciocínio, verbatim: *"eu estou vendendo negócio pro cara e vou falar que ele só pode usar até isso? Não faz sentido."* Um teto transformaria uma ferramenta de operação em algo que o cliente precisa racionar, o que é o oposto do que o produto promete.
>
> **A proteção contra surpresa é a transparência da Cláusula 9.1, não um limite.** O Prestador informa a estimativa antes de começar e avisa quando observar variação relevante. O cliente decide se quer usar mais.

---

## Cláusula 10. Garantia e suporte de entrega

Nos 30 dias seguintes à entrega, o Prestador corrige sem custo os defeitos que o Contratante reportar (erros do sistema em relação ao Anexo I).

Depois desses 30 dias, correções e ajustes seguem pelo acompanhamento mensal do Bot de IA (Cláusula 5), quando houver, ou por aditivo (Cláusula 4). Não há cobrança por hora avulsa.

A garantia cobre defeito. Não cobre pedido de mudança ou funcionalidade nova, que seguem a Cláusula 4.

---

## Cláusula 11. Rescisão

Qualquer das partes pode encerrar o contrato com aviso de 15 dias.

O trabalho já executado até a data do encerramento é devido ao Prestador e será pago.

A entrada não é reembolsável depois que o desenvolvimento começou.

---

## Cláusula 12. Foro

As partes elegem o foro da comarca de São Paulo/SP para resolver qualquer questão deste contrato, com renúncia a qualquer outro, por mais privilegiado que seja.

---

E, por estarem de acordo, as partes assinam este contrato.

São Paulo, ______ de __________________ de ________.

<br>

______________________________________
**Nicolas Cunha (Prestador)**
CPF 549.162.338-59

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

8. **Campos a confirmar antes de assinar.** Dados fixos do Prestador (CPF, endereço, comarca São Paulo/SP e cidade de assinatura) preenchidos em 20/jul/2026 com informação do próprio Nicolas; falta só `{{CEP_PRESTADOR}}`. `{{ENDERECO_CONTRATANTE}}` é do cliente. Não há campo de valor para os pacotes de manutenção porque eles vão pela proposta comercial vigente (Cláusula 5).

9. **Anexo I.** O contrato depende do Anexo I (Escopo), que é peça separada. Sem ele preenchido, o objeto fica em aberto.

Nota: esta é uma revisão assistida por checklist comercial, não parecer jurídico. Revisar com advogada antes do primeiro uso.
