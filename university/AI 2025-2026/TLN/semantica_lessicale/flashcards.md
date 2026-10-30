Q: Quali sono gli 8 blocchi della Parte 2 di Radicioni?
A: KR e frame, WordNet, WSD, n-gram/LM, text processing+VSM/Rocchio/LDA, word2vec, transformers, recap lab.
---
Q: Cosa deve fare una Knowledge Representation secondo Davis-Shrobe-Szolovits 1993?
A: Essere surrogato del mondo, fissare impegni ontologici, dare una teoria del ragionamento, essere mezzo espressivo e mezzo computazionale.
---
Q: Cosa sono i frame di Minsky 1975?
A: Strutture con slot e valori di default in gerarchie con ereditarieta' e overriding, piu' procedure if-needed/added: rappresentano situazioni stereotipiche.
---
Q: Cosa sono le reti semantiche e qual e' il loro problema?
A: Nodi concetti e archi relazioni (IS-A, HAS-PART) con inferenza per ereditarieta'; problema: semantica degli archi poco formale e ambigua.
---
Q: Qual e' il tradeoff espressivita'-trattabilita' nella KR?
A: Piu' espressivita' (FOL) significa ragionamento indecidibile o costoso; frammenti (Horn, description logic) sono trattabili ma meno espressivi.
---
Q: Cos'e' WordNet?
A: Database lessicale dell'inglese (Miller): sensi come synset di sinonimi organizzati in gerarchie con relazioni semantiche.
---
Q: Cos'e' un synset?
A: Un insieme di sinonimi che esprime un senso (es. {car, auto, automobile}): unita' base di WordNet.
---
Q: Come sono organizzati i nomi in WordNet (Miller 1993)?
A: In iperonimia/iponimia quasi tassonomica piu' meronimia (part-of): ereditarieta' lessicale dal generale allo specifico.
---
Q: Come sono organizzati i verbi in WordNet (Fellbaum 1993)?
A: Con troponimia (modo di: correre/muoversi), entailment e causa: struttura piu' piatta e reticolare dei nomi.
---
Q: Elenca le relazioni principali di WordNet.
A: Sinonimia, antonimia, iper/iponimia, mero/olonimia, troponimia, entailment, similar-to per aggettivi, pertainymy.
---
Q: Cos'e' la troponimia?
A: Relazione verbo-verbo di modo: X e' troponimo di Y se fare X e' fare Y in un certo modo (sussurrare/parlare).
---
Q: Cos'e' la meronimia con esempio?
A: Relazione parte-tutto: ruota e' meronimo di macchina; lo speculare e' olonimia.
---
Q: Come si esplora WordNet nel lab?
A: Con WN-explore.ipynb e nltk.corpus.wordnet: synsets, definizioni, hypernyms, path_similarity.
---
Q: Quali sono i limiti di WordNet?
A: Granularita' troppo fine dei sensi, inglese-centrico, verbi deboli, statica rispetto all'uso reale.
---
Q: Cos'e' la WSD?
A: Word Sense Disambiguation: scegliere il senso corretto di una parola ambigua nel suo contesto (banca fiume vs soldi).
---
Q: Come funziona l'algoritmo di Lesk 1986?
A: Conta l'overlap di parole tra contesto e definizioni (glosse) dei sensi candidati e sceglie il max; estensioni con iperonimi.
---
Q: Quali sono le tre famiglie di metodi WSD?
A: A conoscenza (Lesk), supervisionati (classificatori per parola su SemCor), non supervisionati/WSI (clustering dei contesti).
---
Q: Cos'e' la WSI e che differenza ha dalla WSD?
A: Word Sense Induction induce i sensi clusterizzando i contesti senza inventario fisso; la WSD sceglie da un inventario dato.
---
Q: Cos'e' il dataset WiC di Pilehvar-Camacho 2019?
A: Coppie di contesti con decisione binaria stesso-senso o diverso, senza inventario fisso: valuta rappresentazioni contestuali.
---
Q: Cosa contiene la review di Meng 2013?
A: Un panorama dei metodi statistici per WSD: feature, classificatori, dati e valutazioni.
---
Q: Cosa sono WordSim353 e MEN?
A: Dataset di similarita' con giudizi umani su coppie di parole; si valuta con correlazione di Spearman col coseno.
---
Q: Cosa fa l'esercitazione WSD della lezione 05?
A: Implementare Lesk, similarita' coseno e valutazione su WiC/WordSim353 con stop_words e i dataset in utils/.
---
Q: Come si fattorizza un language model a n-gram?
A: P(w_1..n) = PROD_i P(w_i | w_{i-n+1}..w_{i-1}) con ipotesi di Markov di ordine n-1.
---
Q: Perche' serve lo smoothing negli n-gram?
A: Perche' molti n-gram non compaiono mai nel training ma hanno probabilita' non nulla: senza smoothing il prodotto si azzera.
---
Q: Quali smoothing si usano per i LM?
A: Laplace/add-k, Good-Turing, Kneser-Ney, backoff e interpolazione tra ordini.
---
Q: Cos'e' la perplexity e come si interpreta?
A: PP = P(corpus)^(-1/N): branching medio del modello; piu' bassa significa modello migliore, ma si confronta solo a parita' di vocabolario.
---
Q: Cosa mostrano gli esperimenti su Moby Dick e Frankenstein?
A: Zipf, crescita del vocabolario, effetto dell'ordine di n e dello smoothing sulla perplexity.
---
Q: Cosa dicono le leggi di Zipf e Heap?
A: Zipf: frequenza per rango circa costante (f*r = c). Heap: vocabolario V = k*n^beta (cresce sublineare col corpus).
---
Q: Qual e' la pipeline di basic text processing?
A: Tokenizzazione, normalizzazione, rimozione stop words, stemming o lemmatizzazione.
---
Q: Cos'e' il TF-IDF?
A: tfidf(t,d) = tf(t,d) * log(N/df(t)): pesa termini frequenti nel documento ma rari nel corpus.
---
Q: Cos'e' il VSM e come ranka?
A: Vector Space Model: documenti e query come vettori sparsi pesati TF-IDF, ranking per similarita' coseno (VSM_srch.ipynb).
---
Q: Cos'e' il coseno tra vettori e perche' si usa?
A: Prodotto scalare normalizzato: misura l'angolo ignorando la lunghezza (documenti lunghi vs corti).
---
Q: Come funziona il feedback di Rocchio?
A: Sposta la query verso i rilevanti e lontano dai non rilevanti: q' = a*q + b*centro(rel) - c*centro(nonrel).
---
Q: Cos'e' LDA in una riga?
A: Topic model generativo: ogni documento e' miscela di topic, ogni topic e' distribuzione di parole; inferenza Gibbs o variazionale.
---
Q: Cosa contiene il News_Category_Dataset e a cosa serve?
A: Titoli di notizie con categoria (HEAD 1000 per prove veloci): serve per VSM, Rocchio, LDA e classificazione in texts.zip.
---
Q: Da sparso a denso: perche' passare dal VSM a word2vec?
A: Il VSM e' sparso, enorme e senza similarita' tra termini; gli embedding sono densi, compatti e con geometria semantica.
---
Q: Come funziona skip-gram con negative sampling?
A: Classifica coppie (parola, contesto) vere contro k negativi campionati: i pesi imparati sono gli embedding (SGNS).
---
Q: Cosa significa la formula re - uomo + donna = regina?
A: Che le relazioni semantiche sono spostamenti vettoriali: l'analogia si risolve col vicino piu' prossimo al vettore composto.
---
Q: Qual e' il problema del bias negli embedding?
A: Catturano stereotipi del corpus (uomo:informatico :: donna:casalinga): si misura con WEAT e si mitiga con debias, mai del tutto.
---
Q: Che differenza c'e' tra word2vec e GloVe?
A: Word2vec (SGNS) e' predittivo su contesti locali; GloVe fattorizza la matrice globale di co-occorrenza: risultati simili, filosofia diversa.
---
Q: Cosa fa 08_train_W2V.ipynb?
A: Addestra word2vec con gensim sui testi in utils/data e confronta vicini, analogie e similarita' col VSM sparso.
---
Q: Scrivi la formula dell'attention.
A: Attention(Q,K,V) = softmax(Q*K^T / sqrt(d)) * V: ogni token pesa tutti gli altri con pesi normalizzati.
---
Q: Perche' si divide per sqrt(d) nell'attention?
A: Per evitare saturazione del softmax con dimensioni grandi: i prodotti crescono con d e appiattirebbero i pesi.
---
Q: Cosa sono multi-head attention ed embedding posizionali?
A: Piu' teste di attention in parallelo (relazioni diverse) piu' vettori di posizione (l'attention pura e' insensibile all'ordine).
---
Q: Che differenza c'e' tra BERT e GPT?
A: BERT e' encoder bidirezionale con masked LM (capisce, fine-tuning); GPT e' decoder autoregressivo (genera, prompting).
---
Q: Cosa sono masked LM e NSP in BERT?
A: Masked LM predice token mascherati col contesto entrambi i lati; NSP (nelle prime versioni) predice se due frasi si seguono.
---
Q: Cosa sono prompting e in-context learning?
A: Usare il modello generativo con istruzioni ed esempi nel prompt senza aggiornare pesi: il task e' descritto, non addestrato.
---
Q: Come si valuta WiC con BERT?
A: Confrontando gli embedding contestuali della parola target nei due contesti (coseno sopra soglia = stesso senso).
---
Q: Cosa contiene recap_LABS.pdf?
A: Il riepilogo in 3 pagine: WordNet-explore, WSD/Lesk, VSM search, train-W2V, note transformers: la catena sparso-denso-contestuale.
---
Q: Qual e' il filo conduttore del modulo Parte 2?
A: Dal simbolico (frame, WordNet, Lesk) allo sparso (VSM) al denso (word2vec) al contestuale (BERT): stessa similarita', rappresentazioni sempre piu' ricche.
---
Q: Cosa sono evans2013dual e a cosa serve?
A: Lettura fornita sul modello duale del significato: sensi convenzionali e costruzioni contestuali, ponte tra lessico e uso.
---
Q: Perche' i verbi sono piu' difficili dei nomi in WordNet?
A: Perche' hanno gerarchie piatte, polisemia alta e sensi dipendenti dal contesto argomentale (Fellbaum 1993).
---
Q: Cosa significa granularita' fine dei sensi e perche' e' un problema?
A: Che WordNet distingue sensi troppo sottili per annotatori e sistemi: l'accordo inter-annotatore crolla e la WSD sembra peggiore di quanto e'.
---
Q: Come si calcola path_similarity in WordNet?
A: 1 / (1 + distanza in archi tra synset nella gerarchia): semplice ma ignora densita' e profondita'.
---
Q: Cos'e' la misura di Wu-Palmer?
A: 2*prof(LCS) / (prof(a)+prof(b)): normalizza per la profondita' del minimo antenato comune, meglio del path puro.
---
Q: Perche' TF-IDF batte la frequenza pura nel retrieval?
A: Perche' de-enfatizza termini comuni (il, di, che) che non discriminano e premia termini specifici del documento.
---
Q: Cosa significa backoff negli n-gram?
A: Se il trigramma manca, usare il bigramma (e poi l'unigramma) con peso di sconto: gerarchia di fallback.
---
Q: Cosa significa interpolazione negli n-gram?
A: Combinare linearmente le stime di ordini diversi con pesi lambda appresi su held-out: tutti gli ordini votano sempre.
---
Q: Perche' la perplexity si confronta solo a parita' di vocabolario?
A: Perche' dipende dalla granularita' dei token: vocabolari diversi danno scale diverse e il confronto e' sleale.
---
Q: Cosa significa OOV e come lo trattano n-gram e BERT?
A: Out-of-vocabulary: gli n-gram usano UNK con smoothing; BERT usa subword (BPE/WordPiece) cosi' non esiste quasi OOV.
---
Q: Cosa sono BPE e WordPiece?
A: Tokenizzazioni subword che spezzano parole rare in pezzi frequenti (gioc + o): vocabolario compatto, niente UNK.
---
Q: Quali capitoli di Jurafsky-Martin coprono n-gram, embeddings e transformers?
A: I capitoli su N-gram Language Models, Embeddings (word2vec) e Transformers/pretraining (parte I del draft 3ed).
---
Q: Quali capitoli IIR coprono VSM, TF-IDF e Rocchio?
A: I capitoli su scoring e vector space model (cap. 6), valutazione (cap. 8) e relevance feedback (cap. 9) di Manning-Raghavan-Schutze.
---
Q: Quali capitoli NLTK coprono WordNet, classificazione e topic?
A: I capitoli su WordNet/ontologie, classificazione supervisionata e modellazione del testo del NLTK book.
---
