import os
import re
import sys
import subprocess

def get_staged_files():
    try:
        res = subprocess.run(
            ["git", "diff", "--cached", "--name-only", "--diff-filter=ACM"],
            capture_output=True,
            text=True,
            check=True
        )
        return [f.strip() for f in res.stdout.splitlines() if f.strip().endswith(".md")]
    except Exception as e:
        print(f"Error getting staged files: {e}")
        sys.exit(1)

def check_file(filepath):
    if not os.path.exists(filepath):
        return None
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return f"Error reading: {e}"

    if not content.startswith("---"):
        return None  # No frontmatter block detected at start

    lines = content.splitlines()
    yaml_end = -1
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            yaml_end = idx
            break

    if yaml_end == -1:
        return "Orphaned '---' at line 1 (no closing '---' found)"

    yaml_lines = lines[1:yaml_end]
    if not yaml_lines:
        return "Empty frontmatter block"

    for idx, line in enumerate(yaml_lines, start=2):
        stripped = line.strip()
        if not stripped:
            continue
        
        # Detect markdown headings inside frontmatter
        if stripped.startswith("##") or (stripped.startswith("#") and len(stripped) > 1 and stripped[1] != " "):
            return f"Contains markdown-like heading on line {idx} inside frontmatter"
            
        # Detect other markdown syntax inside frontmatter
        if stripped.startswith("|") or stripped.startswith("- ") or stripped.startswith("* ") or re.match(r"^\d+\.\s+", stripped):
            return f"Contains markdown syntax (table, list, etc.) on line {idx} inside frontmatter"

        # Detect non-YAML properties
        if not re.match(r'^[a-zA-Z0-9_-]+:\s*.*$', stripped):
            return f"Line {idx} does not look like a YAML property: '{stripped}'"

    return None

def main():
    staged_files = get_staged_files()
    errors = []
    
    for file in staged_files:
        err = check_file(file)
        if err:
            errors.append((file, err))
            
    if errors:
        print("\n[PRE-COMMIT ERROR] Malformed markdown frontmatter detected:")
        for file, err in errors:
            print(f"  - {file}: {err}")
        print("\nPlease fix these formatting issues or remove the erroneous frontmatter markers before committing.\n")
        sys.exit(1)
        
    sys.exit(0)

if __name__ == "__main__":
    main()
