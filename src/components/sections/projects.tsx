import { projects } from "@/data/portfolio";
import { ExternalLink, SectionLabel } from "@/components/ui/shared";
import { TechIcons } from "@/components/ui/tech-icons";
import { SapphireVisual, PaladinVisual, FrostVisual, CloudGuardVisual, KungFuVisual } from "./project-visuals";

const scenes = [
  { className: "sapphire", category: "Code Modernization / Google-Sponsored", Visual: SapphireVisual, title: <>Google <br />Sapphire.</> },
  { className: "paladin", category: "Cloud-Native / Full Stack", Visual: PaladinVisual, title: <>Paladin.</> },
  { className: "frost", category: "Cloud Infrastructure / Data Visualization", Visual: FrostVisual, title: <>FrostSight.</> },
  { className: "cloudguard", category: "Security / Agentic Systems", Visual: CloudGuardVisual, title: <>CloudGuard <br />Audit Agent.</> },
  { className: "kungfu", category: "Product Engineering / AI Ordering", Visual: KungFuVisual, title: <>Kung Fu <br />Express.</> },
];

export function Projects() {
  return <section id="projects" className="projects">
    <div className="project-section-header section-pad"><SectionLabel number="03">Selected projects</SectionLabel><div className="projects-heading"><h2>What I’ve Built.</h2></div></div>
    {projects.map((project, index) => {
      const { className, category, Visual, title } = scenes[index];
      return <article key={project.name} id={`project-${index}`} className={`project-scene ${className}`}>
        <div className="project-scene-top mono"><span>0{index + 1} / 05</span><span>{category}</span><span className="project-small-name">{project.name}</span></div>
        <div className="project-scene-main"><div className="project-content"><h3>{title}</h3><p>{project.description}</p>{project.repo && <ExternalLink href={project.repo}>Explore the repository</ExternalLink>}{project.metrics.length > 0 && <div className="project-metric mono">{index === 2 ? "500,000+ billing line items" : index === 4 ? "$1M+ annual revenue tracking context" : project.metrics[0]}</div>}</div><Visual /></div>
        <div className="project-scene-bottom"><TechIcons tech={project.tech} /></div>
      </article>;
    })}
  </section>;
}
