# 02 · Captación y embudo: cómo atraer clientes y vender más

Escrito por marketing · 18 de noviembre de 2026 · Para el dueño.

**Punto de partida (datos reales):** Instagram tiene 3 seguidores y cada pieza llegó a 2–5 personas; de TikTok y de la web aún no hay datos. GA4 empezó hoy (solo cuenta a quien acepta cookies), Search Console quedó verificado hoy, el Perfil de Google está activo y Vercel Analytics no está activado. Conclusión: **las redes todavía no van a traer clientes por sí solas; en los próximos 90 días los primeros clientes salen de Google, de personas que ya te conocen y de escribirle directamente a negocios.** Las redes sirven como vitrina: cuando alguien nos busque, que encuentre un perfil vivo. No compramos seguidores ni cuentas.

## 1. El embudo

| Paso | Qué pasa | Cómo lo medimos | Herramienta |
| --- | --- | --- | --- |
| 1. Nos ven | Redes, Google, referidos, mensajes directos | Alcance, visitas al Perfil de Google (llamadas, clics a la web), impresiones y clics en búsquedas | Metricool, Perfil de Google, Search Console |
| 2. Entran a la web | Llegan con enlace con UTM | Visitas por origen (`utm_source`, `utm_campaign`) | GA4 (solo con consentimiento) y Vercel Web Analytics (hay que activarlo) |
| 3. Se enganchan | Prueban el TPV, la calculadora, a Champi, el farol | Eventos `tpv_open`, `calculator_use`, `champi_open`, `lamp_hit` | GA4 |
| 4. Nos escriben | WhatsApp (botón flotante, calculadora, contacto) o formulario | `contact_whatsapp` (con `lugar`), `generate_lead` (con `tipo`) | GA4; los mensajes que llegan por WhatsApp o correo se cuentan a mano |
| 5. Propuesta | Conversación y propuesta por escrito, con precio y plazo | Propuestas enviadas | Hoja simple de seguimiento (la lleva el dueño) |
| 6. Cierre y pago | Acepta, paga el anticipo | Proyectos cerrados y su origen | La misma hoja |

Dos límites que conviene saber: (a) GA4 no ve a quien rechaza las cookies, así que las cifras de la web serán un mínimo; (b) lo que pasa dentro de WhatsApp no lo mide ninguna herramienta, por eso el dueño apunta cada contacto nuevo con **«¿cómo nos encontraste?»** (la pregunta más barata y más útil del embudo).

## 2. Canales priorizados para 90 días

Orden por rapidez esperada para traer clientes reales. «Esfuerzo» es del equipo + dueño por semana (estimado, no medido).

| # | Canal | Esfuerzo / costo | Qué hacer cada semana | Métrica |
| --- | --- | --- | --- | --- |
| 1 | **Contacto directo a restaurantes y pymes** (prospección) | Alto (2–3 h del dueño; marketing prepara la lista y los mensajes) / 0 USD | Lista de 10–15 negocios nuevos con su web o TPV mejorable (restaurantes en Bogotá y pymes; algunos de España). Mensaje corto y respetuoso: quiénes somos, una cosa concreta que vimos, un enlace a la demo del TPV, y «si no te interesa, no te escribo más». Un solo recordatorio. Sin criticar a nadie en público ni mandar adjuntos. En España, solo a contactos de empresa y con opción clara de no recibir más | Mensajes enviados, respuestas, conversaciones, propuestas |
| 2 | **Perfil de Google y reseñas** | Bajo (1 h) / 0 | 1 publicación semanal (ya está en el plan), fotos de proyectos, servicios y precios «desde» completos. Pedir reseña a cada cliente al entregar, con el enlace directo. Responder cada reseña en 48 h (la skill `lumen-community`). Nunca pagar ni inventar reseñas | Reseñas nuevas, llamadas, clics a la web, solicitudes de ruta |
| 3 | **SEO local y de nicho** | Medio (desarrollo 2–3 h al inicio, luego 1 h) / 0 | Con Search Console: ver qué se busca ya. Páginas o secciones para «TPV para restaurantes», «diseño web Bogotá» y búsquedas de España (por ejemplo «TPV con Veri*Factu»); títulos y descripciones claros en español e inglés; un artículo corto al mes con una pregunta real de dueños de restaurantes (cuánto cuesta un TPV, qué es Veri*Factu). Sin prometer posiciones | Impresiones y clics en Search Console, posición media de 3–5 búsquedas clave |
| 4 | **Referidos de clientes actuales** | Bajo (1 h) / 0 (un detalle opcional lo decide el dueño) | Escribirle a Hassam (California), Herney (Vitrales Perafán), Laura (Althaya) y a los otros clientes: agradecer, pedir reseña en Google y preguntar si conocen a alguien que necesite lo mismo. Una frase lista para reenviar con la web. Pedirles compartir y etiquetar a @lumenstudiobog | Referidos recibidos, reseñas conseguidas |
| 5 | **LinkedIn del dueño** | Medio (1–2 h) / 0 | 2 publicaciones por semana del estudio (casos, código real, el TPV) más conectar con 10 dueños de restaurantes, gerentes y agencias de la región. Mensajes personales, nunca mensajes masivos. Foto y titular claros: «Diseño webs, apps y TPV para restaurantes» | Visitas al perfil, solicitudes aceptadas, mensajes entrantes |
| 6 | **Orgánico en Instagram y TikTok** (sigue el plan semanal) | Ya está cubierto por el equipo / 0 | Mantener el plan; ganchos que enseñen el resultado en 1–2 segundos; una bio con enlace UTM distinto por red; el dueño comparte cada pieza en sus historias y WhatsApp. Responder todos los comentarios y mensajes | Alcance, guardados, compartidos, visitas por `utm_source` |
| 7 | **Directorios y marketplaces** | Bajo, una sola vez (2–3 h) / 0 (si hay planes pagos, el dueño decide) | Crear ficha de empresa con la misma descripción y enlace en 5–8 sitios: directorios de empresas y agencias, y portales de proveedores de software para hostelería en España. Revisar términos antes de registrarse; cuando haya reseñas, subirlas | Visitas con ese origen, contactos |
| 8 | **Promoción pagada pequeña** | 10–20 USD por pieza, máximo 3 al mes (tope 60 USD/mes) | **No empieza hasta que una pieza supere de forma clara a las demás y la web ya mida clics.** Entonces: 1 pieza, público de dueños de restaurantes (Bogotá o España), 5–7 días. El dueño aprueba y paga | Costo por visita, clics a WhatsApp, `generate_lead` |

## 3. Plan de 90 días (18 nov – 15 feb)

| Cuándo | Acciones | Quién |
| --- | --- | --- |
| **Sem. 1–2** (18 nov – 1 dic) | Quick wins (sección 5). Activar Vercel Analytics. Enlace UTM en cada bio. Lista de 30 negocios objetivo y 3 versiones del mensaje | Dueño, desarrollo, marketing, redactor |
| **Sem. 3–4** (2 – 15 dic) | Empezar prospección: 10–15 mensajes por semana. Pedir reseñas y referidos a todos los clientes. Primera lectura de Search Console: qué se busca ya. Primer informe con datos reales de web (viernes 4 de dic) | Dueño, marketing |
| **Sem. 5–6** (16 – 29 dic) | Mejorar título y descripción de las secciones TPV y servicios según Search Console, en español e inglés. Fichas en directorios. Cierre de año: publicación en LinkedIn con proyectos, sin cifras inventadas | Desarrollo, redactor, dueño |
| **Sem. 7–8** (30 dic – 12 ene) | Semana tranquila de redes (festivos): programar con antelación. Seguimiento a conversaciones abiertas. Primer artículo corto de SEO | Marketing, redactor |
| **Sem. 9–10** (13 – 26 ene) | Revisar el embudo completo: de dónde llegaron las consultas y cuál canal rindió. Duplicar lo que funcione; dejar lo que no. Si una pieza destaca, primera promoción pagada | Marketing, dueño |
| **Sem. 11–12** (27 ene – 9 feb) | Segunda ronda de prospección, ahora con casos propios (California, Archivum) y la oferta que mejor respondió. Segundo artículo. Pedir reseñas a quienes cerraron | Dueño, redactor, diseñador |
| **Sem. 13** (10 – 15 feb) | Balance de 90 días: cuántas conversaciones, propuestas y cierres vino de cada canal; decisión para los siguientes 90 | Marketing y dueño |

El diseñador y el video siguen con las piezas del plan semanal; además, diseñador: una lámina de «cómo trabajamos» y una de «cómo pedir tu propuesta» para prospección. Video: un video corto del TPV sin voz para enviar en los mensajes.

## 4. Tablero de métricas

Metas como hipótesis: se fijan después de 4 semanas de datos reales, no antes.

| Indicador | Fuente | Se revisa | Meta |
| --- | --- | --- | --- |
| Visitas a la web por origen | GA4 + Vercel Analytics | Semanal (viernes) | Fijar base en las primeras 2 semanas |
| Contactos nuevos (`contact_whatsapp` + `generate_lead` + mensajes directos) | GA4 + hoja del dueño | Semanal | Hipótesis: que cada semana haya al menos algunos contactos reales; la cifra la fija la base |
| Uso de lo interactivo (`tpv_open`, `calculator_use`, `champi_open`) | GA4 | Semanal | Ver cuál engancha más y llevar a ese |
| Conversaciones de prospección y su tasa de respuesta | Hoja del dueño | Semanal | Hipótesis a validar con las primeras 40 conversaciones |
| Propuestas enviadas y cierres, con su origen | Hoja del dueño | Quincenal | Medir cuántos contactos pasan a propuesta |
| Reseñas de Google y llamadas desde el Perfil | Perfil de Google | Quincenal | Subir desde las actuales; sin tope inventado |
| Impresiones, clics y posición en búsquedas clave | Search Console | Quincenal | Ver subir con el tiempo; el SEO tarda semanas |
| Alcance y seguidores en IG/TikTok | Metricool | Semanal | Crecer sin comprar nada; no es la métrica principal |

## 5. Quick wins de las 2 primeras semanas

1. **Activar Vercel Web Analytics** en el panel del proyecto (desarrollo/dueño). Hoy responde «no encontrado».
2. **Un enlace de bio por red** con UTM: Instagram y TikTok (`utm_campaign=bio-s3`), y LinkedIn y Google con el suyo.
3. **Probar en GA4 (tiempo real)** que llegan `contact_whatsapp`, `calculator_use`, `generate_lead`, `tpv_open`, `champi_open` y `lamp_hit`, aceptando cookies. Desarrollo.
4. **Pedir reseña en Google** a Hassam, Herney y Laura y a otros clientes con los que haya buena relación (el dueño, con mensaje listo del redactor).
5. **Completar el Perfil de Google**: servicios, precios «desde», horario, fotos de proyectos, enlace a la web con UTM.
6. **Compartir cada pieza** en las historias y el WhatsApp del dueño (el informe dice que cada pieza llega a 2–5 personas).
7. **Mirar Search Console en 7 días**: qué búsquedas ya nos muestran y cuáles queremos.
8. **Lista de 30 negocios objetivo y mensaje de prospección** (marketing y redactor, para que el dueño apruebe).
9. **Preparar la hoja de seguimiento** con la pregunta «¿cómo nos encontraste?».
10. **Perfil de LinkedIn del dueño** al día, con el enlace a la web.

## 6. Lo que necesitamos del dueño

- **Activar Vercel Analytics** o mandar una captura del panel; y los datos de GA4 y de Search Console cuando haya días acumulados (no tengo acceso desde aquí).
- **Una hora de contacto de reseñas**: escribir a los clientes con opinión aprobada y a los demás clientes actuales.
- **Tiempo de prospección**: 2–3 horas por semana para enviar los mensajes desde tu cuenta (marketing prepara lista y textos; tú los envías y respondes).
- **Decisión sobre `s2-verifactu`** (cayó de la semana 2) y el permiso por escrito de cualquier negocio para «antes y después».
- **Qué ofreces a quien te recomienda** (si algo): lo decides tú; no inventamos descuentos.
- **Quién atiende WhatsApp y en qué horario**, y cuánto tardas en responder: un contacto sin respuesta en horas se pierde.
- **Si aceptas el límite de gasto**: hasta 3 promociones al mes de 10–20 USD, solo cuando haya una pieza que funcione y con tu aprobación.
- **Dos o tres ejemplos reales** de cómo llegaron tus clientes hasta hoy (referido, Google, redes): nos dice dónde apostar primero.
