# Reinforcement Learning with Verifiable Rewards (RLVR)

## Group Relative Policy Optimization (GRPO) Objective
$$ L(\theta) = \mathbb{E} \left[ \frac{1}{G} \sum_{i=1}^G \left( \min\left(\frac{\pi_\theta(a_i|s)}{\pi_{\text{old}}(a_i|s)} A_i, \text{clip}\left(\frac{\pi_\theta(a_i|s)}{\pi_{\text{old}}(a_i|s)}, 1-\epsilon, 1+\epsilon\right) A_i\right) - \beta D_{KL}(\pi_\theta \| \pi_{\text{ref}}) \right) \right] $$

where advantages are group-normalized: 
$$ A_i = \frac{R_i - \text{mean}(\{R_1, \dots, R_G\})}{\text{std}(\{R_1, \dots, R_G\})} $$
