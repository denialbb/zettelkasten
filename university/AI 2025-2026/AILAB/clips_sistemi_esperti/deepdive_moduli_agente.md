# Deep dive: moduli e architettura di un agente Wumpus

> Companion di `notes.md` sez. 9. Fonti: `progetto CLIPS 2025-2026.pdf`;
> `wumpus.zip` (interfaccia); `05_Sistemi_Esperti.pdf` sui moduli.

## 1. Perche' i moduli sono obbligatori

Senza moduli tutte le regole competono in un'unica agenda: l'agente
mescola percezione, ipotesi e movimento, e il debug e' impossibile. Con i
**defmodule** ogni fase ha il suo focus:

```
MAIN → PERCEZIONE → IPOTESI → DECISIONE → AZIONE → MAIN ...
```

`(focus PERCEZIONE IPOTESI ...)` impila i moduli; quando il focus in cima
esaurisce l'agenda, passa al successivo. E' una macchina a stati dichiarata
con regole di transizione.

## 2. Scheletro di agente (pattern consigliato)

```clips
(defmodule MAIN)
(deftemplate MAIN::percept (slot x) (slot y) (slot breeze) (slot stench)
  (slot glitter) (slot energy) (slot steps))
(deftemplate MAIN::action (slot move))

(defmodule PERCEZIONE)
(defrule PERCEZIONE::registra-muro ... => ...)

(defmodule IPOTESI)
;; da breeze/stanchi deduce pit/wumpus possibili; CF opzionali qui

(defmodule DECISIONE)
;; sceglie mossa sicura > grab > esplorazione > quit

(defmodule AZIONE)
;; asserisce UNA sola (action (move ...)) e pulisce i percept vecchi
```

## 3. Gestione della WM: errori fatali

1. **Asserire piu' action**: il simulatore ne esegue una e scarta le altre
   (nondeterminismo). Soluzione: un'unica regola di emissione in AZIONE.
2. **Accumulare percept**: a ogni step uno nuovo; senza retract la WM
   cresce e Rete rallenta. Tenere solo gli ultimi o un modello interno
   (mappa visitata, muri urtati, pozzi ipotizzati).
3. **Dimenticare counter**: `counter` e' l'orologio unico; `percept.steps`
   e' la foto storica. Usare counter per decisioni temporali.

## 4. Due agenti a confronto (richiesta progetto)

- **Agente stupido**: random walk + grab su glitter + quit quando energy
  bassa. Baseline per punteggi.
- **Agente intelligente**: mappa interna, evita celle con breeze/stench
  non spiegati, ipotesi pit con scommesse solo sopra soglia (CF o conteggi),
  ritorno a (0,0) pianificato prima di esaurire l'energia.
- Metriche: oro raccolto, morti (Wumpus/pozzi), energia residua, bonus/malus
  pit, su piu' mappe incluse quelle ignote d'esame.

*Vedi anche:* `deepdive_rete_rifrazione.md`, `deepdive_cf_mycin.md`,
`projects/progetto_clips_wumpus/README.md`.
