import os
import re
import sys

base_dir = r"y:\Documents\Obsidian\zettelkasten"

sys.stdout.reconfigure(encoding='utf-8')

def process_footnotes(content):
    # Matches inline footnotes with descriptions
    # e.g., \[fn:heiser The Role...\] or [fn:heiser: The Role...]
    # Group 1: label, Group 2: description
    inline_desc_pattern = r'\\*\[fn:([a-zA-Z0-9_-]+)(?::|\s+)(.*?)\\*\]'
    
    # Matches standalone footnotes without description
    # e.g., \[fn:mresetx\] or [fn:mresetx]
    # Group 1: label
    standalone_pattern = r'\\*\[fn:([a-zA-Z0-9_-]+)\\*\]'
    
    definitions = []
    
    # Find all inline footnotes with description
    matches = list(re.finditer(inline_desc_pattern, content))
    
    # Track existing definitions in the file to avoid duplicates
    existing_defs = set(re.findall(r'^\[\^([a-zA-Z0-9_-]+)\]:', content, re.MULTILINE))
    
    # We replace from back to front to preserve string indices
    new_content = content
    for match in reversed(matches):
        label = match.group(1)
        desc = match.group(2).strip()
        start, end = match.span()
        
        # Replace in text with standard reference
        new_content = new_content[:start] + f"[^{label}]" + new_content[end:]
        
        # Stash definition
        if label not in existing_defs:
            definitions.append(f"[^{label}]: {desc}")
            existing_defs.add(label)
            
    # Now replace standalone footnotes
    # Re-evaluate matches as string length changed
    matches_standalone = list(re.finditer(standalone_pattern, new_content))
    for match in reversed(matches_standalone):
        label = match.group(1)
        start, end = match.span()
        
        # Replace in text
        new_content = new_content[:start] + f"[^{label}]" + new_content[end:]
        
        # If it doesn't exist, create a placeholder definition
        if label not in existing_defs:
            definitions.append(f"[^{label}]: {label}")
            existing_defs.add(label)
            
    # Append definitions to bottom of the file
    if definitions:
        # Strip trailing newlines, then add two newlines, then the definitions
        new_content = new_content.rstrip() + "\n\n" + "\n\n".join(definitions) + "\n"
        
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
                
                if "[fn:" in original_content or r"\[fn:" in original_content:
                    new_content = process_footnotes(original_content)
                    files_processed += 1
                    
                    if new_content != original_content:
                        files_modified += 1
                        if dry_run:
                            print(f"\n[DRY RUN] Would convert footnotes in: {rel_path}")
                            print("Changes:")
                            for line in original_content.splitlines():
                                if "[fn:" in line or r"\[fn:" in line:
                                    print(f"  - Original: {line.strip()}")
                            defs_added = "\n".join(definitions_str for definitions_str in new_content.split("\n\n")[-len(new_content.split("\n\n")):])
                            # just print the added definitions at the end of new_content
                            print(f"  - Added at bottom:\n" + "\n".join(new_content.splitlines()[-len(new_content.splitlines())+len(original_content.splitlines()):]))
                            print("="*40)
                        else:
                            try:
                                with open(filepath, "w", encoding="utf-8") as f:
                                    f.write(new_content)
                                print(f"Converted footnotes in: {rel_path}")
                            except Exception as e:
                                print(f"Error writing {rel_path}: {e}")
                                
    print(f"\nFinished. Modified {files_modified} files.")

if __name__ == "__main__":
    main()
