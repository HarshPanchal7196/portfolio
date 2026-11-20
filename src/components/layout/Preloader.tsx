"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { profile } from "@/content/site";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Cinematic preloader:
 * - First visit in session: count-up (000→100), name reveal, then 5-panel curtain wipe.
 * - Reload in same session: zero flash of "000" — waits for fonts, then smoothly lifts
 *   the curtain straight into the Hero reveal.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const lenis = useLenis();

  // Pause smooth scrolling while the curtain is up so wheel events don't buffer
  useEffect(() => {
    if (!lenis) return;
    if (!gone) lenis.stop();
    else lenis.start();
  }, [lenis, gone]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setGone(true);
        markIntroDone();
        return;
      }

      const seen = sessionStorage.getItem("intro-seen") === "1";
      document.documentElement.style.overflow = "hidden";

      let cancelled = false;
      const finish = () => {
        if (cancelled) return;
        sessionStorage.setItem("intro-seen", "1");
        document.documentElement.style.overflow = "";
        setGone(true);
      };

      // Wait briefly for web fonts so text never jumps as the curtain lifts
      const fontsReady = Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => setTimeout(r, 400)),
      ]);

      if (seen) {
        // Reload path: smooth, minimal curtain wipe directly into the Hero
        fontsReady.then(() => {
          if (cancelled) return;
          const tl = gsap.timeline({ onComplete: finish });
          tl.add(() => markIntroDone(), 0.05).to(
            ".pl-panel",
            {
              yPercent: -100,
              duration: 0.75,
              ease: "expo.inOut",
              stagger: 0.045,
            },
            0,
          );
        });
        return () => {
          cancelled = true;
          document.documentElement.style.overflow = "";
        };
      }

      // First-visit path: full cinematic count-up + name reveal + curtain wipe
      const obj = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });
      tl.set(".pl-content", { autoAlpha: 1 })
        .to(
          obj,
          {
            v: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(obj.v)).padStart(3, "0");
            },
          },
          0,
        )
        .from(".pl-char", { yPercent: 110, stagger: 0.03, duration: 0.75, ease: "expo.out" }, 0.1)
        .to(".pl-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(".pl-char", { yPercent: -110, stagger: 0.02, duration: 0.5, ease: "expo.in" }, ">-0.1")
        .to(".pl-meta", { opacity: 0, duration: 0.25 }, "<")
        .add(() => markIntroDone(), ">-0.15")
        .to(".pl-panel", { yPercent: -100, duration: 0.9, ease: "expo.inOut", stagger: 0.05 }, ">-0.25");

      return () => {
        cancelled = true;
        tl.kill();
        document.documentElement.style.overflow = "";
      };
    },
    { scope: root },
  );

  if (gone) return null;

  const name = `${profile.firstName} ${profile.lastName}`;

  return (
    <div ref={root} className="fixed inset-0 z-[90]" aria-hidden>
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="pl-panel h-full flex-1 bg-bg" style={{ marginLeft: i ? -1 : 0 }} />
        ))}
      </div>
      {/* Hidden initially so reloads never flash "000" or the preloader name */}
      <div className="pl-content invisible relative flex h-full flex-col items-center justify-center">
        <div className="split-line">
          <h1 className="flex font-[family-name:var(--font-display)] text-[12vw] font-extrabold leading-none tracking-tight md:text-[8vw]">
            {name.split("").map((c, i) => (
              <span key={i} className="pl-char inline-block">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </h1>
        </div>
        <div className="pl-meta absolute bottom-10 left-6 right-6 flex items-end justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted md:left-10 md:right-10">
          <span>{profile.role}</span>
          <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-fg md:text-7xl">
            <span ref={counter}>000</span>
          </span>
        </div>
        <div className="pl-meta absolute bottom-0 left-0 h-[2px] w-full">
          <div className="pl-bar bg-gradient-accent h-full w-full origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
}
