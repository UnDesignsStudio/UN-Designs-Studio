"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";

const stepKeys = ["discovery", "design", "build", "launch"] as const;

export function ProcessPreview() {
  const t = useTranslations("process");

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.12em] text-[var(--accent)]">
            {t("label")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepKeys.map((key, i) => (
            <FadeIn key={key} delay={i * 0.05}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]/30 transition-all duration-300">
                <span className="text-4xl font-heading font-bold text-[var(--border)]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-heading font-semibold text-white">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-8 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            {t("timeline")}
          </p>
          <Link
            href="/process"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[var(--accent)] hover:underline cursor-pointer"
          >
            {t("label")} →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
