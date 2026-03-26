"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Terminal, Cpu } from "lucide-react";
import { PortfolioData } from "@/lib/portfolio";

const About = ({ data }: { data: PortfolioData['about'] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (!data) return null;

  return (
    <section id="about" ref={ref} className="py-32 px-4 relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              {data.title}
            </h2>
          </div>
          <p className="text-cyan-400/80 uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side (Holographic Avatar Box) */}
          <motion.div variants={itemVariants} className="relative group mx-auto w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative glass rounded-2xl p-2 bg-[#030014]">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl m-4" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl m-4" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl m-4" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl m-4" />
              
              <div className="aspect-square bg-gradient-to-br from-[#0b061e] to-[#1a0b2e] rounded-xl flex items-center justify-center relative overflow-hidden border border-purple-500/20">
                {/* Hologram scanline */}
                <motion.div 
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 w-full h-8 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" 
                />
                <p className="text-[100px] filter drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">👨‍💻</p>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Terminal className="w-5 h-5" />
              <span className="font-mono text-xs tracking-widest uppercase">System._Initialize_Profile()</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Executing logic sequences since the <span className="text-cyan-400">digital awakening.</span>
            </h3>
            
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              {data.paragraphs.map((p: string, i: number) => (
                <p key={i} className="pl-4 border-l-2 border-purple-500/30">{p}</p>
              ))}
            </div>

            {/* Glowing Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {data.stats.map((stat: { label: string; value: string }, i: number) => (
                <div key={i} className="glass-neon rounded-xl p-6 text-center group cursor-default relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-4xl font-black text-white group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-purple-300 uppercase tracking-widest mt-2 font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Download CV Button */}
            <div className="pt-6">
              <a href="/resume.pdf" download className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 rounded-full font-bold text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] overflow-hidden">
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                <span className="uppercase tracking-widest text-xs">Extract Protocol (CV)</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
