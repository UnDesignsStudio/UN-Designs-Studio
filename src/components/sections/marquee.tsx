"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export function Marquee() {
  const t = useTranslations("marquee");
  const text = t("text");

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // velocityFactor pumps scroll speed into a unit-less boost. 2000 px/s ≈ 6x base.
  const velocityFactor = useTransform(smoothVelocity, [0, 2000], [0, 6], {
    clamp: false,
  });

  const directionRef = useRef(-1); // -1 = leftward drift
  // ~5.5% of baseX per second baseline, scaled by delta
  const basePercentPerFrame = 0.09;

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * basePercentPerFrame * (delta / 16.6);
    const vf = velocityFactor.get();
    // flip direction based on actual scroll sign, not transformed factor
    if (smoothVelocity.get() < -30) directionRef.current = 1;
    else if (smoothVelocity.get() > 30) directionRef.current = -1;
    // whip boost — magnitude of vf adds to move, preserving direction
    moveBy += directionRef.current * Math.abs(moveBy) * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  // content repeats every 25% → wrap within that window
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="relative py-10 md:py-14 border-y border-[var(--border)] overflow-hidden bg-[var(--bg)]">
      <div className="accent-rule absolute top-0 left-0" />
      <div className="accent-rule absolute bottom-0 left-0" />
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x, width: "max-content" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="font-heading font-semibold tracking-[0.06em] text-[var(--text-primary)] mx-8 flex items-center gap-8 text-2xl md:text-4xl lg:text-5xl"
          >
            {text}
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent-glow)]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
