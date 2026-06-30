---
title: "Dokku: Open source Heroku alternative"
author: "Lars Peters"
pubDatetime: 2025-06-16T00:00:00Z
modDatetime: 2026-06-30T00:00:00Z
description: "Dokku is a self-hosted open-source Platform as a Service similar to Heroku. It's lightweight, stable, and supports both Buildpacks and Dockerfiles for application deployment."
ogImage: "/images/posts/dokku-open-source-heroku-alternative/dokku-hero.png"
tags: ["Hosting", "Tools"]
---

Dokku is a self-hosted open-source PaaS similar to Heroku.

My favorite hosting solution for several years. It's lightweight, open-source and really stable. There are two general modes of operation: Buildpacks (e.g. Herokuish) and Dockerfiles.

On a freshly installed Linux machine, after installing Dokku you can push to Git repos on the server, and a container will be built and started for your app, with Nginx as a reverse proxy running in front of everything.

## Installation

### Linux (Debian/Ubuntu)

Dokku runs on Ubuntu 22.04/24.04 or Debian 11+ (amd64 and arm64). The bootstrap script is now versioned - grab the [latest release](https://github.com/dokku/dokku/releases) and pin the same tag for the installer:

```bash
# download the bootstrap script for a specific release
wget -NP . https://dokku.com/install/v0.38.19/bootstrap.sh

# run the installer, pinning the same version via DOKKU_TAG
sudo DOKKU_TAG=v0.38.19 bash bootstrap.sh
```

### Mac (Homebrew)

```bash
brew install dokku/repo/dokku
```

### Plugins

- [dokku-letsencrypt](https://github.com/dokku/dokku-letsencrypt) - Automatic Let's Encrypt TLS Certificate installation
- [dokku-postgres](https://github.com/dokku/dokku-postgres) - PostgreSQL plugin
- [dokku-mariadb](https://github.com/dokku/dokku-mariadb) - MariaDB plugin
- [dokku-redis](https://github.com/dokku/dokku-redis) - Redis plugin
- [dokku-redirect](https://github.com/dokku/dokku-redirect) - Simple redirects for applications

Plugins are installed from the server with:

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
```

## Deploying an app

Create the app on the server:

```bash
dokku apps:create myapp
```

Then, from your local repo, add the server as a Git remote and push:

```bash
git remote add dokku dokku@your-server.example.com:myapp
git push dokku main
```

### Let's Encrypt

After the app is reachable on its domain:

```bash
dokku letsencrypt:set myapp email you@example.com
dokku letsencrypt:enable myapp
```

Certificates are only valid for 90 days, so add the cron job once to auto-renew them across all apps:

```bash
dokku letsencrypt:cron-job --add
```

## General config settings

### Change deploy branch

```bash
dokku git:set deploy-branch main
```

### Timezone

Set it globally for all apps, or drop `--global` and pass an app name to scope it:

```bash
dokku config:set --global TZ=Europe/Berlin
```

## Nginx settings

### Disable HSTS header

```bash
dokku nginx:set myapp hsts false
dokku proxy:build-config
```

### Max upload size

```bash
dokku nginx:set myapp client-max-body-size 25m
```

### Rate limiting

See [Rate limiting with dokku](https://www.joseferben.com/posts/rate-limiting-with-dokku)

## Redirects

Redirect www to non-www using [dokku-redirect](https://github.com/dokku/dokku-redirect) plugin:

```bash
dokku redirect:set larsp www.larsp.de larsp.de
# -----> Configuring redirect for www.larsp.de to larsp.de via HTTP 301...
```

## Ruby on Rails

### Rails config

```bash
dokku config:set myrailsapp \
  SECRET_KEY_BASE=mysecret RAILS_ENV=production \
  RACK_ENV=production RAILS_LOG_TO_STDOUT=enabled \
  RAILS_SERVE_STATIC_FILES=enabled
```

## PHP

### Troubleshooting buildpack error

In case there is a problem with the PHP buildpack:

```text
/tmp/buildpacks/08_buildpack-php/bin/compile: line 236: /tmp/buildpacks/08_buildpack-php/support/build/_util/formulae-hash.sh: No such file or directory
```

Reset the PHP herokuish buildpack:

```bash
rm -rf /home/dokku/<app>/cache/*
dokku config:set <app> BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-php --no-restart
dokku ps:rebuild <app>
```

## Links

- [awesome-dokku](https://github.com/kot-behemoth/awesome-dokku) - A curated list of awesome Dokku resources and tools
