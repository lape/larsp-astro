import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconMastodon from "@/assets/icons/IconMastodon.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
  rel?: string;
}

export const SOCIALS: Social[] = [
  {
    name: "Mastodon",
    href: "https://ruby.social/@lape",
    linkTitle: `${SITE.author} on Mastodon`,
    icon: IconMastodon,
    rel: "me",
  },
  {
    name: "Contact",
    href: "https://itpeters.com/kontakt",
    linkTitle: `Contact ${SITE.author}`,
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
