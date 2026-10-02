// Baixa as fotos das ofertas para public/ofertas/ antes do build.
// Ordem: foto principal do anúncio (og:image da página do produto) > foto ilustrativa do Pexels.
// Se nada baixar, o card mostra o placeholder: o build nunca falha por isso.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';

const sources = JSON.parse(readFileSync('src/data/offer-photos.json', 'utf8'));
const outDir = 'public/ofertas';
const manifestPath = 'src/data/offer-photos.manifest.json';
mkdirSync(outDir, { recursive: true });

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const EXT = { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png', 'image/avif': 'avif' };

const pexelsUrl = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=480&h=480&fit=crop`;

async function download(url, offerId) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
  const type = (res.headers.get('content-type') || '').split(';')[0];
  if (!res.ok || !EXT[type]) throw new Error(`HTTP ${res.status} ${type}`);
  const file = `${offerId}.${EXT[type]}`;
  writeFileSync(`${outDir}/${file}`, Buffer.from(await res.arrayBuffer()));
  return file;
}

async function storeImageUrl(pageUrl) {
  const res = await fetch(pageUrl, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'pt-BR,pt;q=0.9' },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`página HTTP ${res.status}`);
  const html = await res.text();
  const match =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (!match) throw new Error('og:image não encontrada');
  return match[1].replace(/&amp;/g, '&');
}

const entries = Object.entries(sources).filter(([key]) => !key.startsWith('_'));
const manifest = {};

await Promise.all(
  entries.map(async ([offerId, src]) => {
    const cached = readdirSync(outDir).find((f) => f.startsWith(`${offerId}.`));
    if (cached) {
      manifest[offerId] = { src: `/ofertas/${cached}`, tipo: cached.includes('.loja.') ? 'loja' : 'ilustrativa' };
      return;
    }
    if (src.anuncio) {
      try {
        const file = await download(await storeImageUrl(src.anuncio), `${offerId}.loja`);
        manifest[offerId] = { src: `/ofertas/${file}`, tipo: 'loja' };
        return;
      } catch (error) {
        console.warn(`[fotos] ${offerId}: foto do anúncio falhou (${error.message}), usando a ilustrativa`);
      }
    }
    if (src.pexels) {
      try {
        const file = await download(pexelsUrl(src.pexels), offerId);
        manifest[offerId] = { src: `/ofertas/${file}`, tipo: 'ilustrativa' };
      } catch (error) {
        console.warn(`[fotos] ${offerId}: foto ilustrativa falhou (${error.message})`);
      }
    }
  }),
);

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
const lojas = Object.values(manifest).filter((m) => m.tipo === 'loja').length;
console.log(`[fotos] ${Object.keys(manifest).length} de ${entries.length} fotos (${lojas} dos anúncios)`);
