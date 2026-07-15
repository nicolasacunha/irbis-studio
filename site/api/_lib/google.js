/* Cliente do Google Calendar via service account. */
var fs = require('fs');
var path = require('path');
var google = require('googleapis').google;

function loadCredentials() {
  if (process.env.GOOGLE_SA_KEY_JSON) {
    return JSON.parse(process.env.GOOGLE_SA_KEY_JSON);
  }
  var p = process.env.GOOGLE_SA_KEY_PATH || './.secrets/google-service-account.json';
  var abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
  return JSON.parse(fs.readFileSync(abs, 'utf8'));
}

function getCalendar() {
  var creds = loadCredentials();
  var auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return google.calendar({ version: 'v3', auth: auth });
}

function calendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'primary';
}

/* Intervalos ocupados no período. */
async function getBusy(timeMin, timeMax) {
  var cal = getCalendar();
  var res = await cal.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: calendarId() }],
    },
  });
  var cals = res.data.calendars || {};
  var entry = cals[calendarId()] || { busy: [] };
  return (entry.busy || []).map(function (b) {
    return { start: new Date(b.start), end: new Date(b.end) };
  });
}

/* Cria o evento da call. Tenta anexar Google Meet; se a service account
   não tiver permissão, cria sem Meet e retorna meetLink: null. */
async function createEvent(opts) {
  var cal = getCalendar();
  // Sem attendees nem Meet automático: o Nicolas envia o link do Google Meet
  // pelo WhatsApp na hora da call (parte do processo anti-no-show dele).
  // O evento entra na agenda pessoal dele com todo o contexto do lead.
  var ev = await cal.events.insert({
    calendarId: calendarId(),
    requestBody: {
      summary: opts.summary,
      description: opts.description,
      start: { dateTime: opts.startISO, timeZone: opts.tz },
      end: { dateTime: opts.endISO, timeZone: opts.tz },
    },
  });
  return { eventId: ev.data.id, htmlLink: ev.data.htmlLink, meetLink: null };
}

module.exports = { getBusy: getBusy, createEvent: createEvent };
