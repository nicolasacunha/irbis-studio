/* Cliente do Notion (CRM IRBIS) via REST, sem SDK. */
var NOTION = 'https://api.notion.com/v1';
var VERSION = '2022-06-28';

function headers(extra) {
  return Object.assign({
    'Authorization': 'Bearer ' + process.env.NOTION_TOKEN,
    'Notion-Version': VERSION,
  }, extra || {});
}

function txt(s) { return [{ type: 'text', text: { content: (s || '').slice(0, 1900) } }]; }
function multi(arr) { return (arr || []).map(function (v) { return { name: v }; }); }

/* Cria o card do lead. Retorna o pageId. */
async function createLead(f) {
  var props = {
    'Negócio': { title: txt(f.negocio || f.nome || 'Lead sem nome') },
    'Contato': { rich_text: txt(f.nome) },
    'Email': { email: f.email || null },
    'WhatsApp': { phone_number: f.whatsapp || null },
    'O que faz': { rich_text: txt(f.oquefaz) },
    'Estágio': { select: { name: 'Formulário preenchido' } },
    'Origem': { select: { name: 'Site' } },
    'Prazo desejado': { rich_text: txt(f.prazo) },
    'Orçamento previsto': { rich_text: txt(f.orcamento) },
    'Canais de aquisição': { rich_text: txt(f.canais) },
    'Valor do cliente': { rich_text: txt(f.valorcliente) },
  };
  if (f.site) props['Site atual'] = { url: f.site };
  if (f.objetivo && f.objetivo.length) props['Site precisa fazer'] = { multi_select: multi(f.objetivo) };
  if (f.incomodo && f.incomodo.length) props['Incômodo'] = { multi_select: multi(f.incomodo) };
  if (f.decisor) props['Decisor'] = { select: { name: f.decisor } };

  var children = [];
  if (f.livre) {
    children.push({
      object: 'block', type: 'callout',
      callout: { rich_text: txt(f.livre), icon: { emoji: '💬' } },
    });
  }

  var res = await fetch(NOTION + '/pages', {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_CRM_DB_ID },
      properties: props,
      children: children,
    }),
  });
  var data = await res.json();
  if (!res.ok) throw new Error('notion createLead: ' + (data.message || res.status));
  return data.id;
}

/* Cria um lead de INBOUND do form da home (nome, email, o que precisa).
   Estágio "Contato recebido" = topo de funil, ainda não qualificado. */
async function createInboundLead(f) {
  var props = {
    'Negócio': { title: txt(f.nome || 'Contato sem nome') },
    'Contato': { rich_text: txt(f.nome) },
    'Email': { email: f.email || null },
    'Estágio': { select: { name: 'Contato recebido' } },
    'Origem': { select: { name: 'Site' } },
  };
  var children = [];
  if (f.projeto) {
    children.push({
      object: 'block', type: 'callout',
      callout: { rich_text: txt(f.projeto), icon: { emoji: '📥' } },
    });
  }
  var res = await fetch(NOTION + '/pages', {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_CRM_DB_ID },
      properties: props,
      children: children,
    }),
  });
  var data = await res.json();
  if (!res.ok) throw new Error('notion createInboundLead: ' + (data.message || res.status));
  return data.id;
}

/* Marca o lead como Call agendada e grava data + link. */
async function markBooked(pageId, info) {
  var props = {
    'Estágio': { select: { name: 'Call agendada' } },
    'Data da call': { date: { start: info.startISO } },
  };
  var res = await fetch(NOTION + '/pages/' + pageId, {
    method: 'PATCH',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ properties: props }),
  });
  var data = await res.json();
  if (!res.ok) throw new Error('notion markBooked: ' + (data.message || res.status));

  if (info.meetLink || info.htmlLink) {
    await fetch(NOTION + '/blocks/' + pageId + '/children', {
      method: 'PATCH',
      headers: headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        children: [{
          object: 'block', type: 'bookmark',
          bookmark: { url: info.meetLink || info.htmlLink },
        }],
      }),
    }).catch(function () {});
  }
  return data.id;
}

/* Sobe um arquivo para o Notion e devolve o file_upload id (ou null). */
async function uploadFile(buffer, filename, contentType) {
  try {
    var create = await fetch(NOTION + '/file_uploads', {
      method: 'POST',
      headers: headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ filename: filename, content_type: contentType || 'application/octet-stream' }),
    });
    var cd = await create.json();
    if (!create.ok) return null;

    var fd = new FormData();
    fd.append('file', new Blob([buffer], { type: contentType || 'application/octet-stream' }), filename);
    var send = await fetch(cd.upload_url, { method: 'POST', headers: headers(), body: fd });
    if (!send.ok) return null;
    return cd.id;
  } catch (e) { return null; }
}

/* Anexa file_uploads já enviados à propriedade Anexos do card. */
async function attachFiles(pageId, uploads) {
  var valid = (uploads || []).filter(Boolean);
  if (!valid.length) return;
  var filesProp = valid.map(function (u) {
    return { type: 'file_upload', file_upload: { id: u.id }, name: u.name };
  });
  await fetch(NOTION + '/pages/' + pageId, {
    method: 'PATCH',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ properties: { 'Anexos': { files: filesProp } } }),
  }).catch(function () {});
}

/* Lê os dados essenciais do lead a partir do pageId. */
async function getLead(pageId) {
  var res = await fetch(NOTION + '/pages/' + pageId, { headers: headers() });
  var data = await res.json();
  if (!res.ok) throw new Error('notion getLead: ' + (data.message || res.status));
  var p = data.properties || {};
  function rt(prop) { var a = prop && prop.rich_text; return a && a[0] ? a[0].plain_text : ''; }
  function ti(prop) { var a = prop && prop.title; return a && a[0] ? a[0].plain_text : ''; }
  return {
    nome: rt(p['Contato']),
    negocio: ti(p['Negócio']),
    email: (p['Email'] && p['Email'].email) || '',
    whatsapp: (p['WhatsApp'] && p['WhatsApp'].phone_number) || '',
  };
}

module.exports = { createLead: createLead, createInboundLead: createInboundLead, markBooked: markBooked, uploadFile: uploadFile, attachFiles: attachFiles, getLead: getLead };
