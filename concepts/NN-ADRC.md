# NN-ADRC

**NN-ADRC** (Neural Network - Active Disturbance Rejection Control) is an advanced control architecture that combines:
- **ADRC** — A model-free control approach that estimates and rejects disturbances in real-time
- **Neural Network** — A learned compensator that predicts optimal counter-actions for known disturbance patterns

## Active Disturbance Rejection Control (ADRC)

ADRC treats all disturbances (unknown dynamics, external forces, actuator failures) as a single "total disturbance" and estimates it in real-time using an **Extended State Observer (ESO)**.

### Extended State Observer (ESO)

The ESO extends the system state with an additional state representing the total disturbance:

```
ẋ = Ax + Bu + Bd*d
```

Where `d` is the total disturbance. The ESO estimates distant and its derivatives, allowing the controller to cancel it.

### fal() Nonlinearity

The ESO uses a nonlinear function `fal()` (fast function) instead of a simple linear observer:

```
fal(e, α, δ) = e / δ^(1-α)    if |e| ≤ δ
               sign(e)|e|^α    if |e| > δ
```

This provides faster convergence for large errors while maintaining smoothness near zero.

## Neural Network Compensator

The NN is trained to predict the compensatory acceleration `Δr̈` needed for specific failure patterns:

- **Input**: `[position, velocity, acceleration]`
- **Output**: `Δr̈` (6-DOF compensatory acceleration)
- **Training**: Levenberg-Marquardt backpropagation on data from "Gremlin" script (random engine kills)

## In AEGIS (Planned)

### Phase 1 ✓ (Complete)
Quaternion PD attitude control with inertia-scaled torque. ESO scaffolding with `fal()` and parameter stubs.

### Phase 2 (Planned)
- **Transient Profile Generator (TG)**: Smooths target-state jumps into dynamically feasible trajectories
- **WSEF**: Computes `u₀ = k₁(v₁ − z₁) + k₂(v₂ − z₂)`, `u = (u₀ − z₃)/b₀`
- **NN Compensator**: Feedforward NN for failure compensation
- **Fallback**: NN clamped to `[-clamp, +clamp]`; triggers zero NN → pure ADRC

### Phase 3-5
- Control Allocator integration
- FDI adaptation to monitor ESO disturbance and NN output
- NN training via automated "Gremlin" failures

## Key Risk

The source paper (gimbal system) validated on **smooth, continuous disturbances** (cable drag, friction). AEGIS failures are **discrete step-functions** (instant engine death) — an out-of-distribution case requiring fallback mechanisms.

## Related Concepts

- [[Active Disturbance Rejection Control]] — The broader ADRC field
- [[Extended State Observer]] — Core ADRC component
- [[Neural Network]] — The learning component
- [[Control Allocation]] — Where NN output is integrated
- [[Fault Detection and Isolation]] — Monitors NN and ESO signals
- [[Extended Kalman Filter]] — The current state estimator (to be augmented)

## Sources

- AEGIS Project (`docs/NN-ADRC/`, `src/guidance/adrc.py`)
- Leblebicioglu, K. et al. *NN Based Active Disturbance Rejection Controller for a Multi-Axis Gimbal System*.
