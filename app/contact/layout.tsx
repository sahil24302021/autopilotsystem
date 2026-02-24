import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description:
    "Ready to build something world-class? Get in touch with AutoPilot Systems. Email: autopilotsystem07@gmail.com | Phone: +91 9934857789. We respond within 24 hours.",
  openGraph: {
    title: "Contact AutoPilot Systems — Initiate Your Project",
    description:
      "Tell us what you're building. We'll tell you how to dominate your market with it.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
