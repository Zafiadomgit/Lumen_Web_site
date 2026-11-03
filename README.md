# Lumen Studio — web

Web del estudio: webs, apps, videojuegos y TPV para restaurantes. Publicada en Vercel (proyecto `lumen`):
cada push a `main` sale a producción y cada rama tiene su vista previa.

Sitio estático sin paso de compilación, más una función serverless:

- `index.html`, `css/styles.css`, `js/main.js`, `assets/`: la web.
- `demos/tpv/`: el TPV real de California compilado en modo demo (datos de prueba en el navegador).
- `demos/fendaria/`: el juego, copia de `www/` de Juego_Hack_and_slash.
- `api/contact.js`: el formulario de contacto envía un email con Resend.
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: páginas legales.
- `robots.txt`, `sitemap.xml`: para buscadores.

```bash
python3 -m http.server 8000
```

## Configuración en Vercel

En *Settings → Environment Variables*:

- `RESEND_API_KEY` (obligatoria para que el formulario envíe emails). Sin ella, el formulario abre el
  correo del visitante con el mensaje ya escrito.
- `CONTACT_TO` (opcional): a dónde llegan los mensajes. Por defecto `pietersd05@gmail.com`.
- `CONTACT_FROM` (opcional): remitente verificado en Resend, p. ej. `Lumen Studio <hola@tudominio.com>`.
  Sin dominio verificado, Resend solo deja enviar al email de tu propia cuenta de Resend.

## Pendiente

- Precios de la calculadora: son orientativos y están en `js/main.js` (objeto `CALC`).
- Rellenar los datos marcados entre corchetes en las páginas legales.
- Opiniones de clientes: borradores para aprobar en `docs/testimonios-borrador.md`.
- Al tener dominio propio, cambiar `lumen-ruddy-beta.vercel.app` en `index.html`, `robots.txt` y `sitemap.xml`.
