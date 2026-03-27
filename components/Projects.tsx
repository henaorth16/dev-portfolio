import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsProps {
  title: string;
  projects: Project[];
  className?: string;
}

export default function Projects({
  title,
  projects,
  className = "",
}: ProjectsProps) {
  return (
    <section
      id="projects"
      className={`py-20 bg-muted ${className}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-border"
            >
              <div className="relative h-48 bg-muted">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm hover:bg-muted-foreground/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Live Demo
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      className="text-muted-foreground hover:text-foreground font-medium"
                    >
                      GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
