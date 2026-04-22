"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CalEmbed } from "@/components/ui/cal-embed";

function Accordion({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b border-[var(--border)]">
      <button
        type="button"
        onClick={onToggle}
        className="group w-full flex items-start justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.2] transition-colors duration-300 group-hover:text-[var(--accent)] text-lg">
          {question}
        </span>
        <span
          className="relative shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/10"
          aria-hidden
        >
          <span className="relative block h-[1.5px] w-3.5 bg-[var(--text-primary)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
          <motion.span
            className="absolute h-[1.5px] w-3.5 bg-[var(--text-primary)] group-hover:bg-[var(--accent)] transition-colors duration-300"
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function ContactPage() {
  const t = useTranslations("contact");
  const tProcess = useTranslations("process");
  const tScheduler = useTranslations("scheduler");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to send");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setSending(false);
    }
  };

  const faqKeys = [1, 2, 3, 4] as const;

  return (
    <main className="pt-32 md:pt-40 pb-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="eyebrow">{t("label")}</span>
          <h1
            className="mt-6 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.035em] leading-[0.92] max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
          >
            {t("title")}
          </h1>
          <p className="mt-8 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Cal.com embed — primary conversion path */}
        <section className="mb-24 md:mb-28">
          <div className="flex flex-col items-center text-center mb-8 gap-3">
            <span className="eyebrow">{tScheduler("label")}</span>
            <p className="text-sm text-[var(--text-muted)] max-w-lg">
              {t("calHint")}
            </p>
          </div>
          <CalEmbed />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              {tScheduler("trustFree")}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              {tScheduler("trustNoCommit")}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              {tScheduler("trustReply")}
            </span>
          </div>
        </section>

        {/* Section heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20 gap-5">
          <span className="flex items-center gap-5 w-full max-w-xs">
            <span className="flex-1 accent-rule" />
            <span className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)] shrink-0">
              {t("or")}
            </span>
            <span className="flex-1 accent-rule" />
          </span>
          <h2
            className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.025em] leading-[1] max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            {t("formHeading")}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg leading-relaxed">
            {t("formSubheading")}
          </p>
        </div>

        {/* Form (centered) */}
        <section className="mb-16 md:mb-20 max-w-2xl mx-auto">
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-12 md:p-16"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-black mb-6">
                  <Send size={22} />
                </div>
                <h3 className="font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] text-2xl md:text-3xl">
                  {t("form.success")}
                </h3>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-md">
                  {t("form.successText")}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-sm p-8 md:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    name="name"
                    label={t("form.name")}
                    placeholder={t("form.namePlaceholder")}
                    type="text"
                  />
                  <FormField
                    name="email"
                    label={t("form.email")}
                    placeholder={t("form.emailPlaceholder")}
                    type="email"
                  />
                </div>
                <FormField
                  name="message"
                  label={t("form.message")}
                  placeholder={t("form.messagePlaceholder")}
                  as="textarea"
                />

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-black transition-[filter,box-shadow] duration-300 hover:brightness-105 hover:shadow-[0_0_48px_0_var(--accent-glow)] gap-2 disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? t("form.sending") : t("form.submit")}
                  {!sending && (
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </button>

                {error && (
                  <p className="text-xs text-red-400 text-center">
                    {t("form.errorPrefix")} {error}
                  </p>
                )}

                <p className="text-xs text-[var(--text-muted)] text-center">
                  {t("confirm")}
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Direct line strip (centered) */}
        <section className="mb-24 md:mb-28">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
            <span className="eyebrow">{t("directLabel")}</span>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {t("directBlurb")}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              <a
                href="mailto:un.studio.rs@gmail.com"
                className="group flex items-center gap-3"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-black">
                  <Mail size={16} />
                </span>
                <span className="text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {t("email")}
                </span>
              </a>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)]">
                  <MapPin size={16} />
                </span>
                <span className="text-[var(--text-secondary)]">
                  {t("location")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="eyebrow">{tProcess("faq.title")}</span>
          </div>
          <ul className="max-w-3xl mx-auto border-t border-[var(--border)]">
            {faqKeys.map((n, i) => (
              <Accordion
                key={n}
                question={tProcess(`faq.q${n}`)}
                answer={tProcess(`faq.a${n}`)}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function FormField({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  as?: "input" | "textarea";
}) {
  const base =
    "w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] px-0 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors duration-300";
  return (
    <div>
      <label className="block text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          name={name}
          required
          rows={4}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          name={name}
          required
          type={type}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}
