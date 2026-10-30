# Deep Dive: transformers e attention (per Parte 2 e 3)

> Companion di `semantica_lessicale/notes.md` (§8) e `nlp_lab/notes.md` (§8).
> Fonti: `09_intro_transformers.pdf`, `09_260331_public_notes.ipynb`, `Appendix.txt`.

## 1. Attention, formula e intuizione

```
Attention(Q,K,V) = softmax(Q K^T / sqrt(d_k)) V
```

Ogni posizione interroga (Q) tutte le chiavi (K) e media i valori (V) coi pesi.
Multi-head = h attention in parallelo su proiezioni diverse, concatenate e riproiettate.
Maschere: encoder bidirezionale (tutto visibile), decoder causale (solo passato).

Diagramma (descritto): matrice n×n di pesi (righe = query, colonne = chiavi); diagonale e
vicini forti nei primi layer, pattern sintattici/semantici nei layer alti;teste diverse =
pattern diversi.

## 2. Transformer block

```
x -> [MultiHeadAttn + residuo + LayerNorm] -> [FFN + residuo + LayerNorm] -> y
```

FFN: due lineari con ReLU/GELU, espansione 4×. Posizionali sinusoidali o appresi sommati
all'embedding. Vaswani 2017: 6+6 layer, d=512, 8 teste; oggi ordini oltre.

## 3. BERT vs GPT

| | BERT | GPT |
|---|---|---|
| Architettura | encoder bidirezionale | decoder causale |
| Training | masked LM (+NSP) | next-token |
| Uso | embedding + fine-tuning | generazione + prompting |
| WiC | coseno tra stati contestuali | prob. condizionate / prompt |

## 4. Pratica (dai notebook)

`09_260331_public_notes.ipynb`: tokenizzazione subword, estrazione stati, similarita'
contestuale su coppie WiC. Attenzioni: token spezzati (media dei pezzi), layer diversi
(ultimi = senso, primi = sintassi), soglia su dev.

## 5. Limiti (ponte al cap. 8 Parte 3)

Costo quadratico in n, contexto finito, ragionamento superficiale, calibrazione scarsa:
da qui RAG (memoria esterna) e valutazione onesta (cap. 7.10, 8.6.9).

---
*Related:* `../semantica_lessicale/notes.md`, `notes.md`, `flashcards.md`.
*Libri:* JM cap. Transformers/pretraining; Vaswani et al. 2017 [course-paper in references].
