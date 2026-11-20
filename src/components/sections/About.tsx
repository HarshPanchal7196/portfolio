"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { profile } from "@/content/site";
import { education } from "@/content/experience";
import SectionHeading from "@/components/ui/SectionHeading";

/** Pinned about section — paragraph lights up word by word as you scroll. */
export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".about-text", { type: "words" });
      gsap.set(split.words, { opacity: 0.12 });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(split.words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-pin", start: "top top", end: "+=140%", scrub: 0.6, pin: true, refreshPriority: 30 },
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.to(split.words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 50%", scrub: 0.6 },
        });
      });
      return () => {
        mm.revert();
        split.revert();
      };
    },
    { scope: root },
  );

  const facts = [
    { k: "Based in", v: profile.location },
    { k: "Focus", v: "React Native · Android · iOS" },
    { k: "Education", v: `${education.degree}, ${education.years}` },
  ];

  return (
    <section id="about" ref={root} className="relative">
      <div className="about-pin flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10">
          <SectionHeading index="01" label="About" title={<>Who&apos;s behind the apps</>} className="mb-14" />
          <p className="about-text max-w-5xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
            {profile.about}
          </p>
          <div className="mt-14 grid max-w-5xl gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.k}>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{f.k}</div>
                <div className="mt-2 text-sm">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
