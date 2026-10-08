import type { IconType } from "react-icons";
import { SiReact, SiNextdotjs, SiTailwindcss, SiFlask, SiPostgresql, SiLanggraph, SiGooglegemini, SiTypescript, SiSpringboot, SiGraphql, SiDocker, SiVuedotjs, SiThreedotjs, SiNodedotjs, SiExpress, SiMongodb, SiRedis, SiDatadog, SiPython, SiFastapi, SiLangchain, SiRender, SiGooglecloud } from "react-icons/si";
import { DiHeroku } from "react-icons/di";
import { Archive, Database, ScanText, Radio, Cloud } from "lucide-react";

const marks: Record<string, IconType> = {
  React: SiReact, "React.js": SiReact, "Next.js": SiNextdotjs, "Tailwind CSS": SiTailwindcss,
  Flask: SiFlask, PostgreSQL: SiPostgresql, LangGraph: SiLanggraph, Gemini: SiGooglegemini,
  TypeScript: SiTypescript, "Spring Boot": SiSpringboot, "GraphQL/Apollo": SiGraphql,
  Docker: SiDocker, "Vue.js": SiVuedotjs, "Three.js": SiThreedotjs, "Node.js": SiNodedotjs,
  "Express.js": SiExpress, MongoDB: SiMongodb, Redis: SiRedis, Datadog: SiDatadog,
  Python: SiPython, FastAPI: SiFastapi, LangChain: SiLangchain, Heroku: DiHeroku, Render: SiRender,
};

function ServiceMark({ name }: { name: string }) {
  const Glyph = name.includes("Textract") ? ScanText : name.includes("Pub/Sub") ? Radio : name.includes("Storage") || name.includes("S3") ? Archive : name.includes("SQL") || name.includes("RDS") || name.includes("Dynamo") ? Database : Cloud;
  return <span className="service-mark"><Glyph size={25} strokeWidth={1.5} aria-hidden="true" />{name.startsWith("GCP") ? <SiGooglecloud className="service-provider" aria-hidden="true" /> : <svg className="service-provider" viewBox="0 0 30 14" aria-hidden="true"><path d="M2 7Q15 16 28 5M25 5h3v3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}</span>;
}

export function TechIcons({ tech }: { tech: string[] }) {
  return <div className="tech-rail" aria-label="Project technologies">{tech.map((name) => {
    const Mark = marks[name];
    return <span className="tech-icon" key={name} tabIndex={0} role="img" aria-label={name} title={name}>{Mark ? <Mark aria-hidden="true" /> : <ServiceMark name={name} />}<span className="tech-tooltip" aria-hidden="true">{name}</span></span>;
  })}</div>;
}
