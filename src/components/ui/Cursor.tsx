"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor: a small dot + a lagging ring.
 * Any element with `data-cursor="View"` (or any label) grows the ring and shows the label.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      if (!t) {
        gsap.to(ring.current, { scale: 1, duration: 0.4, ease: "expo.out" });
        gsap.to(label.current, { opacity: 0, duration: 0.2 });
        gsap.to(dot.current, { scale: 1, duration: 0.3 });
        return;
      }
      const text = t.dataset.cursor;
      if (text) {
        label.current!.textContent = text;
        gsap.to(ring.current, { scale: 3.2, duration: 0.5, ease: "expo.out" });
        gsap.to(label.current, { opacity: 1, duration: 0.3, delay: 0.1 });
        gsap.to(dot.current, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(ring.current, { scale: 1.8, duration: 0.5, ease: "expo.out" });
        gsap.to(dot.current, { scale: 0.5, duration: 0.3 });
      }
    };

    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-fg/40 mix-blend-difference"
      >
        <span
          ref={label}
          className="text-[4px] font-medium uppercase tracking-[0.15em] text-fg opacity-0"
          style={{ fontFamily: "var(--font-mono)" }}
        />
      </div>
      <div ref={dot} className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-fg mix-blend-difference" />
    </div>
  );
}
