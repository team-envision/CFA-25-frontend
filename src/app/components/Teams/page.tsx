"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useScrollManager } from "@/app/context/ScrollContext";
import FooterSection from "../Footer/page";
import { useIsMobile } from "../Hooks/useIsMobile";

const Particles = dynamic(() => import("../Particles"), { ssr: false });

const Teams = () => {
  const { navigateToPage } = useScrollManager();
  const isMobile = useIsMobile();

  const envisionTags = [
    "Artificial Intelligence / Machine Learning",
    "Application Development",
    "Blockchain",
    "Cloud & DevOps",
    "Design",
    "Editorial",
    "Game Development",
    "Web Development",
    "Embedded Systems & Mechatronics",
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background particles */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-black">
        {!isMobile && (
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
        )}
      </div>

      {/* Teams Section - Full Width */}
      <div className="flex-grow flex justify-center items-center px-4 py-6 ">
        <div className="relative w-full max-w-7xl lg:max-w-[90vw] opacity-90 ">
          <div
            className="relative w-full border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 text-white flex flex-col shadow-xl opacity-100"
            style={{
              background: `
                radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 30%),
                radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 30%),
                radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 60%),
                rgba(15, 15, 15, 0.85)
              `,
            }}
          >
            {/* Heading */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-8 ">
              Teams
            </h1>

            {/* Text content */}
            <div className="flex flex-col gap-8 sm:gap-10 text-base sm:text-lg md:text-xl leading-relaxed mb-20">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                  • Envision
                </h2>
                <p className="mb-4">
                  Envision is a multi-disciplinary technical team of Aaruush,
                  focused on creating unique, end-to-end solutions and ideas. It
                  has the following 9 divisions:
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {envisionTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border border-white/28 rounded-full text-sm sm:text-base text-gray-300 bg-white/5 hover:border-orange-400 hover:bg-white/10 transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                  • Outreach
                </h2>
                <p>
                  Join the team and take the lead in expanding Aaruush’s
                  footprint beyond SRMIST. Cultivate distinguished partnerships
                  with premier universities, clubs, and organisations to execute
                  high-impact events that resonate with diverse audiences. Drive
                  strategic outreach, foster intellectual exchange, and elevate
                  the Aaruush brand with innovation, distinction, and purpose on
                  every platform you touch.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Size Buttons - Larger for all breakpoints */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex gap-5 sm:gap-4 md:gap-4 justify-center">
            <button
              onClick={() => navigateToPage("envision_recruitment")}
              className="
  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 
  py-2.5 sm:py-3 md:py-3.5 lg:py-4 xl:py-4 
  rounded-full border border-white/30 bg-[#ef66221f] text-white font-semibold 
  backdrop-blur-[4px] 
  shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.35)] 
  hover:shadow-[0_12px_40px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.45)] 
  transition-all duration-300 ease-out 
  active:scale-95 hover:border-white/40
  text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
  leading-tight
  text-center
  flex-shrink-0
  whitespace-normal
  min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]
"
            >
              <span className="block">
                Join Team
                <br className="sm:hidden" />
                <span className="sm:ml-1">Envision</span>
              </span>
            </button>

            <button
              onClick={() => navigateToPage("recruitment")}
              className="
  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 
  py-2.5 sm:py-3 md:py-3.5 lg:py-4 xl:py-4 
  rounded-full border border-white/30 bg-[#ef66221f] text-white font-semibold 
  backdrop-blur-[4px] 
  shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.35)] 
  hover:shadow-[0_12px_40px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.45)] 
  transition-all duration-300 ease-out 
  active:scale-95 hover:border-white/40
  text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
  leading-tight
  text-center
  flex-shrink-0
  whitespace-normal
  min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]
"
            >
              <span className="block">
                Join Team
                <br className="sm:hidden" />
                <span className="sm:ml-1">Outreach</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 w-[100vw]">
        <FooterSection />
      </div>
    </div>
  );
};

export default Teams;
