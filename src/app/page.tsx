// src/app/page.tsx
"use client";

import { useRef, useEffect, useState, ReactNode, useCallback } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import {
  useScroll,
  AnimatePresence,
  useTransform,
  motion,
  MotionValue,
} from "motion/react";
import { useScrollManager } from "./context/ScrollContext";
import RecruitmentPageTransition from "./components/RecruitmentPageTransition";
import { useRecruitmentNavigation } from "./components/Hooks/useRecruitmentNavigation";

// Import All Page Components
import MainLandingPage from "./components/main_landing_page/MainLandingPage";
import StructureSection from "./components/2nd_landing_page/StructureSection";
import TeamsSection from "./components/Teams/page";
import Committees from "./components/Committees/page";
import Domains from "./components/Domains/page";
import CardWrapper from "./components/Cardwrapper";
import RecruitmentForm from "./Recruitment/page";
import Team_Envision_recruitment from "./Team_Envision_recruitment/page";

const defaultPageSequence = ["main", "structure", "teams"];
const recruitmentPageIds = ["recruitment", "envision_recruitment"];
const cubicBezierEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

// FIXED: Smooth interpolation function with SSR safety - no early return
const getInterpolatedThreshold = () => {
  // Return default mobile threshold during SSR or if window is not available
  if (typeof window === "undefined") {
    return 0.25;
  }
  
  const width = window.innerWidth;
  
  // Clamp width between 320px (mobile) and 1920px (large desktop)
  const clampedWidth = Math.max(320, Math.min(1920, width));
  
  // Linear interpolation from 0.25 (mobile) to 0.5 (desktop)
  const minThreshold = 0.25;
  const maxThreshold = 0.5;
  const minWidth = 320;
  const maxWidth = 1920;
  
  const progress = (clampedWidth - minWidth) / (maxWidth - minWidth);
  return minThreshold + (progress * (maxThreshold - minThreshold));
};

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const { setNavigateToPage, animationDirection, setAnimationDirection } =
    useScrollManager();
  const [currentPageSequence, setCurrentPageSequence] =
    useState(defaultPageSequence);
  const [activePageId, setActivePageId] = useState("teams");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [navigationSource, setNavigationSource] = useState<
    "scroll" | "button" | null
  >(null);
  const [actualVH, setActualVH] = useState(800); // Default fallback value
  const [scrollThreshold, setScrollThreshold] = useState(0.25); // Default to mobile threshold

  // Add recruitment navigation hook
  const {
    isTransitioning,
    targetUrl,
    navigateToRecruitment,
    onAnimationStart,
  } = useRecruitmentNavigation();

  // FIXED: Enhanced mobile viewport detection - runs immediately on client side
  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      
      const isMobileDevice =
        window.innerWidth <= 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        const mobileHeight = Math.min(
          window.visualViewport?.height || window.innerHeight,
          window.innerHeight
        );
        setActualVH(mobileHeight);
      } else {
        setActualVH(window.innerHeight);
      }

      // Update scroll threshold based on viewport
      setScrollThreshold(getInterpolatedThreshold());
    };

    // Run immediately on mount
    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    if ("visualViewport" in window) {
      window.visualViewport?.addEventListener("resize", updateViewport);
    }

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
      if ("visualViewport" in window) {
        window.visualViewport?.removeEventListener("resize", updateViewport);
      }
    };
  }, []); // Empty dependency array - run once on mount

  // Direct page loading function with enhanced mobile positioning
  const loadPageDirectly = useCallback(
    (targetId: string) => {
      if (targetId === "committees" || targetId === "domains") {
        setIsAnimating(true);
        setAnimationDirection("forward");
        setCurrentPageSequence(["main", "structure", targetId]);
        setActivePageId(targetId);

        setTimeout(() => {
          if (lenis) {
            const vh = actualVH;
            const targetPosition = isMobile ? vh * 2.22 : vh * 2.0;
            lenis.scrollTo(targetPosition, { duration: 1.0 });
          }
        }, 150);
      } else if (defaultPageSequence.includes(targetId)) {
        if (!defaultPageSequence.includes(activePageId)) {
          setCurrentPageSequence(defaultPageSequence);
          setIsAnimating(false);
        }
        setActivePageId(targetId);

        setTimeout(() => {
          if (lenis) {
            const vh = actualVH;
            let targetPosition;

            switch (targetId) {
              case "main":
                targetPosition = 0;
                break;
              case "structure":
                targetPosition = isMobile ? vh * 1.15 : vh * 1.05;
                break;
              case "teams":
                targetPosition = isMobile ? vh * 2.22 : vh * 2.0;
                break;
              default:
                targetPosition = 0;
            }

            lenis.scrollTo(targetPosition, { duration: 1.0 });
          }
        }, 150);
      }
    },
    [activePageId, lenis, setAnimationDirection, isMobile, actualVH]
  );

  const animationTransition = {
    duration: isAnimating ? 1.2 : 0,
    ease: cubicBezierEasing,
  };

  const slideVariants = {
    initial: {
      x: animationDirection === "forward" ? "100%" : "-100%",
      opacity: 0,
    },
    animate: { x: 0, opacity: 1 },
    exit: {
      x: animationDirection === "forward" ? "-100%" : "100%",
      opacity: 0,
    },
  };

  const navigate = useCallback(
    (targetId: string, source: "scroll" | "button" = "button") => {
      console.log(
        "Navigating to:",
        targetId,
        "Current active:",
        activePageId,
        "Source:",
        source
      );
      setNavigationSource(source);

      if (targetId === activePageId && source === "button") {
        loadPageDirectly(targetId);
        return;
      }

      if (recruitmentPageIds.includes(targetId)) {
        navigateToRecruitment(
          targetId as "recruitment" | "envision_recruitment"
        );
        return;
      }

      loadPageDirectly(targetId);
    },
    [activePageId, navigateToRecruitment, loadPageDirectly]
  );

  const scrollDown100vh = useCallback(() => {
    navigate("structure", "button");
  }, [navigate]);

  const scrollToTop = useCallback(() => {
    if (lenis) {
      // Reset to default sequence if not already
      if (currentPageSequence !== defaultPageSequence) {
        setCurrentPageSequence(defaultPageSequence);
        setIsAnimating(false);
      }
      // Scroll to top and set active page to main
      setActivePageId("main");
      lenis.scrollTo(0, { duration: 1.5 });
    }
  }, [lenis, currentPageSequence]);

  const pageComponentMap: Record<string, ReactNode> = {
    main: (
      <MainLandingPage
        scrollDown100vh={scrollDown100vh}
        navigateToRecruitment={navigateToRecruitment}
        scrollToTop={scrollToTop}
      />
    ),
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
    const isCommitteesOrDomainsActive =
      activePageId === "committees" || activePageId === "domains";
    if (!isCommitteesOrDomainsActive) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 1 / 3 && !isUserScrolling && navigationSource !== "button") {
        setIsUserScrolling(true);
        setIsAnimating(true);
        setAnimationDirection("backward");
        setCurrentPageSequence(defaultPageSequence);
        setActivePageId("teams");
        setTimeout(() => setIsUserScrolling(false), 1000);
      }
    });

    return () => unsubscribe();
  }, [
    scrollYProgress,
    activePageId,
    setAnimationDirection,
    isUserScrolling,
    navigationSource,
  ]);

  const onAnimationComplete = () => {
    setIsAnimating(false);
    setNavigationSource(null);
  };

  // Enhanced transform logic with responsive threshold
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const scale2 = useTransform(scrollYProgress, [0.33, 1], [1, 0.9]);
  const scale3 = useTransform(scrollYProgress, [0.66, 1], [1, 0.95]);

  // Responsive transform with safe fallback
  const firstPageY = useTransform(
    scrollYProgress, 
    [0, scrollThreshold, 1], 
    [0, 0, -actualVH * 1.2]
  );

  const scaleArray = [scale1, scale2, scale3];

  // REMOVED: No longer returning null - render immediately
  return (
    <ReactLenis
      root
      options={{
        syncTouch: isMobile,
        syncTouchLerp: isMobile ? 0.08 : undefined,
        touchInertiaMultiplier: isMobile ? 20 : undefined,
        touchMultiplier: isMobile ? 0.9 : undefined,
        gestureOrientation: isMobile ? "vertical" : undefined,
        infinite: false,
        smoothWheel: !isMobile,
      }}
    >
      <main
        ref={container}
        className="relative bg-black"
        suppressHydrationWarning={true}
      >
        {currentPageSequence.slice(0, 3).map((id, i) => (
          <ScalingCardWrapper 
            key={id} 
            scale={scaleArray[i]} 
            index={i}
            // Apply upward movement to first page only with responsive threshold
            additionalY={i === 0 ? firstPageY : undefined}
          >
            {pageComponentMap[id]}
          </ScalingCardWrapper>
        ))}

        <AnimatePresence mode="popLayout">
          {currentPageSequence
            .slice(3)
            .filter((id) => !recruitmentPageIds.includes(id))
            .map((id) => (
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

// Updated wrapper to handle additional Y transform with responsive behavior
interface ScalingCardWrapperProps {
  children: ReactNode;
  scale: MotionValue<number>;
  index: number;
  additionalY?: MotionValue<number>;
}

const ScalingCardWrapper: React.FC<ScalingCardWrapperProps> = ({
  children,
  scale,
  index,
  additionalY,
}) => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center h-full"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 1}px)`,
          // Apply responsive Y transform for first page
          y: additionalY || 0,
        }}
        className="relative h-full w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
};
