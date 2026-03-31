import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesPage } from "@/components/sections/services-page-content";

export const metadata = {
  title: "Services — UN Design",
  description:
    "Web design & development, UI/UX, branding, and application development services by UN Design.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <ServicesPage />
      <Footer />
    </>
  );
}
