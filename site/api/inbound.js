/* POST /api/inbound — form da home ("SEU PROJETO TRAVOU?"). Cria lead inbound
   no CRM (não qualificado) e avisa o Nicolas. Body: { nome, whatsapp, faturamento, projeto }. */
var notion = require('./_lib/notion');
var email = require('./_lib/email');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }

  var body;
  try { body = await readJson(req); }
  catch (e) { res.status(400).json({ error: 'parse' }); return; }

  var f = {
    nome: str(body.nome),
    whatsapp: str(body.whatsapp),
    faturamento: str(body.faturamento),
    projeto: str(body.projeto),
  };
  if (!f.nome || !validPhone(f.whatsapp) || !f.faturamento) { res.status(400).json({ error: 'campos obrigatórios' }); return; }

  try {
    await notion.createInboundLead(f);
    email.notifyInbound(f).catch(function (e) { console.error('notifyInbound', e); });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('inbound', e);
    res.status(500).json({ error: 'server' });
  }
};

function str(v) { return (v == null ? '' : String(v)).trim(); }
function validPhone(v) {
  var digits = str(v).replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

function readJson(req) {
  return new Promise(function (resolve, reject) {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) { resolve(req.body); return; }
    var raw = '';
    req.on('data', function (c) { raw += c; });
    req.on('end', function () { try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}
