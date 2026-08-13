# Prompt — Deck de Kickoff MINUTA v2

Cole este prompt inteiro pra quem for construir o deck (Claude Code, outra sessão, outro agente). Ele tem tudo que existe até agora: Anexo I, Questionário de Descoberta, o deck anterior (`00-contrato/Kickoff A. Cunha Advocacia.pdf`) e o rascunho de arquitetura (`arquitetura-tecnica-rascunho.md`).

---

## PROMPT

Construa um deck de apresentação em HTML (16:9, uma seção `<section>` por slide, com quebra de página pra exportar em PDF), pra ser apresentado ao vivo por Nicolas Cunha (IRBIS) numa reunião de kickoff com Ana Cunha (A. Cunha Advocacia) e as outras 2 advogadas do escritório.

**Por que este deck é a v2, não uma cópia do anterior:** o deck de 01/ago (`00-contrato/Kickoff A. Cunha Advocacia.pdf`) tratava o projeto como se ainda estivesse em fase de descoberta — genérico, sem mostrar que a IRBIS já processou as respostas do questionário. Desde então: o questionário de descoberta (`00-contrato/Questionario_Respondido (1).pdf`) foi lido a fundo, e existe um rascunho de arquitetura técnica já revisado (`arquitetura-tecnica-rascunho.md`) com riscos reais mapeados e decisões concretas identificadas. O deck novo precisa **provar que entendemos o escritório**, não just listar módulos — e ser honesto sobre onde o risco técnico está, não só vender.

### Direção de marca (tokens reais do site em produção, não inventar)

```css
--bg:      #F2EFE9;   /* fundo claro padrão */
--s1:      #FAF8F4;   /* fundo claro, cards */
--s2:      #E1DCD0;   /* fundo claro, bordas/divisores */
--accent:  #4A5D43;   /* verde sálvia — único acento de cor */
--text:    #26251F;   /* tinta escura */
--muted:   #6E6C60;   /* texto secundário */
--f:       'Archivo', sans-serif;   /* corpo, labels, uppercase tracking */
--f-serif: 'Besley', Georgia, serif; /* títulos e números grandes */
```

Slide escuro = fundo `#26251F` (var(--text) do tema claro), texto `#F2EFE9` (var(--bg) do tema claro) — é a mesma paleta invertida, não uma cor nova. Acento verde (`#4A5D43`) igual nos dois modos. Fontes: `/Design/fonts/besley-latin.woff2` e `/Design/fonts/archivo-latin.woff2` (self-hosted, já no repo do site — reaproveitar os arquivos, não linkar Google Fonts).

Cabeçalho de marca: ícone do olho do leopardo (mesmo do site, `Design/logo/`) + "IRBIS · MINUTA" em caixa alta, tracking largo, `--f`. Título grande sempre em `--f-serif`.

Alternância dark/light por slide, como no deck anterior — mas **use a escolha de cor pra hierarquizar conteúdo**, não decorativamente: slide escuro = fato ou consequência que pede atenção (o problema, os riscos, o "obrigado"); slide claro = estrutura, listas, tabela, decisão a tomar.

### Estrutura de conteúdo — 12 seções, com o que cada uma PRECISA conter

1. **Capa.** "MINUTA" + subtítulo "IA para petição inicial, réplica e recursos" + "Kickoff do projeto — A. Cunha Advocacia."

2. **Por que este projeto existe (dado real, não estimativa).** Do questionário: petição inicial 2–5 dias, réplica 5 dias, recursos 5 dias — até 15 dias de advogada por processo. 200–250 processos ativos, 3 advogadas, 4–6 processos novos por mês. Isso já existia no deck v1 — manter, é o número mais forte que a IRBIS tem.

3. **O fluxo inteiro do escritório, não só o trecho automatizado.** Novo. Puxar do questionário: reunião com o cliente → apuração de pedidos → pedido de documentos → e-mail com resumo dos pedidos + contratação → petição inicial → tentativa de acordo (ou audiência) → réplica e manifestações → sentença → embargos → recursos (TRT/TST) → execução de valores. Mostrar o fluxo completo e marcar visualmente só os 3 pontos que o MINUTA toca (inicial, réplica, recursos) — o resto continua manual, e isso precisa ficar claro, não implícito.

4. **O que o MINUTA entrega — 6 módulos.** Painel do escritório, Base da casa, Petição inicial, Réplica e manifestações, Recursos, Jurisprudência verificada. Mesma lista do deck v1 (está correta, confere com o Anexo I). Adicionar em "Jurisprudência verificada": não é busca perfeita — quando a fonte pública falhar, o sistema sinaliza e permite conferência manual, nunca inventa citação. Essa honestidade vai NO SLIDE, não só no rascunho interno.

5. **O que confirmamos com vocês — o fluxo e as ferramentas de hoje.** Manter do deck v1: chips do fluxo, ferramentas atuais (Jusbrasil, Google Drive/OneDrive, Windows, sem sistema jurídico), TRTs mais acessados (TRT 2, TRT 15).

6. **Critério de sucesso — definido com precisão, não em slogan.** Trocar "5 dias → 1 dia" solto por: **"peça pronta para revisão em até 1 dia útil, contado a partir do momento em que os documentos do caso entram no sistema"** — cita o critério de aceite nº 4 do Anexo I quase literal. Isso evita a maior fonte de desalinhamento: "pronto" não é "protocolado".

7. **Riscos que estamos assumindo, de saída.** Novo, e é o slide mais importante da v2. Dois riscos reais, sem esconder: (a) busca de jurisprudência depende de portais públicos de tribunal — sem API oficial, sujeitos a CAPTCHA, mudança de estrutura, PDF escaneado; quando falhar, conferência manual, nunca citação fabricada; (b) réplica por ID de documento pode não identificar documento mal digitalizado; o sistema sinaliza o que não reconhece, nunca inventa um ID. Enquadrar como "é assim que evitamos prometer o que a tecnologia não garante", não como desculpa.

8. **Escopo desta fase — entra vs. aditivo.** Igual ao deck v1: entra = plataforma com acesso das 3 advogadas, migração de modelos/teses/jurisprudências, geração das 3 peças, busca com fonte, resumo processual, treinamento, ajuste de formato. Aditivo = recepção automatizada de cliente, acesso de cliente à plataforma, integração com software jurídico, outras áreas.

9. **Decisões para fechar nesta reunião — checklist único.** Novo, substitui o slide fragmentado do v1 (que só tinha 2 itens). Consolidar tudo que hoje está espalhado entre o Anexo I, o questionário e o rascunho de arquitetura:
   - Indicadores de sucesso a acompanhar (nº de peças/mês, tempo médio por peça, ou outro).
   - Prioridade da base de conhecimento na fila de entrega.
   - Formato de saída da peça: `.docx` editável, PDF, ou os dois — e o que precisa ser preservado do template (cabeçalho, rodapé, numeração, estilo).
   - Política de anonimização: dados completos para a Anthropic mediante aceite explícito, anonimização automática com validação, ou processamento local de etapas específicas — decisão do escritório, não da IRBIS.
   - Quem, no escritório, aprova a base migrada (modelos/teses/jurisprudências) antes de ela valer nas peças.
   - Confirmação de que a solução roda em nuvem, nas contas do próprio escritório (Vercel + Anthropic) — e não localmente como cogitado na fase de descoberta. Não é pedido de permissão, é alinhamento de expectativa.

10. **Como funciona — linha do tempo.** Manter estrutura do v1 (4 fases: Aceite → Base e primeira peça → Réplica e recursos → Rotina e acompanhamento), mas marcar com precisão o que está concluído hoje mesmo (Aceite) e que a Fase 2 começa a valer a partir desta reunião, não da assinatura.

11. **O que a IRBIS precisa do escritório.** Manter do v1: acesso ao Google Drive e OneDrive (onde vivem os modelos e a base de jurisprudência), confirmação de que toda peça continua sendo revisada por uma advogada antes do protocolo, casos reais para calibrar as fases 2 e 3. Regra do prazo: item atrasado empurra a entrega o mesmo tanto de dias.

12. **Obrigado / próximo passo.** Fechar amarrando ao checklist do slide 9: "confirmem aqui as decisões" em vez de deixar solto.

### O que NÃO incluir

- Nenhum número da IRBIS que não seja sobre este projeto (nada de +R$350k, LTV, outros clientes) — o slide 2 já tem o número mais forte, que é do próprio escritório.
- Nada da lista "aditivo" (slide 8) apresentado como se já estivesse incluso.
- Sem "ecossistema", "transformação", "jornada", "solução resolve" ou qualquer falsa agência — nomear sempre quem faz o quê (o sistema gera, a advogada revisa).
- Sem promessa de integração com PJe, Jusbrasil (conta/API) ou software jurídico em nenhum slide — nem como visão futura, isso é conversa de aditivo, não de deck de kickoff.
- Sem "até ficar bom" nem "ajustes ilimitados" em lugar nenhum — todo "até" tem número (já tem: 3 rodadas por tipo de peça, 1 dia útil, etc.).

### Formato de entrega

HTML autocontido, 16:9, com fontes self-hosted a partir de `site/Design/fonts/`. Pronto para impressão/exportação em PDF (mesma lógica do deck anterior). Nome sugerido: `Kickoff A. Cunha Advocacia v2.html`, salvo em `02 - Projetos/A. Cunha Adv/00-contrato/` ao lado da v1, sem sobrescrever o PDF existente.
