export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  client: string;
  role: string;
  stack: string[];
  thumbnailColor: string;
  accentColor: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  featured: boolean;
  bestDesign?: boolean;
  highlightBadge?: string;
  screenshot?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'frontend' | 'creative' | 'backend' | 'ecommerce';
  level: number;
  description: string;
  experience: string;
  position: [number, number, number];
}

export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  badge: string;
}

export interface LabExperiment {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  type: 'canvas' | 'audio' | 'shader' | 'decrypt';
}

export interface SiteConfig {
  developerName: string;
  title: string;
  location: string;
  coordinates: string;
  availability: boolean;
  status: string;
  bio: string;
  experienceYears: string;
  email: string;
  socials: {
    name: string;
    url: string;
    handle: string;
  }[];
  stats: {
    number: string;
    label: string;
    suffix?: string;
    subtext: string;
  }[];
}
