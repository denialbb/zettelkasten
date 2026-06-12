---
date: "\\[2022-03-09 Wed 17:35\\]"
id: aae9177d-7c30-4144-a42a-eb38cc7d5c90
title: Feistel Cipher
---

![](../media/img/feistel-cipher.png)

For the singular step, with a broader view: ![](../media/img/feistel16.jpg)

The most important parts of this approach:

- number of rounds
  - more rounds = harder cryptanalysis
- design of the function $`F`$
  - best if nonlinear
  - should have good *avalanche* properties
    - *strict avalanche criterion* - `SAC`
    - *bit independence criterion* - `BIC`
- key schedule algorithm
