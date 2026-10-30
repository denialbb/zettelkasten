# Deep Dive: dependency parsing (MALT, MST, biaffine)

> Companion di `notes.md` (§5). Fonte: `lezione-04-Syntax03-TLN-INFO-2526.pdf`.

## 1. Il problema

Dato `w_1..n`, trovare testa `h(i)` ed etichetta `l(i)` per ogni parola (piu' radice ROOT).
Vincoli: albero singolo (connesso, aciclico), di solito proiettivo.

## 2. I 5 algoritmi (mappa)

| # | Algoritmo | Idea | Proiettivo? | Costo |
|---|---|---|---|---|
| 1 | Eisner chart | DP su span come CKY | si' | O(n^3) |
| 2 | MST McDonald | max spanning tree su grafo completo | no | O(n^2)-O(n^3) |
| 3 | MALT/Nivre transition-based | shift-reduce + classificatore | si' (varianti no) | O(n) |
| 4 | Beam/stack-LSTM | transizioni con memoria e beam | si' | O(n·beam) |
| 5 | Biaffine Dozat-Manning | BiLSTM + scorer biaffine + MST | no | O(n^2) |

## 3. MALT passo passo

Stato: stack S, buffer B, archi E. Esempio *I Jedi possono avere figli* (semplificato):
SHIFT spinge *I, Jedi*; LEFT-ARC crea `Jedi -det-> I`; SHIFT fino ad *avere*; RIGHT-ARC crea
`avere -nsubj-> Jedi`... Il classificatore guarda in cima a stack/buffer (parole, tag, archi
parziali) e sceglie l'azione. Training: oracle che deriva la sequenza gold; learning: SVM/MLP.
Errore tipico: propagazione (una azione sbagliata avvelena il resto) -> beam search.

## 4. MST e biaffine

MST: ogni arco (h->d) ha peso `s(h,d)` (e con etichetta `s(h,d,l)`); Chu-Liu-Edmonds trova
l'arborescenza massima. Biaffine: `s(h,d) = h_h^T W h_d + ...` con rappresentazioni BiLSTM
di testa/dipendente: preciso e parallelo, domina pre-LLM.

## 5. UAS/LAS ed errori

UAS ignora le etichette (struttura), LAS le include (ruoli). Errori tipici: PP attachment,
coordinazioni, verbi modali/ausiliari, punteggiatura. Nel progetto 3.A bastano pattern
ad alta precisione (nsubj/obj/det) estratti con spaCy/Stanza/Tint.

---
*Related:* `notes.md`, `flashcards.md`. *Libri:* JM cap. dependency parsing.
