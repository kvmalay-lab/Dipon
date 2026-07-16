import os
from PIL import Image

media_dir = 'src/assets/extracted_media'
files = os.listdir(media_dir)
print(f"Analyzing {len(files)} files...")

results = []
for file in files:
    path = os.path.join(media_dir, file)
    try:
        with Image.open(path) as img:
            w, h = img.size
            ratio = w / h
            results.append({
                'name': file,
                'width': w,
                'height': h,
                'ratio': ratio,
                'size': os.path.getsize(path)
            })
    except Exception as e:
        pass

# Sort by width / height ratio
print("\n--- Potential Logos (Wide aspect ratio, e.g. ratio > 2.0) ---")
wide = [r for r in results if r['ratio'] > 2.0 and r['width'] > 100]
wide.sort(key=lambda x: x['ratio'], reverse=True)
for r in wide[:15]:
    print(f"Name: {r['name']}, Size: {r['width']}x{r['height']} (Ratio: {r['ratio']:.2f}), File Size: {r['size']} bytes")

print("\n--- Potential Portrait Photos (e.g. 0.6 < ratio < 0.9) ---")
portraits = [r for r in results if 0.5 < r['ratio'] < 0.95 and r['width'] > 100]
portraits.sort(key=lambda x: x['size'], reverse=True)
for r in portraits[:25]:
    print(f"Name: {r['name']}, Size: {r['width']}x{r['height']} (Ratio: {r['ratio']:.2f}), File Size: {r['size']} bytes")
