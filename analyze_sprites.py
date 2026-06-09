import os, json
from PIL import Image

d = "Images/Shinys"
out = {}
for fn in sorted(os.listdir(d)):
    if not fn.lower().endswith((".png", ".gif", ".webp")):
        continue
    p = os.path.join(d, fn)
    try:
        im = Image.open(p).convert("RGBA")
    except Exception as e:
        print("skip", fn, e); continue
    w, h = im.size
    alpha = im.getchannel("A")
    bbox = alpha.getbbox()  # (l, u, r, lower) of non-zero alpha
    if not bbox:
        continue
    content_bottom = bbox[3]
    bottom_pad = h - content_bottom
    frac = bottom_pad / max(w, h)
    # round to 3 decimals; ignore tiny pads
    frac = round(frac, 3)
    if frac >= 0.012:
        out[fn] = frac

print(json.dumps(out, indent=2, ensure_ascii=False))
print("count:", len(out))
