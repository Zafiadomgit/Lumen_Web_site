#!/usr/bin/env python3
"""Prepara los sprites de Champi de traje (modo moderno) a partir de los diseños fuente-traje-*.png.

idle-traje.webp sale de ese diseño (16 cuadros de 82 px, centrados en cuadros de 94 px como los originales).
Cada tira fuente tiene 16 cuadros de 82 px con fondo transparente.

Uso:  python3 tools/champi_traje.py
Lee assets/img/champi/{idle,walk,attack}.webp (cuadros de 94 px) y escribe *-traje.webp al lado.
En cada cuadro busca los ojos (manchas casi negras bajo el sombrero), la boca y el cuerpo, y pinta encima.
"""
import pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
D = ROOT / 'assets/img/champi'
F = 94
NAVY = [(18, 26, 44), (36, 49, 73), (58, 74, 100), (70, 88, 116)]  # de sombra a luz (colores del diseño)
SHIRT, SHIRT_S = (251, 251, 251), (197, 198, 206)
TIE, TIE_K = (179, 77, 54), (124, 48, 36)
SHOE, SHOE_L = (20, 18, 24), (60, 56, 66)
RIM, SHINE = (13, 6, 4), (251, 251, 251)

# centro de cada ojo en cada cuadro (x, y dentro del cuadro de 94 px), medido sobre los sprites originales
EYES = {
    'idle': [[(33, 49), (48, 50)], [(34, 48), (49, 49)], [(34, 48), (49, 49)], [(34, 48), (49, 49)],
             [(34, 49), (48, 50)], [(32, 49), (47, 50)], [(32, 49), (47, 50)], [(33, 49), (48, 50)]],
    'walk': [[(51, 46)], [(52, 46)], [(51, 53)], [(52, 50)], [(52, 46)], [(52, 49)]],  # de perfil: un ojo
    'attack': [[(33, 49), (48, 50)], [(26, 47), (40, 48)], [(21, 46), (34, 46)], [(30, 46), (46, 46)],
               [(51, 49)], [(45, 47), (60, 49)], [(33, 49), (47, 50)], [(33, 49), (48, 50)]],
}
NAME, IDX = '', 0

def is_red(p): r, g, b, a = p; return a > 128 and r > 120 and r - g > 55
def is_dark(p): r, g, b, a = p; return a > 128 and r < 95 and g < 70 and b < 70
def is_skin(p):
    r, g, b, a = p
    return a > 128 and r > 120 and g > 85 and b > 50 and r - g < 60 and not is_red(p)

def blobs(px, pts):
    pts, out = set(pts), []
    while pts:
        stack, comp = [pts.pop()], []
        while stack:
            x, y = stack.pop(); comp.append((x, y))
            for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1), (x+1, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1)):
                if (nx, ny) in pts: pts.remove((nx, ny)); stack.append((nx, ny))
        out.append(comp)
    return out

def dress(fr):
    px = fr.load()
    solid = [(x, y) for y in range(F) for x in range(F) if px[x, y][3] > 128]
    if not solid: return fr
    bottom = max(y for _, y in solid)
    # el sombrero: por columna, la fila más baja con rojo; la cara empieza debajo
    cap = {}
    for x, y in solid:
        if is_red(px[x, y]): cap[x] = max(cap.get(x, 0), y)
    centers = EYES[NAME][IDX]
    mouth_y = max(cy for _, cy in centers) + 6
    neck = mouth_y + 2  # el traje empieza justo bajo la boca

    # traje: la piel del cuerpo pasa a azul marino según su luz; los pies, zapatos
    feet = bottom - 4
    body_rows = {}
    for x, y in solid:
        if y < neck: continue
        p = px[x, y]
        if y >= feet: continue  # pies descalzos, como en el diseño
        if not is_skin(p) and p[0] < 175 and p[0] > p[2]:  # contornos y costuras marrones → azul muy oscuro
            px[x, y] = (12, 14, 26, 255) if sum(p[:3]) < 200 else NAVY[0] + (255,)
            continue
        if is_skin(p):
            lum = (p[0] * 3 + p[1] * 4 + p[2]) / 8
            i = 0 if lum < 150 else 1 if lum < 185 else 2 if lum < 215 else 3
            px[x, y] = NAVY[i] + (255,)
            body_rows.setdefault(y, []).append(x)
    if not body_rows: return fr
    ref = body_rows.get(neck + 4) or body_rows[min(body_rows)]
    cx = round(sum(ref) / len(ref))
    # camisa en V y corbata dorada
    V = 10
    for y in range(neck, neck + V):
        half = round((neck + V - 1 - y) * 0.75)
        row = body_rows.get(y, ())
        for x in range(cx - half - 1, cx + half + 2):
            if x not in row: continue
            if abs(x - cx) <= half - 1: px[x, y] = SHIRT + (255,)
            elif abs(x - cx) <= half: px[x, y] = SHIRT_S + (255,)
            else: px[x, y] = (18, 22, 38, 255)  # solapa
        for x in (cx, cx + 1):  # corbata de 2 píxeles con nudo
            if x in row and y <= neck + V - 2:
                px[x, y] = (TIE_K if y <= neck + 1 else TIE) + (255,)
    # gafas de montura fina: solo el marco, los ojos se ven por dentro
    for ex, ey in centers:
        for y in range(ey - 3, ey + 3):
            for x in range(ex - 4, ex + 4):
                if px[x, y][3] > 128 and (y in (ey - 3, ey + 2) or x in (ex - 4, ex + 3)):
                    px[x, y] = RIM + (255,)
    if len(centers) >= 2:
        (ax, ay), (bx, by) = sorted(centers)[:2]
        for x in range(ax + 4, bx - 3):
            y = round(ay + (by - ay) * (x - ax) / max(1, bx - ax)) - 2
            if px[x, y][3] > 128: px[x, y] = RIM + (255,)
    elif centers:  # de perfil: una patilla hacia atrás
        ex, ey = centers[0]
        for x in range(ex - 8, ex - 4):
            if 0 <= x < F and px[x, ey - 2][3] > 128: px[x, ey - 2] = RIM + (255,)
    return fr

# cada animación: el diseño de 82 px, centrado en cuadros de 94 px con los pies abajo (como los originales)
for fuente, salida in (('fuente-traje-idle.png', 'idle-traje.webp'),       # quieto
                       ('fuente-traje-walk.png', 'walk-traje.webp'),       # caminando
                       ('fuente-traje-agarrado.png', 'attack-traje.webp')):  # agarrado y saludando
    src = Image.open(D / fuente).convert('RGBA')
    n = src.width // 82
    out = Image.new('RGBA', (n * F, F))
    for i in range(n):
        out.paste(src.crop((i * 82, 0, (i + 1) * 82, 82)), (i * F + 6, F - 82))
    out.save(D / salida, lossless=True)
    print('ok', salida, n, 'cuadros')
