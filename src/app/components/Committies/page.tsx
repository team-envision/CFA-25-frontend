"use client";

import React from 'react';
import Particles from "../Particles";
import FooterSection from '../Footer/page';

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
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between">
      
      {/* Background with particles */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#0c0c0c]">
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

      {/* Main content area */}
      <div className="flex-grow flex justify-center items-center px-4 py-10">
        <div
          className="relative w-[85%] min-h-[85vh] border border-white/20 backdrop-blur-xl rounded-3xl p-6 md:p-10 text-white flex flex-col justify-between shadow-xl"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 40%),
              radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 40%),
              rgba(15, 15, 15, 0.9)
            `,
          }}
        >
          {/* Title */}
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-8">Committees</h1>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative flex-grow">
            
            {/* Left Column */}
            <div className="flex-1 space-y-6 pr-6">
              {leftCommittees.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-base md:text-lg text-gray-300">{item.desc}</p>
                </div>
              ))}

              {/* Creatives Section */}
              <div className="mt-8">
                <h3 className="text-lg md:text-xl font-semibold mb-3">Creatives</h3>
                <p className="text-base md:text-lg text-gray-300 mb-4">
                  Bringing ideas to life through design, storytelling, and visual innovation. Divided into:
                </p>
                <div className="flex flex-wrap gap-2">
                  {creativeTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 border border-gray-600 rounded-full text-sm text-gray-300 bg-white/5 hover:border-orange-400 hover:bg-white/10 transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[2px] bg-white/50 rounded-full absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2" />

            {/* Right Column */}
            <div className="flex-1 space-y-6 md:text-right pl-6">
              {rightCommittees.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-base md:text-lg text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Join Button */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <button className="px-6 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 border border-[#ff5a28]/20 rounded-full text-base sm:text-lg md:text-xl font-bold text-white backdrop-blur bg-gradient-to-br from-[#121212] to-[#1a1a1a] shadow-[inset_0_0_6px_rgba(255,255,255,0.08),0_0_10px_rgba(255,90,40,0.15)] hover:from-[#1e1e1e] hover:to-[#2a2a2a] active:scale-95 transition-transform">
              Join a Committee
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Committees;
