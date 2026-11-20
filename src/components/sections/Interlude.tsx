"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

/**
 * Full-bleed cinematic interlude between sections.
 * Edit the `lines` prop in page.tsx to change the copy.
 */
export default function Interlude({ lines, caption }: { lines: string[]; caption?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".il-line", { type: "words,chars", mask: "chars" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          refreshPriority: 10,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(".il-ring", { scale: 0.2, opacity: 0 }, { scale: 1.6, opacity: 0.45, ease: "power2.out", duration: 1 }, 0)
        .from(split.chars, { yPercent: 110, stagger: 0.015, ease: "expo.out", duration: 0.6 }, 0.1)
        .from(".il-caption", { autoAlpha: 0, y: 20, duration: 0.3 }, 0.6)
        .to(".il-ring", { scale: 3, opacity: 0, duration: 0.6 }, 1.1)
        .to(".il-inner", { autoAlpha: 0, scale: 0.94, duration: 0.4 }, 1.3);
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex h-[100svh] items-center justify-center overflow-hidden">
      <div
        className="il-ring pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full opacity-0"
        style={{
          background: "conic-gradient(from 0deg, var(--accent), var(--accent2), var(--accent))",
          filter: "blur(70px)",
          opacity: 0.35,
        }}
      />
      <div className="il-inner relative px-6 text-center">
        {lines.map((l) => (
          <div key={l} className="il-line font-[family-name:var(--font-display)] text-[10vw] font-extrabold uppercase leading-[0.9] tracking-tighter md:text-[7vw]">
            {l}
          </div>
        ))}
        {caption && (
          <p className="il-caption mx-auto mt-8 max-w-md font-[family-name:var(--font-serif)] text-xl italic text-muted md:text-2xl">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
