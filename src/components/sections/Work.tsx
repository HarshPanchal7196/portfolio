"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { featuredProjects } from "@/content/projects";
import { theme } from "@/content/theme";
import PhoneMockup from "@/components/ui/PhoneMockup";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Selected Work — a pinned horizontal "film strip" on desktop,
 * a vertical stack on mobile. Data: src/content/projects.ts
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".work-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            refreshPriority: 20,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Per-panel parallax inside the horizontal scroll
        gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector(".work-phone"),
            { rotate: 8, y: 80 },
            {
              rotate: -6,
              y: -40,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.fromTo(
            panel.querySelector(".work-big"),
            { xPercent: 25 },
            {
              xPercent: -25,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.from(panel.querySelectorAll(".work-reveal"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 65%" },
          });
        });

        // progress counter
        gsap.to(".work-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".work-pin", start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".work-reveal"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, start: "top 75%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const total = String(featuredProjects.length).padStart(2, "0");

  return (
    <section id="work" ref={root} className="relative">
      <div className="work-pin relative overflow-hidden lg:h-[100svh]">
        <div ref={track} className="flex flex-col lg:h-full lg:w-max lg:flex-row">
          {/* Intro panel */}
          <div className="flex shrink-0 flex-col justify-center px-6 pb-10 pt-24 md:px-10 lg:h-full lg:w-[42vw] lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] lg:pt-0">
            <SectionHeading
              index="02"
              label="Selected work"
              title={
                <>
                  Things I&apos;ve
                  <br />
                  <em className="font-[family-name:var(--font-serif)] font-normal italic text-gradient">shipped</em>
                </>
              }
            >
              <p className="mt-8 max-w-sm text-muted">
                A few flagship builds — from real-time mobility to BLE-connected healthcare. Scroll to explore{" "}
                <span className="hidden lg:inline">→</span>
                <span className="lg:hidden">↓</span>
              </p>
            </SectionHeading>
          </div>

          {featuredProjects.map((p, i) => {
            const colors = p.colors ?? [theme.accent, theme.accent2];
            return (
              <article
                key={p.slug}
                className="work-panel relative flex shrink-0 items-center overflow-hidden border-t border-line px-6 py-20 md:px-10 lg:h-full lg:w-[88vw] lg:border-l lg:border-t-0 lg:py-0 xl:w-[78vw]"
              >
                {/* glow */}
                <div
                  className="pointer-events-none absolute right-[10%] top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
                  style={{ background: `radial-gradient(circle, ${colors[0]}, ${colors[1]} 60%, transparent 70%)` }}
                />
                {/* huge background word */}
                <div
                  className="work-big pointer-events-none absolute -bottom-[0.18em] left-0 select-none whitespace-nowrap font-[family-name:var(--font-display)] text-[28vw] font-extrabold uppercase leading-none tracking-tighter text-transparent opacity-40 lg:text-[20vw]"
                  style={{ WebkitTextStroke: "1px color-mix(in oklab, var(--fg) 12%, transparent)" }}
                >
                  {p.shortTitle}
                </div>

                <div className="relative grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <div className="work-reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      <span className="text-fg">
                        {String(i + 1).padStart(2, "0")}
                        <span className="text-muted"> / {total}</span>
                      </span>
                      <span className="h-px w-10 bg-line" />
                      <span>{p.domain}</span>
                    </div>
                    <h3 className="work-reveal mt-6 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1] tracking-tight md:text-6xl">
                      {p.title}
                    </h3>
                    <div className="work-reveal mt-4 font-mono text-sm" style={{ color: colors[0] }}>
                      {p.role}
                    </div>
                    <p className="work-reveal mt-6 max-w-xl leading-relaxed text-muted">{p.summary}</p>

                    <ul className="work-reveal mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
                      {p.contributions.map((c) => (
                        <li key={c} className="flex gap-3 text-sm leading-snug text-fg/85">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: colors[1] }} />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <div className="work-reveal mt-8 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] text-muted">
                          {s}
                        </span>
                      ))}
                    </div>

                    {!!(p.metrics?.length || p.links?.length) && (
                      <div className="work-reveal mt-8 flex flex-wrap items-center gap-8">
                        {p.metrics?.map((m) => (
                          <div key={m.label}>
                            <div className="font-[family-name:var(--font-display)] text-3xl font-bold">{m.value}</div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{m.label}</div>
                          </div>
                        ))}
                        {p.links?.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Open"
                            className="rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-fg/40"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <div className="work-phone w-[220px] md:w-[260px] xl:w-[280px]">
                      <PhoneMockup screenshots={p.screenshots} variant={p.screen} colors={colors} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* progress bar */}
        <div className="absolute bottom-8 left-10 right-10 hidden h-px bg-line lg:block">
          <div className="work-progress bg-gradient-accent h-full origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
}
