# Deep Dive: RAG completo (architettura, Lab-5, valutazione)

> Companion di `notes.md` (§7). Fonti: Dispense cap. 7 (parafrasi), slides 7,
> `Dati esercitazioni/rag/rag_lab_essenziale.ipynb`. Lewis et al. 2020 in references.

## 1. Architettura (§7.5, schema)

```
docs -> chunking (fissi/semantici + overlap) -> encoder -> indice vettoriale
query -> encoder -> top-k (denso, BM25 o ibrido) -> prompt [query + passi + citazioni]
     -> LLM -> risposta con riferimenti
```

Scelte: chunk 200-500 token con 10-20% overlap; k = 3-8; prompt che ordina di usare
solo i passi e citare; temperatura bassa per fedelta'.

## 2. Lab-5 in 6 step (§7.14)

1. Caricamento articoli NLP (PDF/txt puliti).
2. Chunking + metadati (titolo, pagina).
3. Indice (embeddings + BM25 ibrido).
4. Retrieve su domande di prova (precision/recall manuali).
5. Prompt aumentato (istruzioni + passi numerati).
6. Sistema completo + valutazione faithfulness per frase.

`rag_lab_essenziale.ipynb` = versione minima di 1-6 su pochi doc: punto di partenza.

## 3. Valutazione (§7.10)

- **Faithfulness**: % affermazioni supportate dai passi (giudice umano o LLM con span).
- **Answer relevance**: la risposta centra la domanda?
- **Context precision/recall**: passi utili tra recuperati / recuperati tra utili.
- Schema **PRE-RAG-POST** (cap. 3.9.1): confrontare senza retrieval, con retrieval, revisione.

## 4. Errori tipici e fix

| Sintomo | Causa | Fix |
|---|---|---|
| Risposta generica | k troppo basso / chunk grandi | k su, chunk giu' |
| Allucinazioni con citazioni | prompt debole | istruzioni + few-shot di citazione |
| Passi giusti ignorati | ordine/lunghezza | rerank, compressione, citazioni obbligatorie |
| Lento | indice piatto | ANN (HNSW), caching embedding |

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_imdb_classification.md`.
