"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Code,
  Layers,
  Paintbrush,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const services = [
  { key: "web", id: "web-design", icon: Code },
  { key: "uiux", id: "ui-ux", icon: Layers },
  { key: "branding", id: "branding", icon: Paintbrush },
  { key: "app", id: "app-development", icon: Smartphone },
] as const;

export function ServicesPage() {
  const t = useTranslations("servicesPage");

  return (
    <main className="pt-32 pb-24">
      {/* Page hero */}
      <section className="px-6 lg:px-8 text-center mb-24">
        <FadeIn>
          <span className="text-xs font-medium tracking-[0.12em] text-[var(--accent)]">
            {t("title").toUpperCase()}
          </span>
          <h1 className="mt-3 text-4xl sm:text-6xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>
      </section>

      {/* Service sections */}
      {services.map((service, sIdx) => {
        const Icon = service.icon;
        const includes = t(`${service.key}.includes`).split(", ");
        const approaches = [
          t(`${service.key}.approach1`),
          t(`${service.key}.approach2`),
          t(`${service.key}.approach3`),
        ];

        return (
          <section
            key={service.id}
            id={service.id}
            className="py-24 px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <FadeIn>
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  {/* Left */}
                  <div className="lg:w-2/5 lg:sticky lg:top-24">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] mb-6">
                      <Icon size={28} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
                      {t(`${service.key}.title`)}
                    </h2>
                    <p className="mt-2 text-lg italic text-[var(--text-muted)]">
                      {t(`${service.key}.hook`)}
                    </p>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                      {t(`${service.key}.description`)}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-[var(--accent)] text-black text-sm font-semibold hover:brightness-110 transition-all duration-200 cursor-pointer"
                    >
                      {t(`${service.key}.cta`)} <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Right */}
                  <div className="lg:w-3/5 space-y-8">
                    {/* What's included */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
                      <h3 className="text-sm font-medium tracking-[0.08em] text-[var(--text-muted)] mb-4 uppercase">
                        What&apos;s included
                      </h3>
                      <ul className="space-y-3">
                        {includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-[var(--text-secondary)]"
                          >
                            <CheckCircle
                              size={16}
                              className="text-[var(--accent)] shrink-0"
                            />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Our approach */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
                      <h3 className="text-sm font-medium tracking-[0.08em] text-[var(--text-muted)] mb-4 uppercase">
                        Our approach
                      </h3>
                      <div className="space-y-4">
                        {approaches.map((step, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-2xl font-heading font-bold text-[var(--border)]">
                              0{i + 1}
                            </span>
                            <p className="text-sm text-[var(--text-secondary)] pt-1">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why this matters */}
                    <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-8">
                      <h3 className="text-sm font-medium tracking-[0.08em] text-[var(--accent)] mb-3 uppercase">
                        Why this matters
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {t(`${service.key}.why`)}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {sIdx < services.length - 1 && (
                <div className="mt-24 border-t border-[var(--border)]" />
              )}
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              {t("readyTitle")}
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] text-lg">
              {t("readySubtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[var(--accent)] text-black rounded-full font-semibold text-base hover:brightness-110 transition-all duration-200 cursor-pointer"
            >
              {t("readyCta")} <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
