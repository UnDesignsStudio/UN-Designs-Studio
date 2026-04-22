"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const wordmarks = [
  { name: "NORTHWIND", tracking: "0.02em", weight: 700 },
  { name: "Meridian°", tracking: "-0.01em", weight: 600 },
  { name: "KAUZA", tracking: "0.14em", weight: 500 },
  { name: "obsidian.", tracking: "-0.02em", weight: 700 },
  { name: "FIELDNOTE", tracking: "0.08em", weight: 600 },
  { name: "Vektor / co", tracking: "0em", weight: 500 },
];

export function LogoStrip() {
  const t = useTranslations("logoStrip");

  return (
    <section className="relative py-20 px-6 lg:px-10 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <span className="eyebrow">{t("label")}</span>
          <span className="text-xs text-[var(--text-muted)] tracking-wide">
            {t("note")}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-8 items-center"
        >
          {wordmarks.map((w) => (
            <span
              key={w.name}
              className="font-heading text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-500 text-lg md:text-xl whitespace-nowrap text-center"
              style={{
                letterSpacing: w.tracking,
                fontWeight: w.weight,
              }}
            >
              {w.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
