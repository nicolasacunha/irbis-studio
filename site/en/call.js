/* Funil /en/call — lógica do formulário + agenda própria (IRBIS) — twin de /call.js, strings de exibição em inglês */
(function () {
  'use strict';

  var leadId = null;
  var selectedDay = null;
  var selectedSlot = null;
  var slotsByDay = {};

  var form = document.getElementById('formStep');
  var submitBtn = document.getElementById('submitBtn');
  var formMsg = document.getElementById('formMsg');

  /* ---------- Decisor: nota condicional ---------- */
  document.querySelectorAll('input[name="decisor"]').forEach(function (r) {
    r.addEventListener('change', function () {
      var note = document.getElementById('decisorNote');
      var show = r.value !== 'Sozinho' && r.checked;
      note.classList.toggle('show', show);
      if (!show) {
        var contato = note.querySelector('[name="decisorContato"]');
        if (contato) contato.value = '';
        var field = note.querySelector('.field');
        if (field) field.classList.remove('invalid');
      }
    });
  });

  /* ---------- Validação ---------- */
  function validate() {
    var ok = true, firstBad = null;

    form.querySelectorAll('[data-req]').forEach(function (field) {
      var hiddenParent = field.closest('.conditional:not(.show)');
      if (hiddenParent) { field.classList.remove('invalid'); return; }
      var input = field.querySelector('input, textarea');
      var val = input ? input.value.trim() : '';
      var bad = !val;
      if (!bad && field.hasAttribute('data-email')) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      field.classList.toggle('invalid', bad);
      if (bad && !firstBad) firstBad = field;
      if (bad) ok = false;
    });

    form.querySelectorAll('[data-req-group]').forEach(function (field) {
      var name = field.getAttribute('data-req-group');
      var checked = field.querySelectorAll('input[name="' + name + '"]:checked').length;
      field.classList.toggle('invalid', !checked);
      if (!checked && !firstBad) firstBad = field;
      if (!checked) ok = false;
    });

    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return ok;
  }

  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && field.classList.contains('invalid')) field.classList.remove('invalid');
  });
  form.addEventListener('change', function (e) {
    var field = e.target.closest('.field');
    if (field && field.classList.contains('invalid')) field.classList.remove('invalid');
  });

  /* ---------- Submit do formulário ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideFormMsg();
    if (!validate()) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    var payload = {};
    ['nome', 'email', 'whatsapp', 'negocio', 'site', 'decisorContato']
      .forEach(function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        payload[n] = el ? el.value.trim() : '';
      });
    ['decisor'].forEach(function (n) {
      var el = form.querySelector('input[name="' + n + '"]:checked');
      payload[n] = el ? el.value : '';
    });
    payload.tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo';

    fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.body.leadId) throw new Error(res.body.error || 'fail');
        leadId = res.body.leadId;
        goToScheduling();
      })
      .catch(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        showFormMsg('Something failed on my end. Try again or message me on WhatsApp.');
      });
  });

  /* ---------- Transição para agendamento ---------- */
  function goToScheduling() {
    document.getElementById('formStep').classList.add('hidden');
    document.getElementById('schedStep').classList.add('show');
    document.getElementById('progress').style.width = '100%';
    document.getElementById('railEyebrow').textContent = 'Step 2 of 2';
    document.getElementById('railTitle').textContent = 'Last step';
    document.getElementById('railText').textContent = 'Pick the time that works best for you. The call is 1 hour, on Google Meet, with me directly.';
    document.getElementById('stepDot1').className = 'step-item done';
    document.getElementById('stepDot2').className = 'step-item active';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadAvailability();
  }

  /* ---------- Disponibilidade ---------- */
  function loadAvailability() {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo';
    fetch('/api/availability?tz=' + encodeURIComponent(tz))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        slotsByDay = data.days || {};
        renderDays();
      })
      .catch(function () {
        document.getElementById('slots').innerHTML =
          '<div class="sched-empty">I could not load the times right now. Message me on WhatsApp and we can book on the spot.</div>';
      });
  }

  function renderDays() {
    var wrap = document.getElementById('days');
    wrap.innerHTML = '';
    var keys = Object.keys(slotsByDay);
    if (!keys.length) {
      document.getElementById('slots').innerHTML =
        '<div class="sched-empty">No open times over the next few days. Message me on WhatsApp and I will fit you in.</div>';
      return;
    }
    keys.forEach(function (key, idx) {
      var d = slotsByDay[key];
      var el = document.createElement('div');
      el.className = 'day' + (d.slots.length ? '' : ' empty');
      el.innerHTML = '<div class="dow">' + d.dow + '</div><div class="dnum">' + d.dnum + '</div><div class="dmon">' + d.dmon + '</div>';
      if (d.slots.length) {
        el.addEventListener('click', function () { selectDay(key, el); });
      }
      wrap.appendChild(el);
      if (idx === 0 && d.slots.length) selectDay(key, el);
    });
  }

  function selectDay(key, el) {
    selectedDay = key; selectedSlot = null;
    document.querySelectorAll('.day').forEach(function (d) { d.classList.remove('active'); });
    el.classList.add('active');
    updateBook();
    renderSlots(slotsByDay[key].slots);
  }

  function renderSlots(slots) {
    var wrap = document.getElementById('slots');
    wrap.innerHTML = '';
    slots.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'slot'; b.textContent = s.label;
      b.addEventListener('click', function () {
        selectedSlot = s;
        document.querySelectorAll('.slot').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        updateBook();
      });
      wrap.appendChild(b);
    });
  }

  function updateBook() {
    var btn = document.getElementById('bookBtn');
    var sum = document.getElementById('schedSummary');
    if (selectedSlot) {
      btn.disabled = false;
      sum.innerHTML = '<b>' + slotsByDay[selectedDay].full + '</b>, at <b>' + selectedSlot.label + '</b>';
    } else {
      btn.disabled = true;
      sum.textContent = '';
    }
  }

  /* ---------- Booking ---------- */
  document.getElementById('bookBtn').addEventListener('click', function () {
    if (!selectedSlot || !leadId) return;
    var btn = document.getElementById('bookBtn');
    btn.classList.add('loading'); btn.disabled = true;
    hideBookMsg();

    fetch('/api/book', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: leadId,
        start: selectedSlot.start,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo'
      })
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.body.error || 'fail');
        window.location.href = '/en/thank-you';
      })
      .catch(function (err) {
        btn.classList.remove('loading'); btn.disabled = false;
        if (String(err.message).indexOf('taken') > -1) {
          showBookMsg('That time was taken seconds ago. Pick another?');
          loadAvailability();
        } else {
          showBookMsg('I could not confirm it right now. Try again or message me on WhatsApp.');
        }
      });
  });

  /* ---------- Mensagens ---------- */
  function showFormMsg(t) { formMsg.textContent = t; formMsg.classList.add('show'); }
  function hideFormMsg() { formMsg.classList.remove('show'); }
  function showBookMsg(t) { var m = document.getElementById('bookMsg'); m.textContent = t; m.classList.add('show'); }
  function hideBookMsg() { document.getElementById('bookMsg').classList.remove('show'); }
})();
