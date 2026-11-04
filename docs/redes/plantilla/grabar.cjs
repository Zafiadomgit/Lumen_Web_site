// Graba un video vertical (1080×1920) a MP4 H.264 30 fps y saca la portada en PNG.
// Uso, con la web servida en local (python3 -m http.server 5301 desde la raíz del repo):
//   node docs/redes/plantilla/grabar.cjs docs/redes/semanas/2026-11-09/video/s1-hola [segundo_de_portada]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
(async () => {
  const dir = process.argv[2].replace(/\/$/, ''), cover = parseFloat(process.argv[3] || '3');
  const id = path.basename(dir), tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lumen-video-'));
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1080, height: 1920 }, recordVideo: { dir: tmp, size: { width: 1080, height: 1920 } } });
  const t0 = Date.now();
  const p = await ctx.newPage();
  await p.goto('http://localhost:5301/' + dir + '/index.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const offset = (Date.now() - t0) / 1000;
  const dur = await p.evaluate(() => window.DURATION);
  p.evaluate(() => window.play());
  await p.waitForTimeout(cover * 1000); await p.screenshot({ path: `${dir}/${id}-portada.png` });
  await p.waitForTimeout((dur - cover) * 1000 + 300);
  const raw = await p.video().path(); await ctx.close(); await b.close();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', offset.toFixed(2), '-i', raw, '-t', String(dur), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30', '-crf', '20', '-movflags', '+faststart', '-an', `${dir}/${id}.mp4`]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`${dir}/${id}.mp4`, dur + ' s');
})();
