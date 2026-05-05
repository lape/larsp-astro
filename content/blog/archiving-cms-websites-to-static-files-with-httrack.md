---
title: "Archiving CMS websites to static files with httrack"
author: "Lars Peters"
pubDatetime: 2025-04-23T00:00:00Z
description: "Guide to using httrack to archive CMS websites like Drupal and WordPress to static HTML files when sites are no longer actively maintained or need to be retired from production."
tags: ["Tools", "Hosting"]
---

Using httrack to archive a CMS website to keep it online as a static site.

## When to Archive CMS Sites

When a website built with a content management system like Drupal or WordPress is no longer updated with content or a campaign has ended, the webpages sometimes need to be archived for reference or remain online without further changes. It's not always feasible to upgrade all CMS components along the way. A major version change might require expensive custom module upgrades for a site no longer in production use. Archiving to static files is a practical solution.

## Using the httrack tool to archive a website

There are several options for archiving websites (see [Awesome Web Archiving List](https://github.com/iipc/awesome-web-archiving)). The [httrack](https://www.httrack.com/) command-line tool is a preferred option. On macOS using Homebrew, install it with:

```bash
brew install httrack
```

These are good options for mirroring:

```bash
httrack http://SITE_TO_ARCHIVE -O DESTINATION_DIR \
  -N "%h%p/%n/index%[page].%t" \
  -WQ%v --robots=0 --footer ''
```

What the flags do:

- `-W` mirror with wizard (asks about external links)
- `-Q` no log files
- `-%v` show progress on screen
- `-N "%h%p/%n/index%[page].%t"` write each page as `path/to/page/index.html` so URLs stay clean
- `--robots=0` ignore `robots.txt` (only do this on sites you own or have permission to mirror)
- `--footer ''` strip the httrack footer comment from each HTML file

The tool will prompt you if external links should be followed.

To avoid hammering the source server, throttle the crawl with `--max-rate=25000` (bytes per second) or limit concurrent connections with `-c2`.

### What this approach can't capture

Anything that depends on a live backend will not work in the static mirror: logged-in areas, search forms, comment submission, contact forms, and most JavaScript-driven dynamic content. Plan to either remove or replace those before going live.

## Post-Processing Steps

Relative links can be rewritten afterwards (e.g., "about.html" to "about"). This is optional but useful if you want to preserve URL paths for inbound links.

```bash
find . -name "*.html" -type f -print0 \
  | xargs -0 perl -i -pe "s/\/index.html/\//g"
```

Because of the `-N` template, the homepage ends up as `index/index.html` rather than at the root. Move it up and strip the now-incorrect `../` prefixes from include paths and links:

```bash
cp index/index.html index.html
perl -i -pe 's/\.\.\///g' index.html
```

If the source site uses HTTP Basic Auth, provide username and password as part of the URL: `username:password@your.url`

## Hosting Archived Sites

The resulting files can be served from inexpensive static web hosting like Netlify, Cloudflare Pages, or GitHub Pages.

## Alternative: wget --mirror

For very simple sites, `wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://example.com` can be enough and avoids the post-processing dance. httrack tends to handle messy CMS output (Drupal, WordPress) better, but `wget` is worth trying first if the site is small.

## References

- [Httrack users guide](http://www.httrack.com/html/fcguide.html)
- [Archiving Drupal sites](https://www.drupal.org/node/27882) on drupal.org
- [About archiving Drupal sites](https://www.lullabot.com/articles/sending-drupal-site-retirement-using-httrack) by Karen from Lullabot
