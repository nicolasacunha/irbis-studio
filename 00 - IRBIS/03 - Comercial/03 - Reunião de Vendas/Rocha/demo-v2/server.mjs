// ============================================================
// Demo Rocha · servidor local (Node 18+, sem dependências)
// Rodar:  node server.mjs   → abre http://localhost:3010
// ============================================================

// ---------- CONFIGURE AQUI ----------
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'COLE_SUA_CHAVE_AQUI';
const MODELO            = process.env.MODELO || 'claude-sonnet-4-5';
const PLACA_TOKEN       = process.env.PLACA_TOKEN || ''; // token da apiplacas.com.br (wdapi2). Vazio = usa os dados semeados abaixo.
// APIBrasil (modelo pré-pago; a "Fipe (Beta)" aceita conta PF e custa R$ 0,06/consulta):
// 1. app.apibrasil.io > completar perfil (CPF + endereço) > Recarregar (saldo mínimo)
// 2. Marketplace > "Fipe (Beta)" > contratar
// 3. Copie o Bearer Token (em Credenciais) e a URL do endpoint (no botão </> Exemplos)
const APIBRASIL_BEARER  = process.env.APIBRASIL_BEARER || '';
const APIBRASIL_DEVICE  = process.env.APIBRASIL_DEVICE || ''; // só se o exemplo do painel pedir
const APIBRASIL_URL     = process.env.APIBRASIL_URL || 'https://gateway.apibrasil.io/api/v2/vehicles/fipe';
const PORTA             = 3010;

// Placas semeadas: usadas quando não há PLACA_TOKEN ou quando a API falhar no meio da demo.
// ATENÇÃO: FVN9148 foi consultada na visita de 18/ago. Confirme o carro real antes de apresentar.
const PLACAS_SEMEADAS = {
  'FVN9148': { marca:'Fiat',      modelo:'Argo Drive 1.3', ano:'2017/2018', cor:'Prata'   },
  'BRA2E19': { marca:'Volkswagen',modelo:'Gol 1.0 MPI',    ano:'2020/2021', cor:'Branco'  },
  'GHI7C55': { marca:'Chevrolet', modelo:'Onix LT 1.0',    ano:'2019/2020', cor:'Preto'   },
};

// Cross de peças da demo (código no formato interno visto no coletor).
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
// ------------------------------------

import http from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const DIR = dirname(fileURLToPath(import.meta.url));

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
  placa = placa.toUpperCase().replace(/[^A-Z0-9]/g,'');
  if (APIBRASIL_BEARER){
    try {
      const r = await fetch(APIBRASIL_URL, {
        method:'POST',
        headers:{ 'content-type':'application/json', 'authorization':'Bearer '+APIBRASIL_BEARER,
                  ...(APIBRASIL_DEVICE ? { 'devicetoken': APIBRASIL_DEVICE } : {}) },
        body: JSON.stringify({ placa }),
        signal: AbortSignal.timeout(12000)
      });
      const d = await r.json().catch(()=>null);
      console.log('apibrasil status', r.status, JSON.stringify(d).slice(0,400)); // ajuda a ver o formato na 1a chamada
      const v = d && (d.response || d.dados || d.data || d);
      const marca  = campo(v,'marca','MARCA','marca_modelo');
      const modelo = campo(v,'modelo','MODELO','versao','VERSAO');
      if (r.ok && marca){
        return { encontrado:true, origem:'apibrasil', marca, modelo,
                 ano: campo(v,'anoModelo','ano_modelo','ano','ANO'),
                 cor: campo(v,'cor','COR') };
      }
    } catch(e){ console.log('apibrasil falhou:', e.message); }
  }
  if (PLACA_TOKEN){
    try {
      const r = await fetch(`https://wdapi2.com.br/consulta/${placa}/${PLACA_TOKEN}`, { signal: AbortSignal.timeout(8000) });
      if (r.ok){
        const d = await r.json();
        if (d && (d.MARCA || d.marca)) {
          return { encontrado:true, origem:'api',
            marca: d.MARCA || d.marca, modelo: d.MODELO || d.modelo,
            ano: d.anoModelo || d.ano || d.ANO || '', cor: d.cor || d.COR || '' };
        }
      }
    } catch(e){ console.log('placa api falhou, usando semeadas:', e.message); }
  }
  const s = PLACAS_SEMEADAS[placa];
  if (!s) return { encontrado:false,
    instrucao:'Placa não localizada na base. Não invente o carro: diga que não achou pela placa e pergunte modelo e ano ao cliente. Siga o atendimento com o que ele informar.' };
  return { encontrado:true, origem:'semeada', ...s };
}

function buscarPeca(termo){
  const t = norm(termo);
  const p = PECAS.find(p => p.chaves.some(c => t.includes(norm(c)) || norm(c).includes(t)));
  if (!p) return { encontrado:false, disponiveis: PECAS.map(x=>x.chaves[0]) };
  return { encontrado:true, nome:p.nome, marca:p.marca, codigo_interno:p.cod, estoque:p.estoque, endereco:p.end, observacao:p.obs };
}

const SYSTEM = `Você é o atendente virtual da Rocha Auto Peças no WhatsApp, numa demonstração ao vivo para o dono da empresa.

Regras de conversa:
- Português do Brasil, tom de WhatsApp: curto, simpático, direto. Mensagens de 1 a 3 linhas. Sem asteriscos de formatação além de **negrito** pontual.
- Primeiro passo: pedir a placa do carro. Assim que receber uma placa, use a ferramenta consultar_placa e confirme o veículo com o cliente.
- Depois pergunte qual peça a pessoa precisa. Ela vai falar do jeito dela ("barulho no freio", "vela", "amortecedor"). Use buscar_peca com o termo.
- Responda com a peça certa: marca, código interno e estoque. Se a ferramenta trouxer uma observação (pegadinha de ano/versão), mencione com naturalidade, mostra que o sistema conhece o catálogo.
- Quando o cliente confirmar que quer, chame enviar_pedido com todos os itens acumulados e avise que o pedido foi pro vendedor, que já chama ele com o valor.
- Pode adicionar mais peças ao mesmo pedido; chame enviar_pedido de novo com a lista completa.
- Se consultar_placa não encontrar o veículo, não invente carro: avise que não localizou pela placa, pergunte modelo e ano, e siga com o que o cliente disser.\n- Nunca invente peça, código ou estoque fora do que as ferramentas retornarem. Nunca fale de preço em reais. Nunca diga que é uma demonstração ou uma IA de teste.
- Se a pessoa mandar qualquer coisa fora do assunto, traga de volta com bom humor pra placa ou pra peça.`;

const TOOLS = [
  { name:'consultar_placa', description:'Consulta a placa e retorna marca, modelo, ano e cor do veículo.',
    input_schema:{ type:'object', properties:{ placa:{type:'string', description:'Placa no formato AAA0000 ou AAA0A00'} }, required:['placa'] } },
  { name:'buscar_peca', description:'Busca a peça certa para o veículo no catálogo/cross da loja. Retorna nome, marca, código interno, estoque, endereço e observações.',
    input_schema:{ type:'object', properties:{ termo:{type:'string', description:'A peça como o cliente falou, ex.: vela, amortecedor, pastilha'} }, required:['termo'] } },
  { name:'enviar_pedido', description:'Envia o pedido montado para a tela do vendedor. Chamar quando o cliente confirmar o orçamento.',
    input_schema:{ type:'object', properties:{
      carro:{type:'string', description:'Descrição do carro, ex.: Fiat Argo Drive 1.3 2017/2018 prata'},
      itens:{type:'array', items:{type:'object', properties:{
        nome:{type:'string'}, marca:{type:'string'}, codigo_interno:{type:'string'},
        estoque:{type:'number'}, endereco:{type:'string'} }, required:['nome','marca','codigo_interno','endereco']}}
    }, required:['carro','itens'] } },
];

async function chamarClaude(messages){
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{ 'content-type':'application/json', 'x-api-key':ANTHROPIC_API_KEY, 'anthropic-version':'2023-06-01' },
    body: JSON.stringify({ model:MODELO, max_tokens:600, system:SYSTEM, tools:TOOLS, messages })
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
      if (b.name === 'consultar_placa') out = await consultarPlaca(b.input.placa || '');
      else if (b.name === 'buscar_peca') out = buscarPeca(b.input.termo || '');
      else if (b.name === 'enviar_pedido'){ pedidos.push(b.input); out = { ok:true, mensagem:'Pedido exibido na tela do vendedor.' }; }
      else out = { erro:'ferramenta desconhecida' };
      results.push({ type:'tool_result', tool_use_id:b.id, content: JSON.stringify(out) });
    }
    messages.push({ role:'user', content: results });
  }
  return { messages, texto:'(a conversa travou, tenta de novo)', pedidos };
}

http.createServer(async (req,res)=>{
  try{
    if (req.method==='GET' && (req.url==='/'||req.url.startsWith('/?'))){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'});
      return res.end(readFileSync(join(DIR,'index.html')));
    }
    if (req.method==='POST' && req.url==='/api/chat'){
      let body=''; for await (const c of req) body+=c;
      const { messages } = JSON.parse(body);
      const out = await conversar(messages);
      res.writeHead(200,{'content-type':'application/json'});
      return res.end(JSON.stringify(out));
    }
    res.writeHead(404); res.end('nada aqui');
  } catch(e){
    console.error(e);
    res.writeHead(500,{'content-type':'application/json'});
    res.end(JSON.stringify({ erro:String(e.message||e) }));
  }
}).listen(PORTA, ()=>{
  console.log('Demo Rocha rodando em  http://localhost:'+PORTA);
  console.log('Tela do vendedor separada:  http://localhost:'+PORTA+'/?tela=vendedor');
  console.log(APIBRASIL_BEARER ? 'Consulta de placa: APIBrasil (100 grátis/dia)' : PLACA_TOKEN ? 'Consulta de placa: API real (wdapi2)' : 'Consulta de placa: dados semeados (sem token)');
  if (ANTHROPIC_API_KEY.startsWith('COLE')) console.log('>>> FALTA a ANTHROPIC_API_KEY (edite o topo do server.mjs ou use variável de ambiente)');
});
