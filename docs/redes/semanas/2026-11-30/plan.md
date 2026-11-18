# Semana 4 · 30 de noviembre – 6 de diciembre · Lo que no se ve

**Foco:** mostrar lo que hay detrás de una web que funciona (el código, la facturación, el idioma) con proyectos que todavía no salieron, y llevar a la gente a hablar con Champi o a la calculadora.
**Estado:** aprobado por el dueño el 18 de noviembre; se produce más adelante.

Base: el informe `semanas/2026-11-16/informe.md` (cuenta nueva, alcance de 2–5 personas por pieza, sin datos de TikTok ni de la web). Con eso, el plan mantiene la mezcla de la guía, mejora los ganchos y mide mejor; no cambia de estrategia sobre números que no existen.

## Reglas de variedad
- TPV: 1 pieza (máximo 2). Proyectos distintos: Archivum, Amieva y California (ninguno estuvo en la semana 3). Código en pantalla: 1 pieza. Champi: 2 piezas.
- Althaya no se usa: salió en la semana 3 (publicación de Google).
- Antes y después: sin pieza esta semana, porque necesita permiso por escrito del negocio (ver «Lo que necesito de ti»).

| id | Red | Formato | Pilar | Gancho (2 primeros segundos) | Llamada a la acción | Día |
| --- | --- | --- | --- | --- | --- | --- |
| s4-codigo-scroll | TikTok + Reels | Video de código 18 s | Código en pantalla | «Así aparecen las secciones al hacer scroll» (se ve una sección entrar a la pantalla) | inicio (hacer scroll) | lun 30 |
| s4-archivum | Instagram + LinkedIn | Carrusel 6 láminas | Casos | «¿Tu facturación cumple Veri*Factu?» | #proyectos (Archivum) | mar 1 |
| s4-champi-paseo | TikTok + Reels | Video 15 s | Champi | «Champi pasea por la web… ¡Uff, me cansé!» | inicio | mié 2 |
| s4-tpv-caja | TikTok + Reels | Video 15 s | Demos que se tocan | «Cobra una cuenta en segundos» (pantalla de pago del TPV) | #tpv | jue 3 |
| s4-google | Perfil de Google | Publicación con foto | Casos | Captura de la web de Archivum | #proyectos | jue 3 |
| s4-amieva | Instagram + LinkedIn | Carrusel 5 láminas | Casos | «Una web en dos idiomas para el suroeste de Florida» | #proyectos (Amieva) | vie 4 |
| s4-champi-chat | TikTok + Reels | Video 15 s | Champi | «Le pregunté a Champi cuánto tarda una web» | #contacto (Champi) | sáb 5 |

Mezcla: Champi 2 de 6 (33 %), casos 2 (33 %), demo 1 (17 %), código 1 (17 %); más la publicación de Google. Antes y después: 0 esta semana.

Enlaces UTM, uno por pieza: `https://www.lumenestudio.tech/?utm_source=<red>&utm_medium=social&utm_campaign=<id>` y la sección al final.

## Qué repetimos y qué cambiamos (según el informe)
1. **Repetimos** el ritmo de 5–6 piezas y a Champi como cara, y el formato «código en pantalla» (1 pieza; el viernes 4 de diciembre se compara con las 2 de la semana 3). El informe no tiene datos para duplicar ni quitar ningún formato.
2. **Cambiamos los ganchos**: cada video muestra el resultado en el primer segundo (las dos piezas más flojas, `s1-momento` y `s1-proyectos`, se abandonan antes de 4 s).
3. **Cambiamos cómo medimos**: enlace de bio con UTM propio por red (`utm_campaign=bio-s4`) y horario a las 18:00. Y el alcance se mueve a mano: compartir en WhatsApp, historias y clientes que etiquetan.

## Lo que necesito de ti
- **Permiso para nombrar y mostrar Amieva Cleaning Service (amievacleaning.com)**, como hicimos con EasyClase y Vitrales, y si tiene cuenta de Instagram para etiquetarla. Archivum no lo necesita: es un producto propio del estudio (así lo dice la web).
- **Archivum:** solo decimos lo de la web (producto propio, facturación preparada para Veri*Factu, archivum.es). Confirma que las capturas `archivum-verifactu.webp` y `archivum-panel.webp` no muestran datos de personas y qué más se puede contar.
- **Pegar el enlace de bio con UTM**: `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=bio-s4` en Instagram y `https://www.lumenestudio.tech/?utm_source=tiktok&utm_medium=social&utm_campaign=bio-s4` en TikTok, el domingo 29 o el lunes 30.
- **Vercel Analytics**: revisar que esté activado en el proyecto `lumen` (hoy responde «Web Analytics not found») o pasarme una captura del panel Analytics. Y, si quieres, el acceso a GA4 y Search Console o una captura.
- **Antes y después:** si algún cliente (por ejemplo Amieva) tiene su web anterior y nos da permiso por escrito, lo hacemos en la semana 5.
- **Alcance:** compartir cada pieza en WhatsApp y en tus historias el día que sale; pedirle a Amieva que comparta su carrusel.
- Todo va con Champi y pantallas: sin voz ni cara. El código de `s4-codigo-scroll` se copia de `js/main.js` (sección de entradas al hacer scroll, `[data-reveal]`); nada de `api/`.

## Programación
Para Metricool, hora de Bogotá. Todas a las 18:00 (el mejor horario de la tarde-noche según Metricool). Las descripciones son un borrador del redactor para pegar cuando se aprueben el plan y los guiones. Los archivos se crean después de la aprobación; las rutas son las previstas.

| Pieza | Red | Día y hora | Archivo | Descripción lista para pegar | Música |
| --- | --- | --- | --- | --- | --- |
| s4-codigo-scroll | Instagram (Reel) + TikTok (+ LinkedIn a mano) | lun 30, 6:00 p. m. | `video/s4-codigo-scroll/s4-codigo-scroll.mp4` | Así aparecen las secciones de nuestra web cuando haces scroll. Esto es el código que lo hace 👇 / 🌐 www.lumenestudio.tech / #LumenStudio #DesarrolloWeb #JavaScript #Bogotá | Principal: Dark Red – Steve Lacy · Reserva: Art Deco – Lana Del Rey · TikTok: automática |
| s4-archivum | Instagram (carrusel) (+ LinkedIn a mano) | mar 1, 6:00 p. m. | `carrusel/s4-archivum/01.png` a `06.png` | Archivum: facturación con Veri*Factu. Desliza para ver el proyecto. ¿La tuya? Link en la bio. / 🌐 www.lumenestudio.tech / #LumenStudio #DesarrolloWeb #Emprendedores | no aplica |
| s4-champi-paseo | Instagram (Reel) + TikTok | mié 2, 6:00 p. m. | `video/s4-champi-paseo/s4-champi-paseo.mp4` | Champi pasea por nuestra web, corre, resopla y se sienta: «Uff, me cansé…» 🍄 Búscalo y agárralo. / 🌐 www.lumenestudio.tech / #LumenStudio #EncendemosTusIdeas #DiseñoWeb #Bogotá | Principal: Note to Self – Maria the Scientist · Reserva: Bad Habit – Steve Lacy · TikTok: automática |
| s4-tpv-caja | Instagram (Reel) + TikTok | jue 3, 6:00 p. m. | `video/s4-tpv-caja/s4-tpv-caja.mp4` | Cobrar en el TPV de nuestra web: eliges, pagas y listo. Pruébalo tú. / 🌐 www.lumenestudio.tech / #LumenStudio #TPV #Restaurantes #Emprendedores | Principal: Note to Self – Maria the Scientist · Reserva: Say Yes to Heaven – Lana Del Rey · TikTok: automática |
| s4-google | Perfil de Google (a mano) | jue 3 | `assets/img/archivum-portada.webp` | Hicimos Archivum: facturación con Veri*Factu. Diseñamos y programamos software a medida. Botón «Más información» → UTM abajo | no aplica |
| s4-amieva | Instagram (carrusel) (+ LinkedIn a mano) | vie 4, 6:00 p. m. | `carrusel/s4-amieva/01.png` a `05.png` | Amieva Cleaning Service: una landing bilingüe de limpieza y construcción en el suroeste de Florida. ¿Tu negocio en dos idiomas? Link en la bio. / 🌐 www.lumenestudio.tech / #LumenStudio #DiseñoWeb #Emprendedores | no aplica |
| s4-champi-chat | Instagram (Reel) + TikTok | sáb 5, 6:00 p. m. | `video/s4-champi-chat/s4-champi-chat.mp4` | Le pregunté a Champi cuánto tarda una web 🍄 Pregúntale lo que quieras en nuestra web. / 🌐 www.lumenestudio.tech / #LumenStudio #EncendemosTusIdeas #Emprendedores #Colombia | Principal: Art Deco – Lana Del Rey · Reserva: White Mustang – Lana Del Rey · TikTok: automática |

Enlaces UTM:
- s4-codigo-scroll: IG `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=s4-codigo-scroll` · TikTok `https://www.lumenestudio.tech/?utm_source=tiktok&utm_medium=social&utm_campaign=s4-codigo-scroll` · LinkedIn `https://www.lumenestudio.tech/?utm_source=linkedin&utm_medium=social&utm_campaign=s4-codigo-scroll`
- s4-archivum: IG `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=s4-archivum#proyectos` · LinkedIn `https://www.lumenestudio.tech/?utm_source=linkedin&utm_medium=social&utm_campaign=s4-archivum#proyectos`
- s4-champi-paseo: IG `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=s4-champi-paseo` · TikTok `https://www.lumenestudio.tech/?utm_source=tiktok&utm_medium=social&utm_campaign=s4-champi-paseo`
- s4-tpv-caja: IG `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=s4-tpv-caja#tpv` · TikTok `https://www.lumenestudio.tech/?utm_source=tiktok&utm_medium=social&utm_campaign=s4-tpv-caja#tpv`
- s4-google: `https://www.lumenestudio.tech/?utm_source=google&utm_medium=social&utm_campaign=s4-google#proyectos`
- s4-amieva: IG `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=s4-amieva#proyectos` · LinkedIn `https://www.lumenestudio.tech/?utm_source=linkedin&utm_medium=social&utm_campaign=s4-amieva#proyectos`
- s4-champi-chat: IG `https://www.lumenestudio.tech/?utm_source=instagram&utm_medium=social&utm_campaign=s4-champi-chat#contacto` · TikTok `https://www.lumenestudio.tech/?utm_source=tiktok&utm_medium=social&utm_campaign=s4-champi-chat#contacto`

Música: las canciones son sugerencias; se confirman en el buscador de audio de Metricool (cuentas de empresa) y, si no está, se usa la de reserva.

## Promoción
Ninguna: el informe no marca piezas que califiquen (alcance de una cifra y sin datos de visitas). El viernes 4 de diciembre se vuelve a mirar.

**Resumen para WhatsApp:** Semana 4, «lo que no se ve»: un video de código (el scroll), 2 videos de Champi (paseo y chat), 1 del TPV, y carruseles de Archivum y Amieva. Solo 1 pieza de TPV. Necesito tu permiso para nombrar a Amieva y el enlace de bio con medición.
