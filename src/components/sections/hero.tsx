"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

const wordVariants = {
  hidden: { opacity: 0, y: "110%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function StaggeredLine({
  text,
  delay = 0,
  accent = false,
  className = "",
}: {
  text: string;
  delay?: number;
  accent?: boolean;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${accent ? "text-[var(--accent)] italic" : ""}`}
              style={{ paddingRight: i < words.length - 1 ? "0.22em" : 0 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-end pb-24 pt-40 px-6 lg:px-10 overflow-hidden">
      {/* Local vignette to push focus to hero copy (shader lives globally in layout) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[0] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, transparent 40%, rgba(7,8,10,0.55) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Availability indicator — scarcity + life */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-secondary)] font-medium">
            {t("badge")}
          </span>
        </motion.div>

        {/* Headline — kinetic word stagger */}
        <h1
          className="font-heading font-semibold text-[var(--text-primary)] leading-[0.92] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.75rem, 9vw, 9.5rem)" }}
        >
          <StaggeredLine text={t("headline")} delay={0.1} />
          <StaggeredLine text={t("headlineAccent")} delay={0.25} accent />
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs — single primary magnetic + text link secondary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-8 flex-wrap mt-10"
        >
          <MagneticButton
            href="/contact"
            className="inline-flex h-14 items-center gap-3 rounded-full bg-[var(--accent)] px-9 text-sm font-semibold tracking-wide text-black transition-[filter,box-shadow] duration-300 hover:brightness-105 shadow-[0_0_0_0_var(--accent-glow)] hover:shadow-[0_0_48px_0_var(--accent-glow)]"
          >
            {t("ctaPrimary")}
            <ArrowRight size={16} className="magnetic-arrow" />
          </MagneticButton>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] py-2"
          >
            <span className="relative">
              {t("ctaSecondary")}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--text-primary)] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--accent)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* Corner meta — adds editorial texture */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-end gap-1 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-muted)] z-10">
        <span>{t("meta1")}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-6 bg-[var(--border-strong)]" />
          {t("meta2")}
        </span>
      </div>
    </section>
  );
}
