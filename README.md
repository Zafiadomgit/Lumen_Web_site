# Lumen Studio — web

Web del estudio: webs, apps, videojuegos y TPV para restaurantes. Publicada en Vercel (proyecto `lumen`):
cada push a `main` sale a producción y cada rama tiene su vista previa.

Sitio estático sin paso de compilación, más una función serverless:

- `index.html`, `css/styles.css`, `js/main.js`, `assets/`: la web (en español).
- `en/index.html`: la versión en inglés, **generada** con `python3 tools/build_en.py` a partir de `index.html`.
  Si cambias un texto en español, añade o corrige su par en `tools/build_en.py` y vuelve a ejecutarlo.
  Los textos que genera el JavaScript (calculadora, personajes, formulario, Champi) están traducidos en `js/main.js`.
- Fendaria se muestra como escaparate (personajes animados, vídeo y capturas). La versión jugable se quitó mientras
  se optimiza para PC; para volver a ponerla, copia `www/` del juego en `demos/fendaria/` y restaura el botón y la ventana del commit que la retiró.
- `demos/tpv/`: el TPV real de California compilado en modo demo (datos de prueba en el navegador).
- `assets/img/champi/`: Champi, la mascota que pasea por la página (la seta de Fendaria).
- `api/contact.js`: el formulario de contacto envía un email con Resend.
- `assets/data/champi-faq.json`: las preguntas guardadas de Champi (unas 90, en español e inglés). Champi las responde al momento y sin gastar créditos; solo pregunta a la IA cuando ninguna encaja. Para añadir una: copia una entrada, cambia `k` (palabras clave, sin tildes) y las respuestas `es`/`en`. Las de precio o plazo llevan `"intent": "price"` o `"time"`.
- `api/champi.mjs`: Champi IA, responde preguntas sobre el estudio con Claude (SDK oficial `@anthropic-ai/sdk`).
  Solo habla de Lumen Studio y de esta web; lo demás lo rechaza. Sin clave, la web usa respuestas preparadas (`js/main.js`).
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
- `ANTHROPIC_API_KEY` (opcional): activa las respuestas con IA de Champi. Sin ella, Champi contesta solo con las preguntas guardadas y deriva el resto a WhatsApp.
- `CHAMPI_MODEL` (opcional): modelo de Champi; por defecto `claude-haiku-5-5`, con esfuerzo bajo.
- `CHAMPI_ALLOWED_ORIGINS` (opcional): dominios extra que pueden usar a Champi (p. ej. el dominio propio cuando lo tengáis).

### Gasto de Champi

La API de Anthropic se paga aparte del plan de Claude: con créditos prepagados en console.anthropic.com.

- Coste estimado con Haiku 5.5: unos 0,0003 USD por pregunta (≈ 2.000 tokens de entrada y 200 de salida),
  es decir, unas 3.300 preguntas por cada dólar.
- Tope recomendado: **5 USD al mes** (unas 15.000 preguntas). En la consola: Settings → Limits → límite de gasto
  mensual de 5 USD, y en Billing carga 5–10 USD de créditos **con la recarga automática desactivada**: así es
  imposible gastar más de lo cargado.
- El código añade protecciones: solo responde a peticiones desde esta web y limita a 12 preguntas por hora y 30
  por día por visitante. Cada respuesta deja en los registros de Vercel los tokens usados.
- Las preguntas frecuentes no llegan a la IA: se responden con `assets/data/champi-faq.json`, así que el gasto real
  queda muy por debajo de estas cifras.
- `CONTACT_FROM` (opcional): remitente verificado en Resend, p. ej. `Lumen Studio <hola@tudominio.com>`.
  Sin dominio verificado, Resend solo deja enviar al email de tu propia cuenta de Resend.

## Pendiente

- Precios de la calculadora: en dólares (USD), en `js/main.js` (objeto `CALC`).

- Páginas legales: añadir el NIT (y la matrícula de la Cámara de Comercio) cuando Lumen esté constituida.
- Opiniones de clientes: borradores para aprobar en `docs/testimonios-borrador.md`.
- Al tener dominio propio, cambiar `lumen-ruddy-beta.vercel.app` en `index.html`, `robots.txt` y `sitemap.xml`.
