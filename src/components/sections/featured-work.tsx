"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { caseStudies } from "@/data/case-studies";

export function FeaturedWork() {
  const t = useTranslations("work");

  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <span className="eyebrow">{t("label")}</span>
          <h2
            className="mt-6 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.03em] leading-[0.95] max-w-4xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-[var(--text-secondary)] max-w-2xl text-base md:text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {caseStudies.map((cs, i) => (
            <WorkCard
              key={cs.slug}
              slug={cs.slug}
              index={i}
              year={cs.year}
              posterLabel={cs.posterLabel}
              posterGradient={cs.posterGradient}
              posterImage={cs.posterImage}
              viewLabel={t("viewCase")}
              caseLabel={t("caseLabel")}
            />
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] py-2"
          >
            <span className="relative">
              {t("viewAll")}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--text-primary)] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--accent)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  slug,
  index,
  year,
  posterLabel,
  posterGradient,
  posterImage,
  viewLabel,
  caseLabel,
}: {
  slug: string;
  index: number;
  year: string;
  posterLabel: string;
  posterGradient: string;
  posterImage?: string;
  viewLabel: string;
  caseLabel: string;
}) {
  const cs = useTranslations(`caseStudies.${slug}`);
  const services = cs("services").split(", ");
  const metrics = [
    { label: cs("metric1Label"), value: cs("metric1Value") },
    { label: cs("metric2Label"), value: cs("metric2Value") },
    { label: cs("metric3Label"), value: cs("metric3Value") },
  ];
  const client = cs("client");
  const title = cs("title");
  const industry = cs("industry");
  const summary = cs("summary");

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const posterY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const labelY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const reversed = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center"
    >
      {/* Poster */}
      <Link
        href={`/work/${slug}`}
        className={`group relative block w-full overflow-hidden rounded-3xl aspect-[4/3] md:col-span-6 ring-1 ring-white/10 ${reversed ? "md:order-2" : ""}`}
        style={{ background: posterGradient }}
      >
        <motion.div
          style={{
            y: posterY,
            background: posterGradient,
            backgroundImage: posterImage ? `url(${posterImage})` : undefined,
            backgroundSize: posterImage ? "cover" : undefined,
            backgroundPosition: posterImage ? "center" : undefined,
          }}
          className="absolute inset-0 scale-110"
        />
        {!posterImage && (
          <motion.div
            style={{ y: labelY }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className="font-heading font-semibold text-white/90 tracking-[-0.04em] select-none"
              style={{
                fontSize: "clamp(3rem, 10vw, 8rem)",
                mixBlendMode: "soft-light",
              }}
            >
              {posterLabel}
            </span>
          </motion.div>
        )}

        {/* corner tag */}
        <div className="absolute top-5 left-5 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {caseLabel} {String(index + 1).padStart(2, "0")}
        </div>

        {/* view chip */}
        <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:text-black">
          {viewLabel}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        {/* grain overlay on poster */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "220px 220px",
          }}
        />
      </Link>

      {/* Meta column */}
      <div className={`md:col-span-6 ${reversed ? "md:order-1" : ""}`}>
        <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-6">
          <span>{client}</span>
          <span className="h-px w-6 bg-[var(--border-strong)]" />
          <span>{industry}</span>
          <span className="h-px w-6 bg-[var(--border-strong)]" />
          <span>{year}</span>
        </div>

        <h3
          className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.025em] leading-[1.05]"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
        >
          <Link
            href={`/work/${slug}`}
            className="hover:text-[var(--accent)] transition-colors duration-400"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-5 text-[var(--text-secondary)] leading-relaxed max-w-lg">
          {summary}
        </p>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div
                className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-none"
                style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}
              >
                {m.value}
              </div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text-muted)] leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <span
              key={s}
              className="inline-block px-3 py-1 rounded-full bg-white/[0.03] text-[var(--text-muted)] text-[0.7rem] font-medium border border-[var(--border)] tracking-wide"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
