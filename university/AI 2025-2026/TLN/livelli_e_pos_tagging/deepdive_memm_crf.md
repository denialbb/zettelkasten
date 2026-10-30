# Deep Dive: MEMM, label bias e CRF

> Companion di `notes.md` (§3.5, §3.6). Fonte: `lezione-03-PoSTagging-TLN-INFO-2526.pdf`
> (HMM vs MEMM, MEMM modelling/learning/decoding, CRF decoding).

## 1. MEMM: idea

Il MEMM sostituisce ogni multinomiale dell'HMM con un classificatore MaxEnt locale:

```
P(t_i | t_{i-1}, w) = 1/Z(t_{i-1}, w) * exp( SUM_k lambda_k f_k(t_{i-1}, t_i, w, i) )
```

Due ipotesi di modellazione (slide 863): (1) la distribuzione del tag dipende da stato precedente
+ osservazione intera; (2) le feature sono arbitrarie e sovrapposte (parola corrente, suffissi,
maiuscola, contesto ±2, tag precedente...). Learning: GIS/IIS o L-BFGS per i pesi lambda.

## 2. Label bias (il punto chiave)

La normalizzazione `Z(t_{i-1}, w)` e' **locale**: per ogni stato di partenza la massa in uscita
somma a 1 comunque. Conseguenza: uno stato con una sola transizione uscente la prende con
probabilita' 1 **qualunque sia l'osservazione** — l'evidenza lessicale viene ignorata.
Esempio classico: stato che puo' andare solo a se' stesso o quasi; il cammino resta intrappolato
anche se la parola suggerirebbe altro. L'HMM non ha questo problema perche' l'emissione
`P(w|t)` pesa ogni stato contro l'osservazione.

Diagramma (descritto): due stati A (molte uscite) e B (una uscita verso B). Da A la massa si divide
secondo le feature; da B tutto va a B: il decoder preferisce restare in B anche con parole ostili.

## 3. CRF: normalizzazione globale

```
P(t|w) = 1/Z(w) * exp( SUM_i SUM_k lambda_k f_k(t_{i-1}, t_i, w, i) )
```

`Z(w)` somma su **tutte** le sequenze: gli stati competono globalmente e il bias sparisce.
Prezzo: il training richiede i marginali (Forward-Backward) a ogni iterazione del gradiente.
Decoding: Viterbi modificato sui punteggi (somma di pesi, slide 1195).

## 4. Confronto rapido

| | HMM | MEMM | CRF |
|---|---|---|---|
| P | P(w,t) | P(t_i\|t_{i-1},w) locale | P(t\|w) globale |
| Feature | solo parola | arbitrarie | arbitrarie |
| Difetto | indipendenza ingenua | label bias | training costoso |
| Decoding | Viterbi | Viterbi/greedy | Viterbi su score |

## 5. Takeaway per l'esame

- Domanda tipica: "differenza MEMM/HMM" -> generativo vs discriminativo + feature + label bias.
- La baseline difficile del progetto 1.D e' un MEMM: capirne i limiti spiega perche' CRF/BERT
  fanno meglio sulle parole rare.

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_hmm_viterbi.md`. *Libri:* JM cap. sequence labeling (MEMM/CRF).
