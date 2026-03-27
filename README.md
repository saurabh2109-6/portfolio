# Modern Portfolio Website

A fully dynamic, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 Modern, glassmorphic design with dark/light theme toggle
- ⚡ Built with Next.js 14 (App Router) and TypeScript
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎯 SEO optimized
- 📝 Dynamic blog system
- 💼 Projects showcase with filtering
- 📬 Contact form
- 🎨 Customizable color themes

## 🚀 Quick Start

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 📝 Customization Guide

### 1. Personal Information

Update the following files with your information:

#### \`components/sections/Hero.tsx\`
- Change "Your Name Here" to your actual name
- Update the title/tagline
- Update social media links

#### \`components/sections/About.tsx\`
- Replace the bio text
- Update stats (years of experience, projects, clients)
- Add your resume PDF to \`public/resume.pdf\`

#### \`components/Footer.tsx\`
- Update social media links
- Change copyright text

### 2. Projects

Edit \`components/sections/Projects.tsx\`:
- Update the \`projects\` array with your actual projects
- Add project images (replace emoji with actual images)
- Update GitHub/live demo links

### 3. Skills

Edit \`components/sections/Skills.tsx\`:
- Modify the \`skillCategories\` array
- Add/remove skills based on your expertise

### 4. Blog

Add blog posts by creating new files in \`app/blog/\` or integrate a CMS like:
- Contentlayer
- MDX
- Sanity
- WordPress (headless)

### 5. Contact Form

The contact form in \`components/sections/Contact.tsx\` currently simulates submission. To make it functional:

1. **Option 1: API Route (Recommended)**
   - Create \`app/api/contact/route.ts\`
   - Use a service like SendGrid, Resend, or Nodemailer

2. **Option 2: FormSpree/Formsubmit**
   - Update the form action to point to the service
   - No backend code needed

3. **Option 3: Firebase/Supabase**
   - Store submissions in a database
   - Set up email notifications

### 6. Colors & Theme

Update \`app/globals.css\` to change colors:
- Modify CSS variables in \`:root\` and \`.dark\`
- Change gradient colors in \`.gradient-text\`

### 7. Fonts

Change fonts in \`app/layout.tsx\`:
\`\`\`tsx
import { YourFont } from "next/font/google";
\`\`\`

### 8. SEO & Metadata

Update \`app/layout.tsx\`:
\`\`\`tsx
export const metadata: Metadata = {
  title: "Your Name | Portfolio",
  description: "Your description",
  // Add more metadata
};
\`\`\`

## 📂 Project Structure

\`\`\`
portfolio/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer
│   └── theme-provider.tsx
├── public/               # Static assets
├── content/             # Blog content (optional)
└── package.json
\`\`\`

## 🎨 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## 📱 Sections

1. **Hero** - Eye-catching introduction with CTA
2. **About** - Personal bio and stats
3. **Skills** - Technology showcase
4. **Projects** - Portfolio with filtering
5. **Blog** - Articles and tutorials
6. **Contact** - Contact form and info

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

- **Netlify**: Similar to Vercel
- **AWS Amplify**: Full AWS integration
- **Digital Ocean**: VPS deployment
- **Cloudflare Pages**: Fast global CDN

## 📝 Environment Variables

Create \`.env.local\` for sensitive data:

\`\`\`
NEXT_PUBLIC_SITE_URL=[https://yoursite.com](https://saurabh-p.vercel.app/)
# Add email service keys, analytics, etc.
\`\`\`

## 🎯 Performance Tips

- Optimize images with Next.js Image component
- Use dynamic imports for heavy components
- Enable ISR for blog posts
- Add analytics (Google Analytics, Plausible)

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Found a bug or want to add a feature? PRs are welcome!

## 💬 Support

If you have questions, feel free to open an issue or reach out.

---

Built with ❤️ using Next.js and Tailwind CSS
