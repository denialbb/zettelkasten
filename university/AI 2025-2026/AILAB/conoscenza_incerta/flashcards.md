Q: Perche' l'esempio At per l'aeroporto mostra i limiti della logica?
A: Per osservabilita' parziale, osservazioni imprecise, esiti incerti delle azioni e modello completo intrattabile: la logica o sbaglia o conclude cose troppo deboli per decidere.
---
Q: Cosa succede a correggere la regola del mal di denti con una disgiunzione?
A: Si ottiene Sintomo implica Carie o Gengivite o ...: lista lunga, magari incompleta, che non aiuta a decidere la diagnosi piu' probabile.
---
Q: Cosa si intende per grado di belief?
A: E' un numero che esprime fiducia graduata in una proposizione, aggiornato con l'evidenza; i CF lo usano euristicamente, la probabilita' in modo coerente.
---
Q: Distingui probabilita' a priori e a posteriori.
A: A priori P(A) senza evidenza; a posteriori P(A|e) dopo aver osservato l'evidenza e.
---
Q: Come si definisce la probabilita' condizionata?
A: Come P(A|B) = P(A e B) / P(B) con P(B) > 0: frazione di mondi B in cui vale anche A.
---
Q: Enuncia la regola di Bayes.
A: P(Causa|Effetto) = P(Effetto|Causa) * P(Causa) / P(Effetto): combina verosimiglianza e base rate per la diagnosi.
---
Q: Cosa ci permette di concludere Bayes secondo le slide?
A: Che anche con sintomi rari o incerti si puo' diagnosticare, se si aggiungono priori e verosimiglianze richieste dal teorema.
---
Q: Di cosa abbiamo bisogno per sfruttare Bayes?
A: Di distribuzioni aggiuntive: priori sulle cause e verosimiglianze degli effetti data ogni causa, oltre all'evidenza osservata.
---
Q: Cosa e' la distribuzione congiunta completa?
A: E' P(X1..Xn) su tutte le variabili: risponde a qualsiasi query per marginalizzazione ma ha dimensione esponenziale O(2^n).
---
Q: Quando due variabili sono indipendenti e condizionatamente indipendenti?
A: Indipendenti se P(X,Y) = P(X)P(Y); condizionatamente indipendenti data Z se P(X|Y,Z) = P(X|Z).
---
Q: Come classifica il modello Naive Bayes?
A: Con P(C|A1..An) = alfa * P(C) * prodotto di P(Ai|C): la classe e' genitore di tutti gli attributi assunti indipendenti data la classe.
---
Q: Perche' Naive Bayes funziona nonostante l'assunzione falsa?
A: Perche' per classificare basta l'ordine delle classi, non probabilita' calibrate: anche con dipendenze ignorate vince spesso la classe giusta.
---
Q: Cosa e' una rete bayesiana?
A: E' un DAG con variabili come nodi, archi di dipendenza diretta e una CPT P(Xi|Genitori) per nodo; definisce la congiunta come prodotto delle CPT.
---
Q: Cosa contiene la CPT di un nodo?
A: La probabilita' del nodo per ogni combinazione dei genitori; i nodi radice hanno solo la priori.
---
Q: Come si fattorizza la congiunta in una BN?
A: Come P(X1..Xn) = prodotto su i di P(Xi|Genitori(Xi)) in ordine topologico (chain rule con indipendenze).
---
Q: Quanti parametri servono se ogni nodo ha al piu' k genitori?
A: Servono O(n * 2^k) invece di O(2^n): la compattezza viene dalle indipendenze affermate dagli archi mancanti.
---
Q: Perche' conta l'ordine di costruzione della rete?
A: Perche' vanno aggiunte prima le cause e poi gli effetti; solo cosi' ogni nodo e' indipendente dai non-discendenti dati i genitori.
---
Q: Quando una rete rispetta la semantica globale?
A: Quando per ogni nodo Xi vale l'indipendenza dai non-discendenti dati i genitori, cosi' il prodotto delle CPT e' la vera congiunta.
---
Q: Cosa specifica la topologia di una BN?
A: Le condizioni di indipendenza condizionale tra variabili, leggibili con d-separation.
---
Q: Cosa e' il Markov blanket di un nodo?
A: E' l'insieme di genitori, figli e genitori dei figli: dato il blanket il nodo e' indipendente da tutti gli altri.
---
Q: Cosa significa che una rete e' piu' debole?
A: Che ha meno archi e afferma piu' indipendenze: piu' compatta ma con assunzioni piu' forti rispetto ai dati.
---
Q: Descrivi la rete earthquake-allarme delle slide.
A: Burglary ed Earthquake causano Alarm, che causa JohnCall e MaryCall; serve a calcolare P(Burglary|chiamate).
---
Q: Quali file .net si aprono con SamIam?
A: raffreddore.net (modello domestico), earthquake.net (allarme classico) e cow.net (esempio veterinario).
---
Q: Come si partiziona U per l'inferenza?
A: In evidenza E con valori e, query X e nascoste Y = U meno E meno X.
---
Q: Qual e' la procedura di inferenza generale?
A: P(X|e) = alfa * P(X,e) = alfa * somma su y di P(X,e,y): si marginalizzano le nascoste e si normalizza.
---
Q: Come si calcola P(Burglary|j,m) con la rete?
A: Come alfa * somma su e e a di P(B)*P(e)*P(a|B,e)*P(j|a)*P(m|a), usando la fattorizzazione invece della congiunta.
---
Q: Perche' enumeration resta esponenziale nonostante la fattorizzazione?
A: Perche' i fattori nel prodotto crescono linearmente ma le somme sulle nascoste restano O(2^n) con poche evidenze; inoltre molti calcoli si ripetono.
---
Q: Cosa migliora portando fuori i fattori non indicizzati?
A: Lo spazio diventa lineare ma il tempo resta esponenziale: si evita solo di moltiplicare per costanti dentro le somme.
---
Q: Come funziona la variable elimination?
A: Elimina una nascosta alla volta moltiplicando solo i fattori che la contengono e sommandola via, rimpiazzandoli con il nuovo fattore ridotto.
---
Q: Da cosa dipende il costo della variable elimination?
A: Dall'ordine di eliminazione e dalla dimensione del fattore piu' grande creato (legata al treewidth della rete).
---
Q: Quali euristiche guidano l'ordine di eliminazione?
A: Min-degree e min-fill: eliminare prima variabili che creano fattori piccoli.
---
Q: Cosa sono MAP e MPE?
A: MAP e' l'assegnazione piu' probabile a un sottoinsieme di variabili; MPE a tutte le nascoste; piu' dure della posterior.
---
Q: Quando serve il campionamento?
A: Per reti grandi dove l'inferenza esatta e' intrattabile: rejection, likelihood weighting e MCMC approssimano le posteriori.
---
Q: Cosa dice la slide sui CF come gradi di belief?
A: Che i CF non soddisfano gli assiomi della probabilita': euristica pratica contro coerenza garantita delle BN.
---
Q: Quando preferire CF e quando BN?
A: CF quando elicitare CPT complete e' impossibile e serve spiegabilita' rapida; BN quando servono risposte coerenti e componibili.
---
Q: Dov'e' la via di mezzo tra CF e BN complete?
A: Naive Bayes: pochi numeri come i CF ma dentro il calcolo probabilistico, con assunzioni forti ma esplicite.
---
Q: Cosa mostra l'esempio del ponte bloccato per A1440?
A: Che la logica puo' dare garanzie solo a prezzi assurdi (dormire in aeroporto): serve bilanciare rischio e costo con probabilita'.
---
Q: Come si legge d-separation in una frase?
A: Come criterio grafico per decidere se due nodi sono indipendenti data un'evidenza, seguendo i cammini bloccati e sbloccati.
---
Q: Perche' gli archi vanno dalle cause agli effetti?
A: Perche' le CPT causali sono piu' piccole e stabili; la diagnosi (effetti verso cause) si ottiene poi con Bayes all'indietro.
---
Q: Cosa succede aggiungendo archi inutili a una BN?
A: Crescono le CPT e si perdono compattezza e leggibilita', senza migliorare l'inferenza: overfitting strutturale.
---
Q: Come si valida una BN con SamIam?
A: Si fissa evidenza sui nodi osservati e si leggono le posteriori aggiornate, confrontandole con frequenze note o giudizio esperto.
---
Q: Qual e' il flusso di studio consigliato per l'incertezza?
A: Prima limiti della logica e Bayes, poi Naive Bayes, poi sintassi e semantica BN, infine enumeration e variable elimination con l'esempio allarme.
---
Q: Cosa sono likelihood e marginal likelihood in Bayes?
A: Likelihood P(E|C) e' quanto la causa produce l'evidenza; marginal P(E) normalizza sommando su tutte le cause.
---
Q: Come si calcola P(E) con due cause esaustive?
A: Come P(E|C)*P(C) + P(E|non C)*P(non C): somma pesata sui mondi possibili.
---
Q: Cosa e' lo smoothing di Laplace in Naive Bayes?
A: Aggiungere conteggi fittizi (+1) cosi' nessun P(Ai|C) e' zero per eventi mai visti nel training.
---
Q: Perche' zeri non smorzati distruggono Naive Bayes?
A: Perche' un solo fattore zero azzera tutto il prodotto anche con forte evidenza contraria dagli altri attributi.
---
Q: Cosa e' la d-separation in una frase operativa?
A: Catene e forcelle si bloccano condizionando sul nodo medio; i collider si sbloccano condizionando sul collider o un discendente.
---
Q: Cosa e' l'explaining away?
A: Due cause indipendenti di uno stesso effetto diventano dipendenti data l'evidenza: una causa spiegata abbassa l'altra (terremoto vs furto).
---
Q: Come si manifesta explaining away nella rete allarme?
A: Fissando Alarm e aggiungendo Earthquake=true, la P(Burglary) scende: il terremoto spiega l'allarme.
---
Q: Cosa sono nodi radice e foglia in una BN?
A: Radice senza genitori (priori); foglia senza figli (spesso evidenza osservabile come chiamate).
---
Q: Come si fattorizza Naive Bayes come BN?
A: Stella: P(C)*prodotto P(Ai|C); e' la BN piu' semplice con un solo livello di figli.
---
Q: Cosa cambia tra inferenza esatta e approssimata?
A: Esatta (enumeration, VE) da' la posteriori vera ma esponenziale; approssimata (sampling) scala ma con errore statistico.
---
Q: Cosa fa il likelihood weighting?
A: Campiona le nascoste, fissa l'evidenza e pesa i campioni per la verosimiglianza: piu' efficiente del rejection con evidenza rara.
---
Q: Cosa significa che VE riusa i fattori?
A: Che ogni prodotto intermedio e' calcolato una volta e referenziato: analogo ai nogood che evitano lavoro ripetuto.
---
Q: Qual e' il ruolo di alfa nella formula di inferenza?
A: E' la costante di normalizzazione 1/P(e): si calcola alla fine sommando i punteggi non normalizzati.
---
Q: Perche' max e somma non commutano in MAP?
A: Perche' max su una variabile e somma su un'altra danno risultati diversi a seconda dell'ordine: MAP e' piu' dura della marginale.
---
Q: Cosa sono CPT deterministicamente note contro stimate?
A: Note da fisica o logica (sensori); stimate da dati con conteggi: le seconde portano incertezza parametrica oltre quella del modello.
---
Q: Come si impara una CPT da dati completi?
A: Con frequenze relative (conteggi + smoothing): P(X|genitori) = casi favorevoli su casi con quei genitori.
---
Q: Cosa succede con CPT apprese su pochi dati?
A: Stime rumorose e overfitting: servono priori (smoothing) o strutture piu' deboli con meno parametri.
---
Q: Perche' archi causali danno CPT piu' piccole?
A: Perche' ogni effetto dipende da poche cause dirette; invertendo (diagnostico) ogni sintomo dipenderebbe da tutte le malattie.
---
Q: Cosa verifica la semantica globale di una BN?
A: Che ogni nodo sia indipendente dai non-discendenti dati i genitori: altrimenti il prodotto delle CPT non e' la congiunta vera.
---
Q: Come usare SamIam per studiare?
A: Aprire earthquake.net, fissare John e Mary, leggere P(Burglary), poi aggiungere Earthquake e osservare explaining away live.
---
