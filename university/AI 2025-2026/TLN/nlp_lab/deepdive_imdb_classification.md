# Deep Dive: classificazione del sentiment su IMDB (baseline pre-LLM)

> Companion di `notes.md` (§6, §8.6.5). Fonti: Dispense cap. 6 e 8.6.5 (parafrasi), slides 6/8.
> Dataset IMDB (Maas et al.): 50k recensioni binarie (25k train / 25k test).

## 1. Pipeline classica

```
testo -> tokenize -> (stop, stemming) -> TF-IDF (uni+bigrammi, min_df)
      -> LogisticRegression / LinearSVM -> accuracy su test
```

Atteso: ~85-90% con bigrammi + SVM. Ablazioni: solo unigrammi (-2/-3), senza stop (~pari),
stemming (+1 su EN), min_df alto (-copertura). Matrice di confusione: errori su sarcasmo,
negazioni a lunga distanza (*non mi e' piaciuto... beh, il finale si'*), recensioni miste.

## 2. Confronto con LLM (cap. 8.6.5)

Prompt zero-shot su campione: pari o meglio sui casi sfumati, peggio su costo/latenza e
varianza col prompt; few-shot chiude il gap ma non gratis. Morale del cap.: la baseline
TF-IDF+SVM e' il riferimento onesto — l'LLM deve batterla, non solo apparire fluente.

## 3. Metriche oltre l'accuracy

Precision/recall per classe, F1, calibrazione (il classico e' calibrato, l'LLM no),
robustezza a prompt/parafrasi. Error analysis per fenomeno (negazione, sarcasmo, misto),
non solo numero unico.

## 4. Mini-esperimento suggerito (slides 6)

1. Baseline TF-IDF+LR su IMDB (o sotto-campione).
2. Zero-shot LLM sullo stesso campione (stesso split!).
3. Tabella: accuracy, costo, latenza; analisi di 20 errori per lato.

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_rag.md`.
*Libri:* JM cap. logistic regression/sentiment; IIR cap. 13-14 (Naive Bayes, VSM).
