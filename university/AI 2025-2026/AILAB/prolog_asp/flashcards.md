Q: Che differenza c'e' tra un linguaggio dichiarativo come Prolog e un linguaggio imperativo?
A: Nel linguaggio dichiarativo si descrive la realta' con fatti e regole e si chiede all'interprete se un goal segue logicamente; in quello imperativo si descrive cosa fare passo passo per risolvere il problema.
---
Q: Come si legge la regola Prolog felino(X) :- gatto(X)?
A: Si legge X e' un felino se X e' un gatto: la testa felino(X) e' vera quando il sottogoal gatto(X) del corpo e' vero.
---
Q: Cosa sono testa e corpo di una regola Prolog?
A: La testa (head) e' l'atomo a sinistra di :- che si vuole concludere; il corpo e' la congiunzione di sottogoal a destra di :- che devono essere veri.
---
Q: Cosa e' un fatto in Prolog e come si scrive?
A: E' una clausola con sola testa e corpo vuoto, scritta come A. Esempio: piuCalorico(wurstel, banana).
---
Q: Cosa e' un goal (query) in Prolog?
A: E' una clausola senza testa, scritta ?- G1, G2, ..., Gk. Chiede all'interprete di dimostrare la congiunzione di atomi.
---
Q: Quali sono le convenzioni sintattiche per costanti e variabili in Prolog?
A: Le costanti e gli atomi iniziano con lettera minuscola (verza, a) o sono quotati; le variabili iniziano con maiuscola (X, Y) o underscore.
---
Q: Cosa e' la variabile anonima in Prolog?
A: E' il simbolo _ usato quando il valore non interessa; ogni occorrenza e' una variabile distinta.
---
Q: Cosa e' un termine composto in Prolog? Fai un esempio.
A: E' un funtore applicato a termini, come sopra(penna, tavolo) o nato(giovanni, data(torino, '12/07/1995')).
---
Q: Cosa e' una clausola di Horn definita?
A: E' una formula della forma A :- B1, ..., Bn con n >= 0, dove A e' un atomo e i Bi sono atomi; con n = 0 e' un fatto.
---
Q: Cosa distingue database programming dai programmi con dominio infinito?
A: Il database programming usa programmi con dominio finito (fatti ground, come tabelle); i programmi con dominio infinito usano funtori ricorsivi che generano infiniti termini.
---
Q: Perche' i programmi logici sono rilevanti dal punto di vista computazionale?
A: Perche' sono Turing-completi: possono calcolare qualsiasi funzione calcolabile.
---
Q: Come si rappresentano le liste in Prolog?
A: Con [] per la lista vuota e [H|T] per testa e coda; esempi di predicati sono member, append e length.
---
Q: Cosa e' una difference list e perche' e' utile?
A: E' una coppia L-R che rappresenta una lista come differenza; permette la concatenazione in tempo costante O(1).
---
Q: Cosa e' una sostituzione in unificazione?
A: E' una funzione da variabili a termini, scritta come insieme finito di coppie sigma = {x1/t1, ..., xn/tn} con xi variabili distinte.
---
Q: Come si applica una sostituzione a un termine?
A: Si rimpiazzano simultaneamente tutte le occorrenze di ogni xi con il corrispondente ti. Esempio: f(x1,g(x2),a) con {x1/h(x2),x2/b} diventa f(h(x2),g(b),a).
---
Q: Quando due termini sono unificabili?
A: Quando esiste una sostituzione sigma (unificatore) che li rende identici sintatticamente: t1 sigma = t2 sigma.
---
Q: Cosa significa che una sostituzione theta e' piu' generale di sigma?
A: Che esiste una sostituzione lambda tale che sigma = theta lambda; theta lascia piu' variabili libere.
---
Q: Cosa garantisce il teorema sull'MGU?
A: Che se due termini sono unificabili esiste sempre un most general unifier, unico a meno di ridenominazione delle variabili.
---
Q: Quali sono le quattro trasformazioni dell'algoritmo di Martelli-Montanari?
A: Term reduction, variable elimination, orient e occurs check, applicate fino a raggiungere la forma risolta.
---
Q: Cosa e' la forma risolta di un insieme di equazioni di unificazione?
A: E' un insieme xj = tj dove ogni variabile a sinistra occorre solo li'; l'MGU si legge direttamente come {x1/t1, ..., xk/tk}.
---
Q: Cosa fa la regola di term reduction?
A: Da f(t1..tn) = f(s1..sn) produce {t1=s1, ..., tn=sn}; se funtori o arieta' differiscono dichiara fallimento (clash).
---
Q: Cosa fa la regola di variable elimination?
A: Da x = t con x non occorrente in t sostituisce x con t in tutte le altre equazioni.
---
Q: Cosa e' l'occurs check e perche' conta?
A: E' il controllo che x non occorra in t nell'equazione x = t; se occorre e t e' diverso da x i termini non sono unificabili (struttura infinita).
---
Q: Perche' molti interpreti Prolog omettono l'occurs check?
A: Per efficienza: il controllo costa tempo su ogni unificazione; SWI-Prolog offre unify_with_occurs_check per i casi in cui serve.
---
Q: Cosa significa K |= F in logica classica?
A: Che F e' conseguenza logica di K: F e' vera in tutti i modelli della teoria K.
---
Q: Cosa significano correttezza e completezza di un metodo di prova?
A: Correttezza: se dimostra F da K allora F e' conseguenza di K. Completezza: se F e' conseguenza di K allora il metodo dimostra F.
---
Q: Come funziona la regola di inferenza di risoluzione?
A: Date due clausole con letterali complementari Ai e not Bj, si deriva il risolvente unendo tutti gli altri letterali; il risolvente e' conseguenza delle due clausole.
---
Q: Come si dimostra K |= F per refutazione?
A: Si mostra che K unione {not F} e' inconsistente, derivando la clausola vuota con passi di risoluzione.
---
Q: Cosa significa SLD e a cosa si applica?
A: Selection rule driven, Linear resolution for Definite clauses: risoluzione lineare con regola di selezione, specializzata per clausole di Horn definite.
---
Q: Descrivi lo schema nondeterministico dell'interprete Prolog.
A: Se il goal e' vuoto successo; altrimenti prendi G1, raccogli le clausole applicabili, scegline una, calcola l'MGU sigma e ricorri sul nuovo goal con corpo istanziato piu' goal restanti.
---
Q: Perche' le variabili della clausola vanno rinominate prima dell'unificazione?
A: Per evitare collisioni con le variabili del goal: servono variabili fresche (standardizzate) a ogni uso della clausola.
---
Q: Cosa significa che l'interprete Prolog usa backward chaining in profondita'?
A: Che parte dal goal e lo riduce a sottogoal espandendo sempre il primo letterale, esplorando in profondita' prima di provare alternative.
---
Q: Come rende deterministica l'interprete Prolog la procedura nondeterministica?
A: Considera le clausole nell'ordine in cui sono scritte e fa backtracking all'ultimo choice point a ogni fallimento, con sottogoal risolti da sinistra a destra.
---
Q: Cosa restituisce l'interprete Prolog in caso di successo?
A: La sostituzione calcolata per le variabili che compaiono nel goal (risposta calcolata).
---
Q: Cosa e' un SLD-albero?
A: E' l'albero di ricerca con nodi = goal e archi = clausole applicate; il backtracking lo visita in profondita' da sinistra.
---
Q: Cosa dice il teorema di indipendenza dal nondeterminismo nella SLD-risoluzione?
A: Che l'esistenza di una derivazione di successo non dipende dalla regola di scelta della clausola; l'ordine influenza solo efficienza e terminazione pratica.
---
Q: Quali sono le tre semantiche equivalenti dei programmi definiti?
A: Osservazionale (goal con successo e risposte), modellistica (minimo modello di Herbrand) e di punto fisso (minimo punto fisso dell'operatore TP).
---
Q: Cosa e' l'operatore TP di immediata conseguenza?
A: E' l'operatore che da un'interpretazione produce tutti i fatti derivabili in un passo con le regole; iterato dal basso da' il minimo modello.
---
Q: Cosa e' il cut in Prolog?
A: E' il predicato ! sempre vero che se eseguito blocca il backtracking rendendo definitive le scelte fatte: e' extra-logico.
---
Q: Quali strutture run-time gestisce l'interprete Prolog?
A: Lo stack di esecuzione con i record di attivazione (environment) e lo stack di backtracking con i punti di scelta (choice point).
---
Q: Cosa succede eseguendo p :- q1..qi, !, qi+1..qn al momento del cut?
A: Le scelte per p e per q1..qi diventano definitive, i choice point sono rimossi, ! ha successo ed e' ignorato in backtracking.
---
Q: Cosa succede se qi+1..qn fallisce dopo un cut in p?
A: Fallisce tutta la valutazione di p, anche se p o q1..qi avevano punti di scelta: sono stati eliminati dal cut.
---
Q: Che effetto ha il cut sull'SLD-albero?
A: Pota interi rami dell'albero (rimuove punti di backtracking), con perdita di completezza.
---
Q: Distingui green cut e red cut.
A: Il green cut cambia solo efficienza (semantica invariata, es. determinismo dopo test); il red cut cambia le risposte del programma.
---
Q: A cosa servono i costrutti ->, \+, fail e repeat?
A: -> e' l'if-then-else; \+ e' la negazione per fallimento; fail forza fallimento; repeat genera punti di scelta per cicli.
---
Q: Come si implementa \+ con cut e fail?
A: Con \+ G :- G, !, fail piu' \+ _. : se G ha successo si taglia e si fallisce, altrimenti la seconda clausola ha successo.
---
Q: Cosa e' la negation as failure?
A: E' la regola per cui not A ha successo se la derivazione di A fallisce finitamente; e' operativa (SLDNF) non classica.
---
Q: Quali problemi ha la negazione per fallimento?
A: Floundering su goal non ground, non monotonicita' (nuovi fatti ritrattano conclusioni) e possibili loop infiniti.
---
Q: Come si modella uno stato in Prolog nella ricerca?
A: Come termine dipendente dal dominio: on(a,b) per blocchi, lista ordinata per l'8-puzzle, coordinate (X,Y) per il labirinto.
---
Q: Come si specificano le azioni in Prolog?
A: Con applicabile(Az,S) per le precondizioni e trasforma(Az,S,NuovoS) per gli effetti dell'azione.
---
Q: Come si definisce soluzione e soluzione ottima nello spazio degli stati?
A: Soluzione e' un cammino da iniziale a goal; ottima se ha costo minimo tra tutte (costo = somma dei costi delle azioni).
---
Q: Quali strategie di ricerca si implementano in Prolog?
A: DFS con controllo dei cicli, BFS a coda, iterative deepening, best-first e A* con f(n) = g(n) + h(n), IDA* con soglia su f.
---
Q: Quando un'euristica h e' ammissibile?
A: Quando 0 <= h(s) <= d(s) per ogni stato, dove d(s) e' la distanza minima vera al goal; con h ammissibile A* e' ottimale.
---
Q: Quando un'euristica h e' consistente (monotona)?
A: Quando h(s) <= c(s,s') + h(s') per ogni successore s' e h(goal) = 0; consistente implica ammissibile e non serve riaprire nodi chiusi.
---
Q: Quando la distanza di Manhattan nel labirinto e' monotona?
A: Solo con mosse nelle 4 direzioni a costo uniforme e senza diagonali; altrimenti non e' consistente.
---
Q: Perche' con euristica solo ammissibile puo' servire riaprire un nodo visitato?
A: Perche' il nodo puo' essere raggiunto dopo con un costo g minore; con h consistente invece i valori f sono non decrescenti e non serve.
---
Q: Da dove nasce l'Answer Set Programming?
A: Dalla war of semantics sulla negazione per fallimento, poi divenuta paradigma autonomo: le soluzioni sono i modelli (answer set), non le prove.
---
Q: Quali differenze ci sono tra ASP e Prolog?
A: In ASP l'ordine dei letterali e' irrilevante, non e' goal-directed, i solver non vanno in loop come SLD e non esiste il cut.
---
Q: Com'e' fatta una regola ASP?
A: Ha forma a :- b1..bn, not c1..cm con letterali p o -p; senza testa e' un integrity constraint :- a1..ak.
---
Q: Che differenza c'e' tra - e not in ASP?
A: - e' la negazione classica (forte): attraverso solo se derivo che il treno non arriva; not e' per fallimento: attraverso se non so che arriva.
---
Q: Come si tratta un letterale -p in ASP?
A: Come un nuovo atomo positivo con in piu' il vincolo :- p, -p che vieta di avere veri entrambi.
---
Q: Cosa e' l'answer set di un programma positivo senza not?
A: E' il suo unico modello minimale; esempio p :- q. q. ha answer set {p, q}.
---
Q: Come si costruisce il reduct P^S di Gelfond-Lifschitz?
A: Si rimuove ogni regola con not L e L in S, poi si cancellano tutti i not restanti; P^S e' positivo con unico answer set.
---
Q: Quando S e' un answer set di P?
A: Quando l'answer set del reduct P^S coincide con S.
---
Q: Quali sono gli answer set di p :- a. a :- not b. b :- not a?
A: Sono {b} e {a, p}, verificati per reduct su tutti i sottoinsiemi di {a, b, p}.
---
Q: A cosa servono gli integrity constraint in ASP?
A: A filtrare gli answer set: scartano i candidati che li violano.
---
Q: Esiste un programma con modelli ma senza answer set? Esempio.
A: Si': p :- not p, d. d. ha modello {p, d} ma nessun S coincide con l'answer set del suo reduct.
---
Q: Cosa significa programmazione generate-and-test in ASP?
A: Descrivere i candidati con regole (generate) e scartare i non accettabili con vincoli senza testa (test); ogni answer set e' una soluzione.
---
Q: Come funzionano gli aggregati con cardinalita' in clingo?
A: Con n { p(X) : q(X) } m si selezionano answer set con tra n e m atomi p presi da q.
---
Q: Come si esprime che ogni variabile ha un solo tipo in ASP?
A: Con 1 { ha_tipo(V,T) : tipo(T) } 1 :- variabile(V).
---
Q: Per quali problemi e' indicato ASP e con quali solver?
A: Problemi combinatori come vincoli e planning; solver efficienti sono DLV, smodels, clingo e Cmodels.
---
Q: Come si lanciano gli esercizi ASP del corso?
A: Con clingo (download da potassco.org): clingo dominio.lp istanza.lp enumera gli answer set, con opzioni per numero modelli e ottimizzazione.
---
Q: Quali problemi classici mostra Dovier con ASP?
A: N-regine, map coloring, circuito hamiltoniano, k-clique, knapsack, zebra evasa e planning con proiezione temporale.
---
Q: Cosa sono grounding e choice rule in ASP?
A: Grounding e' l'istanziazione delle variabili in clausole proposizionali finite; choice rule genera candidati (es. {p} :- body).
---
Q: Quali capitoli di Dovier-Formisano coprono SLD e semantica?
A: Il capitolo 5 per SLD-derivazioni, SLD-alberi e regole di selezione; il capitolo 6 per semantica osservazionale, modellistica e di punto fisso.
---
Q: Quali capitoli di Dovier-Formisano coprono Prolog pratico e ASP?
A: Il capitolo 7 per liste, alberi, built-in e meta-predicati; il capitolo 8 per tecniche dichiarative e cut; i capitoli 10-11 per ASP.
---
