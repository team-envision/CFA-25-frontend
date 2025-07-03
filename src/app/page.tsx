'use client';
import { useRef, useEffect, useState, ReactNode, useLayoutEffect, useCallback } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { useScroll, AnimatePresence, useTransform, motion } from 'motion/react';
import { useRouter } from 'next/navigation';

import { useScrollManager } from './context/ScrollContext';

// Import All Page Components
import MainLandingPage from './components/main_landing_page/page';
import StructureSection from './components/2nd_landing_page/StructureSection';
import TeamsSection from './components/Teams/page';
import Committees from './components/Committies/page';
import Domains from './components/Domains/page';
import CardWrapper from './components/Cardwrapper';
import RecruitmentForm from './Recruitment/page';
import Team_Envision_recruitment from './Team_Envision_recruitment/page';

const defaultPageSequence = ['main', 'structure', 'teams'];
const recruitmentPageIds = ['recruitment', 'envision_recruitment'];

const cubicBezierEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const router = useRouter();
  const { scrollYProgress } = useScroll({ 
    target: container,
    offset: ['start start', 'end end']
  });

  const { setNavigateToPage, animationDirection, setAnimationDirection } = useScrollManager();
  
  const [pageSequenceIds, setPageSequenceIds] = useState(defaultPageSequence);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activePageId, setActivePageId] = useState('teams');

  const animationTransition = {
    duration: isAnimating ? 0.7 : 0,
    ease: cubicBezierEasing,
  };

  const slideVariants = {
    initial: { 
      x: animationDirection === "forward" ? "100%" : "-100%", 
      opacity: 0
    },
    animate: { 
      x: 0, 
      opacity: 1
    },
    exit: { 
      x: animationDirection === "forward" ? "-100%" : "100%", 
      opacity: 0
    },
  };

  const navigate = useCallback((targetId: string) => {
    console.log('Navigating to:', targetId, 'Current active:', activePageId);
    
    if (targetId === activePageId) {
      if (lenis) {
        if (targetId === 'main') {
          lenis.scrollTo(0, { duration: 0 });
        } else if (targetId === 'structure') {
          lenis.scrollTo(window.innerHeight * 1.05, { duration: 0 });
        } else {
          lenis.scrollTo(2 * window.innerHeight, { duration: 0 });
        }
      }
      return;
    }

    const isNavToRecruitment = recruitmentPageIds.includes(targetId);
    const isNavToCommitteesOrDomains = targetId === 'committees' || targetId === 'domains';

    if (isNavToRecruitment) {
      if (targetId === 'envision_recruitment') {
        router.push('/Team_Envision_recruitment');
      } else {
        router.push('/Recruitment');
      }
      return;
    } else if (isNavToCommitteesOrDomains) {
      setIsAnimating(true);
      setAnimationDirection("forward");
      setPageSequenceIds(['main', 'structure', targetId]);
    } else if (defaultPageSequence.includes(targetId)) {
      setIsAnimating(false);
      if (lenis) {
        if (targetId === 'main') {
          lenis.scrollTo(0, { duration: 1.5 });
        } else if (targetId === 'structure') {
          lenis.scrollTo(window.innerHeight * 1.05, { duration: 1.5 });
        } else if (targetId === 'teams') {
          setPageSequenceIds(['main', 'structure', 'teams']);
          lenis.scrollTo(2 * window.innerHeight, { duration: 1.5 });
        }
      }
      setActivePageId(targetId);
      return;
    }
  }, [activePageId, lenis, setAnimationDirection, pageSequenceIds, router]);

  const scrollDown100vh = useCallback(() => {
    if (lenis) {
      const targetScroll = window.innerHeight * 1.05;
      lenis.scrollTo(targetScroll, { duration: 1.5 });
      setActivePageId('structure');
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
    if (pageSequenceIds[2] !== activePageId && lenis && isAnimating) {
      lenis.scrollTo(2 * window.innerHeight, { duration: 1.5 });
      setActivePageId(pageSequenceIds[2]);
    }
  }, [pageSequenceIds, activePageId, lenis, isAnimating]);

  useEffect(() => {
    const isCommitteesOrDomainsActive = activePageId === 'committees' || activePageId === 'domains';
    
    if (!isCommitteesOrDomainsActive) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < (1 / 3)) {
        setIsAnimating(true);
        setAnimationDirection("backward");
        setPageSequenceIds(defaultPageSequence);
        setActivePageId('teams');
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activePageId, setAnimationDirection]);

  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  const currentSequence = pageSequenceIds.slice(0, 3);

  return (
    <ReactLenis 
      root 
      options={{
        // ← MOBILE TOUCH SUPPORT CONFIGURATION
        syncTouch: true, // Enable touch synchronization
        syncTouchLerp: 0.075, // Smooth touch lerp
        touchInertiaMultiplier: 35, // Touch inertia strength
        touchMultiplier: 0.75, // Touch scroll speed // Keep false for better performance
        gestureOrientation: 'vertical', // Allow vertical gestures
      }}
    >
      <main ref={container} className='relative bg-black' suppressHydrationWarning={true}>
        {/* Current sequence pages with scaling */}
        {currentSequence.map((id, i) => {
          const targetScale = 1 - (currentSequence.length - i) * 0.05;
          const range: [number, number] = [i * 0.33, 1];
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);
          
          return (
            <ScalingCardWrapper
              key={id}
              customKey={id}
              scale={scale}
              index={i}
            >
              {pageComponentMap[id]}
            </ScalingCardWrapper>
          );
        })}

        <AnimatePresence mode="popLayout">
          {pageSequenceIds.slice(3).filter(id => !recruitmentPageIds.includes(id)).map((id) => (
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

// Scaling card wrapper component
interface ScalingCardWrapperProps {
  children: ReactNode;
  customKey: string;
  scale: any;
  index: number;
}

const ScalingCardWrapper: React.FC<ScalingCardWrapperProps> = ({ 
  children, 
  customKey, 
  scale,
  index
}) => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className='h-screen sticky top-0 flex items-center justify-center'>
      <motion.div 
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className='relative h-full w-full origin-top'
      >
        {children}
      </motion.div>
    </div>
  );
};
