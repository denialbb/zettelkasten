# Deep Dive: word2vec e SGNS (derivazione e pratica)

> Companion di `notes.md` (§7). Fonti: `08_word2vec.pdf`, `08_train_W2V.ipynb`, `VSM_srch.ipynb`.

## 1. Skip-gram con negative sampling

Dati reali (w, c) + k negativi (w, c') con c' ~ P^0.75. Obiettivo per coppia:

```
J = log sigma(v_w · v_c) + SUM_{i=1..k} log sigma(-v_w · v_{c'_i})
```

(logistica binaria: vero vs rumore). Gradiente spinge v_w verso i contesti veri e lontano
dai negativi. Levy-Goldberg: SGNS fattorizza implicitamente la matrice PMI spostata
(`M_ij = PMI(i,j) - log k`). Pesi finali: media/somma di input e output embedding.

## 2. Iperparametri che contano (dal lab)

Finestra 5-10, dimensione 100-300, k = 5-20 negativi, subsampling delle frequenti
(`il`, `di` buttate con prob. 1-sqrt(t/f)), min-count per tagliare la coda, epoche 5-15.
`08_train_W2V.ipynb` li varia sui testi in `utils/data` e confronta vicini/analogie.

## 3. Analogie: perche' funzionano (e quando no)

`v(re) - v(uomo) + v(donna) ≈ v(regina)` se la relazione e' uno spostamento coerente
(genere costante). Fallisce con polisemia (un vettore per tutti i sensi), relazioni
non lineari, frequenza sbilanciata. Valutazione: Google analogy set, WordSim353 (Spearman).

## 4. VSM sparso vs denso (`VSM_srch.ipynb`)

| | VSM TF-IDF | SGNS |
|---|---|---|
| Dimensione | \|V\| (migliaia) | 100-300 |
| Similarita' | solo overlap | anche sinonimi mai co-occorrenti |
| Query | coseno sparso | coseno denso (stesso codice!) |
| Limite | sinonimia cieca | un senso per parola |

## 5. Bias

WEAT: associazione differenziale (nomi M/F vs carriere/famiglia). Debias (Bolukbasi:
proiezione fuori dalla direzione di genere) rimuove il sintomo, non la causa nel corpus.

---
*Related:* `notes.md`, `flashcards.md`. *Libri:* JM cap. Embeddings (word2vec).
