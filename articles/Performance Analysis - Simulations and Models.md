---
date: "\\[2022-09-22 Thu 00:00\\]"
id: 664d99ea-5c74-47c4-89f6-4bbee86e5bca
title: Performance Analysis - Simulations and Models
---

Taught by Gianfranco Balbo, Gaeta

- Lawrence M. Leemis, Stephen K. Park, *Discrete Event Simulation: a first course*, Pearson - Prentice Hall
- Denning, Buzen, *[[The Operational Analysis of Queueing Network Models]]*, ACM Computing Surveys, 1978

# Systems

This course focuses on systems that are:

- stochastic
- dynamic
- discrete-event

# Introduction

## Discrete-event simulation

- purpuse, modeling - simulating - analyzing systems
- way, computation and mathematical techniques
- experiments on the model

A **model** is a conceptual framework describing a system The simulations are going to use **Montecarlo**-based techniques[^1]

Model Development (typically done iteratively):

1.  Goals and objectives
2.  Build a *conceptual model*
3.  Convert into a *specification model*
4.  Convert into a *computational model*
5.  Verify
6.  Validate

## Formalisms

- **Queueing Networks**
  - concurrency
  - congestion
- **Stochastic Petri Nets**
  - concurrency
  - congestion
  - sychronization

Queues can use different *disciplines* or algorithms to regulate the job handled by the server

- `FIFO`
- `LIFO`
- `SIRO`, serve in random order
- using some kind of priority, usually `SJF`

Basic assumptions on queues:

- `FIFO`
- *non-preemptive*
  - once initiated, service will continue until completion
- *conservative*
  - *server* stays idle if there is one or more jobs in the service node

For a job $`i`$

- arrival time $`a_{i]`$
- delay $`d_{i]`$
- service begins at time $`b_{i] = a_{i] + d_{i]`$
- service time $`s_{i}`$
- wait time $`w_{i} = d_{i} + s_{i]`$
- departure time $`c_{i] = a_{i} + w_{i}`$
- interarrival time $`\tau_{i} = a_{i} - a_{i-1}`$
- idle time $`e_{i} = a_{i} - c_{j-1}`$
  - $`0`$ if job arrives whle the server is busy

In general:
``` math
B = \sum_{i=1}^{n} s_{i}
```
``` math
E = \sum_{i=1}^{n} e_{i}
```

Observing these informations we can distinguish:

- **job-averaged statistics**
  - average interarrival time

``` math
\overline \tau = \frac{1}{n}\sum^{n}_{i=1}\tau_{i}=\frac{a_{n}}{n}
```

- input rate $`\theta = \frac{1}{\overline \tau}`$
- average service time

``` math
\overline s = \frac{1}{n}\sum^{n}_{i=1} s_{i}=\frac{B}{n}
```

- service rate $`\mu = \frac{1}{\overline s}`$
  - maximum throughput, in the case that the server was never idle
- total simulation time $`T = c_{n} - c_{0}`$
- throughput
  ``` math
  X = \frac{n}{T}
  ```
- utilization
  ``` math
  U = \frac{B}{T}
  ```

<!-- -->

- **time-averaged statistics** are defined by the area under a curve (integration)
  - defined 3 functions
    - $`n(t)`$, number of jobs in the service node at time $`t`$
    - $`q(t)`$, number of jobs in the queue at time $`t`$
    - $`y(t)`$, number of jobs in service at time $`t`$
    - $`n(t) = q(t) + y(t)`$
  - 
    ``` math
    \overline n = \frac{1}{T} \int_{0}^{T} n(t) dt
    ```
  - 
    ``` math
    \overline q = \frac{1}{T} \int_{0}^{T} q(t) dt
    ```
  - 
    ``` math
    \overline y = \frac{1}{T} \int_{0}^{T} y(t) dt
    ```
    - also the *server utilization* (probability, in the limit)
    - 
      ``` math
      \overline y = \frac{\sum_{i=1}^{n} s_{j}}{c_{n}} = \frac{B}{c_{n}} = \frac{c_{}_{n}- E}{c_{n}}
      ```
  - *traffic intensity*, input rate to service rate ratio
    - 
      ``` math
      \rho = \frac{1/\overline \tau}{1/\overline s} = \frac{c_{n}B}{a_{n} c_{n}} = \bigg (\frac{c_{n}}{a_{n}}\bigg )\overline y
      ```

> A **Trace File** is a log of all the arrival and service times.

# Discrete-Event Simulation

The general structure of the simulator is made of different *handlers*:

<div class="code">

void initialize() { clock = 0; halt = false; nsys = 0; Busy = 0; Area<sub>n</sub> = 0;

arrival<sub>t</sub> = GetArrival(fp); service<sub>t</sub> = GetService(fp);

event<sub>notice</sub> = get<sub>newnode</sub>(); event<sub>notice</sub>-\>event.type = ARRIVAL; event<sub>notice</sub>-\>event.occur<sub>time</sub> = arrival<sub>t</sub>; event<sub>notice</sub>-\>event.service<sub>time</sub> = service<sub>t</sub>; schedule(event<sub>notice</sub>); // scheduling the first event

event<sub>notice</sub> = get<sub>newnode</sub>(); event<sub>notice</sub>-\>event.type = END; event<sub>notice</sub>-\>event.occur<sub>time</sub> = End<sub>time</sub>; schedule(event<sub>notice</sub>); }

</div>

In the engine we call the **handlers**, these are best kept as small and fast as possible. It is better to create different variants of the events with simple handles than have fewer but more complex handlers.

<div class="code">

void engine(void) { int event<sub>type</sub>; double oldclock, delta; nodePointer new<sub>event</sub>;

new<sub>event</sub> = event<sub>pop</sub>();

oldclock = clock; clock = new<sub>event</sub>-\>event.occur<sub>time</sub>; delta = clock - oldclock;

// nsys \> 0, somebody was in the queue if (nsys \> 0) { Busy = Busy + delta; Area<sub>n</sub> = Area<sub>n</sub> + nsys \* delta; }

// transition event<sub>type</sub> = new<sub>event</sub>-\>event.type; switch(event<sub>type</sub>) { case ARRIVAL : arrival(new<sub>event</sub>); break; case DEPARTURE : departure(new<sub>event</sub>); break; case END : end(new<sub>event</sub>); } }

</div>

<div class="code">

void arrival(struct node\* node<sub>event</sub>) { struct node\* next<sub>job</sub>;

nsys++; if (nsys == 1) { // Nobody was in queue node<sub>event</sub>-\>event.type = DEPARTURE; node<sub>event</sub>-\>event.occur<sub>time</sub> = clock + node<sub>event</sub>-\>event.service<sub>time</sub>; schedule(node<sub>event</sub>); // the engine popped the event

// arrival puts it back as a departure } else { enqueue(node<sub>event</sub>); } arrival<sub>t</sub> = GetArrival(fp); service<sub>t</sub> = GetService(fp);

next<sub>job</sub> = get<sub>newnode</sub>(); next<sub>job</sub>-\>event.type = ARRIVAL; next<sub>job</sub>-\>event.occur<sub>time</sub> = arrival<sub>t</sub>; next<sub>job</sub>-\>event.service<sub>time</sub> = service<sub>t</sub>; schedule(next<sub>job</sub>); }

</div>

<div class="code">

void departure(struct node\* node<sub>event</sub>) { double waiting<sub>time</sub>; struct node\* next<sub>job</sub>;

nsys–; if (nsys \> 0) { next<sub>job</sub> = dequeue(); next<sub>job</sub>-\>event.type = DEPARTURE; next<sub>job</sub>-\>event.occur<sub>time</sub> = clock + next<sub>job</sub>-\>event.service<sub>time</sub>; schedule(next<sub>job</sub>); } return<sub>node</sub>(node<sub>event</sub>); }

</div>

<div class="code">

void End(struct node\* node<sub>event</sub>) { halt = true; return<sub>node</sub>(node<sub>event</sub>); }

</div>

## Memory Management

To have an efficient memory management it is important not to use `GC`, instead it's better to reuse as many chunks of memory as possible. That is because the memory manager operation are very time-intensive. This can be done by having an `available-list` of chunks where we can take and place back chunks, interrogating the memory manager as little as possible.

# Tandem Network

A network made of two queues each with its output connected to the others input. The `Event Notice` follows the life of a single job, in this structure the clients/jobs are continuously passing from one queue to another. This means there is no need for an `Available Queue` anymore as the number of notices is not gonna change during the simulation. The basic assumption of the **clock** is that it is always cabable of the time granularity needed to distinguish between events that occur "at the same time".

- so, while events pass from one queue to another in 0 time, the clock is able to distinguish and establish which event (departure from one \| arrivale to the other) is happening first

# Operational Analysis

See [[Notes]].

## Bottleneck

## State Transition Balance

**State** of the system can be represented by the number of waiting customers.

- 
  ``` math
  C(m,n)
  ```
  is the number of times the system moves from state $`m`$ to state $`n`$

The **Balance Equation** holds for all states, but the first and the last one
``` math
\sum_{k} C(k,n) = \sum_{m}C(n,m)
```

- the first has one more exits than entries
- the last has one more entries than exits

To simplify the state graph we organize them in a chain

- **One-Step Behavior**

## Convolution Method

### Load Independent Stations

*service time of each station is independent to the number of clients in queue*

- **Utilization Law**

``` math
\overline n_{m} (n) = U_{m}(n)[1+\overline n_{m} (n-1)]
```

``` math
\overline w_{m}(n) = S_{m}[1+\overline n_{m}(n-1)]
```

### Mean Value Analysis

see **Arrival Theorem** (Sevcik-Mitrani)

- in single server stations with **Poisson input process** arriving customers see the system as they were *external observers* not involved in its operation

Then we group the recurrent expression for the $`i\text{-th}`$ station

``` math
\overline n_{i}(n) = S_{i}[1+\overline n_{}_{i} (n-1)]
```
``` math
U_{i}(n) = X_{i}(n) S_{i}
```
``` math
\overline n_{i} (n) = U_{i}(n)[1+\overline n_{i} (n-1)]
```

In a system where we identified the station $`ref`$ as the reference for the computation of the $`V_{i}`$

``` math
Y_{ref}(n) = S_{ref} + \sum_{i=1,i\neq ref}^{M} V_{i} \overline w_{i} (n)
```

For the $`i\text{-th}`$ station the list of derivation is:

Very simple from a computational point of view

- just loop $`M`$ times
- number of multiplications by the order of the number of the stations

With a **Delay station** the algorithm has to be modified

## BCMP Theorem

**Baskett, Chandy, Muntz, Palacios**

# Random Values

## Generation

### Distributions

1.  Pareto Type 1

### Acceptance-Rejection

Generates random variates

- usually continuous
- for distribution whose `IDF` cannot be easily computed

Generate 2 randoms for $`x`$ and $`y`$

- these individuate a point
- a point inside the area of the density function is a *hit*

This is a *brute-force* approach

- doesn't matter the shape of the function
- efficiency can be really low
  - lots of point can be useless
- efficiency depends on how well the $`c g(x)`$ approximates $`f(x)`$

``` c
do {
    u = Random();
    x = g_inverse(u);
    v = Random();
} while (c * g(x) * v > f(x)); // rejection criteria
return x;
```

### Composition

- usually continuous random variates
- distribution can be computed as weighted sum of elementary distributions

### Cox Theorem

Any distribution can be represented in this manner

- has to have a `Rational Laplace Transform`
- it is an approximation still

With a *schema* with $`n`$ negative exponentials added up at each step with a probability $`\alpha`$, else the result is returned.

[^1]: Computational algorithms using repeated random sampling to obtain results
