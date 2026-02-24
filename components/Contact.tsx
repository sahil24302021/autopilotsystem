"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="bg-[#e0e0e0] text-black py-32 px-10 md:px-[10vw] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-20"
        >
          Let's Build.
        </motion.h2>
        
        {/* The Brutalist Form */}
        <form className="flex flex-col gap-12 font-mono uppercase text-sm md:text-xl pb-20">
          
          {/* Input 1 */}
          <div className="group flex flex-col md:flex-row gap-4 md:items-end border-b-4 border-black pb-4 transition-all focus-within:border-[#555] focus-within:pb-8">
            <label className="w-48 tracking-widest font-bold text-gray-500 group-focus-within:text-black transition-colors">
              01 // Name
            </label>
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              className="bg-transparent outline-none flex-1 text-3xl md:text-5xl font-black placeholder-black/10 text-black uppercase"
            />
          </div>

          {/* Input 2 */}
          <div className="group flex flex-col md:flex-row gap-4 md:items-end border-b-4 border-black pb-4 transition-all focus-within:border-[#555] focus-within:pb-8">
            <label className="w-48 tracking-widest font-bold text-gray-500 group-focus-within:text-black transition-colors">
              02 // Email
            </label>
            <input 
              type="email" 
              placeholder="HELLO@COMPANY.COM" 
              className="bg-transparent outline-none flex-1 text-3xl md:text-5xl font-black placeholder-black/10 text-black uppercase"
            />
          </div>

          {/* Input 3 */}
          <div className="group flex flex-col md:flex-row gap-4 md:items-end border-b-4 border-black pb-4 transition-all focus-within:border-[#555] focus-within:pb-8">
            <label className="w-48 tracking-widest font-bold text-gray-500 group-focus-within:text-black transition-colors">
              03 // Objective
            </label>
            <input 
              type="text" 
              placeholder="AUTOMATE MY WORKFLOW" 
              className="bg-transparent outline-none flex-1 text-3xl md:text-5xl font-black placeholder-black/10 text-black uppercase"
            />
          </div>

          {/* Massive Submit Button */}
          <motion.button 
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="mt-12 bg-black text-white text-4xl md:text-6xl font-black uppercase py-12 hover:bg-gray-800 hover:text-white transition-colors duration-500 w-full text-center tracking-tighter relative overflow-hidden group"
          >
            <span className="relative z-10 group-hover:italic transition-all duration-300">Initiate Sequence</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </motion.button>

        </form>
      </div>
    </section>
  );
}