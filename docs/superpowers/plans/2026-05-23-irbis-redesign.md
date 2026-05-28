# IRBIS Site — Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir `site/index.html` pelo redesign aprovado em `site/prototype.html`, adicionando intro curtain e limpando artefatos antigos.

**Architecture:** O protótipo (`prototype.html`) já é o site completo aprovado. O trabalho é: (1) elevar o protótipo a `index.html`, (2) reinserindo os elementos que foram mantidos da versão atual (intro curtain, nav logo animation), (3) verificação visual em desktop e mobile, (4) cleanup. Arquivo único — sem build system.

**Tech Stack:** HTML vanilla, CSS custom properties, GSAP 3.12.5 + ScrollTrigger, Lenis 1.3.21, Python http.server para preview local.

---

## Arquivos

| Ação | Arquivo |
|---|---|
| Criar (backup) | `site/index.html.bak` |
| Sobrescrever | `site/index.html` |
| Deletar | `site/prototype.html` |

---

### Task 1: Backup + promover prototype.html para index.html

**Arquivos:**
- Criar: `site/index.html.bak` (cópia do index.html atual)
- Sobrescrever: `site/index.html` (conteúdo do prototype.html)

- [ ] **Step 1: Backup do index.html atual**

```bash
cp site/index.html site/index.html.bak
```

- [ ] **Step 2: Copiar prototype.html sobre index.html**

```bash
cp site/prototype.html site/index.html
```

- [ ] **Step 3: Verificar que o servidor está rodando e abrir o novo index.html**

```bash
# Se o servidor já está rodando na porta 4200, só abrir:
open "http://localhost:4200/index.html"
# Se não estiver rodando:
# cd site && python3 -m http.server 4200 &
```

Resultado esperado: site carrega com a nova estrutura (Hero, Como Opero, Horizontal 4 panels, etc.). O banner "PROTÓTIPO — NÃO PUBLICADO" ainda aparece — será removido no próximo task.

- [ ] **Step 4: Commit do estado inicial**

```bash
git add site/index.html site/index.html.bak
git commit -m "feat: promote prototype to index.html (redesign base)"
```

---

### Task 2: Remover banner de protótipo + ajustar title

**Arquivos:**
- Modificar: `site/index.html`

- [ ] **Step 1: Remover o banner e atualizar o `<title>`**

Localizar e remover no `<head>`:
```html
<!-- ANTES -->
<title>IRBIS — PROTÓTIPO</title>
```
```html
<!-- DEPOIS -->
<title>IRBIS | ESTÚDIO DIGITAL</title>
```

Localizar e remover no `<body>` (primeira linha após `<body>`):
```html
<!-- REMOVER esta linha inteira -->
<div class="proto-banner">PROTÓTIPO — NÃO PUBLICADO</div>
```

Localizar e remover no `<style>` o bloco do banner:
```css
/* REMOVER este bloco inteiro */
.proto-banner {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 9999;
  background: var(--accent);
  color: var(--bg);
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .2em;
  text-align: center;
  padding: .35rem;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Adicionar favicon**

Verificar que o `<head>` tem a linha (já deve estar no prototype):
```html
<link rel="icon" type="image/png" href="Design/icone/favicon_true.png">
```

Se não estiver, adicionar após `<meta name="viewport" ...>`.

- [ ] **Step 3: Verificar no browser**

Recarregar `http://localhost:4200/index.html`. Banner vermelho deve ter sumido, title na aba deve ser "IRBIS | ESTÚDIO DIGITAL".

- [ ] **Step 4: Commit**

```bash
git add site/index.html
git commit -m "chore: remove prototype banner, restore production title"
```

---

### Task 3: Adicionar Intro Curtain

O site atual tem uma cortina de entrada (logo IRBIS aparece → some → tela sobe revelando a hero). O prototype não tem — reinserir agora.

**Arquivos:**
- Modificar: `site/index.html`

- [ ] **Step 1: Adicionar CSS da curtain**

Dentro do `<style>`, antes do comentário `/* CURSOR */`, adicionar:

```css
/* ================================================================
   INTRO CURTAIN
================================================================ */
#curtain {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: -webkit-fill-available;
  height: 100dvh;
  min-height: 100dvh;
  background: var(--bg);
  z-index: 9990;
  transform: translateY(0%);
  pointer-events: all;
}

#curtain-logo {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  letter-spacing: -.055em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0;
}

#curtain-logo .acc { color: var(--accent); position: relative; left: .08em; }

body.intro-lock { overflow: hidden; }
```

- [ ] **Step 2: Adicionar HTML da curtain**

Imediatamente após `<body>` e antes de `<div id="cur-dot">`, inserir:

```html
<!-- Intro curtain -->
<div id="curtain" aria-hidden="true">
  <span id="curtain-logo">IRBIS<span class="acc">.</span></span>
</div>
```

- [ ] **Step 3: Adicionar JS da curtain**

No bloco `<script>`, após a inicialização do Lenis (`gsap.ticker.lagSmoothing(0);`), adicionar:

```js
/* ── INTRO CURTAIN ── */
(function () {
  const curtain = document.getElementById('curtain');
  const logo    = document.getElementById('curtain-logo');

  document.body.classList.add('intro-lock');
  lenis.stop();

  gsap.set(curtain, { height: '100dvh' });

  gsap.timeline({ delay: 0.15 })
    .to(logo,    { opacity: 1, duration: 0.5, ease: 'power2.out' })
    .to({},      { duration: 1.0 })
    .to(logo,    { opacity: 0, duration: 0.35, ease: 'power2.in' })
    .to(curtain, {
      translateY: '-100%',
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete() {
        gsap.set(curtain, { translateY: '100%', pointerEvents: 'none' });
        document.body.classList.remove('intro-lock');
        lenis.start();
        ScrollTrigger.refresh();
      }
    }, '-=0.1');
})();
```

- [ ] **Step 4: Verificar no browser**

Recarregar `http://localhost:4200/index.html`. Deve aparecer: tela preta → "IRBIS." fade in → fade out → tela sobe revelando o Hero.

- [ ] **Step 5: Commit**

```bash
git add site/index.html
git commit -m "feat: restore intro curtain animation"
```

---

### Task 4: Adicionar clique no logo da nav → curtain de saída

O logo "IRBIS" na nav, quando clicado em qualquer seção, faz a curtain descer e rolar de volta ao topo. Reinserir esse comportamento.

**Arquivos:**
- Modificar: `site/index.html`

- [ ] **Step 1: Adicionar JS do clique no logo**

No bloco `<script>`, após o bloco da curtain (Task 3), adicionar:

```js
/* ── NAV LOGO CLICK → CURTAIN ── */
document.querySelector('.nav-logo').addEventListener('click', e => {
  e.preventDefault();
  if (window.scrollY < 10) return; // já no topo, não faz nada

  const curtain = document.getElementById('curtain');
  const logo    = document.getElementById('curtain-logo');

  lenis.stop();
  document.body.classList.add('intro-lock');

  gsap.timeline()
    .set(curtain,  { pointerEvents: 'all' })
    .to(curtain,   { translateY: '0%', duration: 0.6, ease: 'power3.inOut' })
    .to(logo,      { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
    .add(() => { window.scrollTo(0, 0); lenis.scrollTo(0, { immediate: true }); })
    .to(logo,      { opacity: 0, duration: 0.3, ease: 'power2.in' }, '+=0.5')
    .to(curtain,   { translateY: '-100%', duration: 0.7, ease: 'power3.inOut',
      onComplete() {
        gsap.set(curtain, { translateY: '100%', pointerEvents: 'none' });
        document.body.classList.remove('intro-lock');
        lenis.start();
        ScrollTrigger.refresh();
      }
    }, '-=0.1');
});
```

- [ ] **Step 2: Verificar no browser**

1. Rolar até o meio do site
2. Clicar no logo "IRBIS" na nav
3. Deve: curtain descer → logo aparece → volta ao topo → curtain sobe

- [ ] **Step 3: Commit**

```bash
git add site/index.html
git commit -m "feat: restore nav logo click curtain transition"
```

---

### Task 5: Verificação visual desktop — todas as seções

**Arquivos:** nenhuma alteração de código neste task — só verificação.

- [ ] **Step 1: Hero**

Abrir `http://localhost:4200/index.html`. Verificar:
- Curtain abre corretamente
- Headline e CTAs aparecem com fade-up após curtain
- Hover nos botões: `DIAGNÓSTICO` fica com opacidade reduzida, `VER PROJETOS` e `CONVERSAR` ficam com borda mais clara

- [ ] **Step 2: Como Opero**

Rolar até "COMO OPERO". Verificar:
- 5 colunas renderizam sem overflow
- Números em `#FF3D00`
- `.reveal` itens fazem fade-up ao entrar na viewport

- [ ] **Step 3: Horizontal scroll — 4 panels**

Continuar rolando. Verificar:
- Seção fica pinned ao entrar
- Panel 1 (DIAGNÓSTICOS): 2 cards lado a lado; hover escurece o card
- Panel 2 (PROJETOS): 5 itens com hover fill da esquerda para direita
- Panel 3 (INTEGRADO): headline grande, lista de entregas, botão vermelho
- Panel 4 (ACOMPANHAMENTO): grid 4 módulos + barra vermelha no rodapé
- Barra de progresso no rodapé da seção preenche conforme avança
- Background muda para `#18181B` ao entrar e volta a `#0C0C0E` ao sair

- [ ] **Step 4: Cases, Sobre, Contato**

Continuar rolando. Verificar:
- Cases: placeholder com borda dashed, texto "EM BREVE"
- Sobre: bio em 3 linhas, link manifesto com sublinhado vermelho, área de foto `#18181B`
- Contato: heading + email + WhatsApp à esquerda; form 2 campos + botão à direita
- Form: focus nos inputs ativa borda vermelha
- Botão "MANDA O SINAL" fica opaco no hover

- [ ] **Step 5: Footer**

Verificar footer: logo à esquerda, copyright à direita, separador de linha no topo.

---

### Task 6: Verificação visual mobile (375px)

- [ ] **Step 1: Abrir DevTools e definir viewport 375px**

No Chrome: DevTools → Toggle Device Toolbar → iPhone SE (375 × 667).

Recarregar `http://localhost:4200/index.html`.

- [ ] **Step 2: Verificar Hero mobile**

- Headline legível (clamp deve resultar em ~3.5rem mínimo)
- 3 CTAs empilhados verticalmente, largura total
- Sem overflow horizontal

- [ ] **Step 3: Verificar Como Opero mobile**

- 5 fases empilhadas verticalmente
- Cada item com borda inferior, sem borda direita
- Padding correto: `1.5rem 0`

- [ ] **Step 4: Verificar Horizontal scroll mobile**

A seção deve desativar o pin e empilhar os 4 panels verticalmente:
- Panel 1: 2 cards em coluna (1fr)
- Panel 2: lista de 5 itens normal
- Panel 3: Integrado com padding reduzido (4rem 1.5rem)
- Panel 4: módulos em grid 2×2

- [ ] **Step 5: Corrigir qualquer overflow encontrado**

Se houver texto ou elemento vazando para fora do viewport, adicionar no CSS (dentro do `@media (max-width: 767px)`):

Problemas comuns:
- `.integ-deco` visível no mobile → adicionar `display: none` no breakpoint mobile
- `.hero-deco` → já tem `display: none` no mobile, confirmar
- `.opero-item:last-child` padding → padding já equalizado no breakpoint

```css
/* Adicionar dentro do @media (max-width: 767px) se necessário */
.integ-deco { display: none; }
```

- [ ] **Step 6: Commit (se houve correções)**

```bash
git add site/index.html
git commit -m "fix: mobile responsive corrections"
```

---

### Task 7: Cleanup final

**Arquivos:**
- Deletar: `site/prototype.html`
- Manter: `site/index.html.bak` (pode deletar depois de confirmar que tudo está ok)

- [ ] **Step 1: Deletar prototype.html**

```bash
rm site/prototype.html
```

- [ ] **Step 2: Verificar que o .gitignore não tem entradas desnecessárias**

```bash
cat site/.gitignore 2>/dev/null || echo "sem .gitignore na pasta site"
```

Não é necessário adicionar `index.html.bak` ao .gitignore — pode permanecer no repo como histórico temporário.

- [ ] **Step 3: Verificar que o servidor ainda funciona**

```bash
open "http://localhost:4200/index.html"
```

Confirmar que tudo ainda funciona após deletar o prototype.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat: IRBIS site redesign — nova arquitetura de conteúdo

- Hero com 3 CTAs (Diagnóstico, Ver Projetos, Conversar)
- Como Opero: 5 fases numeradas
- Scroll horizontal com 4 panels (Diagnósticos, Projetos, Integrado, Acompanhamento)
- Cases placeholder
- Sobre e Contato renovados
- Mantém: cursor, intro curtain, Lenis, GSAP"
```

---

## Self-Review

**Spec coverage:**
- [x] Hero: label + headline + 3 CTAs → Task 1 (já no prototype)
- [x] Como Opero: 5 fases → Task 1
- [x] Horizontal 4 panels → Task 1 (4 panels no prototype)
- [x] Cases placeholder → Task 1
- [x] Sobre → Task 1
- [x] Contato + WhatsApp → Task 1
- [x] Intro curtain (keep) → Task 3
- [x] Nav logo click (keep) → Task 4
- [x] Mobile responsive → Task 6
- [x] Cleanup → Task 7

**Placeholder scan:** Nenhum TBD, TODO ou "implementar depois".

**Type consistency:** Sem types ou métodos — HTML/CSS/JS vanilla. IDs e classes consistentes com o prototype aprovado.
