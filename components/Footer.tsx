import React from 'react';

interface FooterProps {
  name?: string;
  year?: number;
  className?: string;
}

export default function Footer({ name, year, className = "" }: FooterProps) {
  const currentYear = year || new Date().getFullYear();
  const userName = name || "John";

  return (
    <footer className={` pt-20 pb-10 px-8 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-primary/70">
            <p className="text-sm">davemak4621@gmail.com</p>
            <p className="text-sm">+251 936 978 748</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a href="#" className="border border-primary/20 rounded-full px-5 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition">Telegram</a>
            <a href="#" className="border border-primary/20 rounded-full px-5 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition">Instagram</a>
            <a href="#" className="border border-primary/20 rounded-full px-5 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition">LinkedIn</a>
            <a href="#" className="border border-primary/20 rounded-full px-5 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition">Facebook</a>
          </div>
        </div>

        {/* Middle row */}
        <div className="w-full text-center py-10 border-b border-primary/20">
          <h1 className="text-[20vw] font-serif leading-none tracking-tighter uppercase mb-0">{userName}</h1>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-primary/70 gap-6">
          <div className="flex gap-4">
            <button className="hover:text-primary transition">IT</button>
            <button className="hover:text-primary transition">AM</button>
            <button className="text-primary">EN</button>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition">Terms & Policies</a>
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
          </div>
          <div className="flex items-center gap-2">
            <p>© {currentYear} {userName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
