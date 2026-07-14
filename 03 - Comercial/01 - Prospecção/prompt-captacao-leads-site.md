# Prompt de captação — leads com necessidade publicada de site

Versão em português do prompt de busca de leads (original em inglês, adaptado em 13/jul/2026). Usar no Claude Code (busca web + LinkedIn logado via Chrome), no ChatGPT ou em qualquer ferramenta de pesquisa. Alimenta o gate de qualificação da skill `irbis-demo-prospect`.

Nota de adaptação: o original tinha sobras de outro prompt (queries de "data analytics", "built our MVP on website design"). Foram limpas; as queries abaixo miram pedidos reais de criação ou reforma de site.

---

## Objetivo

Encontrar pessoas postando publicamente (redes sociais, blogs, fóruns) que precisam de criação ou redesign de site e que expõem NOME REAL COMPLETO e domínio da empresa. Excluir plataformas de freelancer por completo.

## Onde buscar (somente estas)

Prioridade 1 (decisão de 13/jul/2026): **LinkedIn, posts de perfis pessoais de donos de negócio** (nunca LinkedIn Jobs, nunca página de empresa).

Complementares:
- Twitter/X: posts de perfis claros de negócio ou fundador
- Indie Hackers: posts de founders solo com perfil público
- Medium e blogs pessoais: artigos assinados com nome real mencionando a necessidade
- Product Hunt: makers falando de necessidade de site
- Reddit: só subreddits de empreendedorismo onde o autor expõe empresa e nome real
- Facebook: posts públicos de páginas de negócio
- YouTube: descrições de vídeo de empreendedores
- Fóruns de aceleradoras e comunidades de startup públicas

## Onde NUNCA buscar (identidade do cliente escondida)

Freelancer.com, Upwork, Fiverr, PeoplePerHour, 99designs, Guru.com, Toptal e qualquer plataforma de freelance que anonimize o cliente. Post anônimo não vale nada para este processo.

## Queries de busca

Português:
- site:linkedin.com/in "preciso de um site" OR "preciso de site novo"
- site:linkedin.com "indicação" "quem faz site" OR "web designer"
- "sou fundador" OR "sou fundadora" "refazer o site" OR "site novo"
- "minha empresa" "site" "indicação de alguém" -site:workana.com -site:99freelas.com.br
- "nosso site precisa" "alguém indica" OR "procuro"

Inglês:
- site:linkedin.com/in "looking for a web designer" OR "need a new website"
- site:twitter.com "need help with our website" "founder" OR "my startup"
- site:indiehackers.com "website redesign" OR "need a website" "my project"
- site:medium.com "redesigning our website" "founder" OR "CEO"
- "I'm the founder" "need a website" OR "website redesign" -site:upwork.com -site:freelancer.com
- site:producthunt.com "landing page" OR "website" "looking for help"
- "business owner" "our website is outdated" OR "website recommendations"

Variações pessoais (as que mais entregam nome + domínio juntos):
- "Hi, I'm" OR "My name is" "need a website" OR "website redesign"
- "Meu nome é" OR "Sou o" OR "Sou a" "preciso de um site"
- "I founded" OR "fundei a" "website" OR "site"

## O que o post precisa ter (obrigatório, sem exceção)

1. **Domínio da empresa** (empresa.com) OU **perfil no LinkedIn** (linkedin.com/in/nome) acessível
2. **Contexto claro de dono/decisor**: founder, CEO, CTO, sócio, dono de negócio. Usuário aleatório não conta
3. **Pedido específico de site**: criação, redesign, landing page, e-commerce. Menção vaga ("um dia queria melhorar o site") não conta
4. **Data do post ≤ 30 dias** (ideal ≤ 7: quem pediu ontem ainda procura)

Excluir sem dó: post anônimo ou só username; sem contexto de negócio; sem pedido específico; qualquer plataforma de freelance.

## Filtros IRBIS (aplicar por cima, antes de virar demo)

- Escopo é SITE. App, branding, dashboard, SaaS custom: fora.
- Capacidade de pagamento aparente: negócio ativo com receita (corte SAM ≥ R$8k/projeto). Lead abaixo disso só como treino, com decisão explícita do Nicolas.
- Lead validado entra no gate da skill `irbis-demo-prospect`; máximo de 1 demo/dia.

## Formato de saída (por lead)

```
- **Nome:** [nome real completo]
- **Site/Domínio:** [empresa.com OU URL do LinkedIn]
- **O que pediu:** [criação/redesign/landing/e-commerce + detalhe do post]
- **Plataforma de origem:** [LinkedIn, X, Reddit...]
- **Data do post:** [quando]
- **Contexto de negócio:** [founder da X, CEO da Y...]
- **Link do post:** [URL]
```

Regra final: sem domínio da empresa ou LinkedIn acessível, o lead NÃO entra na lista.
