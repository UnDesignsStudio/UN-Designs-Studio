"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function SchedulerCta() {
  const t = useTranslations("scheduler");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  // Headline scales up as it enters and drifts off to the top as it leaves
  const headlineScale = useTransform(smooth, [0, 0.45, 1], [0.72, 1, 1.08]);
  const headlineY = useTransform(smooth, [0, 0.45, 1], ["8%", "0%", "-12%"]);
  const headlineOpacity = useTransform(smooth, [0, 0.2, 0.9, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 px-6 lg:px-10 overflow-hidden"
    >
      {/* Ambient lime glow behind the type */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,255,0,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-[90rem] mx-auto flex flex-col items-center text-center">
        <span className="eyebrow">{t("label")}</span>

        {/* Oversized headline */}
        <motion.h2
          style={{
            scale: headlineScale,
            y: headlineY,
            opacity: headlineOpacity,
          }}
          className="mt-8 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.04em] leading-[0.82]"
        >
          <span
            className="block"
            style={{ fontSize: "clamp(4rem, 16vw, 18rem)" }}
          >
            {t("headlineLine1")}
          </span>
          <span
            className="block text-[var(--accent)] italic"
            style={{ fontSize: "clamp(4rem, 16vw, 18rem)" }}
          >
            {t("headlineLine2")}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 h-16 rounded-full bg-[var(--accent)] px-10 text-base font-semibold text-black transition-[filter,box-shadow] duration-300 hover:brightness-105 hover:shadow-[0_0_64px_0_var(--accent-glow)]"
          >
            {t("cta")}
            <ArrowUpRight size={20} />
          </Link>
        </motion.div>

        {/* Trust micro-row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)]"
        >
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            {t("trustFree")}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            {t("trustNoCommit")}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            {t("trustReply")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
