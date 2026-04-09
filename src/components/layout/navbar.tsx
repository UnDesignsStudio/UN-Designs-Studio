"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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

        {/* Mobile Toggle - Hidden when menu is open */}
        <button
          className={cn(
            "md:hidden p-2 text-[var(--text-secondary)] hover:text-white cursor-pointer transition-colors",
            mobileOpen && "hidden"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Portal — rendered outside nav to fix position:fixed */}
      <MobileMenuPortal
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        t={t}
      />
    </nav>
  );
}

// Mobile Menu Portal Component — renders outside navbar hierarchy to fix position:fixed
function MobileMenuPortal({
  isOpen,
  onClose,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-39 bg-black/98 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-49 flex flex-col pt-20 px-8 overflow-y-auto md:hidden"
          >
            {/* Close Button - Top Right (Fixed to always stay visible) */}
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="fixed top-6 right-8 z-50 md:hidden"
            >
              <button
                onClick={onClose}
                className="text-white hover:text-[var(--accent)] transition-colors p-2 cursor-pointer"
                aria-label="Close menu"
                type="button"
              >
                <X size={24} />
              </button>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 pr-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-heading font-semibold text-white hover:text-[var(--accent)] transition-colors duration-200"
                    onClick={onClose}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section: Language Switcher + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.3 }}
              className="mt-auto pb-12 flex flex-col gap-4 border-t border-[var(--border)] pt-6"
            >
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-base font-semibold text-black hover:brightness-110 transition-all duration-200"
                onClick={onClose}
              >
                {t("cta")}
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
