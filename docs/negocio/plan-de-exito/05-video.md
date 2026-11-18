# 05 · Video que vende

**Hoy:** 18 de noviembre de 2026 · **Responsable:** productor de video · **Regla de todo el plan:** nada de voz ni cara de personas; solo Champi, texto en pantalla y capturas reales. Ninguna cifra ni resultado que no exista.

## La idea en una frase
Hasta ahora hicimos videos para **que nos vean** (11 piezas de 13 a 19 s, la mayoría de Champi). El informe dice que hoy el problema es el alcance: 3 seguidores y 2 a 5 personas por pieza. Un video para redes con 4 vistas no vende, pero **un video que le mandas tú por WhatsApp a alguien que ya preguntó, sí puede cerrar**. Por eso el plan tiene dos carriles: videos para **mandar** (venden) y videos para **publicar** (traen gente).

## 1. Videos que llevan a una venta
Todos son verticales, sin voz, con subtítulos y cierre con el farol y «Encendemos tus ideas.». Los precios y plazos, siempre «desde» o «entre», como dice la guía.

| Video | Dónde se usa | Duración | Material real que ya tenemos |
| --- | --- | --- | --- |
| **Demo del TPV** (kiosco, cocina, cobro) | WhatsApp a un restaurante interesado; sección TPV de la web; propuesta | 40–60 s | `demos/tpv/` y `tpv-*.webp`; ya hay dos videos cortos (kebab, cocina) que se amplían |
| **Demo por servicio**: landing, tienda, app, software a medida | WhatsApp; web (`#proyectos`); anexo de la propuesta | 30–45 s cada uno | Capturas de Vitrales, Althaya, Amieva, EasyClase, Archivum y Fendaria en `assets/img/` |
| **Caso por cliente** (reto, solución, resultado) | Web, LinkedIn, propuesta, WhatsApp | 30–40 s | Los 7 proyectos de la guía. El resultado solo con las frases aprobadas de Hassam, Herney y Laura, palabra por palabra; en los demás, solo lo que se ve, sin inventar resultados |
| **«Cómo trabajamos» en 5 pasos** (idea, propuesta, diseño, programación, entrega) | WhatsApp a quien duda; web; propuesta | 35–45 s | Texto en pantalla y Champi; sin plazos cerrados: «landing unas 2 semanas» como orientativo |
| **Champi responde objeciones** («¿cuánto cuesta?», «¿cuánto tarda?», «¿y si no sé qué quiero?», «¿me ayudan después?») | Redes (serie) y WhatsApp (el que corresponda a la duda) | 15–25 s cada uno | Calculadora de la web, chat de Champi, tarifas de la guía. Ojo: Champi nunca promete precios ni fechas, solo manda a la calculadora |
| **Versión en inglés** del demo y de 2 casos (Althaya en Perth, Amieva en Florida) | WhatsApp y propuestas a clientes de fuera; LinkedIn | igual que el original | Mismos videos con otro texto; los guiones en inglés ya los hace el redactor |

**Orden de prioridad (lo que más cerca está del dinero):** primero el demo del TPV (el producto con precio más claro, 500–900 USD más 39 al mes), luego «Cómo trabajamos», luego las 3 objeciones más comunes, luego casos. Los casos con un cliente real se publican solo con su visto bueno.

## 2. Mejoras al formato actual (según el informe)
- **Gancho en el primer segundo.** Las flojas (`s1-momento` 3,4 s, `s1-proyectos` 2,4 s de tiempo medio) se abandonan antes de 4 s; las buenas fueron el saludo (12,6 s) y el reto del farol. Regla nueva: el primer cuadro ya muestra el **resultado o una pregunta con el precio** («¿Cuánto cuesta una web?») y algo moviéndose; nada de presentación antes. Ya lo pide la guía; hay que revisarlo en cada pieza.
- **Duración.** Redes: 12–18 s (los que ya tenemos están bien). Los de venta pueden ser de 30–60 s porque quien los recibe ya está interesado.
- **Subtítulos.** Siempre en la zona inferior, Manrope en negrita, y que el video se entienda **sin sonido** (la música se pone al programar).
- **Llamada a la acción.** Hoy cierran con la marca. Falta una instrucción concreta en el último cuadro: «Calcula tu presupuesto» (`#presupuesto`) o «Escríbenos por WhatsApp». Una sola por video.
- **Medir.** Con 3 seguidores no sabemos qué formato funciona. Un enlace de bio por red y semana (cambio 1 del informe) y Vercel Analytics activado: sin eso, no sabemos si algún video trajo una visita.
- **Medir lo que se manda por WhatsApp:** guardar en una hoja a quién se le envió qué video y qué respondió. Es el único dato real de «video que vende» que podemos tener ya.

## 3. Ritmo sostenible: 90 días (19 nov – 16 feb)
Para no repetir el error de producir más de lo que se mide.
- **Hasta el 4 de diciembre:** 3 videos de redes por semana (como ya está en el plan de las semanas 3 y 4) **más 1 video de venta por semana**: demo del TPV, «Cómo trabajamos», demo de landing y objeción «¿cuánto cuesta?».
- **Diciembre a mediados de enero:** 2–3 de redes y 1–2 de venta por semana. Se sube a 2 de venta cuando hay una plantilla lista.
- **Hasta el 16 de febrero:** 2–3 de redes y 1 de venta por semana. Total estimado en 90 días: **unos 30 de redes y unos 15 de venta**, incluidas las versiones en inglés. Si una semana hay un cliente real que pide algo, se pasa por delante.
- **Revisión el 4 de diciembre y cada mes:** se duplica lo que tuvo más tiempo visto o más clics a WhatsApp y se abandona lo que no. Con el alcance actual, cualquier decisión antes de eso es adivinar.

**Plantillas de HyperFrames para producir más rápido** (hoy cada video se arma desde `nuevo.sh` y se escribe a mano):
1. **Demo de producto**: tableta o celular con 3–4 capturas, un dedo que toca, subtítulos y cierre. Se llena con una lista de capturas y textos.
2. **Caso de cliente**: portada, «el reto», 2–3 pantallas, frase de la opinión aprobada (si la hay), cierre.
3. **Pasos** («Cómo trabajamos», «Cómo cobras en el TPV»): número, ícono, frase y Champi reaccionando.
4. **Champi responde**: burbuja de pregunta, Champi, burbuja de respuesta y llamada a la acción con enlace a la calculadora.
5. **Cierre con CTA**: la salida actual con el farol y Champi saludando, más un botón de «Calcula tu presupuesto» o «Escríbenos por WhatsApp».
6. **Versión en inglés**: un solo archivo de textos por idioma para sacar los dos MP4 sin rehacer la animación.

Con esto, un video de venta pasa de cerca de un día a unas pocas horas (cálculo mío, sin medir todavía).

## 4. Lo que necesitamos del dueño
1. **Decidir el primer video de venta:** propongo el demo del TPV (40–60 s).
2. **Permiso por escrito** de California, Vitrales Perafán, Althaya, Amieva, EasyClase y Archivum para mostrar su proyecto en un video de caso (ya está aprobado el uso de EasyClase y Vitrales en publicaciones; falta confirmar el resto y los de venta directa).
3. **Datos reales para los casos:** cualquier número o resultado que el cliente nos autorice a decir (clientes, pedidos, tiempo ahorrado). Sin eso, el video muestra el trabajo y la opinión aprobada, no cifras.
4. **Las preguntas que más le hacen por WhatsApp** (top 5) y las respuestas que da: son los guiones de «Champi responde».
5. **Activar Vercel Analytics** (o mandar la captura del panel) y poner un enlace de bio distinto por red.
6. **Mandar los videos él mismo** por WhatsApp a quien pregunte y apuntar qué respondieron.
7. **Confirmar la política de plazos y precios en video:** solo «desde/entre» y calculadora; la propuesta escrita da los números cerrados.
8. **Decidir qué se hace con `s2-verifactu`** (sin video): no se afirma «cumple Verifactu» hasta que se pueda afirmar.
