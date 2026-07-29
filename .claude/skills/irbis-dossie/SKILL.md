---
name: irbis-dossie
description: "Monta o dossiê de 1 página de um lead/cliente do CRM Supabase da IRBIS, feito pra abrir no celular antes de uma call. Use quando o Nicolas disser '/dossie [nome]', 'dossiê do', 'me atualiza sobre esse lead', ou for se preparar pra falar com alguém do funil."
---

# IRBIS — `/dossie [pessoa]` (Supabase, Fase 1)

Conexão: `irbis-os/CONEXAO-SUPABASE.md`. Spec completa: `irbis-os/fases/FASE-1-crm-e-alertas.md`,
seção 4. **Nunca é enviado para fora** — é leitura interna do Nicolas.

## Ordem de leitura das fontes

1. `pessoas` (busca por nome, `ilike`)
2. `pipeline` do pessoa_id encontrado
3. `interacoes` — **todos** os toques, `order=data.desc`
4. `propostas` do pessoa_id
5. `projetos` do pessoa_id, se houver
6. Gmail — thread com o e-mail da pessoa, últimos 90 dias (MCP Gmail já conectado)
7. Google Calendar — próximos eventos com essa pessoa, se Calendar estiver conectado; se não
   estiver, marque `❌ FALHOU Calendar` na Fronteira dos Dados e siga sem essa seção
8. Dossiê-esqueleto em `03 - Comercial/01 - Prospecção/dossie-{{slug}}.md`, se existir

Se a busca em `pessoas` não achar ninguém, não invente: `Não achei "{{nome}}" cadastrado.
Nome diferente ou é lead novo? (novo = uso a skill irbis-novo-lead)`.

## Estrutura de saída (1 página, 90 segundos de leitura)

```
1. ONDE O DEAL ESTÁ
   estágio · faixa de valor · temperatura · {{dias}}d desde o último contato
   (cobertos: e-mail, LinkedIn · cegos: WhatsApp, telefone) · degrau {{N}} ·
   próximo toque: {{data}} · origem: {{origem}}

2. QUEM É
   3 a 5 linhas, só o que está registrado em pessoas/interacoes/Gmail. Nada de perfil
   psicológico ou suposição de setor.

3. O QUE ELE QUER
   citações literais com data, tiradas de interacoes/Gmail. Nunca parafraseado.

4. HISTÓRICO
   só o que muda a próxima conversa — não é a lista completa de toques, é o que importa agora.

5. JÁ PROMETIDO/ENVIADO
   se há proposta em propostas.valor: "⚠ PREÇO JÁ APRESENTADO: R${{valor}} em {{data_envio}}.
   NÃO REJUSTIFICAR." Se não há proposta, omita a seção.

6. PENDÊNCIAS DOS DOIS LADOS
   o que o Nicolas prometeu e não entregou, o que o lead prometeu e não entregou.

7. OS 3 OBJETIVOS DESTA CONVERSA
   objetivos verificáveis, não tópicos genéricos ("call de diagnóstico" não é objetivo;
   "sair com data de início confirmada" é).

8. A PERGUNTA QUE NÃO PODE FALTAR
   uma só, a mais decisiva pro estágio atual.

9. OBJEÇÕES PROVÁVEIS
   máximo 3, só as que o histórico realmente sustenta — não liste objeção genérica de
   mercado.

10. RISCOS E SINAIS
    cada item com a evidência colada (data + fonte).
```

## Regras de fidelidade

Dossiê fino é normal, não é erro: se faltar dado em várias seções, abra dizendo "dossiê fino,
{{N}} de 10 seções com dado real" e siga só com o que existe. Nunca infle com genérico de
setor para parecer completo — isso cria confiança falsa, exatamente o defeito que este
sistema existe para eliminar. "Ele é indeciso" é ruído; "adiou duas vezes, em 12/jul e 20/jul"
é dado — prefira sempre a segunda forma.

Abra a saída com a Fronteira dos Dados (o que foi lido de cada fonte, inclusive se Gmail ou
Calendar vieram parciais ou falharam).
