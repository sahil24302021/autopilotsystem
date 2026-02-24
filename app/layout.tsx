import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: {
    default: "AutoPilot Systems | AI Automation & Web Development Agency",
    template: "%s | AutoPilot Systems",
  },
  description:
    "AutoPilot Systems is an elite engineering agency specializing in AI automation, high-performance web development, and business growth systems. We replace manual bottlenecks with intelligent agents and build web platforms that scale.",
  keywords: [
    "AI automation agency",
    "web development agency",
    "AI workflow automation",
    "business automation",
    "growth systems",
    "Next.js development",
    "React development",
    "AI agents",
    "CRM automation",
    "lead generation automation",
    "custom web development",
    "high performance website",
    "AutoPilot Systems",
    "software agency India",
    "tech agency",
    "web design agency",
    "full stack development",
    "serverless architecture",
    "digital transformation",
    "startup technology partner",
  ],
  authors: [{ name: "AutoPilot Systems", url: "https://autopilotsystems.in" }],
  creator: "AutoPilot Systems",
  publisher: "AutoPilot Systems",
  metadataBase: new URL("https://autopilotsystems.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://autopilotsystems.in",
    siteName: "AutoPilot Systems",
    title: "AutoPilot Systems | AI Automation & Web Development Agency",
    description:
      "Elite engineering agency. We build AI-powered web platforms and automated growth systems that scale infinitely. No templates. No compromises.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoPilot Systems — AI Automation & Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoPilot Systems | AI Automation & Web Development",
    description:
      "Elite engineering agency. AI automation, high-performance web platforms, and growth systems that scale.",
    images: ["/og-image.jpg"],
    creator: "@autopilotsys",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-search-console-token-here",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://autopilotsystems.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AutoPilot Systems",
              url: "https://autopilotsystems.in",
              logo: "https://autopilotsystems.in/og-image.jpg",
              description:
                "Elite AI automation and web development agency. We build intelligent systems that scale your business.",
              email: "autopilotsystem07@gmail.com",
              telephone: "+919934857789",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [],
              serviceArea: {
                "@type": "Place",
                name: "Global",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Workflow Automation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Architecture & Development" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Growth Operations" } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#060606] text-white antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}