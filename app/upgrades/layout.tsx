import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Upgrades — AI Automation, Web Dev, Growth Ops",
  description:
    "AutoPilot Systems services: Custom web architecture, AI workflow automation, and growth operations. Replace bottlenecks with intelligent systems that scale infinitely.",
  openGraph: {
    title: "AutoPilot Systems Services — AI, Web Dev & Growth",
    description:
      "Custom web platforms, AI agents, CRM automation, and growth ops. Built to scale with no templates and no compromises.",
  },
};

export default function UpgradesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
