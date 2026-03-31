import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Positioning } from "@/components/sections/positioning";
import { Services } from "@/components/sections/services";
import { ProcessPreview } from "@/components/sections/process-preview";
import { SchedulerCta } from "@/components/sections/scheduler-cta";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Positioning />
      <Services />
      <ProcessPreview />
      <SchedulerCta />
      <Footer />
    </>
  );
}
