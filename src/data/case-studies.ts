// Non-translatable case study metadata. All user-facing copy lives in
// messages/{locale}.json under `caseStudies.{slug}.*` and is read via useTranslations.
// `posterImage`, when set, overrides `posterGradient`. Place images in /public/work/.
export type CaseStudyMeta = {
  slug: string;
  year: string;
  accent: string;
  posterLabel: string;
  posterGradient: string;
  posterImage?: string;
};

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: "meridian",
    year: "2025",
    accent: "#8b9dff",
    posterLabel: "Meridian°",
    posterGradient:
      "linear-gradient(135deg, #1a1f3a 0%, #2d3563 40%, #8b9dff 100%)",
    // posterImage: "/work/meridian-poster.jpg",
  },
  {
    slug: "kauza",
    year: "2024",
    accent: "#e8ff00",
    posterLabel: "KAUZA",
    posterGradient:
      "linear-gradient(135deg, #0a0b0d 0%, #1a1d22 50%, #3a3f0c 100%)",
    // posterImage: "/work/kauza-poster.jpg",
  },
];

export function getCaseStudyMeta(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
