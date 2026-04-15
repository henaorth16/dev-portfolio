import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { openDb } from "@/lib/db";
import { Project, HeroData, SocialLink } from "@/data";

export default async function Home() {
  const db = await openDb();
  
  // Fetch hero
  const heroResult = await db.execute('SELECT * FROM hero WHERE id = 1');
  const heroRow = heroResult.rows[0];
  const hero: HeroData = {
    name: heroRow?.name as string,
    mainTitle: heroRow?.mainTitle as string,
    paragraph: heroRow?.paragraph as string,
    card1: { title: heroRow?.card1Title as string, paragraph: heroRow?.card1Paragraph as string },
    card2: { title: heroRow?.card2Title as string, paragraph: heroRow?.card2Paragraph as string }
  };

  // Fetch projects
  const projectsResult = await db.execute('SELECT * FROM projects');
  const projects: Project[] = projectsResult.rows.map((row: Record<string, unknown>) => ({
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    imageSrc: row.imageSrc as string,
    technologies: JSON.parse(row.technologies as string),
    liveUrl: row.liveUrl as string,
    githubUrl: row.githubUrl as string,
    client: row.client as string,
    services: JSON.parse((row.services as string) || '[]'),
    productionYear: row.productionYear as string,
    detailedDescription: row.detailedDescription as string,
    contentBlocks: JSON.parse((row.contentBlocks as string) || '[]')
  }));

  // Fetch social links
  const socialResult = await db.execute('SELECT * FROM social_links');
  const socialLinks: SocialLink[] = socialResult.rows.map((row: Record<string, unknown>) => ({
    platform: row.platform as string,
    url: row.url as string,
    icon: row.icon as string
  }));

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
    </div>
  );
}
