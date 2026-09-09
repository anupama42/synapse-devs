export interface SiteConfig {
  name: string;
  tagline: string;
  valueProposition: string;
  email: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  linkedin: string;
  freelancer: string;
  peoplePerHour: string;
  showTestimonials: boolean;
  pricingNote: string;
}

export interface TeamMember {
  name: string;
  role: string;
  shortBio: string;
  longBio: string;
}

export interface ServiceItem {
  title: string;
  body: string;
}

export interface SkillItem {
  name: string;
  group: string;
}

export interface Project {
  _id?: string;
  slug: string;
  name: string;
  category: string;
  liveUrl: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  role: string;
  highlight: string;
  accent: string;
  featured: boolean;
  order: number;
}

export interface SitePayload {
  site: SiteConfig;
  team: TeamMember[];
  services: ServiceItem[];
  skills: SkillItem[];
  showTestimonials: boolean;
}
