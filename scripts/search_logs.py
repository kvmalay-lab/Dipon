import json

log_path = r'C:\Users\Kvmal\.gemini\antigravity\brain\3adba2b4-afdd-485f-8d98-da8942a5a2eb\.system_generated\logs\transcript.jsonl'

print("Extracting full messages from d5c351c4-f5b0-4da0-81ba-c56abd34bfae...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            # check if it is a message from the sender or mentions it
            if 'd5c351c4-f5b0-4da0-81ba-c56abd34bfae' in line and 'content' in data:
                # Let's print the content of the message
                print("====================================")
                print(f"Step: {data.get('step_index')}, Type: {data.get('type')}")
                print(content[:2000]) # Print first 2000 chars of content
                if len(content) > 2000:
                    print("... [TRUNCATED] ...")
                    # search for leadership within the content and print that section
                    idx = content.lower().find('leadership')
                    if idx != -1:
                        print("\n--- LEADERSHIP SECTION ---")
                        print(content[idx:idx+2000])
        except Exception as e:
            pass
