/**
 * Shared content types. You normally never need to edit this file —
 * edit the data files in this folder instead (site.ts, projects.ts, apps.ts, ...).
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Short handle shown next to the label, optional */
  handle?: string;
};

export type Stat = {
  /** Numeric part — animated with a count-up */
  value: number;
  /** Text appended after the number, e.g. "+", "K+" */
  suffix?: string;
  /** Number of decimals to show */
  decimals?: number;
  label: string;
};

export type Experience = {
  company: string;
  role: string;
  /** Free text, e.g. "06/2024" */
  start: string;
  end: string;
  location?: string;
  highlights: string[];
  stack?: string[];
};

export type SkillLevel = "Core" | "Working" | "Exploring";

export type SkillGroup = {
  title: string;
  /** Small index label shown in mono, e.g. "01" */
  items: { name: string; level?: SkillLevel; note?: string }[];
};

/** Visual used inside the phone mockup when no screenshot is provided */
export type ScreenVariant = "map" | "shop" | "health" | "fitness" | "flow" | "generic";

export type FeaturedProject = {
  slug: string;
  title: string;
  /** Short punchy name shown huge on the card */
  shortTitle: string;
  role: string;
  domain: string;
  year?: string;
  summary: string;
  contributions: string[];
  stack: string[];
  /** Optional metric badges, e.g. { value: "50K+", label: "Downloads" } */
  metrics?: { value: string; label: string }[];
  links?: { label: string; href: string }[];
  /**
   * Put screenshots in /public/projects/<slug>/ and reference them here,
   * e.g. "/projects/ride-hailing/screen-1.png". If empty, an animated
   * illustrated screen (see `screen`) is shown instead.
   */
  screenshots?: string[];
  screen: ScreenVariant;
  /** Two colors for the card gradient. Falls back to theme accents. */
  colors?: [string, string];
};

export type AppCategory =
  | "Healthcare"
  | "IoT"
  | "Fitness"
  | "Sports"
  | "Workforce"
  | "E-Commerce"
  | "Social"
  | "Mobility"
  | "Utility"
  | "Lifestyle";

export type PublishedApp = {
  name: string;
  category: AppCategory;
  description: string;
  /** Play Store minimum installs as shown on the store, e.g. "50K+" */
  downloads?: string;
  /** Platform badge shown at bottom of card (no direct store link needed), e.g. "Android · iOS" */
  platforms?: string;
  playStore?: string | string[];
  appStore?: string;
  website?: string;
  /** Optional icon: put file in /public/apps/ and reference "/apps/my-app.png" */
  icon?: string;
  /** Pin to the top of the archive */
  highlight?: boolean;
};
