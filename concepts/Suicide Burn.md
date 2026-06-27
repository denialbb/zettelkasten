# Suicide Burn

A **suicide burn** (or "hover slam") is an orbital landing maneuver where a spacecraft performs a single, continuous engine burn to cancel all downward velocity exactly at the landing site — with essentially zero margin for error. If the burn starts too early, the spacecraft runs out of fuel. Too late, and it crashes.

## The Mathematics

For a simple case (constant gravity, no atmosphere):

```
v_target = -sqrt(2 * a_available * altitude_above_ground)
```

Where `a_available` is the net upward acceleration the engines can provide (thrust/mass - gravity).

## In AEGIS

AEGIS implements a **sqrt glideslope profile** (ADR-022) that generalizes the suicide burn:

```python
v_target = -sqrt(2 * a_avail * alt_above_floor)
```

Where `a_avail` is the vessel's actual TWR-derived net upward acceleration, computed each tick. This replaces older linear profiles that saturated at high altitude.

## Phases

| Phase | Description |
|-------|-------------|
| `DEORBIT_BURN` | Initial deceleration from orbit |
| `HYPERSONIC_COAST` | Unpowered descent through atmosphere |
| `POWERED_DESCENT` | Main engine burn begins |
| `HOVER_TARGETING` | Near-surface horizontal alignment |
| `TERMINAL_DESCENT` | Final vertical landing |

## Key Challenge: Engine Failure

If an engine fails during the burn:
- Total thrust decreases → less `a_avail`
- Asymmetric thrust → torque
- The glideslope must be recomputed in real-time → Control Allocator remaps thrust

## Related Concepts

- [[Powered Descent]] — The broader category of engine-assisted landing
- [[Control Allocation]] — Remapping thrust after engine failures
- [[Glideslope Profile]] — The trajectory to follow
- [[Hohmann Transfer]] — Orbital mechanics for approach
- [[SpaceX Landing]] — Real-world implementation (Falcon 9, Starship)

## Sources

- AEGIS Project (`src/guidance/controller.py`, `src/mission/flight_control.py`)
