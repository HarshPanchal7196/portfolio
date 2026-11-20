"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { useIntroDone } from "@/lib/intro";
import { useFitText } from "@/lib/useFitText";
import { profile, stats } from "@/content/site";
import HeroShader from "@/components/three/HeroShader";
import Magnetic from "@/components/ui/Magnetic";
import RichText from "@/components/ui/RichText";
import CountUp from "@/components/ui/CountUp";
import { useScrollTo } from "@/components/providers/SmoothScroll";

function RoleTicker({ roles }: { roles: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-flex h-[1.5em] items-center overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[idx]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient whitespace-nowrap"
        >
          {roles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const nameWrap = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef = useRef<HTMLSpanElement>(null);
  const introDone = useIntroDone();
  const scrollTo = useScrollTo();

  useFitText(nameWrap, [firstRef, lastRef], 136, 36);

  // Intro timeline — plays once the preloader is finished
  useGSAP(
    () => {
      if (!introDone) return;
      const split = new SplitText(".hero-name", { type: "chars", mask: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.set(".hero-reveal-root", { autoAlpha: 1 })
        .from(split.chars, { yPercent: 120, rotate: 6, stagger: 0.035, duration: 1.4 })
        .fromTo(
          ".hero-portrait",
          { clipPath: "inset(100% 0% 0% 0% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "expo.inOut" },
          0.1,
        )
        .from(".hero-portrait img", { scale: 1.4, duration: 2, ease: "expo.out" }, 0.4)
        .from(".hero-fade", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, 0.6)
        .from(".hero-stat", { y: 40, autoAlpha: 0, stagger: 0.07, duration: 1 }, 0.9);

      // Scroll-out: the hero recedes like a camera pull-back
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
        .to(".hero-name-wrap", { yPercent: -35, ease: "none", duration: 1 }, 0)
        .to(".hero-portrait", { yPercent: 18, scale: 0.92, ease: "none", duration: 1 }, 0)
        .to(".hero-shader", { scale: 1.15, autoAlpha: 0.3, ease: "none", duration: 1 }, 0)
        .to(".hero-content", { autoAlpha: 0, y: -60, ease: "none", duration: 0.6 }, 0.4);

      return () => split.revert();
    },
    { scope: root, dependencies: [introDone] },
  );

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-shader absolute inset-0">
        <HeroShader />
      </div>
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="hero-reveal-root invisible relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col px-6 pb-8 pt-28 md:px-10">
        <div className="grid flex-1 grid-cols-1 items-end gap-10 lg:grid-cols-12">
          {/* Left — name + copy */}
          <div className="hero-content lg:col-span-8">
            <div className="hero-fade mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted backdrop-blur">
              {profile.availability.open && (
                <span className="pulse-dot h-2 w-2 rounded-full bg-live" />
              )}
              <span>{profile.availability.label}</span>
              <span className="hidden text-fg/30 sm:inline">/</span>
              <span className="hidden sm:inline">{profile.location}</span>
            </div>

            <div ref={nameWrap} className="hero-name-wrap w-full">
              <h1 className="font-[family-name:var(--font-display)] font-extrabold uppercase leading-[0.84] tracking-[-0.04em]">
                <span ref={firstRef} className="hero-name block whitespace-nowrap">
                  {profile.firstName}
                </span>
                <span
                  ref={lastRef}
                  className="hero-name block whitespace-nowrap text-transparent"
                  style={{ WebkitTextStroke: "1.5px var(--fg)" }}
                >
                  {profile.lastName}
                </span>
              </h1>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="hero-fade max-w-md font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight md:text-3xl">
                  <RichText text={profile.headline} />
                </p>
                <div className="hero-fade mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted">
                  <span>Building with</span>
                  <RoleTicker roles={profile.roles} />
                </div>
              </div>
              <div>
                <p className="hero-fade mb-6 max-w-md text-base leading-relaxed text-muted">{profile.intro}</p>
                <div className="hero-fade flex flex-wrap gap-3">
                  <Magnetic>
                    <button
                      onClick={() => scrollTo("#work")}
                      data-cursor="Scroll"
                      className="bg-gradient-accent group flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold text-bg"
                    >
                      View selected work
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:border-fg/40"
                    >
                      Résumé <span className="font-mono text-xs text-muted">PDF ↓</span>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:mr-0 lg:w-[min(100%,calc(56svh*0.75))] lg:max-w-none">
            <div className="hero-portrait relative aspect-[3/4] overflow-hidden rounded-[28px] border border-line">
              <Image
                src={profile.portrait}
                alt={`${profile.firstName} ${profile.lastName}`}
                fill
                priority
                sizes="(min-width: 1024px) 33vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
              <div className="absolute inset-0 mix-blend-color opacity-25 bg-gradient-accent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
                <div>
                  <div className="text-muted">Currently</div>
                  <div className="mt-1 text-fg">{profile.role}</div>
                </div>
                <div className="text-right text-muted">
                  Est.
                  <div className="mt-1 text-fg">{profile.careerStart.slice(0, 4)}</div>
                </div>
              </div>
            </div>
            {/* corner brackets */}
            {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
              <span key={c} className={`hero-fade pointer-events-none absolute -m-3 h-6 w-6 border-accent ${c}`} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat bg-bg/80 p-5 backdrop-blur md:p-6">
              <CountUp
                value={s.value}
                decimals={s.decimals}
                suffix={s.suffix}
                className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl"
              />
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
