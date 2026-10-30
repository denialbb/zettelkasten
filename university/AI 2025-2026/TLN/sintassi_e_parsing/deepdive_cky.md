# Deep Dive: CKY passo passo (con esempio)

> Companion di `notes.md` (§3). Fonte: `lezione-04-Syntax02-TLN-INFO-2526.pdf`.

## 1. Prerequisito: grammatica in CNF

```
S  -> NP VP
NP -> Det N | PROPN
VP -> V NP
Det -> il | la
N   -> cane | gatto
V   -> vede
PROPN -> Maria
```

Frase: `Maria vede il cane` (n = 4).

## 2. Tabella

Riga = inizio span, colonna = fine span. Diagonale (span 1):

```
T[1,1] = {PROPN}   T[2,2] = {V}   T[3,3] = {Det}   T[4,4] = {N}
```

Span 2: `Maria vede` (1,2): nessuno split combina PROPN+V. `vede il` (2,3): V+Det: nessuna
produzione. `il cane` (3,4): Det+N -> **NP** via NP -> Det N. Quindi T[3,4] = {NP}.

Span 3: (1,3): split 1|2,3 e 1-2|3: niente. (2,4): split 2|3,4: V + NP -> **VP** via VP -> V NP.
Quindi T[2,4] = {VP}.

Span 4: (1,4): split 1|2,4: PROPN + VP -> niente (S vuole NP VP, PROPN non e' NP in questa
mini-grammatica!); split 1-2|3,4 e 1-3|4: niente. La frase e' **rifiutata**: manca NP -> PROPN.
Aggiungendo `NP -> PROPN`, lo split 1|2,4 da' **S**. Lezione: la copertura lessicale decide.

Diagramma (descritto): triangolo con diagonale lessicale in basso; ogni cella combina le due
sotto-celle dello split; le frecce di backpointer risalgono fino a S in cima.

## 3. Complessita'

Span O(n^2) x split O(n) x produzioni |P| -> O(n^3 * |P|). Con grammatica lessicalizzata |P|
esplode: si indicizzano le produzioni per figlia destra/sinistra.

## 4. Dal riconoscimento al parse

- Riconoscimento: basta l'esistenza di S in T[1,n].
- Un albero: backpointer (prima derivazione trovata — come nel progetto 2).
- Tutti gli alberi: foresta condivisa (packed forest) con puntatori multipli.
- Albero migliore: PCKY con max delle probabilita' (cfr. `deepdive_pcfg_parseval.md`).

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_pcfg_parseval.md`.
