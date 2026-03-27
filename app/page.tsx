import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { hero, socialLinks, projects } from "@/data";

export default function Home() {

  return (
    <div className="min-h-screen">
      <Hero {...hero} />
      <About/>
      <Projects title="My Projects" projects={projects} />
      <Contact
        title="Let's Work Together"
        email="john@example.com"
        socialLinks={socialLinks}
      />
      <Footer name="John Doe" year={2024} />
    </div>
  );
}
