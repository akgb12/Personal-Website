import { publications, type Publication as PublicationData } from "@/data/portfolio";
import { ExternalLink, SectionLabel } from "@/components/ui/shared";
import { FibonacciVisual } from "./research-visuals";

function Paper({ paper }: { paper: PublicationData }) {
  return <article className="paper"><div className="paper-meta mono" aria-hidden="true" /><h3>{paper.title}</h3><div className="paper-details"><p className="paper-authors">{paper.authors.map((author, i) => <span key={author}>{i > 0 && <span className="author-separator"> · </span>}{author === "Aney Kanji" ? <strong>{author}</strong> : author}</span>)}</p><p>{paper.journal}<br />Volume {paper.volume} ({paper.year}) · Pages {paper.pages}<br />Published {paper.published}</p><p className="paper-doi mono">DOI: {paper.doi}</p></div><div className="paper-actions"><ExternalLink href={paper.official_url}>Read in the journal</ExternalLink><ExternalLink href={paper.arxiv_url}>arXiv</ExternalLink><ExternalLink href={paper.doi_url}>DOI</ExternalLink></div></article>;
}

export function Publication() {
  return <section id="publication" className="publication section-pad"><SectionLabel number="05">Publication</SectionLabel><h2 className="sr-only">Publication</h2><div className="paper-background"><FibonacciVisual large /></div>{publications.map((paper) => <Paper key={paper.doi} paper={paper} />)}<div className="publication-bottom mono" aria-hidden="true" /></section>;
}
