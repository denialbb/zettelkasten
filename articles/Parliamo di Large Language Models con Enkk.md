---
date: "\\[2023-12-21 Thu 06:16\\]"
id: b6a81b5c-9cf8-43cd-8021-d53e571896af
title: Parliamo di Large Language Models con Enkk
---

- Source: <https://www.youtube.com/watch?v=zNLEdfZlcQI>
- Channel: Datapizza
- Related: [[Artificial Intelligence]], [[LLM]], [[Gemini]]

# Notes

- data leakage from the test-sets into LLM training
  - this skews the benchmarks
- Gemini
  - benchmarks w/ `MMLU`
    - multiple choice tests are entirely different from human interaction and the way these models are used
    - *uncertainty-routed chain-of-thought*
    - `CoT@32`
      - the question is asked N times and the majority wins
  - chain-of-thought
    - ask the model to generate more text, steps
    - the steps are sharper and the output gets more accurate
    - could be N-shot or Zero-shot
- leader-board benchmark
  - users vote for winner in an anonymous match between models for a prompt
  - elo system
- what are these systems for:
  - **supervised data transformation**
