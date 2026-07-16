import zipfile
import xml.etree.ElementTree as ET

docx_path = 'DIPROdocument.docx'
output_path = 'docx_image_mappings.txt'

with zipfile.ZipFile(docx_path, 'r') as docx:
    # 1. Read relationships to map rId to image filename
    rels_xml = docx.read('word/_rels/document.xml.rels')
    rels_root = ET.fromstring(rels_xml)
    rid_to_file = {}
    for rel in rels_root.findall('.//{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
        target = rel.attrib.get('Target')
        rid = rel.attrib.get('Id')
        if target and 'media/' in target:
            rid_to_file[rid] = target.split('/')[-1]

    # 2. Read document XML and find text and images in order
    doc_xml = docx.read('word/document.xml')
    doc_root = ET.fromstring(doc_xml)

    current_paragraphs = []
    
    with open(output_path, 'w', encoding='utf-8') as outfile:
        outfile.write(f"Loaded {len(rid_to_file)} media relationships.\n\n")
        
        # We iterate over all elements in the entire document
        for elem in doc_root.iter():
            # Get tag name without namespace
            tag = elem.tag
            if '}' in tag:
                tag = tag.split('}')[-1]
                
            if tag == 'p':
                # It's a paragraph. Let's get its text
                p_text = "".join(node.text for node in elem.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text)
                if p_text.strip():
                    current_paragraphs.append(p_text.strip())
                    if len(current_paragraphs) > 20:
                        current_paragraphs.pop(0)
            
            elif tag == 'blip':
                # It's an image! Let's see the embed attribute
                rid = elem.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                if rid in rid_to_file:
                    image_name = rid_to_file[rid]
                    outfile.write(f"IMAGE: {image_name}\n")
                    outfile.write("CONTEXT:\n")
                    for p in current_paragraphs[-8:]:
                        outfile.write(f"  - {p}\n")
                    outfile.write("------------------------------------\n\n")

print(f"Done. Output saved to {output_path}")
