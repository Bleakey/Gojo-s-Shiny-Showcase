import math

W, H = 72, 30
cx = 35.5
rx = 33.0

TIP   = "#bdea9b"
TOP   = "#79c264"
LIGHT = "#54ab47"
BODY  = "#3c8c3e"
DARK  = "#256b2e"
UNDER = "#163f1c"

def top_surface(x):
    t = max(0.0, 1.0 - ((x - cx) / rx) ** 2)
    return 12.0 - 8.0 * math.sqrt(t)

def bot_surface(x):
    t = max(0.0, 1.0 - ((x - cx) / rx) ** 2)
    return 18.0 + 8.0 * math.sqrt(t)

def shade(p):
    if p < 0.16:  return TOP
    if p < 0.40:  return LIGHT
    if p < 0.68:  return BODY
    if p < 0.86:  return DARK
    return UNDER

def rnd(i, n):
    return (i * 1103515245 + 12345 >> 4) % n

def place_blade(grid, x, base_y, h):
    """Tapered ~2px blade: wider root, 1px TIP on top."""
    for n in range(h):
        y = base_y - n
        if y < 0:
            continue
        if n >= h - 1:
            grid.setdefault(x, {})[y] = TIP                      # 1px tip
        else:
            color = TOP if n >= h - 3 else (LIGHT if n >= 1 else BODY)
            grid.setdefault(x, {})[y] = color
            grid.setdefault(x + 1, {})[y] = color                # 2px body

def cells_to_runs(col_pixels):
    runs = []
    for x in sorted(col_pixels):
        items = sorted(col_pixels[x].items())
        i = 0
        while i < len(items):
            y0, c = items[i]
            j = i
            while j + 1 < len(items) and items[j+1][0] == items[j][0] + 1 and items[j+1][1] == c:
                j += 1
            runs.append((x, y0, items[j][0] - y0 + 1, c))
            i = j + 1
    return runs

def svg_from_runs(runs):
    rects = "".join(f'<rect x="{x}" y="{y}" width="1" height="{h}" fill="{c}"/>' for (x, y, h, c) in runs)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'shape-rendering="crispEdges">{rects}</svg>\n')

# ---------- BACK MOUND ----------
base = {}
for x in range(2, W - 2):
    yt_i, yb_i = int(round(top_surface(x))), int(round(bot_surface(x)))
    span = max(1, yb_i - yt_i)
    for y in range(yt_i, yb_i + 1):
        base.setdefault(x, {})[y] = shade((y - yt_i) / span)

# back / side rim blades — clustered, shorter, tapered
bh = [3, 4, 3, 5, 4, 3, 4, 5]
k = 0
x = 4
while x < W - 5:
    yt_i = int(round(top_surface(x)))
    h = bh[k % len(bh)] + rnd(k, 2)
    place_blade(base, x, yt_i - 1, h)
    x += 3 + rnd(k, 2)          # 3-4 px spacing, slightly irregular
    k += 1

# surface texture specks
for k, x in enumerate(range(9, W - 9, 6)):
    yt_i = int(round(top_surface(x)))
    ys = yt_i + 2 + rnd(k, 2)
    if x in base and ys in base[x]:
        base[x][ys] = DARK

with open("Images/grass-base.svg", "w", encoding="utf-8") as f:
    f.write(svg_from_runs(cells_to_runs(base)))

# ---------- FRONT BLADES (occlude feet) ----------
front = {}
fh = [5, 7, 6, 8, 6, 7, 5, 6]
k = 0
x = 8
while x < W - 8:
    t = max(0.0, 1.0 - ((x - cx) / (rx - 3)) ** 2)
    base_y = int(round(15.0 + 4.0 * math.sqrt(t)))
    h = fh[k % len(fh)] + rnd(k, 2)
    place_blade(front, x, base_y, h)
    x += 3 + rnd(k, 2)
    k += 1

with open("Images/grass-front.svg", "w", encoding="utf-8") as f:
    f.write(svg_from_runs(cells_to_runs(front)))

print("done")
