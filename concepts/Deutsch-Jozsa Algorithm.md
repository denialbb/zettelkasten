---
date: 2022-04-02 09:28
id: d7686f15-7f24-476e-9ecf-87ef577d5a4c
title: Deutsch-Jozsa Algorithm
---

- Related: [[Quantum Computing]], [[Calcolabilità e Complessità]]
- Source: [qiskit](https://qiskit.org/textbook/ch-algorithms/deutsch-jozsa.html), [[Learn Quantum Computing with Python and Q#]] \[Ap.D\]
- see [Jupiter Notebook Extract](../media/docs/deutsch-jozsa-notebook.pdf)

The first example of a quantum algorithm performing better than the best classical algorithm.

The algorithm can be applied to an oracle $`U_{f}`$ where $`f`$ is either *constant* or *balanced* and decide in $`O(1)`$ whether it's one or the other, in a single application.

# Algorithm

1.  prepare two qubits, `control` and `target`, in the $`| 0 \rangle \otimes |0\rangle`$ state
2.  prepare the state \$\| + - ⟩\$[^1]
3.  apply the `oracle` $`U_{f}`$ to input state $`| +- \rangle`$
4.  measure `control` in the $`X\text{-basis}`$
    - if 0 then $`f`$ is constant, otherwise $`f`$ is balanced

The algorithm can be extended to $`n`$ qubits with functions of form
``` math
f(x_{0}, x_{1},\cdots,x_{n})
```
and n-qubits oracles
``` math
U_{f}|x_{0} x_{1}\cdots x_{n}y\rangle = | x_{0} x_{1}\cdots x_{n}\rangle \otimes | f(x_{0}, x_{1},\cdots,x_{n}) \oplus y\rangle
```

<figure>
<img src="../media/img/deutsch_steps.png" />
<figcaption>Circuit for Deutsch-Jozsa</figcaption>
</figure>

# Code

## Algorithm

    namespace DeutschJozsa {
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Measurement;
        open Microsoft.Quantum.Diagnostics;

        operation CheckIfOracleIsBalanced(oracle : ((Qubit, Qubit) => Unit))
        : Bool {
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

        operation RunDeutschJozsaAlgorithm() : Unit {
            Fact(not CheckIfOracleIsBalanced(ApplyZeroOracle),
                "Test failed for zero oracle.");
            Fact(not CheckIfOracleIsBalanced(ApplyOneOracle),
                "Test failed for one oracle.");
            Fact(CheckIfOracleIsBalanced(ApplyIdOracle),
                "Test failed for id oracle.");
            Fact(CheckIfOracleIsBalanced(ApplyNotOracle),
                "Test failed for not oracle.");

            Message("All tests passed!");
        }
    }

## Oracles

    namespace DeutschJozsa {
        open Microsoft.Quantum.Intrinsic;

        operation ApplyZeroOracle(control : Qubit, target : Qubit) : Unit {
        }

        operation ApplyOneOracle(control : Qubit, target : Qubit) : Unit {
            X(target);
        }

        operation ApplyIdOracle(control : Qubit, target : Qubit) : Unit {
            CNOT(control, target);
        }

        operation ApplyNotOracle(control : Qubit, target : Qubit) : Unit {
            X(control);
            CNOT(control, target);
            X(control);
        }
    }

[^1]: shortand for $`| + \rangle \otimes | - \rangle`$
