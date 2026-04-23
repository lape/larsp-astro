---
title: "Favorite CLI Tools"
author: "Lars Peters"
pubDatetime: 2025-11-12T00:00:00Z
modDatetime: 2026-04-23T00:00:00Z
description: "Command line tool recommendations that save time and improve developer workflows. A curated collection of CLI tools including bat, HTTPie, jq, restic, ripgrep, and others that I find essential for daily work."
tags: ["Tools", "Resources"]
---

Command line tool recommendations

These CLI tools save me lots of time and I find them generally a joy to work with. It's all about sharing the love and magic, and maybe you'll find a new favorite or two. Let me [know](https://ruby.social/@lape) if you have a CLI tool that brings you joy - or comment below.

## bat - a cat(1) clone with wings

I love this. It's a drop-in replacement for `cat` that adds syntax highlighting, Git integration and lots more. It's written in Rust and is blazing fast. [sharkdp/bat: A cat(1) clone with wings](https://github.com/sharkdp/bat).

### How to use bat

To glance at a file using `bat`, simply provide the path:

```bash
bat /path/to/your/file
```

The syntax highlighting and file-specific metadata make `bat` a joy to use, ensuring you can inspect code and text files in style.

## Claude Code

Even though it's more application than classic tool, my favorite command line tool has recently become [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) (also see [AI/LLM index page](/posts/ai-llm-resources/)).

## ddrescue - Data Recovery from Failing Drives

When a hard drive starts dying, every read attempt matters. [GNU ddrescue](https://www.gnu.org/software/ddrescue/) is the tool you want in that situation. Unlike plain `dd`, it's specifically designed for damaged media — it rescues the good data first, then retries the bad sectors, and keeps a map file so you can pause and resume.

### Typical rescue workflow

```bash
# First pass: grab everything that reads easily
ddrescue /dev/sda backup.img backup.map

# Second pass: retry failed sectors (3 attempts each)
ddrescue -d -r3 /dev/sda backup.img backup.map

# Write recovered image to a new drive
ddrescue backup.img /dev/sdb restore.map
```

The map file is the key feature — it means you can unplug, let the drive cool down, and pick up exactly where you left off. I hope you never need this tool, but when you do, nothing else comes close.

## Homebrew - The missing macOS package manager

It's simply a must-have for every Mac user. Whether it's installing a new programming language, a database server, or the latest web framework, Homebrew streamlines the process, taking out the need for locating and manually downloading software.

### The brew command

Working with Homebrew is straightforward:

```bash
brew update
brew install <package>
```

## httpie - HTTP client for the command line

Making HTTP requests from the command line has never been more elegant than with httpie. It simplifies interaction with APIs and web services, offering a user-friendly interface and an eye-pleasing HTTP request syntax colorization.

There also is a very neat [httpie desktop application](https://httpie.io/desktop)!

### Crafting requests with httpie

A basic GET request:

```bash
https httpie.io/hello
```

Output:

```json
{
    "ahoy": [
        "Hello, World! 👋 Thank you for trying out HTTPie 🥳",
        "We hope this will become a friendship."
    ],
    "links": {
        "discord": "https://httpie.io/discord",
        "github": "https://github.com/httpie",
        "homepage": "https://httpie.io",
        "twitter": "https://twitter.com/httpie"
    }
}
```

## jq - Command-line JSON processor

`jq` is a sed-like tool that parses, manipulates, and displays JSON objects from the comfort of the command line. It excels at selectively filtering and transforming complex JSON data, which is a common task when working with APIs and backend services.

### Transforming with jq

Filtering results:

```bash
https httpie.io/hello | jq "{links}"
```

This will present just the links from the JSON response. `jq` is nice for quickly juggling JSON data.

## just - A Modern Command Runner

[just](https://github.com/casey/just) is what `make` should have been — a command runner without the build system baggage. Define project-specific shortcuts in a `justfile` and stop memorizing long commands.

### Example justfile

```just
# List available commands
default:
  @just --list

# Run the dev server
run:
  ./bin/dev

# Run all tests
test:
  ./bin/rails test
  ./bin/rails test:system

# Deploy to a specific environment
deploy env:
  ./deploy.sh {{env}}
```

No tab-vs-spaces headaches, proper error messages, and cross-platform support. It's one of those tools where you wonder how you ever lived without it.

## lando - Local development environment and DevOps tool built on Docker containers

For local development, [lando](https://lando.dev/) is mighty. It configures and manages Docker-based development environments, providing an abstraction layer that spares developers the mundanity of configuring development Docker environments and installing necessary tools and software versions.

### A lando starter

Creating a Wordpress site:

```bash
lando init --recipe wordpress
```

And with that simple command, you're on your way to local Wordpress development with a containerized environment. `lando` integrates with other tools such as composer, npm, and gulp to streamline development workflows. It's an excellent tool for building, testing, and deploying applications locally. One of the most powerful features is the ability to define multiple environments in a single configuration file (e.g. local, staging, production) that can be easily switched between.

## lazygit - Terminal UI Git Command Manager

[lazygit](https://github.com/jesseduffield/lazygit) is a simple yet powerful terminal UI with Norton Commander vibes that transforms how you interact with Git, making complex operations accessible through intuitive keyboard shortcuts.

It reduces context switching. Instead of running multiple commands and checking different windows, everything is visible in one organized interface. The tool even guides you through operations interactively - for example, it warns about divergence with upstream when pushing and lets you choose between force push or cancel.

## mise-en-place - Polyglot tool version manager

[mise](https://mise.jdx.dev/) is a tool that manages installations of programming language runtimes and other tools for local development. For example, it can be used to manage multiple versions of Node.js, Python, Ruby, Go, etc. on the same machine.

But it goes beyond runtimes — mise also installs CLI tools from cargo, npm, aqua, and other backends. Here's my global `~/.config/mise/config.toml`:

```toml
[tools]
ruby = "latest"
bun = "latest"
node = "24"
python = "latest"
rust = "latest"
lazygit = "latest"
glab = "latest"
pipx = "latest"
"cargo:ripgrep" = "latest"
"cargo:bat" = "latest"
"cargo:eza" = "latest"
"aqua:cli/cli" = "latest"            # gh
"aqua:casey/just" = "latest"         # just
"aqua:restic/restic" = "latest"      # restic
"npm:yarn" = "latest"                # yarn
```

One `mise install` on a fresh machine and everything is ready. No more hunting down individual install commands.

## ohmyzsh - Delightful framework for managing your zsh configuration

[ohmyzsh](https://ohmyz.sh/) transforms the already powerful `zsh` into a feature-rich and stylish terminal environment. With themes, plugins, and an active community contributing enhancements, ohmyzsh makes the terminal experience more personal and productive.

ohmyzsh also comes packed with a variety of plugins that add new features to `zsh`, such as an auto-suggestion tool and syntax highlighting, making it even more powerful. These can be easily enabled or disabled through the `~/.zshrc` file as well.

## rbenv - Ruby Version Manager

For managing multiple Ruby environments, [rbenv](https://rbenv.org/) is vital. It allows for per-project Ruby versions, which is a blessing when working on legacy software that demands older Ruby interpreters alongside the current releases.

### Install a Ruby version

```bash
# List installable versions
rbenv install -l

3.1.6
3.2.6
3.3.7
3.4.3
jruby-9.4.10.0
mruby-3.3.0
picoruby-3.0.0
truffleruby-24.1.1
truffleruby+graalvm-24.1.1

# Build and install version 3.4.3
rbenv install 3.4.3
```

### Switching global Ruby version

```bash
rbenv global 3.4.3
```

This indicates that generally Ruby 3.4.3 should be used, while local projects can specify a different version in their `.ruby-version` file. When executing `bundle` command, or any other code that requires a Ruby environment, rbenv will use the specified or else the global version.

## restic - Encrypted, Deduplicated Backups

[restic](https://github.com/restic/restic) is a fast and secure backup tool written in Go. Everything is encrypted end-to-end, snapshots are deduplicated, and it supports local storage, SFTP, S3, Backblaze B2, and many more backends. It's the tool I trust with my data.

### Getting started

```bash
# Initialize a backup repository
restic init -r /path/to/backup

# Create a snapshot
restic backup ~/sync --tag daily

# List all snapshots
restic snapshots

# Restore a specific file
restic restore latest --target /tmp/restore \
    --include "/home/user/sync/important-file.md"
```

### Browsing snapshots with FUSE

This is my favorite feature — mount the entire backup history as a filesystem and browse through it:

```bash
restic mount /tmp/restic-mount
# In another terminal: ls /tmp/restic-mount/snapshots/
# Copy, less, diff — whatever you need
fusermount -u /tmp/restic-mount
```

### Retention policy

```bash
restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune
```

Restic handles deduplication at the chunk level, so even large repositories stay surprisingly compact. Combined with a cron job, it's a fire-and-forget backup solution.

## ripgrep - Recursively search directories with speed

[ripgrep](https://github.com/BurntSushi/ripgrep) (`rg`) is grep, but fast. Really fast. It respects `.gitignore` by default, supports Unicode, and handles large codebases without breaking a sweat.

### Everyday usage

```bash
# Search the current directory
rg "pattern"

# Only certain file types
rg "pattern" -t ruby
rg "pattern" -t php

# List files with matches (no content)
rg -l "pattern"

# Show context (2 lines before and after)
rg -B 2 -A 2 "pattern"

# Exclude files
rg "pattern" -g '!*.min.js'

# Case-insensitive search
rg -i "pattern"
```

Once you start using `rg`, plain `grep` feels like dial-up internet. It's one of those tools that becomes muscle memory within a day.

## zsh-autosuggestions

Getting along well with ohmyzsh, this tool offers context-aware auto-completion, predicting your command line moves, and saving keystrokes in the process. Start by typing a command and, based on your history, zsh-autosuggestions will begin offering predictions. You can cycle through suggestions with the right arrow key or accept one with the tab key.
