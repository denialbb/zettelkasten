---
date: "\\[2022-04-15 Fri 00:13\\]"
id: 0cb7ffff-dc77-485a-80c6-872386ca0713
title: RSA
---

# Algorithm

1.  choose $`p`$ and $`q`$ primes
    - `Miller-Rabin`
2.  calculate modulo $`n = pq`$
3.  choose $`e < (p-1)(q-1)`$ such that $`\text{gcd}(e,(p-1)(q-1))=1`$
4.  calculate \$d=e<sup>-1</sup> (p-1) (q-1)\$[^1]
    - private key
5.  $`K^{+} = <e,n>`$ — $`K^{-} = <d,n>`$

# Usage

- Cypher: $`c = m^{e} \mod n`$
- Decypher: $`m = c^{d} \mod n`$

$`\textsc{Proof}`$ using **Euler's Theorem**[^2], modulo used is $`n`$:

while, with $`ed`$ the *multiplicative inverse* of the private key :

we can conclude

Example with *Bob* and *Alice*:

- modulus $`p`$ and base $`g`$ are agreed publicly
- $`a`$ private Alice key
- $`A`$ public Alice key
  - $`A= g^{a} \mod p`$
- $`b`$ private Bob key
- $`B`$ public Bob key
  - $`A= g^{b} \mod p`$

# Security

- **hard** - decypher without knowing $`d`$
- **hard** - calculating $`d`$ knowing $`e, n`$ without knowing $`p,q`$
- **hard** - calculating $`p,q`$ knowing $`n`$, with $`n`$ sufficiently big (at least 1024 bits)

[^1]: The algorithm used is **Generalized Euclid's Algorithm**,

[^2]: for $`p,q`$ primes: $`\phi(n) = \phi(p\cdot q) = (p-1)\cdot(q-1)`$
