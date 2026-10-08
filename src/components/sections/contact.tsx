import { ArrowUp } from "lucide-react";
import { links } from "@/data/portfolio";
import { ExternalLink, SectionLabel } from "@/components/ui/shared";
import { MolangGreeting } from "./molang-greeting";

export function Contact() {
  return <footer id="contact" className="contact section-pad"><SectionLabel number="07">Contact</SectionLabel><div className="contact-top"><h2>Let’s Connect<span>.</span></h2><div className="contact-links"><ExternalLink href={links.email}>aneykanji@gmail.com</ExternalLink><ExternalLink href={links.linkedin}>LinkedIn</ExternalLink><ExternalLink href={links.github}>GitHub</ExternalLink></div></div><div className="footer-name"><span className="footer-name-text" aria-hidden="true">Aney Kanji</span><MolangGreeting /></div><div className="footer-meta mono"><a href="#hero">Back to top <ArrowUp size={14} aria-hidden="true" /></a></div></footer>;
}
