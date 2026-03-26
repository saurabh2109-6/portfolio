"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";
import { PortfolioData } from "@/lib/portfolio";

const Hero = ({ data }: { data: PortfolioData['personal'] }) => {
  if (!data) return null;
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="min-h-[100svh] flex items-center justify-center relative pt-24 px-4 overflow-hidden">
      {/* Sci-Fi Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[#030014] overflow-hidden">
        {/* Deep space radial glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        {/* Neon vertical beams */}
        <motion.div 
          animate={{ y: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute left-[20%] top-full w-[1px] h-[500px] bg-gradient-to-t from-transparent via-cyan-500/50 to-transparent" 
        />
        <motion.div 
          animate={{ y: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 15, ease: "linear", delay: 2 }}
          className="absolute right-[20%] top-full w-[1px] h-[500px] bg-gradient-to-t from-transparent via-purple-500/50 to-transparent" 
        />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center relative z-10 w-full pb-20">
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="glass-neon px-4 py-1.5 rounded-full flex items-center gap-2 border-purple-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-widest uppercase truncate">System Online // {data.greeting}</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black gradient-text tracking-tighter uppercase relative z-10 leading-[1.1]">
            {data.name}
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black absolute inset-0 text-transparent blur-[40px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text z-0 opacity-50 select-none">
            {data.name}
          </h1>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="flex justify-center items-center gap-3 mb-8">
          <Terminal className="w-5 h-5 md:w-6 md:h-6 text-purple-400 hidden sm:block" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            {data.title}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed px-4">
          {data.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 px-4">
          <a href="#projects" className="relative group overflow-hidden px-8 py-4 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/50 hover:border-cyan-400/80 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] w-full sm:w-auto text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>View Arsenal</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/0 via-cyan-400/10 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
          <a href="#contact" className="glass-neon px-8 py-4 rounded-full text-gray-300 hover:text-white transition-all w-full sm:w-auto text-xs font-bold uppercase tracking-widest flex items-center justify-center">
            Initialize Contact
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center space-x-6 sm:space-x-8 mb-8 relative">
          {[ 
            { icon: Github, href: "https://github.com/yourusername", color: "hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:border-cyan-400/50" },
            { icon: Linkedin, href: "https://linkedin.com/in/yourusername", color: "hover:text-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] hover:border-blue-400/50" },
            { icon: Mail, href: "mailto:your.email@example.com", color: "hover:text-pink-400 hover:shadow-[0_0_15px_rgba(244,114,182,0.5)] hover:border-pink-400/50" }
          ].map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full glass border border-white/5 transition-all duration-300 text-gray-400 ${social.color} hover:-translate-y-2`}>
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

      </motion.div>
      
      {/* Scroll Indicator positioned absolutely to bottom of section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-20"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors group">
          <span className="text-[10px] uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity">Scroll Data</span>
          <div className="p-3 rounded-full border border-purple-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] bg-black/50 backdrop-blur-md">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
