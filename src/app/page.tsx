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
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { useScrollManager } from "./context/ScrollContext";
import RecruitmentPageTransition from "./components/RecruitmentPageTransition";
import { useRecruitmentNavigation } from "./components/Hooks/useRecruitmentNavigation";
import SimpleAssetPreloader from "./components/SimpleAssetPreloader";

// Import All Page Components
import MainLandingPage from "./components/main_landing_page/MainLandingPage";
import StructureSection from "./components/2nd_landing_page/StructureSection";
import CombinedSections from "./components/CombinedSections/page";
import RecruitmentForm from "./Recruitment/page";
import Team_Envision_recruitment from "./Team_Envision_recruitment/page";

const defaultPageSequence = ["main", "structure", "combined_sections"];
const recruitmentPageIds = ["recruitment", "envision_recruitment"];

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Preloader State
  const [isPreloading, setIsPreloading] = useState(true);

  // Performance optimization for reduced motion
  const prefersReducedMotion = useReducedMotion();
  const staticScale = useMotionValue(1);

  const { setNavigateToPage } = useScrollManager();
  const [currentPageSequence, setCurrentPageSequence] =
    useState(defaultPageSequence);
  const [activePageId, setActivePageId] = useState("combined_sections");
  const [isMobile, setIsMobile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isIOS, setIsIOS] = useState(false);
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
      if (progress >= 0.88 && maxScrollPosition === null && lenis) {
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

  // Clamp scroll to prevent going beyond limits but stay at the current position after threshold
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

  // ADD THIS: PC-ONLY scroll clamping (separate from mobile)
useEffect(() => {
  if (isMobile) return; // ONLY for PC, skip mobile entirely

  const unsubscribe = scrollYProgress.on("change", (progress) => {
    if (progress >= 0.95 && maxScrollPosition === null && lenis) {
      const currentScroll = lenis.actualScroll;
      setMaxScrollPosition(currentScroll);
    }

    if (progress < 0.90 && maxScrollPosition !== null) {
      setMaxScrollPosition(null);
      setClampedPosition(null);
    }
  });

  return () => unsubscribe();
}, [scrollYProgress, isMobile, maxScrollPosition, lenis]);

// ADD THIS: PC-ONLY scroll clamp handler (separate from mobile)
useEffect(() => {
  if (isMobile || !lenis || maxScrollPosition === null) return; // ONLY for PC

  const extraScrollAllowance = 50; // PC gets only 50px
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


  // Enhanced navigation function to support section-specific scrolling
  // Enhanced navigation function to support section-specific scrolling
  const loadPageDirectly = useCallback(
    (targetId: string, section?: string) => {
      setMaxScrollPosition(null);
      setClampedPosition(null);

      if (defaultPageSequence.includes(targetId)) {
        if (!defaultPageSequence.includes(activePageId)) {
          setCurrentPageSequence(defaultPageSequence);
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
              case "combined_sections":
                if (section) {
                  // Use element-based scrolling for more accuracy
                  const sectionElement = document.getElementById(
                    `${section}-section`
                  );
                  if (sectionElement) {
                    const rect = sectionElement.getBoundingClientRect();
                    const scrollTop =
                      window.pageYOffset || document.documentElement.scrollTop;

                    // Teams-specific offset handling to prevent overscrolling
                    let offset;
                    if (section === "teams") {
                      offset = isMobile ? 0 : 100; // Larger offset for teams to prevent overscroll
                    } else {
                      offset = isMobile ? 0 : 20; // Your current offsets
                    }

                    targetPosition = rect.top + scrollTop - offset;

                    // Add maximum scroll position check for teams
                    if (section === "teams") {
                      const maxScroll =
                        document.documentElement.scrollHeight -
                        window.innerHeight -
                        100;
                      targetPosition = Math.min(targetPosition, maxScroll);
                    }
                  } else {
                    // Fallback to calculated positions with better offsets
                    let basePosition = isMobile ? vh * 2.22 : vh * 2.0;

                    if (section === "domains") {
                      basePosition += isMobile ? vh * 1.5 : vh * 1.3;
                    } else if (section === "teams") {
                      basePosition += isMobile ? vh * 2.2 : vh * 2.0; // Reduced values
                    }
                    targetPosition = basePosition;
                  }
                } else {
                  // Default to committees section
                  targetPosition = isMobile ? vh * 2.22 : vh * 2.0;
                }
                break;
              default:
                targetPosition = 0;
            }

            lenis.scrollTo(targetPosition, { duration: 1.2 }); // Slightly longer duration for smoother scroll
          }
        }, 200); // Increased timeout to ensure DOM is ready
      }
    },
    [activePageId, lenis, isMobile, actualVH]
  );

  const navigate = useCallback(
    (
      targetId: string,
      source: "scroll" | "button" = "button",
      section?: string
    ) => {
      console.log(
        "Navigating to:",
        targetId,
        "Section:",
        section,
        "Current active:",
        activePageId,
        "Source:",
        source
      );

      if (recruitmentPageIds.includes(targetId)) {
        navigateToRecruitment(
          targetId as "recruitment" | "envision_recruitment"
        );
        return;
      }

      loadPageDirectly(targetId, section);
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
      }
      setActivePageId("main");
      setMaxScrollPosition(null);
      setClampedPosition(null);
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
    structure: <StructureSection navigate={navigate} />,
    combined_sections: <CombinedSections />,
    recruitment: <RecruitmentForm />,
    envision_recruitment: <Team_Envision_recruitment />,
  };

  useEffect(() => {
    setNavigateToPage(() => navigate);
  }, [navigate, setNavigateToPage]);

  // Callback function for when the preloader is finished
  const handlePreloaderComplete = useCallback(() => {
    setIsPreloading(false);
  }, []);

  // Transform logic with reduced motion fallback
  const scale1 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [1, 0.75] : [1, 0.85]
  );

  const scale2 = useTransform(
    scrollYProgress,
    [0.33, 1],
    isMobile ? [1, 0.8] : [1, 0.9]
  );

  const scale3 = useTransform(
    scrollYProgress,
    [0.66, 1],
    isMobile ? [1, 0.85] : [1, 0.95]
  );

  const effectiveScale1 = prefersReducedMotion ? staticScale : scale1;
  const effectiveScale2 = prefersReducedMotion ? staticScale : scale2;
  const effectiveScale3 = prefersReducedMotion ? staticScale : scale3;

  const scaleArray = [effectiveScale1, effectiveScale2, effectiveScale3];

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
        <motion.main
          ref={container}
          className="relative bg-black"
          suppressHydrationWarning={true}
          style={{
            ...(isMobile && {
              overscrollBehavior: "none",
              touchAction: "pan-y",
            }),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPreloading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {currentPageSequence.slice(0, 3).map((id, i) => (
            <OptimizedScalingCardWrapper
              key={id}
              scale={scaleArray[i]}
              index={i}
            >
              {pageComponentMap[id]}
            </OptimizedScalingCardWrapper>
          ))}

          {isTransitioning && (
            <RecruitmentPageTransition
              targetUrl={targetUrl}
              onAnimationStart={onAnimationStart}
              isActive={isTransitioning}
            />
          )}
        </motion.main>
      </ReactLenis>

      <AnimatePresence mode="wait">
        {isPreloading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <SimpleAssetPreloader
              onComplete={handlePreloaderComplete}
              preloaderImageSrc="/images/aaruush-favicon.png"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
