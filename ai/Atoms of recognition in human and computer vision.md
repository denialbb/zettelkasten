---
date: "\\[2023-01-08 Sun 11:05\\]"
id: b87ad6a4-b6d4-471e-89f2-aca9011ae401
title: Atoms of recognition in human and computer vision
---

- Source: <http://dx.doi.org/10.1073/pnas.1513198113>
- Author: [[Shimon Ullman]], Assif, Fetaya, Harari
- Related: [[Convolutional Neural Network]], [[Neural Network]], [[Computer Vision]]

# Claim

Introducing and using minimal recognizable images shows that the human visual system uses features and processes that are not used by current models and that are critical for recognition.

# Notes

> A `MIRC` is an image patch that can be reliably recognized by human observers and which is minimal in that further reduction in either size or resolution makes the patch unrecognizable.

- **minimal recognizable images**
  - a minimal change in the image can have drastic effect on the recognition
    - this identifies crucial features
    - *phase transition* phenomenon
- **Mi**​nimal **r**​ecognizable **c**​onfigurations (`MIRCs`)
  - the task is computationally difficult as each one is non-redundant
    - requires effective use of available information
- training on full-object images
  - AP 0.07
- training on `MIRC`
  - AP 0.74
- results indicate the human visual system uses features and processes that current models do not
  - the sharp drop in recognition at the `MIRC` level indicate similar visual representations in humans
    - the transition occurs for the same images
  - feed-forward or top-down processes (currently missing from the `FF` models)?
