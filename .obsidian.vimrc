" Use jk to exit insert mode
imap jk <Esc>
imap jj <Esc>

" Navigate visual lines instead of logical lines
nmap j gj
nmap k gk

" H and L for beginning and end of line navigation
nmap H ^
nmap L $

" Clear search highlights with Escape
nmap <Esc> :nohl<CR>

" Map Leader to Space
let mapleader=" "

" Space-ff to find files (Obsidian Switcher)
exmap switcher obcommand switcher:open
nmap <leader>ff :switcher<CR>

" Space-fg to search text (Obsidian Search)
exmap search obcommand global-search:open
nmap <leader>fg :search<CR>

" Space-fb to list buffers (Obsidian Switcher)
nmap <leader>fb :switcher<CR>

" Space-p to open command palette
exmap commandpalette obcommand command-palette:open
nmap <leader>p :commandpalette<CR>

" Split focus navigation (Neovim standard)
exmap focusRight obcommand editor:focus-right
nmap <C-l> :focusRight<CR>

exmap focusLeft obcommand editor:focus-left
nmap <C-h> :focusLeft<CR>

exmap focusTop obcommand editor:focus-top
nmap <C-k> :focusTop<CR>

exmap focusBottom obcommand editor:focus-bottom
nmap <C-j> :focusBottom<CR>

" Split control
exmap splitVertical obcommand workspace:split-vertical
nmap <leader>v :splitVertical<CR>

exmap splitHorizontal obcommand workspace:split-horizontal
nmap <leader>s :splitHorizontal<CR>

" File operations
exmap save obcommand editor:save-file
nmap <leader>w :save<CR>
nmap :w :save<CR>

exmap closeActive obcommand workspace:close
nmap <leader>q :closeActive<CR>
nmap :q :closeActive<CR>
