import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WorkIndex } from "@/components/sections/work-index";

export const metadata = {
  title: "Work",
  description:
    "Selected case studies from UN Design — fintech, professional services, and brand-led digital products.",
  openGraph: {
    title: "Work · UN Design",
    description:
      "Selected case studies — fintech, professional services, and brand-led digital products.",
  },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <WorkIndex />
      <Footer />
    </>
  );
}
