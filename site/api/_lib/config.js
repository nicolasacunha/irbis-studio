/* Configuração da agenda — ajuste aqui as regras de disponibilidade.
   Todos os horários em America/Sao_Paulo (hora de Brasília). */
module.exports = {
  CALENDAR_TZ: 'America/Sao_Paulo',
  DURATION_MIN: 60,          // duração da call (1 hora)
  MIN_NOTICE_HOURS: 12,      // antecedência mínima para agendar
  HORIZON_DAYS: 14,          // até quantos dias à frente mostrar
  WORK_DAYS: [1, 2, 3, 4, 5], // 0=dom, 1=seg ... 6=sáb
  // Horários de início de call oferecidos (hora de Brasília):
  SLOT_STARTS: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
  EVENT_TITLE: 'Call de projeto — IRBIS',
  ORGANIZER_NAME: 'Nicolas',
  ORGANIZER_WHATSAPP: '', // opcional: preencher para citar nas mensagens
};
