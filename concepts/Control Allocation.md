# Control Allocation

**Control Allocation** is the process of distributing a desired total control effort (wrenches like forces and torques) across a set of redundant actuators. It is a fundamental problem in over-actuated systems like spacecraft, aircraft with multiple control surfaces, and underwater vehicles.

## The Problem

Given a desired 6-DOF wrench (3 forces + 3 torques), how do you map this to individual actuator commands (throttle, deflection angles, etc.) when there are more actuators than degrees of freedom?

## AEGIS Application

In AEGIS, the Control Allocator maps a desired 6-DOF wrench to engine throttles and gimbal angles. The system uses a **pseudo-inverse** approach:

```
u = pinv(B) * τ_desired
```

Where:
- `B` is the control effectiveness matrix (maps actuator commands to wrench)
- `τ_desired` is the desired 6-DOF wrench
- `u` is the actuator command vector (throttles and gimbal angles)

### Fault-Tolerant Allocation

When engines fail, the allocator dynamically remaps by:
1. Detecting failed engines (via FDI)
2. Recomputing the pseudo-inverse with only surviving engines
3. Automatically throttling down engines opposite the failure to cancel torque
_awhile throttling up adjacent engines to maintain vertical thrust

### Numerical Safety

- **Condition number check**: If `cond(B) > 1e4`, raises `AllocationDegenerateError`
- **Rank deficiency check**: If `rank(B) < 6`, raises `AllocationDegenerateError`

## Related Concepts

- [[Pseudo-inverse]] — The mathematical tool used for allocation
- [[Fault Detection and Isolation]] — Detects which engines have failed
- [[6-DOF Control]] — Six degrees of freedom (position + attitude)
- [[Redundancy Management]] — Handling over-actuated systems
- [[Constrained Optimization]] — Alternative allocation methods using optimization

## Sources

- AEGIS Project (`src/guidance/allocator.py`)
