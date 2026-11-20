import type { FeaturedProject } from "./types";

/**
 * FEATURED WORK — shown in the cinematic horizontal reel.
 * Order here = order on the page. 3–6 projects works best.
 *
 * To add real screenshots:
 *   1. Create /public/projects/<slug>/
 *   2. Drop portrait phone screenshots (≈ 1080×2340) there
 *   3. Add their paths to `screenshots`
 */
export const featuredProjects: FeaturedProject[] = [
  {
    slug: "ride-hailing",
    title: "Ride-Hailing & On-Demand Mobility Platform",
    shortTitle: "Ride",
    role: "Lead React Native Developer",
    domain: "Mobility",
    summary:
      "Cross-platform ride-hailing app for passengers and drivers — booking, driver discovery, real-time trip tracking, ride management and ratings.",
    contributions: [
      "Owned architecture & technical decisions for Android and iOS.",
      "Built auth, driver onboarding, booking, matching, trip history & ratings.",
      "Real-time GPS tracking, route visualisation and ride-status sync between rider & driver.",
      "Mentored the team, ran code reviews and shipped production releases.",
    ],
    stack: ["React Native", "TypeScript", "Maps", "WebSocket", "Push"],
    metrics: [
      { value: "2", label: "Apps · Rider & Driver" },
      { value: "Live", label: "GPS sync" },
    ],
    screenshots: [],
    screen: "map",
    colors: ["#7c5cff", "#22d3ee"],
  },
  {
    slug: "pet-commerce-ai",
    title: "AI-Enabled E-Commerce & Pet Services Platform",
    shortTitle: "Commerce",
    role: "Senior React Native Developer",
    domain: "E-Commerce · AI",
    summary:
      "A pet-care super app combining product discovery and purchasing with pet profiles and AI-assisted pet care — recommendations and symptom analysis.",
    contributions: [
      "Led technical implementation of the React Native app.",
      "Guest checkout, discovery, filters, cart, checkout & payment gateway.",
      "Integrated AI SDKs for smart recommendations and symptom analysis.",
      "Offline caching with Redux Toolkit for instant, responsive UX.",
    ],
    stack: ["React Native", "Redux Toolkit", "AI SDK", "Payments"],
    metrics: [{ value: "AI", label: "Symptom analysis" }],
    screenshots: [],
    screen: "shop",
    colors: ["#f97316", "#ec4899"],
  },
  {
    slug: "iot-healthcare",
    title: "IoT Healthcare & Medication Management",
    shortTitle: "Care",
    role: "Senior React Native Developer",
    domain: "Healthcare · IoT",
    summary:
      "A healthcare app that pairs with connected devices over Bluetooth LE to track medication and keep patients engaged — even offline.",
    contributions: [
      "Bluetooth Low Energy connectivity for connected-device integration.",
      "Offline-first synchronisation with Realm database.",
      "Medication-tracking and patient-engagement workflows.",
      "Focused on device communication reliability and data integrity.",
    ],
    stack: ["React Native", "BLE", "Realm", "Offline-first"],
    metrics: [{ value: "BLE", label: "Device sync" }],
    screenshots: [],
    screen: "health",
    colors: ["#10b981", "#22d3ee"],
  },
  {
    slug: "fitness-tracking",
    title: "Fitness & Activity Tracking",
    shortTitle: "Move",
    role: "React Native Developer",
    domain: "Fitness",
    summary:
      "Activity tracking with live route recording, distance and speed analytics, synced with Apple HealthKit and Google Fit, plus premium subscriptions.",
    contributions: [
      "Route tracking, distance calculation and speed analytics via geolocation.",
      "Apple HealthKit & Google Fit activity synchronisation.",
      "Subscription-based premium features.",
    ],
    stack: ["React Native", "Geolocation", "HealthKit", "Google Fit"],
    screenshots: [],
    screen: "fitness",
    colors: ["#eab308", "#ef4444"],
  },
  {
    slug: "n8n-automation",
    title: "AI Automation with n8n",
    shortTitle: "Flow",
    role: "Creator",
    domain: "AI · Automation",
    summary:
      "Six published, reusable n8n templates wiring Gemini & OpenAI into real workflows — applicant extraction, fitness/nutrition analysis, reporting and smart notifications.",
    contributions: [
      "Webhook-triggered pipelines with transformation & conditional logic.",
      "PostgreSQL, Google Sheets, Slack, PDF generation & email delivery.",
      "AI-powered data extraction and automated reporting.",
    ],
    stack: ["n8n", "Gemini", "OpenAI", "PostgreSQL", "Webhooks"],
    metrics: [{ value: "6", label: "Published templates" }],
    screenshots: [],
    screen: "flow",
    colors: ["#a855f7", "#6366f1"],
  },
];
