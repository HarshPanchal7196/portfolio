"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { publishedApps } from "@/content/apps";
import type { PublishedApp } from "@/content/types";
import SectionHeading from "@/components/ui/SectionHeading";

const firstLink = (a: PublishedApp) =>
  (Array.isArray(a.playStore) ? a.playStore[0] : a.playStore) ?? a.appStore ?? a.website;

/** Filterable archive of every shipped app. Data: src/content/apps.ts */
export default function AppsArchive() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(publishedApps.map((a) => a.category)))],
    [],
  );
  const apps = useMemo(() => {
    const sorted = [...publishedApps].sort((a, b) => Number(!!b.highlight) - Number(!!a.highlight));
    return filter === "All" ? sorted : sorted.filter((a) => a.category === filter);
  }, [filter]);

  useGSAP(
    () => {
      gsap.from(".apps-filter", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".apps-filters", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="apps" ref={root} className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          index="03"
          label="App archive"
          title={
            <>
              {publishedApps.length}+ apps,
              <br />
              <em className="font-[family-name:var(--font-serif)] font-normal italic text-gradient">shipped to production</em>
            </>
          }
        />
        <div className="apps-filters flex max-w-xl flex-wrap gap-2 lg:justify-end">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                requestAnimationFrame(() => ScrollTrigger.refresh());
              }}
              className={`apps-filter relative rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                filter === c ? "border-transparent text-bg" : "border-line text-muted hover:text-fg"
              }`}
            >
              {filter === c && (
                <motion.span layoutId="apps-pill" className="bg-gradient-accent absolute inset-0 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.ul layout className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {apps.map((a) => {
            const href = firstLink(a);
            const extra = Array.isArray(a.playStore) ? a.playStore.length - 1 : 0;
            const Tag = href ? motion.a : motion.div;
            return (
              <motion.li
                key={a.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Tag
                  {...(href ? { href, target: "_blank", rel: "noreferrer", "data-cursor": "Open" } : {})}
                  className="gradient-border group relative flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:bg-surface"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {a.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.icon} alt="" className="h-11 w-11 rounded-xl" />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg font-[family-name:var(--font-display)] text-lg font-bold">
                          <span className="text-gradient">{a.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium leading-tight">{a.name}</div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{a.category}</div>
                      </div>
                    </div>
                    {a.downloads && (
                      <span className="shrink-0 rounded-full bg-fg/5 px-2.5 py-1 font-mono text-[10px] text-fg/80">↓ {a.downloads}</span>
                    )}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{a.description}</p>
                  <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    <span className="flex gap-2">
                      {a.platforms ? (
                        <span>{a.platforms}</span>
                      ) : (
                        <>
                          {a.playStore && <span>Play Store{extra > 0 ? ` +${extra}` : ""}</span>}
                          {a.appStore && <span>App Store</span>}
                          {a.website && <span>Web</span>}
                          {!href && <span>Production</span>}
                        </>
                      )}
                    </span>
                    {href && <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>}
                  </div>
                </Tag>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
