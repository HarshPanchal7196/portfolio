import { marquee } from "@/content/site";

/** Infinite, tilted double marquee of keywords. */
export default function Marquee() {
  const row = (reverse = false) => (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{ animationDirection: reverse ? "reverse" : "normal", ["--marquee-duration" as string]: "55s" }}
      >
        {[...marquee, ...marquee].map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`px-6 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-6xl ${
                i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--muted)]" : "text-fg"
              }`}
            >
              {w}
            </span>
            <span className="text-2xl text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-label="Technologies" className="relative overflow-hidden py-16 md:py-24">
      <div className="-rotate-2 scale-105 border-y border-line bg-surface/60 py-5">{row()}</div>
      <div className="mt-[-10px] rotate-1 scale-105 border-y border-line bg-bg py-5 opacity-70">{row(true)}</div>
    </section>
  );
}
