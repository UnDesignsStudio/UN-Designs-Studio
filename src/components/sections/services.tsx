"use client";

import { Code, Layers, Paintbrush, Smartphone, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";

const serviceKeys = [
  { key: "web", icon: Code, href: "/services#web-design" },
  { key: "uiux", icon: Layers, href: "/services#ui-ux" },
  { key: "branding", icon: Paintbrush, href: "/services#branding" },
  { key: "app", icon: Smartphone, href: "/services#app-development" },
] as const;

export function Services() {
  const t = useTranslations("services");

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceKeys.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.key} delay={i * 0.05}>
                <Link href={service.href}>
                  <div className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 hover:border-[var(--accent)]/30 hover:bg-[var(--surface-2)] transition-all duration-300 h-full cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)]/20 transition-colors">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-white">
                        {t(`items.${service.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
                      {t(`items.${service.key}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {t(`items.${service.key}.tags`)
                        .split(", ")
                        .map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-block px-3 py-1 rounded-full bg-white/5 text-[var(--text-muted)] text-xs font-medium border border-[var(--border)]"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3} className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent)] text-black font-semibold text-sm hover:brightness-110 transition-all duration-200 cursor-pointer"
          >
            {t("cta")} <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
