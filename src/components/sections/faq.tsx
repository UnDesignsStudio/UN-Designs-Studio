"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const items = [1, 2, 3, 4] as const;

export function FAQ() {
  const t = useTranslations("process.faq");
  const tSection = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="eyebrow">{tSection("label")}</span>
          <h2
            className="mt-6 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.03em] leading-[0.95] max-w-3xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-[var(--text-secondary)] max-w-xl text-base md:text-lg leading-relaxed">
            {tSection("subtitle")}
          </p>
        </div>

        <ul className="border-t border-[var(--border)]">
          {items.map((n, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={n}
                className="border-b border-[var(--border)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.2] transition-colors duration-300 group-hover:text-[var(--accent)]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)" }}
                  >
                    {t(`q${n}`)}
                  </span>
                  <span
                    className="relative shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/10"
                    aria-hidden
                  >
                    <span className="relative block h-[1.5px] w-4 bg-[var(--text-primary)] transition-colors duration-300 group-hover:bg-[var(--accent)]" />
                    <motion.span
                      className="absolute h-[1.5px] w-4 bg-[var(--text-primary)] transition-colors duration-300 group-hover:bg-[var(--accent)]"
                      animate={{ rotate: isOpen ? 0 : 90 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 md:pb-8 pr-16 text-[var(--text-secondary)] leading-relaxed max-w-2xl"
                        style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)" }}
                      >
                        {t(`a${n}`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex flex-col items-center text-center gap-5">
          <p className="text-sm text-[var(--text-secondary)]">
            {tSection("footerQuestion")}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] py-2"
          >
            <span className="relative">
              {tSection("footerCta")}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--text-primary)] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--accent)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
