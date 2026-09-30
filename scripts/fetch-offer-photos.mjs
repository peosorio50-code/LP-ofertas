// Baixa as fotos de exemplo das ofertas (Pexels) para public/ofertas/ antes do build.
// Se alguma foto não baixar, o card correspondente mostra o placeholder: o build nunca falha por isso.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const sources = JSON.parse(readFileSync('src/data/offer-photos.json', 'utf8'));
const outDir = 'public/ofertas';
const manifestPath = 'src/data/offer-photos.manifest.json';
mkdirSync(outDir, { recursive: true });

const url = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=480&h=480&fit=crop`;

const results = await Promise.all(
  Object.entries(sources)
    .filter(([key]) => !key.startsWith('_'))
    .map(async ([offerId, photoId]) => {
      const file = `${outDir}/${offerId}.jpg`;
      if (existsSync(file)) return offerId;
      try {
        const res = await fetch(url(photoId), { signal: AbortSignal.timeout(20000) });
        if (!res.ok || !res.headers.get('content-type')?.startsWith('image/')) throw new Error(`HTTP ${res.status}`);
        writeFileSync(file, Buffer.from(await res.arrayBuffer()));
        return offerId;
      } catch (error) {
        console.warn(`[fotos] ${offerId} (pexels ${photoId}) não baixou: ${error.message}`);
        return null;
      }
    }),
);

const ok = results.filter(Boolean);
writeFileSync(manifestPath, JSON.stringify(ok, null, 2) + '\n');
console.log(`[fotos] ${ok.length} de ${results.length} fotos de exemplo disponíveis`);
