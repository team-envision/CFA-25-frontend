'use client';

import React from 'react';


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
    <div className="relative w-full min-h-screen bg-black text-white flex justify-center items-center px-4 py-20 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10">
        
      </div>

      <div className="w-full max-w-7xl bg-[#0c0c0c] bg-gradient-to-br from-[#1a1a1a]/30 via-transparent to-[#1a1a1a]/30 rounded-3xl shadow-lg p-8 md:p-16 relative">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-12">Committees</h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {leftCommittees.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[2px] bg-white absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2" />

          {/* Right Section */}
          <div className="flex-1 space-y-6 md:text-right">
            {rightCommittees.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creatives Section */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-2">Creatives</h3>
          <p className="text-sm text-gray-300 mb-4">
            Bringing ideas to life through design, storytelling, and visual innovation. Divided into:
          </p>
          <div className="flex flex-wrap gap-3">
            {creativeTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-1 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-orange-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Join Button */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 text-lg font-semibold bg-gradient-to-br from-orange-500/30 to-orange-700/20 border border-orange-400/40 rounded-full hover:from-orange-500/50 hover:to-orange-700/40 transition duration-200 backdrop-blur-md shadow-lg">
            Join a Committee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Committees;