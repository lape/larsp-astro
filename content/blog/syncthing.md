---
title: "Syncthing"
author: "Lars Peters"
pubDatetime: 2025-05-06T00:00:00Z
description: "Syncthing is a free, open-source file synchronization solution that works across multiple platforms, offering a transparent alternative to cloud services like iCloud and Dropbox."
ogImage: "/images/posts/syncthing/syncthing.jpg"
tags: ["Tools"]
---

The best (IMHO) multi-platform open-source file synchronization solution.

As much I wanted it to work, iCloud file synchronization used to give me headaches. I work with two Macs - one Mini in the office, and a MacBook on the go. In addition, I'm using a large iPad Pro and an older, small iPad Pro for traveling. My work files, mostly Git repositories of projects I am working on and additional reference material, should be shared across all these devices. I tried to use iCloud for this, but it was always a pain to get it to work reliably. I also used Dropbox in the past, but moved away after they went the course of integration everything and whatnot in their software. Also, it was a resource hog.

The problem with iCloud is that you don't really know what's going on. It's a black box. You can't see what's happening, and you can't really control it. When the service thinks your files might have been changed on another device, it will create a copy of the file with a suffix " 2". Sometimes this happens for hundreds of files in a folder, and I resorted to just deleting them with:

```
find . -name "*\ 2" -delete
```

Also, sometimes iCloud is not updating at all for some reason.

## Enter Syncthing

Yesterday, I was fed up with this and installed [Syncthing](https://github.com/syncthing/syncthing) on my Macs. It's a free, open-source file synchronization software that works on all major platforms and works really smoothly. I used it in the past already, and never had a problem.

### iOS

For iOS, there is a very good open source client app called [Synctrain](https://apps.apple.com/de/app/synctrain/id6553985316). There's also an older third party solution ([MöbiusSync](https://www.mobiussync.com/)), but I'd recommend Synctrain because it's much smoother.

There is a [goals document](https://github.com/syncthing/syncthing/blob/main/GOALS.md) describing Syncthing if you're interested.

### Linux install

```
sudo apt install syncthing
sudo systemctl enable syncthing@lape.service
sudo systemctl start syncthing@lape.service
```

### CLI commands

```
syncthing cli config devices add --device-id ...
syncthing cli config options relays-enabled set false
find . -name "*sync-conflict*" -print
```

### Files to ignore

```
(?d).DS_Store
Thumbs.db
desktop.ini
.Trashes
.Spotlight-V100
._*
lost+found
```
