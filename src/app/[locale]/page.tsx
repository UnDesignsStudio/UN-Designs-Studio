import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { LogoStrip } from "@/components/sections/logo-strip";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Positioning } from "@/components/sections/positioning";
import { Services } from "@/components/sections/services";
import { ProcessPreview } from "@/components/sections/process-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { SchedulerCta } from "@/components/sections/scheduler-cta";
import { Footer } from "@/components/layout/footer";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://undesignsstudio.com";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "UN Designs Studio",
    alternateName: ["UN Design", "UnDesigns", "un designs studio"],
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE}/og.png`,
    email: "un.studio.rs@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belgrade",
      addressRegion: "Belgrade",
      addressCountry: "RS",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "un.studio.rs@gmail.com",
      contactType: "customer support",
      availableLanguage: ["English", "Serbian"],
      areaServed: "Worldwide",
    },
    sameAs: [],
    description:
      "UN Designs Studio is a premium design studio based in Belgrade, Serbia. We build high-end websites, apps, and brands for businesses that refuse to blend in.",
    foundingDate: "2024",
    knowsAbout: [
      "Web Design",
      "Web Development",
      "UI/UX Design",
      "Branding",
      "Application Development",
      "Next.js",
      "Product Design",
    ],
    slogan: "We design experiences that convert.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "UN Designs Studio",
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: ["en", "sr"],
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Marquee />
      <LogoStrip />
      <FeaturedWork />
      <Positioning />
      <Services />
      <ProcessPreview />
      <Testimonials />
      <FAQ />
      <SchedulerCta />
      <Footer />
    </>
  );
}
