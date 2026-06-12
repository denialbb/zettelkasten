import os
import re
import sys

base_dir = r"y:\Documents\Obsidian\zettelkasten"

def compact_whitespace(text):
    # Split into lines
    lines = text.splitlines()
    
    # 1. Remove leading and trailing empty lines
    while lines and lines[0].strip() == "":
        lines.pop(0)
    while lines and lines[-1].strip() == "":
        lines.pop()
        
    # 2. Collapse multiple consecutive empty lines to a single empty line
    collapsed = []
    for line in lines:
        if line.strip() == "":
            if not collapsed or collapsed[-1].strip() != "":
                collapsed.append("")
        else:
            collapsed.append(line)
    lines = collapsed

    # Helper function to check if a line is a list item
    def is_list_item(l):
        s = l.lstrip()
        return s.startswith("- ") or s.startswith("* ") or bool(re.match(r"^\d+\.\s+", s))

    # 3. Remove empty lines between list items or list item contents
    final_lines = []
    i = 0
    while i < len(lines):
        if lines[i].strip() == "" and i > 0 and i < len(lines) - 1:
            prev_line = final_lines[-1]
            next_line = lines[i+1]
            
            if is_list_item(prev_line):
                # If next_line is also a list item or starts with space (indented sub-content/sub-item)
                if is_list_item(next_line) or next_line.startswith(" ") or next_line.startswith("\t"):
                    # Skip this empty line
                    i += 1
                    continue
        final_lines.append(lines[i])
        i += 1
        
    return "\n".join(final_lines) + "\n"

def process_content(content):
    lines = content.splitlines()
    
    # Parse YAML frontmatter boundary
    yaml_start_idx = -1
    yaml_end_idx = -1
    
    for idx, line in enumerate(lines):
        if line.strip() == "---":
            if yaml_start_idx == -1:
                yaml_start_idx = idx
            else:
                yaml_end_idx = idx
                break
                
    yaml_lines = []
    body_lines = []
    
    if yaml_start_idx != -1 and yaml_end_idx != -1:
        yaml_lines = lines[yaml_start_idx+1:yaml_end_idx]
        body_lines = lines[yaml_end_idx+1:]
    else:
        body_lines = lines

    # 1. Parse existing tags in YAML
    existing_tags = []
    tags_line_idx = -1
    for idx, line in enumerate(yaml_lines):
        if line.strip().startswith("tags:"):
            tags_line_idx = idx
            m = re.search(r'tags:\s*\[(.*?)\]', line)
            if m:
                existing_tags = [t.strip() for t in m.group(1).split(",") if t.strip()]
            else:
                # format tags: tag1, tag2
                parts = line.split(":", 1)[1]
                existing_tags = [t.strip() for t in parts.split(",") if t.strip()]
            break

    # 2. Process body lines for colon tags and properties
    new_body_lines = []
    extracted_tags = []
    
    for line in body_lines:
        stripped = line.strip()
        
        # Case A: Standalone colon tag like :informatica:
        m_standalone = re.match(r"^:([a-zA-Z0-9_-]+):$", stripped)
        if m_standalone:
            tag_name = m_standalone.group(1).lower()
            extracted_tags.append(tag_name)
            continue
            
        # Case B: Property colon tag like :tech: A [[Emacs]] package...
        m_prop = re.match(r"^:([a-zA-Z0-9_-]+):\s*(.+)$", stripped)
        if m_prop:
            prop_name = m_prop.group(1).lower()
            prop_content = m_prop.group(2)
            extracted_tags.append(prop_name)
            
            # Find the indentation of the original line to preserve it
            indent = line[:len(line) - len(line.lstrip())]
            new_body_lines.append(f"{indent}- **{prop_name}**: {prop_content}")
            continue
            
        new_body_lines.append(line)

    # 3. Replace inline [[$tag]] with #tag in body lines
    final_body = []
    for line in new_body_lines:
        updated_line = re.sub(r'\[\[\$([a-zA-Z0-9_-]+)\]\]', r'#\1', line)
        final_body.append(updated_line)

    # 4. Merge tags
    all_tags = list(existing_tags)
    for tag in extracted_tags:
        if tag not in all_tags:
            all_tags.append(tag)
            
    # 5. Process YAML lines for date conversion and omit existing tags line
    new_yaml_lines = []
    for line in yaml_lines:
        m_date = re.match(r'^(date:\s*)"\\+\[(\d{4}-\d{2}-\d{2})(?:\s+[a-zA-Z]+)?(?:\s+(\d{2}:\d{2}))?\\+\]"', line)
        if m_date:
            prefix = m_date.group(1)
            date_part = m_date.group(2)
            time_part = m_date.group(3)
            if time_part:
                new_yaml_lines.append(f"{prefix}{date_part} {time_part}")
            else:
                new_yaml_lines.append(f"{prefix}{date_part}")
        elif line.strip().startswith("tags:"):
            continue
        else:
            new_yaml_lines.append(line)

    # Insert updated tags block
    if all_tags:
        all_tags.sort()
        new_yaml_lines.append(f"tags: [{', '.join(all_tags)}]")

    # Reconstruct document
    new_content = ""
    if yaml_start_idx != -1 and yaml_end_idx != -1:
        new_content += "---\n"
        for yl in new_yaml_lines:
            new_content += yl + "\n"
        new_content += "---\n"
        
    new_content += "\n".join(final_body)
    
    # 6. Run whitespace compaction
    new_content = compact_whitespace(new_content)
    
    return new_content

def main():
    dry_run = "--dry-run" in sys.argv
    files_processed = 0
    files_modified = 0
    
    for root, dirs, files in os.walk(base_dir):
        if any(ignore in root for ignore in [".git", ".obsidian", ".agent", "garden"]):
            continue
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, base_dir)
                
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        original_content = f.read()
                except Exception as e:
                    print(f"Error reading {rel_path}: {e}")
                    continue
                    
                new_content = process_content(original_content)
                files_processed += 1
                
                if new_content != original_content:
                    files_modified += 1
                    if dry_run:
                        if files_modified <= 5:
                            print(f"\n[DRY RUN] Would modify: {rel_path}")
                            # Print a brief diff or summary of changes
                            print("Original:")
                            print("\n".join(original_content.splitlines()[:15]))
                            print("---")
                            print("Modified:")
                            print("\n".join(new_content.splitlines()[:15]))
                            print("="*40)
                    else:
                        try:
                            with open(filepath, "w", encoding="utf-8") as f:
                                f.write(new_content)
                        except Exception as e:
                            print(f"Error writing {rel_path}: {e}")
                            
    print(f"\nFinished. Processed {files_processed} files. Modified {files_modified} files.")

if __name__ == "__main__":
    main()
