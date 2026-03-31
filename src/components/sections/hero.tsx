"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-end pb-24 px-6 lg:px-8 overflow-hidden">
      {/* Gradient orb background */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(232,255,0,0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute top-[10%] right-[20%] w-[400px] h-[400px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--surface)] backdrop-blur-sm mb-6 border border-[var(--border)] opacity-0 animate-[fade-in-down_0.8s_ease-out_forwards]">
          <span className="text-[var(--text-secondary)] text-sm font-medium tracking-wide">
            {t("badge")}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-bold text-[var(--text-primary)] leading-[1.05] tracking-[-0.04em] opacity-0 animate-[fade-in-up_0.8s_ease-out_0.2s_forwards]"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          {t("headline")}{" "}
          <span className="text-[var(--accent)]">{t("headlineAccent")}</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl opacity-0 animate-[fade-in-up_0.8s_ease-out_0.4s_forwards]">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap mt-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_0.6s_forwards]">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-black hover:brightness-110 transition-all duration-200 cursor-pointer"
          >
            {t("ctaPrimary")} <ArrowRight size={16} />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 items-center rounded-full border border-[var(--border)] px-8 text-sm font-medium text-white hover:bg-[var(--surface)] hover:border-[var(--text-muted)] transition-all duration-200 cursor-pointer"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Trust micro-copy */}
        <p className="mt-4 text-xs text-[var(--text-muted)] opacity-0 animate-[fade-in-up_0.8s_ease-out_0.8s_forwards]">
          {t("trust")}
        </p>
      </div>
    </section>
  );
}
