---
date: "\\[2023-04-19 Wed 05:07\\]"
id: b10940e8-f505-4d04-b119-d113707e0076
title: Flattening Hierarchical Scheduling
---

- Source:
- Author: Lackorzynski, Warg, Volp, Hartig
- Related: [[Sistemi Operativi]], [[Microkernel Based Systems]]

# Notes

- the objective is to integrate multiple real-time systems as guests on a single host using `VM`​s
- in literature there are different takes on the matter
  - *mismatch between embedded-systems requirements and the virtual-machine model is evident in scheduling \[…\] the integrated nature of embedded systems requires that scheduling priorities of different subsystems must be interleaved. This is at odds with the concept of virtual machines.*\[fn:heiser The Role of Virtualization in Embedded Systems\]
  - some argue bandwidth servers with small and frequently replenished budgets is sufficient
- the paper argues the root of the dispute lies in limitations in current virtualization technology
  - a small enhancement of the scheduler in the guest task sets for the host scheduler to integrate these workloads onto a single system by interleaving
- different types of virtualization
  - faithful and paravirtualization
    - first needs hardware properties in the host
    - second modifies the guest OS
- the approach of the paper is to attenuate the strict separation for schedulers of different `VM`​s
  - that is the host just provides a budget to guests without any other information
  - this is done by having the host scheduler allocating budgets as *scheduling contexts*
  - as the schedulability of the system is validated this is attached to the `vCPU` of the `VM`
- interrupts are implemented as assignments of `SC` to events by the host
