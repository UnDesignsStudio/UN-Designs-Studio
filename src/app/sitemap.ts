import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://undesignsstudio.com";

const locales = ["en", "sr"] as const;
const staticPaths = ["", "work", "services", "process", "about", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE}/${locale}${path ? `/${path}` : ""}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.8,
      });
    }
    for (const cs of caseStudies) {
      entries.push({
        url: `${SITE}/${locale}/work/${cs.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
