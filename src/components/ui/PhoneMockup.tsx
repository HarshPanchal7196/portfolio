"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ScreenVariant } from "@/content/types";

/**
 * Phone mockup. Shows real screenshots if provided (auto-cycling),
 * otherwise an animated illustrated screen for the given variant.
 */
export default function PhoneMockup({
  screenshots = [],
  variant,
  colors,
  className = "",
}: {
  screenshots?: string[];
  variant: ScreenVariant;
  colors: [string, string];
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (screenshots.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % screenshots.length), 2800);
    return () => clearInterval(id);
  }, [screenshots.length]);

  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.6rem] border border-white/15 bg-[#0b0b0d] p-[10px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ${className}`}
      style={{ boxShadow: `0 40px 140px -40px ${colors[0]}88` }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#0d0e12]">
        {/* dynamic island */}
        <div className="absolute left-1/2 top-2.5 z-20 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
        {screenshots.length > 0 ? (
          screenshots.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="300px"
              className={`object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
            />
          ))
        ) : (
          <Screen variant={variant} colors={colors} />
        )}
      </div>
    </div>
  );
}

/* ───────────── Illustrated screens (no images needed) ───────────── */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-semibold text-white/80">
      <span>9:41</span>
      <span className="flex gap-1">
        <span className="h-1.5 w-3 rounded-sm bg-white/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
      </span>
    </div>
  );
}

function Screen({ variant, colors }: { variant: ScreenVariant; colors: [string, string] }) {
  const [a, b] = colors;
  const grad = `linear-gradient(135deg, ${a}, ${b})`;

  switch (variant) {
    case "map":
      return (
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 430" preserveAspectRatio="xMidYMid slice">
            <rect width="200" height="430" fill="#111318" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 38} x2="200" y2={i * 38 + 20} stroke="#1d2027" strokeWidth="6" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40 - 30} y2="430" stroke="#1d2027" strokeWidth="5" />
            ))}
            <path
              d="M40 330 C 60 280, 130 300, 120 230 S 70 150, 150 110"
              fill="none"
              stroke={a}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="6 7"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-52" dur="1.4s" repeatCount="indefinite" />
            </path>
            <circle cx="40" cy="330" r="7" fill={b} />
            <circle cx="150" cy="110" r="9" fill={a} opacity="0.3">
              <animate attributeName="r" values="9;18;9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="110" r="6" fill={a} />
          </svg>
          <StatusBar />
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#17191f]/95 p-3 backdrop-blur">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full" style={{ background: grad }} />
              <div className="flex-1">
                <div className="h-2 w-20 rounded bg-white/70" />
                <div className="mt-1.5 h-1.5 w-14 rounded bg-white/30" />
              </div>
              <div className="text-[10px] font-bold text-white">4 min</div>
            </div>
            <div className="mt-3 h-7 rounded-xl text-center text-[9px] font-bold leading-7 text-black" style={{ background: grad }}>
              Driver arriving
            </div>
          </div>
        </div>
      );

    case "shop":
      return (
        <div className="absolute inset-0 bg-[#111216]">
          <StatusBar />
          <div className="px-4 pt-4">
            <div className="h-2.5 w-24 rounded bg-white/80" />
            <div className="mt-3 h-7 rounded-xl bg-white/5" />
            <div className="mt-3 h-20 rounded-2xl p-3" style={{ background: grad }}>
              <div className="h-2 w-16 rounded bg-black/40" />
              <div className="mt-2 h-1.5 w-24 rounded bg-black/25" />
              <div className="mt-3 inline-block rounded-full bg-black/70 px-2 py-1 text-[7px] font-bold text-white">✦ AI picks</div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-white/5 p-2">
                  <div
                    className="aspect-square rounded-lg"
                    style={{ background: `linear-gradient(${120 + i * 40}deg, ${a}55, ${b}22)` }}
                  />
                  <div className="mt-2 h-1.5 w-12 rounded bg-white/50" />
                  <div className="mt-1 h-1.5 w-8 rounded" style={{ background: a }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "health":
      return (
        <div className="absolute inset-0 bg-[#0f1214]">
          <StatusBar />
          <div className="px-4 pt-4">
            <div className="text-[9px] uppercase tracking-widest text-white/40">Today</div>
            <div className="mt-1 h-2.5 w-28 rounded bg-white/80" />
            <div className="relative mx-auto mt-5 h-28 w-28">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2427" strokeWidth="9" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={a} strokeWidth="9" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="70">
                  <animate attributeName="stroke-dashoffset" values="264;70" dur="1.8s" fill="freeze" />
                </circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">3/4</span>
                <span className="text-[7px] uppercase tracking-widest text-white/40">doses</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 p-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: b }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: b }} />
              </span>
              <span className="text-[8px] text-white/70">BLE device connected</span>
            </div>
            {["08:00", "13:00", "20:00"].map((t, i) => (
              <div key={t} className="mt-2 flex items-center justify-between rounded-xl bg-white/5 p-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full" style={{ background: i < 2 ? grad : "#22272b" }} />
                  <div className="h-1.5 w-14 rounded bg-white/50" />
                </div>
                <span className="text-[8px] text-white/50">{t}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "fitness":
      return (
        <div className="absolute inset-0 bg-[#121110]">
          <StatusBar />
          <div className="px-4 pt-4">
            <div className="text-[9px] uppercase tracking-widest text-white/40">Morning run</div>
            <div className="mt-1 text-3xl font-black text-white">
              5.24<span className="ml-1 text-xs font-medium text-white/50">km</span>
            </div>
            <svg viewBox="0 0 160 120" className="mt-3 w-full rounded-2xl bg-white/5">
              <path d="M15 95 Q 40 20, 70 60 T 120 40 T 150 80" fill="none" stroke={a} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300">
                <animate attributeName="stroke-dashoffset" values="300;0" dur="2.2s" fill="freeze" />
              </path>
              <circle cx="150" cy="80" r="4" fill={b} />
            </svg>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[["Pace", "5'12\""], ["Time", "27:18"], ["kcal", "412"]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/5 p-2 text-center">
                  <div className="text-[10px] font-bold text-white">{v}</div>
                  <div className="text-[7px] uppercase text-white/40">{k}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex h-14 items-end gap-1 rounded-xl bg-white/5 p-2">
              {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? grad : "#2a2826" }} />
              ))}
            </div>
          </div>
        </div>
      );

    case "flow":
      return (
        <div className="absolute inset-0 bg-[#100f14]">
          <StatusBar />
          <svg viewBox="0 0 200 400" className="absolute inset-0 mt-8 h-full w-full">
            {[
              [100, 50, "Webhook"],
              [55, 130, "Gemini"],
              [145, 130, "OpenAI"],
              [100, 210, "Transform"],
              [55, 290, "Postgres"],
              [145, 290, "Slack"],
            ].map(([x, y, label], i) => (
              <g key={i}>
                <rect x={(x as number) - 36} y={(y as number) - 16} width="72" height="32" rx="9" fill="#1b1a22" stroke={i % 2 ? b : a} strokeOpacity="0.6" />
                <text x={x as number} y={(y as number) + 4} textAnchor="middle" fontSize="10" fill="#fff" fontFamily="monospace">
                  {label}
                </text>
              </g>
            ))}
            {[
              "M100 66 L55 114",
              "M100 66 L145 114",
              "M55 146 L100 194",
              "M145 146 L100 194",
              "M100 226 L55 274",
              "M100 226 L145 274",
            ].map((d, i) => (
              <path key={i} d={d} stroke={a} strokeWidth="1.5" strokeDasharray="4 4" fill="none">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
              </path>
            ))}
          </svg>
        </div>
      );

    default:
      return <div className="absolute inset-0" style={{ background: grad }} />;
  }
}
