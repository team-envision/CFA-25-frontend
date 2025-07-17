"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import FooterSection from '../Footer/page';
import { useScrollManager } from '@/app/context/ScrollContext';

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import('../Particles'), { ssr: false });

// FIX: Updated domain data based on the provided image for accuracy
const leftDomains = [
  { title: "FUNDAZ", desc: "Entertains and educates in Logical Science via puzzles, quizzes, and crosswords." },
  { title: "WEBNEXUS", desc: "Focuses on web development to create innovative solutions bridging virtual and real-life experiences." },
  { title: "KONSTRUKTION & CANOE CHALLENGE", desc: "Focuses on Civil and Infrastructure Design, Fabricating, and Practical Testing." },
  { title: "MAGEFFICIE & ENTREPRENEURIAL SYMPOSIUM", desc: "Demonstrates techniques for Crisis Management, Marketing, and Entrepreneurship." },
  { title: "MACHINATION", desc: "Interprets concepts of Mechanical and Automobile Engineering via blueprints." },
  { title: "PRAESENTATIO", desc: "Imparts knowledge through challenges like J.A.M.s, Extempores, and Debates." },
  { title: "ARCHITECTURE", desc: "Encompasses elements related to Planning, Design, and Construction." },
  { title: "AGRITECH", desc: "Pioneers smart farming solutions by redefining agriculture with cutting-edge technology." }
];

const rightDomains = [
  { title: "YUDDHAME", desc: "Instructs in the art of App & Web Development, Programming, and Networking." },
  { title: "VIMANAZ", desc: "Showcases and uplifts everything related to Aeronautics and Aviation." },
  { title: "DIGITAL DESIGN", desc: "Explores the world of Visual Communication, Graphic Designing, and Modern Art." },
  { title: "BLUEBOOK", desc: "Delves into details of Life Sciences, Forensics, and Biometrics." },
  { title: "X-ZONE & ESPORTS", desc: "Moves out of monotony with online gaming, treasure hunts, and brainstorming." },
  { title: "ELECTRIZITE", desc: "Enlightenment with AI, Integrated Circuits, and a consortium of EEE, ECE, and EIE." },
  { title: "ROBOGYAN", desc: "Elaborates on the design of autonomous and semi-autonomous robotics." },
  { title: "COSMIC QUEST", desc: "Unlock the secrets of the cosmos and embrace the adventure of space exploration." }
];

const Domains = () => {
  const { navigateToPage } = useScrollManager();

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10 bg-black">
        <Particles
          particleColors={['#ff6a00', '#ffa500', '#ffb347']}
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
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8">Domains</h1>

            {/* Domains Container */}
            {/* FIX: Added padding-bottom to prevent the button from covering the last items */}
            <div className="flex flex-col md:flex-row gap-6 pb-10">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                {leftDomains.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[2px] bg-white/30 rounded-full" />

              {/* Right Column */}
              <div className="flex-1 space-y-4 text-left md:text-right">
                {rightDomains.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Button Container */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
              <button
                onClick={() => navigateToPage('recruitment')}
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
