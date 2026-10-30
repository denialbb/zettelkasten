# Deep dive: progressione vs regressione

> Companion di `notes.md` sez. 4. Fonti: `02_Algoritmi_di_pianificazione_
> spazio_stati.pdf` (esempi forward/backward); STRIPS.

## 1. Le due direzioni a confronto

| | Progression (forward) | Regression (backward) |
|---|---|---|
| Parte da | stato iniziale completo `s0` | sottogoal (insieme di letterali) |
| Passo | `s' = (s ∖ Del(a)) ∪ Add(a)` | `g' = (g ∖ Add(a)) ∪ Pre(a)` |
| Test | `g ⊆ s?` | `g'` tautologico / contenuto in `s0`? |
| Pregio | stati sempre completi e eseguibili | solo azioni rilevanti per il goal |
| Difetto | esplora il mondo intero | sottogoal non eseguibili direttamente |

## 2. Quando un'azione passa la regressione

Data azione `a` e sottogoal `g`, `a` e' candidata se:

1. `Add(a) ∩ g ≠ ∅` (produce qualcosa di richiesto);
2. `Del(a) ∩ g = ∅` (non distrugge richieste);
3. il nuovo `g'` non contiene contraddizioni ovvie.

Esempio: goal `{at(ball, roomb)}`, azione `drop(ball, roomb, g)` con
`Add = {at(ball, roomb)}`, `Pre = {carry(ball, g), at-robby(roomb)}`:
nuovo sottogoal `{carry(ball, g), at-robby(roomb)}`. Ripetendo si risale
fino a fatti veri in `s0`.

## 3. Diagramma descritto

Forward: albero che si allarga da `s0`, ogni livello una mossa in piu';
molti rami non si avvicinano al goal. Backward: albero che si allarga dal
goal, ogni livello una precondizione in piu' da soddisfare; i rami sono
guidati dal goal ma i nodi sono insiemi parziali, non stati visitabili.

## 4. Perche' STRIPS abilita la regressione

Senza add/delete list esplicite non si puo' calcolare `g'` sintatticamente.
STRIPS separa condizioni ed effetti in insiemi: la regressione diventa
operazione insiemistica, senza ragionamento logico completo. E' il motivo
storico del successo di STRIPS (1971) come linguaggio operativo, non solo
descrittivo.

## 5. Trappole

- Applicare all'indietro un'azione che cancella un letterale del goal
  (viola la condizione 2): produce piani invalidi.
- Fermarsi al primo sottogoal contenuto in `s0` senza verificare
  l'eseguibilita' dell'intera sequenza in avanti.
- Confrontare costi: la regressione minimizza il numero di passi solo con
  ricerca ottima (A\*) sullo spazio dei sottogoal, non con DFS.

*Vedi anche:* `deepdive_pddl.md`, `deepdive_graphplan_mutex.md`.
