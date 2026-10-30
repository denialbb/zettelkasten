# Planning classico — note complete

> Fonti: slide sez. 3 (`00_intro.pdf`, `01_planning.pdf`,
> `02_Algoritmi_di_pianificazione_spazio_stati.pdf`,
> `02_pddl_approfondimento.pdf`,
> `03_Algoritmi_di_pianificazione_spazio_piani.pdf`,
> `04_Algoritmi_di_pianificazione_GRAPHPLAN.pdf`); Dovier–Formisano cap. 12
> (planning in ASP); libro free Genesereth–Kao (logica, situazioni).
> Termini inglesi verbatim: *state-transition system, classical planning,
> STRIPS, ADL, PDDL (domain/problem files), forward search (progression),
> backward search (regression), plan-space planning, least-commitment,
> causal link, threat, promotion/demotion, separation, Graphplan, planning
> graph, mutex (mutual exclusion), no-op (persistence action), A\*, FF
> heuristic, landmarks, relaxed plan*.

---

## 1. Perche' studiare il planning (`00_intro`, `01_planning`)

- Prospettiva scientifica: il planning e' un aspetto fondamentale del
  comportamento intelligente (razionale) — "the art and practice of thinking
  before acting" (Haslum); *automated planning* = scegliere un corso
  d'azione che porta al goal da una descrizione di alto livello (Hoffmann).
- Prospettiva tecnologica: strumento software per agenti autonomi che
  sceglie e organizza azioni.
- Nel corso: planning + sistemi a regole (CLIPS) + incertezza, docente
  R. Micalizio; laboratorio su editor planning.domains, PDDL, clingo per
 planning logico.

## 2. Modello concettuale: state-transition system

Un **state-transition system (STS)** e' `Σ = (S, A, E, γ)`:

- `S` stati (finito o ricorsivamente enumerabile);
- `A` azioni, `E` eventi esogeni;
- `γ : S × (A ∪ E) → 2^S` relazione di transizione: se `γ(s,a) ≠ ∅`,
  `a` e' **applicabile** in `s` e porta in un `s' ∈ γ(s,a)`.

Il **classical planning** restringe il modello (ipotesi restrittive):

1. stati finiti, completamente osservabili, proposizionali;
2. azioni deterministiche, istantanee, senza eventi esogeni;
3. goal come condizione sugli stati; piano = sequenza di azioni.

## 3. Rappresentazioni: STRIPS, ADL, PDDL

### 3.1 Linguaggio STRIPS (sottoinsieme FOL)

- **Stato**: congiunzione di **atomi ground** (closed world: cio' che non e'
  detto e' falso). Le slide insistono: `STRIPS ⊂ FOL` con restrizioni.
- **Operatore di planning**: tripla `(nome, precondizioni, effetti)`:
  - `Pre(a)`: letterali che devono valere;
  - `Add(a)` / `Del(a)`: letterali aggiunti/cancellati.
  - Transizione: `s' = (s ∖ Del(a)) ∪ Add(a)` se `Pre(a) ⊆ s`.
- Esempio (blocchi): `pickup(X)` con pre `clear(X), ontable(X), handempty`,
  add `holding(X)`, del `clear(X), ontable(X), handempty`.

### 3.2 PDDL: domain file e problem file (`02_pddl_approfondimento`)

**PDDL** (*Planning Domain Definition Language*) e' lo standard delle
competizioni (AIPS/ICAPS). Due file:

```
(define (domain <nome>)        (define (problem <nome>)
  <predicati>                    (:domain <nome>)
  <azioni> ...)                   <oggetti>
                                  <stato iniziale>
                                  <goal> ...)
```

- **Domain**: predicati + operatori (`:action` con `:parameters`,
  `:precondition`, `:effect` con `and/not`, `forall/ when` in ADL).
- **Problem**: oggetti, `(:init ...)`, `(:goal ...)`.
- Esempio delle slide: **Gripper** (robot, due stanze, palloni, bracci).
  Altri domini citati: logistics (cartella codice a lezione, non scaricata).

### 3.3 Variabili di stato (slide `03`, inizio)

Per il plan-space si passa da FOL a **variabili di stato** (*state
variables*): modello `B` di oggetti rilevanti (es. `Robots ∪ Containers ∪
Locs ∪ {nil}`), astraendo dettagli insignificanti. Ogni variabile ha un
dominio finito; gli stati sono assegnazioni totali.

## 4. Planning nello spazio degli stati (`02_..._spazio_stati`, 95 slide)

### 4.1 Forward search (progression)

Parte da `s0`, applica azioni applicabili, genera successori fino a uno
stato che soddisfa il goal. Le slide mostrano l'esempio passo passo.

- Pro: semplice, guidabile con euristiche (BFS, DFS, **A\***, greedy).
- Contro: **fattore di ramificazione** alto, esplora azioni irrilevanti per
  il goal; euristiche deboli se lo spazio e' grande.

### 4.2 Backward search (regression)

Parte dal goal `g`, applica azioni **all'indietro**: un'azione `a` e'
rilevante se aggiunge un letterale del goal senza cancellarne altri;
il nuovo sottogoal e' `(g ∖ Add(a)) ∪ Pre(a)`. Le slide mostrano l'esempio.

- Pro: considera solo aspetti rilevanti (**goal-directed**); e' alla base
  degli operatori STRIPS che rendono implementabile la regressione.
- Contro: goal parziali (insiemi di letterali) non sono stati completi;
  serve gestione dei letterali negati; ramificazione comunque alta.

### 4.3 Euristiche domain-independent e planner moderni

Le slide citano:

- ** Euristica FF** (Hoffmann–Nebel 2001): piano rilassato (ignora delete
  list) + ricerca locale enforced hill-climbing; **non ammissibile**.
- **Landmark**: fatti che ogni piano deve rendere veri; usati per guidare.
- Planner: **FF** (variante A\*/hill-climbing + relaxed plan),
  planner con A\* + landmark. Ricerca sistematica: greedy best-first, A\*,
  IDA\* (richiamo alle euristiche della sez. 2).

## 5. Planning nello spazio dei piani (`03`, 44 slide)

### 5.1 Idea: planning come CSP / least-commitment

Formulare il planning come **soddisfacimento di vincoli**: si ritardano le
decisioni (ordine azioni, istanziazione variabili) finche' necessario
(**least-commitment**). Oggetti:

- **Azioni parziali**: con variabili non ancora ground.
- **Causal link** `a1 --p--> a2`: `a1` produce `p` per `a2`.
- **Threat**: azione `a3` che cancella `p` e puo' interporsi tra `a1` e `a2`.
- Risoluzioni: **promotion** (`a3` prima di `a1`), **demotion** (`a3` dopo
  `a2`), **separation** (vincoli di disuguaglianza sulle variabili).

### 5.2 Algoritmo PSP / POP

Piano parziale = (azioni, ordinamenti, binding, causal link, open goals).
Ciclo:

1. se non ci sono flaw (open precondition o threat) → successo;
2. scegli un flaw; se e' precondizione aperta, aggiungi azione o riusa
   esistente creando causal link;
3. se e' threat, applica promotion/demotion/separation;
4. ricorri (con backtracking sui nondeterminismi).

Diagramma descritto: grafo di azioni collegate da frecce causali, con vincoli
d'ordine tratteggiati aggiunti via via; i threat sono archi che "tagliano"
un causal link e vanno spostati prima/dopo.

## 6. Graphplan (`04`, 88 slide)

### 6.1 Planning graph

Grafo orientato aciclico a livelli alterni `S0, A0, S1, A1, ...`:

- `S0`: letterali dello stato iniziale (un nodo per fluente).
- `A0`: tutte le azioni ground applicabili in `S0`, piu' le **no-op**
  (*persistence actions*: se `P ∈ Si` allora resta in `Si+1`).
- `Si`: tutti i letterali che *potrebbero* valere al tempo `i` (sia `P`
  che `¬P` possono coesistere: sovrastima ottimistica).
- `Ai`: tutte le azioni le cui precondizioni *potrebbero* valere in `Si`.
- Costruzione **polinomiale**; astrae lo spazio di ricerca.

### 6.2 Mutex (mutual exclusion)

Il cuore di Graphplan: coppie incompatibili propagate per livelli.

- **Mutex tra azioni** in `Ai`: *interference* (una cancella pre/add
  dell'altra), *competing needs* (precondizioni mutex in `Si`), effetti
  inconsistenti.
- **Mutex tra letterali** in `Si`: se tutti i modi di produrli (azioni in
  `Ai-1`, incluse no-op) sono a coppie mutex (*inconsistent support*).
- I mutex si propagano in avanti e **non** si rimuovono mai erroneamente:
  se due letterali sono mutex a un livello, restano tali finche' il grafo
  non si espande.

### 6.3 Estrazione del piano ed espansione

1. Espandi il grafo finche' il goal e' presente in `Sk` senza mutex, o
   finche' il grafo si **stabilizza** (stessi letterali+mutex su due livelli
   → fallimento: goal irraggiungibile).
2. **Backward search** dal goal all'indietro: a ogni livello scegli azioni
   non mutex che coprono i sottogoal (con backtracking cronologico).
3. Se fallisce, espandi di un livello e riprova.

Euristiche derivate: `h` come livello del grafo (max-level, level-sum sul
relaxed graph senza mutex) — base delle euristiche moderne.

## 7. Planning in ASP (Dovier cap. 12, collegamento sez. 2)

Il libro mostra planning con calcolo di situazioni/eventi in ASP: fluenti
con argomento temporale `holds(F, T)`, azioni `occ(A, T)`, leggi di inerzia
con `not`, vincoli di executability. E' il ponte tra le due sezioni del
corso: stesso problema (sequenza di azioni verso il goal), tecnologia
diversa (solver logico invece di ricerca dedicata).

## 8. Mappa fonti e lacune

| Argomento | Fonte primaria | Dettaglio slide |
|---|---|---|
| Modello STS, classical | `01_planning.pdf` | slide 1–10 circa |
| Forward/backward, STRIPS | `02_..._spazio_stati.pdf` | esempi + slide STRIPS 468+ |
| PDDL domain/problem, Gripper | `02_pddl_approfondimento.pdf` | slide 1–10 |
| Plan-space, causal link, threat | `03_..._spazio_piani.pdf` | slide 1–44 |
| Planning graph, mutex, no-op | `04_..._GRAPHPLAN.pdf` | slide 1–30+ |
| FF, landmark, A\* | `02_..._spazio_stati.pdf` | slide ~78–132 |
| Planning in ASP | Dovier cap. 12 | sez. 1–5 |

Lacune: conteggi slide approssimativi (testo estratto senza numeri
stabili); esempi PDDL logistica solo citati (cartella non scaricata);
nessun file `.pddl` locale da citare letteralmente.
