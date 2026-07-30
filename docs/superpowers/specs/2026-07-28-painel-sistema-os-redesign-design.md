# Redesign do painel do Sistema OS — aplicar a identidade real da IRBIS

**Data:** 28/jul/2026. **Status:** aprovado pelo Nicolas, pronto pra implementação.
**Escopo:** `irbis-os/painel/` (Next.js 16, App Router, Tailwind v4). As 7 telas:
Login, Aprovações, Pipeline, Projetos (Kanban), Semana, Travas, Financeiro, Carteira.

## Por que

O painel foi construído na Fase 3 do Sistema OS com um dark mode genérico do Tailwind
(`neutral-950` etc.) — funcional, mas sem nenhuma relação visual com a IRBIS. Nicolas pediu
pra aplicar a identidade real da marca (Grafite & Sálvia, decidida em 23/jul,
ver `project_evolucao-identidade-irbis` na memória) em vez de deixar o painel parecendo
"ferramenta qualquer".

## Decisões (tomadas em brainstorming com o Nicolas, 28/jul)

1. **Modo Papel (claro), não Grafite (escuro).** Contra a recomendação inicial de manter
   escuro (ferramenta operacional de uso rápido e frequente) — decisão dele, sem ambiguidade.
2. **Redesign editorial completo (approach B), não só troca de token (approach A).** Adota o
   vocabulário visual do site inteiro (moldura de cartão, cantos arredondados, hierarquia
   tipográfica serif/sans), não só as cores.
3. **Implementação em uma tela por vez**, com aprovação no navegador antes de avançar —
   regra permanente do CLAUDE.md do projeto, começando pela tela Aprovações (a mais usada).

## Tokens (extraídos de `site/index.html`, não inventados)

```css
--bg:      #E6E5E1;   /* fundo da página */
--s1:      #EEEDEA;   /* superfície 1 — cards, inputs */
--s2:      #D3D2CC;   /* superfície 2 — hover, borda sutil */
--text:    #26251F;   /* texto principal */
--muted:   #6E6C60;   /* texto secundário */
--accent:  #4A5D43;   /* sálvia — ação, link, positivo */
--alerta:  a definir na implementação (terracota/vermelho terroso, NÃO o vermelho puro
           que o painel usa hoje — precisa combinar com a paleta, ver seção "Cor de alerta")
--f:       'Archivo', sans-serif;   /* corpo, dados, UI */
--f-serif: 'Besley', Georgia, serif; /* títulos de página */
```

### Cor de alerta — pendência de implementação

O painel usa vermelho (`red-900`/`red-950`) hoje pra travas, parados-além-do-teto e itens
vencidos. Isso precisa de uma cor real do sistema de marca, não um vermelho Tailwind solto.
Verificar se o site já tem uma cor de "erro/alerta" definida (busca rápida antes de
implementar); se não tiver, propor um terracota derivado da paleta (ver direção "Cobre & Osso"
nas 3 direções originais de 23/jul) e confirmar com o Nicolas antes de aplicar em produção —
**não decidir essa cor sozinho sem mostrar**.

## Vocabulário de layout (herdado do site, real, não inventado)

- **Moldura de cartão:** a página inteira ganha respiro nas bordas (`--frame`, escala
  responsiva tipo `clamp(.625rem, 1.5vw, 1.125rem)`) e cantos bem arredondados
  (`clamp(16px, 2vw, 28px)`) — o mesmo tratamento do hero do site. Aplica no `<main>` do
  layout do dashboard.
- **Cards de dado** (aprovação, card de lead, card de projeto no Kanban): raio menor, 14px —
  "papel dentro do papel", não componente de dashboard genérico.
- **Badges de estágio/status:** pill (raio total, `border-radius: 999px`), não retângulo.
- **Fronteira dos Dados:** deixa de ser caixa cinza-sobre-cinza com texto. Vira uma faixa fina
  no topo do cartão da página — sálvia quando tudo `✅ LIDO`, cor de alerta quando algo
  `❌ FALHOU`. Lida num piscar de olho, o texto completo (o que foi lido, contagens) continua
  disponível mas não é mais o elemento dominante.

## O que NÃO muda nesta passada

Estrutura de dados, queries, Server Actions, lógica de negócio — zero. Isso é troca de pele,
não retrabalho funcional. Nenhuma tela ganha campo novo nem perde funcionalidade.

## Ordem de implementação

Uma tela por vez, cada uma aprovada no navegador antes da próxima:
1. Fundamentos compartilhados: tokens CSS, fonte, componente `FronteiraDados`, layout do
   dashboard (nav + moldura de cartão) — toda tela herda isso.
2. Aprovações (mais usada).
3. Pipeline.
4. Projetos (Kanban).
5. Semana, Travas, Financeiro, Carteira (mais simples, mesmo padrão já validado nas 4 primeiras).
6. Login (tela isolada, sem nav — por último porque é a que menos importa pro uso diário).

## Critério de pronto

`/impeccable` rodado em cada tela antes de marcar como concluída (regra do CLAUDE.md do
projeto). Testado no navegador, mobile-first (é onde o Nicolas aprova rascunhos no dia a dia).
