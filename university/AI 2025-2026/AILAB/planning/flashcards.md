Q: Cosa studia l'automated planning secondo Hoffmann?
A: La selezione di un corso d'azione che porta al goal a partire da una descrizione di alto livello del mondo.
---
Q: Cosa e' il planning secondo Haslum?
A: E' l'arte e la pratica di pensare prima di agire (the art and practice of thinking before acting).
---
Q: Perche' studiare il planning dal punto di vista scientifico e tecnologico?
A: Scientifico: e' un aspetto fondamentale del comportamento intelligente razionale. Tecnologico: e' uno strumento software per scegliere e organizzare azioni di agenti autonomi.
---
Q: Cosa e' uno state-transition system?
A: E' la tupla Sigma = (S, A, E, gamma) con stati, azioni, eventi e relazione di transizione gamma da stato e azione/evento a insiemi di stati.
---
Q: Quando un'azione e' applicabile in uno stato del STS?
A: Quando gamma(s, a) e' non vuoto; applicarla porta in un qualsiasi s' appartenente a gamma(s, a).
---
Q: Quali ipotesi restrittive definiscono il classical planning?
A: Stati finiti e osservabili, azioni deterministiche e istantanee, nessun evento esogeno, goal come condizione e piano come sequenza di azioni.
---
Q: Come si rappresenta uno stato in STRIPS?
A: Come congiunzione di atomi ground; vale il closed world: cio' che non e' detto e' falso.
---
Q: Com'e' fatto un operatore di planning STRIPS?
A: E' una tripla con precondizioni, lista add e lista del; la transizione e' s' = (s meno Del) unione Add se le precondizioni sono contenute in s.
---
Q: Fai un esempio di operatore STRIPS nel mondo dei blocchi.
A: pickup(X) con pre clear(X), ontable(X), handempty; add holding(X); del clear(X), ontable(X), handempty.
---
Q: Cosa significa che STRIPS e' sottoinsieme di FOL?
A: Che usa solo un frammento ristretto della logica del primo ordine (atomi ground, niente funzioni ne' disgiunzioni negli stati).
---
Q: Cosa significa PDDL e a cosa serve?
A: Planning Domain Definition Language: e' lo standard per definire domini e problemi usato nelle competizioni internazionali di planning.
---
Q: Quali sono gli elementi di un task di planning in PDDL?
A: Oggetti, predicati, stato iniziale, specifica del goal e azioni o operatori che modificano il mondo.
---
Q: Cosa distingue domain file e problem file in PDDL?
A: Il domain contiene predicati e azioni (conoscenza indipendente dal problema); il problem contiene oggetti, stato iniziale e goal (conoscenza specifica).
---
Q: Com'e' fatta un'azione PDDL?
A: Ha parametri, precondizioni ed effetti scritti con and, not ed eventualmente quantificatori come forall e when in ADL.
---
Q: Descrivi il dominio Gripper delle slide.
A: Un robot con due bracci sposta palloni tra due stanze; oggetti sono stanze, palloni e bracci; il goal e' avere tutti i palloni nella seconda stanza.
---
Q: Cosa sono le variabili di stato nella rappresentazione del plan-space?
A: Sono variabili a dominio finito i cui valori descrivono il mondo; gli stati sono assegnazioni totali, astraendo i dettagli irrilevanti.
---
Q: Come funziona la forward search (progression)?
A: Parte dallo stato iniziale, genera tutti i successori con azioni applicabili e continua fino a uno stato che soddisfa il goal.
---
Q: Quali sono pro e contro della forward search?
A: Pro: semplice e guidabile con euristiche. Contro: alto fattore di ramificazione ed esplorazione di azioni irrilevanti per il goal.
---
Q: Come funziona la backward search (regression)?
A: Parte dal goal e applica le azioni all'indietro: il nuovo sottogoal e' (g meno Add) unione Pre per azioni rilevanti che non cancellano il goal.
---
Q: Quando un'azione e' rilevante nella regressione?
A: Quando aggiunge almeno un letterale del sottogoal senza cancellarne altri.
---
Q: Quali sono pro e contro della backward search?
A: Pro: e' goal-directed e considera solo aspetti rilevanti. Contro: i sottogoal non sono stati completi e serve gestire i letterali negati.
---
Q: Perche' STRIPS e' importante per la regressione?
A: Perche' introduce gli operatori con add e delete list che rendono implementabile il passo all'indietro.
---
Q: Cosa sono BFS, DFS, A* e greedy best-first nel planning?
A: Sono strategie di ricerca sullo spazio degli stati: BFS e DFS non informate; greedy e A* euristiche con f(n) = g(n) + h(n).
---
Q: Cosa e' l'euristica FF?
A: E' l'euristica di Hoffmann e Nebel basata sul piano rilassato che ignora le delete list, usata con enforced hill-climbing; non e' ammissibile.
---
Q: Cosa sono i landmark nel planning?
A: Sono fatti che ogni piano soluzione deve rendere veri; servono a guidare la ricerca verso mete obbligate.
---
Q: Quali planner moderni citano le slide?
A: FF con euristica rilassata e varianti di A*, oltre a planner con landmark e relaxed plan.
---
Q: Cosa significa formulare il planning come CSP?
A: Significa cercare assegnazioni a variabili (azioni, ordini, binding) che soddisfano vincoli, ritardando le decisioni finche' necessario.
---
Q: Cosa significa least-commitment?
A: Prendere solo le decisioni strettamente necessarie e rimandare le altre (ordine azioni, istanziazione variabili) fino a quando servono.
---
Q: Cosa e' un causal link?
A: E' una tripla a1 --p--> a2 che dice che a1 produce il letterale p necessario ad a2.
---
Q: Cosa e' un threat a un causal link?
A: E' un'azione a3 che cancella p e puo' interporsi tra a1 e a2, minacciando la causalita'.
---
Q: Come si risolve un threat?
A: Con promotion (a3 prima di a1), demotion (a3 dopo a2) o separation (vincoli di disuguaglianza sulle variabili).
---
Q: Descrivi il ciclo dell'algoritmo PSP o POP.
A: Se non ci sono flaw successo; altrimenti scegli un flaw, ripara precondizioni aperte con azioni nuove o riusate, ripara threat con promotion o demotion o separation, e ricorri con backtracking.
---
Q: Cosa sono open precondition e flaw?
A: Una precondizione senza causal link e' aperta; flaw e' il termine generale per precondizioni aperte e threat da riparare.
---
Q: Cosa contiene un piano parziale?
A: Azioni, vincoli d'ordine, binding sulle variabili, causal link e lista degli open goal.
---
Q: Com'e' organizzato un planning graph?
A: E' un grafo a livelli alterni S0, A0, S1, A1 con letterali e azioni ground; S0 ha i fluenti iniziali e ogni livello espande cio' che potrebbe valere.
---
Q: Cosa significa che Si contiene cio' che potrebbe valere?
A: Che e' una sovrastima ottimistica: sia P che not P possono coesistere nello stesso livello.
---
Q: Cosa sono le no-op nel planning graph?
A: Sono azioni di persistenza: se P vale in Si allora resta in Si+1; servono a propagare i letterali in avanti.
---
Q: Perche' costruire il planning graph e' trattabile?
A: Perche' l'algoritmo di costruzione e' polinomiale e astrae lo spazio di ricerca esponenziale.
---
Q: Cosa sono i mutex?
A: Sono coppie di azioni o letterali mutuamente esclusivi: non possono valere insieme allo stesso livello temporale.
---
Q: Quando due azioni sono mutex?
A: Per interference (una cancella pre o add dell'altra), competing needs (precondizioni mutex) o effetti inconsistenti.
---
Q: Quando due letterali sono mutex in Si?
A: Quando tutti i modi per produrli (azioni in Ai-1 incluse no-op) sono a coppie mutex: inconsistent support.
---
Q: Come si propagano i mutex?
A: In avanti di livello in livello; una volta comparsi restano finche' il grafo non si espande abbastanza da rimuoverli.
---
Q: Quando Graphplan dichiara fallimento?
A: Quando il grafo si stabilizza (stessi letterali e mutex su due livelli) senza che il goal sia presente senza mutex.
---
Q: Come estrae il piano Graphplan?
A: Con ricerca all'indietro dal goal: a ogni livello sceglie azioni non mutex che coprono i sottogoal, con backtracking; se fallisce espande il grafo.
---
Q: Quali euristiche derivano dal planning graph?
A: Max-level e level-sum sul relaxed graph (senza mutex): stimano la distanza al goal dal primo livello in cui i fatti compaiono.
---
Q: Perche' Graphplan usa rappresentazione logica e non CSP?
A: Perche' lavora su letterali proposizionali ground e mutex, a differenza del least-commitment che usa variabili e vincoli.
---
Q: Come si modella il planning in ASP secondo Dovier capitolo 12?
A: Con fluenti temporizzati holds(F,T), azioni occ(A,T), leggi di inerzia con not e vincoli di eseguibilita'; il solver cerca modelli che realizzano il goal.
---
Q: Qual e' il ponte tra sezione planning e sezione ASP del corso?
A: Lo stesso problema (sequenza di azioni verso il goal) risolto con tecnologie diverse: ricerca dedicata contro solver logico generale.
---
Q: Quali algoritmi di ricerca valgono sia per Prolog che per planning?
A: BFS, DFS, iterative deepening, A* e IDA*, con stesse nozioni di ammissibilita' e consistenza delle euristiche.
---
Q: Cosa stabilisce la competizione ICAPS per il PDDL?
A: Che PDDL e' il formato standard: i planner competono sugli stessi domini e problemi scritti in domain e problem file.
---
Q: Quale cartella di esempi PDDL e' solo citata ma non scaricata?
A: La cartella PDDL esempio della logistica (id 286760): resta materiale non disponibile localmente.
---
Q: In quale ordine leggere le slide di planning?
A: Prima 00_intro e 01_planning per i concetti, poi spazio degli stati e PDDL, poi spazio dei piani e infine Graphplan.
---
Q: Quali ipotesi del classical planning viola il Wumpus del progetto CLIPS?
A: Osservabilita' parziale (buio, solo percezioni locali) e incertezza su pozzi e Wumpus: serve ragionamento a regole non planning classico puro.
---
Q: Cosa sono precondizioni ed effetti di un'azione STRIPS?
A: Le precondizioni sono letterali che devono valere per applicarla; gli effetti add e del dicono cosa diventa vero e cosa smette di esserlo.
---
Q: Come si verifica se un piano STRIPS e' valido?
A: Simulandolo dallo stato iniziale: ogni azione deve avere precondizioni soddisfatte e lo stato finale deve contenere il goal.
---
Q: Cosa distingue ADL da STRIPS?
A: ADL aggiunge quantificatori, effetti condizionali (when), disgiunzioni e uguaglianza: piu' espressivo ma regressione piu' complessa.
---
Q: Cosa sono i requisiti PDDL come :strips o :typing?
A: Dichiarano quali costrutti usa il dominio, cosi' il planner sa cosa deve supportare (tipi, precondizioni negative, azioni durative).
---
Q: Cosa e' il makespan di un piano parallelo?
A: E' il numero di livelli temporali con azioni parallele; Graphplan lo minimizza nel numero di livelli del grafo.
---
Q: Cosa significa che due azioni possono stare nello stesso livello Graphplan?
A: Che non sono mutex tra loro: eseguibili in parallelo senza interferenze.
---
Q: Cosa sono promotion e demotion con un esempio?
A: Se a3 minaccia a1 --p--> a2, promotion impone a3 prima di a1, demotion impone a3 dopo a2.
---
Q: Cosa e' la separation come risoluzione di threat?
A: Aggiungere vincoli di disuguaglianza tra variabili cosi' la minaccia non puo' unificare con il causal link.
---
Q: Perche' il planning come CSP aiuta?
A: Perche' ritarda binding e ordinamenti finche' servono, potando con vincoli invece di enumerare stati ground.
---
Q: Cosa calcola l'euristica del piano rilassato?
A: Il costo di un piano che ignora le delete list: ottimistico, veloce, ma non ammissibile quando usato con hill-climbing.
---
Q: Qual e' la differenza tra costo del piano e makespan?
A: Il costo somma i costi delle azioni; il makespan conta i passi paralleli: con azioni parallele possono differire.
---
Q: Perche' le no-op sono indispensabili nel planning graph?
A: Perche' propagano i letterali ai livelli successivi (persistenza) e danno supporto alle coppie non mutex.
---
