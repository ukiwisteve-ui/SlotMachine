"""Cut a character off a flat grey background and save a web-sized transparent PNG.
Usage: python3 tools/cutout.py art-src/vex.png www/art/vex.webp [size] [pockets]
"pockets" also clears enclosed grey gaps (use for blobby shapes; it can eat grey teeth or metal)."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
size = int(sys.argv[3]) if len(sys.argv) > 3 else 512
im = Image.open(src).convert('RGB')
a = np.asarray(im.filter(ImageFilter.GaussianBlur(2.5))).astype(int)  # blur hides the paper texture in the grey
bg = np.median(np.concatenate([a[:8].reshape(-1, 3), a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)]), axis=0)
dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
sat = a.max(axis=2) - a.min(axis=2)
val = a.mean(axis=2)
near = (sat < 18) & (val > 60) & (val < 185)  # any flat grey, so a lighter vignette in the middle still counts
if 'checker' in sys.argv[4:]:  # fake transparency squares from AI tools are darker greys
    near = (sat < 14) & (val > 34) & (val < 120)
if 'glow' in sys.argv[4:]:  # also clear a soft coloured halo around the subject
    near |= (sat < 70) & (val > 60) & (val < 175)
h, w = near.shape
# Grow from every border pixel through connected grey so only background touching the edge is removed.
reach = np.zeros_like(near)
reach[0, :] = near[0, :]; reach[-1, :] = near[-1, :]; reach[:, 0] = near[:, 0]; reach[:, -1] = near[:, -1]
while True:
    g = reach.copy()
    g[1:] |= reach[:-1]; g[:-1] |= reach[1:]; g[:, 1:] |= reach[:, :-1]; g[:, :-1] |= reach[:, 1:]
    g &= near
    if (g == reach).all(): break
    reach = g
# Also drop enclosed pockets of background (gaps between drips or arms) if they are big and match the edge grey.
from collections import deque
rest = near & ~reach
seen = np.zeros_like(rest)
edge_val = val[reach].mean()
pockets = 'pockets' in sys.argv[4:]
for y0, x0 in (zip(*np.nonzero(rest[::3, ::3])) if pockets else []):
    y0 *= 3; x0 *= 3
    if seen[y0, x0] or not rest[y0, x0]: continue
    comp = []; q = deque([(y0, x0)]); seen[y0, x0] = True
    while q:
        y, x = q.popleft(); comp.append((y, x))
        for ny, nx in ((y+1, x), (y-1, x), (y, x+1), (y, x-1)):
            if 0 <= ny < h and 0 <= nx < w and rest[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True; q.append((ny, nx))
    if len(comp) > 1500:
        ys, xs = zip(*comp)
        if abs(val[ys, xs].mean() - edge_val) < 12 and sat[ys, xs].mean() < 8:
            reach[ys, xs] = True
alpha = np.where(reach, 0, 255).astype(np.uint8)
al = Image.fromarray(alpha, 'L').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
out = im.convert('RGBA'); out.putalpha(al)
out = out.resize((size, size), Image.LANCZOS)
out.save(dst, quality=88, method=6) if dst.endswith('.webp') else out.save(dst, optimize=True)
print('saved', dst, out.size)
