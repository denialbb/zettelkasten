# Deep dive: SLD-risoluzione e SLD-alberi

> Companion di `notes.md` sez. 4. Fonti: `interprete Prolog e risoluzione
> SLD.pdf`; Dovier–Formisano cap. 5–6.

## 1. Perche' SLD e non risoluzione generale

La risoluzione generale lavora su clausole arbitrarie e a ogni passo sceglie
due clausole qualsiasi: spazio di ricerca enorme. Con sole **clausole di
Horn definite** + un goal si puo' usare una forma lineare: un antenato e'
sempre il risolvente precedente, l'altro e' una clausola del programma. La
**regola di selezione** fissa quale letterale del goal espandere (Prolog:
il primo da sinistra). Questo e' SLD.

## 2. Passo di derivazione, descritto come diagramma

```
Goal:  <- G1, G2, ..., Gn
          |
   clausola A :- B1..Bm (variabili fresche), σ = MGU(G1, A)
          |
Nuovo goal: <- B1σ, ..., Bmσ, G2σ, ..., Gnσ
```

Ogni arco e' etichettato da clausola usata + MGU. La composizione delle
sostituzioni lungo un ramo di successo, ristretta alle variabili del goal
iniziale, e' la **risposta calcolata**.

## 3. SLD-albero e visita Prolog

L'SLD-albero ha radice nel goal iniziale e un figlio per ogni clausola
applicabile al letterale selezionato. Il Prolog lo visita in **profondita'
da sinistra**: ordine delle clausole nel file = ordine dei figli; il
backtracking risale all'ultimo **choice point**. Conseguenze:

- la **terminazione** dipende dall'ordine (ricorsione a sinistra non
  produttiva = ramo infinito visitato per primo);
- la **completezza teorica** (esiste un ramo di successo se il goal segue)
  resta, ma la visita in profondita' puo' perdersi in un ramo infinito;
- il `cut` pota sottoalberi interi (vedi `deepdive_cut.md`).

## 4. Indipendenza dal nondeterminismo (Dovier 5.2)

Teorema: se esiste una derivazione di successo con una regola di selezione,
ne esiste una (con stessa risposta, a meno di ridenominazione) con
qualsiasi altra regola di selezione. In pratica: spostare i letterali nel
corpo non cambia *cosa* si puo' derivare, solo *quanto* si cerca. La
**search rule** (quale clausola prima) e la **selection rule** (quale
letterale prima) sono i due nondeterminismi; il Prolog li fissa entrambi
(ordine testuale + leftmost).

## 5. Esempio guidato (stile slide gatto/persiano)

Programma: `miagola(X) :- gatto(X). gatto(X) :- persiano(X). persiano(tom).`
Goal `<- miagola(tom)`:

1. unifica con testa della prima regola, σ = {X/tom} →
   `<- gatto(tom)`;
2. unifica con la seconda, σ = {X/tom} → `<- persiano(tom)`;
3. unifica con il fatto → goal vuoto. Successo con risposta vuota (goal
   ground vero).

Con goal `<- miagola(Y)` la risposta calcolata e' `{Y/tom}`.

## 6. Trappole d'esame

- Dimenticare la **rinomina**: riusare la stessa clausola due volte senza
  variabili fresche lega scorrettamente le variabili.
- Confondere risposta calcolata e istanze: il Prolog restituisce la
  sostituzione piu' generale, non tutte le istanze ground.
- Credere che l'ordine non conti: conta per terminazione ed efficienza,
  e con il cut anche per la semantica.

*Vedi anche:* `deepdive_cut.md`, `deepdive_asp_semantica.md`.
