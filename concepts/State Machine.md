# State Machine

A **State Machine** (or Finite State Machine, FSM) is a mathematical model of computation that can be in exactly one of a finite number of states at any given time. It transitions between states based on inputs and conditions.

## Why State Machines for Control?

Spacecraft missions have distinct phases with different control requirements. A state machine cleanly separates these phases and handles contingencies:

## In AEGIS

The **Mission Director** is a hierarchical state machine managing mission phases:

```
STANDBY
  ↓ (activation)
ASCENT_COAST
  ↓
DEORBIT_BURN
  ↓
HYPERSONIC_COAST
  ↓
SENSOR_WARMUP (new)
  ↓
ESTIMATOR_WARMUP (new)
  ↓
POWERED_DESCENT
  ↓
HOVER_TARGETING
  ↓
TERMINAL_DESCENT
  ↓
LANDED
```

### Contingency Transitions

Any state can transition to:
- **HARD_ABORT** — Catastrophic failure (multiple engine failures, degenerate allocation, vessel destroyed)
- **DT_SPIKE handling** — Skip KF predict, hold FDI, but guidance still runs

### Smart Activation

Instead of starting from `STANDBY`, the Director evaluates current conditions and injects into the appropriate phase:
- Moving upward → `ASCENT_COAST`
- Falling from space → `SENSOR_WARMUP`
- On the ground → `STANDBY`

## Advantages

- **Clear phase separation** — Each state has well-defined entry/exit behavior
- **Explicit contingency handling** — No hidden failure modes
- **Testability** — Each state can be tested in isolation
- **Readability** — Mission logic is easy to follow

## Related Concepts

- [[Control Theory]] — The mathematical basis
- [[Mission Planning]] — Higher-level mission design
- [[Fault Detection and Isolation]] — Triggers state transitions
- [[Real-Time Systems]] — Timing constraints in state transitions

## Sources

- AEGIS Project (`src/main.py`, `src/mission/`)
