---
date: 2022-03-29 18:05
id: c2bda57f-a02a-460c-96a2-796dd2fee708
title: "Learn Quantum Computing with Python and Q#"
---

Sarah Kaiser, Christopher Granade, *Learn Quantum Computing with Python and Q#*, 2021, Manning

- Related: [[Quantum Computing]], [[Q#]]
- Code: <https://github.com/crazy4pi314/learn-qc-with-python-and-qsharp>

# Concepts

## Qubits

Quantum analogue to the classical *bits*

### Quantum Random Number Generation

`QRNG`

Randomness is important, expecially where security is concerned. We need `RNG` that our adversary can't predict. While `RSA` relies on *just* the assumption that factoring large numbers is hard the randomness of quantum mechanics is guaranteed by physics. Generating truly random numbers allows the implementation of a secure [[One-time Pad]].

The algorithm:

1.  allocate a `qubit`
2.  apply the `Hadamard` instruction to the `qubit`
3.  measure the `qubit`

## Quantum Key Distribution

## Nonlocal Games

## Teleportation & Entanglement

# Programming

## Setting Up the Environment

- <https://docs.microsoft.com/en-us/azure/quantum/install-overview-qdk>

The authors use Anaconda w/ [[Python]] 3 and the Conda package manager for the qsharp packages.

On Arch the `anaconda` package on the `AUR` installs everything but you need to add it to `PATH`:

``` bash
PATH=/opt/anaconda/bin:$PATH
```

Then you set the environment via `environment.yml` in the book's repo.

``` bash
$ conda env create environment.yml
$ conda activate qsharp-book
```

- for this `conda` needs to be set up on the console (`bash`, `zsh`, …)

After this the last thing to setup is `dotnet`, download the appropriate `Core SDK`. Install project templates:

``` bash
$ dotnet new -i "Microsoft.Quantum.ProjectTemplates"
```

and to use them:

``` bash
$ dotnet new console -lang Q# -O MyProject
```

Then to have language hinting on `VS Code` you need to install the extension `Microsoft Quantum Development Kit`

- not available on the FOSS version of `VS Code` on the `AUR`

For Jupyter Notebooks you can install `IQ#`

``` bash
$ dotnet tool install -g Microsoft.Quantum.IQSharp
$ dotnet iqsharp install
```

If there are problems with `iqsharp` install the correct runtime, `aspnet-runtime` on the `AUR`.

## Q#

`Q#` code can be run on Jupyter notebooks with the apropriate kernel or via `python` thanks to the `qsharp` package.

``` python
import qsharp
from QsharpNamespace import Operation_One, Operation_Two
var1 = 10
print("Simulation started...")
Operation_One.simulate(par1=var1)
Operation_Two.simulate(par2=var1,par3=5)
```

Operation `imported` are automatically found in `*.qs` files in the `host.py` directory. These imports are converted to `python` objects and have a `simulate()` function, taking the required arguments and passing them along to the `Q#` simulator.

## [[Deutsch-Jozsa Algorithm]]

To use the algorithm on function $`f`$ to decide whether it is balanced or constant we need to define an *oracle* for that function.

- this is because functions can be *unreversible*
  - `id`, reversible
  - `not`, reversible
  - `zero`, unreversible
  - `one`, unreversible
  - constant functions are unreversible as they lose track of which input resulted in the output

> Oracles are unitary matrixes defined by applying $`f`$ conditionally to the labels for qubits states, applying an oracle twice results in the identity $`\mathbb{1}`$

To make a **classical reversible function** $`h`$ from the unreversible $`f`$:
``` math
h(x,y) = (x,y \oplus f(x))
```

In the same way we can make a **reversible quantum operation** or **oracle**:
``` math
U_{f} |x \rangle | y \rangle = | x \rangle | y \oplus f(x) \rangle
```

- $`x`$ is the `control qubit`
- $`y`$ is the `target qubit`

The algorithm works by using a quantum programming technique colled *phase kickback*.

- the fact that the input qubit's state changes base on transformations defined in the output qubit
  The algorithm can be extended to $`n`$ qubits with functions of form
  ``` math
  f(x_{0}, x_{1},\cdots,x_{n})
  ```
  and n-qubits oracles
  ``` math
  U_{f}|x_{0} x_{1}\cdots x_{n}y\rangle = | x_{0} x_{1}\cdots x_{n}\rangle \otimes | f(x_{0}, x_{1},\cdots,x_{n}) \oplus y\rangle
  ```

## Quantum Sensing

# Applied Quantum Computing

## Chemistry

## Searching

### Grover's Search Algorithm

## Arithmetic

### Shor's Algorithm
