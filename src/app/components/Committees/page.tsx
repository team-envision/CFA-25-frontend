"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import FooterSection from "../Footer/page";
import { useScrollManager } from "@/app/context/ScrollContext";
// import { useIsMobile } from "../Hooks/useIsMobile";

// Committee Data
const CommitteeNames = [
  {
    title: "1. Championships",
    desc: "Step up and lead the action, ignite the excitement, set up epic battles, and make every championship a legendary experience packed with fun and fair play!",
  },
  {
    title: "2. Challenges and Hackathons",
    desc: "Unleash your brainpower, craft creative challenges, fuel wild ideas, and turn every hackathon into a fast-paced, innovation-packed thrill ride!",
  },
  {
    title: "3. Corporate Strategy and Implementation (CSI)",
    desc: "Take Aaruush to new heights, mastermind bold campaigns, spread the hype, and make our brand the ultimate standout everyone’s talking about!",
  },
  {
    title: "4. Deco and Arts",
    desc: "Bring our fest to life with your creativity as you design eye-catching miniatures and decorations that add visual magic and make every corner tell a story!",
  },
  {
    title: "5. Finance",
    desc: "Own the annual budget game: plan smart, spend wisely, and keep our financial story crystal clear, to help us build a rock-solid money foundation!",
  },
  {
    title: "6. Highlights",
    desc: "Roll out the red carpet to warmly welcome our esteemed guests, fostering meaningful connections and ensuring every dignitary feels valued through thoughtful, memorable experiences.",
  },
  {
    title: "7. Initiatives",
    desc: "Turn big ideas into real change by dreaming up and launching innovative projects that make a lasting difference, blending purpose with progress to create a lasting impact.",
  },
  {
    title: "8. Operations and Resource Management",
    desc: "Keep everything buzzing along smoothly as you rally the teams, nail every detail, and rock the details of resource management to ensure our events run without a hitch!",
  },
  {
    title: "9. Public Relations",
    desc: "Be the ultimate hype-builder and spin awesome messages, get everyone talking, and make our story the coolest thing in town with your slick words and charm!",
  },
  {
    title: "10. Quality Assurance",
    desc: "Be the secret sauce that keeps us unstoppable as you hunt data, stay ahead, dazzle every detail, spark genius moves, and launch our fest with mind-blowing innovation and impact!",
  },
  {
    title: "11. Sponsorship and Marketing",
    desc: "Team up with top brands, score epic partnerships, and turn every deal into an opportunity to expand our reach and make our impact even louder!",
  },
  {
    title: "12. Workshops and Expos",
    desc: "Make tech pop by setting up hands-on workshops and rad exhibitions that turn learning into an adventure everyone’s raving about!",
  },
  {
    title: "13. Creatives",
    desc: "Unleash your inner artist and whip up eye-popping visuals, create soundscapes that wow, and spin stories through art that grabs attention and gets hearts racing!",
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

const Particles = dynamic(() => import("../Particles"), { ssr: false });

const Committees = () => {
  const { navigateToPage } = useScrollManager();
  // const isMobile = useIsMobile();

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
                  {CommitteeNames.map((item, idx) => (
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
              <div className="mt-[-2rem] md:hidden mb-2">
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
      <div className="mt-[2vh] w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default Committees;
