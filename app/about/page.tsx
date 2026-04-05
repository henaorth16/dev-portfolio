"use client"
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { aboutData } from '@/data/about';
import CountUp from 'react-countup';

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      setIsVisible(true)
    }, [isVisible])

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="mt-10">
          <h1 className="text-[15vw] md:text-9xl tracking-tight leading-none mb-4">{aboutData.mainTitle}</h1>

          <div className="flex items-center mt-2"
          style={{
            transition: "width 2s",
            width: isVisible ? "100%" : "5%",
          }}
          >
            <span className="text-s text-muted-foreground">2023</span>
            <div className="hr-line flex-1 h-0.5 bg-muted-foreground/50 mx-2"></div>
            <span className="text-s text-muted-foreground">{new Date().getFullYear()}</span>
          </div>

          <p className="my-10 max-w-2xl ml-auto md:text-right mx-auto text-left text-2xl md:text-3xl leading-snug text-foreground/80">
            {aboutData.description}
          </p>
          
        </section>

        {/* Stats Section */}
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

        {/* My Work Process */}
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

        {/* Working Experience */}
        <section className="py-7 ">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="text-5xl md:text-6xl leading-tight">Working Experience</h2>
            </div>
            <div className="md:col-span-7 flex flex-col pt-8 md:pt-0">
              {aboutData.work_experience.map((job, idx) => (
                <div key={idx} className="flex flex-col md:flex-row justify-between items-start py-4 border-t border-border">
                  <h3 className="text-2xl mb-4 md:mb-0 flex-1">{job.fcol}</h3>
                  <div className="text-left md:text-right">
                    <p className="text-lg text-foreground/80">{job.scol.type}</p>
                    <p className="text-muted-foreground mt-1">{job.scol.dateInterval}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards Placeholder */}
        <section className="py-7">
          <div className="text-center mb-4">
            <h2 className="text-5xl mb-4">Awards</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">Dawit is a product UI/UX designer. Focused on turning complex ideas into simple and user centered digital products.</p>
          </div>

          <div className="flex flex-col max-w-4xl mx-auto">
            {/* {start map loop here} */}
            <div className="py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-lg text-muted-foreground mb-8 gap-4 px-4">
                <span className="text-foreground font-semibold">MIT College</span>
                <span>2025</span>
                <span>Maya Ai</span>
                <span>2nd Best Project of the year</span>
              </div>
              <div className="w-full h-[400px] md:h-[600px] bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-primary-foreground/50 text-xl">Image Placeholder</span>
              </div>
            </div>
            
            <div className="py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-lg text-muted-foreground mb-8 gap-4 px-4">
                <span className="text-foreground font-semibold">MIT College</span>
                <span>2025</span>
                <span>Maya Ai</span>
                <span>2nd Best Project of the year</span>
              </div>
              <div className="w-full h-[400px] md:h-[600px] bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-primary-foreground/50 text-xl">Image Placeholder</span>
              </div>
            </div>
            {/* {end of map loop} */}
          </div>
        </section>

      </main>

      {/* Reusable Pre-footer Contact & Footer */}
      <Contact />
    </div>
  );
}