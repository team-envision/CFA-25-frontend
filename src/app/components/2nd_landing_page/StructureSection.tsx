'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './StructureSection.css'
import Particles from '../Particles';

const ArrowButton = ({ onClick }: { onClick?: () => void }) => (
  <button 
    className="arrow-btn" 
    aria-label="Learn more"
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16H24" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
      <path d="M18 10L24 16L18 22" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  </button>
);

const StructureSection = () => {
  const router = useRouter();

  const handleCardClick = (page: string) => {
    router.push(page);
  };

  return (
    <section className="structure-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="particles-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
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
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="structure-title">
          Our&nbsp;&nbsp;<span className="highlight">Structure</span>
        </h2>
        <div className="structure-cards">
          <div 
            className="structure-card" 
            onClick={() => handleCardClick('/Committees')}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Committees</h3>
              <p>
                The backbone of Aaruush, ensuring seamless execution by managing logistics, hospitality, sponsorships, marketing, and more. They handle the fest's planning, outreach, and operations.
              </p>
            </div>
            <ArrowButton onClick={() => handleCardClick('/Committees')} />
          </div>
          <div 
            className="structure-card"
            onClick={() => handleCardClick('/Domains')}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Domains</h3>
              <p>
                The core of Aaruush's technical and managerial events, covering diverse fields such as AI, robotics, cybersecurity, business strategy, and sustainability, fostering innovation and competition.
              </p>
            </div>
            <ArrowButton onClick={() => handleCardClick('/Domains')} />
          </div>
          <div 
            className="structure-card"
            onClick={() => handleCardClick('/Teams')}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Teams</h3>
              <p>
                Specialized groups driving key aspects like design, tech, media, and content. These teams bring Aaruush to life through branding, digital presence, and innovative solutions.
              </p>
            </div>
            <ArrowButton onClick={() => handleCardClick('/Teams')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructureSection;