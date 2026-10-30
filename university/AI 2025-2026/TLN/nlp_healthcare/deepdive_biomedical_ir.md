# Deep Dive: IR biomedica (ontologie, PICO, reranking)

> Compagno di `notes.md` (§3). Fonte: `biomedical IR.pptx` (PDF convertito).

## 1. Problema

Query e documenti usano parole diverse per la stessa cosa (*heart attack* contro
*myocardial infarction*, *high sugar* contro *hyperglycemia*). Il TF-IDF generico fallisce;
la soluzione e' conoscenza + semantica.

## 2. Pipeline

```
query -> parse PICO -> espansione ontologica (UMLS CUI: sinonimi, iperonimi, MeSH)
      -> prefiltro Boolean + BM25 -> rerank neurale (BioBERT/SciBERT cross-encoder)
      -> lista ordinata con span di evidenza
```

L'espansione va pesata: sinonimi su, iperonimi giu', altrimenti drift (*diabetes* esplode
in tutti i disordini metabolici).

## 3. PICO in pratica

*In elderly T2D patients, does SGLT2i vs metformin reduce hospitalization?*
P = anziani con T2D, I = inibitore SGLT2, C = metformina, O = ospedalizzazione.
Ogni faccetta diventa una clausola; valutazione per faccetta (l'ablazione mostra che Intervention conta di piu').

## 4. Valutazione

Topic TREC CDS (narrazioni di casi) con infNDCG; error analysis per faccetta, non solo il numero.

---
*Correlati:* `notes.md`, `flashcards.md`. *Libri:* IIR cap. 1/6/8/9; capitoli IE di JM.
