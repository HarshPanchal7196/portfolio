"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { skills } from "@/content/experience";
import type { SkillLevel } from "@/content/types";
import SectionHeading from "@/components/ui/SectionHeading";

const levelStyle: Record<SkillLevel, string> = {
  Core: "bg-gradient-accent text-bg",
  Working: "border border-fg/25 text-fg/80",
  Exploring: "border border-dashed border-fg/25 text-muted",
};

/** Stack matrix with proficiency tiers. Data: skills in src/content/experience.ts */
export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-card", {
        y: 60,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".skill-grid", start: "top 80%" },
      });
    },
    { scope: root },
  );

  // spotlight that follows the mouse inside each card
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="skills" ref={root} className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          index="05"
          label="Toolkit"
          title={
            <>
              The stack <em className="font-[family-name:var(--font-serif)] font-normal italic text-gradient">matrix</em>
            </>
          }
        />
        <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
          {(Object.keys(levelStyle) as SkillLevel[]).map((l) => (
            <span key={l} className={`rounded-full px-3 py-1.5 ${levelStyle[l]}`}>
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="skill-grid mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, gi) => (
          <div
            key={g.title}
            onMouseMove={onMove}
            className="skill-card gradient-border group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-6"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mx) var(--my), color-mix(in oklab, var(--accent) 14%, transparent), transparent 60%)",
              }}
            />
            <div className="relative flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">{g.title}</h3>
              <span className="font-mono text-xs text-muted">{String(gi + 1).padStart(2, "0")}</span>
            </div>
            <ul className="relative mt-6 space-y-3">
              {g.items.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="text-sm">{s.name}</div>
                    {s.note && <div className="mt-0.5 font-mono text-[10px] text-muted">{s.note}</div>}
                  </div>
                  {s.level && (
                    <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] ${levelStyle[s.level]}`}>
                      {s.level}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
