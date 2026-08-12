# Prompt de captação — leads com necessidade publicada de sistema, automação ou IA

> ✅ **REESCRITO em 09/ago/2026, pronto pra usar.** Substitui a versão de captação de site (histórico preservado no fim do arquivo). Objetivo, queries de busca e filtros atualizados conforme `CLAUDE.md` e `onboarding-comercial-novo-colaborador.md`: ICP é donos de negócio da economia real, sem nicho definido; escopo é Sistemas, Soluções com IA e Consultoria de IA — site fica de fora.

Nota de adaptação: a estrutura de busca (onde procurar, o que o post precisa ter, formato de saída) é a mesma da versão anterior — só o vocabulário-alvo (o que a pessoa está pedindo) mudou de "site" pra "sistema/automação/IA".

---

## Objetivo

Encontrar pessoas postando publicamente (redes sociais, blogs, fóruns) que expõem dor de operação manual, desorganizada ou sem sistema — ou que já pedem sistema, automação ou IA pro negócio — e que expõem NOME REAL COMPLETO e domínio da empresa. Excluir plataformas de freelancer por completo.

## Onde buscar (somente estas)

Prioridade 1 (decisão de 13/jul/2026, mantida): **LinkedIn, posts de perfis pessoais de donos de negócio** (nunca LinkedIn Jobs, nunca página de empresa).

Complementares:
- Twitter/X: posts de perfis claros de negócio ou fundador
- Indie Hackers: posts de founders solo com perfil público
- Medium e blogs pessoais: artigos assinados com nome real mencionando a necessidade
- Product Hunt: makers falando de necessidade de sistema/automação
- Reddit: só subreddits de empreendedorismo onde o autor expõe empresa e nome real
- Facebook: posts públicos de páginas de negócio
- YouTube: descrições de vídeo de empreendedores
- Fóruns de aceleradoras e comunidades de startup públicas

## Onde NUNCA buscar (identidade do cliente escondida)

Freelancer.com, Upwork, Fiverr, PeoplePerHour, 99designs, Guru.com, Toptal e qualquer plataforma de freelance que anonimize o cliente. Post anônimo não vale nada para este processo.

## Queries de busca

Português:
- site:linkedin.com/in "preciso automatizar" OR "preciso de um sistema" OR "quero implementar IA"
- site:linkedin.com "indicação" "quem faz automação" OR "consultoria de IA" OR "sistema sob medida"
- "sou fundador" OR "sou fundadora" "processo manual" OR "planilha" "travando" OR "atrapalhando"
- "minha empresa" "sistema" "indicação de alguém" -site:workana.com -site:99freelas.com.br
- "nossa operação" "ainda é tudo manual" OR "precisa de automação"
- "dono de negócio" "não sei por onde começar com IA" OR "quero usar IA na empresa"

Inglês:
- site:linkedin.com/in "looking for automation" OR "need a custom system" OR "want to implement AI"
- site:twitter.com "our process is still manual" "founder" OR "my startup"
- site:indiehackers.com "need automation" OR "manual workflow" "my project"
- site:medium.com "automating our operations" "founder" OR "CEO"
- "I'm the founder" "need to automate" OR "manual process is killing us" -site:upwork.com -site:freelancer.com
- site:producthunt.com "internal tool" OR "automation" "looking for help"
- "business owner" "our operations are still manual" OR "need an AI consultant"

Variações pessoais (as que mais entregam nome + domínio juntos):
- "Hi, I'm" OR "My name is" "need automation" OR "need a custom system"
- "Meu nome é" OR "Sou o" OR "Sou a" "preciso automatizar" OR "preciso de um sistema"
- "I founded" OR "fundei a" "manual process" OR "processo manual"

## O que o post precisa ter (obrigatório, sem exceção)

1. **Domínio da empresa** (empresa.com) OU **perfil no LinkedIn** (linkedin.com/in/nome) acessível
2. **Contexto claro de dono/decisor**: founder, CEO, CTO, sócio, dono de negócio. Usuário aleatório não conta
3. **Pedido ou dor específica de operação**: processo manual, planilha, falta de sistema, automação, IA. Menção vaga ("um dia queria melhorar a empresa") não conta
4. **Data do post ≤ 30 dias** (ideal ≤ 7: quem pediu ontem ainda procura)

Excluir sem dó: post anônimo ou só username; sem contexto de negócio; sem pedido específico; qualquer plataforma de freelance.

## Filtros IRBIS (aplicar por cima, antes de virar demo)

- **Escopo é Sistemas, Soluções com IA (automação/bot/agente) e Consultoria de IA.** Site, landing page, branding, identidade visual avulsa, app/dashboard avulso fora do que se enquadra em Sistemas: fora, sem exceção (ver `CLAUDE.md`).
- Capacidade de pagamento aparente (corte SAM ≥ R$3.000/projeto — piso confirmado da faixa de Sistemas em 09/ago/2026; abaixo disso, provavelmente não fecha na faixa atual). Consultoria e Bot de IA têm piso próprio: Consultoria R$5.000, Bot de IA R$1.000 de setup mais mensalidade que começa em R$500 e vai até R$3.000 conforme o tamanho da operação. Ajustar o corte conforme o que o lead sinaliza precisar; operação grande com o bot no centro do atendimento paga o topo da faixa, não o piso.
- Lead validado entra no gate da skill `irbis-demo-prospect`; máximo de 1 demo/dia.

## Formato de saída (por lead)

```
- **Nome:** [nome real completo]
- **Site/Domínio:** [empresa.com OU URL do LinkedIn]
- **O que pediu:** [sistema/automação/IA + detalhe do post]
- **Plataforma de origem:** [LinkedIn, X, Reddit...]
- **Data do post:** [quando]
- **Contexto de negócio:** [founder da X, CEO da Y...]
- **Link do post:** [URL]
```

Regra final: sem domínio da empresa ou LinkedIn acessível, o lead NÃO entra na lista.

---

## Histórico — versão site (vigente até 04/ago/2026, fora de escopo)

> Objetivo era encontrar pessoas postando publicamente que precisavam de criação ou redesign de site, com nome real completo e domínio da empresa expostos. Mesma estrutura (onde buscar, onde nunca buscar, formato de saída) — só o vocabulário-alvo era site.

Queries buscavam por: "preciso de um site", "site novo", "web designer", "website redesign", "landing page" — em português e inglês, nas mesmas plataformas (LinkedIn, Twitter/X, Indie Hackers, Medium, Product Hunt, Reddit, Facebook, YouTube).

Filtro de escopo (linha 65 original) **excluía** App, branding, dashboard, SaaS custom — o oposto do filtro atual, que inclui exatamente isso via Sistemas.

Corte de capacidade de pagamento era SAM ≥ R$8.000/projeto, calibrado pro mercado de site — não confirmado pras 3 frentes atuais, por isso foi substituído pelo piso real de R$3.000 (Sistemas) em 09/ago/2026.
