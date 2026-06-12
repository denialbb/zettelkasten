---
id: 2f83c44e-774c-41d2-abe6-a13e3276e3f0
title: Unix
---

# C

## Bitwise Operators

## Puntatori

### Array di Puntatori

- Si utilizzano per efficienza
  - per ordinare strutture dati é piú conveniente spostare puntatori che dati
- Si trovano per esempio anche nel main(int argc, char \*argv\[\]) ^

### Indirezione Multipla

``` c
int i = 1;
int *ip1 = &i;
int **ipp = &ip1; // puntatore doppio
```

Il primo $`\star`$ indica un livello di indirezione, un numero maggiore di $`\star`$ aumentano i livelli di indirezione

### Puntatori a funzioni

``` c
int (*func)(int a, int b){...}
(*func)(a,b);
```

## Preprocessore

\#…

- Hanno effetto da un certo punto in poi
- Sono interpretate e riscritte prima che il codice arrivi al compilatore

Il suo output puó essere visualizzato con il flag -E di gcc

### include

### define

La macro non comporta una allocazione di record di attivazione e non prevede context switch, ha meno overhead ed é piú efficiente

- macro predefinite
  - <u><u>TIME</u></u>
  - <u><u>DATE</u></u>
  - <u><u>FILE</u></u>
  - <u><u>LINE</u></u>

## make

Constringe a considerare le dipendenze

- si avvale della marcatura temporale dei file
  - in questo modo decide se ricompilare

Il <u>makefile</u> é costituito da

- riga di dipendenza
- riga d'azione

Esiste un target speciale: clean:

- utilizzato per rimuovere tutti i file oggetto
- rm -f \*.o

## Environment List

Le variabili sono passate da processo padre a processo figlio Le variabili d'ambiente sono impostate in un array di stringhe

- accoppiate per nome\|valore

In C ci si puó accedere utilizzando la variabile globale

``` c
extern char **environ;
```

## PID

### System Call

- pid<sub>t</sub> getpid(void)
  - non fallisce mai
- pid<sub>t</sub> getppid(void)
  - restituisce parent pid

## Memory Layout

- segmenti
  - text segments
    - read-only
    - sharable
  - initialized data segment
    - globali
    - statiche
      - variabili inizializzate esplicitamente dal programma
  - uninitialized data segmemt
    - prima di eseguire il programma il Sistema inizializza a 0
  - stack
    - cresce e diminuisce dinamicamente
    - variabili locali (o automatiche)
    - argomenti
    - return value
  - heap
    - area di memoria allocata a runtime
      - malloc
      - calloc

## Process Control

### syscall di Crezione, Esecuzione, Terminazione di processi

- `fork`
  - crea una copia quasi identica del genitore
    - almeno PID diverso
    - copia di
      - stack

      - heap

      - dati

      - text segment

        ``` c
        pid_t fork(void);
        ```

    Il figlio riprende l'esecuzione a partire dalla prima istruzione successiva alla fork che lo ha creato
    - la fork restituisce
      - 0 al figlio

      - PID del figlio al genitore se avviene con successo

        ``` c
        pid_t procID;
        procID = fork();
        if(procID == -1) exit(1);
        if(procID){
            // padre
        }else{ // if(procID == 0)
            // figlio
        }
        ```

        ``` c
        switch (procID = fork()){
        case -1:
            exit(1);
        case 0:
            // figlio
        case default:
            // padre
        }
        // qua eseguono entrambi
        ```

    Il figlio riceva una copia dei riferimenti ai descrittori dei file
    - se il genitore apre un file prima della fork le modifiche saranno condivise tra i due
- `exit`
  - libera le risorse utilizzate dal processo
    - in modo che il kernel possa allocarle
    - status
      - intero che descrive lo stato di terminazione del processo

    I Processi possono terminare in due modi
    - in maniera anomala
      - segfault per esempio
      - con una <sub>exit</sub>()
        - incapsulato all'interno della syscall exit
          - effettua
            - exit handlers
            - stdio stream buffer flushed
            - <sub>exit</sub>() viene invocata utilizzando lo status
- `wait`
  - sospende il chiamante di sospendere l'esecuzione fino alla terminazione di un figlio
  - status
    - alla terminazione del figlio qui sara' riportato l'exit status del figlio
  - error handling
    - ritorna -1
    - errno = ECHILD ***se diverso da questo é un errore inatteso***
      - in caso chiamante non abbia figli
- `waitpid`
  - permette di scegliere il figlio da aspettare
  - permette una nonblocking wait
    - non si blocca in caso di nessuna terminazione
  - parametri
    - pid
      - \>0 aspetta specifico figlio
      - == 0 attende un processo dello stesso gruppo del chiamante
      - == -1 attende un figlio qualsiasi
    - status
      - figlio ha terminato
        - con una exit
        - con un segnale non gestito
        - e' stato bloccato da un segnale e waitpid era chiamata con WUNTRACED
      - \<sys/wait.h\>
        - WIFEXITED(status)
        - WIFSIGNALED(status)
        - WIFSTOPPED(status)
        - WIFCONTINUED(status)
    - options
      - maschera di bit
      - WUNTRACED
      - WCONTINUED
      - WNOHANG
        - se nessun figlio specificato ha cambiato stato restituisci immediatamente
- `execve`
  - carica un nuovo programma nella memoria del processo chiamante, sovrascrivendolo
    - i descrittori di file aperti rimangono aperti nel nuovo programma
  - e' cancellato il text segment del precedente processo
    - sono poi ricreati heap e dati
  - esistono funzioni di libreria
    - interfaccie alla execve
  - parametri
    - pathname
    - argv\[\]
      - lista di puntatori a stringa
      - termina con puntatore a NULL
    - envp\[\]
      - environment pointer
      - coppie nome-valore
  - ritorno
    - non ne ha se ha successo
    - -1 per errore
      - EACCES
      - ENOENT
      - ENOEXEC
      - TXTBSY
      - E2BIG
- `system`
  - crea un processo figlio per eseguire
  - restituisce lo stato di terminazione dell'ultimo comando eseguito
  - é inefficente

### orphans and zombies

in generale un padre sopravvive al figlio

- in caso di orfano il padre diventa il processo <u>init</u>
- per garantire una wait dalla parte del padre per conoscere lo status del figlio
  - il kernel permette di trasformare il figlio in zombie

1.  zombies

    Non possono essere uccisi da un segnale

    - rimangono nella tabella dei processi
      - se si verificano zombie potrebbe riempirsi la tabella

    Idealmente si devono evitare processi zombie

## Signals

### Cause dei Segnali

1.  Eccezione Hardware
    - istruzioni linguaggio macchina malformate
    - divisioni per 0
    - riferimenti a parti di memoria inaccessibili
2.  Caratteri speciali su terminale
    - interrupt
      - <sup>c</sup>
    - suspend
      - <sup>z</sup>
      - stop the current job (so you can put it in the background)
    - quit
      - ^\\
      - terminates current job; makes a core file
3.  Eventi Software
    - input ora disponibile su un descrittore di file
    - timer é arrivato a 0
    - quanto di tempo esaurito
    - figlio del processo é terminato

### Symbolic Names and Numbers

Segnali definiti con `interi unici` contenuti in nomi simbolici

- in \<signal.h\> o \<sys/signal.h\>
- della forma SIGxxxx
  - utilizzabili piú facilmente in quanto le implementazioni variano nei numeri assegnati ad ogni segnale

``` c
for (i=0; i<NSIG; i++) {
    printf("Signal #%2d: %s\n", i, strsignal(i));
}
```

### Lifecycle

Un segnale:

- <u>generato</u> da qualche evento
- <u>delivered</u> ad un processo
  - questo esegue qualche azione in risposta al segnale

Nel periodo di tempo intercorrente tra la generazione e l'invio al processo il segnale é <u>pending</u>

- viene inviato
  - appena il processo é scelto per l'esecuzione
  - immediatamente se il processo é in esecuzione
    - nel caso il processo invii un segnale a se stesso

<u>blocking</u> A volte si deve assicurare che un blocco di codice non sia interrotto dalla consegna di un segnale

- aggiungere segnale alla <u>maschera dei segnali</u>
  - insieme dei segnali la cui risezione é attualmente bloccata
- il segnale rimane <u>pending</u> fino a che non é sboccato e rimosso dalla maschera

<u>delivery & actions</u> Di default

1.  Il segnale é ignorato
2.  Il processo é terminato <u>killed</u>
    - abnormal process termination
      - opposta alla exit()
3.  Viene generato <u>core dump file</u>
    - virtual memory image
      - utilizzata per ispezionare lo stato del processo al momento della terminazione
4.  Processo é bloccato <u>stopped</u>
5.  Esecuzione riprende <u>resumed</u>

### in Unix

1.  trap

    Segnali generati da eventi prodotti da un processo e inviati al processo stesso

    - comportamenti errati possono generare trap
      - divisioni per zero <u>SIGFPE</u>
      - indirizzamento errato di array <u>SIGEGV</u>
      - negato l'accesso a instruzioni privilegiate <u>SIGILL</u>

2.  interrupt

    Segnali inviati ad un processo da un agente esterno (utente o altro processo)

    - User
      - <sup>c</sup> <u>SIGINT</u>
      - <sup>z</sup> <u>SIGSTOP</u>
      - kill -s SIGNAL PID
    - Altro processo
      - kill(PID,SIGNAL)

3.  disposition

    Impostazione della disposizione del segnale: sovrascrivere la disposizione (risposta) di default

    - default
    - ignore
    - exec signal hadler
      - funzione che esegue le azioni appropriate in riposta alla ricezione di un segnale
      - il segnale in questo caso é gestito <u>handled</u> o intercettato <u>caught</u>

    1.  signal() & sigaction()

4.  Segnali

    1.  SIGABRT

    2.  SIGALRM

    3.  SIGCHLD

    4.  SIGCONT

    5.  SIGINT

        Il terminale invia questo segnale al gruppo del processo in foreground

    6.  SIGKILL

        Non puó essere bloccato, ignorato, intercettato da un hander

        - termina sempre un processo

    7.  SIGPIPE

        Inviato quando un processo tempa di scrivere su un pipe o FIFO il quale non ha un corrispondente lettore

    8.  SIGSEGV

        O Segmentation Violation Processo tenta un riferimento in memoria non valido

        - la pagina non esiste
        - tentata modifica a locazione read-only
        - tentato accesso alla memoria del kernel

        Spesso a causa di un puntatore che contiene un <u>bad address</u>

## Facilities

### System V IPC

1.  syscall

    - msgget()
    - semget()
    - shmget()

2.  message queues

    I messaggi possono essere pescati per tipo oltre che ordine

3.  shared memory

    Uno degli strumenti di IPC piú veloci

4.  semaphores

    set di semafori

### Sincronizzazione

1.  Semafori

    - blocking
    - non-blocking

    Aumento del semaforo :: reso disponibile Decremento del semaforo :: accesso all'area critica

    1.  Syscall

        ``` c
        #include <sys/types.h>
        #include <sys/sem.h>
        int semget(key_t key, int nsems, int semflg);
            // returns semaphore set identifier on success , -1 on error
            // semflg: IPC_CREAT, IPC_EXCL
        int semclt(int semid, int semnum, int cmd, ... /* union semun arg */);
            // semun utilizzabile per l'argomento
            // IPC_RMID
            // IPC_STAT
            // IPC_SET
            // GETVAL
            // SETVAL
            // GETALL
            // SETALL
            // GETPID
            // GETNCNT
            // GETZCNT
        int semop(int semid, struct sembuf *sops, unsigned int nsops);
            // sembuf codifies the operations to do
            // nops is the dimension of sops
        struct semid_ds {
            struct ipc_perm sem_perm;
            time_t sem_otime; // timestamp of last semop (0 when created)
            time_t sem_ctime;
            unsigned short
        }

        struct sembuf {
            unsigned short sem_num;
            short sem_op;
            // group of operations are atomic and executed in their order
            // either they are all executed at once or not
            short sem_flg;
            // IPC_NOWAIT == non-blocking
        }
        ```

        Una semop bloccata fino a che:

        - un processo sblocca il semaforo
        - viene interrotto da un segnale di Interrupt
          - EINTR

    2.  binary semaphores

        1: Free, 0: Reserved

        - Reserve
        - Wait

        ``` c
        int initSem();
        int reserveSem(int semID, int semNum);
        int releaseSem(int semId, int semNum);
        ```

### Communication Facilities

1.  Distruttivitá

    I dati sono consumati con la lettura

2.  Data transfer

    1.  byte stream

        Si scrivono/leggono numeri arbitrari di byte

        1.  Pipes

            Permettono l'utilizzo dell'output di un processo come input di un altro processo Il suo funzionamento é implementato utilizzando

            - fork()
            - exec()

            Il pipe ha un <u>verso</u>

            - write end
            - read end

            I processi semplicemente scrivono su fd1 e leggono da fd0

            - Essendo flussi non c'é la nozione di dimensione del messaggio
            - La lettura é sequenziale secondo l'ordine di scrittura

            Il pipe é semplicemente un `buffer`, ha una capacitá massima

            - quando é pieno la scrittura viene bloccata finche non sará effettuata una lettura
            - generalmente non é necessario conoscere la capacitá della pipe
            - una dimensione maggiore porterá a meno context switch

            1.  Protocol

                - carattere delimitatore
                  - si sceglie un carattere che non sará utilizzato nei messaggi
                - header / body
                  - intestazione con lunghezza del messaggio seguente
                - messaggi a dimensione fissa a $`n`$ byte

            2.  Syscal

                ``` c
                int pipe(int filedes[2]);
                // ritorna 0 on success, -1 on error
                filedes[0]; // lettura
                filedes[1]; // scrittura
                ```

            3.  Chiusura fd

                Se il lettore non chiude il write-end alla chiusura dalla parte dello scrittore non verrá scritto EOF alla fine dello stream Quando uno scrittore scrive su una pipe senza lettori questo riceve SIGPIPE

                - che puó essere gestito

                Un pipe chiamato prima di una fork puó mettere in comunicazione processi imparentati

        2.  FIFO

            Sono dotati di un nome a differenza di un pipe

            - possono essere utilizzati per comunicazione tra processi non imparentati
              - architettura client-server

            Come pipe

            - write-end read-end

            1.  Syscall

                ``` c
                int mkfifo(const char *pathname, mode_t mode);
                // returns  on success, -1 on error
                ```

            2.  Sincronizzazione

                Possibile creare una fork nella pipeline utilizzando il comando `tee`

                - duplicato dell'outut viene inviato ad un terzo processo <u>oltre</u> che il suo successore nella pipeline

    2.  message

        Si scrivono/leggono messaggi interi

        - ogni read legge 1 solo messaggio

        1.  message queue

### Shared Memory

- meccanismo estremamente veloce
  - non é mediato dal kernel
- va sicronizzato, tipicamente con i semafori
  - evitare accessi simultanei
  - evitare letture concorrenti a scritture

A differenza del data transfer `non é distruttiva`

Di norma ogni processo ha uno spazio di indirizzamento logico indipendente/separato dagli altri processi

- la memoria condivisa é fisicamente condivisa tra i processi

I figli ereditano i segmenti di SM a disposizione del genitore

- durante una exec() i segmenti sono staccati <u>detached</u>
  - NB: non distrutti
  - sono staccati anche al momento della terminazione dei processi

1.  lifecycle

    - shmget()
      - creazione
      - ottenere l'id di un segmento giá esistentsetxkbmap -option ctrl:swapcapse
    - shmat()
      - attach
    - shmdt()
      - detach
        - avviene automaticamente alla terminazione del processo
    - shmctl()
      - cancellare (IPC<sub>RMID</sub>)
        - solo un processo la esegue
      - un segmento sará effettivamente distrutto solo dopo che tutti i processi correntemente attaccati lo avranno staccato

2.  syscalls

    ``` c
    int shmget(key_t key, size_t size, int shmflg);
    // funzionamento analogo alla malloc ma accessibile
    // a piú processi
    int shmat(int shmid, const void *shmaddr, int shmflg);
    // se il secondo parametro é NULL il kernel si
    // occupa di trovare una zona di memoria adatta
    // RETURN VALUE: indirizzo base del segmentop
    int shmdt(const void *shmaddr);
    int shmctl(int shmid, int cmd, struct shmid_ds *buf);
    ```
