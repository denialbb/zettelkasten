---
date: "\\[2023-04-18 Tue 20:48\\]"
id: 09ef2734-9408-47a9-b64c-2a672515fc13
title: CPU to performance in Linux
---

- Source: <https://www.rodolfocarvalho.net/blog/how-to-disable-cpu-powersave-on-linux/>

``` example
echo performance | sudo tee /sys/devices/system/cpu/cpu[0-9]*/cpufreq/scaling_governor
```
