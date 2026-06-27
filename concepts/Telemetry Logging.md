# Telemetry Logging

**Telemetry logging** is the practice of recording sensor data, state variables, and events during system operation for later analysis, debugging, and performance evaluation.

## In AEGIS

AEGIS uses a **dual-file logging strategy** (ADR-013) to handle high-frequency data without blocking the 50Hz control loop:

### CSV File (`telemetry.csv`)
- **Format**: Dense per-tick state snapshots
- **Content**: Position, velocity, attitude, engine throttles, FDI status, guidance commands
- **Use**: Post-flight analysis, trajectory replay, parameter tuning

### JSONL File (`events.jsonl`)
- **Format**: Discrete event log (one JSON object per line)
- **Content**: State transitions, fault detections, dt spikes, aborts
- **Use**: Timeline of significant events, debugging

## Implementation Details

- **Buffered I/O**: 1MB buffer to prevent blocking
- **Symlink**: `logs/latest/` points to most recent run
- **File rotation**: Automatic based on timestamp

### Post-Flight Analysis

```bash
# Trajectory analysis
python scripts/trajectory_analysis.py

# Attitude analysis
python scripts/attitude_analysis.py

# Dashboard
python scripts/trial_dashboard.py
```

## Why Dual-Format?

| Format | Pros | Cons |
|--------|------|------|
| CSV | Easy to load, plot, analyze | Verbose for sparse events |
| JSONL | Flexible schema, event-based | Harder to query |
| **Both** | Best of both worlds | Slightly more code |

## Related Concepts

- [[Data Logging]] — General practice
- [[Telemetry]] — Remote data transmission
- [[Flight Data Recorder]] — Aviation equivalent (black box)
- [[Time Series Analysis]] — Analyzing logged data
- [[Digital Twin]] — Using logs to validate simulation models

## Sources

- AEGIS Project (`src/telemetry/`, `docs/data_flow_telemetry.md`)
