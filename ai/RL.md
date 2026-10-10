# Reinforcement Learning (RL)

## REINFORCE (Policy Gradient) Formula
$$ \nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t | s_t) G_t \right] $$
