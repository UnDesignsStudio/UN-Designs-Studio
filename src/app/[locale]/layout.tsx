import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { routing } from "@/i18n/routing";
import { StickyBar } from "@/components/ui/sticky-bar";
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

export const metadata: Metadata = {
  title: "UN Design — Premium Web Design & Development Studio",
  description:
    "UN Design is a premium design studio helping startups and ambitious businesses turn ideas into high-performing digital products — from first pixel to final launch.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
      <body className="min-h-screen bg-black text-white font-body">
        <NextIntlClientProvider messages={messages}>
          {children}
          <StickyBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
