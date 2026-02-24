import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work — Case Studies & Portfolio",
  description:
    "Explore AutoPilot Systems' project portfolio. We build AI-powered platforms, automation systems, and high-performance web experiences that drive real business growth.",
  openGraph: {
    title: "AutoPilot Systems — Case Studies & Work",
    description:
      "Real projects. Real results. See how we help businesses 3× their revenue with AI automation and world-class web platforms.",
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
