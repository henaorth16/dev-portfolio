"use client";
import React from "react";

interface ContactProps {
  title?: string;
  email?: string;
  socialLinks?: any[];
  className?: string;
}

export function mainContact() {

}



export default function Contact({ title, email, className = "" }: ContactProps) {
  const contactText = title || "Let's work together.";
  const contactEmail = email || "davemak4621@gmail.com";
  
  return (
    <section id="contact" className={`bg-primary text-primary-foreground py-32 px-8 text-center flex flex-col items-center justify-center ${className}`}>
      <p className="text-primary-foreground/70 mb-12 text-lg">{contactText}</p>
      
      <a href={`mailto:${contactEmail}`} className="group rounded-full bg-primary-foreground text-primary px-12 md:px-24 py-8 md:py-12 text-4xl md:text-6xl font-bold flex items-center justify-center gap-4 hover:scale-105 transition-transform duration-300">
        Contact
      </a>

      <p className="text-primary-foreground/60 mt-16 text-sm">
        or reach out via email at <a href={`mailto:${contactEmail}`} className="text-primary-foreground hover:underline">{contactEmail}</a>
      </p>
    </section>
  );
}
