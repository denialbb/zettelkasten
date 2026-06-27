# Quaternion Attitude Control

**Quaternion-based attitude control** uses [Quaternions](Quaternion.md) (4-element hypercomplex numbers) to represent 3D orientation and rotation, avoiding the singularities and gimbal lock issues of Euler angles.

## Why Quaternions?

| Representation | Issues |
|----------------|--------|
| Euler angles | Gimbal lock, discontinuity at ±180°, order-dependent |
| Rotation matrices | 9 elements (redundant), numerical drift |
| **Quaternions** | Compact (4 elements), singularity-free, easy interpolation |

## In AEGIS

The guidance controller uses a **quaternion-based PD attitude controller** with inertia-scaled torque:

### Key Equations

**Quaternion error** (from Elbeltagy et al.):
```
q_error = q_target ⊗ q_current⁻¹
```

**PD Control Law**:
```
τ = Kp * q_error_vector + Kd * ω_error
```

Where:
- `Kp = ωn²` (proportional gain from natural frequency)
- `Kd = 2ζωn` (derivative gain from damping ratio)
- `ω` is angular velocity

**Inertia-scaled torque** (ADR-028):
The torque is scaled by the vessel's full 3×3 inertia tensor, accounting for the actual mass distribution rather than assuming spherical symmetry.

## Features

- **Natural frequency / damping ratio tuning**: Standard aerospace parameterization
- **Gyroscopic feedforward**: Compensates for angular momentum coupling
- **Inertia tensor full 3×3**: Accounts for asymmetric mass distribution

## Related Concepts

- [Quaternion](Quaternion.md)
- [[PID Controller]] — The broader family of controllers
- [[Attitude Dynamics]] — Physics of rigid body rotation
- [[Spacecraft Control]] — Aerospace control applications
- [[Extended Kalman Filter]] — State estimation for attitude

## Sources

- AEGIS Project (`src/guidance/controller.py`)
- Elbeltagy, A. et al. *Quaternion-Based Tracking Control Law Design for Tracking Mode*.
