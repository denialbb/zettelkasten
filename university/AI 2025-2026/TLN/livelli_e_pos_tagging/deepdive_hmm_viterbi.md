# Deep Dive: HMM e algoritmo di Viterbi per il PoS tagging

> Companion di `notes.md` (§3.4, §3.7). Fonte: `lezione-03-PoSTagging-TLN-INFO-2526.pdf`
> (modelling HMM, decoding, Viterbi summary, esercizio su HMM, trigrammi).

## 1. Il modello

Stati = tag `t`, osservazioni = parole `w`. Ipotesi di Markov (bigramma) + indipendenza dell'emissione:

```
P(t_1..n, w_1..n) = PROD_i P(t_i | t_{i-1}) * P(w_i | t_i)
```

Tre matrici: `pi` (iniziale), `A` (transizione tag->tag), `B` (emissione tag->parola).
Learning = conteggi MLE + smoothing (Laplace/add-k). Senza smoothing, una transizione mai vista
azzera interi cammini: per questo il progetto d'esame chiede strategie diverse di smoothing.

## 2. Viterbi: idea

Programmazione dinamica: `v[j,t]` = probabilita' del miglior cammino che spiega `w_1..t`
e finisce nel tag `j`. Ricorrenza:

```
v[j,1]   = pi[j] * B[j, w_1]
v[j,t]   = max_i  v[i,t-1] * A[i,j] * B[j, w_t]     (+ bp[j,t] = argmax_i ...)
```

Alla fine: `best = max_j v[j,n]`, poi si risale con i backpointer `bp`.
Complessita' O(n * |T|^2) tempo, O(n * |T|) spazio. Con i logaritmi:

```
v[j,t] = max_i  v[i,t-1] + log A[i,j] + log B[j, w_t]
```

## 3. Esempio numerico (schema dell'esercizio della slide)

Mini-corpus: `il/DET cane/NOUN abbaia/VERB`. Tabelle MLE (senza smoothing qui per brevita'):

```
A:        DET   NOUN  VERB      B:          il   cane  abbaia
START     1.0   0     0         DET         1.0  0     0
DET       0     1.0   0         NOUN        0    1.0   0
NOUN      0     0     1.0       VERB        0    0     1.0
```

Decoding di `il cane abbaia`: colonna 1 tutta su DET, colonna 2 forza NOUN, colonna 3 forza VERB.
Con corpus reale le colonne hanno decine di candidati e il max seleziona il cammino coerente
(transizioni frequenti + emissioni probabili). La slide mostra la matrice di Viterbi con le prime
colonne riempite (figura 8.14 da Jurafsky).

Diagramma (descritto): tabella |T| righe x n colonne; ogni cella (j,t) ha frecce entranti da tutte
le celle (i,t-1) pesate `v[i,t-1]*A[i,j]`; si tiene solo la freccia max (backpointer). Il cammino
ottimo e' la catena di frecce che parte dal max dell'ultima colonna.

## 4. Trigrammi

Stati = coppie `(t_{i-1}, t_i)`, transizione `P(t_i | t_{i-1}, t_{i-2})`. Costo O(n*|T|^3):
si usa beam search (tenere solo i k migliori stati per colonna). Guadagno modesto sul PoS inglese,
utile per lingue con accordo ricco (cfr. greco/latino del progetto).

## 5. Takeaway per l'esame

- Saper scrivere fattorizzazione, ricorrenza, complessita'.
- Saper fare Viterbi a mano su mini-corpus (esercizio della slide 771+).
- Saper spiegare perche' serve lo smoothing e come gestire le ignote.
- Progetto 1.A = implementare esattamente questo (learning + Viterbi con log-prob).

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_memm_crf.md`. *Libri:* JM cap. sequence labeling (HMM/Viterbi); NLTK cap. tagging.
