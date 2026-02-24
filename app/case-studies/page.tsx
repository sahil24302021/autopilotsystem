"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Menu from "@/components/Menu";

const PROJECTS = [
  {
    id: "01", title: "VITAL COPILOT",
    service: "AI Data Pipeline & Web Architecture", year: "2025", tag: "Healthcare AI",
    description: "Built a secure, high-throughput diagnostic data platform replacing 40 hours of manual data entry per week with an autonomous AI pipeline. Zero downtime. 99.9% accuracy.",
    result: "40hrs/wk saved", img: "/1.jpg",
  },
  {
    id: "02", title: "TAILOR PLATFORM",
    service: "Scalable Full-Stack Infrastructure", year: "2025", tag: "SaaS Platform",
    description: "Architected a seamless, high-performance web application capable of handling thousands of concurrent user generations without latency.",
    result: "3× conversion", img: "/2.jpg",
  },
  {
    id: "03", title: "OMNIBOT AGENT",
    service: "Autonomous Machine Learning Agent", year: "2024", tag: "Automation",
    description: "Engineered a custom AI agent that autonomously manages server-side tasks, reads incoming queries, and executes complex scripts on command.",
    result: "100% automated", img: "/3.jpg",
  },
];

export default function CaseStudiesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY - 90);
  };

  return (
    <div
      className="bg-[#060606] min-h-screen text-[#d8d8d8] font-sans selection:bg-white selection:text-black overflow-x-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />

      {/* Floating image cursor — desktop only */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="fixed z-[200] pointer-events-none overflow-hidden hidden md:block"
            style={{ x: springX, y: springY, width: 260, height: 175 }}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          >
            <img src={PROJECTS.find(p => p.id === hovered)?.img} alt=""
              className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

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
      <section className="pt-36 md:pt-40 pb-16 md:pb-20 px-6 md:px-14 border-b border-white/[0.06]">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-10 md:mb-12">
          <div className="w-6 h-px bg-white/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Selected Work</span>
        </motion.div>
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: "108%" }} animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="font-black uppercase tracking-tighter leading-[0.85] text-white"
            style={{ fontSize: "clamp(2.8rem, 10vw, 10rem)" }}>
            Case{" "}
            <span className="text-white/25">Studies.</span>
          </motion.h1>
        </div>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 md:mt-8 text-gray-500 text-sm md:text-base max-w-lg leading-relaxed">
          Real systems. Real results. No fluff — just engineering that delivers measurable outcomes.
        </motion.p>
      </section>

      {/* PROJECT ROWS */}
      <section className="px-6 md:px-14">
        {PROJECTS.map((p, i) => (
          <motion.div key={p.id}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            className="border-b border-white/[0.06] py-10 md:py-16 flex flex-col md:flex-row md:items-start gap-6 md:gap-16 group"
          >
            {/* Mobile: image thumbnail */}
            <div className="relative overflow-hidden h-48 md:hidden bg-[#0d0d0d]">
              <img src={p.img} alt={p.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Left meta */}
            <div className="md:w-48 shrink-0 flex md:flex-col gap-4 md:gap-2">
              <span className="font-mono text-[9px] text-gray-700 tracking-[0.4em]">{p.id}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600">{p.year}</span>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-3 md:gap-4 mb-3 md:mb-4">
                <motion.h2
                  className="font-black uppercase tracking-tighter text-white leading-none group-hover:translate-x-2 transition-transform duration-500"
                  style={{ fontSize: "clamp(1.6rem, 5vw, 4.5rem)" }}>
                  {p.title}
                </motion.h2>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600 border border-white/[0.08] px-2 py-1">
                  {p.tag}
                </span>
              </div>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl mb-5 md:mb-6">{p.description}</p>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-gray-600">
                  Result: <span className="text-white">{p.result}</span>
                </span>
              </div>
            </div>

            {/* Right meta */}
            <div className="hidden md:flex md:text-right shrink-0 flex-col gap-2 items-end">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600 max-w-[180px] text-right">{p.service}</span>
              <motion.span
                animate={{ opacity: hovered === p.id ? 1 : 0, x: hovered === p.id ? 0 : -8 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">
                View →
              </motion.span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 px-6 md:px-14 border-t border-white/[0.06] flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600 mb-4 md:mb-5">Start Your Project</p>
          <h2 className="font-black uppercase tracking-tighter leading-[0.88] text-white"
            style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}>
            You're next.
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
