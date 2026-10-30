Q: Cosa definisce la NLP clinica nel deck introduttivo?
A: Dati piccoli annotati a mano, legame con la realta' fisica, ML con apporti di linguistica e medicina, sistemi di back-end, valutazione intrinseca piu' estrinseca con utenti.
---
Q: Cosa e' la valutazione estrinseca nella NLP clinica?
A: Test con utenti reali ed esiti (aderenza, tempo del clinico) invece della sola F1 su benchmark.
---
Q: Quali sistemi e risorse storiche cita la NLP biomedica?
A: Eliza (1966) come proto-counselor; PubMed, UniProt, GenBank, Protein DB, curatela esperta per relazioni gene-malattia e farmaco.
---
Q: Cosa caratterizza le note cliniche EHR?
A: Lettere di dimissione e diari rumorosi, abbreviati, basati su template, da de-identificare prima della condivisione.
---
Q: Cosa e' la de-identificazione e quale regola e' citata?
A: Rimuovere PHI (nomi, date) con surrogati; la regola di riferimento e' HIPAA Safe Harbor; i2b2/n2c2 e MIMIC sono corpora condivisi.
---
Q: Quali sono le ontologie biomediche principali?
A: UMLS (metathesaurus), SNOMED CT, ICD (fatturazione), RxNorm (farmaci), MeSH (intestazioni di letteratura).
---
Q: Perche' l'accordo inter-annotatore e' il tetto massimo?
A: Perche' l'annotazione esperta e' lenta e i modelli non possono onestamente superare l'accordo (kappa) delle proprie etichette di training.
---
Q: A cosa servono NegEx e ConText?
A: A rilevare negazione e portata di experiencer/tempo: no fever, denies pain, possible pneumonia, family history of diabetes.
---
Q: Qual e' il formato di query PICO?
A: Patient, Intervention, Comparison, Outcome: struttura le domande cliniche per il retrieval biomedico.
---
Q: Come si risolve il mismatch di vocabolario nella IR biomedica?
A: Con espansione ontologica (heart attack verso myocardial infarction) piu' reranking con embedding tipo BioBERT/SciBERT.
---
Q: Quali track TREC valutano la IR biomedica?
A: TREC Genomics e Clinical Decision Support, con metriche MAP e nDCG.
---
Q: Cosa sono TIMEX3, EVENT e TLINK?
A: Tag TimeML: espressioni temporali, eventi clinici e legami temporali (before, after, overlap) tra loro.
---
Q: A cosa serve il corpus THYME?
A: A estrarre relazioni temporali dalle note cliniche: eventi, tempi e loro ordinamento.
---
Q: Perche' le timeline del diabete di tipo 2 contano?
A: Perche' ordinano esordio, farmaci e traiettoria HbA1c per la gestione della malattia dalle lettere di dimissione.
---
Q: Quali sono gli errori tipici dell'estrazione temporale?
A: Espressioni vaghe (recently), legami tra frasi e annotazione sparsa.
---
Q: Come funziona il dialogo di un coach sanitario virtuale?
A: Dialogue management a frame con slot per sintomi, aderenza e ostacoli, piu' stile di motivational interviewing.
---
Q: Cosa mostra il caso di studio sull'agente per lo scompenso cardiaco?
A: Iniziativa mista, grounding, empatia ed escalation al clinico quando emerge un rischio.
---
Q: Perche' per i coach contano gli esiti e non i turni?
A: Perche' aderenza e cambiamento dei comportamenti sanitari contano piu' dell'efficienza del dialogo.
---
Q: Cosa vincola il linguaggio nella HRI assistiva?
A: Enunciati brevi confermabili e ripetibili sotto rumore ASR, con contesto fisico condiviso per il riferimento.
---
Q: Fai un esempio di riferimento in HRI.
A: This pill risolto dal contesto fisico condiviso, ma tempi e riparazione restano difficili.
---
Q: Chi e' il pubblico della visualizzazione per NLP?
A: I clinici, non gli NLP: le presentazioni devono essere semplici, azionabili e calibrate.
---
Q: Quali tecniche di visualizzazione cita il deck?
A: Viste di attenzione e salienza, matrici di confusione, proiezioni di embedding, dashboard di errori.
---
Q: Qual e' la pipeline di misinformazione nel deck veracity?
A: Rilevamento del claim, evidence retrieval, classificazione di stance, verdetto con fonti.
---
Q: Cosa riporta il deck COLING25 sulla fairness?
A: Gap di prestazioni degli LLM tra gruppi demografici e completamenti stereotipati nei task sanitari.
---
Q: Quali mitigazioni di fairness per gli LLM clinici?
A: Dati bilanciati, prompting attento, constrained decoding, revisione umana e audit estrinseco.
---
Q: Come riusa la Parte 4 i metodi della Parte 2?
A: TF-IDF/VSM per IR, embedding per reranking, BERT per task temporali e sui claim.
---
Q: Come riusa la Parte 4 il dialogo della Parte 1?
A: Dialogue management a frame, grounding, iniziativa e riparazione in coach e HRI.
---
Q: Come riusa la Parte 4 la RAG della Parte 3?
A: Evidence retrieval con citazioni per veridicita' e QA clinico.
---
Q: Qual e' il filo per l'esame tra tutti i deck?
A: Dati piccoli esperti piu' ontologie piu' negazione/tempo piu' dialogo piu' valutazione estrinseca piu' fairness.
---
Q: Quali capitoli di JM coprono la NLP sanitaria?
A: Information extraction (relazioni, eventi, tempo), sistemi di dialogo, valutazione e capitoli su sicurezza LLM della bozza 3a edizione.
---
Q: Quali capitoli di IIR coprono la IR biomedica?
A: Retrieval booleano, scoring VSM, valutazione e relevance feedback.
---
Q: Cosa e' SciBERT e perche' e' citato?
A: Un modello BERT preaddestrato su articoli scientifici (Beltagy et al. 2019): vocabolario biomedico e risultati migliori.
---
Q: Cosa e' BioBERT in una riga?
A: BERT ulteriormente preaddestrato su PubMed/PMC: baseline standard come encoder biomedico.
---
Q: Perche' la negazione e' critica nella IE clinica?
A: Perche' no fever non deve diventare un sintomo di febbre: la polarita' ribalta tutta la cartella.
---
Q: Cosa e' il rilevamento di incertezza, con esempio?
A: Distinguere possible pneumonia da caso confermato: l'hedging cambia codifica e cura.
---
Q: Cosa e' MeSH e a cosa serve?
A: Medical Subject Headings per indicizzare PubMed: vocabolario controllato per la ricerca di letteratura.
---
Q: Cosa e' il metathesaurus UMLS?
A: Una mappa tra vocabolari (SNOMED, ICD, RxNorm, MeSH) in uno spazio di concetti unico (CUI).
---
Q: Cosa e' un codice ICD?
A: Un codice di malattia per fatturazione e statistica: grezzo ma universale nei dati EHR.
---
Q: Cosa e' RxNorm?
A: Un vocabolario normalizzato dei farmaci che lega brand, generico e principi attivi.
---
Q: Cosa e' MIMIC?
A: Un dataset EHR di terapia intensiva de-identificato (note, esami, segnali) per la ricerca in NLP clinica.
---
Q: Cosa sono le challenge i2b2/n2c2?
A: Task condivisi di NLP clinica (de-identificazione, temporali, negazione) con dati annotati da esperti.
---
Q: Cosa e' lo stile di motivational interviewing?
A: Domande aperte, affermazioni, ascolto riflessivo: il coach suscita change talk invece di ordinare.
---
Q: Quando un coach deve passare al clinico?
A: Su segnali di rischio (dolore toracico, sintomi gravi): la sicurezza prevale sul flusso di dialogo.
---
Q: Cosa e' il barge-in e perche' conta nella HRI?
A: L'utente che interrompe il robot: il sistema deve fermarsi, ascoltare e riparare.
---
Q: Cosa e' la calibrazione nelle presentazioni cliniche?
A: Mostrare l'incertezza onestamente cosi' i clinici si fidano dei punteggi: niente dashboard troppo sicure.
---
Q: Cosa e' la classificazione di stance?
A: Etichettare se l'evidenza supporta, confuta o e' neutra rispetto a un claim.
---
Q: Cosa e' l'evidence retrieval per la veridicita'?
A: Trovare fonti autorevoli (linee guida, articoli) per fondare il verdetto: RAG per i claim.
---
Q: Cosa e' il gap demografico di prestazioni?
A: Accuratezza minore per gruppi sotto-rappresentati: il fallimento di fairness da verificare.
---
Q: Qual e' il rischio di over-reliance negli LLM clinici?
A: Che i clinici accettino output fluenti ma sbagliati: servono citazioni e mostrare l'incertezza.
---
Q: Perche' i dati piccoli sono normali in sanita'?
A: Privacy, costo degli esperti e condizioni rare: l'annotazione non scala mai come il testo web.
---
Q: Come gestire le abbreviazioni nelle note?
A: Con lessici di espansione e modelli di contesto: MI puo' essere infarction o insufficiency.
---
Q: Qual e' la difficolta' dello sentence splitting nelle note?
A: I punti in abbreviazioni, liste e template rompono gli splitter ingenui.
---
Q: Cosa e' la costruzione di timeline dalle note?
A: Ordinare eventi e tempi in una traiettoria del paziente: catene di TLINK stile THYME.
---
Q: Cosa lega il deck T2D alle relazioni temporali?
A: La cura del diabete richiede ordinamento esordio-farmaci-esami: il deck e' IE temporale applicata.
---
Q: Cosa lega i coach alla semantica a frame?
A: Gli slot sono ruoli neo-davidsoniani (chi, quale dose, quando): riuso dei frame della Parte 1.
---
Q: Quali punti del syllabus guidano le risposte d'esame?
A: NLP orientata allo scopo, dati piccoli, visione interdisciplinare, integrazione nel back-end, valutazione intrinseca piu' estrinseca.
---
Q: Qual e' la differenza tra SNOMED CT e ICD?
A: SNOMED CT e' una terminologia clinica fine per registrare la cura; ICD e' una classificazione grezza per fatturazione e statistica.
---
Q: Cosa e' un CUI in UMLS?
A: Un Concept Unique Identifier che mappa sinonimi tra vocabolari (SNOMED, ICD, RxNorm, MeSH) in un unico concetto.
---
Q: Cosa e' la rilevazione di sezione nelle note cliniche?
A: Trovare segmenti History, Medications, Assessment: il contesto cambia il senso (aspirina in allergia contro lista prescrizioni).
---
Q: Cosa e' la selezione di coorti con NLP?
A: Trovare pazienti eleggibili dalle note (diagnosi, farmaci, vincoli temporali) per trial: la precisione conta piu' del richiamo.
---
Q: Qual e' il rischio di errore della de-identificazione?
A: Nomi o date mancati che lasciano PHI: si valuta con metriche recall-first, mai uso senza controllo.
---
Q: Qual e' il ruolo delle linee guida come evidenza?
A: Fonti autorevoli che fondano verdetti e risposte RAG: citabili, versionate, verificabili.
---
