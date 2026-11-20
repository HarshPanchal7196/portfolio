import type { SocialLink, Stat } from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  SITE / PROFILE — your identity, hero copy, contact & SEO.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  firstName: "Harsh",
  lastName: "Panchal",
  /** Monogram used in the navbar & preloader */
  monogram: "HP",
  role: "Senior Mobile Engineer",
  /** Words that rotate in the hero ticker */
  roles: ["React Native", "Android", "iOS", "Mobile Architecture", "AI Automation"],
  location: "Ahmedabad, India",
  /** IANA timezone — used for the live clock in the contact section */
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  /** Career start — years of experience are calculated automatically */
  careerStart: "2018-12-01",

  /** Hero headline. Wrap words in *asterisks* to render them in the accent serif style. */
  headline: "I craft *mobile apps* people actually keep on their home screen.",
  intro:
    "Senior mobile engineer building production-grade React Native & Android apps — from real-time ride-hailing and IoT healthcare to AI-powered commerce.",

  /** Long-form about text, revealed word-by-word on scroll. */
  about:
    "For nearly eight years I've been turning complex product ideas into fast, reliable mobile experiences. I've shipped 25+ apps to the App Store and Play Store across healthcare, IoT, fitness, mobility, workforce and social — leading architecture, mentoring developers and owning releases end-to-end. I care about the details users feel: smooth 60fps interactions, offline-first data, and apps that simply work.",

  availability: {
    open: true,
    label: "Open to new opportunities",
  },

  /** Portrait in /public/images */
  portrait: "/images/profile.jpg",
  /** Resume file in /public */
  resume: "/Harsh_Panchal_Resume.pdf",

  email: "harshhpanchal@gmail.com",
  phone: "+91 8866542481",
  /** Set to true to show your phone number publicly */
  showPhone: false,
};

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-panchal-287130138", handle: "harsh-panchal" },
  // Add more, e.g.:
  // { label: "GitHub", href: "https://github.com/your-handle", handle: "@your-handle" },
  // { label: "n8n", href: "https://n8n.io/creators/your-handle", handle: "Templates" },
];

/** Years of experience, computed from careerStart (e.g. 7.9) */
export function yearsOfExperience(): number {
  const start = new Date(profile.careerStart).getTime();
  const years = (Date.now() - start) / (365.25 * 24 * 3600 * 1000);
  return Math.floor(years * 10) / 10;
}

export const stats: Stat[] = [
  { value: yearsOfExperience(), decimals: 1, suffix: "+", label: "Years building mobile" },
  { value: 25, suffix: "+", label: "Production apps shipped" },
  { value: 100, suffix: "K+", label: "Combined store installs" },
  { value: 4, label: "Companies · 1 craft" },
];

/** Words in the infinite marquee */
export const marquee = [
  "React Native",
  "TypeScript",
  "Android",
  "iOS",
  "Kotlin",
  "Redux Toolkit",
  "Zustand",
  "TanStack Query",
  "GraphQL",
  "WebSocket",
  "BLE",
  "Realm",
  "Firebase",
  "MapBox",
  "HealthKit",
  "n8n",
  "AI SDKs",
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Apps", href: "#apps" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const seo = {
  title: "Harsh Panchal — Senior Mobile Engineer · React Native & Android",
  description:
    "Senior mobile engineer with 7+ years of experience and 25+ production apps across healthcare, IoT, fitness, mobility and e-commerce. React Native, TypeScript, Android, iOS.",
  url: "https://harshpanchal.dev", // 👉 change to your domain
  keywords: ["Harsh Panchal", "React Native developer", "Android developer", "Mobile engineer", "Ahmedabad", "iOS"],
};
