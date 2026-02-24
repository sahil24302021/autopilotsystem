"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const menuLinks = [
  { name: "Home",          href: "/",            num: "01" },
  { name: "Our Upgrades",  href: "/upgrades",    num: "02" },
  { name: "Case Studies",  href: "/case-studies",num: "03" },
  { name: "Initiate",      href: "/contact",     num: "04" },
];

export default function Menu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[#050505] text-white flex flex-col overflow-hidden"
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          {/* Top bar */}
          <div className="flex justify-between items-center px-6 md:px-14 py-6 md:py-8 relative z-10 border-b border-white/[0.05]">
            <a href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group" aria-label="Home">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white flex items-center justify-center transform group-hover:rotate-90 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] shrink-0">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <div>
                <span className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-none text-white flex items-center">
                  AUTO<span className="text-gray-500 group-hover:text-white transition-colors duration-500">PILOT</span>
                </span>
                <span className="text-[0.55rem] font-mono tracking-[0.3em] text-gray-600 uppercase leading-none block mt-0.5">Systems _</span>
              </div>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 md:w-12 md:h-12 border border-white/15 flex items-center justify-center hover:border-white transition-colors duration-300 group touch-manipulation"
            >
              <motion.span
                initial={{ rotate: 0 }} animate={{ rotate: 45 }}
                transition={{ duration: 0.3 }}
                className="text-white/60 group-hover:text-white text-xl leading-none"
              >
                +
              </motion.span>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-6 md:px-14 py-8" aria-label="Main navigation">
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="border-b border-white/[0.05]"
              >
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between py-5 md:py-7 transition-all duration-300 touch-manipulation ${
                    hovered !== null && hovered !== i ? "opacity-25" : "opacity-100"
                  }`}
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-mono text-[9px] text-gray-700 tracking-[0.4em]">{link.num}</span>
                    <span
                      className="font-black uppercase tracking-tighter leading-none text-white group-hover:translate-x-2 transition-transform duration-500"
                      style={{ fontSize: "clamp(1.8rem, 6vw, 5.5rem)" }}
                    >
                      {link.name}
                    </span>
                  </div>
                  <motion.span
                    animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -8 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/50 hidden sm:block"
                  >
                    View →
                  </motion.span>
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Footer bar */}
          <div className="border-t border-white/[0.05] px-6 md:px-14 py-5 md:py-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 font-mono text-[9px] uppercase tracking-[0.3em]">
              <a href="mailto:autopilotsystem07@gmail.com"
                className="text-gray-600 hover:text-white transition-colors duration-300 touch-manipulation">
                autopilotsystem07@gmail.com
              </a>
              <a href="tel:+919934857789"
                className="text-gray-600 hover:text-white transition-colors duration-300 touch-manipulation">
                +91 9934857789
              </a>
            </div>
            <span className="font-mono text-[9px] text-gray-700 uppercase tracking-[0.3em]">© 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
