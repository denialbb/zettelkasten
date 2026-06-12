---
date: "\\[2024-06-06 Thu 19:34\\]"
id: 1279b590-79e1-4c28-b046-29fd8f556f39
title: Parsing English in 500 Lines of Python
---

- Source: <https://explosion.ai/blog/parsing-english-in-python>
- Author: Matthew Honnibal
- Related: [[Tecnologie del Linguaggio Naturale]], [[Python]], [[Artificial Intelligence]], [[NLP]]

# Notes

> They ate the pizza with anchovies

- correct parsing links *with* to *pizza*
- incorrect parsing links *with* to *eat*

![](https://explosion.ai/blog/anchovies_parse.svg)

- implementation: <https://gist.github.com/syllog1sm/10343947>
- idea: should be slightly easier to reason from the parse
  - `parse-to-meaning` mapping simpler than `string-to-meaning` mapping
