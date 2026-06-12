---
id: d8fb65c9-9551-4423-9313-7463e900e740
title: Effective Editing
---

[[Emacs]]

- [Source](https://masteringemacs.org/article/effective-editing-movement)

# Fundamental Movement Keys

- `C-n`
- `C-p`
- `C-f`
- `C-b`

Insert newline at the end of the buffer:

<div class="code">

(setq next-line-add-newlines t)

</div>

# Extended Movement

## Word

Same as *Fundamental* but prefix `M-`

## Paragraph

- `M-e`
- `M-a`

## Sentence

## Scrolling

- `C-v` - down
- `M-v` - up

## Buffer

These leave a mark, jump to the mark with `C-u C-SPC` (on marks see [[Fixing the mark commands]])

# Advanced Movement

## s-Expression

Or Balanced-Expression

- `C-M-f`
- `C-M-b`

## ISearch

- `C-s`
- `C-s C-s`
  - repeats last query
- `M-s w`
  - fuzzy finds matches
- `M-m`
- back to indentation

## Defun

- `C-M-a`
- `C-M-e`
