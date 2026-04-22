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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://undesignsstudio.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSR = locale === "sr";

  const title = isSR
    ? "UN Designs Studio — Premium Dizajn & Web Development Studio"
    : "UN Designs Studio — Premium Web Design & Development Studio";

  const description = isSR
    ? "UN Designs Studio je premium dizajn studio iz Beograda. Pravimo vrhunske sajtove, aplikacije i brendove za biznise koji odbijaju da ostanu neprimetni."
    : "UN Designs Studio is a premium design studio based in Belgrade, Serbia. We build high-end websites, apps, and brands for businesses that refuse to blend in.";

  return {
    metadataBase: new URL(SITE),
    title: {
      default: title,
      template: isSR ? "%s · UN Designs Studio" : "%s · UN Designs Studio",
    },
    description,
    keywords: [
      "UN Designs Studio",
      "UN Design",
      "undesignsstudio",
      "un designs",
      "un design",
      "web design Belgrade",
      "web design Serbia",
      "design studio Belgrade",
      "premium design agency",
      "Next.js agency",
      "branding studio",
      "UI/UX design",
      "dizajn studio Beograd",
      "web dizajn Beograd",
      "premium agencija",
    ],
    authors: [{ name: "UN Designs Studio", url: SITE }],
    creator: "UN Designs Studio",
    publisher: "UN Designs Studio",
    applicationName: "UN Designs Studio",
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      siteName: "UN Designs Studio",
      locale: isSR ? "sr_RS" : "en_US",
      alternateLocale: isSR ? ["en_US"] : ["sr_RS"],
      title,
      description,
      url: `${SITE}/${locale}`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "UN Designs Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    alternates: {
      canonical: `${SITE}/${locale}`,
      languages: {
        en: `${SITE}/en`,
        sr: `${SITE}/sr`,
        "x-default": `${SITE}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

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
