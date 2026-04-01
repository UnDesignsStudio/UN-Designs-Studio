"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "process", href: "/process" },
  { key: "contact", href: "/contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock/unlock body scroll when mobile menu opens/closes
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="UN Design"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span className="text-xl font-heading font-bold tracking-tight text-white">
            UN<span className="text-[var(--accent)]">.</span>Design
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="relative text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors duration-200 group"
            >
              {t(link.key)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-black hover:brightness-110 transition-all duration-200 cursor-pointer"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu — full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-20 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-heading font-semibold text-white hover:text-[var(--accent)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-12 flex flex-col gap-4">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-base font-semibold text-black"
                onClick={() => setMobileOpen(false)}
              >
                {t("cta")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
