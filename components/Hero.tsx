"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full bg-white shadow-lg grid grid-cols-1 md:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-between  bg-gray-100">
          <div>
            <div className="pattern-bg py-12">
              <h1 className="text-4xl md:text-7xl font-extrabold text-center tracking-wide mb-8">
                DAWIT
              </h1>
            </div>

            <h2 className="text-3xl md:text-5xl px-5 md:p-6 md:mt-9 font-bold leading-snug">
              Product And UI/UX <br /> Designer.
            </h2>

            <p className="text-gray-500 px-5 md:p-6 text-sm ">
              Dawit is a product and UI/UX designer focused on turning complex
              ideas into simple, user centered digital products.
            </p>
          </div>

          {/* Bottom cards */}
        </div>

        {/* Right Image */}
        <div className="relativ flex flex-col items-center justify-center">
          <img
            src="/profile-img.jpg"
            alt="profile"
            className="object-cover h-full w-full"
          />
          <div className="grid grid-cols-2 w-full">
            <div className="relative p-6 pt-24 bg-gray-200 hover:bg-gray-300 transition">
              <h3 className="font-semibold text-lg">Selected Work</h3>
              <p className="text-sm text-gray-500 mt-1">View My portfolio</p>
              <span className="absolute top-8 right-6">
                <svg
                  width="18"
                  height="27"
                  viewBox="0 0 18 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.667 12.3008C14.4463 13.1504 15.1201 13.7979 15.6885 14.2432C16.2568 14.6826 16.793 15.0107 17.2969 15.2275V15.623C16.7168 15.9043 16.1543 16.2646 15.6094 16.7041C15.0645 17.1377 14.4141 17.7764 13.6582 18.6201H12.9814C13.5322 17.4424 14.1094 16.5371 14.7129 15.9043H0.694336V15.0166H14.7129C14.2676 14.4482 13.957 14.0264 13.7812 13.751C13.6055 13.4756 13.3447 12.9922 12.999 12.3008H13.667Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>
            <div className="relative p-6 pt-24 bg-black text-white hover:bg-gray-900 transition">
              <h3 className="font-semibold text-lg">Contact</h3>
              <p className="text-sm text-gray-400 mt-1">Start your project</p>
              <span className="absolute top-8 right-6">
                <svg
                  width="18"
                  height="27"
                  viewBox="0 0 18 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.667 12.3008C14.4463 13.1504 15.1201 13.7979 15.6885 14.2432C16.2568 14.6826 16.793 15.0107 17.2969 15.2275V15.623C16.7168 15.9043 16.1543 16.2646 15.6094 16.7041C15.0645 17.1377 14.4141 17.7764 13.6582 18.6201H12.9814C13.5322 17.4424 14.1094 16.5371 14.7129 15.9043H0.694336V15.0166H14.7129C14.2676 14.4482 13.957 14.0264 13.7812 13.751C13.6055 13.4756 13.3447 12.9922 12.999 12.3008H13.667Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
