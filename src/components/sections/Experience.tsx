"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/content/experience";
import SectionHeading from "@/components/ui/SectionHeading";

/** Timeline with a scroll-drawn line. Data: src/content/experience.ts */
export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".exp-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".exp-list", start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 78%" } });
        tl.from(item.querySelector(".exp-dot"), { scale: 0, duration: 0.6, ease: "back.out(3)" })
          .from(item.querySelectorAll(".exp-reveal"), { y: 30, autoAlpha: 0, stagger: 0.06, duration: 0.9, ease: "expo.out" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <SectionHeading
        index="04"
        label="Experience"
        title={
          <>
            The <em className="font-[family-name:var(--font-serif)] font-normal italic text-gradient">journey</em> so far
          </>
        }
        className="mb-20"
      />

      <div className="exp-list relative">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[calc(30%+7px)]" />
        <div className="exp-line bg-gradient-accent absolute bottom-0 left-[7px] top-0 w-px origin-top md:left-[calc(30%+7px)]" />

        {experience.map((e) => (
          <div key={e.company + e.start} className="exp-item relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-[30%_1fr] md:gap-0 md:pl-0">
            <div className="exp-reveal md:pr-16 md:text-right">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {e.start} — {e.end}
              </div>
              {e.location && <div className="mt-1 font-mono text-xs text-muted/60">{e.location}</div>}
            </div>

            <span className="exp-dot absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg md:left-[30%]" />

            <div className="md:pl-16">
              <h3 className="exp-reveal font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
                {e.company}
              </h3>
              <div className="exp-reveal mt-1 text-accent2">{e.role}</div>
              <ul className="mt-5 space-y-2">
                {e.highlights.map((h) => (
                  <li key={h} className="exp-reveal flex gap-3 text-muted">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-fg/30" />
                    {h}
                  </li>
                ))}
              </ul>
              {e.stack && (
                <div className="exp-reveal mt-5 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
