# Conoscenza incerta e ragionamento probabilistico — note complete

> Fonti: slide sez. 5 (`06_Incertezza.pdf`, 113 slide); esempi di reti
> `raffreddore.net`, `earthquake.net`, `cow.net` (apribili con SamIam);
> libro free Genesereth–Kao (probabilita' e Bayes, cap. dedicati).
> Termini inglesi verbatim: *uncertainty, partial observability, degree of
> belief, prior/posterior probability, conditional probability, Bayes' rule
> (theorem), conditioning, full joint distribution, independence, conditional
> independence, Naive Bayes, Bayesian network (BN), nodes/DAG, CPT
> (conditional probability table), Markov blanket, d-separation, enumeration,
> variable elimination, MAP/MPE, sampling, SamIam*.

---

## 1. Perche' la logica pura non basta (slide 1–2)

Esempio aeroporto: `At` = partire `t` minuti prima. Problemi: osservabilita'
parziale (traffico), osservazioni imprecise (meteo), esiti incerti delle
azioni (auto non parte), modello completo intrattabile. La logica rischia
decisioni errate ("A25 mi porta in tempo") o conclusioni inutili ("arrivo se
il ponte non e' bloccato, se non piove, se ..."). Esempio medico: da
`∀p. Sintomo(p, MalDiDenti) ⇒ Malattia(p, Carie)` (falso: non sempre) alla
disgiunzione con tutte le cause (lunga, forse ignota). Serve il
**ragionamento graduato**: gradi di belief aggiornati dall'evidenza.

## 2. Fondamenti di probabilita' (ripasso dalle slide)

- **Probabilita' a priori**: `P(A)` senza evidenza; **a posteriori**:
  `P(A|e)` data evidenza `e`.
- **Probabilita' condizionata**: `P(A|B) = P(A ∧ B) / P(B)`, con `P(B) > 0`.
- **Regola di Bayes**: `P(Causa|Effetto) = P(Effetto|Causa)·P(Causa)/P(Effetto)`.
  Uso diagnostico (slide): dai sintomi alle cause — "se anche un sintomo e'
  raro, Bayes ci dice come concludere" combinando verosimiglianza e base
  rate. Per usare Bayes servono distribuzioni aggiuntive (priori,
  likelihood), elencate nelle slide.
- **Distribuzione congiunta completa**: `P(X1..Xn)` risponde a QUALSIASI
  query per somma/marginalizzazione, ma ha dimensione esponenziale
  (`O(2^n)` binarie): intrattabile oltre poche variabili.
- **Indipendenza** e **indipendenza condizionata**: `P(X,Y) = P(X)P(Y)`;
  `P(X|Y,Z) = P(X|Z)`. Sono le leve per compattare la congiunta.

## 3. Naive Bayes (slide ~modello ingenuo)

**Modello di Bayes ingenuo** (*Naive Bayes classifier*): la classe `C`
e' genitore di tutti gli attributi `Ai`, assunti condizionatamente
indipendenti data `C`:

```
P(C|A1..An) = α · P(C) · Πi P(Ai|C)
```

Semplice, robusto, sorprendentemente efficace (testo, spam, diagnosi
grossolane); limite: l'assunzione di indipendenza e' spesso falsa (sintomi
correlati), ma la classificazione resta buona anche con probabilita'
malcalibrate.

## 4. Reti bayesiane: sintassi e semantica

### 4.1 Struttura (slide `Reti Bayesiane`)

- **DAG** i cui nodi sono variabili aleatorie; arco `X → Y` = dipendenza
  diretta ("X influenza Y").
- Ogni nodo ha una **CPT**: `P(Xi | Genitori(Xi))`. Nodi radice: priori.
- **Semantica globale**: la rete definisce
  `P(X1..Xn) = Πi P(Xi | Genitori(Xi))` (chain rule rispettando l'ordine
  topologico). Se ogni variabile ha ≤ k genitori: `O(n·2^k)` parametri
  invece di `O(2^n)`.
- Costruzione: attenzione all'**ordine** di inserimento (cause prima degli
  effetti); una rete rispetta la semantica globale solo se ogni nodo e'
  condizionatamente indipendente dai non-discendenti dati i genitori.

### 4.2 Indipendenza dalla topologia

- La topologia specifica le **indipendenze condizionali** (lettura
  `d-separation` nelle slide avanzate).
- **Markov blanket**: ogni nodo e' condizionatamente indipendente da tutti
  gli altri data la sua coperta — genitori + figli + genitori dei figli.
  Per "costruire/riparare" una rete basta ragionare localmente sul blanket.
- Reti piu' deboli (archi mancanti = indipendenze affermate) vs piu'
  forti: meno archi = piu' compatte ma piu' assunzioni.

### 4.3 Esempi locali: earthquake, raffreddore, cow

- `earthquake.net` (classico allarme): Burglary/Earthquake → Alarm →
  JohnCall/MaryCall; le slide calcolano `P(Burglary | john, mary)`.
- `raffreddore.net`: modello didattico domestico (raffreddore/sintomi).
- `cow.net`: esempio veterinario. Tutti apribili e interrogabili in
  **SamIam** (link in `links.md`).

## 5. Inferenza: enumeration, variable elimination

Dato `U` partizionato in **evidenza** `E = e`, **query** `X`, **nascoste**
`Y = U ∖ E ∖ X`:

```
P(X|e) = α · P(X, e) = α · Σy P(X, e, y)
```

### 5.1 Enumeration con la rete (slide esempio allarme)

```
P(B|j,m) = α · Σe Σa P(B)·P(e)·P(a|B,e)·P(j|a)·P(m|a)
```

Osservazioni slide: i fattori nel prodotto crescono **linearmente** in `n`
(grazie all'indipendenza), ma le somme restano **esponenziali** (`O(n·2^n)`
→ `O(2^n)`); portando fuori i fattori non indicizzati si risparmia spazio
(linear) ma non tempo, e molti calcoli si ripetono.

### 5.2 Variable elimination (VE)

Evita ripetizioni eliminando una variabile nascosta alla volta: moltiplica
solo i fattori che la contengono, somma su di essa, rimpiazza con il nuovo
fattore (senza quella variabile). Ordine di eliminazione = euristica
(min-degree/min-fill); complessita' dominata dalla dimensione del fattore
piu' grande (legata al *treewidth*). Le slide introducono VE come
miglioramento diretto dell'enumeration.

### 5.3 Altri task (cenni)

- **MAP/MPE**: assegnazione piu' probabile (a un sottoinsieme / a tutte le
  nascoste). Piu' dura dell'inferenza condizionale.
- **Campionamento**: simulazione (rejection, likelihood weighting, MCMC)
  per reti grandi; SamIam li visualizza.

## 6. CF vs probabilita' (ponte con sez. 4)

Le slide dicono esplicitamente che i **CF sono gradi di belief che NON
soddisfano gli assiomi della probabilita'**: utili quando elicitare CPT
complete e' impossibile (MYCIN), ma incoerenti. La via probabilistica
richiede piu' numeri (CPT) ma da' risposte coerenti e componibili; Naive
Bayes e' la via di mezzo (pochi numeri, assunzioni forti).

## 7. Mappa fonti e lacune

| Argomento | Fonte primaria |
|---|---|
| Limiti logica, aeroporto, denti | `06_Incertezza.pdf` slide 1–2 |
| Probabilita', Bayes, uso diagnostico | slide su regola/uso di Bayes |
| Naive Bayes | slide modello ingenuo (~924) |
| BN sintassi/semantica/blanket | slide `Reti Bayesiane` + costruzione |
| Inferenza/enumeration/esempio allarme | slide 47–49 |
| Variable elimination | slide algoritmo VE |
| CF vs probabilita' | slide ~279 + sez. MYCIN in `05` |
| Esempi eseguibili | `raffreddore.net`, `earthquake.net`, `cow.net` + SamIam |

Lacune: derivazioni numeriche complete solo per l'esempio allarme; file
`.net` non trascritti (vanno aperti in SamIam); dimostrazioni di
complessita' solo enunciate; nessun riferimento a capitoli AIMA/Koller
mappati 1:1 (vedi `references.md`).
