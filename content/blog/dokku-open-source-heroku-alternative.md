---
title: "Dokku: Open source Heroku alternative"
author: "Lars Peters"
pubDatetime: 2025-06-16T00:00:00Z
description: "Dokku is a self-hosted open-source Platform as a Service similar to Heroku. It's lightweight, stable, and supports both Buildpacks and Dockerfiles for application deployment."
ogImage: "/images/posts/dokku-open-source-heroku-alternative/dokku-hero.png"
tags: ["Hosting", "Tools"]
---

Dokku is a self-hosted open-source PaaS similar to Heroku.

My favorite hosting solution for several years. It's lightweight, open-source and really stable. There are two general modes of operation: Buildpacks (e.g. Herokuish) and Dockerfiles.

On a freshly installed Linux machine, after installing Dokku you can push to Git repos on the server, and a container will be build and started for your app, with Nginx as a reverse proxy running in front of everything.

## Installation

### Linux

```bash
# download the installation script
wget -NP . https://dokku.com/bootstrap.sh

# run the installer
sudo DOKKU_TAG=v0.35.18 bash bootstrap.sh
```

### Mac (Homebrew)

```bash
brew install dokku/repo/dokku
```

### Plugins

- [dokku-letsencrypt](https://github.com/dokku/dokku-letsencrypt) - Automatic Let's Encrypt TLS Certificate installation
- [dokku-mariadb](https://github.com/dokku/dokku-mariadb) - MariaDB plugin
- [dokku-postgres](https://github.com/dokku/dokku-postgres) - PostgreSQL plugin
- [dokku-redirect](https://github.com/dokku/dokku-redirect) - Simple redirects for applications

## General config settings

### Change deploy branch

```bash
dokku git:set deploy-branch main
```

### Timezone

```bash
dokku config:set TZ=Europe/Berlin
```

## Nginx settings

### Disable HSTS header

```bash
dokku nginx:set hsts false
dokku proxy:build-config
```

### Max upload size

```bash
dokku nginx:set sitename client-max-body-size 25m
```

### Rate limiting

See [Rate limiting with dokku](https://www.joseferben.com/posts/rate-limiting-with-dokku)

## Redirects

Redirect www to non-www using [dokku-redirect](https://github.com/dokku/dokku-redirect) plugin:

```bash
dokku redirect:set larsp www.larsp.de larsp.de
-----> Configuring redirect for www.larsp.de to larsp.de via HTTP 301...
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

```
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
