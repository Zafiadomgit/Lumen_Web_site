# Informe · 9 al 18 de noviembre de 2026 (semanas 1 y 2 hasta hoy)

**Estado:** hecho el miércoles 18, no el viernes: es un corte intermedio. Los datos de Metricool llegan hasta el 18; los de las piezas del 18 al 20 aún no existen. Todas las cifras salen de Metricool (lectura). Lo que no se pudo leer dice «sin datos».

## Lo más importante
1. **La cuenta es nueva y muy pequeña**: Instagram tiene 3 seguidores (el 15 de nov.) y cada pieza llegó a 2–5 personas. Con números de una cifra no se puede decir qué formato funciona; sí se puede decir que **el problema hoy es el alcance, no el formato**.
2. **No hay datos de TikTok ni de la web.** Metricool no devolvió estadísticas de los 6 videos de TikTok (0 seguidores el 18/11), y Vercel Analytics responde «Web Analytics not found» para el proyecto `lumen`. Sin eso no sabemos cuántas visitas trajeron las redes. Ver «Lo que necesito del dueño».
3. **Las visitas no se pueden atribuir a cada pieza**: todas las descripciones mandan a «link en la bio», y la bio tiene un solo enlace. Los UTM por pieza (`utm_campaign=s2-kebab`, etc.) no llegan a usarse en Instagram ni en TikTok.

## Qué se publicó (Metricool)
Publicado por Metricool, hora de Bogotá. «Vistas» y «alcance» son de la propia red; «tiempo medio» es lo que dio Metricool por reel (segundos).

### Instagram: reels
| Pieza | Fecha | Alcance | Vistas | Interacciones | Likes | Comentarios, guardados, compartidos | Tiempo medio visto |
| --- | --- | --- | --- | --- | --- | --- | --- |
| s1-hola (Champi) | lun 9 | 3 | 4 | 1 | 1 | 0 / 0 / 0 | 12,6 s |
| s1-farol (reto) | mié 11 | 5 | 5 | 1 | 1 | 0 / 0 / 0 | 5,0 s |
| s1-momento (Champi) | vie 13 | 3 | 3 | 0 | 0 | 0 / 0 / 0 | 3,4 s |
| s1-proyectos | sáb 14 | 4 | 4 | 0 | 0 | 0 / 0 / 0 | 2,4 s |
| s2-kebab (TPV) | lun 16 | sin datos | sin datos | sin datos | sin datos | sin datos | sin datos |
| s2-cocina (TPV) | mar 17 | sin datos | sin datos | sin datos | sin datos | sin datos | sin datos |

Los dos reels del TPV salieron el 16 y el 17 y Metricool todavía no los trae (puede que aún no se hayan cargado; no lo sé). Retención (% visto): sin datos en los 4 reels.

### Instagram: carruseles
| Pieza | Fecha | Alcance | Vistas | Interacciones | Likes | Seguidores ganados |
| --- | --- | --- | --- | --- | --- | --- |
| s1-quienes | mié 11 | 2 | 4 | 1 | 1 | 0 |
| s1-precios | jue 12 | 2 | 3 | 2 | 2 | 0 |

### TikTok (@lumenestudiotech)
Publicados: s1-hola, s1-farol, s1-momento, s1-proyectos, s2-kebab y s2-cocina. **Vistas, likes, alcance y tiempo visto: sin datos** (la consulta de videos volvió vacía). Seguidores: 0 el 18 de nov.

### Cuenta de Instagram
- Seguidores: 1 (10 nov.), 2 (13), 3 (14) y 3 (15). Seguidores ganados por pieza: 0 en los carruseles; el resto, sin datos.
- Vistas de toda la cuenta por día: 9 nov. 3 · 11 nov. 3 · 12 nov. 7 · 13 nov. 4 · 14 nov. 5 · 15 nov. 1 (23 en total; sin datos para 16–18).

### LinkedIn y Perfil de Google
No están en Metricool: sin datos. Salieron `s1-lanzamiento` (LinkedIn), `s1-google` y `s2-google` según el plan.

## Lo que sigue programado en Metricool
| Pieza | Red | Cuándo |
| --- | --- | --- |
| s2-california (carrusel) | Instagram | mié 18, 8:00 p. m. (pendiente) |
| s2-hassam (tarjeta) | Instagram | jue 19, 8:00 p. m. |
| s2-champi-kiosco (video) | Instagram + TikTok | vie 20, 7:00 p. m. |

- Nada programado del 21 de noviembre en adelante. **`s2-verifactu` (sáb 21, LinkedIn + Reels) no está en Metricool y no tiene video producido**: se cayó de la semana 2 o falta subirlo; decídelo.
- Del 23 al 29 de noviembre no hay nada programado, así que no hay choques con la semana 3.

## Web (Vercel Web Analytics)
- Visitas, origen (`utm_source`, referrer) y eventos (WhatsApp, calculadora, TPV demo, formulario, Champi): **sin datos**. Vercel respondió 404 «Web Analytics not found» para el proyecto `lumen` (`prj_ydH2WHmBIBh4cVSkRtQwFM8yDlBN`); la lista de tipos de eventos dio 403. La página sí carga el script `/_vercel/insights/script.js`, así que lo más probable es que Analytics no esté activado en el panel del proyecto o que esta conexión no tenga permiso. No lo puedo confirmar desde aquí.
- La web cambió a www.lumenestudio.tech el 18/11: aunque funcionara, los datos de antes están partidos entre dominios.
- GA4 empezó el 18/11 y solo cuenta con consentimiento; Search Console no está conectado. Sin datos.
- Champi (preguntas a la IA y repetidas): sin datos (depende del evento `champi_pregunta`).

## Piezas top y flojas
Con 3–5 personas por pieza es un ranking de curiosidad, no una conclusión.
- **Top por alcance y tiempo visto:** `s1-hola` (Champi, 12,6 s de tiempo medio, 4 vistas) y `s1-farol` (5 de alcance, el más alto, y 1 like). Los dos son Champi o la web que se toca.
- **Top por interacción:** el carrusel `s1-precios` (2 likes con 2 de alcance): el tema «cuánto cuesta».
- **Flojas:** `s1-momento` (3 de alcance, 0 interacciones, 3,4 s) y `s1-proyectos` (0 interacciones, 2,4 s): se abandonan en los primeros segundos. Ningún reel tuvo comentarios, guardados ni compartidos.
- **Regla de ajuste (formato que en 3 piezas no supera la media / el que la duplica):** sin datos suficientes. No se cambia ni se duplica ningún formato todavía; se vuelve a medir el 4 de diciembre con las piezas de código (semana 3).

## Tres cambios concretos para el plan
1. **Medir antes de optimizar: un enlace de bio por red y por semana.** En la bio de Instagram: `…/?utm_source=instagram&utm_medium=social&utm_campaign=bio-s3`; en TikTok: `utm_source=tiktok…utm_campaign=bio-s3`. Así sabremos qué red trae visitas aunque no sepamos qué pieza. Y activar Vercel Analytics (o mandar la captura). Es el cambio que más información da.
2. **Mover el alcance a mano, sin comprar nada.** Cada pieza sale con 2–5 personas, así que el dueño la comparte en WhatsApp y en sus historias, y se le pide a clientes con opinión aprobada (Hassam, Herney, Laura) que compartan y etiqueten a @lumenstudiobog.
3. **Ganchos que se entiendan en 1–2 segundos y un solo gesto.** Las dos más flojas (`s1-momento`, `s1-proyectos`) son las que se abandonan antes de 4 s. Los 2 primeros segundos deben mostrar el resultado (el farol golpeado, el precio, el kiosco), no el preámbulo. Se aplica en las piezas de la semana 3 y 4. Los horarios pasan de 19:00/20:00 a **18:00** (ver abajo).

Promoción pagada: **ninguna pieza califica todavía** (máximo 5 de alcance, sin datos de TikTok ni de la web). No se propone gastar 10–20 USD sin ver visitas ni clics.

## Mejores horas (Metricool, hora de Bogotá)
Son estimaciones generales de la red, no de nuestra audiencia (aún tiene 3 seguidores). Entre semana el pico es 10:00; en la tarde-noche gana **18:00**: Instagram lun–jue ≈ 4.200–5.100 frente a ≈ 3.500–4.100 a las 19:00 y ≈ 2.400–3.150 a las 20:00; TikTok 18:00 es el segundo pico del día (≈ 1.100–1.390). Sábado: 18:00 también supera a las 19:00. Por eso las semanas 3 y 4 se programan a las 18:00, en vez de 19:00 (videos) y 20:00 (carruseles) como decía la guía.
