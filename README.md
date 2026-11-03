# Lumen Studio — web

Web del estudio: webs, apps, videojuegos y TPV para restaurantes.

Sitio estático sin dependencias ni paso de compilación: `index.html`, `css/styles.css`, `js/main.js` y `assets/`.

```bash
python3 -m http.server 8000
```

## Qué hay dentro

- **Hero**: el nombre en marquesina gigante cruzando la ventana donde cuelga el farol de Lumen (el sprite animado de 8 fotogramas de Fendaria). La luz del farol sigue al puntero.
- **Proyectos**: capturas reales de Fendaria, Vitrales Perafán, Althaya y el TPV de California.
- **Demo del TPV**: la carta real de California con sus precios; se hace un pedido, se envía a cocina y se cobra en caja (todo en el navegador, sin backend).
- **Qué hacemos / Cómo trabajamos / Fendaria / Contacto**.

## Antes de publicar

- Cambiar `hola@lumenstudio.es` (es provisional) por el correo real en `index.html`.
- Revisar la línea de ubicación («En remoto · España y Latinoamérica»).
