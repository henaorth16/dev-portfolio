import React from 'react';
import { openDb } from '@/lib/db';
import { Project } from '@/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const db = await openDb();
  const { id } = await params;
  const idStr = decodeURIComponent(id);

  const res = await db.execute({
    sql: "SELECT * FROM projects WHERE id = ? OR title = ?",
    args: [idStr, idStr]
  });

  if (res.rows.length === 0) {
    return notFound();
  }

  const row = res.rows[0] as Record<string, unknown>;
  const project: Project = {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    imageSrc: row.imageSrc as string,
    technologies: JSON.parse((row.technologies as string) || "[]"),
    liveUrl: row.liveUrl as string,
    githubUrl: row.githubUrl as string,
    client: row.client as string,
    services: JSON.parse((row.services as string) || "[]"),
    productionYear: row.productionYear as string,
    detailedDescription: row.detailedDescription as string,
    contentBlocks: JSON.parse((row.contentBlocks as string) || "[]")
  };

  return (
    <main className="bg-background text-foreground min-h-screen pt-24 pb-32 font-sans mx-auto max-w-[1400px]">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between px-6 lg:px-20 mb-12 gap-8">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
          {project.title}
        </h1>
        <div className="flex items-center gap-6">
          <Link href={project.githubUrl || "#"} className="text-muted-foreground hover:text-foreground font-medium transition text-lg">
            See Details
          </Link>
          <Link href={project.liveUrl || "#"} target="_blank" className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
            Preview
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        
        {/* Left Column Metadata */}
        <aside className="md:col-span-3 flex flex-col gap-10 mt-2">
          <div>
            <h3 className="text-xl md:text-2xl text-foreground mb-3 font-medium">Client</h3>
            <p className="text-muted-foreground text-lg">{project.client || "Self Project"}</p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl text-foreground mb-3 font-medium">Services</h3>
            <ul className="flex flex-col gap-1 text-muted-foreground text-lg">
              {project.services?.length ? (
                project.services.map((svc, i) => (
                  <li key={i}>{svc}</li>
                ))
              ) : (
                <li>Design</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl text-foreground mb-3 font-medium">Production</h3>
            <p className="text-muted-foreground text-lg">{project.productionYear || "2024"}</p>
          </div>
        </aside>

        {/* Right Column Featured Image */}
        <div className="md:col-span-9">
          <div className="w-full h-fit flex justify-center bg-muted overflow-hidden">
            <img 
              src={project.imageSrc} 
              alt={project.title} 
              className="w-full object-cover max-h-[800px] hover:scale-[1.02] transition duration-700 ease-in-out" 
            />
          </div>
        </div>
      </section>

      {/* Main Description */}
      <section className="px-6 lg:px-20 mt-24 max-w-6xl mx-auto">
        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
          {project.detailedDescription || project.description || "Project detailed description goes here. Expand this section to elaborate on the design decisions and complex problems solved within this specific digital product experience."}
        </p>
      </section>

      {/* Dynamic Content Blocks */}
      {project.contentBlocks && project.contentBlocks.length > 0 && (
        <section className="mt-32 flex flex-col gap-32">
          {project.contentBlocks.map((block, idx) => {
            if (!block) return null;
            
            if (block.type === 'full-image') {
              return (
                <div key={idx} className="px-6 lg:px-20 w-full flex justify-center">
                  <img src={block.image} alt="Block image" className="w-full max-h-[900px] object-cover bg-muted" />
                </div>
              );
            }

            if (block.type === 'text-right') {
                // Layout: Image left, text right
                return (
                  <div key={idx} className="px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-[1400px] mx-auto">
                    <div className="w-full bg-muted min-h-[400px]">
                      {block.image && <img src={block.image} className="w-full object-cover h-full" alt="Content left" />}
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed">{block.text}</p>
                    </div>
                  </div>
                );
            }

            // text-left layout: Text left, image right
            return (
              <div key={idx} className="px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-[1400px] mx-auto">
                <div className="order-2 md:order-1">
                  <p className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed">{block.text}</p>
                </div>
                <div className="order-1 md:order-2 w-full bg-muted min-h-[400px]">
                  {block.image && <img src={block.image} className="w-full object-cover h-full" alt="Content right" />}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Render mock content blocks if there are none, simply to test the UI logic */}
      {(!project.contentBlocks || project.contentBlocks.length === 0) && (
        <section className="mt-32 flex flex-col gap-32">
             <div className="px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-[1400px] mx-auto">
              <div className="w-full bg-muted/60 min-h-[500px]"></div>
              <div>
                <p className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed">
                  Collaborating with a global leader means operating at the intersection of optical science and visual art. Our contribution spanned from technical R&D consultancy to the production of high-impact visual assets. 
                </p>
              </div>
            </div>

            <div className="px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-[1400px] mx-auto">
              <div className="order-2 md:order-1">
                <p className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed">
                   Working closely with the internal creative team, we developed lighting and 3D animation solutions to illustrate the technological complexity of flagship products. A journey where technical precision meets visual storytelling.
                </p>
              </div>
              <div className="w-full bg-muted min-h-[500px] order-1 md:order-2 flex justify-center items-center">
                 <span className="text-muted-foreground">Image Placeholder</span>
              </div>
            </div>
            
            <div className="px-6 lg:px-20 w-full flex justify-center">
               <div className="w-full min-h-[600px] bg-muted flex items-center justify-center">
                   <span className="text-muted-foreground">Panoramic Image Placeholder</span>
               </div>
            </div>
        </section>
      )}

    </main>
  );
}