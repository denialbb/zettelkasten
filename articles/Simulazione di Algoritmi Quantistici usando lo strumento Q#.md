---
documentclass: my_thesis
id: 07f2115c-edc3-4541-812b-19534cf6e019
title: "Simulazione di Algoritmi Quantistici usando lo strumento Q#"
description: "Tesi triennale sulla simulazione di algoritmi quantistici con Q#, aggiornata sulla base della traduzione inglese corretta."
tags:
  - university
  - thesis
  - research
  - quantum-computing
---

# Dichiarazione di originalità

> Dichiaro di essere responsabile del contenuto dell'elaborato che presento al fine del conseguimento del titolo, di non avere plagiato in tutto o in parte il lavoro prodotto da altri e di avere citato le fonti originali in modo conforme alle normative vigenti in materia di plagio e diritto d'autore. Sono inoltre consapevole che, qualora la mia dichiarazione risultasse mendace, potrei incorrere nelle sanzioni previste dalla legge e la mia ammissione alla prova finale potrebbe essere revocata.

## Versioni

- [[cv|Curriculum Vitae]]
- [Traduzione inglese corretta (PDF)](/static/thesis-en.pdf)
- [Tesi originale in italiano (PDF)](/static/thesis-it.pdf)

# Introduzione

Lo sviluppo del software quantistico è diventato negli ultimi decenni un ambito di notevole interesse teorico e tecnologico. Alcuni algoritmi quantistici hanno il potenziale di superare i limiti computazionali dei corrispettivi classici in specifici domini:

- **Crittografia:** la distribuzione quantistica delle chiavi (QKD) offre sicurezza informativa; l'algoritmo di Shor mette invece in discussione i sistemi a chiave pubblica basati sulla fattorizzazione e sul logaritmo discreto.
- **Ricerca non strutturata:** l'algoritmo di Grover offre un'accelerazione quadratica rispetto alla ricerca classica.
- **Simulazione quantistica:** la simulazione di sistemi quantistici a molti corpi è difficile per le architetture classiche, poiché lo spazio di Hilbert cresce esponenzialmente.
- **Apprendimento automatico:** algebra lineare quantistica, algoritmi variazionali e metodi kernel esplorano spazi di caratteristiche ad alta dimensionalità.
- **Biologia computazionale e chimica generativa:** tra le applicazioni studiate figurano la previsione della struttura biomolecolare e il calcolo delle proprietà elettroniche delle molecole.

Il calcolo classico non verrà sostituito: i due paradigmi hanno capacità complementari. I processori quantistici sono ancora difficili da costruire, isolare e scalare; oggi il loro uso pratico avviene soprattutto tramite infrastrutture cloud. Questo non riduce il valore teorico e ingegneristico della progettazione di algoritmi quantistici. La sovrapposizione, l'interferenza e l'entanglement permettono vantaggi per alcune classi di problemi, ma il calcolo quantistico non è una soluzione universale e molti problemi restano difficili anche per un computer quantistico.

In passato lo studio del settore era riservato soprattutto a fisici e matematici con una formazione specifica in meccanica quantistica. Framework, linguaggi e simulatori di alto livello rendono oggi possibile progettare e verificare algoritmi quantistici anche dal punto di vista dell'informatica e dell'ingegneria del software.

## Definizione di computer quantistico

Un computer è un dispositivo fisico che riceve dati strutturati, applica trasformazioni secondo le leggi fisiche e produce risultati deterministici o probabilistici. Un computer quantistico elabora informazioni sfruttando fenomeni descritti dalla meccanica quantistica.

Un registro classico rappresenta stringhe di bit appartenenti a $\{0,1\}^n$; un registro quantistico può rappresentare vettori di stato in uno spazio di Hilbert complesso di dimensione $2^n$, $\mathcal{H}_{2^n}=(\mathbb{C}^2)^{\otimes n}$. I processori quantistici reali sono coordinati da sistemi di controllo classici, che producono impulsi e convertono i risultati delle misure in bit leggibili da processori convenzionali.

La differenza computazionale è rilevante per specifici problemi e modelli di costo: per alcuni di essi gli algoritmi quantistici offrono accelerazioni esponenziali o polinomiali rispetto ai migliori algoritmi classici noti. Non basta però aumentare la potenza dell'hardware quantistico per risolvere efficientemente qualsiasi problema.

## Limiti hardware

Il software quantistico può essere eseguito su simulatori classici oppure su processori quantistici fisici, spesso accessibili da remoto. I qubit fisici sono sensibili a perturbazioni ambientali, fluttuazioni termiche e radiazioni, che causano decoerenza e imprecisioni nelle porte. Alcune architetture, come i circuiti a transmon superconduttori, richiedono temperature criogeniche prossime allo zero assoluto; gli ioni intrappolati utilizzano invece altre tecniche di isolamento e controllo.

Di conseguenza, i processori quantistici sono perlopiù accessibili tramite servizi gestiti. Tra le piattaforme citate nella tesi figurano IBM Quantum, Google Quantum AI, Xanadu Quantum Cloud e Amazon Braket, che offrono accesso a diverse architetture e strumenti software.

![Architettura gerarchica di un computer quantistico](/static/thesis_img/fig-01-architecture.png)

Simulatori e processori fisici condividono livelli di astrazione e interfacce che consentono di formulare e validare gli algoritmi prima dell'esecuzione su hardware reale. Un simulatore a vettori di stato conserva in memoria le ampiezze complesse dell'intero stato: servono $O(2^n)$ ampiezze per $n$ qubit, perciò il costo cresce esponenzialmente. `qsim`, sviluppato da Google Quantum AI e integrabile con Cirq, è un esempio di simulatore ottimizzato per circuiti quantistici.

## Applicazioni e complessità computazionale

Alcuni algoritmi canonici illustrano le differenze tra i modelli classico e quantistico:

- **Grover:** ricerca non strutturata con $O(\sqrt{N})$ interrogazioni, contro il limite classico $\Omega(N)$.
- **Shor:** fattorizzazione e logaritmo discreto in tempo polinomiale nella lunghezza dell'input, a differenza degli algoritmi classici noti, che hanno complessità sub-esponenziale.
- **Deutsch–Jozsa:** decide se una funzione promessa costante o bilanciata è costante o bilanciata con una sola interrogazione dell'oracolo quantistico; la soluzione deterministica classica richiede fino a $2^{n-1}+1$ interrogazioni.
- **Simon:** trova il periodo nascosto di una funzione a due-a-uno in tempo polinomiale, con una separazione esponenziale nel modello delle interrogazioni rispetto agli algoritmi classici randomizzati.

Le classi di complessità formalizzano queste differenze: $P$ comprende i problemi risolvibili in tempo polinomiale deterministico; $NP$ quelli le cui soluzioni sono verificabili in tempo polinomiale; $BPP$ i problemi risolvibili da algoritmi classici randomizzati con errore limitato; $BQP$ quelli risolvibili da algoritmi quantistici in tempo polinomiale con errore limitato; $EQP$ quelli risolvibili esattamente in tempo polinomiale quantistico. È noto che $P\subseteq BPP\subseteq BQP$. Le relazioni esatte tra $BQP$ e $NP$ restano aperte. La fattorizzazione è in $NP\cap coNP$ e non è ritenuta $NP$-completa.

![Relazioni tra classi di complessità computazionale](/static/thesis_img/fig-02-complexity.png)

Altre applicazioni studiate includono la stima di somme di Gauss, la valutazione di formule booleane, la simulazione di dinamiche quantistiche e la generazione di numeri casuali quantistici. I vantaggi nell'apprendimento automatico sono più difficili da stabilire: caricare grandi dataset classici in stati quantistici può richiedere memoria quantistica ad accesso casuale (QRAM), il cui costo può annullare l'accelerazione teorica. Sono candidati più promettenti i problemi con input e output moderati ma molte trasformazioni algebriche.

# Ambiente e strumenti

Sono disponibili diversi ambienti di sviluppo e SDK per il software quantistico. Tra questi figurano il Quantum Development Kit (QDK) di Microsoft e Qiskit di IBM, oltre a Ocean, ProjectQ, Forest/pyQuil, `t|ket>`, Strawberry Fields e PennyLane. Molti sono open source e si integrano con l'ecosistema Python.

Per questa tesi sono stati scelti gli strumenti Microsoft, per la documentazione e per la loro adozione nel testo di riferimento *Learn Quantum Computing with Python and Q#* di Sarah C. Kaiser e Christopher Granade. Il lavoro è stato svolto in ambiente Linux; la procedura è analoga su Windows usando PowerShell e `conda` o `pip`.

Q# può essere sviluppato in Visual Studio Code con l'estensione Microsoft QDK. In alternativa, si può lavorare con Jupyter Notebook e un backend Python. Il flusso descritto nella tesi utilizza .NET Core 6.0 LTS e il kernel IQ#; il runtime ASP.NET Core è necessario per i notebook.

![Flusso di compilazione ed esecuzione nel Microsoft QDK](/static/thesis_img/fig-03-qdk-flow.png)

```bash
dotnet tool install -g Microsoft.Quantum.IQSharp
dotnet iqsharp install
```

Su alcune configurazioni Linux può essere necessario installare il kernel per l'utente:

```bash
dotnet iqsharp install --user
```

Una distribuzione come Anaconda semplifica la gestione delle dipendenze. Se necessario, si aggiunge la directory di Anaconda al `PATH`:

```bash
export PATH=/opt/anaconda/bin:$PATH
```

Si crea quindi un ambiente isolato:

```bash
conda create -n qsharp-env -c microsoft qsharp notebook
conda activate qsharp-env
```

Il lavoro fa riferimento a Python 3.9 o successivo e a .NET 6.0 LTS. Il pacchetto Python `qsharp` consente di eseguire localmente operazioni Q# da uno script Python:

```python
import qsharp
from QsharpNamespace import Operation_One, Operation_Two

var1 = 10
print("Simulation started...")
Operation_One.simulate(par1=var1)
Operation_Two.simulate(par2=var1, par3=5)
```

Il pacchetto individua e compila i file Q# locali, rendendone le operazioni invocabili da Python. È anche possibile compilare codice Q# direttamente in una stringa tramite `qsharp.compile`:

```python
import qsharp

prepare_qubit = qsharp.compile("""
open Microsoft.Quantum.Diagnostics;

operation PrepareQubit() : Unit {
    use qubit = Qubit();
    DumpMachine();
}
""")

if __name__ == "__main__":
    prepare_qubit.simulate()
```

`DumpMachine()` mostra lo stato interno del simulatore classico, che conserva tutte le ampiezze; su un processore quantistico reale non è possibile leggere lo stato senza alterarlo tramite una misura.

# Il linguaggio Q#

Q# è un linguaggio open source di alto livello sviluppato da Microsoft per il Quantum Development Kit. Combina costrutti imperativi e funzionali, come cicli e condizioni, con costrutti specifici per il calcolo quantistico. È indipendente dall'hardware di destinazione: uno stesso programma può essere indirizzato a un simulatore, a un emulatore o a un processore quantistico.

Un programma essenziale è:

```qsharp
namespace HelloQuantum {
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    @EntryPoint()
    operation SayHelloQ() : Unit {
        Message("Hello quantum world!");
    }
}
```

`@EntryPoint()` indica il punto di ingresso. Tra i tipi classici figurano `Int`, `Double`, `Bool` e `String`; i tipi specifici includono `Qubit`, riferimento opaco a un sistema a due livelli, e `Result`, risultato classico di una misura, che può essere `Zero` o `One`. Il linguaggio consente di definire tipi composti, ma non adotta classi e l'ereditarietà tradizionali.

I qubit si allocano con `use` e devono essere restituiti allo stato $|0\rangle$ prima della deallocazione:

```qsharp
use q = Qubit();
use register = Qubit[n];
```

Le **operazioni** possono modificare lo stato quantistico e applicare misure; le **funzioni** sono routine classiche pure e non manipolano qubit. Alcune operazioni supportano i funtori `Adjoint` e `Controlled`, che generano rispettivamente l'operazione inversa e una variante controllata.

Esempio di misura in base computazionale:

```qsharp
operation MeasureOneQubit() : Result {
    use q = Qubit();
    H(q);
    let result = M(q);
    if result == One {
        X(q);
    }
    return result;
}
```

`H` trasforma $|0\rangle$ nello stato $|+\rangle=(|0\rangle+|1\rangle)/\sqrt{2}$; `M` misura in base $Z$ e restituisce `Zero` o `One`. La misura equivale a `Measure([PauliZ], [q])`. Q# richiede di riportare a $|0\rangle$ i qubit allocati prima di rilasciarli. Operazioni come `MResetZ` e `MResetX` combinano misura e reset; `MResetX` misura nella base degli autostati di Pauli $X$.

# Oracoli quantistici

Un oracolo quantistico rappresenta una funzione booleana tramite una trasformazione unitaria. Per $f:\{0,1\}^n\to\{0,1\}$, la forma standard è:

$$U_f|x\rangle|y\rangle=|x\rangle|y\oplus f(x)\rangle$$

L'input $x$ viene conservato e il valore della funzione viene aggiunto al registro bersaglio $y$ tramite XOR. L'oracolo è reversibile: applicarlo due volte restituisce lo stato iniziale, quindi $U_f^2=I$ e $U_f^\dagger=U_f$.

Le porte elementari usate negli esempi sono:

- **X:** scambia $|0\rangle$ e $|1\rangle$.
- **CNOT:** inverte il qubit bersaglio se il controllo è $|1\rangle$.
- **SWAP:** scambia gli stati di due qubit.

Gli oracoli implementati in Q# corrispondono alle funzioni costanti $f_1(x)=0$, $f_2(x)=1$ e alle funzioni bilanciate $f_3(x)=x$, $f_4(x)=\neg x$ e $f_5(x)=\bigoplus_{i=0}^{n-1}x_i$. Nel caso di più qubit, l'oracolo di parità si realizza applicando una CNOT per ciascun qubit di controllo.

```qsharp
namespace QuantumOracles {
    open Microsoft.Quantum.Intrinsic;

    operation ApplyZeroOracle(control : Qubit, target : Qubit) : Unit { }
    operation ApplyOneOracle(control : Qubit, target : Qubit) : Unit {
        X(target);
    }
    operation ApplyZeroOracleN(control : Qubit[], target : Qubit) : Unit { }
    operation ApplyOneOracleN(control : Qubit[], target : Qubit) : Unit {
        X(target);
    }
    operation ApplyIdOracle(control : Qubit, target : Qubit) : Unit {
        CNOT(control, target);
    }
    operation ApplyXOROracleN(control : Qubit[], target : Qubit) : Unit {
        for qubit in control {
            CNOT(qubit, target);
        }
    }
    operation ApplyNotOracle(control : Qubit, target : Qubit) : Unit {
        X(control);
        CNOT(control, target);
        X(control);
    }
}
```

![Oracolo di parità realizzato con porte CNOT](/static/thesis_img/fig-04-oracle-cnot.png)

La nozione di oracolo deriva dalla teoria della complessità: una macchina oracolo può interrogare una scatola nera che risponde in un singolo passo a una domanda sul problema rappresentato.

# Algoritmo di Deutsch–Jozsa

L'algoritmo riceve un oracolo per una funzione booleana promessa appartenere a una di due categorie:

- **Costante:** restituisce lo stesso valore per tutti gli input.
- **Bilanciata:** restituisce 0 per metà degli input e 1 per l'altra metà.

L'obiettivo è decidere quale caso si verifica con il minor numero di interrogazioni. La distinzione di complessità riguarda il modello delle interrogazioni e le macchine con oracolo; non implica che $EQP$ sia semplicemente diverso da $P$ in ogni modello senza relativizzazione.

## Soluzione classica

Se si osservano due output diversi, la promessa garantisce che la funzione è bilanciata: in questo caso bastano due interrogazioni. Nel caso peggiore, per concludere con certezza che la funzione è costante occorre esaminare più della metà dei $2^n$ input, cioè $2^{n-1}+1$ interrogazioni.

Con $k$ interrogazioni distinte e output tutti uguali, un algoritmo randomizzato che conclude che la funzione è costante ha errore al più

$$\epsilon\leq 2^{-(k-1)}$$

nel caso bilanciato. L'errore diminuisce con $k$, ma per una decisione deterministica senza errore nel caso peggiore servono $2^{n-1}+1$ interrogazioni.

## Soluzione quantistica

L'algoritmo quantistico usa una sola interrogazione dell'oracolo $U_f$:

1. Si prepara un registro di $n$ qubit nello stato $|0^n\rangle$ e un qubit ausiliario nello stato $|1\rangle$.
2. Si applica Hadamard a entrambi i registri.
3. Si applica $U_f$, imprimendo la parità di $f(x)$ come fase.
4. Si applica nuovamente Hadamard al registro di input.
5. Si misura il registro: $|0^n\rangle$ indica una funzione costante; qualunque altro risultato indica una funzione bilanciata.

![Circuito dell'algoritmo di Deutsch–Jozsa](/static/thesis_img/fig-05-dj-circuit.png)

La trasformata di Hadamard a un qubit è $H=\frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$. Per $m$ qubit, $H_m=H^{\otimes m}$; si può definire ricorsivamente a partire da $H_0=[1]$:

$$H_m=\frac{1}{\sqrt{2}}\begin{pmatrix}H_{m-1}&H_{m-1}\\H_{m-1}&-H_{m-1}\end{pmatrix}$$

![Rappresentazione di un qubit sulla sfera di Bloch](/static/thesis_img/fig-06-bloch-sphere.png)

Per un qubit, l'azione dell'oracolo sul qubit bersaglio preparato in $| - \rangle=(|0\rangle-|1\rangle)/\sqrt{2}$ produce il *phase kickback*:

$$U_f|x\rangle| - \rangle=(-1)^{f(x)}|x\rangle| - \rangle$$

Dopo l'ultima porta Hadamard, il qubit di input è $|0\rangle$ se la funzione è costante e $|1\rangle$ se è bilanciata. La misura permette quindi di decidere senza errore nel problema promesso. La routine Q# per il caso a un qubit è:

```qsharp
operation DeutschJozsaSingleBit(
    oracle : ((Qubit, Qubit) => Unit)
) : Bool {
    use control = Qubit();
    use target = Qubit();
    H(control);
    X(target);
    H(target);
    oracle(control, target);
    H(target);
    X(target);
    return MResetX(control) == One;
}
```

Per $n$ qubit, la trasformata di Hadamard agisce come

$$H^{\otimes n}|x\rangle=\frac{1}{\sqrt{2^n}}\sum_{y=0}^{2^n-1}(-1)^{x\cdot y}|y\rangle$$

dove $x\cdot y=\bigoplus_{i=0}^{n-1}x_i y_i$ è il prodotto scalare bit a bit modulo 2. L'ampiezza dello stato $|0^n\rangle$ dopo la trasformata finale è

$$C_{0^n}=\frac{1}{2^n}\sum_{x=0}^{2^n-1}(-1)^{f(x)}$$

Se $f$ è costante, la somma vale $\pm2^n$ e la probabilità di misurare $|0^n\rangle$ è 1. Se $f$ è bilanciata, metà dei termini vale $+1$ e metà $-1$: l'ampiezza è zero e la probabilità di misurare $|0^n\rangle$ è 0.

Nel codice Q# della tesi originale, la routine generalizzata controlla soltanto il primo qubit. Questo criterio vale per gli oracoli lineari di parità considerati negli esempi, ma non per una funzione arbitraria: in generale bisogna misurare tutti gli $n$ qubit e decidere che la funzione è costante se e solo se l'esito è $0^n$.

# Teletrasporto quantistico

L'entanglement è una correlazione tra sottosistemi che non può essere descritta come prodotto di stati indipendenti. Due stati entangled possono mantenere correlazioni non locali indipendentemente dalla distanza. Questo non permette di trasmettere informazione più velocemente della luce: il protocollo di teletrasporto richiede anche la comunicazione classica dei risultati di misura.

Due risultati fondamentali per l'informazione quantistica sono il teorema di no-cloning, che vieta di copiare uno stato quantistico arbitrario sconosciuto, e il limite alla discriminazione certa di stati non ortogonali.

Il protocollo trasferisce lo stato ignoto di un qubit $A_1$ a un qubit distante $B$, usando una coppia entangled condivisa tra Alice ($A_2$) e Bob ($B$). Si consideri

$$|\psi\rangle_{A_1}=\alpha|0\rangle+\beta|1\rangle,\qquad |\alpha|^2+|\beta|^2=1$$

Alice e Bob condividono lo stato di Bell

$$|\Phi^+\rangle_{A_2B}=\frac{|00\rangle+|11\rangle}{\sqrt{2}}$$

Lo stato iniziale complessivo è

$$|\Psi_0\rangle=|\psi\rangle_{A_1}\otimes|\Phi^+\rangle_{A_2B}=\frac{1}{\sqrt{2}}\left(\alpha|000\rangle+\alpha|011\rangle+\beta|100\rangle+\beta|111\rangle\right)_{A_1A_2B}$$

Riscrivendo i due qubit di Alice nella base di Bell, si ottiene

$$|\Psi_0\rangle=\frac{1}{2}\left[|\Phi^+\rangle(\alpha|0\rangle+\beta|1\rangle)+|\Phi^-\rangle(\alpha|0\rangle-\beta|1\rangle)+|\Psi^+\rangle(\beta|0\rangle+\alpha|1\rangle)+|\Psi^-\rangle(-\beta|0\rangle+\alpha|1\rangle)\right]$$

Dopo la misura congiunta di Alice, il qubit di Bob assume uno dei quattro stati $|\psi\rangle$, $Z|\psi\rangle$, $X|\psi\rangle$ o $XZ|\psi\rangle$, a seconda dei due bit classici ottenuti. Alice comunica questi bit a Bob, che applica la correzione unitaria corrispondente, $X^{m_2}Z^{m_1}$, e recupera lo stato iniziale.

![Circuito del protocollo di teletrasporto quantistico](/static/thesis_img/fig-07-teleport-circuit.png)

Prima di ricevere i due bit, lo stato locale di Bob è massimamente misto, $\rho_B=I/2$: non contiene informazione estraibile sullo stato ignoto. La misura di Alice distrugge inoltre lo stato originale, coerentemente con il teorema di no-cloning. Un esperimento di teletrasporto quantistico su un collegamento ottico in spazio libero di 143 km tra le isole Canarie è stato riportato nel 2012.

Esempio di implementazione in Python:

```python
from interface import QuantumDevice, Qubit
from simulator import Simulator

def teleport(msg: Qubit, here: Qubit, there: Qubit) -> None:
    here.h()
    here.cnot(there)
    msg.cnot(here)
    msg.h()

    if msg.measure():
        there.z()
    if here.measure():
        there.x()

    msg.reset()
    here.reset()
```

Esempio di implementazione in Q#:

```qsharp
namespace Microsoft.Quantum.Samples.Teleportation {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Measurement;

    operation Teleport(msg : Qubit, target : Qubit) : Unit {
        use register = Qubit();
        H(register);
        CNOT(register, target);
        CNOT(msg, register);
        H(msg);

        if (IsResultOne(MResetZ(msg))) {
            Z(target);
        }
        if (IsResultOne(MResetZ(register))) {
            X(target);
        }
    }
}
```

`MResetZ` misura in base $Z$ e resetta il qubit a $|0\rangle$; i risultati classici selezionano le correzioni di Pauli applicate da Bob.

![Canali quantistico e classico nel teletrasporto](/static/thesis_img/fig-08-teleport-channels.png)

# Conclusioni

Il calcolo quantistico e l'elaborazione dell'informazione quantistica sono ambiti in rapido sviluppo, con radici teoriche nei contributi di Paul Benioff, Richard Feynman e David Deutsch. L'Unione Europea ha incluso le tecnologie quantistiche tra le priorità del Decennio Digitale e ha promosso l'infrastruttura europea di comunicazione quantistica EuroQCI.

Gli esperimenti di Alain Aspect, John Clauser e Anton Zeilinger, premiati con il Nobel per la fisica nel 2022, hanno verificato violazioni delle disuguaglianze di Bell e contribuito a escludere teorie a variabili nascoste locali.

Nel frattempo, la miniaturizzazione dei semiconduttori incontra limiti fisici, di dissipazione e di consumo energetico. La fine della crescita descritta dalla legge di Moore sposta l'innovazione verso acceleratori specializzati, architetture efficienti e sensori. Sviluppare paradigmi computazionali complementari è quindi una necessità ingegneristica oltre che una questione teorica. Il calcolo quantistico continuerà a evolversi mentre l'hardware classico si avvicina ai propri limiti fisici.

# Bibliografia

1. Sarah C. Kaiser e Christopher Granade, *Learn Quantum Computing with Python and Q#*, Manning Publications, 2021. [Editore](https://www.manning.com/books/learn-quantum-computing-with-python-and-q-sharp).
2. J. S. Bell, “On the Einstein Podolsky Rosen Paradox”, *Physics Physique Fizika*, 1(3):195–200, 1964. [DOI](https://doi.org/10.1103/PhysicsPhysiqueFizika.1.195).
3. S. Kumar, “Fundamental Limits to Moore's Law”, 2015. [arXiv:1511.05956](https://arxiv.org/abs/1511.05956).
4. M. Mitchell Waldrop, “The chips are down for Moore's law”, *Nature*, 530(7589):144–147, 2016. [DOI](https://doi.org/10.1038/530144a).
5. Paul Benioff, “The computer as a physical system: A microscopic quantum mechanical Hamiltonian model of computers as represented by Turing machines”, *Journal of Statistical Physics*, 22(5):563–591, 1980. [DOI](https://doi.org/10.1007/BF01011339).
6. Sarah C. Kaiser e Christopher Granade, repository del codice di *Learn Quantum Computing with Python and Q#*. [GitHub](https://github.com/crazy4pi314/learn-qc-with-python-and-qsharp).
7. “Quantum Computer System Architecture”, *IEEE Micro*, 40(6), 2020. [IEEE Xplore](https://ieeexplore.ieee.org/document/9274431).
8. “Oracle machine”, *Wikipedia*. [Voce enciclopedica](https://en.wikipedia.org/wiki/Oracle_machine).
9. Microsoft, “Azure Quantum: Install the Quantum Development Kit (QDK)”. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/quantum/install-overview-qdk).
10. Microsoft, “Quantum Teleportation Sample”. [GitHub](https://github.com/microsoft/quantum/tree/main/samples/getting-started/teleportation).
11. Microsoft, risorse del Quantum Development Kit. [Azure](https://azure.microsoft.com/en-us/resources/development-kit/quantum-computing/).
12. Qiskit Development Team, “Deutsch-Jozsa Algorithm”, *Qiskit Textbook*. [Testo](https://qiskit.org/textbook/ch-algorithms/deutsch-jozsa.html).
13. The Nobel Prize, “The Nobel Prize in Physics 2022: Press release”. [NobelPrize.org](https://www.nobelprize.org/prizes/physics/2022/press-release/).
