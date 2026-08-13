"""
IRBIS · Notes Series — gerador das 3 séries de carrosséis.
- site_notes (9 carrosséis sobre web/sites)
- product_notes (9 carrosséis sobre produtos digitais)
- direction_notes (9 carrosséis sobre direção criativa)

Total: 27 carrosséis × 4 slides = 108 PNGs.
"""

import sys
sys.path.insert(0, "/home/claude/irbis")

from pathlib import Path
from build_slides import BRAND, html_for_slide

def cover(num_label, headline, subhead):
    return {
        "num": 1, "name": "01_cover", "type": "cover",
        "tag_top": num_label, "tag_color": BRAND["muted"],
        "headline": headline, "subhead": subhead, "body": None,
        "tag_left": "@byirbis", "tag_right": "↳ swipe",
    }

def diag(slide_num, tag, headline, body):
    return {
        "num": slide_num, "name": f"0{slide_num}_d", "type": "diagnostic",
        "tag_top": tag, "tag_color": BRAND["signal"],
        "headline": headline, "subhead": None, "body": body,
        "tag_left": "@byirbis", "tag_right": f"0{slide_num} / 04",
    }

def thesis(tag, h_a, h_b, body):
    return {
        "num": 4, "name": "04_thesis", "type": "thesis",
        "tag_top": tag, "tag_color": BRAND["signal"],
        "headline_a": h_a, "headline_b": h_b, "body": body,
        "tag_left": "@byirbis", "tag_right": "04 / 04",
    }


# ============================================================================
# SITE NOTES — 9 carrosséis sobre web/sites
# ============================================================================

SITE_NOTES = [
    {
        "id": "01_hero_is_decision", "title": "Hero is decision",
        "slides": [
            cover("Site notes — 01", "Hero is decision.", "Não decoração."),
            diag(2, "01 / O que hero é",
                 "3 segundos\nde filtro.",
                 "Hero não é decoração no topo. É o filtro de 3 segundos que decide se o usuário continua ou volta. Maior peso da página inteira."),
            diag(3, "02 / O que tratam como",
                 "Vocês tratam\ncomo banner.",
                 "Logo grande, frase genérica, ilustração de stock, CTA azul. Nenhum desses elementos comunica nada específico em 3 segundos."),
            thesis("03 / Conclusão",
                   "Hero decide tudo.",
                   "Trate como tal.",
                   "Cada decisão de hero define como tudo abaixo será lido."),
        ],
    },
    {
        "id": "02_scroll_is_layout", "title": "Scroll is layout",
        "slides": [
            cover("Site notes — 02", "Scroll is layout.", "Above the fold morreu."),
            diag(2, "01 / O paradigma morto",
                 "Above the fold\nem 2014.",
                 "Hierarquia de jornal não é hierarquia de site. Tudo importante na primeira tela = tudo amontoado, nada respira, nada lê bem."),
            diag(3, "02 / O paradigma vivo",
                 "Scroll é\nnarrativa.",
                 "Layout virou tempo. Cada section é um beat. Marca contemporânea desenha o site como filme — começo, desenvolvimento, clímax, CTA."),
            thesis("03 / Conclusão",
                   "Layout virou tempo.",
                   "Não tela.",
                   "Sites que ainda são layout estático perderam pra sites que são narrativa em scroll."),
        ],
    },
    {
        "id": "03_mobile_first_ended", "title": "Mobile-first ended",
        "slides": [
            cover("Site notes — 03", "Mobile-first ended.", "Fluid começou."),
            diag(2, "01 / Por que parou",
                 "Mobile-first\nvirou conservador.",
                 "Quando virou padrão, virou caixinha. 'Pensa mobile primeiro' parou de ser radical e virou checklist mecânico que limita criatividade."),
            diag(3, "02 / O novo padrão",
                 "Fluid: site\nse adapta.",
                 "Site único que se reorganiza inteligente em qualquer breakpoint. Não tem 'versão mobile da desktop'. Tem comportamento adaptativo."),
            thesis("03 / Conclusão",
                   "Mobile-first",
                   "virou checklist.",
                   "Padrão 2026 é fluid. Hierarquia que muda de ênfase, não de estrutura, em cada breakpoint."),
        ],
    },
    {
        "id": "04_performance_is_taste", "title": "Performance is taste",
        "slides": [
            cover("Site notes — 04", "Speed is taste.", "Site lento parece cafona."),
            diag(2, "01 / O que rapidez comunica",
                 "Rápido\nsinaliza cuidado.",
                 "Site rápido diz 'pensaram em você'. Site lento diz 'WordPress + 14 plugins'. O cérebro decide isso antes de qualquer pixel terminar de carregar."),
            diag(3, "02 / O novo benchmark",
                 "LCP < 1.2s.",
                 "Linear, Vercel, Resend, Stripe. Todos sub-1.5s. Esse é o novo padrão internacional. Acima disso, sua marca parece amadora."),
            thesis("03 / Conclusão",
                   "Lento é cafona.",
                   "Mesmo se for caro.",
                   "Performance virou taste. Site que demora a abrir não é só lento. É feio, antes de ser visto."),
        ],
    },
    {
        "id": "05_404_says_more", "title": "404 says more",
        "slides": [
            cover("Site notes — 05", "404 says more.", "Que sua home."),
            diag(2, "01 / Onde marca desaparece",
                 "Loading, 404,\nempty state.",
                 "Marca esmera na home, esquece em todo o resto. Esses estados são onde o usuário decide se respeita a marca, porque é onde ela revela cuidado real."),
            diag(3, "02 / O que faz direito",
                 "Cada estado\né microbrand.",
                 "Linear tem 404 com a personalidade da marca. Vercel tem skeleton estilizado. Apple tem SF Symbols animadas. Tudo é decisão consciente, nada é default."),
            thesis("03 / Conclusão",
                   "Home é fácil.",
                   "Resto é teste.",
                   "Marca real se mostra nas páginas que ninguém otimiza. 99% das marcas falham aqui."),
        ],
    },
    {
        "id": "06_animation_has_tax", "title": "Animation has tax",
        "slides": [
            cover("Site notes — 06", "Animação cobra.", "Imposto invisível."),
            diag(2, "01 / O custo invisível",
                 "Toda animação\ncobra.",
                 "Cobra performance, cobra atenção, cobra complexidade de manutenção. A maior parte das animações que vemos em sites não compensa o que cobra."),
            diag(3, "02 / Quando vale",
                 "Animação útil\né rara.",
                 "Vale quando ensina (mostra como algo funciona), reforça hierarquia (guia o olho), ou marca a marca. Resto é decoração e custa caro."),
            thesis("03 / Conclusão",
                   "Menos animação.",
                   "Melhor animação.",
                   "Subtração antes de adição. Uma animação cirúrgica vale 10 decorativas — e cobra menos imposto."),
        ],
    },
    {
        "id": "07_footer_unfinished", "title": "Footer unfinished",
        "slides": [
            cover("Site notes — 07", "Footer is exit.", "Onde marca para."),
            diag(2, "01 / O sintoma",
                 "18 links\nem 3 colunas.",
                 "Footer da maioria dos sites é depósito. Tudo que ninguém quis priorizar foi parar lá. É onde marca desistiu de hierarquia e admitiu derrota."),
            diag(3, "02 / Como deveria ser",
                 "Footer é\nsegunda chance.",
                 "Última coisa que o usuário vê. Última oportunidade de dizer quem você é. Marca real desenha footer com o mesmo cuidado da hero."),
            thesis("03 / Conclusão",
                   "Footer importa.",
                   "Tanto quanto hero.",
                   "Cada elemento do footer é decisão consciente ou desistência. Não tem meio termo."),
        ],
    },
    {
        "id": "08_type_sets_tone", "title": "Type sets tone",
        "slides": [
            cover("Site notes — 08", "Type sets tone.", "Mais que paleta."),
            diag(2, "01 / O que se acredita",
                 "Cor define\nemoção.",
                 "Mantra antigo do design: paleta carrega emoção. Funciona em embalagem física. Em site, é exagero — quem assiste em dark mode vê outra paleta inteira."),
            diag(3, "02 / O que importa mais",
                 "Tipografia\nrespira.",
                 "Tipografia variable que muda peso, espaçamento, óptica em contexto. Define temperatura emocional muito mais que cor — e é robusta a dark mode, contraste, acessibilidade."),
            thesis("03 / Conclusão",
                   "Cor decora.",
                   "Tipo emociona.",
                   "Em site, tipografia é onde a marca sente. Cor é onde ela aparece. Investe na ordem certa."),
        ],
    },
    {
        "id": "09_static_ages", "title": "Static ages fast",
        "slides": [
            cover("Site notes — 09", "Static ages fast.", "Razão neurológica."),
            diag(2, "01 / O sintoma",
                 "Estático\nenvelhece.",
                 "Não importa quão bem desenhado. Cérebro lê tela parada como informação datada. Razão evolutiva: olho humano busca movimento como sinal de relevância."),
            diag(3, "02 / O que dura",
                 "Motion bom\nsobrevive.",
                 "Motion bem feito (sutil, intencional, integrado ao scroll) faz site continuar 'novo' por 5+ anos. Não é decoração — é manutenção de relevância visual."),
            thesis("03 / Conclusão",
                   "Estático morre.",
                   "Motion respira.",
                   "Investe em motion como investe em performance. Não é luxo, é vida útil."),
        ],
    },
]


# ============================================================================
# PRODUCT NOTES — 9 carrosséis sobre produtos digitais
# ============================================================================

PRODUCT_NOTES = [
    {
        "id": "01_product_is_decisions", "title": "Product is decisions",
        "slides": [
            cover("Product notes — 01", "Produto não é\nfeatures.", "É decisões."),
            diag(2, "01 / O sintoma comum",
                 "Lista de features\nvirou commodity.",
                 "Toda startup B2B tem a mesma página de features. Mesmas integrações, mesmo dashboard, mesma promessa. Listar virou redundância."),
            diag(3, "02 / O que diferencia",
                 "Decisão sobre\no que NÃO ter.",
                 "Produto bom é definido pelo que recusa fazer. Recusas cirúrgicas (não-features) são onde o produto se torna específico, defensável, memorável."),
            thesis("03 / Conclusão",
                   "Features comoditizam.",
                   "Decisões diferenciam.",
                   "Você compete em decisões, não em listas. Mostra o que recusou, não só o que tem."),
        ],
    },
    {
        "id": "02_empty_state", "title": "Empty state is product",
        "slides": [
            cover("Product notes — 02", "Empty state\né o produto.", "No minuto 0."),
            diag(2, "01 / Quando começa",
                 "Minuto 0.\nZero dados.",
                 "Como o produto se apresenta no primeiro segundo de uso, antes de qualquer dado existir, define se o usuário continua ou vai embora."),
            diag(3, "02 / O que costuma ter",
                 "'Não há dados\npor enquanto.'",
                 "É a frase mais comum em empty state — e a mais perdida. Empty state é pitch ativo, não placeholder. Onde produto vende a si mesmo, sem dados pra esconder atrás."),
            thesis("03 / Conclusão",
                   "Empty state vende.",
                   "Não é placeholder.",
                   "Cada estado vazio é oportunidade de conversão. Cada placeholder genérico é venda perdida."),
        ],
    },
    {
        "id": "03_onboarding_not_tour", "title": "Onboarding not tour",
        "slides": [
            cover("Product notes — 03", "Onboarding\nnão é tour.", "Tour morreu em 2020."),
            diag(2, "01 / O modelo morto",
                 "Tutorial de\n7 passos.",
                 "Tour com tooltips numerados era padrão em 2018. Hoje é fricção — usuário fecha modal, pula passos, sai do flow antes de aprender nada."),
            diag(3, "02 / O modelo novo",
                 "Usar antes\nde explicar.",
                 "Onboarding 2026 é colocar o usuário usando algo real (com dados de exemplo, com guidance contextual) nos primeiros 30 segundos. Friction by design substitui tour."),
            thesis("03 / Conclusão",
                   "Tour explica.",
                   "Onboarding ensina.",
                   "Aprende-se fazendo, não vendo. Onboarding bom é o produto se mostrando, não se descrevendo."),
        ],
    },
    {
        "id": "04_microcopy_is_interface", "title": "Microcopy is interface",
        "slides": [
            cover("Product notes — 04", "Microcopy\né interface.", "Não detalhe."),
            diag(2, "01 / Onde mora",
                 "Botão. Label.\nErro. Tooltip.",
                 "Cada palavra na interface é UX tanto quanto cada pixel. Microcopy ruim trava usuário, microcopy bom guia ele sem ele perceber que foi guiado."),
            diag(3, "02 / O sintoma comum",
                 "'Algo deu\nerrado.'",
                 "Mensagem de erro genérica é o sinal mais claro de produto que não pensou em microcopy. Erro bom diz: o que aconteceu, por que, e o que fazer agora."),
            thesis("03 / Conclusão",
                   "Microcopy é UX.",
                   "Não é cosmético.",
                   "Mesmo pixel, microcopy diferente, produto diferente. Trate como design, não como redação."),
        ],
    },
    {
        "id": "05_settings_reveal", "title": "Settings reveal soul",
        "slides": [
            cover("Product notes — 05", "Settings revelam\na alma.", "Onde produto admite."),
            diag(2, "01 / O que escondem",
                 "Tudo que\nficou pra depois.",
                 "Settings é onde features importantes vão morrer. 'Vamos colocar em settings' é o jeito do PM dizer que não soube decidir."),
            diag(3, "02 / O que importa de verdade",
                 "Devia estar\nfora dali.",
                 "Tudo que importa devia estar acessível em 1 clique. Se você precisou esconder em settings, ou não importa, ou você falhou em hierarquia."),
            thesis("03 / Conclusão",
                   "Settings é derrota.",
                   "Default é decisão.",
                   "O que está em settings é o que você não soube decidir. O que está no default é o que você defendeu."),
        ],
    },
    {
        "id": "06_notifications_tax", "title": "Notifications are tax",
        "slides": [
            cover("Product notes — 06", "Push é imposto.", "Cada um cobra."),
            diag(2, "01 / O custo real",
                 "Cada push\ncobra atenção.",
                 "Atenção do usuário é finita. Cada notificação saca dela. Produto que envia 5 notifs por dia está saqueando, não comunicando."),
            diag(3, "02 / Como defender",
                 "Defenda\ncomo dinheiro.",
                 "Atenção não recupera. Toda notif precisa passar em 3 perguntas: importa agora? O usuário pediu? Vai converter algo ou só causar ansiedade?"),
            thesis("03 / Conclusão",
                   "Atenção é finita.",
                   "Trate como tal.",
                   "Produtos que respeitam atenção fidelizam. Produtos que sacam dela morrem em silêncio."),
        ],
    },
    {
        "id": "07_latency_is_feeling", "title": "Latency is feeling",
        "slides": [
            cover("Product notes — 07", "Latência é\nemoção.", "Não métrica."),
            diag(2, "01 / O ponto técnico",
                 "100ms vs\n300ms.",
                 "200 milissegundos. Diferença entre 'produto vivo' e 'produto travado'. Mesmo conteúdo, mesma feature, percepção radicalmente diferente."),
            diag(3, "02 / O ponto humano",
                 "Cérebro lê\ncomo qualidade.",
                 "Latência baixa não é só performance — é sensação física de produto premium. Latência alta vira percebida como amador, mesmo se a feature funcionar perfeito."),
            thesis("03 / Conclusão",
                   "Latência é design.",
                   "Não engenharia.",
                   "Cada milissegundo é decisão de produto. Speed é UX, não otimização."),
        ],
    },
    {
        "id": "08_defaults_are_decisions", "title": "Defaults are decisions",
        "slides": [
            cover("Product notes — 08", "Defaults são\nopinião.", "80% nunca mudam."),
            diag(2, "01 / O que default é",
                 "Sua opinião\ncongelada.",
                 "Default é como você acha que o produto deve ser usado. Vira o comportamento padrão pra 80% dos usuários, que nunca tocam em settings."),
            diag(3, "02 / O custo do default",
                 "Customização\né cilada.",
                 "PM iniciante pensa 'usuário decide'. Customização infinita = nenhuma opinião, nenhum produto. Default forte > setting flexível."),
            thesis("03 / Conclusão",
                   "Defaults > settings.",
                   "Sempre.",
                   "Construa pra sua tese, não pra todas. Quem quer customizar é minoria barulhenta."),
        ],
    },
    {
        "id": "09_power_user_is_product", "title": "Power user is product",
        "slides": [
            cover("Product notes — 09", "Power user\né o produto.", "Os 5% definem."),
            diag(2, "01 / Quem é",
                 "5% que usa\na fundo.",
                 "Quem mora no produto, quem usa atalhos, quem reporta bugs específicos. Esses 5% definem reputação do produto pro mercado inteiro."),
            diag(3, "02 / Por que importa",
                 "Eles que\nfazem review.",
                 "Power users escrevem em LinkedIn, fazem review em G2, recomendam em Slack. Casual user só usa. Power user vira distribuição de marca."),
            thesis("03 / Conclusão",
                   "Construa pros 5%.",
                   "O resto vem.",
                   "Produto que escolhe casual user perde os dois. Produto que escolhe power user ganha os dois."),
        ],
    },
]


# ============================================================================
# DIRECTION NOTES — 9 carrosséis sobre direção criativa
# ============================================================================

DIRECTION_NOTES = [
    {
        "id": "01_direction_is_filter", "title": "Direction is filter",
        "slides": [
            cover("Direction notes — 01", "Direção é\nfiltro.", "Não ideia."),
            diag(2, "01 / O que se pensa",
                 "Diretor tem\nideia melhor.",
                 "Mito comum: diretor criativo é quem tem as melhores ideias. Errado. Em qualquer equipe boa, ideias sobram. O escasso é filtro."),
            diag(3, "02 / O que é de verdade",
                 "Diretor sabe\no que cortar.",
                 "Direção é decidir o que NÃO entra. Curadoria, restrição, recusa. Quem não sabe cortar não direciona — coleciona ideias dos outros."),
            thesis("03 / Conclusão",
                   "Filtro > criatividade.",
                   "Sempre.",
                   "Equipe gera. Diretor escolhe. Não inverta os papéis."),
        ],
    },
    {
        "id": "02_reference_is_vocabulary", "title": "Reference is vocabulary",
        "slides": [
            cover("Direction notes — 02", "Ref é\nvocabulário.", "Sem ela é opinião."),
            diag(2, "01 / O problema sem ref",
                 "Sem ref,\nopinião.",
                 "'Quero algo moderno' significa coisa diferente pra cada pessoa. Sem referência concreta, brief vira interpretação. Interpretação varia. Caos vem."),
            diag(3, "02 / Como começar",
                 "5-10 refs\ncirúrgicas.",
                 "Antes de qualquer brief, define vocabulário com referências específicas. Não 'inspire-se em Linear'. Mostra a section X do site Y porque resolve o problema Z."),
            thesis("03 / Conclusão",
                   "Refs alinham.",
                   "Adjetivos não.",
                   "Referência boa elimina 80% do retrabalho. Adjetivo gera 80% dele."),
        ],
    },
    {
        "id": "03_brief_kills_80", "title": "Brief kills 80%",
        "slides": [
            cover("Direction notes — 03", "Brief mata\n80%.", "Antes de começar."),
            diag(2, "01 / O custo do brief ruim",
                 "Retrabalho\nvem do brief.",
                 "Equipes culpam execução, mas 80% do retrabalho criativo vem de brief vago. Designer entrega o que entendeu. Cliente esperava outra coisa. Ninguém estava errado."),
            diag(3, "02 / O brief cirúrgico",
                 "Problema, audiência,\nrestrição, sucesso.",
                 "4 perguntas. Qual problema resolve? Pra quem? Que restrições têm? Como mede sucesso? Brief que não responde isso vai gerar conflito, garantido."),
            thesis("03 / Conclusão",
                   "Brief antes.",
                   "Trabalho depois.",
                   "Investe 2 horas em brief, economiza 2 semanas em retrabalho. Matemática conhecida, raramente aplicada."),
        ],
    },
    {
        "id": "04_taste_is_trained", "title": "Taste is trained",
        "slides": [
            cover("Direction notes — 04", "Taste é\ntreinável.", "Não dom."),
            diag(2, "01 / O mito",
                 "'Ele tem\nbom gosto.'",
                 "Trata-se taste como dom inato — você tem ou não. É mito conveniente, porque livra todo mundo de treinar. Taste é músculo: se trabalha ou atrofia."),
            diag(3, "02 / Como treina",
                 "5 anos vendo\ntrabalho bom.",
                 "Estudar referência diariamente. Reconhecer o porquê de algo funcionar. Comparar versões boas e ruins do mesmo conceito. Em 5 anos, padrão muda. Em 10, vira instinto."),
            thesis("03 / Conclusão",
                   "Taste se treina.",
                   "Como qualquer ofício.",
                   "Quem fala 'não tenho taste' quer dizer 'não pratiquei'. Diferenças são honestas."),
        ],
    },
    {
        "id": "05_restriction_makes_work", "title": "Restriction makes work",
        "slides": [
            cover("Direction notes — 05", "Restrição\nfaz trabalho.", "Liberdade total mata."),
            diag(2, "01 / O paradoxo",
                 "Sem restrição,\nentropia.",
                 "Equipe com 'liberdade criativa total' gera muito sem direção. Resultado: nada coeso, nada finalizável. Liberdade absoluta = paralisia coletiva."),
            diag(3, "02 / O que restrição faz",
                 "Define a caixa.\nLibera dentro.",
                 "Paleta limitada, formato fixo, prazo curto, restrição técnica. Cada uma elimina infinitas más decisões e libera energia pras boas."),
            thesis("03 / Conclusão",
                   "Restrição é craft.",
                   "Liberdade é amador.",
                   "Profissional adora restrição. Amador foge dela. Diferença é experiência."),
        ],
    },
    {
        "id": "06_feedback_is_craft", "title": "Feedback is craft",
        "slides": [
            cover("Direction notes — 06", "Feedback\né ofício.", "'Não gostei' não é."),
            diag(2, "01 / O sintoma",
                 "'Não tô\ncurtindo.'",
                 "Feedback genérico mata mais design que prazo apertado. 'Não tô gostando' obriga designer a adivinhar. Adivinhação gera retrabalho, não solução."),
            diag(3, "02 / Feedback bom",
                 "Nomeia problema.\nIndica direção.",
                 "Feedback útil tem 2 partes: o que especificamente está errado (problema), e em que direção corrigir (não a solução, a direção). Solução é trabalho do designer."),
            thesis("03 / Conclusão",
                   "Feedback é treinável.",
                   "Pratica.",
                   "Equipe boa de feedback vira equipe boa de design. Quem dá feedback pobre recebe trabalho pobre."),
        ],
    },
    {
        "id": "07_visual_ref_over_brief", "title": "Imagem > brief escrito",
        "slides": [
            cover("Direction notes — 07", "Imagem >\nbrief escrito.", "Equipe lê mais rápido."),
            diag(2, "01 / O sintoma",
                 "Brief de\n4 páginas.",
                 "Documento longo escrito em texto puro é forma mais lenta de transferir intenção visual. Equipe criativa lê imagem em segundos, texto em minutos."),
            diag(3, "02 / O caminho rápido",
                 "Mood board\ncirúrgico.",
                 "10-15 imagens curadas com 1 linha de comentário cada vale 4 páginas de brief. Mostra direção, vocabulário e tom em paralelo."),
            thesis("03 / Conclusão",
                   "Mostra, não conta.",
                   "Sempre.",
                   "Imagem alinha equipe em segundos. Texto exige interpretação, sempre. Em criativa, mostra primeiro, escreve depois."),
        ],
    },
    {
        "id": "08_kill_darlings_publicly", "title": "Kill darlings publicly",
        "slides": [
            cover("Direction notes — 08", "Kill darlings\nem público.", "Senão vira política."),
            diag(2, "01 / O que dói",
                 "Cortar\nideia boa.",
                 "Toda equipe criativa tem 'darlings' — ideias que alguém defendeu, que ficou na proposta, mas que não serve mais. Cortar dói. Não cortar é pior."),
            diag(3, "02 / Como cortar",
                 "Em frente\nda equipe.",
                 "Decisão difícil tem que ser pública. Se diretor corta em silêncio, vira fofoca, vira política, vira decisão sem dono. Em público, vira aprendizado coletivo."),
            thesis("03 / Conclusão",
                   "Decisão pública.",
                   "Sempre.",
                   "Privado vira política. Público vira cultura. Direção é cultura visível."),
        ],
    },
    {
        "id": "09_owning_the_no", "title": "Owning the no",
        "slides": [
            cover("Direction notes — 09", "Direção é\ndizer não.", "E aguentar."),
            diag(2, "01 / Quem não diz não",
                 "Vira mediador.",
                 "Diretor que aprova tudo pra evitar conflito não direciona — modera. Trabalho final vira somatório das opiniões da equipe, sem visão coesa. Comitê, não direção."),
            diag(3, "02 / Como dizer não",
                 "Específico\ne fechado.",
                 "'Não' que abre debate é 'não pensei direito'. 'Não' que fecha é específico (essa decisão, esse motivo) e definitivo (não voltamos a discutir). Aguente o desconforto."),
            thesis("03 / Conclusão",
                   "Direção é peso.",
                   "Não diplomacia.",
                   "Liderança criativa pesa o suficiente pra parar consenso. Quem precisa de aprovação coletiva pra cortar algo não direciona."),
        ],
    },
]


# ============================================================================
# GERAÇÃO
# ============================================================================

SERIES = [
    ("site_notes", SITE_NOTES),
    ("product_notes", PRODUCT_NOTES),
    ("direction_notes", DIRECTION_NOTES),
]

BASE = Path("/home/claude/irbis/notes_series")
BASE.mkdir(parents=True, exist_ok=True)

for series_name, carousels in SERIES:
    series_dir = BASE / series_name
    for carousel in carousels:
        cid = carousel["id"]
        html_dir = series_dir / cid / "html"
        html_dir.mkdir(parents=True, exist_ok=True)
        for s in carousel["slides"]:
            html = html_for_slide(s)
            (html_dir / f"slide_{s['name']}.html").write_text(html, encoding="utf-8")
    print(f"✓ {series_name}: {len(carousels)} carrosséis × 4 slides")
