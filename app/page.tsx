import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const projects = [
    {
      id: "1",
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB.",
      imageSrc: "/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project1",
    },
    {
      id: "2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates.",
      imageSrc: "/project2.jpg",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project2",
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts.",
      imageSrc: "/project3.jpg",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project3",
    },
  ];

  const socialLinks = [
    { platform: "GitHub", url: "https://github.com/example", icon: "🐙" },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/example",
      icon: "💼",
    },
    { platform: "Twitter", url: "https://twitter.com/example", icon: "🐦" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero/>
      <About
        title="About Me"
        description={[
          "I'm a full-stack developer with 5+ years of experience building web applications. I love turning complex problems into simple, beautiful designs.",
          "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or hiking in the mountains.",
        ]}
        skills={[
          "JavaScript",
          "TypeScript",
          "React",
          "Node.js",
          "Python",
          "PostgreSQL",
          "AWS",
        ]}
      />
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
