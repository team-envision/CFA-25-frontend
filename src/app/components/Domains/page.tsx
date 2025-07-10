"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import FooterSection from '../Footer/page';
import { useScrollManager } from '@/app/context/ScrollContext';

const Particles = dynamic(() => import('../Particles'), { ssr: false });

const Domains = () => {
  const { navigateToPage } = useScrollManager();

  const leftDomains = [
    { title: "Highlights", desc: "Promote understanding and collaboration while supervising the provision of hospitality of guests." },
    { title: "Championships", desc: "Enable smooth event execution and inspire greatness through fair play and competition." },
    { title: "Initiatives", desc: "Assimilate new strategies and enterprises to make a difference in our Society." },
    { title: "Workshops & Expos", desc: "Conceptualise and Conduct workshops with notable global organisations." },
    { title: "Finance", desc: "Propose the Annual Budget, Allocate funds, and manage fiscal records." },
    { title: "Quality Assurance", desc: "Ensure quality standards are met and maintained throughout the fest." },
  ];

  const rightDomains = [
    { title: "Challenges & Hackathons", desc: "Turn ideas into reality through coordination, innovation, and creative hackathons." },
    { title: "Sponsorship & Marketing", desc: "Establishing relationships with potential partners and drafting contracts." },
    { title: "Corporate Strategy & Marketing", desc: "Build the Aaruush Brand and direct Marketing along with Publicity." },
    { title: "Public Relations", desc: "Commandeer all channels of Correspondence, Communications, and Content." },
    { title: "Operations & Resource Management", desc: "Maintain and manage resources for smooth operations of the Fest." },
    { title: "Deco & Arts", desc: "Create and conceptualize all the decorations and miniatures with artistic flair for the Fest." },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background Particles */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-black">
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
        <div className="relative w-full max-w-7xl lg:max-w-[90vw] opacity-90">
          <div
            className="w-full border border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 text-white flex flex-col shadow-xl"
            style={{
              background: `
                radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 40%),
                radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 40%),
                rgba(15, 15, 15, 0.9)
              `,
            }}
          >
            {/* Title */}
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-8">Domains</h1>

            {/* Domains */}
<div className="flex flex-col md:flex-row gap-6 relative mb-6 sm:mb-8 md:mb-10">
                {/* Left */}
              <div className="flex-1 space-y-6">
                {leftDomains.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[2px] bg-white/30 rounded-full" />

              {/* Right */}
              <div className="flex-1 space-y-6 md:text-right">
                {rightDomains.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Button: Inside container for mobile */}
           <div className="absolute left-1/2 translate-x-[-50%] translate-y-[65%] bottom-0 z-10">
  <button
    onClick={() => navigateToPage('recruitment')}
    className="px-6 sm:px-8 md:px-10 py-2.5 md:py-3 rounded-full border border-white/20 bg-[#EF65220F] text-white font-semibold backdrop-blur-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-out text-base sm:text-lg md:text-xl active:scale-95  hover:border-white/30  text-sm sm:text-base md:text-lg"
  >
    Join a Domain
  </button>
</div>
         </div> 

          {/* Button: Outside container for larger screens */}
          {/* <div className="hidden sm:flex absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
            <button
              onClick={() => navigateToPage('recruitment')}
              className="px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-4 border border-[#ff5a28]/20 rounded-full text-base sm:text-lg md:text-xl font-bold text-white backdrop-blur bg-gradient-to-br from-[#121212] to-[#1a1a1a] shadow-[inset_0_0_6px_rgba(255,255,255,0.08),0_0_10px_rgba(255,90,40,0.15)] hover:from-[#1e1e1e] hover:to-[#2a2a2a] active:scale-95 transition-transform"
            >
              Join a Domain
            </button>
          </div> */}
          </div>
        
      </div>

      {/* Footer */}
      <div className="mt-16">
        <FooterSection />
      </div>
    </div>
  );
};

export default Domains;