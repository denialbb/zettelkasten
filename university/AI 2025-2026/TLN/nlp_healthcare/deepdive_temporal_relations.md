# Deep Dive: relazioni temporali nel testo clinico (T2D)

> Compagno di `notes.md` (§4). Fonte: `temporal-rels-t2D.pptx` (PDF convertito).

## 1. Tag TimeML

- **TIMEX3**: date (*2024-03-01*), durate (*for 3 years*), vaghe (*recently*).
- **EVENT**: diagnosi, farmaci, esami, procedure.
- **TLINK**: before/after/overlap/includes tra coppie (evento-evento, evento-tempo).

## 2. Sistema

```
note -> de-id -> sentence split -> NER (eventi) + tagger TIMEX
      -> generazione coppie (con finestra) -> classificatore (features, oggi BERT pair encoding)
      -> consistenza globale (chiusura transitiva) -> timeline
```

Encoding di coppia: `[CLS] frase con markup <e1> [SEP] ...` con fine-tuning; i modelli a livello di documento
battono quelli solo-coppia sui legami tra frasi.

## 3. Esempio di timeline T2D

*Diagnosed T2D in 2019; started metformin 2020; HbA1c 8.1% last March; added empagliflozin.*
TLINK: diagnosi prima di metformina prima di HbA1c prima di empagliflozin; le durate ancorano i farmaci.
Uso: controlli di linee guida (ritardo di intensificazione), selezione di coorti.

## 4. Punti difficili

Tempi vaghi, ordine implicito (narrazione = cronologia?), sparsita' dell'annotazione: la chiusura
transitiva propaga sia segnale che errori — valutare le timeline, non solo le coppie.

---
*Correlati:* `notes.md`, `flashcards.md`. *Libri:* JM IE (relazioni, eventi, tempo).
