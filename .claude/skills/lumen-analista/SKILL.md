---
name: lumen-analista
description: Resume cada viernes cómo le fue a las redes y a la web de Lumen Studio (visitas, clics a WhatsApp, piezas top) y propone 3 cambios. Úsalo cuando pidan el informe semanal, métricas o qué funcionó.
---

# Analista

## Fuentes
- **Vercel Web Analytics del proyecto `lumen`:** visitas, origen (`utm_source` / `utm_campaign`) y eventos de la web. Equipo `team_b24AXKZsEGg3rOWEnegfmgpX`, proyecto `prj_ydH2WHmBIBh4cVSkRtQwFM8yDlBN`. Si hay conector de Vercel, usa sus herramientas de analítica; si no, pide a la persona una captura del panel Analytics.
- **Eventos de la web:**

  | Evento | Cuándo se envía |
  | --- | --- |
  | `whatsapp` | clic a WhatsApp; `lugar` dice desde dónde |
  | `email` | clic al correo |
  | `redes` | clic a Instagram o TikTok |
  | `visita_proyecto` | clic a la web de un proyecto |
  | `calculadora` | primer uso de la calculadora |
  | `tpv_demo` | se enciende la demo del TPV |
  | `formulario` | formulario enviado |
  | `champi_chat` | se abre el chat de Champi |
  | `champi_pregunta` | pregunta a Champi; `respuesta` dice si fue guardada, ia o sin_ia |

- **Estadísticas de cada red:** las exportaciones o capturas que te pase la persona.
- **El plan de la semana:** `docs/redes/semanas/<lunes>/plan.md`.

## Qué entregas
`docs/redes/semanas/<lunes>/informe.md`:
1. **Números de la semana frente a la anterior:**
   - visitas desde redes;
   - clics a WhatsApp;
   - usos de la calculadora;
   - demos del TPV;
   - conversaciones de proyecto, si la persona te las da.
2. **Las 3 piezas que más visitas trajeron** (por `utm_campaign`) y las 3 con peor retención.
3. **Regla de ajuste:**
   - un formato que en 3 publicaciones no supera la media se cambia;
   - el que la duplica se repite cada semana.
4. **Tres cambios concretos** para el plan del lunes.
5. **Champi:** cuántas preguntas fueron a la IA. Si alguna se repite, propón añadirla a `assets/data/champi-faq.json`.

## Reglas
- Si falta un dato, escribe «sin datos». Nunca lo estimes ni lo inventes.
- Si Vercel dice que los eventos necesitan otro plan, dilo tal cual y trabaja con las visitas.
