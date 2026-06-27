# Reinforcement Learning

Reinforcement Learning (RL) is one of the three fundamental [[machine learning]] paradigms, alongside [[supervised learning]] and [[unsupervised learning]]. It focuses on how an intelligent agent should take actions in a dynamic environment to **maximize a reward signal**.

## Core Concept

The typical RL setup involves:
- An **agent** that takes actions
- An **environment** that responds to those actions
- A **reward signal** and **state representation** that are fed back to the agent

## Key Elements

| Component | Description |
|-----------|-------------|
| **State Space (S)** | The set of all possible environment and agent states |
| **Action Space (A)** | The set of all possible actions the agent can take |
| **Transition Probability** | The probability of moving from state `s` to `s'` under action `a` |
| **Reward Function** | The immediate reward received after a transition |

## The Exploration-Exploitation Dilemma

A central challenge in RL is balancing:

- **Exploration** → Trying new actions to learn more about the environment
- **Exploitation** → Using current knowledge to take the best-known action

Common approaches include **ε-greedy** methods, where the agent explores randomly with probability `ε` and exploits its current knowledge with probability `1-ε`.

## Key Algorithms

- **Q-learning**
- **Policy Gradient methods**
- **SARSA**
- **Temporal Difference (TD) learning**
- **Multi-agent/Self-play**

## Applications

RL has been successfully applied to:
- **Games**: Backgammon, checkers, Go ([[AlphaGo]])
- **Robotics**: Robot control
- **Autonomous systems**: Self-driving cars
- **Energy**: Energy storage optimization, solar power generation

## Why It's Powerful

Two key features make RL effective:
1. **Sample-based optimization** — learning from interactions rather than requiring complete models
2. **Function approximation** — handling large or infinite state spaces

## Connection to Psychology

RL draws parallels to **animal learning** — animals learn behaviors that maximize positive reinforcements (food, pleasure) and minimize negative ones (pain, hunger). This is closely related to [[Operant conditioning]] and [[Reinforcement]] in psychology.

## Sources

- [[Wikipedia - Reinforcement Learning]]
