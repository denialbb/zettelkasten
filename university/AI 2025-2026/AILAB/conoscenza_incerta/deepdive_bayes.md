# Deep dive: regola di Bayes in diagnosi

> Companion di `notes.md` sez. 2–3. Fonti: `06_Incertezza.pdf` (regola e
> uso di Bayes); Genesereth–Kao.

## 1. Formula e nomi dei pezzi

```
P(C|E) = P(E|C) · P(C) / P(E)
```

- `P(C)` priori: quanto e' frequente la causa prima dei sintomi;
- `P(E|C)` likelihood: quanto la causa produce il sintomo;
- `P(E)` evidenza totale: somma su tutte le cause (normalizza);
- `P(C|E)` posteriori: cio' che interessa al decisore.

Errore classico: confondere `P(E|C)` (sensibilita' del sintomo) con `P(C|E)`
(probabilita' della malattia). Bayes corregge con il base rate: un sintomo
tipico di una malattia rarissima resta poco probabile.

## 2. Esempio numerico (stile slide mediche)

Mal di denti: `P(Carie) = 0.05`, `P(Dolore|Carie) = 0.8`,
`P(Dolore|¬Carie) = 0.1` (gengiviti, sensibilita'...).

```
P(Dolore) = 0.8·0.05 + 0.1·0.95 = 0.135
P(Carie|Dolore) = 0.8·0.05 / 0.135 ≈ 0.30
```

Il dolore alza la probabilita' dal 5% al 30%, ma resta minoritaria: la
logica pura avrebbe concluso "carie" (sbagliando nel 70% dei casi), Bayes
quantifica il dubbio e chiede altri test.

## 3. Naive Bayes come Bayes ripetuto

Con attributi `Ai` indipendenti data `C`, la regola si applica in catena e
il denominatore `P(A1..An)` diventa una costante `α` unica:

```
P(C|A) = α · P(C) · Π P(Ai|C)
```

Si stimano solo `P(C)` e le singole `P(Ai|C)` (conteggi + smoothing di
Laplace contro zeri mai visti). Diagramma: stella con `C` al centro e frecce
verso ogni `Ai`.

*Vedi anche:* `deepdive_bayes_networks.md`, `deepdive_inferenza_ve.md`.
