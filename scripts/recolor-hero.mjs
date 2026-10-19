// Gera versões coloridas de src/assets/hero-ofertas.png para cada nicho (rodar à mão quando mudar a imagem ou as cores).
// Verdes viram a cor principal do nicho; o verde-limão vira a cor de destaque.
import sharp from 'sharp';

const temas = {
  perfumes: { principal: 272, destaque: 305, sat: 1, destaqueSat: 0.7 },
  eletronicos: { principal: 218, destaque: 192, sat: 1 },
  maquinas: { principal: 240, destaque: 44, sat: 0.06, destaqueSat: 1.1 },
};

const rgb2hsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
};
const hsl2rgb = (h, s, l) => {
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0) * 255, f(8) * 255, f(4) * 255];
};

const { data, info } = await sharp('src/assets/hero-ofertas.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (const [nome, t] of Object.entries(temas)) {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const [h, s, l] = rgb2hsl(out[i], out[i + 1], out[i + 2]);
    if (s < 0.08) continue; // branco, cinza e texto riscado ficam como estão
    let nh, ns = s, nl = l;
    if (h >= 55 && h < 110) { nh = t.destaque; ns = Math.min(1, s * (t.destaqueSat ?? 1)); }
    else if (h >= 110 && h < 200) {
      nh = t.principal; ns = s * t.sat;
      if (t.sat < 0.5) nl = Math.pow(l, 1.6); // máquinas: verdes viram grafite (escuros escurecem mais)
    } else continue;
    const [r, g, b] = hsl2rgb(nh, ns, nl);
    out[i] = r; out[i + 1] = g; out[i + 2] = b;
  }
  await sharp(out, { raw: info }).png({ compressionLevel: 9 }).toFile(`src/assets/hero-ofertas-${nome}.png`);
  console.log('ok', nome);
}
