# Deep Dive: lambda-calcolo e FoL composizionale (con NLTK)

> Companion di `notes.md` (§2). Fonti: `lezione-05-Semantics-TLN-INFO-2526.pdf`,
> `simple-sem.fcfg`, `simple-sem-it-02.fcfg` in `tln/9 - Parte 1 - Lezione 09/`.

## 1. Il meccanismo in 4 passi

1. **Lessico tipato**: ogni parola ha categoria sintattica + termine lambda con tipo
   (`e` entita', `t` verita', `<e,t>` predicato...).
2. **Regole annotate**: `S[sem=<app(?np,?vp)>] -> NP[sem=?np] VP[sem=?vp]`.
3. **Parsing**: si deriva l'albero sintattico con i SEM composti.
4. **Beta-riduzione**: si riduce a una formula FoL chiusa, poi si interroga (Mace/Prover9).

## 2. Esempio completo: *ogni cane abbaia*

```
Det 'ogni' : \P Q. forall x. (P(x) -> Q(x))
N   'cane' : \x. cane(x)
V   'abbaia': \x. abbaia(x)

NP 'ogni cane' = Det(N) = \Q. forall x. (cane(x) -> Q(x))
S  = NP(VP)    = forall x. (cane(x) -> abbaia(x))
```

In `simple-sem.fcfg` le regole sono gia' scritte cosi'; in NLTK:

```python
import nltk
from nltk.sem import logic
lex = nltk.data.load('grammars/book_grammars/simple-sem.fcfg')
parser = nltk.parse.FeatureChartParser(lex)
trees = parser.parse('every dog barks'.split())
sem = trees.__next__().label()['SEM']
print(sem.simplify())  # forall x. (dog(x) -> bark(x))
```

## 3. Quantificatori e portata

*Ogni studente ha letto un libro* da' due SEM diversi a seconda dell'ordine di applicazione
(soggetto largo vs oggetto largo). Le grammatiche ingenue ne producono uno solo: servono
meccanismi di underspecification (Hole Semantics) o quantifier raising.

## 4. Italiano (`simple-sem-it-02.fcfg`)

Differenze: accordo N-Adj/Det-N via feature, clitici oggetto (`lo vede`), soggetto nullo.
Ogni fenomeno aggiunge regole SEM: il clitico introduce un argomento legato dal contesto,
il soggetto nullo un esistenziale o una variabile anaforica (ponte verso DRT).

## 5. Limiti (ponte verso Parte 2 e 3)

Lambda-FoL non tratta vaghezza (*alto*), sensi (*banca*), gradabilita', implicature:
servono lessico ontologico (WordNet), distribuzionale (embeddings) e pragmatica (dialogo).

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_neo_davidson.md`. *Libri:* JM cap. semantica; NLTK cap. 10.
