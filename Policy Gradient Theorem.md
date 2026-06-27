---
date: "2026-06-27T15:12:47+02:00"
title: "Policy Gradient Theorem"
---

- Related: [[Reinforcement Learning]], [[RL]], [[PPO]]

## The Core Problem
In Reinforcement Learning, we want to maximize the expected total reward, denoted as $J(\theta)$. 
The objective function is defined as:
$$ J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} [R(\tau)] $$
where $\tau$ is a trajectory (a sequence of states and actions), $\pi_\theta$ is our policy parameterized by $\theta$, and $R(\tau)$ is the total reward of that trajectory.

To maximize this, we need the gradient of the objective with respect to our parameters: $\nabla_\theta J(\theta)$.

## The Dilemma
The expected return depends on two things:
1. Our policy $\pi_\theta(a|s)$ (which we control).
2. The environment's transition dynamics $P(s'|s,a)$ (which we do **not** know and cannot differentiate).

If we naively try to take the derivative of the expectation, we run into the problem that the distribution of trajectories itself depends on $\theta$. 

## The Theorem
The Policy Gradient Theorem proves that we can compute the gradient of the expected return **without** knowing the derivative of the state distribution (the environment dynamics). 

The gradient elegantly simplifies to:
$$ \nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t | s_t) R(\tau) \right] $$

## The Derivation (Log-Derivative Trick)
The proof relies on a simple calculus trick.
1. **Expand the expectation into a sum over all trajectories:**
   $$ \nabla_\theta J(\theta) = \nabla_\theta \sum_{\tau} P(\tau | \theta) R(\tau) = \sum_{\tau} \nabla_\theta P(\tau | \theta) R(\tau) $$
2. **Apply the log-derivative trick:** 
   Recall that $\nabla_x \log f(x) = \frac{\nabla_x f(x)}{f(x)}$, which means $\nabla_x f(x) = f(x) \nabla_x \log f(x)$.
   Substitute this into our equation:
   $$ \sum_{\tau} P(\tau | \theta) \nabla_\theta \log P(\tau | \theta) R(\tau) = \mathbb{E}_{\tau \sim \pi_\theta} [ \nabla_\theta \log P(\tau | \theta) R(\tau) ] $$
3. **Decompose the trajectory probability:**
   The probability of a trajectory is the product of initial state probability, policy probabilities, and environment transition probabilities:
   $$ P(\tau | \theta) = P(s_0) \prod_{t=0}^{T} \pi_\theta(a_t | s_t) P(s_{t+1} | s_t, a_t) $$
4. **Take the log:**
   The product becomes a sum:
   $$ \log P(\tau | \theta) = \log P(s_0) + \sum_{t=0}^{T} \log \pi_\theta(a_t | s_t) + \sum_{t=0}^{T} \log P(s_{t+1} | s_t, a_t) $$
5. **Take the gradient:**
   Because the initial state and environment dynamics do not depend on $\theta$, their derivatives are **zero**. This is the crucial step. They vanish entirely:
   $$ \nabla_\theta \log P(\tau | \theta) = \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t | s_t) $$

## Why this is brilliant
- We completely bypassed the environment dynamics.
- We only need to differentiate our own policy network.
- This formula mathematically justifies trial-and-error: we run trajectories in the environment, collect rewards $R(\tau)$, and push the log-probabilities of the actions we took up or down proportional to the reward received.
