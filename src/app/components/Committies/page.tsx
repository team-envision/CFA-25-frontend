"use client";

import React from 'react';
import Particles from "../Particles";
import FooterSection from '../Footer/page';
import { useScrollManager } from '@/app/context/ScrollContext';

const Committees = () => {
  const { navigateToPage } = useScrollManager();

  const leftCommittees = [
    { title: 'Highlights', desc: 'Promote understanding and collaboration while supervising the provision of hospitality of guests.' },
    { title: 'Championships', desc: 'Enable smooth event execution and inspire greatness through fair play and competition.' },
    { title: 'Initiatives', desc: 'Assimilate new strategies and enterprises to make a difference in our Society.' },
    { title: 'Workshops & Expos', desc: 'Conceptualise and conduct workshops with notable global organisations.' },
    { title: 'Finance', desc: 'Propose the annual budget, allocate funds, and manage fiscal records.' },
    { title: 'Quality Assurance', desc: 'Ensure quality standards are met and maintained throughout the fest.' },
  ];

  const rightCommittees = [
    { title: 'Challenges & Hackathons', desc: 'Turn ideas into reality through coordination, innovation, and creative hackathons.' },
    { title: 'Sponsorship & Marketing', desc: 'Establish relationships with partners and manage sponsorship deals.' },
    { title: 'Corporate Strategy & Marketing', desc: 'Build the Aaruush brand and lead all strategic publicity efforts.' },
    { title: 'Public Relations', desc: 'Manage all communication and correspondence for internal and external audiences.' },
    { title: 'Operations & Resource Management', desc: 'Handle logistics and manage smooth functioning of all activities.' },
    { title: 'Deco & Arts', desc: 'Add a creative touch to the fest through visual design and installations.' },
  ];

  const creativeTags = [
    'Graphic Designing',
    'Video Editing',
    'Visual Effects',
    'Photography & Videography',
    'Music Composition',
    'Scripting',
  ];

  return (
    <div className="relative w-  min-h-screen overflow-hidden flex flex-col">
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

      {/* Main Content - Fixed sizing */}
      <div className="flex-grow flex justify-center items-center px-4 py-6 ">
        <div className="relative w-full max-w-7xl lg:max-w-[90vw] opacity-90 ">
          {/* Card Container - Appropriately sized */}
          <div
            className="relative w-full border border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 text-white flex flex-col shadow-xl opacity-100"
            style={{
              background: `
                radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 40%),
                radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 40%),
                rgba(15, 15, 15, 0.9)
              `,
            }}
          >
            {/* Heading - Proper responsive sizing */}
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Committees
            </h1>

            {/* Grid Columns - Compact spacing */}
<div className="flex flex-col md:flex-row gap-3 md:gap-8 relative mb-4 sm:mb-6 md:mb-12">
              {/* Left Column */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                {leftCommittees.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[2px] bg-white absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2" />

              {/* Right Column */}
              <div className="flex-1 space-y-3 sm:space-y-4 md:text-right">
                {rightCommittees.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Creatives Section - Compact layout */}
<div className="-mt-1 sm:-mt-4">
              {/* Title */}
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-left sm:text-left">
                Creatives
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 text-center sm:text-left text-justify">
                Bringing ideas to life through design, storytelling, and visual innovation. It is further divided into 6 divisions:
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-3 justify sm:justify-start">
                {creativeTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 py-1 border border-white/28 rounded-full text-[10px] sm:text-xs md:text-sm text-gray-300 bg-white/5 hover:border-orange-400 hover:bg-white/10 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Button - Properly positioned */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 ">
            <button
              onClick={() => navigateToPage('recruitment')}
              className="px-6 sm:px-8 md:px-10 py-2.5 md:py-3 rounded-full border border-white/20 bg-[#EF65220F] text-white font-semibold backdrop-blur-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-out text-base sm:text-lg md:text-xl active:scale-95  hover:border-white/30  text-sm sm:text-base md:text-lg"
            >
              Join a Committee
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Proper spacing */}
      <div className="mt-12 sm:mt-16 w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default Committees;