"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Menu from "@/components/Menu";

const SERVICES = [
  {
    id: "01", title: "AI AUTOMATION",
    description: "We design, build, and deploy intelligent agents that take over your repetitive, time-intensive workflows. Data parsing, report generation, scheduling, multi-step approvals — automated end-to-end.",
    features: ["Custom LLM Agents", "Workflow Automation", "Data Pipeline Engineering", "API Integration", "24/7 Autonomous Operation"],
    metric: "40+ hrs/wk saved",
  },
  {
    id: "02", title: "WEB ENGINEERING",
    description: "We build production-grade web products using Next.js, TypeScript, and modern cloud infrastructure. Fast. Scalable. Accessible. Designed to convert and built to last.",
    features: ["Next.js / React", "Full-Stack Architecture", "Performance Optimization", "SEO & Core Web Vitals", "Mobile-First Design"],
    metric: "3× faster load",
  },
  {
    id: "03", title: "GROWTH OPERATIONS",
    description: "Systematic growth infrastructure — from funnel design to lead automation. We build the engines that generate, qualify, and convert leads while you sleep.",
    features: ["Lead Gen Systems", "CRM Automation", "Conversion Funnel Design", "A/B Testing Infrastructure", "Analytics & Attribution"],
    metric: "2.8× more leads",
  },
  {
    id: "04", title: "SYSTEM INTEGRATION",
    description: "Connect your tools, databases, and third-party APIs into a single unified data layer. No more switching tabs, manual imports, or broken handoffs between platforms.",
    features: ["REST / GraphQL APIs", "Webhook Orchestration", "Database Sync", "Third-Party Connectors", "Real-Time Data Flows"],
    metric: "99.9% uptime",
  },
];

export default function UpgradesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<string | null>("01");

  return (
    <div className="bg-[#060606] min-h-screen text-[#d8d8d8] font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-14 py-5 md:py-6 flex justify-between items-center mix-blend-difference text-white">
        <a href="/" className="flex items-center gap-2.5 group" aria-label="AutoPilot Systems Home">
          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-5 h-5 bg-white flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </motion.div>
          <div>
            <div className="text-base md:text-lg font-black uppercase tracking-tighter leading-none">
              AUTO<span className="text-gray-400 group-hover:text-white transition-colors">PILOT</span>
            </div>
            <div className="text-[0.5rem] font-mono tracking-[0.3em] text-white/40 uppercase">Systems _</div>
          </div>
        </a>
        <button onClick={() => setMenuOpen(true)} aria-label="Open navigation menu"
          className="text-[10px] font-bold uppercase tracking-[0.28em] flex items-center gap-2 group touch-manipulation">
          <span className="relative">Menu<span className="absolute -bottom-px left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-400" /></span>
          <span className="text-base">[=]</span>
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-24 px-6 md:px-14 border-b border-white/[0.06]">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-10 md:mb-14">
          <div className="w-6 h-px bg-white/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Our Capabilities</span>
        </motion.div>
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: "108%" }} animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="font-black uppercase tracking-tighter leading-[0.85] text-white"
            style={{ fontSize: "clamp(2.8rem, 10vw, 10rem)" }}>
            System{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }}>Upgrades.</span>
          </motion.h1>
        </div>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 md:mt-8 text-gray-500 text-sm md:text-base max-w-lg leading-relaxed">
          Precision services for companies that need systems that scale. Every offering is engineered, not assembled.
        </motion.p>
      </section>

      {/* ACCORDION */}
      <section className="px-6 md:px-14">
        {SERVICES.map((s, i) => (
          <motion.div key={s.id}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.06 }}
            className="border-b border-white/[0.06]">
            <button
              onClick={() => setOpen(open === s.id ? null : s.id)}
              aria-expanded={open === s.id}
              className="w-full text-left py-8 md:py-10 flex items-center justify-between gap-4 group touch-manipulation"
            >
              <div className="flex items-baseline gap-4 md:gap-7 flex-1 min-w-0">
                <span className="font-mono text-[9px] text-gray-700 tracking-[0.4em] shrink-0">{s.id}</span>
                <span className="font-black uppercase tracking-tighter text-white group-hover:translate-x-1.5 transition-transform duration-500 truncate"
                  style={{ fontSize: "clamp(1.4rem, 4vw, 3.5rem)" }}>
                  {s.title}
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-8 shrink-0">
                <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600">{s.metric}</span>
                <motion.div
                  animate={{ rotate: open === s.id ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="w-7 h-7 md:w-8 md:h-8 border border-white/[0.15] flex items-center justify-center shrink-0">
                  <span className="text-white/60 text-sm leading-none">+</span>
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {open === s.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden">
                  <div className="pb-10 md:pb-14 flex flex-col md:flex-row gap-8 md:gap-14">
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-2xl">{s.description}</p>
                      <a href="/contact"
                        className="inline-flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300 group touch-manipulation">
                        Start this service
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </a>
                    </div>
                    <div className="md:w-64 shrink-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-gray-600 mb-4 md:mb-5">What's included</p>
                      <ul className="space-y-2.5">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                            <span className="text-xs md:text-sm text-gray-400">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/[0.06]">
                        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-gray-600 mb-1.5">Key Result</p>
                        <p className="font-black uppercase tracking-tighter text-white text-xl md:text-2xl">{s.metric}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 px-6 md:px-14 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600 mb-4 md:mb-5">Ready to upgrade?</p>
          <h2 className="font-black uppercase tracking-tighter leading-[0.88] text-white"
            style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}>
            Let's build{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }}>together.</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
          <a href="/contact"
            className="group inline-flex items-center gap-4 bg-white text-black px-6 md:px-8 py-3.5 md:py-4 font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-xs hover:bg-transparent hover:text-white border border-white transition-all duration-500 touch-manipulation">
            Initiate a Project
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/[0.05] px-6 md:px-14 py-7 md:py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="font-mono text-[9px] text-gray-700 uppercase tracking-[0.3em]">© 2026 AutoPilot Systems</span>
        <div className="flex gap-6 font-mono text-[9px] uppercase tracking-[0.3em]">
          <a href="mailto:autopilotsystem07@gmail.com" className="text-gray-700 hover:text-white transition-colors duration-300 touch-manipulation">Email</a>
          <a href="tel:+919934857789" className="text-gray-700 hover:text-white transition-colors duration-300 touch-manipulation">Call</a>
          <a href="/" className="text-gray-700 hover:text-white transition-colors duration-300 touch-manipulation">← Home</a>
        </div>
      </div>
    </div>
  );
}
