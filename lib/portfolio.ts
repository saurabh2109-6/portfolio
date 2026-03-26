import { supabase } from './supabase';

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    greeting: string;
    description: string;
    avatar: string;
    resumeUrl: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    stats: { label: string; value: string }[];
  };
  skills: { title: string; icon: string; skills: string[]; color: string }[];
  projects: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    github: string;
    live: string;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const FALLBACK_DATA: PortfolioData = {
  personal: {
    name: "Saurabh Chakarvarti",
    title: "Web developer & Creative Problem Solver",
    greeting: "👋 Hello, I'm",
    description: "I build exceptional digital experiences that combine beautiful design with powerful functionality. Let's create something amazing together.",
    avatar: "👨‍💻",
    resumeUrl: "/resume.pdf"
  },
  about: {
    title: "Who Am I",
    subtitle: "Get to know me better",
    paragraphs: [
      "I'm a full-stack developer with a passion for creating beautiful, functional, and user-friendly websites and applications. With expertise in modern web technologies, I bring ideas to life through clean code and innovative solutions.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date with the latest industry trends."
    ],
    stats: [
      { label: "Years Exp.", value: "freshers" },
      { label: "Projects", value: "2" },
      { label: "Clients", value: "0" }
    ]
  },
  skills: [
    {
      title: "Frontend",
      icon: "Layout",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
      color: "text-blue-400"
    },
    {
      title: "Backend",
      icon: "Server",
      skills: ["Node.js", "Express", "Python", "Django", "REST APIs"],
      color: "text-green-400"
    },
    {
      title: "Database",
      icon: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
      color: "text-yellow-400"
    },
    {
      title: "Mobile",
      icon: "Smartphone",
      skills: ["React Native", "Flutter", "iOS", "Android", "PWA"],
      color: "text-purple-400"
    }
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with cart, checkout, and payment integration.",
      image: "🛒",
      tags: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      category: "Web",
      github: "https://github.com/yourusername/project1",
      live: "https://project1.com"
    },
    {
      title: "Social Media App",
      description: "A modern social networking application with real-time messaging and notifications.",
      image: "💬",
      tags: ["React Native", "Firebase", "Node.js", "Socket.io"],
      category: "Mobile",
      github: "https://github.com/yourusername/project2",
      live: "https://project2.com"
    }
  ],
  contact: {
    email: "Saurabhchakarvarti1@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  },
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:your.email@example.com"
  }
};

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('data')
      .eq('id', 1)
      .single();

    if (error || !data) {
      return FALLBACK_DATA;
    }
    
    return data.data as PortfolioData;
  } catch (e) {
    return FALLBACK_DATA;
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const { error } = await supabase
    .from('portfolio')
    .upsert({ id: 1, data });

  if (error) {
    console.error('Error saving portfolio data:', error);
    throw new Error(error.message || 'Failed to save data');
  }
}
