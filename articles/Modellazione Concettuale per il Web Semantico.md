---
date: "\\[2022-11-30 Wed 16:20\\]"
id: 803f5b09-941a-4cf4-84ca-9e8c537ef453
roam_aliases: ModSem
title: Modellazione Concettuale per il Web Semantico
---

- Prof: Rossana Damiano
- [[Linked Data- Evolving the Web into a Global Data Space]]
- <https://www.w3.org/2013/data/>

# Linguaggi

## SNePS

- see [[SNePS]]
- \$ crea variabili
- 

``` example
(assert forall $p
    ant (build member *p class Pompeian)
    cq (build member *p class Roman))
```

- antecedent
- consequent

``` example
(assert forall $r
    ant (build member *r class Roman)
    cq (build min 1 max 1
        arg((build arg1 *r
                rel loyal\ to
                arg2 Caesar)
            (build arg1 *r
                rel hate
                arg2 Caesar))))
```

- `OR` esclusivo implementato come `min 1 max 1` nodi valgono

``` example
(assert forall ($ppl $rlr)
    &ant ((build member *ppl class person)
        (build member *rlr class ruler)
        (build arg1 *ppl
            rel try\ to\ assassinate
            arg2 *rlr))
    cq (build min 0 max 0
        arg (build arg1 *ppl
            rel loyal\ to
            arg2 *rlr)))
```

- `NOT` implementato come `min 0 max 0`

Dai comandi di `assert` il sistema costruisce i nodi molecolari corrispondenti.

### Contesti

- un nodo può essere asserito o meno
- per rappresentare credenze di più soggetti il sistema può contenere più contesti
  - contesti fatti di ipotesi, un nodo asserito o derivato da inferenza

``` example
:context nodeset context-name
```

### Interrogare la rete

Il comando utente **find** trova uno o più nodi della rete

- la rete si comporta come un *database* di fatti

``` example
(find class elephant)

(find (member-class) canary (object-ability) fly)
```

### Credenze

``` example
(assert agent John
        act believe
        object (build object Opus ability fly))
```

### Deduzioni

``` example
(deduce member $x class canary)
```

### Inferenza

1.  Riduzione

    Dedurre dal grafo una porzione in esso contenuta.

2.  Path

    Stabilire che un percorso fatto di certe relazioni è uguale a una relazione usando il comando `define-path`

    - si definisce un certo percorso (definito in base alle sue caratteristiche) uguale a un singolo arco

    ``` example
    (define-path isa (compose isa
                        (kstar (compose object-isa))))
    ```

    - `kstar` sta per zero o più occorrenze

    ``` example
    (define-path
        has2 (compose   (kstar (compose isa object- ))
                        has (kstar (compose object- has))
                        (kstar (compose object- !isa))))
    ```

3.  Regole

    - regole definite arbitrariamente dall'utente
      - questo è il loro punto debole
    - parte della base di conoscenza
    - aumentano notevolmente la conoscenza della rete

    ``` example
    (assert member Marcus class man)
    (assert member Marcus class Pompeian)
    (assert member Caesar class ruler)
    ```

    ``` example
    (assert forall $p
        ant (build member *p class Pompeian)
        cq (build member *p class Roman))
    ```

## RDF

- see [[RDF]]
  - descrivere risorse
- RDFS
  - descrivere relazioni tra risorse
  - *property-centric* language
- [[OWL]]
  - a livello superiore rispetto RDF
  - descrivere relazioni ricche e complesse tra entità
  - *class-centric* language
- [[Semantic Web]]: W3C's vision of the Web of [[Linked Data]]
- le specifiche [[RDF]] si suddividono in una serie di documenti
  - [primer](https://www.w3.org/TR/rdf-primer/)
  - concepts/syntax
  - XML
  - semantics
  - schema
  - test cases

## Data Model

- Triple
  - unita' base
  - soggetto - predicato - oggetto
    - soggetto: IRI o blank
    - predicato: IRI
    - oggetto: IRI blank o letterale
- [[IRI]]
- Letterali
- Blank nodes
  - assume significato grazie alla sua posizione nel grafo
  - denota risorse senza l'utilizzo di IRI
    - una variabile, si rappresenta tramite le sue caratteristiche
  - puo' essere associato a un identificativo (generato)
- Grafi
  - `IRI` + triple

La descrizione di una certa entità si basa sull'utilizzo di **vocabolari condivisi**.

``` example
<Bob><http://xmlns.com/foaf/0.1/topic_interest><The Mona Lisa>
```

I vocabolari sono identificati da prefissi

- i prefissi indicano `namespace`
- `dc` per Dublin Core
- `foaf` per friend of a friend

## Turtle

Il linguaggio `RDF` piú utilizzato, leggibile facilmente da umani.

``` example
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
...

<...#green-goblin>
    rel:enemyOf <...#spiderman> ;
    a foaf:Person ;
    foaf:name "Green Goblin" .

<...#spiderman>
    rel:enemyOf <...#green-goblin> ;
    a foaf:Person ; # spiderman is a Person as defined in foaf.
    foaf:name "Spiderman" .
```

in `Turtle`

- la relazione `isa` (`rdf:type`) è abbreviata in `a`.
- gli `ISA` sono tra parentesi angolari se per esteso, altrimenti sono utilizzati con il prefisso definito
  - il *fragment identifier* segue il \#

La feature principale di `Turtle` è la abbreviazione delle triple:

``` example
:spiderman :enemyOf :green-goblin ;
           :name    "Spiderman" ,
                    "Uomo Ragno" .
```

- `@base` è utilizzato per definire un prefisso vuoto per alleggerire la scrittura

I **blank node** sono definiti all'interno di parentesi quadre.

I letterali sono seguiti dal loro tipo di dato

- a seguire del delimitatore `^^` l'`IRI` definito per il tipo (o una abbreviazione)

## RDFS

Linguaggio *property-centric*

- definire classi, proprietá
- definire gerarchie

Si definiscono (principalmente)

- class
- property
- type
- subclass
- subproperty
- domain
- range (codominio)

``` example
animals:Film rdf:type rdfs:Class .

animals:Animale rdf:type rdfs:Class .

animals:Quadrupede rdf:type rdfs:Class ;
                   rdfs:subClass animals:Animale .
```

# Vocabolari

<https://lov.linkeddata.es>

## Dublin Core

<https://www.dublincore.org> *Schema di Metadati*

- cataloghi di schede
- *data about data* - **descriptive metadata**
- 15 elementi generici molto utilizzati, per facilitare la scopribilitá delle risorse
  - Creator
  - Contributor
  - Publisher
  - Title
  - Date
  - Language
  - Format
  - Subject
  - Description
  - Identifier
  - Relation
  - Source
  - Type
  - Coverage
  - Rights
- descrive risorse *anything that has identity*
  - tipi di risorsa
    - collection, dataset, event, image, interactive resource, service, software, sound, text, physical object

Principali namespace:

- `DCMES`
  - <http://dublincore.org/documents/dces/>
- `DCTerms`
  - <http://purl.org/dc/elements/1.1/>

[Europeana](https://www.europeana.eu) é una risorsa

## Friend of a Friend

`foaf`

- core
  - Agent, Person, name, title, knows…
- social web
  - nick, homepage, interest, account…

## Schema

<https://schema.org>

- collaborative
- schemas for structured data on the Internet
- collaborazione di Google, Microsoft…
- Thing, Action, CreativeWork…
- Organization, Airline, Consortium, Corporation…

# Inferenza

Fatta a partire dalla semantica definita sui vocabolari.

- definizioni di *domain* e *range* trasportano conoscenza sulle istanze
- transitività di sotto-classe, di sub-property ad esempio

# Ontologie Computazionali

> An engineering artifact, constituted by a specific vocabulary used to describe a certain reality, plus a set of explicit assumptions regarding the intended meaning of the vocabulary itself.

- rappresentazione astratta di concetti e loro relazioni
- **ontologie formali** rappresentate secondo formalismi noti, machine readable
- **finalità** di condividere concettualizzazioni comuni tra individui, organizzazioni, macchine

Sono costituite da:

- classi
- proprietà
- assiomi
- individui

I linguaggi delle ontologie formali descrivono

- caratteristiche delle classi
- caratteristiche delle relazioni tra le classi

Le ontologie possono essere definite

- `top-level`, concetti fondazionali comuni a tutti i domini
- `mid-level`, usano il livello fondazionale per definire concetti general
  - organizzazioni, comunicazione, stati fisici, sistemi di misura
- `domain ontologies`, rappresentano concetti e relazioni proprie di un dominio specifico
- `large-scale`
  - CYC, YAGO, YAGO2, dbpedia

<figure>
<img src="../media/img/top-level-ontology.png" />
<figcaption>esempio di una top-level ontology</figcaption>
</figure>

La conoscenza di senso comune (*commonsense knowledge*) è importante per task che prevedano interazione con umani

- `CYC`: enCYClopedic Knowledge
  - base di conoscenza di 200k concetti circa
  - divisa in microteorie o domini, compartimentando la conoscenza

Per l'accesso ai concetti è importante l'integrazione con il linguaggio naturale.

## SuMo

Progetto di `IEEE`: `Suggested Upper Merged Ontology`

- scritta in `KIF` (Knowledge Interchange Format)
- attualmente abbandonata
- allineato con `WordNet` (ontologia lightweight) per permettere la ricerca tramite linguaggio naturale
  - le ontologie lightweight di questo tipo sono solitamente semplici tassonomie, senza assiomi e con poche relazioni

``` example
(=>
    (instance ?EF EngineFan)
    (hasPurpose ?EF
        (exists (?C ?E ?A)
            (and
                (instance ?A Automobile)
                (instance ?C Cooling)
                (instance ?E InternalCombustionEngine)
                (part ?E ?A)
                (part ?EF ?A)
                (instrument ?C ?EF)
                (patient ?C ?E)))))
```

## Linked Open Data

- dati pubblici
- dataset nella rete integrate nella rede `LOD` Cloud
- [Wikidata](https://www.wikidata.org)

I linked data sono un metodo per pubblicare dati strutturati in modo che possano essere collegati e diventare più utili, interrogabili da query semantiche.

Basato su tecnologie Web standard:

- http
- `RDF`
- `URI`

Fondato sulla **deferenzializzazione** delle entità definite nelle ontologie

- ovvero ottenere descrizioni `RDF` di entità

Per rendere gli `URI` deferenziabili esistono due strategie

- 303 `URI`​s
  - viene restituita, tramite reindirizzamento, la risorsa specifica ricercata
- hash `URI`​s
  - viene restituito il documento, il client deve ritrovare la risorsa specifica che vuole

Nei **linked data** esistono diversi tipi di link nelle triple `RDF`

- **relationship link**
  - punta oggetti collegati in altre sorgenti dati
- **identity link**
  - punta `URI` alias in altre sorgenti
  - nel mondo **aperto** dei linked data è comune che stesse entità siano riferite da sorgenti diverse con `URI` diversi
  - utilizzo della proprietà `owl:sameAs`
- **vocabulary link**
  - punta definizioni dei termini di vocabolario
  - `owl:equivalentClass`
  - `owl:equivalentProperty`
  - `rdfs:subClassOf`
  - `skos:broadMatch`

## Linked Date Platform

`LDP`

> Use of HTTP for accessing, updating, creating and deleting resources from servers that expose their resources as Linked Data.

## OWL

## Protégé

- <https://protegeproject.github.io/protege/class-expression-syntax/>
  - descrizione delle `keyword` del linguaggio e del loro significato

# Ontology Engineering

## SKOS

`Simple Knowledge Organization Systems` Utilizzato per organizzare e utilizzare risorse tassonomiche nei [[Linked Data]]. Queste risorse di tipo tassonomico sono disponibili in formato `RDF`. `SKOS` permette di usare vocabolari di provenienze diverse, annulla le relazioni tra concetti proprio delle ontologie.

- altra raccomandazione di `W3C` è [DCAT](http://www.w3.org/ns/dcat#)

> Using SKOS, concepts can be identified using URIs, labeled with lexical strings in one or more natural languages, assigned notations (lexical codes), documented with various types of note, linked to other concepts and organized into informal hierarchies and association networks, aggregated into concept schemes, grouped into labeled and/or ordered collections, and mapped to concepts in other schemes.

- modello per esprimere la struttura base per schemi concettuali
  - tesauri, schemi di classificazione, tassonomie
- come applicazione di `RDF` permette di pubblicare concetti sul World Wide Web

``` example
ex:animals rdf:type skos:Concept;
    skos:prefLabel "animals"@en;
    skos:narrower ex:mammals.

ex:mammals rdf:type skos:Concept;
    skos:prefLabel "mammals"@en;
    skos:broader ex:animals.
```

- *concepts* sono relati con altri
  - *related*
  - *narrower* - *broader*

``` example
ex:pineapples rdf:type skos:Concepts;
    skos:prefLabel "pineapples";
    skos:definition "The fruit of plants of the family Bromeliaceae".
```

- associare *concepts* con la loro documentazione
  - *definition*
  - *example*
  - *historyNote*
  - *changeNote*

``` example
ex:animalThesaurus rdf:type skos:ConceptScheme;
    dct:title "Simple animal thesaurus";
    dct:creator ex:antoineIsaac.

ex:animals rdf:type skos:Concept;
    skos:inScheme ex:animalThesaurus.
```

- schemi di concetti come tesauri
  - *ConceptScheme*
  - *inScheme*

`SKOS` può fare mapping tra schemi diversi

- *broadMatch*

### Tesauri e Tassonomie

- [Iconclass](http://www.iconclass.org)
- [VIAF](http://viaf.org) - `Virtual International Authority File`
  - authority file
  - nomi di autori
  - origine archivistica
- [ULAN](http://www.getty.edu/research/tools/vocabularies/ulan/)
  - `Union List of Artist' Names`
- [ACM Computing Classification System](https://www.acm.org/publications/class-2012)
  - tassonomia degli argomenti informatici
  - metadati articoli scientifici (index terms)

## SWRL

- antecedente - conseguente
  - antecedente valutato su un dataset
- regole dichiarative
  - conseguente è una nuova asserzione
- regole di produzione
  - conseguente è un'azione

`SWRL` rende `OWL` non più decidibile.

- forma `IF-THEN`
  - antecedente e conseguente
- le regole possono solo asserire nuove relazioni/proprietà
  - non può creare individui
- può essere aggiunto a Protégé
- utilizza un engine sterno (Drools)
- implementazione migliorata da algoritmo `RETE`
  - *pattern matching*

``` example
cinema:Personaggio(?x)
^
cinema:personaggioDi(?x,?y)
^
cinema:Commedia(?y)
->
cinema:PersonaggioComico(?x)

cinema:haRuolo(?a,?r)
^
cinema:compenso(?r,?c)
^
swrlb:greaterThan(?c,300000)
->
cinema:AttoreMoltePagato(?a)
```

## RIF

`Rule Interchange Format`

- standard `W3C`
- facilita sintesi e integrazione di sistemi di regole
- le regole vengono usate anche nei [[Linked Data]] per effettuare ragionamenti ad hoc

``` example
Forall ?Actor ?Film ?Role (
    If And(<http://example.com/imdbrelations#playsRole>(?Actor ?Role)
           (<http://example.com/imdbrelations#roleInFilm>(?Role ?Film))
    Then <http://dbpedia.org/ontology/starring>(?Film ?Actor)
)
```

# Gestire e Interrogare grafi RDF

## SPARQL

- linguaggio per *query*
- supporta
  - XML
  - JSON
  - CSV
  - TSV
- query indirizzare a un indirizzo `http` che ospita un **endpoint** `SPARQL`
- **endpoint** esegue le query sui dataset contenuti in uno *triple store*

Lo schema è classico:

``` example
PREFIX foo: <http://example.com/resources/>

FROM ...

WHERE { ... }

ORDER BY ...
```

`SPARQL` permette di lavorare con i grafi in modo simile a un database:

- `INSERT`
- `DELETE`
- `ASK`
  - permette di ottenere una risposta booleana rispetto l'esistenza di una o più triple

### Esempi

``` example
PREFIX cinema: <http://.../cinema#>

SELECT ?subject
    WHERE {?subject rdf:type cinema:Persona}
```

``` example
SELECT ?subject
    WHERE {?subject :haPopolazione :popolazioneDiTorino;
                    rdf:type :Città}
```

``` example
SELECT ?c ?p
    WHERE {
        ?c :haPopolazione ?p.
        ?p rdf:type :PopolazioneAmpia.
    }
```

``` example
SELECT ?p ?f
    WHERE {
        ?p rdf:type cinema:Persona;
            cinema:haRuolo ?r.
        ?r rdf:type cinema:Registra;
            cinema:ruoloInFilm ?f.
    }
```

È possibile includere filtri per selezionare un sottoinsieme dell'insieme dei risultati.

``` example
SELECT ?c ?p
    WHERE {
        ?c  :haPopolazione ?p;
            :situatoIn ?n;
            :nomeCittà ?o.
        ?n rdf:type :NazioneAsiatica.
        ?p rdf:type :PopolazianeAmpia.
        FILTER regex(?o, "Tokio").
    }
```

``` example
SELECT ?c
    WHERE {
        ?c  :situatoIn ?n;
            :dataFondazione ?a.
        ?n rdf:type :NazioneAsiatica.

        FILTER (?a>800)
    }
```

È possibile ordinare e raggruppare i dati.

``` example
SELECT ?f (COUNT(?p) AS ?count)
    WHERE {
        ?f cinema:haPersonaggio ?p.
    } GROUP BY ?f ORDER BY ?f
```

I *blank node* sono indicati da `[]`

``` example
SELECT ?persona (MAX(?compenso) AS ?piùpagato)
    WHERE {
        ?persona cinema:haRuolo ?ruolo.
        ?ruolo cinema:compenso ?compenso
    } GROUP BY ?persona
```

## GraphDB

Basato sul framework `RDF4J` che processa i dati `RDF`

- <http://rdf4j.org>
- ha funzionalità di
  - parsing
  - store
  - inference
  - query
- utilizzabile con suo database `RDF` o altre soluzione di storage

Nella creazione delle repository è possibile scegliere il **ruleset** di inferenza

- i nostri progetti dovrebbero ricadere in `OWL2-RL`
- evita di materializzare da Protegé ed eseguire inferenza direttamente al momento del caricamento delle triple

### Query Federate

## JENA

Altro framework utilizzato con il reasoner **Pellet** o **Hermit**. A differenza di `RDF4J` supporta `OWL`.

## Virtuoso

- open-source rilasciato da **OpenLink**
- cross-platform

User e secret default `dba`. Le operazioni vengono condotte nella sezione **Conductor**. È possibile caricare tramite **Quad Store Upload**

- quad in quanto vengono viene aggiunto alle triple il grafo di appartenenza

Si possono salvare dei `namespace` associando prefissi.

Il default graph è `http://localhost:8890/DAV/`.

I file caricabili sono `.rdf`, `.ttl`, `.nt`.

Tramite il browser faceted è possibile deferenziare gli `URI` che si desidera visualizzare.

# Pubblicare i Dati

# Relazioni tra classi

- sottoclasse
- classi disgiunte

## Logiche descrittive

- orientate alla classificazione
- basate sulla sussunzione
- completezza e trattabilità computazionale
- esempi
  - LOOM, BACK, CLASSIC
  - JENA, RACER, OWLIM

# Progetto - Ontologia

## Requirements

- Documentazione sul dominio di conoscenza
  - siti
  - manuali
  - standard
- Funzionalità
  - reference
  - annotazione
  - interoperabilità
  - accesso ai dati
- *Competency Questions*
  - domande a cui l'ontologia deve rispondere

## Modellazione

- Ontology engineering
  - pattern
- sorgenti di conoscenza
  - domain level
  - fondazionali
  - vocabolari
  - tassonomie
- allineamento
  - `OWL`, `RDF`, `SKOS`
- ragionamento automatico
- documentazione

## Knowledge Graph

- `IRI` design
- fragment identifier comprensibili
- popolamento ontologia
  - manuale
  - mapping tools
    - `SPARUL`
      - importazione da Google Knowledge Graph
    - `R2RML`
      - da database
- visualizzazione esempi significativi

## Pubblicazione

- LDP locale
  - virtuoso
  - GraphDB
  - Blazegraph
  - Jena + Pellet
  - Vesa + Fuseki
- materializzazione delle inferenze
- upload

## Applicazione

- funzionalità e flusso
- query
- implementazione
