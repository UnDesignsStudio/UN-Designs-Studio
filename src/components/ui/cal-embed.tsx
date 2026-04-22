"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "un-design-v17dtf/30min";

export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "strategy-call" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#e8ff00",
          },
          dark: {
            "cal-brand": "#e8ff00",
            "cal-text": "#f5f6f7",
            "cal-text-emphasis": "#ffffff",
            "cal-text-muted": "#a3a8b3",
            "cal-bg": "#0f1115",
            "cal-bg-emphasis": "#161920",
            "cal-border": "#1c2028",
            "cal-border-subtle": "#1c2028",
            "cal-border-emphasis": "#2a2f39",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm">
      <Cal
        namespace="strategy-call"
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", minHeight: 720 }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
