import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

const parser = new MarkdownIt({ html: true, linkify: true });

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `<language>${SITE.lang}-${(SITE.lang as string) === "de" ? "DE" : "US"}</language>
      <atom:link href="${new URL("rss.xml", SITE.website).href}" rel="self" type="application/rss+xml" />`,
    items: sortedPosts.map(({ data, id, filePath, body }) => ({
      link: getPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      categories: data.tags,
      content: sanitizeHtml(parser.render(body ?? ""), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "title", "width", "height"],
        },
      }),
    })),
  });
}
