---
documentclass: arsclassica
id: f97d251f-6fb4-42da-8878-8fc9d67b2a57
roam_aliases: MFI
title: Metodi Formali dell'Informatica
---

- Prof: Ugo De' Liguoro
- [PDF Version](./20210921122326-metodo_formali_dell_informatica.pdf)
- Testo:
  - [[Programming Language Foundation in Agda]]

# Teoria

I linguaggi sono definibili come sistemi formali, composti di

- alfabeto di simboli
- espressioni ben formate
- regole di inferenza

## Metodi Formali

Derivano dalla logica-matematica

- Chompsky - Teoria delle Grammatiche
  - paralleli con gli automi
- Linguaggi di programmazione - Linguaggi formali
  - metodo che permette di verificare - Metodi Formale
    - descrizioni formali del comportamento dei programmi

> In computer science **formal methods** are a particular kind of mathematically based techniques for the specification, development and verification of software and hardware systems - Wikipedia

- Componenti dei metodi formali
  - calcoli logici
  - sistemi di riscrittura
    - semplificazioni
  - linguaggi formali
  - teoria degli automi
  - sistemi di transizione
  - algebra dei dati
  - algebra dei processi
    - esecuzione concorrente
  - algebra relazionale
    - basi di dati
  - semantica dei linguaggi di programmazione
  - teoria dei tipi
  - analisi statica
    - Data Flow
    - Control Flow
    - Abstract Interpretation

L'utilitá é l'analisi matematica che dimostri la robustezza e la correttezza della progettazione hardware e software

- Tool:
  - Infer
  - Key
  - Viper

### Il Problema della Verifica

- In:
  - descrizione di un sistema
  - specifica del suo comportamento o sua proprietá
- Out:
  - evidenza del fatto che il sistema soddisfa la specifica
  - controesempio che non funziona

1.  Semantica Operazionale

    Definisce il significato di un programma come il suo comportamento che, quando termina, trasforma uno stato in un altro

2.  Semantica Logica

    Pre e Post condizioni che un programma soddisfa

    - Floyd
      - metodo delle asserzioni - 1967
        - controllo del flusso di grafi che descrivono le aspettative sullo stato della memoria
    - Hoare
      - formalizza le idee di Floyd
      - Logica di Hoare
        - $`\{\varphi\} P \{\psi\}`$
          - in P out

3.  Verifica Statica

    Il programma non viene eseguito - statico Il testing é fatto sull'esecuzione - dinamico

    - l'importante é la scelta degli esempi di testing
      - G.J.Myers, *The Art of Software Testing*
    - essendo i test **infiniti** il superamento di qualsiasi test non verifica il programma
      - é un metodo di ricerca degli errori, non di verifica

    Processo:

    1.  Contratto
    2.  Invariante di Loop
        - esistono euristiche per trovarlo ma non algoritmi
    3.  Asserzioni Intermedie
        - conducono alla dimostrazione di ció che voglio

4.  Logica di Hoare

    `HL` Usiamo logica debole, <u>non dimostriamo la terminazione</u>. Se il programma termina allora é il risultato sará corretto.

    - Rules:
      - skip
      - assignments
      - sequencing
      - conditionals
      - while loops
      - consequence

    1.  Correttezza di HL

        Teorema: Se la tripla é derivabile in HL, allora é valida

    2.  Limiti teorici

        La logica del primo ordine é corretta e completa ma é <u>indecidibile</u>

        - Teorema di Church
        - non esiste un algoritmo che verifichi che formula logica sia corretta

        `HL` é corretta, ma <u>completa solo in senso debole</u>; include FOL dunque é indecidibile

        Allora si utilizzano Truth Assistant, il teorema di `Rice` ci dimostra che i Verificatori non possono esistere.

        - `Isabelle`
        - `Coq`
        - `Agda`
          - un linguaggio di programmazione funzionale
        - [[VeriFast]]
          - ProofAssistant dedicato a <u>Separation Logic</u> in C e Java

5.  Separation Logic

    Per trattare linguaggi imperativi con puntatori, gestione dinamica della memoria

    - si utilizza per *modularizzare*
    - si guarda una funzione per volta
      - poi si uniscono i risultati per dimostrare la correttezza totale

    Si estendono le asserzioni con:

    - $`s,h \vDash \text{emp}`$
      - *empty heap*
    - $`s,h \vDash a \rightarrow a'`$
      - *singleton heap*
    - $`s,h \vDash P \star Q`$
      - *separating conjunction*
      - $`h_{1} \uplus h_{2}`$

    Le triple $`(c,s,h)`$ sono dette *safe* se $`(c,s,h)  \not{\rightarrow_{*}} \text{error}`$

    1.  Frame Rule

        ``` math
        \frac{\{P\}\; c\; \{Q\}}{\{P \star R\}\; c\; \{Q\star R\}}
        ```

        - pre-condizione $`P`$
        - post-condizione $`Q`$
        - contesto $`R`$

        Se vale questo allora posso spezzare in moduli il codice e verificare questi sottoinsiemi **Lemmi**:

        - *monotonicitá*
          - $`(c,s,h) \text{safe} \implies \forall h' \perp h : (c,s,h\uplus h') \text{safe}`$
          - $`(c,s,h_{0}) \rightarrow^{*} (\text{skip},s',h_{0}') \implies  \\ \forall h_{1} \perp h_{0}:(c,s,h_{0} \uplus h_{1}) \rightarrow^{*} (\text{skip}, s', h_{0}' \uplus h_{1}')`$
          - $`(c,s,h_{0})`$ riduce all'infinito $`\implies \forall h_{1} \perp h_{0} : (c,s,h_{0} \uplus h_{1})`$ riduce all'infinito
        - *frame property*
          - $`(c,s,h_{0})\text{safe} \land (c,s,h_{0} \uplus h_{1}) \rightarrow^{*} (\text{skip},s',h') \implies \\
             \exists h_{0}' \perp h_{1} :  (c,s,h_{0})\rightarrow^{*} (\text{skip},s',h_{0}')\land h' = h_{0}' \uplus h_{1}`$

    2.  Heap Simbolici

        $`H ::= \exists \vec{x} : (P_{1} \land \cdots \land P_{n}) \land (S_{1} \star \cdots \star S_{m})`$

        - $`\vec{x} = \Cup_{i} fv(P_{i}) \cup \Cup_{j} fv(S_{j})`$
        - *puro* e *spaziale*

        Dai *comandi atomici*, definiti conseguentemente alle rispettive regole della logica. Si eseguono poi *sequenze atomiche*
        ``` math
        \{H\} A_{1};\cdots ;A_{n} \{H'\}
        ```
        ``` math
        \frac{\{H\}A_{1}\{H''\} \qquad \{H''\} A_{2} \{H'\}}{\{H\}A_{1};A_{2}\{H'\}}
        ```
        ``` math
        \frac{H,A_{1} \implies H'}{H,A_{1};A_{2} \implies H',A_{2}}
        ```

## Grammatiche

### Concrete

Descrivo <u>Grammatiche Senza Contesti</u> con le <u>Regole di Inferenza</u>

``` math
\frac{}{n \in Aexp}
```
``` math
\frac{}{x \in Aexp}
```
``` math
\frac{a_1\in Aexp \quad a_2 \in Aexp}{a_1 +  a_2 \in Aexp}
```

### Astratte

1.  Backus Normal Form

    Utiliziamo la notazione <u>carrificata</u>

    ``` example
    vname ::== String
    aexp ::== N n | V x | Plus aexp aexp | Times aexp aexp
    ```

## Semantica

### Agda

`Set`, insieme o `Tipo`

``` example
data aexp: Set nohere
N: N -> aexp
V: String -> aexp
Plus: aexp -> aexp -> aexp

depth: aexp -> N
  depth (Nn) = 0
  depth (Vx) = 0
  depth (Plus a b) = 1 + max (depth a) (depth b)
```

Dim. per induzione strutturale:

``` example
depth (Plus a b) <= size (Plus a b)
```

La semantica di $`a \in aexp`$ é un numero $`n \in N`$ Per def il valore di $`V x`$ usiamo gli stati

- $`s \in state = vname \rightarrow val`$

``` example
aval: aexp -> state -> val
  aval (N n) s = n
  aval (V x) s = sx
  aval (Plus a_1 a_2) s = (aval a_1 s) + (aval a_2 s)
```

$`FVa`$: l'insieme delle variabili libere in $`a \in aexp`$

``` example
FV (N n) = nil
FV (V x) = { n }
FV (Plus a_1 a_2) = (FVa_1) U (FVa_2)
```

1.  Lemma FVa

    Se per ogni $`x \in FVa`$ gli stati $`s, s^{'} \mid sx = s^{'}x`$ allora $`aval \: as = aval \: as^{'}`$

    - dim su ind. strutturale su $`a`$

### Sostituzione

$`a[a^{'}/x]`$ intendiama la <u>sostituzione di x con a' in a</u>

``` example
(N n)[a'/x] = N n
(V x)[a'/x] = a'
(V y)[a'/x] = V y
(Plus a_1 a_2)[a'/x] = Plus a_1[a'/x] a_2[a'/x]
```

**Modifica delle variabili** Se $`s\in state, x\in vname, n \in val \mid s[x \rightarrow n] \in state`$

1.  Lemma di Sostituzione

    ``` math
    aval \: (a[a^{'}/x])s = aval \: a \: s [x\rightarrow aval \: a^{'}\: s]
    ```

### Booleani

``` example
bexp ::= B bval
      | Not bexp | And bexp bexp
      | Less aexp aexp -- a < a'

bval ::= tt | ff
```

### Comandi

Espressioni generate dalla grammatica (BNF)

**Sintassi**

``` example
com ::= SKIP                      -- noop
     |  vname := aexp             -- assegnazione
     |  com ; com                 -- composizione sequenziale
     |  IF bexp THEN com ELSE com -- selezione
     |  WHILE bexp DO com         -- iterazione
```

Con queste caratteristiche il nostro linguaggio `IMP` é Touring completo:

- <u>Arbib</u>, *A programming approach to computability*

**Semantica** di `com`

``` example
cval : com -> state -> state
```

Se questa funzione esiste deve essere parziale

- definita solo in alcuni casi

``` example
cval (WHILE b DO c) s = ??
cval (WHILE b DO c) s = s  -- bval b s = ff
cval (WHILE b DO c) s =    -- bval b s = tt
    = cval (c; WHILE b DO c) s
    = cval (WHILE b DO c) (cval c s)
```

In questo caso la definizione é circolare

### Semantica Naturale - Big-step

Usiamo la relazione $`(c,s) \implies t`$ su $`com \times state \times state`$ $`\iff`$ l'esecuzione di $`c`$ in $`s`$ termina in $`t`$

$`(c,s,t) \rightarrow (c,s) \implies t \in bool`$

- true se in un stato finale, false altrimenti
- questa funzione é definibile in `Agda`

Sistema formale:
``` math
\frac{(c_{1},s_{1}) \implies t_{1}\cdots (c_{n},s_{n})\implies t_{n}}{(c_{n+1},s_{n+1})\implies t_{n+1}}
```

1.  Regole

    - `Skip`
      ``` math
      \frac{}{(SKIP,s)\implies s}
      ```
    - `Ass`
      ``` math
      \frac{aval \: a \: s = n}{(n:= a,s)\implies s[x\rightarrow n]
      ```
    - `Comp`
      ``` math
      frac{(c_{1},s)\implies s' \quad (c_{2},s')\implies t}{(c_{1};c_{2},s)\implies t}
      ```

    `IF b THEN c_1 ELSE c_2`

    - 
      ``` math
      \frac{bval \: b\: s = tt \:\: (c_{1},s)\implies t }{(IF \: b \: THEN  \: c_{1} \: ELSE \:c_{2},s)}
      ```
    - 
      ``` math
      \frac{bval \: b\: s = ff \:\: (c_{2},s)\implies t }{(IF \: b \: THEN  \: c_{1} \: ELSE \:c_{2},s)}
      ```

    `WHILE`

    - 
      ``` math
      \frac{ bval \: b\: s = ff}{(WHILE \: b\:DO \: c, s)\implies s}
      ```
    - 
      ``` math
      \frac{ bval \: b\: s = tt \:\: (c,s)\implies s^{'} \:\: (W,s^{'})\implies t}{(WHILE \: b\:DO \: c, s)\implies t}
      ```
      - $`W`$ abbrevia $`(WHILE \: b \: DO \: c, s)\implies t`$

    Con queste si studia la **convergenza**

    1.  Proposizione SKIP

        $`\forall s,t \nvdash (WHILE \: true \: DO \: SKIP,s) \Rightarrow t`$ <u>Dim</u>

        - per assurdo sia $`D`$ una dimostrazione (*derivazione chiusa*) t.c. la sua conclusione sia $`(WHILE \: true \: DO \: SKIP,s) \Rightarrow t`$
        - poiché `bval true s = tt` per ogni `s`, `D` deve terminare con:
          - $`\frac{(SKIP,s)\Rightarrow s^{'} \:\: (W,s^{'})\Rightarrow t}{(W,s)\Rightarrow t}`$
          - ma `s'=s` per SKIP, dunque la des. `D'` ha la stessa forma di `D`, essendo propriamente inclusa in `D`, cioé é infinita
        - dunque `D` non é una dimostrazione

    2.  Equivalenza di Programmi

        I comandi $`c_{1},c_{2}`$ sono <u>equivalenti</u> \[\$c<sub>1</sub> ∼ c<sub>2</sub>\$\]

        - $`\forall s,t \in state . (c_{1},s)\Rightarrow t \iff (c_{2},s)\Rightarrow t`$

        **Lemma** `WHILE b DO c ~ IF b THEN (c;WHILE b DO c) ELSE SKIP`

    3.  Determinismo della semantica naturale

        **Teorema**:

        - Per ogni $`c \in com`$ , per ogni $`st,,t' \in state`$
        - $`(c,s)\Rightarrow t \land (c,s)\Rightarrow t^{'} \implies t=t^{'}`$

    4.  Funzione parziale

        $`[\![ \cdot ]\!]: com \rightarrow state \rightharpoonup state`$ $`[\![c]\!]s = \begin{cases}t & \mbox{se} \vdash (c,s) \Rightarrow t\\\perp & \mbox{altrimenti}\end{cases}`$

### Semantica SOS - Small Step

Singolo <u>passo di calcolo</u> $`(c,s) \rightarrow (c^{'},s^{'})`$

- **Lemma - determinismo**
  - $`(c,s)\rightarrow(c^{'},s^{'}) \land (c,s)\rightarrow(c^{''},s^{''}) \implies c^{'}=c^{''}\land s^{'}=s^{''}`$
- **Corollario**
  - $`(c,s)`$ <u>termina</u> se $`\exists t \mid (c,s) \rightarrow^{*}(\textsc{skip},t)`$, <u>cicla</u> se esiste una sequenza infinita
- `Assegnazione`
  - $`(x := a,s) \rightarrow (\textsc{skip}, s[x \mapsto aval \: as])`$
- `SKIP`
  - $`(\textsc{skip};c,s) \rightarrow (c,s)`$
- `IF`
  - 
    ``` math
    \frac{bval \: b \: s = tt}{(\textsc{if}\: b\: \textsc{then}\:c_{1}\: \textsc{else}\: c_{2},s)\rightarrow (c_{1},s)}
    ```
  - $`ff`$ speculare
- `WHILE`
  - \$(<span class="smallcaps">while</span>\\ b\\ <span class="smallcaps">do</span>\\ c,s) →

(<span class="smallcaps">if</span>\\ b\\ <span class="smallcaps">then</span>\\ (c;\\ <span class="smallcaps">while</span>\\ b\\ <span class="smallcaps">do</span>\\ c)\\ <span class="smallcaps">else</span>\\ <span class="smallcaps">skip</span>, s\$

$`[\![c]\!]_{\textsc{sos}}s = \begin{cases}t & \mbox{se} \vdash (c,s) \rightarrow^{*}(\textsc{skip},t)\\\perp & \mbox{se}\:(c,s)\:\mbox{cicla}\end{cases}`$

- **Teorema di equivalenza delle Semantiche**

$`\forall c\in \mbox{com}\: \forall s,t\in\mbox{state}\mid[\![c]\!]_{\textsc{nat}}s=[\![c]\!]_{\textsc{sos}}s`$

## Teoria dei Tipi

<span class="spurious-link" target="~/Code/Agda/quantifiers.agda">*file Agda*</span>

Il quantificatore universale si traduce, nella teoria dei tipi dipendenti, in

``` math
\frac{A : \text{Set} \qquad x : A \vdash B[x] : \text{Set}}{\pi[x : A] B[x] : \text{Set}}
```
dove

$`\pi [x:A] \: B[x] \equiv B[a_{1}] \times B[a_{2}] \times \cdots`$ per $`a_{i}\in A`$ corrisponde a $`\forall x \: . \: B[x] \iff B[a_{1}] \land B[a_{2}] \land \cdots`$

Il $`\pi`$ sta per il concetto di indicizzazione:

- forma famiglie secondo i suoi indici

$`\forall (\lambda \: x \: \rightarrow B\: x): \text{Set}`$

- il quantificatore é un operatore che viene applicata al lambda

## Logica Classica e Intuizionistica

- [Wadler](https://plfa.github.io/Negation/)

> In Gilbert and Sullivan’s The Gondoliers, Casilda is told that as an infant she was married to the heir of the King of Batavia, but that due to a mix-up no one knows which of two individuals, Marco or Giuseppe, is the heir. Alarmed, she wails “Then do you mean to say that I am married to one of two gondoliers, but it is impossible to say which?” To which the response is “Without any doubt of any kind whatever.”
>
> Logic comes in many varieties, and one distinction is between classical and intuitionistic. Intuitionists, concerned by assumptions made by some logicians about the nature of infinity, insist upon a constructionist notion of truth. In particular, they insist that a proof of A ⊎ B must show which of A or B holds, and hence they would reject the claim that Casilda is married to Marco or Giuseppe until one of the two was identified as her husband. Perhaps Gilbert and Sullivan anticipated intuitionism, for their story’s outcome is that the heir turns out to be a third individual, Luiz, with whom Casilda is, conveniently, already in love.
>
> Intuitionists also reject the law of the excluded middle, which asserts A ⊎ ¬ A for every A, since the law gives no clue as to which of A or ¬ A holds. Heyting formalised a variant of Hilbert’s classical logic that captures the intuitionistic notion of provability. In particular, the law of the excluded middle is provable in Hilbert’s logic, but not in Heyting’s. Further, if the law of the excluded middle is added as an axiom to Heyting’s logic, then it becomes equivalent to Hilbert’s. Kolmogorov showed the two logics were closely related: he gave a double-negation translation, such that a formula is provable in classical logic if and only if its translation is provable in intuitionistic logic.
>
> Propositions as Types was first formulated for intuitionistic logic. It is a perfect fit, because in the intuitionist interpretation the formula A ⊎ B is provable exactly when one exhibits either a proof of A or a proof of B, so the type corresponding to disjunction is a disjoint sum.
>
> (Parts of the above are adopted from “Propositions as Types”, Philip Wadler, Communications of the ACM, December 2015.) ~ [[Philip Wadler]] [[$cit]]

- [[Propositions as Types]] è un paradigma che pone le proposizioni e tipi come equivalenti.
  - in [[Type Theory]]
  - una proposizione è identificata come il tipo (collezione) delle sue prove
  - un tipo è identificato come la proposizione che contiene i suoi termini

### Semantica di Heyting

``` math
\frac{B[t]}{\exists x \: . \: B[x]}
```
``` math
\langle t, M \rangle \: : \exists x \: . \: B[x]
```
dove
``` math
M\: :\: B[t]
```

## IMP

<span class="spurious-link" target="~/Code/Agda/IMP.agda">*Definizione in Agda*</span>

### Estensione Puntatori

`com ::= ...` `| x := cons(a_1,...,a_2)` *allocation* `| n := [a]` *lookup* `| [a] := a'` *mutation* `| dispose(a)` *deallocation*

la notazione `[a]` richiama il concetto di heap come array, dove `a` ne é l'indice

1.  Semantica

    `store = var_name -> Val` `heap = loc -> Val`

    Per $`h \in \text{heap}, n\ge 0`$

    - $`h = \{l_{1} \rightarrow v_{1} \cdots  l_{n} \rightarrow v_{n}\}`$
    - $`\text{dom}(h | {l_{1}\cdots l_{n}})`$
      - le locazioni allocate

    Viene aggiunta alla semantica `SOS` lo heap `h`

    1.  Indipendenza dello Heap

        $`h_{1} \perp h_{2} \iff \text{dom}(h_{1}) \cap \text{dom}(h_{2}) = \emptyset`$

### Semantica Operazionale

<span class="spurious-link" target="~/Code/Agda/IMP-Op.agda">*File Agda*</span>

### StackMachine

Basato su <span class="spurious-link" target="~/Code/Agda/C-List.agda">*~/Code/Agda/C-List.agda*</span>

- <span class="spurious-link" target="~/Code/Agda/StackMachine.agda">*Source*</span>

### Compilatore

[[Nipkow]], cap. 8

Linguaggio `IMP` $`\longrightarrow`$ istruzioni di una macchina astratta

- c : com $`\mapsto`$ p : prog
  - $`(c,s) \Rightarrow t`$
    - correttezza $`\Rightarrow`$
    - completezza $`\Leftarrow`$
  - $`p \vdash (0,s,[\:]) \rightarrow^* (\text{size }p,t,[\:])`$
    - program counter
    - memoria
    - stack

instr

- `LOADI int`
- `LOAD vname`
- `ADD`
- `STORE vname`
- `JMP int`
- `JMPLESS int`
- `JMPGE int`

Si definisce `lookup i P` dove $`0 \le i < \text{size} P`$

- in `Agda` le funzioni parziali non sono ammesse e quindi questo va adattato

``` math
\frac{0 \le i < \text{size }P \quad \text{iexec }(\text{lookup }i\; P)(i,s,stk) \equiv (i',s',stk')}{P\vdash (i,s,stk) \rightarrow (i',s',stk')}
```

Un singolo passo di esecuzione (programma $`P`$ esegue dalla configurazione $`c`$ a $`c'`$) $`P \vdash c \rightarrow c'`$

1.  bcomp

    $`bcomp :: bexp \Rightarrow bool \Rightarrow int \Rightarrow prog`$

    `Lemma 8.8` Si definisce il program counter sui salti condizionali:

    - $`\text{pc'} = \text{size }(\text{bcomp }b \:f \:n) + (\text{ if } f = \text{ bval } b\: s \text{ then } n \text{ else } 0 )`$
