import { siteConfig } from "@/data/site";

export default function sitemap() {
  const languages = { vi: siteConfig.url, en: `${siteConfig.url}/en` };
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteConfig.url}/en`, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
