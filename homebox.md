## 1. Prepare the hardware

Recommended:

- Ethernet connection to the router
- SSD instead of HDD
- 2 GB RAM is sufficient; 4 GB is preferable
- Battery can remain installed if it is healthy

The machine will run:

- Arch Linux
- OpenSSH
- Tailscale
- AdGuard Home
- tmux
- Optional Docker services

No desktop environment.

---

# 2. Download Arch

On another Linux machine:

```bash
curl -LO https://geo.mirror.pkgbuild.com/iso/latest/archlinux-x86_64.iso
curl -LO https://geo.mirror.pkgbuild.com/iso/latest/sha256sums.txt
sha256sum -c sha256sums.txt --ignore-missing
```

You should see:

```text
archlinux-x86_64.iso: OK
```

Create the USB:

```bash
lsblk
```

Identify the USB device, then:

```bash
sudo dd if=archlinux-x86_64.iso of=/dev/sdX bs=4M status=progress oflag=sync
sync
```

Replace `/dev/sdX` with the USB device. Do not use `/dev/sdX1`.

---

# 3. Boot the Acer

Connect Ethernet and boot from the USB.

Check networking:

```bash
ping -c 3 archlinux.org
```

Check hardware:

```bash
lsblk
free -h
ip link
```

---

# 4. Install Arch with `archinstall`

Run:

```bash
archinstall
```

Recommended settings:

| Setting           | Choice               |
| ----------------- | -------------------- |
| Installation type | Use entire disk      |
| Filesystem        | ext4                 |
| Bootloader        | systemd-boot         |
| Kernel            | linux                |
| Network           | NetworkManager       |
| Profile           | Minimal              |
| Desktop           | None                 |
| Swap              | 2–4 GB               |
| Hostname          | `homebox`            |
| User              | Your normal username |

If systemd-boot causes problems with the Acer's firmware, use GRUB instead.

For the disk, use the entire drive only if there is nothing you need to preserve.

---

# 5. First boot

Log in and update:

```bash
sudo pacman -Syu
```

Install the basic tools:

```bash
sudo pacman -S \
    openssh \
    tmux \
    git \
    curl \
    wget \
    vim \
    htop \
    rsync \
    unzip
```

Set the timezone:

```bash
sudo timedatectl set-timezone Europe/Rome
sudo timedatectl set-ntp true
```

Set the hostname:

```bash
sudo hostnamectl set-hostname homebox
```

---

# 6. Configure networking

Enable NetworkManager:

```bash
sudo systemctl enable --now NetworkManager
```

Check:

```bash
nmcli device status
```

Make sure Ethernet is connected.

Find the IP:

```bash
ip -4 addr
```

For example:

```text
192.168.1.50
```

---

# 7. Configure SSH

Enable SSH:

```bash
sudo systemctl enable --now sshd
```

From your main computer, test:

```bash
ssh username@192.168.1.50
```

Replace the username and IP.

## SSH key

On your main computer:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_homebox
```

Copy the key:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519_homebox.pub username@192.168.1.50
```

Test:

```bash
ssh -i ~/.ssh/id_ed25519_homebox username@192.168.1.50
```

Add an SSH config entry on your main computer:

```sshconfig
Host homebox
    HostName 192.168.1.50
    User username
    IdentityFile ~/.ssh/id_ed25519_homebox
```

You can now use:

```bash
ssh homebox
```

---

# 8. Disable SSH password login

First make sure key authentication works in a separate terminal.

Then:

```bash
sudoedit /etc/ssh/sshd_config
```

Set:

```text
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
```

Restart SSH:

```bash
sudo systemctl restart sshd
```

Test again:

```bash
ssh homebox
```

Do not disable password authentication until key login has been tested.

---

# 9. Give the server a fixed LAN address

Use a **DHCP reservation in the router**.

For example:

```text
homebox → 192.168.1.50
```

This is preferable to manually configuring a static IP on the server because the router continues managing the network configuration.

---

# 10. Install Tailscale

Install:

```bash
sudo pacman -S tailscale
```

Enable it:

```bash
sudo systemctl enable --now tailscaled
```

Connect the machine:

```bash
sudo tailscale up
```

Open the authentication URL it provides.

Check:

```bash
tailscale status
tailscale ip
```

Test SSH using the Tailscale address:

```bash
ssh username@100.x.x.x
```

Enable MagicDNS in the Tailscale admin console.

You can then use the machine's Tailscale hostname instead of its IP.

---

# 11. Install AdGuard Home

AdGuard Home will provide DNS-based ad and tracker blocking.

Install using the official installer:

```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

Check the service:

```bash
sudo systemctl status AdGuardHome
```

Open the setup interface:

```text
http://192.168.1.50:3000
```

Use your server's actual IP.

### Initial configuration

Set:

- Web interface: LAN address
- DNS interface: LAN address or all interfaces
- Upstream DNS: Cloudflare, Quad9, or another trusted resolver
- Enable the default filter lists

Do not expose DNS port 53 to the Internet.

---

# 12. Test AdGuard before changing the router

From your main computer:

```bash
dig example.com @192.168.1.50
```

You should receive a DNS response.

Check the AdGuard dashboard and confirm the request appears.

Only after this works should you change the router's DNS.

---

# 13. Configure the router

Set the router's DHCP DNS server to:

```text
192.168.1.50
```

Avoid configuring a public secondary DNS such as `1.1.1.1` if you want all clients to use AdGuard.

Some routers automatically provide their own DNS proxy. If yours does, the exact configuration depends on the router.

---

# 14. Configure Tailscale DNS

In the Tailscale admin console, configure your AdGuard server as a DNS nameserver.

This allows Tailscale-connected devices to use AdGuard while away from home.

The resulting setup is:

```text
iPhone
   │
   └── Tailscale
          │
       homebox
          │
      AdGuard Home
          │
       Internet
```

---

# 15. tmux

Install it if necessary:

```bash
sudo pacman -S tmux
```

Create a persistent session:

```bash
tmux new -s server
```

Detach:

```text
Ctrl-b d
```

Reattach:

```bash
tmux attach -t server
```

Remux can connect to the machine over SSH and access these tmux sessions.

---

# 16. Configure the laptop to stay awake

Edit:

```bash
sudoedit /etc/systemd/logind.conf
```

Set:

```ini
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
```

Restart:

```bash
sudo systemctl restart systemd-logind
```

This allows you to close the lid without suspending the server.

Check the battery:

```bash
upower -e
upower -i "$(upower -e | grep BAT)"
```

If the battery is swollen or damaged, remove it.

---

# 17. Docker — optional

Don't install Docker unless you need it.

If you do:

```bash
sudo pacman -S docker
sudo systemctl enable --now docker
```

Then add your user to the Docker group:

```bash
sudo usermod -aG docker "$USER"
```

Log out and back in.

Use Docker for additional applications rather than putting critical infrastructure into unnecessary containers.

For example:

```text
Arch
├── SSH
├── Tailscale
├── AdGuard Home
└── Docker
    ├── Uptime Kuma
    └── other services
```

---

# 18. Useful maintenance

Check services:

```bash
systemctl --failed
```

Check disk:

```bash
df -h
```

Check memory:

```bash
free -h
```

Check CPU/processes:

```bash
htop
```

Check Tailscale:

```bash
tailscale status
```

Check AdGuard:

```bash
sudo systemctl status AdGuardHome
```

Update Arch manually:

```bash
sudo pacman -Syu
```

For an Arch server, don't blindly automate system upgrades.

---

# 19. Back up configuration

At minimum, keep backups of:

```text
/etc/ssh/
/etc/systemd/
/etc/NetworkManager/
AdGuard Home configuration
Docker compose files
```

The server should be replaceable. Don't make its disk the only copy of important data.

---

# 20. Final architecture

```text
                         Internet
                            │
                       SIM Router
                            │
              ┌─────────────┼─────────────┐
              │             │             │
          Ethernet        Ethernet       Wi-Fi
              │             │
           homebox          sky          rain
              │
       ┌──────┼──────┐
       │      │      │
    AdGuard Tailscale SSH
       │      │
       │      ├───────────────┐
       │      │               │
       │    iPhone          remote
       │                    devices
       │
    LAN DNS
```

Start with **Arch + Ethernet + SSH**. Verify remote administration. Then add **Tailscale**, verify that. Then add **AdGuard Home**, verify DNS, and only then change the router's DNS.

This keeps each failure isolated and makes recovery straightforward.
