"use client"
import React, { useState } from "react";
import { Project } from "@/data";

interface ProjectsProps {
  title: string;
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsProps> = ({ title, projects: passedProjects }) => {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = ["All", ...Array.from(new Set(passedProjects.flatMap(p => p.technologies)))];

  const filteredProjects =
    selectedTag === "All"
      ? passedProjects
      : passedProjects.filter(project => project.technologies.includes(selectedTag));

  return (
    <section className="py-16 px-4 ">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 cursor-pointer transition ${selectedTag === tag
              ? "font-extrabold"
              : "text-muted-background"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2">
        {filteredProjects.map(project => (
          <a
            key={project.id}
            href={`/project/${project.id}`}
            className="group  overflow-hidden transition"
          >
            <div className="overflow-hidden">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-96 object-cover group-hover:scale-105 transition"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{project.description}</p>

              {/* <div className="flex flex-wrap gap-2">
                 {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-200 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div> */}
            </div>
          </a>
        ))}
      </div>
      <a href={`/projects`} className="w-fit mx-auto rounded-full my-12 bg-primary text-primary-foreground px-4 md:px-8 py-2 md:py-4 text-xl md:text-2xl font-bold flex items-center justify-center gap-4 hover:scale-105 transition-transform duration-300">
        Explore All Work
      </a>
    </section>
  );
};

export default ProjectsSection;