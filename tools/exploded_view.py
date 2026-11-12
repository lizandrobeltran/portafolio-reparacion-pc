"""Generate an isometric exploded-view line drawing of a tower PC as SVG groups."""
import math, json, sys

C, S = math.cos(math.radians(30)), math.sin(math.radians(30))

def P(x, y, z):
    return ((x - z) * C, (x + z) * S - y)

def fmt(pts):
    return " ".join(f"{a:.1f},{b:.1f}" for a, b in pts)

def box(x0, x1, y0, y1, z0, z1, cls="f"):
    """Visible faces +x, +y, +z of a prism."""
    top = [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)]
    right = [P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)]
    front = [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]
    return "".join(f'<polygon class="{cls}" points="{fmt(f)}"/>' for f in (right, front, top))

def line(a, b, cls="d"):
    return f'<line class="{cls}" x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}"/>'

def circle_on(plane, c, r, cls="d", n=48):
    pts = []
    for i in range(n):
        t = 2 * math.pi * i / n
        if plane == "x":
            pts.append(P(c[0], c[1] + r * math.sin(t), c[2] + r * math.cos(t)))
        elif plane == "y":
            pts.append(P(c[0] + r * math.cos(t), c[1], c[2] + r * math.sin(t)))
        else:
            pts.append(P(c[0] + r * math.cos(t), c[1] + r * math.sin(t), c[2]))
    return f'<polygon class="{cls}" points="{fmt(pts)}"/>'

parts = {}
anchors = {}

EXPLODE = 1.7  # how far the parts fly apart

def part(pid, explode, body, anchor):
    explode = tuple(v * EXPLODE for v in explode)
    dx, dy = P(*explode)[0] - P(0, 0, 0)[0], P(*explode)[1] - P(0, 0, 0)[1]
    parts[pid] = (dx, dy, body)
    ax, ay = P(*anchor)
    anchors[pid] = (ax + dx, ay + dy)

# Case shell (stays put) â€“ wireframe with back panel
W, H, D = 230, 280, 110
case = []
case.append(f'<polygon class="case-back" points="{fmt([P(0,0,0),P(W,0,0),P(W,H,0),P(0,H,0)])}"/>')
case.append(f'<polygon class="case-back" points="{fmt([P(0,0,0),P(W,0,0),P(W,0,D),P(0,0,D)])}"/>')
for a, b in [((0,0,0),(0,H,0)),((0,H,0),(W,H,0)),((W,H,0),(W,0,0)),((W,0,0),(0,0,0)),
             ((0,0,D),(W,0,D)),((W,0,D),(W,H,D)),((W,H,D),(0,H,D)),((0,H,D),(0,0,D)),
             ((0,0,0),(0,0,D)),((W,0,0),(W,0,D)),((W,H,0),(W,H,D)),((0,H,0),(0,H,D))]:
    case.append(line(P(*a), P(*b), "case"))
# rear IO slots on back
for i in range(7):
    yy = 70 + i * 12
    case.append(line(P(W, yy, 0), P(W, yy, 0), "d"))

# Motherboard on back plane
mb = box(18, 205, 55, 262, 2, 7)
for (x0, x1, y) in [(30, 110, 240), (30, 80, 228), (130, 200, 80), (40, 190, 100)]:
    mb += line(P(x0, y, 7), P(x1, y, 7), "d")
mb += box(160, 172, 140, 236, 7, 9, "f") + box(176, 188, 140, 236, 7, 9, "f")  # dimm slots
mb += box(40, 190, 116, 122, 7, 10, "f")  # pcie slot
part("placa", (0, 0, -30), mb, (90, 75, 7))

# CPU + tower cooler
cool = box(112, 150, 170, 212, 9, 14)  # socket plate
cool += box(116, 146, 168, 216, 14, 72)
for i in range(1, 10):
    z = 14 + i * 5.8
    cool += line(P(116, 216, z), P(146, 216, z), "d")
    cool += line(P(146, 168, z), P(146, 216, z), "d")
cool += box(146, 152, 166, 218, 20, 66)  # fan frame
cool += circle_on("x", (152, 192, 43), 20)
cool += circle_on("x", (152, 192, 43), 6)
part("cooler", (0, 30, 70), cool, (152, 214, 43))

# RAM sticks
ram = ""
for x in (163, 179):
    ram += box(x, x + 6, 138, 230, 9, 34)
    for k in range(4):
        y0 = 150 + k * 20
        ram += line(P(x + 6, y0, 12), P(x + 6, y0, 30), "d")
part("ram", (0, 60, 40), ram, (185, 228, 22))

# GPU
gpu = box(28, 196, 104, 118, 10, 74)
for cx in (70, 150):
    gpu += circle_on("y", (cx, 118, 42), 26)
    gpu += circle_on("y", (cx, 118, 42), 8)
gpu += box(196, 200, 96, 124, 10, 74)  # bracket
part("gpu", (0, -10, 110), gpu, (70, 118, 68))

# PSU
psu = box(14, 120, 4, 62, 8, 96)
psu += circle_on("y", (67, 62, 52), 30)
psu += circle_on("y", (67, 62, 52), 22)
for i in range(-2, 3):
    psu += line(P(47 + 0, 62, 52 + i * 8), P(87, 62, 52 + i * 8), "d")
part("fuente", (0, -60, 40), psu, (100, 40, 96))

# SSD (2.5")
ssd = box(140, 210, 4, 10, 30, 80)
ssd += line(P(150, 10, 40), P(195, 10, 40), "d")
ssd += box(150, 170, 10, 11, 50, 70, "f")
part("ssd", (40, -50, 50), ssd, (200, 8, 78))

# Front fan
fan = box(-10, 0, 150, 260, 12, 100)
fan += circle_on("x", (0, 205, 56), 44)
fan += circle_on("x", (0, 205, 56), 12)
for k in range(5):
    t = 2 * math.pi * k / 5
    a = P(0, 205 + 14 * math.sin(t), 56 + 14 * math.cos(t))
    b = P(0, 205 + 40 * math.sin(t + 0.6), 56 + 40 * math.cos(t + 0.6))
    fan += line(a, b, "d")
part("gabinete", (-80, 0, 0), fan, (0, 250, 100))

order = ["placa", "fuente", "gpu", "cooler", "ram", "ssd", "gabinete"]

# bounds
import re
xs, ys = [], []
def collect(s, dx=0, dy=0):
    for a, b in re.findall(r"(-?\d+\.\d),(-?\d+\.\d)", s):
        xs.append(float(a) + dx); ys.append(float(b) + dy)
    for m in re.finditer(r'x1="(-?[\d.]+)" y1="(-?[\d.]+)" x2="(-?[\d.]+)" y2="(-?[\d.]+)"', s):
        xs.extend([float(m[1]) + dx, float(m[3]) + dx]); ys.extend([float(m[2]) + dy, float(m[4]) + dy])
collect("".join(case))
for pid in order:
    dx, dy, body = parts[pid]
    collect(body, dx, dy)
minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
pad_l, pad_r, pad_t, pad_b = 36, 96, 34, 30
vb = (minx - pad_l, miny - pad_t, (maxx - minx) + pad_l + pad_r, (maxy - miny) + pad_t + pad_b)

def render():
    """Return (svg_fragment, meta). Each part is drawn at its exploded position;
    meta["offsets"] holds the screen offset back to the assembled position."""
    out = [f'<g class="case-shell">{"".join(case)}</g>']
    for pid in order:
        dx, dy, body = parts[pid]
        out.append(f'<g class="part" data-part="{pid}"><g transform="translate({dx:.1f} {dy:.1f})">{body}</g></g>')
    meta = {
        "viewBox": [round(v, 1) for v in vb],
        "anchors": {k: [round(a, 1), round(b, 1)] for k, (a, b) in anchors.items()},
        "offsets": {k: [round(-parts[k][0], 1), round(-parts[k][1], 1)] for k in order},
        "maxx": round(maxx, 1), "minx": round(minx, 1), "miny": round(miny, 1), "maxy": round(maxy, 1),
    }
    return "\n".join(out), meta

def part_thumb(pid, pad=6):
    """A single part drawn on its own, at its assembled orientation: (viewBox, body)."""
    body = parts[pid][2]
    xs.clear(); ys.clear()
    collect(body)
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    return f"{x0 - pad:.1f} {y0 - pad:.1f} {x1 - x0 + 2 * pad:.1f} {y1 - y0 + 2 * pad:.1f}", body


if __name__ == "__main__":
    frag, meta = render()
    print(json.dumps(meta, indent=1))
