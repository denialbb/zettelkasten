---
date: "\\[2022-10-12 Wed 05:48\\]"
id: a9f10b1c-906d-4fe9-a267-9a93b51690f4
title: From Python to Numpy
---

[[Nicholas P. Rougier]], *From Python To Numpy*[^1], 2017

# Introduction

<div class="source">

def random<sub>walkfaster</sub>(n=1000): from itertools import accumulate

steps = random.choices(\[-1,+1\], k=n) return \[0\]+list(accumulate(steps))

walk = random<sub>walkfaster</sub>(1000)

</div>

`accumulate([1,2,3,4,5]) --> 1 3 6 10 15`[^2]

Without using loops and instead vectorizing the problem we get a 85% increase in performance.

<div class="source">

\>\>\> from tools import timeit \>\>\> timeit("random<sub>walkfaster</sub>(n=10000)", globals()) 10 loops, best of 3: 2.21 msec per loop

</div>

Translating in `numpy` we get:

<div class="source">

def random<sub>walkfastest</sub>(n=1000):

steps = np.random.choice(\[-1,+1\], n) return np.cumsum(steps)

walk = random<sub>walkfastest</sub>(1000)

</div>

<div class="source">

\>\>\> from tools import timeit \>\>\> timeit("random<sub>walkfastest</sub>(n=10000)", globals()) 1000 loops, best of 3: 14 usec per loop

</div>

## Readability vs Speed

The tradeoff for the massive speedups using `numpy` is often the readabily of the code: **comment your code!**

- future-self will thank you

# Anatomy of an array

# Code vectorization

# Problem vectorization

# Custom vectorization

# Beyond Numpy

[^1]: <https://www.labri.fr/perso/nrougier/from-python-to-numpy/>

[^2]: <https://docs.python.org/3.6/library/itertools.html?highlight=accumulate#itertools.accumulate>
