import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/syne";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

import { theme } from "@/content/theme";
import { seo, profile } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: `${profile.firstName} ${profile.lastName}` }],
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    type: "website",
    images: [{ url: profile.portrait }],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export const viewport: Viewport = {
  themeColor: theme.bg,
};

const themeVars = {
  "--bg": theme.bg,
  "--surface": theme.surface,
  "--fg": theme.fg,
  "--muted": theme.muted,
  "--accent": theme.accent,
  "--accent2": theme.accent2,
  "--live": theme.live,
} as CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={themeVars}>
      <body className="bg-bg text-fg">{children}</body>
    </html>
  );
}
