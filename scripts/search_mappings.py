with open('docx_image_mappings.txt', 'r', encoding='utf-8') as f:
    content = f.read()

blocks = content.split('------------------------------------')

target_images = [
    "image226.png",
    "image431.png",
    "image375.png",
    "image391.png",
    "image312.png",
    "image264.png",
    "image461.jpg",
    "image213.png"
]

for block in blocks:
    for img in target_images:
        if f"IMAGE: {img}" in block:
            print(f"\n================ IMAGE: {img} ================")
            print(block.strip())
