# Extended Kalman Filter

The **Extended Kalman Filter (EKF)** is a nonlinear extension of the [Kalman Filter](Kalman%20Filter.md) that handles systems with nonlinear dynamics or measurement models. It linearizes the system around the current state estimate using first-order Taylor series expansion (Jacobian matrices) and then applies the standard Kalman Filter equations.

## Core Idea

While the standard Kalman Filter only works for linear systems, the EKF approximates nonlinear systems by linearizing them at each time step. This makes it suitable for real-world problems like navigation, tracking, and robotics where dynamics are rarely perfectly linear.

## AEGIS Application

In the AEGIS project, a **12-state Error-State EKF** is used for state estimation during autonomous landing. It estimates:
- Position (3 states)
- Velocity (3 states)
- Gyroscope bias (3 states)
- Accelerometer bias (3 states)

### Key Features

- **Error-state formulation**: Tracks errors from a nominal state rather than the full state, improving numerical stability
- **Adaptive process-noise scaling**: The velocity-noise block is scaled based on kinematic acceleration magnitude to handle high-thrust transients
- **Sensor fusion**: Combines IMU (gyroscope/accelerometer), altimeter, and velocimeter data
- **Dynamic gravity**: Computed from `body.gravitational_parameter / r²` rather than hardcoded

## The EKF Equations (at a glance)

**Prediction:**
- `x̂ₖ⁻ = f(x̂ₖ₋₁, uₖ)`
- `Pₖ⁻ = Fₖ Pₖ₋₁ Fₖᵀ + Qₖ`

**Update:**
- `Kₖ = Pₖ⁻ Hₖᵀ (Hₖ Pₖ⁻ Hₖᵀ + R)⁻¹`
- `x̂ₖ = x̂ₖ⁻ + Kₖ (zₖ - h(x̂ₖ⁻))`
- `Pₖ = (I - Kₖ Hₖ) Pₖ⁻`

Where `F` and `H` are Jacobian matrices of the process and measurement models.

## Related Concepts

- [[Kalman Filter]] — The linear version of the EKF
- [[Mahony Complementary Filter]] — Used alongside the EKF for attitude estimation in AEGIS
- [[State Estimation]] — The broader field
- [[Sensor Fusion]] — Combining multiple sensor sources
- [[Quaternion Attitude Representation]] — Common in aerospace state estimation

## Sources

- AEGIS Project (`src/estimation/ekf.py`)
- Cornman, L. & Mei, G. *Extended Kalman Filtering*. Stanford University.