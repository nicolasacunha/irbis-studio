/* LP Casa Paes — JS vanilla (progressive enhancement) */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header: fundo sólido ao rolar ---------- */
  var header = document.getElementById('header');
  var lastScrolled = false;
  function onScrollHeader() {
    var scrolled = window.scrollY > 8;
    if (scrolled !== lastScrolled) {
      header.classList.toggle('is-scrolled', scrolled);
      lastScrolled = scrolled;
    }
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- 2. Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 3. Simulador: gráfico SVG + tabela fallback ---------- */
  var slider = document.getElementById('peso-atual');
  if (slider) {
    var out = document.getElementById('peso-valor');
    var RATES = [0, 0.05, 0.12, 0.20]; // hoje, mês 2, 4, 6 (projeção ilustrativa)
    var marcos = [
      document.getElementById('marco-1'),
      document.getElementById('marco-2'),
      document.getElementById('marco-3')
    ];
    var deltas = [
      document.getElementById('delta-1'),
      document.getElementById('delta-2'),
      document.getElementById('delta-3')
    ];
    var total = document.getElementById('total-projetado');

    /* Geometria do gráfico */
    var NS = 'http://www.w3.org/2000/svg';
    var W = 560, H = 240;
    var XS = [46, 202, 358, 514];          // x fixo dos 4 pontos
    var Y_TOP = 44, Y_BOT = 190;           // faixa útil vertical
    var MONTHS = ['Hoje', 'Mês 2', 'Mês 4', 'Mês 6'];

    var chartWrap = document.getElementById('sim-chart');
    var path, dots = [], kgLabels = [];

    /* Eixo reescalado a cada arraste: do peso atual à projeção do mês 6 */
    function yFor(kg, kgTop, kgBot) {
      return Y_TOP + (kgTop - kg) / (kgTop - kgBot) * (Y_BOT - Y_TOP);
    }

    function el(name, attrs, cls) {
      var node = document.createElementNS(NS, name);
      for (var k in attrs) node.setAttribute(k, attrs[k]);
      if (cls) node.setAttribute('class', cls);
      return node;
    }

    function buildChart() {
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'presentation', focusable: 'false' });
      path = el('path', { d: '' }, 'chart-line');
      svg.appendChild(path);
      for (var i = 0; i < 4; i++) {
        var last = i === 3;
        var dot = el('circle', { cx: XS[i], cy: 0, r: last ? 7 : 4.5 }, last ? 'chart-dot-final' : 'chart-dot');
        svg.appendChild(dot);
        dots.push(dot);
        var kg = el('text', { x: 0, y: 0 }, last ? 'chart-kg chart-kg-final' : 'chart-kg');
        svg.appendChild(kg);
        kgLabels.push(kg);
        var month = el('text', { x: XS[i], y: H - 10 }, 'chart-month');
        month.textContent = MONTHS[i];
        svg.appendChild(month);
      }
      chartWrap.appendChild(svg);
    }

    function fmt(n) {
      return n.toFixed(1).replace('.', ',');
    }

    function updateSim() {
      var peso = parseInt(slider.value, 10);
      out.textContent = peso;
      slider.setAttribute('aria-valuetext', peso + ' quilogramas');

      var values = [], i;
      for (i = 0; i < RATES.length; i++) values.push(peso - peso * RATES[i]);

      /* Tabela fallback (visually-hidden) + total aria-live */
      for (i = 1; i < values.length; i++) {
        marcos[i - 1].textContent = fmt(values[i]);
        deltas[i - 1].textContent = fmt(peso - values[i]);
      }
      total.textContent = fmt(peso - values[3]);

      /* Gráfico */
      if (!path) return;
      var ys = values.map(function (v) { return yFor(v, values[0], values[3]); });
      var d = 'M' + XS[0] + ' ' + ys[0].toFixed(1);
      for (i = 1; i < 4; i++) {
        var mx = (XS[i - 1] + XS[i]) / 2;
        d += ' C' + mx + ' ' + ys[i - 1].toFixed(1) + ' ' + mx + ' ' + ys[i].toFixed(1) + ' ' + XS[i] + ' ' + ys[i].toFixed(1);
      }
      path.setAttribute('d', d);
      for (i = 0; i < 4; i++) {
        dots[i].setAttribute('cy', ys[i].toFixed(1));
        var label = i === 0 ? peso + ' kg' : fmt(values[i]);
        kgLabels[i].textContent = label;
        kgLabels[i].style.transform = 'translate(' + XS[i] + 'px, ' + (ys[i] - 18).toFixed(1) + 'px)';
      }
    }

    if (chartWrap) buildChart();
    slider.addEventListener('input', updateSim);
    updateSim();
  }

  /* ---------- 4. FAQ: fecha os outros ao abrir um ---------- */
  var faqItems = document.querySelectorAll('.faq-list details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item && other.open) other.open = false;
      });
    });
  });

  /* ---------- 5. Sticky CTA mobile ---------- */
  var sticky = document.getElementById('sticky-cta');
  var hero = document.getElementById('hero');
  var finalCta = document.getElementById('avaliacao');
  if (sticky && hero && finalCta && 'IntersectionObserver' in window) {
    var pastHero = false;
    var nearEnd = false;
    var stickyLink = sticky.querySelector('a');

    function updateSticky() {
      var show = pastHero && !nearEnd;
      sticky.classList.toggle('is-visible', show);
      sticky.setAttribute('aria-hidden', String(!show));
      if (stickyLink) stickyLink.tabIndex = show ? 0 : -1;
    }

    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting;
      updateSticky();
    }, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);

    new IntersectionObserver(function (entries) {
      nearEnd = entries[0].isIntersecting;
      updateSticky();
    }, { rootMargin: '0px 0px 120px 0px' }).observe(finalCta);
  }
})();
