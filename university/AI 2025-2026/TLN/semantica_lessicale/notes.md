# Semantica lessicale (Parte 2, Radicioni)

> Note di studio complete. Fonti: `tln/11 - Parte 2 - Lexical Semantics - Radicioni/` —
> `01_intro_TLN.pdf` (69 pp.), `02_KR_rappresentazioni_strutturate.pdf` (105 pp.),
> `04_WordNet.pdf` (82 pp.), `05_Esercitazione_WSD.pdf` (46 pp.),
> `06a_ngrams_LMs.pdf` (67 pp.), `06a_basic_text_processing.pdf` (69 pp.),
> `06b_VSM_rocchio_LDA.pdf` (50 pp.), `08_word2vec.pdf` (107 pp.),
> `09_intro_transformers.pdf` (83 pp.), `recap_LABS.pdf` (3 pp.),
> programmi svolti, letture in `letture_approfondimenti/`, notebook in `utils/`.
> Capitoli in `tln/references.md`.

---

## 1. Mappa del modulo (da `01_intro_TLN.pdf` e programmi svolti)

1. KR e rappresentazioni strutturate (frame, reti semantiche) — lez. 02.
2. WordNet: struttura, verbi/nomi, uso — lez. 04.
3. WSD e similarita': Lesk, misure, WiC — lez. 05.
4. N-gram e language model (smoothing, perplexity) — lez. 06a.
5. Basic text processing (tokenizzazione, Zipf, TF-IDF) + VSM/Rocchio/LDA — lez. 07.
6. Word2vec (SGNS, analogie, bias) — lez. 08, con `08_train_W2V.ipynb`, `VSM_srch.ipynb`.
7. Transformers (attention, BERT, prompt) — lez. 09, con `09_260331_public_notes.ipynb`.
8. Recap lab — lez. 10 (`recap_LABS.pdf`).

## 2. KR: frame e reti semantiche (lez. 02)

**Cosa deve fare una Knowledge Representation** (Davis-Shrobe-Szolovits 1993, lettura):
surrogato del mondo, impegni ontologici, teoria del ragionamento, mezzo espressivo, mezzo computazionale.

- **Frame di Minsky (1975, lettura)**: strutture con slot e default (stanza ha porte; se manca info,
  si eredita il default). Gerarchie con ereditarieta' e overriding; demoni procedurali (if-needed/added).
- **Reti semantiche**: nodi concetti, archi relazioni (IS-A, HAS-PART, AGENT...). Inferenza per
  ereditarieta' e path-finding; problema: semantica degli archi poco formale.
- **Logica**: precisa ma rigida; tradeoff espressivita'/trattabilita' (FOL vs Horn vs DL).
- Collegamento: i frame anticipano gli slot dei DS (Parte 1) e le classi ontologiche di WordNet.

## 3. WordNet (lez. 04)

**Cos'e'**: database lessicale dell'inglese (Miller 1995; Fellbaum ed.; letture Miller 1993, Fellbaum 1993):
**synset** (insieme di sinonimi = un senso), organizzati in gerarchie.

- **Nomi** (Miller 1993): iperonimia/iponimia (albero quasi tassonomico), meronimia
  (part-of: ruota/macchina), antonimia. Ereditarieta' lessicale.
- **Verbi** (Fellbaum 1993): troponimia (*correre* e' un modo di *muoversi*), entailment,
  causa; organizzazione piu' piatta e reticolare dei nomi.
- **Relazioni**: sinonimia, antonimia, iper/iponimia, mero/olonomia, troponimia, entailment,
  similar-to (aggettivi), pertainymy.
- **Uso computazionale**: `WN-explore.ipynb` (nltk.corpus.wordnet: synsets, hypernyms, path_similarity);
  similarita' (path, Wu-Palmer, Lesk); base per WSD e ontologie; limiti: granularita' fine,
  inglese-centrico, verbi deboli.
- Dettagli in `deepdive_wordnet.md`.

## 4. WSD ed esercitazione (lez. 05)

**Word Sense Disambiguation**: scegliere il senso giusto in contesto (*banca* fiume vs soldi).

- **Lesk (1986, lettura)**: conta l'overlap tra contesto e definizioni (glosse) dei sensi;
  baseline semplice, estensioni con iperonimi (Banerjee-Pedersen).
- **Supervisionati**: classificatori per parola (Naive Bayes, SVM) con feature di contesto;
  costano corpora annotati (SemCor).
- **Non supervisionati / WSI**: clustering dei contesti (induzione dei sensi).
- **Valutazione**: precisione su sensi; dataset WiC (Pilehvar-Camacho 2019, lettura): decisione
  binaria stesso-senso-diverso su coppie di contesti (no inventario fisso).
- **Similarita' umana**: WordSim353, MEN; correlazione di Spearman tra giudizi e coseno.
- **Review Meng 2013** (lettura): panorama dei metodi statistici.
- Esercitazione (`05_Esercitazione_WSD.pdf`, `utils/`: WiC_dataset, WordSim353, stop_words):
  Lesk da zero, similarita' coseno, valutazione su WiC/WordSim. Dettagli in `deepdive_wsd.md`.

## 5. N-gram e language model (lez. 06a)

**Language modeling**: `P(w_1..n) = PROD P(w_i | w_{i-n+1}..w_{i-1})` (Markov).
Stima MLE dai conteggi; **smoothing** (Laplace/add-k, Good-Turing, Kneser-Ney, backoff/interpolazione)
per gli n-gram mai visti; **perplexity** `PP = P(corpus)^(-1/N)` = branching medio (piu' bassa = migliore).
Esperimenti su `moby-dick.txt`, `frankenstein.txt` (`utils/`): Zipf, crescita del vocabolario (Heap),
confronto ordini di n. (Capitoli JM: N-gram Language Models.)

## 6. Basic text processing + VSM/Rocchio/LDA (lez. 07)

- **Pipeline**: tokenizzazione, normalizzazione, stop words (`stop_words`), stemming/lemmatizzazione;
  leggi di **Zipf** (f·r ≈ c) e **Heap** (V ≈ k·n^beta).
- **TF-IDF**: `tfidf(t,d) = tf(t,d) * log(N/df(t))`: pesa termini frequenti nel doc ma rari nel corpus.
- **VSM**: documenti e query come vettori sparsi; ranking per **coseno**; `VSM_srch.ipynb`.
- **Rocchio**: feedback di rilevanza — `q' = a·q + b·centro(rel) - c·centro(nonrel)` (IIR cap. 9).
- **LDA**: topic model generativo (doc = miscela di topic, topic = distribuzione di parole;
  inferenza Gibbs/variational). Dataset: `News_Category_Dataset_v3` (+HEAD 1000), `texts.zip`.

## 7. Word2vec (lez. 08)

Da conteggi sparsi a **embedding densi**: skip-gram con negative sampling (**SGNS**):
classifica (parola, contesto) veri vs k negativi campionati; la matrice dei pesi = embedding.
Analogie (`re - uomo + donna ≈ regina`), similarita' coseno, bias (uomo:informatico :: donna:casalinga —
misure WEAT e debias). GloVe come alternativa count-based. Lab: `08_train_W2V.ipynb` (gensim),
confronto con VSM sparso. Dettagli in `deepdive_word2vec_sgns.md`.

## 8. Transformers (lez. 09)

**Attention**: `Attention(Q,K,V) = softmax(QK^T/sqrt(d))V` — ogni token pesa tutti gli altri;
multi-head, posizionali, stack encoder/decoder (Vaswani 2017). **BERT** (masked LM + NSP,
bidirezionale, fine-tuning) vs **GPT** (autoregressivo, prompting). Prompting/ICL, RAG essenziale
(`rag_lab_essenziale.ipynb` in Parte 3). Appunti pubblici: `09_260331_public_notes.ipynb`,
`Appendix.txt`. Dettagli in `deepdive_transformers.md` (in `nlp_lab/`, condiviso con Parte 3)
e richiami qui per similarita' contestuale (WiC con BERT).

## 9. Recap lab (lez. 10)

`recap_LABS.pdf` (3 pp.): WordNet-explore, WSD/Lesk, VSM search, train-W2V, note transformers:
la catena sparso -> denso -> contestuale e' il filo del modulo e la base degli esperimenti
di Parte 3 (complessita' lessicale, RAG).

---

*Citazioni file: programmi svolti `260310/260313/260320/260323/260324/260331_programma_svolto.pdf`;
letture: davis93what, minsky75frames, evans2013dual, fellbaum93english, miller93introduction,
miller93nouns, miller95wordnet, lesk86automatic, meng2013review, pilehvar2019wic (nomi file
come in `letture_approfondimenti/`).*
