# NLP lab (Parte 3, Di Caro)

> Note di studio (parafrasi, non citazioni letterali: le Dispense hanno nota di non ridistribuzione —
> solo studio locale). Fonti: `tln/12 - Parte 3 - Di Caro/Materiale didattico/Dispense/TLN_parte_III_dispense.pdf`
> (250 pp., cap. 1-9 + valutazione), Slides 1-9 (`slides_1_2026.pdf` ... `slides_9_2026.pdf`),
> dati in `Dati esercitazioni/` (definizioni-spurio.csv, privacy_misinformation xlsx, `rag/rag_lab_essenziale.ipynb`).
> Capitoli in `tln/references.md`.

---

## 1. Mappa (capitoli Dispense + slides)

| Cap. | Tema | Slides |
|---|---|---|
| 1 | Semantica computazionale: rappresentazione, uso, generazione; WSD/WSI, QA, da modulari a generativi | 1 |
| 2 | Definizioni, semasiologia, ricerca onomasiologica (genus-differentia...) | 2 |
| 3 | Privacy, rilascio dati, misinformation; annotazione PRE-RAG-POST | 3 |
| 4 | Polisemia: complessita', struttura, variazioni multilingue | 4 |
| 5 | Complessita' lessicale (LCP) | 5 |
| 6 | Pre-LLM NLP: text mining in poi (classificazione, sentiment) | 6 |
| 7 | RAG: memoria esterna, retrieval, architettura, evaluation, Lab-5 | 7 |
| 8 | LLM, prompting, interazione uomo-AI; esperimenti (sentiment, ragionamento) | 8 |
| 9 | Valutazione terza parte (2025/26) | 9 |

## 2. Tre prospettive sulla semantica (cap. 1)

- **Lessicale (inventario)**: sensi discreti (WordNet) — cfr. Parte 2.
- **Formale (verita')**: formule e modelli — cfr. Parte 1 (lambda-FoL).
- **Distribuzionale (uso)**: vettori dai contesti (Firth: *you shall know a word by the company it keeps*).
La Parte 3 le integra: definizioni come ponte simbolico-distribuzionale, RAG come memoria esterna,
LLM come generatori da valutare.

**Dal modulare al generativo**: pipeline (tokenizer->parser->SRL->DM) vs LLM end-to-end;
tradeoff controllo/robustezza gia' visto nei DS. **WSD vs WSI**, valutazione con pseudo-word
(sensi artificiali per test controllati).

## 3. Definizioni e onomasiologia (cap. 2, slides 2)

- **Definizioni come oggetti computazionali**: genus-differentia (*X e' uno Y che...*),
  per esempio, per rinvio, per parafrasi/sinonimia/descrizione.
- **Semasiologia** (parola -> sensi) vs **onomasiologia** (concetto -> parole: *come si chiama X?*).
  La ricerca onomasiologica (reverse dictionary, *tip-of-the-tongue*) si valuta con MRR/rank.
- **Ruolo delle definizioni** (cap. 1.7): glosse per Lesk/WSD, ancore per embedding di sensi,
  dati (`Dataset definizioni-spurio.csv`: definizioni genuine vs spurie da classificare).

## 4. Privacy e misinformation (cap. 3, slides 3)

- **Privacy/rilascio dati**: anonimizzazione, k-anonimato, rischio di re-identificazione;
  esercitazione su `esercitazione_lezione_3_privacy_misinformation.xlsx` (anche versione EMPTY).
- **Misinformation**: accesso all'informazione, veracita', bias; annotazione assistita.
- **Legame privacy-misinformation**: dati aperti utili ma rischiosi; RAG come accesso senza
  incorporare (conoscenza esterna invece che nei pesi).
- **Schema PRE-RAG-POST** (§3.9.1): si annota prima senza, poi con contesto recuperato, poi
  revisione — misura il guadagno del retrieval sull'annotazione.

## 5. Polisemia e complessita' lessicale (cap. 4-5, slides 4-5)

- **Polisemia**: sensi multipli strutturati (radiali, metonimie regolari), variazione cross-lingua
  (un senso IT si spezza in due EN e viceversa — problema per MT e dizionari).
- **Complessita' lessicale (LCP)**: predire quanto una parola e' difficile in contesto
  (regressione/classificazione su feature + embedding + LLM; task SemEval); serve a
  semplificazione automatica e leggibilita'.

## 6. Pre-LLM NLP (cap. 6, slides 6)

Text mining classico: BoW/TF-IDF, Naive Bayes/SVM/logistic, sentiment su **IMDB**
(vedi `deepdive_imdb_classification.md`), topic (LDA), NER/relazioni con feature.
Baseline oneste contro cui confrontare gli LLM (cap. 8.6.5: sentiment; 8.6.9: limiti di ragionamento).

## 7. RAG (cap. 7, slides 7, `rag_lab_essenziale.ipynb`)

**Idea**: retriever (denso BM25/embeddings) + generatore (LLM) con prompt aumentato dai passi.
Architettura (§7.5): chunking, indicizzazione, retrieval top-k, fusione nel prompt, generazione
con citazioni. **Evaluation** (§7.10): faithfulness (supporto), answer relevance, context precision/recall
(RAGAS). **Lab-5** (§7.14): RAG completo su articoli scientifici NLP in 6 step
(caricamento -> chunk -> index -> retrieve -> prompt -> generate).
Dettagli in `deepdive_rag.md`.

## 8. LLM, prompting, interazione (cap. 8, slides 8)

Prompting (zero/few-shot, CoT), ragionamento superficiale (§8.4.4: il modello imita il pattern
senza modello del mondo), esperimenti: classificazione/sentiment (8.6.5), limiti di ragionamento
e composizionalita' (8.6.9, 10.3.3). Interazione uomo-AI: fiducia, over-reliance, valutazione umana.

## 9. Valutazione terza parte (cap. 9, slides 9)

Modalita' d'esame per la Parte 3 (a.a. 25/26): lab exercises + discussione (dettagli nel cap. 9
e in `tln/projects/`). Gli esperimenti dei cap. 6-8 sono la palestra.

---

*Nota redistribuzione: le Dispense vietano riproduzione/distribuzione — queste note sono parafrasi
per studio locale, mai copia letterale estesa.*
