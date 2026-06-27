# Mahony Complementary Filter

The **Mahony Complementary Filter** is a nonlinear complementary filter for attitude estimation on the special orthogonal group SO(3). It fuses gyroscope and accelerometer data to produce an orientation estimate without using a full Kalman filter, making it computationally efficient for embedded systems and real-time applications.

## Core Principle

Complementary filters combine:
- **High-frequency data** (gyroscope integration — accurate short-term, drifts long-term)
- **Low-frequency data** (accelerometer gravity reference — noisy but doesn't drift)

The filter "complements" these two sources: gyroscopes for fast dynamics, accelerometers for slow drift correction.

## Mahony Filter Equations

Attitude is represented by a quaternion `q`. The filter:

1. Integrates gyroscope data to propagate attitude
2. Compares predicted gravity direction with measured accelerometer gravity
3. Computes an error that feeds back to correct gyroscope bias

```
q̇ = ½ * q ⊗ [0, ω]
ω_corrected = ω_measured + Kp * error + Ki * ∫error
```

Where:
- `ω` is angular velocity (rad/s)
- `Kp`, `Ki` are proportional and integral gains
- `error` is the cross product between predicted and measured gravity vectors

## In AEGIS

The Mahony filter is used **alongside the EKF** for attitude estimation:

- **EKF** estimates: position, velocity, gyro/accel bias (12 states)
- **Mahony filter** estimates: attitude quaternion (4 states)

### Key Integration Points

- The EKF provides **bias-corrected gyroscope rates** to the Mahony filter
- The Mahony filter provides the **attitude quaternion** for rotating body-frame acceleration into the NED frame
- This separation avoids the small-angle approximation and allows large-angle maneuvers

### Initialization

During `SENSOR_WARMUP` phase:
- Mahony filter initialized from kRPC truth attitude (eliminates ~1s identity-start convergence)
- Gyroscope and accelerometer biases accumulated
- After warmup, EKF bias covariances tightened with estimated biases

## Advantages Over EKF for Attitude

| Aspect | EKF | Mahony Filter |
|--------|-----|---------------|
| Computational cost | Higher (covariance propagation) | Lower (single integration step) |
| Tuning complexity | High (Q/R matrices) | Low (2 gains: Kp, Ki) |
| Convergence | May need careful initialization | Fast, robust |
| Bias estimation | Built-in | External (provided by EKF) |

## Related Concepts

- [[Extended Kalman Filter]] — The main state estimator in AEGIS
- [[Error-State Kalman Filter]] — The specific EKF formulation used
- [[Sensor Fusion]] — Combining multiple sensors
- [[Quaternion]] — Attitude representation
- [[Gyroscope]] — Angular velocity measurement
- [[Accelerometer]] — Linear acceleration measurement

## Sources

- AEGIS Project (`src/estimation/mahony_estimator.py`)
- Mahony, R., Hamel, T., & Pflimlin, J. *Nonlinear Complementary Filters on the Special Orthogonal Group*. IEEE Transactions on Automatic Control, 53(5), 1203–1218, 2008.
