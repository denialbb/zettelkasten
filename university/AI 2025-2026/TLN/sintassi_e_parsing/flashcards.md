Q: Che differenza c'e' tra sintassi a costituenti e sintassi a dipendenze?
A: I costituenti annidano sintagmi (NP, VP) in un albero; le dipendenze collegano teste e dipendenti con archi etichettati (nsubj, obj...), piu' vicine ai ruoli semantici e standard UD.
---
Q: Cos'e' un costituente e come lo si riconosce?
A: Un gruppo di parole che si comporta come unita': test di sostituzione (pro-forma), movimento (topicalizzazione) e coordinazione.
---
Q: Cos'e' il fenomeno del PP attachment?
A: Un PP ambiguo tra due teste: in Ho visto l'uomo con il telescopio il PP si attacca al verbo (strumento) o al nome (l'uomo col telescopio). Due alberi diversi, stessa frase.
---
Q: Come si risolve statisticamente il PP attachment?
A: Con preferenze lessicali testa-preposizione-testa (es. verbo+con+strumento vs nome+con+accessorio) apprese da corpora.
---
Q: Cos'e' l'ambigue della coordinazione?
A: Il modificatore puo' avere portata diversa: old men and women e' [old [men and women]] oppure [[old men] and women].
---
Q: Cosa sono le garden path sentences?
A: Frasi che inducono un parse iniziale sbagliato da rivedere (es. The horse raced past the barn fell): mostrano l'incrementalita' del parsing umano.
---
Q: Cos'e' una CFG e da cosa e' composta?
A: Grammatica libera dal contesto G = (N, Sigma, P, S): non-terminali, terminali, produzioni, simbolo iniziale; genera alberi per riscrittura.
---
Q: Fai un esempio di mini-grammatica CFG per S, NP, VP, PP.
A: S -> NP VP; NP -> Det N | Det N PP; VP -> V NP | V NP PP; PP -> P NP; con lessico Det -> il/la, N -> cane/uomo, V -> vede...
---
Q: Quando una grammatica e' ambigua?
A: Quando una stessa frase ha due o piu' alberi di derivazione, come nel PP attachment.
---
Q: Cos'e' la forma normale di Chomsky (CNF)?
A: Produzioni solo del tipo A -> B C oppure A -> w (terminale singolo); ogni CFG si converte in CNF per binarizzazione ed eliminazione di epsilon e unitarie.
---
Q: Perche' il progetto IT-YO chiede la grammatica direttamente in CNF?
A: Perche' l'algoritmo CKY richiede la CNF: binarie lunghe 2 o lessicali lunghe 1.
---
Q: Che differenza c'e' tra equivalenza debole e forte tra grammatiche?
A: Debole: generano la stessa lingua (stesse frasi). Forte: assegnano anche gli stessi alberi (stesse strutture).
---
Q: Come funziona l'algoritmo CKY?
A: Parsing bottom-up per CNF con tabella T[i,j] dei non-terminali che derivano w_i..w_j: base lessicale sulla diagonale, poi si combina ogni split k con produzioni A -> B C; accetta se S in T[1,n].
---
Q: Qual e' la complessita' di CKY rispetto a N?
A: O(n^3 * |P|): cubica nella lunghezza dell'input perche' per ogni span (O(n^2)) si provano tutti gli split (O(n)) e le produzioni.
---
Q: Come si ricostruisce l'albero con CKY?
A: Con backpointer in ogni cella (quale produzione e quale split hanno aggiunto A); risalendo si ottiene l'albero o la foresta di tutti gli alberi.
---
Q: Cosa significa anatomia di un parser?
A: Le componenti tipiche: grammatica, lessico/tag, strategia di ricerca (top-down/bottom-up), chart con memoization, disambiguazione, valutazione.
---
Q: Cosa sono le strategie top-down e bottom-up nel parsing?
A: Top-down parte da S e predice (guidata dalla grammatica, spreca su ipotesi lessicali); bottom-up parte dalle parole e combina (guidata dai dati, propone costituenti inutili). CKY e chart le combinano.
---
Q: Cosa e' una Probabilistic CFG?
A: Una CFG dove ogni produzione ha probabilita' P(A -> alpha) con somma 1 per testa A; P(albero) = prodotto delle produzioni, P(frase) = somma sugli alberi.
---
Q: Come si stimano le probabilita' di una PCFG?
A: Con MLE dai conteggi su treebank; se gli alberi non sono annotati si usa EM (inside-outside).
---
Q: Qual e' il limite principale delle PCFG?
A: L'indipendenza contestuale troppo forte: una NP soggetto e' uguale a una NP oggetto; si rimedia con parent annotation o lessicalizzazione (Collins, Charniak).
---
Q: Cos'e' la parent annotation nelle PCFG?
A: Specializzare i non-terminali col genitore (NP^S vs NP^VP): piu' contesto, piu' parametri, miglior disambiguazione.
---
Q: Cosa significa lessicalizzare una grammatica?
A: Ancorare ogni non-terminale alla sua testa lessicale (VP[vede]): cattura preferenze come il PP attachment ma esplode i parametri (serve smoothing).
---
Q: Quali sono i 5 algoritmi per il parsing delle dipendenze sintattiche?
A: Chart di Eisner (proiettivo), MST graph-based di McDonald, transition-based arc-standard/eager (MALT/Nivre), transition-based con beam e stack-LSTM, parser neurale biaffine (Dozat-Manning).
---
Q: Come funziona il Transition Based Parser (MALT)?
A: Sistema shift-reduce con stack, buffer e insieme di archi; un classificatore predice SHIFT, LEFT-ARC, RIGHT-ARC, REDUCE dallo stato; parsing lineare greedy (o con beam).
---
Q: Quali azioni ha un sistema arc-standard e cosa fanno?
A: SHIFT (sposta dal buffer allo stack), LEFT-ARC (arco dalla cima al secondo con pop), RIGHT-ARC (arco dal secondo alla cima con pop), REDUCE (pop senza arco).
---
Q: Come funziona il parser MST graph-based di McDonald?
A: Costruisce il grafo completo delle dipendenze con pesi e cerca il maximum spanning tree (arborescenza): gestisce anche archi non proiettivi.
---
Q: Cosa significa proiettivo in un albero di dipendenze?
A: Che gli archi non si incrociano e ogni sottoalbero copre un intervallo contiguo; l'italiano e' quasi sempre proiettivo, altre lingue meno.
---
Q: Come funziona il parser biaffine di Dozat-Manning?
A: BiLSTM contestualizza le parole, poi uno scorer biaffine valuta ogni possibile testa per ogni dipendente e un MST estrae l'albero: stato dell'arte pre-LLM.
---
Q: Cosa sono UAS e LAS nella valutazione dei parser a dipendenze?
A: UAS: percentuale di teste corrette. LAS: teste piu' etichette corrette (piu' severa).
---
Q: Cosa e' la misura PARSEVAL?
A: Precision, recall e F1 sui costituenti (parentesi) del parse rispetto al gold, ignorando in genere POS e punteggiatura; i crossing brackets sono errori gravi.
---
Q: Cos'e' un treebank?
A: Un corpus annotato con alberi sintattici (PTB per l'inglese, TUT/VIT per l'italiano, UD multilingua); serve per training e valutazione dei parser.
---
Q: Quali treebank usa il progetto d'esame e per cosa?
A: UD Ancient Greek-Perseus e UD Latin-LLCT: nel progetto 1 per il PoS tagging, ma sono alberi di dipendenze riusabili anche per parsing.
---
Q: Perche' le dipendenze sono piu' vicine alla semantica dei costituenti?
A: Perche' gli archi nsubj/obj collegano direttamente predicati e argomenti, quasi una forma logica impoverita.
---
Q: Cosa fa il progetto 2 nella fase di traduzione dopo il parsing CKY?
A: Riscrive l'albero da ordine SVX a XSV (stile Yoda) e stampa le foglie: sposta il verbo in fondo preservando i sottoalberi.
---
Q: Perche' il progetto 2 dice di ignorare l'ambigue e prendere il primo albero?
A: Perche' con grammatica ambigua CKY trova piu' alberi; la traduzione ne usa uno solo per semplicita' didattica.
---
Q: Cosa sono simple-sem.fcfg e simple-sem-it-02.fcfg?
A: Grammatiche NLTK di esempio (inglese e italiana) con semantica composizionale; il progetto 2 chiede di ispirarsi a simple-sem per G1.
---
Q: Come si usa un parser a dipendenze nel progetto 3.A?
A: Con udpipe, spaCy, Stanza o Tint si parsano frasi e si cercano regolarita' (es. avere-nsubj->Jedi) per definire gli slot del frame.
---
Q: Quali parser a dipendenze per l'italiano cita il corso?
A: udpipe, spaCy, Stanza e Tint (Turin University Treebank): modelli UD con tag, lemmi e dipendenze.
---
Q: Cosa significa parsing incrementale e perche' conta per il dialogo?
A: Analizzare parola per parola senza aspettare la fine: serve nei sistemi di dialogo per rispondere presto e gestire auto-correzioni.
---
Q: Che relazione c'e' tra PoS tagging e parsing nel progetto 2?
A: Le pre-terminali della CFG (N, V, Det) fungono da tag: il lessico della grammatica e' un tagger a regole.
---
Q: Perche' la CNF rende CKY semplice ma gli alberi innaturali?
A: Perche' la binarizzazione introduce nodi artificiali; dopo il parsing si de-binarizza per ottenere l'albero originale.
---
Q: Cosa sono gli alberi non binari e come li tratta CKY?
A: Produzioni con piu' di due figlie (es. VP -> V NP PP): si binarizzano con nuovi non-terminali (VP -> V X, X -> NP PP).
---
Q: Come si gestiscono le produzioni unitarie A -> B in CNF?
A: Si eliminano per chiusura (se A ->* B e B -> gamma, si aggiunge A -> gamma) prima del parsing.
---
Q: Cosa sono le epsilon-produzioni e perche' danno fastidio a CKY?
A: A -> vuota: permettono costituenti senza parole e rompono la tabella per span; si eliminano in pre-elaborazione.
---
Q: Quale capitolo di Jurafsky-Martin copre costituenti e CKY?
A: Il capitolo sulle CFG e il constituency parsing (parte III del draft 3ed): grammatiche, CNF, CKY, PCFG, valutazione PARSEVAL.
---
Q: Quale capitolo di Jurafsky-Martin copre il dependency parsing?
A: Il capitolo dedicato al dependency parsing (parte III): transizioni, graph-based, valutazione UAS/LAS.
---
Q: Quale capitolo NLTK copre le CFG e il parsing?
A: Il capitolo su grammatiche libere e parsing (cap. 8 del NLTK book): CFG, chart parser, feature-based, dipendenze.
---
Q: Che differenza c'e' tra parsing e generazione?
A: Il parsing va da frase ad albero (analisi), la generazione va da rappresentazione semantica a frase (sintesi, cfr. progetto 3.C).
---
Q: Perche' il PP attachment e' anche un problema semantico?
A: Perche' la scelta dell'attaccamento cambia il significato (strumento vs possesso): serve conoscenza lessicale del mondo, non solo sintassi.
---
Q: Cosa significa che UD e' uno schema cross-lingua?
A: Che usa gli stessi tag POS ed etichette di dipendenza per tutte le lingue, cosi' greco, latino e italiano sono confrontabili.
---
Q: Quali etichette UD compaiono nell'esempio Jedi del progetto?
A: nsubj (soggetto: avere verso Jedi), det (determinante: Jedi verso I), obj (oggetto: avere verso figli).
---
Q: Come si valuta se un parse e' corretto in PARSEVAL con esempio?
A: Si confrontano i bracket (inizio, fine, etichetta): un NP in piu' o in meno conta come errore di precision o recall; F1 li combina.
---
Q: Perche' la valutazione LAS e' piu' informativa di UAS per il progetto 3?
A: Perche' al dialogo servono i ruoli (chi fa cosa): l'etichetta nsubj/obj conta quanto la testa per riempire gli slot.
---
Q: Cosa significa smoothing lessicale in un parser lessicalizzato?
A: Dare massa a teste mai viste insieme (backoff a tag, classi, suffissi) per evitare probabilita' zero come nell'HMM.
---
Q: Qual e' il legame tra PCFG e HMM?
A: Entrambi modelli generativi con DP: Viterbi trova la sequenza migliore, CKY probabilistico trova l'albero migliore; inside-forward e outside-backward sono analoghi.
---
Q: Cosa significa binarizzazione e perche' serve a CKY?
A: Trasformare produzioni lunghe in binarie con nuovi non-terminali (VP -> V X, X -> NP PP): CKY combina solo coppie, quindi la CNF e' obbligatoria.
---
Q: Cosa significa de-binarizzazione dopo il parsing?
A: Rimuovere i nodi artificiali introdotti dalla binarizzazione per restituire l'albero originale della grammatica.
---
Q: Come si converte una CFG generica in CNF in tre passi?
A: Eliminare epsilon-produzioni, eliminare produzioni unitarie per chiusura, binarizzare le produzioni lunghe.
---
Q: Qual e' la differenza tra chart parser ed Earley?
A: Entrambi usano chart con memoization; Earley lavora con produzioni qualsiasi (non solo CNF) in O(n^3) con predizione, scansione e completamento.
---
Q: Perche' il parsing a costituenti e' O(n^3) nel caso peggiore?
A: Perche' gli span sono O(n^2) e ogni span prova O(n) split: stesso argomento di CKY, valido per ogni chart parser CF.
---
Q: Cosa sono i crossing brackets e perche' sono gravi?
A: Parentesi incrociate tra parse e gold che nessun albero puo' contenere: PARSEVAL li penalizza in precision e recall insieme.
---
Q: Cosa significa valenza di un verbo per il parsing?
A: Il numero e tipo di argomenti richiesti (dare: 3): vincola le espansioni VP ammissibili e filtra alberi spuri.
---
