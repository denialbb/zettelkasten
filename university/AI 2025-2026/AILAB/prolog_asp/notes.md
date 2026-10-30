# Prolog e Answer Set Programming — note complete

> Fonti: slide sez. 2 (`introduzione 2526.pdf`, `introduzione al Prolog.pdf`,
> `interprete Prolog e risoluzione SLD.pdf`, `unificazione.pdf` di Martelli,
> `cut.pdf`, `strategie di ricerca nello spazio degli stati.pdf`,
> `euristiche.pdf`, `asp.pdf`, `prolog-Endriss.pdf`); libro
> Dovier–Formisano *Programmazione Dichiarativa in Prolog, CLP e ASP*
> (cap. 1–12); libro free Genesereth–Kao *Introduction to Logic* (cap. 1–17);
> file `antenatiTesto.pl`, `labirinto.pl`.
> Termini inglesi riportati verbatim: *unification, substitution, most general
> unifier (MGU), SLD-resolution, SLD-tree, choice point, backtracking,
> depth-first search, cut, negation as failure (NaF), stable model, answer set,
> Gelfond–Lifschitz reduct, choice rule, cardinality constraint, aggregate,
> grounding, generate-and-test, A\*, IDA\**.

---

## 1. Inquadramento: programmazione dichiarativa

Il Prolog (programming in logic) e' un linguaggio **dichiarativo**: non si
descrive *come* risolvere un problema (sequenza di istruzioni), ma si descrive
la realta' con **fatti e regole** e si chiede all'interprete se un **goal**
segue logicamente dal programma secondo la logica classica
(`introduzione al Prolog.pdf`, slide "Introduzione"; Dovier–Formisano cap. 1).

Esempio minimale:

```prolog
piuCalorico(wurstel, banana).
felino(X) :- gatto(X).
```

- Il fatto `piuCalorico(wurstel, banana)` asserisce una relazione vera.
- La regola `felino(X) :- gatto(X)` si legge "X e' un felino se X e' un gatto":
  la testa (`head`) e' vera se tutti i sottogoal del corpo sono veri.
- Regole **ricorsive** sono la norma (es. antenato, raggiungibilita').

Corso (`introduzione 2526.pdf`): l'obiettivo formativo e' usare formalismi
logici per rappresentazione della conoscenza e ragionamento — calcolo dei
predicati del primo ordine, programmazione logica, ragionamento non monotono,
ASP — con pratica in Prolog (SWI-Prolog), strategie di ricerca in Prolog e
ambiente **clingo**.

## 2. Sintassi: termini, atomi, clausole

### 2.1 Alfabeto (Dovier–Formisano cap. 2–3; `introduzione al Prolog.pdf`)

- **Costanti** (atomi che iniziano minuscoli): `verza`, `a`, `anche_questo`.
- **Numeri**: interi e reali.
- **Stringhe quotate**: `'Questo e un atomo'`.
- **Variabili**: iniziale maiuscola o underscore (`X`, `Y`, `_`, `_Temp`).
  `_` da sola e' la variabile anonima (ogni occorrenza distinta).
- **Termini composti**: funtore applicato a n termini,
  `sopra(penna, tavolo)`, `data(torino, '12/07/1995')`, liste `[1,2,3]`.
- **Predicati**: relazioni su termini, `gatto(felix)`, `arco(a, b)`.

### 2.2 Clausole di Horn e programmi

Una **clausola di Horn definita** ha forma:

```
A :- B1, B2, ..., Bn.      (n >= 0)
```

- `A` e' la testa (un atomo), `B1..Bn` il corpo (congiunzione).
- Se `n = 0` si scrive `A.` ed e' un **fatto**.
- Se il corpo e' non vuoto e' una **regola**.
- Un **programma logico** e' un insieme finito di clausole definite.
- Un **goal** (query) e' `?- G1, ..., Gk.` — una clausola senza testa.

Dovier–Formisano cap. 3 distingue programmi proposizionali (dominio vuoto),
con dominio finito (*database programming*) e con dominio infinito; i
programmi logici sono **Turing-completi** (cap. 3.5).

### 2.3 Liste, alberi, grafi (Dovier–Formisano cap. 7; Endriss cap. su liste)

- Lista: `[]` vuota, `[H|T]` testa/coda. `member/2`, `append/3`, `length/2`.
- Alberi e grafi come termini composti; automi finiti come fatti `trans/3`.
- **Difference list**: coppia `L-R` per concatenazione O(1).

## 3. Sostituzioni e unificazione (MGU)

Fonte primaria: `unificazione.pdf` (Martelli, da Martelli–Montanari 1982) e
Dovier–Formisano cap. 4; richiamo in Genesereth–Kao cap. su unificazione.

### 3.1 Sostituzioni

Una **sostituzione** (*substitution*) e' una funzione da variabili a termini,
rappresentata come insieme finito di coppie:

```
sigma = {x1/t1, x2/t2, ..., xn/tn}
```

con `xi` variabili distinte. Applicare `sigma` a un termine `t` (scritto
`t sigma`) significa rimpiazzare **simultaneamente** ogni occorrenza di `xi`
con `ti`. Esempio delle slide:

```
t = f(x1, g(x2), a), sigma = {x1/h(x2), x2/b}
t sigma = f(h(x2), g(b), a)
```

La **composizione** `sigma1 sigma2` si ottiene applicandole in sequenza.

### 3.2 Unificatori e MGU

Due termini `t1`, `t2` sono **unificabili** se esiste `sigma` con
`t1 sigma = t2 sigma` (identici sintatticamente). Esempio slide:

```
t1 = f(x1, h(x1), x2), t2 = f(g(x3), x4, x3)
sigma1 = {x1/g(x3), x2/x3, x4/h(g(x3))}   (generale)
sigma2 = {x1/g(a), x2/a, x3/a, x4/h(g(a))} (istanziata)
```

`theta` e' **piu' generale** di `sigma` se esiste `lambda` con
`sigma = theta lambda`. Teorema: se due termini sono unificabili esiste un
**most general unifier (MGU)**, unico a meno di ridenominazione.

### 3.3 Algoritmo di Martelli–Montanari (trasformazioni su equazioni)

Il problema e' un insieme di equazioni `{tj = tj'}`. Si applicano
trasformazioni che preservano l'equivalenza fino alla **forma risolta**
(`xj = tj` con `xj` che occorre solo a sinistra):

1. **Term reduction**: `f(t1..tn) = f(s1..sn)` diventa `{t1=s1, ..., tn=sn}`;
   se i funtori o le arieta' differiscono → fallimento (clash).
2. **Variable elimination**: da `x = t` (con `x` non in `t`) si sostituisce `x`
   con `t` in tutte le altre equazioni.
3. **Orient**: `t = x` (t non variabile) diventa `x = t`.
4. **Occurs check**: `x = t` con `x` che occorre in `t`, `t != x` → non
   unificabili.

Diagramma descritto: un grafo/lista di equazioni che si contrae a ogni passo;
la forma risolta e' l'MGU letto direttamente come `{x1/t1, ..., xk/tk}`.

Nota pratica (Dovier–Formisano cap. 4.4): molti interpreti Prolog **omettono**
l'occurs check per efficienza (`unify_with_occurs_check/2` in SWI-Prolog lo
esegue esplicitamente).

## 4. Interprete Prolog e SLD-risoluzione

Fonte: `interprete Prolog e risoluzione SLD.pdf`; Dovier–Formisano cap. 5–6.

### 4.1 Risoluzione e refutazione (ripasso logica)

- **Conseguenza logica** `K |= F`: F vera in tutti i modelli di K (tavole di
  verita' nell'esempio gatto/persiano/miagola delle slide).
- **Metodo di prova**: procedura corretta (dimostra solo conseguenze) e
  completa (dimostra tutte le conseguenze).
- **Risoluzione**: da `C1 = A1 ∨ ... ∨ An` e `C2 = B1 ∨ ... ∨ Bm`, se
  `Ai = ¬Bj`, si deriva il **risolvente** (tutti i letterali tranne la coppia
  complementare). Il risolvente e' conseguenza logica di `C1 ∪ C2`.
- **Refutazione**: per provare `K |= F` si mostra che `K ∪ {¬F}` e'
  inconsistente, derivando la **clausola vuota**.

### 4.2 SLD-risoluzione

**SLD** = *Selection rule driven, Linear resolution for Definite clauses*:
risoluzione lineare con regola di selezione, specializzata per clausole di
Horn. Schema nondeterministico delle slide:

```
interprete(G):
  se G vuoto → successo
  sia G = G1, G2, ..., Gn
  sia R = clausole applicabili a G1 (rinomina variabili + unifica testa)
  se R vuoto → fallimento
  altrimenti scegli A :- B1..Bm in R, sia σ = MGU(G1, A)
    interprete(B1σ, ..., Bmσ, G2σ, ..., Gnσ)
```

Punti chiave:

- **Ridenominazione** (*renaming*): le variabili della clausola vanno
  standardizzate (fresche) a ogni uso.
- **Backward chaining in profondita'** (*depth-first search*): si parte dal
  goal e si espandono i sottogoal da sinistra.
- Teorema (Dovier–Formisano cap. 5.2): **indipendenza dal nondeterminismo** —
  esistenza di una derivazione di successo non dipende dalla regola di scelta
  della clausola; l'ordine influenza solo efficienza/terminazione pratica.

### 4.3 Dal nondeterminismo al Prolog reale

L'interprete Prolog rende deterministica la procedura:

1. Clausole considerate **nell'ordine in cui sono scritte**.
2. **Backtracking** all'ultimo **choice point** a ogni fallimento.
3. Sottogoal risolti da sinistra a destra.
4. In caso di successo restituisce la sostituzione per le variabili del goal.

**SLD-albero** (*SLD-tree*): nodi = goal, archi = clausole applicate; il
backtracking lo visita in profondita' da sinistra. `cut` pota rami
di questo albero (sez. 5).

### 4.4 Semantica: tre punti di vista equivalenti (Dovier cap. 6)

1. **Osservazionale**: insieme dei goal con successo + risposte calcolate.
2. **Modellistica (logica)**: minimo modello di Herbrand — intersezione di
   tutti i modelli, costruibile per iterazione dell'operatore `TP`.
3. **Punto fisso**: minimo punto fisso dell'operatore di immediata
   conseguenza `TP` (Knaster–Tarski).

Per programmi definiti (senza negazione) le tre semantiche coincidono.

## 5. Cut e controllo extra-logico

Fonte: `cut.pdf` (anche da slide Lamma, Univ. Ferrara); Dovier cap. 8.4.

- `!` (**cut**) e' un predicato **sempre vero** che, se eseguito, **blocca il
  backtracking**: e' un predicato **extra-logico** (altera il controllo,
  perdita di dichiarativita').
- Modello run-time: stack di esecuzione (*environment*) + stack di
  backtracking (**choice point**); il cut rimuove choice point.
- Effetto in `p :- q1..qi, !, qi+1..qn.` al momento del cut:
  - le scelte fatte per `p` e per `q1..qi` diventano **definitive**;
  - `!` ha successo ed e' ignorato in backtracking;
  - se `qi+1..qn` fallisce, **tutta** `p` fallisce (niente alternative
    precedenti).
- Potando rami dell'SLD-albero si perde la **completezza**.
- Usi tipici: cut **verde** (*green cut* — solo efficienza, semantica
  invariata, es. determinismo dopo test) vs cut **rosso** (*red cut* —
  cambia le risposte, es. implementare `if-then-else`, negazione per
  fallimento). Endriss e Dovier 8.4 mostrano `max/3`, `not/1` via cut+fail.
- Costrutti collegati: `->` (if-then-else), `\+` (negazione per fallimento),
  `fail`, `true`, `repeat`.

## 6. Negazione per fallimento e programmi generali

Dovier cap. 9; slide SLD parte su `not`.

- Nei **programmi generali** il corpo puo' contenere letterali negati
  `not A` (in Prolog `\+ A`).
- **Negation as failure (NaF)**: `not A` ha successo se `A` fallisce
  finitamente. Regola operativa (SLDNF): per `not A`, lancia una
  sotto-derivazione di `A`; se fallisce → `not A` vero; se ha successo →
  `not A` fallisce.
- Problemi: **floundering** (goal non ground), non monotonicita' logica
  (aggiungere fatti puo' ritrarre conclusioni), loop infiniti.
- **Negazione costruttiva** (Dovier 9.3): estensione che restituisce vincoli
  invece di solo fallimento/successo.
- `\+` in SWI-Prolog implementa NaF con cut+fail:
  `\+ G :- G, !, fail.  \+ _.`

## 7. Ricerca nello spazio degli stati in Prolog

Fonte: `strategie di ricerca nello spazio degli stati.pdf`; programmi
`labirinto.pl`, `antenatiTesto.pl`.

### 7.1 Modellazione

- **Stato** come termine (dipende dal dominio): mondo dei blocchi
  `on(a,b)`, puzzle dell'8 come lista `[3,1,v,4,7,8,5,6,2]`, labirinto come
  coordinate `(X,Y)`.
- **Azioni**: `applicabile(Az, S)` (precondizioni) e
  `trasforma(Az, S, NuovoS)` (effetti).
- **Istanza**: `iniziale(S)`, `finale(S)` (test goal).
- **Soluzione**: cammino da iniziale a goal; **ottima** se costo minimo
  (costo = somma dei costi delle azioni).

### 7.2 Strategie implementabili

Le slide elencano e i file `.pl` mostrano:

- **DFS con controllo cicli** (visited list) — completa su spazi finiti,
  non ottimale, memoria lineare.
- **BFS** (coda / lista di cammini) — ottimale a costo uniforme, memoria
  esponenziale.
- **Iterative deepening** — compromesso tempo/memoria.
- **Best-first / A\***: `f(n) = g(n) + h(n)` con `g` costo dal via e `h`
  stima al goal; con `h` ammissibile A\* e' ottimale (dettagli in
  `euristiche.pdf`).
- **IDA\*** (*iterative deepening A\**): soglia su `f`, memoria lineare —
  oggetto del progetto d'esame (parte Prolog) su labirinto e 8-puzzle.

### 7.3 Euristiche: ammissibilita' e consistenza (`euristiche.pdf`)

- `d(s)` = distanza minima vera al goal (ignota).
- `h(s)` **ammissibile** se `0 ≤ h(s) ≤ d(s)` per ogni `s` → A\* ottimale.
- `h(s)` **consistente** (*consistent/monotone*) se
  `h(s) ≤ c(s,s') + h(s')` per ogni successore `s'`, con `h(goal) = 0` →
  consistente implica ammissibile; con h consistente **non serve riaprire**
  nodi gia' visitati (i valori `f` lungo un cammino sono non decrescenti).
- Esempi: **distanza di Manhattan** nel labirinto — monotona solo se mosse
  4-direzionali a costo uniforme e senza diagonali; altrimenti NO.
- Le slide mostrano il caso "perche' riaprire un nodo": con euristica solo
  ammissibile (non consistente) un nodo chiuso puo' essere raggiunto con `g`
  minore e va riaperto.

## 8. Answer Set Programming

Fonte: `asp.pdf`; Dovier cap. 10–12; solver **clingo** (Potassco).

### 8.1 Motivazione

Nata dalla "*war of semantics*" sulla negazione per fallimento, poi
divenuta un paradigma autonomo: le soluzioni sono i **modelli (answer set)**,
non le prove. Inferenza **non** basata su backward chaining ma su
costruzione di **modelli stabili** (*stable models*). Ideale per problemi
combinatori (vincoli, planning); solver efficienti: DLV, smodels, **clingo**,
Cmodels.

Differenze ASP vs Prolog (slide):

- Ordine dei letterali **irrilevante** in ASP.
- Prolog e' **goal-directed**, ASP no (model generation).
- SLD puo' andare in **loop**, gli ASP solver no.
- Prolog ha il **cut**, ASP no.

### 8.2 Sintassi

Regola:

```
a :- b1, ..., bn, not c1, ..., not cm.
```

- `a, bi, cj` letterali `p` o `-p` (`-` = **negazione classica**/forte,
  `not` = **negazione per fallimento**).
- `-p` trattato come nuovo atomo positivo + vincolo `:- p, -p.`
- `a` opzionale: senza testa e' un **integrity constraint**
  `:- a1, ..., ak.` ("e' inconsistente che siano tutti veri").
- Programmi **proposizionali** (ground); i tool accettano variabili ma devono
  essere **groundizzabili** in un numero finito di clausole (es.
  `pickup(X)` → `pickup(a)`, `pickup(b)`).

Esempio negazioni (slide):

```
attraversa :- -treno.      % classica: attraverso solo se DERIVO che non arriva
attraversa :- not treno.   % per fallimento: attraverso se NON SO che arriva
```

### 8.3 Semantica: reduct di Gelfond–Lifschitz

1. Programma **senza** `not`: unico **modello minimale** = answer set.
   Es. `p :- q. q.` → `{p, q}`; `p :- q, r. q.` → `{q}`.
2. **Reduct** `P^S` di `P` rispetto a insieme `S`:
   - rimuovi ogni regola il cui corpo contiene `not L` con `L ∈ S`;
   - rimuovi tutti i `not L` restanti.
   `P^S` e' positivo → ha unico answer set; se coincide con `S`, allora `S`
   e' un **answer set** di `P`.
3. Esempio completo delle slide con `p :- a. a :- not b. b :- not a.`:
   candidati ⊆ `{a,b,p}`; answer set risultanti **`{b}`** e **`{a,p}`**
   (verifica per reduct mostrata slide per slide).
4. I constraint **filtrano** gli answer set; esistono programmi con modelli
   ma **senza** answer set (es. `p :- not p, d. d.` —Slide: candidati `{d}`,
   `{p,d}` entrambi scartati).

### 8.4 Metodologia generate-and-test + aggregati

- **Generate**: regole (spesso disgiuntive/choice) descrivono candidati.
- **Test**: integrity constraint scartano i non accettabili.
- **Aggregati** in clingo: `n { p(X) : q(X) } m.` seleziona answer set con
  tra `n` ed `m` atomi `p` (da `q`). Esempio slide: ogni variabile ha un solo
  tipo: `1 { ha_tipo(V,T) : tipo(T) } 1 :- variabile(V).`
- Dovier cap. 11: N-regine, map coloring, Hamiltoniano, k-clique, knapsack,
  zebra; cap. 12: planning in ASP (proiezione temporale, calcolo di
  situazioni/eventi).

### 8.5 Clingo (cenni operativi)

Solver free su potassco.org; guida utente sulla pagina del corso. Flusso:
`clingo dominio.lp istanza.lp` → answer set; opzioni numero modelli,
ottimizzazione (`#minimize`), enumerazione. Il progetto d'esame usa ASP per
il calendario del torneo Pokémon (dettagli in `projects/`).

## 9. Mappa delle fonti per argomento

| Argomento | Fonte primaria | Approfondimento |
|---|---|---|
| Fatti/regole, ricorsione | `introduzione al Prolog.pdf` | Endriss cap. 1–2; Dovier cap. 3 |
| Sostituzioni, MGU, algoritmo | `unificazione.pdf` | Dovier cap. 4; Genesereth–Kao |
| SLD, semantica vs prova | `interprete Prolog e risoluzione SLD.pdf` | Dovier cap. 5–6 |
| Cut, stack, choice point | `cut.pdf` | Dovier cap. 8.4; Endriss su cut |
| Ricerca stati, A\*, IDA\* | `strategie....pdf`, `euristiche.pdf` | `labirinto.pl`; Dovier cap. 12 |
| NaF, programmi generali | Dovier cap. 9 | `cut.pdf` (not via cut+fail) |
| ASP sintassi/semantica | `asp.pdf` | Dovier cap. 10–11 |
| ASP planning | Dovier cap. 12 | slide planning sez. 3 |

Fonti non chiare / lacune: `cut.pdf` riusa molte slide grafiche di Lamma il
cui testo non e' estraibile (stack/environment illustrati solo per immagini);
`antenatiTesto.pl` e `labirinto.pl` non ancora trascritti in queste note;
Endriss `prolog-Endriss.pdf` usato solo come primer, capitoli non mappati
1:1 alle slide.
