# Informe de redes · semana del 9 de noviembre de 2026

**Estado:** borrador incompleto. Se generó el lunes 9, primer día de la semana 1, y no hay cifras que reportar todavía. Todo lo que no se pudo medir dice «sin datos».

## Lo que necesito que me pegues para completarlo

1. **Panel Analytics de Vercel (proyecto `lumen`)**, captura de lunes 9 a viernes 13, con:
   - visitas agrupadas por `utm_campaign` (y `utm_source`);
   - los eventos `whatsapp`, `calculadora`, `tpv_demo`, `formulario`, `champi_chat` y `champi_pregunta` (con el detalle de `respuesta`).
2. **Estadísticas de TikTok** (@lumenestudiotech), por video: vistas, porcentaje de video visto completo y tiempo medio visto.
3. **Estadísticas de Instagram** (@lumenstudiobog), por pieza: alcance, vistas, interacciones y guardados.
4. **Metricool**: confirmar que las piezas de la semana 1 se programaron desde Metricool. La consulta no devolvió publicaciones (ver abajo).
5. **Conversaciones de proyecto** que hayan llegado desde redes, si las hay.

## Qué pasó con las fuentes

| Fuente | Resultado |
| --- | --- |
| Vercel Web Analytics (`prj_ydH2WHmBIBh4cVSkRtQwFM8yDlBN`) | La consulta de visitas y de eventos respondió **404 «Web Analytics not found»**. Hay que revisar que Web Analytics esté activado en el proyecto `lumen` y que el ID del proyecto sea el correcto. Mientras tanto no tengo visitas ni eventos. |
| Metricool, Instagram y TikTok (marca `lumenstudiobog`) | Las cuentas están conectadas desde el 6 de nov. Las consultas de publicaciones para 2–8 nov y para el 9 nov **no devolvieron filas**, así que no hay métricas de piezas. |

## 1. Números de la semana frente a la anterior

| Métrica | Esta semana | Semana anterior |
| --- | --- | --- |
| Visitas desde redes | sin datos | sin datos |
| Clics a WhatsApp | sin datos | sin datos |
| Usos de la calculadora | sin datos | sin datos |
| Demos del TPV | sin datos | sin datos |
| Conversaciones de proyecto | sin datos | sin datos |

Esta es la semana base: el plan (`plan.md`) dice que el viernes 13 se mide la línea de partida, así que no habrá comparación hasta la semana del 16.

## 2. Piezas con más visitas y peor retención

Sin datos. Piezas del plan que se medirán por `utm_campaign`: `s1-hola`, `s1-farol`, `s1-quienes`, `s1-momento`, `s1-precios`, `s1-proyectos`, `s1-lanzamiento`, `s1-google`.

## 3. Regla de ajuste

Aún no aplica: ningún formato tiene 3 publicaciones medidas. Se empieza a aplicar cuando haya 3 piezas del mismo formato con datos.

## 4. Tres cambios propuestos para el plan del lunes

1. **Dejar la medición lista antes de publicar más:** activar Web Analytics en el proyecto `lumen` y comprobar que cada enlace de Metricool lleve su `utm_campaign` (por ejemplo `?utm_source=tiktok&utm_medium=social&utm_campaign=s1-farol`). Sin esto la semana 2 también quedará sin datos.
2. **Mantener el plan de la semana 2 sin mover formatos** hasta tener al menos una semana de cifras. Con el mismo plan se puede comparar de verdad en la semana 3.
3. **Pegarme las estadísticas el viernes 13** (lista de arriba) para escribir el informe completo antes de armar el plan del lunes 16.

Promoción pagada: sin datos, no propongo ninguna pieza por ahora.

## 5. Champi

Sin datos de `champi_pregunta`: no puedo decir cuántas preguntas fueron a la IA ni si alguna se repite. Cuando haya datos se propone añadir las repetidas a `assets/data/champi-faq.json`.
