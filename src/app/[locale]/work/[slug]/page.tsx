import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CaseStudyView } from "@/components/sections/case-study-view";
import { caseStudies, getCaseStudyMeta } from "@/data/case-studies";

export async function generateStaticParams() {
  const locales = ["en", "sr"] as const;
  return locales.flatMap((locale) =>
    caseStudies.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = getCaseStudyMeta(slug);
  if (!meta) return { title: "Case study not found" };
  const t = await getTranslations({
    locale,
    namespace: `caseStudies.${slug}`,
  });
  const title = `${t("client")} — Case Study`;
  return {
    title,
    description: t("summary"),
    openGraph: {
      title: `${title} · UN Designs Studio`,
      description: t("summary"),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · UN Designs Studio`,
      description: t("summary"),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const meta = getCaseStudyMeta(slug);
  if (!meta) notFound();

  const currentIdx = caseStudies.findIndex((c) => c.slug === meta.slug);
  const next = caseStudies[(currentIdx + 1) % caseStudies.length];

  return (
    <>
      <Navbar />
      <CaseStudyView study={meta} next={next} />
      <Footer />
    </>
  );
}
