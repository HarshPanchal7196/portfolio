"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Smooth, inertia-based scrolling synced with GSAP ScrollTrigger. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Prevent browser scroll restoration from landing mid-pin on reload
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // Re-measure all scroll scenes once fonts/images have loaded & after the intro,
    // so pinned sections get correct spacing.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("intro:done", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("intro:done", refresh);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);

    // If the user reloaded with a #hash, scroll smoothly to it once intro finishes
    const onIntroDone = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash) as HTMLElement | null;
        if (target) {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            l.scrollTo(target, { offset: 0, duration: 1.2 });
          });
        }
      }
    };
    window.addEventListener("intro:done", onIntroDone, { once: true });

    return () => {
      window.removeEventListener("intro:done", onIntroDone);
      gsap.ticker.remove(tick);
      l.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroll to an anchor using Lenis when available. */
export function useScrollTo() {
  const lenis = useLenis();
  return (target: string) => {
    const el = document.querySelector(target) as HTMLElement | null;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
}
