---
id: 803f6824-d4b7-4869-97fd-c1853677e2f3
title: org-capture
---

- source: <https://orgmode.org/manual/Capture.html#Capture>
- Related: [[Emacs]]

# Setting up

## (setq org-default-notes-file (concat org-directory "/notes.org"))

### directory di org-roam nel caso di

1.  journal
    1.  usando `org-roam-today`
2.  roam

### directory di agenda o ledger nei casi

# Activation

## the three Org commands org-store-link, org-capture and org-agenda ought to be accessible anywhere in Emacs, not just in Org buffers. To that effect, you need to bind them to globally available keys, like the ones reserved for users (see [(elisp)Key Binding Conventions)](https://www.gnu.org/software/emacs/manual/html_node/elisp/Key-Binding-Conventions.html).

### (global-set-key (kbd "C-c l") 'org-store-link)

### (global-set-key (kbd "C-c a") 'org-agenda)

### (global-set-key (kbd "C-c c") 'org-capture)

# Capture Templates

## org-mode-templates \<– modifica questa variabile

(setq org-capture-templates '( ("t" "Todo" entry (file+headline "~/org/gtd.org" "Tasks") "\* TODO %? %i %a") ("j" "Journal" entry (file+datetree "~/org/journal.org") "\* %? on %U %i %a") ))

## per saltare il set-up

(define-key global-map (kbd "C-c x") (lambda () (interactive) (org-capture nil "x")))

## [Template Elements](https://orgmode.org/manual/Template-elements.html#Template-elements)

### keys

1.  "a" o "-tasto-"
2.  "ab" per due tasti
    1.  in questo caso le combinazioni devono essere consequenziali e seguite da una descrizione

### description

1.  "blabla" - mostrata nella selezione

### type

1.  un simbolo
2.  es
    1.  entry
        1.  org mode node
        2.  con headline
        3.  inserita come child della target entry
            1.  target deve essere .org
    2.  item
        1.  un oggetto lista
        2.  piazzata nella prima lista del target
            1.  target .org
    3.  checkitem
        1.  checkbox
        2.  nel resto uguale al item
    4.  table-line
        1.  nuova riga alla prima tabella del target
        2.  dove verra inserita dipende dalle proprieta'
            1.  :prepend
            2.  :tabel-line-pos
    5.  plain
        1.  testo che verra' incollato cosi' com'e'

### target

1.  dove verra' inserito l'elemento catturato
    1.  ‘(file "path/to/file")’
    2.  ‘(id "id of existing org entry")’
    3.  ‘(file+headline "filename" "node headline")’
    4.  ‘(file+olp "filename" "Level 1 heading" "Level 2" …)’
    5.  ‘(file+regexp "filename" "regexp to find location")’
    6.  ‘(file+olp+datetree "filename" \[ "Level 1 heading" …\])’
        1.  creates a heading in a date tree for today’s date. If the optional outline path is given, the tree will be built under the node it is pointing to, instead of at top level. Check out the :time-prompt and :tree-type properties
    7.  ‘(file+function "filename" function-finding-location)’
    8.  ‘(clock)’
    9.  ‘(function function-finding-location)’

### template

1.  The template for creating the capture item. If you leave this empty, an appropriate default template will be used. Otherwise this is a string with escape codes, which will be replaced depending on time and context of the capture call.
    (file "/path/to/template-file") (function FUNCTION-RETURNING-THE-TEMPLATE)

### properties

1.  :prepend
2.  :immediate-finish
3.  :empty-lines
4.  :clock-in
5.  :clock-keep
6.  :clock-resume
7.  :time-prompt
8.  :tree-type
9.  :unnarrowed
10. :table-line-pos
11. :kill-buffer
12. :no-save

# Template expansion

## %-escapes

### %\[FILE\]

inserisce contenuto da FILE

### %(EXP)

valuta un espressione Elist e rimpiazza con risultato, deve ritornare una stringa, puo' contenere solo %-escapes non interattivi

### %\<FORMAT\>

risultato di format-time-string con FORMAT a parametro

### %t/%T

timestamp solo data/data e ora

### %u/%U

come sopra ma timestamp inattivi

### %i

contenuto iniziale

### %a/%A

annotazione/annotazione con prompt di descrizione

### %l

### %c

### %x

x-clipboard

### %k

### %K

### %n

nome

### %f

file visitato quando viene chiamato org-capture

### %F

path del file visitata dal buffer corrente

### %:keyword

info per certi link

### %<sup>g</sup>

prompt per tag, autocompletati in target

### %<sup>G</sup>

### %<sup>t</sup>

t ma con propt

### %<sup>PROMPT</sup>

prompt per una stringa e rimpiazza la sequenza con quella inserita
