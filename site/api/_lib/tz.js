/* Utilitários de fuso horário sem dependências externas. */

/* Offset (ms) entre o fuso e o UTC no instante dado. */
function offsetMs(date, tz) {
  var dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  var p = {};
  dtf.formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
  var asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +(p.hour === '24' ? '00' : p.hour), +p.minute, +p.second);
  return asUTC - date.getTime();
}

/* Hora de parede (y,m,d,h,min) num fuso -> instante UTC (Date). */
function zonedWallToUtc(y, m, d, h, min, tz) {
  var guess = Date.UTC(y, m - 1, d, h, min, 0);
  var off = offsetMs(new Date(guess), tz);
  var utc = guess - off;
  // Reconfere (transições de DST); Brasil não usa DST, mas mantém robusto.
  var off2 = offsetMs(new Date(utc), tz);
  if (off2 !== off) utc = guess - off2;
  return new Date(utc);
}

/* Partes de calendário de um instante num fuso. */
function partsInTz(date, tz) {
  var dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    weekday: 'short', hour: '2-digit', minute: '2-digit',
  });
  var p = {};
  dtf.formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
  return {
    year: +p.year, month: +p.month, day: +p.day,
    hour: +(p.hour === '24' ? '0' : p.hour), minute: +p.minute, weekday: p.weekday,
  };
}

/* Rótulos amigáveis em PT-BR num fuso. */
function labelParts(date, tz) {
  var day = new Intl.DateTimeFormat('pt-BR', { timeZone: tz, weekday: 'short' }).format(date);
  var dnum = new Intl.DateTimeFormat('pt-BR', { timeZone: tz, day: '2-digit' }).format(date);
  var mon = new Intl.DateTimeFormat('pt-BR', { timeZone: tz, month: 'short' }).format(date);
  var time = new Intl.DateTimeFormat('pt-BR', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
  var full = new Intl.DateTimeFormat('pt-BR', { timeZone: tz, weekday: 'long', day: '2-digit', month: 'long' }).format(date);
  return {
    dow: day.replace('.', '').replace(/^\w/, function (c) { return c.toUpperCase(); }),
    dnum: dnum,
    dmon: mon.replace('.', '').replace(/^\w/, function (c) { return c.toUpperCase(); }),
    time: time,
    full: full.replace(/^\w/, function (c) { return c.toUpperCase(); }),
  };
}

module.exports = {
  offsetMs: offsetMs,
  zonedWallToUtc: zonedWallToUtc,
  partsInTz: partsInTz,
  labelParts: labelParts,
};
