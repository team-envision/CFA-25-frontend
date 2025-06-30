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
    ease: cubicBezierEasing,
  };

  const slideVariants = {
    initial: { x: animationDirection === "forward" ? "100%" : "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: animationDirection === "forward" ? "-100%" : "100%", opacity: 0 },
  };

  // --- THE FINAL FIX: A More Intelligent Navigation Function ---
  const navigate = useCallback((targetId: string) => {
    // If the page is already the active one, just scroll to it and do nothing else.
    if (targetId === activePageId) {
      if (lenis) {
        // We know it's not a recruitment page, so the scroll is instant (duration 0).
        lenis.scrollTo(2 * window.innerHeight, { duration: 0 });
      }
      return; // Stop the function here.
    }

    // If it's a new page, proceed with the navigation logic.
    const isNavToRecruitment = recruitmentPageIds.includes(targetId);

    if (isNavToRecruitment) {
      setIsAnimating(true);
      setAnimationDirection("forward");
    } else {
      setIsAnimating(false);
    }
    
    setPageSequenceIds(['main', 'structure', targetId]);
  }, [activePageId, lenis, setAnimationDirection]);

  // Provide the stable navigate function to the context.
  useEffect(() => {
    setNavigateToPage(() => navigate);
  }, [navigate, setNavigateToPage]);

  // Synchronized scrolling after DOM updates.
  useLayoutEffect(() => {
    if (pageSequenceIds[2] !== activePageId && lenis) {
      lenis.scrollTo(2 * window.innerHeight, { duration: isAnimating ? 1.5 : 0 });
      setActivePageId(pageSequenceIds[2]);
    }
  }, [pageSequenceIds, activePageId, lenis, isAnimating]);

  // Scroll-up logic remains the same.
  useEffect(() => {
    const isRecruitmentPageActive = recruitmentPageIds.includes(activePageId);
    if (!isRecruitmentPageActive) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < (1 / 3)) {
        setIsAnimating(true);
        setAnimationDirection("backward");
        setPageSequenceIds(defaultPageSequence);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activePageId, setAnimationDirection]);

  // Reset the animation state after it completes.
  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <ReactLenis root>
      <main ref={container} className='relative bg-black' suppressHydrationWarning={true}>
        <AnimatePresence mode="popLayout">
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
