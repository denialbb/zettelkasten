# Deep Dive: rappresentazione neo-davidsoniana e ruoli

> Companion di `notes.md` (§3). Fonte: `lezione-05-Semantics-TLN-INFO-2526.pdf`.

## 1. Le tre forme a confronto

Frase: *Maria diede un libro a Giovanni ieri.*

```
FOL:      dare(Maria, Libro1, Giovanni) & ieri(...)         # ariet' fissa, ieri scomodo
Davidson: exists e. dare(e, Maria, Libro1, Giovanni) & ieri(e)
Neo-Dav.: exists e. dare(e) & Ag(e,Maria) & Tema(e,Libro1)
                   & Dest(e,Giovanni) & Tempo(e,ieri)
```

## 2. Perche' vince il neo-Davidson

- **Aggiunta monotona**: ogni modificatore e' una congiunzione in piu'; niente ristruttura.
- **Inferenza locale**: da `Ag(e,Maria)` segue `exists e. Ag(e,Maria)` (Maria ha agito) senza
  sapere il resto.
- **Mappatura su SRL**: PropBank Arg0~=Agente, Arg1~=Tema; FrameNet frame `Giving` con
  Donor/Recipient/Theme: il parser SRL produce quasi direttamente questa forma.
- **Ponte al dialogo**: gli slot del frame sono ruoli da istanziare (`Tema(pozione, ?x)` ->
  domanda *quale ingrediente?*).

## 3. Diagramma (descritto)

Nodo evento `e:dare` al centro; archi etichettati Ag/Tema/Dest/Tempo verso Maria, Libro1,
Giovanni, ieri. Aggiungere *a casa* = un arco in piu', mai una riscrittura.

## 4. Limiti

Quantificatori annidati, negazione con portata, plurali collettivi/distributivi restano duri
(*tutti i ragazzi hanno sollevato un tavolo*: lettura collettiva vs distributiva). Servono
estensioni (DRT, mereologia) o rappresentazioni a grafi (AMR).

---
*Related:* `notes.md`, `flashcards.md`, `deepdive_lambda_fol.md`, `deepdive_dialogue_systems.md`.
