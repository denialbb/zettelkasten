# Livelli dell'analisi linguistica e PoS tagging

> Note di studio complete. Fonti: `tln/1 - Parte 1 - Lezione 01/lezione-01-Intro-TLN-INFO-2526.pdf` (87 pp.),
> `tln/4 - Parte 1 - Lezione 03/lezione-02-levels-TLN-INFO-2526.pdf` (86 pp.),
> `tln/3 - Parte 1 - Lezione 04/lezione-03-PoSTagging-TLN-INFO-2526.pdf` (81 pp., molte slide da D. Jurafsky).
> Riferimenti ai capitoli dei libri in `tln/references.md`.

---

## 1. Perche' il linguaggio naturale e' difficile (lez. 01)

Tre proprieta' rendono la TLN diversa da altri input informatici:

1. **Ambigue**: una stessa forma ha piu' letture (es. *legge*: nome o verbo?).
2. **Varia**: lo stesso significato si esprime in molti modi (parafrasi, sinonimi).
3. **Implicita/contestuale**: il significato dipende da contesto, mondo, intenzioni.

Due ipotesi fondamentali della linguistica computazionale (domanda d'esame):

- **H1 — la conoscenza linguistica e' in gran parte implicita e statistica**: le regolarita' si apprendono
  dai corpora (distribuzioni di parole, tag, strutture).
- **H2 — i livelli di analisi sono distinti ma interagenti**: fonologia/morfologia, sintassi, semantica,
  pragmatica/dialogo si modellano separatamente ma si influenzano (es. la sintassi aiuta il PoS tagging,
  la semantica risolve l'attaccamento dei PP).

Pipeline classica (a strati, dal basso verso l'alto):

```
testo grezzo -> tokenizzazione -> analisi morfologica -> PoS tagging (-> NER/chunking)
            -> parsing sintattico -> semantica (FoL, ruoli) -> pragmatica/dialogo
```

Ogni strato introduce errori che si propagano: per questo i modelli moderni (MEMM, CRF, BERT) usano
contesto ampio o apprendimento congiunto.

---

## 2. I livelli di analisi (lez. 02)

### 2.1 Fonetica/fonologia e morfologia

- **Tokenizzazione**: segmentare il testo in unita' (parole, punteggiatura). Non banale:
  *l'amico*, *New York*, *don't*, hashtag, emoji.
- **Normalizzazione**: minuscole, stemming/lemmatizzazione. Lo **stem** taglia (*port-* da *portare/porti*),
  il **lemma** riporta alla forma canonica (*portare*).
- **Morfologia flessiva vs derivazionale**: flessione (*parl-o/parl-i/parl-a*: stesso lemma, tratti diversi),
  derivazione (*parl-are -> parl-atore*: nuovo lemma).
- **Minimum Edit Distance (MED)**: distanza minima di inserimenti/cancellazioni/sostituzioni per passare
  da una stringa all'altra; programmazione dinamica con matrice D[i,j]:

```
D[i,j] = min( D[i-1,j] + del, D[i,j-1] + ins, D[i-1,j-1] + sub )
```

  Usi: spelling correction, valutazione ASR (WER), allineamento.

### 2.2 Morfologia computazionale: FST

I **trasduttori a stati finiti (FST)** mappano forma superficiale <-> analisi (lemma+tratti).
Sono bidirezionali (analisi e generazione con la stessa rete) e componibili in cascata
(lessico .o. regole ortografiche .o. morfotattica).

### 2.3 Sintassi: costituenti vs dipendenze (anticipazione)

- **Costituenti**: frasi come alberi di sintagmi annidati (NP, VP, PP). Formalismo: CFG.
- **Dipendenze**: archi binari testa -> dipendente con etichette (nsubj, obj, det...).
  Piu' vicina alla semantica (predicato-argomenti), standard UD usata nel progetto HMM greco/latino.
- Dettagli e algoritmi in `tln/notes/sintassi_e_parsing/notes.md`.

### 2.4 Semantica e pragmatica (anticipazione)

- **Semantica lessicale**: sensi delle parole (WordNet), WSD, embeddings. Parte 2 (Radicioni).
- **Semantica composizionale**: dal significato delle parole a quello della frase (lambda-FoL). Lez. 05.
- **Pragmatica/dialogo**: atti linguistici, common ground, frame, turni. Lez. 07.
- Dettagli in `tln/notes/semantica_e_dialogo/notes.md`.

---

## 3. PoS tagging (lez. 03)

### 3.1 Il task

Assegnare a ogni token la **categoria grammaticale** (NOUN, VERB, ADJ, ADV, PRON, DET, ADP, NUM,
CONJ, PRT, PUNCT...). I tagset reali combinano categoria e tratti: Penn Treebank (~45 tag:
NN/NNS/NNP/VBZ/VBD/JJ/RB/IN...), Universal POS (~17 tag, usati nei treebank UD del progetto d'esame).

Esempio (slide):

```
Plays/VBZ well/RB with/IN others/NNS
```

Usi: TTS (*legge* nome vs verbo si pronuncia uguale ma conta per prosodia; in inglese *lead*),
regex su tag per chunking (`(Det) Adj* N+`), input del parser, MT (riordino aggettivo-nome),
sentiment (aggettivi), controllo per POS negli studi diacronici.

### 3.2 Quanto e' difficile?

- ~85% dei **tipi** e' non ambiguo (*Janet* sempre PROPN), ma il 15% ambiguo e' frequentissimo:
  ~60% dei **token** e' ambiguo (*back*: ADJ/NOUN/VERB/PART/ADV; *plays*: NNS/VBZ).
- Accuratezza: ~97% i sistemi moderni (HMM, CRF, BERT simili); **baseline ≈ 92%**
  (tag piu' frequente per parola vista, NOUN per le ignote). Il 92% e' alto perche' molte parole
  (articoli, punteggiatura) sono banali: l'errore si concentra sulle parole ambigue frequenti.

### 3.3 Approcci

1. **Regole** (es. ENGTWOL/Brill): trasformatore a regole apprese o scritte a mano.
2. **Generativi**: HMM — modellano P(parole, tag) congiunta.
3. **Discriminativi**: MEMM, CRF — modellano P(tag | parole) con feature arbitrarie.
4. **Neurali**: BiLSTM, BERT (tagger contestuali).

### 3.4 HMM per PoS tagging

Modello: stati = tag, osservazioni = parole. Ipotesi di Markov del primo ordine (bigramma):

```
P(t_1..n, w_1..n) ≈ PROD_i P(t_i | t_{i-1}) * P(w_i | t_i)
                    transizione (A)            emissione (B)
```

- **Learning**: conteggi MLE su corpus annotato + smoothing (Laplace/add-k, interpolazione);
  per parole ignote: feature di suffisso/maiuscola o P(unk|t) stimata (vedi progetto d'esame).
- **Decoding**: **Viterbi** — programmazione dinamica, complessita' O(n * |T|^2):

```
viterbi[j,1] = P_inizio(j) * B[j, w_1]
viterbi[j,t] = max_i viterbi[i,t-1] * A[i,j] * B[j, w_t]   (+ backpointer)
```

  Dettagli ed esempio numerico in `deepdive_hmm_viterbi.md`.
- Estensione a **trigrammi**: stati = coppie di tag, O(n * |T|^3) con pruning/beam.
- HMM e' **generativo** (domanda d'esame: si').

### 3.5 MEMM vs HMM (domanda d'esame)

| | HMM | MEMM |
|---|---|---|
| Tipo | generativo: P(w,t) | discriminativo: P(t\|w) |
| Probabilita' | transizione+emissione | MaxEnt locale: P(t_i\|t_{i-1}, w) con feature arbitrarie |
| Vantaggio | semplice, pochi dati | feature lessicali/ortografiche ricche |
| Problema | indipendenza ingenua delle parole | **label bias**: la massa si conserva per stato, gli stati con poche transizioni uscenti "ignorano" l'osservazione |

Decoding MEMM: Viterbi (stessa DP, pesi locali) o greedy. Il CRF risolve il label bias normalizzando
**globalmente** sulla sequenza (Z(w) su tutte le sequenze), vedi `deepdive_memm_crf.md`.

### 3.6 CRF in sintesi

```
P(t|w) = 1/Z(w) * exp( SUM_i SUM_k lambda_k f_k(t_{i-1}, t_i, w, i) )
```

- Training: massima verosimiglianza con gradiente (richiede inferenza Forward-Backward per i marginali).
- Decoding: Viterbi modificato (somma di pesi invece di prodotti di probabilita').

### 3.7 Esercizio su HMM (dalla slide)

Dato un mini-corpus, fare il learning (tabelle A e B con smoothing) e decodificare una frase con
Viterbi a mano: inizializzare la colonna 1, riempire con max+backpointer, terminare con il max
dell'ultima colonna e risalire i puntatori. Stesso schema richiesto dal progetto d'esame 1.A.

### 3.8 NER tagging

**Named Entity Recognition**: BIO/BILOU tagging di persone, luoghi, organizzazioni, date, ecc.
Valutazione con F1 su entita' esatte (non su token). Modello classico: CRF/BiLSTM-CRF; oggi: BERT token classifier.

---

## 4. Collegamenti con l'esame

- Domande dirette: uso delle HMM nel PoS tagging; differenza MEMM/HMM; HMM generativo o discriminativo?;
  cos'e' PoS tagging / NER tagging; le due ipotesi della linguistica computazionale.
- Progetto 1 (PoS tagger greco+latino) = applicazione diretta di §3.4 + smoothing + baseline.
- Il parsing (progetto 2) usa il PoS tagging come pre-elaborazione.

---

*Fonti slide/pagina (pdftotext): lezione-03, righe ~89-91 (baseline 92%), ~145-174 (HMM/MEMM/CRF),
~302-449 (HMM modelling, Viterbi, summary), ~771-805 (esercizio HMM, trigrammi), ~824-957 (HMM vs MEMM,
learning/decoding), ~1195-1262 (CRF decoding). Lez. 02: livelli, FST, MED. Lez. 01: programma, H1/H2.*
