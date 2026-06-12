---
date: "\\[2022-09-19 Mon 10:14\\]"
id: d9ec0783-4ae7-4c9f-92b0-fe3c8fb09332
roam_aliases: "\"Tecniche e Architetture Avanzate per lo Sviluppo del Software\""
title: TAAS
---

# Informazioni Corso

- Giovanna Petrone
- Laboratorio
  - partecipazione obbligatoria
  - a gruppi
  - simili a corsi di management nelle aziende
  - indicazioni sul backend (Spring), frontend a libero sviluppo
- Obiettivi
  - **Extreme Programming** / **SCRUM**
  - imparare a gestire un progetto
    - identificare l'ambito per poter gestire correttamente lo sviluppo
    - *off the shelf*
      - per ogni cliente possibile
    - *custom made*
  - *project scheduling*
  - stesura dei requisiti e sviluppo dei *task*

# Project Management

- Meeting
  - Project Meeting
  - Project Review

## Traditional Approach

- **Project Charter**
  - objectives, *no goals*
  - assunzioni, restrizioni
  - misure
- Planning
  - l'approccio cerca di anticipare i problemi
  - stabilire obiettivi concreti

# Maven

- repeatable builds
- dipendenze transitive
- gestisce l'ambiente di sviluppo e di esecuzione

Ogni progetto è identificato dal `GAV`

- groupID:artifactID:version

Per progetti di grandi dimensioni si può definire un *parent project* da cui ereditare la configurazione dall'alto.

`Maven` è opinionato riguardo la struttura del progetto.

- *target*, *src*, *…test*, etc
- `mvn install`
- `mvn clean`
- `mvn clean compile`

# JEE

Java Enterprise

- quando ci sono necessità di scalabilità
- adatta allo sviluppo di applicazioni web-based a livello di impresa
- il competitor Microsoft è `.net`

Offre funzionalità *on top of* i componenti di gestione dati e database

- servlet
- injection
- web pages
- expression language
- SOAP services
- REST services
- JSON
- validation
- persistence
- concurrency
- security
- …

## Enterprise Java Beans

`EJB` Componenti sul lato server

Implementa l'architettura 3-tier presentation/business/data

- questa architettura è basata sul design-pattern `Model View Controller`, ma in questi casi di architetture di grandi dimensioni è più corretto parlare di tier

- differenti dai Java Beans classici

- tipologie:

  - Session Beans
    - stateless/stateful
    - modellano la business logic nell'interazione tra utente e servizio
    - vivono per il tempo della connessione
  - Singleton Beans
    - implementano per quanto riguarda i middleware il pattern omonimo di [[GoF]]
    - permettono di gestire informazioni condivise in tutta l'applicazione e non legate alla sessione
  - Message Beans
    - vita breve, gestiscono messaggi
  - Entity Beans
    - modellano informazioni persistenti
    - fanno da tramite tra il programmatore e l'api di JPA/Jakarta in cui si gestisce l'interazione vera e propria con il database

# Single Page Application

Le interazioni sono gestite dal client che richiama il server solo per le richieste dati necessarie alle interazioni utente.

- niente *reload* continui o page flicker
- interazione più veloce e seamless, migliore `UX`
- il render è gestito da `JavaScript`

È una evoluzione a partire dal sito web classico, carica una singola pagina `HTML`. Sfruttano `AJAX` e `HTML5` per creare una web app fluida e responsiva.

# Docker

Moduli divisi in *container* diversi, si comunicano attraverso il network.

# Spring

# Angular

# Service Oriented Architecture

- [[SOA]]
- necessità di integrare servizi eterogenei tra loro di terze parti
- prima di questa architettura si utilizzavano software
  - sito-ed, closed, monolithic, brittle
  - una volta aggiornata una delle sezioni andavano testate e redeployed tutte quante
- dopo
  - strutturare il software attorno applicazioni composite e composed business process
  - vengono estratti i servizi riutilizzabili, *reusable business services*
  - test e redeploy sono necessari solamente per il modulo aggiornato successivamente
  - i servizi vengono poi orchestrati per il funzionamento delle applicazioni sovrastanti

**Web service wrapper** sono stati utilizzati per creare interfacce tra una lingua franca (`XML`) e applicazioni in un qualsiasi linguaggio.

Uno shift fondamentale dell'uso del web

- web human-centric
  - maggioranza delle transazioni web iniziate da un umano
- web application-centric
  - scambi inter-application
  - necessità di esporre tramite uno standard dei servizi sul web

Questi `web-service` sono

- encapsulated
- loosely coupled
- contracted software objects via standard protocols
- disponibili tramite web
- utilizzano messaggi `XML` standardizzati
- indipendenti da `OS` o linguaggio
- self describing via `XML`
- easily discoverable

Gli standard `XML` sono:

- [[SOAP]], simple object access protocol
  - più espressivo di REST, permette invocazioni di procedure
  - utilizzato per l'utilizzo tramite protocollo di servizi
    - i protocolli possono essere locali o http
  - richieste e risposte in `XML`
- [[WSDL]], web services description language
  - descrive l'interfaccia di un servizio
  - human readable
- [[UDDI]], universal description, discovery and integration
  - Microsoft/IBM
  - interrogati da applicazioni in rete
  - sostanzialmente delle pagine gialle per `SOAP`
  - provvedono contact/business information
  - binding information e `API`

Il modello di uso è

- publish
- find
- bind

Per l'utilizzo di `SOAP`

- RPC-style, sincrono
  - *remote procedure call*
- Document-style, asincrono

La differenza con [[REST]] è che con questa architettura ho la possibilità di fare programmazione distribuita, le richieste possono essere vere richieste programmatiche mentre l'alternativa si occupa più prettamente di scambio di dati.

# Representational State Transfer

- [[REST]]
- 2000, tesi di dottorato di Roy Fielding
- il tipo di contenuto che viene restituito sta al programmatore
  - spesso `JSON`, `XML`
- i siti web sono `RESTful`
  - prettamente tramite protocollo http
- non ha l'espressività di [[WSDL]]/[[SOAP]]
  - ne sono un alternativa leggera, stateless

Utilizzo dei metodi `http`

- `GET`
- `POST`
- `PUT`
- `DELETE`

# Microservice Architecture

Evoluzione della [[SOA]]. Il microservizio è una componente che offre un servizio ben definito e indipendente. La parola in particolare sottolinea che queste componenti espongono servizi ovvero `API`.

- *autonomous, independently deployable*
  - questi collaborano all'interno dell'applicazione
  - facilita anche il debugging grazie all'isolamento e permette di incapsulare librerie di terzi all'interno di microservizi ad-hoc
  - si vuole semplificare il più possibile l'uso da parte dell'utente, non forzare scelte implementative a valle
- ridurre ulteriormente le dimensioni dei servizi e renderli completamente indipendenti gli uni dagli altri
  - una architettura monolitica può funzionare per un progetto piccolo di dimensioni di *codebase* sia per team
- `db` diversi per ogni microservizio
  - questo porta anche degli svantaggi e difficoltà per quanto riguarda la consistenza
- il *load balancer* diventa parte dell'architettura stessa, da subito posto l'accento sulla scalabilità
- [[SOA]] tradizionalmente risultava in servizi monolitici, per mancanza di comprensione della dimensione ideale di un servizio
- la indipendenza e la dimensione ridotta dei servizi permette più facilmente la gestione da parte di un team e facilità la collaborazione tramite le `API`
- *deployment* individuale, rischio più basso minor downtime e update frequenti
  - quindi va automatizzato il processo di *deployment*
- scalabilità dei singoli microservizi individualmente

Per rinforzare l'indipendenza tra servizi:

- messaggi asincroni, `MOM`
- RabbitMQ
- l'architettura più pura prevede che i microservizio comunichino tra loro tramite messaggi asincroni su bus

Scelte:

- `API` Gateway
- Message Bus, event driven tramite messaggi asincroni

Registrazione servizi `Eureka` per discoverability.

- pubblicazione dei singoli servizi

Il problema di avere `db` divisi è la duplicazione dei dati e quindi la *consistenza*. I microservizi possono essere in 3 stadi/ambienti

- `development` → `staging` → `production`

# Distributed Monoliths

- singolo `db` condiviso
- servizi divisi ma che vanno rilasciati insieme e hanno forti interdipendenze

# Pattern

- Saga Flow
  - per garantire `ACID` e consistency in operazioni che coinvolgono multipli servizi
  - per quando non è possibile/conveniente utilizzare `2PC`
  - ogni servizio esegue una transazione con il database che deve essere atomica e passa a catena il compito di continuare l'operazione al prossimo partecipante
  - qualsiasi partecipante può annullare tutte le transazioni in caso di fallimento con un messaggio asincrono che risalga la catena
