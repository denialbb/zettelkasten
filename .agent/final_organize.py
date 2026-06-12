import os
import shutil

base_dir = r"y:\Documents\Obsidian\zettelkasten"
index_dir = os.path.join(base_dir, "000 index")

new_cats = ["philosophy", "pkm_and_productivity"]
for cat in new_cats:
    os.makedirs(os.path.join(base_dir, cat), exist_ok=True)

philosophy_kw = ["Pragmatism", "Pragmaticism", "Rationality", "Skepticism", "Deconstruction", "Empiricism", "Apocalittici e Integrati", "Vestigia", "La condanna", "La variante di Luneburg", "Logocentrism", "Phallocentrism", "Philosophy", "Ethics", "Type Theory", "Separation Logic", "Semantic Web"]
pkm_kw = ["Smart Notes", "PKM", "Zettelkasten", "Productivity", "Literate Programming", "Work with the garage door up", "Learn In Public", "Note Taking", "Notes", "Braindump", "Time Management", "Effective Editing"]
programming_kw = ["REST", "SOA", "SOAP", "SPARQL", "UDDI", "WSDL", "Web Development", "Unix", "SO", "Microkernel", "Queueing", "Packet", "Network", "Architecture", "Git", "git"]
concepts_kw = ["Quantum", "QuBit", "Algorithm", "Theory", "Effect", "Paradox", "Bias"] # broad net for concepts

unmapped = []
moved = 0

if os.path.exists(index_dir):
    for file in os.listdir(index_dir):
        if not file.endswith(".md"): continue
        
        dest = None
        if any(k.lower() in file.lower() for k in philosophy_kw): dest = "philosophy"
        elif any(k.lower() in file.lower() for k in pkm_kw): dest = "pkm_and_productivity"
        elif any(k.lower() in file.lower() for k in programming_kw): dest = "programming"
        elif any(k.lower() in file.lower() for k in concepts_kw): dest = "concepts"
        elif len(file) > 40: dest = "articles" # Long sentences are usually articles or statements
        else: dest = "concepts" # Fallback everything else to concepts
        
        if dest:
            shutil.move(os.path.join(index_dir, file), os.path.join(base_dir, dest, file))
            moved += 1

print(f"Moved {moved} files in final sweep.")
