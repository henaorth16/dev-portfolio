"use client"
import React, { useState, useEffect } from "react";
import { Project } from "@/data";
import Contact from "@/components/Contact";

export default function ProjectsPage() {
  const [passedProjects, setPassedProjects] = useState<Project[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [grid, setGrid] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setPassedProjects(data);
      })
      .catch(console.error);
  }, []);

  const allTags = ["All", ...Array.from(new Set(passedProjects.flatMap(p => p.technologies)))];

  const filteredProjects =
    selectedTag === "All"
      ? passedProjects
      : passedProjects.filter(project => project.technologies.includes(selectedTag));

  return (
    <section className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl  mb-8">Projects</h2>
          <button onClick={() => setGrid(!grid)} className="text-2xl mr-3 cursor-pointer hover:opacity-60">
            <img src="/grid.svg" alt="grid" className="w-5 h-5" />
          </button>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 cursor-pointer transition ${selectedTag === tag
                ? "font-extrabold"
                : "text-muted-foreground"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* Projects Grid - 1 row for 1 item */}
        <div className={grid ? `grid md:grid-cols-2 grid-cols-1 gap-3` : "grid grid-cols-1 gap-3"}>
          {filteredProjects.map(project => (
            <a
              key={project.id}
              href={`/project/${project.id}`}
              className="group overflow-hidden transition block  bg-background mb-6"
            >
              <div className="overflow-hidden">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full max-h-[670px] mb-4 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8 bg-primary-foreground">
                <h3 className="text-2xl  font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-600 mb-4">{project.description.slice(0, 100)}...</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 bg-muted-foreground text-background font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Contact />
    </section>
  );
}