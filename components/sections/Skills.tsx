"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Layout, Server, Smartphone, Cloud, GitBranch, Palette, Hexagon } from "lucide-react";
import React from "react";
import { PortfolioData } from "@/lib/portfolio";

const iconMap: Record<string, React.ElementType> = {
  Layout, Server, Database, Smartphone, Cloud, GitBranch, Palette, Code2,
};

const colorMap: Record<string, string> = {
  "text-blue-500": "text-cyan-400 group-hover:text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]",
  "text-green-500": "text-emerald-400 group-hover:text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]",
  "text-purple-500": "text-purple-400 group-hover:text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
  "text-pink-500": "text-pink-400 group-hover:text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]",
  "text-yellow-500": "text-yellow-400 group-hover:text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]",
};

const Skills = ({ data }: { data: PortfolioData['skills'] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.4 } },
  };

  return (
    <section id="skills" ref={ref} className="py-32 px-4 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[#030014] -z-20" />
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <Hexagon className="w-6 h-6 text-purple-500 animate-[spin_10s_linear_infinite]" />
            <span className="text-purple-400 font-mono text-sm tracking-widest uppercase">Tech Stack \\ Modules</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tighter">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">Technologies</span>
          </h2>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((category) => {
            const Icon = iconMap[category.icon] || Layout;
            const enhancedColorClass = colorMap[category.color] || "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]";
            return (
              <motion.div key={category.title} variants={itemVariants} className="group relative glass-neon rounded-2xl p-8 border border-white/5 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
                
                {/* Icon Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-[#030014]/50 border border-white/5 backdrop-blur-md ${enhancedColorClass} transition-colors duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                    Sys.{category.title.substring(0,3)}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-6 text-white tracking-wide uppercase">{category.title}</h3>

                <ul className="space-y-3 relative z-10">
                  {category.skills.map((skill: string) => (
                    <li key={skill} className="text-sm font-medium text-gray-400 flex items-center group/item hover:text-cyan-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-purple-500/50 rounded-full mr-3 group-hover/item:bg-cyan-400 group-hover/item:shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
