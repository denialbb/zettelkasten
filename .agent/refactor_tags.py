import os
import re
import shutil

base_dir = r"y:\Documents\Obsidian\zettelkasten"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    modified = False
    meta_tags = []
    
    new_lines = []
    for line in lines:
        if line.lower().startswith("- tags:"):
            # extract links
            links = re.findall(r'\[\[(.*?)\]\]', line)
            
            related = []
            for link in links:
                if link.startswith("$"):
                    meta_tags.append(link[1:]) # remove $
                else:
                    related.append(f"[[{link}]]")
            
            if related:
                new_lines.append("- Related: " + ", ".join(related) + "\n")
            modified = True
        else:
            new_lines.append(line)
            
    if not modified:
        return
        
    if meta_tags:
        if new_lines and new_lines[0].startswith("---"):
            # Has YAML frontmatter
            yaml_end = -1
            for i in range(1, len(new_lines)):
                if new_lines[i].startswith("---"):
                    yaml_end = i
                    break
            
            if yaml_end != -1:
                # Find if tags: already exists
                tags_line_idx = -1
                existing_tags = []
                for i in range(1, yaml_end):
                    if new_lines[i].startswith("tags:"):
                        tags_line_idx = i
                        m = re.search(r'\[(.*?)\]', new_lines[i])
                        if m and m.group(1).strip():
                            existing_tags = [t.strip() for t in m.group(1).split(',')]
                        break
                
                # Merge tags
                for t in meta_tags:
                    if t not in existing_tags:
                        existing_tags.append(t)
                
                if tags_line_idx != -1:
                    new_lines[tags_line_idx] = f"tags: [{', '.join(existing_tags)}]\n"
                else:
                    new_lines.insert(yaml_end, f"tags: [{', '.join(existing_tags)}]\n")
        else:
            # No YAML frontmatter
            yaml_block = ["---\n", f"tags: [{', '.join(meta_tags)}]\n", "---\n", "\n"]
            new_lines = yaml_block + new_lines
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

processed = 0
for root, dirs, files in os.walk(base_dir):
    if any(ignore in root for ignore in [".git", ".obsidian", ".agent", "tags"]):
        continue
    for file in files:
        if file.endswith(".md"):
            process_file(os.path.join(root, file))
            processed += 1

print(f"Processed {processed} files for tag refactoring.")

tags_dir = os.path.join(base_dir, "tags")
if os.path.exists(tags_dir):
    shutil.rmtree(tags_dir)
    print("Deleted 'tags' directory.")
