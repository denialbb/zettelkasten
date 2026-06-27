---
date: "2026-06-27T12:48:38+02:00"
title: "[Full Workshop] Reinforcement Learning, Kernels, Reasoning, Quantization & Agents — Daniel Han"
---

- Source: <https://www.youtube.com/watch?v=OkEGJ5G3foU&list=PLMb7wdZlrhtI&index=6>
- Author: [[AI Engineer]], [[Daniel Han]]
- Related: [[Videos]], [[Reinforcement Learning]]

---

## Summary

**Key takeaways from Daniel Han’s workshop on RL & Quantization**

- **RL’s rising prominence** – Unlike LLMs that hit scaling limits, RL is emerging as a _bridging technology_ that can steer large models toward better task‑specific performance.
- **LLM training stages** – Pre‑training → fine‑tuning → RLHF. Each stage has distinct objectives and constraints; RL is the final calibration step that learns a _reward model_ from human feedback.
- **Reward functions vs. reward models** – A reward _function_ is a hand‑crafted formula, while a reward _model_ is learned via supervised learning. The latter allows RL to adapt to nuanced, multi‑dimensional objectives.
- **Policy optimization algorithms** – Explained Proximal Policy Optimization (PPO) and its improved variant GRPO (gradient‑based RPO). Trade‑offs include entropy regularization, clipping, and how GRPO reduces variance.
- **Quantization for deployment** – Demonstrated that Dense models (e.g., DeepSeek‑R1) can be compressed to 1.58‑bit and still retain >95 % accuracy for many benchmarks. Key techniques:
  1. Dynamic vs. static quantization
  2. Weight‑bias clustering
  3. Mixed‑precision scheduling during inference
- **Future GPU landscape** – With model sizes and memory foot‑print constantly increasing, the bottleneck will shift from **compute** to **data‑movement**. Gas‑efficient, sparsity‑aware hardware (e.g., NVIDIA H100, custom ASICs) will be pivotal.
- **Hands‑on demo with Unsloth** – Practical walkthrough of data preparation, hyper‑parameter tuning, and RL training using the open‑source Unsloth library. Highlights include:
  - Automatic dataset download and tokenization
  - PPO/GRPO training loop integration
  - Real‑time logging & visualization with Weights & Biases
- **Takeaway for practitioners** – Start small: prototype RL policies on a compressed model, evaluate on a sandbox env, and only then scale up to full‑size LLMs.

---

**High‑level action items**

- Re‑examine your reward design: consider a _learned_ reward model.
- Prototype quantization on your baseline model early to catch precision‑related issues.
- Integrate Unsloth or a similar framework if you plan to experiment with RL at scale.
- Evaluate mixed‑precision strategies against your GPU budget; adjust batch sizes accordingly.
- Keep an eye on upcoming GPU architectures; early‑adopters can gain competitive advantage in RL‑based AI deployments.

## Transcript

**Selected transcript snippets (verbatim with timestamps)**

- **00:00 – 03:25** Introduction and Unsloth’s Contributions
- **03:25 – 09:47** The Evolution of Large Language Models (LLMs)
- **09:47 – 16:56** LLM Training Stages and Yann LeCun’s Cake Analogy
- **16:56 – 23:17** Agents and Reinforcement Learning Principles
- **23:17 – 48:12** PPO and the Introduction of GRPO
- **48:12 – 51:22** Reward Model vs. Reward Function
- **51:22 – 01:08:50** The Math Behind the Reinforce Algorithm
- **01:08:50 – 01:16:29** PPO Formula Breakdown
- **01:16:29 – 02:00:20** GRPO Deep Dive
- **02:00:20 – 02:33:07** Practical Implementation and Demo with Unsloth
- **02:33:07 – 02:41:59** Quantization and the Future of GPUs
- **02:41:59 – END** Conclusion and Call to Action

## Notes

- [[Y LeCun]] 2016
  - [[Self-Supervised Learning]] - cake genoise
    - machine predicts any part of its input for any observed part
    - millions of bits per sample
  - [[Supervised Learning]] - icing
    - machine predicts a category or a few numbers for each input
    - predicting human-supplied data
    - 10-10k bits per sample
  - [[Reinforcement Learning]] - cherry
    - machine predicts a scalar reward given once in a while
    - few bits for some samples
- Training Stages
  - Base
    - PT
  - Chat
    - IT / Instruct
- Finetuning everywhere
  - Pre Training
    - mid training
  - [[SFT]]
    - Preference, [[DPO]], [[RLHF]]
  - Post Training
    - Reinforcement, [[RLVR]]
- move in n-dimensional space from a random place towards the final goal point[^1]
  - this is all a optimization problem, to get to this place easier
- Agents in the old sense
  - environment -> action -> reaction -> reward
    - environment is the inference space
    - the agent seeks the reward and move towards the target
- with LLMs there is no history[^2]
  - we can delete the lines going ahead
  - reward functions design to guide the training
  - [[RL]] you want the good to appear more and bad less
    - if the question is complicated
- [[PPO]]
  - optimization algorithm
  - Training data
  - Agent
    - Generating policy - updated model
    - Preference policy - base model
    - Value model
  - Reward Model -> reward -> feedback to the agent
- [[GRPO]]
  - from DeepSeek R1
  - get rid of the value model
- with RL we want to bring out capabilities that maybe are already there in the
  model
  - make the desired behavior more probable
- Ground Truth Reward
  - LLM as a judge
  - Regex check
  - Format check
  - Executable code
  - confusingly random rewards work
- in RL you don't actually know the answer
  - this is different from PT
- Reinforce Algorithm
  - Total Gradient = Calc Gradient | Policy LLM | Action State | Reward[^3]
  - $\nabla_W \log P(\text{action}|\text{state}) \times \text{reward}$[^4]
  - derivative W of log of P(action|state) x reward

[^1]: This abstract framing ignores the non-convexity and high variance inherent in policy gradient methods.
[^2]: This contradicts the autoregressive nature of LLMs, where each token explicitly conditions on the history of previous tokens.
[^3]: This notation is non-standard and lacks mathematical precision.
[^4]: This represents a single-sample stochastic gradient estimator. The true total policy gradient requires an expectation over trajectories: $\mathbb{E}_{\tau \sim \pi}[\sum_t \nabla_W \log \pi(a_t|s_t) \cdot R(\tau)]$.
