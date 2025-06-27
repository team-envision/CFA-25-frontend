// src/app/page.tsx
'use client';
import { useRef } from 'react';
import { useScroll } from 'motion/react';
import { ReactLenis } from 'lenis/react';

// Import your actual page components
import MainLandingPage from './components/main_landing_page/page';
import Committees from './components/Committies/page';
import Domains from './components/Domains/page';
import SecondLandingPage from './components/2nd_landing_page/StructureSection';
import TeamsSection from './components/Teams/page';
import FooterSection from './components/Footer/page';
import Recruitment from './components/Recruitment/page'
import Team_Envision_recruitment from './components/Team_Envision_recruitment/page'
// Import our new generic wrapper
import CardWrapper from './components/Cardwrapper';


const pages = [
  {
    component: <MainLandingPage />,
    color: '#5196fd', // This 'color' is now just metadata, not a prop for CardWrapper
  },
  {
    component: <SecondLandingPage />,
    color: '#8f89ff',
  },
  {
    component: <TeamsSection />,
    color: '#ed649e',
  },
  {
    component: <Committees />,
    color: '#ed649e',
  },
  {
    component: <Domains />,
    color: '#ed649e',
  },
  {
    component: <FooterSection />,
    color: '#fd521a',
  },
  {
    component: <Recruitment />,
    color: '#fd521a',
  },
  {
    component: <Team_Envision_recruitment />,
    color: '#fd521a',
  },
];

export default function HomePage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main ref={container} className='relative bg-black'> {/* Main background can be black or transparent */}
        {pages.map((page, i) => {
          const targetScale = 1 - (pages.length - i) * 0.05;
          const range: [number, number] = [i * 0.25, 1]; // Simplified range calculation

          return (
            <CardWrapper
              key={i}
              i={i}
              // REMOVE 'color={page.color}' from here
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            >
              {page.component}
            </CardWrapper>
          );
        })}
      </main>
    </ReactLenis>
  );
}
