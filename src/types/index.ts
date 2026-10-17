export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  keyHighlights?: string[];
  aiCapabilities?: string[];
  innovation?: string;
  technology: string[];
  impact?: string;
  patentStatus?: string;
  isPatent?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export interface PhilosophyCard {
  number: string;
  title: string;
  tagline: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface CreativePillar {
  title: string;
  description: string;
  tag: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  type: string;
  description: string;
  tags: string[];
}

