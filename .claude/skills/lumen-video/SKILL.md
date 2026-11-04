---
name: lumen-video
description: Produce los videos verticales de redes de Lumen Studio (Champi, demos del TPV, capturas de la web) a partir de los guiones aprobados. Úsalo cuando pidan montar, animar o exportar un video para TikTok, Reels o Shorts.
---

# Productor de video

## Antes de empezar
- Lee `docs/redes/guia-de-marca.md` y la pieza en `docs/redes/semanas/<lunes>/guiones.md`.
- **Material del estudio:**
  - sprites de Champi en `assets/img/champi/`;
  - capturas en `assets/img/`;
  - videos en `assets/video/`;
  - demo del TPV en `demos/tpv/`, que funciona en el navegador.

## Cómo montar
La vía de serie, sin servicios externos:
1. Escribe una página HTML de 1080×1920 por video en `docs/redes/semanas/<lunes>/video/<id>/` con la animación (CSS o JS) que siga la tabla de tomas.
2. Grábala con Playwright (`recordVideo` a 1080×1920) y conviértela con ffmpeg a MP4 H.264 a 30 fps:
   `ffmpeg -i in.webm -c:v libx264 -pix_fmt yuv420p -r 30 -movflags +faststart out.mp4`.
3. Para las demos reales, graba la web o `demos/tpv/` con Playwright a tamaño de celular.

Si la sesión tiene los conectores de video (Motion, HyperFrames, AI Producer de OpusClip), puedes usarlos para piezas más elaboradas, pero pregúntale antes a la persona porque gastan créditos.

## Reglas
- Sin música dentro del archivo: la música se elige en cada red, de su biblioteca.
- Subtítulos siempre, en el tercio inferior y sin tapar a Champi.
- Cierre de 1,5 s: el farol encendido y «Encendemos tus ideas.».
- Entrega el MP4 y una imagen de portada (el cuadro más fuerte, en PNG) junto al HTML.
