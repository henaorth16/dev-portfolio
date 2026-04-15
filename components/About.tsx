"use client"
import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import { AboutData } from "@/data";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  function handleWindowVis() {
    if(window.scrollY >= 355){
      setIsVisible(true)
    }
  }

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error(err));

    document.addEventListener("scroll", handleWindowVis);
    return () => window.removeEventListener("scroll", handleWindowVis);
  }, []);

  if (!aboutData) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="w-full bg-background text-foreground py-16 px-6 lg:px-28">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-medium">About me</h2>

          <div className="flex items-center mt-2"
          style={{
            transition: "width 2s",
            width: isVisible ? "100%" : "30%",
          }}
          >
            <span className="text-s text-muted-foreground">2023</span>
            <div className="hr-line flex-1 h-0.5 bg-muted-foreground/50 mx-2"></div>
            <span className="text-s text-muted-foreground">{new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-left max-w-xl text-xl md:text-2xl mx-auto text-foreground/80 leading-relaxed mb-10">
          <p>
            <span className="text-center block">I’m Dawit Tesfaye From</span>{" "}
            <span className="text-right md:mr-24 block">
              love of visuals to career in digital design
            </span>
            <span className="text-right md:mr-24 block">
              I’ve grown through hands on projects
            </span>
            <span className="text-right md:mr-24 block">
              crafting brands and interfaces
            </span>
          </p>
        </div>

        {/* Image */}
        <div className="flex flex-col max-w-2xl mx-auto">
          <div className="w-full flex justify-center">
            <img
              src="/about-portrait.jpg" 
              alt="profile"
              className="object-cover bg-muted"
            />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-4 text-center text-foreground/90 py-3">
            <div>
              <h3 className="text-5xl font-semibold">
                <CountUp end={aboutData.stats.years} enableScrollSpy={true} duration={2} />
              </h3>
              <p className="text-xs text-muted-foreground">Years of experience</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">
                <CountUp end={aboutData.stats.projects} enableScrollSpy={true} duration={2} /> +
              </h3>
              <p className="text-xs text-muted-foreground">Projects completed</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">
                <CountUp end={aboutData.stats.satisfied} enableScrollSpy={true} duration={2} />%
              </h3>
              <p className="text-xs text-muted-foreground">Satisfied Client</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">
                <CountUp end={aboutData.stats.industries} enableScrollSpy={true} duration={2} />+
              </h3>
              <p className="text-xs text-muted-foreground">Industries Served</p>
            </div>
          </div>
        </div>

        {/*progress stats */}
        <section className="py-12">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-5xl mb-6">My Work Process</h2>
            <p className="text-muted-foreground max-w-xl text-lg mx-auto md:mx-0">
              Dawit is a product and UI/UX designer focused on turning complex ideas into simple, user centered digital products.
            </p>
          </div>

          <div className="flex flex-col">
            {aboutData.process.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-start justify-between py-3 md:py-6 border-t border-border">
                <span className="text-muted-foreground/70 text-lg md:w-24 lg:w-[28%] mb-4 md:mb-0">0{idx + 1}</span>
                <h3 className="text-2xl flex-1 mb-4 md:mb-0">{step.fcol}</h3>
                <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                  {step.scol}
                </p>
              </div>
            ))}
          </div>
        </section>
        <WorkExp aboutData={aboutData} />
      </div>
    </section>
  );
}

function WorkExp({ aboutData }: { aboutData: AboutData }) {
  return (
    <div className="sm:flex items-center justify-evenly mx-auto gap-12 text-foreground">
      {/* Left content*/}
      <div className="flex flex-col flex-1/3 gap-4">
        <h3 className="text-5xl mb-5">Working Experience</h3>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
          ratione. Voluptas eligendi ab corrupti. Dolor odit veniam hic
          voluptatibus laboriosam maiores sequi ratione architecto, porro nam
          molestias voluptatum adipisci reprehenderit.
        </p>
      </div>
      {/* Right content */}
      <div className="flex flex-col flex-1/2 gap-2">
        {aboutData.work_experience.map((data, i) => (
          <div className="flex p-3 justify-between items-center border-b border-border last:border-none" key={i}>
            <h3 className="font-semibold text-lg">{data.fcol}</h3>
            <div className="flex text-muted-foreground items-end flex-col">
              <span className="text-foreground/80">{data.scol.type}</span>
              <span>{data.scol.dateInterval}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
