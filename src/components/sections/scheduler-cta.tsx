"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function SchedulerCta() {
  const t = useTranslations("scheduler");

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 md:p-16 relative overflow-hidden">
            {/* Subtle accent glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(232,255,0,0.06) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
                {t("title")}
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto">
                {t("subtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 mt-8 rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-black hover:brightness-110 transition-all duration-200 cursor-pointer"
              >
                {t("cta")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
