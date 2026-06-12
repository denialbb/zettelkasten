---
date: "\\[2022-06-27 Mon 18:07\\]"
id: 48e7fe9f-e7b0-4d58-b62a-bd0680b34590
title: Doom Icons in Daemon
---

- <http://sodaware.sdf.org/notes/emacs-daemon-doom-modeline-icons/>

``` elisp
(defun enable-doom-modeline-icons (_frame)
  (setq doom-modeline-icon t))

(add-hook 'after-make-frame-functions
          #'enable-doom-modeline-icons)

```
