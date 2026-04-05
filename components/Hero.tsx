"use client";
//@ts-ignore
import React from "react";

type heroData = {
  name: string;
  mainTitle: string;
  paragraph: string;
  card1: {
    title: string;
    paragraph: string;
  };
  card2: {
    title: string;
    paragraph: string;
  };
};

export default function HeroSection({ name, mainTitle, paragraph, card1, card2 }: heroData) {
  return (
    <section className="min-h-screen bg-background flex justify-center text-foreground">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="pattern-bg md:py-12 py-32">
              <h1 className="text-5xl text-black z-10 md:text-9xl font-extrabold text-center tracking-wide mb-8">
                {name}
              </h1>
            </div>

            <h2 className="text-3xl md:text-5xl px-5 md:p-6 md:mt-9 font-bold leading-snug">
              {mainTitle.split("[newline]")[0]}
              <br />
              <span>{mainTitle.split("[newline]")[1]}</span>
            </h2>

            <p className="text-muted-foreground px-5 md:my-10 text-lg ">
              {paragraph}
            </p>
          </div>

        </div>

        {/* Right Image */}
        <div className="relativ flex flex-col items-center justify-center">
          <img
            src="/profile-img.jpg"
            alt="profile"
            className="object-cover h-full w-full bg-muted"
          />
          <div className="grid grid-cols-2 w-full">
            <a href="#" className="relative group p-6 pt-24 z-1 bg-muted/30 transition overflow-hidden cursor-pointer">
              <h3 className="font-semibold text-foreground group-hover:text-background text-lg">
                {card1.title}
              </h3>
              <p className="text-sm text-foreground/80 group-hover:text-muted-foreground mt-1">
                {card1.paragraph}
              </p>
              <span className="absolute mix-blend-difference top-8 right-6">
                <svg
                  width="18"
                  height="27"
                  viewBox="0 0 18 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.667 12.3008C14.4463 13.1504 15.1201 13.7979 15.6885 14.2432C16.2568 14.6826 16.793 15.0107 17.2969 15.2275V15.623C16.7168 15.9043 16.1543 16.2646 15.6094 16.7041C15.0645 17.1377 14.4141 17.7764 13.6582 18.6201H12.9814C13.5322 17.4424 14.1094 16.5371 14.7129 15.9043H0.694336V15.0166H14.7129C14.2676 14.4482 13.957 14.0264 13.7812 13.751C13.6055 13.4756 13.3447 12.9922 12.999 12.3008H13.667Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <div className="w-full h-full absolute bg-primary text-primary-foreground -z-1 top-full group-hover:top-2/5 left-0 transition-all"></div>
            </a>
            <a href="#" className="relative group p-6 pt-24 z-1 bg-primary text-primary-foreground transition overflow-hidden cursor-pointer">
              <h3 className="font-semibold text-primary-foreground group-hover:text-primary text-lg">
                {card2.title}
              </h3>
              <p className="text-sm text-primary-foreground/70 group-hover:text-muted-foreground mt-1">
                {card2.paragraph}
              </p>
              <span className="absolute mix-blend-difference top-8 right-6">
                <svg
                  width="18"
                  height="27"
                  viewBox="0 0 18 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.667 12.3008C14.4463 13.1504 15.1201 13.7979 15.6885 14.2432C16.2568 14.6826 16.793 15.0107 17.2969 15.2275V15.623C16.7168 15.9043 16.1543 16.2646 15.6094 16.7041C15.0645 17.1377 14.4141 17.7764 13.6582 18.6201H12.9814C13.5322 17.4424 14.1094 16.5371 14.7129 15.9043H0.694336V15.0166H14.7129C14.2676 14.4482 13.957 14.0264 13.7812 13.751C13.6055 13.4756 13.3447 12.9922 12.999 12.3008H13.667Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <div className="w-full h-full absolute bg-primary-foreground text-primary -z-1 top-full group-hover:top-2/5 left-0 transition-all"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
