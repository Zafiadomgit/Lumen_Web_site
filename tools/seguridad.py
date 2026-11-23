#!/usr/bin/env python3
"""Escribe vercel.json con las cabeceras de seguridad de la web.

Uso:  python3 tools/seguridad.py   (tools/build_en.py lo llama solo al final)

La política de contenido (CSP) solo deja ejecutar scripts propios. Los scripts escritos dentro del HTML
(el que recuerda el modo claro u oscuro, el de las estadísticas y el que ordena Fendaria) se autorizan por
su huella sha256, que este script recalcula cada vez: si cambias uno, basta con volver a correrlo.
"""
import base64, hashlib, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ['index.html', 'en/index.html', 'aviso-legal.html', 'privacidad.html', 'cookies.html', 'demos/tpv/index.html']

hashes = set()
for page in PAGES:
    html = (ROOT / page).read_text(encoding='utf-8')
    for attrs, body in re.findall(r'<script([^>]*)>(.*?)</script>', html, flags=re.S):
        if 'src=' in attrs or 'application/ld+json' in attrs:
            continue  # los externos se cubren con 'self'; el JSON-LD no se ejecuta
        hashes.add("'sha256-" + base64.b64encode(hashlib.sha256(body.encode('utf-8')).digest()).decode() + "'")

# Google Analytics 4 (solo se carga si la persona acepta las cookies, js/consent.js): lo mínimo que necesita gtag.js
GA = 'https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com'

csp = '; '.join([
    "default-src 'self'",
    "script-src 'self' https://www.googletagmanager.com " + ' '.join(sorted(hashes)),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: " + GA,
    "media-src 'self'",
    "connect-src 'self' " + GA,
    "frame-src 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
])
# Lumen Travels vive en otro proyecto de Vercel y se sirve bajo /travels (reescritura externa: la URL no cambia).
# Sus respuestas llevan SUS propias cabeceras (CSP con connect-src a Supabase, sin 'unsafe-inline'), así que esta política
# NO se aplica a /travels: el navegador sumaría las dos CSP y bloquearía su formulario. El patrón excluye /travels y /travels/...
TRAVELS = "https://lumentravels.vercel.app/travels"
config = {
    "rewrites": [
        {"source": "/travels", "destination": TRAVELS},
        {"source": "/travels/:path*", "destination": TRAVELS + "/:path*"},
    ],
    "headers": [{
        "source": "/((?!travels(?:/|$)).*)",
        "headers": [
            {"key": "Content-Security-Policy", "value": csp},
            {"key": "X-Content-Type-Options", "value": "nosniff"},
            {"key": "X-Frame-Options", "value": "SAMEORIGIN"},
            {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"},
            {"key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"},
            {"key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains"},
            {"key": "Cross-Origin-Opener-Policy", "value": "same-origin"},
        ],
    }]
}
(ROOT / 'vercel.json').write_text(json.dumps(config, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print('vercel.json:', len(hashes), 'scripts en línea autorizados')
