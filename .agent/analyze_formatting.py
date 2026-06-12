import os
import re

base_dir = r"y:\Documents\Obsidian\zettelkasten"

results = {
    "escaped_dates": [],
    "double_spaced_lists": [],
    "empty_headings": [],
    "unresolved_meta_tags": [],
    "org_properties_or_drawers": [],
    "inline_tags_with_dollar": [],
    "colon_tags": []
}

def analyze_file(filepath):
    rel_path = os.path.relpath(filepath, base_dir)
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    lines = content.splitlines()
    
    # 1. Check for escaped dates in YAML frontmatter
    # E.g. date: "\[2023-12-05 Tue 05:40\]" or similar
    in_yaml = False
    for line in lines:
        if line.strip() == "---":
            in_yaml = not in_yaml
            continue
        if in_yaml:
            if line.startswith("date:") and ("\\[" in line or "\\]" in line or "\\[" in line):
                results["escaped_dates"].append((rel_path, line))
                
    # 2. Check for double-spaced lists
    # E.g. consecutive list items separated by exactly one blank line, repeatedly
    list_lines = []
    for idx, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("- ") or stripped.startswith("* ") or re.match(r"^\d+\.\s+", stripped):
            list_lines.append(idx)
            
    if len(list_lines) > 2:
        # Check if they are consistently separated by blank lines
        double_spaced_count = 0
        total_checks = 0
        for i in range(len(list_lines) - 1):
            curr_idx = list_lines[i]
            next_idx = list_lines[i+1]
            # If they are separated by 2 lines (i.e. next_idx - curr_idx == 2)
            # and the line in between is blank, it's double spaced list items
            if next_idx - curr_idx == 2:
                if lines[curr_idx + 1].strip() == "":
                    double_spaced_count += 1
            total_checks += 1
            
        if total_checks > 0 and (double_spaced_count / total_checks) > 0.5:
            results["double_spaced_lists"].append((rel_path, f"{double_spaced_count}/{total_checks} list items double-spaced"))

    # 3. Check for empty headings (headings followed directly by another heading or EOF)
    for idx, line in enumerate(lines):
        if line.startswith("#"):
            # find next non-empty line
            next_non_empty = None
            for j in range(idx + 1, len(lines)):
                if lines[j].strip() != "":
                    next_non_empty = lines[j]
                    break
            if next_non_empty is None or next_non_empty.startswith("#"):
                results["empty_headings"].append((rel_path, line))

    # 4. Check for inline tag format with dollar: [[$tag]]
    meta_tags_found = re.findall(r"\[\[\$[^\]]+\]\]", content)
    if meta_tags_found:
        results["inline_tags_with_dollar"].append((rel_path, list(set(meta_tags_found))))

    # 5. Check for org properties, drawers, or leftover org markup
    # e.g. :PROPERTIES:, :END:, :drawer:, #+title, :tech: at the start of lines
    for line in lines:
        stripped = line.strip()
        if stripped in [":PROPERTIES:", ":END:"]:
            results["org_properties_or_drawers"].append((rel_path, line))
        elif stripped.startswith("#+") and not stripped.startswith("#"):
            results["org_properties_or_drawers"].append((rel_path, line))
        elif re.match(r"^:[a-zA-Z0-9_-]+:$", stripped):
            results["colon_tags"].append((rel_path, line))
        elif re.match(r"^:[a-zA-Z0-9_-]+:\s+", stripped):
            # e.g. :tech: some value
            results["org_properties_or_drawers"].append((rel_path, line))

# Walk the workspace
for root, dirs, files in os.walk(base_dir):
    if any(ignore in root for ignore in [".git", ".obsidian", ".agent", "garden"]):
        continue
    for file in files:
        if file.endswith(".md"):
            analyze_file(os.path.join(root, file))

# Print summary
print("--- ANALYSIS SUMMARY ---")
for key, items in results.items():
    print(f"\n{key.upper()}: {len(items)} issues found")
    # print top 10 examples
    for item in items[:10]:
        print(f"  - {item[0]}: {item[1]}")
    if len(items) > 10:
        print(f"  ... and {len(items) - 10} more")
