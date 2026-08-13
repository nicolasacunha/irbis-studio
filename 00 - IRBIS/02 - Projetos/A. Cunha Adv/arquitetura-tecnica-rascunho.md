# MINUTA — Arquitetura técnica (rascunho de preparo)

**Status: RASCUNHO.** Não é o Plano de Entrega oficial (F2 do método — esse só fecha com "cliente confirmou o plano"). É ponto de partida para a call de kickoff, escrito a partir do que já existe: Anexo I (escopo fechado), Questionário de Descoberta respondido em 29/jul e o deck de Kickoff de 01/ago — todos em `00-contrato/`.

Antes de qualquer commit de código real: as 2 decisões do slide 8 do deck de kickoff (indicadores de sucesso a acompanhar; prioridade da base de conhecimento na fila) e o acesso real ao Google Drive/OneDrive com a pasta única de modelos, teses e jurisprudências.

O questionário mencionava uma preferência inicial por solução local, mas o contrato posterior já definiu Vercel e Anthropic em contas do escritório. Vale apenas deixar essa mudança explícita na call, para alinhar expectativa: a solução desta fase será cloud, sob contas do próprio escritório.

---

## 1. O que já está decidido (não é escolha de arquitetura, é contrato)

- **Contas de serviço em nome de A. Cunha Advocacia**, com o Prestador como colaborador técnico (Cláusula 9 do contrato):
  - **Anthropic (Claude)** — LLM já definido, não é decisão em aberto.
  - **Vercel** — hospedagem já definida.
- Consumo de API é variável e **não está incluso** no setup nem no acompanhamento mensal — até o fim da Fase 2, apresentar estimativa de consumo com base nos primeiros casos reais.
- Usuários: **3 advogadas, login individual**. Sem acesso de cliente à plataforma (fora de escopo, aditivo).
- Acesso via navegador — sem app mobile.

## 2. Stack proposta (a decidir na call, não a impor)

| Camada | Escolha | Por quê |
|---|---|---|
| App | Next.js (App Router), na Vercel já contratada | Único hosting já decidido no contrato |
| Autenticação | Auth com 3 contas nominais (Supabase Auth ou equivalente) | Volume pequeno (3 usuárias), não precisa de SSO/corp |
| Banco | Postgres via integração no Marketplace da Vercel (ex. Supabase) | Guarda processo, documento, peça gerada, base da casa (modelo/tese/jurisprudência), histórico — precisa ser relacional, não é caso de uso de KV |
| Armazenamento de arquivo | Storage do mesmo provedor do banco | Upload de documentos por processo (módulo 1) é contínuo — diferente da migração da base da casa, que é entrega única via Drive/OneDrive |
| LLM | Anthropic Claude API, direto (chave da conta do escritório) | O contrato já nomeia o provedor; não é caso de usar AI Gateway multi-provider, porque não há escolha de provedor a fazer |

## 3. Módulos do Anexo I → o que cada um vira tecnicamente

1. **Painel do escritório** — CRUD de processo (número, cliente, cargo, tribunal/vara, fase, status), upload de documento por processo, histórico de peças, resumo processual gerado a partir dos documentos anexados.
2. **Base da casa** — migração one-time dos até 40 modelos / 30 teses / 60 jurisprudências, extraídos da pasta única em Drive/OneDrive (formato pesquisável: .docx, .pdf com texto, .txt). Vira a base de referência (busca por cargo/tema) para toda peça gerada — não é RAG sofisticado, é recuperação direcionada pelos campos já estruturados do caso (cargo, tipo de peça).
3. **Petição inicial** — gera a partir de: dados do caso + documentos anexados + base da casa, no template do escritório.
4. **Réplica e manifestações** — lê contestação e documentos juntados pela parte contrária, responde tópico por tópico e por ID de documento (extração de ID a partir do PDF anexado).
5. **Recursos** — gera RO (TRT) e RR (TST) a partir da sentença/acórdão anexado. Nenhuma outra espécie recursal.
6. **Jurisprudência com fonte** — busca em bases públicas dos tribunais, prioridade TRT 2 / TRT 15 / TST. Toda citação sai com processo, órgão, data e link — **nunca de memória do modelo**. Isso é tool-use estruturado (busca real + citação da fonte), não texto livre — é o critério de aceite nº 3 do Anexo I, não dá pra amolecer.

   A disponibilidade das fontes é um risco técnico: portais podem não ter API, exigir CAPTCHA, mudar a estrutura ou oferecer decisões em PDF escaneado. Quando a busca automática falhar, o sistema deve registrar a indisponibilidade e permitir conferência ou inserção manual da decisão, sem fabricar citação nem apresentar resultado não verificado como fonte.

## 4. Anonimização — recomendação a validar na call, não requisito já contratado

O Anexo I não pede anonimização como feature. Mas a própria resposta do escritório no questionário diz: *"quais dados nunca podem sair do escritório? Dados confidenciais dos clientes."* Isso não vira exigência regulatória (o escritório respondeu que não tem política de confidencialidade formal nem restrição a IA externa hoje), mas é base pra propor, não pra impor:

- Antes de qualquer texto do processo (nome de parte, CPF, endereço) sair para a API da Anthropic, passar por uma camada que detecta o padrão e substitui por marcador.
- O mapa de-anonimização mora no banco do escritório (Supabase dele), nunca em localStorage do navegador — precisa sobreviver entre sessões e ficar disponível para o fluxo das 3 advogadas, diferente de um MVP de uma pessoa só.

Na call, apresentar três opções: enviar os dados completos à Anthropic mediante aceite explícito; anonimização automática com validação e testes; ou processamento local de etapas específicas, caso exista infraestrutura viável. A escolha é do escritório e qualquer implementação fora do escopo contratado precisa ser orçada separadamente.

## 5. Pontos para fechar na call

- **Formato de saída:** confirmar se a peça deve sair em `.docx` editável, PDF, ou ambos, e qual nível de preservação do template é esperado (estilos, cabeçalho, rodapé e numeração).
- **Base da casa:** definir quem, no escritório, aprova a migração dos modelos, teses e jurisprudências antes de ela ser usada nas peças.
- **Réplica por ID:** tratar como caso de teste próprio: identificar o documento, apontar a página de origem, associar a impugnação ao ID e sinalizar itens não identificados. O sistema nunca deve inventar um ID.
- **Jurisprudência:** confirmar as fontes mínimas esperadas e aceitar o fallback manual descrito no módulo de jurisprudência quando um portal público estiver indisponível.

## 6. O que fica fora (reforço do Anexo I, não repetição por acaso)

Sem integração com PJe/peticionamento automático · sem conta ou API do Jusbrasil (busca roda só em bases públicas dos tribunais) · sem software jurídico (CPJ/ProJuris/Astrea) · sem outras áreas além de trabalhista bancário · sem outras peças (contestação, contrarrazões, embargos, agravo, cálculo de liquidação) · sem acesso de cliente · sem app mobile.

## 7. Ritmo (perfil "Sistema/agente de IA" do método)

O Anexo I já escreve os dois números que o método exige antes de começar: **até 3 rodadas de ajuste de formato por tipo de peça** (9 no total) e critério de aceite objetivo (template certo + endereça todos os tópicos + jurisprudência com fonte + peça **gerada para revisão em menos de 1 dia útil, contado do momento em que os documentos do caso estão no sistema**). Isso não precisa ser inventado — só falta o Plano de Entrega (F2) com datas, que depende da call confirmar as pendências da seção 8 do deck de kickoff.

---

*Rascunho de preparo — Nicolas, 05/ago/2026. Não substitui F1 (mapa de decisão, escopo congelado formal) nem F2 (plano de entrega com datas), que dependem da call de kickoff.*
