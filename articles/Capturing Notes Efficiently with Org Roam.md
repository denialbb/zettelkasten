---
date: 2021-12-19 20:04
id: 50e1c257-b616-4473-a555-a80de075021a
title: Capturing Notes Efficiently with Org Roam
---

- Source: <https://systemcrafters.net/build-a-second-brain-in-emacs/capturing-notes-efficiently/>
- Author: [[System Crafters]]
- Related: [[Emacs]]
- [[org-roam]] uses the same system as [[org-capture]]
- pretty easy to set-up

``` elisp
(use-package org-roam
  :ensure t
  :init
  (setq org-roam-v2-ack t)
  :custom
  (org-roam-directory "~/RoamNotes")
  (org-roam-completion-everywhere t)
  (org-roam-capture-templates
   '(("d" "default" plain
      "%?"
      :if-new (file+head "%<%Y%m%d%H%M%S>-${slug}.org" "#+title: ${title}\n")
      :unnarrowed t)))
  :bind (("C-c n l" . org-roam-buffer-toggle)
         ("C-c n f" . org-roam-node-find)
         ("C-c n i" . org-roam-node-insert)
         :map org-mode-map
         ("C-M-i" . completion-at-point))
  :config
  (org-roam-setup))
```
