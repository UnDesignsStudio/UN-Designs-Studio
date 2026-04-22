"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/case-studies";

export function WorkIndex() {
  const t = useTranslations("workPage");

  return (
    <main className="relative pt-40 pb-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28 flex flex-col items-center text-center">
          <span className="eyebrow">{t("label")}</span>
          <h1
            className="mt-6 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.035em] leading-[0.92] max-w-5xl"
            style={{ fontSize: "clamp(2.5rem, 7.5vw, 7rem)" }}
          >
            {t("title")}
          </h1>
          <p className="mt-8 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        {/* List */}
        <ul className="border-t border-[var(--border)]">
          {caseStudies.map((cs, i) => (
            <WorkRow
              key={cs.slug}
              slug={cs.slug}
              index={i}
              year={cs.year}
              posterLabel={cs.posterLabel}
              posterGradient={cs.posterGradient}
            />
          ))}
        </ul>

        {/* Footer CTA */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <h2
              className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.025em] leading-[1]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              {t("ctaTitle")}
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center gap-3 rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-black transition-[filter,box-shadow] duration-300 hover:brightness-105 hover:shadow-[0_0_48px_0_var(--accent-glow)]"
            >
              {t("ctaButton")}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function WorkRow({
  slug,
  index,
  year,
  posterLabel,
  posterGradient,
}: {
  slug: string;
  index: number;
  year: string;
  posterLabel: string;
  posterGradient: string;
}) {
  const cs = useTranslations(`caseStudies.${slug}`);

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-[var(--border)]"
    >
      <Link
        href={`/work/${slug}`}
        className="group grid grid-cols-12 gap-4 items-center py-10 md:py-14 relative"
      >
        <span className="col-span-2 md:col-span-1 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="col-span-10 md:col-span-5 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.025em] text-2xl md:text-3xl lg:text-4xl leading-[1.05] group-hover:text-[var(--accent)] transition-colors duration-400">
          {cs("client")}
        </span>
        <span className="hidden md:block col-span-3 text-sm text-[var(--text-secondary)] leading-snug">
          {cs("title")}
        </span>
        <span className="hidden md:block col-span-2 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {cs("industry")} · {year}
        </span>
        <span className="col-span-12 md:col-span-1 flex md:justify-end mt-3 md:mt-0">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-black">
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </span>

        {/* Hover poster peek (desktop only) */}
        <span
          aria-hidden
          className="hidden lg:block absolute right-32 top-1/2 -translate-y-1/2 w-48 h-32 rounded-xl overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none ring-1 ring-white/10"
          style={{ background: posterGradient }}
        >
          <span
            className="absolute inset-0 flex items-center justify-center text-white/90 font-heading font-semibold"
            style={{
              fontSize: "1.4rem",
              mixBlendMode: "soft-light",
            }}
          >
            {posterLabel}
          </span>
        </span>
      </Link>
    </motion.li>
  );
}
