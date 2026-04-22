export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  result?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They treated the onboarding like a product, not a form. The result didn't just look better — it moved the business.",
    author: "A. Ilić",
    role: "Head of Product",
    company: "Meridian°",
    initials: "AI",
    result: "+48% onboarding completion",
  },
  {
    quote:
      "We didn't want a new logo. We wanted a new posture. That's what they delivered.",
    author: "M. Petrović",
    role: "Managing Partner",
    company: "KAUZA",
    initials: "MP",
    result: "+184% qualified inbound",
  },
  {
    quote:
      "Every meeting ended with us more confident, not more anxious. That's the whole job.",
    author: "J. Novak",
    role: "Founder & CEO",
    company: "Northwind",
    initials: "JN",
    result: "Launched in 4 weeks flat",
  },
];
