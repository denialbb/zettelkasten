# Deep Dive: sistemi di dialogo (frame, policy, valutazione)

> Companion di `notes.md` (§5). Fonte: `lezione-07-DS-TLN-INFO-2526.pdf`.

## 1. Architettura e flusso

```
utente --voce--> [ASR] --testo--> [NLU: intent+slot] --frame--> [DM: track+policy]
      <--voce-- [TTS] <--testo-- [NLG: template/LLM] <--atto--+
```

Stato del DM: slot riempiti, ultimo atto, cronologia entita', belief (se POMDP).

## 2. Frame in pratica (schema Padawan)

```yaml
frame: pozione
slots:
  nome_pozione: {riempito: false}
  ingrediente_1..3: {riempito: false, confermato: false}
  giudizio_finale: {valore: null}  # adatto | non_adatto + commento sagace
policy:
  - se slot vuoto: chiedi con proposta (vera o falsa a turno)
  - se NLU bassa confidenza: conferma esplicita
  - se 2 fallimenti: backup (ripeti, semplifica, esci con giudizio parziale)
  - alla fine: template di giudizio + commento
```

## 3. Aggregation: esempio

Atti: `inform(volo, ora=8)`, `inform(volo, prezzo=50)` ->
pianificazione (stesso topic) -> aggregazione (soggetto condiviso) ->
*Il volo delle 8 costa 50 euro*. Senza aggregation: due frasi piatte e robotiche.

## 4. Valutazione (progetto 3.D)

Per ognuno dei 3 dialoghi: trascrizione, tabella slot (richiesti/riempiti/corretti),
errori (NLU, policy, NLG), fenomeni gestiti (ellissi, riparazioni, initiative shift).
Metriche: task success (pozione completata?), turni medi, conferme sprecate.

## 5. Speech (3.E)

WER alto -> piu' conferme; barge-in -> gestione interruzioni; TTS piatto -> atti ambigui.
Regola: il costo dell'errore decide l'esplicitezza della conferma.

---
*Related:* `notes.md`, `flashcards.md`. *Libri:* JM cap. dialogo/conversazione.
