'use client';
import { useRef, useEffect, useState, ReactNode, useLayoutEffect, useCallback } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { useScroll, AnimatePresence } from 'motion/react';

import { useScrollManager } from './context/ScrollContext';

// Import All Page Components
import MainLandingPage from './components/main_landing_page/page';
import StructureSection from './components/2nd_landing_page/StructureSection';
import TeamsSection from './components/Teams/page';
import Committees from './components/Committies/page';
import Domains from './components/Domains/page';
import CardWrapper from './components/Cardwrapper';
import RecruitmentForm from './components/Recruitment/page';
import Team_Envision_recruitment from './components/Team_Envision_recruitment/page';

const pageComponentMap: Record<string, ReactNode> = {
  main: <MainLandingPage />,
  structure: <StructureSection />,
  teams: <TeamsSection />,
  committees: <Committees />,
  domains: <Domains />,
  recruitment: <RecruitmentForm />,
  envision_recruitment: <Team_Envision_recruitment />,
};

const defaultPageSequence = ['main', 'structure', 'teams'];
const recruitmentPageIds = ['recruitment', 'envision_recruitment'];

// --- FIX #2: EXPLICITLY TYPE THE EASING CURVE ---
const cubicBezierEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: container });

  const { setNavigateToPage, animationDirection, setAnimationDirection } = useScrollManager();
  
  const [pageSequenceIds, setPageSequenceIds] = useState(defaultPageSequence);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activePageId, setActivePageId] = useState(defaultPageSequence[2]);

  const animationTransition = {
    duration: isAnimating ? 0.7 : 0,
    ease: cubicBezierEasing, // Use the correctly typed easing
  };

  const slideVariants = {
    initial: { x: animationDirection === "forward" ? "100%" : "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: animationDirection === "forward" ? "-100%" : "100%", opacity: 0 },
  };

  // --- FIX #1: DEFINE A STABLE NAVIGATION FUNCTION WITH useCallback ---
  const navigate = useCallback((targetId: string) => {
    if (targetId === activePageId) return;

    const isNavToRecruitment = recruitmentPageIds.includes(targetId);
    const isNavFromRecruitment = recruitmentPageIds.includes(activePageId);

    if (isNavToRecruitment || isNavFromRecruitment) {
      setIsAnimating(true);
      setAnimationDirection(isNavToRecruitment ? "forward" : "backward");
    } else {
      setIsAnimating(false);
    }
    
    setPageSequenceIds(['main', 'structure', targetId]);
  }, [activePageId, setAnimationDirection]);

  // Provide the stable navigate function to the context
  useEffect(() => {
    setNavigateToPage(() => navigate);
  }, [navigate, setNavigateToPage]);

  // Synchronized scrolling after DOM updates
  useLayoutEffect(() => {
    if (pageSequenceIds[2] !== activePageId && lenis) {
      lenis.scrollTo(2 * window.innerHeight, { duration: isAnimating ? 1.5 : 0 });
      setActivePageId(pageSequenceIds[2]);
    }
  }, [pageSequenceIds, activePageId, lenis, isAnimating]);

  // Scroll-up logic now safely calls the navigate function
  useEffect(() => {
    const isRecruitmentPageActive = recruitmentPageIds.includes(activePageId);
    if (!isRecruitmentPageActive) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < (1 / 3)) { // Scrolled up to the top half of the screen
        // Navigate back to the default teams page, triggering the backward animation
        navigate('teams');
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activePageId, navigate]);

  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <ReactLenis root>
      <main ref={container} className='relative bg-black' suppressHydrationWarning={true}>
        <AnimatePresence mode="wait">
          {pageSequenceIds.map((id) => (
            <CardWrapper 
              key={id}
              customKey={id}
              animationVariants={slideVariants}
              transition={animationTransition}
              onAnimationComplete={onAnimationComplete}
            >
              {pageComponentMap[id]}
            </CardWrapper>
          ))}
        </AnimatePresence>
      </main>
    </ReactLenis>
  );
}
