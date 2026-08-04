/* POST /api/submit-form — recebe o formulário como JSON (anexos em base64),
   cria o card no Notion, sobe anexos e notifica o Nicolas. Retorna { leadId }.
   Anexos trafegam no corpo (limite ~4,5MB da Vercel); o front limita a ~3MB. */
var notion = require('./_lib/notion');
var email = require('./_lib/email');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }

  var body;
  try { body = await readJson(req); }
  catch (e) { res.status(400).json({ error: 'parse' }); return; }

  var f = {
    nome: str(body.nome), email: str(body.email), whatsapp: str(body.whatsapp),
    negocio: str(body.negocio), site: str(body.site), dor: str(body.dor),
    decisor: str(body.decisor), decisorContato: str(body.decisorContato),
  };

  if (!f.nome || !f.email || !f.whatsapp || !f.negocio || !f.dor) {
    res.status(400).json({ error: 'campos obrigatórios' }); return;
  }
  if (f.decisor && f.decisor !== 'Sozinho' && !f.decisorContato) {
    res.status(400).json({ error: 'decisor sem contato' }); return;
  }

  var anexos = (Array.isArray(body.anexos) ? body.anexos : []).map(function (a) {
    try { return { filename: str(a.filename) || 'arquivo', mime: str(a.mime) || 'application/octet-stream', buffer: Buffer.from(a.data || '', 'base64') }; }
    catch (e) { return null; }
  }).filter(function (a) { return a && a.buffer.length; });

  try {
    var leadId = await notion.createLead(f);

    var uploads = [];
    var mailAtt = [];
    for (var i = 0; i < anexos.length; i++) {
      var up = await notion.uploadFile(anexos[i].buffer, anexos[i].filename, anexos[i].mime);
      if (up) uploads.push({ id: up, name: anexos[i].filename });
      mailAtt.push({ filename: anexos[i].filename, content: anexos[i].buffer, contentType: anexos[i].mime });
    }
    if (uploads.length) await notion.attachFiles(leadId, uploads);

    email.notifyOwner(f, mailAtt).catch(function (e) { console.error('notifyOwner', e); });

    res.status(200).json({ leadId: leadId });
  } catch (e) {
    console.error('submit-form', e);
    res.status(500).json({ error: 'server' });
  }
};

function str(v) { return (v == null ? '' : String(v)).trim(); }

function readJson(req) {
  return new Promise(function (resolve, reject) {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) { resolve(req.body); return; }
    var raw = '';
    req.on('data', function (c) { raw += c; });
    req.on('end', function () { try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}
