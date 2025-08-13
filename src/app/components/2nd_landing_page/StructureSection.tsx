"use client";

import React from "react";
import "./StructureSection.css";
import { ArrowUpRight } from "lucide-react";
import Particles from "../Particles";

const ArrowButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="arrow-btn"
    aria-label="Learn more"
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
  >
    <ArrowUpRight size={35} strokeWidth={3} />
  </button>
);

// Define the props interface for StructureSection
interface StructureSectionProps {
  navigate: (targetId: string, source?: "scroll" | "button", section?: string) => void;
}

// Make sure to use the interface in the component definition
const StructureSection: React.FC<StructureSectionProps> = ({ navigate }) => {
  // Individual handlers for each card
  const handleCommitteesClick = () => {
    navigate("combined_sections", "button", "committees");
  };

  const handleDomainsClick = () => {
    navigate("combined_sections", "button", "domains");
  };

  const handleTeamsClick = () => {
    navigate("combined_sections", "button", "teams");
  };

  return (
    <section
      className="structure-section"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Particles effect background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
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
            onClick={handleCommitteesClick}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Committees</h3>
              <p>
                Blueprints, bold strategies, and seamless execution. Our
                Committees shape every chapter of Aaruush. From planning to
                execution, they ensure every event runs with perfect precision
                and impact.
              </p>
            </div>
            <ArrowButton onClick={handleCommitteesClick} />
          </div>
          <div
            className="structure-card"
            onClick={handleDomainsClick}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Domains</h3>
              <p>
                Where engineering meets experience. Domains are your gateway to
                tech, innovation, and creativity. Tackle real-world challenges,
                craft solutions, and leave your mark on the future.
              </p>
            </div>
            <ArrowButton onClick={handleDomainsClick} />
          </div>
          <div
            className="structure-card"
            onClick={handleTeamsClick}
            role="button"
            tabIndex={0}
          >
            <div className="card-content">
              <h3>Teams</h3>
              <p>
                The engine behind the fest. Our Teams drive tech innovation,
                outreach, and continuity. They connect talent and ideas,
                ensuring that the spirit of Aaruush thrives and grows.
              </p>
            </div>
            <ArrowButton onClick={handleTeamsClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
