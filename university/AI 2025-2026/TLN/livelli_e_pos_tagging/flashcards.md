Q: Quali sono le tre proprieta' del linguaggio naturale che rendono la TLN difficile?
A: Ambigue (stessa forma, piu' letture), varia (stesso significato in molti modi), implicita/contestuale (il significato dipende da contesto e mondo).
---
Q: Quali sono le due ipotesi fondamentali della linguistica computazionale?
A: H1: la conoscenza linguistica e' in gran parte implicita e statistica, appresa dai corpora. H2: i livelli di analisi sono distinti ma interagenti (morfologia, sintassi, semantica, pragmatica si influenzano).
---
Q: Qual e' la pipeline classica di analisi TLN dal basso verso l'alto?
A: Testo grezzo, tokenizzazione, analisi morfologica, PoS tagging (NER/chunking), parsing sintattico, semantica, pragmatica/dialogo. Gli errori dei livelli bassi si propagano verso l'alto.
---
Q: Che differenza c'e' tra stemming e lemmatizzazione?
A: Lo stemming taglia la desinenza in modo euristico (port- da portare/porti), la lemmatizzazione riporta alla forma canonica del lemma (portare) usando lessico e analisi morfologica.
---
Q: Che differenza c'e' tra flessione e derivazione morfologica?
A: La flessione varia i tratti dello stesso lemma (parlo/parli/parla), la derivazione crea un nuovo lemma (parlare verso parlatore).
---
Q: Che cos'e' la Minimum Edit Distance e come si calcola?
A: E' il numero minimo di inserimenti, cancellazioni e sostituzioni per passare da una stringa all'altra; si calcola con programmazione dinamica D[i,j] = min(D[i-1,j]+del, D[i,j-1]+ins, D[i-1,j-1]+sub).
---
Q: A cosa serve la Minimum Edit Distance in TLN?
A: Spelling correction, valutazione dell'ASR (WER), allineamento di stringhe e sequenze.
---
Q: Cosa sono i trasduttori a stati finiti (FST) in morfologia?
A: Automi che mappano forma superficiale e analisi (lemma+tratti); sono bidirezionali (analisi e generazione con la stessa rete) e componibili in cascata.
---
Q: Cos'e' il PoS tagging?
A: Assegnare a ogni token la categoria grammaticale (NOUN, VERB, ADJ...) con eventuali tratti (genere, numero, tempo); input tipico di parser e chunker.
---
Q: Quali tagset si usano nel PoS tagging e quale usa il progetto d'esame?
A: Penn Treebank (circa 45 tag: NN, VBZ, JJ...) per l'inglese; Universal POS (circa 17 tag) nei treebank UD; il progetto greco/latino usa i tag UD (Perseus e LLCT).
---
Q: Fai un esempio di frase annotata con PoS tag.
A: Plays/VBZ well/RB with/IN others/NNS: plays e' ambiguo tra NNS e VBZ, well tra UH/JJ/NN/RB.
---
Q: A cosa serve il PoS tagging nelle applicazioni?
A: TTS, chunking con regex sui tag ((Det) Adj* N+), input del parser, MT (riordino aggettivo-nome), sentiment, controllo per POS negli studi diacronici.
---
Q: Perche' il PoS tagging e' difficile se l'85% dei tipi e' non ambiguo?
A: Perche' il 15% ambiguo e' frequentissimo: circa il 60% dei token e' ambiguo (back: ADJ/NOUN/VERB/PART/ADV).
---
Q: Qual e' l'accuratezza tipica del PoS tagging e quanto vale la baseline?
A: Circa 97% i sistemi moderni (HMM, CRF, BERT simili); la baseline (tag piu' frequente, NOUN per le ignote) e' gia' al 92% perche' molte parole sono banali.
---
Q: Quali sono le quattro famiglie di approcci al PoS tagging?
A: Regole (Brill), modelli generativi (HMM), modelli discriminativi (MEMM, CRF), modelli neurali (BiLSTM, BERT).
---
Q: Come fattorizza le probabilita' un HMM di bigramma per il PoS tagging?
A: P(t,w) = PROD_i P(t_i|t_{i-1}) * P(w_i|t_i): probabilita' di transizione tra tag per probabilita' di emissione della parola dal tag.
---
Q: HMM e' un modello generativo o discriminativo?
A: Generativo: modella la distribuzione congiunta P(parole, tag) e genera sia tag che parole.
---
Q: Come si fa il learning di un HMM per PoS tagging?
A: Conteggi MLE su corpus annotato per transizioni ed emissioni, piu' smoothing (Laplace/add-k) e gestione delle parole ignote (suffissi, maiuscole, P(unk|t)).
---
Q: Come si fa il decoding di un HMM e con quale complessita'?
A: Con l'algoritmo di Viterbi (programmazione dinamica con backpointer), complessita' O(n * |T|^2) con n parole e |T| tag.
---
Q: Scrivi la ricorrenza di Viterbi per l'HMM di bigramma.
A: viterbi[j,1] = P_inizio(j)*B[j,w_1]; viterbi[j,t] = max_i viterbi[i,t-1]*A[i,j]*B[j,w_t], tenendo il backpointer dell'i migliore.
---
Q: Come si estende l'HMM ai trigrammi e quanto costa?
A: Gli stati diventano coppie di tag, P(t_i|t_{i-1},t_{i-2}); costo O(n*|T|^3), serve pruning o beam search.
---
Q: Quali sono i problemi principali dell'HMM per PoS tagging?
A: Ipotesi di indipendenza ingenua (la parola dipende solo dal tag), niente feature lessicali/ortografiche ricche, parole ignote deboli, Markov di ordine basso.
---
Q: Che differenza c'e' tra MEMM e HMM?
A: HMM e' generativo (P(w,t) con transizione+emissione); MEMM e' discriminativo (P(t|w) con MaxEnt locale e feature arbitrarie di parole e contesto).
---
Q: Cos'e' il label bias dei MEMM?
A: La normalizzazione locale conserva la massa per stato: gli stati con poche transizioni uscenti ignorano l'osservazione perche' tutta la massa va comunque alle poche uscite.
---
Q: Come si decodifica un MEMM?
A: Con Viterbi (stessa DP con pesi locali) oppure in modo greedy da sinistra a destra.
---
Q: Come risolve il CRF il problema del label bias?
A: Normalizzando globalmente sulla sequenza con Z(w) su tutte le sequenze di tag, cosi' gli stati competono tra loro e l'osservazione conta ovunque.
---
Q: Scrivi la forma di P(t|w) in un CRF lineare.
A: P(t|w) = 1/Z(w) * exp(SUM_i SUM_k lambda_k f_k(t_{i-1},t_i,w,i)), con feature f_k pesate e Z(w) somma su tutte le sequenze.
---
Q: Come si addestra un CRF?
A: Massima verosimiglianza con gradiente: servono i marginali via Forward-Backward per il gradiente di log Z(w).
---
Q: Come si decodifica un CRF?
A: Con Viterbi modificato: si massimizza la somma dei pesi (score) invece del prodotto di probabilita'.
---
Q: Cosa richiede l'esercizio su HMM della lezione 3?
A: Fare il learning (tabelle A e B con smoothing) su un mini-corpus e decodificare una frase con Viterbi a mano: colonna iniziale, ricorrenza con max+backpointer, risalita finale.
---
Q: Cos'e' il NER tagging e come si valuta?
A: Riconoscere entita' nominate (persone, luoghi, organizzazioni...) con schema BIO/BILOU; si valuta con F1 sulle entita' esatte, non sui singoli token.
---
Q: Quali modelli si usano per il NER?
A: Classico: CRF o BiLSTM-CRF; oggi: classificatori di token su BERT contestuale.
---
Q: Perche' articoli e punteggiatura gonfiano l'accuratezza del PoS tagging?
A: Perche' sono quasi sempre non ambigui e frequentissimi: si prendono punti facili e l'errore reale e' sulle parole ambigue.
---
Q: Cosa sono i tratti morfologici nei tag e perche' contano per greco e latino?
A: Genere, numero, caso, tempo, modo: in greco e latino la flessione ricca rende il tagset effettivo molto grande e lo smoothing cruciale (progetto d'esame 1).
---
Q: Qual e' il trucco numerico suggerito per implementare Viterbi nel progetto?
A: Usare i logaritmi delle probabilita' (somme invece di prodotti) per evitare underflow.
---
Q: Quali strategie di smoothing per parole ignote propone il progetto d'esame?
A: Sempre NOUN; NOUN/VERB 50-50; uniforme 1/num_tag; statistica su hapax del dev set; approcci con suffissi o sintassi (opzionale).
---
Q: Cosa sono le due baseline del progetto PoS tagger?
A: Facile: tag piu' frequente dal training, NOUN per le ignote. Difficile: MEMM (repo GitHub indicato) o altro modello piu' forte.
---
Q: Perche' H1 (statistica) motiva HMM, MEMM e CRF?
A: Perche' tutti stimano distribuzioni dai corpora: conteggi per HMM, pesi di feature per MEMM/CRF.
---
Q: Perche' H2 (livelli interagenti) motiva i modelli discriminativi?
A: Perche' MEMM/CRF possono usare feature da piu' livelli insieme (parola, suffisso, maiuscola, contesto) superando la pipeline rigida.
---
Q: Che differenza c'e' tra tagset Penn e Universal POS?
A: Penn e' ricco e inglese-specifico (VBZ, VBD, NNS...), Universal POS ha circa 17 tag grossolani e cross-lingua (VERB, NOUN...), con tratti separati.
---
Q: Cos'e' il chunking e che relazione ha col PoS tagging?
A: Segmentare in sintagmi non ricorsivi (NP, VP...) con regex sui tag, es. (Det) Adj* N+; usa il PoS come input.
---
Q: Quali errori fa tipicamente un tagger sulle parole ambigue frequenti?
A: Errori su nomi/verbi (plays), participi/aggettivi, avverbi/preposizioni, e su parole ignote assegnate al tag sbagliato senza smoothing morfologico.
---
Q: Perche' HMM, CRF e BERT hanno accuratezze simili sul PoS tagging inglese?
A: Perche' il task e' quasi saturo al 97%: il contesto locale basta e il margine residuo e' rumore/ambigue inconsistenze di annotazione.
---
Q: Cosa significa decoding greedy per un MEMM e quando basta?
A: Scegliere a ogni posizione il tag col max locale dato il precedente; basta se le decisioni sono facili, ma propaga errori senza backtracking.
---
Q: A cosa servono i backpointer in Viterbi?
A: A ricordare, per ogni cella (tag, posizione), il predecessore migliore, cosi' alla fine si ricostruisce la sequenza ottima risalendo dall'ultimo max.
---
Q: Cosa rappresenta la matrice B dell'HMM e da dove viene l'esempio WSJ?
A: B[j,w] = P(parola w | tag j), stimata dai conteggi; la slide mostra la figura 8.13 con likelihood dal corpus WSJ senza smoothing.
---
Q: Perche' il CRF ha bisogno di Forward-Backward in training ma Viterbi in test?
A: Perche' il gradiente richiede i marginali su tutte le sequenze (Forward-Backward), mentre in test basta la singola sequenza migliore (Viterbi).
---
Q: Come si valuta un PoS tagger?
A: Accuratezza sui tag (token accuracy) su test set separato, confrontando con baseline facile e difficile e analizzando gli errori piu' comuni.
---
Q: Quali treebank UD usa il progetto d'esame 1 e per quali lingue?
A: UD_Ancient_Greek-Perseus per il greco antico e UD_Latin-LLCT per il latino, addestrando separatamente.
---
Q: Cosa significa addestrare separatamente su greco e latino nel progetto?
A: Stimare due modelli HMM distinti (A e B per lingua) perche' tagset, morfologia e distribuzioni sono diversi.
---
Q: Perche' le parole che compaiono una sola volta (hapax) aiutano lo smoothing?
A: Perche' la loro distribuzione di tag sul dev set approssima quella delle parole mai viste sul test (parole ignote).
---
Q: Che ruolo ha il PoS tagging nel progetto convertitore IT-YO?
A: E' implicito nella grammatica: le pre-terminali della CFG (N, V, Det...) sono i tag delle parole delle frasi di esempio.
---
Q: Cos'e' un corpus annotato e perche' serve al PoS tagging supervisionato?
A: Testo con tag corretti per ogni token (es. WSJ, UD): serve per stimare transizioni ed emissioni (HMM) o pesi (MEMM/CRF).
---
Q: Qual e' la differenza tra tipi e token nella statistica dell'85%?
A: I tipi sono le parole distinte del vocabolario (85% non ambigue), i token sono le occorrenze (60% ambigue perche' le ambigue sono frequenti).
---
Q: Perche' Janet e' un esempio di parola non ambigua?
A: Perche' e' sempre PROPN nel corpus: i nomi propri rari e le parole tecniche hanno una sola lettura.
---
Q: Cosa fa lo spelling con MED su una parola ignota al tagger?
A: Niente direttamente: MED serve alla correzione ortografica a monte; il tagger gestisce l'ignota con smoothing morfologico.
---
Q: Qual e' il legame tra tokenizzazione e PoS tagging in italiano?
A: Le forme contratte (l'amico, dell') richiedono segmentazione prima del tagging, altrimenti il tag e' indefinito.
---
Q: Perche' la punteggiatura si tagga nel PoS tagging?
A: Perche' aiuta il parsing (confini di frase e sintagmi) e fa punteggio facile in valutazione.
---
Q: Cosa significa che il tagging e' un task di sequence labeling?
A: Che assegna un'etichetta a ogni elemento di una sequenza con dipendenze tra etichette vicine: stessa struttura di NER e chunking.
---
Q: Quali capitoli di Jurafsky-Martin coprono PoS tagging e HMM?
A: Il capitolo sul sequence labeling per PoS e NER (parte III del draft 3ed, capitolo 8 nella 2ed): HMM, Viterbi, MEMM, CRF.
---
Q: Quali capitoli NLTK coprono il tagging?
A: Il capitolo su categorizzazione e tagging del testo (cap. 5 del NLTK book): tagger a regole, n-gram, Brill, valutazione.
---
