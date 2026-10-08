import { ArrowUpRight } from "lucide-react";

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith("https://");
  return <a className={`text-link ${className}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only">{external ? " (opens in a new tab)" : ""}</span></a>;
}
