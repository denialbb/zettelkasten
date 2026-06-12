---
date: "\\[2022-12-30 Fri 01:49\\]"
id: 878a5653-cf6a-4b87-981d-fd55c1c69ebf
title: How to switch, customize, or write themes
---

- Source: <https://discourse.doomemacs.org/t/how-to-switch-customize-or-write-themes/37>
- Author: gagbo
- Related: [[Emacs]]

# Notes

Setting themes:

``` elisp
;;; add to $DOOMDIR/config.el
(setq doom-theme 'theme-name)
;; or
(load-theme 'theme-name t)
```

Tweaking the current theme:

``` elisp
(custom-set-faces!
  '(cursor :background "#FF0000"))

(custom-set-faces!
  `(markdown-code-face :background ,(doom-color 'bg-alt))
  `(markdown-markup-face :foreground ,(doom-color 'blue)))
```

To see the palette variables of the theme check the theme's source code

- [doom-one](https://github.com/hlissner/emacs-doom-themes/blob/master/themes/doom-one-theme.el#L36-L106)

Looking up faces:

- `M-x describe-char`
- `SPC h '`
- `C-h '`

To see preview of known faces:

- `M-x describe-faces`
- `SPC h F`
- `C-h F`

To write a custom theme base it on a Doom theme to use the `doomemacs/themes` API and place it in `$DOOMDIR/themes/`..
