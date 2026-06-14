## 1. Custom Core Bindings

| Keybind | Mode | Description |
| :--- | :--- | :--- |
| `jk` or `kj` | Insert | Escape to Normal mode |
| `;` | Normal, Visual | Map to `:` (Command line) |
| `:` | Normal, Visual | Map to `;` (Repeat last f/F/t/T motion) |
| `L` | Normal | Select to end of line (`vg_`) |
| `<C-u>` | Normal | Scroll page UP and center cursor (`zz`) |
| `<C-d>` | Normal | Scroll page DOWN and center cursor (`zz`) |
| `{` | Normal | Jump paragraph UP and center cursor |
| `}` | Normal | Jump paragraph DOWN and center cursor |
| `G` | Normal | Go to end of file and center cursor |
| `n` / `N` | Normal | Next/Prev search match (kept centered) |
| `gd` / `gr` | Normal | Go to definition / references (kept centered) |
| `<C-o>` | Normal | Jump back in jump list (kept centered) |
| `<leader>s` | Normal | Search and replace the word under the cursor |
| `<C-r>` | Visual | Replace all selected text (prompts for replacement) |

---

## 2. Searching & Code Navigation (Snacks / Telescope)

| Keybind | Action |
| :--- | :--- |
| `<leader>/` | Search (grep) text across all project files (uses `ripgrep`) |
| `<leader>sg` | Open live grep search dialog |
| `<leader>sw` | Grep search for the word under the cursor |
| `<leader>sR` | Resume the last search |
| `<leader><space>` | Find files by name (uses `fd` under the hood) |
| `<leader>ff` | Search/find files in project directory |
| `<leader>ss` | Search document symbols (variables, functions) |
| `<leader>ll` | Toggle `lsp_lines` (inline diagnostics) |

---

## 3. File Explorer (`mini.files`)

*   Toggle current file: **`<leader>e`**
*   Toggle current working directory (cwd): **`<leader>E`**

Inside the `mini.files` pane:
*   `l` or `<CR>`: Open directory / File
*   `h` or `-`: Go up to parent directory
*   `=` : Synchronize changes (creates, renames, deletes files on disk)
*   `<BS>`: Reset view
*   `g?`: Show help
*   `<` / `>`: Trim left / right

---

## 4. Debugger (`nvim-dap`)

| Keybind | Action |
| :--- | :--- |
| `<leader>dt` | Toggle breakpoint |
| `<leader>dc` | Continue execution |
| `<leader>di` | Step Into |
| `<leader>do` | Step Over |
| `<leader>du` | Step Out |
| `<leader>dr` | Open REPL |
| `<leader>dl` | Run Last debugging session |
| `<leader>db` | List all Breakpoints |
| `<leader>dq` | Terminate session and close UI |
| `<leader>de` | Set exception breakpoints (`all`) |

---

## 5. Terminal Control (`toggleterm`)

*   Toggle default floating terminal: **`<C-\>`**

| Keybind | Action |
| :--- | :--- |
| `<leader>tf` | Toggle Floating Terminal |
| `<leader>tv` | Toggle Vertical Terminal |
| `<leader>th` | Toggle Horizontal Terminal |

---

## 6. Harpoon (Quick File Switching)

*   **`<leader>A`** – Add current file to Harpoon list
*   **`<leader>a`** – Open Harpoon quick menu

| Keybind | Action |
| :--- | :--- |
| `<C-h>` | Jump to marked file 1 |
| `<C-t>` | Jump to marked file 2 |
| `<C-n>` | Jump to marked file 3 |
| `<C-s>` | Jump to marked file 4 |

---

## 7. AI Assistant (`avante.nvim`)

| Keybind | Action |
| :--- | :--- |
| `<leader>as` | Ask Avante (opens sidebar chat) |
| `<leader>ae` | Edit current file or selected block |
| `<leader>aa` | Apply generated code suggestions |
| `<leader>ar` | Refresh sidebar chat |
| `<leader>aq` | Close sidebar chat |
| `<leader>at` | Toggle Avante sidebar |
| `<Tab>` | Accept inline ghost text (Insert Mode) |
| `<S-Tab>` | Dismiss inline ghost text (Insert Mode) |

---

## 8. Compiler Bindings

*   **`<C-b><C-o>`** – Open Compiler UI
*   **`<C-b><C-b>`** – Re-run/Redo compiler command
*   **`<C-b><C-t>`** – Toggle compiler results window
*   **`<leader>qj`** – Go to next item in Quickfix list
*   **`<leader>qk`** – Go to previous item in Quickfix list

---

## 9. Essential Vim Motions & Editing Tricks

### Commenting
*   `gcc` – Comment/uncomment the current line.
*   `gc` (in Visual Mode) – Comment/uncomment the selected block of code.
*   `gcap` – Comment the entire paragraph.

### Text Objects (The `action + inside/around + object` rule)
Operate on code blocks directly without manual selection:
*   `ci"` – **C**hange **i**nside double quotes (deletes content and enters Insert Mode).
*   `da)` – **D**elete **a**round parenthesis (deletes contents and the parentheses).
*   `yi{` – **Y**ank (copy) **i**nside curly braces.
*   `caT` – **C**hange **a**round HTML/XML tags.

### Visual Block Mode (Multi-line editing)
Useful for inserting characters (like comment markers) across multiple lines:
1. Move cursor to the start.
2. Press **`<C-v>`** to enter Visual Block Mode.
3. Move down/up to select lines.
4. Press **`I`** (capital I) to enter insert mode at the front.
5. Type your edits (e.g., `# ` or `// `).
6. Press **`<Esc>`** to propagate changes across all lines.
