"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";

export function Positioning() {
  const t = useTranslations("positioning");

  const columns = [
    { label: t("whoLabel"), value: t("who") },
    { label: t("whatLabel"), value: t("what") },
    { label: t("whereLabel"), value: t("where") },
  ];

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {columns.map((col, i) => (
            <FadeIn key={col.label} delay={i * 0.1}>
              <div className="border-t border-[var(--border)] pt-6">
                <span className="text-xs font-medium tracking-[0.12em] text-[var(--text-muted)] block mb-3">
                  {col.label}
                </span>
                <p className="text-lg font-heading font-semibold text-[var(--text-primary)]">
                  {col.value}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
