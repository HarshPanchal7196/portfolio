"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Consistent section heading:  01 — label   /  Big Title
 * Animates in on scroll with a line-mask reveal.
 */
export default function SectionHeading({
  index,
  label,
  title,
  className = "",
  children,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 82%" } });
      tl.from(".sh-label", { y: 20, opacity: 0, duration: 0.8, ease: "expo.out" })
        .from(".sh-rule", { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 0)
        .from(".sh-title", { yPercent: 110, duration: 1.2, ease: "expo.out" }, 0.1);
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      <div className="sh-label mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="sh-rule h-px w-12 origin-left bg-line" />
        <span>{label}</span>
      </div>
      <div className="split-line">
        <h2 className="sh-title font-[family-name:var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
