import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProcessPage } from "@/components/sections/process-page-content";

export const metadata = {
  title: "Process — UN Design",
  description:
    "Our proven 4-step process takes your project from idea to launch — on time and on budget.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <ProcessPage />
      <Footer />
    </>
  );
}
