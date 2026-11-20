import type { Experience, SkillGroup } from "./types";

/**
 * EXPERIENCE — newest first. Add / remove entries freely.
 */
export const experience: Experience[] = [
  {
    company: "WeblineIndia",
    role: "Sr. Software Engineer",
    start: "06/2024",
    end: "08/2026",
    location: "Ahmedabad",
    highlights: [
      "Lead feature development and modernization of mobile app architecture.",
      "Design scalable React Native apps for Android & iOS; own delivery from planning to production.",
      "Mentor junior developers, run code reviews and set coding standards.",
      "Manage Android & iOS deployment and release activities.",
    ],
    stack: ["React Native", "TypeScript", "Redux Toolkit", "Firebase"],
  },
  {
    company: "AIMDek Technologies",
    role: "Sr. Software Engineer",
    start: "12/2022",
    end: "05/2024",
    location: "Ahmedabad",
    highlights: [
      "Delivered enterprise-grade cross-platform apps with React Native.",
      "End-to-end delivery: requirements, planning, build, testing, deployment & support.",
      "Worked with clients to translate business needs into technical solutions.",
      "Built reusable, modular component libraries for consistency.",
    ],
    stack: ["React Native", "TypeScript", "Redux Saga", "REST"],
  },
  {
    company: "Nimblechapps",
    role: "Mobile Developer",
    start: "08/2021",
    end: "12/2022",
    location: "Ahmedabad",
    highlights: [
      "Built and maintained cross-platform apps with React Native.",
      "Implemented third-party integrations, APIs and real-time tracking.",
      "Improved app performance, stability and responsiveness.",
    ],
    stack: ["React Native", "MapBox", "WebSocket"],
  },
  {
    company: "Technovate Solutions",
    role: "Android Developer",
    start: "12/2018",
    end: "07/2021",
    location: "Ahmedabad",
    highlights: [
      "Built Android apps with BLE communication and connected-device workflows.",
      "Integrated Firebase, MapBox, Auth0 and graph visualizations.",
      "Supported deployment and release activities.",
    ],
    stack: ["Kotlin", "Java", "BLE", "Firebase"],
  },
];

export const education = {
  school: "Silver Oak College of Engineering and Technology",
  degree: "B.E. Computer Engineering",
  years: "2014 – 2018",
};

/**
 * SKILLS — level is optional: "Core" | "Working" | "Exploring".
 */
export const skills: SkillGroup[] = [
  {
    title: "Mobile & Languages",
    items: [
      { name: "React Native", level: "Core", note: "25+ production apps" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "Android · Kotlin", level: "Working" },
      { name: "Java", level: "Working" },
      { name: "iOS releases", level: "Core", note: "App Store delivery" },
    ],
  },
  {
    title: "State & Data",
    items: [
      { name: "Redux Toolkit", level: "Core" },
      { name: "Redux Saga", level: "Core" },
      { name: "Zustand", level: "Working" },
      { name: "TanStack Query", level: "Working" },
      { name: "Realm · SQLite", level: "Core", note: "Offline-first sync" },
      { name: "MMKV · AsyncStorage", level: "Core" },
    ],
  },
  {
    title: "APIs & Real-time",
    items: [
      { name: "REST APIs", level: "Core" },
      { name: "GraphQL", level: "Working" },
      { name: "WebSocket", level: "Working", note: "Live trip tracking" },
      { name: "Axios", level: "Core" },
      { name: "Push notifications", level: "Core" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { name: "Bluetooth LE", level: "Core", note: "IoT & medical devices" },
      { name: "Firebase", level: "Core" },
      { name: "MapBox · Maps · GPS", level: "Core" },
      { name: "HealthKit · Google Fit", level: "Working" },
      { name: "Auth0", level: "Working" },
      { name: "Payment gateways", level: "Working" },
      { name: "AI SDKs", level: "Exploring" },
    ],
  },
  {
    title: "AI & Automation",
    items: [
      { name: "n8n", level: "Working", note: "6 published templates" },
      { name: "Gemini · OpenAI APIs", level: "Exploring" },
      { name: "Cursor · Windsurf · Copilot", level: "Core", note: "AI-assisted dev" },
    ],
  },
  {
    title: "Delivery",
    items: [
      { name: "Agile · Scrum", level: "Core" },
      { name: "Sprint planning & estimation", level: "Core" },
      { name: "Code review & mentoring", level: "Core" },
      { name: "Play Store / App Store releases", level: "Core" },
    ],
  },
];
