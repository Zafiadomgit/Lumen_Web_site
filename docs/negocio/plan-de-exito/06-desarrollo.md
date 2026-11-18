# 06 · Desarrollo: que la web convierta más visitas en clientes

Responsable: `desarrollo` · 18 de noviembre de 2026 · Revisado sobre la web real (`index.html`, `en/`, `js/`, `api/`), abierta en el navegador en celular (390×844) y computador (1366×900).

**En una frase:** la web ya genera confianza (proyectos reales, TPV que se prueba, tres opiniones con nombre, calculadora con precio). Lo que falta es **que llegue más gente desde Google** (hoy es una sola página) y **saber de dónde viene cada cliente** (hoy no se puede).

## 1. Auditoría de conversión

**Lo que ya está bien (no tocar):**
- La portada dice qué hacemos en una línea y tiene dos botones claros («Cuéntanos tu proyecto» y «Ver proyectos»), visibles sin bajar en el celular.
- Cuatro caminos para escribir: WhatsApp (botón flotante, contacto y calculadora), formulario, correo y Champi. El formulario es corto, avisa bien los errores y, si falla el envío, abre el correo con el mensaje escrito: no se pierde ningún contacto.
- La calculadora da un rango en dólares y arma el mensaje de WhatsApp con lo elegido. Es la mejor herramienta de venta de la web.
- Confianza: 7 proyectos con enlace a webs reales, casos con «reto / lo que hicimos / hoy», el TPV real para tocar, 3 opiniones aprobadas y botón a reseñas de Google.
- Carga rápida: unos 0,6 MB al abrir en celular, sin errores. Cookies con permiso (GA4 solo si se acepta).

**Lo que hoy frena a una visita:**

| # | Problema | Por qué importa |
| --- | --- | --- |
| A | **La calculadora queda muy abajo.** En el celular está a unas 15 pantallas del inicio; las opiniones, a 12. Solo «Proyectos» ocupa unas 8 pantallas (7 casos con galería cada uno). | Quien llega con prisa no la ve. Es el paso que más acerca a pedir propuesta. |
| B | **Falta «quiénes somos».** No hay ni una línea sobre quién está detrás, desde cuándo ni cómo es el equipo. | Para un encargo de miles de dólares, la gente quiere saber con quién habla. |
| C | **El botón flotante de WhatsApp manda un mensaje cortado:** «me gustaría cotizar una web de ». | Se ve descuidado justo en el clic más importante. Arreglo de una línea. |
| D | **No hay garantías ni condiciones visibles** (cómo se paga, qué pasa si algo falla tras publicar, quién es dueño del código y del dominio). | Son las dudas típicas antes de escribir. Solo se ponen las que el dueño confirme. |
| E | **El texto de «Cómo trabajamos» dice «cuando todavía es barato»**, palabra prohibida en la guía de marca. | Coherencia de marca. Propuesta: «cuando cambiarlo todavía cuesta poco». |
| F | **El formulario no pide teléfono.** En Latinoamérica la venta se cierra por WhatsApp. | Un campo opcional «WhatsApp» permite responder por donde el cliente prefiere. |
| G | **En el celular se juntan abajo el aviso de cookies, Champi y el botón de WhatsApp.** No se tapan, pero son tres cosas pidiendo atención. | Menos ruido = más foco en escribir. Champi podría esperar a que se cierre el aviso. |
| H | **Champi ya contesta precios y deriva a WhatsApp**, pero no ofrece un botón directo al terminar la conversación. | Convertir la curiosidad en contacto con un toque. |

## 2. SEO (aparecer en Google)

**Ya hecho:** title y description en los dos idiomas, canonical, `hreflang` es/en/x-default, datos estructurados de empresa (`ProfessionalService`), `sitemap.xml`, `robots.txt` (bloquea `/demos/`), imágenes con texto alternativo y tamaño, Search Console verificado hoy.

**Lo que falta (técnico, poco esfuerzo):**
- Enviar el sitemap en Search Console y enlazar Search Console con GA4.
- Datos estructurados: añadir EE. UU. y Australia a `areaServed` (hay clientes allá), ponerle precio orientativo «desde» a cada servicio y `geo`/horario si el dueño los da. **No** poner estrellas de opiniones en nuestra propia página: Google no las muestra para la propia empresa y puede penalizar.
- El título principal (H1) dice solo «Lumen Studio». Conviene que el H1 o el subtítulo diga lo que la gente busca («Diseño web, apps y TPV para restaurantes»). Cambia texto visible.
- El sitemap se actualiza a mano: que `tools/build_en.py` ponga la fecha al rehacer las páginas.

**Contenido: aquí está el crecimiento.** Hoy Google solo tiene 2 páginas para mostrar (español e inglés) y compite con todo en una. Propuesta, de más a menos valor:

1. **Páginas por servicio**, cada una con su texto, precio orientativo, plazo, el caso que corresponde, preguntas frecuentes y botón a WhatsApp/calculadora:
   - `/tpv-restaurantes/` (TPV con kiosco, cocina y Verifactu: diferencial fuerte en España).
   - `/diseno-web/` (landing, corporativa, tienda).
   - `/desarrollo-de-apps/`.
   - `/software-a-medida/` (EasyClase, Archivum).
2. **Páginas por búsqueda y lugar**, solo con contenido propio (no copias con otra ciudad):
   - «Diseño web en Bogotá» (somos de Bogotá: es verdad y se puede reforzar con el Perfil de Google).
   - España: «TPV con Verifactu para restaurantes» (California y Archivum son de allá).
   - EE. UU.: «Bilingual website design» en `/en/` (Amieva en Florida y Althaya en Australia son casos reales).
   Cada una se enlaza en `hreflang` con su par en inglés cuando exista.
3. **Casos de éxito como páginas propias** (`/proyectos/california/`, `/proyectos/vitrales-perafan/`…): reto, solución, capturas, opinión del cliente y enlace a su web. Son lo que mejor se comparte en redes y lo que más convence. Sin cifras que el cliente no haya dado.
4. **Blog: todavía no.** Sin alguien que publique cada mes, queda abandonado y resta confianza. Mejor 4–6 guías que no caducan dentro de las páginas de servicio («¿Cuánto cuesta una web?», «Qué es Verifactu y cómo afecta a tu TPV»). Se puede reconsiderar a los 90 días con los datos de Search Console.

Técnicamente es fácil: la web no tiene paso de compilación; cada página nueva sería un HTML con el mismo `css/` y `js/`, añadida a `tools/build_en.py`, al sitemap y a la política de seguridad.

## 3. Medición: saber de dónde vienen los clientes

Hoy se sabe **cuántos** hacen clic en WhatsApp o mandan el formulario, pero no **de dónde venían**, y una parte no se cuenta:

- **Vercel Web Analytics no está activado** (el script responde 404 hasta activarlo). El README dice que sí: hay que corregirlo. Es lo único que cuenta visitas de quien **rechaza** las cookies. Las visitas son gratis; los eventos propios necesitan el plan Pro (decisión del dueño).
- **GA4:** marcar `generate_lead` y `contact_whatsapp` como **eventos clave** (conversiones). Así GA4 dice qué fuente (TikTok, Instagram, Google, directo) trae contactos.
- **Que el contacto lleve su origen:** guardar el primer `utm_source`/`utm_campaign` (o la web de donde vino) mientras dura la visita y enviarlo con el formulario, para que el correo que llega diga «vino de: tiktok · s1-farol». En WhatsApp se puede añadir al final del mensaje una referencia corta (p. ej. «ref: ig-s1»): cambia texto visible, lo decide el dueño.
- **Eventos que faltan:** «Enviarlo por el formulario» desde la calculadora, intento de envío del formulario con error, clic en «Ver proyectos» y en el filtro de proyectos, y la pregunta a Champi en GA4 (hoy solo va a Vercel). También unificar nombres: Vercel y GA4 usan nombres distintos para lo mismo.
- **UTM en todos los enlaces propios:** Perfil de Google (`utm_source=google&utm_medium=organic_local`), biografías de Instagram y TikTok, firma de correo y propuestas en PDF.
- **Registro simple de clientes:** una hoja con fecha, nombre, por dónde escribió, de dónde vino y si se cerró. Sin eso, ningún panel dice cuánto vendimos por canal.

## 4. Lista priorizada para 90 días

✎ = cambia el diseño o el texto visible: **lo aprueba el dueño antes de publicar.**

| Semana | Mejora | Impacto | Esfuerzo |
| --- | --- | --- | --- |
| 1 | Activar Vercel Analytics y corregir el README | Alto | Muy bajo (dueño, 5 min) |
| 1 | Eventos clave en GA4 + sitemap y enlace en Search Console | Alto | Muy bajo |
| 1 | ✎ Arreglar el mensaje cortado del WhatsApp flotante | Medio | Muy bajo |
| 1 | ✎ Cambiar «barato» en «Cómo trabajamos» | Bajo | Muy bajo |
| 1–2 | Origen de la visita dentro del formulario + eventos que faltan | Alto | Bajo |
| 2 | UTM en Perfil de Google, biografías y firma | Medio | Muy bajo (marketing) |
| 2–3 | ✎ Acercar la calculadora: botón «Calcula tu precio» en la portada y «Proyectos» con 3 destacados + «Ver todos» en el celular | Alto | Medio |
| 3 | ✎ Bloque «Quiénes somos» (datos reales del dueño) | Alto | Bajo |
| 3 | ✎ Bloque de garantías/condiciones (solo lo confirmado) | Medio | Bajo |
| 3 | ✎ Campo opcional «WhatsApp» en el formulario | Medio | Bajo |
| 4–6 | ✎ Página `/tpv-restaurantes/` (es y en) | Alto | Medio |
| 4–6 | ✎ Página `/diseno-web/` con sección Bogotá | Alto | Medio |
| 6–8 | ✎ 3 casos como páginas propias (California, Vitrales Perafán, Althaya) | Alto | Medio |
| 6–8 | Datos estructurados ampliados y fecha automática del sitemap | Medio | Bajo |
| 8–10 | ✎ `/desarrollo-de-apps/` y `/software-a-medida/` | Medio | Medio |
| 8–10 | ✎ H1 con palabras de búsqueda; botón a WhatsApp al final del chat de Champi | Medio | Bajo |
| 10–12 | ✎ Páginas para España (Verifactu) y EE. UU. (bilingüe) | Medio | Medio |
| 12 | Revisión con Search Console y GA4: qué páginas traen contactos y si conviene blog | Alto | Bajo |

Cada cambio se prueba en la vista previa de Vercel (celular y computador) antes de pasar a producción.

## 5. Lo que necesitamos del dueño

1. **Activar Vercel Web Analytics** en el proyecto `lumen` y decidir si vale la pena el plan Pro para los eventos.
2. **Acceso de edición a GA4 y Search Console** (o hacerlo con él en 15 minutos).
3. **Aprobar los cambios marcados con ✎**, empezando por los de la semana 1.
4. **Datos para «Quiénes somos»:** qué contar (nombre o no, desde cuándo, cómo trabaja el equipo), sin inventar tamaño ni años. Si prefiere no salir con nombre, se cuenta el estudio.
5. **Garantías y condiciones que sí ofrecemos:** forma de pago, revisiones incluidas, soporte tras publicar, propiedad del código y del dominio. Solo se publica lo que él confirme.
6. **Permiso de los clientes** para páginas de caso propias (California, Vitrales Perafán, Althaya) y cualquier dato de resultado que quieran compartir.
7. **Horario de atención y si atiende en persona en Bogotá** (para Google y los datos estructurados).
8. **Llevar el registro de clientes** (o encargárselo a marketing): por dónde llegó cada contacto y si se cerró.
