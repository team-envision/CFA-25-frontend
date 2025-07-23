// src/app/components/2nd_landing_page/StructureSection.tsx
"use client";

import React from "react";
// REMOVED: import { useRouter } from 'next/navigation';
import { useScrollManager } from "@/app/context/ScrollContext"; // ADDED: The new navigation logic
import "./StructureSection.css"; // RESTORED: Your original CSS import path
import Particles from "../Particles"; // RESTORED: Your original Particles import path

// This is your original ArrowButton component, unchanged.
const ArrowButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="arrow-btn"
    aria-label="Learn more"
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 16H24" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M18 10L24 16L18 22"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </button>
);

const StructureSection = () => {
  // REMOVED: const router = useRouter();
  const { navigateToPage } = useScrollManager(); // ADDED: Get the function from our context

  // This function now correctly handles the path format from your original design.
  const handleCardClick = (pagePath: string) => {
    // Transform the path ('/Committees') into the ID ('committees') that our system expects.
    const pageId = pagePath.replace("/", "").toLowerCase();
    navigateToPage(pageId);
  };

  return (
    <section
      className="structure-section"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="particles-bg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#ff6a00", "#ffa500", "#ffb347"]} // Only orange tones
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto auto",
        }}
      >
        <h2 className="structure-title">
          Our&nbsp;<span className="highlight">Structure</span>
        </h2>
        <div className="structure-cards">
          <div
            className="structure-card"
            onClick={() => handleCardClick("/Committees")}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Committees</h3>
              <p>
                Blueprints, grand moves, and smooth execution. Our Committees form the backbone of each chapter of Aaruush. From outlining the grand plan to initiating strategies or bringing events to life, this team keeps the fest going with flawless finesse.
                Dream, decide, do.

              </p>
            </div>
            <ArrowButton onClick={() => handleCardClick("/Committees")} />
          </div>
          <div
            className="structure-card"
            onClick={() => handleCardClick("/Domains")}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Domains</h3>
              <p>
                Where engineering becomes adventure. Domains are your entry to hands-on technology, innovations, and creative sparks. Enter, solve real-world problems, create the next revolution, and leave your impact.


              </p>
            </div>
            <ArrowButton onClick={() => handleCardClick("/Domains")} />
          </div>
          <div
            className="structure-card"
            onClick={() => handleCardClick("/Teams")}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Teams</h3>
              <p>
                The force behind the process. Our teams bring the technological advantage, take our story outside campus, and see that innovation never ends. By linking talent, skills, and new horizons, they power all success at Aaruush.
              </p>
            </div>
            <ArrowButton onClick={() => handleCardClick("/Teams")} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
