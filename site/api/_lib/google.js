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
  // Sem attendees: uma service account sem Domain-Wide Delegation não pode
  // convidar terceiros. O lead recebe os detalhes pelo email de confirmação.
  var base = {
    summary: opts.summary,
    description: opts.description,
    start: { dateTime: opts.startISO, timeZone: opts.tz },
    end: { dateTime: opts.endISO, timeZone: opts.tz },
  };

  try {
    var withMeet = await cal.events.insert({
      calendarId: calendarId(),
      conferenceDataVersion: 1,
      requestBody: Object.assign({}, base, {
        conferenceData: {
          createRequest: {
            requestId: 'irbis-' + opts.requestId,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      }),
    });
    return {
      eventId: withMeet.data.id,
      htmlLink: withMeet.data.htmlLink,
      meetLink: extractMeet(withMeet.data) || staticMeet(),
    };
  } catch (e) {
    // Fallback sem Meet (conta sem permissão de conferência).
    var plain = await cal.events.insert({
      calendarId: calendarId(),
      requestBody: base,
    });
    return {
      eventId: plain.data.id,
      htmlLink: plain.data.htmlLink,
      meetLink: staticMeet(),
      meetFailed: true,
    };
  }
}

/* Link de sala fixa do Nicolas (fallback quando a conta não gera Meet). */
function staticMeet() {
  return process.env.MEET_LINK || null;
}

function extractMeet(data) {
  if (data.hangoutLink) return data.hangoutLink;
  var cd = data.conferenceData;
  if (cd && cd.entryPoints) {
    for (var i = 0; i < cd.entryPoints.length; i++) {
      if (cd.entryPoints[i].entryPointType === 'video') return cd.entryPoints[i].uri;
    }
  }
  return null;
}

module.exports = { getBusy: getBusy, createEvent: createEvent };
