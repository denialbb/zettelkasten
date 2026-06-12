#wsl #terminal #arch #neovim #windows

## WezTerm Setup (Windows)

- Configure WezTerm via `%USERPROFILE%\.wezterm.lua`.
- Set font to JetBrains Mono Nerd Font.
- Enable Acrylic transparency and blur.

```lua
local wezterm = require 'wezterm'
local config = wezterm.config_builder()

-- Font configuration
config.font = wezterm.font('JetBrains Mono Nerd Font')
config.font_size = 11.0

-- Acrylic transparency and blur (Windows only)
config.win32_system_backdrop = 'Acrylic'
config.window_background_opacity = 0.85
config.text_background_opacity = 1.0

-- Set WSL Arch as the default domain
config.default_domain = 'WSL:Arch'

return config
```

## WSL2 Arch Linux Installation

- Download the `Arch.zip` release from [ArchWSL](https://github.com/yuk7/ArchWSL).
- Extract files to a permanent directory.
- Execute `Arch.exe` to initialize the container.
- Initialize the package manager and update system:
```bash
passwd
pacman-key --init
pacman-key --populate archlinux
pacman -Syu
```
- Create user account with sudo access:
```bash
echo "%wheel ALL=(ALL:ALL) ALL" > /etc/sudoers.d/wheel
useradd -m -G wheel -s /bin/bash denialbb
passwd denialbb
```
- Set default user in Windows PowerShell:
```powershell
.\Arch.exe config --default-user denialbb
```

## Zsh + Oh My Zsh Setup

- Install Zsh:
```bash
sudo pacman -S zsh
```
- Install Oh My Zsh:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
- Change default shell:
```bash
chsh -s $(which zsh)
```

## Neovim Configuration

- Install compilation utilities, runtimes, and search dependencies:
```bash
sudo pacman -S gcc make ripgrep fd nodejs npm python python-pip neovim git
```
- Clone custom configurations:
```bash
git clone https://github.com/denialbb/nvim.git ~/.config/nvim
```
- Launch Neovim to trigger automatic package installation and compilation:
```bash
nvim
```
