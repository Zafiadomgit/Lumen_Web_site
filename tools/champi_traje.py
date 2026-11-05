#!/usr/bin/env python3
"""Viste a Champi para el modo moderno: gafas oscuras, traje azul marino, camisa, corbata dorada y zapatos.

Uso:  python3 tools/champi_traje.py
Lee assets/img/champi/{idle,walk,attack}.webp (cuadros de 94 px) y escribe *-traje.webp al lado.
En cada cuadro busca los ojos (manchas casi negras bajo el sombrero), la boca y el cuerpo, y pinta encima.
"""
import pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
D = ROOT / 'assets/img/champi'
F = 94
NAVY = [(22, 27, 44), (33, 41, 66), (44, 55, 88), (56, 69, 108)]  # de sombra a luz
SHIRT, SHIRT_S = (242, 239, 232), (205, 200, 190)
TIE, TIE_K = (232, 163, 58), (176, 112, 26)
SHOE, SHOE_L = (20, 18, 24), (60, 56, 66)
LENS, RIM, SHINE = (16, 14, 22), (8, 7, 12), (150, 170, 205)

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
        if y >= feet and (is_skin(p) or is_dark(p)):
            px[x, y] = SHOE + (255,) if (sum(p[:3]) < 420 or y == bottom) else SHOE_L + (255,)
            continue
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
    # gafas oscuras sobre cada ojo y puente entre ellas
    for ex, ey in centers:
        for y in range(ey - 2, ey + 3):
            for x in range(ex - 4, ex + 4):
                if px[x, y][3] > 128:
                    edge = y in (ey - 2, ey + 2) or x in (ex - 4, ex + 3)
                    px[x, y] = (RIM if edge else LENS) + (255,)
        for sx, sy in ((ex - 2, ey - 1), (ex - 1, ey - 1), (ex - 2, ey)):
            if px[sx, sy][3] > 128: px[sx, sy] = SHINE + (255,)
    if len(centers) >= 2:
        (ax, ay), (bx, by) = sorted(centers)[:2]
        for x in range(ax + 4, bx - 3):
            y = round(ay + (by - ay) * (x - ax) / max(1, bx - ax)) - 1
            if px[x, y][3] > 128: px[x, y] = RIM + (255,)
    elif centers:  # de perfil: una patilla hacia atrás
        ex, ey = centers[0]
        for x in range(ex - 8, ex - 4):
            if 0 <= x < F and px[x, ey - 1][3] > 128: px[x, ey - 1] = RIM + (255,)
    return fr

for name in ('idle', 'walk', 'attack'):
    im = Image.open(D / f'{name}.webp').convert('RGBA')
    out = Image.new('RGBA', im.size)
    NAME = name
    for i in range(im.width // F):
        IDX = i
        out.paste(dress(im.crop((i * F, 0, (i + 1) * F, F))), (i * F, 0))
    out.save(D / f'{name}-traje.webp', lossless=True)
    print('ok', name)
