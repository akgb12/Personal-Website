import { Navigation } from "@/components/layout/navigation";
import { ScrollScenes } from "@/components/motion/scroll-scenes";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Research } from "@/components/sections/research";
import { Publication } from "@/components/sections/publication";
import { Coursework } from "@/components/sections/coursework";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return <><Navigation /><main id="main"><Hero /><About /><Experience /><Projects /><Research /><Publication /><Coursework /></main><Contact /><ScrollScenes /></>;
}
