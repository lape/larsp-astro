---
title: "Ghost CMS"
author: "Lars Peters"
pubDatetime: 2025-09-04T00:00:00Z
description: "Ghost is a fantastic open-source, headless Node.js CMS that serves as my preferred system for setting up content sites. It's fully open-source and powers blogs for major organizations like OpenAI and Mozilla."
tags: ["CMS"]
---

My favorite open-source CMS for content sites

[Ghost](https://ghost.org/?ref=larsp.de) is a fantastic open-source, headless Node.js CMS and my go-to system for setting up content sites (e.g. my German consulting business site [itpeters.com](https://itpeters.com/?ref=larsp.de) or my private travel logbook [reisepedia.de](https://reisepedia.de/?ref=larsp.de)). Essentially, it's a customizable platform for running blogs, magazines, or journals. It's fully [open-source](https://github.com/TryGhost/Ghost?ref=larsp.de) and runs blogs from OpenAI, DigitalOcean, Mozilla and many other big names.

The Ghost Foundation is offering a hosted version of Ghost, so it's accessible for non-technical content creators. This is really great and should be used by all means, if you don't want to deal with the technical aspects of running a web server. For me, however, it comes natural to set up a Ghost instance on my own server with the [offical Docker image](https://hub.docker.com/_/ghost/?ref=larsp.de) and [Dokku](https://larsp.de/dokku-open-source-heroku-alternative/).

There are also a ton of themes for purchase (and for free!) on [Ghost's official website](https://ghost.org/themes/?ref=larsp.de). I personally like the themes from [Bright Themes](https://brightthemes.com/?ref=larsp.de), which are very well designed and easy to customize. They offer a lifetime license for all themes, which I think is a fantastic deal. This site uses the [Array](https://brightthemes.com/themes/array?ref=larsp.de) theme by Bright Themes.

![Ghost CMS admin dashboard](/images/posts/ghost-cms/ghost-admin.png)

## Key features

- Very fast and stable
- Open Source (MIT license)
- Paid subscription and membership support
- SEO and social media optimization
- Newsletter integration
- Native REST API in core
- Admin dashboard
- Hosted version available
- Self-hosting possible and well-documented
- Great themes available (paid and free)

## Links

- [A complete guide to code snippets](https://ghost.org/tutorials/code-snippets-in-ghost/?ref=larsp.de)
- [How to Add Syntax Highlighting to Ghost](https://brightthemes.com/blog/ghost-syntax-highlighting?ref=larsp.de)
- [Adding an Edit link to Ghost posts](https://baty.net/posts/2024/11/adding-an-edit-link-to-ghost-posts/?ref=larsp.de)

## Notes

### Sort posts on last updated

```handlebars
{{#get "posts" include="authors,tags" order="updated_at desc"
  limit=@config.posts_per_page}}
  {{> post-feed}}
{{/get}}
```

**index.hbs**

```handlebars
{{!-- Date --}}
<time class="leading-none font-medium" datetime="{{date updated_at format="YYYY-MM-DD"}}">{{date updated_at}}</time>
```

**post-card.hbs**

### Code word wrap

```css
code[class*="language-"], 
pre[class*="language-"] {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: normal;
    overflow-x: auto;
}

/* Mobile responsive adjustments */
@media screen and (max-width: 768px) {
    code[class*="language-"], 
    pre[class*="language-"] {
        font-size: 0.85em;
        line-height: 1.3;
        -webkit-overflow-scrolling: touch;
    }
}
```
