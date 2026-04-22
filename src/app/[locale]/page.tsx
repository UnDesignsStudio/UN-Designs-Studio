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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://un-designs-studio.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UN Design",
  url: SITE,
  logo: `${SITE}/logo.png`,
  email: "un.studio.rs@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgrade",
    addressCountry: "RS",
  },
  sameAs: [],
  description:
    "Premium design studio helping startups and ambitious businesses turn ideas into high-performing digital products.",
};

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
