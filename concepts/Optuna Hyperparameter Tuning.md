# Optuna Hyperparameter Tuning

**Optuna** is an open-source hyperparameter optimization framework for machine learning. It uses efficient search algorithms (like Tree-structured Parzen Estimator — TPE) to find optimal hyperparameter configurations with fewer trials than grid or random search.

## Why Optuna?

| Method | Trials Needed | Efficiency |
|--------|--------------|------------|
| Grid Search | Exponential | Low |
| Random Search | Many | Medium |
| **Bayesian (TPE)** | Fewer | **High** |

## In AEGIS

AEGIS has **17+ interdependent parameters** that are infeasible to tune manually:
- PID gains (Kp, Kd)
- Kalman filter Q/R matrices
- FDI thresholds
- Guidance limits (ACCEL_CLAMP_FACTOR, APPROACH_K, etc.)

### Tuning Process

1. **Define parameter space**: Each parameter gets a range (uniform, log-uniform, etc.)
2. **Objective function**: Run mission director, score landing quality
3. **TPE optimization**: Smartly samples parameter combinations based on past results
4. **Persistence**: Results stored in `logs/optuna.db`

### Example Parameters Tuned

```python
"HOVER_APPROACH_K": trial.suggest_float("hover_approach_k", 0.02, 0.20, log=True)
"HOVER_APPROACH_MAX": trial.suggest_float("hover_approach_max", 5.0, 20.0)
"TERMINAL_APPROACH_K": trial.suggest_float("terminal_approach_k", 0.05, 0.30, log=True)
"TERMINAL_APPROACH_MAX": trial.suggest_float("terminal_approach_max", 2.0, 10.0)
```

### Fitness Function

```
fitness = w1 * (1 / landing_distance) + w2 * (1 / fuel_consumed)
```

Lower landing distance and fuel consumption = higher fitness.

### Automated Pipeline

1. Load standardized KSP save (`aegis_tune_start`)
2. Inject parameters dynamically
3. Run Mission Director
4. Compute fitness from telemetry
5. Store results, repeat

## Related Concepts

- [[Bayesian Optimization]] — The mathematical foundation
- [[Hyperparameter Tuning]] — General ML practice
- [[Tree-structured Parzen Estimator]] — Optuna's default algorithm
- [[Black-box Optimization]] — Optimization without gradient access
- [[Machine Learning]] — Where Optuna is commonly applied

## Sources

- AEGIS Project (`scripts/tune_config_optuna.py`, `scripts/tune_estimator_optuna.py`)
