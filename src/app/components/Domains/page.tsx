"use client";

import React from "react";
import FooterSection from "../Footer/page";
import { useScrollManager } from "@/app/context/ScrollContext";
import Image from "next/image";
// import { useIsMobile } from "../Hooks/useIsMobile";
import dynamic from "next/dynamic";

// FIX: Updated domain data based on the provided image for accuracy
const DomainDetails = [
  {
    title: "1. Architecture",
    desc: "Dream big as you blend tech and creativity to design jaw-dropping, smart spaces that set the trends and shape tomorrow!",
  },
  {
    title: "2. Agritech",
    desc: "Revolutionise your roots as you mix technology with tradition to power up farmers and spark unstoppable harvests!",
  },
  {
    title: "3. Bluebook",
    desc: "Step in where genes meet genius, petri dishes spark ideas and you cook up the next big biotech breakthrough!",
  },
  {
    title: "4. Cosmic Quest",
    desc: "Reach for the stars as you dive into space science and imagination- each journey reveals incredible new wonders!",
  },
  {
    title: "5. Digital Design",
    desc: "Make it pop: Unleash your creative fire with striking images, beats, animation, and effects that turn heads and leave your signature!",
  },
  {
    title: "6. Electrizite",
    desc: "Get wired! Dive into electronics, master circuits and embedded tech, and spark smart ideas to life.",
  },
  {
    title: "7. Fundaz",
    desc: "Bring your brain to the game: tackle mind-bending quizzes blending science, math, and news, making thinking fun, fresh, and unforgettable!",
  },
  {
    title: "8. Konstruktion and Canoe Challenge",
    desc: "Build boldly as you solve real-world engineering puzzles in construction and sustainability, flexing hands-on genius and creative grit!",
  },
  {
    title: "9. Machination",
    desc: "Crank up the ideas as you design and perfect machines and vehicles, pushing mechanical magic to high-performance glory!",
  },
  {
    title: "10. Maggifficie and Entrepreneurial Symposium",
    desc: "Go big in business: Tackle strategy, law, and real-world challenges, learning, competing, and leading like a future boss!",
  },
  {
    title: "11. Praesentatio",
    desc: "Speak loud and shine bright as you master the stage with debates, poetry, drama, and stories as you level up your confidence every time!",
  },
  {
    title: "12. Robogyan",
    desc: "Dive into robotics as you design, build, and program robots for challenges like football and line following, exploring creativity and problem-solving in an exciting, hands-on setting!",
  },
  {
    title: "13. Vimanaz",
    desc: "Soar into the science of flight: take on aeronautical challenges and explore aviation engineering and aerospace technology in action.",
  },
  {
    title: "14. Webnexus",
    desc: "Blaze trails in Breakthrough: Tech like Web3, Blockchain, DeFi, and Quantum Computing as you join inspiring events and collaborate to empower tomorrow’s tech visionaries!",
  },
  {
    title: "15. X-Zone and E-Sports",
    desc: "Level up your game! Dive into gaming, AR/VR, and dev, building skills, strategy, and creativity for epic digital battles!",
  },
  {
    title: "16. Yuddhame",
    desc: "Gear up your genius as you conquer software and hardware challenges in web, apps, AI, and more- fueling innovation and skill!",
  },
];

const Domains = () => {
  const { navigateToPage } = useScrollManager();
  // const isMobile = useIsMobile();
  const Particles = dynamic(() => import("../Particles"), { ssr: false });

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
      <div className="mt-[2vh]">
        <FooterSection />
      </div>
    </div>
  );
};

export default Domains;
