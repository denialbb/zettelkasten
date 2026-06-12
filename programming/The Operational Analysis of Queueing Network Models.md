---
date: "\\[2022-10-06 Thu 06:25\\]"
id: 70af4f43-65f9-474c-9ffb-fa627cd96b47
roam_refs: "cite:denning78"
title: The Operational Analysis of Queueing Network Models
---

[[Peter J. Denning]], [[Jeffrey P. Buzen]], *The Operational Analysis of Queueing Network Models*, ACM Computing Surveys, 1978

- Related: [[Markovian Queueing Network Theory]]

# Abstract

Queueing network models have proved to be cost effective tools for analyzing modern computer systems. This tutorial paper presents the basic results using the operational approach, a framework which allows the analyst to test whether each assumption is met in a given system. The early sections describe the nature of queueing network models and their applications for calculating and predicting performance quantities. The basic performance quantities–such as utilizations, mean queue lengths, and mean response tunes–are defined, and operational relationships among them are derived. Following this, the concept of job flow balance is introduced and used to study asymptotic throughputs and response tunes. The concepts of state transition balance, one-step behavior, and homogeneity are then used to relate the proportions of time that each system state is occupied to the parameters of job demand and to device characteristics. Efficient methods for computing basic performance quantities are also described. Finally the concept of decomposition is used to simplify analyses by replacing subsystems with equivalent devices. All concepts are illustrated liberally with examples.

# Notes

**Operational principles**:

- quantities **precisely measurable** and **directly testable**
- system **flow balanced**
  - number of arrival at a given device must be (almost) the same as the number of departures from that device during the observation period
- devices **homogeneous**
  - jobs' routing independent of the queue lengths
  - mean time between service completions not dependent on the queue lengths of other devices

These lead to the same conclusion of the [[Markovian Queueing Network Theory]]'s assumptions, with the added benefit of being testable.
