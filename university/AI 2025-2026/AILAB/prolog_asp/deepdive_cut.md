# Deep dive: il cut — green vs red, stack e choice point

> Companion di `notes.md` sez. 5. Fonti: `cut.pdf` (anche slide Lamma);
> Dovier–Formisano cap. 8.4; Endriss sul controllo.

## 1. Modello run-time descritto

L'interprete mantiene due pile logiche (realizzate in un unico stack):

- **stack di esecuzione**: record di attivazione (*environment*) dei
  predicati in corso, con goal da soddisfare e sostituzione parziale;
- **stack di backtracking**: **choice point**, ognuno con (goal alternativo,
  prossima clausola da provare, stato dello stack al momento della scelta).

Quando un goal fallisce, si ripristina l'ultimo choice point. Il cut
**cancella** tutti i choice point creati dopo l'ingresso nella clausola che
lo contiene (per i goal prima del cut e per il predicato stesso).

## 2. Regola operativa precisa

In `p :- q1, ..., qi, !, qi+1, ..., qn.` quando `!` e' raggiunto:

1. ha successo immediatamente;
2. rimuove i choice point di `q1..qi` e di `p` (scelte alternative per
   quale clausola di `p` usare);
3. in backtracking futuro `!` non offre alternative;
4. restano solo i choice point creati da `qi+1..qn` in poi.

Diagramma: SLD-albero con il nodo di `p` che aveva k figli (clausole
alternative) e sottoalberi per ogni `qj`; il cut pota tutti i figli di destra
di `p` e i rami alternativi dei `q1..qi`, lasciando solo la continuazione.

## 3. Green cut: esempi sicuri

Determinismo dopo test di tipo:

```prolog
max(X, Y, X) :- X >= Y, !.
max(_, Y, Y).
```

Se il test `>=` riesce, la seconda clausola e' logicamente ridondante:
il cut evita solo lavoro inutile. Altro uso verde: dopo aver stabilito che
l'input e' del caso base, impedire controlli inutili.

## 4. Red cut: cambia le risposte

```prolog
p(X, a) :- q(X), !.
p(X, b).
```

Qui il cut decide il significato: senza cut, `p(x,b)` sarebbe derivabile
anche quando `q(x)` vale. Il programma dipende dall'ordine delle clausole
e non ha lettura dichiarativa. La negazione per fallimento
(`\+ G :- G, !, fail.`) e' il red cut piu' famoso: corretto solo per goal
ground con derivazione finita.

## 5. Checklist d'esame

- Dire sempre se un cut e' green o red e perche'.
- Ricordare: il cut **non** influenza i goal dopo di lui.
- Sapere che il cut fa perdere **completezza** ma non (di per se')
  correttezza rispetto alla lettura procedurale.
- In ASP non esiste il cut: il controllo e' delegato al solver.

*Vedi anche:* `deepdive_sld.md`, `deepdive_asp_semantica.md`.
