---
title: "MacOS setup"
author: "Lars Peters"
pubDatetime: 2025-10-19T00:00:00Z
description: "Installation and configuration steps for setting up a new Mac computer, including Homebrew package management, shell improvements with Oh My Zsh and Powerlevel10k, and development tools."
tags: ["Tools"]
---

My installation steps for setting up a new Mac computer.

## Essentials

```bash
# Homebrew (https://brew.sh)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# bat - better cat
brew install bat

# ripgrep - recursively searches directories for a regex pattern
brew install ripgrep
```

## Better Shell

```bash
# Oh my zsh
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Powerlevel10k theme
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# Change theme in .zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"

# Syntax highlighting and auto suggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Activate the plugin in ~/.zshrc:
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)
```

## Development

```bash
brew install git-delta
brew install httpie
brew install rbenv
brew install php
brew install yarn
brew install sass
brew install jq
brew install gh
```

## Install Homebrew packages from list

### Making a list of installed software

```bash
brew leaves > brews.txt
```

Next, include installed casks in the same list:

```bash
brew list --cask >> brews.txt
```

This appends the cask list to brews.txt, giving a complete list of all explicitly installed packages.

### Reviewing package descriptions

It is helpful to verify all packages are still needed on a new computer. Review packages as follows:

```bash
cat brews.txt | xargs brew desc –eval-all
```

This command provides a short description for each package in the list.

### Reinstalling on a new machine

Transfer brews.txt to the new computer, install Homebrew, and run:

```bash
xargs brew install < brews.txt
```

This installs all the packages listed in the file.
