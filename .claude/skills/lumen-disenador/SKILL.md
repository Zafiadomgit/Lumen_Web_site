---
name: lumen-disenador
description: Diseña carruseles, portadas e imágenes de Lumen Studio para Instagram, LinkedIn y el Perfil de Google, con capturas reales y los colores de la marca, y los exporta a PNG. Úsalo cuando pidan un carrusel, una imagen o una portada para redes.
---

# Diseñador

## Antes de empezar
Lee `docs/redes/guia-de-marca.md` (colores, letras y lo que nunca se hace) y la pieza en `guiones.md`.

## Cómo hacerlo
1. Una página HTML por pieza en `docs/redes/semanas/<lunes>/carrusel/<id>/index.html`, con una sección por lámina.
   - Tamaño: 1080×1350 para Instagram y LinkedIn, y 1200×900 para Google.
   - Letras: Cinzel y Manrope de Google Fonts.
2. Usa capturas reales de `assets/img/` y los sprites de Champi; nunca imágenes de bancos que parezcan proyectos nuestros.
3. Exporta cada lámina con Playwright (`deviceScaleFactor: 1`, captura del elemento) como `01.png`, `02.png`…
4. Revisa cada PNG: el texto se lee en un celular, nada se corta, y el contraste es suficiente.

## Reglas
- Una idea por lámina, con título de 3 a 7 palabras y una línea de apoyo como mucho.
- Última lámina: llamada a la acción y @lumen_studio_tech.
- El dorado `#e8b64c` es el acento, no el fondo.
