# Deep Dive: PCFG, parent annotation e PARSEVAL

> Companion di `notes.md` (§4, §6). Fonte: `lezione-04-Syntax02-TLN-INFO-2526.pdf`.

## 1. PCFG: definizioni

Ogni produzione `A -> alpha` ha `P(A -> alpha)`, `SUM_alpha P = 1` per ogni A.

```
P(albero T) = PROD_{produzioni in T} P(regola)
P(frase w)  = SUM_{T yield w} P(T)
```

MLE da treebank: `P(A->alpha) = C(A->alpha) / C(A)`. Parsing del migliore: CKY con max
(PCKY). Probabilita' della frase (somma): algoritmo inside.

## 2. Perche' la PCFG ingenua fallisce

Esempio: `P(NP -> Det N)` identica per soggetto e oggetto, ma in realta' le distribuzioni
differiscono (pronomi come soggetti, nomi pieni come oggetti). Stesso per PP attachment:
`VP -> V NP PP` vs `NP -> NP PP` con probabilita' fisse ignorano il lessico (*vede con telescopio*
vs *uomo con cappello*).

## 3. Rimedi

- **Parent annotation**: `NP^S` vs `NP^VP` (Johnson 1998): split automatici che migliorano
  molto con poco costo; troppi split -> smoothing (Petrov: split-and-merge EM).
- **Lessicalizzazione** (Collins/Charniak): teste lessicali su ogni nodo; backoff
  P(testa|...) per lo sparsity. Risolve il PP attachment lessicale.
- **Latent annotation**: categorie nascoste apprese (PCFG-LA di Petrov).

## 4. PARSEVAL in pratica

Gold: `(S (NP Maria) (VP vede (NP il cane)))`. Parse con NP sbagliato su `vede il`:
un bracket in piu' (precision giu') e uno mancante (recall giu'). F1 = 2PR/(P+R).
Si ignorano POS tag e punteggiatura; i crossing bracket (parentesi incrociate) sono l'errore
peggiore perche' nessun albero li contiene.

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_cky.md`, `deepdive_dependency_parsing.md`.
*Libri:* JM cap. constituency parsing; NLTK cap. 8.
