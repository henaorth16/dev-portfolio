"use client"
import React, {useState, useEffect} from "react";
import { aboutData } from "@/data";


export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  function handleWindowVis() {
    if(window.scrollY >= 355){
      setIsVisible(true)
    }
    console.log("current scroll = ", window.scrollY)
  }
  useEffect(() => {
    function run() {
      document.addEventListener("scroll", handleWindowVis)
      console.log("hello")
      return window.removeEventListener("scroll", handleWindowVis)
    }
    run()
  }, [])

  return (
    <section className="w-full bg-background text-foreground py-16 px-6 lg:px-28">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-medium">{aboutData.mainTitle}</h2>

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
              src="/about-portrait.jpg" // replace with your image
              alt="profile"
              className="object-cover bg-muted"
            />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-4 text-center text-foreground/90 py-3">
            <div>
              <h3 className="text-5xl font-semibold">
                {aboutData.stats.years}
              </h3>
              <p className="text-xs text-muted-foreground">Years of experience</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">
                {aboutData.stats.projects}+
              </h3>
              <p className="text-xs text-muted-foreground">Projects completed</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">
                {aboutData.stats.satisfied}%
              </h3>
              <p className="text-xs text-muted-foreground">Satisfied Client</p>
            </div>
            <div>
              <h3 className="text-5xl font-semibold">
                {aboutData.stats.industries}+
              </h3>
              <p className="text-xs text-muted-foreground">Industries Served</p>
            </div>
          </div>
        </div>

        {/*progress stats */}
        <div className="my-10">
          <h1 className="text-5xl text-center p-4">My Work Process</h1>
          <p className="text-center text-lg max-w-lg mx-auto text-muted-foreground">
            Dawit is a product and UI/UX designer focused on turning complex
            ideas into simple, user centered digital products
          </p>
          <table className="w-full max-w-5xl mx-auto table-fixed mt-6 ">
            {/* no header for this table */}
            <tbody className="space-y-4 justify-between items-center text-foreground">
              {aboutData.process.map((data, idx) => (
                <tr className="border-b border-border" key={idx}>
                  <td className="mb-6 py-2">
                    <h3 className="text-lg">{idx + 1}</h3>
                  </td>
                  <td className="mb-6 py-2">
                    <h3 className="text-lg">{data.fcol}</h3>
                  </td>
                  <td className="mb-6 py-2">
                    <h3 className="text-lg text-muted-foreground">{data.scol}</h3>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <WorkExp />
      </div>
    </section>
  );
}

function WorkExp() {
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
