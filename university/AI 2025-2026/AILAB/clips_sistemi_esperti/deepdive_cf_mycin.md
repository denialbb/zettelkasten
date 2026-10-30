# Deep dive: MYCIN, certainty factor e limiti

> Companion di `notes.md` sez. 8. Fonti: `05_Sistemi_Esperti.pdf` (regola
> MYCIN, formule CF); `06_Incertezza.pdf` (CF vs probabilita').

## 1. La regola MYCIN delle slide

```
IF   l'organismo e' gram-negativo, a bastoncello, anaerobio...
THEN evidenza suggestiva (0.6) che sia Bacteroides
```

Il `0.6` non e' una probabilita' ma un **incremento di belief** apportato
dalla regola. La base di conoscenza e' una collezione di questi incrementi;
il motore li combina.

## 2. Algebra dei CF

- Conferme multiple: `CF = CF1 + CF2 − CF1·CF2` (es. 0.7, 0.5 → 0.85:
  rendimenti decrescenti, mai sopra 1).
- Disconferme multiple: simmetrica sui negativi.
- Conferma + disconferma: `CF = (CF1 + CF2) / (1 − min(|CF1|, |CF2|))`.
- Propagazione: `CF(conclusione) = CF(regola) · max(0, CF(premessa))`.

## 3. Perche' non sono probabilita'

Le slide sull'incertezza lo dicono esplicitamente: i CF violano gli
assiomi (es. `P(A) + P(¬A) = 1` non vale per i CF; la combinazione non e'
il teorema di Bayes). Sono una euristica di **ragionamento plausibile**,
nata per spremere giudizi esperti senza tabelle CPT complete. Pregi:
elicitazione facile, spiegabilita'. Difetti: nessuna garanzia di coerenza,
ordini di combinazione che contano, difficile calibrazione.

## 4. Uso nel Wumpus (consiglio del progetto)

I CF sono il posto naturale per le **ipotesi pit**: ogni breeze alza il CF
delle celle adiacenti non visitate; visitare una cella senza morire azzera
il CF; la scommessa `pit-*` scatta solo sopra soglia (es. CF > 0.8),
bilanciando +25/−25 attesi. Alternativa frequentista: conteggi
breeze/vicini (stima di probabilita' empirica). Entrambe accettate: conta
mostrare che l'agente intelligente batte la baseline.

*Vedi anche:* `deepdive_rete_rifrazione.md`, `notes.md` sez. 8–9,
`../conoscenza_incerta/notes.md` per il confronto con Bayes.
