import { Fragment } from "react";

/** Renders text where *wrapped* words get the accent serif-italic style. */
export default function RichText({ text, accentClass = "" }: { text: string; accentClass?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i} className={`font-[family-name:var(--font-serif)] font-normal italic text-gradient pr-[0.08em] ${accentClass}`}>
            {p.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
