"use client";

import { useLayoutEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Scales a group of single-line elements so the widest one exactly fits
 * its container's width (all share the same font-size). Capped at `max` px.
 * Elements should be `whitespace-nowrap`.
 */
export function useFitText(
  containerRef: RefObject<HTMLElement | null>,
  refs: RefObject<HTMLElement | null>[],
  max = 160,
  min = 24,
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const els = refs.map((r) => r.current).filter(Boolean) as HTMLElement[];
    if (!container || !els.length) return;

    const fit = () => {
      const avail = container.clientWidth;
      if (!avail) return;
      let widest = 0;
      els.forEach((el) => {
        el.style.fontSize = "100px";
        el.style.width = "max-content";
        widest = Math.max(widest, el.scrollWidth);
        el.style.width = "";
      });
      if (!widest) return;
      const size = Math.max(min, Math.min(max, ((100 * avail) / widest) * 0.95));
      els.forEach((el) => (el.style.fontSize = `${size}px`));
    };

    fit();
    document.fonts?.ready.then(() => {
      fit();
      ScrollTrigger.refresh();
    });
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    });
    ro.observe(container);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, min]);
}
