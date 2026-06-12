---
date: "\\[2022-03-09 Wed 17:27\\]"
id: ad07cbed-5c0b-448c-861e-3f8ee80e6803
roam_aliases: DES
title: Data Encryption Standard
---

Cifrario simmetrico moderno,

- pubblicato nel 1977 dal *National Bureau of Standards*
- piú diffuso fino al 2002
  - sostituito da [[Advanced Encrytion Standard]]
- basato su [[Diffusione e Confusione]]
- **block cipher**
  - piú analizzati degli **stream cipher**, sembrano piú applicabili

# Caratteristiche

- chiavi da 56 bit
  - solitamente estese a 64 bit con bit di paritá
  - *key schedule* per i round
- 16 round
- efficiente
- noti solo attacchi di *brute force*

Struttura simile al [[Feistel Cipher]], ne differische solo nell'uso di una permutazione iniziale $`\text{IP}`$ e una permutazione finale $`\text{IP}^{-1}`$ o $`\text{FP}`$ *final permutation* .

- queste permutazioni non hasso significato a livello crittografico: sono prederminate
- non é chiaro il perché della loro incrusione nell'algoritmo

``` math
\textsc{des}(T,K) = C
```

- $`T`$ é plaintext 64 bit
- $`K`$ é la chiave
- $`C`$ é il ciphertext

![](../media/img/DES.png)

La sue debolezze sono:

- lunghezza delle chiavi
- algoritmo

Che lo rendono vulnerabile ad attacchi *brute force*

Questo é risolvibile con `Double DES` o `Triple DES`.

- applicare `DES` piú volte allo stesso blocco, raddoppiando la lunghezza della chiave
