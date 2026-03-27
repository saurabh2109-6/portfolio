"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Terminal, Cpu, Code2 } from "lucide-react";
import { PortfolioData } from "@/lib/portfolio";

const Projects = ({ data }: { data: PortfolioData['projects'] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(data.map((p) => p.category))];

  const filteredProjects =
    filter === "All"
      ? data
      : data.filter((project) => project.category === filter);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" ref={ref} className="py-32 px-4 relative flex justify-center z-10 w-full">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Terminal className="w-5 h-5" />
            <span className="font-mono text-xs tracking-widest uppercase">System._Load_Modules()</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-cyan-400 hidden md:block" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Featured Projects
            </h2>
            <Code2 className="w-8 h-8 text-cyan-400 hidden md:block" />
          </div>
          
          <p className="text-cyan-400/80 uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
            Deployed Logic & Applications
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-12 w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`group relative inline-flex items-center px-6 py-2.5 uppercase tracking-widest text-xs font-bold transition-all duration-300 overflow-hidden rounded-md border ${
                  filter === category
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    : "bg-[#0b061e]/50 border-purple-500/30 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-300"
                }`}
              >
                {filter === category && (
                  <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-[200%] animate-[shimmer_2s_infinite] transition-transform duration-1000 ease-in-out" />
                )}
                <span>[ {category} ]</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-neon rounded-2xl flex flex-col items-center w-full h-full"
            >
              {/* Project Image Area - Holographic Vibe */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-white/[0.05] bg-[#030014] flex items-center justify-center text-8xl group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
                
                {/* Scanline Effect */}
                <motion.div 
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent z-10 pointer-events-none" 
                />
                
                {/* Tech overlay brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50 m-3 z-20 group-hover:border-cyan-400 transition-colors" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50 m-3 z-20 group-hover:border-cyan-400 transition-colors" />

                <motion.div 
                  className="z-10 opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]"
                >
                  {project.image}
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-8 relative z-20 flex flex-col flex-grow w-full">
                <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 flex-grow font-light leading-relaxed pl-3 border-l-2 border-purple-500/20">
                  {project.description}
                </p>

                {/* Cyber Tags */}
                <div className="flex flex-wrap gap-2 mb-8 w-full">
                  {project.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded group-hover:border-cyan-500/40 group-hover:text-cyan-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between pt-5 border-t border-white/[0.05] w-full mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live_Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
