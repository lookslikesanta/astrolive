import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AstroLive Compass",
    template: "%s · AstroLive Compass",
  },
  description:
    "A hackathon prototype that turns astrology into action-first daily planning, shared moments, and contextual expert guidance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
