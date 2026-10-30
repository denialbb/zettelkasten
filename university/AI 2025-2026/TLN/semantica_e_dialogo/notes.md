# Semantica computazionale e sistemi di dialogo

> Note di studio complete. Fonti: `tln/9 - Parte 1 - Lezione 09/lezione-05-Semantics-TLN-INFO-2526.pdf` (68 pp.),
> `tln/10 - Parte 1 - Lezione 10/lezione-07-DS-TLN-INFO-2526.pdf` (99 pp.).
> Grammatiche: `simple-sem.fcfg`, `simple-sem-it-02.fcfg`. Capitoli in `tln/references.md`.

---

## 1. Ambigue puramente semantica (domanda d'esame)

Esempio: *Ogni studente ha letto un libro* — due letture con stessa sintassi:
(a) c'e' un libro letto da tutti (portata larga di *un*); (b) ognuno ha il suo (portata stretta).
Altro: *La banca e' sul fiume* (senso di *banca*: istituto vs sponda — WSD, cfr. Parte 2).
La sintassi da' un solo albero, la semantica due forme logiche: serve la composizionalita'.

## 2. Lambda-FoL per la semantica computazionale (domanda d'esame)

**Idea**: associare a ogni nodo sintattico una espressione lambda; la regola semantica segue
la regola sintattica (principio di composizionalita' di Frege/Montague).

Lessico (stile `simple-sem.fcfg` di NLTK):

```
Det 'ogni'   => \P Q. forall x. (P(x) -> Q(x))
N   'cane'   => \x. cane(x)
V   'abbaia' => \x. abbaia(x)
NP 'Maria'   => \P. P(Maria)
```

Composizione: `S -> NP VP` applica `SEM(NP)(SEM(VP))`. Esempio *Maria abbaia*:

```
(\P. P(Maria))(\x. abbaia(x)) --beta--> abbaia(Maria)
```

`simple-sem-it-02.fcfg` fa lo stesso per l'italiano (accordo, clitici, ordine). In NLTK:
`nltk.sem.logic`, beta-riduzione automatica, `Mace`/`Prover9` per modelli e inferenza.
Dettagli ed esercizi in `deepdive_lambda_fol.md`.

## 3. Rappresentazione neo-davidsoniana (domanda d'esame)

Davidson: gli eventi sono individui (`e`). Neo-Davidson (Parsons): i ruoli sono predicati binari.

```
Classica:  dare(Maria, Libro, Giovanni)
Davidson:  exists e. dare(e, Maria, Libro, Giovanni)
Neo-Dav.:  exists e. dare(e) & Agente(e, Maria) & Tema(e, Libro) & Destinatario(e, Giovanni)
```

Vantaggi: ariet' variabile (aggiungere un ruolo = congiungere un predicato, es. *ieri* ->
`Tempo(e, ieri)`), inferenza per congiunzione, mappatura diretta su ruoli semantici
(SRL, PropBank/FrameNet) e su slot dei dialogue frame (§5).

## 4. Altre rappresentazioni

- **FOL pura**: precisa ma rigida (quantificatori, portata).
- **DRT / DRS**: anafore e presupposizioni inter-frasali.
- **AMR**: grafi astratti verbo-centrici, standard di valutazione (Smatch).
- **Embedding/LLM**: significato distribuzionale, niente garanzia logica (cfr. Parte 3).

## 5. Sistemi di dialogo (lez. 07)

### 5.1 I 6 fenomeni notevoli del dialogo tra umani (domanda d'esame)

1. **Turn-taking**: alternanza dei turni con segnali di passaggio.
2. **Grounding / common ground**: costruzione incrementale di credenze condivise (conferme, ack).
3. **Atti linguistici**: ogni turno *fa* qualcosa (chiedere, informare, promettere — Searle/Austin).
4. **Iniziativa mista**: chi guida cambia (sistema vs utente).
5. **Riferimenti ed ellissi**: *lo voglio* / *e domani?* richiedono memoria del dialogo.
6. **Riparazioni**: auto-correzioni, chiarimenti (*intendevo...*), gestione errori ASR/NLU.

### 5.2 Frame-Based Semantics nei DS (domanda d'esame)

Ogni intento e' un **frame** con **slot** da riempire (es. prenotazione: data, ora, persone).
Il Dialogue Manager interroga per riempire gli slot (iniziativa del sistema), propone
ipotesi vere/false, tiene il common ground e applica backup strategy + memoria.
Nel progetto 3.B: ogni *pozione* e' un frame, gli *ingredienti* sono gli slot.

### 5.3 Architettura classica (pipeline)

```
ASR -> NLU (intent+slot) -> DM (stato, policy) -> NLG (template/parafrasi LLM) -> TTS
```

- **NLU**: intent detection + slot filling (oggi: BERT/token classifier).
- **DM**: state tracking + policy (frame, POMDP, o LLM-prompt).
- **NLG**: template statici (controllabili) o parafrasi LLM (vari ma rischiosi).
- **Valutazione**: task success, numero di turni, soddisfazione; nel progetto 3.D: 3 dialoghi
  analizzati (errori comuni, fenomeni gestiti).

### 5.4 Aggregation (domanda d'esame)

Task della **generazione**: combinare piu' atti/proposizioni in una frase fluida
(*Il volo e' alle 8. Il volo costa 50 euro* -> *Il volo delle 8 costa 50 euro*):
pianificazione del documento, aggregazione, lessicalizzazione, realizzazione.

### 5.5 Bonus ASR/TTS (progetto 3.E)

Con speech cambiano gli errori: WER dell'ASR, rumore, barge-in, prosodia del TTS che
disambigua (o crea) atti. Strategia: conferme esplicite/implicite a seconda del costo dell'errore.

## 6. Collegamenti con l'esame

- Domande dirette: lambda-FoL; neo-davidsoniana; ambigue semantica; frame-based; 6 fenomeni;
  aggregation.
- Progetto 3 (Padawan) = §5 applicato: NLU con dipendenze (3.A), DM frame-based (3.B),
  generazione template/LLM (3.C), valutazione su 3 dialoghi (3.D), bonus speech (3.E).

---

*Fonti slide (pdftotext): lezione-05 ~1085 righe (composizionalita', lambda, Davidson, AMR);
lezione-07 ~1228 righe (fenomeni, frame, pipeline, aggregation, valutazione).*
