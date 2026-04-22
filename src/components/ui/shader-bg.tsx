"use client";

import { MeshGradient } from "@paper-design/shaders-react";

type ShaderBgProps = {
  variant?: "hero" | "global";
  className?: string;
  opacity?: number;
};

export function ShaderBg({
  variant = "hero",
  className,
  opacity,
}: ShaderBgProps) {
  const isGlobal = variant === "global";
  const resolvedOpacity = opacity ?? (isGlobal ? 0.32 : 0.5);

  const mask = isGlobal
    ? "radial-gradient(ellipse 110% 90% at 50% 25%, black 45%, transparent 95%)"
    : "radial-gradient(ellipse 90% 75% at 50% 35%, black 40%, transparent 85%)";

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: isGlobal ? "fixed" : "absolute",
        inset: 0,
        zIndex: 0,
        opacity: resolvedOpacity,
        pointerEvents: "none",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#07080a", "#1a1233", "#e8ff00", "#0a0f1f", "#07080a"]}
        distortion={0.85}
        swirl={0.45}
        speed={isGlobal ? 0.22 : 0.35}
        offsetX={0}
        offsetY={0}
        scale={isGlobal ? 1.25 : 1}
      />
    </div>
  );
}
