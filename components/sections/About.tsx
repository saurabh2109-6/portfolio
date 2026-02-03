"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" ref={ref} className="py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg">
            Get to know me better
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="glass rounded-2xl p-8 border-2 border-purple-500/20">
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <p className="text-6xl">👨‍💻</p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold">
              Hi! I'm a passionate developer
            </h3>
            <p className="text-muted-foreground">
              I'm a full-stack developer with a passion for creating beautiful,
              functional, and user-friendly websites and applications. With
              expertise in modern web technologies, I bring ideas to life through
              clean code and innovative solutions.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community. I believe in continuous learning and
              staying up-to-date with the latest industry trends.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center glass rounded-lg p-4">
                <p className="text-3xl font-bold text-purple-400">3+</p>
                <p className="text-sm text-muted-foreground">Years Exp.</p>
              </div>
              <div className="text-center glass rounded-lg p-4">
                <p className="text-3xl font-bold text-purple-400">50+</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="text-center glass rounded-lg p-4">
                <p className="text-3xl font-bold text-purple-400">20+</p>
                <p className="text-sm text-muted-foreground">Clients</p>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="pt-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
