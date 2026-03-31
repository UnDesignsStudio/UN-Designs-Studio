"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Sparkles,
  Eye,
  Target,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const valueIcons = [Sparkles, Eye, Target] as const;
const valueKeys = ["craft", "transparency", "results"] as const;

export function AboutPage() {
  const t = useTranslations("about");

  const promiseItems = t("promise.items").split(", ");

  return (
    <main className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 lg:px-8 mb-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <span className="text-xs font-medium tracking-[0.12em] text-[var(--accent)]">
              {t("label")}
            </span>
            <h1 className="mt-3 text-4xl sm:text-6xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {t("description")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              {t("story")}
            </p>
            <p className="mt-6 text-[var(--text-secondary)] leading-relaxed text-lg">
              {t("storyMore")}
            </p>
          </FadeIn>

          {/* Promise */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-sm font-medium tracking-[0.08em] text-[var(--accent)] mb-6 uppercase">
                {t("promise.title")}
              </h3>
              <ul className="space-y-4">
                {promiseItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[var(--text-secondary)]"
                  >
                    <CheckCircle
                      size={18}
                      className="text-[var(--accent)] shrink-0"
                    />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
              {t("values.title")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <FadeIn key={key} delay={i * 0.05}>
                  <div className="border-t border-[var(--border)] pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              {t("cta")}
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[var(--accent)] text-black rounded-full font-semibold text-base hover:brightness-110 transition-all duration-200 cursor-pointer"
            >
              {t("cta")} <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
