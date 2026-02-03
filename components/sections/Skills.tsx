"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Cloud,
  GitBranch,
  Palette,
} from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Frontend",
      icon: Layout,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
      color: "text-blue-400",
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express", "Python", "Django", "REST APIs"],
      color: "text-green-400",
    },
    {
      title: "Database",
      icon: Database,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
      color: "text-yellow-400",
    },
    {
      title: "Mobile",
      icon: Smartphone,
      skills: ["React Native", "Flutter", "iOS", "Android", "PWA"],
      color: "text-purple-400",
    },
    {
      title: "DevOps",
      icon: Cloud,
      skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Linux"],
      color: "text-orange-400",
    },
    {
      title: "Tools",
      icon: GitBranch,
      skills: ["Git", "GitHub", "VS Code", "Figma", "Postman"],
      color: "text-pink-400",
    },
    {
      title: "Design",
      icon: Palette,
      skills: ["UI/UX", "Responsive", "Animations", "Accessibility", "Figma"],
      color: "text-cyan-400",
    },
    {
      title: "Languages",
      icon: Code2,
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
      color: "text-red-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg">
            The tools and technologies I work with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
              >
                {/* Icon */}
                <div className="mb-4">
                  <Icon className={`w-10 h-10 ${category.color}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>

                {/* Skills List */}
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-muted-foreground flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
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
