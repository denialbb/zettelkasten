---
author: Aho, Lam, Sethi, Ullman
id: 5a05dcd1-f5ac-4c68-8a70-9727c9978955
title: "Compilers: Principles Techniques and Tools"
---

A Compiler reads a program in a Source Language and translates it in a target language ![](~/Pictures/screenshots/compiler.png)

- Compiler translates
- Linker resolves external mamory addresses
- Loader puts together object files into memory

# Compiler

![](~/Pictures/screenshots/compilerProcess.png)

## Analysis

### Lexical analysis \| Scanning

The `Lexer` groups character, the `Lexical Analyzer` outputs Tokens for each Lexem. The token are then used by the `Syntax Analyzer` to get information from the `symbol-table`

1.  Lexemes

    Meaningful groups of characters

2.  Tokens

    \<token-name,attribute-value\>

## Synthesis
