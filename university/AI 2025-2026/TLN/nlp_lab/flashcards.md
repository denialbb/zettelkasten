Q: Quali sono i 9 capitoli delle Dispense Parte 3?
A: 1 semantica computazionale, 2 definizioni e onomasiologia, 3 privacy e misinformation, 4 polisemia, 5 complessita' lessicale, 6 pre-LLM NLP, 7 RAG, 8 LLM e prompting, 9 valutazione.
---
Q: Quali sono le tre prospettive sulla semantica del cap. 1?
A: Lessicale come inventario (sensi discreti), formale come verita' (formule e modelli), distribuzionale come uso (vettori dai contesti).
---
Q: Cosa significa dal modulare al generativo?
A: Dalle pipeline di moduli (parser, SRL, DM) agli LLM end-to-end: si guadagna robustezza e si perde controllo esplicito.
---
Q: Che differenza c'e' tra WSD e WSI?
A: WSD sceglie sensi da inventario fisso; WSI li induce clusterizzando i contesti senza inventario.
---
Q: Cosa sono le pseudo-word nella valutazione WSD?
A: Sensi artificiali (fusione di due parole) per test controllati: si conosce la verita' e si misura l'effetto del contesto.
---
Q: Quali tipi di definizioni elenca il cap. 2?
A: Genus-differentia (uno Y che...), per esempio, per rinvio, per parafrasi/sinonimia/descrizione.
---
Q: Cos'e' una definizione genus-differentia?
A: Genere prossimo + differenza specifica: un chitarrista e' un musicista (genus) che suona la chitarra (differentia).
---
Q: Che differenza c'e' tra semasiologia e onomasiologia?
A: Semasiologia: dalla parola ai sensi (dizionario). Onomasiologia: dal concetto alle parole (come si chiama X?).
---
Q: Cos'e' la ricerca onomasiologica e come si valuta?
A: Reverse dictionary per il fenomeno tip-of-the-tongue (descrizione verso parola): si valuta con MRR e rank della risposta giusta.
---
Q: A cosa servono le definizioni in TLN secondo il cap. 1.7?
A: Glosse per Lesk/WSD, ancore per embedding di sensi, dati per classificazione (definizioni-spurio.csv).
---
Q: Cosa contiene Dataset definizioni-spurio.csv?
A: Definizioni genuine e spurie da classificare: palestra per text classification pre-LLM e prompting LLM.
---
Q: Quali rischi di privacy tratta il cap. 3?
A: Re-identificazione da dati anonimizzati, quasi-identificatori, k-anonimato insufficiente: il rilascio di dataset va valutato.
---
Q: Cos'e' il k-anonimato?
A: Ogni combinazione di quasi-identificatori compare in almeno k record: ostacola ma non impedisce la re-identificazione con conoscenza esterna.
---
Q: Cosa contiene l'esercitazione privacy_misinformation?
A: Un foglio xlsx (anche versione EMPTY da compilare) per annotare casi di privacy e misinformation: doppia versione soluzione e compito.
---
Q: Qual e' il legame tra privacy e misinformation nel cap. 3.7?
A: Dati aperti utili contro la misinformation ma rischiosi per la privacy; il RAG accede senza incorporare nei pesi.
---
Q: Cosa significa schema di annotazione PRE-RAG-POST?
A: Annotare prima senza contesto, poi con passi recuperati, poi revisione finale: misura il guadagno del retrieval.
---
Q: Cosa dice il cap. 4 sulla struttura della polisemia?
A: Che i sensi sono strutturati (nucleo radiale, metonimie regolari), non liste piatte: si estendono per metafora e metonimia.
---
Q: Perche' la polisemia varia tra lingue?
A: Perche' i sensi si segmentano diversamente (un senso IT si spezza in due EN): problema per MT, dizionari e transfer cross-lingua.
---
Q: Cos'e' la complessita' lessicale (LCP)?
A: Predire quanto una parola e' difficile nel suo contesto (regressione o classi): serve a semplificazione e leggibilita' (task SemEval).
---
Q: Quali feature servono per la complessita' lessicale?
A: Lunghezza, frequenza, sillabe, embedding, contesto, probabilita' LM: ibrido simbolico-distribuzionale.
---
Q: Cosa copre il cap. 6 pre-LLM NLP?
A: Text mining classico: BoW/TF-IDF, Naive Bayes/SVM/regressione logistica, sentiment, topic, NER con feature.
---
Q: Perche' tenere baseline pre-LLM contro gli LLM?
A: Perche' su sentiment e classificazione i classici sono forti ed economici: l'LLM deve dimostrare il guadagno (cap. 8.6.5).
---
Q: Cos'e' un sistema RAG in una riga?
A: Retriever (BM25 o denso) + generatore LLM con prompt aumentato dai passi recuperati, con citazioni.
---
Q: Quali sono i passi dell'architettura RAG (cap. 7.5)?
A: Chunking dei documenti, indicizzazione, retrieval top-k, fusione nel prompt, generazione con citazioni.
---
Q: Cosa sono BM25 e retrieval denso?
A: BM25: ranking lessicale sparso con saturazione TF e normalizzazione lunghezza. Denso: bi-encoder con coseno su embedding.
---
Q: Come si valuta un RAG (cap. 7.10)?
A: Faithfulness (risposta supportata dai passi), answer relevance, context precision e recall (metriche stile RAGAS) piu' giudizio umano.
---
Q: Cosa fa il Lab-5 del cap. 7.14?
A: Costruisce un RAG completo su articoli scientifici NLP in 6 step: caricamento, chunk, index, retrieve, prompt, generate.
---
Q: Cosa contiene rag_lab_essenziale.ipynb?
A: Il lab RAG essenziale in Dati esercitazioni/rag: pipeline minima funzionante da estendere nel Lab-5.
---
Q: Cosa significa chunking e perche' conta?
A: Spezzare documenti in passi (fissi o semantici con overlap): passi troppo grandi diluiscono, troppo piccoli perdono contesto.
---
Q: Cosa sono zero-shot, few-shot e Chain-of-Thought?
A: Zero: solo istruzioni. Few: istruzioni + esempi. CoT: chiedere i passi intermedi di ragionamento prima della risposta.
---
Q: Cosa significa ragionamento superficiale (cap. 8.4.4)?
A: Che il modello imita il pattern dei passi senza modello del mondo: giusto sui casi visti, fragile fuori distribuzione.
---
Q: Cosa mostra l'esperimento 2 su classificazione e sentiment (8.6.5)?
A: Il confronto classici vs LLM su sentiment: baseline forti, LLM migliori su sfumature ma costosi e variabili col prompt.
---
Q: Cosa mostra l'esperimento 6 sui limiti di ragionamento (8.6.9)?
A: Che gli LLM falliscono su composizionalita' e catene lunghe (cap. 10.3.3): errori sistematici, non rumore.
---
Q: Cosa significa over-reliance nell'interazione uomo-AI?
A: Fidarsi troppo del modello fluente: accettare risposte sbagliate perche' ben dette; serve calibrazione e citazioni.
---
Q: Cosa tratta il cap. 9 sulla valutazione?
A: Le modalita' d'esame della Parte 3 per il 25/26: lab exercises e discussione (dettagli in tln/projects/).
---
Q: Quali slide corrispondono a RAG e LLM?
A: Slides 7 per RAG (architettura, evaluation, Lab-5) e slides 8 per LLM/prompting/esperimenti; slides 9 per la valutazione.
---
Q: Perche' le Dispense vietano la ridistribuzione?
A: Nota interna di non riproduzione/distribuzione: queste note sono parafrasi per studio locale, mai copia letterale.
---
Q: Come si collega la Parte 3 alla Parte 2?
A: Riprende WSD/WSI, VSM, word2vec e BERT e li applica: complessita' lessicale, RAG, valutazione LLM.
---
Q: Come si collega la Parte 3 alla Parte 1?
A: Il trade modulare/generativo riusa la pipeline ASR-NLU-DM-NLG; il frame resta utile dentro/fuori l'LLM.
---
Q: Cos'e' la faithfulness in RAG?
A: Quanto ogni affermazione della risposta e' supportata dai passi recuperati: si misura per frase contro i chunk.
---
Q: Cosa sono context precision e recall in RAG?
A: Precision: frazione di passi recuperati utili. Recall: frazione di passi utili recuperati: retrieval buono vs completo.
---
Q: Perche' citare le fonti in un RAG?
A: Per verificabilita' (l'utente controlla), faithfulness misurabile e fiducia calibrata contro over-reliance.
---
Q: Quali errori tipici ha un RAG?
A: Chunk sbagliati, retrieval rumoroso, prompt che ignora i passi, citazioni inventate, risposte oltre i passi.
---
Q: Cosa significa retrieval ibrido?
A: Combinare BM25 e denso (fusione dei ranking): lessicale per termini rari, denso per parafrasi.
---
Q: Perche' il subsampling conta anche nei corpora RAG?
A: Perche' termini frequentissimi (il, di) dominano gli indici: stop o pesi li neutralizzano come in TF-IDF.
---
Q: Cosa significa valutazione umana contro automatica per LLM?
A: Automatica: benchmark e metriche (veloci, cieche alle sfumature). Umana: giudizi su qualita' reale (costosi, variabili).
---
Q: Quali capitoli di Jurafsky-Martin coprono RAG e LLM?
A: I capitoli su retrieval-based models, post-training/prompting e valutazione LLM (parti I-II del draft 3ed).
---
Q: Quali capitoli IIR servono per il retrieval del RAG?
A: Scoring/VSM (cap. 6), valutazione IR (cap. 8), feedback (cap. 9), language model per IR (cap. 12).
---
Q: Cos'e' la perplexity e perche' torna nel cap. 8?
A: Qualita' del LM come branching medio: bassa non implica ragionamento (fluente ma superficiale, 8.4.4).
---
Q: Cosa significa fine-tuning contro prompting?
A: Fine-tuning aggiorna pesi su dati task; prompting descrive il task senza aggiornare: tradeoff dati/costo/controllo.
---
Q: Perche' gli LLM faticano sulla composizionalita' (10.3.3)?
A: Perche' generalizzano per pattern visti, non per regole ricorsive: catene lunghe e nesting li rompono.
---
Q: Cosa sono le slides 1-6 in breve?
A: 1 semantica/QA, 2 definizioni, 3 privacy/misinformation, 4 polisemia, 5 complessita' lessicale, 6 pre-LLM text mining.
---
Q: Dove stanno dati e notebook della Parte 3?
A: In Dati esercitazioni/: definizioni-spurio.csv, privacy_misinformation xlsx (pieno+EMPTY), rag/rag_lab_essenziale.ipynb.
---
Q: Qual e' il messaggio del cap. 1.8 (conclusione)?
A: Che rappresentazione, uso e generazione vanno integrati: definizioni + retrieval + LLM valutati onestamente contro baseline.
---
Q: Cosa significa data leakage nella valutazione dei lab?
A: Che info del test finiscono nel training (stessi documenti, chunk sovrapposti): i numeri sembrano ottimi ma falsi; split per documento, mai per chunk.
---
Q: Cosa sono MRR e rank nella ricerca onomasiologica?
A: Reciprocal rank medio della parola giusta (1 se prima, 1/2 se seconda...): metrica standard del reverse dictionary.
---
Q: Perche' lo split per documento conta nel Lab-5 RAG?
A: Perche' chunk dello stesso articolo in train e test gonfiano precision/recall: il retrieval ritrova se stesso.
---
Q: Cosa significa reranking in un RAG?
A: Un secondo modello (cross-encoder) riordina i top-k del retriever veloce: piu' preciso, piu' costoso, solo sui pochi candidati.
---
Q: Cosa significa query rewriting per il retrieval?
A: Riformulare la domanda (espansione, HyDE) prima di cercare: colma il gap tra lingua della domanda e lingua dei documenti.
---
Q: Cosa sono gli hapax e perche' tornano in Parte 3?
A: Parole a frequenza 1: nel cap. 5 segnalano complessita', nel progetto HMM approssimano le ignote, nei corpora misurano ricchezza lessicale.
---
Q: Cosa significa calibrazione di un classificatore?
A: Che la confidenza dichiarata corrisponde all'accuratezza reale: regressione logistica calibrata, LLM spesso overconfident.
---
Q: Come si confrontano onestamente classico e LLM su IMDB?
A: Stesso split, stessa metrica, piu' costo e latenza riportati: senza questo il confronto e' pubblicita', non scienza (cap. 8.6.5).
---
