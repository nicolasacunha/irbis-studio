/* GET /api/availability?tz=America/Sao_Paulo — devolve os dias com horários
   livres, já rotulados no fuso do lead. */
var cfg = require('./_lib/config');
var g = require('./_lib/google');
var tzu = require('./_lib/tz');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.status(405).json({ error: 'method' }); return; }
  var viewerTz = safeTz((req.query && req.query.tz) || parseQ(req.url).tz);

  var now = new Date();
  var minTime = new Date(now.getTime() + cfg.MIN_NOTICE_HOURS * 3600 * 1000);
  var horizon = new Date(now.getTime() + cfg.HORIZON_DAYS * 24 * 3600 * 1000);

  var busy;
  try {
    busy = await g.getBusy(now, horizon);
  } catch (e) {
    console.error('availability freebusy', e);
    res.status(200).json({ days: {}, error: 'calendar' }); return;
  }

  var candidates = buildCandidates(minTime, horizon);
  var days = {};

  candidates.forEach(function (slot) {
    // Ocupado não some: entra marcado como taken (o front mostra riscado).
    var taken = overlaps(slot.start, slot.end, busy);
    var lbl = tzu.labelParts(slot.start, viewerTz);
    var key = isoDay(slot.start, viewerTz);
    if (!days[key]) {
      days[key] = { dow: lbl.dow, dnum: lbl.dnum, dmon: lbl.dmon, full: lbl.full, slots: [] };
    }
    days[key].slots.push({ start: slot.start.toISOString(), label: lbl.time, taken: taken });
  });

  // Remove dias sem slots e ordena.
  var ordered = {};
  Object.keys(days).sort().forEach(function (k) {
    if (days[k].slots.length) {
      days[k].slots.sort(function (a, b) { return a.start < b.start ? -1 : 1; });
      ordered[k] = days[k];
    }
  });

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ days: ordered, tz: viewerTz });
};

/* Gera todos os slots candidatos no horizonte, em horário de Brasília,
   respeitando a janela de atendimento vigente para cada data. */
function buildCandidates(minTime, horizon) {
  var out = [];
  var cursor = new Date();
  for (var d = 0; d <= cfg.HORIZON_DAYS; d++) {
    var probe = new Date(cursor.getTime() + d * 24 * 3600 * 1000);
    var parts = tzu.partsInTz(probe, cfg.CALENDAR_TZ);
    var dow = new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay();
    if (cfg.WORK_DAYS.indexOf(dow) === -1) continue;

    var isoDay = parts.year + '-' + pad(parts.month) + '-' + pad(parts.day);
    var win = cfg.windowForDate(isoDay);
    if (!win) continue;

    var lastStart = win.endHour - cfg.DURATION_MIN / 60; // última hora que a call pode começar
    for (var h = win.startHour; h <= lastStart; h += cfg.SLOT_STEP_MIN / 60) {
      var hour = Math.floor(h);
      if (cfg.isBlockedSlot(dow, hour)) continue;
      var minute = Math.round((h - hour) * 60);
      var start = tzu.zonedWallToUtc(parts.year, parts.month, parts.day, hour, minute, cfg.CALENDAR_TZ);
      var end = new Date(start.getTime() + cfg.DURATION_MIN * 60 * 1000);
      if (start >= minTime && start <= horizon) out.push({ start: start, end: end });
    }
  }
  return out;
}

function overlaps(start, end, busy) {
  for (var i = 0; i < busy.length; i++) {
    if (start < busy[i].end && end > busy[i].start) return true;
  }
  return false;
}

function isoDay(date, tz) {
  var p = tzu.partsInTz(date, tz);
  return p.year + '-' + pad(p.month) + '-' + pad(p.day);
}
function pad(n) { return (n < 10 ? '0' : '') + n; }

function safeTz(tz) {
  if (!tz) return cfg.CALENDAR_TZ;
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return tz; }
  catch (e) { return cfg.CALENDAR_TZ; }
}
function parseQ(url) {
  var q = {}; var i = url.indexOf('?');
  if (i > -1) url.slice(i + 1).split('&').forEach(function (kv) {
    var p = kv.split('='); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
  });
  return q;
}
