"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useInView } from "react-intersection-observer";
import FooterSection from "../Footer/page";
import { useScrollManager } from "@/app/context/ScrollContext";

// --- Data Arrays (No Changes) ---
const CommitteeNames = [{"title":"1. Championships","desc":"Step up and lead the action, ignite the excitement, set up epic battles, and make every championship a legendary experience packed with fun and fair play!"},{"title":"2. Challenges and Hackathons","desc":"Unleash your brainpower, craft creative challenges, fuel wild ideas, and turn every hackathon into a fast-paced, innovation-packed thrill ride!"},{"title":"3. Corporate Strategy and Implementation (CSI)","desc":"Take Aaruush to new heights, mastermind bold campaigns, spread the hype, and make our brand the ultimate standout everyone’s talking about!"},{"title":"4. Deco and Arts","desc":"Bring our fest to life with your creativity as you design eye-catching miniatures and decorations that add visual magic and make every corner tell a story!"},{"title":"5. Finance","desc":"Own the annual budget game: plan smart, spend wisely, and keep our financial story crystal clear, to help us build a rock-solid money foundation!"},{"title":"6. Highlights","desc":"Roll out the red carpet to warmly welcome our esteemed guests, fostering meaningful connections, and ensuring every dignitary feels valued through thoughtful, memorable experiences."},{"title":"7. Initiatives","desc":"Turn big ideas into real change by dreaming up and launching innovative projects that make a lasting difference, blending purpose with progress to create a lasting impact."},{"title":"8. Operations and Resource Management","desc":"Keep everything buzzing along smoothly as you rally the teams, nail every detail, and rock the details of resource management to ensure our events run without a hitch!"},{"title":"9. Public Relations","desc":"Be the ultimate hype-builder and spin awesome messages, get everyone talking, and make our story the coolest thing in town with your slick words and charm!"},{"title":"10. Quality Assurance","desc":"Be the secret sauce that keeps us unstoppable as you hunt data, stay ahead, dazzle every detail, spark genius moves, and launch our fest with mind-blowing innovation and impact!"},{"title":"11. Sponsorship and Marketing","desc":"Team up with top brands, score epic partnerships, and turn every deal into an opportunity to expand our reach and make our impact even louder!"},{"title":"12. Workshops and Expos","desc":"Make tech pop by setting up hands-on workshops and rad exhibitions that turn learning into an adventure everyone’s raving about!"},{"title":"13. Creatives","desc":"Unleash your inner artist and whip up eye-popping visuals, create soundscapes that wow, and spin stories through art that grabs attention and gets hearts racing!"}];
const creativeTags = ["Graphic Designing","Video Editing","Visual Effects","Photography & Videography","Music Composition","Scripting"];
const DomainDetails = [{"title":"1. Architecture","desc":"Shape environments that inspire and unite artistic vision with smart planning and eco-conscious design solutions."},{"title":"2. Agritech","desc":"Reimagine farming with tech: develop smart, sustainable solutions for agriculture that promote food security and precision farming."},{"title":"3. Bluebook","desc":"Unlock the secrets of life sciences: dive into forensic analysis, biometrics, and scientific inquiry to explore biology and investigation."},{"title":"4. Cosmic Quest","desc":"Explore the universe: unlock the mysteries of space and celestial phenomena through astronomy and space science adventures."},{"title":"5. Digital Design","desc":"Tell stories through visuals: Dive into graphic design, media, and creative communication to bring ideas to life with artistic flair."},{"title":"6. Electrizite","desc":"Power up with smart tech: explore AI, embedded systems, and electronic circuit design to create intelligent systems that shape the future."},{"title":"7. Fundaz","desc":"Plunge into logic battles, unleash science superpowers, and dominate math quests. Ignite your inner genius to fuel the fun and triumph in every electrifying puzzle!"},{"title":"8. Konstruktion and Canoe Challenge","desc":"Build, design, and innovate: test your civil engineering skills through hands-on projects in infrastructure planning and real-world problem solving."},{"title":"9. Machination","desc":"Get mechanical: design and innovate in automotive engineering, automation, and machine dynamics through hands-on blueprints and projects."},{"title":"10. Maggifficie and Entrepreneurial Symposium","desc":"Master the art of business: explore crisis management, entrepreneurship, marketing, and leadership to drive innovation and strategy."},{"title":"11. Praesentatio","desc":"Speak up, stand out, and shine as you master oratory and presentation skills in debates, speeches, JAM sessions, and theatre, growing your confidence and dramatic flair with every performance!"},{"title":"12. Robogyan","desc":"Bring robots to life: design autonomous and semi-autonomous systems using sensors and smart controls to push the boundaries of robotics."},{"title":"13. Vimanaz","desc":"Soar into the science of flight: take on aeronautical challenges and explore aviation engineering and aerospace technology in action."},{"title":"14. Webnexus","desc":"Lead the way in web innovation: design sleek front-end and full-stack experiences that connect the digital world with everyday life through intuitive interfaces."},{"title":"15. X-Zone and E-Sports","desc":"Level up with high-energy gaming: sharpen your strategy and teamwork in esports, treasure hunts, interactive simulations, and game development."},{"title":"16. Yuddhame","desc":"Gear up to build apps and websites: sharpen your programming, networking, and software design skills while creating real-world tech solutions."}];
const envisionTags = ["Artificial Intelligence / Machine Learning","Application Development","Blockchain","Cloud & DevOps","Design","Editorial","Game Development","Web Development","Embedded Systems & Mechatronics"];

const Particles = dynamic(() => import("../Particles"), { ssr: false });

// --- Lazy-Loaded Section Components ---

const CommitteesSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { navigateToPage } = useScrollManager();
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const setRefs = (el: HTMLDivElement | null) => {
    // `inViewRef` from `react-intersection-observer` expects a callback ref.
    inViewRef(el); 
    // `ref` from `forwardRef` can be a function or a ref object.
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  return (
    <div ref={setRefs} className="w-full min-h-screen flex justify-center items-center px-4 py-16">
      {inView && (
        <div className="relative w-full max-w-7xl lg:max-w-[90vw]">
          <div className="relative w-full border border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 text-white flex flex-col shadow-xl opacity-90" style={{ background: `radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 40%), radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 40%), rgba(15, 15, 15, 0.9)` }}>
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8">Committees</h1>
            <div className="hidden md:block w-full overflow-hidden shadow-lg"><Image src="/images/Committees.png" alt="Committee" width={1250} height={600} className="mx-auto" priority /></div>
            <div className="flex flex-col md:flex-row gap-6 pb-12 md:hidden">
              <div className="flex-1 space-y-4">{CommitteeNames.map((item, idx) => (<div key={idx}><h3 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h3><p className="text-sm sm:text-base text-gray-300">{item.desc}</p></div>))}</div>
            </div>
            <div className="mt-[-2rem] md:hidden mb-2">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">{creativeTags.map((tag, idx) => (<span key={idx} className="px-3 py-1.5 border border-white/20 rounded-full text-xs sm:text-sm text-gray-200 bg-white/5 hover:border-orange-400/80 hover:bg-white/10 transition-colors">{tag}</span>))}</div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
            <button onClick={() => navigateToPage("recruitment")} className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 bg-[#ef66221f] text-white font-semibold backdrop-blur-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-out text-sm sm:text-base md:text-lg active:scale-95 hover:border-white/30">Join a Committee</button>
          </div>
        </div>
      )}
    </div>
  );
});
CommitteesSection.displayName = "CommitteesSection";

const DomainsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { navigateToPage } = useScrollManager();
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const setRefs = (el: HTMLDivElement | null) => {
    inViewRef(el);
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  return (
    <div ref={setRefs} className="w-full min-h-screen flex justify-center items-center px-4 py-16">
      {inView && (
        <div className="w-full max-w-7xl lg:max-w-[90vw]">
          <div className="relative w-full border border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 text-white flex flex-col shadow-xl opacity-90" style={{ background: `radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 40%), radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 40%), rgba(15, 15, 15, 0.9)` }}>
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8">Domains</h1>
            <div className="hidden md:block w-full overflow-hidden shadow-lg"><Image src="/images/Domains.png" alt="Domains" width={1250} height={600} className="mx-auto" priority /></div>
            <div className="flex flex-col gap-6 pb-10 md:hidden">
              <div className="flex-1 space-y-4">{DomainDetails.map((item, idx) => (<div key={idx}><h3 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h3><p className="text-sm sm:text-base text-gray-300">{item.desc}</p></div>))}</div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
              <button onClick={() => navigateToPage("recruitment")} className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 bg-[#ef66221f] text-white font-semibold backdrop-blur-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ease-out text-sm sm:text-base md:text-lg active:scale-95 hover:border-white/30">Join a Domain</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
DomainsSection.displayName = "DomainsSection";

const TeamsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { navigateToPage } = useScrollManager();
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const setRefs = (el: HTMLDivElement | null) => {
    inViewRef(el);
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  return (
    <div ref={setRefs} className="w-full min-h-screen flex justify-center items-center px-4 py-16">
      {inView && (
        <div className="relative w-full max-w-7xl lg:max-w-[90vw] opacity-90">
          <div className="relative w-full border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 text-white flex flex-col shadow-xl opacity-100" style={{ background: `radial-gradient(circle at top left, rgba(121, 39, 0, 0.2), transparent 30%), radial-gradient(circle at bottom right, rgba(121, 39, 0, 0.2), transparent 30%), radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 60%), rgba(15, 15, 15, 0.85)` }}>
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-8">Teams</h1>
            <div className="flex flex-col gap-8 sm:gap-10 text-base sm:text-lg md:text-xl leading-relaxed mb-20">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">• Envision</h2>
                <p className="mb-4">Envision is a multi-disciplinary technical team of Aaruush, focused on creating unique, end-to-end solutions and ideas. It has the following 9 divisions:</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">{envisionTags.map((tag, index) => (<span key={index} className="px-4 py-2 border border-white/28 rounded-full text-sm sm:text-base text-gray-300 bg-white/5 hover:border-orange-400 hover:bg-white/10 transition">{tag}</span>))}</div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">• Outreach</h2>
                <p>Join the team and take the lead in expanding Aaruush’s footprint beyond SRMIST. Cultivate distinguished partnerships with premier universities, clubs, and organisations to execute high-impact events that resonate with diverse audiences. Drive strategic outreach, foster intellectual exchange, and elevate the Aaruush brand with innovation, distinction, and purpose on every platform you touch.</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex gap-5 sm:gap-4 md:gap-4 justify-center">
            <button onClick={() => navigateToPage("envision_recruitment")} className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 xl:py-4 rounded-full border border-white/30 bg-[#ef66221f] text-white font-semibold backdrop-blur-[4px] shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 ease-out active:scale-95 hover:border-white/40 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight text-center flex-shrink-0 whitespace-normal min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]"><span className="block">Join Team<br className="sm:hidden" /><span className="sm:ml-1">Envision</span></span></button>
            <button onClick={() => navigateToPage("recruitment")} className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 xl:py-4 rounded-full border border-white/30 bg-[#ef66221f] text-white font-semibold backdrop-blur-[4px] shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 ease-out active:scale-95 hover:border-white/40 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight text-center flex-shrink-0 whitespace-normal min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]"><span className="block">Join Team<br className="sm:hidden" /><span className="sm:ml-1">Outreach</span></span></button>
          </div>
        </div>
      )}
    </div>
  );
});
TeamsSection.displayName = "TeamsSection";


// --- Main Page Component ---

interface StructureDetailsPageProps {
  scrollToSection: 'committees' | 'domains' | 'teams' | null;
}

const StructureDetailsPage: React.FC<StructureDetailsPageProps> = ({ scrollToSection }) => {
  const lenis = useLenis();

  const committeesRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);

  // **** THIS IS THE CORRECTED SECTION ****
  useEffect(() => {
    if (!lenis || !scrollToSection) return;

    const sectionRefs = {
      committees: committeesRef,
      domains: domainsRef,
      teams: teamsRef,
    };
    const targetRef = sectionRefs[scrollToSection];

    // Check if the ref and its 'current' property are valid
    if (targetRef?.current) {
      // Capture the current element in a new constant.
      // This ensures the type is correctly inferred inside the callback.
      const element = targetRef.current;
      
      requestAnimationFrame(() => {
        // Use the new constant, which TypeScript knows is not null.
        lenis.scrollTo(element, { offset: -50, duration: 1.5 });
      });
    }
  }, [scrollToSection, lenis]);

  return (
    <div className="relative w-full bg-black flex flex-col">
      <div className="absolute inset-0 -z-10 bg-black">
        <Particles
          particleColors={["#ff6a00", "#ffa500", "#ffb347"]}
          particleCount={90}
          particleSpread={40}
          speed={0.15}
          particleBaseSize={150}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
          cameraDistance={30}
        />
      </div>
      
      <main className="flex-grow">
        <CommitteesSection ref={committeesRef} />
        <DomainsSection ref={domainsRef} />
        <TeamsSection ref={teamsRef} />
      </main>
      
      <div className="mt-[2vh] w-full mb-[2vw]">
        <FooterSection />
      </div>
    </div>
  );
};

export default StructureDetailsPage;
