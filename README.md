# larsp-astro

Source of Lars Peters' personal digital garden — [larsp.de](https://larsp.de).

Built with [Astro](https://astro.build) on top of the [AstroPaper](https://github.com/satnaing/astro-paper) theme. Statically generated and served via GitHub Pages.

## Development

Requires [Bun](https://bun.sh).

```bash
bun install
bun dev            # dev server at http://localhost:4321
bun run build      # production build incl. Pagefind index
bun run preview    # preview the production build locally
bun run lint       # ESLint
bun run format     # Prettier
```

## Content

Blog posts live as Markdown in `content/blog/`. Nested folders are allowed; files prefixed with `_` are ignored. The frontmatter schema is defined in `src/content.config.ts`, global settings in `src/config.ts`.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml` and publishes to GitHub Pages.

## License

Code: MIT (inherited from the AstroPaper theme).
Content (`content/`): © Lars Peters, all rights reserved.
