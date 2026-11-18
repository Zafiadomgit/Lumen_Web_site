# Guiones · Semana 3

## s3-codigo-farol · Video de código 16 s

**Producido** con HyperFrames: `video/s3-codigo-farol/`. Arriba, el farol de la web en una ventana del navegador; abajo, el editor con `js/main.js`. El balanceo y las chispas se calculan con los mismos números del código (K = 55, DAMP = 2.1, 14 chispas), así que lo que se ve es lo que el código hace.

| Tiempo | Qué se ve | Texto en pantalla | Línea resaltada |
| --- | --- | --- | --- |
| 0–2.6 s | El farol encendido; un dedo lo golpea y se balancea soltando chispas | Así se programa un farol que se balancea | `var K = 55, DAMP = 2.1, MAX = 38;` y después `vel += dir * 260 * force;` |
| 2.6–6.4 s | Sigue balanceándose y se va frenando; el editor pasa a `step` | Un muelle con rozamiento | `vel += (-K * ang - DAMP * vel) * dt;` → `ang += vel * dt;` → `rotate(…)` |
| 6.4–10 s | Otro golpe desde el otro lado, chispas | 14 chispas en cada golpe | `for (var i = 0; i < 14; i++) {` → color claro |
| 10–12.6 s | Tercer golpe; el editor se atenúa | Tócalo tú en nuestra web | — |
| 12.6–16 s | Farol encendido y Champi saludando | Encendemos tus ideas. | — |

**Código que se muestra** (de `js/main.js`, sección 1b; solo se saltan líneas con `…` y se sube un comentario a su propia línea):

```js
// rigidez del muelle, rozamiento y ángulo máximo (grados)
var K = 55, DAMP = 2.1, MAX = 38;
…
var hit = function (x, y) {
  …
  vel += dir * 260 * force;
  sparks(x, y, dir);
```

```js
var step = function (t) {
  var dt = Math.min(0.032, (t - last) / 1000 || 0.016); last = t;
  vel += (-K * ang - DAMP * vel) * dt;
  ang += vel * dt;
  if (ang > MAX) { ang = MAX; vel *= -0.4; } …
  lampBtn.style.transform = 'rotate(' + ang.toFixed(2) + 'deg)';
  …
  requestAnimationFrame(step);
};
```

```js
var sparks = function (x, y, dir) {
  if (reduce) return;
  for (var i = 0; i < 14; i++) {
    var sp = document.createElement('span');
    sp.className = 'spark';
    …
    var sz = 3 + Math.random() * 5;
    if (Math.random() < 0.35) sp.style.background = '#fff3c4';
```

**Descripción:** Así se programa el farol de nuestra web: un muelle con rozamiento y 14 chispas por golpe. Entra y golpéalo tú 🔥
🌐 www.lumenestudio.tech
#LumenStudio #DesarrolloWeb #JavaScript #Programación #Bogotá

**English:** This is how the lantern on our website works: a spring with friction and 14 sparks per hit. Go give it a tap 🔥
#LumenStudio #WebDevelopment #JavaScript #CreativeCoding

## s3-easyclase · Carrusel 6 láminas

| Lámina | Título | Apoyo |
| --- | --- | --- |
| 1 | Clases particulares, pagadas por hora | EasyClase, una plataforma hecha a medida |
| 2 | El reto | Conectar estudiantes y profesores, y que el dinero llegue seguro a cada uno |
| 3 | Profesores verificados | Búsqueda de profesores, calificaciones y un panel para cada rol (captura `easyclase-profesores.webp`) |
| 4 | Reservas y pagos | Pagos con Mercado Pago y retiro de ganancias (captura `easyclase-como.webp`) |
| 5 | También en el celular | Captura `easyclase-movil.webp` |
| 6 | ¿Tienes una idea así? | Calcula tu plataforma en nuestra web · lumenestudio.tech |

**Descripción:** EasyClase: clases particulares con profesores verificados, reservas y pagos con Mercado Pago, en una plataforma hecha a medida. ¿La tuya? Link en la bio.
🌐 www.lumenestudio.tech
#LumenStudio #DesarrolloWeb #Plataformas #Emprendedores #Colombia

**English:** EasyClase: private lessons with verified tutors, bookings and payments, on a custom-built platform. Got an idea like this? Link in bio.

## s3-champi-calculadora · Video 15 s

**Producido** con HyperFrames (15,2 s): `video/s3-champi-calculadora/`. La pantalla dice «Una landing, entre 600 y 1.200 USD · Precio orientativo, sin impuestos», que es lo que muestra la calculadora real (ya abre con «Landing» elegida; el toque la confirma). Sin sonido dentro del archivo.

| Tiempo | Qué se ve | Texto en pantalla | Voz / sonido |
| --- | --- | --- | --- |
| 0–2 s | Champi frente a la calculadora de la web (captura real a 390 px) | ¿Cuánto cuesta una web? | — |
| 2–6 s | Champi elige «Landing» y salta sobre las opciones | Champi saca la cuenta | toques |
| 6–10 s | El rango aparece: entre 600 y 1.200 USD | Una landing, desde 600 USD | «ding» |
| 10–13 s | Champi se sienta: «Uff, me cansé…» | Haz la tuya en la web | — |
| 13–15 s | Farol encendido | Encendemos tus ideas. | — |

**Descripción:** ¿Cuánto cuesta una web? Champi ya hizo la cuenta 🍄 Calcula la tuya en un minuto en nuestra web.
🌐 www.lumenestudio.tech
#LumenStudio #DiseñoWeb #Emprendedores #Colombia

**English:** How much does a website cost? Champi already did the math. Work out yours in a minute on our site.

## s3-codigo-modo-claro · Video de código 18 s

**Producido** con HyperFrames (18 s): `video/s3-codigo-modo-claro/`. Arriba, capturas reales de la web en oscuro y en claro con los bloques y la rotura dibujados con los mismos números de la sección 1c (bloques de 138 px, ola de 900 ms, 16 sectores de grietas) y semilla fija; abajo, tres paneles de `js/main.js` (`toggleTheme`, `blocks`, `shatter`). Hay un tercer toque a 10,6 s para terminar en claro, porque la rotura deja la web en oscuro.

Mismo formato que el farol. Arriba, la web pasando de oscuro a claro con los bloques que nacen del farol; abajo, `js/main.js`, sección 1c. El código exacto se copia de esa sección al producirlo.

| Tiempo | Qué se ve | Texto en pantalla |
| --- | --- | --- |
| 0–2.5 s | Toque en el botón de modo claro | El modo claro nace del farol |
| 2.5–7 s | Los bloques se encienden desde el farol hacia afuera | Bloque a bloque, desde la luz |
| 7–11 s | Vuelta a oscuro: la página se rompe en pedazos | Y para volver, se rompe |
| 11–15 s | La web en claro, quieta | Pruébalo en nuestra web |
| 15–18 s | Farol encendido | Encendemos tus ideas. |

**Descripción:** El modo claro de nuestra web nace del farol, bloque a bloque. Y para volver a oscuro… se rompe. Pruébalo 👇
🌐 www.lumenestudio.tech
#LumenStudio #DesarrolloWeb #JavaScript #DiseñoWeb

**English:** Our site's light mode is born from the lantern, block by block. And to go back to dark… it shatters.

## s3-vitrales · Carrusel 5 láminas

| Lámina | Título | Apoyo |
| --- | --- | --- |
| 1 | Casi 50 años de oficio | Vitrales Perafán, taller fundado en 1976 (captura `vitrales-hero.webp`) |
| 2 | El reto | Mostrar el trabajo del taller y recibir encargos desde la web |
| 3 | Galería, proceso y exposiciones | Captura `vitrales-taller.webp` |
| 4 | Lo que dice Herney | Su opinión, copiada tal cual de la sección `#opiniones` de la web |
| 5 | ¿Tu oficio merece una web así? | Calcula la tuya · lumenestudio.tech |

**Descripción:** Vitrales Perafán: casi 50 años de oficio, ahora en una web con galería, proceso y presupuesto en línea. ¿Tu negocio? Link en la bio.
🌐 www.lumenestudio.tech
#LumenStudio #DiseñoWeb #Artesanía #Colombia

**English:** Vitrales Perafán: nearly 50 years of stained-glass craft, now on a website with gallery, process and online quotes.

## s3-fendaria · Video 15 s

**Producido** con HyperFrames (15 s): `video/s3-fendaria/`. Dice «Llegará pronto a Google Play», como la web. Champi dice «¡Vengo de Fendaria!» en una burbuja y los siete héroes aparecen animados en fila.

| Tiempo | Qué se ve | Texto en pantalla |
| --- | --- | --- |
| 0–2 s | Champi en la web, de frente | Champi viene de un videojuego |
| 2–6 s | Escenas reales de Fendaria (`fx-titulo`, `fx-villa`, `fx-combate`) | Fendaria, nuestra app de aventuras |
| 6–10 s | Héroes y mundos (`fx-heroes`, `fx-portal`) | Siete héroes, ocho mundos |
| 10–13 s | Champi salta de vuelta a la web | Llega pronto a Google Play |
| 13–15 s | Farol encendido | Encendemos tus ideas. |

**Descripción:** Champi no nació en una web: viene de Fendaria, nuestra app de aventuras. Siete héroes, ocho mundos, y llega pronto a Google Play 🍄
🌐 www.lumenestudio.tech
#LumenStudio #Apps #Videojuegos #Bogotá

**English:** Champi wasn't born on a website: he comes from Fendaria, our adventure app. Seven heroes, eight worlds, coming soon to Google Play.

## s3-google · Publicación con foto

**Foto:** `assets/img/althaya-hero.webp`.
**Texto:** Hicimos la web de Althaya, un centro de masajes en Perth: en inglés y en español, con reserva directa y pensada primero para el celular. Diseñamos webs para negocios de cualquier país. Botón «Más información» → https://www.lumenestudio.tech/?utm_source=google&utm_medium=social&utm_campaign=s3-google#proyectos
