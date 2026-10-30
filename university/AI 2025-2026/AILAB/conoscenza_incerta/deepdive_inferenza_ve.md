# Deep dive: inferenza — enumeration vs variable elimination

> Companion di `notes.md` sez. 5. Fonti: `06_Incertezza.pdf` slide 47–49+.

## 1. Enumeration fattorizzata (l'esempio delle slide)

Query `P(B|j,m)`, nascoste `E, A`:

```
P(B|j,m) = α · P(B) · Σe P(e) · Σa P(a|B,e)·P(j|a)·P(m|a)
```

Il trucco `Σe Σa` con fattori portati fuori: `P(B)` esce da tutto, `P(e)`
esce dalla somma su `a`. Ma `P(a|B,e)·P(j|a)·P(m|a)` va ricalcolato per
ogni `(e, a)`: con `n` nascoste binarie, `2^n` prodotti. Spazio O(n),
tempo O(2^n).

## 2. Variable elimination sullo stesso esempio

Elimina `A` per prima (dipende solo da fattori con `A`):

```
f_A(B,e,j,m) = Σa P(a|B,e)·P(j|a)·P(m|a)
P(B|j,m) = α · P(B) · Σe P(e)·f_A(B,e,j,m)
```

Il fattore intermedio `f_A` ha scope `{B,e}` (4 righe) ed e' **riusato**
per entrambi i valori di `e` senza ricalcolare i prodotti su `a`. Poi si
elimina `E` allo stesso modo. Stesso risultato, niente ripetizioni.

## 3. Diagramma del risparmio

Enumeration: albero di somme con sottoalberi identici ripetuti (stesso
prodotto `P(j|a)P(m|a)` calcolato per ogni `e`). VE: grafo con nodi
fattore condivisi — ogni prodotto calcolato una volta sola e referenziato.
Il memo dei fattori e' l'analogo dei nogood di Graphplan: non ripetere
lavoro gia' fatto.

## 4. Scelta dell'ordine e limiti

- Euristiche min-degree/min-fill: minimizzano la dimensione del fattore
  intermedio piu' grande.
- Caso peggiore comunque esponenziale nel treewidth: VE non rende
  trattabili reti dense; li' servono approssimazioni (sampling, variational).
- MAP/MPE richiedono max al posto di somme (max-product): piu' dure perche'
  max e somma non commutano liberamente.

*Vedi anche:* `deepdive_bayes.md`, `deepdive_bayes_networks.md`.
