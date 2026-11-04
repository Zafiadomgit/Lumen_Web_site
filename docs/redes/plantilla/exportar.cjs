// Exporta cada lámina (<section class="slide">) de un carrusel a PNG: 01.png, 02.png…
// Uso, con la web servida en local (python3 -m http.server 5301 desde la raíz del repo):
//   node docs/redes/plantilla/exportar.cjs docs/redes/semanas/2026-11-09/carrusel/s1-quienes
const { chromium } = require('playwright');
(async () => {
  const dir = process.argv[2].replace(/\/$/, '');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto('http://localhost:5301/' + dir + '/index.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const n = await p.locator('.slide').count();
  for (let i = 0; i < n; i++) await p.locator('.slide').nth(i).screenshot({ path: `${dir}/${String(i + 1).padStart(2, '0')}.png` });
  console.log(dir, n, 'láminas');
  await b.close();
})();
