import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

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

export function getPortfolioData(): PortfolioData {
  if (!fs.existsSync(DATA_PATH)) {
    return {} as PortfolioData; // Should handle this better in production
  }
  const fileContents = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(fileContents);
}

export function savePortfolioData(data: PortfolioData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}
