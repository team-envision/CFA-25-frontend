"use client";

import React from "react";
import Particles from "../Particles"; // Adjust path based on your project structure
import FooterSection from '../Footer/page'

const Teams = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background + Particles */}
      <div
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(121, 39, 0, 0.3), transparent 20%),
            radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.3), transparent 20%),
            #0c0c0c
          `,
        }}
      >
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

      {/* Foreground content */}
      <div className="min-h-screen w-full text-white px-4 pt-10 pb-16 md:pt-12 md:pb-24 md:px-8">
        <div className="w-full h-full flex flex-col justify-between max-w-[1100px] mx-auto">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-10">Teams</h1>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">• Envision</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Envision is a multi-disciplinary technical team of Aaruush, focused on creating unique, end-to-end solutions and ideas. It has the following 9 divisions.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Artificial Intelligence / Machine Learning",
                "Application Development",
                "Blockchain",
                "Cloud & Devops",
                "Design",
                "Editorial",
                "Game Development",
                "Embedded Systems & Mechatronics",
                "Web Development",
              ].map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-white/30 rounded-full text-sm text-gray-200 bg-white/5 hover:bg-white/20 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">• Outreach</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Team Outreach at Aaruush excels in executing events outside SRMIST in collaboration with partner universities and clubs to enhance the name of Aaruush. They organise impactful events that engage diverse audiences and provide valuable insights into trends and needs. Their efficient coordination ensures smooth management, and by mastering these areas, Team Outreach enhances Aaruush's reputation, builds strong connections, and drives growth and success within the community and beyond.
            </p>
          </div>

          <div className="flex justify-center mt-8 mb-6">
            <button className="px-5 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 border border-[#ff5a28]/30 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold bg-gradient-to-br from-[#121212] to-[#1a1a1a] text-white shadow-[inset_0_0_6px_rgba(255,90,40,0.2),0_0_10px_rgba(255,90,40,0.1)] backdrop-blur  hover:from-[#1e1e1e] hover:to-[#2a2a2a] active:scale-95 transition-transform">
              Join a Team
            </button>
          </div>
        </div>
        <FooterSection/>
      </div>
      
    </div>
  );
};

export default Teams;
