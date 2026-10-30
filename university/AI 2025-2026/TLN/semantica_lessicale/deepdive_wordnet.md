# Deep Dive: WordNet (struttura, verbi, uso)

> Companion di `notes.md` (§3). Fonti: `04_WordNet.pdf`, letture Miller 1993 (nomi, intro),
> Fellbaum 1993 (verbi), Miller 1995, notebook `WN-explore.ipynb`.

## 1. Anatomia

- **Synset**: {parola.senso} + glossa + esempi. Id tipico `dog.n.01`.
- **Matrice lessicale**: righe = forme, colonne = significati; celle = sensi parola.
- Dimensioni (inglese): ~117k synset, ~150k parole; gerarchia nomi profonda ~10-15 livelli.

## 2. Nomi (Miller 1993)

Iperonimia come backbone: `entity > object > vehicle > car`. Test: *X e' un Y*.
Meronimia in 3 tipi: part (`ruota/macchina`), member (`albero/foresta`), substance
(`alluminio/lattina`). Ereditarieta': cio' che vale per il veicolo vale per l'auto
(salvo eccezioni — niente default alla Minsky, solo fatti).

## 3. Verbi (Fellbaum 1993)

Niente tassonomia unica: matrici verbo-modo. Relazioni:

```
troponimia:  sussurrare -> parlare (modo)
entailment:  russare -> dormire (implica)
causa:       uccidere -> morire
```

I verbi si organizzano per campo semantico (movimento, comunicazione...) con cross-riferimenti.

## 4. Uso in NLTK (da `WN-explore.ipynb`)

```python
from nltk.corpus import wordnet as wn
wn.synsets('dog', pos=wn.NOUN)
wn.synset('dog.n.01').hypernyms()
wn.synset('dog.n.01').path_similarity(wn.synset('cat.n.01'))
```

Misure: path (1/(1+d)), Wu-Palmer (profondita' LCS), Lesk (overlap glosse estese),
Resnik/Lin/Jiang-Conrath (information content da corpus).

## 5. Limiti ed eredi

Sensi troppo fini, inglese-centrico (eWn, MultiWordNet/BabelNet per il resto),
statico. Eredi: BabelNet (WordNet+Wikipedia multilingua), ConceptNet (commonsense),
embedding (sensi come punti, poi contestuali con BERT).

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_wsd.md`. *Libri:* JM cap. lexical semantics/vector chapters.
