import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { getPortfolioData } from "@/lib/portfolio";

export default function Home() {
  const data = getPortfolioData();

  return (
    <>
      <Hero data={data.personal} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Projects data={data.projects} />
      <Contact data={data.contact} />
    </>
  );
}
