"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyBar() {
  const t = useTranslations("stickyBar");
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("sticky-bar-dismissed")) {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const threshold = document.documentElement.scrollHeight * 0.3;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("sticky-bar-dismissed", "1");
  };

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between bg-[var(--accent)] px-4 py-3">
        <Link
          href="/contact"
          className="flex-1 text-sm font-semibold text-black text-center"
        >
          {t("text")}
        </Link>
        <button
          onClick={dismiss}
          className="p-1 text-black/60 hover:text-black cursor-pointer"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
