---
title: "IMAP migration and backup"
author: "Lars Peters"
pubDatetime: 2026-02-05T00:00:00Z
description: "Notes on moving mail between servers and keeping local backups. The article covers two primary tools: imapsync for server-to-server migration and imap-backup for offline archiving."
tags: ["Tools"]
---

Notes on moving mail between servers and keeping local backups.

## imapsync

The go-to tool. Handles folder mapping, deduplication, resumable.

```bash
imapsync \
  --host1 old.server.com --user1 me@old.com --password1 xxx \
  --host2 new.server.com --user2 me@new.com --password2 yyy
```

Flags I actually use:

```
--dry                     # test run
--exclude "Spam|Trash"    # skip junk
--folder "INBOX"          # single folder only
--regextrans2 s/Sent Items/Sent/  # rename folders
```

[imapsync.lamiral.info](https://imapsync.lamiral.info/)

## imap-backup

Ruby gem, stores mail as Mbox + JSON index. Good for offline archives.

```bash
gem install imap-backup
imap-backup setup    # interactive config
imap-backup backup   # run it
```

[github.com/joeyates/imap-backup](https://github.com/joeyates/imap-backup)

## Gotchas

* Gmail/iCloud need app passwords
* Check destination quota before migrating
* `--dry` first, always
