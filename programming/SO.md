---
id: c1d9dd6d-add6-416a-887c-ee2505edf12d
title: SO
---

Mail Prof: `daniele.radicioni@unito.it` <u>12 Crediti</u>

Informazioni corso

- Scritto
- Orale facoltativo - per la Lode
- [[Sistemi Operativi]]

# [[Unix]]

- The Linux Programming Interface

## Introduzione

### Anni '60

### 2 Kernel Originari

1. AT&T

2. BSD

### Richard Stallman lancia lo GNU Project `1983`

Free as in Freedom, il punto non e' sulla gratuita'

- E' ispezionabile

### Per un uso didattico basta un sistema discendente da System5

### Linus Torvalds, inizia a lavorare su Linux - Unix-like `1991`

Progressive Licensing ~ software distribuibile gratuitamente

1. Linux e' il kernel

### OS

strato che mette in comunicazione utente e hardware

1. Kernel

    strato più basso

    - composto di funzioni autonome
      - non utilizzate direttamente dall'utente

    1. Permette l'accesso all'hardware

    2. Device

    3. Processi

        Sono programmi in esecuzione

        1. un kernel facilita la creazione e la gestione dei processi

        2. Fork

            System call

            - crea una seconda linea di computazione

            1. creazione di processi

                Processi possono creare altri processi

                1. Genitori

                2. Figli

            2. biforcazione della linea di computazione

        3. Comunicazione tra Processi

            per permetterne la collaborazione

    4. Gestione della Memoria

        1. Virtualizzazione della Memoria

            spostamento parti di processi in Memoria Secondaria

            - poi ripresa attraverso `paging`

            1. Swap

                spostamento di interi processi nella memoria secondaria

    5. Operazioni sul Filesystem

    6. Un kernel e' construito per un hardware specifico

2. Shell

    1. interprete di comandi

    2. permette l'interazione utente - sistema

    3. oggetto utilizzato per l'amministrazione della macchina

        \$ cat /etc/shells

        \$ tar cvzf foo.tgz cps100 \$ tar xvzf foo.tgz

3. Filesystem

    Visione astratta che visualizza il contenuto della memoria secondaria della macchina

    - e' un albero
      - bin/ applicazioni condivise
      - etc/ configurazione
      - home/ directories degli utenti
      - lib/ librerie necessarie agli utenti
      - opt/ third party software
      - tmp/ spazio temporaneo
      - usr/ spazio programmi degli utenti

    1. permette all'utente di

        1. visualizzare

        2. organizzare

        3. interagire le directories della macchina

4. Applicazioni

    comandi, parti

    1. Comandi

        - comando
        - argomenti
        - flag con o senza dash che li preceda

        1. tar

        2. man

            \>man 1 command

            - Possibile specificare la sezione con numero

        3. grep

            global regular expression print

            - cerca pattern

        4. tail

        5. head

        6. less

        7. more

        8. mv

        9. rm

        10. cp

        11. Metacharacter

            wildcards

            - ? qualsiasi carattere 1 volta
            -
            - [ ] match tra uno dei caratteri specificati

        12. Input Output Redirection

            redirigere l'output \$ ls \> out.org sovrascrive \$ ls \>\> out.org preserva il contenuto precedente

            cambiare l'input \$ sort \< terms \> terms-alpha sort prende terms e scrive in terms-alpha

        13. Pipes

            Operatore che combina input e output redirection

            - l'output di un programma viene utilizzato come input ad un altro programma

            \> echo \$SHELL

5. Filosofia

    1. Semplicita'

        ciascun componente deve essere breve

    2. Focus

        fare una cosa bene

        - piu' semplice da mantenere

    3. Componenti Riutilizzabili

    4. Filtri

        strumenti che trasformano l'input in un output

    5. File in formati aperti

        UTF8 ~ UTF16

    6. Flessibilita'

        Evitare limiti arbitrari

6. Account

    Privilegi dei vari account

    1. root

        completo controllo

        - puo' distruggere il sistema
        - e' dato per scontato che si abbia conoscenza dei pericoli

    2. system

    3. utente

        - nomi
          - si usavano al piu' di 8 caratteri
        - poco accesso

    4. Gruppi

        ogni file ha permessi per:

        - owner
        - gruppo
        - altri

        Consentono il controllo di accessi su parti diverse della macchina in una macchina condivisa

    5. Permessi

        il superutente o il proprietario di una risorsa puo' cambiarne la proprieta'

        \> chown jane *home/bin* \> ls -l //formato long -rwxrwx—

        - la sequenza e':
          - in prima posizione indica il tipo di file
            - directory
            - fifo
          - poi si susseguono 3 blocchi da 3
            - permessi utente
            - permessi gruppo
            - permessi altri

        Cambio Permessi \> chmod o+wr myfile //symbolic mode aggiunge write e execute permission a others \> chmod 754 myfile //absolute mode

        - absolute
          - ogni numero indica il valore in binario dei permessi di ogni gruppo(owner\|group\|others)

        1. Tipi di permessi

            1. r

            2. w

            3. e

        2. utenti

            1. u

            2. g

            3. o

## Integrazione C

## Controllo dei processi

## Segnali

## Pipe e Fifo

## Code di messaggi

## Memoria Condivisa

## Semafori

## Bash

# [[C]]

# Esercitazioni

La sua discussione permette l'accesso allo Scritto (5 scritti all'anno)

- almeno 10 giorni di anticipo per la consegna, inviato ai professori dei turni corrispondenti ai partecipanti
- preferibilmente fuori dalla finestra esami

Progetto Individuale o di Gruppo (max 3)

Una volta completato chiedere con mail al professore del corso di Teoria di poter sostenere l'esame scritto, eventualmente l'orale

## Novembre

## Sorgenti

## Breve Relazione

Nome Cognome - Matricola - Mail
