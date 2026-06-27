# kRPC

**kRPC** (Kerbal Remote Procedure Call) is a mod for Kerbal Space Program that exposes the game's API over TCP/IP, allowing external programs (like Python scripts) to control vessels, read telemetry, and interact with the game world.

## Why kRPC?

Kerbal Space Program's native scripting language (kOS) is limited:
- No access to external libraries
- Limited math capabilities (no numpy, scipy)
- Single-threaded

kRPC breaks these limitations by streaming game data to an external Python server, enabling:
- Full scipy/numpy ecosystem
- Complex state estimation (Kalman filters)
- Control allocation (pseudo-inverse solvers)
- Machine learning integration

## AEGIS Architecture

```
┌─────────────┐      TCP/IP      ┌─────────────┐
│  KSP Game   │  ←──────────→  │   Python    │
│  (Unity)    │   kRPC Mod      │   Server    │
│  50Hz tick  │                 │  (AEGIS)    │
└─────────────┘                 └─────────────┘
```

## Key Conventions (AEGIS)

- **Stream API**: Always use `conn.add_stream()` — never poll `vessel.flight()` directly (avoids TCP latency)
- **Engine discovery**: `vessel.parts.with_tag("AegisEngine")` (ADR-016)
- **WSL2 connection**: Windows host IP from `/etc/resolv.conf` (ADR-015)
- **Ports**: 50000 (RPC), 50001 (stream) — not default 5005/5006

## Alternatives Considered

| Approach | Pros | Cons |
|----------|------|------|
| kOS | Native, simple | Limited math, no external libs |
| kRPC + Python | Full ecosystem, fast prototyping | Requires TCP overhead |
| kRPC + C++ | Performance | Longer development time |
| Direct Unity modding | Full control | Complex, fragile |

## Related Concepts

- [[Kerbal Space Program]] — The game/simulation platform
- [[Flight Software]] — Real-world spacecraft software
- [[Hardware-in-the-Loop]] Testing with real hardware
- [[Digital Twin]] — Simulation-based development

## Sources

- AEGIS Project (AGENTS.md, architecture docs)
