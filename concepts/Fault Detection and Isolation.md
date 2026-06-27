# Fault Detection and Isolation

**Fault Detection and Isolation (FDI)** is the process of detecting when a system component has failed, determining which component failed, and isolating it so the system can adapt.

## In AEGIS

The FDI module serves as the system's "diagnostic nervous system." It continuously monitors the health of the engine cluster and triggers contingency responses when failures are detected.

### Detection Logic

1. **Expected acceleration**: Computed from commanded throttle and known vessel mass
2. **Measured acceleration**: Provided by the State Estimator (EKF)
3. **Comparison**: If deviation exceeds `FDI_THRESHOLD = 3.0` for 50 consecutive ticks, a fault is declared

### Isolation

Once a fault is detected, the FDI **brute-forces failure combinations** to identify which specific engine has failed. It tests all possible subsets:
- Single engine failure
- Double engine failure
- etc.

It matches the predicted acceleration signature of each combination against the measured deviation to isolate the failed engine(s).

### Contingency Response

| Fault Severity | Response |
|----------------|----------|
| Single engine failure | FDI flags engine, allocator remaps around it |
| 2+ simultaneous failures | `HARD_ABORT` |
| Degenerate allocation | `HARD_ABORT` |
| DT spike (game lag) | Skip KF predict, hold FDI, guidance still runs |

### Future: NN-ADRC Integration

The planned NN-ADRC will change FDI logic:
- Monitor **ESO disturbance estimate `z₃`** for sudden spikes (discrete actuator failure)
- Monitor **NN compensatory output `Δr̈`** for persistent non-zero values (permanent engine loss)

## Related Concepts

- [[Control Allocation]] — Remaps around failed engines
- [[State Estimation]] — Provides measured acceleration
- [[Extended State Observer]] — Future FDI monitoring source
- [[Neural Network Compensator]] — Masks acceleration deviations
- [[Redundancy Management]] — System-level fault tolerance

## Sources

- AEGIS Project (`src/fdi/fdi.py`)
