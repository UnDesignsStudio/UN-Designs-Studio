import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactPage } from "@/components/sections/contact-page-content";

export const metadata = {
  title: "Contact — UN Design",
  description:
    "Book a free strategy call or get in touch with UN Design. We respond within 24 hours.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
