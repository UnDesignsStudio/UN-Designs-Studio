"use client";

import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations("marquee");
  const text = t("text");

  return (
    <div className="py-6 border-y border-[var(--border)] overflow-hidden">
      <div
        className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]"
        style={{ width: "max-content" }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="text-sm font-heading font-semibold tracking-[0.12em] text-[var(--accent)] mx-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
