"use client";

import React from 'react';
import Particles from "../Particles"; // Adjust path if needed
import FooterSection from '../Footer/page'

const Committees = () => {
  const leftCommittees = [
    { title: 'Highlights', desc: 'Promote understanding and collaboration while supervising the provision of hospitality of guests.' },
    { title: 'Championships', desc: 'Enable smooth event execution and inspire greatness through fair play and competition.' },
    { title: 'Initiatives', desc: 'Assimilate new strategies and enterprises to make a difference in our Society.' },
    { title: 'Workshops & Expos', desc: 'Conceptualise and Conduct workshops with notable global organisations.' },
    { title: 'Finance', desc: 'Propose the Annual Budget, Allocate funds, and manage fiscal records.' },
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
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background with particles and gradient */}
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
          particleSpread={10}
          speed={0.05}
          particleColors={["#ff6a1a", "#ffb347", "#fff3e0"]}
          moveParticlesOnHover={true}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
        />
      </div>

      {/* Foreground content */}
      <div className="min-h-screen w-full text-white px-4 pt-10 pb-16 md:pt-12 md:pb-24 md:px-8">
        <div className="max-w-[1100px] mx-auto flex flex-col h-full justify-between">
          <h1 className="text-center text-4xl md:text-4xl font-bold mb-8">Committees</h1>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
            {/* Left Section */}
            <div className="flex-1 space-y-4 pr-4">
              {leftCommittees.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-base md:text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[4px] bg-white rounded-full absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2" />

            {/* Right Section */}
            <div className="flex-1 space-y-4 md:text-right pl-4">
              {rightCommittees.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-base md:text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Creatives Section */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-2">Creatives</h3>
            <p className="text-sm text-gray-300 mb-3">
              Bringing ideas to life through design, storytelling, and visual innovation. Divided into:
            </p>
            <div className="flex flex-wrap gap-2">
              {creativeTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 border border-gray-600 rounded-full text-xs text-gray-300 bg-white/5 hover:border-orange-400 hover:bg-white/10 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Join Button */}
          <div className="flex justify-center mt-8 mb-6">
            <button className="px-5 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 border border-[#ff5a28]/30 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold bg-gradient-to-br from-[#121212] to-[#1a1a1a] text-white shadow-[inset_0_0_6px_rgba(255,90,40,0.2),0_0_10px_rgba(255,90,40,0.1)] backdrop-blur transition hover:from-[#1e1e1e] hover:to-[#2a2a2a] active:scale-95 transition-transform">
              Join a Committee
            </button>
          </div>
        </div>
        <FooterSection/>
      </div>
    </div>
  );
};

export default Committees;
