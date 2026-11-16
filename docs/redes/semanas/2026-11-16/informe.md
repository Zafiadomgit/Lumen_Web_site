# Informe de redes · semana del 16 de noviembre de 2026

**Periodo medido:** lunes 16 de noviembre (hoy, día 1 de la semana 2). Como la semana apenas empieza, la comparación se hace contra la **semana 1 (9–15 de noviembre)**, que todavía no tenía informe y queda aquí como base.
**Fuentes consultadas el 16 de noviembre:** Vercel Web Analytics (proyecto `lumen`) y Metricool (marca `lumenstudiobog`).

## Antes de nada: lo que necesito que me pegues

Vercel no devolvió datos y TikTok sale vacío en Metricool, así que para completar este informe me hace falta:

1. **Captura del panel Analytics de Vercel** del proyecto `lumen`, rango 9–16 de noviembre, con:
   - la pestaña de visitas filtrada por `utm_source` y otra por `utm_campaign`;
   - la pestaña **Events** con los eventos `whatsapp`, `calculadora`, `tpv_demo`, `champi_pregunta` (abierto por `respuesta`), `formulario`, `email`, `redes` y `visita_proyecto`.
2. **Estadísticas de TikTok** de @lumenestudiotech de cada video de la semana 1 (s1-hola, s1-farol, s1-momento, s1-proyectos): visualizaciones, tiempo medio de visualización, % que lo vio completo, me gusta, comentarios y compartidos. Captura de TikTok Studio o informe de Metricool.
3. **Estadísticas de Instagram** desde la app (si quieres confirmar las de Metricool) y, sobre todo, los **clics al enlace de la bio** de la semana.
4. Si las hubo: **conversaciones de proyecto** por WhatsApp o correo (solo cuántas, sin datos personales).

### Por qué faltan datos
- **Vercel:** la API respondió `404 not_found · Web Analytics not found` para el proyecto `lumen` (`prj_ydH2WHmBIBh4cVSkRtQwFM8yDlBN`), tanto en visitas como en eventos. La web sí carga el script (`/_vercel/insights/script.js` en `index.html`), así que lo más probable es que **Web Analytics no esté activado** en ese proyecto. Además, en la lista de dominios del proyecto no aparece `www.lumenestudio.tech` (solo los `*.vercel.app`): vale la pena confirmar que el dominio público está en este proyecto.
- **TikTok:** Metricool no devolvió ningún video de TikTok entre el 9 y el 16 de noviembre.

## 1. Números de la semana frente a la anterior

| Métrica | Semana 2 (16 nov, hasta hoy) | Semana 1 (9–15 nov) |
| --- | --- | --- |
| Visitas desde redes | sin datos | sin datos |
| Clics a WhatsApp | sin datos | sin datos |
| Usos de la calculadora | sin datos | sin datos |
| Demos del TPV | sin datos | sin datos |
| Conversaciones de proyecto | sin datos | sin datos |

**Lo que sí hay: Instagram, según Metricool** (cifras tal cual las devuelve Metricool; fecha y hora de Bogotá).

| Pieza | Formato | Publicada | Alcance | Reproducciones / vistas | Interacciones | Tiempo medio visto | Saltan en los 3 primeros s |
| --- | --- | --- | --- | --- | --- | --- | --- |
| s1-hola | Reel 12 s | lun 9, 10:05 | 3 | 4 | 1 | 12,623 s | 33,3 % |
| s1-farol | Reel 10 s | mié 11, 19:05 | 5 | 5 | 1 | 4,958 s | 80,0 % |
| s1-quienes | Carrusel 6 | mié 11, 20:05 | 2 | 4 | 1 | — | — |
| s1-precios | Carrusel 6 | jue 12, 20:04 | 2 | 3 | 2 | — | — |
| s1-momento | Reel 14 s | vie 13, 19:06 | 3 | 3 | 0 | 3,426 s | 66,7 % |
| s1-proyectos | Reel 15 s | sáb 14, 19:03 | 4 | 4 | 0 | 2,411 s | 75,0 % |

- Guardados y nuevos seguidores de los carruseles: 0 en ambos.
- Semana 2: hasta hoy Metricool no muestra ninguna publicación (s2-kebab estaba previsto para hoy lunes 16).
- TikTok: sin datos.

## 2. Piezas top y peor retención

**Las 3 que más visitas trajeron a la web (por `utm_campaign`):** sin datos.
Ojo: aunque Vercel funcionara, las descripciones de Instagram llevan `www.lumenestudio.tech` **sin etiqueta UTM**, así que esas visitas no se podrían atribuir a ninguna pieza.

**Las 3 con peor retención** (Reels de Instagram, por % que salta en los 3 primeros segundos):
1. s1-farol: 80,0 % salta.
2. s1-proyectos: 75,0 % salta, y el tiempo medio visto más bajo (2,411 s de 15 s).
3. s1-momento: 66,7 % salta.

La que mejor retuvo fue **s1-hola** (33,3 % salta; 12,623 s de tiempo medio en un video de 12 s).

## 3. Regla de ajuste

- Todavía **no se puede aplicar**: ningún formato lleva 3 publicaciones medidas en la misma red (Reels de Champi: 2; demos: 1; casos: 1; carruseles: 2), y los volúmenes son de 2 a 5 personas por pieza.
- Media de los Reels en Instagram: 4 reproducciones. Ninguno la duplica; s1-farol queda por encima y s1-momento por debajo.
- La revisamos el viernes 20 con los datos de la semana 2.

## 4. Tres cambios para el plan de este lunes

1. **Poner UTM en todo lo que se publica desde hoy.** Cambiar en Metricool el enlace de las descripciones de la semana 2 por su enlace medido, por ejemplo para el video de hoy:
   `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=s2-kebab#tpv`
   (y `utm_source=tiktok` en TikTok). Para la bio, usar un enlace por semana, por ejemplo `utm_campaign=s2-bio`.
2. **Gancho en el primer segundo.** Los Reels que arrancan con pantalla o texto (farol, proyectos, momento) pierden entre el 67 % y el 80 % en los 3 primeros segundos; el que arranca con Champi en movimiento (s1-hola) pierde el 33 %. Para s2-kebab, s2-cocina y s2-champi-kiosco: que en el primer cuadro ya se vea el toque en el kiosco o a Champi moviéndose, con el texto encima, sin intro.
3. **Activar la medición antes del primer video del TPV.** En Vercel → proyecto `lumen` → Analytics, activar Web Analytics y confirmar que `www.lumenestudio.tech` está en ese proyecto. En Metricool, revisar que TikTok esté conectado y que los videos de la semana 1 sí se publicaron allí.

**Promoción pagada:** ninguna pieza destaca todavía; no propongo promocionar nada esta semana.

## 5. Champi

- Preguntas que fueron a la IA (`champi_pregunta` con `respuesta = ia`): sin datos.
- Preguntas repetidas para añadir a `assets/data/champi-faq.json`: sin datos.
