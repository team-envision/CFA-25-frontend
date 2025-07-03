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
    initial: { 
      x: animationDirection === "forward" ? "100%" : "-100%", 
      opacity: 0,
      scale: 0.8 // ← ADDED SCALE TO INITIAL STATE
    },
    animate: { 
      x: 0, 
      opacity: 1,
      scale: 1 // ← ADDED SCALE TO ANIMATE STATE
    },
    exit: { 
      x: animationDirection === "forward" ? "-100%" : "100%", 
      opacity: 0,
      scale: 0.8 // ← ADDED SCALE TO EXIT STATE
    },
  };

  const navigate = useCallback((targetId: string) => {
    if (targetId === activePageId) {
      if (lenis) {
        lenis.scrollTo(2 * window.innerHeight, { duration: 0 });
      }
      return;
    }

    const isNavToRecruitment = recruitmentPageIds.includes(targetId);

    if (isNavToRecruitment) {
      setIsAnimating(true);
      setAnimationDirection("forward");
    } else {
      setIsAnimating(false);
    }
    
    setPageSequenceIds(['main', 'structure', targetId]);
  }, [activePageId, lenis, setAnimationDirection]);

  const scrollDown100vh = useCallback(() => {
    if (lenis) {
      const targetScroll = window.innerHeight * 1.05;
      lenis.scrollTo(targetScroll, { duration: 1.5 });
    }
  }, [lenis]);

  const pageComponentMap: Record<string, ReactNode> = {
    main: <MainLandingPage scrollDown100vh={scrollDown100vh} />,
    structure: <StructureSection />,
    teams: <TeamsSection />,
    committees: <Committees />,
    domains: <Domains />,
    recruitment: <RecruitmentForm />,
    envision_recruitment: <Team_Envision_recruitment />,
  };

  useEffect(() => {
    setNavigateToPage(() => navigate);
  }, [navigate, setNavigateToPage]);

  useLayoutEffect(() => {
    if (pageSequenceIds[2] !== activePageId && lenis) {
      lenis.scrollTo(2 * window.innerHeight, { duration: isAnimating ? 1.5 : 0 });
      setActivePageId(pageSequenceIds[2]);
    }
  }, [pageSequenceIds, activePageId, lenis, isAnimating]);

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
