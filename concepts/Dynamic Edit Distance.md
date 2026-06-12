---
id: badcc515-8bb7-4b59-a265-6b7dadd66e0a
title: Dynamic Edit Distance
---

In [[C]]

# Libraries

## Naif ver.

## Recursive ver.

## Dynamic ver.

The structure of the algorithm should still be recursive

# Application using the Dynamic Version

Taking a `dictionary` and a `sentence` as inputs:

- For all words with at least one possible correction suggests all the minimal possible corrections

Where:

- any word with a `edit_distance` \> 0 has at least a correction found in the dictionary used
