#!/usr/bin/env python3
"""Genera las páginas HTML de los carruseles de una semana.

Uso:  python3 docs/redes/plantilla/carrusel.py
Luego exporta los PNG con:  node docs/redes/plantilla/exportar.cjs <carpeta del carrusel>
Cada carrusel es una lista de láminas en HTML; las clases están en carrusel.css.
"""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parents[3]
A = '../../../../../../assets/img/'  # desde docs/redes/semanas/<lunes>/carrusel/<id>/
IG = '@lumenstudiobog'

def foot(n, total):
    return f'<div class="foot"><span><b>Lumen Studio</b> · {IG}</span><span>{n}/{total}</span></div>'

CARRUSELES = {
  '2026-11-09/carrusel/s1-quienes': [
    '<div class="farol"></div><h1 class="xl">Encendemos<br>tus ideas.</h1><p class="sub">Somos Lumen Studio. Desliza para conocernos.</p>',
    f'<div class="kicker">Webs</div><h1>Webs que trabajan por ti.</h1><p class="sub">Landings, webs corporativas y tiendas online, a medida.</p><img class="shot" src="{A}vitrales-hero.webp" alt="">',
    f'<div class="kicker">Apps</div><h1>Apps para Android e iPhone.</h1><p class="sub">De negocio o de entretenimiento, como Fendaria.</p><img class="shot" src="{A}fx-titulo.webp" alt="">',
    f'<div class="kicker">TPV</div><h1>Un TPV que ya vende.</h1><p class="sub">Kiosco, cocina y caja en los dos locales de California.</p><img class="shot" src="{A}tpv-inicio.webp" alt="">',
    '<div class="kicker">Dónde estamos</div><h1>Desde Bogotá, para cualquier país.</h1><p class="sub">Trabajamos en remoto, en español y en inglés.</p><div class="champi r"></div>',
    'PAPER<div class="kicker">Tu turno</div><h1>¿Qué quieres construir?</h1><p class="sub">Calcula tu proyecto en nuestra web. Link en la bio.</p><span class="cta">Escríbenos</span>',
  ],
  '2026-11-09/carrusel/s1-precios': [
    '<h1 class="xl">¿Cuánto cuesta una web?</h1><p class="sub">Te lo decimos claro. Desliza.</p><div class="champi r"></div>',
    '<div class="kicker">Landing de una página</div><h1>Para presentar tu negocio.</h1><p class="price">US$ 600 – 1.200</p><p class="sub">Unas 2 semanas.</p>',
    '<div class="kicker">Web corporativa</div><h1>Hasta 8 páginas.</h1><p class="price">US$ 1.500 – 3.000</p><p class="sub">Unas 4 semanas.</p>',
    '<div class="kicker">Tienda online</div><h1>Para vender por internet.</h1><p class="price">US$ 3.000 – 6.000</p><p class="sub">Unas 6 semanas.</p>',
    '<div class="kicker">Lo exacto</div><h1>Calcúlalo en 1 minuto.</h1><p class="sub">Elige el tipo de web y los extras en nuestra calculadora.</p>',
    'PAPER<div class="kicker">Sin letra pequeña</div><h1>Precio final, por escrito.</h1><p class="sub">Precios orientativos en dólares, sin impuestos. Antes de empezar te damos el precio cerrado.</p><span class="cta">Calcula tu web</span>',
  ],
  '2026-11-16/carrusel/s2-california': [
    f'<div class="kicker">Caso · California</div><h1>Un kiosco que pide, cobra y avisa a cocina.</h1><img class="shot" src="{A}tpv-salvapantallas.webp" alt="">',
    '<div class="kicker">El reto</div><h1>Dos locales, dos idiomas, cero papel.</h1><p class="sub">Que cada comanda llegue a cocina sin pasar por papel.</p>',
    f'<div class="kicker">El kiosco</div><h1>Fotos de cada plato.</h1><p class="sub">En español y en inglés.</p><img class="shot" src="{A}tpv-carta.webp" alt="">',
    f'<div class="kicker">A su gusto</div><h1>Quitar y añadir.</h1><p class="sub">Ingredientes y extras; el precio se recalcula al momento.</p><img class="shot" src="{A}tpv-personalizar.webp" alt="">',
    f'<div class="kicker">Cocina y caja</div><h1>La comanda llega al instante.</h1><p class="sub">Turnos, cobro e impresión de tickets en caja.</p><img class="shot" src="{A}tpv-cocina.webp" alt="">',
    'PAPER<div class="kicker">Hoy</div><h1>Funciona en Medina de Pomar y Villarcayo.</h1><p class="sub">Y cumple Verifactu. Pruébalo en nuestra web.</p><span class="cta">Prueba el TPV</span>',
  ],
  '2026-11-16/carrusel/s2-hassam': [
    '<div class="kicker">Lo que dicen</div><p class="quote">Desde que tenemos el kiosco, los clientes piden solos y la comanda sale directa en cocina.</p>',
    '<p class="quote">En los dos locales usamos el mismo sistema y la caja cuadra sin líos.</p><p class="who"><b>Hassam KB</b> · Dueño de California</p>',
    'PAPER<h1>¿Quieres lo mismo en tu restaurante?</h1><p class="sub">Prueba el TPV en nuestra web. Link en la bio.</p><span class="cta">Prueba el TPV</span>',
  ],
}

for rel, slides in CARRUSELES.items():
    d = ROOT / 'docs/redes/semanas' / rel
    d.mkdir(parents=True, exist_ok=True)
    out = []
    for i, s in enumerate(slides, 1):
        cls = 'slide'
        if s.startswith('PAPER'):
            cls += ' paper'; s = s[5:]
        out.append(f'<section class="{cls}" id="l{i:02d}">{s}{foot(i, len(slides))}</section>')
    html = ('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>' + rel.split('/')[-1] + '</title>'
            '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Manrope:wght@400;700;800&display=swap" rel="stylesheet">'
            '<link rel="stylesheet" href="../../../../plantilla/carrusel.css"></head><body>' + '\n'.join(out) + '</body></html>')
    (d / 'index.html').write_text(html, encoding='utf-8')
    print('ok', rel)
