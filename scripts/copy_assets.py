import os
import shutil

src_dir = 'src/assets/extracted_media'
public_dir = 'public/assets'
leadership_dir = os.path.join(public_dir, 'leadership')

os.makedirs(leadership_dir, exist_ok=True)

mappings = {
    'image423.jpg': 'logo.jpg',  # Wide logo aspect ratio
    'image226.png': 'leadership/mahmud-hasan.png',
    'image431.png': 'leadership/rashed-mahmud.png',
    'image375.png': 'leadership/yaseer-mahmud.png',
    'image391.png': 'leadership/aarouni-verma.png',
    'image312.png': 'leadership/uttam-singh.png',
    'image264.png': 'leadership/syed-javed-iqbal.png',
    'image461.jpg': 'leadership/dr-ak-balyan.jpg',
    'image213.png': 'leadership/sc-verma.png'
}

for src_name, dest_name in mappings.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(public_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {src_name} to {dest_path}")
    else:
        print(f"Warning: {src_path} not found.")

print("Asset copying complete.")
