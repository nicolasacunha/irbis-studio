# QG OS — Escopo

**Cliente:** QG (Arialdo Pimentel)
**Data:** 16/jul/2026
**Fontes:** protótipo qgos.lovable.app (inspecionado página a página) + vídeo e 3 áudios do Arialdo em 16/jul (transcrições em `../Adash/Transcript/`)
**Status:** rascunho interno — nada disso foi enviado ao cliente

---

## O que é

Sistema **interno** de gestão de tarefas e clientes da QG. Substitui o Trello (gestão de demandas) e o Discord (comunicação por cliente). **Não será comercializado** — dito explicitamente pelo Arialdo. Ele pediu algo "bem simplificado, mais funcional".

O protótipo do Lovable é 100% visual: sem backend, sem login, sem persistência, dados fixos no código (verificado na rede e no bundle JS). Toda a engenharia é construção do zero.

**Usuários:** só o time interno da QG (~8 pessoas no protótipo: Arialdo, Thais, Guilherme, Maria, Deia, Evelyn, Bruna, Igor). O número exato não afeta preço nem arquitetura nessa escala.

---

## Escopo fechado (Modelo 1 — o que entra na cotação)

### 1. Autenticação e permissões
- Login por usuário (não existe no protótipo).
- Dois níveis: **admin** (Arialdo, vê tudo) e **equipe** (restrições por canal/cliente, via tags).
- ⚠️ Arialdo descreveu como "bem tranquilo de fazer". Não é — permissão granular por canal é dos itens mais trabalhosos do sistema. Não deixar essa frase ancorar preço nem prazo.

### 2. Operação — Kanban ("Trellozão")
- Colunas do protótipo: Backlog → A Fazer → Em Andamento → Em Revisão → Ajustes → Concluído.
- Card: título, cliente, responsável, prioridade (baixa/média/alta/urgente), tags, data de entrega, briefing, anexos.
- Filtros por status, colaborador e cliente. Drag & drop entre colunas.

### 3. Dashboard
- Derivado automático do Kanban (sem entrada manual): contadores (em andamento, atrasadas, concluídas, total), demandas por cliente, atividade recente, urgentes/próximos prazos, carga por colaborador.

### 4. Clientes + chat multi-canal (substitui o Discord)
- Cadastro do cliente: segmento, desde quando, responsável, status (ativo/pausado).
- **5 canais de chat por cliente**: O cliente, Comunicação, Conteúdo, Campanha, Arquivos — "tudo ali é chat", texto aberto entre o time.
- Cada cliente novo ganha os canais automaticamente.
- É o coração do sistema e o maior bloco de esforço (tempo real, histórico, anexos nos chats).

### 5. Conteúdos
- Repositório de tutoriais/processos internos da QG (anexar documentos). Não é gestão de conteúdo de cliente.

### 6. Calendário simples (opcional — confirmar se entra)
- Só anotações com data (ex.: prazos de entrega). Sem conexão de agenda, sem reuniões, sem convites.

---

## Cortado (o Arialdo cortou, não oferecer de volta)

- Página **Arquivos** global → morre, vira o Conteúdos.
- **Calendário** completo → morre ou vira o item 6 acima.
- **Integração** com Trello e Discord → é substituição, não integração.
- **Integração Google/Meta Ads** → a aba "Campanha" do cliente é só chat. Dashboard de Ads é o Adash, projeto separado.

---

## Fora do escopo — Modelo 2 (reunião marcada a pedido dele)

Portal do cliente final: acesso próprio, "Trello do cliente", aprovação de entregas. Cotar como **aditivo** depois da reunião — nunca embutir no Modelo 1.

---

## Notificações, anexos e prazo — DEFINIDOS (16/jul, respostas via Nicolas)

- **Notificações:** só contador de não lidas (badge) dentro do sistema. **+ som de mensagem nova como presente-surpresa pro Arialdo** — não entra na proposta nem no preço, é cortesia a revelar na entrega. Esforço mínimo (evento do realtime + preferência de mudo).
- **Anexos:** sem vídeo. Só texto, imagem, documento (PDF e afins) e links. Upload padrão resolve; storage leve, free tier do Supabase dura muito tempo.
- **Prazo:** sem urgência. Cronograma proposto por Nicolas conforme agenda (IRBIS/Zapfy têm prioridade de caixa).

Com isso o escopo do Modelo 1 está 100% fechado — nenhuma pendência de descoberta. Próximo passo: estimativa de esforço por módulo → preço → proposta.

## Hospedagem e manutenção — DEFINIDOS (Arialdo, 16/jul)

**Hospedagem:** nas contas da QG. Nicolas indica a stack ideal, a QG contrata e paga direto. Recomendação: **Vercel (front) + Supabase (auth, banco, realtime pro chat, storage)** — contas no e-mail da QG com Nicolas como colaborador. Para 8 usuários, free tier aguenta o início; custo provável R$0–25/mês. Vantagem pra IRBIS: zero custo recorrente escondido, zero dependência de infra própria.

**Manutenção:** retainer pequeno, referência dele = ~2h/mês para otimizar/ajustar. Regras a fixar na proposta:
- 2h/mês cobre **ajuste e correção**, nunca funcionalidade nova — feature é aditivo cotado à parte. É aqui que retainer pequeno morre se não tiver fronteira.
- Definir valor da hora adicional quando estourar o pacote.
- O frame dele "não vai precisar de muita manutenção, é só um gerenciador de tarefas" está meio certo: com Vercel+Supabase gerenciados, infra dá pouco trabalho mesmo. O risco não é servidor, é "ajustezinho" que na verdade é feature.

## Condições comerciais (interno — não vai pro cliente)

- **Entrada paga antes de começar** e escopo assinado — a QG desistiu do Adash em mai/2026 depois de termo assinado.
- Sem percentual/revenue share: uso interno, preço cheio.
- Feature nova sobre o protótipo = aditivo. O que vale é este escopo, não "o que estiver no Lovable".
- Proposta de sociedade no Adash: responder "depois da entrega do QG OS". MVP de validação, se rolar, só remunerado ou com participação assinada antes de codar.
