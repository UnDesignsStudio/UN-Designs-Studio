"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const stepKeys = ["discovery", "design", "build", "launch"] as const;

export function ProcessPreview() {
  const t = useTranslations("process");

  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16 md:mb-20">
          <span className="eyebrow">{t("label")}</span>
          <h2
            className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.03em] leading-[0.95] max-w-4xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
            {t("subtitle")}
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {t("timeline")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {stepKeys.map((key, i) => (
            <ProcessCard
              key={key}
              index={i}
              total={stepKeys.length}
              title={t(`steps.${key}.title`)}
              description={t(`steps.${key}.description`)}
              duration={t(`steps.${key}.duration`)}
              deliverables={t(`steps.${key}.deliverables`)}
              stepLabel={t("stepLabel")}
              deliverablesLabel={t("deliverablesInlineLabel")}
            />
          ))}
        </div>

        {/* CTA footer */}
        <div className="mt-20 flex flex-col items-center text-center gap-5">
          <p className="text-sm text-[var(--text-secondary)] max-w-md">
            {t("cta")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 h-14 rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-black transition-[filter,box-shadow] duration-300 hover:brightness-105 hover:shadow-[0_0_48px_0_var(--accent-glow)]"
          >
            {t("cta")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  index,
  total,
  title,
  description,
  duration,
  deliverables,
  stepLabel,
  deliverablesLabel,
}: {
  index: number;
  total: number;
  title: string;
  description: string;
  duration: string;
  deliverables: string;
  stepLabel: string;
  deliverablesLabel: string;
}) {
  const items = deliverables.split(", ");
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-sm p-8 md:p-10 overflow-hidden"
    >
      {/* oversized background numeral */}
      <span
        aria-hidden
        className="absolute -bottom-10 -right-2 font-heading font-semibold text-[14rem] leading-none tracking-[-0.08em] text-white/[0.03] pointer-events-none select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-6">
        <span>
          {stepLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="h-px w-10 bg-[var(--border-strong)]" />
        <span className="text-[var(--accent)]">{duration}</span>
      </div>

      <h3
        className="relative font-heading font-semibold text-[var(--text-primary)] tracking-[-0.025em] leading-[1.02]"
        style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
      >
        {title}
      </h3>

      <p className="relative mt-4 text-[var(--text-secondary)] leading-relaxed max-w-md">
        {description}
      </p>

      <div className="relative mt-8 pt-6 border-t border-[var(--border)]">
        <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
          {deliverablesLabel}
        </span>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-[var(--text-primary)]"
            >
              <span className="mt-[0.55em] inline-block h-px w-5 bg-[var(--accent)] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
