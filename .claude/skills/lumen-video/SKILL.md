---
name: lumen-video
description: Produce los videos verticales de redes de Lumen Studio (Champi, demos del TPV, capturas de la web) con HyperFrames, a partir de los guiones aprobados. Úsalo cuando pidan montar, animar o exportar un video para TikTok, Reels o Shorts.
---

# Productor de video

**Estilo aprobado (noviembre 2026):** los videos se hacen con HyperFrames y la plantilla de `docs/redes/plantilla/hyperframes/`. Es el estilo que se aprobó, así que no vuelvas a grabar páginas en tiempo real con Playwright: ese estilo se descartó.

## Antes de empezar
- Lee `docs/redes/guia-de-marca.md` y la pieza en `docs/redes/semanas/<lunes>/guiones.md`.
- Lee la skill `/hyperframes` (contrato de render, movimiento, reglas para vertical). Si no está instalada, pídele a la persona que la autorice: `npx skills add heygen-com/hyperframes`.
- Usa `HYPERFRAMES_NO_TELEMETRY=1` en cada comando.
- **Material real, nunca inventado:**
  - sprites de Champi en `assets/img/champi/` (walk mira a la derecha, idle de frente);
  - capturas en `assets/img/` (TPV, proyectos);
  - la web y la demo del TPV (`demos/tpv/`) se capturan con Playwright a 1366×900 o 390×844 (celular), en modo oscuro (`localStorage['lumen-theme']='dark'`).

## Cómo montar
1. Crea el proyecto: `docs/redes/plantilla/hyperframes/nuevo.sh docs/redes/semanas/<lunes>/video/<id>`.
2. Escribe `index.html` siguiendo los de ejemplo (`semanas/2026-11-09/video/*` y `semanas/2026-11-16/video/*`):
   - `assets/css/lumen.css`: fondo con la luz del farol, kicker, titular, tableta, celular, Champi, burbujas y cierre;
   - `assets/js/lumen.js` (`Lumen(tl, DURACION)`): `wordsIn`, `lineIn`, `wordsOut`, `cycle` (sprites), `pose`, `finger`, `screens`, `embers` y `outro`.
3. Gancho en el primer cuadro: el titular ya en pantalla y algo real (Champi, la pantalla), nunca negro ni un logo.
4. Todo el texto entre 168 y 1330 px de alto; debajo solo decoración (ahí van la descripción y los botones de la app).
5. `npx hyperframes@0.9.19 check --json` sin errores. Después `snapshot --at …` de cada escena, y revisa los cuadros antes de renderizar.
6. Render: `npx hyperframes@0.9.19 render --quality delivery -o <id>.mp4`. Saca la portada con ffmpeg (`<id>-portada.png`) y revisa una tira de cuadros del MP4 final.

## Reglas
- Sin música dentro del archivo: la música se pone al programar en Metricool (canción del catálogo de Instagram en los Reels y «Añadir música automáticamente» en TikTok; ver «Música» en la guía de marca). Los efectos de sonido propios (chispas, clics) sí pueden ir en el archivo, bajos, para que no choquen con la canción.
- Cierre con el farol encendido, Champi saludando y «Encendemos tus ideas.» (al menos 2 s en pantalla).
- Nada que no sea cierto: ni frases del guion que la pantalla no muestre, ni «cumple Verifactu» hasta que se pueda afirmar.
- Entrega el MP4 y la portada junto al `index.html`. Para Metricool, el video tiene que estar en `main` (se sirve desde raw.githubusercontent.com).
