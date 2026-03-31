"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Mail } from "lucide-react";

const navLinks = [
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "process", href: "/process" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-[var(--border)] py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="UN Design"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-heading font-bold tracking-tight text-white">
                UN<span className="text-[var(--accent)]">.</span>Design
              </span>
            </Link>
            <span className="text-sm text-[var(--text-muted)]">
              {t("footer.tagline")}
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm text-[var(--text-muted)] hover:text-white transition-colors duration-200"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:un.studio.rs@gmail.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-colors cursor-pointer"
            >
              <Mail size={16} />
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </span>
          <span>{t("footer.builtWith")}</span>
        </div>
      </div>
    </footer>
  );
}
