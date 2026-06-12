---
date: "\\[2022-12-11 Sun 02:35\\]"
id: 56c4ba1f-c53b-4278-8328-22c055dc0716
title: Open Twitch Streams w/ rofi
---

- <https://thisisnem.com/2020/07/06/simple-little-rofi-script/>

``` bash
#!/bin/bash

chosen=$(echo -e “twitchchannelnamehere” | rofi -dmenu -i)

if [[ $chosen = “twitchchannelnamehere” ]]; then

firefox -new-window https://www.twitch.tv/popout/twitchchannelnamehere/chat?popout= ; streamlink –player mpv twitch.tv/twitchchannelnamehere best

elif ##just used as an example to show how to add more channels

 

fi
```
