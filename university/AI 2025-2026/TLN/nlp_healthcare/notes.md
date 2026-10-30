# NLP per la sanita' (Parte 4, Di Eugenio)

> Note di studio complete. Fonti: `tln/13 - Parte 4 - NLP for healthcare/` — `dieugenio-syllabus.pdf` (8 pp.),
> deck: `introduction-final`, `data-resources`, `biomedical IR`, `temporal-rels-t2D`,
> `intro-virtual-coach`, `heart-failure-ca`, `hri-assistive`, `nlp-visualization`,
> `veracity-bias-slides-acl25`, `llm-fairness-healthcare_coling25`
> (PPTX convertiti in PDF con libreoffice, estratti con pdftotext).
> Mappa ai capitoli in `tln/references.md`.

---

## 1. Perche' la NLP biomedica (introduction-final, syllabus)

La NLP clinica analizza dati reali (clinici e non specialisti), collega il linguaggio alla realta'
esterna (corpi, robot, cartelle cliniche), usa ML con apporti di linguistica/psicologia/medicina, incorpora
i modelli nei sistemi di back-end e valuta in modo intrinseco (algoritmi) ed estrinseco
(con utenti reali, HCI). I dati sono spesso **piccoli** (annotati a mano, privati) — a differenza della NLP web.
Storia: Eliza (1966) come proto-counselor; PubMed/UniProt/GenBank/Protein DB come fonti di conoscenza;
curatela esperta per relazioni gene-malattia, proteina-proteina, farmaco-farmaco.

## 2. Dati e risorse (data-resources)

- **Note EHR**: lettere di dimissione, diari clinici; testi rumorosi, abbreviati, basati su template; de-identificazione
  (HIPAA Safe Harbor, nomi surrogati) prima della condivisione (i2b2/n2c2, MIMIC).
- **Letteratura biomedica**: PubMed/MEDLINE, intestazioni MeSH; ontologie (UMLS, SNOMED CT, ICD, RxNorm).
- **Annotazione**: poca, esperta, lenta; l'accordo inter-annotatore (kappa) e' il tetto massimo.
- **Preprocessing**: segmentazione delle frasi su testo clinico, espansione delle abbreviazioni, negazione
  (NegEx/ConText: *no fever*, *denies pain*), incertezza (*possible*, *likely*).

## 3. IR biomedica (biomedical IR)

L'IR classica (Boolean, TF-IDF/VSM — cfr. Parte 2) incontra espansione via MeSH/UMLS, query in formato PICO
(Patient/Intervention/Comparison/Outcome), reranking con BioBERT/SciBERT; valutazione con
TREC Genomics/Clinical Decision Support (MAP, nDCG). Punto chiave: il mismatch di vocabolario
(non specialista *heart attack* contro *myocardial infarction*) si risolve con ontologie + embeddings.

## 4. Relazioni temporali, diabete di tipo 2 (temporal-rels-t2D)

Le lettere di dimissione ordinano gli eventi nel tempo: TIMEX3 (date/durate), EVENTS, TLINK (before/after/
overlap). Corpora THYME/TimeML; classificatori su coppie (features, poi BERT); timeline per T2D
(esordio, farmaci, traiettoria HbA1c). Errori: espressioni vaghe (*recently*), legami tra frasi,
sparsita' dell'annotazione.

## 5. Coach virtuali (intro-virtual-coach, heart-failure-ca)

Sistemi di dialogo per il cambiamento dei comportamenti (dieta, esercizio, aderenza ai farmaci): dialogue management
a frame (slot = sintomi, aderenza, ostacoli) + stile di motivational interviewing; caso di studio
dell'agente conversazionale per lo scompenso cardiaco: iniziativa, grounding, empatia, escalation al clinico.
Valutazione: esiti di aderenza, non solo successo di turno (estrinseca, cfr. §1).

## 6. HRI assistiva (hri-assistive)

Interazione uomo-robot: robot che danno istruzioni/suggerimenti a utenti anziani o con disabilita';
il linguaggio deve essere breve, confermabile, ripetibile; NLU sotto rumore ASR; il contesto fisico condiviso
semplifica il riferimento (*this pill*) ma richiede tempi e riparazioni (repair).

## 7. Visualizzazione per la NLP (nlp-visualization)

Visual analytics per modelli e corpora: viste di attenzione/salienza, matrici di confusione,
proiezioni di embedding, dashboard di errori; pubblico = clinici, non NLP: presentazioni semplici,
azionabili, calibrate.

## 8. Veridicita', bias, fairness (veracity-bias-slides-acl25, llm-fairness-healthcare_coling25)

Rilevamento della misinformazione (claim, evidence retrieval, stance — cfr. Parte 3 cap. 3), bias nei
dati di training (gruppi sotto-rappresentati), fairness degli LLM in sanita' (risultati COLING25):
gap di prestazioni tra gruppi demografici, completamenti stereotipati, mitigazioni (dati bilanciati,
prompting, constrained decoding, revisione umana) e audit estrinseco obbligatorio.

## 9. Filo per l'esame

Dati piccoli esperti + ontologie + negazione/tempo + dialogo + valutazione estrinseca + fairness:
ogni deck lo istanzia. Cita deck + slide e mappa i metodi ai capitoli di JM/IIR (references.md).

---

*Conteggi slide (testo convertito): data-resources ~745 righe, biomedical IR ~523, temporal ~1109,
virtual-coach ~411, heart-failure ~419, hri ~471, visualization ~1654, veracity-bias ~294,
llm-fairness ~635, introduction ~348.*
