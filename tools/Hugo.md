---
id: 65d2727b-cd97-4e73-8745-ac30803c6a3c
title: Hugo
---

To blog with plain text

# Emacs

Integrated with [[Emacs]] by [ox-hugo](https://ox-hugo.scripter.co/)

``` elisp
(use-package ox-hugo
  :ensure t            ;Auto-install the package from Melpa
  :after ox)
```

Root directory of the source for the Hugo site:

- `HUGO_BASE_DIR`
- `#+hugo_base_dir:` keyword in org file

# Markdown Processors

- Blackfriday (default)
- Mmark

# LaTeX

Support for LaTeX math equations is added by rendering engine:

- KaTeX
- MathJax

# Partials

Support is added by creating partials inside `layouts/partials/` Partials are activated with:

``` example
---
katex: true
markup: "mmark"
---
```

# Installation and Usage

- [Installing](https://gohugo.io/getting-started/installing/)
  - `sudo pacman -Syu hugo`
- [Quick Start](https://gohugo.io/getting-started/quick-start/)
  - `hugo new site quickstart`
  - Theming
    - <https://themes.gohugo.io>
    - <https://github.com/gohugoio/hugoThemes>
    - <https://themes.gohugo.io/>
    - then add the theme to `config.toml`

``` bash
cd quickstart
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme.git
```

- Starting the server
  - `hugo server -D`
  - <http://localhost:1313/>
- Build static pages
  - `hugo -D`
  - in `./public/` directory by default

# Resources

The best resource I could find by far is the work of [[Jethro Kuan]] on

- <https://github.com/jethrokuan/braindump>
- <https://github.com/jethrokuan/cortex>
