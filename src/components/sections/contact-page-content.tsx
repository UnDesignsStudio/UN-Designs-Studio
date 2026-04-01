"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  MapPin,
  Send,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

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

export function ContactPage() {
  const t = useTranslations("contact");
  const tProcess = useTranslations("process");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqKeys = ["q1", "q2", "q3", "q4"] as const;

  return (
    <main className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs font-medium tracking-[0.12em] text-[var(--accent)]">
              {t("label")}
            </span>
            <h1 className="mt-3 text-4xl sm:text-6xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
              {t("title")}
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Meeting scheduler - Cal.com embed */}
      <section className="px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--surface)] overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-[var(--border)]">
                <h2 className="text-2xl font-heading font-bold text-white mb-2">
                  {t("booking.title")}
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t("booking.subtitle")}
                </p>
              </div>

              {/* Cal.com Embed */}
              <div className="w-full" style={{ minHeight: "600px" }}>
                <iframe
                  src="https://cal.com/un-design-v17dtf/30min?overlayCalendar=true"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule a Meeting"
                  style={{
                    border: "none",
                    display: "block",
                  }}
                />
              </div>

              {/* Fallback email */}
              <div className="p-8 border-t border-[var(--border)] text-center">
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  Can't use the scheduler?
                </p>
                <a
                  href="mailto:un.studio.rs@gmail.com"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--accent)]/10 px-6 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors"
                >
                  <Mail size={14} /> {t("email")}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 mb-16">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--text-muted)] font-medium">
            {t("or")}
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
      </div>

      {/* Contact form + info */}
      <section className="px-6 lg:px-8 mb-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
                  <Send size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white">
                  {t("form.success")}
                </h3>
                <p className="mt-2 text-[var(--text-secondary)]">
                  {t("form.successText")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("form.namePlaceholder")}
                      className="w-full rounded-lg border border-[var(--border)] bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("form.emailPlaceholder")}
                      className="w-full rounded-lg border border-[var(--border)] bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {t("form.message")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t("form.messagePlaceholder")}
                    className="w-full rounded-lg border border-[var(--border)] bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-transparent transition resize-none"
                  />
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-black hover:brightness-110 transition-all duration-200 gap-2 cursor-pointer"
                >
                  {t("form.submit")} <Send size={16} />
                </button>
              </form>
            )}
          </FadeIn>

          {/* Contact info */}
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[var(--accent)]" />
              <a
                href="mailto:un.studio.rs@gmail.com"
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                {t("email")}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">
                {t("location")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-heading font-bold text-white mb-8">
              {tProcess("faq.title")}
            </h2>
            <div>
              {faqKeys.map((fk) => (
                <Accordion
                  key={fk}
                  question={tProcess(`faq.${fk}`)}
                  answer={tProcess(`faq.a${fk.slice(1)}`)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
