"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Clock,
  RefreshCw,
  MessageCircle,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

const stepKeys = ["discovery", "design", "build", "launch"] as const;

const expectItems = [
  { key: "expectResponse", icon: Clock },
  { key: "expectRevisions", icon: RefreshCw },
  { key: "expectTools", icon: MessageCircle },
  { key: "expectUpdates", icon: BarChart3 },
] as const;

function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-sm font-medium text-white pr-4">{question}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-[var(--text-muted)] shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-48 pb-5" : "max-h-0"
        )}
      >
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function ProcessPage() {
  const t = useTranslations("process");

  const faqKeys = ["q1", "q2", "q3", "q4"] as const;

  return (
    <main className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 lg:px-8 mb-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <span className="text-xs font-medium tracking-[0.12em] text-[var(--accent)]">
              {t("label")}
            </span>
            <h1 className="mt-3 text-4xl sm:text-6xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
              {t("pageTitle")}
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] max-w-2xl text-lg">
              {t("pageSubtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Steps — alternating cards */}
      <section className="px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {stepKeys.map((key, i) => (
            <FadeIn key={key} delay={i * 0.05}>
              <div
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12",
                  i % 2 === 1 && "lg:direction-rtl"
                )}
              >
                {/* Number */}
                <div className="lg:col-span-3 flex items-start">
                  <span
                    className="font-heading font-bold text-[var(--border)] leading-none"
                    style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-9">
                  <h2 className="text-2xl font-heading font-bold text-white mb-2">
                    {t(`steps.${key}.title`)}
                  </h2>
                  <span className="text-xs font-medium text-[var(--accent)] tracking-wide">
                    {t(`steps.${key}.duration`)}
                  </span>
                  <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                    {t(`steps.${key}.description`)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t(`steps.${key}.deliverables`)
                      .split(", ")
                      .map((d: string) => (
                        <span
                          key={d}
                          className="inline-block px-3 py-1 rounded-full bg-white/5 text-[var(--text-muted)] text-xs font-medium border border-[var(--border)]"
                        >
                          {d}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What to expect + FAQ */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* What to expect */}
          <FadeIn>
            <h2 className="text-2xl font-heading font-bold text-white mb-8">
              {t("expectTitle")}
            </h2>
            <div className="space-y-4">
              {expectItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      {t(item.key)}
                    </span>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* FAQ */}
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-heading font-bold text-white mb-8">
              {t("faq.title")}
            </h2>
            <div>
              {faqKeys.map((fk) => (
                <Accordion
                  key={fk}
                  question={t(`faq.${fk}`)}
                  answer={t(`faq.a${fk.slice(1)}`)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              {t("cta")}
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[var(--accent)] text-black rounded-full font-semibold text-base hover:brightness-110 transition-all duration-200 cursor-pointer"
            >
              {t("cta")} <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
