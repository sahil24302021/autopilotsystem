"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Menu from "@/components/Menu";

const CONTACT_ITEMS = [
  { label: "Email", value: "autopilotsystem07@gmail.com", href: "mailto:autopilotsystem07@gmail.com" },
  { label: "Phone", value: "+91 99348 57789", href: "tel:+919934857789" },
  { label: "Response", value: "Within 24 hours", href: null },
  { label: "Location", value: "Remote — Global", href: null },
];

const SERVICES = ["AI Automation", "Web Engineering", "Growth Operations", "System Integration", "Other"];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: selectedService }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputBase = "w-full bg-transparent border-b border-white/[0.1] pb-3 pt-1 text-base text-white placeholder:text-gray-700 focus:outline-none focus:border-white/40 transition-colors duration-300";

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

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2">

        {/* LEFT — Info panel */}
        <div className="bg-[#080808] border-b md:border-b-0 md:border-r border-white/[0.06] px-6 md:px-14 pt-28 md:pt-44 pb-14 md:pb-20 flex flex-col justify-between min-h-0 md:min-h-screen">
          <div>
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3 mb-10 md:mb-14">
              <div className="w-6 h-px bg-white/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Get In Touch</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "108%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="font-black uppercase tracking-tighter leading-[0.85] text-white mb-6 md:mb-8"
                style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)" }}>
                Let's<br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }}>Work.</span>
              </motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
              Tell us what you need built. We'll respond within 24 hours with a plan and a price.
            </motion.p>
          </div>

          {/* Contact details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 md:mt-0 space-y-0">
            {CONTACT_ITEMS.map((item, i) => (
              <div key={item.label}
                className="flex items-start justify-between py-4 md:py-5 border-b border-white/[0.06] last:border-0 gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-gray-700 shrink-0">{item.label}</span>
                {item.href ? (
                  <a href={item.href}
                    className="font-mono text-[10px] md:text-xs text-gray-400 hover:text-white transition-colors duration-300 text-right break-all touch-manipulation">
                    {item.value}
                  </a>
                ) : (
                  <span className="font-mono text-[10px] md:text-xs text-gray-600 text-right">{item.value}</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Form */}
        <div className="px-6 md:px-14 pt-14 md:pt-44 pb-14 md:pb-20">
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex items-center gap-3 mb-10 md:mb-14">
            <div className="w-6 h-px bg-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-gray-600">Project Brief</span>
          </motion.div>

          {status === "success" ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-start gap-5 py-12 md:py-16">
              <div className="w-10 h-10 border border-white/[0.15] flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-black uppercase tracking-tighter text-white text-2xl md:text-3xl mb-2">Received.</h3>
                <p className="text-gray-500 text-sm md:text-base">We'll get back to you within 24 hours.</p>
              </div>
              <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", message: "" }); setSelectedService(""); }}
                className="font-mono text-[9px] uppercase tracking-[0.35em] text-gray-600 hover:text-white transition-colors duration-300 mt-4 touch-manipulation">
                Send another →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10" noValidate>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}>
                <label className="block font-mono text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-4">
                  Service Needed
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button key={s} type="button" onClick={() => setSelectedService(s === selectedService ? "" : s)}
                      className={`px-3 py-2 font-mono text-[9px] uppercase tracking-[0.3em] border transition-all duration-300 touch-manipulation ${
                        selectedService === s
                          ? "border-white text-white bg-white/[0.07]"
                          : "border-white/[0.1] text-gray-600 hover:border-white/30 hover:text-gray-400"
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                <div>
                  <label htmlFor="name" className="block font-mono text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3">Full Name *</label>
                  <input id="name" name="name" type="text" required autoComplete="name"
                    value={form.name} onChange={handleChange}
                    placeholder="John Smith"
                    className={inputBase} />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3">Email *</label>
                  <input id="email" name="email" type="email" required autoComplete="email"
                    value={form.email} onChange={handleChange}
                    placeholder="john@company.com"
                    className={inputBase} />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}>
                <label htmlFor="company" className="block font-mono text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3">Company / Project</label>
                <input id="company" name="company" type="text" autoComplete="organization"
                  value={form.company} onChange={handleChange}
                  placeholder="Your Company Name"
                  className={inputBase} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}>
                <label htmlFor="message" className="block font-mono text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-3">Project Details *</label>
                <textarea id="message" name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us what you need built, your timeline, and any technical requirements..."
                  className={`${inputBase} resize-none leading-relaxed`} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <p className="font-mono text-[9px] text-gray-700 uppercase tracking-[0.3em]">
                  * Required fields
                </p>
                <button type="submit" disabled={status === "loading"}
                  className="group w-full sm:w-auto flex items-center justify-center gap-4 bg-white text-black px-7 md:px-8 py-3.5 md:py-4 font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-xs hover:bg-transparent hover:text-white border border-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation">
                  {status === "loading" ? (
                    <>Sending<span className="animate-pulse">...</span></>
                  ) : (
                    <>Send Brief <span className="group-hover:translate-x-1 transition-transform duration-300">→</span></>
                  )}
                </button>
              </motion.div>

              {status === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-400/80">
                  Something went wrong. Email us directly at autopilotsystem07@gmail.com
                </motion.p>
              )}
            </form>
          )}
        </div>
      </div>

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
