"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFitText } from "@/lib/useFitText";
import { profile, socials } from "@/content/site";
import Magnetic from "@/components/ui/Magnetic";

function useClock(tz: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: tz });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

/** Big closing CTA + contact details + live local clock + footer. */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const titleWrap = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const time = useClock(profile.timezone);
  const [copied, setCopied] = useState(false);

  useFitText(titleWrap, [line1Ref, line2Ref], 150, 20);

  useGSAP(
    () => {
      gsap.from(".ct-line", {
        yPercent: 110,
        stagger: 0.12,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-line", start: "top 90%" },
      });
      gsap.from(".ct-reveal", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-grid", start: "top 85%" },
      });
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={root} className="relative overflow-hidden border-t border-line">
      <div
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[90vh] w-[120vw] -translate-x-1/2 rounded-[100%] opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--accent), var(--accent2) 50%, transparent)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 pb-10 pt-28 md:px-10 md:pt-40">
        <div className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-accent">06</span>
          <span className="h-px w-12 bg-line" />
          <span>Contact</span>
        </div>

        <h2
          ref={titleWrap}
          className="font-[family-name:var(--font-display)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]"
        >
          <span className="split-line block">
            <span ref={line1Ref} className="ct-line block whitespace-nowrap">
              Let&apos;s build
            </span>
          </span>{" "}
          <span className="split-line block">
            <span ref={line2Ref} className="ct-line text-gradient block whitespace-nowrap">
              something.
            </span>
          </span>
        </h2>

        <div className="ct-grid mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="ct-reveal">
            <p className="max-w-md text-lg text-muted">
              Have a mobile product to build, scale or rescue? I&apos;m open to full-time roles and select freelance projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="Write"
                  className="bg-gradient-accent inline-flex items-center gap-3 rounded-full px-7 py-4 font-semibold text-bg"
                >
                  {profile.email} <span>→</span>
                </a>
              </Magnetic>
              <button
                onClick={copy}
                className="rounded-full border border-line px-5 py-4 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            {profile.showPhone && (
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="mt-4 inline-block font-mono text-sm text-muted hover:text-fg">
                {profile.phone}
              </a>
            )}
          </div>

          <div className="ct-reveal">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Elsewhere</div>
            <ul className="mt-4 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-line pb-3">
                    <span>{s.label}</span>
                    <span className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ct-reveal">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Local time</div>
            <div className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tabular-nums">{time || "--:--:--"}</div>
            <div className="mt-1 font-mono text-xs text-muted">
              {profile.location} · {profile.timezoneLabel}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted">
              {profile.availability.open && <span className="pulse-dot h-2 w-2 rounded-full bg-live" />}
              {profile.availability.label}
            </div>
          </div>
        </div>

        <footer className="mt-28 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </span>
          <span>Designed &amp; built with Next.js · GSAP · WebGL</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-fg">
            Back to top ↑
          </button>
        </footer>
      </div>
    </section>
  );
}
