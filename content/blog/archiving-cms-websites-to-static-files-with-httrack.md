---
title: "Archiving CMS websites to static files with httrack"
author: "Lars Peters"
pubDatetime: 2025-04-23T00:00:00Z
description: "Guide to using httrack to archive CMS websites like Drupal and WordPress to static HTML files when sites are no longer actively maintained or need to be retired from production."
tags: ["Tools", "Hosting"]
---

Using httrack to archive a CMS website to keep only as static site.

## When to Archive CMS Sites

When a website built with a content management system like Drupal or WordPress is no longer updated with content or a campaign has ended, the webpages sometimes need to be archived for reference or remain online without further changes. It's not always feasible to upgrade all CMS components along the way. A major version change might require expensive custom module upgrades for a site no longer in production use. Archiving to static files is a practical solution.

## Using the httrack tool to archive a website

There are several options for archiving websites (see [Awesome Web Archiving List](https://github.com/iipc/awesome-web-archiving)). The [httrack](https://www.httrack.com/) command line tool is a preferred option. On macOS using Homebrew, install it with:

```bash
brew install httrack
```

These optimal httrack options for mirroring:

```bash
httrack http://SITE_TO_ARCHIVE -O DESTINATION_DIR \
  -N "%h%p/%n/index%[page].%t" \
  -WqQ%v --robots=0 --footer ''
```

The tool will prompt you if external links should be followed.

## Post-Processing Steps

Relative links can be rewritten afterwards (e.g., "about.html" to "about"). This is optional but useful if you want to preserve URL paths for inbound links.

```bash
find . -name "*.html" -type f -print0 \
  | xargs -0 perl -i -pe "s/\/index.html/\//g"
```

Copy the homepage index from `index/index.html` to the site root and change include paths and links in it (remove "../" everywhere).

If the source site uses HTTP authentication, provide username and password as part of the URL: `username:password@your.url`

## Hosting Archived Sites

The resulting files can be served from inexpensive static web hosting like Netlify or GitHub Pages.

## References

- [Httrack users guide](http://www.httrack.com/html/fcguide.html)
- [Archiving Drupal sites](https://www.drupal.org/node/27882) on drupal.org
- [About archiving Drupal sites](https://www.lullabot.com/articles/sending-drupal-site-retirement-using-httrack) by Karen from Lullabot
