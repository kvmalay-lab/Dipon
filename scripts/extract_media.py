import zipfile
import os

docx_path = 'DIPROdocument.docx'
output_dir = 'src/assets/extracted_media'

if not os.path.exists(docx_path):
    print(f"Error: {docx_path} does not exist.")
else:
    print(f"Extracting media from {docx_path}...")
    os.makedirs(output_dir, exist_ok=True)
    with zipfile.ZipFile(docx_path, 'r') as zip_ref:
        media_files = [f for f in zip_ref.namelist() if f.startswith('word/media/')]
        print(f"Found {len(media_files)} media files.")
        for file in media_files:
            base_name = os.path.basename(file)
            dest_path = os.path.join(output_dir, base_name)
            with zip_ref.open(file) as source, open(dest_path, 'wb') as target:
                target.write(source.read())
            print(f"Extracted {base_name}")
    print("Extraction complete.")
