'use client';

import { useRef, useEffect, useState, ReactNode, useCallback } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { useScroll, AnimatePresence, useTransform, motion, MotionValue } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useScrollManager } from './context/ScrollContext';
import RecruitmentPageTransition from './components/RecruitmentPageTransition';
import { useRecruitmentNavigation } from './components/Hooks/useRecruitmentNavigation';

// Import All Page Components
import MainLandingPage from './components/main_landing_page/MainLandingPage';
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
  const [currentPageSequence, setCurrentPageSequence] = useState(defaultPageSequence);
  const [activePageId, setActivePageId] = useState('teams');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [navigationSource, setNavigationSource] = useState<'scroll' | 'button' | null>(null);

  // Add recruitment navigation hook
  const { 
    isTransitioning, 
    targetUrl, 
    navigateToRecruitment, 
    onAnimationStart 
  } = useRecruitmentNavigation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getScrollPosition = useCallback((targetId: string) => {
    const vh = window.innerHeight;
    if (!isMobile) {
      switch (targetId) {
        case 'main': return 0;
        case 'structure': return vh * 1.05;
        case 'teams':
        case 'committees':
        case 'domains': return vh * 2.0;
        default: return 0;
      }
    }
    switch (targetId) {
      case 'main': return 0;
      case 'structure': return vh * 1.15;
      case 'teams':
      case 'committees':
      case 'domains': return vh * 2.2;
      default: return 0;
    }
  }, [isMobile]);

  const animationTransition = {
    duration: isAnimating ? 0.7 : 0,
    ease: cubicBezierEasing,
  };

  const slideVariants = {
    initial: { x: animationDirection === "forward" ? "100%" : "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: animationDirection === "forward" ? "-100%" : "100%", opacity: 0 },
  };

  const navigate = useCallback((targetId: string, source: 'scroll' | 'button' = 'button') => {
    console.log('Navigating to:', targetId, 'Current active:', activePageId, 'Source:', source);
    setNavigationSource(source);

    if (targetId === activePageId && source === 'button') {
      if (lenis) {
        const scrollPosition = getScrollPosition(targetId);
        lenis.scrollTo(scrollPosition, { duration: 0 });
      }
      return;
    }

    // Updated: Use the new recruitment navigation
    if (recruitmentPageIds.includes(targetId)) {
      navigateToRecruitment(targetId as 'recruitment' | 'envision_recruitment');
      return;
    }

    if (targetId === 'committees' || targetId === 'domains') {
      setIsAnimating(true);
      setAnimationDirection("forward");
      setCurrentPageSequence(['main', 'structure', targetId]);
      setActivePageId(targetId);
      setTimeout(() => {
        if (lenis) lenis.scrollTo(getScrollPosition(targetId), { duration: 1.5 });
      }, 0);
      return;
    }

    if (defaultPageSequence.includes(targetId)) {
      if (!defaultPageSequence.includes(activePageId)) {
        setCurrentPageSequence(defaultPageSequence);
        setIsAnimating(false);
      }
      setActivePageId(targetId);
      if (lenis) lenis.scrollTo(getScrollPosition(targetId), { duration: source === 'button' ? 1.5 : 0 });
    }
  }, [activePageId, lenis, setAnimationDirection, router, getScrollPosition, navigateToRecruitment]);

  const scrollDown100vh = useCallback(() => {
    navigate('structure', 'button');
  }, [navigate]);

  const pageComponentMap: Record<string, ReactNode> = {
  main: <MainLandingPage 
    scrollDown100vh={scrollDown100vh} 
    navigateToRecruitment={navigateToRecruitment} // ← Added this prop
  />,
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

  useEffect(() => {
    const isCommitteesOrDomainsActive = activePageId === 'committees' || activePageId === 'domains';
    if (!isCommitteesOrDomainsActive) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < (1 / 3) && !isUserScrolling && navigationSource !== 'button') {
        setIsUserScrolling(true);
        setIsAnimating(true);
        setAnimationDirection("backward");
        setCurrentPageSequence(defaultPageSequence);
        setActivePageId('teams');
        setTimeout(() => setIsUserScrolling(false), 1000);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activePageId, setAnimationDirection, isUserScrolling, navigationSource]);

  const onAnimationComplete = () => {
    setIsAnimating(false);
    setNavigationSource(null);
  };

  const currentSequence = currentPageSequence.slice(0, 3);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const scale2 = useTransform(scrollYProgress, [0.33, 1], [1, 0.90]);
  const scale3 = useTransform(scrollYProgress, [0.66, 1], [1, 0.95]);

  const scaleArray = [scale1, scale2, scale3];

  return (
    <ReactLenis
      root
      options={{
        syncTouch: isMobile,
        syncTouchLerp: isMobile ? 0.075 : undefined,
        touchInertiaMultiplier: isMobile ? 35 : undefined,
        touchMultiplier: isMobile ? 0.75 : undefined,
        gestureOrientation: isMobile ? 'vertical' : undefined,
      }}
    >
      <main ref={container} className='relative bg-black' suppressHydrationWarning={true}>
        {currentSequence.map((id, i) => (
          <ScalingCardWrapper
            key={id}
            scale={scaleArray[i]}
            index={i}
          >
            {pageComponentMap[id]}
          </ScalingCardWrapper>
        ))}

        <AnimatePresence mode="popLayout">
          {currentPageSequence.slice(3).filter(id => !recruitmentPageIds.includes(id)).map((id) => (
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

        {/* New Recruitment Page Transition */}
        {isTransitioning && (
          <RecruitmentPageTransition
            targetUrl={targetUrl}
            onAnimationStart={onAnimationStart}
            isActive={isTransitioning}
          />
        )}
      </main>
    </ReactLenis>
  );
}

interface ScalingCardWrapperProps {
  children: ReactNode;
  scale: MotionValue<number>;
  index: number;
}

const ScalingCardWrapper: React.FC<ScalingCardWrapperProps> = ({ 
  children, 
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
