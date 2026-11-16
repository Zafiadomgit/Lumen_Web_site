# Semana 2 · 16–22 de noviembre · El TPV que se prueba

**Foco:** que dueños de restaurantes vean que nuestro TPV es real y lo prueben en la web.
**Estado:** borrador para tu aprobación.

| id | Red | Formato | Pilar | Gancho (2 primeros segundos) | Llamada a la acción | Día |
| --- | --- | --- | --- | --- | --- | --- |
| s2-kebab | TikTok + Reels | Video 18 s | Demos que se tocan | «Pide un kebab desde nuestra web» | #tpv | lun 16 |
| s2-cocina | TikTok + Reels | Video 12 s | Demos que se tocan | La comanda aparece en la pantalla de cocina | #tpv | mar 17 |
| s2-california | Instagram + LinkedIn | Carrusel 6 láminas | Casos | «Un kiosco que pide, cobra y avisa a cocina» | #tpv | mié 18 |
| s2-hassam | Instagram + LinkedIn | Tarjeta (carrusel 3 láminas) | Casos | La opinión de Hassam | #opiniones | jue 19 |
| s2-champi-kiosco | TikTok + Reels | Video 14 s | Champi | Champi es demasiado pequeño para el kiosco | #tpv | vie 20 |
| s2-verifactu | LinkedIn + Reels | Video 15 s | Casos | «¿Tu TPV cumple Verifactu?» | #tpv | sáb 21 |
| s2-google | Perfil de Google | Publicación con foto | Demos | Captura de la pantalla de cocina | #tpv | jue 19 |

Enlaces UTM, uno por pieza, por ejemplo: https://lumen-ruddy-beta.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=s2-kebab#tpv

## Qué repetimos y qué cambiamos
Lo decide el informe del viernes 13.

## Lo que necesito de ti
- Pedirle a Hassam que comparta el carrusel de California y etiquete a @lumenstudiobog.
- Confirmar que podemos mostrar el logo de California (ya está en la web).

**Resumen para WhatsApp:** Semana 2, el TPV de California: 4 videos, 2 carruseles y Google. Pídele a Hassam que comparta su caso cuando salga.

## Ajustes propuestos

*Revisión del lunes 16 frente al último informe del analista (`docs/redes/semanas/2026-11-09/informe.md`, en la rama `redes/informe-2026-11-09`, aún sin unir a `main`). El informe sigue en borrador y **sin datos**: Vercel Web Analytics respondió 404 y Metricool no devolvió publicaciones. El plan sigue encajando con lo que pide («no mover formatos hasta tener una semana de cifras»), así que no cambio el foco ni los formatos; solo propongo estos ajustes.*

### 1. Qué repetimos y qué cambiamos (según el informe)
- **Repetimos** los mismos formatos de la semana 1 (videos de 12–18 s, carruseles de 6 láminas y Google) para poder comparar en la semana 3.
- **Antes de publicar s2-kebab hoy:** activar Web Analytics en el proyecto `lumen` de Vercel y revisar que cada enlace de Metricool lleve su `utm_campaign`. Sin esto, la semana 2 también queda sin datos.
- **El viernes 20:** pegarle al analista las estadísticas de TikTok, Instagram y Vercel para que el informe salga completo.

### 2. Cambiar s2-verifactu por una pieza de Champi
- Los guiones ya la marcan «sin producir»: la guía de marca no dice que nuestro TPV cumpla Veri*Factu (eso es de Archivum, que es facturación), así que «Nuestro TPV ya lo cumple» no se puede publicar.
- Además, el plan tiene 1 pieza de Champi de 7 (≈15 %), y la guía pide 35 %.
- **Propuesta:** en su lugar, **s2-champi-cansado** · TikTok + Reels · video de 14 s · pilar Champi · sáb 21.
  - **Gancho:** Champi corre de la cocina a la caja con una comanda en la mano.
  - Luego se sienta: «Uff, me cansé… Aquí no te molesto.» Y la comanda llega sola a la pantalla de cocina.
  - **Llamada a la acción:** `#tpv`.
  - Si la apruebas, la escribe el guionista.
- El caso de Archivum (facturación con Veri*Factu, archivum.es) puede ir en la semana 3, contado como proyecto (`#proyectos`) y sin hablar del TPV.

### 3. Enlace de s2-hassam
`#opiniones` no está entre las secciones de la guía (`#tpv`, `#presupuesto`, `#proyectos`, `#contacto`). Propongo `#tpv`, que es donde se prueba lo que cuenta Hassam. La cita de las láminas coincide palabra por palabra con `index.html`, así que está bien.

### 4. Dominio de los enlaces
La guía de `main` usa `https://lumen-ruddy-beta.vercel.app`, y el plan está bien con esa guía. Pero la rama por defecto del repositorio (`claude/quirky-fermi-9pmk7b`) ya tiene el PR #7, «La web pasa al dominio propio www.lumenestudio.tech», y ese PR **no está en `main`**. Si el dominio ya funciona, conviene unir el PR #7 a `main` y cambiar los enlaces UTM de esta semana, incluido el de s2-google en `guiones.md`, a `https://www.lumenestudio.tech/?utm_source=<red>&utm_medium=social&utm_campaign=<pieza>#tpv`.

### 5. Faltan dos secciones de la skill

**Promoción:** ninguna esta semana. El informe no tiene datos y no propone piezas.

**Para Metricool** (hora de Bogotá; Metricool solo tiene conectados Instagram y TikTok, así que LinkedIn y Google se publican a mano):

| Pieza | Red | Día y hora | Archivo | Descripción | Música |
| --- | --- | --- | --- | --- | --- |
| s2-kebab | TikTok + Reels | lun 16 · 19:00 | `video/s2-kebab/s2-kebab.mp4` | Este es el TPV real que usa un restaurante con dos locales. Pruébalo tú mismo en nuestra web 👉 link en la bio. #LumenStudio #TPV #Restaurantes #Emprendedores | Reels: «White Mustang» – Lana Del Rey · reserva: «Dark Red» – Steve Lacy · TikTok: música automática, sí |
| s2-cocina | TikTok + Reels | mar 17 · 19:00 | `video/s2-cocina/s2-cocina.mp4` | La pantalla de cocina de nuestro TPV: sin comandas en papel, sin gritos. Pruébala en la web. #LumenStudio #TPV #Restaurantes #Cocina | Reels: «Dark Red» – Steve Lacy · reserva: «Art Deco» – Lana Del Rey · TikTok: música automática, sí |
| s2-california | Instagram (LinkedIn a mano) | mié 18 · 20:00 | `carrusel/s2-california/01–06.png` | Así funciona el TPV de California, en sus dos locales. Desliza y pruébalo en nuestra web. #LumenStudio #TPV #Restaurantes #CasoDeÉxito | — |
| s2-hassam | Instagram (LinkedIn a mano) | jue 19 · 20:00 | `carrusel/s2-hassam/01–03.png` | Lo que nos contó Hassam, de California, después de usar el kiosco en sus dos locales. Prueba el TPV en nuestra web. #LumenStudio #TPV #Restaurantes | — |
| s2-google | Perfil de Google (a mano) | jue 19 | `assets/img/tpv-cocina.webp` | El texto que está en `guiones.md` | — |
| s2-champi-kiosco | TikTok + Reels | vie 20 · 19:00 | `video/s2-champi-kiosco/s2-champi-kiosco.mp4` | Champi no llega al kiosco, pero el TPV también funciona en tu celular 😅 Pruébalo en la web. #LumenStudio #TPV #Restaurantes #Humor | Reels: «Note to Self» – Maria the Scientist · reserva: «White Mustang» – Lana Del Rey · TikTok: música automática, sí |
| s2-champi-cansado | TikTok + Reels | sáb 21 · 19:00 | por producir, si la apruebas | la escribe el guionista | Reels: «Note to Self» – Maria the Scientist · reserva: «Dark Red» – Steve Lacy · TikTok: música automática, sí |

Las canciones son sugerencias: confirma en el buscador de audio de Metricool que estén disponibles para cuentas de empresa. Volumen: música 30–40 y video 100 cuando el video tiene efectos de sonido.

**Resumen para WhatsApp (ajustes):** El plan de la semana 2 (TPV de California) sigue igual, pero propongo cambiar s2-verifactu por un video de Champi, porque no podemos afirmar que el TPV cumpla Veri*Factu.
Antes del video de hoy hay que activar Web Analytics en Vercel; si no, la semana queda otra vez sin datos. El viernes le pasamos las estadísticas al analista.
Ojo: el PR #7, el del dominio lumenestudio.tech, no está en `main`. Ya agregué la tabla para Metricool con horas y música.
