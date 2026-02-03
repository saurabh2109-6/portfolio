"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Sample blog posts (in a real app, this would come from a CMS or markdown files)
const blogPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 14",
    excerpt:
      "Learn how to build modern web applications with Next.js 14 and the new App Router.",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Tutorial",
    image: "📚",
  },
  {
    slug: "mastering-typescript",
    title: "Mastering TypeScript for React",
    excerpt:
      "A comprehensive guide to using TypeScript effectively in your React projects.",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Guide",
    image: "💻",
  },
  {
    slug: "tailwind-best-practices",
    title: "Tailwind CSS Best Practices",
    excerpt:
      "Tips and tricks for writing maintainable and scalable Tailwind CSS code.",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "CSS",
    image: "🎨",
  },
  {
    slug: "building-responsive-layouts",
    title: "Building Responsive Layouts",
    excerpt:
      "Master the art of creating beautiful responsive designs that work on all devices.",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "Design",
    image: "📱",
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance Optimization",
    excerpt:
      "Learn techniques to make your React applications faster and more efficient.",
    date: "2023-12-20",
    readTime: "10 min read",
    category: "Performance",
    image: "⚡",
  },
  {
    slug: "modern-javascript-features",
    title: "Modern JavaScript Features",
    excerpt:
      "Explore the latest JavaScript features and how to use them in your projects.",
    date: "2023-12-15",
    readTime: "6 min read",
    category: "JavaScript",
    image: "🚀",
  },
];

export default function BlogPage() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and
            technology.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="glass rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all h-full">
                  {/* Post Image */}
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full mb-3">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
