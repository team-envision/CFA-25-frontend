"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import FooterSection from "../Footer/page";
import { useScrollManager } from "@/app/context/ScrollContext";

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import("../Particles"), { ssr: false });

// Committee Data
const leftCommittees = [
  {
    title: "Championships",
    desc: "Promote understanding and collaboration while supervising the provision of hospitality of guests.",
  },
  {
    title: "Corporate Strategy and Implementation (CSI)",
    desc: "Facilitate seamless execution of events and empower to achieve greatness through fair competition and sportsmanship.",
  },
  {
    title: "Corporate Strategy and Implementation (CSI)",
    desc: "Assimilate new strategies and enterprises to make a difference in our Society.",
  },
  {
    title: "Workshops & Expos",
    desc: "Conceptualise and Conduct workshops with notable global organisations.",
  },
  {
    title: "Finance",
    desc: "Propose the Annual Budget, Allocate funds, and Manage fiscal records.",
  },
  {
    title: "Quality Assurance",
    desc: "Analyse and Assess data to uphold Aaruush's benchmark standards.",
  },
];

const rightCommittees = [
  {
    title: "Challenges and Hackathons",
    desc: "From Ideas to reality, experience coordination: innovation and conduct hackathons to unleash creativity.",
  },
  {
    title: "Sponsorship and Marketing",
    desc: "Establishing relationships with potential partners and Drafting contracts.",
  },
  {
    title: "Corporate Strategy & Implementation (CSI)",
    desc: "Build the Aaruush Brand and direct Marketing along with Publicity.",
  },
  {
    title: "Public Relations (PR)",
    desc: "Commandeer all channels of Correspondence, Communications, and Content.",
  },
  {
    title: "Operations and Resource Management",
    desc: "Maintain and manage resources for smooth operations of the Fest.",
  },
  {
    title: "Deco and Arts",
    desc: "Create and conceptualize all the decorations and miniatures with artistic flair for the Fest.",
  },
];

const creativeTags = [
  "Graphic Designing",
  "Video Editing",
  "Visual Effects",
  "Photography & Videography",
  "Music Composition",
  "Scripting",
];

const Committees = () => {
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
        <div className="relative w-full max-w-7xl lg:max-w-[90vw]">
          {/* Mobile View: Show Card UI */}
          <div className="block">
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
                Committees
              </h1>
              {/* Desktop View: Image */}
              <div className="hidden md:block w-full overflow-hidden shadow-lg ">
                <Image
                  src="/images/Committees.png"
                  alt="Committee"
                  width={1250}
                  height={600}
                  className="mx-auto"
                  priority
                />
              </div>
              {/* Grid Columns */}
              <div className="flex flex-col md:flex-row gap-6 pb-12 md:hidden">
                <div className="flex-1 space-y-4">
                  {leftCommittees.map((item, idx) => (
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

                <div className="hidden md:block w-[2px] bg-white/30 rounded-full" />

                <div className="flex-1 space-y-4 text-left md:text-right">
                  {rightCommittees.map((item, idx) => (
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
              </div>
              {/* Creatives */}
              <div className="mt-[-2rem] md:hidden">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
                  Creatives
                </h3>

                <p className="text-sm sm:text-base text-gray-300 mb-4 text-justify sm:text-left">
                  Bringing ideas to life through design, storytelling, and
                  visual innovation. It is further divided into 6 divisions:
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  {creativeTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 border border-white/20 rounded-full text-xs sm:text-sm text-gray-200 bg-white/5 hover:border-orange-400/80 hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Desktop View: Image
          <div className="hidden md:block w-full rounded-3xl overflow-hidden shadow-lg ">
            <Image
              src="/images/Committees.png"
              alt="Committee"
              width={1080}
              height={600}
              className="mx-auto"
              priority
            />
          </div> */}
          {/* Button - Always Visible */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
            <button
              onClick={() => navigateToPage("recruitment")}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 bg-[#ef66221f] text-white font-semibold backdrop-blur-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-out text-sm sm:text-base md:text-lg active:scale-95 hover:border-white/30"
            >
              Join a Committee
            </button>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <div className="mt-24 w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default Committees;
