"use client";

import React from "react";
import dynamic from "next/dynamic";
import FooterSection from "../Footer/page";
import { useScrollManager } from "@/app/context/ScrollContext";

// Dynamically import Particles to avoid hydration issues
const Particles = dynamic(() => import("../Particles"), { ssr: false });

const Teams = () => {
  const { navigateToPage } = useScrollManager();

  const envisionTags = [
    "Artificial Intelligence / Machine Learning",
    "Application Development",
    "Blockchain",
    "Cloud & DevOps",
    "Design",
    "Editorial",
    "Game Development",
    "Embedded Systems & Mechatronics",
    "Web Development",
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#0c0c0c]">
        <Particles
          particleCount={300}
          particleSpread={15}
          speed={0.08}
          particleColors={["#ff6a00", "#ffa500", "#ffb347"]}
          moveParticlesOnHover={true}
          alphaParticles={true}
          particleBaseSize={150}
          sizeRandomness={1}
          cameraDistance={30}
          disableRotation={true}
        />
      </div>

      <div className="flex-grow flex justify-center items-center px-4 py-6">
        <div
          className="relative w-[85%] h-[75vh] border border-white/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-white flex flex-col shadow-xl"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 30%),
              radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 30%),
              radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 60%),
              rgba(15, 15, 15, 0.85)
            `,
          }}
        >
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-6">Teams</h1>

          <div className="flex flex-col gap-8 flex-grow text-base md:text-lg leading-relaxed">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">• Envision</h2>
              <p className="mb-3">
                Envision is a multi-disciplinary technical team of Aaruush, focused on creating unique, end-to-end solutions and ideas. It has the following 9 divisions:
              </p>
              <div className="flex flex-wrap gap-2">
                {envisionTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-gray-600 rounded-full text-xs md:text-sm text-gray-300 bg-white/5 hover:border-orange-400 hover:bg-white/10 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">• Outreach</h2>
              <p>
                Team Outreach at Aaruush excels in executing events outside SRMIST in collaboration with partner universities and clubs to enhance the name of Aaruush. They organise impactful events that engage diverse audiences and provide valuable insights into trends and needs. Their efficient coordination ensures smooth management, and by mastering these areas, Team Outreach enhances Aaruush&rsquo;s reputation, builds strong connections, and drives growth and success within the community and beyond.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex gap-4 flex-wrap justify-center z-10">
            <button
              onClick={() => navigateToPage("envision_recruitment")}
              className="px-6 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 border border-[#ff5a28]/20 rounded-full text-base sm:text-lg md:text-xl font-bold text-white backdrop-blur bg-[#1a1a1a]/80 shadow-[inset_0_0_10px_rgba(255,255,255,0.12),0_0_20px_rgba(255,90,40,0.15)] hover:bg-[#2a2a2a] transition-transform active:scale-95"
            >
              Join Team Envision
            </button>
            <button
              onClick={() => navigateToPage("recruitment")}
              className="px-6 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 border border-[#ff5a28]/20 rounded-full text-base sm:text-lg md:text-xl font-bold text-white backdrop-blur bg-[#1a1a1a]/80 shadow-[inset_0_0_10px_rgba(255,255,255,0.12),0_0_20px_rgba(255,90,40,0.15)] hover:bg-[#2a2a2a] transition-transform active:scale-95"
            >
              Join Team Outreach
            </button>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Teams;
