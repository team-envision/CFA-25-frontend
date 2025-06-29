// src/app/page.tsx
'use client';
import { useRef, useEffect, useState, ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';

import { useScrollManager } from './context/ScrollContext';

// Import All Page Components
import MainLandingPage from './components/main_landing_page/page';
import StructureSection from './components/2nd_landing_page/StructureSection';
import TeamsSection from './components/Teams/page';
import Committees from './components/Committies/page';
import Domains from './components/Domains/page';
import CardWrapper from './components/Cardwrapper';

// A map to easily look up components by their ID
const pageComponentMap: Record<string, ReactNode> = {
  teams: <TeamsSection />,
  committees: <Committees />,
  domains: <Domains />,
};

// Define the static parts of the page sequence
const staticPages = [<MainLandingPage key="main" />, <StructureSection key="structure" />];

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { setNavigateToPage } = useScrollManager();

  // State holds the *entire sequence* of pages to be rendered.
  // Default is Main -> Structure -> Teams.
  const [pageSequence, setPageSequence] = useState([...staticPages, pageComponentMap.teams]);

  useEffect(() => {
    // This function will be called from the StructureSection
    const navigate = (targetId: string) => {
      const newPageComponent = pageComponentMap[targetId];
      if (!newPageComponent) return; // Do nothing if the ID is invalid

      // 1. Update the sequence of pages
      setPageSequence([...staticPages, newPageComponent]);
      
      // 2. Scroll to the new page
      // Use a timeout to ensure React has updated the DOM before we scroll.
      setTimeout(() => {
        if (lenis && container.current) {
          // The target is always the 3rd page (index 2)
          const targetScroll = 2 * window.innerHeight;
          lenis.scrollTo(targetScroll, { duration: 1.5 });
        }
      }, 50); // A small delay is sufficient
    };

    setNavigateToPage(() => navigate);
  }, [lenis, setNavigateToPage]);

  return (
    <ReactLenis root>
      <main ref={container} className='relative bg-black'>
        {/* Render the dynamic sequence of pages */}
        {pageSequence.map((pageComponent, i) => (
          <CardWrapper key={i}>
            {pageComponent}
          </CardWrapper>
        ))}
      </main>
    </ReactLenis>
  );
}
