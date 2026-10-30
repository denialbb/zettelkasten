# Deep dive: ciclo recognize-act, Rete e rifrazione

> Companion di `notes.md` sez. 3–6. Fonti: `05_Sistemi_Esperti.pdf`;
> `bpg.pdf`.

## 1. Il ciclo in dettaglio

```
WM: {fatti} ──match──> agenda: {attivazioni} ──select──> una attivazione
  ──act (RHS)──> WM aggiornata ──match──> ...
```

Ogni `assert`/`retract`/`modify` nella RHS invalida solo le attivazioni che
dipendono dai fatti toccati (grazie a Rete), non tutta l'agenda. Il ciclo
termina quando l'agenda e' vuota o `(halt)` e' eseguito.

## 2. Rete in una pagina

La rete ha due tipi di nodi:

- **alfa**: test su un singolo pattern (es. `(persona (occhi blu))` passa
  solo i fatti persona con occhi blu); ogni tipo di fatto ha la sua catena;
- **beta**: join tra due flussi (es. persona `?p` + genitore di `?p`);
  memorizzano i match parziali (*left/right memory*).

Diagramma descritto: fatti in alto che scendono per canali alfa, si
combinano nei nodi beta a due ingressi, in basso escono i token completi
(attivazioni). Aggiungere un fatto = un token che percorre solo i rami
interessati: costo proporzionale alla variazione, non alla base intera.

## 3. Rifrazione e loop: l'esempio occhi blu

```clips
(defrule stampa-occhi-blu
  (persona (nome ?n) (occhi blu))
  => (printout t ?n " ha gli occhi blu" crlf))
```

Con fatti `(persona (nome mario) (occhi blu))`: l'attivazione scatta una
volta. Senza rifrazione, poiche' la RHS non rimuove il fatto, la regola
resterebbe attivata e ristamperebbe all'infinito. La rifrazione ricorda le
coppie (regola, tupla di fatti) gia' eseguite. Per farla riscattare serve
cambiare la tupla (retract + re-assert) o usare `refresh`.

## 4. Controllo: strategie e salience

Ordine di scelta consigliato: prima moduli e struttura delle regole, poi
strategia globale, solo alla fine salience chirurgiche. Una salience alta
su una regola "raccogli-oro" del Wumpus e' accettabile (priorita' di
sicurezza); salience ovunque = programma procedurale travestito.

*Vedi anche:* `deepdive_moduli_agente.md`, `deepdive_cf_mycin.md`.
