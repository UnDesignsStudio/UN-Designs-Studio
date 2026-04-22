"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [featured, ...rest] = testimonials;

  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="eyebrow">{t("label")}</span>
          <h2
            className="mt-6 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.03em] leading-[0.95] max-w-4xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-[var(--text-secondary)] max-w-2xl text-base md:text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Featured quote */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-sm p-10 md:p-16 overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,255,0,0.22) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <span
            aria-hidden
            className="relative block font-heading font-semibold text-[var(--accent)] leading-none mb-4"
            style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
          >
            &ldquo;
          </span>
          <blockquote
            className="relative font-heading font-medium text-[var(--text-primary)] tracking-[-0.02em] leading-[1.15] max-w-4xl"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {featured.quote}
          </blockquote>
          <figcaption className="relative mt-10 flex items-center gap-5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-black font-heading font-semibold text-sm tracking-tight">
              {featured.initials}
            </span>
            <div className="flex flex-col">
              <span className="text-[var(--text-primary)] font-heading font-semibold text-base">
                {featured.author}
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)] mt-1">
                {featured.role} · {featured.company}
              </span>
            </div>
            {featured.result && (
              <>
                <span className="hidden md:block h-8 w-px bg-[var(--border-strong)] mx-2" />
                <span className="hidden md:inline-block text-[0.7rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                  {featured.result}
                </span>
              </>
            )}
          </figcaption>
        </motion.figure>

        {/* Supporting quotes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((testimonial, i) => (
            <motion.figure
              key={testimonial.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between"
            >
              <blockquote
                className="text-[var(--text-primary)] leading-relaxed"
                style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)" }}
              >
                <span className="text-[var(--accent)] mr-1">&ldquo;</span>
                {testimonial.quote}
                <span className="text-[var(--accent)] ml-0.5">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-primary)] font-heading font-semibold text-xs tracking-tight">
                  {testimonial.initials}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[var(--text-primary)] font-heading font-semibold text-sm">
                    {testimonial.author}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-muted)] mt-0.5 truncate">
                    {testimonial.role} · {testimonial.company}
                  </span>
                </div>
                {testimonial.result && (
                  <span className="ml-auto shrink-0 text-[0.65rem] uppercase tracking-[0.15em] text-[var(--accent)] text-right">
                    {testimonial.result}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
