import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutPage } from "@/components/sections/about-page-content";

export const metadata = {
  title: "About — UN Design",
  description:
    "UN Design is a premium design studio helping startups and ambitious businesses turn ideas into high-performing digital products.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
