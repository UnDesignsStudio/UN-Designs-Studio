"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: "en" | "sr") {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] p-0.5">
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
          locale === "en"
            ? "bg-[var(--accent)] text-black"
            : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("sr")}
        className={cn(
          "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
          locale === "sr"
            ? "bg-[var(--accent)] text-black"
            : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
        )}
      >
        SR
      </button>
    </div>
  );
}
