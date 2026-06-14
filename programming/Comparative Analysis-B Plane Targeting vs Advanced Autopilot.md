---
id: 202606122314
title: "Comparative Analysis: Multi-Flyby B-Plane vs. Advanced Autopilot Algorithms (kOS & kRPC)"
tags: [astrodynamics, kOS, kRPC, control-theory, optimization, convex-optimization, mpc, zettelkasten]
---

# Comparative Analysis: Multi-Flyby B-Plane vs. Advanced Autopilot Algorithms (kOS & kRPC)

## 1. Context and Problem Definition
The automation of complex spaceflight operations in Kerbal Space Program (KSP) is heavily dictated by the underlying computational architecture. 
*   **Native kOS Architecture**: The KerboScript virtual machine operates under strict Instruction Per Update (IPU) limits and lacks native linear algebra or convex solvers.
*   **Hybrid kRPC/Python Architecture**: Bypasses the IPU limit by streaming telemetry to an external Python server over TCP/IP, unlocking native matrix math (`NumPy`), optimization (`SciPy`), and convex solvers (`CVXPY`).

This note evaluates advanced guidance algorithms (**B-Plane Targeting**, **Q-law**, **eMPC**, **G-FOLD**, and **NPCG**) across both architectural paradigms.

## 2. Core Candidate: B-Plane Targeting for Multi-Flyby Optimization
[[B-Plane Parameterization]] reduces the three-dimensional targeting problem of a gravity assist into a two-dimensional intersection on the asymptotic plane of the target body. 

*   **Mathematics**: Optimizing a sequence of flybys involves solving a Multiple-Shooting Boundary Value Problem (BVP) where the roots of the mismatch between the outgoing $V_{\infty}^{+}$ and incoming $V_{\infty}^{-}$ must be driven to zero using a Newton-Raphson solver.
*   **kOS Native Viability**: **High**. KSP utilizes patched-conic mechanics, meaning analytical gradients for Keplerian propagation can be derived locally. It is heavily geometric, avoiding massive matrix inversions.
*   **kRPC Viability**: **Trivial**. Python's `scipy.optimize.root` solves the Jacobian matrix instantly.

---

## 3. Comparative Algorithms

### A. Q-law (Low-Thrust Heuristic Optimization)
*   **Concept**: A Lyapunov feedback control law utilizing Gauss's Variational Equations to maximize the rate of change of a proximity quotient $Q$.
*   **kOS Viability**: High. Computationally lightweight as it relies on an analytical feedback law rather than iterative solvers.
*   **kRPC Viability**: High. Allows for high-fidelity continuous trajectory propagation using `scipy.integrate`.
*   **Zettel Link**: [[Lyapunov Control in Orbital Mechanics]]

### B. eMPC (Explicit Model Predictive Control)
*   **Concept**: Traditional [[Model Predictive Control]] solves a finite-horizon open-loop optimal control problem. eMPC solves this optimization *offline* via multi-parametric quadratic programming, dividing state space into polyhedra mapped to affine control laws.
*   **kOS Viability**: Low. State-space partitions scale exponentially, requiring massive memory overhead for the VM.
*   **kRPC Viability**: **Extremely High**. Python natively manages the memory footprint and evaluates the active polyhedral region with zero latency. Ideal for rover navigation.

### C. G-FOLD (Guidance for Fuel-Optimal Large Diversions)
*   **Concept**: Powered-descent guidance utilizing [[Lossless Convexification]] to transform the minimum-fuel planetary landing problem into a Second-Order Cone Program (SOCP).
*   **kOS Viability**: **Impossible**. Implementing a robust primal-dual interior-point SOCP solver in KerboScript is mathematically prohibitive.
*   **kRPC Viability**: **The Ultimate Standard**. Passing the state vector to Python allows `ecos` via `cvxpy` to solve the convex program in real-time, matching SpaceX flight software architecture.

### D. NPCG (Nonlinear Programming Collocation Guidance)
*   **Concept**: Direct transcription pseudospectral methods discretize trajectory optimization into a large-scale Nonlinear Programming (NLP) problem.
*   **kOS Viability**: Impossible natively.
*   **kRPC Viability**: High, though requires robust solvers like IPOPT. Highly applicable for complex ascent trajectories.

---

## 4. Synthesis and Research Vector Recommendation

The optimal research vector bifurcates based on the chosen development architecture:

1.  **If constrained to Native kOS**: **Multi-Flyby B-Plane Targeting** is the pinnacle. It relies on analytical orbital state propagation (Kepler's Equation) rather than numerical integration, maximizing IPU efficiency while achieving a "Grand Tour" automation capability.
2.  **If utilizing the kRPC/Python Architecture**: **Convexified MPC (G-FOLD)** is the absolute winner. It explicitly leverages the very reasons for upgrading to Python (convex solvers and matrix algebra) to execute mathematically guaranteed, optimal propulsive landings.

**Conclusion**: Native kOS is built for geometric and orbital mechanics mastery. kRPC unlocks modern optimal control theory and real-time convex optimization.
