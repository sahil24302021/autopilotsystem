"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import Menu from "@/components/Menu";

/* ─── DATA ─── */
const STATS = [
  { value: "40+", label: "Projects Shipped" },
  { value: "3×",  label: "Avg. Revenue Growth" },
  { value: "100%", label: "Custom Builds" },
  { value: "24/7", label: "AI Ops Active" },
];

const SERVICES = [
  {
    num: "01", tag: "Web Architecture", title: "Built To Scale.",
    body: "High-performance, immersive web platforms that act as the unbreakable foundation of your business. Not a template — a weapon.",
    img: "/1.jpg",
  },
  {
    num: "02", tag: "AI Workflows", title: "Automate Reality.",
    body: "Replace manual bottlenecks with intelligent agents. From lead qualification to massive data orchestration — fully automated.",
    img: "/2.jpg",
  },
  {
    num: "03", tag: "Growth Ops", title: "Infinite Momentum.",
    body: "End-to-end tech architecture for rapid growth. CRM integrations, pipelines, and serverless infrastructure that never sleeps.",
    img: "/3.jpg",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery",      desc: "We audit your entire business, stack, and market to find every growth lever." },
  { step: "02", title: "Architecture",   desc: "We design a bespoke blueprint — no templates, no compromises." },
  { step: "03", title: "Build",          desc: "Rapid iterative development with weekly demos and full transparency." },
  { step: "04", title: "Launch & Scale", desc: "Deploy with confidence. We monitor, optimize, and keep pushing." },
];

const CLIENTS = ["Stripe","OpenAI","Vercel","Supabase","Figma","Notion","Linear","Loom"];

const WORKS = [
  { id: "01", title: "Vital Copilot",       tag: "AI Automation",    result: "12× faster ops",        desc: "End-to-end AI agent system eliminating manual patient triage and data entry.", img: "/1.jpg" },
  { id: "02", title: "NovaSpark Commerce",  tag: "Web Architecture",  result: "3.8× conversion rate",  desc: "Full-stack e-commerce rebuild — blazing fast, beautifully animated.",           img: "/2.jpg" },
  { id: "03", title: "Meridian Growth OS",  tag: "Growth Ops",        result: "$2.4M pipeline added",  desc: "CRM automation, lead scoring AI, and outbound infrastructure from scratch.",    img: "/3.jpg" },
];

/* ─── HELPERS ─── */
function AnimatedTitle({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: delay + i * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });
  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width  / 2) * 0.35);
    y.set((e.clientY - r.top  - r.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={reset} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  const [loading, setLoading]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount]       = useState(0);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const iv = setInterval(() => {
      setCount(c => {
        if (c >= 100) { clearInterval(iv); return 100; }
        return Math.min(c + Math.floor(Math.random() * 6) + 1, 100);
      });
    }, 60);
    return () => clearInterval(iv);
  }, [loading]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isMobile) setMousePos({ x: e.clientX, y: e.clientY });
  }, [isMobile]);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const bentoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bentoScroll } = useScroll({ target: bentoRef, offset: ["start end", "end start"] });
  const bentoY1 = useTransform(bentoScroll, [0, 1], ["-5%", "5%"]);
  const bentoY2 = useTransform(bentoScroll, [0, 1], ["5%", "-5%"]);

  return (
    <div
      className="bg-[#060606] text-[#d8d8d8] font-sans selection:bg-white selection:text-black overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight — desktop only */}
      {!isMobile && (
        <div
          className="pointer-events-none fixed inset-0 z-30 hidden md:block"
          style={{ background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.022), transparent 65%)` }}
        />
      )}

      <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />

      {/* ══ LOADING ══ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#060606] flex flex-col overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-between items-center px-6 md:px-14 pt-7">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">Autopilot Systems</span>
              </motion.div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="font-mono text-[10px] text-gray-700 tracking-[0.4em]">
                2026
              </motion.span>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-14">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                className="w-full mb-8 md:mb-10">
                <div className="w-full h-px bg-white/10 overflow-hidden">
                  <motion.div className="h-full bg-white/40"
                    initial={{ width: "0%" }} animate={{ width: `${count}%` }} transition={{ ease: "linear" }} />
                </div>
              </motion.div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "105%" }} animate={{ y: "0%" }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.22 }}
                  className="font-black uppercase leading-none tracking-tighter text-white"
                  style={{ fontSize: "clamp(3rem, 13vw, 11rem)" }}>
                  AUTOPILOT
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "105%" }} animate={{ y: "0%" }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.38 }}
                  className="font-black uppercase leading-none tracking-tighter text-transparent"
                  style={{ fontSize: "clamp(3rem, 13vw, 11rem)", WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}>
                  SYSTEMS
                </motion.div>
              </div>
            </div>

            <div className="flex justify-between items-center px-6 md:px-14 pb-7">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-600">
                Autopilot Systems — Initializing
              </motion.p>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="font-mono text-[10px] text-gray-600 tabular-nums">
                {String(count).padStart(3, "0")}%
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ NAV ══ */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-14 py-5 md:py-6 flex justify-between items-center mix-blend-difference text-white">
        <a href="/" className="flex items-center gap-2.5 group" aria-label="AutoPilot Systems Home">
          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-5 h-5 bg-white flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </motion.div>
          <div>
            <div className="text-base md:text-lg font-black uppercase tracking-tighter leading-none">
              AUTO<span className="text-gray-400 group-hover:text-white transition-colors duration-300">PILOT</span>
            </div>
            <div className="text-[0.5rem] font-mono tracking-[0.3em] text-white/40 uppercase">Systems _</div>
          </div>
        </a>
        <MagneticBtn>
          <button onClick={() => setMenuOpen(true)} aria-label="Open navigation menu"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] group touch-manipulation">
            <span className="relative">
              Menu
              <span className="absolute -bottom-px left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-400" />
            </span>
            <span className="text-base leading-none">[=]</span>
          </button>
        </MagneticBtn>
      </nav>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative h-[100svh] flex flex-col justify-end px-6 md:px-14 pb-12 md:pb-14 overflow-hidden bg-[#060606]">
        <video autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.13] z-0"
          aria-hidden="true">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/5 to-[#060606]/60 z-[1]" />

        <motion.div className="z-10 relative" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: loading ? 0 : 1, x: loading ? -10 : 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <div className="w-6 md:w-8 h-px bg-white/30" />
            <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-gray-500">Est. 2024 · Engineering Agency</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "108%" }} animate={{ y: loading ? "108%" : "0%" }}
              transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1], delay: 1.1 }}
              className="font-black uppercase tracking-tighter leading-[0.82] text-white"
              style={{ fontSize: "clamp(3.2rem, 13.5vw, 13rem)" }}
            >
              Digital
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-10">
            <motion.h1
              initial={{ y: "108%" }} animate={{ y: loading ? "108%" : "0%" }}
              transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1], delay: 1.26 }}
              className="font-black uppercase tracking-tighter leading-[0.82] text-white/20"
              style={{ fontSize: "clamp(3.2rem, 13.5vw, 13rem)" }}
            >
              Supremacy.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 18 : 0 }}
            transition={{ duration: 0.9, delay: 1.8 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 md:gap-8"
          >
            <p className="text-sm md:text-base font-medium max-w-xs md:max-w-md text-gray-500 leading-relaxed">
              We don't build templates. We engineer bespoke web architectures and AI pipelines that dominate your industry.
            </p>
            <MagneticBtn className="shrink-0">
              <a href="/contact"
                className="group inline-flex items-center gap-3 bg-white text-black px-6 md:px-8 py-3.5 md:py-4 font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-xs hover:bg-transparent hover:text-white border border-white transition-all duration-500 touch-manipulation whitespace-nowrap">
                Start a Project
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </MagneticBtn>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 0.5 }} transition={{ delay: 2.4 }}
          className="absolute right-6 md:right-8 bottom-10 md:bottom-12 z-10 hidden sm:flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          <span className="font-mono text-[7px] uppercase tracking-[0.45em] text-gray-700" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#060606] to-transparent z-[2]" />
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="py-3.5 border-y border-white/[0.05] overflow-hidden relative flex items-center bg-[#060606]" aria-hidden="true">
        <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex whitespace-nowrap gap-8 font-mono text-[10px] uppercase tracking-[0.35em] text-white/10 font-bold"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].flatMap((t, i) => [
            <span key={`a${i}`}>{t}</span>,
            <span key={`b${i}`} className="text-white/5 px-3">✦</span>,
          ])}
        </motion.div>
      </div>

      {/* ══ STATS ══ */}
      <section className="py-20 md:py-24 px-6 md:px-14 bg-[#060606]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06] border border-white/[0.06]">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="px-5 md:px-8 py-8 md:py-10 group border-b md:border-b-0 border-white/[0.06]">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-2 md:mb-3 group-hover:translate-x-1 transition-transform duration-500">
                {s.value}
              </div>
              <div className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.35em] text-gray-600">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ BENTO GRID ══ */}
      <section ref={bentoRef} className="px-6 md:px-14 py-6 md:py-8 bg-[#060606]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3" style={{ gridAutoRows: "clamp(140px,18vw,200px)" }}>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ y: bentoY1 }}
            className="md:col-span-7 md:row-span-2 bg-[#0d0d0d] border border-white/[0.06] p-7 md:p-10 flex flex-col justify-between group overflow-hidden relative min-h-[280px] md:min-h-0"
          >
            <div className="absolute inset-0 opacity-[0.015]"
              style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-4 h-px bg-white/25" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-600">Our Mission</span>
            </div>
            <div className="relative z-10">
              <h2 className="font-black uppercase tracking-tighter leading-[0.88] text-white mb-3 md:mb-4"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)" }}>
                <AnimatedTitle text="Engineering the Future." delay={0} />
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
                We don't follow industry trends — we set them. Every project is a custom system built to outlast, outperform, and dominate.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
            style={{ y: bentoY2 }}
            className="md:col-span-5 bg-white text-black p-6 md:p-8 flex flex-col justify-between min-h-[150px] md:min-h-0"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.4em]">Speed</span>
            <div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-1.5">10×</div>
              <div className="text-xs md:text-sm font-medium text-gray-700">Faster than traditional agencies</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ y: bentoY2 }}
            className="md:col-span-5 overflow-hidden relative bg-[#0d0d0d] min-h-[180px] md:min-h-0"
          >
            <img src="/2.jpg" alt="AI-powered development"
              className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
              loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 md:bottom-5 left-4 md:left-5 right-4 md:right-5 flex justify-between items-end">
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/50">AI-Powered</span>
              <span className="w-6 h-6 border border-white/20 flex items-center justify-center text-white/40 text-xs">→</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
            style={{ y: bentoY1 }}
            className="md:col-span-4 bg-[#0d0d0d] border border-white/[0.06] p-6 md:p-8 flex flex-col justify-between group hover:border-white/20 transition-colors duration-500 min-h-[150px] md:min-h-0"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-600">Since</span>
            <div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-none mb-1.5">2024</div>
              <p className="text-gray-600 text-[9px] font-mono uppercase tracking-widest">Engineering Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25 }}
            className="md:col-span-8 overflow-hidden relative bg-[#0d0d0d] group min-h-[180px] md:min-h-0"
          >
            <img src="/3.jpg" alt="Growth operations"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-[1.03] transition-all duration-700"
              loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">Growth Ops</span>
              <div>
                <p className="text-white font-black uppercase text-lg md:text-2xl tracking-tighter">Infinite Momentum.</p>
                <a href="/upgrades" className="mt-2 md:mt-3 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 hover:text-white border-b border-white/10 hover:border-white pb-0.5 transition-all duration-300 touch-manipulation">
                  Explore Services →
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══ MANIFESTO ══ */}
      <section className="py-24 md:py-36 px-6 md:px-14 bg-[#080808] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="flex items-center gap-3 mb-12 md:mb-14">
            <div className="w-6 h-px bg-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Our Manifesto</span>
          </motion.div>
          <div className="flex flex-col">
            {["The", "Old Way", "Is Dead."].map((line, i) => (
              <div key={i} className="overflow-hidden border-t border-white/[0.05] py-3 md:py-4 first:border-t-0">
                <motion.div
                  initial={{ y: "105%" }} whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 }}
                  className={`font-black uppercase tracking-tighter leading-none ${i === 2 ? "text-transparent" : "text-white"}`}
                  style={{
                    fontSize: "clamp(2.8rem, 10vw, 10rem)",
                    ...(i === 2 ? { WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" } : {}),
                  }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-16 md:mt-24 border-t border-white/[0.06] pt-12 md:pt-16">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug text-gray-300">
              Most businesses are suffocating under manual tasks, scattered data, and slow, outdated websites.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col gap-5 md:gap-6">
              <p className="text-base md:text-lg font-medium leading-relaxed text-gray-500">
                <span className="text-white font-black">AutoPilot Systems</span> is an elite engineering agency. We replace bottlenecks with AI agents and build web platforms that scale infinitely.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-gray-600">
                You don't need more employees. You need better systems. We provide the architecture for your growth — and we do it fast.
              </p>
              <MagneticBtn className="w-fit mt-2 md:mt-4">
                <a href="/upgrades"
                  className="inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.35em] text-white border border-white/20 px-5 py-3.5 hover:border-white hover:bg-white hover:text-black transition-all duration-400 touch-manipulation">
                  Explore Services →
                </a>
              </MagneticBtn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="bg-[#060606] text-white">
        <div className="px-6 md:px-14 pt-16 md:pt-20 pb-6 md:pb-8 flex items-center gap-3">
          <div className="w-6 h-px bg-white/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Services</span>
        </div>
        {SERVICES.map((s) => (
          <motion.div key={s.num}
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
            className="border-t border-white/[0.06] mx-6 md:mx-14 py-14 md:py-20 flex flex-col md:flex-row gap-8 md:gap-16 group"
          >
            <div className="md:w-[45%] flex flex-col justify-between gap-8 md:gap-10">
              <div>
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className="font-mono text-[9px] text-gray-700 tracking-[0.35em]">{s.num}</span>
                  <div className="w-4 h-px bg-white/10" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600">{s.tag}</span>
                </div>
                <div className="overflow-hidden mb-4 md:mb-6">
                  <motion.h2
                    initial={{ y: "108%" }} whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="font-black uppercase tracking-tighter leading-[0.85]"
                    style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
                  >
                    {s.title.split(" ").map((word, wi, arr) =>
                      wi === arr.length - 1
                        ? <span key={wi} className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.45)" }}>{word}</span>
                        : <span key={wi}>{word} </span>
                    )}
                  </motion.h2>
                </div>
                <p className="text-sm md:text-base font-medium leading-relaxed text-gray-500 max-w-sm">{s.body}</p>
              </div>
              <a href="/upgrades"
                className="w-fit inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 hover:text-white border-b border-white/10 hover:border-white pb-1 transition-all duration-300 touch-manipulation">
                Explore Service →
              </a>
            </div>
            <div className="md:w-[55%] relative overflow-hidden bg-[#0d0d0d] h-[56vw] md:h-[28vw] max-h-[440px]">
              <span className="absolute top-4 right-4 font-mono text-[6rem] md:text-[7rem] font-black text-white/[0.03] leading-none select-none z-0 pointer-events-none" aria-hidden>{s.num}</span>
              <motion.img src={s.img} alt={s.tag}
                className="absolute inset-0 w-full h-full object-cover opacity-55 z-[1]"
                whileHover={{ scale: 1.05, opacity: 0.75 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-[2]" />
              <div className="absolute bottom-4 left-4 z-[3] flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">{s.tag}</span>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-white/[0.06] mx-6 md:mx-14" />
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-24 md:py-36 px-6 md:px-14 bg-[#060606] text-white">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-6 h-px bg-white/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">How We Work</span>
        </div>
        <div className="overflow-hidden mb-14 md:mb-20">
          <motion.h2
            initial={{ y: "108%" }} whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-black uppercase tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
          >
            Our Process.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-l border-white/[0.06]">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border-r border-b md:border-b-0 border-white/[0.06] pl-6 md:pl-8 pr-5 md:pr-6 pb-8 md:pb-10 pt-2 group hover:bg-white/[0.018] transition-colors duration-500"
            >
              <span className="font-mono text-[9px] text-gray-700 tracking-[0.35em] block mb-5 md:mb-6">{p.step}</span>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-2 md:mb-3">{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FULL-BLEED PANEL ══ */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <motion.img src="/1.jpg" alt="The AutoPilot Promise — No templates, no compromises"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }} whileInView={{ scale: 1.0 }}
          viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/85 via-[#060606]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-10 md:pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-500 mb-3 md:mb-4">The AutoPilot Promise</p>
            <h2 className="font-black uppercase tracking-tighter leading-[0.88] text-white mb-5 md:mb-6"
              style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}>
              No templates.<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.38)" }}>No compromises.</span>
            </h2>
            <a href="/case-studies"
              className="inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 hover:text-white border-b border-white/15 hover:border-white pb-1 transition-all duration-300 touch-manipulation">
              View Our Work →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-24 md:py-36 px-6 md:px-14 bg-[#080808] text-white">
        <div className="flex items-center gap-3 mb-12 md:mb-14">
          <div className="w-6 h-px bg-white/20" />
          <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Client Results</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
          {[
            { quote: "AutoPilot rebuilt our entire platform in 6 weeks. Our conversion rate tripled overnight. Best investment we've made.", name: "James K.", role: "CEO, TechVenture" },
            { quote: "The AI automations they built saved us 40+ hours per week. It's like having a full ops team running 24/7.", name: "Sarah M.", role: "Head of Ops, ScaleUp Co." },
            { quote: "World-class execution. They don't just build — they architect systems that actually grow with your business.", name: "David R.", role: "Founder, Orbit Labs" },
          ].map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12 }}
              className="bg-[#080808] p-8 md:p-10 flex flex-col justify-between gap-8 md:gap-10 hover:bg-[#0e0e0e] transition-colors duration-500"
            >
              <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="font-black text-white text-sm uppercase tracking-wider">{t.name}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-gray-600 mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED WORKS ══ */}
      <section className="py-24 md:py-36 px-6 md:px-14 bg-[#060606] text-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 md:mb-16 border-b border-white/[0.06] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-white/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Selected Work</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "108%" }} whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                className="font-black uppercase tracking-tighter leading-[0.88]"
                style={{ fontSize: "clamp(2.2rem, 7vw, 7rem)" }}
              >
                Our Work.
              </motion.h2>
            </div>
          </div>
          <motion.a href="/case-studies"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="shrink-0 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-gray-600 hover:text-white border-b border-white/10 hover:border-white pb-1 transition-all duration-300 touch-manipulation sm:mb-2">
            View All Projects →
          </motion.a>
        </div>

        <div className="flex flex-col">
          {WORKS.map((w, i) => (
            <motion.a key={w.id} href="/case-studies"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group border-b border-white/[0.06] py-8 md:py-10 flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-6 md:items-center hover:bg-white/[0.018] px-3 -mx-3 md:px-4 md:-mx-4 transition-colors duration-500 touch-manipulation"
            >
              <div className="hidden md:block md:col-span-1">
                <span className="font-mono text-[9px] text-gray-700 tracking-[0.35em]">{w.id}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-black uppercase tracking-tighter text-white text-xl md:text-2xl lg:text-3xl group-hover:translate-x-2 transition-transform duration-400 leading-tight">
                  {w.title}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                <span className="text-gray-400 font-medium text-sm">{w.result}</span>
              </div>
              <div className="md:col-span-2 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-700 border border-white/[0.08] px-2.5 py-1">{w.tag}</span>
                <span className="text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative bg-[#060606] text-white overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="flex flex-col items-center justify-center py-28 md:py-40 px-6 text-center relative">
          <div className="absolute font-black text-white/[0.016] select-none pointer-events-none tracking-tighter leading-none"
            style={{ fontSize: "clamp(8rem, 35vw, 36rem)" }} aria-hidden>AP</div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 md:gap-4 mb-10 md:mb-12 relative z-10">
            <div className="w-6 md:w-8 h-px bg-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] md:tracking-[0.45em] text-gray-600">Ready to Dominate?</span>
            <div className="w-6 md:w-8 h-px bg-white/20" />
          </motion.div>
          <MagneticBtn className="relative z-10">
            <a href="/contact" className="group block relative">
              <motion.span
                className="block font-black uppercase tracking-tighter leading-none text-white"
                style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)" }}
                whileHover={{ skewX: -2 }} transition={{ duration: 0.3 }}
              >
                Initiate.
              </motion.span>
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-700" />
            </a>
          </MagneticBtn>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-10 md:mt-14 text-gray-700 font-mono text-[9px] uppercase tracking-[0.4em] md:tracking-[0.45em] relative z-10">
            Let's build your competitive advantage.
          </motion.p>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.05] px-6 md:px-14 py-8 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-white flex items-center justify-center shrink-0">
              <div className="w-1 h-1 bg-black rounded-full" />
            </div>
            <span className="font-mono text-[9px] text-gray-700 uppercase tracking-[0.3em]">© 2026 AutoPilot Systems</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 md:gap-8 font-mono text-[9px] uppercase tracking-[0.28em] md:tracking-[0.3em]">
            <a href="mailto:autopilotsystem07@gmail.com"
              className="text-gray-700 hover:text-white transition-colors duration-300">
              autopilotsystem07@gmail.com
            </a>
            <a href="tel:+919934857789"
              className="text-gray-700 hover:text-white transition-colors duration-300">
              +91 9934857789
            </a>
            {[["Case Studies","/case-studies"],["Services","/upgrades"],["Contact","/contact"]].map(([l,h]) => (
              <a key={l} href={h} className="text-gray-700 hover:text-white transition-colors duration-300">{l}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
