import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  redirects: {
    "/ai-llm-resources": "/posts/ai-llm-resources/",
    "/archiving-cms-websites-to-static-files-with-httrack":
      "/posts/archiving-cms-websites-to-static-files-with-httrack/",
    "/barcode-pdfs-with-ruby-on-rails":
      "/posts/barcode-pdfs-with-ruby-on-rails/",
    "/dokku-open-source-heroku-alternative":
      "/posts/dokku-open-source-heroku-alternative/",
    "/favorite-cli-tools": "/posts/favorite-cli-tools/",
    "/ghost-cms": "/posts/ghost-cms/",
    "/imap-migration-and-backup": "/posts/imap-migration-and-backup/",
    "/macos-setup": "/posts/macos-setup/",
    "/open-source-software": "/posts/open-source-software/",
    "/rails-translation-cheatsheet": "/posts/rails-translation-cheatsheet/",
    "/ruby-on-rails-resources": "/posts/ruby-on-rails-resources/",
    "/syncthing": "/posts/syncthing/",
  },
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      theme: "night-owl",
      wrap: true,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore Type mismatch between @tailwindcss/vite and Vite's PluginOption
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  ],
});
