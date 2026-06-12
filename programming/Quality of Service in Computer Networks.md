---
date: "\\[2023-02-27 Mon 10:57\\]"
id: 66f28b61-8380-4480-9cb4-43cf319d6e9a
title: Quality of Service in Computer Networks
---

# Components & Modules

- time-space multiplexer

# Homogeneous Markov Processes

For **irreducible aperiodic** `MC`
``` math
p_{j} = \sum_{i\in S} p_{i}P_{ij}  \quad \forall j\in S
```

Global balance
``` math
\sum_{i \in S / \{j\}}} p_{i}p_{j}
```

## Non-stationary case

Probability density $`q`$ are elegant solution to have simpler equations, independent of time-scale.

- assuming transition probabilities where we zoom on the time axis to where the transition is smooth
  - can be approximated to a linear function
  - \$$`p_{ij}(s)=q_{ij}\cdot s + o(s) \quad j\neq i`$

**Conditional** and **absolute** transition probability:
``` math
p_{ik}^{\star}(s)=p_{i}(t)\cdot p_{ik}(s)
```

**Kolmogoroff Equation**

## Stationary case

``` math
p_{X}= \lim_{t\to \infty}p_{X}(t)
```
``` math
\lim_{t\to\infty\}]

Statistical equilibrium for the states:
\[q_{k}p_{k}=\sum_{i\neq k} q_{ik}\cdot p_{i}
```

**Generalised** state equations:

You can generalize a set of state to abstract into a single bigger markov state that includes them.

# Communication Traffic as Random Process

In formulas $`t`$ and $`\Delta t`$ are interchangeable.

## State process

## Call process

## End process

# One-dimensional birth-death processes

∑ P<sub>i</sub> = 1  
\end To not have $`n`$ members to the equations we use a generalised state $`S_x`$ and consider only the interactions with the interactions with the neighbours crossing its limits. Local balance:
``` math
\lambda_x P_x = \mu_{x+1}P_{x+1}
```
``` math
P_x = P_0 \prod_{i=1}^{x}\frac{\lambda_{i-1}}{\mu_i}
```
where the product is defined as
``` math
L_x
```
,
``` math
L_0=1
```

``` math
\sum_x P_x = P_0 \cdot \sum_x L_x = 1 \iff P_0 = \frac{1}{\sum_{x}L_x}
```
``` math
P_x = \frac{L_{x}}{\sum_i L_i}
```

# Process for unlimited number of traffic sources

Definition of *announcement*:
``` math
\lambda \cdot h =: A
```
**Erlang-equation**:
``` math
P_x=\frac{}{}]

Definition of /loss probability/:[fn:loss: This is the probability that the network is full.]
\[B := P_n = \frac{\frac{A^{n}}{n!}}{\sum_{i=0}^{n}\frac{A^{i}}{i!}}
```
*Expectation value* is calculated over all probabilities.
``` math
E\{n}\}
```
*Traffic intensity*
``` math
Y =
```
*Residual traffic*
``` math
R= Y - A = A\cdot B
```

# Queues with Priorities

Priorities for tasks and each one has a service rate in the `CPU`. The network is basically a `M/G/1`. Can have preemptive or non-preemptive priorities.

By applying the non-preemptive model in the case of 2 priority classes the result is that to save time compared to a basic `M/G/1`:
``` math
x_2 > x_1
```
Meaning the longest jobs need to be placed in the lowest priority class of the network.

# Queueing Networks

A network of queues can be computed by computing independently the single queues based on some assumptions. **Kleinrock's Independence Assumption**, 4 conditions

1.  packet streams at the inputs of the network are Poisson distributed
2.  packet length exponentially distributed
3.  no dependency between arrival time of a packet in the next queue and its service times
4.  the nodes of the network are sufficiently close to each other

In general this assumption gives a good first approximation of the network, it is well known that the `OWTT` is overestimated using this independence assumption.

**Jackson network** helps find exact solutions under certain conditions. This is the case assuming the first 3 conditions of the Kleinrock's assumption. These networks are called product networks[^1] or [[Tandem Queues]]. In these networks packets can go through the network (and spend each queue delay time as well) multiple times. So in addition to the delay for the independent queues one needs to compute an average of passes for a packet stream through the network.

# Quality of Service in Computer Networks

Show that `QoS` and *anonimity* and *privacy* are in constant tension. The contract signing needs to be fair (*fair exchange*). For a pair of agents, both must succeed or both must fail. There are limitations to network security:

- impossibility of consensus
- asynchronous setting

Solution can be a **Trusted Third Party** (`TTP`)

- it is a bottleneck
- should be fair
- should be timely
- receives signatures and distributes the contracts

`TTP` can

- issue a replacement contract
- issue an abort token
- acts only when requested

# Anonymity

- Chaum's MIX, anonymous email[^2]
  - bad for spam of course
  - the `MIX` stands between senders and receivers and masks direct communications, to an attacker the `MIX` will look like flows of incoming and outgoing messages
    - it needs *traffic padding* and *buffering* to prevent timing correlation attacks
  - this protocol allows *secrecy* without *authentication* where $`A`$ knows it is talking with $`B`$ but $`B`$ does not know, it simply responds to the `MIX` using fresh public keys generated by $`A`$.
  - the adversary needs to control all cascade mixes, one good mix is enough for anonymity
- Dining cryptographers[^3]
  - information-theoretic anonymity
  - needs incredible amount of randomness, unpractical
  - we need $`n`$ bits to in the end broadcast a single bit

[^1]: This name is due to the fact that the queues remain statistically independent of each other, and can therefore be concatenated using the logical AND (product).

[^2]: "Untraceable electronic mail, return addresses, and digital pseudonyms", Communications of the ACM, 1981

[^3]: "The dining cryptographers problem: unconditional sender and recipient untraceability", Journal of Cryptology, 1988
