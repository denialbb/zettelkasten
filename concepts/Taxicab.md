---
id: 0454350f-2cfc-429d-a371-e44564c99d0b
title: Taxicab
---

- [Documento di Presentazione del Progetto](file:///home/dan/Documents/UNI/II/SO/PROGETTO.pdf)

  - Opzioni di compilazione
    - gcc -std=c89 -pedantic
  - utilizzo di make

- [Overview](home/dan/Documents/UNI/II/SO/taxicab-overview.pdf)

# Struttura della Simulazione

## Master

[File](file:///home/dan/Code/C/Taxicab/master.c)

- raccoglie stats
- ogni secondo stampa lo stato di occupazione delle celle
- alla fine stampa
  - n viaggi
    - success
    - unserved
    - aborted
  - mappa
    - sorgenti
    - holes
    - top cells
      - piú attraversate
  - processo taxi
    - maggior strada percorsa
    - viaggio piú lungo
    - servito il maggior numero di richieste

### Generator

[File](file:///home/dan/Code/C/Taxicab/generator.c)

1.  Gestisce Configurazione
2.  Genera Mappa
    - una matrice di struct `cell`
    - (x,y)
    - type - char
      - SOURCE
      - HOLE
      - FREE
    - capacity - int
      - SO<sub>CAPMIN</sub> \<= capacity \<= SO<sub>CAPMAX</sub>
    - traffic
      - \<= capacity
    - n<sub>visite</sub> - int
      - incrementato da ogni taxi di passaggio
3.  Genera SO<sub>TAXI</sub> processi figli
    - execv taxi.c
      - indica uno spawn casuale
        - non HOLE
        - una cella che non abbia ecceduto la sua CAPACITY
4.  Predispone Msg Queue
    - `msg`
      - destinazione (x,y)
    - dimensione
5.  Genera Richieste
6.  Inserisce Richieste
7.  Una volta passato SO<sub>DURATION</sub>
    - termina tutti i processi
    - SIGINT a master
      - che stampa le statistiche prima di terminare

### Taxi(s)

[File](file:///home/dan/Code/C/Taxicab/taxi.c)

1.  Si sposta nella Source libera piú vicina
    - una volta scelta aumenta subito il suo Traffic
      - in modo che i taxi non si rubino il posto a vicenda
    - se non ne trova si sposta di una cella verso la piú vicina source e riprova

## Config

[File](file:///home/dan/Code/C/Taxicab/taxicab.conf)

- SO<sub>TAXI</sub>
  - n taxi
- SO<sub>SOURCE</sub>
  - n sources
- SO<sub>HOLES</sub>
  - n holes
- SO<sub>CAPMIN</sub>
- SO<sub>CAPMAX</sub>
  - Capacitá MIN e MAX di ogni cella
    - ogni cella ha capacitá casuale
- SO<sub>TIMENSECMIN</sub>
- SO<sub>TIMENSECMAX</sub>
  - MIN e MAX tempo di attraversamento di ogni cella
- SO<sub>TIMEOUT</sub>
  - ogni processo taxi si chiude dopo questo tempo di inattivitá
- SO<sub>DURATION</sub>
  - dopo questo tempo il processo Generator invia SIGINT ai figli
- SO<sub>WIDTH</sub>
  - X
- SO<sub>HEIGHT</sub>
  - Y
