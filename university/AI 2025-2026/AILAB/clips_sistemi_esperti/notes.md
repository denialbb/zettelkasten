# CLIPS e sistemi esperti — note complete

> Fonti: slide sez. 4 (`05_Sistemi_Esperti.pdf`, 190 slide); manuale
> `bpg.pdf` (CLIPS *Basic Programming Guide*); `AppuntiCLIPS-V5.rtf`;
> esempi `myfamily.clp`, `wine.clp`, `patrons-2.clp`, `bw.clp`,
> `CLIPS-Esempi-01.clp`, `lezione-9-clips.txt`; progetto Wumpus
> (`progetto CLIPS 2025-2026.pdf`, `wumpus.zip`).
> Termini inglesi verbatim: *knowledge-based system, working memory (WM),
> knowledge base, inference engine, forward chaining (data-driven), backward
> chaining (goal-driven), production rule, LHS/RHS, pattern matching, Rete
> algorithm, agenda, activation, firing, refraction, recency, specificity,
> conflict resolution, salience, deffacts, deftemplate, defrule,defmodule,
> certainty factor (CF), MYCIN*.

---

## 1. Sistemi esperti: definizioni e architettura

Definizioni parafrasate da Giarratano e Riley (1998, slide 1):

- Un sistema informatico che riproduce, in un dominio circoscritto, alcune capacità decisionali di un esperto umano.
- Un programma che combina conoscenza e inferenza per risolvere problemi che richiedono competenze specialistiche.

Proprieta' (slide 2–4; Feigenbaum: la potenza dipende da quantita' e
qualita' della conoscenza):

- **Specificita'**: dominio limitato, prestazioni da esperto umano.
- **Rappresentazione esplicita** della conoscenza (non istruzioni
  immutabili ma ambiente da rappresentare, usare, modificare).
- Meccanismi di **ragionamento**, capacita' di **spiegazione**
  (*reasoning chain* = sequenza di regole attivate).
- Capacita' di operare in domini poco strutturati.

Architettura (slide 6):

- **Knowledge base**: regole + fatti iniziali.
- **Working memory (WM)**: fatti correnti (dinamica).
- **Inference engine**: matching + selezione + esecuzione.
- **Knowledge acquisition facility**: aiuta l'ingegnere a mantenere regole.
- **User interface**: pone problemi, restituisce risposte + spiegazioni.

Domini applicativi (slide 8): interpretazione (Dendral, Hearsay-II),
diagnosi (**MYCIN**), monitoring (VM), planning/scheduling (Molgen),
previsione (Prospector), configurazione (R1/XCON).

Quando NON usarli (slide 9): esistono algoritmi tradizionali efficienti;
il problema e' computazione non conoscenza; conoscenza non elicitabile;
utente riluttante per task critici. Nota: un sistema a regole e'
**Turing-completo**, quindi *puo'* risolvere qualsiasi problema (planning
incluso) — ma "con molta fatica": non sempre e' il formalismo adeguato.

## 2. Forward vs backward chaining (slide 7)

- **Forward chaining (data-driven)**: da fatti a conclusioni; appena
  osservazioni disponibili si fa matching con antecedenti. Real-time
  monitoring e controllo. **CLIPS, OPS5**.
- **Backward chaining (goal-driven)**: da ipotesi a supporti; cerca regole
  e fatti fino a dimostrare il goal. Diagnostica. **MYCIN, Prolog**.

## 3. CLIPS: cos'e' e ciclo di esecuzione

**CLIPS** = *C Language Integrated Production System*, NASA 1985–1996
(tuttora mantenuto). Strumento per sistemi esperti a regole; sistema
**eterarchico** ("piatto": nessuna gerarchia di controllo imposta).

**Ciclo recognize-act** (slide 10+):

```
1. MATCH:   confronta LHS delle regole con i fatti in WM (Rete)
2. SELECT:  risolvi conflitti in agenda → scegli un'attivazione
3. ACT:     esegui RHS (assert/retract/modify, printout, ...)
4. ripeti finche' agenda non vuota o (run) terminato
```

Comandi interattivi visti nelle slide: `(load ...)`, `(reset)` (carica
`deffacts`), `(facts)`, `(agenda)`, `(run)`, `(watch ...)`.

## 4. Fatti, template e pattern

- **Fatti ordinati** (*ordered facts*): liste `(persona Mario occhi blu)`.
- **Fatti strutturati**: via `deftemplate` con slot tipizzati:
  `(deftemplate persona (slot nome) (slot occhi))`.
- **deffacts**: fatti iniziali caricati con `(reset)`.
- **Pattern** nella LHS: vincoli per campo — variabili `?x`, jolly,
  **field constraint** (`&`, `|`, `~`, predicati `:`), test su multislot.
  Vantaggio dei field constraint (slide): filtrano il matching senza regole
  ausiliarie, riducono attivazioni spurie.
- Funzioni su multivalori (`create$`, `delete$`, `member$`, ...) mostrate
  con esempi numerici nelle slide.

## 5. Regole: LHS, RHS, variabili

Struttura generale:

```clips
(defrule nome-regola "commento opzionale"
  (pattern-1 ?x ...)
  (test ...)
  =>
  (assert (nuovo-fatto ?x))
  (printout t "messaggio" crlf))
```

- **LHS**: congiunzione di pattern (CE) + `test`/`exists`/`forall`/`not`.
- **RHS**: azioni procedurali; `assert`, `retract`, `modify`, `duplicate`,
  I/O, aritmetica, controllo.
- Variabili legate nel matching, usate nella RHS; gli esempi `myfamily`,
  `wine`, `patrons-2`, `bw` (mondo dei blocchi) mostrano catene di regole
  realistiche.

## 6. Rete, agenda, attivazioni, rifrazione

- **Rete algorithm**: compila la LHS in rete di discriminazione (nodi
  alfa per test su singolo pattern, beta per join tra pattern); il matching
  e' incrementale sui soli fatti cambiati.
- **Activation**: istanza di regola con fatti che soddisfano la LHS; va in
  **agenda**.
- **Firing**: esecuzione della RHS; puo' cambiare la WM e creare/rimuovere
  attivazioni.
- **Rifrazione** (*refraction*): una regola scatta **una sola volta** per la
  stessa istanza di fatti (es. slide: occhi blu — senza rifrazione loop
  infinito di stampe; con rifrazione una sola stampa per persona).
- Esempi numerici di attivazioni nelle slide (conteggi `Esempio di
  attivazioni di regole`).

## 7. Conflict resolution: recency, specificity, salience, strategie

Quando piu' attivazioni sono in agenda, CLIPS sceglie con strategia
(impostabile con `set-strategy`):

- **Depth** (default): le piu' recenti prima (LIFO, *recency*).
- **Breadth**: le meno recenti prima (FIFO).
- **Simplicity / Complexity**: preferisce regole con pochi/molti test
  (*specificity* misurata).
- **LEX / MEA**: combinazioni lessicografiche di recency/specificity.
- **Salience**: priorita' esplicita `(declare (salience N))`; valore alto =
  scatta prima indipendentemente dalla strategia. Da usare con parsimonia
  (distrugge dichiarativita', rende il controllo opaco).
- **Moduli** (*defmodule*): partizionano regole/fatti per fasi (focus
  esplicito del processo decisionale — **obbligatorio nel progetto**).

## 8. Incertezza nei sistemi a regole: MYCIN e certainty factor

Le slide riportano l'esempio MYCIN con evidenza `0.6` e la teoria dei
**certainty factor (CF)**:

- `CF ∈ [-1, +1]`: positivo = conferma, negativo = disconferma.
- Combinazione di due conferme: `CFnew = CF1 + CF2 − CF1·CF2`
  (es. slide: `0.7 + 0.5 − 0.35 = 0.85`).
- I CF sono **gradi di belief che NON soddisfano gli assiomi di
  probabilita'** (slide sez. incertezza): euristica pratica, non calcolo
  probabilistico. Nel progetto Wumpus sono **consigliati ma non obbligatori**
  per gestire la vaghezza delle percezioni.

## 9. Organizzare un agente CLIPS: pattern dal progetto Wumpus

Requisiti del progetto (`progetto CLIPS 2025-2026.pdf`; dettagli in
`projects/progetto_clips_wumpus/README.md`):

- Fatto `percept` per step (x, y, steps, breeze, stench, glitter, energy) +
  `counter`; il simulatore legge UN solo `(action (move ?label))` per step.
- Azioni: movimento, `grab`, `quit`, `pit-north/south/west/east` (±25 oro).
- **Moduli obbligatori** per fasi (es. percezione → ipotesi → decisione →
  azione); buttar via `percept` vecchi per non intasare la WM.
- Confronto tra **due agenti** (stupido vs intelligente) per mostrare che
  la knowledge base fa la differenza; discussione su ciclo, rifrazione,
  elementi fondamentali.

## 10. Mappa fonti e lacune

| Argomento | Fonte primaria |
|---|---|
| Definizioni, architettura, domini | `05_Sistemi_Esperti.pdf` slide 1–9 |
| Forward/backward, CLIPS, ciclo | slide 7–10+ |
| Template, pattern, field constraint | slide centrali + `bpg.pdf` cap. corrispondenti |
| Rete/agenda/rifrazione/salience | slide con esempi occhi blu + attivazioni |
| CF/MYCIN | slide MYCIN + `06_Incertezza` confronto CF vs probabilita' |
| Esempi pratici | `myfamily.clp`, `wine.clp`, `patrons-2.clp`, `bw.clp`, `lezione-9-clips.txt` |
| Wumpus | `progetto CLIPS 2025-2026.pdf`, `wumpus.zip` |

Lacune: `bpg.pdf` (manuale completo, centinaia di pagine) usato solo per i
costrutti citati dalle slide; `AppuntiCLIPS-V5.rtf` non convertito in testo
(formato RTF, serve lettura dedicata); `wumpus.zip`/`memory-allocator` non
scompattati; conteggi slide approssimativi.
