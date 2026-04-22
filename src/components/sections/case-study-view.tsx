"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CaseStudyMeta } from "@/data/case-studies";

export function CaseStudyView({
  study,
  next,
}: {
  study: CaseStudyMeta;
  next: CaseStudyMeta;
}) {
  const t = useTranslations("caseStudy");
  const cs = useTranslations(`caseStudies.${study.slug}`);
  const csNext = useTranslations(`caseStudies.${next.slug}`);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const posterScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const posterOpacity = useTransform(heroProgress, [0, 1], [1, 0.5]);

  const deliverables = cs("deliverables").split(", ");
  const approach = [
    cs("approach1"),
    cs("approach2"),
    cs("approach3"),
    cs("approach4"),
  ];
  const metrics = [
    { label: cs("metric1Label"), value: cs("metric1Value") },
    { label: cs("metric2Label"), value: cs("metric2Value") },
    { label: cs("metric3Label"), value: cs("metric3Value") },
  ];

  return (
    <main className="relative">
      {/* Back link */}
      <div className="pt-32 md:pt-36 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            {t("backToWork")}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="px-6 lg:px-10 pt-12 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-8">
            <span>{cs("client")}</span>
            <span className="h-px w-6 bg-[var(--border-strong)]" />
            <span>{cs("industry")}</span>
            <span className="h-px w-6 bg-[var(--border-strong)]" />
            <span>{study.year}</span>
          </div>
          <h1
            className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.035em] leading-[0.95] max-w-5xl"
            style={{ fontSize: "clamp(2.25rem, 6.5vw, 6rem)" }}
          >
            {cs("title")}
          </h1>
          <p className="mt-8 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {cs("summary")}
          </p>

          {/* Meta grid */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[var(--border)] pt-10 text-left">
            <MetaItem label={t("metaClient")} value={cs("client")} />
            <MetaItem label={t("metaYear")} value={study.year} />
            <MetaItem label={t("metaRole")} value={cs("roles").split(", ").join(" · ")} />
            <MetaItem label={t("metaServices")} value={cs("services").split(", ").join(" · ")} />
          </div>
        </div>
      </section>

      {/* Poster */}
      <section className="relative px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{ scale: posterScale, opacity: posterOpacity }}
            className="relative aspect-[16/9] rounded-3xl overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: study.posterGradient,
                backgroundImage: study.posterImage ? `url(${study.posterImage})` : undefined,
                backgroundSize: study.posterImage ? "cover" : undefined,
                backgroundPosition: study.posterImage ? "center" : undefined,
              }}
            />
            {!study.posterImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-heading font-semibold text-white/90 tracking-[-0.04em] select-none"
                  style={{
                    fontSize: "clamp(4rem, 14vw, 14rem)",
                    mixBlendMode: "soft-light",
                  }}
                >
                  {study.posterLabel}
                </span>
              </div>
            )}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "220px 220px",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <span className="eyebrow mb-10">{t("resultsLabel")}</span>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 border-t border-[var(--border)] pt-12 text-center">
            {metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.035em] leading-[0.95]"
                  style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                >
                  {m.value}
                </div>
                <div className="mt-4 text-[0.75rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <span className="eyebrow mb-8">{t("problemLabel")}</span>
          <p
            className="font-heading font-medium text-[var(--text-primary)] tracking-[-0.02em] leading-[1.2]"
            style={{ fontSize: "clamp(1.5rem, 2.75vw, 2.4rem)" }}
          >
            {cs("problem")}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 lg:px-10 py-20 md:py-28 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="eyebrow mb-10">{t("approachLabel")}</span>
          <ol className="w-full space-y-8">
            {approach.map((step, i) => (
              <li key={i} className="flex items-start gap-5">
                <span className="font-heading text-[0.75rem] tracking-[0.22em] text-[var(--text-muted)] pt-2 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[var(--text-primary)] leading-relaxed"
                  style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deliverables */}
      <section className="px-6 lg:px-10 py-20 md:py-28 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="eyebrow mb-10">{t("deliverablesLabel")}</span>
          <ul className="w-full space-y-5">
            {deliverables.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-[var(--text-primary)]"
              >
                <span className="mt-[0.7em] inline-block h-px w-8 bg-[var(--accent)] shrink-0" />
                <span className="text-lg leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Outcome */}
      <section className="px-6 lg:px-10 py-20 md:py-28 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <span className="eyebrow mb-8">{t("outcomeLabel")}</span>
          <p
            className="text-[var(--text-primary)] leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}
          >
            {cs("outcome")}
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 lg:px-10 py-24 md:py-36 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <span
            aria-hidden
            className="block font-heading font-semibold text-[var(--accent)] leading-none mb-2"
            style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
          >
            &ldquo;
          </span>
          <blockquote
            className="font-heading font-medium text-[var(--text-primary)] tracking-[-0.02em] leading-[1.15]"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.75rem)" }}
          >
            {cs("quote")}
          </blockquote>
          <footer className="mt-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--text-primary)]">
              {cs("quoteAuthor")}
            </span>
            <span className="h-px w-6 bg-[var(--border-strong)]" />
            <span>{cs("quoteRole")}</span>
          </footer>
        </div>
      </section>

      {/* Next case study */}
      <section className="px-6 lg:px-10 pb-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto pt-24 flex flex-col items-center">
          <span className="eyebrow mb-8">{t("nextLabel")}</span>
          <Link
            href={`/work/${next.slug}`}
            className="group block w-full rounded-3xl overflow-hidden aspect-[21/9] relative"
          >
            <div
              aria-hidden
              className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                background: next.posterGradient,
                backgroundImage: next.posterImage ? `url(${next.posterImage})` : undefined,
                backgroundSize: next.posterImage ? "cover" : undefined,
                backgroundPosition: next.posterImage ? "center" : undefined,
              }}
            />
            {!next.posterImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-heading font-semibold text-white/90 tracking-[-0.04em] select-none"
                  style={{
                    fontSize: "clamp(3rem, 9vw, 8rem)",
                    mixBlendMode: "soft-light",
                  }}
                >
                  {next.posterLabel}
                </span>
              </div>
            )}
            <div className="absolute top-6 left-6 text-[0.7rem] uppercase tracking-[0.22em] text-white/80">
              {csNext("client")} · {csNext("industry")}
            </div>
            <div className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:text-black">
              {t("nextCta")}
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        {label}
      </div>
      <div className="mt-2 text-sm text-[var(--text-primary)] leading-snug">
        {value}
      </div>
    </div>
  );
}
