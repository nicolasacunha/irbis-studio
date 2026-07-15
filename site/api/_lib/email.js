/* Envio de email transacional via SMTP do Zoho. */
var nodemailer = require('nodemailer');

function transport() {
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
    port: +(process.env.ZOHO_SMTP_PORT || 465),
    secure: true,
    auth: { user: process.env.ZOHO_SMTP_USER, pass: process.env.ZOHO_SMTP_PASS },
  });
}

var FROM = function () {
  return 'IRBIS <' + (process.env.ZOHO_SMTP_USER || 'contato@irbis.com.br') + '>';
};

/* Notifica o Nicolas que um lead preencheu o formulário. */
async function notifyOwner(f, attachments) {
  var linhas = [
    ['Negócio', f.negocio],
    ['Contato', f.nome],
    ['Email', f.email],
    ['WhatsApp', f.whatsapp],
    ['O que faz', f.oquefaz],
    ['Site atual', f.site || '—'],
    ['De onde vêm os clientes', f.canais || '—'],
    ['Valor de um cliente', f.valorcliente || '—'],
    ['Site precisa fazer', (f.objetivo || []).join(', ')],
    ['Incômodo', (f.incomodo || []).join(', ')],
    ['Prazo desejado', f.prazo],
    ['Orçamento previsto', f.orcamento || '—'],
    ['Decisor', f.decisor],
    ['Observações', f.livre || '—'],
  ];
  var rows = linhas.map(function (l) {
    return '<tr><td style="padding:6px 14px 6px 0;color:#8A8A93;vertical-align:top;white-space:nowrap">' +
      l[0] + '</td><td style="padding:6px 0;color:#111">' + esc(l[1] || '—') + '</td></tr>';
  }).join('');

  var html = '<div style="font-family:system-ui,Arial,sans-serif;max-width:560px">' +
    '<p style="font-size:15px;color:#111">Novo lead preencheu o formulário da call.</p>' +
    '<table style="border-collapse:collapse;font-size:14px">' + rows + '</table>' +
    (attachments && attachments.length ? '<p style="font-size:13px;color:#8A8A93;margin-top:14px">' +
      attachments.length + ' anexo(s) em anexo neste email e no card do Notion.</p>' : '') +
    '</div>';

  await transport().sendMail({
    from: FROM(),
    to: process.env.ZOHO_SMTP_USER || 'contato@irbis.com.br',
    subject: 'Novo lead: ' + (f.negocio || f.nome),
    html: html,
    attachments: (attachments || []).map(function (a) {
      return { filename: a.filename, content: a.content, contentType: a.contentType };
    }),
  });
}

/* Confirmação para o lead após agendar. */
async function confirmLead(f, info) {
  var quando = info.fullLabel + ', às ' + info.timeLabel;
  var meetLine = info.meetLink
    ? '<p style="font-size:15px;color:#111">Link da call (Google Meet):<br><a href="' + info.meetLink + '" style="color:#FF6600">' + info.meetLink + '</a></p>'
    : '<p style="font-size:15px;color:#111">Te mando o link do Google Meet no WhatsApp um pouco antes da call.</p>';

  var html = '<div style="font-family:system-ui,Arial,sans-serif;max-width:520px">' +
    '<p style="font-size:16px;color:#111">Fechado, ' + esc(firstName(f.nome)) + '. Nossa call está marcada.</p>' +
    '<p style="font-size:15px;color:#111"><b>' + esc(quando) + '</b><br>Duração: 1 hora · Google Meet</p>' +
    meetLine +
    '<p style="font-size:15px;color:#111">Qualquer coisa antes da call, me chama no WhatsApp.</p>' +
    '<p style="font-size:15px;color:#111">Nicolas</p>' +
    '</div>';

  await transport().sendMail({
    from: FROM(),
    to: f.email,
    subject: 'Call confirmada — ' + quando,
    html: html,
  });
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}
function firstName(n) { return String(n || '').trim().split(/\s+/)[0] || ''; }

module.exports = { notifyOwner: notifyOwner, confirmLead: confirmLead };
