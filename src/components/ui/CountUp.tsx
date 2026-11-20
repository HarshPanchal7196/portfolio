"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/lib/intro";

/** Number that counts up when scrolled into view (after the intro has finished). */
export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const introDone = useIntroDone();

  useGSAP(() => {
    if (!introDone) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 2.2,
      delay: 0.6,
      ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = obj.v.toFixed(decimals) + suffix;
      },
    });
  }, [value, introDone]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
