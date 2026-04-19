export interface TagDefinition {
  slug: string;
  name: string;
  description: string;
}

export const TAGS: TagDefinition[] = [
  { slug: "tools", name: "Tools", description: "Helpful things" },
  {
    slug: "resources",
    name: "Resources",
    description: "Topic resource collections",
  },
  {
    slug: "ruby-on-rails",
    name: "Ruby on Rails",
    description: "Rails resources",
  },
  { slug: "cms", name: "CMS", description: "Content Management Systems" },
  {
    slug: "hosting",
    name: "Hosting",
    description: "Providing services on the Internet",
  },
  { slug: "ai", name: "AI", description: "LLMs and Artificial Intelligence" },
  {
    slug: "software",
    name: "Software",
    description: "(Open-Source) Applications",
  },
];

const TAG_BY_SLUG = new Map(TAGS.map(tag => [tag.slug, tag]));

export const getTagDefinition = (slug: string): TagDefinition | undefined =>
  TAG_BY_SLUG.get(slug);
