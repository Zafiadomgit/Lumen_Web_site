// Formulario de contacto de la web → email con Resend (https://resend.com).
// Variables de entorno en Vercel (Settings → Environment Variables):
//   RESEND_API_KEY  (obligatoria)  clave de la API de Resend
//   CONTACT_TO      (opcional)     a dónde llegan los mensajes; por defecto pietersd05@gmail.com
//   CONTACT_FROM    (opcional)     remitente verificado en Resend; por defecto el de pruebas de Resend
// Sin RESEND_API_KEY responde 503 y la web abre el correo del visitante con el mensaje ya escrito.

const escape = (v) => String(v || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIPOS = ['Web', 'App', 'Videojuego', 'TPV', 'A medida', 'Aún no lo sé'];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }
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
