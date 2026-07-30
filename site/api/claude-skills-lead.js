/* POST /api/claude-skills-lead — lead magnet "5 Claude Skills" (/claude-skills).
   Cria o card no Notion (CRM existente) e avisa o Nicolas. Body: { nome, email }. */
var notion = require('./_lib/notion');
var email = require('./_lib/email');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }

  var body;
  try { body = await readJson(req); }
  catch (e) { res.status(400).json({ error: 'parse' }); return; }

  var f = { nome: str(body.nome), email: str(body.email) };
  if (!f.nome || !f.email) { res.status(400).json({ error: 'campos obrigatórios' }); return; }

  try {
    await notion.createInboundLead({
      nome: f.nome,
      email: f.email,
      projeto: 'Lead magnet: 5 Claude Skills (dumbify, storytelling, viral-hooks, anti-ai-writing, voice-dna)',
    });
    email.notifyContentLead(f).catch(function (e) { console.error('notifyContentLead', e); });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('claude-skills-lead', e);
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
