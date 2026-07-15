/* POST /api/book — cria o evento no calendário, atualiza o Notion e envia a
   confirmação para o lead. Body: { leadId, start (ISO), tz }. */
var cfg = require('./_lib/config');
var g = require('./_lib/google');
var tzu = require('./_lib/tz');
var notion = require('./_lib/notion');
var email = require('./_lib/email');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }

  var body = await readJson(req);
  var leadId = body.leadId, startISO = body.start;
  var viewerTz = safeTz(body.tz);
  if (!leadId || !startISO) { res.status(400).json({ error: 'dados' }); return; }

  var start = new Date(startISO);
  if (isNaN(start.getTime())) { res.status(400).json({ error: 'data' }); return; }
  var end = new Date(start.getTime() + cfg.DURATION_MIN * 60 * 1000);

  // Recupera o lead do Notion (fonte confiável, não o cliente).
  var lead;
  try { lead = await notion.getLead(leadId); }
  catch (e) { res.status(400).json({ error: 'lead' }); return; }

  // Anti-corrida: confere se o horário continua livre.
  try {
    var busy = await g.getBusy(new Date(start.getTime() - 1000), end);
    for (var i = 0; i < busy.length; i++) {
      if (start < busy[i].end && end > busy[i].start) { res.status(409).json({ error: 'taken' }); return; }
    }
  } catch (e) { /* se o freebusy falhar, segue e deixa o insert resolver */ }

  var spLabel = tzu.labelParts(start, cfg.CALENDAR_TZ);
  var viewerLabel = tzu.labelParts(start, viewerTz);

  var descricao = [
    'Call de projeto (1h) agendada pelo site.',
    '', 'Lead: ' + (lead.nome || ''),
    'Negócio: ' + (lead.negocio || ''),
    'WhatsApp: ' + (lead.whatsapp || ''),
    'Email: ' + (lead.email || ''),
    '', 'Card no CRM: notion.so/' + String(leadId).replace(/-/g, ''),
  ].join('\n');

  var ev;
  try {
    ev = await g.createEvent({
      summary: cfg.EVENT_TITLE + ' · ' + (lead.negocio || lead.nome || ''),
      description: descricao,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      tz: cfg.CALENDAR_TZ,
      attendeeEmail: lead.email,
      attendeeName: lead.nome,
      requestId: leadId,
    });
  } catch (e) {
    console.error('book createEvent', e);
    res.status(500).json({ error: 'calendar' }); return;
  }

  // Atualiza o CRM (best-effort).
  notion.markBooked(leadId, {
    startISO: start.toISOString(),
    meetLink: ev.meetLink,
    htmlLink: ev.htmlLink,
  }).catch(function (e) { console.error('markBooked', e); });

  // Confirmação para o lead (best-effort).
  email.confirmLead(lead, {
    fullLabel: viewerLabel.full,
    timeLabel: viewerLabel.time,
    meetLink: ev.meetLink,
  }).catch(function (e) { console.error('confirmLead', e); });

  res.status(200).json({
    ok: true,
    meetLink: ev.meetLink || null,
    when: spLabel.full + ' ' + spLabel.time,
  });
};

function readJson(req) {
  return new Promise(function (resolve) {
    var raw = '';
    req.on('data', function (c) { raw += c; });
    req.on('end', function () { try { resolve(JSON.parse(raw || '{}')); } catch (e) { resolve({}); } });
    req.on('error', function () { resolve({}); });
  });
}
function safeTz(tz) {
  if (!tz) return cfg.CALENDAR_TZ;
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return tz; }
  catch (e) { return cfg.CALENDAR_TZ; }
}
