"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online shopping platform with cart, checkout, and payment integration.",
      image: "🛒",
      tags: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      category: "Web",
      github: "https://github.com/yourusername/project1",
      live: "https://project1.com",
    },
    {
      title: "Social Media App",
      description:
        "A modern social networking application with real-time messaging and notifications.",
      image: "💬",
      tags: ["React Native", "Firebase", "Node.js", "Socket.io"],
      category: "Mobile",
      github: "https://github.com/yourusername/project2",
      live: "https://project2.com",
    },
    {
      title: "Task Management Tool",
      description:
        "A collaborative task management system with team features and analytics.",
      image: "✅",
      tags: ["React", "Express", "PostgreSQL", "Redux"],
      category: "Web",
      github: "https://github.com/yourusername/project3",
      live: "https://project3.com",
    },
    {
      title: "Weather Dashboard",
      description:
        "A beautiful weather application with forecasts, maps, and location-based alerts.",
      image: "🌤️",
      tags: ["Vue.js", "OpenWeather API", "Charts.js", "Tailwind"],
      category: "Web",
      github: "https://github.com/yourusername/project4",
      live: "https://project4.com",
    },
    {
      title: "Fitness Tracker",
      description:
        "A comprehensive fitness tracking app with workout plans and progress analytics.",
      image: "💪",
      tags: ["Flutter", "Firebase", "Charts", "Health Kit"],
      category: "Mobile",
      github: "https://github.com/yourusername/project5",
      live: "https://project5.com",
    },
    {
      title: "Portfolio Builder",
      description:
        "A drag-and-drop portfolio builder for developers and designers.",
      image: "🎨",
      tags: ["Next.js", "DnD", "Tailwind", "Vercel"],
      category: "Web",
      github: "https://github.com/yourusername/project6",
      live: "https://project6.com",
    },
  ];

  const categories = ["All", "Web", "Mobile"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Check out some of my recent work
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? "bg-purple-600 text-white"
                    : "glass hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all"
            >
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-7xl">
                {project.image}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
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
