# Deep Dive: WSD (Lesk, supervisionati, WiC)

> Companion di `notes.md` (§4). Fonti: `05_Esercitazione_WSD.pdf`, letture Lesk 1986,
> Meng 2013, Pilehvar-Camacho 2019, `utils/` (WiC_dataset, WordSim353, stop_words).

## 1. Lesk passo passo

```
Lesk(parola w, contesto C):
  per ogni senso s di w:
    score(s) = | parole(C senza stop) ∩ parole(glossa(s) + esempi) |
  ritorna argmax score
```

Varianti: glossa estesa con iper/ipo-nimi (Banerjee-Pedersen), pesi TF-IDF, backoff al senso
piu' frequente (MFS — baseline fortissima: ~65% su SemCor inglese).

## 2. Supervisionati e neurali

Un classificatore per parola su feature di contesto (bag, POS, collocazioni) addestrato su
SemCor/OMSTI. Oggi: fine-tuning di BERT con testa di classificazione sui sensi, o matching
bi-encoder glossa-contesto (BEM, GlossBERT). La MFS resta il riferimento onesto.

## 3. WiC: cambiare il task

Invece di etichette da inventario: stessa parola in due frasi -> stesso senso? (si/no).
Esempio: *aria fresca* vs *aria condizionata* (no); *banca dati* vs *banca centrale* (no... o si'
a seconda dell'inventario — ed e' il punto: WiC non lo fissa). Metrica: accuratezza binaria.
Con BERT: coseno tra embedding contestuali sopra soglia appresa.

## 4. Errori tipici (dal lab)

Stop words non rimosse (gonfiano overlap), glosse corte (sensi poveri vincono), MFS non
battuta su parole sbilanciate, granularita' fine (due sensi quasi identici entrambi plausibili).

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_wordnet.md`, `deepdive_word2vec_sgns.md`.
