/**
 * ─────────────────────────────────────────────────────────────
 *  THEME — change the whole look of the site from here.
 * ─────────────────────────────────────────────────────────────
 *  1. Pick a preset by changing `activeTheme` below.
 *  2. Or add your own preset to `themes` and select it.
 *  All colors are injected as CSS variables (see app/layout.tsx).
 */

export type ThemePreset = {
  name: string;
  /** Page background */
  bg: string;
  /** Raised surfaces (cards) */
  surface: string;
  /** Primary text */
  fg: string;
  /** Secondary / muted text */
  muted: string;
  /** Accent gradient start */
  accent: string;
  /** Accent gradient end */
  accent2: string;
  /** "Available" status dot */
  live: string;
  /** Hero shader colors (3 blobs that blend in the WebGL background) */
  shader: [string, string, string];
};

export const themes = {
  aurora: {
    name: "Aurora",
    bg: "#07080a",
    surface: "#0f1115",
    fg: "#f4f4f5",
    muted: "#8b8f98",
    accent: "#7c5cff",
    accent2: "#22d3ee",
    live: "#22c55e",
    shader: ["#3b1fd1", "#0ea5c6", "#c026d3"],
  },
  ember: {
    name: "Ember",
    bg: "#0a0806",
    surface: "#14100c",
    fg: "#f7f3ee",
    muted: "#9a8f84",
    accent: "#ff5e3a",
    accent2: "#ffb547",
    live: "#22c55e",
    shader: ["#c2410c", "#f59e0b", "#be123c"],
  },
  acid: {
    name: "Acid",
    bg: "#060706",
    surface: "#0e110e",
    fg: "#f2f5ee",
    muted: "#8a9285",
    accent: "#c6ff3d",
    accent2: "#3dffa8",
    live: "#c6ff3d",
    shader: ["#4d7c0f", "#065f46", "#a3e635"],
  },
  gold: {
    name: "Mono-Gold",
    bg: "#080807",
    surface: "#11100e",
    fg: "#f5f2ea",
    muted: "#948e80",
    accent: "#e8c77a",
    accent2: "#fff1cf",
    live: "#22c55e",
    shader: ["#78591c", "#3f3f46", "#b88a2e"],
  },
} satisfies Record<string, ThemePreset>;

/** 👉 Change this to "ember" | "acid" | "gold" to switch the whole site palette */
export const activeTheme: keyof typeof themes = "aurora";

export const theme: ThemePreset = themes[activeTheme];
