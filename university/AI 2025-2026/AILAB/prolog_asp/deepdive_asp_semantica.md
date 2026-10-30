# Deep dive: semantica ASP — reduct, modelli stabili, generate-and-test

> Companion di `notes.md` sez. 8. Fonti: `asp.pdf` (esempio completo);
> Dovier–Formisano cap. 10–11; manuale clingo.

## 1. Intuizione: modelli minimali con ipotesi di default

Un programma positivo descrive cosa *deve* essere vero: il suo significato
e' il minimo insieme chiuso sotto le regole. Con `not` si ragiona per
**ipotesi**: "assumo S come mondo, verifico che le regole senza `not`
rispetto a quell'assunzione ricostruiscano esattamente S". Il **reduct
di Gelfond–Lifschitz** formalizza "rispetto a quell'assunzione":

```
P^S = { a :- b1..bn | (a :- b1..bn, not c1..cm) in P, {c1..cm} ∩ S = {} }
```

(Regole con un `not c` falsificato dall'ipotesi spariscono; gli altri `not`
si cancellano.) `P^S` e' positivo: ha un unico modello minimale `M`. Se
`M = S`, l'ipotesi e' **stabile** (*stable model* / *answer set*).

## 2. Esempio svolto per intero (dalle slide)

Programma: `p :- a.  a :- not b.  b :- not a.` Universo `{a, b, p}`.

| S | P^S | M(P^S) | stabile? |
|---|---|---|---|
| {} | p:-a. a. b. | {a,b,p} | no |
| {a} | p:-a. a. (b:-not a cancellato? no: rimosso perche' a in S) | {a,p} | no |
| {b} | p:-a. b. | {b} | **si'** |
| {p} | p:-a. a. b. | {a,b,p} | no |
| {a,b} | p:-a. | {} | no |
| {b,p} | p:-a. b. | {b} | no |
| {a,p} | p:-a. a. | {a,p} | **si'** |
| {a,b,p} | p:-a. | {} | no |

Answer set: `{b}` e `{a, p}`. Leggili come due mondi alternativi: o vale `b`
(ha bloccato `a`), oppure vale `a` (ha bloccato `b`) e quindi `p`.

## 3. Programmi senza answer set

`p :- not p, d.  d.` ha modello classico `{p, d}` ma:

- `S = {d}`: reduct `p :- d. d.` → modello `{d, p} ≠ {d}`;
- `S = {p, d}`: reduct `d.` → modello `{d} ≠ {p, d}`.

La regola e' una "menzogna instabile": assumere `p` falso lo rende vero e
viceversa. I **constraint** `:- body.` eliminano mondi: sono regole che
vietano un'ipotesi invece di derivare atomi.

## 4. Pattern generate-and-test (Dovier cap. 11)

```
% generate: scegli un sottoinsieme
{ in(X) } :- nodo(X).
% test: scarta i non ammissibili
:- in(X), in(Y), arco(X, Y).   % es. insieme indipendente
```

Gli **aggregati** comprimono generate+conteggio:
`1 { ha_tipo(V,T) : tipo(T) } 1 :- variabile(V).` impone esattamente un tipo
per variabile. `#minimize`/`#maximize` di clingo scelgono i migliori (serve
al torneo Pokémon per "spareggiare maggiormente", vedi `projects/`).

## 5. Trappole d'esame

- `not` non e' `¬` classica (`-`): `not p` vale per ignoranza, `-p` per prova.
- L'ordine delle regole non conta; conta solo il contenuto logico.
- Il grounding deve essere finito: variabili sempre "sicure" (*safe*),
  legate da predicati di dominio.
- In Prolog `p :- not p.` va in loop o fallisce; in ASP semplicemente non
  produce answer set: semantiche diverse, non confrontare gli output
  letteralmente.

*Vedi anche:* `deepdive_sld.md`, `deepdive_cut.md`.
