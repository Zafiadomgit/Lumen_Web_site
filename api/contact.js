// Formulario de contacto de la web → email con Resend (https://resend.com).
// Variables de entorno en Vercel (Settings → Environment Variables):
//   RESEND_API_KEY  (obligatoria)  clave de la API de Resend
//   CONTACT_TO      (opcional)     a dónde llegan los mensajes; por defecto pietersd05@gmail.com
//   CONTACT_FROM    (opcional)     remitente verificado en Resend; por defecto el de pruebas de Resend
// Sin RESEND_API_KEY responde 503 y la web abre el correo del visitante con el mensaje ya escrito.

const escape = (v) => String(v || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIPOS = ['Web', 'App', 'Videojuego', 'TPV', 'A medida', 'Aún no lo sé'];

// --- protecciones contra abusos (las mismas que Champi) ---
// 1) solo acepta envíos desde nuestra web: producción, dominio propio, vistas previas de Vercel y pruebas en local
const EXTRA_ORIGINS = (process.env.ALLOWED_ORIGINS || process.env.CHAMPI_ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
const allowedOrigin = (req) => {
  const src = req.headers.origin || req.headers.referer || '';
  let host;
  try { host = new URL(src).host; } catch { return false; }
  if (host === 'lumen-ruddy-beta.vercel.app' || host === 'lumenestudio.tech' || host === 'www.lumenestudio.tech') return true;
  if (/^lumen-[a-z0-9-]+-davidpieters12-gmailcoms-projects\.vercel\.app$/.test(host)) return true;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return true;
  return EXTRA_ORIGINS.some((o) => { try { return new URL(o).host === host; } catch { return false; } });
};
// 2) envíos por visitante (por IP): 5 por hora y 15 por día. Aproximado (cada instancia cuenta por su lado),
//    pero frena a un bot que intente llenar el correo o agotar el cupo diario de Resend.
const LIMITS = [{ ms: 3600e3, max: 5 }, { ms: 86400e3, max: 15 }];
const hits = new Map();
const tooMany = (ip) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 86400e3);
  if (LIMITS.some((l) => list.filter((t) => now - t < l.ms).length >= l.max)) { hits.set(ip, list); return true; }
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }
  if (!allowedOrigin(req)) return res.status(403).json({ error: 'forbidden' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (tooMany(ip)) return res.status(429).json({ error: 'rate_limited' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  // trampa para bots: el campo "web" está oculto a las personas
  if (body.web) return res.status(200).json({ ok: true });

  const nombre = String(body.nombre || '').trim().slice(0, 80);
  const email = String(body.email || '').trim().slice(0, 120);
  const tipo = TIPOS.includes(body.tipo) ? body.tipo : 'Aún no lo sé';
  const mensaje = String(body.mensaje || '').trim().slice(0, 3000);
  if (!nombre || !EMAIL.test(email) || mensaje.length < 5) {
    return res.status(400).json({ error: 'Faltan datos: nombre, un email válido y el mensaje.' });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ error: 'not_configured' });

  const html = `<h2>Nuevo proyecto desde la web</h2>
<p><strong>Nombre:</strong> ${escape(nombre)}<br><strong>Email:</strong> ${escape(email)}<br><strong>Tipo:</strong> ${escape(tipo)}</p>
<p style="white-space:pre-wrap">${escape(mensaje)}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Lumen Studio <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || 'pietersd05@gmail.com'],
        reply_to: email,
        subject: `Proyecto (${tipo}): ${nombre}`,
        html,
      }),
    });
    if (!r.ok) return res.status(502).json({ error: 'No se pudo enviar el email' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'No se pudo enviar el email' });
  }
};
