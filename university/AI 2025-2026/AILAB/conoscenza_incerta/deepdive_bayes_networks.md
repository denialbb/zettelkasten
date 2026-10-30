# Deep dive: reti bayesiane — CPT, blanket, costruzione

> Companion di `notes.md` sez. 4. Fonti: `06_Incertezza.pdf`;
> `earthquake.net`, `raffreddore.net`, `cow.net`.

## 1. Anatomia di una CPT

Nodo `Alarm` con genitori `Burglary (B)`, `Earthquake (E)`:

| B | E | P(Alarm=true\|B,E) |
|---|---|---|
| T | T | 0.95 |
| T | F | 0.94 |
| F | T | 0.29 |
| F | F | 0.001 |

Quattro righe invece delle 32 della congiunta a 5 variabili. Regola: righe
= prodotto delle cardinalita' dei genitori; ogni riga somma a 1 sulla
variabile (qui mostrata solo la colonna `true`).

## 2. Markov blanket in pratica

Per `Alarm`: genitori `{B, E}`, figli `{John, Mary}`, altri genitori dei
figli `{}` (John e Mary hanno solo Alarm come genitore). Blanket =
`{B, E, John, Mary}`. Conseguenze:

- per campionare o aggiornare `Alarm` bastano questi 4 nodi;
- `Earthquake` e `JohnCall` sono indipendenti dato `Alarm` (cammino
  bloccato), ma dipendenti senza evidenza su `Alarm` (spiegazione comune).

## 3. Costruzione corretta (errore d'ordine)

Giusto: `B → A → J` (cause → effetti). Sbagliato ma equivalente in
espressivita': `J → A → B` con CPT diagnostiche enormi e innaturali
(`P(B|J, M, ...)` per ogni combinazione di sintomi). Stessa congiunta
rappresentabile, ma numeri non elicitabili e rete illeggibile. Le slide
avvertono: l'ordine di inserimento decide la qualita' della rete.

## 4. Aprire i .net in SamIam

`earthquake.net`, `raffreddore.net`, `cow.net` si aprono da
reasoning.cs.ucla.edu/samiam: nodi cliccabili, evidenza con click,
posteriori aggiornate live. Esercizio: fissare `John=true, Mary=true` e
leggere `P(B)`; poi aggiungere `Earthquake=true` e osservare lo
*explaining away* (il terremoto "spiega" l'allarme e `P(B)` scende).

*Vedi anche:* `deepdive_bayes.md`, `deepdive_inferenza_ve.md`.
