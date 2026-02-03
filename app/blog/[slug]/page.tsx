"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

// Sample blog post data (in a real app, this would be fetched based on slug)
const blogPost = {
  title: "Getting Started with Next.js 14",
  date: "2024-01-15",
  readTime: "5 min read",
  category: "Tutorial",
  image: "📚",
  content: `
# Getting Started with Next.js 14

Next.js 14 brings incredible new features and improvements that make building web applications faster and more enjoyable than ever.

## What's New in Next.js 14?

Next.js 14 introduces several key improvements:

- **Turbopack**: The new bundler is now stable and significantly faster
- **Server Actions**: Stable and ready for production
- **Partial Prerendering**: Preview of the future of rendering
- **Improved Error Handling**: Better DX with enhanced error messages

## Getting Started

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

Choose TypeScript, Tailwind CSS, and the App Router for the best experience.

## Project Structure

The new App Router uses a file-based routing system:

- \`app/\` - Your application routes
- \`components/\` - Reusable React components
- \`public/\` - Static assets
- \`styles/\` - Global styles

## Creating Your First Page

Create a new page by adding a file to the \`app\` directory:

\`\`\`tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our site!</p>
    </div>
  );
}
\`\`\`

## Server Components

By default, all components in the App Router are Server Components:

\`\`\`tsx
// This runs on the server
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
\`\`\`

## Client Components

Use the \`"use client"\` directive for interactive components:

\`\`\`tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Conclusion

Next.js 14 is a powerful framework that makes building modern web applications a breeze. With its new features and improvements, there's never been a better time to get started!

Happy coding! 🚀
  `,
};

export default function BlogPostPage() {
  const params = useParams();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Category */}
          <span className="inline-block px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full mb-4">
            {blogPost.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {blogPost.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center space-x-6 text-muted-foreground mb-8">
            <span className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{blogPost.date}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{blogPost.readTime}</span>
            </span>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-9xl mb-12">
            {blogPost.image}
          </div>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="glass rounded-xl p-8 md:p-12 border border-white/10">
            <div className="whitespace-pre-wrap">{blogPost.content}</div>
          </div>
        </motion.article>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 glass rounded-xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-4">Share this post</h3>
          <p className="text-muted-foreground mb-4">
            Found this helpful? Share it with others!
          </p>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `https://yoursite.com/blog/${params.slug}`
              )}&text=${encodeURIComponent(blogPost.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `https://yoursite.com/blog/${params.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
