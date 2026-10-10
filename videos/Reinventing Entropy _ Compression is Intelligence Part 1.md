---
date: "2026-07-02T13:36:18+02:00"
title: "Reinventing Entropy | Compression is Intelligence Part 1"
---

- Source: <https://www.youtube.com/watch?v=l6DKRf-fAAM>
- Author: [[3Blue1Brown]]
- Related: [[Videos]]

---

## Summary

**Key Takeaways from \\"Reinventing Entropy | Compression is Intelligence Part 1\\"**

- **Compression ↔ Information** – The video frames compression as a way to _measure_ the amount of useful information in a string. A perfectly compressed file contains no redundancies; the remaining bits encode all the predictable structure.
- **Shannon’s entropy** – Shannon’s classic definition of entropy is introduced as the expected number of bits needed to encode a message if we always choose the shortest possible code for the most probable symbols.
- **Language is a stochastic process** – Words, characters, and even syntax have probabilistic patterns. The more predictable a language is (i.e., the lower its entropy), the better we can compress it.
- **Compression and AI** – Modern language models are essentially **predictive compressors**. They learn the probability distribution of next symbols, and a better model compresses “speech transcripts” more tightly. In this sense _intelligence_ is the ability to compress future data streams.
- **Warm‑up example** – A toy sequence is compressed step‑by‑step to show how knowing the next symbol changes the code length. The more context, the shorter the code.
- **Predictive power ↔ data efficiency** – The video links the success of models like GPT-3 to their ability to attain nearly optimal compression rates. Its accuracy on real‑world tasks reflects how close it comes to the entropy limit of language.
- **Practical implications** – If we could measure a document’s compressibility, we could quantify how much _information_ actually lives in it and how “compressible” a model might be. It also gives a way to detect over‑fitting or missing structure in training data.
- **Next steps** – The video hints at further exploration of entropy in different languages, the geometry of information flow, and how these ideas underpin the next generation of AI systems.

**Bottom line:** Think of intelligence as an entity’s capacity to turn future data into the smallest possible representation. Compression isn’t just storage; it’s a window into learning, prediction, and the fundamental limits of communication.

## Transcript

...

## Notes

- Is there a limit to how much we can compress text without losing information
- ascii inefficient
- neural network can get 1.1 bit per-character
  - how much better can we get
- _cross-entropy loss_
  - "compression and entropy are mathematically the same thing"
  - "Compression is Intelligence"

### Robot example

- 1/2 -> up
- 1/8 left 1/8 right
- 1/4 down

Encodings

- naive 2 bits per instruction
- clever
  - 1 bit up, 2 bit down, 3 bits left or right
  - 1.8 bits per instruction

### Perfect Compression

- looks like random noise
- the clever implementation actually looks like random noise
- every bit has the same probability
- P(any n-bit message) = 1/2^n

### Information

- -log_2(p)=n
  - fundamental formula of information theory
  - Information on an event

### Information Theory

- the information of a message informs us on the lower bound of its compression
- duplicate Betty experiment
  - Shannon asks his wife to guess the next letter of the book he is reading
  - if she guesses wrong he transcribes the right letter
  - if she guesses right he transcribes a -
  - this final message encodes all the information of the book with far less
    letters to Betty
- Shannon tried to find the mean information of the English language

### Entropy

- any signal, sequence of symbols
- entropy asks of the average information of each symbol
- sum of the information of each symbol
- gives you a lower bound of how efficiently you can encode a signal
- Noiseless Coding Theorem
