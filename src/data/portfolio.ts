import educationSource from "../../_onboarding/data/education.json";
import experienceSource from "../../_onboarding/data/experience.json";
import projectSource from "../../_onboarding/data/projects.json";
import researchSource from "../../_onboarding/data/research.json";
import publicationSource from "../../_onboarding/data/publication.json";
import courseworkSource from "../../_onboarding/data/coursework.json";
import linkSource from "../../_onboarding/data/links.json";

export interface Experience {
  role: string;
  organization: string;
  start: string;
  end: string;
  location: string;
  summary: string | null;
}
export interface Project {
  name: string;
  description: string;
  repo: string | null;
  tech: string[];
  metrics: string[];
  notes: string[];
}
export interface Research {
  title: string;
  organization: string;
  start: string;
  end: string;
  description: string;
  topics: string[];
  metrics?: string[];
}
export interface Course { code: string; title: string }
export type Publication = typeof publicationSource;

export const education = educationSource;
export const experiences: Experience[] = experienceSource;
export const projects: Project[] = projectSource;
export const research: Research[] = researchSource;
export const publications: Publication[] = [publicationSource];
export const coursework: { graduate: Course[]; undergraduate: Course[] } = courseworkSource;
export const links = { email: linkSource.email, linkedin: linkSource.linkedin, github: linkSource.github };
export const about = "I'm a Computer Science and Statistics student at Texas A&M interested in software engineering, AI systems, and machine learning. My experience spans full-stack development, cloud systems, research, and teaching.";
export const navigation = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "publication", label: "Publication" },
  { id: "coursework", label: "Coursework" },
  { id: "contact", label: "Contact" },
];
export const companyAssets: Record<string, string> = {
  "m1neral": "/companies/m1neral.png",
  "Texas A&M University": "/companies/tamu.png",
  "Walt Disney": "/companies/disney.png",
  "Acumentor LLC": "/companies/acumentor.png",
  "BroadStreet Institute": "/companies/broadstreet.png",
};
