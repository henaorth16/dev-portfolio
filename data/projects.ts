export type Project = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
    {
      id: "1",
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB.",
      imageSrc: "UI_images/projects/Background.png",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project1",
    },
    {
      id: "2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates.",
      imageSrc: "UI_images/projects/Background-1.png",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project2",
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts.",
      imageSrc: "UI_images/projects/Background-2.png",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project3",
    },
    {
      id: "4",
      title: "Admin Dashboard",
      description:
        "A responsive admin dashboard with location-based forecasts.",
      imageSrc: "UI_images/projects/Background-3.png",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project3",
    },
    {
      id: "5",
      title: "Portfolio Website",
      description:
        "A portfolio website.",
      imageSrc: "UI_images/projects/Background-4.png",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project3",
    },
    {
      id: "6",
      title: "Portfolio Website",
      description:
        "A portfolio website.",
      imageSrc: "UI_images/projects/Background-5.png",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project3",
    },
  ];