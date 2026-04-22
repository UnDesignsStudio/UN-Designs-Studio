"use client";

import { useRef, useState, type MouseEvent } from "react";
import {
  Code,
  Layers,
  Paintbrush,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const serviceKeys = [
  { key: "web", icon: Code, href: "/services#web-design" },
  { key: "uiux", icon: Layers, href: "/services#ui-ux" },
  { key: "branding", icon: Paintbrush, href: "/services#branding" },
  { key: "app", icon: Smartphone, href: "/services#app-development" },
] as const;

function ServiceCard({
  index,
  total,
  serviceKey,
  Icon,
  href,
  title,
  description,
  tags,
}: {
  index: number;
  total: number;
  serviceKey: string;
  Icon: typeof Code;
  href: string;
  title: string;
  description: string;
  tags: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 18, mass: 0.4 };
  const rotateX = useSpring(rx, springConfig);
  const rotateY = useSpring(ry, springConfig);

  // per-card cursor position for spotlight
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    mx.set(relX);
    my.set(relY);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    ry.set(((relX - cx) / cx) * 3.5);
    rx.set(((cy - relY) / cy) * 3.5);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  const spotlight = useTransform(
    [mx, my] as const,
    ([x, y]: number[]) =>
      `radial-gradient(360px circle at ${x}px ${y}px, rgba(232,255,0,0.18), transparent 55%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.1,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <Link href={href} className="block h-full">
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-sm p-8 md:p-10 h-full overflow-hidden transition-colors duration-500 hover:border-[var(--accent)]/40"
        >
          {/* cursor spotlight */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: spotlight }}
          />

          {/* numbered prefix + arrow */}
          <div className="relative flex items-start justify-between mb-10">
            <span className="font-heading text-[0.7rem] tracking-[0.22em] text-[var(--text-muted)] uppercase">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <motion.span
              animate={{
                x: hovered ? 0 : -4,
                y: hovered ? 0 : 4,
                opacity: hovered ? 1 : 0.45,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-[var(--text-primary)]"
            >
              <ArrowUpRight size={22} />
            </motion.span>
          </div>

          {/* icon + title */}
          <div className="relative flex items-center gap-4 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] ring-1 ring-[var(--accent)]/20 group-hover:bg-[var(--accent)]/15 transition-colors">
              <Icon size={20} />
            </div>
            <h3 className="text-2xl md:text-[1.7rem] font-heading font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.1]">
              {title}
            </h3>
          </div>

          <p className="relative text-[var(--text-secondary)] leading-relaxed mb-7 max-w-lg">
            {description}
          </p>

          <div className="relative flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 rounded-full bg-white/[0.03] text-[var(--text-muted)] text-[0.7rem] font-medium border border-[var(--border)] tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* bottom hairline on hover */}
          <span className="absolute left-8 right-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />

          {/* hidden key for debugging/data */}
          <span className="sr-only">{serviceKey}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  const t = useTranslations("services");

  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <span className="eyebrow">{t("label")}</span>
          <h2
            className="mt-6 font-heading font-semibold text-[var(--text-primary)] tracking-[-0.03em] leading-[0.95] max-w-4xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-[var(--text-secondary)] max-w-2xl text-base md:text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {serviceKeys.map((service, i) => {
            const tags = t(`items.${service.key}.tags`).split(", ");
            return (
              <ServiceCard
                key={service.key}
                index={i}
                total={serviceKeys.length}
                serviceKey={service.key}
                Icon={service.icon}
                href={service.href}
                title={t(`items.${service.key}.title`)}
                description={t(`items.${service.key}.description`)}
                tags={tags}
              />
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] py-2"
          >
            <span className="relative">
              {t("cta")}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--text-primary)] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--accent)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
