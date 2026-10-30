Q: Cosa emula un sistema esperto secondo Giarratano e Riley?
A: La capacita' decisionale di un esperto umano in un dominio ristretto, usando conoscenza e procedure di inferenza per problemi difficili.
---
Q: Da cosa dipende la potenza di un programma intelligente secondo Feigenbaum?
A: Primariamente dalla quantita' e qualita' di conoscenza che possiede sul problema.
---
Q: Quali proprieta' caratterizzano un sistema basato sulla conoscenza?
A: Specificita' di dominio, rappresentazione esplicita della conoscenza, meccanismi di ragionamento, capacita' di spiegazione e operazione in domini poco strutturati.
---
Q: Quali sono i componenti dell'architettura di un sistema esperto?
A: Knowledge base, working memory, inference engine, knowledge acquisition facility e user interface.
---
Q: Cosa contiene la knowledge base e cosa la working memory?
A: La knowledge base contiene regole e fatti iniziali stabili; la working memory contiene i fatti correnti che cambiano durante il ragionamento.
---
Q: Cosa e' la reasoning chain?
A: E' la sequenza di regole attivate per arrivare a una conclusione; serve a spiegare all'utente il perche' di una risposta.
---
Q: Quali sono i domini applicativi tipici dei sistemi esperti?
A: Interpretazione (Dendral), diagnosi (MYCIN), monitoring (VM), planning e scheduling (Molgen), previsione (Prospector), configurazione (R1/XCON).
---
Q: Quando NON conviene usare un sistema esperto?
A: Quando esistono algoritmi tradizionali efficienti, il problema e' computazione e non conoscenza, la conoscenza non e' elicitabile o l'utente rifiuta il sistema per task critici.
---
Q: Si puo' risolvere il planning con un sistema esperto?
A: Si' ma con molta fatica: un sistema a regole e' Turing-completo quindi puo' tutto, ma non sempre e' il formalismo piu' adeguato.
---
Q: Come ragiona il forward chaining?
A: Da fatti a conclusioni (data-driven): appena arrivano osservazioni si fa matching con gli antecedenti; tipico di monitoring e controllo (CLIPS, OPS5).
---
Q: Come ragiona il backward chaining?
A: Da ipotesi a supporti (goal-driven): cerca regole e fatti che dimostrano il goal; tipico della diagnostica (MYCIN, Prolog).
---
Q: Cosa significa CLIPS e chi lo ha sviluppato?
A: C Language Integrated Production System, sviluppato dalla NASA tra il 1985 e il 1996 e tuttora mantenuto.
---
Q: Cosa significa che CLIPS e' eterarchico?
A: Che e' piatto: non impone gerarchie di controllo, le regole sono tutte allo stesso livello salvo moduli e salience.
---
Q: Quali sono le tre fasi del ciclo recognize-act di CLIPS?
A: Match (confronto LHS con WM via Rete), select (risoluzione conflitti in agenda) e act (esecuzione RHS), ripetute fino ad agenda vuota.
---
Q: A cosa servono i comandi load, reset, facts, agenda e run?
A: load carica un file; reset carica i deffacts; facts mostra la WM; agenda mostra le attivazioni; run avvia il ciclo di esecuzione.
---
Q: Cosa sono i fatti ordinati e i deftemplate?
A: I fatti ordinati sono liste come (persona Mario occhi blu); i deftemplate definiscono fatti strutturati con slot tipizzati.
---
Q: A cosa serve deffacts?
A: A dichiarare fatti iniziali caricati in WM con il comando reset all'avvio.
---
Q: Cosa sono i field constraint nei pattern?
A: Sono vincoli per singolo campo (&, |, ~, test con :) che filtrano il pattern matching senza regole ausiliarie.
---
Q: Qual e' il vantaggio evidente dei field constraint?
A: Riducono le attivazioni spurie facendo selezione gia' nel matching invece di far scattare regole per poi scartarle.
---
Q: Com'e' fatta una regola defrule?
A: Ha nome, LHS con pattern e test, freccia => e RHS con azioni come assert, retract, modify e printout.
---
Q: Cosa sono LHS e RHS di una production rule?
A: LHS e' la parte sinistra (antecedente, condizioni sui fatti); RHS e' la parte destra (conseguente, azioni da eseguire).
---
Q: A cosa servono exists, forall e not nella LHS?
A: exists chiede almeno un match; forall chiede che ogni match soddisfi; not chiede assenza di match (negazione per fallimento sui fatti).
---
Q: Cosa fa l'algoritmo Rete?
A: Compila le LHS in una rete di discriminazione con nodi alfa per singolo pattern e beta per join; il matching e' incrementale sui fatti cambiati.
---
Q: Cosa sono attivazione e firing?
A: Attivazione e' una regola con fatti che soddisfano la LHS, in attesa in agenda; firing e' l'esecuzione della sua RHS.
---
Q: Cosa e' la rifrazione?
A: La regola per cui una regola scatta una sola volta per la stessa istanza di fatti, evitando loop infiniti di riattivazione.
---
Q: Perche' l'esempio degli occhi blu mostra la rifrazione?
A: Perche' senza rifrazione la regola di stampa scatterebbe in loop; con rifrazione scatta una sola volta per ogni persona con occhi blu.
---
Q: Cosa contiene l'agenda?
A: L'insieme delle attivazioni pronte a scattare, tra cui il motore sceglie con la strategia di risoluzione dei conflitti.
---
Q: Cosa significa recency nel conflict resolution?
A: Preferire le attivazioni con fatti piu' recenti (depth, LIFO) o piu' vecchi (breadth, FIFO).
---
Q: Cosa significa specificity nel conflict resolution?
A: Preferire regole piu' specifiche (complexity, molti test) o piu' semplici (simplicity, pochi test).
---
Q: Cosa sono LEX e MEA?
A: Sono strategie che combinano lessicograficamente recency e specificity in ordini diversi.
---
Q: Cosa e' la salience?
A: E' una priorita' esplicita dichiarata con (declare (salience N)): valori alti scattano prima, ma vanno usati con parsimonia.
---
Q: Perche' abusare della salience e' sconsigliato?
A: Perche' distrugge la dichiarativita' e rende il controllo opaco: il comportamento dipende da numeri magici invece che dalla conoscenza.
---
Q: A cosa servono i defmodule?
A: A partizionare regole e fatti in moduli per fasi (percezione, ipotesi, decisione, azione) con focus esplicito; obbligatori nel progetto Wumpus.
---
Q: Quali strategie di risoluzione conflitti si impostano con set-strategy?
A: Depth (default LIFO), breadth (FIFO), simplicity, complexity, LEX e MEA.
---
Q: Cosa mostra l'esempio MYCIN delle slide?
A: Una regola diagnostica con evidenza 0.6: THEN c'e' evidenza suggestiva (0.6) dell'identita' dell'organismo.
---
Q: Cosa e' il certainty factor?
A: E' un grado di belief in [-1,+1]: positivo conferma, negativo disconferma; euristica pratica che non soddisfa gli assiomi della probabilita'.
---
Q: Come si combinano due CF positivi?
A: Con CFnew = CF1 + CF2 - CF1*CF2; esempio delle slide: 0.7 e 0.5 danno 0.85.
---
Q: I CF soddisfano gli assiomi della probabilita'?
A: No: sono gradi di belief euristici, come ricordano le slide sull'incertezza; per la probabilita' servono le reti bayesiane.
---
Q: Nel progetto Wumpus i CF sono obbligatori?
A: No: sono consigliati per gestire la vaghezza delle percezioni ma non obbligatori; obbligatori sono invece i moduli.
---
Q: Quale fatto asserisce il simulatore Wumpus a ogni step?
A: Il fatto percept con x, y, steps, breeze, stench, glitter ed energy, piu' il fatto counter con lo step corrente.
---
Q: Che differenza c'e' tra percept e counter nel Wumpus?
A: percept e' asserito nuovo a ogni istante (si accumulano, vanno buttati se inutili); counter esiste in copia unica aggiornata.
---
Q: Quale fatto si aspetta il simulatore Wumpus dall'agente?
A: Un solo fatto (action (move ?label)) per step; se ne asserisci piu' di uno ne esegue uno e butta via gli altri.
---
Q: Quali azioni puo' fare l'agente Wumpus?
A: Movimenti up, down, left, right; grab per l'oro; quit per uscire; pit-north, south, west, east per ipotesi sui pozzi.
---
Q: Quanto rendono grab e le ipotesi pit nel Wumpus?
A: grab rende 100 pezzi d'oro se l'oro e' nella cella; ogni ipotesi pit corretta rende +25, se sbagliata -25.
---
Q: Perche' il progetto chiede due agenti Wumpus?
A: Per confrontare strategie e confermare che un agente piu' intelligente (migliore knowledge base) ottiene premi maggiori.
---
Q: Cosa bisogna preparare per la discussione del progetto CLIPS?
A: Una presentazione di 10 minuti su problemi e strategie (non dettaglio delle singole regole) con esecuzione live anche su mappe nuove, piu' interrogazione su ciclo, rifrazione ed elementi di CLIPS.
---
Q: Cosa serve installare per il simulatore Wumpus?
A: Un ambiente virtuale python con clipspy (e tkinter su Ubuntu): poi python3 wumpus.py -m map.json -a agent.clp.
---
Q: Quali file di esempio CLIPS sono disponibili localmente?
A: myfamily, myfamily-bk, piano-carriera, patrons-2, wine, bw (mondo dei blocchi) e CLIPS-Esempi-01, piu' lezione-9-clips.txt.
---
Q: Cosa mostra l'esempio bw.clp?
A: Il mondo dei blocchi a regole: operatori di spostamento con precondizioni ed effetti, ponte tra planning e produzione.
---
Q: Cosa mostra l'esempio wine.clp?
A: Una base di conoscenza per scegliere vini (preferenze e pasti), classico esempio di sistema esperto di consulenza.
---
Q: Cosa mostra myfamily.clp?
A: Relazioni familiari (genitori, fratelli, antenati) a regole con forward chaining, analogo dichiarativo dell'esempio Prolog.
---
Q: Come si debugga un sistema CLIPS?
A: Con watch (facts, rules, activations), facts, agenda, ppdefrule e esecuzioni a step con run parziale.
---
Q: Cosa chiede l'esame orale sull'uso di CLIPS?
A: Elementi fondamentali, ciclo di funzionamento, cos'e' la rifrazione e come sono organizzate le regole dell'agente.
---
Q: Cosa fa il comando watch in CLIPS?
A: Attiva trace su facts, rules o activations per vedere matching e firing durante il run.
---
Q: A cosa serve ppdefrule?
A: A stampare carina (pretty-print) la definizione di una regola per ispezionarla e debuggarla.
---
Q: Cosa fa il comando run con argomento?
A: Esegue un numero limitato di attivazioni (run 1 fa un solo firing): utile per esecuzioni a step nel debug.
---
Q: Cosa sono ordered facts contro template facts nel matching?
A: Gli ordered sono liste posizionali; i template hanno slot nominati: i secondi danno pattern piu' leggibili e manutenibili.
---
Q: Come si lega una variabile in un pattern CLIPS?
A: Con ?nome al primo uso; i riusi confrontano (join) e nella RHS ?nome vale il fatto matchato.
---
Q: Cosa fa il CE test nella LHS?
A: Valuta un'espressione sul binding corrente: filtra match senza creare nuovi fatti.
---
Q: A cosa serve exists nella LHS?
A: A richiedere almeno un match di un pattern senza legare variabili per la RHS (test esistenziale).
---
Q: Cosa fa modify in CLIPS?
A: Ritratta un fatto e ne asserisce la versione modificata (equivale a retract + assert con indice).
---
Q: Perche' la RHS non deve contenere logica decisionale complessa?
A: Perche' la RHS e' procedurale: le decisioni vanno nella LHS (pattern) cosi' restano spiegabili e ritrattabili.
---
Q: Come si rappresenta lo stato visitato nel Wumpus?
A: Con fatti (visitata x y), (muro x y), (forse-pozzo x y cf): la mappa interna cresce con l'esplorazione.
---
Q: Quando l'agente Wumpus deve decidere quit?
A: Quando ha l'oro ed e' in (0,0), o quando l'energia residua basta appena per il rientro pianificato.
---
Q: Cosa si rischia a non pulire i percept vecchi?
A: WM che cresce a ogni step, matching piu' lento e regole che matchano foto obsolete invece dello stato corrente.
---
