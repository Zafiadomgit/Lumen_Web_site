#!/usr/bin/env bash
# Crea un video nuevo de Lumen Studio con la plantilla de HyperFrames.
# Uso: docs/redes/plantilla/hyperframes/nuevo.sh docs/redes/semanas/<lunes>/video/<id>
set -euo pipefail
dest="$1"; id="$(basename "$dest")"; here="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$dest"
cp -r "$here/assets" "$here/hyperframes.json" "$dest/"
cat > "$dest/package.json" <<JSON
{
  "name": "$id",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "npx --yes hyperframes@0.9.19 preview",
    "check": "npx --yes hyperframes@0.9.19 check",
    "render": "npx --yes hyperframes@0.9.19 render --quality delivery -o $id.mp4"
  }
}
JSON
printf '{ "id": "%s", "name": "%s" }\n' "$id" "$id" > "$dest/meta.json"
echo "Listo: $dest (escribe index.html; mira los de la semana del 2026-11-09 como ejemplo)"
