import os
import shutil

base_dir = r"y:\Documents\Obsidian\zettelkasten"
index_dir = os.path.join(base_dir, "000 index")

categories = ["articles", "blogs", "books", "concepts", "flight", "games", "people", "programming", "tags", "university", "videos"]

university_keywords = ["Architettura", "Basi di Dati", "Calcolabilità", "Complessità", "Economia", "Fisica", "Elementi di", "Sicurezza Reti", "Sviluppo Software", "Tecnologie del Linguaggio", "Metodi Formali", "Ottimizzazione", "Ricerca Operativa", "Programmazione II", "Progetto", "Analisi Semantica", "Automa", "Parser", "Crittanalisi", "Reti Neurali", "Macchine a Rotori", "Algoritmo di Dijkstra", "Cammini Minimi", "Corrispondenza di Post", "Configurazione di una TM", "Grafi", "Circuiti", "Compilazione", "Binding Dinamico"]
programming_keywords = ["C.md", "C++.md", "C Sharp.md", "Python.md", "Go.md", "Rust.md", "Ruby.md", "SQL.md", "Java", "Haskell", "Adapter", "Builder", "Factory", "Singleton", "Decorator", "Facade", "Command", "Observer", "Strategy", "Visitor", "Composite", "Iterator", "Proxy", "State", "Template", "Memento", "Flyweight", "Chain of Responsibility", "Double-check Locking", "Lazy Initialization"]
games_keywords = ["Detroit-", "Doki Doki", "The Last of Us", "Obra Dinn", "Metal Gear", "Scacchi", "Hunter x Hunter", "Planetes", "Doom"]
people_keywords = ["George R.R. Martin", "John McCarthy", "David Hume", "Wittgenstein", "Taleb", "Plutarco", "Magritte", "Nabokov", "Borges", "Sartre", "D.H.Lawrence", "D.S. Chapman", "Elinor Ostrom", "J.L. Austin", "Jean-Paul Sartre", "Percy Bysshe Shelley"]
books_keywords = ["Sapiens", "Divina Commedia", "Thinking Fast and Slow", "Homo Deus", "Fahrenheit", "Weapons of Math Destruction", "The Origins of Totalitarianism", "The Shadow of the Torturer"]

unmapped = []
moved = 0

if os.path.exists(index_dir):
    for file in os.listdir(index_dir):
        if not file.endswith(".md"): continue
        
        dest = None
        if any(k in file for k in university_keywords): dest = "university"
        elif any(k in file for k in programming_keywords): dest = "programming"
        elif any(k in file for k in games_keywords): dest = "games"
        elif any(k in file for k in people_keywords): dest = "people"
        elif any(k in file for k in books_keywords): dest = "books"
        
        if dest:
            shutil.move(os.path.join(index_dir, file), os.path.join(base_dir, dest, file))
            moved += 1
        else:
            unmapped.append(file)

for root_file in ["ATA Weapons.md", "ATG Weapons.md", "f16a_mlu.tif"]:
    p = os.path.join(base_dir, root_file)
    if os.path.exists(p):
        shutil.move(p, os.path.join(base_dir, "flight", root_file))

print(f"Moved {moved} files.")
agent_dir = os.path.join(base_dir, ".agent")
os.makedirs(agent_dir, exist_ok=True)
with open(os.path.join(agent_dir, "unmapped.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(unmapped))
print("Unmapped files saved to unmapped.txt")
