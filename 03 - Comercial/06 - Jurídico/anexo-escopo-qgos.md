# Anexo I - Escopo do Projeto

## QG OS - Sistema interno da QG

**Contratante:** QG Group (Arialdo Pimentel)
**Prestador:** Nicolas Cunha (IRBIS)

Este anexo é parte integrante do Contrato de Prestação de Serviços de Desenvolvimento de Software. O que não está descrito aqui não está contratado. Qualquer item fora deste anexo segue a Cláusula 4 do contrato (aditivo).

---

## O que é o QG OS

Sistema interno de gestão de tarefas e clientes da QG. Substitui o Trello (gestão de demandas) e o Discord (comunicação por cliente). É para uso interno do time da QG, sem revenda nem comercialização pela QG.

**Usuários:** time interno da QG, hoje em torno de 8 pessoas. O número de usuários pode variar ao longo do tempo sem impacto neste escopo.

---

## Módulos incluídos (escopo fechado)

### 1. Login e permissões

- Cada pessoa acessa o sistema com login próprio.
- Dois níveis de acesso: administrador, com acesso total, e equipe, com acesso restrito por cliente e por canal.

### 2. Quadro de demandas (kanban)

- Colunas: Backlog, A Fazer, Em Andamento, Em Revisão, Ajustes, Concluído.
- Cada card traz título, cliente, responsável, prioridade, data de entrega, briefing e anexos.
- Filtro por status, colaborador e cliente. Os cards podem ser arrastados entre colunas.

### 3. Painel (dashboard)

- Gerado automaticamente a partir do quadro de demandas, sem preenchimento manual.
- Mostra contadores de demandas (em andamento, atrasadas, concluídas, total), demandas por cliente, atividade recente, prazos próximos e carga de trabalho por colaborador.

### 4. Clientes e chat da equipe

- Cadastro de cada cliente da QG: segmento, data de início, responsável e status (ativo ou pausado).
- Cada cliente cadastrado ganha, automaticamente, 5 canais de chat interno: O cliente, Comunicação, Conteúdo, Campanha e Arquivos.
- Os canais são para o time da QG conversar entre si, com histórico e anexos. Não é um chat com o cliente final da QG.
- Este módulo substitui o Discord.

### 5. Conteúdos

- Repositório interno de tutoriais e processos da QG, com anexo de documentos.
- É um espaço de organização interna da QG, não de gestão de conteúdo de cliente.

### 6. Calendário de anotações

- Anotações com data, como prazos de entrega.
- Não inclui conexão com agenda externa, reuniões ou convites.

---

## Anexos permitidos dentro do sistema

Nos cards do quadro e nos canais de chat, é possível anexar texto, imagem, documento (PDF e formatos afins) e links. Anexo de vídeo não faz parte deste escopo.

## Notificações

O sistema mostra um contador de mensagens não lidas (badge) em cada canal e card. Som de notificação não faz parte deste escopo.

## Infraestrutura

O sistema roda em contas de hospedagem no nome da QG, recomendação Vercel para o site e Supabase para login, banco de dados, tempo real do chat e armazenamento de arquivos. A QG contrata e paga essas contas diretamente. O Prestador entra como colaborador técnico para configurar e operar o que o projeto precisa.

---

## O que fica fora deste escopo (aditivo)

Os itens abaixo não estão incluídos neste contrato. Se a QG quiser qualquer um deles, cada um é orçado e contratado à parte, conforme a Cláusula 4 do contrato.

- **Portal do cliente final**: acesso próprio do cliente da QG ao sistema, com visão tipo "Trello do cliente" e aprovação de entregas.
- **Calendário com integração de agenda**: conexão com Google Agenda ou similar, reuniões e convites.
- **Integração com Trello e Discord**: o QG OS substitui essas ferramentas, não se conecta a elas.
- **Integração com Google Ads e Meta Ads**: o canal Campanha dentro de cada cliente é só um espaço de chat. Painel de anúncios não faz parte deste sistema.
- **Página de Arquivos separada**: o que essa página faria está coberto pelo módulo Conteúdos (item 5).
- Qualquer funcionalidade não listada nos módulos 1 a 6 acima.

---

## Prazo

Prazo estimado de entrega: 10 dias úteis, contados a partir da confirmação da entrada e do recebimento de tudo que depender da QG (acessos às contas de Vercel e Supabase, informações dos clientes e demais materiais necessários).

Esse prazo segue a Cláusula 6 do contrato: sempre que a entrega parar à espera de algo da QG, o prazo fica pausado e volta a correr quando o item chega.

## Entrega

Ao final, o Prestador entrega para a QG: o código-fonte do sistema, os dados cadastrados e o acesso às contas de hospedagem, tudo em nome da QG.
