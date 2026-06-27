# 6-DOF Control

**6-DOF Control** (Six Degrees of Freedom) refers to the control of a rigid body's position and orientation in 3D space. The six degrees are:

- **3 translational**: X, Y, Z (forward/back, left/right, up/down)
- **3 rotational**: Roll, Pitch, Yaw (rotation about X, Y, Z axes)

## In Aerospace

A spacecraft or aircraft with 6-DOF can control its complete state in space. Most vehicles are **underactuated** (fewer actuators than DOF) or **overactuated** (more actuators than DOF).

## In AEGIS

AEGIS maps a desired 6-DOF wrench (3 forces + 3 torques) to engine throttles and gimbal angles:

```
wrench = [Fx, Fy, Fz, τx, τy, τz]
```

### Control Allocation Problem

Given a desired wrench `τ_desired`, find actuator commands `u` such that:

```
τ_desired = B * u
```

Where `B` is the control effectiveness matrix. When `B` is not square ( fewer actuators than DOF), a pseudo-inverse is used:

```
u = pinv(B) * τ_desired
```

## Reference Frames

| Frame | Description | Axes |
|-------|-------------|------|
| Body | Fixed to vehicle | X-forward, Y-right, Z-down |
| Inertial | Fixed to planet | ECEF coordinates |
| NED | Local tangent plane | X-north, Y-east, Z-down |

## Related Concepts

- [[Control Allocation]] — Mapping wrench to actuators
- [[Pseudo-inverse]] — Mathematical tool for overdetermined systems
- [[Quaternion]] — Attitude representation
- [[Rigid Body Dynamics]] — Physics of 6-DOF motion
- [[Fault Detection and Isolation]] — Handling actuator failures

## Sources

- AEGIS Project (`src/guidance/allocator.py`)
