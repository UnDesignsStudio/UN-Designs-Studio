import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { routing } from "@/i18n/routing";
import { StickyBar } from "@/components/ui/sticky-bar";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ShaderBg } from "@/components/ui/shader-bg";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { RouteTransition } from "@/components/providers/route-transition";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://un-designs-studio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "UN Design — Premium Web Design & Development Studio",
    template: "%s · UN Design",
  },
  description:
    "UN Design is a premium design studio helping startups and ambitious businesses turn ideas into high-performing digital products — from first pixel to final launch.",
  keywords: [
    "web design",
    "web development",
    "branding",
    "UI/UX",
    "design studio",
    "Belgrade",
    "premium agency",
    "Next.js",
    "product design",
  ],
  authors: [{ name: "UN Design" }],
  creator: "UN Design",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "UN Design",
    title: "UN Design — Premium Web Design & Development Studio",
    description:
      "Premium websites, apps, and brands for ambitious businesses. Belgrade · worldwide.",
    url: SITE,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "UN Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UN Design — Premium Web Design & Development Studio",
    description:
      "Premium websites, apps, and brands for ambitious businesses. Belgrade · worldwide.",
    images: ["/og.png"],
  },
  alternates: {
    languages: {
      en: "/en",
      sr: "/sr",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-body">
        <ShaderBg variant="global" />
        <NextIntlClientProvider messages={messages}>
          <LenisProvider />
          <CustomCursor />
          <div className="relative z-[1]">
            <RouteTransition>{children}</RouteTransition>
            <StickyBar />
          </div>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
