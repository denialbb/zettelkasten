import os
import shutil

base_dir = r"y:\Documents\Obsidian\zettelkasten"
index_dir = os.path.join(base_dir, "000 index")

new_categories = ["hardware", "sociology", "tools", "ai", "security", "privacy_ethics", "space"]
for cat in new_categories:
    os.makedirs(os.path.join(base_dir, cat), exist_ok=True)

hardware_kw = ["ALU", "Adder", "IA-32", "RAM", "Multiplexer", "Microarchitecture", "ISA", "Switches", "Circuiti", "Comparatori", "Decoder", "Shifter", "Mic-1", "Macchine a Rotori", "QuBit"]
sociology_kw = ["Consumer Culture", "Equality", "Eugenetics", "Tragedy of the Commons", "Ur-Fascismo", "Schiavitù", "Social Justice", "Gender", "Middle Income Trap", "Pay Gap", "Anti-work", "Capitalists", "Common Carrier", "Creative Destruction"]
tools_kw = ["Emacs", "org-mode", "org-roam", "org-capture", "Hugo", "NixOS", "nix", "Ricing", "GitWatch", "QMK", "rofi", "zathura", "bspwm", "NotDeft", "Screenshot", "Shortcuts in Ranger"]
ai_kw = ["Apprendimento", "ChatGPT", "LLM", "NLP", "Stochastic Parrot", "Transformer", "Neural Network", "Hopfield", "Boltzmann", "ChatBot", "Data Mining", "OpenAI", "ELIZA", "Machine", "Atoms of recognition", "Winograd", "Deep Belief"]
security_kw = ["Encrytion", "Encryption", "Vernam", "Diffusione e Confusione", "RSA", "Hash Algorithm", "Cybersecurity", "One-time Pad", "Crittanalisi", "Digital Envelope", "Diffie-Hellman", "Vulnerabilities"]
privacy_kw = ["Privacy", "Data Protection", "GDPR", "k-Anonymity", "l-Diversity", "Personal-sensitive", "monopoly", "Dataification", "Data that is shared", "Data treatment", "DuckDuckGo"]
space_kw = ["Artemis", "Shenzhou", "Tiangong", "Space Launch", "Moon", "ISS"]

unmapped = []
moved = 0

if os.path.exists(index_dir):
    for file in os.listdir(index_dir):
        if not file.endswith(".md"): continue
        
        dest = None
        if any(k in file for k in hardware_kw): dest = "hardware"
        elif any(k in file for k in sociology_kw): dest = "sociology"
        elif any(k in file for k in tools_kw): dest = "tools"
        elif any(k in file for k in ai_kw): dest = "ai"
        elif any(k in file for k in security_kw): dest = "security"
        elif any(k in file for k in privacy_kw): dest = "privacy_ethics"
        elif any(k in file for k in space_kw): dest = "space"
        
        if dest:
            shutil.move(os.path.join(index_dir, file), os.path.join(base_dir, dest, file))
            moved += 1
        else:
            unmapped.append(file)

print(f"Moved {moved} files into new categories.")
with open(os.path.join(base_dir, ".agent", "unmapped.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(unmapped))
print("Remaining unmapped files saved to unmapped.txt")
