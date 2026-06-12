---
date: "\\[2023-12-18 Mon 08:07\\]"
id: 3b856c1c-2f91-4887-8d58-ccb8779dc065
title: "Etica e Filosofia nell'Intelligenza Artificiale: definire i limiti dello sviluppo"
---

- Source: <https://www.youtube.com/live/8AGskFyzhY0?si=8XxkoSMBcKYGvJrR>
- Channel: HKN PoliTo
- Related: [[Artificial Intelligence]], [[Ethics]]

# Datapizza[^1]

- cos'è l'intelligenza?
  - capacità di creare modelli astratti di fenomeni complessi
  - capacità di adattamento
  - generalizzare esperienze singole in comportamenti generali
- [[Attention is all you need]]
  - la memorizzazione di grandi quantità di dati porta overfitting
  - modulo di attenzione per gestire efficientemente la capacità predittiva del modello
- **The Pile**
  - dataset di [[OpenAI]]
  - costruito con crawler
  - codice, letteratura scientifica, legale, prosa, conversazioni
- embedding
  - mapping del vocabolario naturale in uno spazio vettoriale del modello
  - ogni punto indica un concetto e operazioni vettoriale su questi punti portano spostamenti nello spazio vettoriale e a concetti diversi
  - spazio semantico → spazio vettoriale
- allucinazioni
  - un **AI** non è una buona fonte, non sa cosa è giusto o sbagliato
- ChatAI come interfaccia per i servizi nel futuro
- consulenti che utilizzano la AI come supporto sono più produttivi e accurati
- compiti:
  - solo per me
  - delegati
  - centaur
    - collaborazione *back and forward*
- trade-off
  - efficienza ma meno unicità
  - come gestiamo una transizione verso una agency maggiore delle AI
  - impatto su lavori o su parte di un workflow di un umano
  - bias nel modello[^2]
    - le industrie **vogliono** modelli biased che riflettono accuratamente le attuali ingiustizie e differenze sociali[^3]
    - mantenere i bias sociali significa mantenere il proprio potere predittivo
    - il bias sta nei dati o in chi a creato il dataset?
  - controllo tramite AI sempre più forte
  - accesso alle risorse, come fare con l'OpenSource?

# [[Guido Boella]]

- SIpEIA
- <https://ai-aware.eu>
- ai generated Tank Man
  - primo nei risultati Google Image
- il bias sociale è riflesso nell'output dei modelli
- [[On the Dangers of Stochastic Parrots]]
  - causa del licenziamento delle due Head of Ethics in Google
  - **Unfathomable Training Data**
    - *incapable of being fully explored or understood*
    - buona parte dei problemi dei modelli sta nella difficoltà nel gestire i dataset
    - la grandezza non garantisce diversità, il web è orientato
    - sistemi statici, conservatori *by design*: guardano al passato
      - i temi che stanno nascendo sono per definizione sotto-rappresentati
    - *encoding bias*, non fanno altro che codificare i pregiudizi reali
  - la tecnologia è sempre politica
    - i problemi insiti nei modelli non sono risolvibili, almeno non del tutto, tecnicamente
  - *manipulation of users*
    - gli umani sono condizionati a attribuire intenzioni comunicative a messaggi in linguaggio naturale
      - si attribuiscono emozioni, intelligenza, capacità a [[LLM]] che non ne hanno
    - il significato viene costruito nell'interazione simmetrica e continua tra umani, il modello è invece asimmetrico
    - quello che ci è presentata è una **illusione**, il significato è attribuito dall'umano a un semplice processo statistico
    - [[Stochastic Parrot]]
    - [[J.Weizenbaum]] aveva descritto la stessa illusione con [[ELIZA]]
- Allucinazione
- Plagio
  - [[OpenAI]] ha pubblicato un sistema di analisi e riconoscimento AI/umano: pessime performance e fatto sparire dopo qualche mese
- Libri generati da [[Artificial Intelligence]] e spacciati come reali sono sempre di più
- Fake News sempre più credibili
  - Deep fake *My Blond GF*
  - **QAnon** nato da post su 4chan
    - [[LLM]] in grado di fare propaganda sui social media hanno potenzialità ben maggiori
- Copyright
  - il fatto che i dati siano pubblici non equivale che possano essere utilizzati per farci business
    - compreso contenuto pirata
  - [[George R.R. Martin]] e altri autori fanno causa per [[OpenAI]]
  - la potenzialità di modelli in mano a chiunque in grado di riprodurre testi e stili di autori che detengono il proprio diritto di autore è molto maggiore di quello di singoli individui con capacità artistiche che volessero tentare lo stesso
  - [[OpenAI]] e Google stanno cercando di sovvertire la giurisprudenza sul tema
    - cercano di proporre soluzioni **opt-out** quando la legge è chiaramente **opt-in** alla cessione dei propri dati e le proprie produzioni
      - quando poi non c'è modo di verificare se il contenuto che io volevo negare è stato inserito all'interno dei modelli
- Daniel Dennett: [[The Problem With Counterfeit People]]

## Letture

- [[Klara and the Sun]]
- \[\[id:cd1967c7-2713-4fc2-80c3-caaf47fff972\]\[Never Let Me Go\]

[^1]: ha letto [[Weapons of Math Destruction]].

[^2]: i bias dei creatori vanno a finire nelle loro creazioni

[^3]: e le rinforzano, è una downward spiral che descrive benissimo [[Cathy O'Neil]] una [[Weapons of Math Destruction]]
