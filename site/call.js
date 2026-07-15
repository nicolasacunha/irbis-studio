/* Funil /call — lógica do formulário + agenda própria (IRBIS) */
(function () {
  'use strict';

  var MAX_FILE_MB = 3;
  var MAX_TOTAL_MB = 3;
  var files = [];
  var leadId = null;
  var selectedDay = null;
  var selectedSlot = null;
  var slotsByDay = {};

  var form = document.getElementById('formStep');
  var submitBtn = document.getElementById('submitBtn');
  var formMsg = document.getElementById('formMsg');

  /* ---------- GA4 ---------- */
  function track(ev, params) {
    if (typeof window.gtag === 'function') window.gtag('event', ev, params || {});
  }
  track('call_step_view', { step: 'form' });

  /* ---------- Decisor: nota condicional ---------- */
  document.querySelectorAll('input[name="decisor"]').forEach(function (r) {
    r.addEventListener('change', function () {
      var note = document.getElementById('decisorNote');
      note.classList.toggle('show', r.value !== 'Sozinho' && r.checked);
    });
  });

  /* ---------- Upload ---------- */
  var drop = document.getElementById('drop');
  var fileInput = document.getElementById('fileInput');
  var fileList = document.getElementById('fileList');

  drop.addEventListener('click', function () { fileInput.click(); });
  drop.addEventListener('dragover', function (e) { e.preventDefault(); drop.classList.add('over'); });
  drop.addEventListener('dragleave', function () { drop.classList.remove('over'); });
  drop.addEventListener('drop', function (e) {
    e.preventDefault(); drop.classList.remove('over');
    addFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener('change', function () { addFiles(fileInput.files); fileInput.value = ''; });

  function addFiles(fl) {
    Array.prototype.forEach.call(fl, function (f) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        showFormMsg('Esse arquivo "' + f.name + '" passou de ' + MAX_FILE_MB + 'MB. Comprime ou manda um link no campo livre.');
        return;
      }
      var total = files.reduce(function (s, x) { return s + x.size; }, 0) + f.size;
      if (total > MAX_TOTAL_MB * 1024 * 1024) {
        showFormMsg('O total de anexos passou de ' + MAX_TOTAL_MB + 'MB. Manda os principais agora, o resto na call.');
        return;
      }
      files.push(f);
    });
    renderFiles();
  }

  function renderFiles() {
    fileList.innerHTML = '';
    files.forEach(function (f, i) {
      var li = document.createElement('li');
      var name = document.createElement('span'); name.className = 'fname'; name.textContent = f.name;
      var size = document.createElement('span'); size.className = 'fsize'; size.textContent = fmtSize(f.size);
      var btn = document.createElement('button'); btn.type = 'button'; btn.innerHTML = '&times;';
      btn.setAttribute('aria-label', 'Remover ' + f.name);
      btn.addEventListener('click', function () { files.splice(i, 1); renderFiles(); });
      li.appendChild(name); li.appendChild(size); li.appendChild(btn);
      fileList.appendChild(li);
    });
  }

  function fmtSize(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return Math.round(b / 1024) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
  }

  /* ---------- Validação ---------- */
  function validate() {
    var ok = true, firstBad = null;

    form.querySelectorAll('[data-req]').forEach(function (field) {
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
    ['nome', 'email', 'whatsapp', 'negocio', 'oquefaz', 'site', 'canais', 'valorcliente', 'prazo', 'orcamento', 'livre', 'decisor']
      .forEach(function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        payload[n] = el ? el.value.trim() : '';
      });
    payload.objetivo = collectMulti('objetivo');
    payload.incomodo = collectMulti('incomodo');
    payload.tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo';

    encodeFiles(files).then(function (encoded) {
      payload.anexos = encoded;
      return fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
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
        showFormMsg('Algo falhou aqui do meu lado. Tenta de novo ou me chama no WhatsApp.');
      });
  });

  function encodeFiles(list) {
    return Promise.all(list.map(function (f) {
      return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onload = function () {
          var s = String(reader.result);
          resolve({ filename: f.name, mime: f.type || 'application/octet-stream', data: s.split(',')[1] || '' });
        };
        reader.onerror = function () { resolve(null); };
        reader.readAsDataURL(f);
      });
    })).then(function (arr) { return arr.filter(Boolean); });
  }

  function collectMulti(name) {
    return Array.prototype.map.call(
      document.querySelectorAll('input[name="' + name + '"]:checked'),
      function (i) { return i.value; }
    );
  }

  /* ---------- Transição para agendamento ---------- */
  function goToScheduling() {
    track('call_step_view', { step: 'scheduling' });
    document.getElementById('formStep').classList.add('hidden');
    document.getElementById('schedStep').classList.add('show');
    document.getElementById('progress').style.width = '100%';
    document.getElementById('railEyebrow').textContent = 'Etapa 2 de 2';
    document.getElementById('railTitle').textContent = 'Última etapa';
    document.getElementById('railText').textContent = 'Escolhe o melhor horário pra você. A call é de 1 hora, no Google Meet, direto comigo.';
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
          '<div class="sched-empty">Não consegui carregar os horários agora. Me chama no WhatsApp que a gente marca na hora.</div>';
      });
  }

  function renderDays() {
    var wrap = document.getElementById('days');
    wrap.innerHTML = '';
    var keys = Object.keys(slotsByDay);
    if (!keys.length) {
      document.getElementById('slots').innerHTML =
        '<div class="sched-empty">Sem horários abertos nos próximos dias. Me chama no WhatsApp que eu abro um encaixe.</div>';
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
        track('call_slot_selected', { day: selectedDay, slot: s.label });
      });
      wrap.appendChild(b);
    });
  }

  function updateBook() {
    var btn = document.getElementById('bookBtn');
    var sum = document.getElementById('schedSummary');
    if (selectedSlot) {
      btn.disabled = false;
      sum.innerHTML = '<b>' + slotsByDay[selectedDay].full + '</b>, às <b>' + selectedSlot.label + '</b>';
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
        track('call_booked', { day: selectedDay, slot: selectedSlot.label });
        window.location.href = '/obrigado';
      })
      .catch(function (err) {
        btn.classList.remove('loading'); btn.disabled = false;
        if (String(err.message).indexOf('taken') > -1) {
          showBookMsg('Esse horário acabou de ser preenchido. Escolhe outro?');
          loadAvailability();
        } else {
          showBookMsg('Não consegui confirmar agora. Tenta de novo ou me chama no WhatsApp.');
        }
      });
  });

  /* ---------- Mensagens ---------- */
  function showFormMsg(t) { formMsg.textContent = t; formMsg.classList.add('show'); }
  function hideFormMsg() { formMsg.classList.remove('show'); }
  function showBookMsg(t) { var m = document.getElementById('bookMsg'); m.textContent = t; m.classList.add('show'); }
  function hideBookMsg() { document.getElementById('bookMsg').classList.remove('show'); }
})();
