# Deep dive: Graphplan — planning graph, mutex, estrazione

> Companion di `notes.md` sez. 6. Fonti: `04_Algoritmi_di_pianificazione_
> GRAPHPLAN.pdf`.

## 1. Costruzione del grafo, livello per livello

```
S0: fatti iniziali
A0: azioni applicabili in S0 + no-op di S0
S1: tutti gli add di A0
A1: azioni con pre in S1 (non mutex tra loro a coppie per le pre? no:
    in A1 entrano tutte, i mutex si annotano dopo)
...
```

Regola pratica: `Si+1` = unione degli effetti add di `Ai`; `Ai` = azioni le
cui precondizioni sono tutte presenti (non mutex) in `Si`. Le **no-op**
garantiscono monotonia: `Si ⊆ Si+1` come insiemi (i mutex possono invece
solo diminuire).

## 2. Mutex: le tre + una regole

Azioni `a, b ∈ Ai` mutex se:

1. **effetti inconsistenti**: `a` aggiunge `P`, `b` aggiunge `¬P`;
2. **interference**: `a` cancella una precondizione o un add di `b`;
3. **competing needs**: precondizioni di `a` e `b` mutex in `Si`.

Letterali `P, Q ∈ Si` mutex se **ogni** coppia di azioni produttrici
(incluse no-op) e' mutex (*inconsistent support*); se un letterale non ha
produttori non puo' stare nel livello.

Diagramma descritto: due catene causali che convergono sullo stesso livello
con un arco ondulato "mutex" tra nodi; l'arco sparisce ai livelli successivi
quando compare una terza azione produttrice non interferente.

## 3. Estrazione: ricerca all'indietro con memo

Da `Sk` con goal `G` senza mutex interni:

```
estrai(G, k):
  se k = 0: successo se G ⊆ S0
  scegli g ∈ G; per ogni a ∈ A(k-1) che produce g e non mutex con le azioni
  gia' scelte a questo livello: ricorri su (G ∖ eff(a)) ∪ Pre(a)
  memoizza i (G, k) falliti (nogood) per non ripeterli
```

Se fallisce tutto, espandi a `Sk+1` e riprova. La memoizzazione dei nogood
e' cio' che rende l'estrazione praticabile.

## 4. Terminazione e completezza

- Se a un livello il goal e' senza mutex ed estrazione riesce → piano
  parallelo ottimo in numero di livelli (makespan).
- Se due livelli consecutivi sono identici (letterali + mutex) e il goal non
  e' estraibile → **irraggiungibile**: termina con fallimento.
- Graphplan e' **corretto e completo** per planning proposizionale; la
  complessita' resta esponenziale nel caso peggiore (l'estrazione), ma il
  grafo guida e pota enormemente.

## 5. Eredita': euristiche moderne

Il *relaxed planning graph* (senza mutex) da' `h_max` (primo livello in cui
tutti i goal compaiono) e `h_add`/`h_FF` (costo del piano rilassato
estratto). FF = relaxed plan + hill-climbing: sacrifica l'ammissibilita'
per la velocita'. I landmark raffinano la stima con mete obbligate.

*Vedi anche:* `deepdive_pddl.md`, `deepdive_regressione.md`.
