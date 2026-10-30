# Sintassi e parsing

> Note di studio complete. Fonti: `tln/6 - Parte 1 - Lezione 06/lezione-04-Syntax01-TLN-INFO-2526.pdf` (52 pp.),
> `tln/7 - Parte 1 - Lezione 07/lezione-04-Syntax02-TLN-INFO-2526.pdf` (85 pp.),
> `tln/8 - Parte 1 - Lezione 08/lezione-04-Syntax03-TLN-INFO-2526.pdf` (71 pp.).
> Riferimenti ai capitoli in `tln/references.md`.

---

## 1. Perche' la sintassi e le ambiguita' (Syntax01)

La sintassi descrive **come le parole si combinano** in sintagmi e frasi. Due rappresentazioni:

- **Costituenti**: albero di sintagmi annidati (S -> NP VP; NP -> Det N...). Il costituente e' un gruppo
  che si comporta come unita' (test di sostituzione, movimento, coordinazione).
- **Dipendenze**: grafo di archi testa -> dipendente con etichette (nsubj, obj, det, amod...).
  Piu' vicina ai ruoli semantici; standard Universal Dependencies (UD).

**Ambigue sintattiche** centrali (domande d'esame):

1. **PP attachment**: *Ho visto l'uomo con il telescopio* — il PP *con il telescopio* si attacca al verbo
   (strumento: ho usato il telescopio) o al nome (l'uomo che ha il telescopio)? Classico problema
   risolto statisticamente (preferenze lessicali testa-preposizione-testa).
2. **Ambigue della coordinazione**: *old men and women* — *old* modifica solo *men* o entrambi?
   Struttura `[old [men and women]]` vs `[[old men] and women]`.
3. Altre: attaccamento di relative, portata della negazione, garden path.

## 2. Grammatiche libere dal contesto (CFG)

`G = (N, Sigma, P, S)`: non-terminali, terminali, produzioni, simbolo iniziale.
Esempio giocattolo (stile `simple-sem.fcfg` usata nel corso e nel progetto 2):

```
S   -> NP VP
NP  -> Det N | Det N PP | PROPN
VP  -> V NP | V NP PP | V
PP  -> P NP
Det -> 'il' | 'la' | ...
N   -> 'cane' | 'uomo' | ...
```

- **Derivazione**: riscritture da S; **albero di derivazione** = struttura; **frase** = foglie.
- Grammatica **ambigua** se una frase ha due alberi (PP attachment = due derivazioni!).
- **Forma normale di Chomsky (CNF)**: produzioni solo `A -> B C` o `A -> w`. Ogni CFG si converte
  in CNF (binarizzazione + eliminazione epsilon/unitarie). Il progetto 2 chiede di costruire G1
  direttamente in CNF ispirandosi a `simple-sem.fcfg`.
- **Weak vs strong equivalence**: stessa lingua generata vs stessi alberi assegnati.

## 3. CKY (Syntax02, domanda d'esame)

**Algoritmo CKY** (Cocke-Kasami-Younger): parsing bottom-up per grammatiche in CNF, DP sulla tabella
triangolare `T[i,j]` = non-terminali che derivano la sottostringa `w_i..w_j`.

```
per i:            T[i,i] = { A : A -> w_i }
per lunghezza 2..n:
  per i, per k in [i, j):
    se B in T[i,k], C in T[k+1,j] e A -> B C: aggiungi A a T[j... ] (T[i,j])
accetta se S in T[1,n]
```

- **Complessita': O(n^3 * |P|)** (domanda d'esame: cubica in N, lunghezza dell'input).
- Con backpointer si ricostruisce l'albero (o la foresta di tutti gli alberi).
- Versione probabilistica: **PCKY** con `P(A -> B C)` e max invece di esistenza (cfr. §4).

**Anatomia di un parser** (domanda d'esame): componenti tipiche — grammatica, lessico/tag,
strategia di ricerca (bottom-up/top-down), tabella/chart (memoization), disambiguazione
(probabilita' o euristiche), valutazione.

## 4. PCFG (domanda d'esame)

**Probabilistic CFG**: ogni produzione ha `P(A -> alpha)`, con somma 1 per ogni testa A.
Probabilita' di un albero = prodotto delle produzioni usate; di una frase = somma su tutti gli alberi.
Stima MLE da treebank (conteggi). Parsing: CKY probabilistico (max) o inside-outside (EM per
grammatiche non annotate). Problema: indipendenza contestuale troppo forte (una NP soggetto come
una NP oggetto) -> **parent annotation / lexicalization** (Collins, Charniak).

## 5. Parsing a dipendenze (Syntax03)

Cinque algoritmi per il parsing delle dipendenze (domanda d'esame: elencare i 5):

1. **Chart Eisner** (projective, DP O(n^3)).
2. **MST / graph-based** (McDonald: maximum spanning tree su grafo completo, non-projective).
3. **Transition-based arc-standard / arc-eager** (MALT, Nivre: shift-reduce con classificatore, lineare).
4. **Transition-based con beam / stack-LSTM** (estensioni neurali con ricerca).
5. **Doubly-projective / pseudo-projective** o **biaffine neurale** (Dozat-Manning: scorer biaffine
   su BiLSTM, stato dell'arte pre-LLM).

**Transition-Based Parser / MALT** (domanda d'esame: come funziona?):
sistema a stati (stack, buffer, archi) + azioni (SHIFT, LEFT-ARC, RIGHT-ARC, REDUCE);
un classificatore (SVM/MLP) predice l'azione dallo stato; parsing lineare greedy (o con beam).
Esempio: *I Jedi non possono avere figli* -> `avere -nsubj-> Jedi`, `Jedi -det-> I`, `avere -obj-> figli`
(slide del progetto 3.A: cercare regolarita' con udpipe/spaCy/Stanza/Tint).

**Valutazione**: UAS (testa giusta), LAS (testa+etichetta giuste).

## 6. Treebank e PARSEVAL (domande d'esame)

- **Treebank**: corpus con alberi sintattici annotati (PTB inglese, TUT/VIT italiano, UD multilingua).
  Servono per training (MLE delle PCFG, classificatori delle transizioni) e valutazione.
- **PARSEVAL**: metrica su costituenti — precision/recall/F1 sui parentesi (bracket) del parse
  rispetto al gold; ignora in genere POS e punteggiatura; crossing brackets come errore grave.

## 7. Collegamenti con l'esame

- Domande dirette: PP attachment e coordinazione; CKY + complessita'; PCFG; 5 algoritmi dipendenze;
  MALT; costituenti vs dipendenze; PARSEVAL; treebank; anatomia di un parser.
- Progetto 2 (IT->IT-YO) = CFG in CNF + CKY + riscrittura dell'albero (SVX -> XSV).
- Progetto 3.A usa parser a dipendenze per estrarre regolarita'.

---

*Fonti slide (pdftotext): Syntax01 ~888 righe (costituenti, ambiguita'); Syntax02 ~996 (CKY, PCFG);
Syntax03 ~1350 (dipendenze, MALT, valutazione). File grammaticali: `tln/9 - .../simple-sem.fcfg`,
`simple-sem-it-02.fcfg`.*
