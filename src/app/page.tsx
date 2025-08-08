"use client";

import { useRef, useEffect, useState, ReactNode, useCallback } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import {
  useScroll,
  AnimatePresence,
  useTransform,
  motion,
  MotionValue,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
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
import SimpleAssetPreloader from "./components/SimpleAssetPreloader";

// Fixed page sequence - footer is not part of scroll sequence
const defaultPageSequence = ["main", "structure"];
const additionalPageIds = ["teams", "committees", "domains"];
const recruitmentPageIds = ["recruitment", "envision_recruitment"];
const cubicBezierEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // States
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Performance optimization for reduced motion
  const prefersReducedMotion = useReducedMotion();
  const staticScale = useMotionValue(1);

  const { setNavigateToPage, animationDirection, setAnimationDirection } =
    useScrollManager();
  const [currentPageSequence, setCurrentPageSequence] =
    useState(defaultPageSequence);
  const [activePageId, setActivePageId] = useState("main");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isIOS, setIsIOS] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [navigationSource, setNavigationSource] = useState<
    "scroll" | "button" | null
  >(null);
  const [actualVH, setActualVH] = useState(800);

  // Scroll clamping
  const [maxScrollPosition, setMaxScrollPosition] = useState<number | null>(
    null
  );
  const [clampedPosition, setClampedPosition] = useState<number | null>(null);

  // Add recruitment navigation hook
  const {
    isTransitioning,
    targetUrl,
    navigateToRecruitment,
    onAnimationStart,
  } = useRecruitmentNavigation();

  // Enhanced mobile and iOS viewport detection
  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;

      const userAgent = navigator.userAgent;
      const isMobileDevice =
        window.innerWidth <= 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);

      setIsMobile(isMobileDevice);
      setIsIOS(isIOSDevice);

      if (isMobileDevice) {
        const mobileHeight = Math.min(
          window.visualViewport?.height || window.innerHeight,
          window.innerHeight
        );
        setActualVH(mobileHeight);
      } else {
        setActualVH(window.innerHeight);
      }
    };

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
  }, []);

  // Calculate max scroll position when scroll progress reaches 85%
  useEffect(() => {
    if (!isMobile) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (progress >= 0.85 && maxScrollPosition === null && lenis) {
        const currentScroll = lenis.actualScroll;
        setMaxScrollPosition(currentScroll);
      }

      if (progress < 0.8 && maxScrollPosition !== null) {
        setMaxScrollPosition(null);
        setClampedPosition(null);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isMobile, maxScrollPosition, lenis]);

  // Clamp scroll to prevent going beyond limits
  useEffect(() => {
    if (!lenis || !isMobile || maxScrollPosition === null) {
      return;
    }

    const extraScrollAllowance = 150;
    const clampPosition = maxScrollPosition + extraScrollAllowance;
    let lastScrollPosition = 0;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      const scrollDirection = scroll > lastScrollPosition ? "down" : "up";
      lastScrollPosition = scroll;

      if (scroll > clampPosition) {
        if (clampedPosition === null) {
          setClampedPosition(clampPosition);
        }

        if (scrollDirection === "down") {
          lenis.scrollTo(clampPosition, {
            immediate: true,
          });
        }
      }
    };

    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis, isMobile, maxScrollPosition, clampedPosition]);

  // Updated direct page loading function
  const loadPageDirectly = useCallback(
    (targetId: string) => {
      setMaxScrollPosition(null);
      setClampedPosition(null);

      if (targetId === "teams" || targetId === "committees" || targetId === "domains") {
        // Navigate to overlay pages
        setIsAnimating(true);
        setAnimationDirection("forward");
        setCurrentPageSequence([...defaultPageSequence, targetId]);
        setActivePageId(targetId);

        // Don't scroll, just show the overlay
      } else if (defaultPageSequence.includes(targetId)) {
        // Handle main sequence: main → structure
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
      if (currentPageSequence !== defaultPageSequence) {
        setCurrentPageSequence(defaultPageSequence);
        setIsAnimating(false);
      }
      setActivePageId("main");
      setMaxScrollPosition(null);
      setClampedPosition(null);
      lenis.scrollTo(0, { duration: 1.5 });
    }
  }, [lenis, currentPageSequence]);

  // pageComponentMap
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
    const isAdditionalPageActive = additionalPageIds.includes(activePageId);
    if (!isAdditionalPageActive) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 1 / 3 && !isUserScrolling && navigationSource !== "button") {
        setIsUserScrolling(true);
        setIsAnimating(true);
        setAnimationDirection("backward");
        setCurrentPageSequence(defaultPageSequence);
        setActivePageId("structure");
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

  // Container initialization with manual scroll fix
  useEffect(() => {
    if (assetsLoaded && container.current && lenis) {
      const timer = setTimeout(() => {
        setActivePageId("main");
        setCurrentPageSequence(defaultPageSequence);
        setIsAnimating(false);
        setMaxScrollPosition(null);
        setClampedPosition(null);
        
        lenis.scrollTo(0, { immediate: true });
        window.dispatchEvent(new Event('resize'));
        
        // QUICK FIX: Manual 0.5vh scroll to trigger state update
        setTimeout(() => {
          lenis.scrollTo(window.innerHeight * 0.005); // Smooth 0.5vh scroll
          setTimeout(() => {
            lenis.scrollTo(0); // Return to top smoothly
          }, 100);
        }, 200);
        
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [assetsLoaded, lenis, setAnimationDirection]);

  // Transform logic with reduced motion fallback
  const scale1 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [1, 0.75] : [1, 0.85]
  );

  const scale2 = useTransform(
    scrollYProgress,
    [0.5, 1],
    isMobile ? [1, 0.8] : [1, 0.9]
  );

  const effectiveScale1 = prefersReducedMotion ? staticScale : scale1;
  const effectiveScale2 = prefersReducedMotion ? staticScale : scale2;

  const scaleArray = [effectiveScale1, effectiveScale2];

  // Show preloader while assets are loading
  if (!assetsLoaded) {
    return (
      <SimpleAssetPreloader
        onComplete={() => setAssetsLoaded(true)}
        preloaderImageSrc="/images/aaruush-favicon.png"
        alt="AARUUSH Loading"
      />
    );
  }

  return (
    <>
      <ReactLenis
        root
        options={{
          syncTouch: isMobile,
          syncTouchLerp: isMobile ? 0.08 : undefined,
          touchInertiaMultiplier: isMobile ? 20 : undefined,
          touchMultiplier: isMobile ? 0.9 : undefined,
          gestureOrientation: "vertical",
          infinite: false,
          smoothWheel: !isMobile,
        }}
      >
        <main
          ref={container}
          className="relative bg-black"
          suppressHydrationWarning={true}
          style={{
            height: '200vh', // Only 2 main pages: main → structure
            ...(isMobile && {
              overscrollBehavior: "none",
              touchAction: "pan-y",
            }),
          }}
        >
          {/* Main 2-page sequence: main + structure */}
          {currentPageSequence.slice(0, 2).map((id, i) => (
            <OptimizedScalingCardWrapper key={id} scale={scaleArray[i]} index={i}>
              {pageComponentMap[id]}
            </OptimizedScalingCardWrapper>
          ))}

          {/* Additional overlay pages (Teams, Committees, Domains) */}
          <AnimatePresence mode="popLayout">
            {currentPageSequence
              .slice(2)
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

          {/* Recruitment transition */}
          {isTransitioning && (
            <RecruitmentPageTransition
              targetUrl={targetUrl}
              onAnimationStart={onAnimationStart}
              isActive={isTransitioning}
            />
          )}
        </main>
      </ReactLenis>
    </>
  );
}

// Optimized wrapper component
interface OptimizedScalingCardWrapperProps {
  children: ReactNode;
  scale: MotionValue<number>;
  index: number;
}

const OptimizedScalingCardWrapper: React.FC<
  OptimizedScalingCardWrapperProps
> = ({ children, scale, index }) => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center"
      style={{
        top: `calc(-5vh + ${index * 1}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative h-auto w-full origin-top will-change-transform"
      >
        <div className="min-h-screen">{children}</div>
      </motion.div>
    </div>
  );
};