# Deep dive: PDDL — domain, problem e Gripper

> Companion di `notes.md` sez. 3. Fonti: `02_pddl_approfondimento.pdf`;
> editor planning.domains citato nelle slide e in `links.md`.

## 1. Anatomia dei due file

**Domain** (conoscenza stabile):

```lisp
(define (domain gripper)
  (:predicates (room ?r) (ball ?b) (gripper ?g)
               (at-robby ?r) (at ?b ?r) (free ?g)
               (carry ?o ?g))
  (:action move
    :parameters (?from ?to)
    :precondition (and (room ?from) (room ?to) (at-robby ?from))
    :effect (and (at-robby ?to) (not (at-robby ?from))))
  ;; pick, drop analoghi
)
```

**Problem** (istanza):

```lisp
(define (problem gripper-4)
  (:domain gripper)
  (:objects rooma roomb ball1 ball2 left right)
  (:init (room rooma) (room roomb) (at-robby rooma)
         (at ball1 rooma) (at ball2 rooma)
         (free left) (free right))
  (:goal (and (at ball1 roomb) (at ball2 roomb))))
```

## 2. Cosa leggere in ogni costrutto

- `:predicates`: vocabolario, solo nomi e arieta' tipate informalmente.
- `:parameters`: variabili con `?`; il **grounding** le istanzia su oggetti.
- `:precondition`: congiunzione (con `and`, `or`, `not`, `exists` in ADL).
- `:effect`: `and` di letterali, `not` per cancellazioni, `when` per effetti
  condizionali, `forall` per effetti universali (ADL).
- `:init`: congiunzione ground (closed world); `:goal`: formula da
  soddisfare (spesso congiunzione esistenzialmente quantificata).

## 3. Gripper spiegato come diagramma

```
rooma: [robby, ball1, ball2]   roomb: [ ]
left: free   right: free
   -- move(rooma,roomb) --> robby in roomb
   -- pick(ball1, roomb, left) --> carry(ball1, left)
   -- move(roomb, rooma) ... drop ...
```

Il piano ottimo alterna move/pick/drop; con 2 bracci porta 2 palloni a
viaggio. E' il dominio "hello world" perche' ha precondizioni semplici,
effetti senza condizionali e goal congiuntivo.

## 4. Errori tipici

- Dimenticare `(not ...)` negli effetti (il robot risulta in due stanze).
- Predicati con arieta' incoerente tra domain e problem.
- Oggetti non dichiarati ma usati in `:init`.
- Goal con variabili libere invece che oggetti o quantificazioni.

*Vedi anche:* `deepdive_regressione.md`, `deepdive_graphplan_mutex.md`.
