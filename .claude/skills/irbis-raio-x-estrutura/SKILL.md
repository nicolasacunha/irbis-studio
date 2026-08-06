---
name: irbis-raio-x-estrutura
description: "Conduz e captura a sessão paga de Raio-X de Estrutura: mapeia um departamento do cliente em jobs com horas e critério de decisão, soma quanto tempo por semana vai em trabalho que ninguém precisa decidir, e escolhe o primeiro agente a entregar. Use quando o Nicolas disser '/raio-x', 'vou fazer o raio-x do cliente X', 'terminei a sessão de raio-x', ou colar notas de uma sessão de mapeamento de estrutura."
---

# IRBIS — `/raio-x` (Consultoria de IA)

Spec: `docs/superpowers/specs/2026-08-05-raio-x-estrutura-design.md`.
Roteiro da sessão: `roteiro-sessao.md`. Formato da saída: `template-raio-x.md`.

**O que esta sessão é:** produto pago, cliente já fechado, um departamento por vez, e ela
só termina com um agente rodando. **O que ela não é:** a call gratuita de topo do site.
Aquela se chama diagnóstico; esta se chama Raio-X. Nunca troque os nomes.

## Modo preparo — antes da call

Dispara quando o Nicolas avisa que vai fazer uma sessão.

1. **Puxe o que já existe do cliente:** `pessoas`, `pipeline` e `interacoes` no Supabase
   (conexão em `irbis-os/CONEXAO-SUPABASE.md`), mais o campo do formulário da `/call` onde
   ele descreveu o processo travado. Se não houver registro nenhum, diga isso em uma linha
   em vez de inventar contexto.
2. **Cuspa o roteiro dos 5 blocos** de `roteiro-sessao.md`, com as perguntas por extenso —
   ele vai ler isso durante a call, então referência a arquivo não serve.
3. **Adapte o Bloco 1:** se o formulário já nomeou a área travada, a pergunta principal
   vira confirmação em vez de descoberta.
4. **Repita o teto de escopo** no fim: 3 caixinhas, ~6 jobs por caixinha.

Nunca instrua o Nicolas a digitar durante a call. A captura acontece depois.
