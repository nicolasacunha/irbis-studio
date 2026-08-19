// Demo Rocha · função serverless da Vercel (POST /api/chat)
// Chaves ficam nas variáveis de ambiente do projeto na Vercel:
//   ANTHROPIC_API_KEY  (obrigatória)
//   PLACA_TOKEN        (opcional: consulta real na API Placas)
//   MODELO             (opcional, padrão claude-sonnet-4-5)

const MODELO = process.env.MODELO || 'claude-sonnet-4-5';

const PLACAS_SEMEADAS = {
  'FVN9148': { marca:'Nissan',    modelo:'Versa 16SV CVT', ano:'2018/2019', cor:'Branco'  },
  'BRA2E19': { marca:'Volkswagen',modelo:'Gol 1.0 MPI',    ano:'2020/2021', cor:'Branco'  },
  'GHI7C55': { marca:'Chevrolet', modelo:'Onix LT 1.0',    ano:'2019/2020', cor:'Preto'   },
};

const PECAS = [
  { chaves:['vela','velas','ignicao'], nome:'Jogo de velas', marca:'Bosch SP10', cod:'1C1003E', estoque:8,  end:'1C · 100 · 3 · E', obs:null },
  { chaves:['amortecedor','amortecedores','suspensao dianteira'], nome:'Amortecedor dianteiro (par)', marca:'Monroe', cod:'2H0871B', estoque:4, end:'2H · 087 · 1 · B',
    obs:'Este modelo muda o amortecedor conforme o semestre de fabricação. Pela placa, é a versão com batente integrado.' },
  { chaves:['pastilha','pastilhas','freio','freios'], nome:'Jogo de pastilhas de freio dianteiras', marca:'Fras-le', cod:'1A0442C', estoque:12, end:'1A · 044 · 2 · C', obs:null },
  { chaves:['pivo','pivô','pivos'], nome:'Pivô de suspensão', marca:'Nakata', cod:'1B2091A', estoque:6, end:'1B · 209 · 1 · A', obs:null },
  { chaves:['retentor','retentores'], nome:'Retentor da roda dianteira', marca:'Sabó', cod:'3D1187D', estoque:9, end:'3D · 118 · 7 · D', obs:null },
  { chaves:['filtro','filtros','oleo'], nome:'Filtro de óleo', marca:'Mann', cod:'1A0023A', estoque:22, end:'1A · 002 · 3 · A', obs:null },
  { chaves:['correia','correias'], nome:'Correia dentada (kit com tensor)', marca:'Continental', cod:'2C0554B', estoque:3, end:'2C · 055 · 4 · B',
    obs:'Para este motor o kit certo já vem com o tensor. Evita comprar a correia avulsa por engano.' },
  { chaves:['farol','farois','faróis'], nome:'Farol dianteiro (lado direito)', marca:'Arteb', cod:'4A3310B', estoque:2, end:'4A · 331 · 0 · B', obs:null },
  { chaves:['bateria'], nome:'Bateria 60Ah', marca:'Moura', cod:'1D0505A', estoque:14, end:'1D · 050 · 5 · A', obs:null },
];

const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
function campo(obj, ...nomes){
  if (!obj) return '';
  for (const n of nomes){
    for (const k of Object.keys(obj)){
      if (k.toLowerCase() === n.toLowerCase() && obj[k]) return String(obj[k]);
    }
  }
  return '';
}

async function consultarPlaca(placa){
  placa = (placa||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  if (process.env.PLACA_TOKEN){
    try {
      const r = await fetch(`https://wdapi2.com.br/consulta/${placa}/${process.env.PLACA_TOKEN}`, { signal: AbortSignal.timeout(10000) });
      const d = await r.json().catch(()=>null);
      if (r.ok && d){
        const marca  = campo(d,'marca','MARCA');
        const modelo = campo(d,'modelo','MODELO','SUBMODELO','VERSAO');
        if (marca){
          const anoF = campo(d,'ano'), anoM = campo(d,'anoModelo');
          return { encontrado:true, origem:'apiplacas', marca, modelo,
            ano: (anoF && anoM && anoF!==anoM) ? anoF+'/'+anoM : (anoM || anoF),
            cor: campo(d,'cor','COR') };
        }
      }
    } catch(e){ console.log('apiplacas falhou:', e.message); }
  }
  const s = PLACAS_SEMEADAS[placa];
  if (!s) return { encontrado:false,
    instrucao:'Placa não localizada na base. Não invente o carro: diga que não achou pela placa e pergunte modelo e ano ao cliente. Siga o atendimento com o que ele informar.' };
  return { encontrado:true, origem:'semeada', ...s };
}

function buscarPeca(termo){
  const t = norm(termo||'');
  const p = PECAS.find(p => p.chaves.some(c => t.includes(norm(c)) || norm(c).includes(t)));
  if (!p) return { encontrado:false, disponiveis: PECAS.map(x=>x.chaves[0]) };
  return { encontrado:true, nome:p.nome, marca:p.marca, codigo_interno:p.cod, estoque:p.estoque, endereco:p.end, observacao:p.obs };
}

const SYSTEM = `Você é o atendente virtual da Rocha Auto Peças no WhatsApp, numa demonstração para o dono da empresa.

Regras de conversa:
- Português do Brasil, tom de WhatsApp: curto, simpático, direto. Mensagens de 1 a 3 linhas. Sem asteriscos de formatação além de **negrito** pontual.
- Primeiro passo: pedir a placa do carro. Assim que receber uma placa, use a ferramenta consultar_placa e confirme o veículo com o cliente (cite a cor quando vier).
- Depois pergunte qual peça a pessoa precisa. Ela vai falar do jeito dela ("barulho no freio", "vela", "amortecedor"). Use buscar_peca com o termo.
- Responda com a peça certa: marca, código interno e estoque. Se a ferramenta trouxer uma observação (pegadinha de ano/versão), mencione com naturalidade.
- Quando o cliente confirmar que quer, chame enviar_pedido com todos os itens acumulados e avise que o pedido foi pro vendedor, que já chama ele com o valor.
- Pode adicionar mais peças ao mesmo pedido; chame enviar_pedido de novo com a lista completa.
- Se consultar_placa não encontrar o veículo, não invente carro: avise que não localizou pela placa, pergunte modelo e ano, e siga com o que o cliente disser.
- Nunca invente peça, código ou estoque fora do que as ferramentas retornarem. Nunca fale de preço em reais. Nunca diga que é uma demonstração ou uma IA de teste.
- Se a pessoa mandar qualquer coisa fora do assunto, traga de volta com bom humor pra placa ou pra peça.`;

const TOOLS = [
  { name:'consultar_placa', description:'Consulta a placa e retorna marca, modelo, ano e cor do veículo.',
    input_schema:{ type:'object', properties:{ placa:{type:'string', description:'Placa no formato AAA0000 ou AAA0A00'} }, required:['placa'] } },
  { name:'buscar_peca', description:'Busca a peça certa para o veículo no catálogo/cross da loja. Retorna nome, marca, código interno, estoque, endereço e observações.',
    input_schema:{ type:'object', properties:{ termo:{type:'string', description:'A peça como o cliente falou, ex.: vela, amortecedor, pastilha'} }, required:['termo'] } },
  { name:'enviar_pedido', description:'Envia o pedido montado para a tela do vendedor. Chamar quando o cliente confirmar o orçamento.',
    input_schema:{ type:'object', properties:{
      carro:{type:'string', description:'Descrição do carro, ex.: Nissan Versa 16SV CVT 2018/2019 branco'},
      itens:{type:'array', items:{type:'object', properties:{
        nome:{type:'string'}, marca:{type:'string'}, codigo_interno:{type:'string'},
        estoque:{type:'number'}, endereco:{type:'string'} }, required:['nome','marca','codigo_interno','endereco']}}
    }, required:['carro','itens'] } },
];

async function chamarClaude(messages){
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{ 'content-type':'application/json', 'x-api-key':process.env.ANTHROPIC_API_KEY, 'anthropic-version':'2023-06-01' },
    body: JSON.stringify({ model:MODELO, max_tokens:500, system:SYSTEM, tools:TOOLS, messages })
  });
  if (!r.ok) throw new Error('Anthropic '+r.status+': '+await r.text());
  return r.json();
}

async function conversar(messages){
  const pedidos = [];
  for (let volta=0; volta<6; volta++){
    const resp = await chamarClaude(messages);
    messages.push({ role:'assistant', content: resp.content });
    if (resp.stop_reason !== 'tool_use'){
      const texto = resp.content.filter(b=>b.type==='text').map(b=>b.text).join('\n').trim();
      return { messages, texto, pedidos };
    }
    const results = [];
    for (const b of resp.content){
      if (b.type !== 'tool_use') continue;
      let out;
      if (b.name === 'consultar_placa') out = await consultarPlaca(b.input.placa);
      else if (b.name === 'buscar_peca') out = buscarPeca(b.input.termo);
      else if (b.name === 'enviar_pedido'){ pedidos.push(b.input); out = { ok:true, mensagem:'Pedido exibido na tela do vendedor.' }; }
      else out = { erro:'ferramenta desconhecida' };
      results.push({ type:'tool_result', tool_use_id:b.id, content: JSON.stringify(out) });
    }
    messages.push({ role:'user', content: results });
  }
  return { messages, texto:'(a conversa travou, tenta de novo)', pedidos };
}

// Freio de uso: por instância, 30 chamadas por IP a cada 5 minutos.
const uso = new Map();
function estourou(ip){
  const agora = Date.now();
  const reg = uso.get(ip) || { n:0, t:agora };
  if (agora - reg.t > 300000){ reg.n = 0; reg.t = agora; }
  reg.n++;
  uso.set(ip, reg);
  return reg.n > 30;
}

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ erro:'método não suportado' });
  const ip = (req.headers['x-forwarded-for']||'').split(',')[0] || 'desconhecido';
  if (estourou(ip)) return res.status(429).json({ erro:'muitas mensagens, espera um pouquinho' });
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length > 80) return res.status(400).json({ erro:'conversa inválida ou longa demais, recarrega a página' });
    const ultima = messages[messages.length-1];
    if (ultima && typeof ultima.content === 'string' && ultima.content.length > 600) return res.status(400).json({ erro:'mensagem grande demais' });
    const out = await conversar(messages);
    return res.status(200).json(out);
  } catch(e){
    console.error(e);
    return res.status(500).json({ erro:String(e.message||e) });
  }
}
