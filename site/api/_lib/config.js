/* Configuração da agenda — ajuste aqui as regras de disponibilidade.
   Todos os horários em America/Sao_Paulo (hora de Brasília). */
module.exports = {
  CALENDAR_TZ: 'America/Sao_Paulo',
  DURATION_MIN: 60,           // duração da call (1 hora)
  SLOT_STEP_MIN: 60,          // de quanto em quanto tempo os horários começam
  MIN_NOTICE_HOURS: 12,       // antecedência mínima para agendar
  HORIZON_DAYS: 14,           // até quantos dias à frente mostrar
  WORK_DAYS: [1, 2, 3, 4, 5], // 0=dom, 1=seg ... 6=sáb

  /* Janelas de atendimento que mudam por data (hora de Brasília).
     startHour = primeira hora que a call PODE começar;
     endHour  = horário em que a agenda fecha (última call começa endHour - 1h).
     Regra do Nicolas (14/jul): até agosto 9h–20h; a partir de setembro 13h–22h. */
  SCHEDULE: [
    { until: '2026-08-31', startHour: 9, endHour: 20 },
    { from: '2026-09-01', startHour: 13, endHour: 22 },
  ],

  EVENT_TITLE: 'Call de projeto — IRBIS',
  ORGANIZER_NAME: 'Nicolas',
};

/* Retorna a janela {startHour, endHour} válida para uma data 'YYYY-MM-DD'. */
module.exports.windowForDate = function (isoDay) {
  var sched = module.exports.SCHEDULE;
  for (var i = 0; i < sched.length; i++) {
    var w = sched[i];
    if (w.from && isoDay < w.from) continue;
    if (w.until && isoDay > w.until) continue;
    return { startHour: w.startHour, endHour: w.endHour };
  }
  return null;
};
