import { Image, Platform } from 'react-native';

export const PAGE_WIDTH = 595;
export const PAGE_HEIGHT = 842;
export const PAGE_RATIO = PAGE_HEIGHT / PAGE_WIDTH;

export function getNumero(doc) {
  if (!doc) return '';
  if (doc.numero) return String(doc.numero);
  const match = String(doc.nome || '').match(/(\d+)(?:\.[A-Za-z0-9]+)?$/);
  return match ? match[1] : String(doc.id != null ? doc.id : '');
}

export const STATUS_VIEW = {
  'Conclusão': { label: 'Concluído', progress: 100, stage: 'Análise concluída', tone: 'done' },
  'Revisão': { label: 'Em revisão', progress: 75, stage: 'Aguardando revisão dos campos', tone: 'review' },
  'Erro': { label: 'Erro', progress: 50, stage: 'Falha na extração de alguns campos', tone: 'error' },
  Processando: { label: 'Processando', progress: 50, stage: 'Extraindo informações', tone: 'processing' },
};

export function getStatusView(status) {
  return STATUS_VIEW[status] || STATUS_VIEW.Processando;
}

export function buildChecks(doc) {
  const conf = Math.max(0, Math.min(100, Number(doc.confianca) || 0));
  const divergentes = doc.status === 'Erro' ? 4 : doc.status === 'Revisão' ? 2 : 0;
  const camposValue = Math.max(0, 100 - divergentes * 25);
  const consistencia = Math.round((conf + camposValue) / 2);

  return [
    {
      key: 'itens',
      label: 'Itens conferidos',
      description:
        conf >= 90
          ? 'Todos os itens foram identificados corretamente'
          : 'Alguns itens foram identificados com baixa confiança',
      value: conf,
      ok: conf >= 90,
    },
    {
      key: 'campos',
      label: 'Campos que requerem atenção',
      description: divergentes
        ? `${divergentes} campos com possíveis divergências`
        : 'Nenhum campo com divergência',
      value: camposValue,
      ok: divergentes === 0,
    },
    {
      key: 'consistencia',
      label: 'Consistência dos dados',
      description:
        consistencia >= 80
          ? 'Dados coerentes com o padrão da empresa'
          : 'Dados fora do padrão da empresa',
      value: consistencia,
      ok: consistencia >= 80,
    },
  ];
}

const PALETTE = ['#1B7A72', '#2B5CA8', '#7A3E9D', '#B5651D', '#4A5568'];

const TITLES = {
  'Nota Fiscal': 'NOTA FISCAL ELETRÔNICA',
  Laudo: 'LAUDO MÉDICO',
  Contrato: 'CONTRATO DE SERVIÇOS',
  Pedido: 'PEDIDO DE COMPRA',
  Exame: 'RESULTADO DE EXAME',
  Exames: 'RESULTADO DE EXAME',
  Receita: 'RECEITA MÉDICA',
  Boleto: 'BOLETO DE COBRANÇA',
  'Relatório': 'RELATÓRIO',
  Comprovante: 'COMPROVANTE DE PAGAMENTO',
  'Apólice': 'APÓLICE DE SEGURO',
  Proposta: 'PROPOSTA COMERCIAL',
  'Certidão': 'CERTIDÃO NEGATIVA',
  Recibo: 'RECIBO',
  Ficha: 'FICHA CADASTRAL',
};

function hash(text) {
  let h = 0;
  const s = String(text);
  for (let i = 0; i < s.length; i += 1) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]
  ));
}

function bar(x, y, w, fill = '#DCE6E4', h = 7) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"/>`;
}

export function buildDocumentSvg(doc) {
  const d = doc || {};
  const tipo = d.tipo || 'Documento';
  const accent = PALETTE[hash(tipo) % PALETTE.length];
  const title = TITLES[tipo] || String(tipo).toUpperCase();
  const numero = getNumero(d);
  const conf = Math.max(0, Math.min(100, Number(d.confianca) || 0));
  const font = 'font-family="Arial, Helvetica, sans-serif"';

  let rows = '';
  for (let i = 0; i < 7; i += 1) {
    const y = 370 + i * 34;
    rows += `<rect x="40" y="${y}" width="515" height="34" fill="${i % 2 ? '#F6FAF9' : '#FFFFFF'}"/>`;
    rows += bar(52, y + 13, 24);
    rows += bar(110, y + 13, 150 + ((i * 37) % 100));
    rows += bar(350, y + 13, 28);
    rows += bar(450, y + 13, 70);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}" width="${PAGE_WIDTH}" height="${PAGE_HEIGHT}">
<rect width="${PAGE_WIDTH}" height="${PAGE_HEIGHT}" fill="#FFFFFF"/>
<rect x="0" y="0" width="${PAGE_WIDTH}" height="8" fill="${accent}"/>
<circle cx="58" cy="60" r="16" fill="${accent}"/>
${bar(84, 52, 110, '#C9D6D3', 8)}
${bar(84, 67, 70, '#DCE6E4', 6)}
<text x="555" y="56" text-anchor="end" font-size="16" font-weight="bold" fill="${accent}" ${font}>${esc(title)}</text>
<text x="555" y="74" text-anchor="end" font-size="10" fill="#555555" ${font}>Nº ${esc(numero)}  ·  ${esc(d.data || '')}</text>
<line x1="40" y1="96" x2="555" y2="96" stroke="#D5E3E0" stroke-width="1"/>
<rect x="40" y="112" width="250" height="110" fill="none" stroke="#D5E3E0"/>
<rect x="305" y="112" width="250" height="110" fill="none" stroke="#D5E3E0"/>
<text x="52" y="130" font-size="8" font-weight="bold" fill="#7A8F8B" ${font}>EMITENTE</text>
<text x="317" y="130" font-size="8" font-weight="bold" fill="#7A8F8B" ${font}>DESTINATÁRIO</text>
${bar(52, 144, 150)}${bar(52, 162, 190)}${bar(52, 180, 120)}${bar(52, 198, 160)}
${bar(317, 144, 140)}${bar(317, 162, 180)}${bar(317, 180, 110)}${bar(317, 198, 150)}
<text x="40" y="262" font-size="11" fill="#333333" ${font}>Documento: ${esc(d.nome || '')}</text>
<text x="40" y="280" font-size="11" fill="#333333" ${font}>Tipo: ${esc(tipo)}</text>
<text x="40" y="298" font-size="11" fill="#333333" ${font}>Data de emissão: ${esc(d.data || '')}</text>
<rect x="40" y="344" width="515" height="26" fill="${accent}"/>
<text x="52" y="361" font-size="9" font-weight="bold" fill="#FFFFFF" ${font}>ITEM</text>
<text x="110" y="361" font-size="9" font-weight="bold" fill="#FFFFFF" ${font}>DESCRIÇÃO</text>
<text x="350" y="361" font-size="9" font-weight="bold" fill="#FFFFFF" ${font}>QTD</text>
<text x="450" y="361" font-size="9" font-weight="bold" fill="#FFFFFF" ${font}>VALOR</text>
${rows}
<rect x="40" y="370" width="515" height="238" fill="none" stroke="#D5E3E0"/>
<rect x="355" y="630" width="200" height="44" fill="none" stroke="${accent}"/>
<text x="367" y="657" font-size="10" font-weight="bold" fill="#333333" ${font}>TOTAL</text>
${bar(450, 649, 90, '#C9D6D3', 9)}
<line x1="40" y1="790" x2="555" y2="790" stroke="#D5E3E0" stroke-width="1"/>
<text x="40" y="808" font-size="8" fill="#7A8F8B" ${font}>${esc(d.nome || '')}</text>
<text x="555" y="808" text-anchor="end" font-size="8" fill="#7A8F8B" ${font}>Confiança da leitura: ${conf}%</text>
</svg>`;
}

function saveBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

export async function downloadDocumentImage(doc, source) {
  if (Platform.OS !== 'web') return { ok: false, reason: 'native' };

  try {
    const baseName = String((doc && doc.nome) || 'documento').replace(/\.[^.]+$/, '');

    if (source) {
      const resolved = Image.resolveAssetSource ? Image.resolveAssetSource(source) : source;
      const uri = resolved && resolved.uri;
      if (!uri) return { ok: false, reason: 'error' };
      const response = await fetch(uri);
      const blob = await response.blob();
      const ext = (blob.type.split('/')[1] || 'png').split('+')[0].replace('jpeg', 'jpg');
      saveBlob(blob, `${baseName}.${ext}`);
      return { ok: true };
    }

    const svg = buildDocumentSvg(doc);
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    const img = await new Promise((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = dataUrl;
    });

    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = PAGE_WIDTH * scale;
    canvas.height = PAGE_HEIGHT * scale;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return { ok: false, reason: 'error' };
    saveBlob(blob, `${baseName}.png`);
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'error' };
  }
}