"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { nav, profile } from "@/content/site";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Magnetic from "@/components/ui/Magnetic";

export default function Navbar() {
  const scrollTo = useScrollTo();
  const bar = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (bar.current) gsap.set(bar.current, { scaleX: self.progress });
        setHidden(self.direction === 1 && self.scroll() > 400);
      },
    });
    return () => st.kill();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-[70] h-[2px] w-full">
        <div ref={bar} className="bg-gradient-accent h-full w-full origin-left scale-x-0" />
      </div>

      <motion.header
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-[65] flex justify-center px-4"
      >
        <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2">
          <button onClick={() => go("#top")} className="flex items-center gap-2 font-mono text-sm tracking-wider">
            <span className="text-gradient font-bold">{profile.monogram}</span>
            <span className="hidden text-muted sm:inline">/ {profile.role.toLowerCase()}</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n, i) => (
              <li key={n.href}>
                <button
                  onClick={() => go(n.href)}
                  className="group relative rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <span className="mr-1 font-mono text-[10px] text-accent">0{i + 1}</span>
                  {n.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="bg-gradient-accent hidden rounded-full px-5 py-2.5 text-sm font-semibold text-bg sm:inline-block"
              >
                Let&apos;s talk
              </a>
            </Magnetic>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line md:hidden"
            >
              <span className={`h-px w-4 bg-fg transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-fg transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[64] flex flex-col justify-center bg-surface px-8"
          >
            {nav.map((n, i) => (
              <motion.button
                key={n.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                onClick={() => go(n.href)}
                className="py-2 text-left font-[family-name:var(--font-display)] text-5xl font-bold"
              >
                <span className="mr-3 font-mono text-sm text-accent">0{i + 1}</span>
                {n.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
