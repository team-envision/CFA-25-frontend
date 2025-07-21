"use client";

import React from "react";
import dynamic from "next/dynamic";
import FooterSection from "../Footer/page";
import { useScrollManager } from "@/app/context/ScrollContext";
import Image from "next/image";

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import("../Particles"), { ssr: false });

// FIX: Updated domain data based on the provided image for accuracy
const DomainDetails = [
  {
    title: "1. Architecture",
    desc: "Shape environments that inspire and unite artistic vision with smart planning and eco-conscious design solutions.",
  },
  {
    title: "2. Agritech",
    desc: "Reimagine farming with tech: develop smart, sustainable solutions for agriculture that promote food security and precision farming.",
  },
  {
    title: "3. Bluebook",
    desc: "Unlock the secrets of life sciences: dive into forensic analysis, biometrics, and scientific inquiry to explore biology and investigation.",
  },
  {
    title: "4. Cosmic Quest",
    desc: "Explore the universe: unlock the mysteries of space and celestial phenomena through astronomy and space science adventures.",
  },
  {
    title: "5. Digital Design",
    desc: "Tell stories through visuals: Dive into graphic design, media, and creative communication to bring ideas to life with artistic flair.",
  },
  {
    title: "6. Electrizite",
    desc: "Power up with smart tech: explore AI, embedded systems, and electronic circuit design to create intelligent systems that shape the future.",
  },
  {
    title: "7. Fundaz",
    desc: "Plunge into logic battles, unleash science superpowers, and dominate math quests. Ignite your inner genius to fuel the fun and triumph in every electrifying puzzle!",
  },
  {
    title: "8. Konstruktion and Canoe Challenge",
    desc: "Build, design, and innovate: test your civil engineering skills through hands-on projects in infrastructure planning and real-world problem solving.",
  },
  {
    title: "9. Machination",
    desc: "Get mechanical: design and innovate in automotive engineering, automation, and machine dynamics through hands-on blueprints and projects.",
  },
  {
    title: "10. Maggifficie and Entrepreneurial Symposium",
    desc: "Master the art of business: explore crisis management, entrepreneurship, marketing, and leadership to drive innovation and strategy.",
  },
  {
    title: "11. Praesentatio",
    desc: "Speak up, stand out, and shine as you master oratory and presentation skills in debates, speeches, JAM sessions, and theatre, growing your confidence and dramatic flair with every performance!",
  },
  {
    title: "12. Robogyan",
    desc: "Bring robots to life: design autonomous and semi-autonomous systems using sensors and smart controls to push the boundaries of robotics.",
  },
  {
    title: "13. Vimanaz",
    desc: "Soar into the science of flight: take on aeronautical challenges and explore aviation engineering and aerospace technology in action.",
  },
  {
    title: "14. Webnexus",
    desc: "Lead the way in web innovation: design sleek front-end and full-stack experiences that connect the digital world with everyday life through intuitive interfaces.",
  },
  {
    title: "15. X-Zone and E-Sports",
    desc: "Level up with high-energy gaming: sharpen your strategy and teamwork in esports, treasure hunts, interactive simulations, and game development.",
  },
  {
    title: "16. Yuddhame",
    desc: "Gear up to build apps and websites: sharpen your programming, networking, and software design skills while creating real-world tech solutions.",
  },
];

const Domains = () => {
  const { navigateToPage } = useScrollManager();

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10 bg-black">
        <Particles
          particleColors={["#ff6a00", "#ffa500", "#ffb347"]}
          particleCount={90}
          particleSpread={35}
          speed={0.15}
          particleBaseSize={150}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
          cameraDistance={30}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center px-4 py-6">
        <div className="w-full max-w-7xl lg:max-w-[90vw]">
          {/* Card Container */}
          <div
            className="relative w-full border border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 text-white flex flex-col shadow-xl opacity-90"
            style={{
              background: `
                radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 40%),
                radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 40%),
                rgba(15, 15, 15, 0.9)
              `,
            }}
          >
            {/* Heading */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8">
              Domains
            </h1>
            {/* Desktop View: Image */}
            <div className="hidden md:block w-full overflow-hidden shadow-lg ">
              <Image
                src="/images/Domains.png"
                alt="Domains"
                width={1250}
                height={600}
                className="mx-auto"
                priority
              />
            </div>
            {/* Domains Container */}
            {/* FIX: Added padding-bottom to prevent the button from covering the last items */}
            <div className="flex flex-col gap-6 pb-10 md:hidden">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                {DomainDetails.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column
              <div className="flex-1 space-y-4 text-left md:text-right">
                {rightDomains.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Button Container */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
              <button
                onClick={() => navigateToPage("recruitment")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 bg-[#ef66221f] text-white font-semibold backdrop-blur-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-out text-sm sm:text-base md:text-lg active:scale-95 hover:border-white/30"
              >
                Join a Domain
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24">
        <FooterSection />
      </div>
    </div>
  );
};

export default Domains;
