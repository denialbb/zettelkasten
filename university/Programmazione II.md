---
id: a25c2d74-9e94-4bfe-9b97-ca45ba6148a0
title: Programmazione II
---

Prof: `Cattuto`

# Generici Vincolati

## Classe Tree di generici T vincolati a Comparable\<T\>

# Errori e Eccezioni –\> Throwable

## Error

### eccezioni non rimediabili

- scelta del programmatore

## Exception ~ se estesa: controllata

- Condizioni di errore che pensiamo di poter gestire

### Checked

- Eccezioni controllate
  - origine esterna
  - va previsto un rimedio
- Sono cosi' comuni che il compilatore pretende che il programmatore gestisca l'eccezione
  - o avverta con la parola chiave `throws`

1.  IOException

    1.  FileNotFoundException

    2.  EOFException

        - End Of File

### Unchecked

- Eccezioni non controllate
  - origine interna
  - possiomo prevedere un rimedio oppure no

1.  RuntimeException

    1.  NullPointerException

    2.  ArithmeticException

        - / 0

    3.  IllegalArgumentException

        1.  NumberFormatException

            ``` java
            Integer.parseInt("ciro");
            ```

## Uso

``` java
public class TestError{
    public static void m1(){
        throw new Error("mio errore");
    }

    // Esempio eccezione controllata, devo usare throws per compilare
    public static void m2() throws IOException {
        throw new IOException("IO Exception");
    }

    // Esempio di eccezione non controllata, il compilatore non controlla
    public static void m3(){
        throw new RuntimeException("runtime");
    }

    public static void main(String[] args){

        try{
            m1();
            m2();
            m3();
        } catch(Throwable e) { // Upcast alla classe Throwable
            System.out.println("Captured: " + e);
        }

    }
}
```

# Iterable su Intervalli

## iterazione su una lista collegata di interi

## da un nodo `first` a un altro `last`

**\***

# Alberi Binari di Ricerca Binaria

- Estensione delle classi per permettere vari tipologie di visite
  - preOrder()
  - inOrder()
  - postOrder()
  - livello(int n)
  - livello()
  - leavesAt(int n)

## abstract Tree

### Leaf

### Branch
